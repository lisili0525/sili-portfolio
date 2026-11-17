# Sili Li's Little House — Personal Portfolio PRD

Status: React implementation published through GitHub Pages; current release requirements
Date: November 16, 2026
Owner: Sili Li


## Confirmed personalized-view direction — November 16, 2026 (not implemented)

- Scope: computer and notebook only, developed separately with the computer first. The existing album must remain unchanged unless explicitly requested by the owner.
- Present each as an enlarged view of the actual room object, occupying the main viewport. The album is a scale reference only. Preserve the room's unified cartoon drawing style.
- Computer: small project folders for CoffeeHeads and biomedical machine learning, simple desktop with no “Sili’s Computer” heading or decorative clutter. Opening a folder reveals a richer project window. Placeholder copy/diagrams/images must remain distinguishable from verified project evidence.
- Computer background: seated work-chair viewpoint, with the existing bookshelf to the right, a little wall and cream curtain to the left. Maintain spatial continuity with the room.
- Notebook: SVD & PCA and cloud microphysics modeling, with page turning as the desired later interaction. Detailed design remains pending.
- Preserve music state and reachable controls, arrival-gated opening, keyboard focus, Escape and reduced-motion behavior.
- Latest positively reviewed concept: [Computer project view v3](concepts/computer-project-view-v3.png). See HANDOFF.md for feedback and provenance. The concept is not integrated into the app. A concrete implementation plan still requires owner approval; pushing and deployment require separate explicit approval.

## Local workstation split — November 16, 2026 (unpublished)

The owner approved separating the computer and notebook before designing their personalized views. There are now eight content entries. The computer opens `computer`, rendered by `src/components/content/ComputerContent.jsx`, with CoffeeHeads and biomedical machine learning. The notebook retains `notebook`, rendered by `src/components/content/NotebookContent.jsx`, with SVD & PCA and cloud microphysics modeling. Both have separate Explore destinations. The coffee journal's technical link opens the computer. English placeholder notes are explicit; they make no new project claims.

Both entries retain the existing cream content shell and shared workstation journey, seating, departure and reduced-motion behavior. Dialog focus, Escape, arrival gating and piano browsing remain shared. The photo album is out of scope and must not be changed unless the owner explicitly requests it.

Next: agree on an implementation plan using the saved computer concept direction. Notebook page turning is a later, separate design task. Neither final personalized view is implemented or approved. The enlarged presentation should occupy the viewport similarly in scale to the existing album, without making the computer resemble an album. No push or deployment is authorized.

Validation: all 50 tests across six suites pass, production build passes, and diff checks pass. New integration checks cover separate content and Explore entries, workstation arrival, focus return, pending Escape cancellation, reduced motion and uninterrupted music browsing. Native browser verification of this split has not been performed.


## Current confirmed behavior — November 16, 2026

This section is authoritative for the current release. Implementation details and operational handoff are in HANDOFF.md. Code and project documents remain English-only.

