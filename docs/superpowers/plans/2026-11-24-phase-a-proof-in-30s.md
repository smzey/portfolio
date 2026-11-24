# Phase A — Proof in 30 Seconds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every visitor see the work within 30 seconds: shareable/indexable site on `phanu.xyz`, a live in-browser SignBridge demo, honest repo links, and demo-video slots.

**Architecture:** Stays a static Next.js 16 site. SignBridge weights are packed once by a Node script into a compact binary under `public/signbridge/`, inferred in a Web Worker by a TypeScript port of the existing pure-JS CNN, and the demo component is lazy-loaded only inside the SignBridge drawer. Videos are plain `<video>` assets referenced from project data.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, `node --test` (Node type-stripping, as `lens.test.mjs` already does), MediaPipe Hands via jsDelivr (pinned), HyperFrames for videos.

**Spec:** `docs/superpowers/specs/2026-11-24-proof-and-vault-upgrade-design.md` (Phase A, §4) — builds on `2026-11-24-web-portfolio-design.md`.

## Global Constraints
- No backend, DB, CMS, auth; static on Vercel.
- Canonical domain: `https://phanu.xyz` (one constant `SITE_URL`).
- Every new visible string has EN + TH (`BilingualText`).
- No horizontal scroll at 375–390 px; dark + light themes.
- Initial-load JS must not grow by more than ~30 KB gzipped; SignBridge model, MediaPipe and videos load only on explicit user action / in-view.
- No fabricated metrics. SignBridge copy states: 43/48 on the on-page samples, 94.8% on the full 7,172-image test set.
- Work on branch `feat/phase-a`; merge to `main` (= production deploy) only at the end of each milestone after `npm test && npx next build` pass.
- No further hero/gyro motion work.

## Review Focus
1. **Camera denied / no camera / insecure context** → webcam mode shows a bilingual message and the sample strip keeps working. (Task 4 test: `startCamera` rejection maps to `'denied' | 'unavailable'` state.)
2. **MediaPipe CDN blocked (corporate network)** → webcam mode reports "hand tracker couldn't load"; sample mode unaffected because the model is self-hosted. (Task 4 test: loader timeout → `'tracker-failed'`.)
3. **Drawer closed or panel scrolled away while camera/worker active** → camera tracks stopped, worker terminated, no console errors. (Task 4 cleanup test on the controller.)
4. **Model fetch fails or is slow** → visible retry button, no infinite spinner. (Task 3 test: `loadModel` rejection → `'error'` state with retry.)
5. **TH toggle while demo open** → all demo copy switches; no hard-coded English. (Task 3/4: copy lives in one `SIGNBRIDGE_COPY: Record<key, BilingualText>` object, test asserts every key has non-empty `en` and `th`.)

---

### Task 1: Domain, sharing & housekeeping (Milestone 1)

**Files:**
- Create: `src/lib/site.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `src/lib/site.test.mjs`
- Modify: `src/app/layout.tsx` (metadata), `src/data/portfolio.ts` (`PROFILE.brand`), `src/components/PortfolioClient.tsx:507-508` (remove phone link), `package.json` (`test` script runs all `src/**/*.test.mjs`)

**Interfaces:**
- Produces: `export const SITE_URL = 'https://phanu.xyz'` and `export const SITE_ROUTES = ['/', '/cv'] as const` in `src/lib/site.ts`.

- [ ] **Step 1: Write failing test** `src/lib/site.test.mjs`:
  - `SITE_URL === 'https://phanu.xyz'` and has no trailing slash.
  - default export of `src/app/sitemap.ts` returns entries whose `url`s equal `['https://phanu.xyz/', 'https://phanu.xyz/cv']`.
  - default export of `src/app/robots.ts` returns `{ rules: { userAgent: '*', allow: '/' }, sitemap: 'https://phanu.xyz/sitemap.xml' }`.
- [ ] **Step 2:** Update `package.json` test script to `node --test "src/**/*.test.mjs"`; run `npm test` → new tests FAIL (module not found).
- [ ] **Step 3:** Implement `site.ts`, `sitemap.ts`, `robots.ts` (use `import type { MetadataRoute } from 'next'` only, so Node type-stripping can load them).
- [ ] **Step 4:** `npm test` → all PASS (lens tests included).
- [ ] **Step 5:** `layout.tsx`: `metadataBase: new URL(SITE_URL)`, `alternates.canonical: '/'`, `twitter.card: 'summary_large_image'`. `opengraph-image.tsx`: `ImageResponse` 1200×630, background `#0b0c0e`, name "Phanu Sawet", role "Full-Stack & On-Device AI Engineer", line "Available · 10-month co-op · Jun 2027 – Mar 2028", emerald `●` dot; `alt` text same as role line.
- [ ] **Step 6:** `PROFILE.brand = 'phanu.xyz'`; delete the `tel:` phone anchor in the footer (keep `PROFILE.phone` field — CV still uses it).
- [ ] **Step 7: Verify** `npx next build` succeeds; `npx next start` then `curl -s localhost:3000/robots.txt`, `/sitemap.xml`, `/opengraph-image` (expect 200, `image/png`), and `curl -s localhost:3000/ | grep -c 'tel:'` → `0`, `grep 'og:image'` → present with `https://phanu.xyz/...`.
- [ ] **Step 8: Commit** `feat(seo): phanu.xyz canonical, OG image, sitemap, robots; drop public phone`.
- [ ] **Step 9 (Phanu, manual):** In Vercel → Project → Domains, add `phanu.xyz` (+ `www` redirect) and set DNS at the registrar as Vercel instructs. Claude verifies with `curl -sI https://phanu.xyz` → 200 after merge.
- [ ] **Step 10: Milestone merge** — `npm test && npx next build`, merge `feat/phase-a` → `main`, push, verify live URLs above on production.

