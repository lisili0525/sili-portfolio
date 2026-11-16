// Interruptible room journeys. Coordinates describe Sili's feet in room percent.
export function createJourneyController(root, services) {
  const sili = root.querySelector('#sili');
  const room = root.querySelector('.room');
  const mug = root.querySelector('#station-cup');
  const status = root.querySelector('#journey-status');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let x = 48.5, y = 84, activity = '', ready = false;
  let heldCup = false, heldBook = false, queue = [], current = null, resolveSelection = null;
  let previous, elapsed = 0, generation = 0;
  const random = (a, b) => a + Math.random() * (b - a);
  const pose = (group, frame, duration, extra = {}) => ({ group, frame, duration, ...extra });
  const walk = (px, py) => ({ x: px, y: py, duration: Math.max(.35, Math.hypot(px - x, py - y) / 22), walking: true });
  const cup = held => { heldCup = held; mug.hidden = held; };
  const book = held => { heldBook = held; room.classList.toggle('album-lifted', held); };

  function camera(px) {
    const width = room.getBoundingClientRect().width;
    const margin = Math.min(50, innerWidth / width * 50);
    room.style.setProperty('--room-focus', `${Math.max(margin, Math.min(100 - margin, px))}%`);
  }
  function position() {
    room.classList.toggle('near-album', y > 89 && x > 39 && x < 65);
    // Grow toward the foreground table, anchored at the feet. Keep the desk's
    // separately calibrated chair position and scale outside this central lane.
    const foreground = Math.max(0, Math.min(1, (y - 84) / 10));
    const tableLane = Math.max(0, Math.min(1, (x - 35) / 8, (69 - x) / 8));
    const depthScale = 1 + .18 * foreground * tableLane;
    const height = (sili.classList.contains('is-activity') ? 58.4 : 58) * depthScale;
    const bottomPadding = sili.classList.contains('is-activity') ? 26 / 576 : .10;
    sili.style.left = `${x}%`;
    sili.style.height = `${height}%`;
    sili.style.bottom = `${100 - y - height * bottomPadding}%`;
  }
  function visual(group, frame = 0) {
    // The active coffee atlas contains only brew A/B, lean and sip.
    if (group === 'coffee' && ![0, 1, 2, 3].includes(frame)) frame = 0;
    sili.classList.remove('at-piano', 'walking', 'inactive');
    sili.classList.toggle('is-activity', Boolean(group));
    sili.dataset.pose = group ? 'activity' : 'idle';
    sili.dataset.activity = group || '';
    sili.dataset.deskMode = group === 'desk' && (frame === 3 || frame === 4) ? 'writing' : 'computer';
    sili.style.setProperty('--activity-frame', frame);
    position();
  }
  function cancel() {
    generation++;
    queue = []; current = null;
    resolveSelection?.(false); resolveSelection = null;
  }
  function arrived() {
    ready = true;
    status.textContent = '';
    resolveSelection?.(true); resolveSelection = null;
  }
  function begin(action) {
    current = action; elapsed = 0;
    action.fromX = x; action.fromY = y;
    if (action.walking) {
      action.duration = Math.max(.35, Math.hypot(action.x - x, action.y - y) / 22);
      visual(null);
      sili.dataset.pose = 'walk';
      sili.style.setProperty('--walk-facing', action.x < x ? -1 : 1);
      camera(action.x);
    } else if (action.group) visual(action.group, action.frame);
    action.start?.();
  }
  function idleCycle() {
    if (!ready || motion.matches) return;
    if (activity === 'coffee') queue.push(pose('coffee', 2, random(12, 24)), pose('coffee', 3, 1.3), pose('coffee', 2, 1));
    if (activity === 'notebook') {
      queue.push(pose('desk', 1, random(8, 14)), pose('desk', 3, random(4, 7)), pose('desk', 0, random(2, 4)));
    }
  }
  function route(key, options = {}) {
    services.piano.select(key);
    room.classList.remove('piano-view');
    if (key === 'music') { camera(13.2); return; }
    visual(null);
    if (y > 89) queue.push(walk(x, 84));
    const finish = { duration: 0, end: arrived };
    if (key === 'coffee') {
      queue.push(walk(38.5, 84.4),
        pose('coffee', 0, 1.2), pose('coffee', 1, .7), pose('coffee', 0, .65), pose('coffee', 1, .8),
        pose('coffee', 2, .6, { start: () => cup(true) }), finish);
    } else if (key === 'notebook') {
      queue.push(walk(69, 84), walk(81.4593, 90.1027), pose('desk', 0, .5), pose('desk', 1, .5), finish);
    } else if (key === 'photos') {
      queue.push(walk(53, 84), walk(53, 96), pose('interactions', 0, .65),
        pose('interactions', 1, .6, { start: () => book(true) }), pose('interactions', 2, .35), finish);
    } else {
      const targets = { milestones: [43, 80, 5], tennis: [58, 84, 3], cats: [62, 84, 4] };
      let [px, py, frame] = targets[key] || [48.5, 84, 5];
      if (key === 'cats') {
        const cats = [...root.querySelectorAll('.cat-layer:not([hidden]):not(.perched) .cat')];
        const nearby = options.cat ? cats.find(cat => cat.dataset.cat === options.cat) : cats.sort((a, b) => Math.abs(parseFloat(a.style.left) - x) - Math.abs(parseFloat(b.style.left) - x))[0];
        if (nearby) { px = Math.max(26, parseFloat(nearby.style.left) - 8); py = parseFloat(nearby.style.top) + 1; }
        else { px = 65; py = 84; frame = 5; }
      }
      queue.push(walk(px, py), pose('interactions', frame, .4), finish);
    }
  }
  function select(key, options = {}) {
    // Browsing is independent of an active recording performance. Returning a
    // successful selection also lets the album open without a physical pickup.
    if (key !== 'music' && services.piano.keepsPiano) return Promise.resolve(true);
    if (key === activity && ((ready && !(key === 'cats' && options.cat)) || (key === 'music' && services.piano.isEngaged))) return Promise.resolve(true);
    const previousActivity = activity;
    cancel(); ready = false; activity = key;
    room.dataset.activity = key;
    status.textContent = key === 'photos' ? 'Sili is picking up the photo album. Press Escape to cancel.' : '';
    const result = new Promise(resolve => { resolveSelection = resolve; });
    // Return the cup at the counter using the existing rear pose. The discarded
    // cup-placement frame has an unnatural head angle and must not be shown.
    if (heldCup) queue.push(pose('coffee', 0, .4, { start: () => cup(false) }));
    if (heldBook) queue.push(pose('interactions', 1, .45, { end: () => book(false) }));
    if (previousActivity === 'notebook') queue.push(pose('desk', 0, .35));
    queue.push({ duration: 0, end: () => route(key, options) });
    if (motion.matches) drain();
    return result;
  }
  function walkPiano(onArrival) {
    if (y > 89) queue.push(walk(x, 84));
    if (!sili.classList.contains('at-piano')) queue.push(walk(13.2, 84));
    queue.push({ duration: 0, end: () => {
      sili.style.left = ''; sili.style.bottom = ''; sili.style.height = '';
      sili.classList.remove('is-activity');
      x = 13.2; y = 82.3;
      onArrival(); arrived();
    } });
    if (motion.matches) drain();
  }
  function complete() {
    const action = current; current = null;
    if (action.x !== undefined) { x = action.x; y = action.y; position(); }
    action.end?.();
  }
  function drain() {
    // Only finite arrival/cleanup sequences run here; idle loops stay still.
    let safety = 0;
    while ((current || queue.length) && safety++ < 80) {
      if (!current) begin(queue.shift());
      complete();
    }
    if (activity === 'coffee' && ready) visual('coffee', 2);
    if (activity === 'notebook' && ready) visual('desk', 0);
  }
  let frameId;
  let disposed = false;
  const abort = new AbortController();
  let runningFrame = false;
  function frame(now) {
    const dt = previous === undefined ? 0 : Math.min((now - previous) / 1000, .05);
    previous = now;
    if (!document.hidden && !(activity === 'music' && services.piano.isPaused)) {
      if (!current && !queue.length) idleCycle();
      if (!current && queue.length) begin(queue.shift());
      if (current) {
        elapsed += dt;
        if (current.walking) {
          const p = motion.matches ? 1 : Math.min(1, elapsed / current.duration);
          x = current.fromX + (current.x - current.fromX) * p;
          y = current.fromY + (current.y - current.fromY) * p;
          position();
        }
        if (motion.matches || elapsed >= current.duration) complete();
      }
    }
    if (!disposed) frameId = requestAnimationFrame(frame);
  }
  motion.addEventListener('change', () => {
    if (motion.matches) { if (ready) { queue = []; current = null; } drain(); }
  }, { signal: abort.signal });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activity === 'photos' && !ready) {
      cancel(); activity = ''; book(false); visual(null); status.textContent = '';
    }
  }, { signal: abort.signal });
  const api = {
    select, walkPiano,
    resumePiano: () => {
      if (current?.walking) { visual(null); sili.dataset.pose = 'walk'; }
    },
    cancelPiano: () => { if (activity === 'music') { cancel(); ready = false; } },
    closeAlbum: () => {
      if (activity !== 'photos') return;
      cancel(); ready = false;
      queue.push(pose('interactions', 1, .4), pose('interactions', 0, .45),
        { duration: 0, end: () => { book(false); visual(null); activity = ''; } });
      if (motion.matches) drain();
    },
    get activity() { return activity; }
  };
  // One continuous clock avoids timer bursts after an inactive tab returns.
  if (!runningFrame) { runningFrame = true; frameId = requestAnimationFrame(frame); }
  return { ...api, get activity() { return activity; }, destroy() { disposed = true; cancelAnimationFrame(frameId); abort.abort(); cancel(); } };
}