- Delivery: React 19 with Vite, a static dist build, and a GitHub Pages workflow triggered by main. Every future push and deployment requires explicit owner approval; see Publishing approval. The website is https://silispace.net/. The owner configured this custom domain on November 16, 2026; hosting remains GitHub Pages.
- Scene: all furniture, decorations, residents, lighting and depth passes have independent module ownership and shared placement/support metadata. Preserve the approved composition, outward-opening window, matching curtains and revised foliage/window dimensions. Modularization enables incremental animation, but large rearrangements still require artwork/occlusion review.
- Window: glass and curtains open/close independently through the illustration. Open glass enables breeze; closed glass stops it. Drawn curtains remove direct sunlight. Cats cannot cross closed glass or drawn curtains; outdoor Viola waits. Protect in-progress portal crossings.
- Effects: coffee preparation coordinates steam/flow/pulse; lamp toggles, camera flashes, and paper/screen/plant/light effects remain subtle. The bookcase plant remains static until its isolated artwork is clean. All decorative motion respects inactivity and reduced motion.
- Rendering stability: animated artwork uses geometric clip paths rather than per-object alpha masks or morphology filters. All character atlases stay mounted and decode before first-use swaps; instantaneous route markers cannot introduce an idle-frame gap. Preserve complete layers during breeze and state transitions; do not treat disappearing strips as an intended effect.
- Furniture seams: stool openings must show the live room background. Desktop props and tabletop must share artwork registration without exposed wall-colored cutouts or floor patches. The desk foreground must reuse the actual desk silhouette and activate only with a seated desk pose; the chair stays complete during approach and departure. While writing, the only pen is the one in Sili's hand. The loose desk pen disappears and returns on leaving the writing pose; pen-free notebook/desk underlays must prevent baked-in duplicates or seams.
- Visual quality: desk legs, right curtain outline, bookcase/books, piano left side and album lower-left cover must have complete, aligned masks without floating fragments. Piano hover follows its actual cabinet contour; its rail is warm subdued brass. Calendar pointing preserves standing apparent size and foot position rather than shrinking on pose change.
- Walking: six distinct short-step frames retain the original light warm skin, head size and grounded feet. Travel speed is 14 world-percent units/second; a full six-frame cycle spans 12 units (about 0.86 seconds), softening limb cadence independently of movement speed.
- Discovery: tight object-contour glow is the only visible hover/focus cue. Remove floating name labels such as At the piano and Rachel & me, and window/curtain state bubbles. Keep meaningful accessible names, keyboard activation and Explore access.
- Popup timing: outside piano performance mode, show all content only after the selected destination's initial interaction completes. Coffee prepares, notebook seats, album lifts, calendar/tennis reach their pose, and music reaches the bench. Reduced motion skips finite travel. New selections cancel stale results; repeated pending clicks do not restart travel; Escape cancels pending interaction/content.
- Piano exception: during playing or the initial piano approach, other content opens immediately and Sili keeps playing, including album browsing without pickup. Keep compact music controls accessible. Direct cat greeting is a physical action and may interrupt music; browsing the resident introduction does not. Closing content never stops a performance.
- Recording: only the supplied One Summer's Day M4A is playable. No initial autoplay; arrival starts playback after activation with an explicit fallback when blocked. The bottom-right music button is an icon-only Mute/Unmute control. Its note is slashed only when muted; it never starts playback, moves Sili or opens content. Activate the illustrated piano (or its accessible Explore destination) to start the piano interaction and open its dialog. An icon-only Pause/Play button appears beside the mute control only while Sili is at the piano in a playing or paused performance; it preserves progress and disappears on departure/end. There is no separate Music list button. Mute/Unmute changes sound only. Pause freezes audio and character motion while preserving progress. After pausing, other destinations resume physical interactions. Returning to the piano stays silent and offers Continue at the saved position or Start over. Recording end releases performance; inactive-page pause requires an explicit playback action.
- Cats: direct clicks greet the actual selected cat in-scene, without a biography popup. Explore retains the introduction and Pet Viola / Play with Java. Stable live targets, reachable perches, high-perch descent, bounded pet/play, smooth jump cancellation and farewell prevent false pointing or abrupt departure. Cats tour all supported furniture with reservations; Java stays indoors and Viola uses the window route.
- Resident depth: determine cat/person occlusion from supported foot positions rather than permanently placing cats above the person. Counter and other rear perches must stay behind a passing foreground person; sofa/table/floor cats sort according to their position. Jump height must not create repeated depth flips.
- Cat pacing: Viola's roaming frequency is 50% lower and Java's 30% lower than the previous baseline, achieved through longer indoor rests rather than slower locomotion. No Pause cats button. Ambient activity pauses for reading/inactivity, with safe-clearance/meeting exceptions; reduced motion uses still indoor poses.
- Album: four spreads/eight filled pages, charcoal card pages, a warm brown leather cover, large white-bordered photographs and clear photo corners, pointer/keyboard turns and last completed spread memory. Wall portrait starts at page one. Contents remain festive couple, family-v2, selected first tennis cartoon, seaside couple, Java, Viola, bench-press-v2 and hip-hop-v2. The selected gym illustration uses the black aligned bench/rack, dark navy top and loose light-gray trousers; do not substitute the blue/white-top variants. Imagined illustrations are not documentary claims; do not invent captions/dates.
- Calibration: retain approved desk/writing/piano registration and foreground album perspective growth up to 18%. The calendar pointing cell needs a local 1.1 scale correction around its feet. Do not resize unrelated poses to compensate for source padding.
- Validation: 48 automated tests, production build and diff checks pass. Local browser review covers arrival gating and uninterrupted piano browsing plus recent visual refinements. Exhaustive machine/browser/touch/audio testing is still pending; do not claim universal device verification.

