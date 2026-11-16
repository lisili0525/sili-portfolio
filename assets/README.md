# Animation assets

## Piano recording

`music/one-summers-day.m4a` is the user-supplied “One Summer’s Day” file, copied unchanged from Downloads on November 16, 2026. Container inspection found AAC-LC (`mp4a`), stereo 44.1kHz, approximately 137.35 seconds; size 1,991,438 bytes. The original stays in Downloads. Actual browser decoding/playback remains unverified. This is the sole entry in `pianoRecordings`; no other recording was substituted.

## Album placement refinement

Current room: `room-clean-v4.png` (1671 × 941, rendered on the existing 1672 × 941 scene stage), used for background, piano foreground and portrait crop. The album is angled casually on the tabletop, with perspective, slightly curved pages and contact shadow; its hotspot has matching new bounds. Generated with the built-in image tool using v3 as edit target. Final prompt:

> Use case: precise-object-edit. Edit ONLY the open photo album lying on foreground round table at bottom center of this exact 1672x941 room. It currently looks unnaturally straight, centered and parallel to image bottom. Reposition the same open album casually on a diagonal, rotating it about 15 degrees counterclockwise ON the tabletop plane, with its spine angled and its left side closer to the viewer. Use convincing perspective foreshortening: a lightly skewed open spread lying flat, subtle curved pages near gutter, slightly uneven page edges, small soft contact shadow. Keep it open with the same decorative photo mounts. Shift the album slightly left/back on the tabletop as needed so all corners remain fully visible within the image and it does not overlap the plant. This is a small natural placement correction, not a new book design. Preserve the entire rest of image exactly: table shape and location, plant, piano/bench geometry, coffee cabinet, couple portrait, calendar, window, desk, rug, colors, warm light and approved cartoon outlines. No zoom, crop, people, cats or new objects.

## Current room and album

`room-clean-v4.png` is the active 1671 × 941 room background, rendered on the existing 1672 × 941 stage. V3 is retained history. The decorative wall photographs are removed, the couple portrait and calendar remain, the espresso cabinet is shifted about 125px right, and an open album lies on the foreground table. Piano geometry and character calibration are preserved. The miniature album images in the room remain decorative concept illustrations, not selected personal photographs.

Generated with the built-in image tool, with v2 as edit target. Final prompt:

> Use case: precise-object-edit. Edit this exact 1672x941 cartoon room background, keep full canvas and approved warm simplified outlined cartoon style. Make three specific changes: (1) remove BOTH small clipped landscape prints on central wall around x680..885 y375..475; fill with plain matching wall. The framed Rachel-and-Sili couple portrait at x394..625 y145..365 MUST stay unchanged. Keep calendar with its landscape illustration, since it is a calendar, not a photograph. (2) Move the entire espresso coffee cabinet and everything on it about 125 pixels RIGHT, from x380..690 to x505..815. Preserve its size, espresso machine, grinder, cup, bean jar and plant; reconstruct wall/floor where it stood. Leave a clear visible gap from enlarged piano. (3) On foreground round wooden coffee table at bottom center, replace the stack of closed books with a prominent OPEN photo album lying flat, two cream pages spread on the tabletop in perspective, with a few simple photo mounts, no legible text. Album centered around x885 y885 and approximately 260 pixels wide, fully visible above bottom edge. Keep the table plant to the right of album; give album enough exposed tabletop to be clearly clickable. Do not alter enlarged piano, bench, their exact geometry, window, tennis equipment, desk or other furniture. No people/cats. Do not add other wall photos. Preserve composition, colors and lighting elsewhere; no crop or zoom.

The album UI uses the existing framed illustration through CSS cropping, plus seven empty photo mounts. Add reviewed personal images through `albumPages` in `album.js`.

Previous room: `room-clean-v2.png` (1672 × 941), superseding v1. The piano is taller and wider, with a higher keyboard and larger, lower bench. Two small prints moved to the central wall to make room. V3 removes these prints and retains the enlarged piano.

Character scale is measured from the opaque head silhouettes, rather than the differently padded sprite frames. Standing and walking at 58% room height have a 197.5px head width; seated idle and playing at 53.35% produce the same width. The frame height changes for source calibration, not to make Sili smaller when sitting. Height transitions are removed. Three local layer renders were visually reviewed; browser verification remains outstanding.

