import OpenAI from 'openai';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type ChatRequest = {
  message: string;
  conversationId?: string; // thread id
};

export async function POST(req: Request) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  
  // Parse request body first
  const body = (await req.json()) as ChatRequest;
  
  // Start the async work in the background
  (async () => {
    try {
      if (!body?.message || typeof body.message !== 'string') {
        await sendEvent(writer, { type: 'error', error: 'Invalid request: message is required' });
        writer.close();
        return;
      }

      const apiKey = process.env.OPENAI_API_KEY;
      const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
      if (!apiKey || !vectorStoreId) {
        await sendEvent(writer, { type: 'error', error: 'Server misconfiguration' });
        writer.close();
        return;
      }

    // Simplest, doc-aligned approach: Responses API with File Search (no Assistants/Threads)
    const client = new OpenAI({ apiKey });
    const keepalive = setInterval(() => { void sendEvent(writer, { type: 'status', value: 'working' }); }, 2000);
    let res: any;
    try {
      console.log('[CHAT] Creating response with vector store:', vectorStoreId);
      res = await client.responses.create({
        model: 'gpt-4.1',
        input: body.message,
        tools: [
          { 
            type: 'file_search',
            vector_store_ids: [vectorStoreId]
          }
        ],
      });
      console.log('[CHAT] Response received:', JSON.stringify(res, null, 2));
    } catch (e: any) {
      console.error('[CHAT] Error creating response:', e);
      // Fallback without file_search so the user still sees an answer
      await sendEvent(writer, { type: 'status', value: 'fallback' });
      try {
        res = await client.responses.create({ model: 'gpt-4o-mini', input: body.message });
      } catch (e2: any) {
        console.error('[CHAT] Fallback also failed:', e2);
        await sendEvent(writer, { type: 'error', error: e2?.message || e?.message || 'openai error' });
        clearInterval(keepalive);
        writer.close();
        return new Response(readable, sseHeaders());
      }
    } finally {
      clearInterval(keepalive);
    }

    const text = extractResponseText(res) || '';
    console.log('[CHAT] Extracted text length:', text.length);
    console.log('[CHAT] Starting to send tokens...');
    try {
      for (let i = 0; i < text.length; i += 40) {
        await sendEvent(writer, { type: 'token', value: text.slice(i, i + 40) });
      }
      console.log('[CHAT] Finished sending tokens, extracting citations...');
      const citations = extractCitationsFromResponse(res);
      console.log('[CHAT] Extracted citations:', citations.length);
      await sendEvent(writer, { type: 'done', conversationId: undefined, citations });
      console.log('[CHAT] Sent done event');
      } catch (streamErr: any) {
        console.error('[CHAT] Stream error:', streamErr);
        throw streamErr;
      }
    } catch (err: any) {
      console.error('chat stream error', err);
      await sendEvent(writer, { type: 'error', error: err?.message || 'unknown' });
    } finally {
      writer.close();
    }
  })();

  // Return the response immediately so the client can start reading
  return new Response(readable, sseHeaders());
}

function sseHeaders() {
  return {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  };
}

async function sendEvent(writer: WritableStreamDefaultWriter, data: any) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  const enc = new TextEncoder().encode(payload);
  await writer.write(enc);
}

function wait(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function extractCitationsFromResponse(res: any): { file_id: string; filename?: string }[] {
  const out: { file_id: string; filename?: string }[] = [];
  try {
    const outputs = res?.output ?? [];
    
    // Find the message output item
    for (const outputItem of outputs) {
      if (outputItem?.type === 'message' && Array.isArray(outputItem.content)) {
        for (const contentPart of outputItem.content) {
          if (contentPart?.type === 'output_text' && Array.isArray(contentPart.annotations)) {
            for (const ann of contentPart.annotations) {
              if (ann?.type === 'file_citation') {
                const fileId = ann.file_id;
                const filename = ann.filename;
                if (fileId) {
                  out.push({ file_id: String(fileId), filename });
                }
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('[CHAT] Error extracting citations:', err);
  }
  return out;
}

function extractResponseText(res: any): string {
  try {
    // Response structure: { output: [ { type: "file_search_call", ... }, { type: "message", content: [...] } ] }
    const outputs = res?.output ?? [];
    let text = '';
    
    // Find the message output item
    for (const outputItem of outputs) {
      if (outputItem?.type === 'message' && Array.isArray(outputItem.content)) {
        for (const contentPart of outputItem.content) {
          if (contentPart?.type === 'output_text') {
            // The text can be directly in contentPart.text or contentPart.output_text
            if (typeof contentPart.text === 'string') {
              text += contentPart.text;
            } else if (typeof contentPart.output_text === 'string') {
              text += contentPart.output_text;
            }
          }
        }
      }
    }
    
    return text;
  } catch (err) {
    console.error('[CHAT] Error extracting text:', err);
    return '';
  }
}


