# Thai Passbook Cover & Multi-Company Edition Design (`phanu.xyz`)

**Date:** 2026-11-25  
**Status:** Approved by Phanu (2026-11-25 — silent cover themes only, zero company names in visible UI)  
**Target Branch:** `feat/thai-passbook-cover` (never commit directly to `main` — `main` deploys to production)  
**Scope Size:** Project (replaces the flat square passbook framing with a physical Thai passbook cover, multi-company edition system, and authentic Thai passbook interior anatomy, plus `DESIGN.md` update)

---

## 1. Intent & Why

Phanu Sawet (`phanu.xyz`) is applying for 10-month full-time co-op / internship roles (June 2027 – March 2028) across Thai banking & fintech teams (**KBTG / Kasikornbank**, **SCB / SCBX**, **Krungsri**, **Bangkok Bank / BBL**, **Krungthai / KTB**, **ttb**) as well as technology and energy engineering teams (**NVIDIA**, **PTT**).

The current site already uses a passbook *metaphor* (navy page background, mint guilloche paper, dot-matrix figures, `?lens=` filtering), but visually reads like a flat square-cornered webpage (`0px` radius, open by default with no physical booklet cover). Phanu wants the site to feel unmistakably like an **actual Thai bank passbook (*สมุดคู่ฝาก*)** — inspired by real Thai bank books with rounded outer corners, stitched spines, geometric color-coded covers, an inside-cover account holder plate, and numbered dot-matrix transaction sheets — while adapting its cover edition cleanly for both Thai banks **and** NVIDIA / PTT.

**Success criteria:**
1. First impression immediately reads as a physical Thai bank passbook resting on a desk mat.
2. Tailored recruiter links (`?lens=kbtg`, `?lens=scb`, `?lens=krungsri`, `?lens=bbl`, `?lens=ktb`, `?lens=ttb`, `?lens=nvidia`, `?lens=ptt`) greet each recruiter with an inspired cover edition and the matching project filter.
3. Busy HR recruiters still complete their 30-second scan (identify holder, download CV, open top project proof, or test live SignBridge) with near-zero friction on both desktop and 375–390 px phones.
4. Zero third-party trademarked logos; 100% honest, verified facts; full EN/TH parity; static Next.js architecture preserved.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
- Add a realistic **closed Thai passbook cover** landing view (**Approach B**) with a fast, 1-tap open interaction into the open passbook spread (and a clean way to close back to the cover).
- Build a **Silent Cover Colorway system** driven by URL query params (`?lens=` / `?cover=`) and a subtle, company-free cover color switcher on the desk (`Navy`, `Emerald`, `Violet`, `Gold`, `Obsidian`, `Marine` — **zero company names anywhere in visible UI**) while silently mapping company URL aliases (`?lens=kbtg`, `scb`, `krungsri`, `bbl`, `ktb`, `ttb`, `nvidia`, `ptt`) to their matching cover colorway and focus lens.
- Upgrade the open passbook interior to authentic **Thai passbook anatomy**: visible colored cover jacket rim with rounded outer corners (`14px`), flat center spine, inside-cover **Account Holder Plate** (account number `672-1-10052-0`, holder info, magnetic-stripe/barcode motif, red teller stamp), numbered **Transaction Ledger** (`01`, `02`, … with short bank-style codes `AI`, `ML`, `QA`, `OPT`, `SYS`, `OCR`), and **"ปรับสมุดบัญชี / Update Passbook"** framing around the live SignBridge dot-matrix printer.
- Update `DESIGN.md` to reflect the new physical passbook geometry (replacing the strict `0px` square-corner rule on outer booklet corners while keeping crisp interior rules, no glow/blur, and the desk-lamp dark mode rule).

### Non-Goals
- No backend, database, CMS, authentication, or server-side AI.
- No changes to `/cv` content or `public/Phanu_Sawet_CV.pdf` (separate track).
- No new project case studies, demo videos, headshot upload, or Phase B vault generator.
- No scroll-jacking or heavy 3D WebGL page-turn physics libraries.

