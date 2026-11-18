# Artwork index

The active room uses [freshly regenerated standalone assets](rebuilt/README.md). All physical room art was regenerated from scratch after owner review on November 17, 2026. Approximate appearance is sufficient; old-room extraction is superseded.

- `rebuilt/v1/sources/`: 87 original built-in imagegen outputs, with complete silhouettes.
- `rebuilt/v1/ready/`: 78 registered room assets, nine actor atlases and 40 individual frames.
- `rebuilt/v1/catalog.json`: per-asset prompt, style reference, source path and checksum.
- `rebuilt/v1/manifest.json`: world placement, source-margin bounds, actor cells and hit contours.
- `album-*.png`: existing album content, preserved unchanged.
- `music/one-summers-day.m4a`: owner-supplied recording, preserved unchanged.
- Root room images, earlier pose sheets, repair plates and `objects/`: historical sources and the rejected cutout experiment. Preserved for recovery; not the active room artwork and not published by the new build.

The room is 1672 × 941 world units. Furniture may extend outside the camera, but its saved asset remains complete. Every book is independent; plants are whole plants. These are reusable 2D images, not 3D models.

Run `npm run assets:export` to normalize the existing fresh outputs and rebuild hit geometry. This command never generates images or reads historical room pixels. Run `npm run assets:check` to verify source hashes, alpha, inventories and runtime mapping. The old extraction commands are explicitly named `assets:legacy:export` / `assets:legacy:check` and must not replace the new art.
