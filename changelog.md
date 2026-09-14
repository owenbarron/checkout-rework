# Changelog

## 2026-09-14 — Session 9

### Demo bar
- Relabelled the simulate control to **"Simulate Container Scan"** and gave it a purpose-drawn takeout-container glyph — the old thin-stroke cup icon was reading as a trash can at 14px. Tooltip now explains what it does: adds one container to the checkout, as if held up to the camera.

### Full keyboard sizing
- Keys were stuck at a fixed 56px and the keyboard capped at 660px wide, leaving most of a kiosk screen unused. Both now scale with viewport height (`clamp`), so at a 1990×914 window keys go from ~55×56 to **86×87**, and the block widens to 940px.
- Re-centred the address entry properly: it had been top-aligned as a workaround for the keyboard overlapping the header. Now an inner `margin: auto` wrapper centres it *and* still shows the top when the content is taller than the screen — which `justify-content: center` with overflow does not.
- Verified no vertical overflow at both 1990×914 landscape and 800×1280 portrait.

## 2026-09-14 — Session 8

### Full keyboard, and letters no longer assumed to mean "wing"
- The letter pad is now a **full A–Z keyboard** laid out QWERTY-style with a number row, instead of the three roster-derived keys. Letters can mean anything — compass sections here, apartment letters (120A/120B) elsewhere — so the pad no longer narrows itself to one customer's data.
- Dropped "wing" from the code and UI. `wingPart` → `letterPart`; the global `WING_NAMES` became an optional per-street `letterLabels` map. A street that defines a meaning spells it out ("101 North Garden Terrace"); one that doesn't leaves the letter attached to the number ("H120A Hillside"), so arbitrary apartment letters render correctly.
- Demo-bar toggle renamed to **Full keyboard** / **Number only + pick** (default stays number-only with disambiguation).
- Entry rules relaxed accordingly: a unit starts with its number, then any mix of digits and letters (max 8), rather than the old "one trailing letter" rule.
- Physical keyboard accepts any A–Z when the full keyboard is on.
- Address entry top-aligns and scrolls when the keyboard is showing, so the taller layout can't ride up over the header on a short screen.

## 2026-09-14 — Session 7

### Real Glen data + wing disambiguation
- Replaced the embedded unit roster with **the final live account list** (288 accounts). The earlier spreadsheet was the initial draft — e.g. Canyonview had 75 units in it but has 56 live.
- The final list confirmed the number-first label format already in use (`C137 Canyonview`).
- **Garden Terrace is one street with three wings** — South / North / West (`St`/`Nt`/`Wt` in the account emails) — and the wings reuse unit numbers, so 101 exists in all three. Units now carry their wing (`101N`) and render as **"101 North Garden Terrace"**.

### Two strategies for resolving a wing, toggleable
- **Wing disambiguation (default, off-position):** type `101`, pick Garden Terrace, then choose from `101 South / 101 North / 101 West`.
- **Alphanumeric units:** the keypad gains wing keys (N/S/W, labelled South/North/West) so staff type `101N` directly and skip the picker. The letter keys are **derived from the roster**, so the pad only shows wings that exist rather than a mostly-dead A–Z grid. Wing letters are typeable on a physical keyboard too.
- The two compose safely: with alphanumeric on, typing a bare `101` still falls back to the picker rather than failing.
- Entry rules: a wing letter only ever trails the number, and only one.

### Copy
- "Next student" → **"Next resident"** in senior living, and the USEFULL QR screen now reads "Scan the resident's USEFULL QR". Derived from the **venue**, not the active view, since QR is an add-on that can sit on top of any venue — campus venues still say "student".

## 2026-09-14 — Session 6

