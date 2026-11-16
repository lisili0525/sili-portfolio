# Sili's little house

A buildless HTML/CSS/JavaScript portfolio. Open `index.html` in a browser; no dependency installation is needed. Google Fonts are optional, with local fallbacks.

Source repository: https://github.com/lisili0525/sili-portfolio

## Current experience

- Complete, proportionally fitted, non-scrolling room with eight accessible object controls and a floating Explore menu.
- Explore closes with Escape (returning focus to its toggle), an outside click, or focus moving to another room control.
- Click either moving cat to meet Viola & Java, or use Explore. Their click targets follow them; the old fixed window target is removed. They continue moving autonomously.
- Content dialogs with Escape, close button, outside-click dismissal, and focus restoration.
- Separate clean room and transparent Sili character layers, preserving the approved cartoon direction.
- Piano selection opens the music collection while Sili approaches the bench, then plays the supplied “One Summer’s Day” recording. Closing the dialog leaves him playing. During an active performance, other objects open content while Sili stays at the piano with animated hands. Album content opens directly during music, with no pickup. Stop or recording end restores normal object activities and album pickup; mute keeps the performance active. Music-list, mute and stop controls are available within other content views too. Selecting a recording restarts it.
- Reduced motion skips walking and uses a still seated pose. Hiding the page pauses the performance; resuming requires a button press.
- `pianoRecordings` at the top of `piano.js` currently contains only “One Summer’s Day”, using `assets/music/one-summers-day.m4a`. Add future supplied recordings there. Mute is remembered during the session; the recording stops at its end without looping. If playback after the approach is blocked, use Play recording in the music list. Inactive-page resume remains explicit.

The first animation uses a single stride pose with a small bob and a rear-facing seated piano animation with five playing frames, alternating slight hand lifts, and a separate idle frame. Head and seat registration remain fixed. Viola and Java now use separate transparent six-pose sprite sheets and independent ambient routines. Viola leaves and returns through the window via the stool; Java plays indoors and can watch from the sill. Inactive-page suspension, content-view suspension and reduced-motion resting poses are implemented. Their visual placement is awaiting browser review. The original concept art is retained under `concepts/`. See `assets/README.md` for asset dimensions and generation prompts.

## Photo album

The open album on the foreground table and the Rachel-and-Sili wall portrait both open an eight-page book (four spreads). Slot 1 contains the supplied festive-photo cartoon; slot 3 contains the supplied tennis-photo cartoon. The seaside cartoon is in slot 4, with the two cat cartoons together in slots 5–6. Slot 2 holds the family portrait; slots 7–8 show Sili bench pressing and Rachel dancing hip-hop. All eight spaces are filled. The original wall portrait stays only on the wall. The book appears directly over the room with no panel, heading or toolbar. Sili approaches the foreground table, reaches for the album and lifts it before the book opens. Reduced motion opens it immediately. Click or drag its lower corners, or use arrow keys. The page follows the drag, then completes the turn or returns. Reduced motion skips page turns. Configure reviewed images and captions in `albumPages` at the top of `album.js`.

The active room artwork is `assets/room-clean-v5.png`: the coffee-cabinet plant and bottom-right leaves are removed, and matching tieback curtains frame the window. Other wall photos are removed and the coffee cabinet is shifted right. Piano geometry and calibrated Sili scale are preserved.

## Verification

JavaScript syntax and simulated piano lifecycle checks passed: interruption, stop, reduced motion, mute, page inactivity, explicit resume, and recording end. Asset dimensions and true sprite transparency were checked. These checks do not replace real browser visual, keyboard, touch, fullscreen, or audio-policy verification. Desktop and portrait-phone review, especially bench alignment and small-screen controls, remains required before release.

## Next milestones

Review the physical album, cat routes, piano placement and mobile framing; review the new destination activities and later add optional floor/keyboard navigation. Public contact links, photos, project evidence, milestones, and recordings still need Sili's input. GitHub Pages deployment is configured below.

Controlled logic checks are in `checks/album.cjs` and `checks/cats.cjs` (run from the repository root with Node). They passed in the available JavaScript runtime; they do not verify browser layout, touch or focus. Browser access was unavailable in the latest continuation.

## Sili’s room activities

Coffee: rear-facing preparation, relaxed counter lean, occasional sips, and cup placement before departure. Desk: seated typing, notebook writing and thinking pauses. Album: foreground approach, pickup before opening, and return to the table on close. Calendar, tennis and cats have destination poses too. New selections interrupt old journeys; inactivity freezes progress and reduced motion uses immediate arrivals/still poses. Smaller content windows use translucent backgrounds and opaque text, leaving the activity visible. The book keeps its physical presentation.

`checks/actions.cjs` tests integrated interruption and prop cleanup; `checks/piano.cjs` checks piano controls. Static pose compositions were inspected, but real browser animation, mask rendering, translucent readability and mobile framing remain unverified.

Workstation artwork uses `sili-computer-v3.png` and the approved, unchanged `sili-writing-v2.png`. The separate chair is pulled slightly away from the desk, with a depth mask covering receding legs. The work routine alternates the two still illustrations; the old shared desk sheet is no longer active. Static compositions were reviewed, while actual browser rendering and visual approval remain pending.

Latest review: both sleeping cats were checked in original and mirrored facing with the existing 9% edge clip; no detached paw appears in the static preview. `checks/sleeping-cats.ps1` reproduces the alpha check and writes `tmp/sleeping-cats-review.png`. It uses Windows System.Drawing; no PNG source is changed. All five controlled JavaScript suites passed, including expanded Explore dismissal checks in `checks/dialogs.cjs`. The browser access host remains unavailable, so these results do not verify live CSS masks, native focus behavior, animation timing or touch/mobile layout.

## Responsive sizing

The complete 1672 × 941 room fits inside the viewport, with borders when screen proportions differ. Artwork, characters and hotspots scale together. CSS recalculates sizing on window resizing, orientation changes and fullscreen transitions. Standard `vh` declarations precede dynamic `dvh` units for older browsers. Fullscreen supports both standard and WebKit methods and stays hidden when unsupported. Chrome, Edge, Firefox and Safari on desktop, plus mobile browsers, are the intended targets; real-device visual and interaction review is still required.

## Deployment

Public website: https://lisili0525.github.io/sili-portfolio/

Pushing to `main` runs the interaction checks, builds the public files with `node scripts/build-static.cjs`, and deploys `dist/` through GitHub Actions. The artifact includes the seven website files and referenced assets, excluding project notes and unused artwork. You can also run the Deploy personal website workflow manually. A custom domain can be connected later through the repository’s Pages settings and your domain provider’s DNS settings.
