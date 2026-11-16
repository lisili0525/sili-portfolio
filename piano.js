// Supply Sili's own recording here later. Leave src empty until it exists.
const pianoRecording = { src: '', title: '', note: '' };

(() => {
  const sili = document.querySelector('#sili');
  const room = document.querySelector('.room');
  const panel = document.querySelector('#performance');
  const status = document.querySelector('#performance-status');
  const sound = document.querySelector('#sound');
  const resume = document.querySelector('#resume-recording');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const audio = pianoRecording.src ? new Audio(pianoRecording.src) : null;
  let state = 'idle';
  let timer;
  let pendingArrival = false;
  let muted = false;
  try { muted = sessionStorage.getItem('sili-muted') === 'true'; } catch {}
  if (audio) { audio.preload = 'none'; audio.muted = muted; }

  function pose(value) { sili.dataset.pose = value; }
  function update() {
    panel.hidden = !['walking', 'playing', 'paused'].includes(state);
    status.textContent = state === 'walking' ? 'On the way to the piano…' : state === 'paused' ? 'Performance paused' : audio ? [pianoRecording.title || 'At the piano', pianoRecording.note].filter(Boolean).join(' · ') : 'Playing quietly · recording coming later';
    sound.hidden = !audio;
    sound.textContent = muted ? 'Sound off' : 'Sound on';
    sound.setAttribute('aria-pressed', String(!muted));
  }
  async function playAudio() {
    if (!audio || state !== 'playing') return;
    try { await audio.play(); resume.hidden = true; }
    catch { if (state === 'playing') resume.hidden = false; }
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
    clearTimeout(timer);
    pendingArrival = false;
    state = 'seated';
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
    if (sili.classList.contains('at-piano') || motion.matches) { arrive(); return; }
    state = 'walking';
    pose('walk');
    sili.classList.add('walking', 'at-piano');
    update();
    timer = setTimeout(() => { sili.classList.remove('walking'); arrive(); }, 1100);
  }
  sound.addEventListener('click', () => {
    muted = !muted;
    if (audio) audio.muted = muted;
    try { sessionStorage.setItem('sili-muted', String(muted)); } catch {}
    update();
  });
  resume.addEventListener('click', () => {
    if (document.hidden) return;
    if (pendingArrival) { arrive(); sili.classList.remove('walking'); }
    else { state = 'playing'; pose(motion.matches ? 'seated' : 'playing'); update(); playAudio(); }
    resume.hidden = true;
  });
  document.querySelector('#stop-playing').addEventListener('click', stop);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden || !['walking', 'playing'].includes(state)) return;
    pendingArrival = state === 'walking';
    clearTimeout(timer);
    if (audio) audio.pause();
    state = 'paused';
    sili.classList.add('inactive');
    pose('seated');
    resume.textContent = audio ? 'Resume recording' : 'Resume playing';
    resume.hidden = false;
    update();
  });
  resume.addEventListener('click', () => sili.classList.remove('inactive'));
  motion.addEventListener('change', () => {
    if (state === 'walking' && motion.matches) { sili.classList.remove('walking'); arrive(); }
    else if (state === 'playing') pose(motion.matches ? 'seated' : 'playing');
  });
  if (audio) {
    audio.addEventListener('ended', stop);
    audio.addEventListener('error', () => { stop(); status.textContent = 'Recording unavailable'; });
  }
  window.siliPiano = {
    select, stop, hasRecording: Boolean(audio),
    attach: container => container.append(panel),
    detach: () => document.body.append(panel)
  };
})();
