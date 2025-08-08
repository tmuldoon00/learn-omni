## Phased Delivery Checklist (RAG with OpenAI-Managed Storage)

Use this as a gated plan. Do not proceed to the next phase until all acceptance checks are green.

### Phase 0 — Project Prep (Local + Vercel)
- [ ] Ensure single lockfile is used (prefer the project lockfile):
  - [ ] Remove any stray lockfiles outside the project that Next might pick up (e.g., `/Users/<you>/package-lock.json`).
  - [ ] Keep the project lockfile at `package-lock.json`.
- [ ] Install deps and verify dev build
  - [ ] `npm ci` (or `npm install`)
  - [ ] `npm run dev` loads without runtime errors
- [ ] Add environment variables
  - [ ] `OPENAI_API_KEY` in `.env.local` and Vercel Project Settings
- [ ] Confirm scope for ingestion
  - [ ] Include all of `content/raw/docs`
  - [ ] (Optional) List any subfolders to exclude

Acceptance checks
- [ ] `npm run dev` starts cleanly (no critical errors)
- [ ] Only one lockfile used in logs (no "Found multiple lockfiles" warning)
- [ ] Environment variables present locally and in Vercel

---

### Phase 1 — Vector Store Creation
- [ ] Implement `scripts/docs-ensure-store.ts`
  - **Goal**: Create (or get) a single OpenAI vector store and print its ID
- [ ] Run the script and capture the ID
  - [ ] Set `OPENAI_VECTOR_STORE_ID` in `.env.local` and Vercel

Acceptance checks
- [ ] Running `node scripts/docs-ensure-store.ts` prints a valid `OPENAI_VECTOR_STORE_ID`
- [ ] ID is saved in `.env.local` and Vercel

---

### Phase 2 — Docs Sync (Upload/Upsert/Prune)
- [ ] Implement `scripts/docs-sync-openai.ts`
  - [ ] Read `content/raw/docs` recursively
  - [ ] Compute stable content hash per file
  - [ ] Upload new/changed files with metadata (path, title, category)
  - [ ] Prune deleted files from vector store
- [ ] Add npm script: `"sync:docs": "node scripts/docs-sync-openai.ts"`
- [ ] Run initial sync

Acceptance checks
- [ ] First run uploads expected number of files (sane count)
- [ ] Second run is idempotent (0 uploads/0 deletes reported)

---

### Phase 3 — Retrieval Smoke Tests
- [ ] Implement `scripts/docs-smoke-test.ts`
  - [ ] Prepare a small set (5–10) of representative queries
  - [ ] For each, print top hits (path, score)
- [ ] Add npm script: `"test:rag:smoke": "node scripts/docs-smoke-test.ts"`
- [ ] Run smoke tests

Acceptance checks
- [ ] For each query, at least one relevant doc appears in top 3 hits
- [ ] No script errors; output shows files and scores

---

### Phase 4 — API: `/api/chat` (Streaming + File Search)
- [ ] Implement `src/app/api/chat/route.ts`
  - [ ] Use OpenAI Responses API with `model: "gpt-5"`
  - [ ] Enable `file_search` tool with `OPENAI_VECTOR_STORE_ID`
  - [ ] Support optional filters in request body
  - [ ] Stream tokens to client (SSE or fetch streaming)
  - [ ] Include citations from tool outputs in response payload
- [ ] Add basic error handling and input validation

Acceptance checks
- [ ] `curl`/Postman request to `/api/chat` streams tokens
- [ ] Response includes at least one citation for grounded answers
- [ ] Graceful error messages on invalid input or OpenAI errors

---

### Phase 5 — UI: `/chat` (Client Streaming + Citations)
- [ ] Implement `src/app/chat/page.tsx`
  - [ ] Client chat box with submit + enter handling
  - [ ] Render streamed assistant text incrementally
  - [ ] Show citations list with clickable sources (derived from metadata)
  - [ ] Store `conversationId` in `localStorage` and send with each request
  - [ ] Apply minimal, square-corner styling consistent with site
- [ ] Add (optional) quick topic chips that map to vector store filters

Acceptance checks
- [ ] Manual test: Asking course-relevant questions yields grounded, cited answers
- [ ] Citation links open the correct docs (or canonical routes) in a new tab
- [ ] Conversation persists across page reload via `conversationId`

---

### Phase 6 — Guardrails, Errors, and Rate Limit
- [ ] Prompting: require citations; instruct model to avoid guesses
- [ ] Empty/low-confidence retrieval → polite fallback with suggestions
- [ ] Add server-side logging (request size, retrieved doc IDs, latency, token usage)
- [ ] (Optional) Add IP/session rate limit for `/api/chat`

Acceptance checks
- [ ] Induced failures (bad key, network) are handled and surfaced to UI politely
- [ ] When retrieval is weak, model declines with helpful alternatives
- [ ] Logs show expected fields with no sensitive data

---

### Phase 7 — Evaluation & Tuning
- [ ] Create an evaluation set (≥20 canonical user questions)
- [ ] Measure: response latency, token usage, citation presence, answer quality
- [ ] Tune parameters
  - [ ] Retrieval limit (e.g., 6–8)
  - [ ] Temperature (start low)
  - [ ] (Optional) Markdown-aware chunking if precision needs improvement

Acceptance checks
- [ ] ≥90% answers include at least one correct citation
- [ ] Median latency within target (define acceptable seconds)
- [ ] Quality bar met for representative scenarios (manual spot-check)

---

### Phase 8 — Production Readiness & Deploy
- [ ] Set env vars in Vercel (API key, vector store ID)
- [ ] Build passes locally and in CI (no blocking Next.js errors)
- [ ] Verify serverless memory/time budgets for `/api/chat`
- [ ] Deploy preview → QA → production
- [ ] Monitor logs and token usage post-deploy

Acceptance checks
- [ ] Live `/chat` works with streaming and citations
- [ ] No auth/secret leaks; cost is within projection
- [ ] 95th percentile latency within acceptable threshold

---

### Phase 9 — Documentation & Handoff
- [ ] Update `README.md` with a Quick Start for RAG
- [ ] Add `.env.example` entries for RAG
- [ ] Reference `RAG_IMPLEMENTATION_PLAN.md` and this checklist
- [ ] Short operator runbook (sync docs, smoke test, common errors)

Acceptance checks
- [ ] A new contributor can follow docs to sync and run chat locally in <30 minutes
- [ ] All links and scripts in docs are correct and runnable

---

### Notes / Non-Blocking Items
- Next.js build caveat: If you encounter "Event handlers cannot be passed to Client Component props" on unrelated pages, isolate interactive UI into Client Components and avoid passing `onClick` into Server Components. Track fixes in a separate issue so RAG delivery is not blocked.
