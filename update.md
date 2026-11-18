# Animation and Scene Architecture Update Proposal

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

Research date: November 16, 2026

Status: prototype implementation authorized and started on `refactor/scene-runtime`; complete renderer migration remains subject to parity and measured-benefit checks. See [runtime experiment](docs/runtime-refactor.md) for current implementation and verification boundaries.

## Objective and decision

Rebuild the underlying animation architecture where doing so improves the result. Preserving the existing implementation is not a requirement. Preserving the illustrated appearance, composition, character identity, and approved interaction effects is a requirement.

Chrome, Safari and Firefox are required, with complete phone adaptation. Preserve the full room framing, interaction access, dialogs, music controls and reduced-motion behavior on desktop and phone. Measure performance on representative hardware; browser emulation is a functional check, not a real-phone performance claim.

Retain **PixiJS + XState + React + Motion + TypeScript** as the recommended candidate architecture. There is sufficient official documentation, example code, integration support, and evidence of practical use to justify a prototype. This is an engineering recommendation for this project, not a prescribed stack from the web-animation skill and not a claim that these libraries automatically improve performance.

The first deliverable should be a representative scene prototype. Commit to the complete renderer migration only after that prototype demonstrates desktop visual fidelity, reliable interactions, and desktop performance, with a separate mobile usability check.

The owner authorized the PixiJS + XState + TypeScript prototype and dependency installation, preserving current visuals and behavior with minor rendering pixel differences allowed. Chrome, Safari, Firefox and full phone adaptation are required. PixiJS, XState, TypeScript and Playwright are now installed with exact versions in the lockfile. Motion is deferred until needed. Production renderer replacement has not occurred; pushing and deployment still require explicit approval.

## Evidence of ecosystem maturity

The assessment below distinguishes documented capabilities, published examples, and project-specific conclusions. Vendor showcases demonstrate practical adoption but are not independent performance benchmarks. This research does not establish the exact combined stack as a standard portfolio template.

