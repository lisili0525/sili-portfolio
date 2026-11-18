export const recordings = [{src:'assets/music/one-summers-day.m4a', title:'One Summer’s Day'}];

export function createPianoController(root, services, onChange) {
  const sili = root.querySelector('#sili');
  const room = root.querySelector('.room');
  const abort = new AbortController();
  const audio = new Audio(recordings[0].src);
  audio.preload = 'none';
  let state = 'idle', selectedTrack = 0, muted = false;
  let playbackBlocked = false, mediaError = false, pendingArrival = false;
  let playRequest = 0, disposed = false, hasPausedProgress = false;
  try { muted = sessionStorage.getItem('sili-muted') === 'true'; } catch { /* Storage is optional. */ }
  audio.muted = muted;
  const pose = value => { sili.dataset.pose = value; };
  const engaged = () => ['walking','playing','paused'].includes(state);
  function update() {
    if (disposed) return;
    onChange({state, selectedTrack, muted, playbackBlocked, mediaError, hasPausedProgress, atPiano:sili.classList.contains('at-piano'), engaged:engaged(),
      status:mediaError ? 'This recording could not be played. Select the piece to try again.'
        : state === 'walking' ? 'On the way to the piano…'
        : ['paused','saved'].includes(state) ? 'Paused — continue where you left off or start over.'
        : playbackBlocked ? 'Select Play to hear the music.'
        : `${state === 'playing' ? 'Now playing' : 'Selected'} · ${recordings[selectedTrack].title}`});
  }
  async function playAudio() {
    if (disposed || state !== 'playing') return;
    const request = ++playRequest;
    try {
      await audio.play();
      if (disposed || state !== 'playing') { audio.pause(); return; }
      if (request === playRequest) { playbackBlocked = false; update(); }
    } catch {
      if (!disposed && state === 'playing' && request === playRequest) { playbackBlocked = true; update(); }
    }
  }
  function arrive() {
    if (disposed) return;
    pendingArrival = false;
    sili.classList.add('at-piano');
    if (hasPausedProgress) {
      state = 'paused'; pose('seated'); sili.classList.add('inactive'); update();
    } else {
      // Reduced motion freezes the playing frame in CSS; it must not select
      // the hands-in-lap resting drawing while audio is still playing.
      pose('playing');
      state = 'playing'; update(); void playAudio();
    }
  }
  function stop() {
    services.actions?.cancelPiano();
    hasPausedProgress = false; pendingArrival = false; state = 'seated'; playRequest++; playbackBlocked = false;
    pose(sili.classList.contains('at-piano') ? 'seated' : 'idle');
    sili.classList.remove('walking', 'inactive');
    audio.pause(); audio.currentTime = 0; update();
  }
  function select(key) {
    if (key !== 'music') {
      if (hasPausedProgress) saveProgress(); else stop();
      room.classList.remove('piano-view'); sili.classList.remove('at-piano'); pose('idle'); return;
    }
    room.classList.add('piano-view');
    if (engaged()) return;
    mediaError = false; state = 'walking'; update(); services.actions.walkPiano(arrive);
  }
  function saveProgress() {
    pendingArrival = false; state = 'saved'; playRequest++; playbackBlocked = false;
    audio.pause(); sili.classList.remove('at-piano','walking','inactive');
    room.classList.remove('piano-view'); update();
  }
  function pause() {
    if (!['walking','playing'].includes(state)) return;
    hasPausedProgress = true; pendingArrival = state === 'walking';
    audio.pause(); playRequest++; playbackBlocked = false;
    state = 'paused';
    if (sili.classList.contains('at-piano')) pose('seated');
    sili.classList.add('inactive'); update();
  }
  function resume() {
    if (document.hidden) return;
    hasPausedProgress = false; mediaError = false; playbackBlocked = false;
    if (pendingArrival) { pendingArrival = false; state = 'walking'; services.actions.resumePiano(); update(); }
    else { state = 'playing'; pose('playing'); update(); void playAudio(); }
    sili.classList.remove('inactive');
  }
  function chooseTrack(index) {
    if (document.hidden || !recordings[index]) return;
    hasPausedProgress = false; playRequest++; mediaError = false; playbackBlocked = false; audio.pause();
    if (index !== selectedTrack) { selectedTrack = index; audio.src = recordings[index].src; }
    audio.currentTime = 0;
    if (state === 'paused') resume();
    else if (state === 'playing') { update(); void playAudio(); }
    else if (state === 'walking') update();
    else services.actions.select('music');
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pause();
  }, {signal:abort.signal});
  audio.addEventListener('ended', stop, {signal:abort.signal});
  audio.addEventListener('error', () => { mediaError = true; stop(); }, {signal:abort.signal});
  update();
  return {
    get isPaused() { return state === 'paused'; },
    get isEngaged() { return engaged(); },
    get keepsPiano() { return state === 'playing' || (state === 'walking' && !hasPausedProgress); },
    select, stop, chooseTrack, resume, pause,
    restart() { chooseTrack(selectedTrack); },
    cancelApproach() { if (hasPausedProgress) saveProgress(); else stop(); },
    togglePlayback() {
      if (document.hidden) return;
      if (state === 'paused' || playbackBlocked) resume();
      else if (engaged()) pause();
      else chooseTrack(selectedTrack);
    },
    toggleSound() { muted = !muted; audio.muted = muted; try { sessionStorage.setItem('sili-muted',String(muted)); } catch { /* Storage is optional. */ } update(); },
    destroy() { disposed = true; playRequest++; abort.abort(); audio.pause(); audio.removeAttribute('src'); audio.load(); }
  };
}
