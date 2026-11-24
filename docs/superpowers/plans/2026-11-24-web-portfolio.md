# Phanu Sawet Engineering Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a fast, architectural Next.js 16 + TypeScript web portfolio for Phanu Sawet tailored to WIL 19 internship applications at NVIDIA, PTT, SCB/SCBX, and KBTG.

**Architecture:** Static Next.js App Router application at `/Users/phanu/Developer/portfolio` backed by strictly typed EN/TH project & experience data, URL-synced Focus Lenses (`?lens=all|ai|fintech|systems`), custom inline SVG system architecture diagrams, an interactive case-study inspection drawer, and bundled `Phanu_Sawet_CV.pdf`.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, `next/font/google` (`Inter` + `JetBrains Mono`), Node built-in test runner (`node --test`), Vercel.

**Spec:** `/Users/phanu/Developer/portfolio/docs/superpowers/specs/2026-11-24-web-portfolio-design.md`

## Global Constraints
- Zero heavy WebGL/Three.js dependencies; `< 1s` load time; works cleanly on strict corporate networks.
- Accurate academic display: `Major GPA 3.56 · Cumulative 3.42` (zero discrepancy against official CMU transcript).
- Bilingual `EN / TH` toggle and `Dark / Light` theme toggle with zero layout shift.
- Responsive from `375px` mobile to `1440px+` desktop with zero horizontal overflow (`scrollWidth <= innerWidth`).
- Real `Phanu_Sawet_CV.pdf` served at `/Phanu_Sawet_CV.pdf`.

## Review Focus
- Invalid or unknown `?lens=` query param (e.g. `?lens=xyz`) must gracefully fall back to `'all'` without throwing or hiding projects.
- Closing the interactive Case Study Drawer via `Escape` key, backdrop click, or close button must restore scroll cleanly.
- Mobile (`390px`) header, Focus Lens bar, SVG diagrams, and footer must have zero horizontal clipping (`scrollWidth <= 390`).
- Clipboard copy (`Copy Email`, `Copy Tailored Link`) must work safely even when `navigator.clipboard` is restricted.
- Both Dark and Light themes must maintain crisp contrast across SVG architecture diagrams, badges, and interactive states.

---

### Task 1: Project Scaffold & Real CV Asset
**Files:** `package.json`, `tsconfig.json`, `next.config.ts`, `vercel.json`, `.gitignore`, `public/Phanu_Sawet_CV.pdf`
- [ ] Create Next.js 16 + React 19 + TypeScript config files and copy `Phanu_Sawet_CV.pdf` into `public/`.
- [ ] Install dependencies (`npm install`) and verify clean `node_modules`.

### Task 2: Portfolio Data Model, Focus Lens Ordering & Unit Tests
**Files:** `src/data/portfolio.ts`, `src/lib/lens.ts`, `src/lib/lens.test.mjs`
- [ ] Write failing tests for `normalizeLens` and `selectProjectsForLens` (including invalid `?lens=` fallback and priority ordering for `ai`, `fintech`, `systems`).
- [ ] Implement `src/lib/lens.ts` and `src/data/portfolio.ts` with all 6 verified projects, EN/TH copy, Experience, Education, and Stack matrix.
- [ ] Run `node --test src/lib/lens.test.mjs` and confirm PASS.

### Task 3: Custom Inline SVG System Architecture Diagrams
**Files:** `src/components/ArchitectureDiagram.tsx`
- [ ] Build crisp, theme-aware monochrome SVG architecture schematics for `jaidee`, `signbridge`, `khaidee-v2`, `farmhouse`, `cockpit`, and `anya`.

### Task 4: Editorial Portfolio UI, Case Study Drawer & Styling
**Files:** `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/components/PortfolioClient.tsx`, `src/components/Portfolio.module.css`
- [ ] Implement sticky header (`EN/TH`, `Dark/Light`, `Download CV`), Hero + WIL 19 availability + 4 proof metrics, URL-synced Focus Lens bar, 6 flagship project cards, accessible Case Study Drawer (`Escape` + backdrop + SVG diagram + engineering decisions), Experience & Education timeline, 4-column Stack matrix, and Contact + Tailored Link Copier footer.

### Task 5: Build, Visual Verification (`1440px` & `390px`) & Live Vercel Deploy
- [ ] Run `node --test` and `npx next build` (verify 0 TypeScript/build errors).
- [ ] Render live screenshots in headless Chrome at `1440x900` and `390x844` (verifying `scrollWidth <= innerWidth` on mobile and inspecting rendered pixels).
- [ ] Initialize git, create GitHub repo `smzey/portfolio`, push, and deploy live via `npx vercel --prod --yes`.
