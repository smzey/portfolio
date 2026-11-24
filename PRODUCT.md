# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: technical recruiters and hiring managers** at NVIDIA, PTT (PTT Digital / ARV), SCB / SCBX and KBTG screening applicants for a **10-month full-time co-op / internship, June 2027 – March 2028**. They arrive from a CV, LinkedIn or a tailored link (`?lens=ai|fintech|systems`), often on a phone, and decide in about **30 seconds** whether to shortlist.
- **Secondary: senior engineers** asked to vet the candidate. They spend about **10 minutes** opening case studies, reading architecture and decisions, and checking repos and the live demo.
- **Thai readers are first-class:** Thai recruiters and HR at PTT, SCB and KBTG may read the Thai version. Thai (TH) must be as polished and accurate as English (EN), not a courtesy translation.

## Product Purpose

The personal engineering portfolio of **Phanu Sawet (ภาณุ สาเวศ)**, a CMU CAMT (MMIT) undergraduate. It exists to win interview callbacks for the 10-month co-op. Success means a recruiter shortlists within 30 seconds, and an engineer finds verifiable proof (working demo, real repos, honest numbers) within 10 minutes.

## Positioning

**Privacy-first edge AI: he builds AI that runs on the device and never leaks data.** This is the one claim the site is built around. The proof is specific to him:
- **Jaidee:** a local LLM (Ollama) for conversation, with clinical scoring (PHQ-9 / GAD-7) and crisis detection kept in a deterministic rule engine. Nothing leaves the machine.
- **SignBridge:** an ASL fingerspelling CNN running in the visitor's browser (int8, 416 KB, Web Worker). It is live on the site and makes zero server calls.
- **Anya:** a Thai medicine-label reader for blind users.

Supporting traits: honest, tested engineering (358 automated tests on KhaiDee v2; refusing fabricated accuracy claims) and teaching (Head TA for AIoT across cohorts). These support the main claim; they are not separate claims.

## Operating Context

- Static Next.js 16 site on Vercel, canonical domain `https://phanu.xyz`; `main` deploys to production.
- Content lives in `src/data/portfolio.ts`; `/cv` is a separate A4 web CV plus `public/Phanu_Sawet_CV.pdf`.
- Tailored focus-lens links reorder the projects per audience (`?lens=ai`, `fintech`, `systems`, plus company aliases such as `nvidia`, `kbtg`, `scb`, `ptt`).
- Phanu applies from Chiang Mai and is open to relocating to Bangkok.
- Facts stay in sync across the site, the CV PDF, LinkedIn and the Obsidian career profile (`01_Phanu_Career_&_Engineering_Profile.md`).

## Capabilities and Constraints

- **Static only:** no backend, database, CMS, auth or server-side AI. Anything "live" must run in the visitor's browser.
- **Bilingual EN / TH** for every visible string (`BilingualText`), plus dark and light themes.
- Must work at 375–390 px phones without horizontal scroll, as well as on corporate desktop browsers.
- Heavy assets (ML model, MediaPipe, videos) load only on tap or when scrolled into view.
- The hero 3D "systems topology" lattice was frozen by the earlier spec. **Phanu decided on 2026-11-24 to replace it with the live SignBridge demo** in the redesign.
- **Open:** whether the Hackathon & Builds timeline (spec Phase B) is part of the redesign or follows it.

## Brand Commitments

- Name: **Phanu Sawet / ภาณุ สาเวศ**. The brand mark is `phanu.xyz`.
- Role line in use: "Full-Stack & On-Device AI Engineer".
- Voice: precise, factual and modest. **No hype, no invented numbers, no fake skill bars.** Metrics only when verified.
- Spoken languages: Thai (native), English, Korean.

## Evidence on Hand

- Six case studies in `src/data/portfolio.ts`: Jaidee, SignBridge, KhaiDee v2, Farmhouse, Cockpit, Anya. Each has problem, architecture, decisions and outcome in EN and TH, plus inline SVG architecture diagrams (`ArchitectureDiagram.tsx`).
- **Live demo:** SignBridge in the browser. 43/48 correct on the on-page samples, 94.8% on the full 7,172-image test set.
- Verified metrics: Major GPA 3.56 (cumulative 3.42); 358 automated tests (172 domain + 186 API); Head TA for AIoT at CMU School of Lifelong Education; Programming and Rapid App TA.
- Public repos: `smzey/hackathon-signbridge`, `smzey/farmhouse-map-dc`, `smzey/khaidee-v2`. Jaidee, Anya and Cockpit are private ("code available on request").
- **Headshot:** a real professional photo exists. **File path not yet provided by Phanu**, so don't use a placeholder until it is.
- **Absent, do not fabricate:** project screenshots, demo videos (slots exist, waiting on recordings; see `docs/superpowers/plans/2026-11-24-demo-shot-list.md`), testimonials, awards and hackathon results (only Phanu may confirm these).

## Product Principles

1. **Show, don't claim.** Whatever can run in the browser should run, and proof beats adjectives. The strongest evidence belongs in the first viewport, not two clicks deep.
2. **Privacy-first is the thesis.** Every section should make "on-device, nothing leaks" easier to believe.
3. **Honest numbers only.** Show the miss rate next to the accuracy, and scope claims to what was actually built.
4. **Two speeds, one page.** The recruiter's 30-second answer comes first, and the engineer's depth (architecture, decisions, repos) is one click away and linkable.
5. **Equal in Thai.** Thai readers get the same quality, accuracy and typography as English readers.

## Accessibility & Inclusion

- Target **WCAG 2.2 AA**: text contrast ≥ 4.5:1 (≥ 3:1 for large text), focus visible and moved into dialogs, touch targets ≥ 24 px (aim for 44 px).
- Respect `prefers-reduced-motion`.
- Set the `lang` attribute correctly for Thai content.
- Several projects serve people with disabilities (blind users, Deaf patients, mental-health screening), so the portfolio itself must not exclude assistive-technology users.
