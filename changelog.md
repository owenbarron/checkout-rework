# Changelog

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
