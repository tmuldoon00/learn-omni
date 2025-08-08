import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

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

    const client = new OpenAI({ apiKey });
    const assistantsApi = client.beta?.assistants;
    const threadsApi = client.beta?.threads;
    if (!assistantsApi || !threadsApi) {
      await sendEvent(writer, { type: 'error', error: 'Assistants API unavailable' });
      writer.close();
      return new Response(readable, sseHeaders());
    }

    const threadId = body.conversationId || (await threadsApi.create({})).id;
    const assistant = await assistantsApi.create({
      name: 'LearnOmni Docs Assistant',
      model: 'gpt-4.1',
      tools: [{ type: 'file_search' }],
      tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
      instructions: [
        'Answer strictly from the documentation. Include concise citations when applicable. If not found, say so and suggest related topics.',
      ].join('\n'),
    });

    await threadsApi.messages.create(threadId, { role: 'user', content: body.message });
    const run = await threadsApi.runs.create(threadId, { assistant_id: assistant.id });

    let sentText = '';
    // Poll for updates and stream deltas
    while (true) {
      const status = await threadsApi.runs.retrieve(threadId, run.id);
      const messages = await threadsApi.messages.list(threadId, { limit: 1, order: 'desc' });
      const assistantMsg = messages.data.find((m) => m.role === 'assistant');
      if (assistantMsg) {
        const full = extractText(assistantMsg) || '';
        if (full.length > sentText.length) {
          const delta = full.slice(sentText.length);
          sentText = full;
          await sendEvent(writer, { type: 'token', value: delta });
        }
      }

      if (status.status === 'completed' || status.status === 'failed' || status.status === 'cancelled' || status.status === 'expired') {
        const citations = extractCitations(assistantMsg);
        await sendEvent(writer, { type: 'done', conversationId: threadId, citations });
        break;
      }

      await wait(600);
    }

    try { await assistantsApi.del(assistant.id); } catch {}
  } catch (err: any) {
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


