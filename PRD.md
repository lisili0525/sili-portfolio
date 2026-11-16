# Sili Li's Little House — Personal Portfolio PRD

Status: implemented private prototype; current requirements and remaining release work
Date: November 16, 2026
Owner: Sili Li

## Current confirmed behavior — November 16, 2026

- Album contents: 1 festive couple, 2 family portrait (active album-family-v2.png with corrected Sili right arm), 3 first generated tennis cartoon, 4 seaside couple, 5 Java, 6 Viola, 7 Sili bench pressing, 8 Rachel dancing hip-hop. All slots filled. Slots 2/7/8 are requested imagined illustrations; do not invent documentary event claims, dates or captions. Later tennis variants were deleted at the user’s request.
- Approved writing pose remains unchanged. Latest chair/computer composition and family-arm correction still await final user visual approval. Controlled logic/static checks do not replace browser verification.

- Cat entry update: clicking either moving cat opens “Meet Viola & Java”; replace the old fixed window hotspot. Use keyboard-accessible controls attached to each cat and retain the Explore entry. Cats remain autonomous; clicks do not steer them. Without music, Sili visits the clicked floor cat or looks toward its perch. During music, content opens without interrupting the piano performance.
- Latest content-window preference: use a 92% opaque warm cream background for small windows, replacing the earlier half-transparent treatment. Positioning already preserves the animation view. Keep the physical album treatment unchanged.

- Music/browsing update: during an active recording performance, content navigation never moves Sili away from the piano; he continues hand animation (still seated with reduced motion). Album opens without pickup in this mode. Stop or recording end releases normal object journeys/animations; mute retains performance mode. Keep music-list, mute and stop controls accessible inside open content views. This supersedes the earlier destination-stops-recording behavior.
- Recording update: Sili supplied “One Summer’s Day” as M4A. Connect it to the piano and provide a clickable music list, reachable while playing, containing only that recording for now. Keep mute, explicit resume after inactivity, fallback Play when browser playback is blocked, and stop at the recording end or explicit Stop. Browsing content does not stop the performance.
- Coffee: Sili prepares it facing away from the visitor, then stays near the brewing station with a relaxed, casual lean and occasional sips. On another destination selection, he places the cup on the station before leaving.
- Worktable: sit at the actual chair in matching perspective and scale, mostly type on the laptop, occasionally write in the notebook and pause to think.
- Photo album: approach the foreground table, reach for and lift the album, then open the flipping book. This is the user-requested exception to immediate content opening; reduced motion skips the travel and pickup delay. Return the book to the table on close or departure.
- Album perspective: Sili grows as he approaches the viewer, keeping consistent body proportions and grounded feet through reach, pickup and return. Foreground pickup is 18% larger than his normal room scale; preserve separately approved workstation and piano calibration.
- Other content windows: 92% opaque warm-cream backgrounds with opaque readable text, positioned to keep the current activity visible. The flipping album retains its physical paper presentation.
- Activity transitions are interruptible; stale pickups must never open an album after a different selection. Pause progress while the page is inactive and use still poses with reduced motion.

## 1. Project overview

Build a personal portfolio presented as a cozy, explorable 2D little house. Visitors meet a cartoon Sili and discover his interests by interacting with objects in the room. The primary purpose is enjoyment and self-expression; the site also gives interested people and recruiters clear evidence of his background and abilities.

Sili recently graduated from the University of Wisconsin–Madison with a bachelor's degree, double majoring in Computer Science and Mathematics. His academic interests include mathematical modeling, machine learning, abstract algebra, and cybersecurity. His personal interests include tennis, home coffee brewing, exploring beans and techniques, local cafés, piano, and listening to music.

### Experience and visual direction

- One coherent, illustrated room serves as the home screen. Avoid a long scrolling homepage or conventional About/Projects navigation as the primary experience.
- The scene is the entire webpage: fill the viewport edge to edge, with no outer header, introduction, frame, footer, or page scrolling. Keep scrolling confined to open content views. Scale the room artwork and hotspots together; cover the viewport without distortion, accepting peripheral cropping at different aspect ratios. A compact overlay destination menu keeps cropped destinations reachable, especially on portrait phones.
- Use a side-on 2D game composition with enough floor visibility for character movement, following the selected room concept.
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
- The room is enjoyable to explore, with no puzzles, mandatory movement, or waiting required to access information.
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

