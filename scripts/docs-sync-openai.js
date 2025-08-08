#!/usr/bin/env node
/* Syncs content/raw/docs to OpenAI Vector Store: upsert new/changed, prune deleted. */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function main() {
  const { default: OpenAI } = await import('openai');
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY is not set.');
    process.exit(1);
  }
  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
  if (!vectorStoreId) {
    console.error('Error: OPENAI_VECTOR_STORE_ID is not set. Run ensure:store first.');
    process.exit(1);
  }

  const vectorStoresApi = client.vectorStores ?? client.beta?.vectorStores;
  if (!vectorStoresApi) {
    console.error('Error: Vector Stores API not available in this OpenAI SDK version.');
    process.exit(1);
  }

  const docsRoot = path.join(process.cwd(), 'content', 'raw', 'docs');
  if (!fs.existsSync(docsRoot)) {
    console.error(`Error: docs folder not found at ${docsRoot}`);
    process.exit(1);
  }

  const files = listMarkdownFiles(docsRoot);
  const localIndex = files.map((absPath) => {
    const rel = path.relative(docsRoot, absPath);
    const content = fs.readFileSync(absPath, 'utf8');
    const hash = sha256(content);
    const title = extractTitle(content) || path.basename(rel);
    const category = deriveCategoryFromFilename(rel);
    const filename = path.basename(rel);
    return { absPath, rel, title, category, hash, filename };
  });

  // Manifest-based change detection (no remote metadata available)
  const MANIFEST_PATH = path.join(process.cwd(), '.openai-docs-manifest.json');
  const manifest = fs.existsSync(MANIFEST_PATH)
    ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
    : {};

  // Fetch existing vector store file associations
  const existingAssoc = await listAllVectorStoreFiles(vectorStoresApi, vectorStoreId);
  const existingByFileId = new Map(existingAssoc.map((a) => [a.id, a]));
  // Build a set of existing filenames in the store by retrieving file objects
  const existingFilenames = new Map(); // filename -> vectorStoreFileId
  for (const assoc of existingAssoc) {
    try {
      const f = await client.files.retrieve(assoc.file_id ?? assoc.id);
      if (f?.filename) existingFilenames.set(f.filename, assoc.id);
    } catch {}
  }

  const toUpload = [];
  const toKeepIds = new Set();

  for (const entry of localIndex) {
    const prevHash = manifest[entry.filename];
    if (prevHash !== entry.hash) {
      toUpload.push(entry);
    } else {
      const assocId = existingFilenames.get(entry.filename);
      if (assocId) toKeepIds.add(assocId);
    }
  }

  const uploadResults = [];
  for (const entry of toUpload) {
    const file = await client.files.create({
      file: fs.createReadStream(entry.absPath),
      purpose: 'assistants',
    });
    const added = await vectorStoresApi.files.create(vectorStoreId, {
      file_id: file.id,
    });
    uploadResults.push({ rel: entry.rel, id: added.id });
    // update manifest
    manifest[entry.filename] = entry.hash;
  }

  // Determine files to prune (in store but not in local set by filename)
  const localFilenameSet = new Set(localIndex.map((e) => e.filename));
  const toDelete = [];
  for (const [filename, assocId] of existingFilenames.entries()) {
    if (!localFilenameSet.has(filename)) toDelete.push({ assocId, filename });
  }
  const deleteResults = [];
  for (const f of toDelete) {
    await vectorStoresApi.files.del(vectorStoreId, f.assocId);
    deleteResults.push(f.assocId);
    // clean manifest in case of stale entry
    delete manifest[f.filename];
  }

  // Persist manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  console.log(JSON.stringify({
    status: 'ok',
    uploaded: uploadResults.length,
    deleted: deleteResults.length,
    kept: toKeepIds.size,
    details: { uploaded: uploadResults, deleted: deleteResults }
  }, null, 2));
}

function listMarkdownFiles(root) {
  const out = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      const stat = fs.statSync(p);
      if (stat.isDirectory()) walk(p);
      else if (name.toLowerCase().endsWith('.md')) out.push(p);
    }
  }
  walk(root);
  return out;
}

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function extractTitle(markdown) {
  const m = markdown.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function deriveCategoryFromFilename(relPath) {
  const lower = relPath.toLowerCase();
  // Example mapping by filename prefix
  // e.g., docs_ai_*, docs_API_*, docs_connections_*
  const parts = path.basename(relPath).split('_');
  if (parts.length > 1) return parts[1];
  return 'general';
}

async function listAllVectorStoreFiles(api, vectorStoreId) {
  const out = [];
  let after = undefined;
  while (true) {
    const page = await api.files.list(vectorStoreId, { after, limit: 100 });
    out.push(...(page?.data ?? []));
    if (!page?.has_more) break;
    after = page?.last_id;
  }
  return out;
}

main().catch((err) => {
  console.error(err?.response?.data ?? err);
  process.exit(1);
});