### Anti-Goals (what would make this fail even if it works technically)
- **Trademark infringement & company-name leakage:** NEVER reproduce actual bank or company logos, and NEVER print target company names (`KBTG`, `SCB`, `Krungsri`, `BBL`, `KTB`, `ttb`, `NVIDIA`, `PTT`) in the visible UI, cover badges, or colorway switcher. Company targeting works **silently** via URL query aliases only; every visible cover uses Phanu's own geometric `P` monogram and neutral color-edition naming.
- **Trapping recruiters behind an animation:** Never hide `Download CV (PDF)` or block deep links (`?project=signbridge`, `#ledger`, `#history`, `#contact`) behind the closed cover.
- **Unreadable cover contrast:** Light/bright cover editions (`krungsri` amber-gold, `ttb` off-white) MUST use dark ink on the cover so every text element passes WCAG 2.2 AA (≥ 4.5:1).
- **Fabricated metrics or banking claims:** Never invent fake bank balances, fake Baht figures, fake awards, or phone numbers on the public page. The account number `672-1-10052-0` is formatted directly from Phanu's CMU student ID (`672110052`) and labeled clearly as `Account / Portfolio ID`.
- **Horizontal overflow on phones:** Must remain 100% overflow-free at 375–390 px width in both EN and TH, both closed and open.

---

## 3. Approaches Considered

| Approach | Summary | Trade-off | Decision |
|---|---|---|---|
| **A. Realistic Open Passbook + Peeking Cover Jacket** | Land directly on an open Thai passbook with rounded outer corners and a colored cover rim peeking behind the pages. | Zero clicks to scan, but visitors never see the iconic closed passbook front cover from the reference photo. | Rejected |
| **B. Physical Closed Cover → Instant Flip Open** | Land on a realistic closed Thai passbook resting on a dark desk mat (matching the active company edition) with `Open Passbook` + direct `Download CV` and `Copy email` actions, flipping smoothly into the realistic open passbook on 1 tap. | Adds 1 tap before viewing the ledger on bare landing visits, mitigated by instant open, direct CV access on the cover stage, and automatic open bypass for `?project=` / hash deep links. Delivers the unmistakable Thai banking book moment. | **Selected by Phanu** |
| **C. Fanned Multi-Book Stack** | Default landing shows 5–6 angled passbooks fanned out like the reference photo; clicking one opens it. | High novelty on desktop, but cramped on 375 px phones and forces general recruiters to decide which book to click. | Rejected |

---

## 4. Detailed Design

### 4.1 Silent Cover Colorways & URL Contract (`src/lib/edition.ts` + `src/lib/lens.ts`)

Cover Colorway (`PassbookEdition`) is modeled separately from Focus Lens (`FocusLens`) using **company-neutral colorway IDs** (`navy`, `emerald`, `violet`, `gold`, `obsidian`, `marine`, `cobalt`, `sky`, `frost`). Target company names exist **only** as silent URL aliases in code — they are never rendered anywhere in visible text, badges, or `aria-label`s.

**Cover Colorways Table (all Day & Lamp-Dark ink + dim tokens mathematically verified ≥ 5.0:1 WCAG 2.2 AA):**

