# Transparent room: generation and extraction provenance

Work dates: November 16–17, 2026, America/Chicago.

All generated sources used the built-in `image_gen.imagegen` tool. No CLI, API runner or alternate model was used. Original masters are preserved. Actual transparent production layers are rendered deterministically from the existing editable SVG contours and original artwork; generated masters contribute only registered repairs/completions. `manifest.json` records the specific sources and masks.

## Furniture underpainting

Edit target: `assets/room-workstation-no-pen-v1.png`.
Saved source: `masters/furniture-underpainting-v1.png`.

Final prompt:

Use case: precise-object-edit. Asset type: registered hidden-surface repair master for this exact 2D game room. Edit target: reference image. Keep the entire full room camera, canvas proportions, exact furniture positions, silhouettes, outlines, warm cartoon colors and all structural furniture. REMOVE ONLY THE REMOVABLE CONTENTS so the furniture underneath can be extracted independently: all books from the left wall shelf and the right tall bookcase and the desk stack; all five plants including pots and all dangling leaves; camera from left shelf; sheet music from piano; cream blanket from piano bench; framed couple portrait and calendar; espresso machine, grinder, bean jar and cup from coffee cabinet; laptop, open notebook, pen, pencil cup/pencils and desk lamp from desk; tennis rackets and ball basket; mouse toy; orange sofa cushion and cream sofa throw; foreground photo album. Reconstruct the simple hidden wood/shelf/backboard/sofa upholstery/floor or wall surfaces behind ONLY those removals. Preserve the piano, bench, empty wall shelf, coffee cabinet, empty tall right bookcase, stool, desk, chair, blue sofa, foreground coffee table and rug exactly in their original geometry. Preserve the existing window and curtains. Do not add items. Do not change the original visible furniture edges or perspective. This is one registered repair plate, not a redesign, not a sprite sheet. Preserve entire original landscape framing.

## Bare-room candidate — not consumed

Edit target: `assets/room-architecture-v3.png`; supporting placement reference: `assets/room-workstation-no-pen-v1.png`.
Saved candidate: `masters/bare-room-candidate-v1.png`.

Final prompt:

Use case: precise-object-edit. Edit target Image 1, supporting placement reference Image 2. Produce ONE empty bare-room architectural background. Preserve Image 1 exactly: full 1670x941 landscape composition, peach wall, neutral wooden floorboards, beams, baseboard, original Sili Li lettering upper-left, clean upper-right beam WITHOUT contact icons. Add ONLY the architectural window opening in the wall at the window's existing location from Image 2: inner opening corners approximately (955,180), (1356,180), (1356,439), (955,439). It is a simple recessed empty rectangular opening, with a subtle unfinished warm plaster reveal, and a flat muted pale gray-sage distant light visible through it. NO wooden window frame, NO glass, NO window sash, NO sill, NO garden foliage or scenery, NO curtain rod, NO fabric. Those will be separate assets. Keep every other pixel and perspective as close as possible to Image 1. No furniture, shelf, books, artwork, plants, characters, floor rug, direct sunbeam or new decoration. Same original outlined warm 2D cartoon rendering. No crop, no camera change.

The candidate introduced an overly prominent window reveal. Production instead keeps the original architecture pixels and a registered neutral opening; the wooden frame is a separate asset.

## Shelf plant candidate — not consumed

Edit target: `assets/room-workstation-no-pen-v1.png`.
Saved candidate: `masters/shelf-plant-candidate-v1.png`; requested transparent output.

Final prompt:

Use case: background-extraction. Edit target reference image. Extract ONLY the trailing potted plant on the TOP LEFT WALL SHELF. This is the leafy heart-shaped green vine with cream pot above the left upright piano, including the long trailing vine down to the piano top. Actual transparent alpha background. Keep exact original plant drawing, colors, leaf shapes, hand-drawn outlines, perspective and all visible details. Remove all wall, wooden shelf, piano, books, camera and every other object from the cutout; gaps between leaves must be transparent. Complete only the tiny hidden portion of the cream pot where the shelf or leaves obscured it. No new leaves, no new design, no shadows from other furniture. Output the one complete isolated plant at high resolution with generous transparent margin, same upright orientation, no labels, no grid, no backdrop.

