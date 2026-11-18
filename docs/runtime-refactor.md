# Runtime refactor experiment

Branch: `refactor/scene-runtime`
Reference implementation: `8c997a3` (plus the documentation cleanup in this worktree)

## Approved scope

Prototype PixiJS + XState + TypeScript before deciding whether to migrate the room. Preserve the approved artwork, composition, dimensions, movement speed, gait, timing, occlusion, content-opening rules, keyboard/focus behavior and audio lifecycle. Small renderer-dependent pixel differences are acceptable. Cover current Chrome, Safari and Firefox, plus responsive phone portrait/landscape layouts and touch interaction. Personalized computer/notebook UI is separate; the album remains out of scope.

## Current implementation

- `/?demo=runtime` is a lazy-loaded experiment available in development and the explicit `runtime-preview` build mode. Normal navigation still renders `App` and the original controllers. Normal production builds remove the prototype import and its packages from the application bundle.
- PixiJS directly owns its canvas, person, Java and a sofa foreground crop. The approved room remains a frozen registered-PNG backdrop through DOM/SVG wrappers. This is a hybrid rendering experiment, not full renderer parity.
- XState owns the selected journey identity and idle/moving transitions. Numeric interpolation stays outside React and XState. Late completion events cannot finish a replacement request.
- The runtime owns one private Pixi ticker. It runs while movement is active, stops on idle/pause/visibility loss, and clamps delta time. Rendering uses the canonical 1672 × 941 coordinates; CSS scales the canvas with the unchanged room geometry.
- Sprite cells reuse the current artwork. Walking retains 14 world-percent units/second, a 12-unit six-frame gait cycle, per-frame sole registration and foreground perspective growth. Java uses the existing smoothstep interpolation, duration and sine jump arc, with supported depth independent of jump height.
- Person cancellation freezes travel at the current location; a cat jump finishes safely. Reduced motion resolves finite actions immediately. Accessible HTML controls remain outside the inert reference backdrop.
- StrictMode initialization uses an abort signal. Pending asset completion after cleanup cannot append an orphan canvas. Runtime destruction stops its actor/ticker, listeners and frame/foreground resources; shared source textures remain in Pixi's bounded asset cache.
- Failure to initialize offers a link to the unchanged original room. Context-loss recovery is still a migration requirement.

## Validation and reproducibility

Commands:

```sh
npm ci
npm run typecheck
npm test
npm run build
npm run test:browser
npm run dev
```

The browser matrix uses Chromium, Firefox, WebKit, Pixel 7 emulation and iPhone 13 emulation. It checks the original content split, focus restoration, piano browsing, viewport geometry and prototype replacement/cancellation, pause, safe landing, reduced motion, initialization and screenshots. Browser engines and device emulation do not establish real Safari/iOS/Android hardware support, actual audio output or performance.

`tmp/baseline/` contains deterministic-seed original-room screenshots and a Chromium frame-time/long-task sample with machine/browser metadata and a DevTools timeline. Conditions are a local development server with warmed artwork in a headless browser; the sample is diagnostic, not a production benchmark. `tmp/prototype/` contains idle, mid-walk, arrival and portrait screenshots. Browser failures retain Playwright traces in `tmp/browser-results/`. Generated artifacts stay ignored.

## Current verification results

- 56 Vitest tests across eight suites pass; TypeScript checking, production build and diff checks pass.
- 31 browser checks pass across the five configured projects. Four duplicate performance samples are deliberately skipped because only the desktop Chromium reference records a trace.
- The Pixi experiment and object-library interfaces remain excluded from the normal production build. The later, owner-approved transparent asset extraction changes the normal room artwork implementation; see the asset guide. The earlier prototype-only bundle-hash comparison no longer describes the complete branch.
- On Apple M2 / macOS Darwin 25.5.0 / headless Chromium 159.0.8154.6, the three-second warmed idle and journey samples each have approximately 16.7ms frame-interval P95, zero intervals over 33.34ms and no observed long tasks. This short development-server sample is not a universal 60fps guarantee or evidence that Pixi is faster.
- Idle, paused mid-walk and portrait screenshots were inspected. They establish that the prototype renders, not full pixel-level parity across every animation frame.

## Migration decision

**The full migration gate remains open for evaluation, not passed.** No performance improvement is claimed. The current prototype has fewer active systems than production and therefore cannot support a fair full-scene performance comparison.

Before replacing the production renderer:

1. Capture matched poses/times for all six walk frames, jumps and foreground crossings; compare registration and edges against the original renderer. Current screenshots are review artifacts, not approved golden images.
2. Migrate a complete representative furniture/activity group, its hit area, foreground pieces and reservations into the prototype. The frozen reference backdrop cannot validate whole-room canvas cost or pixel parity.
3. Add equivalent-workload production-build traces, input latency, startup, texture memory and same-page repeated mount/unmount resource measurements. Full page reload checks only establish initialization reliability.
4. Exercise visibility/background transitions, WebGL context loss, error recovery and native keyboard/touch behavior, plus real Safari and representative iOS/Android devices.
5. Proceed activity by activity only when the evidence supports a benefit without behavior or visual regression. Retain the original renderer if the canvas approach does not pass; typed behavior separation remains useful independently.

Motion is deferred until an authorized HTML transition needs it. The existing album and UI timings are unchanged; adding a package without using it would not simplify this experiment.

## Remote preview

The owner explicitly approved an independent public preview on November 16, 2026. `npm run build:preview` builds the prototype-enabled copy under ignored `tmp/runtime-preview/site/dist`; the normal `npm run build` remains unchanged. The Sites project is `appgprj_6afbe6bf9ff48191a24b08b91585c62b`, persisted in the isolated preview project's `.openai/hosting.json`. Only built static files are uploaded to its separate source repository. This does not push the portfolio GitHub branch or update `silispace.net`. The preview has no automatic expiry; it must be taken offline separately when review ends.

Published review URL: https://sili-runtime-preview.icychestnut1.chatgpt.site/?demo=runtime . Sites version 3, deployment `appgdep_6afc0100438c81919779e528370c9ef3` reports `succeeded`. The independent object library is available at `/?demo=objects`. Public review does not require the phone and workstation to share a network.

## Reusable transparent asset extraction

The owner approved all-object transparency, a bare architecture background, individually reusable books/ornaments, grouped plants and local hidden-surface repairs. This is implemented separately from the Pixi migration: 87 genuine-alpha room layers, 40 source-cell character frames and 20 stable book slots are saved locally. The normal room now consumes these PNGs rather than full-room raster clips. Original sources and all existing behavior controllers remain. See [asset guide](../assets/objects/README.md), [full provenance](../assets/objects/manifest.json), and [repair prompts](../assets/objects/prompts.md).

The preview-mode asset library is `/?demo=objects`. Its inspection interface does not add book stories or change normal navigation. Original room-edge crops are explicitly flagged, and whole-object pixel parity still requires owner review. Cross-browser automation covers native window/curtain input, seated foregrounds and individual book inspection; real phone hardware is not simulated by this result.
