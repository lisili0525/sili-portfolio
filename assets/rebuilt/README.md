# Fresh standalone room artwork

Status: all 87 source specifications generated and integrated on `refactor/scene-runtime`. The owner requested complete regeneration on November 17, 2026, with approximately matching appearance. The rejected cutout set is historical.

## Inventory and reuse

- `v1/sources/`: original built-in imagegen outputs, preserved at full resolution.
- `v1/ready/`: 78 registered room images, nine actor atlases and 40 individual frame PNGs.
- `v1/catalog.json`: stable IDs, subjects, exact prompts, references, original generation paths and source checksums. The revised piano posture also retains its previous generation.
- `v1/manifest.json`: placement, source-margin bounds, pixel dimensions, alpha-derived hit contours and actor layouts.
- `src/scene/assets/regeneratedManifest.js`: compact generated client index.
- `src/scene/assets/regeneratedAliases.js`: compatibility IDs for existing scene/controller ownership.

Shelf books are integrated into the filled shelf pictures following owner review. Twenty standalone book variants remain saved: four wall-shelf, thirteen bookcase and three desk books; the three desk-book assets remain separate. `src/scene/assets/books.js` retains their stable IDs and empty title/author/entry slots. Ornaments are independent; plants remain whole, including their pots. Favorite-book content is still to be supplied.

Background art contains only architecture. Scenery, window frame, sash states, glass, curtains, rod, lettering, lighting, furniture and props are separate. Complete sofa/table/rug/desk sources extend beyond the camera when placed; their saved pictures are not cut at the old viewport edge. These assets are 2D illustrations, not rigged 3D models.

## Asset pipeline

`npm run assets:export` normalizes existing fresh outputs and rebuilds hit geometry. It does not generate pictures, extract historical room pixels or apply old silhouette masks. It removes low-alpha generation haze, trims transparent margins, resizes/registers complete art and packs equal actor cells. Actor normalization removes detached generation noise; racket registration rotates the complete new object. Glass keeps high translucency. Raw output is always preserved.

`npm run assets:check` verifies 87 source hashes, all 78 room pictures, 20 books, nine atlases / 40 frames, genuine transparent space and exclusive fresh-art runtime mapping. Hit contours trace new alpha boundaries; foreground depth uses newly drawn furniture. The single mug hides while held, and the independent loose pen hides while writing.

To replace art, generate a complete new standalone asset with the built-in image tool, preserve the output and prompt, update its catalog source/checksum, then export and validate. Keep the ID when changing its appearance or content. Register placement in canonical 1672 × 941 world units. Never run the initial planning script over an existing catalog; it now refuses to overwrite provenance.

## Validation and review

58 unit tests, source/alpha checks, type checks, production/preview builds, the 31-check browser matrix and two compiled desktop/iPhone smoke checks pass. The browser matrix includes Chromium, Firefox, WebKit, Pixel 7 and iPhone 13 emulation; four duplicate performance samples are intentionally skipped. Hardware Safari/phone testing and owner art review remain separate.

The independent review Site exposes `/?demo=objects` for checkerboard inspection and PNG downloads. Its deployment record is in HANDOFF.md. The main portfolio domain is not published by this work. Existing album content, owner-supplied recording and reviewed copy remain unchanged.

The placement review uses `v1/layout.json` for explicit world bounds, fitting policy and cat support contacts. The rod/fabric tops align, closed fabric covers the complete opening, and source prompts for the seven corrected assets are in `v1/prompts/*-v2.txt`.


### Repeatable visual review

Run `node scripts/review-room.mjs http://127.0.0.1:5173/ tmp/room-review` against a running server. The review captures a seeded ten-minute cat tour, all twelve supported contacts, five activities, content states, intermediate motion frames and idle transitions. Inspect the images; successful script execution does not establish visual equivalence. Latest evidence: `tmp/room-review-v3-complete/`. The live reference is silispace.net; the isolated review Site is version 6. The latest review corrects computer workstation occupancy and moves the bookshelf-top cat clear of the pot, with 59 unit tests passing.


### Piano character poses

The pianist remains a fresh built-in imagegen redraw of the live original three-quarter angle. Source: `v1/sources/actor-sili-piano.png`; exact prompt: `v1/prompts/actor-sili-piano-v6.txt`. Frame0 rests hands on thighs; playback uses the subtle wrist/finger variants. Pelvis/cell registration stays fixed on pause and resume. Superseded pose drafts remain under `v1/sources/revisions/`.

### Workstation perspective revision

The desk, solid-back chair and both seated poses were redrawn with built-in imagegen using the original live site's perspective references. Final sources: `v1/sources/desk.png`, `chair.png`, `actor-sili-computer.png`, `actor-sili-writing.png`. Exact prompt sets: `v1/prompts/desk-v3.txt`, `chair-v3.txt`, `actor-sili-computer-v6.txt`, `actor-sili-writing-v4.txt`. Intermediate and original generations remain in `v1/sources/revisions/`; active transparent derivatives remain in `v1/ready/`.

`v1/layout.json` now includes pelvis anchors for the two seated poses, explicit flat notebook registration, supported pencil-cup placement and a physically overlapping three-book stack. Desk books paint bottom-to-top. The old desk foreground patch and historical chair mask have been removed. Upper-right `bookcase-plant` is hidden in the room, with its source archived for future reuse. Updated chair/desk/shelf cat contacts are captured in `tmp/workstation-review-v4/`. Contact validation checks that the lamp and plant do not intersect and that adjacent book layers share opaque pixels.


### Attached upper-panel music rack and cleared desktop

Active piano source: `v1/sources/piano.png`, prompt `v1/prompts/piano-v4.txt`. Active paper-only score: `v1/sources/sheet-music.png`, prompt `v1/prompts/sheet-music-v4.txt`. Both use built-in imagegen. Owner structure reference: `v1/references/owner-upright-piano.png`. Prior sources are archived under `v1/sources/revisions/`. The rack belongs to the piano upper panel, above the fallboard; the score is separate and rests in that rack.

Both `bookcase-plant` and `desk-plant` are hidden in the room while their complete sources remain preserved. The pencil cup/pencils share a desktop contact beside the laptop. The independent three-book stack retains bottom-to-top painting and sits farther back in the freed space. Contact checks use registered alpha and the rack line in `v1/layout.json`, alongside visual review.


### Selected score angle candidate

The owner selected `concepts/sheet-music-angle-v5.png` for replacement. It is copied unchanged to `v1/sources/sheet-music.png`; the former front-facing book is archived. Generation brief: `concepts/sheet-music-angle-v5-prompt.txt` (reconstructed from the conversation; the earlier saved prompt was incomplete). `v1/layout.json` records the SVG registration transform that aligns the approved cover with the rack. The contact checker rasterizes that same transform before checking support. No new image generation was performed for this replacement.
