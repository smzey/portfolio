---
name: phanu.xyz
description: Physical Thai engineering passbook — dark desk mat, 9 silent cover colorways with rounded outer booklet edges, mint guilloche paper, carbon-blue ink, one teller-stamp red.
colors:
  desk: "#1c2228"
  desk-dark: "#0b0e12"
  desk-ink: "#eaf0f5"
  desk-dim: "#a5b5c4"
  focus-desk: "#f0756e"
  ink: "#1b2740"
  ink-dark: "#16213a"
  ink-2: "#44546a"
  ink-2-dark: "#364659"
  stamp: "#b3302a"
  stamp-dark: "#8f221d"
  guilloche: "#2f6b57"
  guilloche-dark: "#245545"
  cover: "#173a52"
  cover-dark: "#0a1722"
  cover-deep: "#10293b"
  cover-deep-dark: "#06111a"
  cover-ink: "#eaf2f7"
  cover-dim: "#bfd4e2"
  paper: "#e7f0e8"
  paper-dark: "#bccdc0"
  paper-2: "#dbe8dd"
  paper-2-dark: "#b1c3b5"
  paper-3: "#cfe0d2"
  paper-3-dark: "#a6baab"
  rule: "#a9c2b0"
  rule-dark: "#8aa592"
  rule-strong: "#6f8a78"
  rule-strong-dark: "#5d7766"
  live: "#f1e5d6"
  live-dark: "#d6c9b6"
typography:
  display:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "clamp(46px, 5.6vw, 78px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  display-email:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "clamp(26px, 6.4vw, 64px)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "clamp(28px, 3.2vw, 42px)"
    fontWeight: 700
    lineHeight: 1.08
  headline-section:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "clamp(24px, 2.6vw, 32px)"
    fontWeight: 700
    lineHeight: 1.15
  thesis:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.1vw, 28px)"
    fontWeight: 600
    lineHeight: 1.28
  title:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  date:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    fontFeature: "tnum"
  label:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 600
    letterSpacing: "0.1em"
  label-block:
    fontFamily: "Anuphan, Noto Sans Thai, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
    letterSpacing: "0.08em"
  figure:
    fontFamily: "Doto, ui-monospace, monospace"
    fontSize: "18px"
    fontWeight: 800
    fontFeature: "tnum"
  figure-opened:
    fontFamily: "Doto, ui-monospace, monospace"
    fontSize: "16px"
    fontWeight: 800
    fontFeature: "tnum"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "28px"
  page: "44px"
  gutter: "20px"
  leaf: "10px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-cover:
    backgroundColor: "transparent"
    textColor: "{colors.cover-ink}"
    rounded: "{rounded.none}"
    padding: "8px 14px"
    height: "44px"
  button-back:
    backgroundColor: "{colors.cover-ink}"
    textColor: "{colors.cover-deep}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "48px"
  button-back-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cover-ink}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
    height: "48px"
  lens-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "6px 10px"
    height: "44px"
  lens-toggle-pressed:
    textColor: "{colors.ink}"
  leaf-under:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.none}"
  leaf-under-deep:
    backgroundColor: "{colors.paper-3}"
    rounded: "{rounded.none}"
  ledger-entry-hover:
    backgroundColor: "{colors.paper-2}"
  ledger-entry-active:
    backgroundColor: "{colors.paper-3}"
  printed-line:
    backgroundColor: "{colors.live}"
    textColor: "{colors.ink}"
  printed-line-miss:
    backgroundColor: "{colors.live}"
    textColor: "{colors.stamp}"
  stamp:
    backgroundColor: "transparent"
    textColor: "{colors.stamp}"
    typography: "{typography.label-block}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  hand-sample:
    backgroundColor: "#000000"
    rounded: "{rounded.none}"
    size: "56px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
---

# Design System: phanu.xyz

## Overview

**Creative North Star: "The Physical Thai Passbook (*สมุดคู่ฝาก*)"**

The site is a tactile Thai bank passbook resting on a dark desk mat that belongs to one person and never leaves him, the same way the AI he builds never leaves the device. Visitors arrive at the closed booklet — flat stitched left spine, softly rounded outer right corners (`4px 20px 20px 4px`), peeking stacked mint-paper pages, and original geometric cover artwork — with instant 1-tap open (`Open Passbook / เปิดสมุดบัญชี`) alongside direct `Download CV` and `Copy email` desk actions. Deep links (`?project=`, `#ledger`, `#history`, `#contact`) bypass the closed cover before first paint.