## Furniture proportion edit prompts

Built-in image generation, using v1 as edit target. First pass:

> Use case: precise-object-edit. Edit target: exact attached clean cartoon room, 1672x941. Correct ONLY the undersized upright piano and its bench on the far left, making them adult-size relative to the coffee cabinet, desk and room. Piano should occupy x=0..380 approximately, top around y=315, keyboard playing surface around y=550, bottom near y=770. Make it a taller substantial upright piano with natural full keyboard proportions, still dark warm wood in exactly same outlined simplified cartoon style. Bench should have seating surface around y=675, span roughly x=75..365, front apron/cream draped blanket around y=705..760 and sturdy legs reaching floor y=830. Retain the cream draped blanket on bench. Keep music book on the piano. If necessary relocate the two small clipped landscape prints that were immediately above the old piano to the empty central wall (x=710..875,y=420..570), rather than overlap the taller piano. Preserve the framed couple portrait, coffee cabinet and all its appliances, window, tennis gear, desk, foreground sofa/rug, room name/icons, lighting, outlines, palette and exact full canvas composition everywhere else. Do not add people or cats. Do not zoom or crop. Enlarge furniture only; preserve all other room geometry and matching cartoon style.

Final refinement, using the first pass as edit target:

> Edit ONLY the piano bench at lower left in this exact 1672x941 room. The bench is too high relative to the keyboard for a full-size seated character: lower its entire seat and cream draped blanket by about 40 pixels, so the seat top is at y=695 rather than y=655; keep the bench width x=80..380, keep sturdy legs extending down to floor about y=835. The piano keyboard stays at y=570, leaving about 125 pixels between keyboard and bench seat. Preserve the newly enlarged piano exactly, as well as every other object, room proportions, colors, outline style and full image framing. Do not add any characters or cats. Change just this bench geometry and reconstruct the small exposed floor/piano area naturally.

Generated with the built-in image generation tool on November 16, 2026, using `concepts/little-house-v3-cartoon.png` as the reference. Original concept files are preserved.

- `room-clean-v1.png`: 1672 × 941, same room composition without live Sili or the cats. The framed couple portrait stays intact.
- `sili-poses-v1.png`: 2172 × 724 RGBA, true transparent background. Four equal 543 × 724 cells: standing, walking, seated idle, seated playing. CSS mirrors the right-facing generated poses toward the piano on the left.

These are initial production candidates. The walk currently uses one stride pose with a small bob, and playing uses one pose with a small sway. They are not frame-by-frame gait or finger animation. Browser visual review of bench alignment is still required. Cats will get separate assets in the next milestone.

## Piano perspective correction

`sili-piano-v2.png` (1774 × 887 RGBA) supersedes the two seated cells in v1. Its two 887 × 887 cells face diagonally into the keyboard, showing the back of Sili's head and hoodie. The idle cell has a small horizontal registration adjustment to align it with the playing cell. Neither is mirrored. The stool front and draped blanket render in front of his legs through a CSS-clipped copy of `room-clean-v1.png`; no new furniture is drawn. Broad whole-body sway is removed to keep the seat and keyboard contact stable. The seated layer composition was visually checked using a local render; real browser verification remains outstanding.

Generated with the built-in image tool using the clean room as perspective reference and v1 sprites as identity reference. Final prompt:

> Use case: stylized-concept. Create a transparent character sprite sheet with TWO equal cells side by side, one Sili seated idle and one Sili seated playing piano. Image 1 is room perspective reference: upright piano at left against back wall, bench in foreground; a pianist sitting on the bench must face diagonally AWAY from viewer toward UPPER LEFT, into the keyboard. Image 2 is character identity reference ONLY; its seated side-profile angle is WRONG and must be changed. Show the BACK of navy hoodie and back/right side of oversized head, with just a small sliver of left-facing cheek, not an entire side profile face. Hips and knees point diagonally upper-left into the piano; legs recede toward piano under keyboard rather than hanging toward viewer. Character proportions, swept brown hair, tan trousers, cream sneakers, warm bold outlined simple cartoon style match reference. Both poses identical scale, head and hip position. Cell 1 hands resting near lap, cell 2 both arms extending diagonally upper-left, fingers touching an invisible keyboard at waist height. Full seated body on invisible bench, compact body, oversized head. No bench, no piano, no room, no text, no background shadow; genuine transparent alpha. Leave generous transparent margins and center each complete figure in its cell. TWO figures only. Perspective must show back three-quarter view, never flat side-on.

