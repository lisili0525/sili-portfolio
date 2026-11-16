# Sili's Little House — Project Handoff

Updated: November 16, 2026 (America/Chicago)
Workspace: /Users/lisili/sili-portfolio
Repository: https://github.com/lisili0525/sili-portfolio
Website: https://lisili0525.github.io/sili-portfolio/

## Current delivery

The application is a React 19 / Vite 8 illustrated-room portfolio, published through GitHub Pages from main. The user authorized synchronizing all current changes, pushing them, and deploying this release. Earlier private-only, buildless, local-only and no-deployment notes are obsolete. Keep code, comments, documentation and generated prompts in English, even when discussing changes in Chinese. Never discard unrelated work or force-push.

This handoff describes the final implementation; PRD.md records product requirements. Deployment status is established by the matching GitHub Actions run and remote commit, rather than a speculative success statement in this document.

## Architecture and commands

- App.jsx owns content, Explore, focus, dialog sequencing, album spread state and fullscreen controls.
- useRoomRuntime starts and disposes the piano, cat and journey controllers. React StrictMode must retain only the existing two continuous animation clocks.
- controllers/journeys.js owns interruptible person movement, props, activity poses and arrival promises. controllers/piano.js owns recording/performance state. controllers/cats.js owns autonomous routes and coordinated meetings.
- components/Room.jsx composes independent scene modules over assets/room-architecture-v2.png. src/scene/README.md describes ownership, state and artwork sources. /?demo=modules provides enlarged coffee/window previews.
- src/scene/furnitureCatalog.js and sceneObjects.js share the 1672 x 941 world, module placement, artwork masks and furniture support anchors. src/data/catSurfaces.js derives resident destinations from those anchors.
- styles.css retains calibrated actor/depth geometry; scene.css and roomAnimations.css own module effects. Keep foreground passes as direct siblings of the person where CSS depth selectors require it.
- npm ci installs dependencies; npm run dev serves localhost; npm test runs Vitest; npm run build emits dist; npm run preview serves the production build. Use a Node version allowed by package.json; deployment uses Node 24.
- .github/workflows/deploy-pages.yml installs, tests, builds and publishes dist on pushes to main. Vite uses a relative base and emits only referenced production artwork. Do not deploy source files or the repository root as the site artifact.

## Interaction and popup rules

Seven content entries remain: piano/music, coffee, notebook, photos, calendar/milestones, tennis and resident cats. Illustrated objects retain tight contour highlights and accessible native controls. All floating object-name labels have been removed, including At the piano and Rachel & me. Window/curtain controls are on the artwork; no floating state toolbar is allowed. Explore provides alternative access to all entries.

Normally, content opens only after Sili reaches the selected destination and completes its initial interaction. Coffee waits through preparation, notebook waits for seating, album waits for pickup, and calendar/tennis wait for their arrival pose. Music content waits for piano arrival. New selections close old content, cancel obsolete journeys and suppress stale dialog promises. Repeated clicks on the same pending destination reuse its arrival promise. Escape cancels pending journeys. Programmatic dialog close events cannot cancel the next destination or restore obsolete focus.

During an engaged piano performance, other content opens immediately and Sili keeps playing. This also preserves the existing paused/approach performance behavior. The album opens without physical pickup in this mode. Compact music controls remain accessible in content. Direct cat greeting is a physical interaction and can interrupt the performance; browsing the resident introduction does not. Closing content never stops music.

The supplied One Summer's Day recording is the only track. Never autoplay on initial load. Start at arrival after visitor activation; show explicit playback fallback if blocked. Mute keeps performance mode; Stop or recording end releases it. Hiding the page pauses music and requires explicit resume. Reject late play promises after stop/disposal.

## Modular scene and visual corrections

Independent modules cover piano/bench, coffee equipment/cabinet, portrait/calendar, tennis equipment, stool, bookcase, workstation/chair/laptop/notebook/stationery/lamp/books, sofa, table/album, wall shelf/camera, toy mouse, plants, lighting and residents. SVG masks preserve the approved raster artwork; future per-object animation should stay in its owning module.

The approved room source is assets/room-clean-v7.png. Reconstructed occluded surfaces are in room-hidden-surfaces-v1.png; neutral architecture and independent sunlight are separate assets. Closed glass and curtain states have versioned sources. Generation provenance is in assets/modular-room-prompts.md. Historical artwork remains unless explicitly deleted by the user.

The original room revisions removed the vine beside the espresso machine, the window vine and the lower-right foliage, added matching left/right curtains, corrected outward-opening casements and tuned window width while retaining its height. Preserve the approved final composition.

Latest mask corrections restore full desk legs and remove floating floor-colored rectangles, retain the right curtain's dark edge, fill bookcase/book gaps, restore the piano's left side and the album's lower-left cover. The bookcase plant is deliberately static until it can be isolated without carrying wall/shelf fragments; do not casually re-enable its wind class. Other airflow effects remain active. Piano hover geometry follows the corrected cabinet. The painted yellow rail has a local sepia/saturation/brightness treatment for warmer, subdued brass, not a black stripe or glowing yellow band.