| Edition ID | Switcher Label (EN / TH) | Silent URL Aliases (`?lens=` or `?cover=`) | Linked `FocusLens` (on company link only) | Cover Base (Day / Lamp-Dark) | Cover Ink (Day / Dark) | Cover Dim (Day / Dark) | Pattern / Accent Motif (Original SVG) |
|---|---|---|---|---|---|---|---|
| `navy` | `Navy` / `กรมท่า` | `navy`, `default`, `all`, generic lenses (`ai`, `edge`, `ml`, `fintech`, `web`, `fullstack`, `systems`, `logistics`, `iot`), empty/unknown | `all` | `#173a52` / `#0a1722` | `#eaf2f7` / `#eaf2f7` | `#bfd4e2` / `#b5ccdb` | Classic fine guilloche bands + silver-mint hairline |
| `emerald` | `Emerald` / `มรกต` | `emerald`, `kbtg`, `kasikorn`, `kbank` | `fintech` | `#086934` / `#064723` | `#ffffff` / `#f0faf4` | `#d4f2e0` / `#bde3cc` | Diagonal woven ribbon stripes + subtle warm coral/jade geometry |
| `violet` | `Violet` / `ม่วง` | `violet`, `scb`, `scbx` | `fintech` | `#4c2882` / `#2c1550` | `#ffffff` / `#f5f0fc` | `#dfd2f5` / `#cbb8eb` | Faceted geometric diamond cluster + muted gold trim (`#e3b94f`) |
| `gold` | `Gold` / `ทอง` | `gold`, `krungsri`, `bay` | `fintech` | `#f0c419` / `#c79f12` | **Dark** `#1a1815` / `#171512` | **Dark** `#3b362d` / `#2e2a23` | Charcoal spine panel (`#33302c` with light spine text) + crisp gold cover field |
| `obsidian` | `Obsidian` / `นิล` | `obsidian`, `nvidia` | `ai` | `#161b16` / `#0b0e0b` | `#f2f7f2` / `#eef5ee` | `#b8ccb8` / `#aec4ae` | Signal lime (`#76b900`) precision micro-grid + angular corner notch motif |
| `marine` | `Marine` / `น้ำเงิน` | `marine`, `ptt` | `systems` | `#0f3b68` / `#08233f` | `#ffffff` / `#eaf4fc` | `#c5dff7` / `#b3d3f0` | Sweeping cyan (`#1ca7ec`) & vermilion (`#d63c3e`) horizon bands |
| `cobalt` | URL-only | `cobalt`, `bbl`, `bangkokbank` | `fintech` | `#103783` / `#092152` | `#ffffff` / `#edf3fc` | `#c9daf8` / `#b6cdf2` | Deep royal blue wave-mesh + subtle lighter cobalt diagonal band |
| `sky` | URL-only | `sky`, `ktb`, `krungthai` | `fintech` | `#00679c` / `#00466b` | `#ffffff` / `#f2faff` | `#d2eefc` / `#bce2f5` | Clean sky-blue dual-tone geometric corner fold |
| `frost` | URL-only | `frost`, `ttb`, `tmb` | `fintech` | `#edf2f7` / `#c8d3de` | **Dark** `#132238` / `#0f1c2e` | **Dark** `#354b68` / `#283c57` | Crisp cobalt (`#0050f0`) & orange (`#e05a1b`) modular square mosaic band |

**Resolution & URL Sync Rules (Silent Theme Contract):**
- **Silent company activation:** Visiting `phanu.xyz?lens=kbtg`, `?lens=scb`, `?lens=krungsri`, `?lens=bbl`, `?lens=ktb`, `?lens=ttb`, `?lens=nvidia`, or `?lens=ptt` silently resolves BOTH the matching `FocusLens` (`fintech` / `ai` / `systems`) AND the matching cover colorway (`emerald` / `violet` / `gold` / `cobalt` / `sky` / `frost` / `obsidian` / `marine`) without displaying any company name anywhere on screen.
- **Generic links stay neutral:** Generic lens links (`?lens=ai`, `?lens=fintech`, `?lens=systems`) stay on `navy` (default) cover.
- **Initial load:**
  - `lens = normalizeLens(params.get('lens'))` (existing behavior preserved; add `kbank`, `krungsri`, `bay`, `bbl`, `bangkokbank`, `ktb`, `krungthai`, `ttb`, `tmb` → `'fintech'` in `src/lib/lens.ts`).
  - `edition = resolveEdition(params.get('cover') ?? params.get('lens'))`.
  - Apply `data-edition="<edition>"` on `document.documentElement`.
- **Manual cover colorway switcher (`chooseEdition`):**
  - Changes ONLY the visual cover colorway (`edition`) without mutating the active project lens (keeping cover color a pure theme choice!).
  - Writes `?cover=<edition>` via `history.replaceState` (or deletes `?cover` when choosing `navy`), keeping the URL completely company-free and preserving any existing `?lens=` filter.
- **Open-ledger lens filter (`chooseLens`):**
  - Updates `lens` without changing `edition`.
  - URL sync via `history.replaceState`:
    - When `edition === 'navy'`: write `?lens=<nextLens>` (or delete `?lens` if `'all'`), delete `?cover`.
    - When `edition !== 'navy'`: pin `?cover=<edition>` alongside `?lens=<nextLens>` (or omit `?lens` if `'all'`), so refreshing or sharing keeps the silent theme colorway AND never leaks a company slug when switching lenses.
- **No edition persistence in `localStorage`:** URL params stay authoritative when sharing tailored links.

### 4.2 Stage 1: Closed Thai Passbook Cover (`src/components/passbook/PassbookCover.tsx`)

