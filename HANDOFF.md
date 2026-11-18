# Sili's Little House — Project Handoff

## Production publication authorized — November 17, 2026 (America/Chicago)

- Owner explicitly requested preserving the currently live Git version and pushing the current local work to update production. The previous deployment and remote main both point to `8c997a3fdc280fe7be178b28e56ad6b4a79a8875` (successful Pages run `44020398756`). Saved and pushed annotated tag `rollback/production-before-scene-runtime-2026-11-17` before publishing new source. Full rollback notes are in `docs/PRODUCTION_RELEASE.md`.
- Production build now defaults to the latest painted/D artwork, including all nineteen selected material assets and window daylight. Review-only comparison buttons remain hidden; runtime preview retains its A/B/D controls. This closes the previous production-only A/omitted-style-assets gap so the published site reflects the current reviewed work.
- Publishing the full current scene source, independent artwork and retained authoring versions from `refactor/scene-runtime` to main, without resetting the workspace or rewriting history. This explicit request authorizes this release; later unrelated production releases still need owner authorization.


## 600ms interaction feedback — November 17, 2026 (America/Chicago)

- Owner shortened activation feedback again, from 1000 to **600ms**. Only the timeout constant changed; repeat activation, sticky-hover suppression and keyboard focus remain unchanged. Preview build and diff check passed.
- Independent review **v34 deployed successfully**: https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_e0d5a702fa6c8191aeec98050c268a1d`; deployment: `appgdep_6afd2ade08708191a86cb211183319d7`; isolated SHA: `052c3c86ddb236c5a1f4c2c913776a1af09c73d3`; archive: `tmp/runtime-preview/interaction-feedback-600ms.tar.gz`. No main repo push or silispace.net release; all unrelated work retained.


## One-second interaction feedback — November 17, 2026 (America/Chicago)

- Owner shortened the highlight duration to one second. Changed only the delegated feedback timeout from 3000 to 1000ms; expiry/hover suppression, repeat activation and keyboard focus behavior remain as v32. Preview build and diff check passed; no unrelated test reruns for this constant change.
- Independent review **v33 deployed successfully**: https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_1c54269348488191a7bf35cfd95d0d1b`; deployment: `appgdep_6afd283c38f48191baae12bfdcb9146e`; isolated SHA: `5b62e8b8d4f14ecdcc50ea89c169bf621beb7e3f`; archive: `tmp/runtime-preview/interaction-feedback-one-second.tar.gz`. No main repo push or silispace.net deployment; all unrelated work preserved.


## Timed interaction highlights — November 17, 2026 (America/Chicago)