### Address lookup — reads like a written address (MJ's feedback)
- Flipped the order: **unit number first, then street**. Previously street-then-number, which reads backwards.
- Unit entry is now **freeform** (one growing field, not a fixed row of digit boxes) since unit numbers vary in length. It never auto-submits — staff confirm with **Continue** (or Enter).
- Resolution moved off digit-count and onto street selection (`resolveAddress`), which is what made freeform possible.
- Added **Prefilter streets** toggle (default **off**): when on, only streets that actually contain the entered unit number are offered. e.g. unit 150 → Canyonview and Villas only.
- Address labels now read number-first too: **"C150 Canyonview"**, "101 Garden Terrace" (was "Canyonview C150").

### "Rooms" → "Units" (senior living has houses, not just rooms)
- Renamed `BUILDING_ROOMS` → `BUILDING_UNITS` and all related copy: "No resident is registered at that unit", "Try a different unit", "Select the unit".

### Demo controller bar — config out of hiding
- Stakeholders kept missing config behind the settings gear (and one venue's copy got mistaken for another's), so venue selection, the QR add-on and the test entries moved to a **dark bar above the kiosk frame** that reads as scaffolding, not product.
- **Venue** is a 3-way exclusive switch: **Illumia** (Order ID) · **Grubhub** (Account · Last 4) · **Senior Living** (Address). Account and Address can no longer be combined.
- **USEFULL QR** is an add-on toggle available alongside any venue, and persists across venue switches.
- **Test entries are contextual** to the selected venue — and the senior-living ones now show *valid* addresses (C150 Canyonview, 101 Garden Terrace, H137 Hillside, V162 Villas) plus one deliberate miss, which is what had been confusing.
- The URL now **stays in sync** with the demo bar (`?modes=address,qr`), so a copied link always opens on whatever was on screen. Short inbound links (`#address`) still work.
- Removed the sound selector (defaults are locked in) and the old settings panel; the simulate-scan control moved to the demo bar.

### Copy
- Dropped brand names from the lookup subheaders: "Enter the 4-digit order number from the receipt" and "Enter the last 4 digits of the campus card from the receipt". Brands now appear only as demo-bar venue labels.

## 2026-07-14 — Session 5

### Staff Checkout (formerly Grubhub Lookup)
- Renamed the `grubhub/` prototype to `staffcheckout/` (served at `/staffcheckout/`); updated page title, manifest name/short_name/description, and Apple web-app title accordingly
- Renamed the in-app header from "Front of House" to "Staff Checkout"
- Pinned `@babel/standalone` to `7.24.0` — unpkg had rolled to Babel 8, whose new default JSX runtime emitted `import` statements that broke the in-browser transform (blank screen)

### Configurable lookup modes
- Added a "Lookup modes" section to the settings panel with per-mode toggles: Order ID, Account · Last 4, Address, USEFULL QR
- Defaults to **Order ID only**; at least one mode must stay enabled
- The top-right mode switcher only appears when 2+ modes are enabled, and only shows the enabled ones; disabling the active mode falls back to the first enabled one
- Added URL config for share links: `#address` (or `?mode=`) preselects a mode, `?modes=order,address` defines the enabled set; a lone `#mode` shows just that one mode. Aliases accepted (`#order`/`#orderid`, `#last4`/`#account`, `#addr`, `#qr`); hash changes live-switch the mode

### Address lookup (senior-living / The Glen)
- Added an Address mode for facilities where staff check out by residence rather than by person
- Building picker (Canyonview, Gardenview, Hillside, Garden Terrace, Villas) on the top half; "Look Up Address" heading, no subheader
- Pick a building → 3-digit room keypad with a building chip for context (tap to change building); room number is prefixed per building (e.g. Canyonview + 150 → "Canyonview C150")
- Embedded the real room roster from the Glen spreadsheet (369 rooms, numbers only — no PII) and validate entered rooms against it; unknown rooms show a "…not found" prompt
- Single unambiguous match skips the confirm dialog and goes straight to container scanning (persistent building/address context already confirms the selection); a disambiguation picker only appears when one room number maps to multiple units (e.g. 137-North / 137-West)

### Expected-count removal
- Removed the "Expected: X containers" badge and all `orderExpected` plumbing — the count can't be known reliably, so the scan screen just shows the running container total

