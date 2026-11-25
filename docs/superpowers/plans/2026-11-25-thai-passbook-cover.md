# Thai Passbook Cover & Silent Edition System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform `phanu.xyz` into a physical Thai banking passbook (*สมุดคู่ฝาก*) opening from a realistic rounded-corner closed cover into an authentic inside-cover account plate and numbered dot-matrix ledger, with silent company-triggered cover colorways for Thai banks (KBTG, SCB, Krungsri, BBL, KTB, ttb) and NVIDIA/PTT.

**Architecture:** Separate visual cover colorways (`PassbookEdition`: neutral color IDs `navy | emerald | violet | gold | obsidian | marine | cobalt | sky | frost`) from project filtering (`FocusLens`), resolving both from URL params without ever rendering target company names in the visible UI. Keep the open passbook mounted inside `hidden={!isOpen}` for SEO and SignBridge Web Worker preservation, paired with a tiny pre-paint `<head>` script in `layout.tsx` that sets `data-edition` and `data-start-open` before hydration.

**Tech Stack:** Next.js 16 (App Router, Turbopack, static output), React 19, TypeScript, CSS Modules + CSS custom properties, `node:test` (native Node TypeScript stripping).

**Spec:** `docs/superpowers/specs/2026-11-25-thai-passbook-cover-design.md`

## Global Constraints

- Work on a dedicated feature branch `feat/thai-passbook-cover` — NEVER commit directly to `main` (`main` auto-deploys to Vercel production).
- Static site only: zero backend, database, CMS, auth, or server-side AI; all routes in `npx next build` stay `○ (Static)`.
- Zero third-party trademarked logos and ZERO target company names (`KBTG`, `Kasikorn`, `SCB`, `Krungsri`, `Bangkok Bank`, `Krungthai`, `ttb`, `NVIDIA`, `PTT`) in any visible UI string, cover badge, or `aria-label`.
- Bilingual EN / TH parity for every visible string in `src/data/ui.ts`; Thai is never letter-spaced or uppercased.
- Verified facts only: Major GPA 3.56 · Cum 3.42; 358 tests (172 domain + 186 API); SignBridge 94.8% test / 43/48 on-page / 6 of 8 hero hands; account ID `672-1-10052-0` (CMU student ID); never put phone number on public web pages.
- WCAG 2.2 AA contrast (≥ 4.5:1) on every cover edition in both Day and Desk-Lamp Dark modes; paper surfaces always stay mint security paper with dark carbon-blue ink.
- Zero horizontal scroll on 375–390 px phones in both EN and TH, both closed and open; touch targets ≥ 44 px.
- Files imported by `node:test` must use `import type` for type-only imports and `.ts` extensions on relative imports.
- Respect `@media (prefers-reduced-motion: reduce)` (`0ms` cover-open transition, no scroll-jacking).

## Review Focus

1. **Generic lens URLs must never leak a company cover:** Visiting `/?lens=fintech`, `/?lens=ai`, or `/?lens=systems` must resolve to `navy` (default), NOT `emerald`/`obsidian`/`marine`.
2. **Switching lens inside an open company-themed book must preserve the cover without leaking a company name:** A visitor arriving at `/?lens=kbtg` who clicks `All Work` in the open ledger must keep `emerald` via `?cover=emerald` (not revert to `navy` on reload and not display `kbtg` in UI).
3. **Manual cover colorway switching must not mutate the active project lens and must clean stale URL params:** Clicking `Gold` in the desk switcher while filtered to `AI` keeps `lens='ai'`, writes `?cover=gold&lens=ai`, and overrides any prior company `?lens=kbtg` cover alias.
4. **Deep links and anchors must bypass the closed cover without pre-hydration flash, and closing the cover must clean them:** `/?lens=scb&project=khaidee-v2` and `/#ledger` start open on first paint; clicking `Cover / ปิดสมุด` closes the statement and removes `?project=` and `#hash` while keeping the active colorway/lens.
5. **Light cover editions (`gold`, `frost`) must maintain dark ink and ≥ 4.5:1 contrast across both closed cover, open jacket, and back cover in both Day and Dark modes.**

---

## File Map

