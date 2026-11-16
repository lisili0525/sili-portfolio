# Sili's little house

An illustrated personal portfolio built with React 19 and Vite. The room keeps its existing artwork, proportional viewport sizing, layered character animation, autonomous cats, music playback and physical photo album.

## Local development

Use Node.js 22.22.2 or newer in the 22.x line, Node.js 24.15 or newer in the 24.x LTS line, or Node.js 26+.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally http://127.0.0.1:5173/. Opening index.html directly from the filesystem is no longer supported. The React application is published through the GitHub Pages workflow described below.

```sh
npm test
npm run build
npm run preview
```

## Architecture

- `src/main.jsx` mounts React with StrictMode.
- `src/App.jsx` owns navigation, content dialogs, focus restoration and album selection.
- `src/components/Room.jsx` renders the stable room, character and cat layers and accessible object buttons.
- `src/components/PhotoAlbum.jsx` renders the eight-page album, pointer-driven page turns and keyboard controls using React state.
- `src/components/PianoControls.jsx` renders recording, mute, resume and stop controls from the playback state.
- `src/hooks/useRoomRuntime.js` creates and disposes the room controllers with React's lifecycle.
- `src/hooks/useFullscreen.js` manages standard and WebKit fullscreen with state and effect cleanup.
- `src/controllers/journeys.js` preserves the calibrated action sequences and prop cleanup. It animates only the stable sprite refs rather than rebuilding React UI each frame.
- `src/controllers/cats.js` runs autonomous cat routes across the floor, piano bench and top, coffee counter and table, bookcase, desk, chair, sofa and window, with reduced motion and inactive-tab suspension.
- `src/controllers/piano.js` owns the audio resource and performance lifecycle, publishing playback snapshots to React.
- `src/data/` holds the JSX content and album image metadata.
- `styles.css` preserves the approved visual design, sprite sheets and depth masks.

Controllers receive a scoped DOM root and explicit services. No global window.sili APIs, dynamically injected script tags, generated HTML strings or parallel legacy application are used. Every animation loop, event subscription and audio resource has lifecycle cleanup, including StrictMode remounts.

## Artwork

The active background is `assets/room-clean-v7.png`. Its window opens outward, preserves the original height and has a slightly reduced width. Coffee-cabinet and bottom-right plants have been removed, with matching curtains on both sides of the window. Localized depth masks retain their calibrated source assets. All character, cat and album imagery remains unchanged. Asset history is in `assets/README.md`.

The complete room fits inside the viewport with borders when screen proportions differ. Artwork, sprites and hotspots share one proportional stage. Dynamic viewport units have standard-unit fallbacks. Fullscreen stays hidden when the browser does not support it. Google Fonts are optional and have local fallbacks.

## Validation

`npm test` runs React integration tests and controller regression checks in jsdom. Coverage includes StrictMode cleanup, navigation and focus, interrupted album pickup, album boundaries and pointer cancellation, music during browsing, autoplay rejection, mute, recording end, inactive-tab resume, reduced motion, standard/WebKit fullscreen, repeated furniture tours, perch reservations and safe evacuation for person activities. These checks do not verify actual audio decoding, native dialog behavior, CSS masks or rendering on every physical device.

## Build and deployment

Live site: https://lisili0525.github.io/sili-portfolio/

The GitHub Actions workflow installs locked dependencies, runs tests and builds with Vite before deploying `dist/`. Relative build URLs support both GitHub Pages project paths and custom-domain roots. The artwork plugin copies only runtime-referenced artwork; Vite handles CSS sprite assets. Project notes, checks, unused artwork and local dependencies are excluded from the deployment artifact. `node scripts/build-static.cjs` remains a compatibility entry point for the Vite build.

No backend, database or account integration is required. Music uses the supplied `assets/music/one-summers-day.m4a` recording. Browsing other content keeps an active performance at the piano; stopping releases the character for other activities. Inactive-tab resume remains explicit.

## Cat exploration

Landing anchors and stepping-stone routes are configured in `src/data/catSurfaces.js`. Both cats cycle through shuffled tours so each available destination is visited before repeating. Furniture groups are reserved for one cat at a time; character activities temporarily exclude their corresponding furniture. Cats descend before another excursion, scale with depth, and use eased jump arcs. Viola retains occasional outdoor trips and returns through the window, while Java remains indoors. Opening content normally freezes cat activity; a cat on furniture needed by the person first jumps down to clear it. Reduced motion returns both cats to still floor poses.