### Service worker / PWA
- Rewrote `staffcheckout/sw.js` to be **network-first**: always fetch from the network (so edits appear on a plain reload), refresh the cache on each success, fall back to cache only when offline; bumped cache to `v2`
- Verified PWA wiring intact: manifest loads (standalone, icons, scoped start URL), SW registers and controls `/staffcheckout/`
- Added `*.xlsx` to `.gitignore` so resident roster exports (which contain names + emails) stay out of git

## 2026-04-17 — Session 4

### Fullheight Checkout Prototype
- Added mocked partial-rejection and full-rejection checkout outcomes to `fullheight/index.html`
- Added faint settings gear next to the existing close control in both portrait and landscape layouts
- Added mock checkout settings panel with `Already checked out: X` input to force success, partial success, or full rejection flows
- Partial-success outcome now uses the chosen cresting exclamation warning treatment with:
  - two-name pill rendering when 2 containers are rejected
  - one pill plus `and X more` summary when 3+ containers are rejected
- Full-rejection outcome now shows a gold warning card with exclamation icon and `Already Checked Out!` copy
- Increased warning outcome auto-dismiss to 30 seconds; normal success was later adjusted to 7 seconds

### Mockup Files
- Added `fullheight/mockup-partial-checkout.html` with expanded warning-icon exploration and scenario mockups
- Added `fullheight/mockup-already-checked-out-variants.html` with the three finalist warning states:
  - partial success with 2 already checked out
  - partial success with 3+ already checked out
  - full rejection

### Audio / Sounds
- Moved prototype audio assets into `sounds/`
- Updated scan-success sound to `sounds/successful-scan.m4a`
- Added distinct final-success and error audio paths
- Added selectable sound configuration in the settings panel for:
  - Container Success
  - Final Success
  - Error
- Each sound category now supports mixing and matching from the full `sounds/` folder and has its own preview/play button
- Added and pushed final success chimes:
  - `final-success-chime-1.mp3`
  - `final-success-chime-2.mp3`
  - `final-success-chime-3.mp3`
  - `final-success-chime-4.mp3`
- Removed legacy `checkout-complete.mp3` from the selectable sound list after it was replaced by `final-success-chime-1.mp3`

### Assets / Paths
- Moved shared visual assets into `images/`
- Updated fullheight prototype asset paths in:
  - `fullheight/index.html`
  - `fullheight/manifest.json`
  - `fullheight/sw.js`
- Updated `help.html` header logo path to the new `images/` location

### help.html
- Added anchored QR test section at `#test-qr-codes`
- Added direct QR modal link target at `#qr-modal`
- Added persistent QR modal for test codes with top navigation tabs for:
  - Container 1
  - Container 2
  - Container 3
  - User
- Added quick links in the Test QR Codes section to open the modal or link directly to the section/modal

### Git / Releases
- Committed and pushed multiple updates to `main`, including:
  - mocked rejection flows
  - help-page QR modal improvements
  - selectable success chimes
  - sound-settings cleanup
  - final success chime audio files

## 2026-03-06 — Session 3

### Version C (fullheight) UI Polish
- Text and logo scaled up ~17% (30% then trimmed back 10%) for better kiosk readability at arm's length
- Removed top padding above logo (`pt-8` → `pt-2`) and below logo (`pb-2` → `pb-0`) so logo sits closer to top of screen

### help.html — Recommendation & Version Ranking
- Updated intro and problem note to reference three versions
- Added teal recommendation callout naming Version C as the strongest option, with rationale
- Reordered version cards C → B → A, each with a screenshot banner at the top; Version C featured full-width with teal border and ★ badge
- Added Version C screen recording to demo videos section (ranked first, teal border treatment)
- Added screenshots: `teal-screenshot.png`, `white-screenshot.png`, `fullheight-screenshot.png`