The generated drawing and soft halo were unsuitable for faithful replacement. The final plant preserves original source pixels with an authored foliage mask instead.

## Desk repair

Edit target: `masters/furniture-underpainting-v1.png`.
Saved source: `masters/desk-underpainting-v1.png`.

Final prompt:

Use case: precise-object-edit. Edit target the supplied bare-furniture room repair plate. Remove ONLY the leftover dark tilted laptop screen on the rear edge of the right desk (approximately x1344..1482 y500..599). This is a laptop screen, not a chair. Restore clean peach wall above the desk and the continuous empty orange wooden tabletop behind its bottom edge. Keep the desk outline and top perspective, all other furniture, window, room, warm colors and exact full landscape composition UNCHANGED. Do not add any chair or any prop. Output this same full registered room, with this one leftover laptop completely absent.

## Rug repair

Edit target: `assets/room-workstation-no-pen-v1.png`.
Saved source: `masters/rug-underpainting-v1.png`.

Final prompt:

Use case: precise-object-edit. Asset type: registered rug hidden-surface repair plate. In this exact room illustration REMOVE ONLY the foreground round coffee table, its plant and photo album, and the blue sofa with its cushion/throw/floor plant. Reveal and COMPLETE the warm muted terracotta/cream/sage patterned rectangular rug underneath them, following the existing visible rug border, repeating geometric motifs, original floor perspective, texture and muted colors. The rug still occupies the same foreground floor position, from approximately x435..1150 y825 and widening toward the bottom, cropped naturally by the image edge. Keep the entire rest of the room, furniture, camera, exact landscape canvas and colors unchanged. No new furniture, no redesign, no bright new pattern, no new objects or text. This image is a repair source only: its newly exposed rug will be clipped into a separate transparent asset under the unchanged original sofa and table.

## Laptop hidden keyboard

Edit target: `assets/room-workstation-no-pen-v1.png`.
Saved source: `masters/laptop-candidate-v1.png`; requested transparent output.

Final prompt:

Use case: background-extraction. Extract ONLY the open gray laptop on the right-hand work desk in this exact warm outlined 2D cartoon room. Preserve the exact visible dark gray screen, mauve-gray bezel, tilted backward screen angle, orange screen-edge reflections, keyboard base and same three-quarter viewpoint; do not redesign or add logos. Complete only the front-right keyboard/base portion currently hidden behind the open notebook so this laptop is a complete reusable object. Isolated laptop with genuine fully transparent alpha, including all surrounding space. No desk, notebook, pen, lamp, books, pencil cup, plant, background, shadows, glow, colored halo, labels or text. Do not add code to the screen. Same original cartoon drawing, not photorealistic. Output one laptop centered with generous transparent margin; do not crop its base.

This output is not used as a wholesale laptop replacement. Only the previously notebook-occluded region contributes to the registered completion; all other visible laptop pixels remain original. The outer alpha/halo is clipped away by the original authored object contour.

## Clean beam beneath lettering

Edit target: `assets/room-architecture-v3.png`.
Saved source: `masters/beam-underpainting-v1.png`.

Final prompt:

Use case: precise-object-edit. Edit target the supplied empty architectural room. Remove ONLY the cream handwritten text Sili Li at the upper left of the dark wooden ceiling beam. Reconstruct continuous matching brown wood grain, lighting and color behind those letters. Keep the empty upper-right beam without icons. Preserve every wall, floorboard, baseboard, beam, outline, lighting, exact full landscape framing and perspective unchanged. Do not add a window, objects, characters, decorations, text or symbols. Output the same entire room. This is a registered hidden-surface source to allow the original lettering to be a separate transparent overlay.

Only the small lettering region is sampled into the bare background. The original cream lettering is exported as a separate true-alpha decoration.
