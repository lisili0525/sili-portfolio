# Production release — November 19, 2026

Owner explicitly authorized publishing the current local D-only version to the formal website.

- Previous live source: `55bcb3d8702ce2565e0189aaaa5798b4baa669f7`.
- Successful prior Pages run: `44240217667`; deployment `7874541347` (success, https://silispace.net/).
- Rollback tag for this publication: `rollback/production-before-seated-d-2026-11-19`.
- Scope: current review v44 behavior, fixed D rendering with no A/B controls; smaller photo-guided seated legs, independent matte upper/lower materials, corrected waist and real chair/desk occlusion, corrected window handedness, calibrated racket pose. All historical assets/prompts retained. Existing interaction, animation and audio behavior preserved.
- Validation: registered asset and silhouette checks, typecheck, 65 unit tests and production build; latest browser checks6/6 and compiled preview4/4. Updated the independent-asset directory assertion to include D's existing style-study assets now always rendered.
- This document belongs to the release source commit. Deployment result will be recorded after GitHub Pages finishes.

---

# Production release — November 17, 2026

The owner authorized recording the current live Git version and pushing the local work to update the production website in this session.

## Saved production version

- Website: https://silispace.net/
- Commit: `8c997a3fdc280fe7be178b28e56ad6b4a79a8875`
- Git tag: `rollback/production-before-scene-runtime-2026-11-17`
- Successful GitHub Pages run: https://github.com/lisili0525/sili-portfolio/actions/runs/44020398756
- GitHub Pages deployment ID: `7844564036`
- Remote main and successful Pages deployment both pointed to the above commit before release.

## New release scope

The existing local scene work, independent transparent artwork and preserved revisions, merged workstation and typing/writing animation, tucked typing legs, illustration material refinements, calendar/garden/window light, corrected interactions/audio, and 600ms activation highlights. Production now uses the current painted room by default, including its nineteen selected material assets and daylight; review-only A/B/D controls remain hidden. Preview retains its comparison behavior. Raw authoring sources are kept in Git but excluded from the public website build.

## Rollback

Use the saved tag as the known-good previous production source. To roll back the website without rewriting Git history, create a release commit restoring the tracked application tree from this tag, validate/build it, and push that commit to main. Alternatively, run the existing Pages workflow on this tag to redeploy that exact source. A rollback is a separate future publication action; no force push is required.

The production release commit is the commit introducing this document; the actual Pages result is recorded in the release report after deployment.
