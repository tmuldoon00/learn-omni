# Plan: Integrate `content/raw/docs` into Regular Search

Objective: Expand the existing site search to include documentation in `content/raw/docs` alongside course content, with high-quality ranking, fast responses, and a clear UI to browse either or both result sets.

## Scope
- Index all Markdown docs in `content/raw/docs` (currently ~210 files ingested for RAG).
- Keep current course search intact; add a docs pipeline and return grouped results.
- Update UI to present tabs/pills for Course and Docs, plus an “All” view.
- No DB. Everything file-based, computed in-process and memoized.

---

## Data Model & Types
- New types
  - `DocSearchable`: `{ slug, title, description, content, headings[], bullets[], keywords[], path }`
  - `DocResult`: `{ slug, title, description, relevanceScore, matchedSnippets[] }`
- Grouped response type for the API
  - `SearchResponse = { course: CourseResult[], docs: DocResult[], summary: { total, courseCount, docsCount } }`

---

## Indexing Strategy
- Source directory: `content/raw/docs`.
- Parsing per file
  - Title = first H1; Description = first paragraph after H1 (trim markdown).
  - Content = entire markdown minus code blocks.
  - Extract `headings[]` (H2/H3) and `bullets[]` lines.
  - `keywords[]` via existing `extractKeyTerms` logic (reuse from `src/lib/search.ts`).
- Slug
  - Reuse `filenameToSlug` (`src/lib/rag.ts`) to map filename → `/docs/[slug]`.
- Memoization
  - Build the docs index once per process in module scope; invalidate only on dev file changes (simple mtime check) to keep queries fast.

---

## Ranking Algorithm (Docs)
- Preprocess query
  - Stemming-lite (normalize plurals/verb forms), synonym expansion (existing `preprocessQuery()` extended).
- Field weights (0–100 composite)
  - Title exact phrase: +40 (scaled by frequency/length)
  - Description: +15
  - H2/H3 match: +20 (boost for exact phrase)
  - Bullets: +10
  - Full content token overlap: +10
  - Keyword overlap: +5
- Phrase boosts
  - Exact phrase boosts over token overlap for title/headings.
- Snippets
  - Prefer heading or bullet-line matches. If none, pick adjacent sentence window around match.
  - Return 2–3 snippets with minimal markdown, ready to highlight on UI.

---

## API Changes (`src/app/api/search/route.ts`)
- Input: `q`, `maxResults`, optional `type=course|docs|all` (default all).
- Output: grouped `course` and `docs` arrays; maintain backward compatibility by allowing old shape when `type=course`.
- Logic
  - Build or read memoized course index (existing).
  - Build or read memoized docs index (new).
  - Run scoring for each; sort desc by score; cap by `maxResults` per group (e.g., default 5 each) and by total when `type=all`.
- Performance
  - Avoid rebuilding indexes per request; memoize lowercased fields.

---

## UI Changes
- `src/components/search/search-bar.tsx`
  - Add optional pills: All (default), Course, Docs. Persist selection in querystring (`type=`).
  - When open dropdown, show mixed previews grouped by label.
- `src/app/search/page.tsx`
  - Tabs/pills to toggle views; each shows its grouped results.
  - Docs result card links to `/docs/[slug]` and shows matched snippets with highlighted terms.
  - Keep course result rendering unchanged; add highlight of matched terms in snippets.

---

## Highlighting
- Client-side: wrap query terms/phrases with `<mark>` in snippets for both groups.
- Handle stemming: highlight canonical and inflected forms.

---

## Edge Cases & Quality
- If both groups are empty → suggest popular queries (dynamic suggestions from top keywords across course + docs) and offer jump to AI chat.
- De-duplication: if a doc and a lesson are near-identical (rare), keep both but show group labels clearly.
- Short queries (<2 chars) → early return with instructions.

---

## Telemetry
- GA4 events: `search_performed` (q, type, courseCount, docsCount), `search_click` (group, slug/id).

---

## Acceptance Criteria
- [ ] `/api/search?q=embedding&type=all` returns grouped results including relevant docs (e.g., external embedding docs) and course lessons.
- [ ] `/search` UI shows tabs/pills; switching updates querystring and results without full reload.
- [ ] Clicking a doc result opens `/docs/[slug]`; clicking a course result opens the lesson.
- [ ] Search remains responsive (<150ms server on warm cache for median queries).

---

## Rollout Plan
1) Implement docs indexer + memoization; unit test slug parsing, title/description extraction.
2) Add docs scoring + snippets; test against representative queries.
3) Extend API to return grouped results; keep backward compatibility.
4) Update UI with tabs/pills and highlighting.
5) Add telemetry; verify in GA4.

---

## Out-of-Scope (Future)
- Learn-to-rank (reorder using click feedback).
- Per-user personalization.
- Cross-linking between course and docs in result cards.

When you approve, I’ll implement steps 1–3 first (indexer, scoring, API), then wire the UI (tabs/highlights).
