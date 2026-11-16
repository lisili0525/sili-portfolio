# Sili's little house

A buildless HTML/CSS/JavaScript portfolio. Open `index.html` in a browser; no dependency installation is needed. Google Fonts are optional, with local fallbacks.

Private source repository: https://github.com/lisili0525/sili-portfolio

## Current experience

- Edge-to-edge, non-scrolling room with seven accessible object controls and a floating Explore menu.
- Content dialogs with Escape, close button, outside-click dismissal, and focus restoration.
- Separate clean room and transparent Sili character layers, preserving the approved cartoon direction.
- Piano selection opens the music collection immediately while Sili approaches the bench and changes to a playing pose. Closing the dialog leaves him playing. Stop playing or another destination ends the performance.
- Reduced motion skips walking and uses a still seated pose. Hiding the page pauses the performance; resuming requires a button press.
- No audio is configured. `pianoRecording` at the top of `piano.js` reserves `src`, `title`, and `note` for Sili's own future recording. With audio supplied, the performance offers mute and explicit playback fallback, remembers mute during the session, and stops at recording end without looping.

The first animation uses a single stride pose with a small bob and a seated playing pose with a small sway. Viola and Java are temporarily absent from the scene while their separate assets are prepared; their descriptions remain available. The original concept art is retained under `concepts/`. See `assets/README.md` for asset dimensions and generation prompts.

## Verification

JavaScript syntax and simulated piano lifecycle checks passed: interruption, stop, reduced motion, mute, page inactivity, explicit resume, and recording end. Asset dimensions and true sprite transparency were checked. These checks do not replace real browser visual, keyboard, touch, fullscreen, or audio-policy verification. Desktop and portrait-phone review, especially bench alignment and cropped piano access, remains required before release.

## Next milestones

Review piano placement and mobile framing; add separate Viola and Java assets and autonomous routines; extend Sili's movement to other destinations and optional floor/keyboard navigation. Public contact links, photos, project evidence, milestones, and recordings still need Sili's input. No website deployment has been performed.