## 1. Project overview

Build a personal portfolio presented as a cozy, explorable 2D little house. Visitors meet a cartoon Sili and discover his interests by interacting with objects in the room. The primary purpose is enjoyment and self-expression; the site also gives interested people and recruiters clear evidence of his background and abilities.

Sili recently graduated from the University of Wisconsin–Madison with a bachelor's degree, double majoring in Computer Science and Mathematics. His academic interests include mathematical modeling, machine learning, abstract algebra, and cybersecurity. His personal interests include tennis, home coffee brewing, exploring beans and techniques, local cafés, piano, and listening to music.

### Experience and visual direction

- One coherent, illustrated room serves as the home screen. Avoid a long scrolling homepage or conventional About/Projects navigation as the primary experience.
- The scene is the entire webpage: fill the viewport edge to edge, with no outer header, introduction, frame, footer, or page scrolling. Keep scrolling confined to open content views. Scale the room artwork and hotspots together; cover the viewport without distortion, accepting peripheral cropping at different aspect ratios. A compact overlay destination menu keeps cropped destinations reachable, especially on portrait phones.
- Use a side-on 2D game composition with enough floor visibility for character movement, following the selected room concept.
- Use six distinct, continuous short-step walking frames, preserving Sili's original light warm skin tone, low foot lifts, restrained arms, stable head size and grounded feet. Move at 14 world-percent units/second (approximately 36% below the previous 22); drive frames from actual travel distance.
- Keep Sili's apparent head and body scale consistent across standing, walking, and seated poses. Size the piano and bench to fit him; do not shrink the seated character to compensate for undersized furniture.
- Warm afternoon light, wood, subtle paper grain, soft shadows, and muted cream, navy, sage, and terracotta colors.
- Keep the room distinctly cartoon-like, matching `concepts/little-house-v3-cartoon.png`: rounded oversized heads, compact bodies, simple expressive faces, clear outlines, simplified furniture, and broad cel-shaded colors. Avoid realistic anatomy, detailed fur, heavy surface texture, or cinematic realism. The earlier realistic cat-room variant is superseded as a style reference.
- The house feels lived in: angled music sheets, overlapping photos, casually placed tennis equipment, and a partly open notebook. Preserve breathing room and readable interactive objects.
- Use the approved cartoon portrait as the character reference: short dark hair, navy hoodie, gentle expression, coffee cup, hand-drawn warmth. Adapt it into a consistent full-body character and animation assets.
- Ashitaka from *Princess Mononoke* was an artistic reference; the site character represents Sili in contemporary clothing.
- Generated room photos and incidental decorations are concept placeholders, not claims about Sili's life.

### Goals and success criteria

- Visitors can identify Sili, his education, and his interests without opening every object.
- A visitor can discover a technical project and reach its available evidence within two object/content selections.
- GitHub, LinkedIn, email, and résumé are reachable directly from the room.
- The room is enjoyable to explore without puzzles or manual-positioning requirements. Content follows brief automatic interactions; reduced motion skips finite travel.
- All essential content remains usable by keyboard, touch, screen reader, and with reduced motion.

