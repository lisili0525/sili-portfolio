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