- **Create:**
  - `src/lib/edition.ts` — `PassbookEdition` type, `VISIBLE_EDITIONS`, `resolveEdition()`, `shouldStartOpen()`, `buildPassbookUrl()`
  - `src/lib/edition.test.mjs` — TDD tests for silent colorway resolution, deep-link auto-open, and URL sync
  - `src/components/passbook/CoverArtwork.tsx` — Original inline SVG geometric cover motifs for all 9 colorways + original `P` monogram
  - `src/components/passbook/PassbookCover.tsx` — Closed Thai passbook cover component + desk action bar & neutral colorway switcher
- **Modify:**
  - `src/lib/lens.ts` & `src/lib/lens.test.mjs` — Add silent Thai bank aliases (`kbank`, `krungsri`, `bay`, `bbl`, `bangkokbank`, `ktb`, `krungthai`, `ttb`, `tmb` → `'fintech'`)
  - `src/data/portfolio.ts` & `src/data/portfolio.test.mjs` — Add `accountNo` to `PROFILE` and 2–3 letter transaction `code` to each project's `ledger`
  - `src/data/ui.ts` & `src/data/ui.test.mjs` — Add bilingual cover, account-plate, colorway, and update-passbook copy + silent-UI assertion
  - `src/app/globals.css` — Add desk-mat tokens and all 9 `[data-edition="..."]` Day + Lamp-Dark cover palettes
  - `src/app/layout.tsx` — Extend inline `prefsScript` to set `data-edition` and `data-start-open` before first paint
  - `src/components/passbook/Passbook.module.css` — Physical Thai passbook geometry (closed cover, stitched spine, peeking paper stack, rounded outer booklet corners, colored open jacket, account plate, barcode strip, transaction codes, 420 ms reduced-motion-safe open transition)
  - `src/components/passbook/HolderPage.tsx` — Upgrade to Inside Front Cover Account Holder Plate
  - `src/components/passbook/LedgerPage.tsx` — Add numbered rows (`01`…), transaction codes, and "Update Passbook / ปรับสมุดบัญชี" framing
  - `src/components/passbook/Statement.tsx`, `History.tsx`, `BackCover.tsx` — Apply rounded outer passbook geometry and active edition jacket / back-board tokens
  - `src/components/PortfolioClient.tsx` — Wire closed/open state, `edition`, pre-paint handoff, Close Cover cleanup, and URL sync
  - `DESIGN.md` — Update shape, surface, and silent-edition token documentation

---

### Task 1: Silent Cover Editions, Bank Lens Aliases & URL State Helpers

**Files:**
- Create: `src/lib/edition.ts`
- Create: `src/lib/edition.test.mjs`
- Modify: `src/lib/lens.ts:8-25`
- Modify: `src/lib/lens.test.mjs:21-28`

**Interfaces:**
- Consumes: `FocusLens` from `src/lib/lens.ts`, `parseProjectParam` from `src/lib/deeplink.ts`
- Produces:
  - `export type PassbookEdition = 'navy' | 'emerald' | 'violet' | 'gold' | 'obsidian' | 'marine' | 'cobalt' | 'sky' | 'frost'`
  - `export const VISIBLE_EDITIONS: readonly PassbookEdition[] = ['navy', 'emerald', 'violet', 'gold', 'obsidian', 'marine']`
  - `export function resolveEdition(coverParam?: string | null, lensParam?: string | null): PassbookEdition`
  - `export function shouldStartOpen(search: string, hash: string, knownProjectIds: readonly string[]): boolean`
  - `export function buildPassbookUrl(currentHref: string, next: { edition: PassbookEdition; lens: FocusLens; clearDeepLink?: boolean }): string`

- [ ] **Step 1: Create branch `feat/thai-passbook-cover`**

Run: `git checkout -b feat/thai-passbook-cover`
Expected: Switched to a new branch `feat/thai-passbook-cover` (never committing on `main`).

- [ ] **Step 2: Write failing tests in `src/lib/lens.test.mjs` and `src/lib/edition.test.mjs`**

In `src/lib/lens.test.mjs`, extend the company-alias test to assert `normalizeLens` maps `kbank`, `krungsri`, `bay`, `bbl`, `bangkokbank`, `ktb`, `krungthai`, `ttb`, `tmb` → `'fintech'`.

