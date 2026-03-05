# USEFULL Checkout Kiosk — Design Overview

## What This Is
A tablet-based checkout kiosk for dining halls. Users scan reusable containers (via front-facing camera) and their personal QR codes to check out containers to their accounts.

## Current State (`index.html`)
- iPad-mini-sized frame (1024x768) with white background
- Teal header bar with USEFULL logo + step indicators (1: Scan Items, 2: Scan User)
- Small centered camera preview box (224x224px, black with teal corner brackets)
- Right-side panel slides in showing container count when items are scanned
- Cancel button at bottom, success modal overlay on completion
- 30-second timeout bar (thin, at top)
- Built with React 18 + Tailwind (CDN, in-browser Babel)

## Known UX Problems
1. **Camera feed spatial mismatch** — The centered black box on screen doesn't align with the physical camera position (top bezel). Users look at the screen to aim but should be looking at the camera.
2. **Camera preview too small** — 224px box feels cramped, hard to see what's being scanned.
3. **Container count panel too small** — `w-48` (192px) with small text, easy to miss in peripheral vision.
4. **Error toast bounces infinitely** — `animate-[bounce_1s_infinite]` is distracting on a kiosk.
5. **Timeout bar barely visible** — 2px height at the top is easy to miss.

## Future State (`future-state.png`)
A mockup for when kiosks have a physical RFID/NFC reader attached (no camera scanning needed). Key design elements:
- **Teal header bar** — full-width, USEFULL logo (white) on left, university logo on right
- **Step indicators** — centered on white strip below header: ① SCAN ITEMS — ② SCAN USER
- **Large bold heading** — "Scan your containers" in dark serif/sans text
- **Subtitle** — "Hold each container over the scanner" in lighter gray
- **Center illustration** — isometric drawing of reader device with containers/cards
- **Teal footer bar** — "Use your campus ID or Mobile ID — no app needed." with settings icons bottom-left
- Overall: clean, instructional, lots of white space

## Design Direction: "Teal Sandwich" with Full-Screen Camera
Merge the current camera-scan flow with the future-state visual language:

### Shared Chrome (identical in both states)
- Teal header bar (logo + school branding)
- Step indicator strip on white below header
- Teal footer bar with helper text + icons
- Typography: same heading/subtitle hierarchy

### Content Area (what changes)
| Current (camera scan) | Future (physical reader) |
|---|---|
| Full-bleed camera feed fills the content area | White background with illustration |
| Heading + subtitle in white (over camera) with text shadow or dark pill | Heading + subtitle in dark text on white |
| Teal corner-bracket reticle overlay (~60-70% width) | No reticle needed |
| White floating card for container count (right side, backdrop blur) | Count handled differently |
| Cancel button as white outline over feed, or in footer | N/A |

### Key Principles
- **Same shell, different content** — Users build the mental model: "teal top, teal bottom, I do my thing in the middle"
- **Camera feed is the background**, not a small preview box — eliminates spatial mismatch
- **Larger everything** — bigger reticle, bigger count panel, bigger text for kiosk readability
- **Text over camera** needs legibility treatment (text shadow, semi-transparent backdrop pill)
- **Step bar stays on white strip**, not over camera feed

## Brand Colors
- Deep teal: `#008C95` (primary)
- Gold/amber: `#D5992C` (accent, used in USEFULL logo bowl)
- Dark gray: `#58595b` (used in logo ® symbol)

## Tech Stack
- React 18 (CDN, `react.development.js`)
- Tailwind CSS (CDN)
- Babel standalone (in-browser JSX)
- Single `index.html` file, no build step
