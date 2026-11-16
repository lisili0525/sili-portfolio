# Sili's Little House — Project Handoff

Updated: November 16, 2026 (Asia/Shanghai)
Workspace: C:\Users\lslhw\Sili Website
Repository: https://github.com/lisili0525/sili-portfolio — verified private through authenticated GitHub API on November 16, 2026; keep private.

## Current state

Buildless HTML/CSS/JavaScript illustrated-room portfolio. Open index.html locally; no installation or build is required. No public deployment has been requested or performed. The user has now requested updating this handoff/PRD and committing/pushing all project changes to the existing repository. This snapshot accompanies that synchronization; inspect Git status and log for the actual commit/push state. The previous committed base was 7fd83dd. Never reset or discard uncommitted work.

This document describes the current implementation, replacing accumulated historical notes. PRD.md contains current requirements and separately identifies future scope. README.md explains local use. Original artwork and earlier asset versions are retained unless the user specifically requested deletion.

## Preserve these decisions

- The approved warm cartoon room fills a non-scrolling viewport, with no outer header, introduction, frame or footer. Only content windows scroll. Base: assets/room-clean-v4.png, 1671 × 941, rendered on a 1672 × 941 stage. Do not replace the room wholesale.
- Preserve enlarged piano/bench and Sili's base apparent head width of about 197.5 room pixels. Foreground album approach deliberately enlarges him by up to 18%, without distorting proportions.
- The original couple portrait stays only on the wall. The calendar and its landscape illustration remain. The coffee cabinet is farther right; the diagonal open album stays naturally placed beside the foreground table plant.
- Active workstation assets: assets/sili-computer-v3.png and the approved assets/sili-writing-v2.png. Writing must remain unchanged; SHA-256: 14f250c62b13b4a95745eefb276dbb5dad67f4f660608fe9d92449cd2822a90d.
- Small content windows now have 92% opaque warm-cream backgrounds and opaque text. The physical flipping album is excluded. Desktop windows move to the right during music so the piano stays visible.
- Cats remain autonomous with separated random foreground starts. Clicking a cat opens content; it does not steer the animal.
- Keep GitHub private. User source photos and academic reference PDFs are not production assets and must not be automatically copied/uploaded. Only requested generated illustrations and the supplied music file were added.

## Interaction and music modes

Seven content entries: music, coffee, notebook, photos, milestones, tennis and cats. Explore reaches cropped objects. Native buttons support keyboard activation. Delegated navigation must remain closest('button[data-entry]'); do not broaden it to arbitrary data-entry ancestors, because the dialog itself uses that attribute for presentation and would reopen after closing.

Without an active recording performance, object selections run interruptible journeys and poses. Coffee brews, leans and sips; desk alternates computer/writing with pauses; album approaches, reaches, lifts, opens and returns on close. Calendar/tennis/cats use destination poses. Closing coffee/desk content leaves the activity running. New selections cancel stale arrivals and album-opening promises. Escape cancels pending pickup. Hidden-page journeys freeze; reduced motion skips finite travel/cleanup and uses still poses.

During an active recording performance, browsing opens any content without moving Sili away from the piano. He keeps animated playing hands; reduced motion retains a still seated pose. Album opens directly without pickup or room-book removal. Music-list, mute and stop controls remain available inside other content and the album. Stop, recording end or media error releases this mode so subsequent object selections run normal activities again. Muting retains performance mode. Inactivity pauses audio and requires explicit resume.

piano.js exposes keepsPiano for actions.js. It holds the recording performance during approach, playing and inactivity pause, including autoplay fallback and mute. Opening the music list during approach must not cancel the walk. Audio begins only after arrival, following visitor activation; if blocked, a Play recording button is shown. No audio on initial page load. Track selection restarts the piece, closing content leaves it playing, and recording end does not loop. Late play promises cannot restart sound after stop/departure.

Current recording collection: pianoRecordings in piano.js, with only One Summer’s Day. assets/music/one-summers-day.m4a is the supplied file copied unchanged: 1,991,438 bytes, AAC-LC/mp4a, stereo 44.1kHz, about 137.35 seconds. Original remains in Downloads. Mute preference is stored for the session. The earlier three listening/playing interests remain background content in the PRD, not extra playable tracks.

