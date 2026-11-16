# Sili Li's Little House — Personal Portfolio PRD

Status: initial product specification, ready for review before implementation  
Date: November 16, 2026  
Owner: Sili Li

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

Choose the implementation stack during implementation planning. Prefer a lightweight solution appropriate for one room; a full game engine, backend, and content management system are not requirements.

## 3. Key features

### 3.1 Room and character movement

- Clicking or tapping an interactive object sends Sili to its interaction point and opens its content.
- Optional arrow-key and WASD movement lets visitors walk around; a nearby object can be activated with Enter or an explicitly indicated interaction key.
- Clicking the walkable floor moves Sili to that location. Constrain movement to a simple clear floor area and prevent walking through furniture.
- Indicate interactive objects with restrained hover and keyboard-focus feedback. Brief names may appear on hover/focus; do not fill the room with permanent labels.
- Offer one unobtrusive first-visit hint explaining object interaction and optional movement.
- Keep transitions short and interruptible. A new selection cancels the previous movement; reduced-motion mode opens content immediately.
- Character movement must never block direct contact links or accessible object controls.
- Suggested animations: blinking, gentle idle motion, walking, a coffee sip, and subtle object responses. Exact animation scope can be adjusted after an asset prototype.

### 3.2 Piano and music sheets

Open a music collection with titles, credits, and optional personal notes about listening and playing.

Initial selections supplied by Sili:

- “Il Porco Rosso” — Joe Hisaishi, identified by Sili as the performer/reference.
- “Without His Cross” — Joseph M. Martin; a Christian choral piece Sili plays.
- Chopin's Étude, Op. 10, No. 3.

No personal recordings are currently available. Structure entries to accept recordings later. Show playback controls only when a recording exists, and start audio only after an explicit visitor action. Sheet illustrations can be decorative; actual score reproductions and recordings require suitable usage rights before inclusion.

#### Sili plays the piano

- When a visitor clicks, taps, or activates the piano by keyboard, Sili walks to the piano, sits at the bench, and begins a piano-playing animation. Keep the music collection available as part of this interaction.
- Reserve a configurable audio slot for Sili's own future piano recording, including the audio file, piece title, and optional performance note. Sili will supply the recording later; do not substitute another performer's recording or publish a broken audio source.
- Until a recording is supplied, allow the silent playing animation and music collection, with a short indication that a personal recording is coming later. Do not show working playback controls for missing audio.
- Once the recording is available, activating the piano requests playback of that recording alongside the animation. If the browser does not permit playback after the walk-to-piano delay, show a clear Play control and begin sound only after that additional visitor action. Never play audio on page load.
- Provide an always-reachable, clearly labeled Sound on/off toggle while piano playback is active, accessible by keyboard and touch. Muting silences the recording while Sili continues playing. Remember the visitor's sound preference during the session and respect it on subsequent piano visits.
- Selecting another room destination stops the performance and recording before Sili walks away. Closing the music content view alone may leave Sili playing in the room; provide a Stop playing control for an explicit end to the performance.
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

### 3.5 Photo wall

Clicking the wall opens an intimate printed-photo collection. Photos can lift forward, overlap, or flip with scroll gestures within the collection. Provide previous/next buttons, keyboard controls, and swipe alternatives; do not capture scrolling globally.

Suggested launch collection: seven photos, adjustable after selection. Mix tennis, home coffee or cafés, piano/music, and meaningful everyday or travel moments. Use short captions explaining why each matters. Photos of Sili may appear inside the collection at his discretion; the initial introduction uses the cartoon character.

Sili has many photos but has not selected the public set. All real photos and captions remain pending. Include only photos Sili chooses for public sharing, with permission for identifiable companions where appropriate.

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
- Cats must not intercept clicks, cover reading overlays, block navigation, or physically trap Sili. They are ambient inhabitants, not additional required content destinations or controllable pets.
- Pause simulation while the page is inactive and suspend ambient movement while a content view is open. With reduced motion, show resting cats without roaming or animated jumps. Provide a discreet ambient-animation pause option.
- Required asset states: idle/sit, walk, groom, sleep, and window hop, with appropriate facing variants; additionally Viola needs exit/return states and Java needs window-watching and playful chase/pounce states. Share animation structure where practical while preserving each cat's appearance.