In `src/lib/edition.test.mjs`, assert:
```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { VISIBLE_EDITIONS, resolveEdition, shouldStartOpen, buildPassbookUrl } from './edition.ts';

test('VISIBLE_EDITIONS exposes exactly the 6 neutral cover colorways', () => {
  assert.deepEqual(VISIBLE_EDITIONS, ['navy', 'emerald', 'violet', 'gold', 'obsidian', 'marine']);
});

test('resolveEdition silently maps explicit company aliases and neutral cover names', () => {
  assert.equal(resolveEdition(null, 'kbtg'), 'emerald');
  assert.equal(resolveEdition(null, 'Kasikorn'), 'emerald');
  assert.equal(resolveEdition(null, 'kbank'), 'emerald');
  assert.equal(resolveEdition(null, 'scb'), 'violet');
  assert.equal(resolveEdition(null, 'scbx'), 'violet');
  assert.equal(resolveEdition(null, 'krungsri'), 'gold');
  assert.equal(resolveEdition(null, 'bay'), 'gold');
  assert.equal(resolveEdition(null, 'nvidia'), 'obsidian');
  assert.equal(resolveEdition(null, 'ptt'), 'marine');
  assert.equal(resolveEdition(null, 'bbl'), 'cobalt');
  assert.equal(resolveEdition(null, 'bangkokbank'), 'cobalt');
  assert.equal(resolveEdition(null, 'ktb'), 'sky');
  assert.equal(resolveEdition(null, 'krungthai'), 'sky');
  assert.equal(resolveEdition(null, 'ttb'), 'frost');
  assert.equal(resolveEdition(null, 'tmb'), 'frost');
  assert.equal(resolveEdition('gold', 'kbtg'), 'gold'); // ?cover wins over ?lens
});

test('resolveEdition keeps generic lens slugs on navy so no company cover leaks', () => {
  for (const slug of ['all', 'ai', 'edge', 'ml', 'fintech', 'web', 'fullstack', 'systems', 'logistics', 'iot', '', null, 'unknown']) {
    assert.equal(resolveEdition(null, slug), 'navy', String(slug));
  }
});

test('shouldStartOpen returns true for valid ?project= or interior anchors, false otherwise', () => {
  const ids = ['jaidee', 'signbridge', 'khaidee-v2'];
  assert.equal(shouldStartOpen('?project=khaidee-v2', '', ids), true);
  assert.equal(shouldStartOpen('?lens=kbtg&project=signbridge', '', ids), true);
  assert.equal(shouldStartOpen('?project=invalid', '', ids), false);
  assert.equal(shouldStartOpen('', '#ledger', ids), true);
  assert.equal(shouldStartOpen('', '#history', ids), true);
  assert.equal(shouldStartOpen('', '#contact', ids), true);
  assert.equal(shouldStartOpen('', '#statement', ids), true);
  assert.equal(shouldStartOpen('?lens=kbtg', '', ids), false);
  assert.equal(shouldStartOpen('', '#unknown', ids), false);
});

test('buildPassbookUrl keeps cover silent, preserves cover across lens changes, and cleans deep links on close', () => {
  // KBTG visitor switches ledger filter to 'all' → preserves emerald via ?cover=emerald, removes company slug
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?lens=kbtg', { edition: 'emerald', lens: 'all' }),
    'https://phanu.xyz/?cover=emerald',
  );
  // KBTG visitor switches ledger filter to 'ai' → pins ?cover=emerald&lens=ai
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?lens=kbtg', { edition: 'emerald', lens: 'ai' }),
    'https://phanu.xyz/?cover=emerald&lens=ai',
  );
  // Manual colorway switch to gold while on ai lens → ?cover=gold&lens=ai
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?lens=ai', { edition: 'gold', lens: 'ai' }),
    'https://phanu.xyz/?cover=gold&lens=ai',
  );
  // Switching back to navy on 'all' clears both params
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?cover=gold&lens=all', { edition: 'navy', lens: 'all' }),
    'https://phanu.xyz/',
  );
  // Closing cover clears ?project and #hash while keeping cover & lens
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?lens=scb&project=khaidee-v2#statement', {
      edition: 'violet',
      lens: 'fintech',
      clearDeepLink: true,
    }),
    'https://phanu.xyz/?cover=violet&lens=fintech',
  );
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `node --test src/lib/edition.test.mjs src/lib/lens.test.mjs`
Expected: FAIL (`edition.ts` missing, new bank aliases in `lens.ts` missing).

- [ ] **Step 4: Implement `src/lib/edition.ts` and update `src/lib/lens.ts`**

- In `src/lib/lens.ts`: add `kbank`, `krungsri`, `bay`, `bbl`, `bangkokbank`, `ktb`, `krungthai`, `ttb`, `tmb` → `'fintech'` to `ALIAS_MAP`.
- In `src/lib/edition.ts`: implement `PassbookEdition`, `VISIBLE_EDITIONS`, `resolveEdition(coverParam, lensParam)`, `shouldStartOpen(search, hash, knownProjectIds)` (reusing `parseProjectParam` from `./deeplink.ts`), and `buildPassbookUrl(currentHref, next)` (sets `?cover=<edition>` when `edition !== 'navy'`, deletes `?cover` when `'navy'`; sets `?lens=<lens>` when `lens !== 'all'`, deletes `?lens` when `'all'`; when `clearDeepLink` is true, deletes `project` and clears `url.hash`).

- [ ] **Step 5: Run tests to verify pass and commit**

Run: `node --test src/lib/edition.test.mjs src/lib/lens.test.mjs`
Expected: PASS (`fail 0`).

```bash
git add src/lib/edition.ts src/lib/edition.test.mjs src/lib/lens.ts src/lib/lens.test.mjs
git commit -m "feat(passbook): add silent cover editions, bank lens aliases, and URL helpers"
```

---

### Task 2: Bilingual Passbook Copy, Transaction Codes & Silent-UI Guard

**Files:**
- Modify: `src/data/portfolio.ts` (`LedgerLine`, `PROFILE`, `PROJECTS`)
- Modify: `src/data/portfolio.test.mjs`
- Modify: `src/data/ui.ts`
- Modify: `src/data/ui.test.mjs`

**Interfaces:**
- Consumes: `PassbookEdition` from `src/lib/edition.ts`
- Produces:
  - `PROFILE.accountNo = '672-1-10052-0'`
  - `LedgerLine.code: string` (`'AI'`, `'ML'`, `'QA'`, `'OPT'`, `'SYS'`, `'OCR'`)
  - `EDITION_LABELS: Record<PassbookEdition, BilingualText>` in `src/data/ui.ts`
  - New bilingual `UI` keys for cover, account plate, open/close book, and "Update Passbook / ปรับสมุดบัญชี"

- [ ] **Step 1: Write failing tests in `src/data/portfolio.test.mjs` and `src/data/ui.test.mjs`**

In `src/data/portfolio.test.mjs`:
- Assert `PROFILE.accountNo === '672-1-10052-0'`.
- Assert every project in `PROJECTS` has `p.ledger.code` matching `/^[A-Z]{2,3}$/`.

In `src/data/ui.test.mjs`:
- Assert every key in `EDITION_LABELS` covers all 9 `PassbookEdition` values with non-empty `en` and `th`.
- Assert **no visible string** in `UI` or `EDITION_LABELS` contains any target company name (`/kbtg|kasikorn|kbank|scbx|\bscb\b|krungsri|bangkok bank|\bbbl\b|krungthai|\bktb\b|\bttb\b|nvidia|\bptt\b/i`).

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test src/data/portfolio.test.mjs src/data/ui.test.mjs`
Expected: FAIL (`accountNo`, `ledger.code`, `EDITION_LABELS` not defined).