| Component | Documentation and practical evidence | Conclusion for this project |
| --- | --- | --- |
| PixiJS | Versioned guides cover rendering, scene graphs, events, assets, accessibility, and performance. Its official showcase lists games, tools, and interactive websites, including Google Research's Semantris and Cartoon Network projects. | Sufficient depth for an illustrated interactive room. Showcase entries do not prove their current versions or results match our desktop scene. [Guides](https://pixijs.com/8.x/guides/getting-started/ecosystem), [showcase](https://pixijs.com/showcase/ShowcasePage/) |
| PixiJS and React | The official ecosystem documents React integration and states that the current integration requires React 19 or higher. This repository already uses React 19. | An established integration path exists; independently validate compatible package versions before installation. A React wrapper remains optional. [Ecosystem](https://pixijs.com/8.x/guides/getting-started/ecosystem) |
| XState | Official stable-v5 documentation covers JavaScript/TypeScript state machines and actors. The React package has hooks, templates, and repository examples. Stately publishes implementation case studies for organizations including WebinarGeek, Fugo, and Koordinates. | Enough reference material for coordination, cancellation, and lifecycle management. The published business cases support maturity, not the correctness of our character model. [XState](https://stately.ai/docs/xstate/v5), [React integration](https://stately.ai/docs/xstate/v5/xstate-react), [case-study index](https://stately.ai/blog) |
| Motion | Official documentation covers React animation, gestures, layout, and motion values. Its example library includes dialogs, navigation, galleries, and interactions. Some examples require Motion+, so their availability must not be mistaken for a free implementation dependency. | A strong fit for the HTML interface and album gestures, without routing every frame through React state. [Motion values](https://motion.dev/docs/react-motion-value), [examples](https://motion.dev/examples) |
| Sprite and texture pipeline | PixiJS documents sprite batching and texture tradeoffs; its ecosystem includes AssetPack and animation integrations. | Transparent layers and atlases are established techniques. Our extraction, registration, and packing choices still need visual and memory validation. [Performance](https://pixijs.com/8.x/guides/concepts/performance-tips), [ecosystem](https://pixijs.com/8.x/guides/getting-started/ecosystem) |

Use stable releases with a committed lockfile. XState's documentation currently identifies v5 as stable; do not adopt a newer beta simply because it is newer. Target PixiJS v8 documentation for the prototype and avoid mixing old tutorial APIs with current code. Confirm Motion and any React binding against React 19 at implementation time.

## Current implementation and why a different architecture is worth testing

The application uses React 19 and Vite. PixiJS 8 and XState 5 are installed for the isolated runtime prototype; the main room still uses DOM/SVG rendering and the existing behavior controllers. CSS handles ambient loops and transitions. Custom requestAnimationFrame controllers handle journeys and cats. Character poses use raster sprite sheets. The room uses complete freshly generated transparent objects registered through SVG wrappers. The earlier pixel-extraction pipeline is historical. The renderer/behavior migration remains experimental. The album combines pointer events, React state, CSS 3D transforms, and timers.

Existing strengths include furniture registries, calibrated support points, interruptible journeys, cat interaction handles, lifecycle cleanup, reduced-motion handling, focus restoration, and character-sheet predecoding. Preserve the knowledge encoded in these systems even when replacing their implementation.

Structural issues worth addressing:

- Character behavior, action sequencing, rendering, and DOM state are coupled in the controllers.
- DOM classes and data attributes act as a communication layer between independent systems.
- Person and cat updates run through separate clocks, with depth derived from DOM-published state.
- Movement updates positional and size properties that may incur layout work.
- The regenerated registry supplies world bounds, ownership, alpha-derived hit contours and actor registration. The remaining migration should consume this registry.
- Album completion depends on manually coordinated timers and transition durations.

These are reasons to prototype a clearer design. They are not proof that the current site drops frames. No browser performance trace was collected during this proposal's research.

## Target architecture and ownership

```text
HTML / React interface
  content, navigation, dialogs, album, accessible controls
              | semantic commands and selected snapshots
XState behavior actors + typed scene model
  person, cats, reservations, activities, audio coordination
              | animation commands and completion events
PixiJS room runtime
  sprites, transforms, hit testing, occlusion, ambient effects
              |
Versioned asset manifest and authored scene data
```

### Rendering: PixiJS

Use PixiJS for the illustrated room: architecture, furniture, person, cats, local effects, and visual hit areas. Containers give each object a local coordinate system and group related artwork. Rendering order is explicit rather than inferred from CSS sibling selectors. [Scene graph documentation](https://pixijs.com/8.x/guides/concepts/scene-graph)

Keep a single application-owned scene update loop. A recommended order is: consume commands, advance movement and action clips, resolve interactions, update supported depth and occlusion, apply visual transforms, then render. Emit completion events when actions actually complete. PixiJS's ticker supports ordered callbacks and lifecycle control. [Ticker documentation](https://pixijs.com/8.x/guides/components/ticker)

Prefer direct PixiJS ownership behind a React host for the initial prototype. Evaluate the official React integration if it makes object composition clearer. In either approach, avoid React state updates for every sprite frame and avoid two systems writing the same transform.

Start with a widely supported rendering backend and test the supported devices. Do not make WebGPU, workers, custom shaders, or a physics engine prerequisites. Renderer selection should follow compatibility and measurements.

### Behavior: XState and typed models

Use state machines for discrete behavior and coordination, not numerical interpolation at display frequency. Keep positions and animation progress in the scene runtime; report meaningful events such as arrival, landing, contact readiness, and action completion to the actors.

Suggested responsibilities:

- Person actor: destination intent, leaving an activity, approaching, performing, and interruption.
- Cat actors: resting, roaming, approaching a perch, jumping, meeting, contact, and departure.
- Reservation coordinator: furniture ownership, evacuation, window access, and release on cancellation.
- Audio service/actor: loading, play attempts, blocked playback, pause, saved progress, end, and errors.
- Scene lifecycle: visibility and reduced-motion policy, loading, ready, and recovery states.

Use typed commands with stable identities and cancellation tokens. A replacement destination must invalidate stale arrival events. Active jumps may land before cancellation finishes. Resource release must be idempotent. Use explicit scene state rather than querying rendered pixels or DOM selectors to decide whether a cat occupies the window.

Keep small interface state, such as whether a menu is open, local to React unless cross-system coordination is actually needed. TypeScript should clarify event, asset, coordinate, and actor contracts rather than require rewriting every content file at once.

### Interface: React, HTML, and Motion

Keep readable content, links, buttons, dialogs, album pages, and audio controls in HTML. Use Motion for selected transitions and gesture values; use CSS for simple feedback. Do not move portfolio text into the canvas.

Retain native focus management, Escape handling, semantic controls, selection, and scrolling. A Motion exit animation must not accidentally remove a modal's focus protection before the visual exit completes.

If album work is separately authorized, retain its approved charcoal mounting cards, warm brown leather cover, photographs, and CSS 3D page geometry. The album is currently out of scope; the gesture changes below are future proposals. Separate pointer tracking, release decisions, settlement, and committed page state. Consider distance and velocity, allow reversal during settlement, and derive completion from the animation lifecycle. Preserve keyboard navigation, bounds, pointer cancellation, and reduced-motion behavior.

Do not install GSAP alongside Motion by default. Reconsider it only if a demonstrated sequencing requirement cannot be expressed cleanly through the scene action system and existing tools.

## Visual and asset contract

Use the current 1672 × 941 room space as the canonical authoring coordinate system. Define one viewport-to-world transform for canvas rendering, pointer mapping, and any HTML hotspots. Preserve current letterboxing and mobile framing unless separately approved.

Record each renderable asset's source, crop bounds, pivot, local offset, scale, attachment points, hit contour, and depth role. Distinguish supported ground depth from jump height: a jumping cat's vertical arc must not accidentally change its floor ordering.

Simple Y-sorting is insufficient for the whole room. Furniture needs explicit rear and foreground pieces, with activity-specific occluders for seated desk poses, album pickup, and piano interactions. Validate contact points for hands, feet, cups, books, chairs, and perches.

The owner explicitly superseded extraction: regenerate every physical object from scratch, preserving approximate appearance and complete hidden geometry. Preserve raw generated outputs and prompts. Normalize only new-image alpha, size and registration; never use old-room pixels or old contours to make the replacements. Keep each book and ornament independent, plants whole, and background architecture bare.

Introduce texture atlases after a faithful initial scene exists. Preserve trimmed-frame offsets and pivots, add edge extrusion to prevent atlas bleeding, and test filtering at actual display scales. Keep distinct bundles for room essentials, character activities, album photography, and audio rather than one oversized atlas.

Compare formats using real output: lossless assets may be preferable for fine illustrated edges; lossy alternatives need approval through visual comparison. Network compression does not imply lower decoded GPU memory. Budget atlas dimensions, device pixel ratio, and texture residency independently.

More natural character movement may require additional authored frames or skeletal assets. Rendering libraries cannot invent missing poses. Consider Spine or Rive only as a separate art-production decision, with runtime and licensing evaluation, rather than a prerequisite for preserving the current look.

## Interaction and accessibility contract

Preserve current behavior during renderer parity work: physical journeys, cat meetings, safe window access, props, music while browsing, and explicit resume after backgrounding. Do not silently change when content opens.

Treat immediate Explore content, shorter choreography, and revised album gestures as separately reviewable experience improvements. They can follow parity, with clear before/after comparisons.

Canvas content is not automatically accessible. PixiJS provides an accessibility overlay, but it still requires configuration and testing. Prefer explicitly owned semantic HTML controls where they provide predictable names, focus rings, and focus restoration. Ensure the canvas and overlay do not create duplicate tab stops or duplicate actions. [Accessibility documentation](https://pixijs.com/8.x/guides/components/accessibility)

Maintain one reduced-motion policy shared across the scene and UI. Resolve finite actions into coherent final states, preserve content and feedback, and stop decorative movement. Stop scene advancement while hidden without catch-up bursts on return. Keep visual pause policy separate from audio resume policy.

## Performance and lifecycle requirements

Measure rather than assume that canvas is faster than the existing implementation. The relevant comparison includes loading time, frame-time distribution, input response, decoded texture memory, idle activity, and repeated-session resource growth.

Use one owned scene clock, time-based movement, bounded delta handling, and a deliberate idle strategy. Avoid running heavy rendering continuously when nothing visible changes. Scene interpolation and UI animation can use their own appropriate schedulers, but must never compete to own the same property.

Minimize large masks, filters, and unnecessary render targets. Do not assume GPU acceleration eliminates rendering cost. Pause and release resources deliberately, including tick callbacks, listeners, actors, pointer capture, audio, and textures. Test React StrictMode mount/unmount and asynchronous asset completion after disposal.

Provide a usable HTML content route if the scene cannot initialize. Choose context-loss recovery and retry behavior during the prototype; avoid a blank page or a nonfunctional loading screen.

## Prototype and migration plan

### Phase 0: establish the baseline

Capture the actual current application, including any uncommitted work; do not assume older README descriptions are authoritative. Inventory all active artwork and retain the existing code as a comparison implementation during migration.

Record stills and short clips for idle room, walking, each major activity, cat jumps, meetings, foreground crossings, window/curtain combinations, lamp, music states, and album. Capture the primary desktop viewport sizes first, followed by mobile portrait and landscape adaptation checks. Record performance traces on named desktop reference machines with browser versions and cache/network conditions; investigate phone performance when adaptation reveals a usability problem.

### Phase 1: representative vertical slice

Build a development-only prototype containing the real background, one foreground furniture group, the person walking, and one cat jumping onto furniture. Include crossing depth, a matching accessible HTML control, resize, reduced motion, pause/resume, cancellation, and teardown. Include a minimal XState interaction so the coordination boundary is exercised.

Compare direct PixiJS ownership and a React binding only if necessary. Record the decision. Keep the production renderer unchanged while this experiment runs.

### Phase 2: migration gate

Proceed only if the slice preserves appearance and interaction reliability while showing a meaningful engineering or measured runtime benefit. A larger initial bundle may be acceptable if justified by the result; a large desktop startup or runtime regression is not acceptable by default. Mobile adaptation must remain stable and usable, but desktop and phone rendering budgets need not be identical.

If desktop parity or desktop runtime behavior is unsatisfactory, retain the typed scene model and behavior separation while improving the existing DOM/SVG renderer. This fallback preserves the architectural benefits without forcing an unsuitable rendering backend. If only mobile adaptation is unsatisfactory, first evaluate resolution caps, fewer decorative effects, or a simpler mobile presentation while retaining content and interaction access.

### Phase 3: migrate complete activities

Move one complete activity at a time: its renderables, actions, reservations, props, cleanup, and accessible controls. Avoid production states where the old and new systems independently control the same actor. Port the remaining room and cat behaviors, then remove the superseded runtime after parity review.

### Phase 4: interface polish and delivery

Polish authorized UI transitions, tune assets and lazy loading, run the complete regression matrix, and document the architecture. Upgrade album interruption only if the owner separately authorizes album changes. Keep production deployment a separate action from implementation review.

## Acceptance and verification

The following are proposed acceptance criteria, not achieved results:

| Area | Required evidence |
| --- | --- |
| Visual parity | Matched viewport screenshots and clips with deterministic pose/time controls; review color, edge halos, crop seams, scale, foot registration, and occlusion. Agree image-diff tolerances after measuring browser antialiasing differences. |
| Behavior | Repeated destination changes, same-object clicks, cat replacement, cancellation during jumps/contact, window blocking, props returned exactly once, and stale events ignored. |
| Mobile adaptation | Check readable content, reachable controls, touch mapping, portrait/landscape layout, safe areas, and foreground/background behavior on iOS Safari and Android Chrome. Lower render resolution or decorative detail where needed. Desktop-equivalent frame rate and effect density are not acceptance requirements. |
| Desktop performance | Aim for sustained 60fps during representative activity on agreed desktop reference hardware; compare frame-time percentiles, long frames, mouse/keyboard response, cold startup, and idle cost against baseline. Check higher-refresh displays for time-consistent motion. Publish measurements before claiming improvement. |
| Accessibility | Keyboard access, visible focus, native dialog behavior, focus return, screen-reader names, content access without the canvas, and runtime reduced-motion changes. |
| Reliability | Actor/unit tests for transitions and resource ownership; browser tests for native input, rendering, focus, audio restrictions, and repeated initialization. No growth in owned listeners or scene resources across repeated cycles. |

Use seeded randomness and a controllable simulation clock in visual tests so autonomous cats do not invalidate comparisons. Retain current regression intent, while replacing tests that depend on removed DOM implementation details. Passing jsdom tests alone does not validate WebGL rendering, mobile behavior, or actual audio playback.

## Suggested module boundaries

```text
src/
  scene/
    model/        # IDs, world coordinates, supports, hit areas, asset metadata
    runtime/      # clock, commands, lifecycle, viewport transform
    rendering/    # Pixi application, sprites, layers, occlusion, effects
    actors/       # person, cats, activities, reservations, audio coordination
    assets/       # generated manifests and loading policy
  ui/
    navigation/   # React controls and scene command bridge
    dialogs/      # content and focus ownership
    album/        # page state, gestures, settlement, accessible controls
  test/
    behavior/
    browser/
    visual/
```

These are responsibility boundaries, not a requirement to create every directory immediately. Author activities as typed data where useful; avoid constructing a general-purpose game engine for one room.

## Remaining decisions

- Exact stable dependency versions and whether to use a PixiJS React wrapper.
- Primary desktop reference hardware, desktop browser support, and measured desktop performance budgets; secondary mobile adaptation targets and any reduced-quality presentation.
- Extraction is resolved: use complete freshly generated standalone artwork; historical cutouts are obsolete.
- DOM hotspot implementation and context-loss/content fallback.
- Final atlas grouping, texture formats, and resolution caps.
- Whether the owner wants changes to content-opening behavior after parity.
- Whether smoother character motion warrants additional artwork production.

The recommendation is retained because the component technologies are sufficiently documented and practiced. The remaining uncertainty is their measured fit to this particular artwork, interaction model, and device target. Resolve that uncertainty with the vertical slice before committing to a full rewrite.
