# AI Feature Integration Plan (Modern UI + Homepage Entry + Persistent Widget)

## Goals
- Make the AI chat look/feel like the rest of the app (modern, clean, brand‑consistent).
- Let users start by asking a question on the homepage and then continue in a chat window.
- Provide a persistent, floating AI widget available site‑wide.

## Guiding Principles
- **DRY**: One API route, one render pipeline. `/api/chat` remains the single backend.
- **Single conversation**: Persist `conversationId` in `localStorage`, shared by page and widget.
- **Non‑intrusive**: Widget minimized by default, accessible via FAB (floating action button).
- **Performance**: Stream responses; avoid blocking renders.

---

## Phase 1 — Modernize Chat UI (page)
- Visual updates
  - Replace plain text rendering with Markdown (code blocks, lists, links) using `react-markdown` + `remark-gfm` and existing prose styles.
  - Message bubbles: subtle shadows, brand‑consistent colors, small radii per Tailwind config.
  - Add timestamp, subtle typing indicator when streaming starts.
  - Sticky input at bottom; mobile first layout.
- Citations
  - Render as chips under the assistant message; click → `/docs/[slug]`.
- Empty states
  - Helpful examples as pill buttons (click to prefill + send).

Acceptance
- [ ] UI visually matches site (spacing, corners, typography, palette).
- [ ] Markdown renders cleanly without overflow; code blocks styled.
- [ ] Citations open in‑app docs.

---

## Phase 2 — Homepage Entry Flow
- Homepage ask bar
  - Add “Ask AI about the course…” input near the hero search.
  - On submit, navigate to `/chat` with `?q=...` and auto‑send first message.
  - If a conversation already exists, reuse it; otherwise create new and save `conversationId`.
- CTA
  - Add secondary CTA button “Ask the AI Assistant” linking to `/chat`.

Acceptance
- [ ] Typing a question on homepage takes the user to `/chat` and immediately streams an answer.
- [ ] Repeated usage appends into the same conversation until cleared.

---

## Phase 3 — Persistent Floating Widget
- Component: `ChatWidget` (client)
  - FAB bottom‑right (desktop), bottom‑center (mobile) → opens a drawer/panel.
  - Panel contains the same chat UI as `/chat` (shared components):
    - `ChatMessages`, `ChatInput`, `CitationChips`.
  - Persists minimized/open state and `conversationId` via `localStorage`.
- Integration
  - Inject `ChatWidget` once in `RootLayout` (client‑only dynamic import) so it’s available on all pages.
  - Respect route opt‑outs (optional): hide on specific routes if needed.

Acceptance
- [ ] FAB appears site‑wide; clicking opens chat; ESC or close button minimizes.
- [ ] Widget and `/chat` share the same conversation history.

---

## Phase 4 — Streaming & Responsiveness
- Server
  - Upgrade `/api/chat` to stream tokens (SSE or ReadableStream). If Responses API supports `file_search + tool_resources` streaming in your SDK, use it; otherwise adopt Assistants events or incremental polling.
- Client
  - Incrementally render tokens; smooth auto‑scroll; typing indicator.
- Performance
  - Debounce sends; guard against duplicate posts; error retries with backoff.

Acceptance
- [ ] First token < 1.5s (warm path). Smooth streaming with no layout jank.
- [ ] Cancelling a request stops streaming and frees UI.

---

## Phase 5 — Analytics, Telemetry, Rate Limits
- GA4 events
  - `chat_message_sent` (length, origin: page|widget, has_examples, has_filters)
  - `chat_response` (latency_ms, tokens_in/out)
  - `chat_citation_clicked` (slug)
- Logging (server)
  - Request size, run status, timing, cost signals.
- Basic rate limit
  - Per IP/session for `/api/chat` to control costs.

Acceptance
- [ ] Events visible in GA; logs show expected fields with no PII.
- [ ] Rate limit returns friendly error when exceeded.

---

## Phase 6 — A11y & Polish
- Keyboard support (focus order, Enter to send, ESC to close widget).
- ARIA roles for chat region and live updates.
- Light/dark contrast (if dark mode later).

Acceptance
- [ ] Lighthouse a11y ≥ 95 on `/` and `/chat`.

---

## Shared Components (for DRY)
- `src/components/chat/ChatMessages.tsx`: virtualized list, markdown rendering, citation chips.
- `src/components/chat/ChatInput.tsx`: input + submit + loading/stop.
- `src/components/chat/CitationChips.tsx`: maps filenames → `/docs/[slug]`.
- `src/components/chat/ChatWidget.tsx`: FAB + drawer that composes the above.
- `src/lib/rag.ts`: fileId→filename lookup, `filenameToSlug`, prompt constants, model constant (`gpt-4.1`).

---

## Routing & SEO
- `/chat`: page experience; add `generateMetadata` for SEO (title/description).
- `/docs/[slug]`: already implemented; add to sitemap.
- Widget is non‑indexable UI (no SEO changes needed).

---

## Rollout Order
1) Phase 1 (page UI) — quick visual win.
2) Phase 2 (homepage entry) — discoverability.
3) Phase 3 (widget) — continuous access.
4) Phase 4 (streaming) — responsiveness.
5) Phase 5–6 (analytics, a11y, polish) — production hardening.

---

## Acceptance Test Pack
- Homepage → type a question → lands on `/chat` and streams answer; conversation persists.
- Widget opens anywhere, uses same history as `/chat`.
- Citations open in `/docs/[slug]`; back/forward navigation works.
- Analytics events recorded for send/response/citation.

---

## Dependencies & Env
- No new env variables. Reuses `OPENAI_API_KEY` and `OPENAI_VECTOR_STORE_ID`.

If you approve, I’ll implement Phase 1–2 (UI modernization + homepage entry) first, then Phase 3 (widget).