- [ ] **Step 3: Update `src/data/portfolio.ts` and `src/data/ui.ts`**

- In `src/data/portfolio.ts`:
  - Add `code: string;` to `LedgerLine` (`jaidee: 'AI'`, `signbridge: 'ML'`, `khaidee-v2: 'QA'`, `farmhouse: 'OPT'`, `cockpit: 'SYS'`, `anya: 'OCR'`).
  - Add `accountNo: '672-1-10052-0'` to `PROFILE`.
- In `src/data/ui.ts`:
  - Add `EDITION_LABELS: Record<PassbookEdition, BilingualText>` using purely neutral color names (`Navy / กรมท่า`, `Emerald / มรกต`, `Violet / ม่วง`, `Gold / ทอง`, `Obsidian / นิล`, `Marine / น้ำเงิน`, `Cobalt / คราม`, `Sky / ฟ้า`, `Frost / ขาวหมอก`).
  - Add bilingual `UI` keys: `skipCover`, `coverTitle` (`Engineering Passbook` / `สมุดคู่ฝากวิศวกรรม`), `coverSeries` (`Passbook · No. 01` / `สมุดคู่ฝาก · เล่มที่ 01`), `coverTapHint` (`Tap cover to open` / `แตะปกเพื่อเปิดสมุด`), `openBook` (`Open Passbook` / `เปิดสมุดบัญชี`), `closeBook` (`Cover` / `ปิดสมุด`), `coverPaletteLabel` (`Cover color` / `สีปกสมุด`), `accountPlateTitle` (`Account Holder Record` / `ข้อมูลเจ้าของบัญชี`), `accountNoLabel` (`Account No.` / `เลขที่บัญชี`), `accountNoHint` (`CMU Portfolio ID` / `รหัสบัญชีผลงาน มช.`), `accountStatusLabel` (`Status` / `สถานะ`), `accountStatusValue` (`Open · Co-op Jun 2027 – Mar 2028` / `เปิดรับสหกิจฯ · มิ.ย. 2570 – มี.ค. 2571`), `colLine` (`No. / Opened` / `ลำดับ / เริ่ม`), `colCodeEntry` (`Code / Entry` / `รหัส / รายการ`), `liveCode` (`LIVE` / `สด`), `authorizedStamp` (`Verified · CMU CAMT` / `ตรวจสอบแล้ว · CAMT มช.`).
  - Update `printTitle` to passbook-update phrasing (`Update passbook · print a live line` / `ปรับสมุดบัญชี · พิมพ์ผลทำนายสด`) while preserving existing placeholder contracts in `printedOk`, `printedMiss`, `printedEntry`.