## Final prompts

### Clean background

Use case: precise-object-edit. Asset type: clean background layer for this exact illustrated room website. Remove ONLY the live standing boy in the center (including coffee cup, steam, and his cast shadow), and BOTH live cats at the window including orange attention marks. Reconstruct the bare wall, floorboards and window scenery naturally behind them. Preserve the framed couple portrait exactly (do not remove its people), every piece of furniture, piano bench, toy, plants, rug, text, icons, lighting, clear cartoon outlines, colors and composition. Match original full 1672x941 landscape framing and alignment; no crop, no new objects, no change of style. This image must align with existing object hotspots.

### Sili poses

Use case: background-extraction / stylized-concept. Asset type: transparent PNG character animation sprite sheet for a 2D room website. Reference image role: exact character identity/style reference. Isolate and redraw ONLY the live boy Sili from the center of the reference; never include room or portrait. Match his oversized rounded head, short swept dark brown hair, gentle face, navy hoodie, tan pants, cream sneakers, clear dark outlines and simple warm cartoon shading. Make one wide sheet in exactly FOUR equal square cells in one horizontal row, generous clear transparent margins, no labels. Cell 1: full body standing idle three-quarter left, arms relaxed, no cup. Cell 2: same full body walking left, stride pose, empty hands. Cell 3: left-facing side profile seated upright on an invisible piano bench, knees bent, feet down, hands resting in lap. Cell 4: exactly same left-facing seated position and scale, arms extended left toward a piano keyboard at elbow height, hands playing. No furniture, bench, keyboard, cup, scenery, text, shadows on background, extra people or accessories. Each character complete, centered in its cell, same head size and consistent feet baseline across cells. True transparent background with alpha, not a drawn checkerboard. Four distinct poses, not a finished room.

The generated cells are portrait rectangles and face right; the CSS uses their actual dimensions and mirrors them instead of altering the approved output.

## Viola and Java — initial separate assets, November 16, 2026

`viola-poses-v1.png` and `java-poses-v1.png`: each 2172 × 362 RGBA, genuine alpha. Six equal 362 × 362 cells: sit, two walk strides, groom, sleep, hop. Generated with the built-in image tool as a two-row sheet; rows extracted without changing artwork or transparency. CSS mirrors facing as needed. These are prototype poses, not a complete gait/groom animation, and are awaiting visual approval. The source photographs remain private references and were not copied into this repository.

References: approved cartoon room for style, viola.jpg and java.jpg for markings. Final built-in prompt:

> Use case: stylized-concept. Asset type: transparent game sprite sheet for a warm cartoon room. Reference image 1 is STYLE ONLY, reference 2 is Viola identity, reference 3 Java identity. Create TWO ROWS and SIX equal square CELLS per row, a precise 6-column by 2-row sheet. Top row ONLY Viola, black female tuxedo cat with white chest and paws, narrow white forehead/nose streak and asymmetric white muzzle patches, pale green eyes, black tail. Bottom row ONLY Java, orange female tabby, light muzzle/chin, pink nose, long striped tail. Each row in this exact order: (1) sitting looking left three-quarter, (2) full-body walking left first stride, (3) walking left second stride, (4) sitting grooming paw, (5) curled asleep, (6) stretched leaping left with all paws visible. Match rounded oversized heads, compact bodies, bold clean dark outlines, simple friendly faces, broad warm flat colors and very restrained cel shading of reference 1. Consistent cat head scale throughout. Each complete figure centered in its equal cell, feet baseline 85 percent cell height, generous clear margins so tails never cross cells. No furniture, no room, no collars, no props, no labels, no text, no background shadows. Genuine transparent alpha, no drawn checkerboard. Canvas wide 3:1 aspect ratio. 12 cats total. Do not reproduce source photos or scenery.

## Piano v3 — rear angle and five hand frames