Window glass and curtains toggle independently. Fabric breeze depends on open glass; closing the glass stops it. Drawn curtains remove direct sunlight and add subtle shade. Cats cannot cross closed glass or drawn curtains, and outdoor Viola waits until access returns. Do not close either state during an active crossing. Lamp toggles locally; camera flashes locally; coffee preparation drives steam/flow/pulse. Other paper, screen, plant and lighting effects stay restrained and honor inactivity/reduced motion.

## Character calibration

Standing/walking uses sili-poses-v1.png, four 543 x 724 cells at 58% stage height. Activity atlases use calibrated 576px cells at 58.4%. Keep the approved apparent head scale and grounded feet. The calendar pointing cell (interactions frame 5) has more transparent padding: scale its sprite by 1.1 around 50% / 95.66%, without moving its feet or scaling every interaction pose.

Piano seated/playing uses sili-piano-v4.png at its existing 51.91% height and bench registration. Workstation computer-v3 and writing-v2 keep their approved seated calibration. Do not shrink actors to compensate for furniture. The chair is a separate alpha asset; foreground occlusion remains calibrated.

Foreground album pickup uses 53 / 96 via 53 / 84 and up to 18% perspective growth with anchored feet. The real tabletop silhouette hides the lower legs; the empty-table source removes the room book while held. Return on close/departure; leave piano-mode browsing exempt from pickup. Coffee uses only brew A/B, lean and sip cells in sili-coffee-v3.png; never restore the rejected twisted-head placement pose.

## Cats and person interaction

Viola and Java are female, visually distinct and autonomous. Java remains indoors; Viola can leave and return through the visible window route. Both visit piano bench/top, coffee counter/table, bookcase, work desk/chair, sofa and window using shared support anchors, reservations and stepped hops. Occupied furniture clears safely for the person.

src/data/catBehavior.js sets roaming rates to Viola 0.5 and Java 0.7 relative to the previous baseline. Longer indoor rests reduce excursion frequency by 50% and 30%; walking/jumping speed, greeting responsiveness and outdoor waiting are not slowed.

Direct cat clicks greet in-scene, without opening a biography. Explore retains Viola & Java, Pet Viola and Play with Java. Stable interaction handles expose identity, live geometry, readiness, contact, cancellation and departure. Journeys approach the actual cat; never fall back to pointing at a fixed window while the cat is elsewhere. Low perches may stay; high perches descend through known steps. Repeated contact is bounded; play includes short playful hops. Finish airborne movement on cancellation and let Sili withdraw before roaming resumes. Escape releases a greeting naturally.

Native cat buttons follow their current positions; hidden outdoor Viola has no visible/tabbable target. Preserve the sleeping-pose crop that excludes the adjacent atlas paw. Ambient movement pauses for content/inactive pages, with safe clearance/meeting exceptions. Reduced motion uses still indoor poses. The manual Pause cats button was removed at the user's request.

## Album and content preservation

The physical album has four spreads/eight pages, click/drag corners, arrow-key navigation, reduced-motion handling, accessible spread counter, discreet close and remembered fully revealed spread. Wall portrait opens spread one. Do not add a surrounding panel or toolbar.

Slots: festive couple, family-v2, first selected tennis illustration, seaside couple, Java, Viola, Sili bench pressing, Rachel hip-hop. Slots 2/7/8 are requested imagined illustrations, not documentary evidence. Do not invent personal dates/captions. Keep original wall portrait on the wall. Deleted later tennis variants must not return.

Small content windows use warm cream with readable opaque text; music mode places content to the right so the piano stays visible. Project descriptions, milestone dates, contact/profile destinations and resume publication require reviewed source facts. Source photos and academic reference PDFs are not automatically production assets. Preserve the approved writing asset; SHA-256: 14f250c62b13b4a95745eefb276dbb5dad67f4f660608fe9d92449cd2822a90d.

## Validation and remaining work

The thirty-minute cat simulation has an explicit 30-second test timeout for slower CI runners, retaining every simulated step and assertion.

Current release: 40 Vitest tests across six suites pass; production build and git diff --check pass. Coverage includes arrival-gated dialogs, immediate uninterrupted piano browsing, stale/cancelled/repeated requests, album turns/pickup, music lifecycle, cat meetings/reservations, window access and scene state. Native local-browser review confirmed normal arrival gating, ongoing piano playing while coffee content is open, removal of floating labels, visual mask fixes and corrected calendar scale.

This does not establish exhaustive behavior on every machine. Remaining manual QA includes representative Safari/Chrome/mobile fullscreen and touch/drag, audible autoplay policies, all animated mask/depth combinations and final art approval. Optional manual navigation, browser-history/deep links, additional recordings and richer frame animation remain future work. Continue refining existing interactions before unrelated additions.

Keep tmp/, dependencies, build output and secrets ignored. Verify remote HEAD and the matching Pages workflow after publishing. Custom domains can be added to GitHub Pages; no alternate host is inherently required. Do not configure or purchase a domain without the selected domain and authorization.