Nine silent cover colorways (`navy`, `emerald`, `violet`, `gold`, `obsidian`, `marine`, `cobalt`, `sky`, `frost`) adapt the cover, open jacket rim, and back board automatically via silent URL aliases (`?lens=` / `?cover=`) without ever printing target company names in the visible UI. Inside, every readable surface stays mint security paper printed with a faint guilloche wave, carbon-blue ink, and one vermilion teller-stamp red. The left page is the inside-front-cover Account Holder Plate (`A/C 672-1-10052-0`, barcode strip, teller stamp); the right page is a numbered dot-matrix ledger (`01`, `02`… with 2–3 letter transaction codes `AI`, `ML`, `QA`, `OPT`, `SYS`, `OCR`) and a live "Update Passbook / ปรับสมุดบัญชี" SignBridge printer slot.

Light theme is the passbook on a charcoal desk mat by day. Dark theme is the same book under a desk lamp: the desk and cover dim deeper, the paper dims to sage, and ink stays dark on light paper (`color-scheme: light`) across all nine editions.

**Key Characteristics:**
- Dark desk mat ground (`--desk`), physical rounded outer booklet cover (`4px 20px 20px 4px` closed, `16px` open jacket, `0px` on bound spines), mint guilloche paper inside.
- Nine silent cover colorways (Day + Lamp-Dark, every ink and dim token verified ≥ 5.0:1 WCAG 2.2 AA), zero third-party logos or company names in visible UI.
- Inside-front-cover Account Holder Plate + numbered dot-matrix transaction ledger with 2–3 letter transaction codes.
- Anuphan for all prose and dates in EN and TH; Doto dot-matrix only for printed ledger figures, account numbers, line numbers, and transaction codes.
- One stamp red, reserved for verified marks, misses and focus.
- Every figure carries its condition; every entry carries its opening month.

## Colors

A restrained bank-document palette: one cool navy family for the cover, one pale green paper family, carbon-blue ink, and a single warm red. Every token has a day and a lamp-lit value; light is the default for every visitor, whatever their system setting; the `-dark` keys apply only under `data-theme="dark"`, which the visitor turns on with the theme toggle (remembered in localStorage). Never follow `prefers-color-scheme`. Cover ink and cover dim are identical in both themes. Both themes declare `color-scheme: light`, because the reading surface is paper in both.

### Primary
- **Carbon-Blue Ink** (`ink` / `ink-dark`): all body text, ledger figures, the filled primary button, the toast, text selection, hand-sample borders and letter tabs. Under the lamp it deepens slightly rather than flipping to a light tone.

