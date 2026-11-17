# Animation and Scene Architecture Update Proposal

Research date: November 16, 2026

Status: proposed architecture, supported by documentation and implementation references; not yet validated against a browser prototype of this portfolio.

## Objective and decision

Rebuild the underlying animation architecture where doing so improves the result. Preserving the existing implementation is not a requirement. Preserving the illustrated appearance, composition, character identity, and approved interaction effects is a requirement.

This is a **desktop-first website**. Desktop visual quality, animation fidelity, and mouse/keyboard interaction are the primary design and acceptance targets. Mobile support is responsive adaptation: keep the site readable, touch-accessible, stable, and usable without requiring the same rendering quality or frame-rate target as desktop. Do not reduce the desktop experience merely to meet a phone benchmark.

Retain **PixiJS + XState + React + Motion + TypeScript** as the recommended candidate architecture. There is sufficient official documentation, example code, integration support, and evidence of practical use to justify a prototype. This is an engineering recommendation for this project, not a prescribed stack from the web-animation skill and not a claim that these libraries automatically improve performance.

The first deliverable should be a representative scene prototype. Commit to the complete renderer migration only after that prototype demonstrates desktop visual fidelity, reliable interactions, and desktop performance, with a separate mobile usability check.

This proposal does not authorize implementation, dependency installation, deployment, or changes to the website's behavior. The current task changes this planning document only.

## Evidence of ecosystem maturity

The assessment below distinguishes documented capabilities, published examples, and project-specific conclusions. Vendor showcases demonstrate practical adoption but are not independent performance benchmarks. This research does not establish the exact combined stack as a standard portfolio template.

