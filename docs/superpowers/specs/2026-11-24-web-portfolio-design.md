# Phanu Sawet — Engineering Portfolio Design Spec

**Date:** 2026-11-24  
**Target Repo:** `/Users/phanu/Developer/portfolio` (`smzey/portfolio` → Vercel production)  
**Owner:** Phanu Sawet (`ภาณุ สาเวศ`, CMU CAMT MMIT, Student ID `672110052`)

---

## 1. Intent & Why
Phanu is applying for his **WIL 19 10-month co-op internship (1 June 2027 – 31 March 2028)** targeting **Full-Stack & AI / Edge Systems Engineering** roles at **NVIDIA, PTT (PTT Digital / ARV), SCB (SCBX / SCB TechX / DataX), and Kasikorn (KBTG)**.

A generic student template blends in with hundreds of applicants. Hiring managers at these 4 organizations look for **proof of production engineering discipline**: deterministic AI safety boundaries, on-device/edge ML inference, real automated test suites, optimization algorithms, and clear system architecture.

---

## 2. Goals, Non-Goals & Anti-Goals
- **Goals:**
  - Pass a **30-second HR / recruiter scan**: identity, WIL 19 availability (`Jun 2027 – Mar 2028`), accurate academics (`Major GPA 3.56 · Cumulative 3.42`), Teaching Assistant & Freelance experience, and 1-click PDF CV download + email copy.
  - Pass a **10-minute senior-engineer deep dive**: interactive technical case studies with **custom inline SVG architecture diagrams**, exact engineering decisions, trade-offs, and verified metrics (`94.8%` CNN test accuracy, `358` automated tests, `40` distribution centers, `0` cloud inference calls).
  - Support **shareable Focus Lenses** via URL query parameters (`?lens=ai`, `?lens=fintech`, `?lens=systems`) so Phanu can send a tailored link to **NVIDIA**, **KBTG / SCB**, or **PTT** from the exact same deployed site.
  - Bilingual **EN / TH toggle** + **Dark / Light theme toggle**, responsive from `375px` mobile up to `1440px+` desktop.
- **Non-Goals:**
  - No CMS, database, backend auth, or blog engine — 100% static/edge-prerendered Next.js for `< 1s` load time and zero maintenance.
  - No heavy WebGL/Three.js shaders that choke corporate bank browsers or mobile devices.
- **Anti-Goals (What would make it fail):**
  - Generic "AI-slop" rainbow gradients, fake percentage skill bars (`Python 90%`), or fabricated metrics.
  - GPA discrepancy against the official CMU transcript (always state `Major GPA 3.56 · Cumulative 3.42` clearly).
  - Horizontal overflow on 375–390px mobile screens.

---

## 3. Approaches Considered
1. **Approach A — Architectural Engineering Portfolio + Focus Lens *(Selected)***: Calm, typographic dark/light editorial engineering site with a Focus Lens switcher (`All` · `Edge & AI` · `Full-Stack & FinTech` · `Logistics & Systems`), custom SVG system architecture diagrams, interactive case-study reader drawer, and EN/TH toggle. Chosen for sub-second speed, corporate-network reliability, and shareable company-tailored links.
2. **Approach B — Interactive 3D / WebGL Sandbox Showcase**: Heavy visual impact, rejected due to slower mobile/corporate performance and risk of distracting technical hiring managers from real engineering proof.
3. **Approach C — Minimalist Print-First Single-Column Site**: Fast to skim, rejected because it hides system design depth (architecture diagrams, deterministic guardrails, test rigor).

---

## 4. Information Architecture & Sections
1. **Sticky Minimal Header:**
   - Brand mark (`phanu.dev`), anchor links (`Work`, `Experience`, `Stack`, `Contact`), `EN / TH` toggle, `Dark / Light` toggle, and primary **`Download CV`** button (downloads real `/Phanu_Sawet_CV.pdf`).
2. **Hero & Recruiter Snapshot:**
   - Availability status pill: `● AVAILABLE · WIL 19 CO-OP (JUN 2027 – MAR 2028 · 10 MONTHS)`
   - Clear headline & positioning statement (EN/TH) focused on **Full-Stack Systems & Privacy-Preserving On-Device AI**.
   - 4 crisp proof metrics bar: `Major GPA 3.56` (`Cum 3.42`), `358 Automated Tests` (`KhaiDee v2`), `94.8% Edge CNN` (`Zero-Cloud JS`), `2 Semesters TA` (`~32 students/sec`).
   - Primary CTA row: `Download CV (PDF)` (solid), `Copy Email` (1-click clipboard + toast), `GitHub (smzey)`, `LinkedIn`.