- Owner requested all interactive glowing borders disappear a few seconds after activation. Added one delegated `useInteractionFeedback` listener on the App root for room objects, moving cats and UI buttons/links. Click feedback expires after 3000ms; another click restarts its timer. Expired scene hover is suppressed even if a mouse stays still or touch retains sticky hover. A fresh mouse entry can reveal the normal hover affordance again; touch-generated pointerover cannot revive it. Existing short CSS transitions fade the feedback; reduced motion removes the fade delay.
- Pointer-origin focus outlines also expire (including Explore's restored programmatic focus); actual keyboard focus stays available. Tab clears pointer markers, restoring normal focus-visible outlines. Material filters, artwork, destination selection, animations and audio are unchanged. Timers are cleaned up on unmount; no RAF or continuous polling added.
- Independent review **v32 deployed successfully**: https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_11b96452e4bc8191bda4c7e35692e979`; deployment: `appgdep_6afd211251b88191a741f6a818ebb0bb`; isolated Site SHA: `9d4ffaa3e1da26f73bbdb998cde6e10dba2e8c92`; archive: `tmp/runtime-preview/interaction-feedback-v1.tar.gz`. No main repo push or silispace.net release; all unrelated work preserved.
- Validation: typecheck, 65 unit tests/eight suites, preview build and diff check passed. Actual browser script checked curtain/cat activation, 3.3-second expiry and repeat activation across Chromium/Firefox/WebKit/Android/iPhone; separate check verified regular button expiry and Tab restoring focus styling. Final compiled preview 4/4 passed. Evidence/scripts: `tmp/check-feedback.mjs`, `tmp/check-feedback-controls.mjs`, `tmp/feedback-browser.log`. No new permanent tests for this small reversible visual behavior.


## Tucked typing legs — November 17, 2026 (America/Chicago)

- Owner clarified that the original typing upper-body angle is correct; the problem was the legs looking like a squat and projecting too far sideways. Preserve the approved straight rear-facing typing angle. Early three-quarter typing experiments in this turn were rejected before integration and must not replace it.
- Removed v30's lower-body skew and complementary render slices completely. New transparent typing source has compact foreshortened thighs tucked inside the chair footprint and a straight downward calf/small sneaker below the seat, instead of the wide side-profile L-shaped leg. Exact final prompt: `assets/rebuilt/v1/prompts/workstation-typing-tucked-v2.txt`; source: `assets/rebuilt/v1/sources/actor-sili-computer.png`. `registeredCanvas:true` remains. First tucked attempt put the shoe at seat height; it is archived, not active. Versioned original sources and reference sheets remain intact.
- A typing-only pass reuses the actual chair's seat-front artwork to occlude the upper calf behind its green front edge. The desk support pass remains; no floor-color patches or air-light changes. Writing source, merged workstation content and typing/writing schedule remain intact, with the old shared skew removed from both poses. No new animation clock or UI control.
- Independent review **v31 deployed successfully**: https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_4e2dbeb0366c81918e4842cdec183d91`; deployment: `appgdep_6afd184512ec819192121efb510bc6e6`; isolated Site SHA: `74d8ed53d50207cb00d47566305de7b8aa07e3bb`; archive: `tmp/runtime-preview/tucked-typing-v2.tar.gz`. No main-repository push or silispace.net release; all unrelated uncommitted changes retained.
- Validation: typecheck, source SHA/alpha checks, preview build and diff check passed. Five workstation browser checks passed across Chromium, Firefox, WebKit, Android and iPhone, covering both poses, fixed seat, pen and reduced motion; compiled preview 4/4 desktop/iPhone passed. Actual desktop and iPhone-size typing screenshots inspected: `tmp/workstation-review/computer-v3.png` and `tmp/object-review/iphone-computer-contact.png`. Earlier 65-unit baseline still applies; no unrelated unit rerun for this artwork/occlusion-only change.


## Unified workstation / seated right-leg depth — November 17, 2026 (America/Chicago)

- Owner requested more right-leg occlusion and one combined laptop/notebook destination while preserving notebook animation. Both objects now activate **At my workstation**, which contains the existing four project sections. Explore has seven destinations; old computer/notebook keys canonicalize to workstation. Independent laptop, notebook and pen artwork remain separate.
- The existing journey clock alternates typing and writing holds with brief neutral turns and a .2s crossfade. The seat/route anchor remains fixed; no whole-character spin or new RAF. Writing hides the tabletop pen; typing restores it. Reduced motion keeps a still typing pose, and piano performance retains priority.
- Built-in imagegen produced versioned v3 seated lower-body sources. `registeredCanvas:true` preserves the full registered canvas rather than rescaling the altered silhouette. Rejected raised-foot v2 attempts, previous sources and registered-sheet references remain archived. Exact prompts: `assets/rebuilt/v1/prompts/workstation-typing-depth-v3.txt` and `workstation-writing-depth-v3.txt`. Current full transparent sources remain in `assets/rebuilt/v1/sources/actor-sili-computer.png` / `actor-sili-writing.png`; provenance/revisions are in catalog.json.
- Static CSS lower-body registration uses complementary clips and a 28-degree shear below the hips, with zero movement at the shared seam. This advances the receding calves beneath the desktop without shifting head/hands/hip anchor. The actual near wooden desk support is redrawn in front of the actor below y76%, naturally hiding most right calf/shoe in both poses. Existing chair-back mask remains. No floor-color erase patch or repeated air-light surface. A rejected displacement-filter experiment was removed because it produced jagged outlines.
- Independent review **v30 deployed successfully**: https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_f659e7c346248191bbeaa32191c5ddbb`; deployment: `appgdep_6afd10bff8248191b051d1b036063c9e`; isolated Site SHA: `5a29ca044a05c15a579cf8cc8731f97ac1ba6e65`; archive: `tmp/runtime-preview/unified-workstation-v1.tar.gz`. No portfolio push or silispace.net release. All pre-existing uncommitted work preserved.
- Validation: 65 unit tests / eight suites, typecheck, asset-source/alpha checks, production and preview builds, diff check passed. Browser: 20 checks for combined entry/window/coffee/texture across Chromium, Firefox, WebKit, Android and iPhone; after final native registration, 15 further workstation/daylight/piano checks passed across all five profiles. Compiled preview: 4/4 desktop/iPhone. Actual whole-room typing/writing screenshots inspected locally and WebKit; evidence: `tmp/workstation-review/`, `tmp/object-review/*-contact.png`. Physical-device and audible playback certification remain outside these checks. Existing B/D texture and continuous daylight behavior retained.


## Further leftward spread — November 17, 2026 (America/Chicago)

- Owner requested a little more leftward extension. Kept the single feathered fan and moved its far-left cap from x1210 to x1135 at y1060, extending the visible left edge near y940 from x1170 to x1110. Synchronized ground-light left corners from (1070,724)/(1170,940) to (1040,724)/(1110,940). Right/lower-bookcase illumination, intensity, feathering, desk lighting and state gating are unchanged. No new overlapping light surfaces or artwork changes.
- Independent review **v29 deployed successfully** at https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_7d0edd3c44f48191b984ccbf80769245`; deployment: `appgdep_6afd0754dfa08191ae206049443200f5`; isolated Site SHA: `08f95c84e83640d5cfa071955ab8bf98f9171c45`; archive: `tmp/runtime-preview/left-spread-light-v1.tar.gz`.
- Actual whole-room inspection and real-pointer curtain disappearance check passed; screenshot: `tmp/left-light/room.png`. Preview build passed. No new tests or unrelated broad reruns for the small vertex adjustment; v28 provides the broader baseline. Preserve all source versions and uncommitted work. No portfolio push or silispace.net deployment.


## Lower-bookcase light and book materials — November 17, 2026 (America/Chicago)

- Owner requested the right side of the light spread onto the lower bookcase without repeating the chair seam, plus improved book material. Expanded the right boundary of the existing **single** feathered air fan upward/outward: source-side point (1308,312), outer points (1900,466)/(2100,1060). The left boundary and actual floor patch still meet the rug. No new overlapping light layer or internal ray boundary; ample filter bounds keep the far right cap outside the viewport. Existing window/curtain gating, reduced motion and projections remain intact.
- Built-in imagegen repainted book materials in five independent candidates: `bookcase-v2`, `wall-shelf-v2` and `desk-book-01/02/03-v1`. Retained bookshelf/book count, palette, perspective and placement. Added restrained cloth/paper/leather variation, softly worn spine ends/hinges, quieter printing and warm irregular page layers. Shelf books remain integrated by the established owner exception; the three desk books remain separate overlapping objects. No invented titles/text, dirt, severe damage or scene geometry changes. Original versions and exact prompts remain in `assets/rebuilt/v1/style-study/`; active selection now **19 candidates / 27 source outputs**.
- Independent review **v28 deployed successfully**: https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_5d84f08770688191a764d21d07cb0faf`; deployment: `appgdep_6afd05e7ba248191a597c99462ea2389`; isolated Site SHA: `5083d5a415c2e84003c1a5372a2c556ecf83a734`; archive: `tmp/runtime-preview/bookcase-light-material-v1.tar.gz`.
- Validation: source SHA/alpha/canvas checks passed (19 candidates, minimum opaque overlap .937); typecheck and preview build passed; five browser daylight checks passed across Chromium/Firefox/WebKit/Android/iPhone, plus four compiled preview tests on desktop/iPhone verifying all candidates decode and B fallback. Actual whole-room and bookcase/desk closeups inspected; lower bookcase receives gradual warm light and no chair seam appears. Evidence: `tmp/book-light/final-room.png`, `final-bookshelf.png`, `final-desk-books.png`, `geometry.json`. No new tests or unrelated unit reruns. B/source masters and all unrelated uncommitted work remain intact. No portfolio push or silispace.net deployment.


## Continuous light / chair seam fix — November 17, 2026 (America/Chicago)

- Owner supplied a crop showing an obvious diagonal lighting seam across the chair and said the extension was not visible. Isolated the air-light layer in actual browser screenshots: switching it off removes the seam. The two overlapping/separated translucent ray polygons caused uneven brightness across furniture. V26 also moved only an air-ray vertex while the ground patch remained at its previous location, making the requested ground extension weak.
- Replaced both air-ray polygons with **one continuous widening fan**, softened its edge from 9px to 26 world pixels, slightly reduced its peak opacity, and placed the far cap below the viewport with explicit ample SVG filter bounds. No overlapping ray boundaries remain across the chair. The left edge meets the rug near (1170,940).
- Extended the actual ground-light projection too: left upper/lower corners now (1070,724) / (1170,940), with 12px feathering. Closed-window grid and open-sash shadows use that same updated plane, retaining four columns/three rows; desk projection and all light/window/curtain gating remain unchanged. This supersedes v25/v26's two-ray geometry; do not restore it.
- Independent review **v27 deployed successfully** at https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_ee86571ac8408191972a34683ca2a744`; deployment: `appgdep_6afd038f548c8191adbf147740b7008f`; isolated Site SHA: `aa85fc6335387aae60047a046f5ca3913a43ab2e`; archive: `tmp/runtime-preview/continuous-rug-light-v1.tar.gz`.
- Actual whole-room, enlarged-chair and phone visual inspections show continuous chair shading and a warm floor patch reaching the rug. Evidence: `tmp/light-seam/before.png`, `air-off.png`, `after-v1.png`, `chair-after-v1.png`, `iphone-after.png`. Typecheck and preview build passed; all five daylight-state browser checks passed (Chromium, Firefox, WebKit, Android, iPhone), including repeated curtain activation and B fallback. No new tests or unrelated full reruns. Original sources, geometry, interactions and audio remain intact; no portfolio push or silispace.net deployment.


## Rug-edge ray checkpoint — November 17, 2026 (America/Chicago)

- Owner requested the light's lower-left edge extend to the rug. Measured the active rug alpha at world y=940: right edge x=1170.5. Changed only the first air-ray landing vertex to `(1170,940)`, extending it about 105 world pixels left from v25. Aperture start, right ray, gradients, shadows, state gating and all artwork remain unchanged.
- Independent review **v26 deployed successfully**: https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_8d12b15f1c008191b442cfcbc8248924`; deployment: `appgdep_6afd01f05cc8819182bf602f55849da9`; isolated Site SHA: `cdab503523c804ee4b8ea5e8c52946a59bbc40c2`; archive: `tmp/runtime-preview/rug-edge-light-v1.tar.gz`.
- Whole-room visual inspection and actual curtain-close light disappearance passed; screenshot `tmp/rug-light/room.png`. Preview build passed. No new tests or unrelated broad reruns for this one-vertex adjustment; v25/v24 checks remain the behavioral baseline. No portfolio push or silispace.net deployment; all uncommitted work retained.


## Wider ray checkpoint — November 17, 2026 (America/Chicago)

- Owner requested light that starts narrow and fans outward to a wider end. Changed only the two air-ray polygons in `WindowDaylight.jsx`: narrower aperture starts; lower widths expand from approximately 170/215 to 262/327 world pixels (about 50% wider), preserving ray direction, feathering and intensity. Ground/table grid geometry and all window/curtain gating remain unchanged. No artwork regeneration.
- Independent review **v25 deployed successfully** at https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_5cbec9f289b88191ab3df5341cd1070a`; deployment: `appgdep_6afcffea03188191b19c5977ca01b106`; isolated Site SHA: `796921989e0fae8f99e8ba19abee3ee98051bc62`; archive: `tmp/runtime-preview/wider-light-v1.tar.gz`.
- Actual whole-room visual check: `tmp/wide-light/room.png`. Typecheck and preview build passed; five daylight-state browser checks passed across Chromium, Firefox, WebKit, Android and iPhone. No new unit tests or unrelated full reruns for the two-polygon adjustment. Prior v24 checks remain the broader baseline.
- Keep B, all existing independent artwork, opacity transitions, reduced-motion behavior and corrected interactions. All uncommitted work is retained; no portfolio push or silispace.net deployment.


## Calendar, cartoon depth and daylight checkpoint — November 17, 2026 (America/Chicago)

- Owner requested a slightly used calendar and a more believable window view, then clarified **believable space/light, not photorealistic rendering**. Garden v3's realistic scenic painting was rejected before publication; v4 restores the room's simple soft cartoon color patches while retaining near/middle/far depth, varied trees, meadow openings and atmospheric hills. Calendar v1 adds restrained ivory edge yellowing, faint handling/fold marks and faded printing, preserving the hanger and dot-grid layout.
- Owner also requested subtle Tyndall-like light on the room's right side, disappearing with curtains and matching window shadows when glass is closed. Added static feathered SVG air rays, a ground patch and a tabletop light pass only in D. Open window + open curtains shows gentle rays and side-sash shadows; closed window + open curtains suppresses air rays but retains weaker glass-transmitted light with a **4-column × 3-row** grid matching the actual closed sash artwork. Both curtain-closed combinations fade all new light out. Floor and desk grid vertices come from a consistent per-surface projection; this is a stylized approximation, not ray tracing.
- `src/scene/modules/WindowDaylight.jsx` contains geometry; RoomLighting places ground light under furniture, Furniture's Workstation places desk light after the desk and before independent props, and Room adds air light after depth layers. No new buttons or particle loops. Only opacity transitions (.7s), instantly switched for reduced motion. New SVG layers never receive pointer events. D hides the superseded left-side legacy sunlight; A/B preserve their existing lighting. Quiet aperture-edge shading makes the garden sit behind the window reveal.
- Independent review **version 24 deployed successfully**: https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . B remains intact/default, production remains A. Active candidates: **16 assets / 22 versioned source outputs**. Calendar and garden prompts/masters/provenance are in the existing `assets/rebuilt/v1/style-study/` library; v3 remains archived, v4 is active. Exact references were recorded for this pass. Source masters, original assets and all uncommitted work are preserved.
- Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_0af62c615de481918786d2c8c8d2e319`; successful deployment: `appgdep_6afcfeaf50ec81919dd48005c198ad1d`; isolated Site SHA: `82fcf1927210afe6f8ea07ca17195d6014534436`; archive: `tmp/runtime-preview/calendar-cartoon-daylight-v1.tar.gz`. First deployment `appgdep_6afcfe8c7b888191bb1e4bf84fbf3bc0` failed with backend Unauthorized; verified owner/public access and saved artifact, then retried the same version successfully. No unresolved authorization issue. No portfolio push or silispace.net deployment.
- Validation: candidate source/alpha/geometry checks, 64 unit tests, typecheck, production and preview builds passed. Browser: **20/20** across Chromium/Firefox/WebKit/Android/iPhone (curtain/calendar, texture-state continuity, new four-combination daylight checks with real-pointer reopening and B fallback). Calendar D activation still reaches frame 5. Compiled preview: **4/4** desktop/iPhone tests. Screenshots of open, glass-closed and curtain-drawn states across five profiles are under `tmp/calendar-landscape/`; normal-motion midpoint/end captures were inspected. No added layout shift or JS long tasks in the sampled transition. Headless comparison under the same conditions showed B and D both around 50ms p95 frame intervals; this is not a 60fps or physical-device certification. No particle clock or continuous light animation was added.
- Next: owner evaluates cartoon garden v4, subtle light strength/direction and calendar wear. Keep the corrected room geometry, independent transparent sources, all interaction/audio behavior and the finished album. Do not reintroduce photographic landscape detail merely to improve spatial credibility.


## Reference-guided repaint checkpoint — November 17, 2026 (America/Chicago)

- Owner rejected C (worse than B; no visible improvement), then supplied an original-site screenshot and asked for repeated visual refinement toward near-identical original style. The owner explicitly clarified: **preserve the corrected composition and interactions; restore the original drawing style only**. Do not restore obsolete layout, hidden plants or old object geometry merely to match screenshot pixels. Keep B intact as the fallback.
- Independent review Site **version 23** deployed successfully. D/repaint: https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=painted . B: `?texture=soft`; A: `?texture=original`. Review default is now B. C was removed from review buttons; its old implementation remains historical, not accepted. Production still uses A and excludes study PNGs.
- Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_ef2fc47115cc8191b1649e974c379676`; deployment: `appgdep_6afcfa23abc48191b09b19f7efcd59f9`; isolated static Site SHA: `bd1c461f44ae92294259b109598d588855ce2651`; archive: `tmp/runtime-preview/original-style-d-v1.tar.gz`. The portfolio repository was not pushed and silispace.net was not deployed.
- Performed successive whole-room visual reviews, including five intermediate screenshots and final seeded B/D comparisons. Used built-in imagegen for **19 versioned source outputs / 15 active independent candidate assets**: piano v2, garden v2, shelf plant v3, espresso machine, bench throw, rug, sofa throw, desk, coffee cabinet, tabletop plant, open left/right curtains, cohesive closed curtain pair, bookcase and wall shelf. No broad one-shot room regeneration or historical pixel extraction. This is a new review candidate, not an owner-approved final match.
- Iteration: rejected excessive diagonal strokes on piano v1 and oil-paint-like garden v1; reduced both toward smooth subtle shading/simple irregular color masses. Shelf plant received three color/shading passes. Removed added embroidery from bench throw and realistic cable knit from sofa throw; retained their physical drape. Softened wood/cloth/leaf shading and overly uniform highlights rather than adding procedural surface texture. D also makes existing floor sunlight warmer/less white without changing its geometry or curtain-controlled visibility.
- Separate candidate library: `assets/rebuilt/v1/style-study/` (`README.md`, `catalog.json`, `sources/`, `ready/`, `prompts/`). Exact prompts, input references, built-in generation origins and source SHA256 are retained. Reference: `assets/rebuilt/v1/references/original-site-texture-target.png`. None of these reference/raw source/prompt files is published. `src/scene/assets/styleStudy.js` selects active normalized candidates. Original 89-source catalog/ready files remain unchanged.
- Runtime: `RoomTextureContext` adds no DOM wrapper; `RegisteredPart` swaps only registered image leaves in D at existing bounds/transforms, and keeps original images/hit contours. Candidates mount only in D; B does not fetch them. RoomWindow's garden now uses the shared registered-image path. No actor, chair, journey, audio, album, score, content or placement changes. C material/shadow passes are absent in D.
- Validation: 64/64 unit tests; typecheck; original source/contact asset checks; production and preview builds passed. `scripts/check-style-study.mjs` validates candidate provenance/alpha/canvas and opaque overlap: minimum **.937** across 15 assets; this is a shape-drift check, not an art-quality score. 20 browser checks passed across Chromium/Firefox/WebKit/Android/iPhone (coffee/calendar/curtains plus B/D live-state retention and repeated real-pointer reopening). Compiled preview: 4/4 desktop/iPhone checks, including every candidate decode and B unload behavior. Final whole-room B/D and seated-writing screenshots across all five profiles had no page errors. Evidence: `tmp/style-study/`. Physical hardware/performance certification and audible audio playback were not repeated.
- Automatic review initially blocked the isolated upload for alleged missing publication authorization. Rechecked the user-incorporated NEXT_SESSION_PROMPT.md line permitting existing-review updates, HANDOFF's independent-Site exception, isolated hosting manifest and dist-only payload; the identical authorized workflow was then allowed. No unresolved approval block.
- Next: use D versus B and the supplied reference for focused feedback. Do not claim pixel identity or final owner visual approval from test success. Preserve the current corrected layout and all prior behaviors, retain all candidate versions, and avoid returning to C's ineffective surface-overlay approach.


## Local material checkpoint — November 17, 2026 (America/Chicago)

- Owner responded positively to B and authorized continuing texture improvements. Independent review version **22** deployed successfully. Review C at https://sili-runtime-preview.icychestnut1.chatgpt.site/?texture=lived . A/current and B/soft-paper remain available and unchanged; C/material builds on B. Default remains A; production build ignores texture selection.
- Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_a07e0f2be4548191b35581ea429aeb8f`; deployment: `appgdep_6afcf464de688191baca0a5923b427a7`; isolated Site SHA: `1664c4d20125df783d11c6ee3e5db4321ee3ee2b`; archive: `tmp/runtime-preview/material-c-v1.tar.gz`. No portfolio repository push or silispace.net deployment.
- C adds reversible, alpha-clipped SVG pigment variation to selected wood furniture and cloth: piano, bench, cabinet, shelf, stool, desk, table, sofa/cushion/throws, rug and curtains. Source PNGs and all revisions are intact. `MaterialFinish.jsx` references each registered source alpha, so material remains inside the independent prop and moves with it; repeated foreground passes share the same world-space pattern. Masks are bounded to each selected prop, not full-room animated buffers. No actor masks or controllers changed.
- The first trial's pale wood streaks/cloth pattern were too conspicuous; reduced wash to .075 light/.055 dark, wood pattern to .025/.035, cloth to .035/.045. Final C is deliberately subtle. Added small static contact shadows beneath selected fixed furniture and slightly reduced espresso-machine/grinder highlight contrast. No dirt, scratches, new folds, regenerated objects or geometric deformation. Original material-specific brushwork is still only partially approximated; avoid claiming full restoration.
- New material excludes album, score, notebooks, portrait, UI, lettering and actors. Existing B softening still affects room illustrations as before. Contacts and material are visible only in C. Keep review mode reversible and sources independent.
- Validation this pass: 64/64 unit tests, typecheck, production build and preview build passed. Updated texture test passed 5/5 Chromium/Firefox/WebKit/Android/iPhone, including seated-state retention, A/B/C switching, curtain real-pointer reopening, reload and album material exclusion. Compiled preview checks passed 2/2 desktop/iPhone. Final C screenshots, alpha-reference resolution, clear album dialog and no page errors verified across five profiles; evidence under `tmp/material-review/`. Physical-device performance and audible playback were not re-audited. Prior coffee/calendar 15-profile checks remain from v21; no behavior/controller changes in v22.
- Next: review C against B at full-room scale. Tune selected materials based on owner feedback before any new local artwork or generation. Preserve all earlier composition, occlusion, audio and animation fixes.


## Texture A/B checkpoint — November 17, 2026 (America/Chicago)

- Independent review Site version **21** is deployed successfully: https://sili-runtime-preview.icychestnut1.chatgpt.site/ . A remains the default; use `?texture=soft` for B, `?texture=original` for A. The on-screen A/B buttons switch without remounting the room or resetting activities; URL selection survives reload. Only development/runtime-preview builds expose this experiment. Production builds retain A.
- Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_2d7ad12e4eb881919d00809b92636b9a`; deployment: `appgdep_6afcf36b6a088191a4e8393f5a16ad44`; isolated static Site source SHA: `c00082d1b1c7e142a5d46382f00437fad8a4d72b`; archive: `tmp/runtime-preview/texture-ab-v1.tar.gz`. This is not a portfolio repository commit. Earlier version 20 remains the pre-treatment reference.
- Compared live original and version 20 at 1672 × 941. Current props have cleaner, more regular outlines and highlights; original artwork has irregular painterly color, cloth and wood detail. B is a restrained cohesion experiment, not a complete restoration of original material character or owner-approved art.
- Implementation: `src/scene/TextureReview.jsx`, `textureReview.css`, static seeded 192px paper tile, small additions to `Room.jsx`. Illustration image leaves receive contrast `.965`, saturation `.96`, sepia `.035`; background/SVG image leaves also receive `.32px` blur. HTML character/cat/chair sprites omit blur because WebKit made fractional blur too coarse on phone. Paper uses a static soft-light layer at `.045` opacity. No live turbulence, animation clock, renderer migration, asset regeneration or source overwrite. Existing contact shadows are preserved; new local shadow/material edits are deferred until direction review.
- Keep room letterforms, hotspot contours, profile controls, dialogs and finished album clear. No filter on room/module ancestors and no sibling reordering: existing depth, geometry, motion and controllers are retained. Mobile comparison controls sit above the bottom navigation.
- Validation: 64 unit tests passed; typecheck, asset/source/contact checks, production build and preview build passed. Existing coffee/calendar/curtain tests: 15/15 across Chromium, Firefox, WebKit, Android and iPhone. New `tests/browser/texture.spec.js`: 5/5 across the same profiles, testing live seated-state preservation and real-pointer curtain reopening under B. Built preview: 2/2 desktop/iPhone checks. Final A/B screenshots and dialog-filter checks across all five profiles had no page errors. Evidence: `tmp/texture-review/`. Browser emulation is not physical-device or performance certification; audible playback was not re-audited in this texture-only task.
- All pre-existing uncommitted work is preserved. No portfolio push or silispace.net deployment. Next: owner compares A/B, then tune softness/pigment or carefully vary selected materials; do not broadly regenerate assets or expand computer/notebook/album scope.


## Session checkpoint — November 17, 2026 (America/Chicago)

Local code is authoritative. Workspace: `/Users/lisili/sili-portfolio`; branch: `refactor/scene-runtime`. The working tree contains extensive uncommitted implementation and assets; preserve it. No portfolio branch push or silispace.net deployment was performed in this session. The main room still uses React DOM/SVG and existing controllers. PixiJS 8 / XState 5 are installed for the isolated prototype; a full renderer migration is not complete.

## Current review delivery

- Review URL: https://sili-runtime-preview.icychestnut1.chatgpt.site/
- Site project: `appgprj_6afbe6bf9ff48191a24b08b91585c62b`; audience: public; latest successful version: **20**.
- Saved version: `appgprj_6afbe6bf9ff48191a24b08b91585c62b~appgver_751e32cc5c288191bfb01943e61a4f15`.
- Deployment: `appgdep_6afcefa61c308191b171da003486d746` (succeeded).
- Isolated Site source SHA: `e2ffe0757da9e9cafbe942b3a548d2e28db004c2`.
- Archive: `tmp/runtime-preview/curtain-reopen-fix.tar.gz`; isolated checkout: `tmp/runtime-preview/site`.
- The Site SHA belongs to that static preview checkout, not the portfolio repository. The original https://silispace.net/ remains the comparison reference.

## Implemented state to preserve

- All physical objects were freshly regenerated as reusable transparent 2D artwork over a bare architectural room. Keep originals, prompt provenance and revisions. No return to extracting pixels or masks from the old room. Exact original pixels are no longer required, but composition, character identity and approved interactions remain important.
- Current inventory: **89 registered sources, 79 asset entries, 10 actor atlases, 44 actor frames**. The 20 standalone book sources are retained. Shelf books are integrated into the shelves by owner exception; desk books remain three independent overlapping objects. Whole plants and ornaments remain independent. Desk and upper-right plants are hidden, not deleted from the source library.
- Workstation: computer/notebook switches stay seated; notebook selects pen-in-hand writing with a different upper-body angle. Far left calves/shoes were tucked mostly behind near legs. Preserve pelvis anchors and chair foreground depth. The loose pen hides while held.
- Piano: integrated upper-panel rack is based on owner's real upright piano reference. Score is an independent transparent book with simple three-row notation and the approved subtle ink tilt (v12); preserve display registration and physical rack contact. The catalog's active source includes a background-extraction cleanup. Runtime export MUST retain the SVG `transform`. Piano playing uses the three-quarter angle and subtle wrist/finger frames; pause uses hands on lap, preserving audio progress.
- Coffee: original tamping poses remain. Extra back-facing atlas adds lock/start/wait/reach, with **3.6 seconds extraction** before cup pickup. Only extraction activates machine effects. Cup stays on the station until pickup. Departure uses frame 7 (`returning`), never tamp frame 0. Cancellation and reduced motion remain supported.
- Calendar: pointing frame 5 uses scale `.95`, feet origin `50% 95.49%`, replacing an incorrect legacy `1.1` enlargement.
- Curtains: owner rejected both overlapping panels and the cut seam repair. New `curtain-closed-pair` is a freshly drawn cohesive pair; both rendered halves use it to retain opening behavior. Old individual masters remain available. The pair MUST remain in `scripts/trace-regenerated.mjs`'s interactive allowlist: omitting it caused curtains to close but never reopen. Latest fix restores its alpha click contour; real-pointer tests cover three close/open cycles.
- Blue racket now matches the brown/red racket's actual opaque height within 3 room pixels, with floor contact retained. Sofa throw was freshly redrawn against the sofa shape. Coffee machine/grinder/beans/mug bases were recalibrated onto the tabletop, with light contact shadows; effects move with the machine. These placement changes are implemented, not a guarantee of final owner art approval.
- Album, audio recording, personal content and profile links retain their approved behavior. Do not change the finished album or implement new computer/notebook content as part of the texture task.

## Immediate next task: recover the original soft, lived-in illustration quality

Owner's latest feedback: independently generated models look too polished, new and crisp, losing the original's slight softness and believable atmosphere. This is the next priority, ahead of unrelated renderer migration or new features. **Historical state before the version 21 texture experiment above.** The following is a proposed direction, not approved filter values or permission to regenerate everything.

1. Compare the actual current scene with the original live site and available original room art; evaluate whole-room cohesion at desktop and phone scales.
2. Make one reversible whole-room comparison treatment first: very subtle illustration-only softening, fine grain/paper texture, restrained warmth and reduced harsh outlines/highlights. Keep UI text, controls, dialogs and album clear. Avoid simply blurring the entire app or obscuring alpha edges.
3. Keep independent sources intact. Prefer a shared treatment across architecture, props and actors so their sharpness/light agree. Preserve geometry, colors/identity, occlusion, hit areas and every interaction. Keep processing light and test Safari/Firefox/mobile performance and reduced motion.
4. After reviewing the comparison, selectively soften the most conspicuously new objects: modest material variation, natural cloth folds, mild signs of use and coherent contact/ambient shadows. Do not add dirt, strong noise, heavy aging, glowing halos or arbitrary decoration.
5. Show an A/B or equivalent reviewable comparison before broad asset changes. Do not present the texture direction as already implemented or owner-approved.

See `docs/NEXT_SESSION_PROMPT.md` for the copyable continuation prompt.

## Asset pipeline and verification

Placement/contact authority: `assets/rebuilt/v1/layout.json`. Sources and previous masters: `assets/rebuilt/v1/sources/` and `sources/revisions/`; prompts/hashes/references: `catalog.json`; registered PNGs: `ready/`; placement manifest: `manifest.json`; runtime exports: `src/scene/assets/regeneratedManifest.js`. Compatibility aliases are in `regeneratedAliases.js`. `SceneArtwork.jsx` renders independent images and their registered transforms.

Relevant latest prompts: `actor-sili-coffee-brewing-v2.txt`, `desk-far-leg-v1.txt`, `curtain-closed-pair-v1.txt`, `sofa-throw-v2.txt` under `assets/rebuilt/v1/prompts/`; approved score candidate/brief: `concepts/sheet-music-ink-perspective-v12.*`.

Commands: `npm run assets:export`, `npm run assets:check`, `npm test`, `npm run typecheck`, `npm run build`, `npm run build:preview`. Export before building after source/placement changes. `scripts/check-regenerated.mjs` checks provenance/alpha, window coverage, open/closed click contours, score/rack registration, desk contacts, coffee bases and actual racket heights. Keep runtime hit contours for newly introduced interactive models.

Last full unit run: **64 tests / 8 suites passed**. Type checks, source/alpha/contact checks and preview build passed for recent object fixes. Compiled preview checks passed in desktop Chromium/iPhone WebKit before the last contour-only fix. Latest contour fix passed asset checks/build and **four desktop/iPhone browser checks**, including real-pointer repeated reopening. Coffee flow was checked in Chromium, Firefox, WebKit, Android and iPhone profiles earlier in this session; not every later edit was rerun across all five profiles. Browser emulation is not real-hardware certification; main-room full Pixi parity and final visual approval remain outstanding.

Browser checks: `tests/browser/coffee.spec.js`, `tests/browser/curtain-calendar.spec.js`; compiled output: `tests/preview/preview.spec.js` with `playwright.preview.config.js`. `scripts/review-room.mjs` captures a seeded room/cat/activity review. Screenshots under ignored `tmp/` are evidence, not proof of universal visual correctness. No new dev server needs to be started merely to read this handoff.

## Computer concept review — November 16, 2026 (local, not implemented)

The owner responded positively to the latest computer concept and asked to save this discussion and image for continuation. This accepts a visual direction for further work, not authorization to implement the personalized computer view, push, or deploy. Resume with the computer; the notebook is a later, separate task.

Latest concept: [Computer project view v3](concepts/computer-project-view-v3.png).

![Computer project view v3](concepts/computer-project-view-v3.png)

### Confirmed direction and feedback

- Opening an object should feel like an enlarged view of that actual object. The owner referenced the existing album only for its viewport occupancy, not its appearance or book interaction.
- Only computer and notebook are in scope. The album is considered finished for now: do not alter it until the owner explicitly requests a change. Other content views remain unchanged.
- Keep the same cartoon drawing language as the room. Different object shapes are welcome; uniform shells are not a requirement.
- The computer contains CoffeeHeads and biomedical machine learning; the notebook contains SVD & PCA and cloud microphysics modeling. No new source information is supplied. Explicit English placeholder content is acceptable; do not invent results or evidence.
- Computer projects should open like individual folders. Keep desktop folder icons small, ordinary and simple, with ample empty desktop space. Do not display “Sili’s Computer” or another decorative desktop heading. Earlier oversized pictorial folders and busy floral/cloud decoration were rejected.
- The open-project window can be richer than the desktop. The current concept includes an overview, a compact architecture diagram, implementation notes and a clearly marked interface placeholder. These illustrate layout only; the diagram and mock screenshot are not independently verified project evidence or final content requirements.
- Perspective must correspond to sitting in the existing work chair and looking at the laptop. Behind the laptop: the wooden bookshelf on the right, a small area of warm wall, and part of the cream curtain on the left. Do not substitute a generic room background or repeat the original wide room composition.
- Notebook should eventually support page turning. Its personalized design and behavior have not been discussed in detail or implemented.

### Concept provenance and implementation boundaries

The saved PNG was generated with the built-in imagegen tool, not the CLI. References: `assets/room-workstation-no-pen-v1.png` for room layout/style and the previous simplified two-state computer concept for interface direction. The old room reference is a visual reference only; it does not authorize restoring its obsolete contact icons or other superseded artwork.

Prompt specification: create one landscape, nearly front-facing enlarged laptop project view; preserve warm outlined 2D cartoon rendering; laptop fills roughly 85–90% of the width; retain a little keyboard/desk; align curtain/wall/bookshelf background with the seated viewpoint; show two small CoffeeHeads and Machine Learning folders on muted sage wallpaper; open a large cream CoffeeHeads window with modest typography, overview, compact React/Spring Boot/PostgreSQL/Redis diagram, implementation notes, next steps and a labeled interface placeholder; omit desktop heading, ornamental wallpaper, album motifs and invented results. English text only.

This PNG is a concept reference under `concepts/`, not a production UI asset. It is not imported by the app. Final responsive layout, scrolling, inner-window navigation and close behavior, keyboard focus and music-control placement still require a concrete plan and owner approval before implementation. Preserve all existing music/mute/pause/saved-progress behavior, arrival gating, Escape, focus restoration and reduced motion. Generated foreground plants, stationery and exact dimensions are incidental, not approved changes to room composition.

## Current delivery

The application is a React 19 / Vite 8 illustrated-room portfolio configured for GitHub Pages from main. Publishing requires explicit owner approval for each update; see Publishing approval below. Keep code, comments, documentation and generated prompts in English, even when discussing changes in Chinese. Never discard unrelated work or force-push.

This handoff describes the current local implementation; PRD.md records product requirements. Deployment status is established by the matching GitHub Actions run and remote commit, rather than a speculative success statement in this document.

## Architecture and commands

- App.jsx owns content, Explore, focus, dialog sequencing, album spread state and fullscreen controls.
- useRoomRuntime starts and disposes the piano, cat and journey controllers. React StrictMode must retain only the existing two continuous animation clocks.
- controllers/journeys.js owns interruptible person movement, props, activity poses and arrival promises. controllers/piano.js owns recording/performance state. controllers/cats.js owns autonomous routes and coordinated meetings.
- components/Room.jsx composes independent scene modules over assets/rebuilt/v1/ready/bare-room.png. src/scene/README.md describes ownership, state and artwork sources. /?demo=modules provides enlarged coffee/window previews.
- src/scene/furnitureCatalog.js and sceneObjects.js share the 1672 x 941 world, module placement, artwork masks and furniture support anchors. src/data/catSurfaces.js derives resident destinations from those anchors.
- styles.css retains calibrated actor/depth geometry; scene.css and roomAnimations.css own module effects. Keep foreground passes as direct siblings of the person where CSS depth selectors require it.
- npm ci installs dependencies; npm run dev serves localhost; npm test runs Vitest; npm run build emits dist; npm run preview serves the production build. Use a Node version allowed by package.json; deployment uses Node 24.
- .github/workflows/deploy-pages.yml installs, tests, builds and publishes dist on pushes to main. Vite uses a relative base and emits only referenced production artwork. Do not deploy source files or the repository root as the site artifact.

## Interaction and popup rules

Eight content entries are implemented: piano/music, coffee, computer, notebook, photos, calendar/milestones, tennis and resident cats. Illustrated objects retain tight contour highlights and accessible native controls. All floating object-name labels have been removed, including At the piano and Rachel & me. Window/curtain controls are on the artwork; no floating state toolbar is allowed. Explore provides alternative access to all entries.

Normally, content opens only after Sili reaches the selected destination and completes its initial interaction. Coffee waits through preparation, computer and notebook wait for seating, album waits for pickup, and calendar/tennis wait for their arrival pose. Music content waits for piano arrival. New selections close old content, cancel obsolete journeys and suppress stale dialog promises. Repeated clicks on the same pending destination reuse its arrival promise. Escape cancels pending journeys. Programmatic dialog close events cannot cancel the next destination or restore obsolete focus.

During playing or an initial piano approach, other content opens immediately and Sili remains in the piano performance. An active initial piano approach also retains this browsing behavior; paused performances release Sili for physical interactions while retaining audio progress. The album opens without physical pickup in this mode. Compact music controls remain accessible in content. Direct cat greeting is a physical interaction and can interrupt the performance; browsing the resident introduction does not. Closing content never stops music.

The supplied One Summer's Day recording is the only track. On November 16, 2026, its asset was replaced byte-for-byte with the owner's revised M4A (136.04 seconds, stereo AAC at 44.1kHz), keeping the title and assets/music/one-summers-day.m4a path. Never autoplay on initial load. Start at arrival after visitor activation; show explicit playback fallback if blocked. The bottom-right icon-only music button toggles Mute/Unmute only and never starts playback or opens the piano dialog. The illustrated piano and its Explore destination own piano navigation. There is no separate Music list control. Playback actions are Mute/Unmute and Pause; paused playback offers Continue or Start over. Mute keeps audio advancing and character motion active; Pause preserves audio.currentTime and selects the resting hands-on-lap pose. Continue resumes audio at its saved position and restores motion; Start over resets the selected track to zero. Selecting another destination while paused detaches the character and saves progress. Returning to the piano walks Sili back but stays paused until a choice is made. Recording end releases performance. Hiding the page uses the same pause path and requires an explicit playback action. Internal stop remains for recording end, errors, cancelled travel and physical departures; it is not exposed as a control. Reject late play promises after stop/disposal.

## Modular scene and artwork

Independent modules own furniture, coffee equipment, window states, plants, lighting and residents. Use the freshly generated registry described above. Historical full-room pixels, repair plates and old silhouettes must never be restored to the live render path. Existing module placement and shared support anchors retain the 1672 × 941 world. Approximate style and composition are required; exact historical pixels are no longer required.

Window glass and curtains toggle independently. Open glass controls fabric breeze. Drawn curtains suppress sunlight. Cats cannot cross closed glass or drawn curtains, and controls reject closure during a crossing. Lamp and camera remain local controls. Reduced motion and tab inactivity suppress ambient animation.

## Character calibration

Eight person sheets and two cat atlases are decoded and retained. Use the current manifest for cell/grid sizes and frame counts. Registration normalizes alpha, foot baselines and seated hip anchors; do not restore historical scale repairs or desk foreground masks. Journey cancellation, arrival promises, held prop ownership and piano audio progress remain controller responsibilities.

## Cats and person interaction

Viola and Java are female, visually distinct and autonomous. Java remains indoors; Viola can leave and return through the visible window route. Both visit piano bench/top, coffee counter/table, bookcase, work desk/chair, sofa and window using shared support anchors, reservations and stepped hops. Occupied furniture clears safely for the person.

src/data/catBehavior.js sets roaming rates to Viola 0.5 and Java 0.7 relative to the previous baseline. Longer indoor rests reduce excursion frequency by 50% and 30%; walking/jumping speed, greeting responsiveness and outdoor waiting are not slowed.

Direct cat clicks greet in-scene, without opening a biography. Explore retains Viola & Java, Pet Viola and Play with Java. Stable interaction handles expose identity, live geometry, readiness, contact, cancellation and departure. Journeys approach the actual cat; never fall back to pointing at a fixed window while the cat is elsewhere. Low perches may stay; high perches descend through known steps. Repeated contact is bounded; play includes short playful hops. Finish airborne movement on cancellation and let Sili withdraw before roaming resumes. Escape releases a greeting naturally.

Native cat buttons follow their current positions; hidden outdoor Viola has no visible/tabbable target. The new cat frames have isolated silhouettes; do not restore the historical sleeping-cell crop. Ambient movement pauses for content/inactive pages, with safe clearance/meeting exceptions. Reduced motion uses still indoor poses. The manual Pause cats button was removed at the user's request.

## Album and content preservation

The physical photo album has four spreads/eight pages, charcoal card pages, warm brown leather edging, a narrow cloth-style hinge, enlarged white-bordered photos and four translucent photo corners per image. No visible page numbers or cream book-paper styling. It retains click/drag corners, arrow-key navigation, reduced-motion handling, accessible spread counter, discreet close and remembered fully revealed spread. Wall portrait opens spread one. Do not add a surrounding panel or toolbar.

Slots: festive couple, family-v2, first selected tennis illustration, seaside couple, Java, Viola, Sili bench pressing, Rachel hip-hop. Slots 2/7/8 are requested imagined illustrations, not documentary evidence. Do not invent personal dates/captions. Keep original wall portrait on the wall. Deleted later tennis variants must not return.

Small content windows use warm cream with readable opaque text; music mode places content to the right so the piano stays visible. Project descriptions, milestone dates, contact/profile destinations and resume publication require reviewed source facts. Source photos and academic reference PDFs are not automatically production assets. Current writing sources and revisions are recorded in the asset catalog.

## Validation and remaining work

The thirty-minute cat simulation has an explicit 30-second test timeout for slower CI runners, retaining every simulated step and assertion.

Current verification is recorded in the checkpoint above. Run git diff --check after document or code changes. Coverage includes arrival-gated dialogs, immediate uninterrupted piano browsing, stale/cancelled/repeated requests, album turns/pickup, music lifecycle, cat meetings/reservations, window access and scene state. The current browser checks include the computer/notebook split, window/curtain state, independent books, viewport geometry and the isolated prototype.

This does not establish exhaustive behavior on every machine. Remaining manual QA includes representative Safari/Chrome/mobile fullscreen and touch/drag, audible autoplay policies, all animated mask/depth combinations and final art approval. Optional manual navigation, browser-history/deep links, additional recordings and richer frame animation remain future work. Continue refining existing interactions before unrelated additions.

Keep tmp/, dependencies, build output and secrets ignored. Verify remote HEAD and the matching Pages workflow after publishing. The owner configured silispace.net as the custom domain on November 16, 2026; GitHub Pages remains the host. Preserve the existing domain configuration.

## Public profile controls

ContactLinks.jsx renders independent cream ceramic-style GitHub and LinkedIn square tiles with inline SVG logos, highlights, dimensional shadows, hover lift and press feedback. Profile destinations are owner-approved. No public email address, envelope button or contact card is exposed. assets/room-architecture-v3.png removes the three original painted contact icons with continuous beam artwork; no neighboring-texture patch remains. It fills the existing 1672 x 941 scene coordinates from its generated 1670 x 941 source. Narrow layouts retain 44px tiles, and reduced motion removes hover/press transforms. Résumé publication remains pending.

## Piano controls and saved progress

- The bottom-right note is an icon-only Mute/Unmute control. Its slash reflects muted state, and its accessible label names the next action. It never starts playback, moves Sili or opens a dialog. The illustrated piano and Explore's piano destination start the piano interaction and open its content.
- The separate icon-only Pause/Play button appears beside mute only when Sili is at the piano in playing/paused state. Pause stops sound and selects the resting hands-on-lap pose while retaining currentTime; Play continues from that position. It is absent before arrival, after departure and at recording end. Compact content controls retain mute and pause/continue/restart; there is no Music list button or Stop control.
- App renders these corner controls within the current dialog while it is open, keeping them reachable in the browser's modal top layer. Album backdrop dismissal excludes their wrapper. Outside content, they render in the app.
- During piano.state=walking, show only “Settling in for a little music…” above the music controls. It fades on arrival/cancellation, ignores pointer events and honors reduced motion. No hover warning, volume ramp or extra confirmation is implemented.
- Paused progress is independent of character location. Selecting coffee, notebook, album or a cat after Pause releases Sili for the normal physical interaction. The controller's saved state retains audio position and mute preference. Returning walks him to the piano, stays silent and offers Continue / Start over. Cancelling the return preserves saved progress. End/error clears it.

## Resident occlusion

journeys.js publishes the person's grounded depthY during movement and piano arrival. cats.js compares it with each cat's supported foot position: rear cats use layer 1 and precede Sili in DOM order; nearer cats use layer 3 above the calibrated layer 2 furniture foreground passes. Both Viola and Java use this logic. A counter cat must stay behind Sili walking from the center to the piano, while a nearer floor cat can remain in front.

Hop sorting interpolates between support endpoints without the visual jump arc. Java's small play hops keep their anchor depth. Depth refreshes on the existing cat clock even when a cat is resting, delayed or paused for reading. Reduced-motion resets clear the stored sort position. Preserve cat-before-person ordering in Residents and foreground passes as direct stage siblings.

Regression coverage includes the reported counter crossing and all 12 elevated stops: coffee counter, piano bench/keys/top, bookshelf step/top, desk, chair, stool, window, sofa and coffee table. The paused-cat check also verifies depth changes while the person moves. This is targeted validation, not proof of every possible overlap.

## Walking and foreground ownership

Movement remains 14 world-percent units/second with six distance-driven phases and a 12-unit gait cycle. Mirror the outer walking surface and retain grounded registration. No extra animation clock is introduced.

The new desk, bench and table have complete transparent pictures. Their foreground passes remain direct siblings of Sili. Do not reuse historical chair masks, floor-colored repair patches or old silhouette clips. The obsolete desk foreground repair pass is removed; only the registered chair backrest/near-post depth pass remains in front while seated. The single station mug hides while held; the separate loose pen hides during writing.

Historical cutout exports and source atlases remain preserved for provenance, but are excluded from publication.

## Publishing approval

Complete local work and validation before presenting a publishing result for approval. Each portfolio GitHub push or production deployment requires explicit owner approval. Updating the already-authorized independent review Site is within the current review scope. Verify remote HEAD, the matching Pages workflow and live-site behavior before reporting deployment success. Historical approval for earlier releases does not authorize another release.

## Writing pen ownership

The physical notebook and pen are independently generated assets. The loose pen is hidden while the writing pose holds a pen. Desk and foreground pictures contain neither baked notebook nor pen pixels.

## Selected album artwork

The owner selected album-bench-press-v2.png: Sili in the dark navy shirt and loose light-gray wide-leg trousers on a black commercial bench/rack, with the bench pointing toward the lower left and aligned with the reference gym. Do not substitute the fitted-trouser, light-blue-shirt or white-shirt alternatives. Page 8 uses album-hip-hop-v2.png, the approved perspective-corrected Rachel illustration in the reference mirrored studio. Both are built-in imagegen artwork derived from owner-supplied location references, not documentary photographs. Page configuration and alt text are updated; the original v1 assets remain intact. Prompt provenance is in assets/album-location-prompts.md.

## Charcoal photo album implementation

PhotoAlbum.jsx and styles.css replace the former cream book presentation with a 1.94:1 open album: warm brown leather cover/stitched edging, charcoal mounting cards, a narrow hinge with small binding details and substantially larger square photos. Thin white borders and four clear corner protectors give each image a mounted-print appearance. Visible page-number markup is removed; article labels and the live screen-reader spread counter remain. Discreet chevrons replace curled paper cues.

The turning card rotates on Y only, with subdued shading, a 540ms transition and 560ms completion timer. Preserve the same photo padding and tilt on base/turning faces so the image does not jump when a turn completes. Existing pointer cancellation, boundaries, reduced motion and saved spread behavior remain unchanged. Desktop and 390px-wide browser review confirmed image framing, forward/back turns and keyboard navigation.
