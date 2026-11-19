# Photo-guided seated lower-body study

Owner supplied two rear-view seated photographs after rejecting v35–37. These images guide anatomy/perspective only. The generated candidates retain the character's tan trousers, cream sneakers and warm cartoon outlines. The reference photographs are not included in the website or copied into this source library.

`computer-photo-v1` uses the first, smaller rear-view reference; `writing-photo-v1` uses the second rear three-quarter reference. Each is a complete independent transparent lower-body image, not a screenshot cutout. Sources, exact prompts, original generation locations, source/ready SHA256, reference paths, transparent crops and registration are recorded in `catalog.json`.

Run `node scripts/prepare-seated-study.mjs` to trim only exterior transparency and generate ready PNGs plus `src/scene/assets/seatedStudy.js`. The base seated registration maps the hip to room (1345,775), with a reference sole at y935. Following owner feedback that both poses were oversized, the selected displayScale is now .78 about the same hip anchor (sole around y900). Character-relative scale takes precedence over forcing the foot to y935. Scaling remains uniform; anatomy is not warped. `node scripts/check-seated-study.mjs` verifies hashes, alpha, dimensions and registration; it is included in `npm run assets:check`.

`DeskSeatedBody.jsx` renders the registered images beneath the retained upper-body rasters. Only waist overlap is clipped; the actual desk apron and wooden chair structure handle foreground occlusion. This is a v38 review candidate, not an approved final pose. The rejected v37 vector implementation remains in `archive/DeskSeatedBody-v37.jsx` for recovery and is not used by the app.

## Coffee-style variants (v41 review)

`material-catalog.json` records four imagegen material edits using the coffee character as palette/line/shadow reference. `prepare-seated-materials.mjs` retains source registration (upper576px canvases; lower uniform alignment into the existing crop). `check-seated-materials.mjs` checks sources/ready hashes, alpha and silhouette overlap. `Residents` preloads and selects upper-only art through `seatedMaterials.js`; no old trouser pixels remain, so complete hems can render without the historical knee clip. Original actor sources and lower-photo candidates are kept unchanged.

The selected displayScale is now .65 about hip(1360,785), roughly17% smaller than v39–40. Source normalization still uses the same photo anatomy; actual selected sole is aroundy889, with chair wooden rails in front. Do not re-enlarge to hit the initial floor reference. This supersedes the .78 description above. All variants remain review candidates.