When the page loads normally (no `?project=` and no `#ledger`/`#history`/`#contact` hash), the visitor sees the **Closed Passbook Stage** centered on a calm dark desk surface (`--desk` in Day: `#1c2228`, Desk-Lamp Dark: `#0c0f13` with subtle fine grain/matte feel, zero neon glows).

**Physical Passbook Geometry:**
- Landscape booklet ratio on desktop/tablet: `width: min(640px, 100%)`, `aspect-ratio` / responsive min-height ~`390px` (on phones ≤ 520 px, adapts cleanly to a compact proportion with zero text clipping or horizontal overflow).
- **Rounded outer right corners:** `border-radius: 4px 20px 20px 4px` (flat bound left spine, softly rounded outer opening edge — unmistakably a Thai bank passbook).
- **Left stitched spine:** A `22px` vertical spine strip along the left edge with a subtle crease rule (`1px` dark/light fold line) and dashed stitch dots.
- **Stacked inner paper block:** `6px` peeking mint-paper page stack along the right & bottom outer edges (`border-radius: 0 18px 18px 0`) with hairline page rulings so the closed book visibly contains pages inside.

**Cover Layout (inside the closed booklet):**
- **Top bar:** Original `P` geometric monogram mark (inline SVG, 28×28) + bilingual passbook title (`สมุดคู่ฝากวิศวกรรม` / `ENGINEERING PASSBOOK`) + neutral series mark (`PASSBOOK · NO. 01` / `สมุดคู่ฝาก · เล่มที่ 01` — zero company names).
- **Mid artwork zone:** Edition-specific original geometric SVG pattern occupying the upper-right / diagonal band (matching the visual rhythm of real Thai passbooks without copying any trademark).
- **Bottom identity block:**
  - Account Holder Name: `Phanu Sawet` + `ภาณุ สาเวศ`
  - Role & Window: `Full-Stack & On-Device AI Engineer · 10-Month Co-op (Jun 2027 – Mar 2028)`
  - Formatted Portfolio Account No. (Doto font): `A/C 672-1-10052-0`
- **Interactive affordance:** A subtle corner prompt inside the lower-right of the cover (`Tap to open →` / `แตะเพื่อเปิดสมุด →`). Clicking the cover opens the book.

**Desk Controls directly below the Closed Cover:**
1. **Primary CTA:** `Open Passbook` / `เปิดสมุดบัญชี` (solid button, opens the book and moves focus cleanly to the open spread heading).
2. **Instant Recruiter Shortcuts:** `Download CV (PDF)` (direct download, zero clicks wasted) + `Copy email`.
3. **Subtle Cover Colorway Switcher:** Minimal row of 6 color swatches (`Cover:` / `สีปก:`) with neutral color labels (`Navy`, `Emerald`, `Violet`, `Gold`, `Obsidian`, `Marine` / `กรมท่า`, `มรกต`, `ม่วง`, `ทอง`, `นิล`, `น้ำเงิน`) and `aria-pressed`. Zero company names. Touch target ≥ 44 px.

**Deep-Link, DOM, History & Pre-Paint Rules (Design Calls — Settled):**
- **Deep-link auto-open:** Start **open** (`isOpen = true`) immediately on mount if URL contains a valid `?project=<id>` OR `window.location.hash` is `#ledger`, `#history`, `#contact`, or `#statement`.
- **Keep open passbook mounted in DOM (`hidden={!isOpen}`):** Keeping the open spread (`HolderPage`, `LedgerPage`, `History`, `BackCover`) mounted inside a `hidden={!isOpen}` container guarantees: (1) static HTML / SEO crawlers see all projects, history, and contact email at `phanu.xyz`; (2) closing and reopening the cover preserves the loaded 416 KB SignBridge Web Worker and any live printed rows; (3) `hidden` cleanly excludes the inactive view from keyboard tab order and assistive tech, avoiding duplicate visible `<h1>` headings. The skip link targets `#cover-actions` when closed and `#ledger` when open.
- **Pre-hydration anti-flash script (`layout.tsx`):** Extend the existing small synchronous `<head>` `prefsScript` in `src/app/layout.tsx` to read `?edition=` / `?lens=` and set `data-edition` on `<html>` before first paint (plus `data-start-open="1"` when `?project=` or an interior `#hash` is present, cleared on hydration) so tailored recruiter links never flash the wrong cover color or closed cover.
- **Close Cover history cleanup:** Clicking **`Cover` / `ปิดสมุด`** closes any active project statement (`setActiveId(null)`) and clears `?project=` and `#hash` via `history.replaceState` (while preserving `?lens=` / `?edition=`) so refreshing or sharing matches the closed cover. Opening/closing the cover uses local state (not `pushState`), preventing Back-button conflicts with `?project=` history entries.
- When closed, the header bar shows `phanu.xyz`, `ไทย/EN`, `Dark/Light`, plus a quick `Open` button.
- When open, the header bar shows `phanu.xyz`, section jump links (`Ledger`, `History`, `Contact`), a compact **`Cover` / `ปิดสมุด`** button to fold back to the closed cover, `ไทย/EN`, and `Dark/Light`.