- [ ] **Step 4: Run tests to verify pass and commit**

Run: `node --test src/data/portfolio.test.mjs src/data/ui.test.mjs`
Expected: PASS (`fail 0`).

```bash
git add src/data/portfolio.ts src/data/portfolio.test.mjs src/data/ui.ts src/data/ui.test.mjs
git commit -m "feat(passbook): add transaction codes, account ID, and silent bilingual cover copy"
```

---

### Task 3: Cover Edition Tokens, Physical Booklet CSS & Anti-Flash Pre-Paint Script

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx:22-51`
- Modify: `src/components/passbook/Passbook.module.css`

**Interfaces:**
- Consumes: `PassbookEdition` names from Task 1 (`data-edition` attribute on `<html>`), `data-start-open="1"` pre-paint attribute
- Produces:
  - CSS custom properties on `:root` and `:root[data-edition="<id>"]` (both Day and `[data-theme="dark"]`): `--desk`, `--desk-ink`, `--desk-dim`, `--desk-border`, `--cover-base`, `--cover-deep`, `--cover-ink`, `--cover-dim`, `--cover-accent`, `--cover-spine`, `--cover-spine-ink`, `--cover-rim`
  - Pre-paint `prefsScript` in `layout.tsx` that resolves `data-edition` and `data-start-open` synchronously before first paint
  - Physical Thai passbook classes in `Passbook.module.css` (`.coverStage`, `.bookClosed`, `.spine`, `.pageBlock`, `.deskControls`, `.swatchRow`, `.swatchBtn`, `.bookJacket`, `.accountStrip`, `.barcodeBand`, `.txCode`, `.bookEnter`)

- [ ] **Step 1: Add all 9 edition palettes (Day + Desk-Lamp Dark) and desk tokens to `src/app/globals.css`**

Use the exact WCAG-verified hex values from Spec Section 4.1 (`navy`, `emerald`, `violet`, `gold`, `obsidian`, `marine`, `cobalt`, `sky`, `frost`), keeping paper tokens (`--paper`, `--paper-2`, `--paper-3`, `--ink`, `--ink-2`) as mint security paper with dark carbon-blue ink in both themes. Set `body` ground to `var(--desk)` (`#1a2026` Day / `#0b0e12` Lamp-Dark) with `--desk-ink: #eaf0f5` and `--desk-dim: #9fb0bf`. Add pre-paint anti-flash CSS rules keyed off `html[data-start-open='1']` so deep links never briefly display the closed cover before React hydrates.

- [ ] **Step 2: Extend inline `prefsScript` in `src/app/layout.tsx`**

Keep it compact and side-effect-safe (`try { ... } catch(e) {}`):
- Apply saved `phanu-theme` and `phanu-lang` (existing behavior).
- Parse `URLSearchParams(location.search)`: resolve `cover` or `lens` through the exact alias map from Task 1 and set `document.documentElement.setAttribute('data-edition', ed)`.
- If `project` matches a known project id (`jaidee|signbridge|khaidee-v2|farmhouse|cockpit|anya`) OR `location.hash` matches `#ledger|#history|#contact|#statement`, set `document.documentElement.setAttribute('data-start-open', '1')`.

