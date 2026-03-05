# Changelog

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