## 2. Skills required

These are capabilities needed to build the site, distinct from the skills presented in Sili's portfolio.

| Capability | Purpose |
| --- | --- |
| Interaction and visual design | Compose a cozy room with discoverable objects and focused content views |
| 2D illustration and asset preparation | Produce room layers, object states, and a consistent cartoon character |
| Character animation | Create idle, walking, facing, and simple interaction states |
| Frontend development | Implement responsive views, content rendering, navigation, and contact links |
| Lightweight game interaction | Implement click-to-walk, optional keyboard movement, room boundaries, and object interactions |
| Accessibility | Provide semantic controls, focus handling, touch equivalents, and motion preferences |
| Content editing | Turn verified projects and interests into concise personal stories |
| Performance and verification | Optimize assets and verify navigation, animation, and responsiveness |

Implementation uses React 19 and Vite with scoped animation controllers and a static production build. A full game engine, backend, and content management system are not requirements.

## 3. Key features

### 3.1 Room and character movement

- Without an active recording performance, clicking or tapping an object sends Sili to its interaction point and opens content. During a performance, content opens without moving him from the piano.
- Future, not implemented: optional arrow-key/WASD movement and nearby-object activation.
- Future, not implemented: click-to-floor movement constrained to clear floor and furniture boundaries.
- Indicate interactive room objects with tight contour glow on hover/focus and meaningful accessible names. Do not show floating object-name labels.
- A first-visit hint may explain object interaction; do not advertise manual movement before it is implemented.
- Keep transitions short and interruptible. A new selection cancels the previous movement; reduced-motion mode opens content immediately.
- Character movement must never block direct contact links or accessible object controls.
- Walking uses six distance-driven frames with a full cycle every 12 world-percent units at the accepted movement speed of 14 units/second. Keep low foot lifts, restrained arms and stable per-frame registration; pause/reduced-motion behavior must remain intact.

### 3.2 Piano and music sheets

Open a music collection with titles, credits, and optional personal notes about listening and playing.

Initial selections supplied by Sili:

- “Il Porco Rosso” — Joe Hisaishi, identified by Sili as the performer/reference.
- “Without His Cross” — Joseph M. Martin; a Christian choral piece Sili plays.
- Chopin's Étude, Op. 10, No. 3.

The sole current playable recording is the supplied “One Summer’s Day”, stored unchanged as assets/music/one-summers-day.m4a (AAC, stereo 44.1kHz, approximately 2:16; revised recording supplied November 16, 2026). The earlier three pieces are supplied listening/playing interests, not playable entries. Render the clickable list from pianoRecordings in piano.js. Start audio only after visitor activation and piano arrival; never on page load.

#### Sili plays the piano

- When a visitor clicks, taps, or activates the piano by keyboard, Sili walks to the piano, sits at the bench, and begins a piano-playing animation. Keep the music collection available as part of this interaction.
- Maintain a configurable collection of supplied recordings with source, title and optional note. Currently include only “One Summer’s Day”; do not substitute other recordings or expose missing sources.
- Preserve a no-recording fallback with silent piano animation and no broken media controls.
- Once the recording is available, activating the piano requests playback of that recording alongside the animation. If the browser does not permit playback after the walk-to-piano delay, show a clear Play control and begin sound only after that additional visitor action. Never play audio on page load.
- Provide Mute/Unmute and Pause/Play controls, plus Continue / Start over when returning to paused progress, accessible by keyboard and touch. The icon-only music button changes sound only, independently of playback and navigation; remove the separate Music list button and all Stop/Resume controls. Pause preserves audio.currentTime and freezes the playing pose. Paused visitors may send Sili to other destinations; returning to the piano offers Continue or Start over without automatic playback. Muting silences the recording while Sili continues playing. Remember the visitor's sound preference during the session and respect it on subsequent piano visits.
- During active playback, selecting another content destination leaves Sili at the piano with playing hands while music continues. The album opens directly without pickup in performance mode. Closing any content keeps the performance running. Recording end or media error releases normal destination activities; muting retains performance mode.
- Pause playback when the page becomes inactive; require an explicit action to resume after returning. Handle the recording ending by stopping the performance and returning Sili to a seated idle state, rather than looping unexpectedly.
- With reduced motion enabled, place Sili at the piano immediately and use a still seated pose instead of repetitive playing animation. Audio remains optional and independently controllable.
- Additional character assets: approach/bench placement, seated playing, and seated idle. Use a convincing keyboard-facing pose consistent with the room art; realistic finger-level synchronization is not required.

