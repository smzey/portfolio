# AGENTS.md — phanu.xyz portfolio

**Read the full code map first:**
`/Users/phanu/Library/CloudStorage/GoogleDrive-switzersawet@gmail.com/My Drive/00_Obsidian_Vault (สมองที่สอง - Phanu)/02_Hackathons & Dev_Projects (แฮกกาธอนและโปรเจกต์โค้ด)/00_Code_Atlas (แผนที่โค้ดสำหรับ AI)/portfolio.md`

It has the directory map, data flow, key interfaces, recipes and gotchas. If you change structure (new folder/module, renamed type, new command), update that note in the same session and bump its `updated:` + changelog.

## Commands
- `npm test` — node:test suites (`src/**/*.test.mjs`), must end `ℹ fail 0`
- `npx next build` — must succeed (needs network for Google Fonts)
- `main` auto-deploys to production on Vercel — work on a branch

## Hard rules
1. Every visible string is EN + TH (`BilingualText`).
2. No fabricated metrics. SignBridge: 94.8% full test set, 43/48 on on-page samples.
3. Static site only — no backend, DB, CMS, auth.
4. Hero motion (gyro / 3D lattice) is frozen; spend effort on proof of work.
5. No horizontal scroll at 375–390 px; dark + light both work.
6. Heavy assets (model, MediaPipe, videos) load only on tap / in view.
7. Never put the phone number on the public page; never commit `.env` or tokens.
8. Logic in `src/lib/**` is test-first; tests live next to code as `*.test.mjs`.
9. `/cv` content is hard-coded separately from `src/data/portfolio.ts` — change facts in both.

## Design docs
`docs/superpowers/specs/` (why/what) and `docs/superpowers/plans/` (task-by-task).