3. **Focus Lens + Flagship Projects Grid (6 Verified Projects):**
   - **Lens Switcher** synced to URL (`?lens=all|ai|fintech|systems`):
     - `All Work` (default)
     - `Edge & On-Device AI` *(best for NVIDIA / KBTG AI)* → prioritizes **SignBridge**, **Jaidee**, **Anya**, **Cockpit OS**
     - `Full-Stack & FinTech` *(best for SCB / KBTG)* → prioritizes **KhaiDee v2**, **Jaidee**, **CAMT Grade Calculator**, **Cockpit OS**
     - `Logistics & Systems` *(best for PTT / PTT Digital)* → prioritizes **Farmhouse**, **Cockpit OS**, **KhaiDee v2**, **SignBridge**
   - Each card displays: index (`01`–`06`), title, 1-line technical thesis, concrete verified metric badge, stack tags, and **`Inspect Architecture →`** button.
   - **Interactive Case Study Drawer / Modal:** Opens a full technical breakdown for any project with:
     - Problem & Constraint
     - **Custom Inline SVG Architecture Diagram** (real system topology: e.g., Webcam → MediaPipe → Pure-JS CNN Forward Pass; Local User → Ollama LLM separated from Deterministic PHQ-9/GAD-7 Rule Engine; QR Client → Express API + 186 Integration Tests → Domain Layer + 172 Unit Tests; 40 Centers → Best-Fit-Decreasing Bin Packer → Leaflet Geo-Map)
     - Key Engineering Decisions & Trade-offs
     - GitHub Repo link (where public)
4. **Experience & Education Timeline:**
   - **Teaching Assistant — CAMT, Chiang Mai University** (`Aug 2025 – May 2026`): 954142 Basic & Advanced Programming, ~32 students/section, live debugging & logic mentoring.
   - **Freelance Web Developer — Baan Bai Mai (BBM) Tutoring School** (`2024`): React + Express REST API scheduling & attendance dashboard + LINE LIFF mini-app + admin panel.
   - **B.Sc. Modern Management & Information Technology (MMIT) — CMU CAMT** (`2024 – 2028 expected`): Major GPA `3.56` · Cumulative GPA `3.42` · Relevant coursework (`Data Structures / Programming`, `Web Development`, `Elementary Statistics`, `Business Data Visualization`, `AIoT for Business`, `App Dev for Business`).
5. **Engineering Stack & Domain Matrix:**
   - Clean 4-column typographic grid (NO fake progress bars): `Languages`, `Web & Backend`, `AI, ML & Data`, `Systems, Tools & Ops`.
6. **Contact & Tailored Link Footer:**
   - Direct contact (`switzersawet@gmail.com`, `phanu_sawet@cmu.ac.th`, `+66 93 195 6230`, Chiang Mai / Ready to relocate to Bangkok for WIL 19).
   - Quick "Copy Tailored Portfolio Link" strip (`NVIDIA / AI`, `SCB & KBTG / FinTech`, `PTT / Systems`) for Phanu's own convenience when submitting applications.

---

## 5. Technical Stack & Builder Calls
- **Framework:** Next.js 16 (App Router, TypeScript, static generation) at `/Users/phanu/Developer/portfolio`.
- **Styling:** Custom CSS variables + CSS Modules (zero bloat, strict monochrome dark-first palette with subtle emerald availability indicator, `Inter` + `JetBrains Mono` via `next/font/google`, full light mode support).
- **Visual Call (Builder Default):** Pure typographic engineering hero (no awkward cutout photo by default — keeps the aesthetic sharp and timeless like top systems engineers; easy to add `Phanu.png` later if desired).
- **CV Asset:** Copy `/Users/phanu/Library/CloudStorage/.../Phanu_Sawet_CV.pdf` to `/public/Phanu_Sawet_CV.pdf` for instant 1-click download.
- **Deployment:** Push to new GitHub repo `smzey/portfolio` and deploy live via `npx vercel --prod --yes`, then verify with `npx next build` and headless Chrome screenshots at both `1440px` desktop and `390px` mobile.
