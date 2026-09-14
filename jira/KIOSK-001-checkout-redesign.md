# KIOSK-001 — Checkout Kiosk: Camera-First Redesign (Version C — Full Height)

**Type:** Feature / Design Overhaul
**Component:** Checkout Kiosk (`fullheight/index.html`)
**Status:** Done — delivered as stakeholder review build
**Reference screenshots:** See `jira/` directory

---

## Summary

Redesign the USEFULL checkout kiosk from a white-background, centered-box layout into a full-height split-panel PWA optimized for counter-top iPad kiosk use. The final version (Version C — "Full height") places a tall camera feed on the left and a structured instruction/counter column on the right, with no header bar — delivering maximum vertical camera real estate and clear arm's-length readability.

Three layout variants were prototyped and shared with stakeholders via `help.html`. Version C is the team recommendation.

---

## Background / Problem Statement

The original design (`screenshot-original.png`) had three core UX problems at counter-top kiosk distance (~2 feet away):

1. **Camera preview too small** — 224×224px centered black box, hard to line up when the device is flat on a counter.
2. **Text too small** — Instructions, step labels, and counter sized for close-up reading, not arm's-length use.
3. **No app download CTA** — New users at the kiosk had no way to discover or get the USEFULL app.

---

## Changes vs. Original (Version C)

### Overall Layout

| Original | New (Version C) |
|---|---|
| Single column, content centered on white | Two-column split: camera left, info right |
| 1024×768 landscape frame | Fills 100vw × 100vh, no fixed frame size |
| White (`#FFFFFF`) background | Warm light blue-gray (`#EEF2F3`) background with 20px padding around both columns |
| Teal header bar spanning full width | **No header bar** |

### Camera

| Original | New |
|---|---|
| 224×224px black box, centered in page | Tall rounded rectangle, `50% width × 100% height` of viewport |
| Small teal corner brackets on small box | `64×64px` teal corner brackets (6px stroke) at all four corners |
| No scan animation | Teal scan line sweeps top→bottom (2.2s loop, animates while scanning is active) |
| Black background (no camera feed in design) | Live camera feed fills the box (`object-cover`, mirrored horizontally) |
| Box suggests where to hold item | Camera panel IS the scan target — no spatial mismatch |

### USEFULL Logo & Header

| Original | New |
|---|---|
| Teal header bar with USEFULL logo (teal on teal, i.e. knockout) top-left | No header bar |
| Step indicators `① SCAN ITEMS — ② SCAN USER` inline in header, top-right | **Step indicators removed entirely** |
| — | USEFULL logo (teal color version) in right column, top zone, ~74px tall |
| — | "Checkout Station" label in teal below logo (idle state only — disappears once scanning starts) |

### Heading & Instructions

| Original | New |
|---|---|
| "Scan a USEFULL container to get started" — teal bold, centered, static | Dynamic: "Scan your containers" (idle) / "Scan more containers" (scanning) |
| Subtitle: none | Subtitle: "Hold each container in front of the camera" (idle) / "Or scan your QR code to finish" (scanning) |
| Text size: default Tailwind, ~1rem | Heading: `2.81rem`, subtitle: `1.4rem` |
| Font: system/Tailwind defaults | Plus Jakarta Sans (display) + DM Sans (body) via Google Fonts |
| Teal heading on white background | Teal heading on light background in right column |

### Container Count

| Original | New |
|---|---|
| Not present on initial screen | White card slides in on first container scan |
| Small right-side panel (`w-48`, 192px) noted as a known problem | Full-width white card in right column center zone |
| Small count text | Count number rendered at `10.53rem` (roughly 168px) |
| — | "Ready for Checkout" label (teal, uppercase tracked) |
| — | "Container(s)" label below number |
| — | "✓ Added" pill (teal, animated checkDraw) fades in/out on each successful scan |
| — | Number pops (scale bounce) on each new scan (`countPop` animation) |

### App Download CTA

| Original | New |
|---|---|
| Not present | White pill button always visible at bottom of right column (idle state) |
| — | Icon + "Download the app to get your USEFULL QR code!" |
| — | Tap opens Download Modal: iOS and Android QR codes side by side |

### Cancel Button

| Original | New |
|---|---|
| Not visible in step 1 | Replaces download CTA at bottom of right column once scanning starts |
| — | Red-outlined: `✕ Cancel` — resets all state |

### Success Modal

| Original | New |
|---|---|
| Not in original | Full-screen overlay with `blur(8px)` + 45% dark backdrop |
| — | Teal modal card (`max-width: 36.4rem`), rounded-3xl |
| — | White circle with animated teal checkmark + pulsing glow ring |
| — | "Checkout Complete!" heading, `4xl` |
| — | "[N] container(s) checked out to [User]" |
| — | "DONE" button (white on teal) dismisses and resets |
| — | Auto-dismisses after 4 seconds |

### Download Modal

| Original | New |
|---|---|
| Not present | Opens when download CTA tapped |
| — | iOS QR code + Android QR code side by side |
| — | Blur backdrop, close button, tap-outside to dismiss |

### Audio

| Original | New |
|---|---|
| No audio | Success ding (`success-ding.m4a`) plays on each successful scan |
| — | AudioContext initialized and audio file pre-decoded on first touch or click (iOS compatibility) |

### Error Toast

| Original | New |
|---|---|
| `animate-[bounce_1s_infinite]` — bounces forever | `slideUp` entrance, static, auto-dismisses after 3–4s |
| — | Red-tinted card with alert icon, larger text (`text-lg`) |

### Timeout

| Original | New |
|---|---|
| 2px red bar at top of page (barely visible) | 30-second countdown timer; resets on every scan; auto-cancels and resets session on expiry |

### PWA

| Original | New |
|---|---|
| Not installable | `manifest.json` + `sw.js` — installable via Safari "Add to Home Screen" (iOS) or Chrome prompt (Android) |
| — | `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style: default`, touch icon |

---

## Screens / States

| State | Right column shows |
|---|---|
| **Idle** | Logo + "Checkout Station" label / "Scan your containers" heading / download CTA |
| **Scanning (≥1 item)** | Logo only / "Scan more containers" + "Or scan your QR code to finish" / Count card / Cancel button |
| **Just scanned** | Count number bounces, "✓ Added" pill animates in for 1.5s |
| **Success** | Full-screen modal overlay (blurred background) |

---

## Files

| File | Role |
|---|---|
| `fullheight/index.html` | **Primary deliverable** — Version C, full-height split panel |
| `fullheight/manifest.json` | PWA manifest |
| `fullheight/sw.js` | Service worker for offline/install |
| `index.html` | Version A — full-screen camera with overlaid UI |
| `alt/index.html` | Version B — split panel with white header |
| `help.html` | Stakeholder review guide with all three versions, demo videos, QR codes, install instructions |
| `success-ding.m4a` | Scan success audio |

---

## Reference Screenshots

| File | Description |
|---|---|
| `screenshot-original.png` | Pre-redesign state (white bg, 224px camera box) |
| `screenshot-new-final.png` | Version C final — split panel, tall camera, right column |
| `screenshot-new-success.png` | Checkout complete modal |
| `screenshot-future-state.png` | Future-state mockup (physical RFID reader — same split-panel shell, no camera) |

---

## Out of Scope / Future Work

- Real API integration (currently parses `cup:ID` / `user:ID` QR code strings locally, no data persisted)
- University logo in header (future-state mockup shows this; not in current build)
- RFID/NFC reader support (`screenshot-future-state.png` — swap camera panel for illustration, same right column)
- Admin/settings UI
- Accessibility audit (WCAG kiosk context)
- Multi-language support