### Scan Success Sound (all versions)
- Added `success-ding.m4a` playback on every successful container or user QR scan
- iOS fix: replaced `new Audio().play()` (blocked by iOS from setInterval) with `AudioContext` approach — unlocks + decodes audio buffer on first `touchstart`/`click`, then plays via `createBufferSource()` from any context

### Success Modal (all versions)
- Enlarged 30%: max-w-md → 36.4rem, padding p-8 → p-10, checkmark circle w-24 → w-32, icon w-12 → w-16, heading text-3xl → text-4xl, body text-lg → text-xl, button py-4/text-lg → py-5/text-xl

## 2026-03-05 — Session 2

### Bug Fixes
- **Camera**: Switched `facingMode` from `'environment'` (back) to `'user'` (front camera) on both PWAs
- **PWA install error on GitHub Pages**: Fixed `manifest.json` `start_url` and `scope` to use full `/checkout-rework/` prefix; updated all service worker asset paths to match

### UI Scale Pass (index.html)
- Header height increased 72→96px; USEFULL logo h-9→h-14
- Step indicators moved into header (merged `StepStrip` into `Header` component); separate `StepStrip` component removed
- Reticle shrunk from 55% → 44% width to avoid crowding larger text
- `InstructionOverlay` heading text-2xl→text-4xl, subtext text-sm→text-xl
- `CountCard` width w-52→w-64, number text-7xl→text-8xl
- Footer height 56→68px, icon w-7→w-9, text-sm→text-base
- `ErrorToast` text-sm→text-lg
- `TimeoutBar` height 6→8px

### index.html Layout Refinements
- Removed Pioneer State University logo from header
- Step indicators repositioned to right corner of header (logo left, steps right)
- `CountCard` moved from vertically-centered right (`top-1/2 -translate-y-1/2`) to bottom-right (`bottom-6`)

### Alt PWA (Version B — Split Panel)
- Created `alt/` as a fully isolated second PWA with its own manifest, service worker, and scope (`/checkout-rework/alt/`)
- White header with teal USEFULL logo; no Pioneer State logo
- Landscape: large square camera box anchored left, info panel (instructions + counter + download button) on right
- Portrait: full-bleed camera with frosted instruction overlay top-center and frosted counter overlay bottom-right; footer strip with download + cancel
- `DownloadModal` ported from index.html, styled for white/light theme
- Portrait mode detected via `window.matchMedia('(orientation: portrait)')` with live listener
- Portrait text sizes increased: heading text-5xl, subtext text-2xl, counter number 8rem, footer text-base
- Service worker isolated at `alt/sw.js` with cache name `usefull-kiosk-alt-v1` to avoid scope collision with main SW

### Real QR Code Scanning
- Added jsQR v1.4.0 via CDN to both `index.html` and `alt/index.html`
- `CameraView` (index.html) and `CameraBox` (alt) each run a 200ms scan loop on a hidden canvas
- **index.html**: Canvas cropped to the reticle region (44% width, 4:3 aspect, centered) using object-cover math before passing to jsQR
- **alt**: Canvas cropped to the full visible camera box area
- Decoded result: `atob()` attempted first (base64), falls back to raw string
- Prefix routing: `cup…` → `handleScanContainer()`, `user…` → `handleScanUser()`, else → error toast
- Two-layer duplicate scan prevention:
  - Camera-level `lastSeenRef` (useRef, persists across effect re-runs) suppresses repeated calls while the same QR stays in frame
  - App-level `scannedCodesRef` (Set) hard-blocks any code already scanned this session; cleared on `handleCancel()`
- Dev simulation overlay (`DevControls`) hidden from both PWAs (component kept, not rendered)

### Stakeholder Guide (help.html)
- Created `help.html` at repo root with full stakeholder review guide
- Sections: intro, problem statement (original design screenshot + 3 issue callouts), two/three version cards with links, PWA install instructions (iOS + Android), how-to-use walkthrough, test QR codes (3 cups + 1 user), prototype notes
- Uses USEFULL-Logo-Registered_KnockOut.svg in teal header (replaced inline SVG)
- Screenshot replaced with `screenshot-original.png` (no browser chrome)
- Footer callout clarifies missing app download CTA for new users
- How-to-use copy updated: any valid USEFULL QR code works, sample codes are for convenience only
- Demo Videos section: 4 videos (Version A screen recording + real-world, Version B screen recording + real-world) as Google Drive embeds in a click-to-open modal (iframe, closes on backdrop click or Escape)
- QR code images committed to `qr-codes/` and served from GitHub Pages

