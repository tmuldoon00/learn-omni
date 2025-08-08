#!/usr/bin/env node
/* Ensure an OpenAI vector store exists and print its ID. No DB used. */
require('dotenv').config({ path: '.env.local' });

(async () => {
  try {
    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    if (!process.env.OPENAI_API_KEY) {
      console.error('Error: OPENAI_API_KEY is not set. Add it to .env.local and retry.');
      process.exit(1);
    }

    // Prefer reusing an existing store if OPENAI_VECTOR_STORE_ID is set
    const existingId = process.env.OPENAI_VECTOR_STORE_ID;

    // Select vector stores API (supports both stable and beta namespaces)
    const vectorStoresApi = client.vectorStores ?? client.beta?.vectorStores;
    if (!vectorStoresApi) {
      console.error('Error: Vector Stores API not available in this OpenAI SDK version.');
      process.exit(1);
    }

    if (existingId) {
      try {
        const store = await vectorStoresApi.retrieve(existingId);
        console.log(JSON.stringify({ status: 'ok', action: 'reuse', id: store.id, name: store.name }, null, 2));
        return;
      } catch (e) {
        console.warn(`Warning: Could not retrieve existing store ${existingId}. Creating a new one...`);
      }
    }

    const name = `learnomni-docs-${new Date().toISOString().replace(/[:.]/g, '-')}`;
    const created = await vectorStoresApi.create({ name });
    console.log(JSON.stringify({ status: 'ok', action: 'create', id: created.id, name: created.name }, null, 2));
    console.log('\nNext steps:');
    console.log('1) Add OPENAI_VECTOR_STORE_ID to .env.local and Vercel envs:');
    console.log(`   OPENAI_VECTOR_STORE_ID=${created.id}`);
    console.log('2) Run: npm run sync:docs');
  } catch (err) {
    console.error('Failed to ensure vector store.');
    console.error(err?.response?.data ?? err);
    process.exit(1);
  }
})();