**Open/Close Motion:**
- Opening animates the cover gently pivoting/sliding away and revealing the open booklet (`420ms cubic-bezier(0.22, 1, 0.36, 1)` on `transform` and `opacity` only).
- Under `@media (prefers-reduced-motion: reduce)`, state switches instantaneously with `0ms` duration.
- **No scroll-jacking:** Users open the passbook via click/tap/keyboard (never hijacking wheel/touch scroll).

### 4.3 Stage 2: Authentic Open Thai Passbook Interior

When open, the book rests on the same dark desk mat, framed inside its **active edition cover jacket** (`8px–12px` colored cover rim visible around the open mint-paper pages, with rounded outer corners `16px` on top-left/bottom-left of left page and top-right/bottom-right of right page, square `0px` corners along the center spine).

#### A. Left Page — Inside Front Cover (`HolderPage.tsx`)
Redesigned to look like the official inside front cover of a Thai passbook while preserving every existing fact and action:
- **Top passbook header strip:** `สมุดคู่ฝาก · ACCOUNT HOLDER PLATE` + edition badge.
- **Account Number & Branch Strip:**
  - `ACCOUNT NO. / เลขที่บัญชี`: `672-1-10052-0` (Doto tabular numerals; caption clarifies CMU Student / Portfolio ID)
  - `STATUS`: `OPEN · CO-OP JUN 2027 – MAR 2028`
- **Account Holder Identity:** `Phanu Sawet` (Display heading) + `ภาณุ สาเวศ`, thesis (`AI that runs on your device and never leaves it.`), short intro.
- **Primary Actions:** `Download CV (PDF)` + `Copy email` (48 px tall, high contrast).
- **Ruled Account Details (`<dl>`):** Focus, Branch (`Chiang Mai · Open to Bangkok`), Co-op Window, Academic Standing (`Major GPA 3.56 · Cum. 3.42`).
- **Bottom Strip:** GitHub / LinkedIn links + subtle **magnetic stripe / barcode bar** graphic (pure inline SVG / CSS stripes, `aria-hidden="true"`) + small rotated red teller mark (`VERIFIED · CMU CAMT`).

#### B. Right Page — Transaction Ledger (`LedgerPage.tsx`)
Keeps the proven ledger architecture and upgrades its bank-book authenticity:
- **Header:** Ledger title + Lens Filter (`All / AI / Fintech / Systems`) + subtle compact **Edition Switcher** pill/link or header access so recruiters can switch editions even while open.
- **Numbered Bank-Book Table Columns:**
  1. `NO. / DATE` (`01 · SEP 2026` / `01 · ก.ย. 2569`, Doto line number + opened month)
  2. `CODE / ENTRY` — each project gets an authentic 2–3 letter passbook transaction code (`AI` for Jaidee, `ML` for SignBridge, `QA` for KhaiDee v2, `OPT` for Farmhouse, `SYS` for Cockpit, `OCR` for Anya) set in a crisp ruled monospace tag beside the project name & category.
  3. `PROOF` — right-aligned Doto figure + measurement condition underneath.
  4. `CLOUD` — `0` (on-device) / `Uses API` / `—`.