| Component | Documentation and practical evidence | Conclusion for this project |
| --- | --- | --- |
| PixiJS | Versioned guides cover rendering, scene graphs, events, assets, accessibility, and performance. Its official showcase lists games, tools, and interactive websites, including Google Research's Semantris and Cartoon Network projects. | Sufficient depth for an illustrated interactive room. Showcase entries do not prove their current versions or results match our desktop scene. [Guides](https://pixijs.com/8.x/guides/getting-started/ecosystem), [showcase](https://pixijs.com/showcase/ShowcasePage/) |
| PixiJS and React | The official ecosystem documents React integration and states that the current integration requires React 19 or higher. This repository already uses React 19. | An established integration path exists; independently validate compatible package versions before installation. A React wrapper remains optional. [Ecosystem](https://pixijs.com/8.x/guides/getting-started/ecosystem) |
| XState | Official stable-v5 documentation covers JavaScript/TypeScript state machines and actors. The React package has hooks, templates, and repository examples. Stately publishes implementation case studies for organizations including WebinarGeek, Fugo, and Koordinates. | Enough reference material for coordination, cancellation, and lifecycle management. The published business cases support maturity, not the correctness of our character model. [XState](https://stately.ai/docs/xstate/v5), [React integration](https://stately.ai/docs/xstate/v5/xstate-react), [case-study index](https://stately.ai/blog) |
| Motion | Official documentation covers React animation, gestures, layout, and motion values. Its example library includes dialogs, navigation, galleries, and interactions. Some examples require Motion+, so their availability must not be mistaken for a free implementation dependency. | A strong fit for the HTML interface and album gestures, without routing every frame through React state. [Motion values](https://motion.dev/docs/react-motion-value), [examples](https://motion.dev/examples) |
| Sprite and texture pipeline | PixiJS documents sprite batching and texture tradeoffs; its ecosystem includes AssetPack and animation integrations. | Transparent layers and atlases are established techniques. Our extraction, registration, and packing choices still need visual and memory validation. [Performance](https://pixijs.com/8.x/guides/concepts/performance-tips), [ecosystem](https://pixijs.com/8.x/guides/getting-started/ecosystem) |

Use stable releases with a committed lockfile. XState's documentation currently identifies v5 as stable; do not adopt a newer beta simply because it is newer. Target PixiJS v8 documentation for the prototype and avoid mixing old tutorial APIs with current code. Confirm Motion and any React binding against React 19 at implementation time.

## Current implementation and why a different architecture is worth testing

The application currently uses React 19 and Vite, with no animation package. CSS handles ambient loops and transitions. Custom requestAnimationFrame controllers handle journeys and cats. Character poses use raster sprite sheets. The room uses layered raster artwork clipped through SVG. The album combines pointer events, React state, CSS 3D transforms, and timers.

Existing strengths include furniture registries, calibrated support points, interruptible journeys, cat interaction handles, lifecycle cleanup, reduced-motion handling, focus restoration, and character-sheet predecoding. Preserve the knowledge encoded in these systems even when replacing their implementation.

Structural issues worth addressing:

- Character behavior, action sequencing, rendering, and DOM state are coupled in the controllers.
- DOM classes and data attributes act as a communication layer between independent systems.
- Person and cat updates run through separate clocks, with depth derived from DOM-published state.
- Movement updates positional and size properties that may incur layout work.
- Full-stage clipped artwork makes local bounds, transforms, and rendering cost harder to reason about.
- Album completion depends on manually coordinated timers and transition durations.

These are reasons to prototype a clearer design. They are not proof that the current site drops frames. No browser performance trace was collected during this proposal's research.

## Target architecture and ownership

```text
HTML / React interface
  content, navigation, dialogs, album, accessible controls
              | semantic commands and selected snapshots
XState behavior actors + typed scene model
  person, cats, reservations, activities, audio coordination
              | animation commands and completion events
PixiJS room runtime
  sprites, transforms, hit testing, occlusion, ambient effects
              |
Versioned asset manifest and authored scene data
```

### Rendering: PixiJS

Use PixiJS for the illustrated room: architecture, furniture, person, cats, local effects, and visual hit areas. Containers give each object a local coordinate system and group related artwork. Rendering order is explicit rather than inferred from CSS sibling selectors. [Scene graph documentation](https://pixijs.com/8.x/guides/concepts/scene-graph)

Keep a single application-owned scene update loop. A recommended order is: consume commands, advance movement and action clips, resolve interactions, update supported depth and occlusion, apply visual transforms, then render. Emit completion events when actions actually complete. PixiJS's ticker supports ordered callbacks and lifecycle control. [Ticker documentation](https://pixijs.com/8.x/guides/components/ticker)

Prefer direct PixiJS ownership behind a React host for the initial prototype. Evaluate the official React integration if it makes object composition clearer. In either approach, avoid React state updates for every sprite frame and avoid two systems writing the same transform.

Start with a widely supported rendering backend and test the supported devices. Do not make WebGPU, workers, custom shaders, or a physics engine prerequisites. Renderer selection should follow compatibility and measurements.

### Behavior: XState and typed models

Use state machines for discrete behavior and coordination, not numerical interpolation at display frequency. Keep positions and animation progress in the scene runtime; report meaningful events such as arrival, landing, contact readiness, and action completion to the actors.

Suggested responsibilities:

- Person actor: destination intent, leaving an activity, approaching, performing, and interruption.
- Cat actors: resting, roaming, approaching a perch, jumping, meeting, contact, and departure.
- Reservation coordinator: furniture ownership, evacuation, window access, and release on cancellation.
- Audio service/actor: loading, play attempts, blocked playback, pause, saved progress, end, and errors.
- Scene lifecycle: visibility and reduced-motion policy, loading, ready, and recovery states.

Use typed commands with stable identities and cancellation tokens. A replacement destination must invalidate stale arrival events. Active jumps may land before cancellation finishes. Resource release must be idempotent. Use explicit scene state rather than querying rendered pixels or DOM selectors to decide whether a cat occupies the window.

Keep small interface state, such as whether a menu is open, local to React unless cross-system coordination is actually needed. TypeScript should clarify event, asset, coordinate, and actor contracts rather than require rewriting every content file at once.

### Interface: React, HTML, and Motion

Keep readable content, links, buttons, dialogs, album pages, and audio controls in HTML. Use Motion for selected transitions and gesture values; use CSS for simple feedback. Do not move portfolio text into the canvas.

Retain native focus management, Escape handling, semantic controls, selection, and scrolling. A Motion exit animation must not accidentally remove a modal's focus protection before the visual exit completes.

For the album, retain its paper appearance and CSS 3D page geometry. Separate pointer tracking, release decisions, settlement, and committed page state. Consider distance and velocity, allow reversal during settlement, and derive completion from the animation lifecycle. Preserve keyboard navigation, bounds, pointer cancellation, and reduced-motion behavior.

Do not install GSAP alongside Motion by default. Reconsider it only if a demonstrated sequencing requirement cannot be expressed cleanly through the scene action system and existing tools.

## Visual and asset contract

Use the current 1672 × 941 room space as the canonical authoring coordinate system. Define one viewport-to-world transform for canvas rendering, pointer mapping, and any HTML hotspots. Preserve current letterboxing and mobile framing unless separately approved.

Record each renderable asset's source, crop bounds, pivot, local offset, scale, attachment points, hit contour, and depth role. Distinguish supported ground depth from jump height: a jumping cat's vertical arc must not accidentally change its floor ordering.

Simple Y-sorting is insufficient for the whole room. Furniture needs explicit rear and foreground pieces, with activity-specific occluders for seated desk poses, album pickup, and piano interactions. Validate contact points for hands, feet, cups, books, chairs, and perches.

Generate transparent pieces from approved source artwork wherever practical. Do not regenerate illustrations merely to simplify extraction. Retain original masters and deterministic extraction metadata. Preserve hidden-surface repairs and pen-free workstation underlays where needed.

Introduce texture atlases after a faithful initial scene exists. Preserve trimmed-frame offsets and pivots, add edge extrusion to prevent atlas bleeding, and test filtering at actual display scales. Keep distinct bundles for room essentials, character activities, album photography, and audio rather than one oversized atlas.

Compare formats using real output: lossless assets may be preferable for fine illustrated edges; lossy alternatives need approval through visual comparison. Network compression does not imply lower decoded GPU memory. Budget atlas dimensions, device pixel ratio, and texture residency independently.

More natural character movement may require additional authored frames or skeletal assets. Rendering libraries cannot invent missing poses. Consider Spine or Rive only as a separate art-production decision, with runtime and licensing evaluation, rather than a prerequisite for preserving the current look.

## Interaction and accessibility contract

Preserve current behavior during renderer parity work: physical journeys, cat meetings, safe window access, props, music while browsing, and explicit resume after backgrounding. Do not silently change when content opens.

Treat immediate Explore content, shorter choreography, and revised album gestures as separately reviewable experience improvements. They can follow parity, with clear before/after comparisons.

Canvas content is not automatically accessible. PixiJS provides an accessibility overlay, but it still requires configuration and testing. Prefer explicitly owned semantic HTML controls where they provide predictable names, focus rings, and focus restoration. Ensure the canvas and overlay do not create duplicate tab stops or duplicate actions. [Accessibility documentation](https://pixijs.com/8.x/guides/components/accessibility)

Maintain one reduced-motion policy shared across the scene and UI. Resolve finite actions into coherent final states, preserve content and feedback, and stop decorative movement. Stop scene advancement while hidden without catch-up bursts on return. Keep visual pause policy separate from audio resume policy.

## Performance and lifecycle requirements

Measure rather than assume that canvas is faster than the existing implementation. The relevant comparison includes loading time, frame-time distribution, input response, decoded texture memory, idle activity, and repeated-session resource growth.

Use one owned scene clock, time-based movement, bounded delta handling, and a deliberate idle strategy. Avoid running heavy rendering continuously when nothing visible changes. Scene interpolation and UI animation can use their own appropriate schedulers, but must never compete to own the same property.

Minimize large masks, filters, and unnecessary render targets. Do not assume GPU acceleration eliminates rendering cost. Pause and release resources deliberately, including tick callbacks, listeners, actors, pointer capture, audio, and textures. Test React StrictMode mount/unmount and asynchronous asset completion after disposal.

Provide a usable HTML content route if the scene cannot initialize. Choose context-loss recovery and retry behavior during the prototype; avoid a blank page or a nonfunctional loading screen.

## Prototype and migration plan

### Phase 0: establish the baseline

Capture the actual current application, including any uncommitted work; do not assume older README descriptions are authoritative. Inventory all active artwork and retain the existing code as a comparison implementation during migration.

Record stills and short clips for idle room, walking, each major activity, cat jumps, meetings, foreground crossings, window/curtain combinations, lamp, music states, and album. Capture the primary desktop viewport sizes first, followed by mobile portrait and landscape adaptation checks. Record performance traces on named desktop reference machines with browser versions and cache/network conditions; investigate phone performance when adaptation reveals a usability problem.

### Phase 1: representative vertical slice

Build a development-only prototype containing the real background, one foreground furniture group, the person walking, and one cat jumping onto furniture. Include crossing depth, a matching accessible HTML control, resize, reduced motion, pause/resume, cancellation, and teardown. Include a minimal XState interaction so the coordination boundary is exercised.

Compare direct PixiJS ownership and a React binding only if necessary. Record the decision. Keep the production renderer unchanged while this experiment runs.

### Phase 2: migration gate

Proceed only if the slice preserves appearance and interaction reliability while showing a meaningful engineering or measured runtime benefit. A larger initial bundle may be acceptable if justified by the result; a large desktop startup or runtime regression is not acceptable by default. Mobile adaptation must remain stable and usable, but desktop and phone rendering budgets need not be identical.

If desktop parity or desktop runtime behavior is unsatisfactory, retain the typed scene model and behavior separation while improving the existing DOM/SVG renderer. This fallback preserves the architectural benefits without forcing an unsuitable rendering backend. If only mobile adaptation is unsatisfactory, first evaluate resolution caps, fewer decorative effects, or a simpler mobile presentation while retaining content and interaction access.

### Phase 3: migrate complete activities

Move one complete activity at a time: its renderables, actions, reservations, props, cleanup, and accessible controls. Avoid production states where the old and new systems independently control the same actor. Port the remaining room and cat behaviors, then remove the superseded runtime after parity review.

### Phase 4: interface polish and delivery

Upgrade album interruption and UI transitions, tune assets and lazy loading, run the complete regression matrix, and document the architecture. Keep production deployment a separate action from implementation review.

## Acceptance and verification

The following are proposed acceptance criteria, not achieved results:

| Area | Required evidence |
| --- | --- |
| Visual parity | Matched viewport screenshots and clips with deterministic pose/time controls; review color, edge halos, crop seams, scale, foot registration, and occlusion. Agree image-diff tolerances after measuring browser antialiasing differences. |
| Behavior | Repeated destination changes, same-object clicks, cat replacement, cancellation during jumps/contact, window blocking, props returned exactly once, and stale events ignored. |
| Mobile adaptation | Check readable content, reachable controls, touch mapping, portrait/landscape layout, safe areas, and foreground/background behavior on iOS Safari and Android Chrome. Lower render resolution or decorative detail where needed. Desktop-equivalent frame rate and effect density are not acceptance requirements. |
| Desktop performance | Aim for sustained 60fps during representative activity on agreed desktop reference hardware; compare frame-time percentiles, long frames, mouse/keyboard response, cold startup, and idle cost against baseline. Check higher-refresh displays for time-consistent motion. Publish measurements before claiming improvement. |
| Accessibility | Keyboard access, visible focus, native dialog behavior, focus return, screen-reader names, content access without the canvas, and runtime reduced-motion changes. |
| Reliability | Actor/unit tests for transitions and resource ownership; browser tests for native input, rendering, focus, audio restrictions, and repeated initialization. No growth in owned listeners or scene resources across repeated cycles. |

Use seeded randomness and a controllable simulation clock in visual tests so autonomous cats do not invalidate comparisons. Retain current regression intent, while replacing tests that depend on removed DOM implementation details. Passing jsdom tests alone does not validate WebGL rendering, mobile behavior, or actual audio playback.

## Suggested module boundaries

```text
src/
  scene/
    model/        # IDs, world coordinates, supports, hit areas, asset metadata
    runtime/      # clock, commands, lifecycle, viewport transform
    rendering/    # Pixi application, sprites, layers, occlusion, effects
    actors/       # person, cats, activities, reservations, audio coordination
    assets/       # generated manifests and loading policy
  ui/
    navigation/   # React controls and scene command bridge
    dialogs/      # content and focus ownership
    album/        # page state, gestures, settlement, accessible controls
  test/
    behavior/
    browser/
    visual/
```

These are responsibility boundaries, not a requirement to create every directory immediately. Author activities as typed data where useful; avoid constructing a general-purpose game engine for one room.

## Remaining decisions

- Exact stable dependency versions and whether to use a PixiJS React wrapper.
- Primary desktop reference hardware, desktop browser support, and measured desktop performance budgets; secondary mobile adaptation targets and any reduced-quality presentation.
- Direct sprite extraction versus retained clipping for specific artwork pieces.
- DOM hotspot implementation and context-loss/content fallback.
- Final atlas grouping, texture formats, and resolution caps.
- Whether the owner wants changes to content-opening behavior after parity.
- Whether smoother character motion warrants additional artwork production.

The recommendation is retained because the component technologies are sufficiently documented and practiced. The remaining uncertainty is their measured fit to this particular artwork, interaction model, and device target. Resolve that uncertainty with the vertical slice before committing to a full rewrite.
