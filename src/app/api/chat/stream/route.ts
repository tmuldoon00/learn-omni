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

  try {
    const body = (await req.json()) as ChatRequest;
    if (!body?.message || typeof body.message !== 'string') {
      await sendEvent(writer, { type: 'error', error: 'Invalid request: message is required' });
      writer.close();
      return new Response(readable, sseHeaders());
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
    if (!apiKey || !vectorStoreId) {
      await sendEvent(writer, { type: 'error', error: 'Server misconfiguration' });
      writer.close();
      return new Response(readable, sseHeaders());
    }

    // Simplest, doc-aligned approach: Responses API with File Search (no Assistants/Threads)
    const client = new OpenAI({ apiKey });
    const keepalive = setInterval(() => { void sendEvent(writer, { type: 'status', value: 'working' }); }, 2000);
    let res: any;
    try {
      res = await client.responses.create({
        model: 'gpt-4.1-mini',
        input: body.message,
        tools: [{ type: 'file_search' }],
        tool_choice: 'auto',
        tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
      });
    } catch (e: any) {
      // Fallback without file_search so the user still sees an answer
      await sendEvent(writer, { type: 'status', value: 'fallback' });
      try {
        res = await client.responses.create({ model: 'gpt-4o-mini', input: body.message });
      } catch (e2: any) {
        await sendEvent(writer, { type: 'error', error: e2?.message || e?.message || 'openai error' });
        clearInterval(keepalive);
        writer.close();
        return new Response(readable, sseHeaders());
      }
    } finally {
      clearInterval(keepalive);
    }

    const text = extractResponseText(res) || '';
    for (let i = 0; i < text.length; i += 40) {
      await sendEvent(writer, { type: 'token', value: text.slice(i, i + 40) });
      await wait(25);
    }
    const citations = extractCitationsFromResponse(res);
    await sendEvent(writer, { type: 'done', conversationId: undefined, citations });
  } catch (err: any) {
    console.error('chat stream error', err);
    await sendEvent(writer, { type: 'error', error: err?.message || 'unknown' });
  } finally {
    writer.close();
  }

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

function extractText(message: any): string {
  if (!message?.content?.length) return '';
  const first = message.content.find((c: any) => c.type === 'output_text' || c.type === 'text' || c.text);
  if (!first) return '';
  if (first.type === 'text' && first.text?.value) return first.text.value as string;
  if (first.type === 'output_text' && first.output_text) return String(first.output_text);
  if (first.text) return String(first.text);
  return '';
}

function extractCitations(message: any): { file_id: string }[] {
  const out: { file_id: string }[] = [];
  if (!message?.content) return out;
  for (const part of message.content) {
    if (part?.type === 'text' && part?.text?.annotations?.length) {
      for (const ann of part.text.annotations) {
        const fileId = ann?.file_citation?.file_id || ann?.file_path?.file_id || ann?.file_id;
        if (fileId) out.push({ file_id: String(fileId) });
      }
    }
  }
  return out;
}

function wait(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

// Best-effort extraction of file citations from Responses API result shape
function extractCitationsFromResponse(res: any): { file_id: string }[] {
  const out: { file_id: string }[] = [];
  try {
    const outputs = res?.output ?? res?.response?.output ?? [];
    for (const o of outputs) {
      const content = o?.content ?? [];
      for (const part of content) {
        if (part?.type === 'output_text' && part?.output_text?.annotations?.length) {
          for (const ann of part.output_text.annotations) {
            const fileId = ann?.file_citation?.file_id || ann?.file_path?.file_id || ann?.file_id;
            if (fileId) out.push({ file_id: String(fileId) });
          }
        }
        if (part?.type === 'text' && part?.text?.annotations?.length) {
          for (const ann of part.text.annotations) {
            const fileId = ann?.file_citation?.file_id || ann?.file_path?.file_id || ann?.file_id;
            if (fileId) out.push({ file_id: String(fileId) });
          }
        }
      }
    }
  } catch {}
  return out;
}

function extractResponseText(res: any): string {
  try {
    const outputs = res?.output ?? res?.response?.output ?? [];
    let out = '';
    for (const o of outputs) {
      const content = o?.content ?? [];
      for (const part of content) {
        if (part?.type === 'output_text' && typeof part?.output_text === 'string') {
          out += part.output_text;
        } else if (part?.type === 'text' && typeof part?.text === 'string') {
          out += part.text;
        } else if (part?.type === 'output_text' && part?.output_text?.value) {
          out += String(part.output_text.value);
        }
      }
    }
    return out;
  } catch {
    return '';
  }
}


