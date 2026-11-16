// Room coordinates are percentages, measured at each cat's paws.
(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector('#ambient');
  const dialog = document.querySelector('#detail');
  const random = (min, max) => min + Math.random() * (max - min);
  const rest = (pose, min, max = min) => ({ pose, duration: random(min, max) });
  const move = (x, y, duration, pose = 'walk', arc = 0, portal = false) =>
    ({ x, y, duration, pose, arc, portal });
  // Clear foreground floor, below the cabinets and tennis equipment.
  const floorSpot = () => ({ x: random(34, 66), y: random(83, 86) });
  const firstSpawn = floorSpot();
  const secondSpawn = {
    x: firstSpawn.x < 50 ? random(firstSpawn.x + 14, 66) : random(34, firstSpawn.x - 14),
    y: random(83, 86)
  };
  const spawns = [firstSpawn, secondSpawn];
  let paused = false;
  try { paused = sessionStorage.getItem('sili-ambient-paused') === 'true'; } catch {}
  const cats = ['viola', 'java'].map((name, i) => ({
    name, layer: document.querySelector(`#${name}`),
    el: document.querySelector(`#${name} .cat`),
    x: spawns[i].x, y: spawns[i].y, home: spawns[i], facing: Math.random() < .5 ? -1 : 1,
    queue: [], action: null, elapsed: 0, outside: false,
    delay: random(4, 18)
  }));

  function plan(cat) {
    const spot = floorSpot();
    if (cat.name === 'viola') {
      // Floor -> stool seat -> sill -> visible opening. Return by the same route.
      // Long foreground rests make window trips an occasional excursion.
      return [rest('sit', 35, 55), move(spot.x, spot.y, 4),
        rest('groom', 10, 18), rest('sleep', 80, 120), rest('sit', 25, 45),
        move(65, 84, 4),
        move(68.5, 65, 1, 'hop', 5), rest('sit', 3, 6),
        move(67, 48, 1, 'hop', 4), rest('sit', 8, 16),
        move(69, 18, 1.6, 'hop', 0, true),
        { ...rest('sleep', 30, 65), outside: true },
        move(67, 48, 1.6, 'hop', 0, true), rest('sit', 5, 12),
        move(68.5, 65, 1, 'hop', 4), move(65, 84, 1, 'hop', 3),
        move(cat.home.x, cat.home.y, 4), rest('groom', 8, 15), rest('sleep', 45, 70)];
    }
    if (cats[0].outside) {
      return [rest('sit', 2, 5), move(65, 84, 3), move(68.5, 65, 1, 'hop', 5),
        rest('sit', 3, 5), move(73, 48, 1.2, 'hop', 5),
        rest('watch', 30, 55), move(68.5, 65, 1.1, 'hop', 4),
        move(65, 84, 1, 'hop', 3), move(spot.x, spot.y, 3),
        rest('groom', 6, 12), rest('sleep', 45, 70)];
    }
    // The little mouse in the room is Java's dedicated toy; no tennis balls.
    return [rest('sit', 12, 25), move(65, 84, 2.8),
      move(67, 84, .65, 'hop', 3), rest('sit', 2, 4),
      move(60, 85, 1.5), move(65, 84, 1.2),
      move(67, 84, .6, 'hop', 3), rest('groom', 7, 12),
      move(spot.x, spot.y, 3.5), rest('sleep', 35, 60)];
  }

  function start(cat) {
    if (!cat.queue.length) cat.queue = plan(cat);
    cat.action = cat.queue.shift();
    cat.elapsed = 0;
    cat.fromX = cat.x;
    cat.fromY = cat.y;
    const a = cat.action;
    cat.outside = Boolean(a.outside);
    cat.layer.hidden = cat.outside;
    cat.layer.classList.toggle('at-window', Boolean(a.portal));
    if (a.x !== undefined) cat.facing = a.x < cat.x ? -1 : 1;
    cat.el.dataset.pose = a.pose;
    if (cat.name === 'viola' && a.outside && cats[1].y >= 80) {
      // Let Java notice a departure instead of sleeping through every trip.
      const java = cats[1];
      java.queue = [];
      if (java.action?.x === undefined) java.action = null;
    }
  }

  function paint(cat) {
    cat.layer.classList.toggle('perched', cat.y < 77);
    cat.el.style.left = `${cat.x}%`;
    cat.el.style.top = `${cat.y}%`;
    cat.el.style.setProperty('--facing', cat.facing === -1 ? 1 : -1);
  }

  function tick(cat, dt) {
    if (cat.delay > 0) { cat.delay -= dt; return; }
    if (!cat.action) start(cat);
    const a = cat.action;
    cat.elapsed = Math.min(a.duration, cat.elapsed + dt);
    const p = cat.elapsed / a.duration;
    if (a.x !== undefined) {
      const eased = a.pose === 'hop' ? p * p * (3 - 2 * p) : p;
      cat.x = cat.fromX + (a.x - cat.fromX) * eased;
      cat.y = cat.fromY + (a.y - cat.fromY) * eased - Math.sin(p * Math.PI) * a.arc;
      if (a.pose === 'walk') cat.el.style.setProperty('--frame', Math.floor(cat.elapsed * 6) % 2 + 1);
    }
    paint(cat);
    if (p === 1) cat.action = null;
  }

  function update() {
    button.textContent = paused ? 'Resume cats' : 'Pause cats';
    button.setAttribute('aria-pressed', String(paused));
    button.disabled = motion.matches;
    button.title = motion.matches ? 'Cats are resting with reduced motion enabled' : 'Pause or resume ambient cat movement';
    if (motion.matches) {
      cats.forEach((cat, i) => {
        cat.queue = []; cat.action = null; cat.outside = false;
        cat.x = cat.home.x; cat.y = cat.home.y;
        cat.layer.hidden = false; cat.layer.classList.remove('at-window');
        cat.el.dataset.pose = i ? 'sleep' : 'sit'; paint(cat);
      });
    }
  }
  button.addEventListener('click', () => {
    paused = !paused;
    try { sessionStorage.setItem('sili-ambient-paused', String(paused)); } catch {}
    update();
  });
  motion.addEventListener('change', update);
  let previous;
  function frame(now) {
    const dt = previous === undefined ? 0 : Math.min((now - previous) / 1000, .05);
    previous = now;
    if (!paused && !motion.matches && !document.hidden && !dialog.open) cats.forEach(cat => tick(cat, dt));
    requestAnimationFrame(frame);
  }
  cats.forEach(cat => { cat.el.dataset.pose = 'sit'; paint(cat); });
  update();
  requestAnimationFrame(frame);
})();
