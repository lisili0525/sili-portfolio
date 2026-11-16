// Add supplied recordings here; the list renders directly from this collection.
const pianoRecordings = [
  { src: 'assets/music/one-summers-day.m4a', title: 'One Summer’s Day', note: '' }
];

(() => {
  const sili = document.querySelector('#sili');
  const room = document.querySelector('.room');
  const panel = document.querySelector('#performance');
  const status = document.querySelector('#performance-status');
  const sound = document.querySelector('#sound');
  const resume = document.querySelector('#resume-recording');
  const toggle = document.querySelector('#music-toggle');
  const library = document.querySelector('#music-library');
  const trackList = document.querySelector('#music-tracks');
  const dialog = document.querySelector('#detail');
  const browseControls = document.querySelector('#music-browse-controls');
  const browseSound = document.querySelector('#browse-sound');
  const browseStop = document.querySelector('#browse-stop');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let selectedTrack = 0;
  const audio = pianoRecordings.length ? new Audio(pianoRecordings[0].src) : null;
  const trackButtons = [];
  let playRequest = 0, playbackBlocked = false, mediaError = false;
  let state = 'idle';
  let timer;
  let pendingArrival = false;
  let muted = false;
  try { muted = sessionStorage.getItem('sili-muted') === 'true'; } catch {}
  if (audio) { audio.preload = 'none'; audio.muted = muted; }

  function pose(value) { sili.dataset.pose = value; }
  const keepsPiano = () => Boolean(audio) && ['walking', 'playing', 'paused'].includes(state);
  function update() {
    const active = ['walking', 'playing'].includes(state);
    // Recording controls belong inside music content; the room gets one note.
    panel.hidden = !audio || !panel.closest('#detail-body');
    library.hidden = !audio || !['walking', 'playing', 'paused'].includes(state);
    browseControls.hidden = !keepsPiano() || !dialog.open || dialog.dataset.entry === 'music';
    if (keepsPiano()) dialog.classList.add('with-piano');
    else dialog.classList.remove('with-piano');
    const label = state === 'paused' ? 'Resume piano playing' : active ? 'Stop piano playing' : 'Start piano playing';
    toggle.setAttribute('aria-pressed', String(active));
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    const recording = pianoRecordings[selectedTrack];
    status.textContent = mediaError ? 'This recording could not be played. Select the piece to try again.' : state === 'walking' ? 'On the way to the piano…' : state === 'paused' ? 'Performance paused — select Resume to continue.' : playbackBlocked ? 'Select Play recording to hear the music.' : audio ? `${state === 'playing' ? 'Now playing' : 'Selected'} · ${recording.title}` : 'Playing quietly · recording coming later';
    resume.hidden = !audio || !(state === 'paused' || playbackBlocked);
    resume.textContent = state === 'paused' ? 'Resume recording' : 'Play recording';
    trackButtons.forEach((button, index) => button.setAttribute('aria-current', index === selectedTrack ? 'true' : 'false'));
    sound.hidden = !audio;
    sound.textContent = muted ? 'Sound off' : 'Sound on';
    sound.setAttribute('aria-pressed', String(!muted));
    browseSound.textContent = muted ? 'Sound off' : 'Sound on';
    browseSound.setAttribute('aria-pressed', String(!muted));
  }
  async function playAudio() {
    if (!audio || state !== 'playing') return;
    const request = ++playRequest;
    try {
      await audio.play();
      if (state !== 'playing') { audio.pause(); return; }
      if (request === playRequest) { playbackBlocked = false; update(); }
    } catch {
      if (state === 'playing' && request === playRequest) { playbackBlocked = true; update(); }
    }
  }
  function arrive() {
    clearTimeout(timer);
    pendingArrival = false;
    sili.classList.add('at-piano');
    pose(motion.matches ? 'seated' : 'playing');
    state = 'playing';
    update();
    playAudio();
  }
  function stop() {
    window.siliActions?.cancelPiano();
    clearTimeout(timer);
    pendingArrival = false;
    state = 'seated';
    playRequest++; playbackBlocked = false;
    pose(sili.classList.contains('at-piano') ? 'seated' : 'idle');
    sili.classList.remove('walking', 'inactive');
    if (audio) { audio.pause(); audio.currentTime = 0; }
    resume.hidden = true;
    update();
  }
  function select(key) {
    if (key !== 'music') {
      stop();
      room.classList.remove('piano-view');
      sili.classList.remove('at-piano');
      pose('idle');
      return;
    }
    room.classList.add('piano-view');
    if (['playing', 'walking', 'paused'].includes(state)) return;
    mediaError = false;
    if (window.siliActions) {
      state = 'walking';
      update();
      window.siliActions.walkPiano(arrive);
      return;
    }
    if (sili.classList.contains('at-piano') || motion.matches) { arrive(); return; }
    state = 'walking';
    pose('walk');
    sili.classList.add('walking', 'at-piano');
    update();
    timer = setTimeout(() => { sili.classList.remove('walking'); arrive(); }, 1100);
  }
  function toggleSound() {
    muted = !muted;
    if (audio) audio.muted = muted;
    try { sessionStorage.setItem('sili-muted', String(muted)); } catch {}
    update();
  }
  sound.addEventListener('click', toggleSound);
  browseSound.addEventListener('click', toggleSound);
  browseStop.addEventListener('click', stop);
  dialog.addEventListener('close', update);
  function resumePerformance() {
    if (document.hidden) return;
    mediaError = false; playbackBlocked = false;
    if (pendingArrival && window.siliActions) {
      pendingArrival = false; state = 'walking';
      window.siliActions.resumePiano(); update();
    }
    else if (pendingArrival) { arrive(); sili.classList.remove('walking'); }
    else { state = 'playing'; pose(motion.matches ? 'seated' : 'playing'); update(); playAudio(); }
    sili.classList.remove('inactive');
  }
  function chooseTrack(index) {
    if (document.hidden || !pianoRecordings[index]) return;
    playRequest++; mediaError = false; playbackBlocked = false;
    audio.pause();
    if (index !== selectedTrack) { selectedTrack = index; audio.src = pianoRecordings[index].src; }
    audio.currentTime = 0;
    if (state === 'paused') resumePerformance();
    else if (state === 'playing') { update(); playAudio(); }
    else if (state === 'walking') update();
    else if (window.siliActions) window.siliActions.select('music');
    else select('music');
  }
  pianoRecordings.forEach((recording, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'music-track';
    button.textContent = recording.title;
    button.setAttribute('aria-label', `Play ${recording.title}`);
    button.addEventListener('click', () => chooseTrack(index));
    item.append(button); trackList.append(item); trackButtons.push(button);
  });
  resume.addEventListener('click', resumePerformance);
  toggle.addEventListener('click', () => {
    if (document.hidden) return;
    if (state === 'paused') resumePerformance();
    else if (['walking', 'playing'].includes(state)) stop();
    else if (window.siliActions) window.siliActions.select('music');
    else select('music');
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden || !['walking', 'playing'].includes(state)) return;
    pendingArrival = state === 'walking';
    clearTimeout(timer);
    if (audio) audio.pause();
    playRequest++; playbackBlocked = false;
    state = 'paused';
    sili.classList.add('inactive');
    if (!pendingArrival || !window.siliActions) pose('seated');
    resume.textContent = audio ? 'Resume recording' : 'Resume playing';
    resume.hidden = false;
    update();
  });
  motion.addEventListener('change', () => {
    if (state === 'walking' && motion.matches && !window.siliActions) { sili.classList.remove('walking'); arrive(); }
    else if (state === 'playing') pose(motion.matches ? 'seated' : 'playing');
  });
  if (audio) {
    audio.addEventListener('ended', stop);
    audio.addEventListener('error', () => { mediaError = true; stop(); });
  }
  window.siliPiano = {
    get isPaused() { return state === 'paused'; },
    get isEngaged() { return ['walking', 'playing', 'paused'].includes(state); },
    get keepsPiano() { return keepsPiano(); },
    refresh: update,
    select, stop, hasRecording: Boolean(audio),
    attach: container => { container.append(panel); update(); },
    detach: () => { document.body.append(panel); update(); }
  };
  update();
})();