### Task 2: Pack SignBridge model + typed CNN port

**Files:**
- Create: `scripts/pack-signbridge.mjs`, `src/lib/signbridge/cnn.ts`, `src/lib/signbridge/cnn.test.mjs`, `public/signbridge/model.bin`, `public/signbridge/model.meta.json`, `public/signbridge/samples.json`
- Source (read-only): `~/Developer/projects/hackathon_2/public/{cnn.js,model_cnn.json,samples.json}`

**Interfaces:**
- Produces (`src/lib/signbridge/cnn.ts`):
  - `type PackedModel = { classes: string[]; layers: Record<'conv1'|'conv2'|'dense1'|'dense2', { shape: number[]; W: Float32Array; b: Float32Array }>; bn1: BN; bn2: BN }` with `BN = { gamma, beta, mean, var: Float32Array; eps: number }`
  - `decodeModel(meta: ModelMeta, bin: ArrayBuffer): PackedModel` (dequantizes)
  - `predict(model: PackedModel, input: Float32Array /*784, 0..1*/): { letter: string; conf: number; top: { letter: string; p: number }[] }`
  - `type Sample = { label: string; px: number[] /*784, 0..255*/ }`
- `model.meta.json`: `{ classes, encoding: 'int8'|'float16'|'float32', tensors: [{ name, shape, offset, length, scale? }] , testAcc: 94.79 }`

- [ ] **Step 1: Write failing tests** in `cnn.test.mjs` (load `public/signbridge/*` from disk):
  - `decodeModel` + `predict` gives the **same top-1 letter as the original `hackathon_2/public/cnn.js` on all 48 samples** (import the original module by absolute path; skip with a clear message if that path is missing).
  - Exactly 43/48 correct; misclassified labels, in sample order, `['T','K','T','G','U']`.
  - `model.bin` size ≤ 1.5 MB if encoding is `int8`/`float16`.
- [ ] **Step 2:** `npm test` → FAIL (files missing).
- [ ] **Step 3:** Port forward pass from `hackathon_2/public/cnn.js` to `cnn.ts` (same op order: conv→relu→bn→pool ×2, dense+relu, dense, softmax; channels-last layout).
- [ ] **Step 4:** Write `pack-signbridge.mjs <srcDir> <outDir> [--encoding int8|float16|float32]`: per-tensor symmetric int8 (scale = max|w|/127) for conv/dense W; biases and BN params stay float32; writes `model.bin` + `model.meta.json`; copies `samples.json`. Add `"pack:signbridge"` npm script defaulting to `~/Developer/projects/hackathon_2/public`.
- [ ] **Step 5:** Run with `--encoding int8`; `npm test`. If the same-top-1 test fails, rerun `float16`, then `float32`; ship the smallest passing. Record chosen encoding in commit message.
- [ ] **Step 6: Commit** `feat(signbridge): pack CNN weights to <encoding> binary + typed forward pass`.

### Task 3: SignBridge demo — sample mode (Milestone 2a)

**Files:**
- Create: `src/lib/signbridge/worker.ts`, `src/lib/signbridge/client.ts`, `src/lib/signbridge/copy.ts`, `src/lib/signbridge/summary.test.mjs`, `src/components/SignBridgeDemo.tsx`, `src/components/SignBridgeDemo.module.css`
- Modify: `src/components/PortfolioClient.tsx` (drawer: render demo when `activeProject.id === 'signbridge'`, between metric pills and architecture block, via `next/dynamic(..., { ssr: false })`)

