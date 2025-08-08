# RAG Integration Plan (OpenAI-Managed Storage Only)

## 1) Executive Summary
- Objective: Add a conversational GPT‑4.1 assistant to LearnOmni that answers user questions grounded in your docs without introducing a database.
- Storage: OpenAI File Search (managed vector store). No self-hosted DB or embeddings.
- UX: A streaming chat UI with citations to your docs and optional topic filters.
- Delivery: Scripts to sync `content/raw/docs` into OpenAI; Next.js API route for chat; a `/chat` page; observability, guardrails, and acceptance tests.

---

## 2) Final Codebase Evaluation (Readiness & Constraints)
- Framework: Next.js 15 (App Router). Pages at `src/app/*`. Server Components with Client Components extracted where necessary.
- Content model: File-based. Chapters/lessons in `content/chapters/*` and additional docs in `content/raw/docs` (your target RAG corpus).
- Search: Custom search already exists; RAG will be additive, not a replacement.
- Styling/UX: Tailwind with custom small-radius theme; consistent brand assets (favicon, OG, manifest) already set.
- SEO: Implemented (sitemap, robots, JSON-LD, Open Graph, metadata helpers).
- Known build caveat: A Next.js prerender error exists in some lesson routes (“Event handlers cannot be passed to Client Component props”). This is unrelated to the RAG feature, but it can block production builds until addressed. Mitigation listed in Risks.
- Linting: Some rules are set to warn. Node scripts use `require()`—OK for scripts since they are not part of the app bundle.

Conclusion: The codebase is ready to add an OpenAI-powered chat without schema/data changes. RAG components can be isolated in a new API route and page, independent of existing pages.

---

## 3) Requirements & Constraints
- No database; all retrieval storage in OpenAI File Search.
- Scope: ingest all of `content/raw/docs` (you can later narrow via metadata filters).
- Must provide source citations; avoid hallucinations; degrade gracefully when no matches.
- Keep costs predictable; stream responses; limit top‑k retrieved docs; allow optional topic filters to improve precision.

---

## 4) Solution Overview
- Ingestion: A sync script scans `content/raw/docs`, computes hashes, and upserts changed files into a single OpenAI vector store (e.g., `learnomni-docs`).
- Retrieval: Server calls OpenAI Responses API with tools: `file_search` referencing the vector store; GPT‑4.1 synthesizes answers with citations.
- Conversation: Use OpenAI’s conversation ID; store it in browser `localStorage` and pass it to the server—no DB needed.
- UI: Minimal chat interface at `/chat` with streaming output, citations, and optional scope chips (e.g., Visualization, Sharing, Querying, Modeling, AI).

---

## 5) Data Ingestion & Sync Details
- Source directory: `content/raw/docs` (markdown). You provided a comprehensive list of files.
- Upload strategy: Send raw `.md` files to OpenAI; attach file-level metadata:
  - `path` (relative), `category` (derived from filename prefix), `title` (first H1), `slug` (filename), optional `tags`.
- Chunking: Start with OpenAI defaults. Later, if needed, add a markdown-aware pre-split (H2/H3 boundaries, 800–1200 tokens, cap ~1500) while preserving code blocks.
- Idempotency: Hash content to upsert only changed files; remove deleted files from the store.

Scripts to add:
- `scripts/docs-ensure-store.ts` → creates vector store (prints `OPENAI_VECTOR_STORE_ID`).
- `scripts/docs-sync-openai.ts` → upserts/deletes files by hash.
- `scripts/docs-smoke-test.ts` → runs test queries and prints retrieved files + scores.

Environment variables:
- `OPENAI_API_KEY`
- `OPENAI_VECTOR_STORE_ID` (output of ensure-store)

---

## 6) Conversational Answering Flow
- Request: Client POSTs `{ message, conversationId?, filters? }` to `/api/chat`.
- Server:
  - Preferred: Call `responses.create` with `model: "gpt-4.1"` and tools: `[{ type: "file_search" }]`, wiring the store via `tool_resources.file_search.vector_store_ids`.
  - If your SDK does not support `tool_resources` on Responses yet, fallback to Assistants API: create an assistant with `model: "gpt-4.1"`, `tools: [{ type: "file_search" }]`, and `tool_resources.file_search.vector_store_ids = [OPENAI_VECTOR_STORE_ID]`, then run a thread.
  - Optional tool parameters: limit retrieved docs (e.g., 6–8), apply metadata filters if provided.
  - Stream tokens back to the client.