### Version C PWA (fullheight/)
- Created `fullheight/` as a third isolated PWA (`/checkout-rework/fullheight/` scope)
- No header bar; camera fills full height minus padding, capped at 50% width (tall rectangle, not square)
- Right panel uses three-zone layout: USEFULL logo pinned top, instruction + counter centered in flex-1, cancel/download anchored bottom
- "CHECKOUT STATION" subtitle displayed under logo in pre-scan state; disappears after first scan
- Bottom zone shows download button (idle) or cancel button (scanning) — never both simultaneously
- Logo sized h-16 with pt-8 top padding to prevent clipping
- `CountCard` tightened: px-8 py-6 → px-6 py-4, number 7rem → 9rem
- Version C added to help.html version cards

### Project Config
- Added `CLAUDE.md` with git workflow rules: never prompt to commit/push unprompted; when asked, execute immediately

## 2026-03-04 — Initial Build

### Layout Overhaul
- Replaced iPad-mini simulation frame with full-viewport layout ready for real tablet deployment
- Implemented "teal sandwich" design: teal header, white step strip, full-bleed content area, teal footer
- Added USEFULL knockout logo (left) and Pioneer State University logo (right) in header

### Camera Feed
- Camera preview now fills the entire content area via `getUserMedia` (was a 224px centered box)
- Added darkening vignette overlay for text legibility over live feed
- Graceful fallback when camera is unavailable

### Reticle & Scanning
- Teal corner-bracket reticle overlay at ~55% width with 4:3 aspect ratio
- Animated scan line sweeps vertically during active scanning

### Container Count Card
- Frosted glass card (backdrop blur) floats on right side over camera feed
- Slides in on first scan, count pops on each new container
- "Added" chip with animated checkmark for scan feedback

### Step Indicators
- Moved to dedicated white strip below header (was embedded in header)
- Active step gets ring highlight, colors transition with state

### Timeout Bar
- Increased to 6px height (was 2px), positioned below step strip on white background for visibility
- Color shifts teal → amber → red as time runs low

### Error Toast
- Fixed infinite bounce animation — now slides up once and stays static
- Semi-transparent dark backdrop with blur, positioned above footer

### Footer
- Teal footer bar with app-download icon + helper text (left-aligned)
- Cancel button appears on right when items are scanned
- Clicking download icon opens app download modal

### Download Modal
- "Download the USEFULL app to get started!" header with app-download icon
- Side-by-side QR codes for iOS (Apple logo) and Android (Android logo)
- Closes on X button or backdrop click
- Placeholder QR patterns — swap with real app store URLs

### Success Modal
- Refined to match teal sandwich palette
- Pulsing glow animation on checkmark circle

### Typography
- Plus Jakarta Sans for headings/display text
- DM Sans for body/labels
- Sized for kiosk readability at arm's length

### PWA
- Added `manifest.json` with standalone display, landscape orientation, teal theme
- Service worker (`sw.js`) with cache-first for local assets, network-first for CDN
- Apple mobile web app meta tags for full-screen home screen launch on iPad
- SVG favicon and touch icon using USEFULL brand icon

### Code Structure (for RN handoff)
- Components separated: `Header`, `StepStrip`, `TimeoutBar`, `CameraView`, `Reticle`, `InstructionOverlay`, `CountCard`, `ErrorToast`, `Footer`, `DownloadModal`, `SuccessModal`, `DevControls`
- `COLORS`, `TIMING`, `LAYOUT` constants extracted at top of file
- State machine in `App` component is portable — swap rendering layer, keep logic