Source photos are private design references unless Sili separately selects them for publication. Production illustrations and animation assets remain to be created; supplying references does not mark those assets complete.

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
| Music enthusiast | Select piano → browse the three pieces | Discover listening/playing interests; no unavailable recording buttons appear |
| Returning friend | Select calendar → open a milestone | Find a selected life event and related content |
| Touch visitor | Tap espresso machine → content opens after brief movement → tap close icon | Complete the same journey without hover, dragging, or keyboard input |
| Keyboard or reduced-motion visitor | Focus an object control → activate → read → Escape | Access identical information with visible focus and minimal movement |

Example introduction for later copy review: “Hi, I'm Sili. I recently graduated from UW–Madison in Computer Science and Mathematics. Welcome to my little house.”

## 5. First-release scope and acceptance criteria

### Included

One room, cartoon Sili, click-to-walk, optional keyboard movement, six content destinations (music, coffee, technical work, photos, tennis, milestones), contact links, résumé access, and responsive accessible content views.

Also included: the illustrated Sili-and-Rachel wall portrait and two autonomous cats, Viola and Java, with basic calm behaviors and window departures/returns.

### Future possibilities

Personal piano recordings, richer character interactions, additional journal entries, seasonal room details, and optional object-drag gestures. Extra rooms, minigames, user accounts, and a public editing interface are outside the initial scope.

The piano interaction and configurable recording slot are part of the planned experience; the actual audio file remains a later content addition from Sili.

### Release checks

- All six destinations open and close with pointer, touch, and keyboard.
- The couple portrait appears on the wall and opens through the photo collection; its illustration uses the supplied likeness references.
- Viola and Java remain visually distinguishable and act independently. Viola leaves and returns via the window without teleporting; Java can watch for her from the sill and then resume indoor play.
- Cat movement never blocks object activation, reading, or character navigation; background activity pauses when hidden, and ambient motion can be paused.
- Direct object activation works without manual character positioning or puzzles.
- Contact links and résumé resolve to reviewed destinations; no placeholder URLs ship.
- All project descriptions, milestone dates, and music credits are checked against supplied content.
- No playback controls appear for missing recordings; audio never autoplays.
- Activating the piano sends Sili to the bench and starts the playing pose/animation. A supplied personal recording can accompany it; absent audio is handled without errors or substitute recordings.
- Sound can be turned off and back on during a performance, with the session preference respected. Stop playing, selecting another destination, and hiding the page stop or pause audio as specified above.
- Home scene fits the intended desktop viewport. On small screens, use an adapted composition with reachable objects rather than shrinking controls to illegible sizes; finalize this layout in a mobile prototype.
- Provide an accessible compact list of room destinations as an alternative way to explore.
- Focus is visible, controls have meaningful names, and text remains readable over textures.
- Reduced-motion preference removes walking delays and decorative motion without losing content.
- Keep decorative grain and lighting lightweight; load detailed media on demand. Verify responsiveness on a representative phone and desktop before release.
- Browser Back closes/restores content predictably, and technical entries support shareable URLs.

## 6. Content and assets still needed

| Item | Status |
| --- | --- |
| Cartoon portrait direction | Approved; full-body and animation assets still needed |
| Room concept | Selected; refine into production art and responsive layout |
| Sili and Rachel portrait | Couple and Rachel reference photos supplied; illustration pending |
| Viola and Java | Named photo references and personalities supplied; character art and animation pending |
| Public photo selection and captions | Pending; suggested starting set of seven |
| Coffee stories and actual equipment details | Pending |
| Project evidence, screenshots, links, and publication wording | Pending |
| Selected milestones and verified dates | Pending |
| Personal notes for the three music pieces | Optional, pending |
| Personal music recordings | Future; none currently available. Reserve a piano-performance audio slot, title, and optional note for Sili's own recording |
| GitHub, LinkedIn, preferred email, public résumé | Pending |

Reference documents: Sili_Li_Academic_Resume.pdf and Math Coursework - Sili Li.pdf, supplied by Sili from his Graduate Application folder. These inform content; they are not automatically public website assets.

No website code, deployment, or publication is included in this PRD stage.
