# Sili's little house

First local interaction prototype. Open `index.html` in a browser. No installation or build step is needed. An internet connection is optional for the Google Fonts; local serif and sans-serif fallbacks are provided.

## What works

- Seven clickable room areas with keyboard-accessible controls.
- Focused content dialogs, Escape/close/outside-click dismissal, and focus restoration.
- A destination list, automatically visible on phones.
- Responsive room art and reduced-motion styling.

The room fills the browser viewport without page scrolling. Artwork and hotspots scale together using cover sizing; peripheral objects may be cropped on narrow screens and remain accessible through the floating Explore menu. Long content scrolls only inside its dialog. Browser visual verification of the fullscreen revision is still pending.

## Animation plan

The concept PNG is a single flattened image. Its people and cats cannot move independently. Do not animate that entire image to simulate character movement.

1. Create a clean room background without Sili or cats; preserve the framed couple portrait.
2. Export separate transparent character art: Sili idle/walk; Viola sit/walk/window hop; Java sit/walk/play/window watch.
3. Put the characters in positioned layers above the background and define floor routes, perches, and window entry points.
4. Start with idle breathing/blinking and simple movement. Add walking frame cycles next, followed by the cats' different behaviors.
5. Make reduced motion, ambient pause, keyboard access, and interruptible movement part of each step.

No animation software expertise is required from Sili. The next review should check object placement, content, and mobile usability before producing the separate art assets.

## Content still pending

Real photos, detailed project artifacts, milestone dates, coffee journal entries, contact URLs, and a public résumé. No placeholder contact destinations or unavailable music players are published in this prototype.
