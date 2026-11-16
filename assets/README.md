# Animation assets

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
