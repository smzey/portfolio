# Headless browser checks (manual, not part of `npm test`)

Uses `puppeteer-core` from `~/Developer/ClaudeAnimationBase/node_modules` and the installed Google Chrome. Run against a production build:

```bash
npx next build && npx next start -p 3124 &
node scripts/e2e/signbridge.mjs http://localhost:3124/ /tmp/shots   # sample mode: lazy load, 48 thumbs, misses T,K,T,G,U, no overflow, TH copy
node scripts/e2e/webcam.mjs     http://localhost:3124/ /tmp/shots   # fake camera: allowed / denied / CDN blocked; scroll-away + close release camera
node scripts/e2e/resilience.mjs http://localhost:3124/              # stalled model → Retry; tracker files blocked → error + camera off; ≤15 MediaPipe fps
node scripts/e2e/video.mjs      http://localhost:3124/ /tmp/shots   # needs a project with `video` (see Code Atlas recipe); in-view play, reduced motion = poster
pkill -f "next start -p 3124"
```

Expected results are listed in the Obsidian handoff note (Code Atlas → Handoffs).