Built-in image tool, November 16, 2026. Saved production strip: `assets/sili-piano-v3.png` (3072 × 512 RGBA), six square cells: idle; hands down; left wrist up; neutral; right wrist up; both slightly raised. Generated in a 3 × 2 grid, then registered by opaque head bounds and packed row-major into a horizontal strip. Canonical head region y0–224 is shared across all cells; playing lower torso/legs y330–511 are shared across playing cells to eliminate body jitter. Alpha preserved. Original v2 kept as history. CSS sequences only background positions; the whole figure does not sway.

At 51.91% of the 941px room height, the 207px source head is 197.49 room pixels wide, matching standing Sili. Position: left 13.2%, bottom 15.46%. Static composition was inspected with unchanged room and bench foreground; actual browser animation has not been checked.

Final built-in prompt (room as perspective reference, v2 as identity reference):

> Use case: stylized-concept. Asset: transparent six-frame character sprite sheet, EXACT 3 columns by 2 rows of equal square cells. Reference 1: room perspective and keyboard/bench geometry ONLY. Reference 2: Sili identity/style ONLY; its SIDEWAYS seated angle is WRONG. Redraw Sili seated facing almost directly AWAY from viewer toward the piano/wall, with only a very slight turn toward upper left (10 degrees), NOT facing left in profile. We see back of head, back of navy hoodie, both shoulders approximately level, hips centered on invisible bench. Shoulders and hands run approximately horizontally along the keyboard across the image. Two hands at roughly same height, shoulder-width apart, reaching forward away from viewer, not both reaching toward left edge. Knees point toward wall, lower legs mostly hidden behind bench in real scene. Preserve oversized dark brown rounded swept hair, compact body, navy hoodie, tan trousers, cream shoes and bold clean outlined warm cel-shaded cartoon style. Six frames of SAME viewpoint, exact same character scale, identical head, torso, hip and feet positions across cells. Row-major order: 1 seated idle hands near lap; 2 playing both hands lowered at key height; 3 left wrist raised slightly and right lowered; 4 both at neutral key height; 5 right wrist raised slightly and left lowered; 6 both wrists a tiny bit raised. Motion only forearms, wrists and fingers: tiny rises of 8-12 pixels in a 512px cell, elbows gently bent and shoulders still. Each full figure centered in cell, generous transparent margin. Head occupies approx 40 percent of cell width; head top at 10 percent cell height, hips at 67 percent, shoes bottom at 93 percent. Hands at 49 percent cell height while playing, hips at 67 percent. No bench/piano/keyboard/room/props/text/shadows, genuine transparent background. Must face into keyboard, straight rear view with tiny sliver left cheek at most; do not repeat the left-facing angle of reference 2. Six clean registered poses.

## Piano v4 — slightly farther left

Active asset `assets/sili-piano-v4.png`: 3072 × 512 RGBA, six registered cells with genuine alpha. Built-in image tool edited the v3 reference to turn the seated figure a little farther left. Five playing poses and one idle pose retained. Generated 3 × 2 grid, packed horizontally after head registration (207px opaque head width, x256 center, y18 top). Same canonical-head and playing-lower-body registration as v3. No CSS scale/position/timing changes; originals preserved. Static composition checked, actual browser playback unverified.

Final built-in prompt:

> Use case: precise-object-edit. Edit target is the attached Sili piano sprite strip. Correct ONLY the seated character's facing angle in ALL SIX frames: rotate head, shoulders, torso, hips and knees about 15 degrees farther toward the LEFT from the current nearly straight rear view. A subtle rear three-quarter left view, still mostly seeing the back, showing a slightly larger sliver of left cheek/ear and a little more right-back shoulder, hands reaching slightly diagonally upper-left into the piano. Do not turn him into a left-facing side profile. Preserve the same warm outlined cartoon identity, dark swept brown hair, navy hoodie, tan trousers, cream shoes, oversized head and compact body. Keep both hands at keyboard height and distributed along keys; keep frame-to-frame alternating small wrist lifts. Six poses in same order: idle hands near lap, playing hands down, left wrist slightly up, neutral, right wrist slightly up, both slightly raised. Keep scale, head height, hip height, seated posture, identity and feet registration consistent. Do not rotate/tilt the flat image in its own plane; redraw the three-dimensional facing direction slightly left. Output 3 columns by 2 rows equal square cells, complete isolated figures, genuine transparent alpha, no furniture, no shadows, no room or text. Same figure in all cells, centered at x256 in each 512px cell, head width about207px, head top18px, hands y275px while playing, hips y390px, shoes bottom490px. Small angle correction only, retain existing animation.