Explore closes with Escape (focus returns to its toggle), outside clicks, or focus leaving it. Dialog close/Escape/outside dismissal return focus. Album controls and compact music controls must not trigger outside dismissal. Native browser behavior still needs live QA.

## Album: authoritative contents and depth

Four spreads/eight pages, all filled. No surrounding panel, heading or page toolbar. Keep cover thickness, binding, paper, photo mounts, outer page numbers and discreet close. Click/drag lower corners or use arrow keys; a partial turn can finish or return. Closing mid-turn remembers the last fully revealed spread. Wall portrait opens the first spread.

| Slot | Active image | Content |
| --- | --- | --- |
| 1 | assets/album-festive-v1.png | Supplied festive couple photo as cartoon |
| 2 | assets/album-family-v2.png | Rachel holding orange Java; Sili holding tuxedo Viola |
| 3 | assets/album-tennis-v1.png | First generated tennis cartoon, explicitly selected by user |
| 4 | assets/album-pier-v1.png | Supplied seaside couple photo as cartoon |
| 5 | assets/album-java-v1.png | Orange tabby belly-up with hanger |
| 6 | assets/album-viola-v1.png | Tuxedo cat beside tennis ball |
| 7 | assets/album-bench-press-v1.png | Requested Sili bench-press illustration |
| 8 | assets/album-hip-hop-v1.png | Requested Rachel hip-hop illustration |

Slots 2, 7 and 8 are original requested cartoon scenes, not documentary photographs of specific events. No dates or personal captions were invented. Prompts/provenance: assets/album-prompts.md. Full square artwork fits using contain. The original wall-portrait crop is absent from the album. Later tennis v2/v3 project images were deleted at the user's request; do not restore them. Family v1 is preserved history; active v2 shortens Sili's supporting upper arm, raises/defines its elbow and rebalances the hand. User visual approval of that correction is pending.

Normal pickup anchor: 53 / 96 via 53 / 84 (room percent). Perspective grows along the central lane, capped at 1.18× at y94, with feet anchored using scaled source padding. The actual tabletop silhouette, not a broad rug/floor patch, hides shoes/lower legs. The empty-table patch removes the decorative room book while held and restores it afterward. Leaving the foreground reverses scale. Desk positioning is outside the perspective lane; piano arrival clears inline height before using its calibrated CSS.

## Workstation and room calibration

Separate 576 × 576 transparent desk pictures. Both use a measured 207px head region and hip registration around source 288 / 460; frame height is 58.4% of room height. Desk anchor: 81.4593 / 90.1027 via 69 / 84. World seated hip contact: 1362 / 762. Do not shrink seated Sili to fit furniture or restore obsolete shared desk sheets/left-facing computer legs.

The separate chair is pulled slightly away from the desk: world left/top 1238 / 629, height 311px. Layering: unchanged base, localized assets/room-desk-chair-clear-v1.png patch, transparent assets/desk-chair-v1.png rear, Sili, then desk apron/leg overlap and chair front. Use assets/desk-front-mask-v1.svg with per-pose leg restrictions; avoid torso/arm clipping. Chair alpha gaps must stay genuinely transparent, not copied floor pixels.

assets/desk-chair-depth-v2.svg has an internal luminance mask that produces actual transparency. It is also embedded in styles.css for local-file support: update source SVG and both CSS data URLs together. Contact-opening lower/right points include 435.695,316.000 / 336.227,344.360 / 208.338,344.360, tightened to hide the seat-contact leg sliver. Latest chair/computer composition and seam correction still need user approval; writing posture is approved.

Standing/walking: assets/sili-poses-v1.png, four 543 × 724 cells, height 58%; one stride and restrained bob, not a full gait. Piano seated: assets/sili-piano-v4.png, six 512px cells; idle plus five hand poses. Height 51.91%, left 13.2%, bottom 15.46%. Keep assets/piano-bench-mask.svg and its embedded CSS aligned. Do not restore older seated calibration.

## Coffee and cats

