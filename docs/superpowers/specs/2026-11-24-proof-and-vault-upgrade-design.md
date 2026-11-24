# Portfolio Upgrade — "Proof in 30 Seconds" + "Vault-Powered" Design

**Date:** 2026-11-24
**Repo:** `/Users/phanu/Developer/portfolio` (`smzey/portfolio`, Vercel production on push to `main`)
**Builds on:** `2026-11-24-web-portfolio-design.md` (all goals / non-goals / anti-goals there still hold)

---

## 1. Intent & Why
The portfolio exists to win interview callbacks for Phanu's 10-month co-op (Jun 2027 – Mar 2028) at NVIDIA, PTT, SCB, KBTG. The 10-minute engineer deep-dive is already strong (detailed architecture write-ups, SVG diagrams). The **30-second recruiter scan is weak**: none of the 6 case studies shows the product working, only 2 of 6 link a repo, and shared links render with no preview image. Recent effort went into hero motion (gyro / momentum lattice), which the original spec's rejected Approach B warned against.

This upgrade shifts effort from *decoration* to *proof*: let a visitor **see and touch** the work within seconds. Phase B then makes the vault the single place Phanu edits so the site stays current through the hackathon season.

## 2. Goals, Non-Goals, Anti-Goals
**Goals**
- Phase A — every flagship case study shows the product working (video loop or live demo) above the fold of its drawer/card.
- Phase A — SignBridge is usable live on the page with zero install, and still demonstrates something if the visitor declines the camera.
- Phase A — shared links (LinkedIn, LINE, email) unfurl with a branded preview image; site is indexable (`sitemap`, `robots`).
- Phase B — project and hackathon content is edited in Obsidian notes, and `src/data/portfolio.ts` is generated from them.
- Phase B — a Hackathon & Builds timeline section (AIS, BDI, Smart CMU, Taokaenoi, Tteokbokki, CMU Zero-Waste 2026).