Implementation uses buildless HTML/CSS/JavaScript. A full game engine, backend, and content management system are not requirements.

## 3. Key features

### 3.1 Room and character movement

- Without an active recording performance, clicking or tapping an object sends Sili to its interaction point and opens content. During a performance, content opens without moving him from the piano.
- Future, not implemented: optional arrow-key/WASD movement and nearby-object activation.
- Future, not implemented: click-to-floor movement constrained to clear floor and furniture boundaries.
- Indicate interactive objects with restrained hover and keyboard-focus feedback. Brief names may appear on hover/focus; do not fill the room with permanent labels.
- A first-visit hint may explain object interaction; do not advertise manual movement before it is implemented.
- Keep transitions short and interruptible. A new selection cancels the previous movement; reduced-motion mode opens content immediately.
- Character movement must never block direct contact links or accessible object controls.
- Suggested animations: blinking, gentle idle motion, walking, a coffee sip, and subtle object responses. Exact animation scope can be adjusted after an asset prototype.

### 3.2 Piano and music sheets

Open a music collection with titles, credits, and optional personal notes about listening and playing.

Initial selections supplied by Sili:

- “Il Porco Rosso” — Joe Hisaishi, identified by Sili as the performer/reference.
- “Without His Cross” — Joseph M. Martin; a Christian choral piece Sili plays.
- Chopin's Étude, Op. 10, No. 3.

The sole current playable recording is the supplied “One Summer’s Day”, stored unchanged as assets/music/one-summers-day.m4a (AAC-LC, stereo 44.1kHz, approximately 2:17). The earlier three pieces are supplied listening/playing interests, not playable entries. Render the clickable list from pianoRecordings in piano.js. Start audio only after visitor activation and piano arrival; never on page load.

#### Sili plays the piano

- When a visitor clicks, taps, or activates the piano by keyboard, Sili walks to the piano, sits at the bench, and begins a piano-playing animation. Keep the music collection available as part of this interaction.
- Maintain a configurable collection of supplied recordings with source, title and optional note. Currently include only “One Summer’s Day”; do not substitute other recordings or expose missing sources.
- Preserve a no-recording fallback with silent piano animation and no broken media controls.
- Once the recording is available, activating the piano requests playback of that recording alongside the animation. If the browser does not permit playback after the walk-to-piano delay, show a clear Play control and begin sound only after that additional visitor action. Never play audio on page load.
- Provide an always-reachable, clearly labeled Sound on/off toggle while piano playback is active, accessible by keyboard and touch. Muting silences the recording while Sili continues playing. Remember the visitor's sound preference during the session and respect it on subsequent piano visits.
- Selecting another content destination leaves Sili at the piano with playing hands while music continues. The album opens directly without pickup in performance mode. Closing any content keeps the performance running. Stop, recording end or media error releases normal destination activities; muting retains performance mode.
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

Clicking the album brings a large physical-looking eight-page book directly over the room, shown as four two-page spreads. No window panel, heading, introduction or page toolbar surrounds it. During music, a compact music-list/mute/stop group remains accessible. Show a substantial cover, page thickness, center binding, mounted photographs and small page numbers. Visitors click or drag the lower page corners; dragging moves the turning sheet directly and can finish or return it to its original position. Retain arrow keys, reduced motion and a screen-reader spread counter. Escape, a discreet close icon and clicking outside the book return to the room. The wall portrait opens page one.

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
- Clicking either cat opens the resident content through a keyboard-accessible button that follows that cat. Remove the obsolete window hotspot; retain Explore access. Full-room cat layers do not intercept clicks. Cats remain autonomous, cannot be steered and must not block reading or other required navigation.
- Pause simulation while the page is inactive and suspend ambient movement while a content view is open. With reduced motion, show resting cats without roaming or animated jumps. Provide a discreet ambient-animation pause option.
- Required asset states: idle/sit, walk, groom, sleep, and window hop, with appropriate facing variants; additionally Viola needs exit/return states and Java needs window-watching and playful chase/pounce states. Share animation structure where practical while preserving each cat's appearance.

