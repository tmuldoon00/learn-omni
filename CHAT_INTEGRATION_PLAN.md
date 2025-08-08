# Chat Integration Plan (UI/UX + App Wiring)

Goal: Turn the working `/chat` prototype into a first‑class feature that looks/feels like LearnOmni, integrates with navigation, supports streaming, and provides clean citations that open within the app.

## Phase A — Visual + UX Alignment
- [ ] Header & navigation
  - [ ] Add a top‑nav link to `/chat` labeled “AI Assistant” (or “Docs Chat”).
  - [ ] Ensure active state matches other nav items.
- [ ] Page shell
  - [ ] Use site layout spacing (`max-w-5xl` on large screens, `max-w-3xl` for chat body).
  - [ ] Apply Tailwind radius tokens (rounded) per `tailwind.config.ts` custom radii.
  - [ ] Use existing brand palette + typography (globals.css).
- [ ] Message bubbles
  - [ ] Reuse utility styles/patterns used across cards/inputs.
  - [ ] Distinguish roles: user (brand accent bg) vs assistant (neutral bg). 
  - [ ] Preserve code blocks and lists (render markdown with `react-markdown` + `remark-gfm`).
- [ ] Input bar
  - [ ] Match search bar sizing and style from homepage (icon, placeholder style).
  - [ ] Disable while sending; show loading state.
  - [ ] Add keyboard hint (Enter to send).

Acceptance
- [ ] Visual parity with rest of app (corners, spacing, fonts, palette).
- [ ] Code/markdown in answers renders correctly (no overflow issues).

## Phase B — Citations UX + In‑App Docs Viewer
- [ ] Citation chips under each assistant message (up to 5)
  - [ ] Show file title/short name.
  - [ ] Click opens in a new `/docs/[slug]` route within the app.
- [ ] Add `/docs/[slug]` route
  - [ ] Source: `content/raw/docs/*.md`.
  - [ ] Map filename → slug (e.g., `docs_embed_external-embedding.md` → `embed-external-embedding`).
  - [ ] Render with `react-markdown` + `remark-gfm`; add table of contents (optional).
  - [ ] SEO: `generateMetadata` with title/description (first H1/first paragraph).
- [ ] File ID to slug mapping
  - [ ] On citation, resolve OpenAI file metadata to filename.
  - [ ] Convert filename to slug + link to `/docs/[slug]`.

Acceptance
- [ ] Clicking a citation opens the corresponding doc inside the app.
- [ ] Deep‑links to `/docs/[slug]` render correctly and are crawlable.

## Phase C — Streaming Responses
- [ ] Server
  - [ ] Switch to streaming with the Responses API if your SDK supports `file_search` with `tool_resources`.
  - [ ] Fallback: Assistants SSE (events) → stream tokens to client.
  - [ ] Expose an EventSource/ReadableStream from `/api/chat` for incremental tokens.
- [ ] Client
  - [ ] Render tokens as they arrive; keep cursor at bottom.
  - [ ] Graceful cancel/reset conversation.

Acceptance
- [ ] First token appears under 1.5s on warm path.
- [ ] Full answer streams without UI blocking.

## Phase D — Filters + Hints
- [ ] Topic chips above input (e.g., Connections, Embedding, Permissions, Charts, AI)
  - [ ] When selected, add a filter hint in the prompt (or use metadata filter once available).
- [ ] Suggestions row (small links under input) prefill prompt and submit.

Acceptance
- [ ] Precision improves for scoped queries.
- [ ] Quick suggestions work on click.

## Phase E — Analytics + Telemetry
- [ ] GA4 events
  - [ ] `chat_message_sent` (length, has_filters)
  - [ ] `chat_response` (latency_ms, tokens_in/out)
  - [ ] `chat_citation_clicked` (slug)
- [ ] Server logs
  - [ ] Request size, run status, timing, approximate token counts.
- [ ] Basic rate limit for `/api/chat` (per‑IP/session) to control costs.

Acceptance
- [ ] Events visible in GA4, logs show no PII, costs stable.

## Phase F — Accessibility + Mobile
- [ ] Ensure semantic markup for messages and citations.
- [ ] Keyboard‑only send & navigate.
- [ ] Mobile‑friendly input and scroll (sticky input at bottom).

Acceptance
- [ ] Lighthouse a11y score ≥ 95 on `/chat`.
- [ ] No horizontal scroll on small screens.

## Phase G — SEO + Metadata
- [ ] `/chat` page: `generateMetadata` with clear title/description.
- [ ] `/docs/[slug]`: JSON‑LD Article or DocumentationPage schema (optional).
- [ ] Include `/chat` and `/docs/*` in sitemap route.

Acceptance
- [ ] Pages have canonical URLs and correct Open Graph/Twitter.

## Phase H — Hardening
- [ ] Error states
  - [ ] No key → friendly admin message.
  - [ ] Retriever empty → polite fallback + related links.
  - [ ] Network errors → retry option.
- [ ] Token/length guards in API.
- [ ] Unit tests for slug mapping + markdown rendering.

Acceptance
- [ ] All error states verified manually.
- [ ] Tests pass in CI.

## Implementation Notes (DRY)
- Centralize constants and helpers:
  - `src/lib/rag.ts`: fileId→filename→slug mapping, prompt templates, model constants (`gpt-4.1`).
  - `src/lib/markdown.tsx`: shared `Markdown` component with `react-markdown` + `remark-gfm` and code styles.
  - `src/components/chat/*`: `ChatBubble`, `ChatInput`, `CitationChips`.
- Styling tokens: reuse Tailwind small radii already configured; use existing gray palette.
- Keep assistants ephemeral; persist only `conversationId` client‑side (no DB).

## Rollout Order (Quick Win → Polish)
1) Phase A + B (visual parity, citations + `/docs/[slug]`) — user‑visible improvement.
2) Phase C (streaming) — perceived speed boost.
3) Phase D (filters/hints) — precision boost.
4) Phase E (analytics/rate limit) — ops safety.
5) Phase F–H (a11y, SEO, hardening) — production ready.

## Acceptance Test Pack
- Ask: “How do I do a filter in Omni?”
  - [ ] Answer streams; includes ‘Filters’ details.
  - [ ] At least one citation links to `/docs/...` filter doc.
- Ask: “How do I embed dashboards externally?”
  - [ ] Scoped chip improves relevance; citations to `docs_embed_external-embedding*.md`.
- Mobile view
  - [ ] Input usable; scroll behaves; no layout shift.
- Analytics
  - [ ] Events visible for send/response/citation click.