Sili's faith is background context, not a dedicated website section. The selected music can appear naturally with its title and credit.

### 3.3 Espresso station

An espresso machine, grinder, cup, and beans form the coffee destination. Open a compact coffee journal with room for brewing methods, beans, experiments, and café memories.

Proposed initial structure, pending actual content:

- At home: equipment and brewing approach.
- A memorable cup: a bean or café experience with a short personal note.
- CoffeeHeads: a personal introduction linking to the application's technical entry.

Do not imply ownership of specific equipment from the concept art. Exact equipment, beans, cafés, and stories remain to be supplied. Ratings, maps, and frequent updates are unnecessary for the first release.

### 3.4 Technical worktable

A laptop and open notebook lead to research, projects, and mathematical explorations. Present entries as notebook material with readable typography and clear evidence links.

Candidate entries grounded in the supplied academic résumé:

| Entry | Initial content direction |
| --- | --- |
| CoffeeHeads | Full-stack application using Java, Spring Boot, React, PostgreSQL, and Redis; APIs, authentication, caching, rate limiting, and integration testing |
| Cloud microphysics modeling | Eulerian–Lagrangian modeling, droplet dynamics, numerical stability, and GPU feasibility work; distinguish proposed scale from achieved results |
| SVD and PCA | Image compression, low-rank approximation, dimensionality reduction, and classification explorations |
| UNMC Wan Lab internship | Biomedical machine learning, Python data pipelines, architecture investigation, and reproducibility |

Each entry should identify the question or problem, Sili's contribution, methods, status, lessons, and available code or artifacts. Do not invent outcomes, benchmarks, repositories, publications, or deployment status.

Coursework can support short explorations of modern algebra, analysis, numerical methods, linear algebra, algorithms, and computation. A transcript-style grade list is not required. Treat cybersecurity as an interest unless supporting work is supplied.

### 3.5 Table photo album

Only the framed Rachel-and-Sili portrait stays on the wall. Remove the other wall photographs; retain the calendar as a calendar. An open photo album lies flat on the foreground round table and is clickable. The coffee/espresso cabinet sits farther right, leaving visible space beside the piano.

Clicking the album brings a large physical-looking eight-page book directly over the room, shown as four two-page spreads. No window panel, heading, introduction or page toolbar surrounds it. During music, compact mute and pause/continue/restart controls remain accessible. Use warm brown leather edging, flat charcoal mounting cards, a narrow cloth-style hinge and large photographs with thin white borders and translucent corner protectors. Photos occupy most of each near-square page. Do not show printed page numbers; retain the screen-reader spread counter. Avoid cream book paper, a deep book gutter, stacks of pale page edges and curled paper corners. Turns rotate the whole rigid card with restrained shading and no extra tilt. Visitors click or drag the lower page corners; dragging moves the turning sheet directly and can finish or return it to its original position. Retain arrow keys, reduced motion and a screen-reader spread counter. Escape, a discreet close icon and clicking outside the book return to the room. The wall portrait opens page one.

Keep the original wall-portrait illustration only on the wall; the separately requested family portrait belongs in the album. Slots 1 and 3 contain cartoons of Sili's supplied festive and tennis photos; the seaside cartoon occupies slot 4 and the two cats occupy slots 5–6, with a family portrait in slot 2, Sili bench pressing in slot 7 and Rachel dancing hip-hop in slot 8. All eight spaces are filled. Do not invent personal photos or memories. Keep each page configurable with a reviewed image, accessible description and caption. Scrolling stays inside the content dialog.
### 3.6 Tennis equipment