- [ ] **Step 3: Add physical Thai passbook geometry styles to `src/components/passbook/Passbook.module.css`**

- Closed booklet `.bookClosed`: `width: min(640px, 100%)`, `border-radius: 4px 20px 20px 4px`, flat bound left `.spine` (`22px` with stitch dots), peeking mint-paper `.pageBlock` along right/bottom outer edges, `background: var(--cover-base)`, `color: var(--cover-ink)`.
- Open booklet jacket `.bookJacket`: `background: var(--cover-base)`, `padding: 10px`, `border-radius: 16px` around the open mint-paper spread (`.spread` gets `border-radius: 10px` on outer edges, square `0px` center gutter fold at desktop; vertical stack with rounded top/bottom outer edges on `≤ 960px`).
- `Statement` and `History` sheets get matching `border-radius: 4px 16px 16px 4px` outer passbook rounding with subtle edition accent top rule; `BackCover` uses `var(--cover-deep)` / `var(--cover-ink)` / `var(--cover-dim)` with `border-radius: 4px 16px 16px 4px`.
- Inside-cover `.accountStrip`, `.barcodeBand`, ledger `.txCode` monospace tag, and `.bookEnter` keyframe (`420ms cubic-bezier(0.22, 1, 0.36, 1)` on `transform` and `opacity` only, disabled under `prefers-reduced-motion: reduce`).
- Verify mobile (`≤ 600px`) padding, touch targets (`≥ 44px`), and `min-width: 0` so zero horizontal scroll can occur at 375 px.

- [ ] **Step 4: Type-check and commit**

Run: `npx tsc --noEmit`
Expected: Exit code `0`, zero TypeScript errors.

```bash
git add src/app/globals.css src/app/layout.tsx src/components/passbook/Passbook.module.css
git commit -m "style(passbook): add 9 silent edition palettes, desk tokens, physical booklet CSS, and anti-flash script"
```

---

### Task 4: Closed Thai Passbook Cover & Original Geometric Cover Artwork

**Files:**
- Create: `src/components/passbook/CoverArtwork.tsx`
- Create: `src/components/passbook/PassbookCover.tsx`

**Interfaces:**
- Consumes: `PassbookEdition`, `VISIBLE_EDITIONS` (`src/lib/edition.ts`), `PROFILE`, `EDUCATION`, `Lang` (`src/data/portfolio.ts`), `UI`, `EDITION_LABELS` (`src/data/ui.ts`)
- Produces:
  - `export function MonogramMark()` and `export default function CoverArtwork({ edition }: { edition: PassbookEdition })`
  - `export default function PassbookCover({ lang, edition, onOpen, onChooseEdition, onCopyEmail }: { lang: Lang; edition: PassbookEdition; onOpen: () => void; onChooseEdition: (ed: PassbookEdition) => void; onCopyEmail: () => void })`

- [ ] **Step 1: Build `src/components/passbook/CoverArtwork.tsx`**

Implement:
- `MonogramMark`: clean 28×28 inline SVG geometric `"P"` emblem (original to Phanu, `aria-hidden="true"`).
- `CoverArtwork`: pure inline SVG (`viewBox="0 0 640 380"`, `preserveAspectRatio="xMidYMid slice"`, `aria-hidden="true"`) rendering a crisp, original geometric motif per `PassbookEdition`:
  - `navy`: subtle horizontal guilloche curves + double border frame
  - `emerald`: diagonal woven ribbon bands with muted jade & warm coral geometric intersections
  - `violet`: geometric faceted diamond cluster in upper-right with thin gold accent hairline
  - `gold`: bold charcoal vertical spine band + clean gold field with minimal geometric linework
  - `obsidian`: precision signal-lime (`#76b900`) dot/circuit micro-grid + angular corner bracket
  - `marine`: sweeping cyan & vermilion diagonal horizon bands
  - `cobalt`: layered cobalt wave lines + crisp corner stripe
  - `sky`: dual-tone geometric folded corner planes
  - `frost`: modular cobalt & orange square-grid mosaic band

- [ ] **Step 2: Build `src/components/passbook/PassbookCover.tsx`**