**Interfaces:**
- Consumes: `decodeModel`, `predict`, `Sample` (Task 2).
- Produces:
  - `worker.ts` messages: in `{ type: 'load' } | { type: 'predict'; id: number; input: Float32Array }`; out `{ type: 'ready'; encoding: string } | { type: 'result'; id; letter; conf; top; ms } | { type: 'error'; message }`.
  - `client.ts`: `createSignBridgeClient(): { load(): Promise<void>; predict(input: Float32Array): Promise<{ letter; conf; top; ms }>; dispose(): void }` (worker via `new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })`).
  - `copy.ts`: `SIGNBRIDGE_COPY: Record<string, BilingualText>` and `summarizeSamples(results: { label: string; letter: string }[]): { correct: number; total: number; misses: { index: number; label: string; predicted: string }[] }`.

- [ ] **Step 1: Write failing tests** `summary.test.mjs`: `summarizeSamples` on a 3-item fixture → `{ correct: 2, total: 3, misses: [{ index: 1, label: 'T', predicted: 'X' }] }`; every `SIGNBRIDGE_COPY` key has non-empty `en` and `th`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement `copy.ts` (keys at least: `tryLive`, `runsInBrowser`, `samplesMode`, `webcamMode`, `sampleStat` ("43 / 48 correct on these samples · 94.8% on the full 7,172-image test set"), `missLabel` ("Model got this wrong — predicted {x}"), `loading`, `retry`, `loadFailed`).
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Implement worker, client, `SignBridgeDemo` sample mode: collapsed "Try it live — runs in your browser" button; on tap → load model (spinner; on failure → `loadFailed` + `retry`), render 48 thumbnails (28×28 canvases, upscaled, `image-rendering: pixelated`); tapping one shows predicted letter, confidence %, ms, true label; misses get a muted red outline and `missLabel`. Header shows `sampleStat`. Dispose client on unmount.
- [ ] **Step 6: Verify** `npx next build`; check build output that the main page JS did not grow > 30 KB gzipped vs. Milestone 1 (compare `.next` route sizes printed by build). Manually in `next dev`: open SignBridge drawer at 390 px and 1440 px, both themes, EN/TH; Network tab shows no `model.bin` request until tap; tapping all 48 yields 43 correct.
- [ ] **Step 7: Commit** `feat(signbridge): live in-browser demo — sample mode`.

### Task 4: SignBridge demo — webcam mode (Milestone 2b)

**Files:**
- Create: `src/lib/signbridge/camera.ts`, `src/lib/signbridge/camera.test.mjs`
- Modify: `src/components/SignBridgeDemo.tsx`, `src/lib/signbridge/copy.ts`

**Interfaces:**
- Consumes: `createSignBridgeClient` (Task 3).
- Produces (`camera.ts`):
  - `cropBox(landmarks: { x: number; y: number }[], margin: number): { cx; cy; half }` (normalized 0..1, square, same math as `hackathon_2/public/app.js:111-125`)
  - `toModelInput(rgba: Uint8ClampedArray /*28*28*4*/): Float32Array` (luma 0.299/0.587/0.114, per-frame contrast stretch to 0..1 — as `app.js:136-149`)
  - `loadHandTracker(timeoutMs = 8000): Promise<HandsCtor>` — injects pinned `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.js`; rejects `'tracker-failed'` on error/timeout.
  - `type CamState = 'idle' | 'starting' | 'live' | 'denied' | 'unavailable' | 'tracker-failed'`; `mapCameraError(err: unknown): CamState` (`NotAllowedError`/`SecurityError` → `'denied'`, everything else → `'unavailable'`).

- [ ] **Step 1: Write failing tests** `camera.test.mjs`: `cropBox` of landmarks spanning x∈[0.4,0.6], y∈[0.3,0.7] with margin 0.2 → `{ cx: 0.5, cy: 0.5, half: 0.24 }`; `toModelInput` on a 2-value fixture image maps min→0, max→1; uniform image doesn't divide by zero (all 0); `mapCameraError({ name: 'NotAllowedError' })` → `'denied'`, `({ name: 'NotFoundError' })` → `'unavailable'`.
- [ ] **Step 2:** `npm test` → FAIL. **Step 3:** implement. **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Add "Use webcam" toggle in `SignBridgeDemo`: `getUserMedia({ video: { facingMode: 'user' } })` → MediaPipe → crop → `toModelInput` → client.predict (throttle to ≤ 10 Hz) → large live letter + top-3 bars; small reference card of letters to try; honesty note (new copy keys `webcamNote`: plain background + good light, J/Z excluded; `denied`, `unavailable`, `trackerFailed`). On any failure state, show message and keep sample mode usable.
- [ ] **Step 6:** Cleanup: stop all `MediaStreamTrack`s and the frame loop when the toggle turns off, the drawer closes (unmount), or the panel leaves the viewport (`IntersectionObserver`, threshold 0).
- [ ] **Step 7: Verify** in `next dev` on desktop Chrome + Safari and on a phone via LAN/preview deploy: deny camera → `denied` message; allow → live letters; close drawer → camera indicator light turns off; DevTools block `cdn.jsdelivr.net` → `trackerFailed` message, sample mode still works.
- [ ] **Step 8: Commit** `feat(signbridge): opt-in webcam mode with MediaPipe + safe teardown`.
- [ ] **Step 9: Milestone merge** (as Task 1 Step 10); verify on production phone + desktop.

