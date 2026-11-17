# Modular room image provenance

All images below were edited with the built-in image generation tool. The first four use room-clean-v7.png as their source; neutral architecture uses room-architecture-v1.png. The clean architecture is the background; original artwork is restored through independently owned masks. Closed-state rasters provide matching illustrated poses rather than stretching tied curtains or inward-opening sashes.

## Empty architecture

Saved asset: `assets/room-architecture-v1.png`

Final prompt:

Precise object removal / animation underpainting. Edit this exact room illustration into its EMPTY ARCHITECTURAL BACKGROUND, preserving exact camera, 1670x941 composition, peach wall, floorboard perspective, lighting, ceiling wooden beams, header band with Sili Li and icons, and horizontal wall/floor baseboard. REMOVE ALL freestanding or wall-hung contents: entire piano, bench, sheet music; left shelf with books/camera/plant including all trailing vines; framed portrait; calendar; coffee cabinet and all coffee equipment; entire window including frame, garden view, curtain rod, sashes and curtains (fill window area with continuous peach wall); tennis rackets and ball basket; stool; bookcase and all books/plants; entire desk, lamp, laptop, stationery, books and chair; sofa, cushions, blankets; foreground rug, coffee table, album and plant; mouse toy and every other decorative prop. Fill behind removed furniture with matching clean peach wall above the baseboard and continuous warm wooden floorboards below it. Do NOT add anything. This is a hidden clean background plate; every original prop will be rendered back independently. Match original warm cartoon style and texture exactly.

## Closed glass

Saved asset: `assets/window-closed-v1.png`

Final prompt:

Precise object edit for an animation pose. Preserve this full room composition and ALL furniture exactly. Change ONLY the window: close the two olive-green divided-glass casement sashes so they meet flat in the center of the existing window opening. They must be normal hinged window sashes, NOT shutters; translucent clear glass still shows the same garden landscape. The middle meeting stile is vertical at x1155, frame opening approximately x955..1355 y179..440. Keep existing overall window/frame size, position, wooden sill and warm cartoon style. REMOVE BOTH cream curtains temporarily and reconstruct the peach wall/window frame behind them; keep the rod. Do not change any other object, color, framing or geometry. This is the closed-window pose to be clipped and layered into the existing scene.

## Drawn curtains

Saved asset: `assets/curtains-closed-v1.png`

Final prompt:

Precise object edit for a curtain animation pose. Preserve exact full room composition, furniture and window position. Change ONLY the cream peach window curtains: UNTIE BOTH tiebacks and draw the left and right panels together to meet at the center, completely covering the window with opaque warm cream/peach fabric with natural vertical folds. Two distinct full-width panels suspended on the existing rod, left panel x883..1155 and right panel x1155..1432, tops approximately y115 and hem y484, matching the original curtains' full height. No tieback belts in closed position. Curtains meet cleanly in the middle; no gap, no visible glass through the opaque fabric. Same original fabric colors, dark hand-drawn outlines, soft fold shadows and warm cartoon style. Keep all other elements unchanged, including the curtain rod, lamp, wall, piano, photos, coffee station, furniture and header. Do not crop or change camera.

## Hidden surfaces

Saved asset: `assets/room-hidden-surfaces-v1.png`

Final prompt:

Animation occlusion repair plate: edit only three occluding props in this exact room. REMOVE the entire piano bench and its cream blanket, reconstructing the full dark brown lower piano cabinet behind it and warm wooden floor below it. REMOVE the original desk chair completely, reconstructing the desk apron/legs and floor behind it. REMOVE only the open photo album from the foreground coffee table, reconstructing continuous wooden tabletop; keep its potted plant. Preserve EVERY other object, the approved curtains and outward window, all furniture geometry, exact framing, original colors and texture. Keep the removed bottom-right plant absent. No cats, people, new objects or text. This plate will be used only behind separately rendered bench, chair and album.

## Neutral architecture

Saved asset: `assets/room-architecture-v2.png`

Final prompt:

Precise lighting cleanup of this empty architectural room background. Remove ONLY the bright diagonal window-grid sunlight patches on the lower-left wooden floor. Reconstruct continuous warm wooden floorboards with soft ambient light, no direct sunbeams or sharp lattice shadows. Preserve exact peach wall, floorboard perspective, colors, baseboard, beams, header lettering and icons, room dimensions and camera. No furniture, window, plants, objects, characters or new text. This is the neutral floor background; sunlight will be rendered separately.


## Clean beam for independent profile tiles — November 16, 2026

Saved asset: `assets/room-architecture-v3.png`
Source: `assets/room-architecture-v2.png`
Method: built-in image_gen edit, opaque background. The original v2 asset is preserved.

Final prompt:

Use case: precise-object-edit. Edit target: the supplied illustrated room architecture background. Remove ONLY the three cream contact icons at the upper right on the dark wooden ceiling beam (envelope, GitHub cat, LinkedIn in). Repaint their former areas as uninterrupted naturally continuous warm dark brown wood, preserving the horizontal grain, lighting gradient, long dark horizontal seam, and orange beam trim. Absolutely no rectangular patches, color discontinuities, borders, residual icon fragments, or new symbols. Keep the Sili Li lettering at upper left exactly intact. Preserve the exact full composition, architecture, wall, floor, beams, black outlines, colors, canvas aspect ratio and registration of every other part. Output the entire same background with a clean empty wooden beam at upper right. This is a production background behind precisely positioned game furniture, so no rearrangement, cropping, extra objects, or redesign.
