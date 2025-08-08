#!/usr/bin/env node
/* Runs a few retrieval queries and prints top hits (path, score) for sanity. */
require('dotenv').config({ path: '.env.local' });

(async () => {
  try {
    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    if (!process.env.OPENAI_API_KEY) {
      console.error('Error: OPENAI_API_KEY is not set.');
      process.exit(1);
    }
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
    if (!vectorStoreId) {
      console.error('Error: OPENAI_VECTOR_STORE_ID is not set.');
      process.exit(1);
    }

    const assistantsApi = client.beta?.assistants;
    const threadsApi = client.beta?.threads;
    if (!assistantsApi || !threadsApi) {
      console.error('Error: Assistants API not available in this SDK version.');
      process.exit(1);
    }

    // Create a temporary assistant wired to the vector store for file_search
    const assistant = await assistantsApi.create({
      name: 'LearnOmni RAG Smoke Tester',
      model: 'gpt-4.1',
      tools: [{ type: 'file_search' }],
      tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
    });

    const queries = [
      'How do I set up connections and manage environments?',
      'What are the options for embedding dashboards externally?',
      'How do permissions and user groups work?',
      'How do I configure chart axes and series?',
      'How does AI query generation work?' ,
    ];

    for (const q of queries) {
      const thread = await threadsApi.create({});
      await threadsApi.messages.create(thread.id, {
        role: 'user',
        content: q,
      });
      const run = await threadsApi.runs.createAndPoll(thread.id, {
        assistant_id: assistant.id,
      });
      if (run.status !== 'completed') {
        console.log(`\nQuery: ${q}`);
        console.log(`  Run status: ${run.status}`);
        continue;
      }
      const messages = await threadsApi.messages.list(thread.id, { limit: 10, order: 'desc' });
      const assistantMsg = messages.data.find((m) => m.role === 'assistant');
      const text = extractText(assistantMsg) || '';
      console.log(`\nQuery: ${q}`);
      console.log('  Answer snippet:', text.slice(0, 200).replace(/\n/g, ' '), text.length > 200 ? '...' : '');
    }

    // Cleanup assistant
    try { await assistantsApi.del(assistant.id); } catch {}
  } catch (err) {
    console.error(err?.response?.data ?? err);
    process.exit(1);
  }
})();

async function waitForRunCompletion(threadsApi, threadId, runId, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const run = await threadsApi.runs.retrieve(threadId, runId);
    if (['completed', 'failed', 'cancelled', 'expired'].includes(run.status)) return run;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return { status: 'timeout' };
}

function extractText(message) {
  if (!message?.content?.length) return '';
  const first = message.content.find((c) => c.type === 'output_text' || c.type === 'text' || c.text);
  if (!first) return '';
  if (first.type === 'text' && first.text?.value) return first.text.value;
  if (first.type === 'output_text' && first.output_text) return first.output_text;
  if (first.text) return String(first.text);
  return '';
}