### Task 5: Repo links — KhaiDee v2 public, others "on request" (Milestone 3)

**Files:**
- Modify: `src/data/portfolio.ts` (KhaiDee `repoUrl`), `src/components/PortfolioClient.tsx:608-612` (fallback label), `src/lib/signbridge/copy.ts` → no; add `CODE_ON_REQUEST: BilingualText` to `src/data/portfolio.ts`
- Create: `src/data/portfolio.test.mjs`

- [ ] **Step 1: Secret scan** `~/Developer/projects/khaidee-v2` full history: `gitleaks detect --source ~/Developer/projects/khaidee-v2 --log-opts="--all"` (install via `brew install gitleaks` if missing) plus `git -C … log --all --name-only | grep -iE '\.env|secret|key|credential'`. **Any finding → stop, report to Phanu, do not proceed.**
- [ ] **Step 2 (Phanu, manual):** if clean, Phanu makes `smzey/khaidee-v2` public (GitHub → Settings → Change visibility). Claude verifies `curl -s -o /dev/null -w '%{http_code}' https://github.com/smzey/khaidee-v2` → `200`.
- [ ] **Step 3: Write failing test** `portfolio.test.mjs`: projects with `repoUrl` are exactly `['signbridge','khaidee-v2','farmhouse']` (set comparison); every `repoUrl` starts with `https://github.com/smzey/`; `CODE_ON_REQUEST` has `en` and `th`.
- [ ] **Step 4:** `npm test` → FAIL. **Step 5:** set KhaiDee `repoUrl: 'https://github.com/smzey/khaidee-v2'`; fix Farmhouse URL to `https://github.com/smzey/farmhouse-map-dc` if not already; in drawer render `CODE_ON_REQUEST[lang]` (ghost style, links to `mailto:` primary email) when `repoUrl` is absent. **Step 6:** `npm test` → PASS.
- [ ] **Step 7: Commit + milestone merge**; on production `curl` every `repoUrl` → 200.

### Task 6: Video slots + shot list (Milestone 4, repeats per video)

**Files:**
- Create: `src/components/ProjectVideo.tsx`, `docs/superpowers/plans/2026-11-24-demo-shot-list.md`, `public/videos/<id>.{mp4,webm,jpg}` (as they arrive)
- Modify: `src/data/portfolio.ts` (`ProjectCaseStudy.video?: { mp4: string; webm: string; poster: string; caption: BilingualText }`), `src/data/portfolio.test.mjs`, `PortfolioClient.tsx` (drawer top + card thumbnail)

**Interfaces:**
- Produces: `<ProjectVideo video={...} lang={lang} />` — `muted playsInline loop preload="none" poster=...`; plays when ≥ 50% in view, pauses otherwise; under `prefers-reduced-motion: reduce` never autoplays (poster + play button).

- [ ] **Step 1:** Write the shot list doc: per project, 30–60 s recording script (which screen, which action, which metric to show on screen), recording settings (1920×1080 or 1080×1350, no personal data/tokens visible, no real patient data for Jaidee). Hand to Phanu.
- [ ] **Step 2: Write failing test** (extend `portfolio.test.mjs`): for every project with `video`, the three files exist under `public/`, mp4 and webm ≤ 2 MB each, caption has `en` + `th`.
- [ ] **Step 3:** Implement `ProjectVideo` and wiring; projects without `video` render nothing (no empty slot).
- [ ] **Step 4 (per recording received):** load the `hyperframes` skill; build a 15–30 s captioned loop stating only the project's existing `metricBadge` facts; render H.264 MP4 + WebM ≤ 2 MB + poster JPG into `public/videos/`; add `video` to the project.
- [ ] **Step 5:** `npm test && npx next build`; verify in browser that videos make no network request until scrolled into view, and reduced-motion shows the poster only.
- [ ] **Step 6: Commit + merge** per batch of videos.

---

## Self-review notes
- Spec coverage: A1 → Task 1; A2 → Tasks 2–4; A4 → Task 5; A3 → Task 6. Optional LinkedIn reel excluded per spec §7.
- Phase B (vault pipeline + hackathon timeline) gets its own plan after Milestone 2.
