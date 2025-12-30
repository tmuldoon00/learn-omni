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

    console.log('[CHAT] Using Responses API with vector store:', vectorStoreId);
    
    // Use the Responses API with file_search
    const response = await client.responses.create({
      model: 'gpt-4.1-nano-2025-04-14',
      input: body.message,
      tools: [
        {
          type: 'file_search',
          vector_store_ids: [vectorStoreId]
        }
      ],
    });

    console.log('[CHAT] Response received');

    // Extract text from the message output
    let text = '';
    const citations: { file_id: string; filename?: string }[] = [];
    
    const outputs = response?.output ?? [];
    for (const outputItem of outputs) {
      if (outputItem?.type === 'message' && Array.isArray(outputItem.content)) {
        for (const contentPart of outputItem.content) {
          if (contentPart?.type === 'output_text') {
            if (typeof contentPart.text === 'string') {
              text += contentPart.text;
            }
            // Extract citations
            if (Array.isArray(contentPart.annotations)) {
              for (const ann of contentPart.annotations) {
                if (ann?.type === 'file_citation' && ann.file_id) {
                  citations.push({
                    file_id: String(ann.file_id),
                    filename: ann.filename
                  });
                }
              }
            }
          }
        }
      }
    }

    return Response.json({
      conversationId: undefined, // Responses API doesn't use conversation threads
      answer: text,
      citations,
    });
  } catch (err: any) {
    console.error('[CHAT] Error:', err);
    const detail = err?.response?.data ?? err?.message ?? 'Unknown error';
    return Response.json({ error: detail }, { status: 500 });
  }
}