Active coffee atlas: assets/sili-coffee-v3.png, four 576px cells (2304 × 576): brew A/B, lean and sip. The rejected twisted-head cup-placement frame is physically absent. CSS uses 400% sizing and 33.3333333333% frame steps; controller restricts indices to 0–3. Departure briefly uses rear frame 0 for 0.4s and restores assets/station-cup-v1.png before walking. Do not restore the rejected cell. Leaning sips recur after roughly 12–24 seconds. These are key poses, not fluid hand animation.

Viola and Java are female. Each has a separate 2172 × 362 six-pose atlas. Viola is quiet/brave, with occasional floor → stool → sill → visible window departure/return. Java is playful indoors and sometimes watches from the window; she does not follow outdoors. Foreground time in controlled simulations is roughly 80–85% Viola / 87–88% Java. Manual pause remembers session preference; content dialogs and page inactivity suspend cats; reduced motion uses indoor still poses.

Each .cat is a native button carrying data-entry=cats and its identity. The former fixed window hotspot is removed; Explore still reaches resident content. Button positions follow cats.js; hidden Viola has no visible/tabbable target. Full-room cat layers remain pointer-transparent. Without music, Sili approaches the clicked floor cat or looks up near the stool for a perched cat. Cats are never repositioned by clicks.

Sleeping sprites keep clip-path: inset(0 9% 0 0), excluding the adjacent hopping paw before mirroring. At alpha > 8/255, body ends are Viola 296 / Java 292 and stray paw starts 338 / 337; crop starts 329.42 in the 362px cell. Static original/mirrored previews retain bodies and tails. PNGs and other poses remain unchanged.

## Verification and next work

Controlled suites: checks/album.cjs, piano.cjs, recordings.cjs, actions.cjs, cats.cjs and dialogs.cjs. They cover page turns, interruption, cup cleanup, desk calibration, foreground album depth, clicked cat identity, focus/dismissal handlers, recording list, mute/stop/end/error, inactivity, late play promises, independent music browsing and reduced motion. checks/sleeping-cats.ps1 checks alpha separation and writes an ignored static contact sheet. Run Node checks from repository root. Node is not on the current shell PATH; connected Node REPL with node:vm was used without installing software.

Final synchronization checks on November 16, 2026: all six controlled Node suites and the sleeping-cat alpha check passed. Also checked: script syntax, 22 local asset references, CSS brace balance, PNG dimensions, approved writing hash, audio copy hash, embedded chair SVG consistency and git diff --check. Static compositions were inspected; they are not browser screenshots.

Browser access host was unavailable. Prior native Edge inspection failed with its portfolio window minimized, and Chrome access was denied. Do not bypass restrictions or repeatedly pursue blocked tools. Not agent-verified live: audible audio/decoding, autoplay policy, actual animation timing, CSS mask rendering, mobile camera/framing, touch/drag, native modal focus, fullscreen and final composition. Report these limits plainly.

Next: obtain visual feedback on family v2, workstation chair/computer seam, album/table depth and cat routes/click areas. Test music while browsing, mobile layouts and native keyboard/touch in a real browser when available. Improve current interactions before unrelated features. Optional WASD/floor navigation, richer frame animation, browser-history routing and shareable content URLs remain future work.

Pending editorial content: coffee stories/equipment, project evidence/links, selected milestones/verified dates, reviewed public contact destinations and résumé. Additional music tracks/captions are optional. Do not invent claims, dates, links or benchmarks. Academic reference PDFs inform writing but are not public assets.

## Git and maintenance

Use the existing main/origin repository only. The user authorized pushing all current project changes, including versioned assets, music and checks, to that private repository. Keep tmp/, temp/, dependencies and machine-local secrets ignored. No public site deployment or visibility change is authorized. Check Git status/remotes/privacy before mutations and verify remote HEAD after pushing. Never force-push or discard work to resolve divergence. Network/.git writes may require native approval; an ownership exception must be limited to this exact repository, never a global wildcard.

index.html loads piano → album → actions → app → cats. app.js manages content; actions.js owns journeys/props/camera; piano.js owns recording/performance mode; album.js owns pages/turns; cats.js owns autonomous inhabitants. styles.css owns stage scaling, depth masks, opacity and controls. Asset history/prompts are in assets/README.md, activity-prompts.md and album-prompts.md. Current code and this snapshot outrank older prompt descriptions. Ignored tmp/ previews may not exist on another checkout.
