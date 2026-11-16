# Modular room scene

The main room is assembled from independently owned furniture, decoration, lighting and resident modules over an empty architectural background. `/?demo=modules` remains an enlarged coffee/window close-up. The scene expansion is included in the current GitHub Pages release.

## Scene ownership

- `furnitureCatalog.js` registers furniture and decorative props with named artwork pieces, placement, interaction contours, animation roles and support anchors. It includes piano/body/keyboard/music, piano bench/blanket, portrait, calendar, coffee cabinet, tennis rackets/basket, stool, bookcase/books, work desk, laptop, notebook/pen, stationery, lamp, desk books, work chair, sofa/cushion/throw, coffee table, physical album, wall shelf/books/camera, toy mouse and plant groups.
- `sceneObjects.js` registers coffee equipment and the window's frame/sash/curtain geometry. World coordinates use the common 1672 x 941 room space. `moduleStyle` translates modules and hit targets; `supportPoint` supplies the corresponding percentage anchors to the cat routes.
- `modules/Furniture.jsx` exposes the named room components. `shared/FurnitureModule.jsx` handles stable rendering, motion preferences, original-art masks and existing content navigation.
- `modules/Residents.jsx` owns the character and cat markup. Scoped journey/cat controllers retain their lifecycle and calibrated poses.
- `modules/RoomDepthLayers.jsx` owns the calibrated foreground depth passes. These remain direct siblings of the character because the existing CSS selectors depend on that relationship.
- `modules/RoomLighting.jsx` renders floor sunlight independently of the neutral architecture.

## Window behavior

The glass and curtains have separate states, controlled by the room or locally in an isolated preview. Click the glass to open/close the window. Click fabric to draw/open the curtains. No floating state buttons are rendered; interaction stays on the illustrated glass and fabric. The glass remains keyboard-accessible while curtains are drawn.

Curtain motion is derived from the window's open state; there is no independent breeze toggle. Drawn curtains can breathe gently if the glass behind them remains open. Closing the glass stops fabric motion. Drawing the curtains removes direct floor sunlight and adds a restrained ambient shade. Reduced motion and inactive-tab handling override decorative animation.

Cats do not plan new trips through closed glass or drawn curtains. Outdoor Viola waits outside until access reopens. Controls avoid closing the window or curtains during an active portal crossing. Perched cats descend before another room activity needs their furniture.

## Artwork and occlusion

- `room-architecture-v2.png`: neutral peach wall and wooden floor, with structural beams/header retained and physical props removed.
- `room-architecture-v1.png`: the matching direct-sunlight source used only through the floor-light mask.
- `room-clean-v7.png`: approved source for original furniture/decorative artwork.
- `room-hidden-surfaces-v1.png`: reconstructed piano lower cabinet, cleared desk/chair area and empty coffee tabletop behind separately rendered bench, chair and album.
- `window-closed-v1.png` and `curtains-closed-v1.png`: matching illustrated closed poses.
- `room-module-underpainting-v2.png`: a bare coffee/window repair source used by isolated modules and the bare window frame.

`shared/SceneArtwork.jsx` creates transparent visual pieces with SVG alpha masks and a narrow white boundary stroke. Avoid feMorphology edge-expansion filters here: each animated full-stage filter adds a costly offscreen surface and can produce missing strips or disappearing props on affected browsers. It preserves original raster detail without repeatedly generating foreground artwork. Furniture is grouped into sensible components; related books/leaves can be split further within their owning module. The modules preserve the approved layout and calibrated support points. Large rearrangements still require reviewing masks, occluded surfaces and contact/depth geometry together.

Generation prompts and saved asset paths are in `assets/modular-room-prompts.md`. All artwork editing used the built-in image generation tool.

## Decorative animation

Coffee preparation drives steam, flow, indicator light and machine vibration. Piano key highlights follow playing state. The lamp has an independent on/off action and a quiet warm pulse; computer code lines change softly. Window airflow drives plant and paper movement; the bookcase plant stays static to avoid source-mask fragments. Portrait/book highlights are restrained; the mouse toy occasionally settles. Camera activation produces a short localized flash, respecting reduced motion. Existing album pickup, browsing, music and cat behavior remain integrated.

## Validation

Run `npm test` and `npm run build`. Integration checks cover scene ownership, unique modules, independent window/curtain/lamp states, brewing coordination, reduced motion/inactivity, cat route reservations, blocked window access and outdoor waiting. Browser review should include both window poses, both curtain poses, lamp control, physical album pickup and character-depth composition.

## Shared cat meetings

The cat controller exposes beginInteraction handles with stable identity, live snapshots, readiness, contact and cancellation. Journey control uses these snapshots and src/data/catInteraction.js to calculate a reachable hand/feet anchor rather than querying only floor cats or using a fixed pointing fallback. The handle owns attention, invitation/descent, contact, play settling, farewell and departure. An active jump finishes before cancellation, and the person leaves the petting pose before roaming resumes. Direct clicks stay in the room; biographies remain in Explore. No additional floating interaction toolbar is introduced.
