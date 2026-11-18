# Original-style repaint study

The owner rejected C's procedural texture pass, supplied `references/original-site-texture-target.png`, and explicitly selected: preserve the corrected composition and interactions, restore the original drawing style as closely as possible. Do not restore obsolete object positions or use historical room pixels as production cutouts.

D (`?texture=painted`) is a reversible review mode based on B. It swaps freshly repainted independent objects at the same registered bounds and transforms. Production builds keep the original assets and omit study PNGs. B remains unchanged and is the default independent review view. C is removed from the comparison controls; its previous implementation is retained for history only.

## Iteration decisions

- Piano v1 had conspicuous diagonal brush strokes; v2 removes them, softens smooth walnut shading and subdues the brass rail. The attached rack and independent approved score remain.
- Garden v1 looked like an oil painting; v2 returns to smooth irregular flat foliage masses and layered muted hills like the reference, without outlined leaves or diagrammed flowers.
- Shelf plant v1 was too rough, v2 too muted; v3 restores lively olive/yellow shading with softer highlights. The transparent alpha, not the tool preview's hidden RGB, determines the exterior.
- Bench throw loses the added blue band/leaf embroidery; sofa throw loses the overly detailed cable knit. Both keep their established footprints and drape.
- Rug receives smaller, less mechanically crisp motifs and a softer dusty palette. Its approved placement is retained.
- Espresso machine, desk, cabinet, bookcase and wall shelf receive softer surface shading and less perfectly uniform rim highlights; original separate source versions remain intact.
- Open/closed curtain candidates soften the fold shading while preserving the cohesive closed pair. Original hit contours remain registered; actual pointer reopening is tested repeatedly.
- Warm the existing floor sunlight in D without changing its footprint or the curtain-controlled visibility.

No changes to actor atlases, cats, chairs, journey paths, timing, audio, album, score artwork, content or room geometry. Texture selection uses a context provider without a DOM wrapper, preserving direct-sibling depth selectors. Candidate SVG images mount only in D and unmount when returning to B.

## Files and checks

`catalog.json` retains every source SHA, generated-image origin, prompt, reference, version and normalized file. `sources/` contains untouched built-in imagegen outputs; `ready/` contains trim/resize normalization only. `prompts/` contains exact generation prompts. Active selection: `src/scene/assets/styleStudy.js`.

Run `node scripts/check-style-study.mjs` for source provenance, alpha, canvas equality and source/candidate opaque overlap. This checks gross shape drift, not artistic equivalence. Inspect actual room screenshots as well. `tmp/style-study/` contains the successive whole-room reviews and final B/D screenshots across Chromium, Firefox, WebKit, Android and iPhone profiles, plus seated occlusion captures. Browser emulation is not physical-device certification.

The study is for visual review. Do not claim exact original-art equivalence solely from tests or alpha overlap. Continue focused visual iterations if the owner identifies remaining differences.

## Calendar and window-light refinement (review v24)

Calendar v1 adds slight paper wear. Garden v3 was too realistic and was never published; garden v4 returns to simple cartoon color masses with believable spatial layering. V4 is selected. See the exact prompts and source versions in this library.

D also adds lightweight state-linked rightward air/ground/desk light. Open/closed-window projections match side sashes versus the closed artwork’s 4 × 3 pane grid; drawn curtains remove all new light. Table props occlude tabletop light naturally. No continuous particle system, extra clock or changes to A/B lighting. See `WindowDaylight.jsx` and `tests/browser/daylight.spec.js`.

## Book materials and lower-bookcase light (review v28)

Bookcase v2 / wall-shelf v2 soften binding materials and printing without changing book arrangement. Desk-book-01/02/03 v1 remain separate pieces and add quieter cover pigment, hinges and warm layered paper edges. Five built-in imagegen masters/prompts are preserved; catalog references identify the exact input artwork.

The same single feathered air fan now spreads onto the lower bookcase. Do not add overlapping polygons or a hard-edged shelf highlight to imitate this light: those would risk the chair seam fixed in v27.