A bucket of tennis balls and a few rackets open a small tennis vignette: a short personal note and selected photos. Link related images to the photo collection rather than duplicating a separate gallery. No claims about rankings, competition, or playing history without supplied details.

### 3.7 Illustrated couple portrait and resident cats

Include a framed cartoon portrait of Sili and his girlfriend Rachel on the photo wall, matching the approved hand-drawn character style. Use `rachel and me.jpg` for the close, affectionate composition and likeness, and `rachel.jpg` as an additional appearance reference. Preserve Rachel's long dark hair and bangs; the solo reference also shows muted reddish lengths. Glasses and clothing should follow the chosen couple reference unless revised by Sili. The portrait can open through the photo-wall interaction with an optional caption. An animated-style illustration is required; motion within the portrait is optional, not assumed.

Two autonomous cartoon cats inhabit the room:

| Cat | Supplied visual reference |
| --- | --- |
| Viola | `viola.jpg`: black-and-white tuxedo cat, white chest and paws, narrow white forehead/nose marking, distinctive white muzzle patches, pale greenish eyes, and black tail |
| Java | `java.jpg`: orange tabby with visible stripes, lighter muzzle and chin, pink nose, and a long striped tail |

- Match recognizable markings when simplifying the cats to the room's illustration style. Sili describes both cats as female. Viola is the older, brave, quieter cat: she confidently goes outside and returns. Java is younger, well cared for, and especially playful; she may watch through the window for a long time while Viola is outside without following her.
- Cats move independently of visitor controls and Sili's movement. Use varied idle durations and autonomous wandering, sitting, grooming, sleeping, and selected perch visits, with calm pauses more common than constant movement.
- Viola can approach the window, hop onto a visible sill, pause, leave through the opening, remain offscreen for a variable interval, and return through the same route. Preserve continuity rather than randomly disappearing in the room. Tune intervals during prototyping.
- Java's characteristic window behavior is a long watchful pause while Viola is outside, followed by returning indoors to play. Do not give Java the same routine of confident outdoor trips. Her indoor behavior should favor playful bursts, toy chasing, and pouncing between rests; Viola favors quiet observation and resting. Use a small dedicated cat toy rather than implying Java plays with full-size tennis balls.
- Give the cats independent schedules. Avoid synchronized loops; occasional shared proximity is sufficient for launch, with elaborate social behavior deferred.
- Define valid floor routes, perch points, and a window entry/exit route. Use consistent depth ordering so furniture can naturally occlude a cat without clipping through it.
- Clicking either cat starts a direct in-scene greeting through a keyboard-accessible button that follows that cat. Remove the obsolete window hotspot; retain Explore access. Full-room cat layers do not intercept clicks. Cats remain autonomous, cannot be steered and must not block reading or other required navigation.
- Pause simulation while the page is inactive and suspend ambient movement while a content view is open. With reduced motion, show resting cats without roaming or animated jumps. Do not show a manual Pause cats button.
- Required asset states: idle/sit, walk, groom, sleep, and window hop, with appropriate facing variants; additionally Viola needs exit/return states and Java needs window-watching and playful chase/pounce states. Share animation structure where practical while preserving each cat's appearance.

Source photos are private design references unless separately selected for publication. Generated room/cat illustrations and prototype pose animation are implemented; final live browser review is pending.

### 3.8 Milestone calendar

The wall calendar opens a chronological collection of meaningful milestones. Use concise dated cards, with optional related photos or notebook links.

Potential starting milestones include graduation and the research internship. Sili must select the milestones and verify their dates before publication. Do not populate a full life timeline from assumptions. This is a personal history calendar, not a booking tool or live schedule.