Source photos are private design references unless separately selected for publication. Generated room/cat illustrations and prototype pose animation are implemented; final live browser review is pending.

### 3.8 Milestone calendar

The wall calendar opens a chronological collection of meaningful milestones. Use concise dated cards, with optional related photos or notebook links.

Potential starting milestones include graduation and the research internship. Sili must select the milestones and verify their dates before publication. Do not populate a full life timeline from assumptions. This is a personal history calendar, not a booking tool or live schedule.

### 3.9 Introduction and contact

- Keep “Sili Li” and a short introduction visible or immediately accessible without a hidden game mechanic.
- Provide persistent, discreet controls for GitHub, LinkedIn, email, and résumé, with accessible names and understandable focus/hover states.
- Exact profile URLs and preferred public email are pending. Do not infer them from usernames or automatically publish résumé contact details.
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

Implemented: one room, cartoon Sili, destination journeys/poses, seven content entries (music, coffee, technical work, photos, tennis, milestones, cats), eight-page illustrated album, supplied piano recording/list, autonomous clickable cats and responsive content views. Optional manual movement, reviewed contact links and résumé access remain future release work.

Also included: the illustrated Sili-and-Rachel wall portrait and two autonomous cats, Viola and Java, with basic calm behaviors and window departures/returns.

### Future possibilities

Additional supplied piano recordings, richer character interactions, additional journal entries, seasonal room details, optional manual movement, history/deep links and object-drag gestures. Extra rooms, minigames, user accounts, and a public editing interface are outside the initial scope.

The piano interaction and supplied “One Summer’s Day” audio are implemented; actual audible browser playback and native autoplay behavior still need verification.

### Release checks

- All seven entries open and close with pointer, touch and keyboard; live native browser/touch verification is pending.
- The couple portrait appears on the wall and opens through the photo collection; its illustration uses the supplied likeness references.
- Viola and Java remain visually distinguishable and act independently. Viola leaves and returns via the window without teleporting; Java can watch for her from the sill and then resume indoor play.
- Cat movement never blocks object activation, reading, or character navigation; background activity pauses when hidden, and ambient motion can be paused.
- Direct object activation works without manual character positioning or puzzles.
- Contact links and résumé resolve to reviewed destinations; no placeholder URLs ship.
- All project descriptions, milestone dates, and music credits are checked against supplied content.
- No playback controls appear for missing recordings; audio never starts on initial page load. Visitor activation starts the piano approach, with a fallback Play button if delayed playback is blocked.
- Activating the piano sends Sili to the bench and starts the playing pose/animation. A supplied personal recording can accompany it; absent audio is handled without errors or substitute recordings.
- Sound can be turned off and back on during a performance, with the session preference respected. Explicit Stop and recording end stop playback; hiding the page pauses it with explicit resume. Selecting another content destination preserves the piano performance.
- Home scene fits the intended desktop viewport. On small screens, use an adapted composition with reachable objects rather than shrinking controls to illegible sizes; finalize this layout in a mobile prototype.
- Provide an accessible compact list of room destinations as an alternative way to explore.
- Focus is visible, controls have meaningful names, and text remains readable over textures.
- Reduced-motion preference removes walking delays and decorative motion without losing content.
- Keep decorative grain and lighting lightweight; load detailed media on demand. Verify responsiveness on a representative phone and desktop before release.
- Browser Back closes/restores content predictably, and technical entries support shareable URLs.

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
| GitHub, LinkedIn, preferred email, public résumé | Pending |

Reference documents: Sili_Li_Academic_Resume.pdf and Math Coursework - Sili Li.pdf, supplied by Sili from his Graduate Application folder. These inform content; they are not automatically public website assets.

Website code and assets are implemented as a private prototype. The user requested committing/pushing project changes to the existing private GitHub repository. No public deployment or visibility change is authorized.