### Secondary
- **Teller-Stamp Vermilion** (`stamp` / `stamp-dark`): the rotated VERIFIED stamp, the outcome stamp on statements, mistaken live predictions (miss lines, miss status, the demo's missed letter and tile), hand-sample hover, the text caret, and the focus outline (`--focus` is the same value in each theme). Under the lamp it darkens to an oxblood so it still reads on dimmed paper.

### Tertiary
- **Guilloche Green** (`guilloche` / `guilloche-dark`): signal routes in architecture diagrams and live-signal accents in the SignBridge demo (live dot, predicted letter, confidence bars). Components read it through the `--emerald` alias.

### Neutral & Cover Editions
- **Desk Mat (`desk` / `desk-dark`):** charcoal ground (`#1c2228` Day / `#0b0e12` Lamp-Dark) holding the physical passbook, utility bar (`desk-ink`, `desk-dim`), desk actions, and footer. Focus rings on the dark desk use `focus-desk` (`#f0756e`, ≥ 5.7:1 contrast).
- **Nine Silent Cover Colorways (`[data-edition]`):** `navy` (default), `emerald`, `violet`, `gold`, `obsidian`, `marine` (visible neutral swatches), plus URL-only `cobalt`, `sky`, `frost`. Each edition defines Day and Lamp-Dark values for `--cover-base`, `--cover-deep`, `--cover-ink`, `--cover-dim`, `--cover-accent`, `--cover-spine`, and `--cover-spine-ink`, all verified ≥ 5.0:1 WCAG 2.2 AA (light covers `gold` and `frost` use dark cover ink). Zero company names appear in visible UI.
- **Mint Security Paper** (`paper`, `paper-2`, `paper-3` and lamp-lit values): paper is every reading surface (with the guilloche texture); paper-2 is the first leaf beneath a sheet, the account strip, and ledger-row hover; paper-3 is the deeper leaf, the gutter fold and the open (active) entry.
- **Faded Ink** (`ink-2` / `ink-2-dark`): secondary text — categories, conditions, column heads, opened dates, dt labels, history dates, notes.
- **Ruling** (`rule`, `rule-strong` and lamp-lit values): rule is every hairline between rows, around diagrams and around the stacked leaf edges; rule-strong is the spine between the two pages, the heavier line under headers and above the first history row, and the scrollbar thumb.
- **Fresh Print** (`live` / `live-dark`): background of a line the visitor just printed with SignBridge; the only warm neutral.

### Named Rules
**The One Red Rule.** Stamp vermilion is the only saturated warm color. It means "verified", "missed" or "you are here" (focus). It never decorates, never fills a button, never colors a heading.

**The Two Surfaces Rule.** Content sits either on paper (ink colors) or on the cover (cover-ink colors). Never set paper ink on the cover or cover ink on paper.

**The Desk Lamp Rule.** Dark theme dims the book; it does not invert it. Paper stays a light sage under dark ink, the cover goes near-black, and every new token needs both a day and a lamp-lit value that keeps that relationship.

**The Guilloche Texture Rule.** Every paper surface carries the guilloche wave (`--guilloche-img`, a 160 × 24 px tile of three sine polylines in ink at 12% opacity, the same tile in both themes). It is a texture under text, not an ornament; never enlarge, recolor or animate it.

## Typography

**Display Font:** Anuphan (with Noto Sans Thai, system-ui, sans-serif), weights 400 / 500 / 600 / 700, Thai + Latin subsets, exposed as `--font-sans`.
**Figure Font:** Doto (with ui-monospace, monospace), weights 500 / 800, Latin subset, exposed as `--font-dot`.

**Character:** One humanist sans speaks both languages with one voice, so Thai is never a fallback. The dot-matrix face is the passbook printer: it appears only where the machine printed a figure into the ledger.

### Hierarchy
- **Display** (700, clamp(46px, 5.6vw, 78px), 0.98, −0.015em): the account holder's name, once per page. The Thai name follows directly at 600, clamp(22px, 2.3vw, 30px), in faded ink, pulled up 12px.
- **Display Email** (700, clamp(26px, 6.4vw, 64px), 1.1): the email address on the back cover, set as the headline, selectable in one tap, and never broken mid-word: the only permitted break is right after the `@`.
- **Thesis** (600, clamp(22px, 2.1vw, 28px), 1.28, max 17ch): the one claim under the name.
- **Headline** (700, clamp(28px, 3.2vw, 42px), 1.08, max 28ch): statement titles. Section titles use clamp(24px, 2.6vw, 32px) at 1.15; the back-cover title clamp(22px, 2.4vw, 30px) at 1.25; the ledger title is 20px / 700.
- **Title** (700, 17px, 1.3): ledger entry names; history roles at 17px / 1.35. Printer title 16px / 700.
- **Body** (400, 16px, 1.6; statement blocks 1.65 at max 68ch; intro max 44ch): prose. **Body small** (15px) for details, meta, history items (max 72ch), nav and buttons (15px / 700). Categories and the honesty note at 14px; figure conditions at 13px.
- **Date** (Anuphan 600, 15px, tabular figures, faded ink, no wrap): history periods. Dates a person wrote are set in the prose face.
- **Label** (600, 12.5px, 0.1em, uppercase): ledger column heads in faded ink. **Block label** (700, 14px, 0.08em, uppercase): statement block heads and the stamp.
- **Figure** (Doto 800, 18px, tabular numerals): proof figures and cloud-call counts, printed-line latency. **Opened** (Doto 800, 16px; 14px on phones, faded ink): each entry's first-commit month from `ledgerMonth()` — `JUN 2026` in English, `มิ.ย. 2569` (Buddhist era) in Thai. Printed-line timestamps are Doto at the row's size. The demo's predicted letter is the one Doto glyph outside the ledger (40px, 44px on the webcam overlay).

### Named Rules
**The Printer Rule.** Doto is for what the ledger printed — proof figures, cloud counts, opened months, print times — and the demo's predicted letter. Never for prose, headings, labels or dates a person wrote (history periods are Anuphan).

**The Untracked Thai Rule.** Thai is never letter-spaced and never uppercased into tracking: every tracked label (column heads, block heads, stamp, brand) reverts to `letter-spacing: normal` under `lang="th"`.

## Layout

A single column of paper leaves on the navy cover, max 1240px wide, centred, with a 20px side gutter (safe-area aware) and 28px between sheets. Each stacked leaf also reserves 10px on its right and bottom for the page edges beneath it. The header bar (brand left, nav plus language and theme toggles right) and footer sit directly on the cover.

The first sheet is an open spread: two pages in a 0.95fr / 1.45fr grid, the holder page on the left and the ledger page on the right, divided by a 2px rule-strong spine with a 28px paper-3 fold shading into it from the holder side. Pages pad 44px (holder) and 40px (ledger); statements, history and the back cover pad 40–48px by 44px. Statements and history use a two-column grid (26–28px row gap, 48px column gap); history rows use a 150px+ date column beside the entry.

At ≤960px the spread, statement and history columns stack and the spine turns into a 2px rule bottom line under the holder page. At ≤600px every sheet pads 28px × 20px, history rows go single-column, the corner stamp drops into the flow, and the ledger table restacks: the header row is hidden visually, the opened month sits on its own line above the entry (14px), the entry name spans the row, and proof figure and cloud count share one line beneath it.

Vertical rhythm inside a page runs on 4 / 8 / 12 / 16–18 / 22 / 28px steps. Touch targets are 44px minimum, buttons 48px.

## Elevation & Depth

No neon glows or glass blur on any passbook surface. Physical depth is built in four devices:

- **Desk resting shadow.** Only the closed booklet's page stack (`.pageBlock`) and the open booklet's outer cover jacket (`.bookJacket`) cast a soft, realistic dark shadow onto the desk mat. Interior paper components never use drop shadows.
- **Stacked leaves.** The closed cover reveals a peeking striped paper block along its outer right/bottom edge; Statement and History sheets sit on two offset paper layers (`paper-2` at 5px, `paper-3` at 10px, 1px rule).
- **The gutter fold.** The holder page shades from `paper-3` at the spine to transparent over 28px, so the open spread bends into its binding.
- **The back board.** The back cover uses the active edition's `--cover-deep` board with a 3px double rule in `--cover-dim` across its top edge, closing the book.

An open ledger entry is a slightly deeper paper tone (`paper-3`). The one positioned overlay, the toast, is a solid ink slip with no shadow.

### Named Rules
**The Physical Booklet Rule.** Outer cover and jacket lift gently off the dark desk mat; interior surfaces separate strictly by material (cover vs paper vs paper-3), hairlines, or stacked page edges — never floating cards.

## Shapes

Physical outer booklet corners are softly rounded like real Thai bank passbooks (`4px 20px 20px 4px` on the closed cover with a flat bound left spine; `16px` outer jacket around the open spread; `4px 16px 16px 4px` on open leaves and back board). Interior elements — ruled rows, buttons, stamps, hand samples, transaction code tags, demo panels, and toast — stay crisp and square (`0px`), while small colorway switcher swatches use pill radii (`999px`). The only rotated element is the teller stamp (`−6°`).

## Components

### Buttons
Printed, blunt, and solid; they invert on hover rather than glow.
- **Shape:** square (0px), 2px border in the button's own ink, 48px min height, 12px × 18px padding, 15px / 700.
- **Primary (paper):** ink fill with paper text (Download CV, View source). Hover inverts to transparent with ink text.
- **Ghost (paper):** transparent with ink border and text (Copy email, Close statement). Hover fills with ink.
- **Cover toggles:** language and theme switches on the cover bar; transparent, 1.5px cover-dim border, cover-ink text, 14px / 600, 44px tall; hover brightens the border to cover-ink. Theme toggle exposes `aria-pressed`.
- **Back-cover buttons:** the same pair inverted onto the back board — cover-ink fill with cover-deep text, ghosts in cover-ink outline; each inverts on hover.
- **Focus:** 3px solid outline in the stamp/focus red, 2px offset (4px on ledger rows).

### Lens Toggles
A row of text toggles beside the ledger title, after a faded "Show" label, that choose which entries the ledger shows by audience (All / AI / Fintech / Systems), newest-opened first. Transparent, faded ink, 14px / 600, 44px tall; hover darkens to ink with a rule-strong underline; pressed (`aria-pressed="true"`) takes a full 1.5px ink outline.

### Ledger (signature component)
The projects table. Column heads are tracked uppercase labels in faded ink over a 1.5px rule-strong line; each entry row has a 1px rule beneath. Columns: **Opened** (Doto month, faded), entry name (17px bold) with its category below (14px faded), proof figure (Doto 18px, right-aligned) with the condition under it (13px faded), and cloud calls (Doto "0" for on-device, a short faded API note for cloud). The whole row is clickable; a real button in the name cell carries keyboard access. On hover-capable pointers the row tints paper-2; the open entry stays paper-3.

### Printed Line (signature component)
When a visitor taps a hand, SignBridge's prediction prints as a new row at the top of the ledger on a Fresh Print background, revealed left-to-right by a stepped clip (0.6s, 16 steps — a printer head, not a fade; disabled under reduced motion). Timestamp, latency and cloud count print in Doto. A miss prints the whole line in stamp red.

### Hand Samples
The print strip: 56px square tiles of real 28×28 held-out samples rendered pixelated on black, 2px ink border, with the true letter in a small ink tab at the bottom-right corner. Hover turns the border stamp red. A status line under the strip reports the latest reading (in stamp red when missed), followed by the honesty note in faded 14px.

### Teller Stamp
A 3px stamp-red outline box, uppercase 14px / 700 tracked 0.08em, rotated −6°. Used as the VERIFIED mark in the ledger page corner and as the outcome stamp on each statement (figure · condition). It is the only rotated element.

### Statement
A project's own paper leaf that opens below the spread when an entry is chosen: title and Close button on top, a meta line (category, stack, source link or "code on request") over a rule-strong line, then video or live demo if present, the architecture diagram between two hairlines, problem and decisions side by side, the outcome with its stamp, and View source. Focus moves to the title on open and returns to the ledger row on close.

### SignBridge Demo and Project Video
Embedded inside a statement, they speak the passbook through the alias tokens (`--surface`, `--border`, `--text-muted`, `--accent-solid-bg`, `--emerald`, `--stamp`). Panels are square paper-2 boxes with a 1px rule border and 14px padding; the try and play buttons are square ink fills; mode tabs are square, the selected one outlined 1.5px in ink; sample thumbnails are square black tiles with a 1px rule border, a miss outlined in stamp red. The predicted letter prints in Doto in guilloche green (stamp red on a miss); confidence bars fill in guilloche green on a paper-3 track. Stat lines and thumbnail labels use Anuphan with tabular figures. No radius, no shadow rings.

### Back Cover
The closing board: cover-deep ground, 3px double cover-dim rule on top, the contact title, the email as display headline (breaking only after `@`), a cover-dim note, and the inverted back-cover buttons.

### Navigation
The cover bar: `phanu.xyz` brand (700, 17px, 0.04em) and plain text links (15px, cover-ink) that underline on hover, with 44px targets, followed by the two cover toggles. No sticky bar, no hamburger; the row wraps on phones.

### Toast
A solid ink slip with paper text (15px / 600, 12px × 18px), fixed bottom-centre above the safe area, reporting copy-to-clipboard results.

## Do's and Don'ts

### Do:
- **Do** set every readable surface on paper with the guilloche texture, and every frame element (bar, footer, back cover) on the cover.
- **Do** give each major paper sheet its stacked leaf edges (paper-2 at 5px, paper-3 at 10px, 1px rule) instead of any shadow.
- **Do** print every ledger figure in Doto with tabular numerals and put its measurement condition directly beneath it in faded ink.
- **Do** date every ledger entry by its first-commit month (`JUN 2026` / `มิ.ย. 2569`).
- **Do** set history and other written dates in Anuphan 600 with tabular figures.
- **Do** separate rows and regions with rules (1px rule, 1.5px rule-strong) rather than boxes.
- **Do** keep corners at 0px and buttons at 48px tall with 2px borders that invert on hover.
- **Do** reserve stamp red for verified marks, misses and focus.
- **Do** give Thai the same face, size and weight as English, and drop letter-spacing for Thai.
- **Do** define both a day and a lamp-lit value for every new color token, keeping dark ink on light paper in both.

### Don't:
- **Don't** use cards, neon glows, glass blur, or shadows on interior paper surfaces.
- **Don't** round interior ledger rows, buttons, stamps, or hand tiles (outer booklet corners and swatch pills only).
- **Don't** print target company names or third-party logos anywhere in the visible UI.
- **Don't** use Doto for prose, headings, labels or written dates.
- **Don't** use stamp red as a fill, a heading color or decoration.
- **Don't** invert the paper to dark in dark theme.
- **Don't** let the email break anywhere but after the `@`.
- **Don't** add kickers or eyebrow labels above headings.
- **Don't** reintroduce the old dark dev-portfolio vocabulary: zinc greys, emerald glows, metric tiles, 3D heroes.
- **Don't** letter-space or uppercase Thai.