### 3.9 Introduction and contact

- Keep “Sili Li” and a short introduction visible or immediately accessible without a hidden game mechanic.
- Provide persistent, discreet controls for the approved GitHub and LinkedIn profiles. Do not publish an email control. A résumé link requires an owner-reviewed web-ready file before implementation.
- Approved public profiles: https://github.com/lisili0525 and https://www.linkedin.com/in/sili-li-3b7337150/. The owner withdrew email publication on November 16, 2026; do not expose an email address, envelope control or contact card. GitHub/LinkedIn open new tabs. GitHub and LinkedIn must be independent square tiles with dimensional cream material, separate SVG logos, hover lift and press feedback. The background must contain no painted contact icons or visible patch seams. Respect reduced motion and retain 44px tiles on small screens.
- Use a web-ready résumé supplied or reviewed by Sili before release.

### 3.10 Opening and closing content

- Bring the selected object forward into a readable content view while retaining visual context from the softened room.
- Avoid a permanent text label saying “Back to desk.”
- Clicking/tapping the exposed room or a visible close icon returns the object to its place. Escape closes the view. Dragging an object back may be added as an optional enhancement, never the only way to close it.
- Keep an explicit close control with an accessible name. Handle focus within open content and return focus to the originating object on close.
- Disable movement shortcuts while reading content, using controls, or typing.
- Content views may scroll when needed; the home screen remains a compact room experience.

## 4. Contexts and examples

The following are intended visitor journeys, not assertions about content already supplied.

| Visitor context | Example journey | Expected result |
| --- | --- | --- |
| Someone wants to know Sili personally | Enter room → explore photo wall → visit coffee station | Learn about his everyday interests through real photos and short notes |
| Recruiter assessing technical ability | Select technical desk → open CoffeeHeads → follow available repository link | Understand Sili's contribution and access supporting work without playing a game |
| Research-oriented visitor | Technical desk → cloud modeling or internship entry | See mathematical and computational interests with accurate scope and evidence |
| Music enthusiast | Select piano → choose One Summer’s Day → browse another content view | Hear the supplied recording while Sili remains at the piano; music controls stay accessible |
| Returning friend | Select calendar → open a milestone | Find a selected life event and related content |
| Touch visitor | Tap espresso machine → content opens after brief movement → tap close icon | Complete the same journey without hover, dragging, or keyboard input |
| Keyboard or reduced-motion visitor | Focus an object control → activate → read → Escape | Access identical information with visible focus and minimal movement |

Example introduction for later copy review: “Hi, I'm Sili. I recently graduated from UW–Madison in Computer Science and Mathematics. Welcome to my little house.”

## 5. First-release scope and acceptance criteria

### Included

Implemented: one room, cartoon Sili, destination journeys/poses, seven content entries (music, coffee, technical work, photos, tennis, milestones, cats), eight-page illustrated album, supplied piano recording/list, autonomous clickable cats and responsive content views. Optional manual movement and reviewed résumé access remain future release work; approved GitHub/LinkedIn controls are implemented.

Also included: the illustrated Sili-and-Rachel wall portrait and two autonomous cats, Viola and Java, with basic calm behaviors and window departures/returns.

### Future possibilities

Additional supplied piano recordings, richer character interactions, additional journal entries, seasonal room details, optional manual movement, history/deep links and object-drag gestures. Extra rooms, minigames, user accounts, and a public editing interface are outside the initial scope.

The piano interaction and supplied “One Summer’s Day” audio are implemented; actual audible browser playback and native autoplay behavior still need verification.

### Release checks

