# Modular room scene

## Workstation merge and seated depth — November 17, 2026

Laptop and notebook remain independent transparent artwork but now share one `workstation` content destination/hit control. Legacy `computer`/`notebook` keys canonicalize to it; existing four project descriptions remain unchanged. The journey's existing RAF switches typing/writing holds with brief neutral turns, keeping the same seated anchor; reduced motion stays still. Crossfades are CSS opacity only, no extra clock. The writing pose holds the independent pen while the tabletop pen is hidden.

Both seated sources have versioned v3 lower-body edits and `registeredCanvas:true`, preserving full 576px registration instead of fitting the changed leg silhouette. Full sources, rejected v2 attempts, prompts and prior registered sheets remain archived. V31 supersedes the initial lower-body shear: it is removed. The typing source now has compact legs tucked inward with a downward calf; a typing-only actual chair seat-front pass occludes its upper part. Preserve the original rear-facing upper-body angle. `RoomDepthLayers` reuses that actual desk asset above Sili; its clip starts below the desktop so it cannot reintroduce the chair lighting seam. No floor-colored erase patch, new bitmap furniture or duplicate pen.


The main room combines complete freshly generated transparent objects over one bare architectural background. See [artwork guide](../../assets/rebuilt/README.md). Historical room rasters and cutout exports are retained locally but excluded from the active render and publication.

## Ownership and registration

`furnitureCatalog.js` and `sceneObjects.js` retain stable module IDs, animation roles, placement and shared support anchors in a 1672 × 941 world. `assets/regeneratedAliases.js` maps old authoring keys to new complete objects, without reading old pixels. Several historical fragments now resolve to one complete object; redundant fragments render nothing. `SceneArtwork` renders registered images and never applies historical clipping geometry.

`assets/regeneratedManifest.js` is the generated client registry. Full source prompts and normalization records remain in `assets/rebuilt/v1/catalog.json` and `manifest.json`. `scripts/prepare-regenerated.mjs` normalizes only fresh output alpha, transparent margins, scale and frame registration; `scripts/trace-regenerated.mjs` derives new hit contours. Do not hand-edit generated manifests.

Ornaments have standalone PNGs. Shelf books are integrated into their shelf art; standalone book variants are retained as reusable sources. The 20 book IDs survive artwork/content changes: four wall-shelf, thirteen bookcase and three desk books. `assets/books.js` retains empty title/author/entry slots. New favorite-book stories require supplied content. Plants remain whole, including their pots.

## Behaviors and depth

`App` owns content, focus, arrival-gated dialogs, album state and music controls. `useRoomRuntime` retains two continuous animation clocks. Journey, piano and cat controllers keep their existing timing, cancellation and ownership; changing artwork must not add competing controllers.

Residents mount all seven person sheets, while cats use their own sheets. New sheets are packed into the existing CSS layouts with explicit foot baselines. Walking keeps six distance-driven phases, speed 14 and a 12-unit cycle. The person publishes grounded depth; cats compare supported depth independently of their jump arc.

`RoomDepthLayers` stays a direct sibling of Sili. New bench/table pictures provide foreground depth. The desk foreground patch has been removed: the new typing/writing anatomy uses a shared pelvis contact and a naturally lowered writing knee. Historical chair masks and the sleeping-cat crop are disabled; the chair foreground uses only the new solid backrest/near-post geometry, leaving the seat behind the sitter. The loose pen hides while writing; one station mug hides while held. Never use floor-colored repair patches to hide a character.

Window glass and curtains have independent state. Open glass drives the breeze; drawn curtains suppress sunlight. Cats cannot cross closed glass or drawn curtains; closure is blocked during a crossing. Lamp and camera remain local controls. Reduced motion and hidden tabs suppress ambient loops. Album content and the supplied recording remain unchanged.

## Review and checks

`/?demo=objects` provides a checkerboard library and PNG downloads in development or the explicit runtime-preview build. `/?demo=runtime` is the PixiJS/XState experiment; the complete room has not migrated to Pixi. `/?demo=modules` shows isolated coffee/window modules.

Run `npm run assets:export`, `npm run assets:check`, `npm run typecheck`, `npm test`, `npm run build` and `npm run test:browser`. Compiled preview checks use `playwright.preview.config.js`. Browser emulation covers Chrome/Firefox/WebKit plus Android/iPhone sizes; real hardware remains a separate review.

Placement and cat contact points are authored in `assets/rebuilt/v1/layout.json`. Active hops complete before content-reading pauses roaming. Closed-curtain alpha coverage is verified across the whole window opening.

Workstation placement, standalone prop overlap and hidden assets are owned by `assets/rebuilt/v1/layout.json`. The upper-right and desk plants are hidden while their sources remain archived. Desk books paint bottom-to-top with actual alpha contact, and the pencil cup is supported beside the laptop. The piano music rack is part of its upper front panel; the separate score uses layout.json musicRack contact rather than the keyboard trim.