Implement the Closed Passbook Stage:
- Interactive physical booklet (`<button type="button">` or cover card with accessible button trigger so clicking anywhere on the cover opens the book, without nesting interactive elements inside a `<button>`):
  - Left stitched spine + peeking right/bottom paper stack
  - Top row: `<MonogramMark />` + `UI.coverTitle[lang]` + `UI.coverSeries[lang]` (zero company names)
  - Background `<CoverArtwork edition={edition} />`
  - Bottom identity block: `PROFILE.nameEN` + `PROFILE.nameTH` (`lang="th"`), `PROFILE.heroTitle[lang]`, `EDUCATION.wil[lang]`, `A/C ${PROFILE.accountNo}` in Doto font, and `UI.coverTapHint[lang]`.
- Directly beneath the closed booklet (`id="cover-actions"`):
  - Primary button: `UI.openBook[lang]` (`onOpen`)
  - Direct recruiter shortcuts: `Download CV (PDF)` (`<a href={PROFILE.cvUrl} download>`) + `Copy email` (`onCopyEmail`)
  - Neutral Cover Colorway Switcher (`role="group" aria-label={UI.coverPaletteLabel[lang]}`): maps `VISIBLE_EDITIONS` into 6 compact swatch buttons showing colored swatch dot + `EDITION_LABELS[ed][lang]` with `aria-pressed={edition === ed}` (zero company names anywhere).

- [ ] **Step 3: Type-check and commit**

Run: `npx tsc --noEmit`
Expected: Exit code `0`, zero errors.

```bash
git add src/components/passbook/CoverArtwork.tsx src/components/passbook/PassbookCover.tsx
git commit -m "feat(passbook): add physical closed Thai passbook cover and original SVG colorway artwork"
```

---

### Task 5: Authentic Open Passbook Interior, Orchestrator Wiring, `DESIGN.md` & Full Verification

**Files:**
- Modify: `src/components/passbook/HolderPage.tsx`
- Modify: `src/components/passbook/LedgerPage.tsx`
- Modify: `src/components/passbook/Statement.tsx`
- Modify: `src/components/passbook/History.tsx`
- Modify: `src/components/passbook/BackCover.tsx`
- Modify: `src/components/PortfolioClient.tsx`
- Modify: `DESIGN.md`

**Interfaces:**
- Consumes: `PassbookCover` (Task 4), `resolveEdition`, `shouldStartOpen`, `buildPassbookUrl`, `PassbookEdition` (Task 1), `PROFILE.accountNo`, `p.ledger.code`, `UI` (Task 2)
- Produces: Complete end-to-end closed → open Thai passbook portfolio on `feat/thai-passbook-cover`

- [ ] **Step 1: Upgrade `HolderPage.tsx` into the Inside Front Cover Account Holder Plate**

Add:
- Top passbook plate header (`UI.accountPlateTitle[lang]` + `UI.coverSeries[lang]`)
- Account No. & Status strip (`UI.accountNoLabel[lang]` → `PROFILE.accountNo` in Doto font with subtle `UI.accountNoHint[lang]`, and `UI.accountStatusLabel[lang]` → `UI.accountStatusValue[lang]`)
- Existing `<h1>` (`PROFILE.nameEN`), `PROFILE.nameTH`, thesis, intro, Download CV + Copy email buttons, `<dl>` details, GitHub/LinkedIn links
- Bottom authentic passbook magnetic-stripe / barcode inline SVG strip (`aria-hidden="true"`) + small rotated teller stamp (`UI.authorizedStamp[lang]`).

- [ ] **Step 2: Upgrade `LedgerPage.tsx` with numbered lines, transaction codes, and "Update Passbook" framing**

- Update table headers to `UI.colLine[lang]` (`No. / Opened`), `UI.colCodeEntry[lang]` (`Code / Entry`), `UI.colProof[lang]`, `UI.colCloud[lang]`.
- Prefix each project row's date cell with its 2-digit line number (`01`, `02`, …) in Doto font, and render `<span className={styles.txCode}>{p.ledger.code}</span>` beside the entry name.
- Prefix live printed SignBridge rows with `<span className={styles.txCode}>{UI.liveCode[lang]}</span>`.
- Keep all SignBridge lazy-loading, 8 held-out hand samples, miss highlighting, and honesty copy intact.

- [ ] **Step 3: Update `Statement.tsx`, `History.tsx`, `BackCover.tsx`, and wire `PortfolioClient.tsx`**