## Bench occlusion silhouette

`piano-bench-mask.svg` is code-authored geometry tracing the existing bench seat, legs and hanging blanket. It contains no replacement artwork; the foreground image still uses the original room pixels. Embedded as a data-image mask in CSS for local file preview compatibility. Replaces the old broad clipping polygon, which cut across Sili’s thighs and erased his lower legs using room-floor pixels. Static layer composition checked; actual browser masking remains unverified.

## Room activities — coffee, desk and album

Active assets generated with the built-in image tool, then registered/packed as transparent six-cell horizontal strips. Each cell is 576 × 576, atlas 3456 × 576. The measured head region is registered to 207 source pixels, displayed at approximately 197.5 room pixels using 58.4% room height; feet baseline 550. Original generated candidates and earlier workspace versions are preserved. These are illustrated key poses rather than full continuous anatomy simulation; visual approval is pending.

- `sili-coffee-v3.png`: active four-cell 2304 × 576 atlas: rear brewing A/B, casual counter lean with mug, sip. These cells are pixel-identical to v2's first four cells; the rejected twisted-head cup-placement pose is physically absent. Coffee CSS uses 400% sizing. Departure uses rear frame 0 while the cup returns to the station before walking. Older v1/v2 sheets remain preserved but inactive.
- `station-cup-v1.png`: isolated ivory mug extracted from source sixth cell, placed on the brewing station and hidden while held.
- `sili-desk-v2.png`: rear-facing idle/typingA/typingB, notebook writingA/B, thinking. Version1 is a superseded side-angle candidate.
- `sili-interactions-v1.png`: bend/reach for album, lift album, read album, inspect racket, crouch toward cat, look up at calendar.
- `room-table-empty-v1.png`: alternate room image with album removed, used ONLY through a localized table patch and table foreground clip while the book is lifted. Active base room remains room-clean-v4.png.
- `desk-chair-mask.svg`: code-authored geometry for actual chair front/back/legs, embedded in CSS to preserve local file support; visible pixels are copied from unchanged room.

Full final and intermediate prompts: [activity-prompts.md](activity-prompts.md). Static compositions under ignored tmp/activity-*.png were inspected for brewing, leaning, desk typing/writing, album reach/read and cup placement. These are not browser screenshots. Actual browser motion, mobile framing and translucent content readability still require visual review.

## Separate workstation pictures — replaces shared desk sheet

- `sili-computer-v2.png`: individual 576 × 576 RGBA illustration, mostly direct rear view at the laptop, forearms reaching forward with hands close together.
- `sili-writing-v2.png`: independent 576 × 576 RGBA illustration, rear three-quarter turn to the right, pen and supporting hand over notebook.

Both have newly drawn complete seated lower bodies: foreshortened thighs recede under the desk, knees and shoe directions follow the activity, and heel/side views replace the previous frontal shoes. Lower legs are not erased or cropped. A later torso-height correction preserves head size and hips while placing hands at the tabletop height. Head regions registered to 207 pixels; seated hip contact registered to288/460 in each576px canvas. Rendered head width remains approximately197.5 room pixels, with hip contact at room1390/750. Character anchor83.13%/88.83%. Chair, table, room background and existing chair mask positions are unchanged. Version1 individual candidates and old shared sheets remain history, not active.

The routine now alternates these two still illustrations with pauses; it does not claim a multi-frame typing or pen-stroke cycle. Static checks compared full anatomy before foreground occlusion and the final room composition: tmp/workstation-computer-anatomy.png, workstation-computer-scene.png, workstation-writing-anatomy.png, workstation-writing-scene.png. Actual browser playback remains unverified and visual approval is pending. Full prompts and refinement instructions are in activity-prompts.md.

## Pulled-out workstation chair and rightward computer legs

User approved `sili-writing-v2.png`; it is retained byte for byte. `sili-computer-v3.png` replaces only the computer artwork, using the writing lower-body direction with a small additional rightward turn while preserving rear-facing upper body. Complete legs remain in the transparent picture.