- Response rendering:
  - Render assistant text incrementally (stream).
  - Parse citations from the response (OpenAI includes file hits); show source title and a link mapped from metadata.
  - Preserve and pass `conversationId` for continuity.

---

## 7) Security, Cost, and Observability
- Secrets only on server. No PII in docs. CORS restricted to your domain.
- Cost controls: limit retrieved docs, enable short answers where appropriate, cache last N Q/As client-side (optional).
- Logging (server): query text length, retrieved doc ids, token usage, response time.
- Rate limiting (optional): IP- or session-level guard for `/api/chat`.

---

## 8) Risks & Mitigations
- Build error (unrelated to RAG): Next.js prerender error about event handlers passed to client components.
  - Mitigation: Ensure interactive pieces are in Client Components and not passed across Server boundaries; audit lesson pages gradually. This won’t block RAG if `/chat` and `/api/chat` are isolated and compile cleanly.
- Retrieval precision: Some long or example-heavy docs may dilute relevance.
  - Mitigation: Introduce metadata filters (by category), and consider custom chunking if evaluation shows drift.
- Hallucinations: GPT may answer beyond retrieved docs.
  - Mitigation: System prompt requires citations; if retrieval weak, answer with “not found” and suggest related topics.

---

## 9) Deliverables
- Scripts
  - `scripts/docs-ensure-store.ts`
  - `scripts/docs-sync-openai.ts`
  - `scripts/docs-smoke-test.ts`
- API Route
  - `src/app/api/chat/route.ts` (Responses API + file_search, streaming SSE)
- UI
  - `src/app/chat/page.tsx` (chat, citations, filters)
- Config & Docs
  - `.env.example` updates
  - Short README section: how to sync docs and run the chat locally

---

## 10) Acceptance Criteria
- [ ] All files in `content/raw/docs` are uploaded to OpenAI and retrievable.
- [ ] Chat answers stream and include at least one citation for grounded replies.
- [ ] Empty/low-confidence retrieval yields a polite fallback with suggestions.
- [ ] Optional: filter chips narrow retrieval by category with measurable precision gains.
- [ ] No database introduced; conversation continuity maintained via OpenAI conversation ID.

---

## 11) Rollout Plan & Timeline
- Day 1: Create vector store, implement `docs-ensure-store`, first sync; wire `/api/chat`.
- Day 2: Build `/chat` UI with streaming, citations, conversation continuity.
- Day 3: Add filters and smoke tests; adjust prompts and retrieval limits.
- Day 4: Evaluate on a curated question set; iterate chunking/filters if needed.
- Day 5: Production deploy and monitor; document operator runbook.

---

## 12) Operator Runbook (No DB)
- First-time setup:
  - Set `OPENAI_API_KEY`.
  - Run `docs-ensure-store` and set `OPENAI_VECTOR_STORE_ID`.
  - Run `docs-sync-openai` to upload all docs.
- Updating docs:
  - Edit files in `content/raw/docs`.
  - Run `docs-sync-openai` (upserts changes, prunes deleted).
- Verifying retrieval:
  - Run `docs-smoke-test` (prints top hits for sample queries).

---

## 13) Future Enhancements
- Pre-chunk markdown by headings for finer-grained retrieval on large documents.
- Add inline quote snippets in answers.
- Per-user chat transcripts (client-side export or serverless encrypted store, if desired later).
- Admin dashboard: ingestion status, token usage, top queries.

---

## 14) Next Actions (Needed from You)
- Confirm full inclusion of `content/raw/docs` (or note any subfolders to exclude).
- Provide OpenAI API key and enable GPT‑5 + File Search.
- Approve the `/chat` route and simple UI design (square corners, brand-aligned, minimal).

Once approved, I will implement the scripts, API, and UI as outlined above—using OpenAI-managed storage only, with no database introduced. 