**Non-Goals**
- No backend, database, CMS, or auth (unchanged from original spec). Site stays static on Vercel.
- No chatbot / in-browser LLM (≈1 GB model download; fails phone + corporate-laptop audience).
- No further hero-motion work. Gyro feature is frozen as-is (keep, don't extend).

**Anti-Goals (would be failure even if it "works")**
- Initial page weight grows noticeably: demo assets must not load until the visitor asks or scrolls to them.
- A live demo that visibly misclassifies on first try with no explanation — worse than no demo.
- Any fabricated metric or a video that shows features the project doesn't have.
- Public phone number or private repos exposed without Phanu's explicit choice.

## 3. Approaches Considered
1. **A then B *(selected — Claude's recommendation, approved by Phanu)***: ship visible proof first (videos, live SignBridge, sharing basics), then the vault pipeline + timeline. Front-loads what recruiters see; pipeline follows once content shape is stable.
2. **B only / B first**: better long-term maintenance, but recruiters see almost no difference. Deferred to phase 2.
3. **More spectacle (3D / hand-painted intro / in-browser chat)**: rejected — contradicts original Approach-B rejection and the no-backend / performance constraints.

## 4. Phase A — Proof in 30 Seconds

### A1. Sharing & housekeeping (small, do first)
- `src/app/opengraph-image.tsx` (Next `ImageResponse`, 1200×630, monochrome + emerald, name / role / availability). `twitter:card` → `summary_large_image`.
- `src/app/sitemap.ts`, `src/app/robots.ts`; `metadataBase` set to the canonical domain.
- Remove phone number from the public page (keep in the CV PDF).
- Domain: Phanu will use a custom domain **other than `phanu.dev`** (name TBD by Phanu). All URLs (`metadataBase`, sitemap, OG, the header brand mark) read from one `SITE_URL` constant; until the domain is live it stays the vercel.app URL, and the header brand mark is changed so it never promises a domain that doesn't exist.

### A2. Live SignBridge demo (on the SignBridge case study)
Source: `~/Developer/projects/hackathon_2` (public at `github.com/smzey/hackathon-signbridge`). Existing pieces: `public/cnn.js` (pure-JS forward pass), `model_cnn.json` (**9 MB** float JSON), `samples.json` (held-out test images with labels), `letters.json` (reference shapes), MediaPipe Hands from jsDelivr.

Behaviour:
- Collapsed by default: a "Try it live — runs in your browser" panel. **Nothing downloads until tapped.**
- **Mode 1 — Test-set mode (default, no camera):** a strip of all 48 held-out sample hands in `samples.json`; tapping one runs the real CNN forward pass and shows predicted letter, confidence, and timing (ms). The model gets 43/48 right (misses T, K, T, G, U). **Phanu's decision: show all 48 and label misses** ("model got this wrong — predicted X"), with a line stating 43/48 on this strip and 94.8% on the full 7,172-image test set. Honest, and reads as engineering maturity.
- **Mode 2 — Webcam mode (opt-in):** camera → MediaPipe → crop 28×28 → CNN → live letter + top-3 confidences, with a short reference card of letters to try. Inline honesty note: trained on Sign Language MNIST; works best with a plain background and good light; J/Z excluded (need motion).
- Model weights converted from 9 MB JSON to a compact binary (Float32 → Float16/`Int8` quantized `.bin`, target ≤ 1.5 MB) with a test that the quantized model gives the **same top-1 prediction as the original on all 48 samples** (builder's call: the full Kaggle test CSV is not in the repo). Try Int8 → Float16 → Float32 binary, ship the smallest that passes.
- Runs in a Web Worker so the page never janks; camera stops when the panel closes or scrolls off-screen.
- Mobile: works in Mode 1 everywhere; Mode 2 on phones that grant camera.

### A3. Demo video loops (all 6 case studies; ships last in Phase A)
- One 15–30 s muted, looping, captioned clip per project, made with HyperFrames from Phanu's screen recordings (screen capture + kinetic captions stating the real metric).
- Delivered as H.264 MP4 + WebM, ≤ 2 MB each, poster JPG; `<video muted playsinline loop preload="none">`, plays only when in view, respects `prefers-reduced-motion` (shows poster + play button instead).
- Placement: top of each case-study drawer, and a poster thumbnail on each project card.
- **Raw footage is Phanu's job** (Claude can't run his desktop apps): one 30–60 s screen recording per project. A shot list per project is part of the plan.
- Bonus (optional, last): one 45–60 s "who I am" reel for LinkedIn from the same clips.

### A4. Repo links
Public today: SignBridge, Farmhouse. **Phanu's decision: make KhaiDee v2 public** — after a secret scan of full git history (gitleaks or equivalent); any hit stops the publish and is reported to Phanu, who flips visibility himself. Jaidee, Anya, Cockpit stay private and show "Code available on request" instead of a link. Phone number is removed from the footer in `PortfolioClient.tsx`.

## 5. Phase B — Vault-Powered

### B1. Vault as source of truth
- New vault folder `02_Hackathons & Dev_Projects (แฮกกาธอนและโปรเจกต์โค้ด)/Portfolio_Projects/` with one note per project (`jaidee.md`, …) and one per experience item. Frontmatter holds structured fields mirroring the existing `ProjectCaseStudy` type (id, index, metricBadge, stack, lensRank, featuredIn = lenses the project is highlighted in, repoUrl, plus new `video`); body has `## Summary`, `## Problem`, `## Architecture`, `## Decisions`, `## Impact`, each with `### EN` / `### TH` subsections.
- An Obsidian Base (`Portfolio.base`) gives a table view of all projects inside Obsidian.
- `scripts/sync-from-vault.mjs` in the portfolio repo: reads the notes, validates every required field (fails loudly on missing TH/EN or bad lens rank), writes `src/data/portfolio.generated.ts`. `portfolio.ts` keeps types + PROFILE and re-exports generated arrays.
- Run manually (`npm run sync:vault`) and commit the output — Vercel never touches Google Drive. A test asserts generated data round-trips the current content exactly (first run must produce zero visible change).
- `01_Phanu_Career_&_Engineering_Profile.md` links to these notes instead of duplicating them.

### B2. Hackathon & Builds timeline
- New section after Experience: compact vertical timeline, one row per event (date, event, team role, what was built, result/award, optional link). Sourced from a vault note per hackathon via the same sync script.
- Facts: Claude drafts each event row from `~/Hacks/*` source files, marking anything unverified as `TODO`; **no result/award is published until Phanu confirms it** in the vault note. Rows with unconfirmed results show no result field.
- CMU Zero-Waste Hackathon (2–3 Dec 2026) added after the event with the real outcome.

## 6. Constraints
- Next.js 16 static, CSS Modules, existing tokens/fonts; EN/TH parity for all new copy; 375–390 px no horizontal scroll; dark + light.
- Initial-load JS/asset budget must not grow by more than ~30 KB gzipped from Phase A (demo + videos lazy).
- Every deploy verified: `npm test`, `next build`, check `/`, `/cv`, OG image, mobile width.
- Commits to `main` deploy to production — plan should work on a branch and merge per milestone.

## 7. Decisions & builder calls
**Phanu decided:** A then B; KhaiDee v2 goes public (after secret scan); demo shows all samples with misses labelled; custom domain other than phanu.dev (name pending).
**Claude's calls (correct if wrong):**
- Phase A merges in milestones via branches: A1 housekeeping → A2 SignBridge demo → A4 repos → A3 videos as recordings arrive. Projects without a video show no video slot (no empty placeholder).
- Quantization check = identical top-1 on all 48 samples.
- Hackathon facts drafted by Claude, confirmed by Phanu before publish.
- Vault edits are additive only (new folder + notes + one `.base`); the career profile note only gains links.
- Optional LinkedIn reel is out of scope unless Phanu asks after A3.

## 8. Left to the builder
Exact visual treatment of the demo panel and timeline (follow existing card styles + impeccable audit), quantization method, Worker wiring, file naming, HyperFrames composition details.