- `room-desk-chair-clear-v1.png`: generated room with original desk chair removed, used only inside a localized desk-area patch to retain the approved base room elsewhere.
- `desk-chair-v1.png`: independent transparent chair cutout, cropped to629 ×772 with genuine open gaps. Rendered at worldleft1238/top629, height311 (about28px left and12px down from original chair backrest), retaining scale. Both a rear layer and front layer use this same asset.
- `desk-chair-depth-v2.svg`: true alpha depth matte, with internal luminance mask for the cushion contact area. Hips rest visibly on the cushion; chair back, frame and front cushion cover the receding legs. No floor pixels are copied over the legs. The old chair-only clip polygons are inactive.
- `desk-front-mask-v1.svg`: actual desk front/apron depth, further limited to the appropriate leg area for each pose so it cannot erase Sili’s torso.

Seated hip anchor is now world1362/762, controller81.4593%/90.1027%; head calibration remains197.5 room pixels. Approved writing image is repositioned with the seat, not repainted. Static compositions inspected at tmp/desk-chair-revised-computer.png and tmp/desk-chair-revised-writing.png. Browser depth/masking remains unverified; visual approval of this revision is pending. All generation prompts are in activity-prompts.md.

## Room background v5

`room-clean-v5.png` is the active base background. Edited with the built-in image generation tool from `room-clean-v4.png`. Removed the trailing plant beside the espresso machine, replaced the window vine with a matching left tieback curtain, and removed the large bottom-right foreground leaves. All other plants and furniture were preserved. Localized chair-clear, album and piano depth layers retain their existing sources because their visible clips do not intersect the edited regions.

Prompt: Remove only the coffee-cabinet plant, window-left vine, and extreme bottom-right leaves. Replace the window-left vine with a cream peach tieback curtain mirroring the existing right curtain. Preserve room framing, furniture positions, other plants, colors and hand-drawn style. Add no characters or text.

## Room background v6

`room-clean-v6.png` is the active base background, edited from v5 with the built-in image generation tool. The two green casement sashes now swing outward into the garden. Outer jamb hinges remain fixed, free edges recede and shorten in perspective, and the interior sill stays clear. Curtains, furniture and the previous plant removals are preserved. Existing localized depth layers do not intersect this edit.

Prompt: Correct only the two olive green glazed casement leaves to open outward away from the interior viewer. Anchor hinges at the outer jambs, shorten distant free edges, slope the upper edges down and lower edges up toward those edges, and preserve the broad central opening. Retain full-room framing, curtains, sill, scenery, furniture, plants, colors and hand-drawn style. Add no characters or text.

## Room background v7

`room-clean-v7.png` is the active base background, edited from v6 with the built-in image generation tool. Window width is reduced slightly, targeting approximately five percent, while the original height, vertical placement, outward-opening sashes and full-length curtains are preserved. The larger window reductions were discarded. Existing localized depth layers do not intersect the changed side margins.

Prompt: Narrow the original wide window assembly only very slightly, to approximately 95 percent of its original width. Move each side inward by approximately 15 pixels on the full canvas. Preserve original height and top/bottom positions exactly. Keep a broad horizontal opening, outward-opening sash perspective and natural curtain folds. Preserve all surrounding furniture, room framing, plants, colors and hand-drawn style. Add no characters or text.

## Modular scene underpainting

`room-module-underpainting-v2.png` is a local-demo clean plate generated with the built-in image generation tool from room-clean-v7.png. Coffee equipment and curtains are removed behind the independent SVG-masked artwork layers; the active room artwork itself stays unchanged. The final prompt and layer contracts are recorded in src/scene/README.md. The first clean-plate candidate was discarded because it retained the grinder and jar under the movable equipment group.

## Whole-room modular asset plates

The local modular scene uses room-architecture-v2.png for empty neutral architecture, room-architecture-v1.png for a separate sunlight pass, room-hidden-surfaces-v1.png for occluded furniture repairs, and window-closed-v1.png / curtains-closed-v1.png for closed states. Original foreground pieces still come from approved room-clean-v7.png through SVG masks. All new plates were edited using the built-in image generation tool. Exact prompts and saved asset paths are recorded in modular-room-prompts.md.
