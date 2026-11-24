# Demo Video Shot List (Phase A · Task 6)

One screen recording per project → Claude turns each into a 15–30 s muted, captioned loop (HyperFrames) → `public/videos/<id>.{mp4,webm,jpg}`.

## How to record (all projects)
- **Tool:** macOS `Cmd + Shift + 5` → "Record Selected Portion". Record only the app window, not the whole desktop.
- **Size:** 1920×1080 (landscape). Phone apps: record the iOS Simulator or a 390-wide browser window.
- **Length:** 30–60 s raw. Move slowly. Pause 1–2 s on every result so it can be captioned.
- **Before you hit record:** close Slack/LINE/mail, hide bookmarks bar, use a clean browser profile, **no tokens, `.env`, real names, phone numbers or real patient data on screen**.
- **Save as:** `~/Movies/portfolio-raw/<id>.mov` and tell Claude when they're there.

SignBridge needs no video — it has the live demo.

---

## 01 · Jaidee (`jaidee`) — private repo
Metric shown on site: **0 Cloud Calls · Deterministic Guardrails**
1. Show the app idle; turn Wi-Fi **off** visibly (menu bar) → proves on-device.
2. Type a short, mild screening answer; LLM replies.
3. Show the PHQ-9 / GAD-7 score panel updating (deterministic engine).
4. Type a clearly fictional crisis phrase → hotline **1323** card appears immediately.
- Use **made-up test text only**. No real conversations.

## 03 · KhaiDee v2 (`khaidee-v2`) — public after you flip it
Metric: **358 Automated Tests · Monorepo TS**
1. Customer scans the QR (or opens the customer URL) and places an order.
2. Vendor screen: order arrives in the live queue in real time (two windows side by side).
3. Vendor marks it ready → customer view updates.
4. Terminal: `npm test` finishing with the **358 passing** summary (crop to the last lines).

## 04 · Farmhouse (`farmhouse`) — public
Metric: **40 Centers · Best-Fit-Decreasing**
1. Map with the 40 distribution centers.
2. Pick a truck / load scenario → run the optimizer.
3. Show the packed result (bin visual or table) and the route on the map.
4. Change one constraint, re-run, show the result change.

## 05 · Cockpit (`cockpit`) — private repo
Metric: **SwiftUI + Next.js 16 · Bi-Directional Sync**
1. macOS Cockpit app: today's focus block (use a demo semester, no real course codes if you prefer).
2. Change something (mark a task done).
3. Mobile PWA in a phone-sized window updates (sync) — show both side by side.
- ⚠️ Do **not** record while a lecture `.m4a` is recording; hide any Canvas tokens / API settings screens.

## 06 · Anya (`anya`) — private repo
Metric: **Zero-UI Accessibility · Thai Vision OCR**
1. Point the camera (or load an image) at a Thai medicine label.
2. OCR result appears.
3. Thai TTS reads it out — **add a caption** since the loop is muted (Claude will caption the spoken text).

---

## What Claude does with each recording
1. Trim to the 15–30 s that show the result; speed up dead time.
2. Add 1–2 kinetic captions using only facts already on the site (the metric badge above) — no new claims.
3. Export H.264 MP4 + WebM ≤ 2 MB each + poster JPG; add `video` to the project in `src/data/portfolio.ts`; `npm test` checks size, files and bilingual caption.