- `Statement.tsx`, `History.tsx`: use the rounded passbook leaf styling + edition accent hairline.
- `BackCover.tsx`: renders as the active edition's back board (`var(--cover-deep)`, `var(--cover-ink)`, `var(--cover-dim)`).
- `PortfolioClient.tsx`:
  - Manage `edition` (`PassbookEdition`) and `isOpen` (`boolean`, initialized to `false` on SSR and synced on mount via `shouldStartOpen(window.location.search, window.location.hash, IDS)`; remove `data-start-open` from `<html>` after hydration).
  - Sync `data-edition` on `document.documentElement` whenever `edition` changes.
  - Render `<PassbookCover>` inside `<div hidden={isOpen} data-cover-stage="">` and the open passbook (`<div className={styles.bookJacket}>` wrapping `<HolderPage>` + `<LedgerPage>`, plus `<Statement>`, `<History>`, `<BackCover>`) inside `<div hidden={!isOpen} data-open-stage="" className={isOpen ? styles.bookEnter : ''}>`.
  - Skip link points to `#cover-actions` when closed and `#ledger` when open.
  - Header bar: when closed shows `phanu.xyz`, `Open`, `ไทย/EN`, `Dark/Light`; when open shows `phanu.xyz`, `Ledger`, `History`, `Contact`, `Cover / ปิดสมุด`, `ไทย/EN`, `Dark/Light`.
  - `openBook()`: sets `isOpen = true`, focuses the open spread heading (`#holder-name`) cleanly without abrupt scroll jumps.
  - `closeBook()`: sets `isOpen = false`, sets `activeId = null`, updates URL with `buildPassbookUrl(window.location.href, { edition, lens, clearDeepLink: true })`.
  - `chooseEdition(nextEdition)`: sets `edition = nextEdition` (without mutating `lens`), syncs URL with `buildPassbookUrl(window.location.href, { edition: nextEdition, lens })`.
  - `chooseLens(nextLens)`: sets `lens = nextLens` (without mutating `edition`), syncs URL with `buildPassbookUrl(window.location.href, { edition, lens: nextLens })`.

- [ ] **Step 4: Update `DESIGN.md` to match the physical Thai passbook & silent colorway system**

Document the dark desk surface, rounded outer passbook geometry (`4px 20px 20px 4px` closed, `16px` outer open jacket, `0px` bound spines), the 9 silent cover colorway palettes (Day + Lamp-Dark), and the Inside Front Cover Account Plate & numbered transaction codes.

- [ ] **Step 5: Run full unit test suite + production static build**

Run: `npm test && npx next build`
Expected: All unit tests pass (`fail 0`), `npx next build` succeeds with `/`, `/cv`, `/icon.svg`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml` all `○ (Static)`.

- [ ] **Step 6: Verify rendered UI in headless Chrome across desktop (1440×900) and mobile (375×812)**

Verify against `http://localhost:3001`:
1. Default `/` loads closed Navy cover, zero horizontal scroll at 375 px, zero company names in `document.body.innerText`.
2. `/?lens=kbtg`, `/?lens=scb`, `/?lens=krungsri`, `/?lens=nvidia`, `/?lens=ptt` each silently apply their exact `data-edition` (`emerald`, `violet`, `gold`, `obsidian`, `marine`) with zero company names in `document.body.innerText`.
3. `/?lens=fintech`, `/?lens=ai`, `/?lens=systems` stay on `data-edition="navy"`.
4. Clicking `Open Passbook` opens the spread cleanly; tapping a SignBridge hand sample prints a live row; closing and reopening preserves the printed row.
5. `/?lens=kbtg&project=khaidee-v2` starts open immediately with `data-edition="emerald"` and KhaiDee v2 statement visible; clicking `Cover` closes cleanly and clears `?project=`.
6. Check EN + TH and Day + Dark modes at both viewports.

- [ ] **Step 7: Final commit on `feat/thai-passbook-cover`**

```bash
git add src/components/passbook/HolderPage.tsx src/components/passbook/LedgerPage.tsx src/components/passbook/Statement.tsx src/components/passbook/History.tsx src/components/passbook/BackCover.tsx src/components/PortfolioClient.tsx DESIGN.md
git commit -m "feat(passbook): wire physical closed cover, authentic interior plate, and silent colorway editions"
```