- **"ปรับสมุดบัญชี / Update Passbook" Printer Slot (SignBridge Live Demo):**
  - Framed as a passbook update machine slot (`Update Passbook · Live On-Device Print` / `ปรับสมุดบัญชี · พิมพ์บรรทัดทดสอบสด`).
  - Retains the exact 8 held-out hand samples, lazy-loaded 416 KB Web Worker CNN, left-to-right stepped dot-matrix print animation (`0.6s, 16 steps`), `0` cloud calls column, and stamp-red highlight for the 2 known misses + honesty disclosure line.
  - Printed lines get a `LIVE` transaction code and timestamp (`HH:MM`).

#### C. Statement, History & Back Cover
- **`Statement.tsx`:** Inherits rounded outer passbook corners (`0 14px 14px 0` on right edge, subtle cover-edition top accent rule), keeps focus management, URL `?project=` deep link, ArchitectureDiagram, SignBridge full 48-sample/webcam demo, ProjectVideo slot, problem, decisions, and red teller outcome stamp.
- **`History.tsx`:** Inherits the open-page mint guilloche sheet inside the subtle cover jacket rim, keeping all work, TA, education, coursework, tools, and spoken languages intact.
- **`BackCover.tsx`:** Styled as the actual **back board of the active edition** (uses the active edition's deep cover tone + contrast-safe ink tokens + double closing rule + rounded outer corners) with the large email headline (breaking only after `@`), `Copy email`, `Download CV`, GitHub, LinkedIn, and university email.

### 4.4 Theme & Contrast Contract (`globals.css` + `DESIGN.md`)
- **Daylight (default) & Desk-Lamp Dark (`data-theme="dark"`):**
  - Paper remains pale mint security paper with dark carbon-blue ink in both themes (preserving the Desk Lamp Rule).
  - Every edition defines BOTH day and desk-lamp dark cover colors plus explicit `--edition-cover-ink` and `--edition-cover-dim` tokens verified ≥ 4.5:1 contrast (critical for `krungsri` gold and `ttb` light covers!).
  - **Shape rule update in `DESIGN.md`:** Outer physical booklet corners use soft passbook rounding (`14px–20px` on outer edges, `0px` on bound spines), while interior ruled lines, ledger rows, buttons, stamps, and hand samples remain crisp and architectural (`0px`–`2px`).

---

## 5. Verification & Testing Plan (for Builder)
- **Unit tests (`node:test`):**
  - New `src/lib/edition.test.mjs` written TDD-first: covers `resolveEdition()`, `editionDefaultLens()`, `VISIBLE_EDITIONS`, URL alias mapping for all banks (`kbtg`, `kbank`, `scb`, `scbx`, `krungsri`, `bay`, `bbl`, `ktb`, `ttb`) + `nvidia` + `ptt` + fallback to `default`, and `shouldStartOpen()` for `?project=` and hash deep links.
  - Updated `src/lib/lens.test.mjs`: verifies new bank aliases (`kbank`, `krungsri`, `bay`, `bbl`, `ktb`, `ttb`) map to `'fintech'` without breaking existing tests.
  - Existing `src/data/ui.ts` bilingual coverage test (ensure every new `UI` key has non-empty `en` and `th`).
- **Build check:** `npm test && npx next build` passes with zero errors and all routes remaining `○ (Static)`.
- **Visual & Responsive verification:** Inspect rendered `http://localhost:3001` at desktop (`1440×900`) and phone (`375×812`) across:
  - Closed cover (`default`, `kbtg`, `scb`, `krungsri`, `nvidia`, `ptt`) in Day + Dark modes and EN + TH.
  - Open passbook spread (Account Plate + Numbered Ledger + Live Print + Statement + Back Cover).
  - Deep link `?lens=kbtg&project=khaidee-v2` starts open with KBTG emerald jacket and KhaiDee v2 statement open.
  - Zero horizontal scroll (`scrollWidth <= innerWidth`) at 375 px.

---

## 6. Left to the Builder
- Exact SVG path coordinates for each edition's geometric cover artwork (must remain original, clean, lightweight inline SVG with zero trademark resemblance).
- Exact CSS keyframe/transition curve details for the 420 ms cover-open transition and subtle paper/leather desk styling (no heavy blur/drop-shadow glows).
- Exact mobile breakpoint adjustments for the closed cover padding and edition switcher wrapping at 375 px.
- Updating `DESIGN.md` and Obsidian Code Atlas (`portfolio.md`) once implementation is merged.
