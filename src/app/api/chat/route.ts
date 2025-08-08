import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

type ChatRequest = {
  message: string;
  conversationId?: string; // thread id
  filters?: Record<string, string | string[]>;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;
    if (!body?.message || typeof body.message !== 'string') {
      return Response.json({ error: 'Invalid request: message is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
    if (!apiKey || !vectorStoreId) {
      return Response.json({ error: 'Server misconfiguration: missing OPENAI_API_KEY or OPENAI_VECTOR_STORE_ID' }, { status: 500 });
    }

    const client = new OpenAI({ apiKey });
    const assistantsApi = client.beta?.assistants;
    const threadsApi = client.beta?.threads;
    if (!assistantsApi || !threadsApi) {
      return Response.json({ error: 'OpenAI Assistants API not available in this SDK version' }, { status: 500 });
    }

    // Create or reuse a thread from conversationId
    const threadId = body.conversationId || (await threadsApi.create({})).id;

    // Create a lightweight assistant wired to the vector store for this run
    const assistant = await assistantsApi.create({
      name: 'LearnOmni Docs Assistant',
      model: 'gpt-4.1',
      tools: [{ type: 'file_search' }],
      tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
      instructions: [
        'You answer strictly based on the provided documentation. Include citations to specific files when possible.',
        'If you cannot find relevant information, say so and suggest related topics or searches.',
      ].join('\n'),
    });

    // Add user message to the thread
    await threadsApi.messages.create(threadId, {
      role: 'user',
      content: body.message,
    });

    // Execute the run and wait for completion
    const run = await threadsApi.runs.createAndPoll(threadId, {
      assistant_id: assistant.id,
    });

    if (run.status !== 'completed') {
      return Response.json({
        conversationId: threadId,
        status: run.status,
        error: run.last_error ?? undefined,
      }, { status: 200 });
    }

    // Get latest assistant message
    const messages = await threadsApi.messages.list(threadId, { limit: 10, order: 'desc' });
    const assistantMsg = messages.data.find((m) => m.role === 'assistant');
    const text = extractText(assistantMsg) || '';

    // Try to collect file citations (best-effort)
    const citations = extractCitations(assistantMsg);

    // Optionally resolve file names for citations
    const resolved = [] as { file_id: string; filename?: string }[];
    for (const c of citations) {
      try {
        const file = await client.files.retrieve(c.file_id);
        resolved.push({ file_id: c.file_id, filename: (file as any)?.filename });
      } catch {
        resolved.push({ file_id: c.file_id });
      }
    }

    // Cleanup assistant (thread persists via conversationId)
    try { await assistantsApi.del(assistant.id); } catch {}

    return Response.json({
      conversationId: threadId,
      answer: text,
      citations: resolved,
    });
  } catch (err: any) {
    const detail = err?.response?.data ?? err?.message ?? 'Unknown error';
    return Response.json({ error: detail }, { status: 500 });
  }
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