- All seven entries open and close with pointer, touch and keyboard; live native browser/touch verification is pending.
- The couple portrait appears on the wall and opens through the photo collection; its illustration uses the supplied likeness references.
- Viola and Java remain visually distinguishable and act independently. Viola leaves and returns via the window without teleporting; Java can watch for her from the sill and then resume indoor play.
- Cat movement never blocks object activation, reading, or character navigation; background activity pauses when hidden, and motion respects reduced-motion preferences.
- Direct object activation works without manual character positioning or puzzles.
- Contact links and résumé resolve to reviewed destinations; no placeholder URLs ship.
- All project descriptions, milestone dates, and music credits are checked against supplied content.
- No playback controls appear for missing recordings; audio never starts on initial page load. Visitor activation starts the piano approach, with a fallback Play button if delayed playback is blocked.
- Activating the piano sends Sili to the bench and starts the playing pose/animation. A supplied personal recording can accompany it; absent audio is handled without errors or substitute recordings.
- Sound can be turned off and back on during a performance, with the session preference respected. Pause freezes audio and character motion without resetting progress. Selecting other objects while paused sends Sili to interact; returning to the piano offers Continue or Start over. Recording end stops playback; hiding the page pauses it until an explicit playback action. Selecting another content destination during active playback preserves the piano performance.
- Home scene fits the intended desktop viewport. On small screens, use an adapted composition with reachable objects rather than shrinking controls to illegible sizes; finalize this layout in a mobile prototype.
- Provide an accessible compact list of room destinations as an alternative way to explore.
- Focus is visible, controls have meaningful names, and text remains readable over textures.
- Reduced-motion preference removes walking delays and decorative motion without losing content.
- Keep decorative grain and lighting lightweight; load detailed media on demand. Verify responsiveness on a representative phone and desktop before release.
- Browser-history navigation and shareable technical-entry URLs remain future enhancements.

## 6. Content and assets still needed

| Item | Status |
| --- | --- |
| Cartoon portrait direction | Approved; full-body pose assets implemented, richer frame animation future |
| Room concept | Approved cartoon base implemented; responsive live browser QA pending |
| Sili and Rachel portrait | Original wall portrait retained; active family album image v2 has arm correction awaiting visual approval |
| Viola and Java | Separate sprites, autonomous routines and moving content buttons implemented; live route/hit-area review pending |
| Album illustrations and captions | All eight slots filled with requested cartoons; captions/dates omitted; final visual approval pending |
| Coffee stories and actual equipment details | Pending |
| Project evidence, screenshots, links, and publication wording | Pending |
| Selected milestones and verified dates | Pending |
| Personal notes for the three music pieces | Optional, pending |
| Personal music recordings | One Summer’s Day supplied and integrated; more tracks optional, audible browser QA pending |
| GitHub, LinkedIn, preferred email, public résumé | GitHub/LinkedIn implemented; email removed at owner request; public résumé pending |

Reference documents: Sili_Li_Academic_Resume.pdf and Math Coursework - Sili Li.pdf, supplied by Sili from his Graduate Application folder. These inform content; they are not automatically public website assets.

The React website is published through GitHub Pages. Local implementation and validation may proceed, but pushing and deployment require explicit owner approval for each release. Do not publish unselected private source references or invent missing content.

## Publishing approval

On November 16, 2026, the owner explicitly approved this consolidated release after local review: updated piano controls and pause/return behavior, approach hint, cat depth, six-frame walking with gentler cadence, and workstation/chair repairs. The owner subsequently approved the selected page 7/8 artwork and charcoal photo album release on November 16, 2026. Obtain fresh explicit owner approval before each subsequent push or deployment. Complete local changes and validation first, then present the result for approval. Earlier blanket publishing permissions are revoked.

## Future exploration: object-specific content views

The owner has proposed personalized presentations for interactive content, such as a computer screen for the computer and a notebook for the notebook. This is an unscoped idea only; no design or implementation is authorized. Start with a constructive critique/roast of the idea and focused requirement questions. Clarify the goals, destinations, content differences, visual direction, accessibility and responsive constraints before planning. Wait for the owner's answers and instruction to proceed. Computer and notebook currently share one destination; the approved charcoal album already has its own presentation. Retain all existing interaction, audio and focus behavior. Future implementation and publication require separate authorization.
