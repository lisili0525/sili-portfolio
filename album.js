// Eight individual pages, displayed as four spreads. Add reviewed photos here.
const albumPages = [
  { kind: 'portrait', title: 'Rachel & me', caption: '' },
  ...Array.from({ length: 7 }, () => ({ title: '', caption: '' }))
];

(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let spread = 0;
  let root = null;
  let timer;
  let turning = false;
  let pending = null;
  let drag = null;
  let ignoreClickUntil = 0;
  let cleanup = () => {};

  function pageElement(index) {
    const data = albumPages[index];
    const page = document.createElement('article');
    page.className = 'album-page';
    page.setAttribute('aria-label', `Page ${index + 1}`);
    const picture = document.createElement('div');
    picture.className = 'album-photo-mount';
    if (data.src) {
      const img = document.createElement('img');
      img.src = data.src;
      img.alt = data.alt || data.title;
      picture.append(img);
    } else if (data.kind === 'portrait') {
      picture.classList.add('album-portrait');
      picture.setAttribute('role', 'img');
      picture.setAttribute('aria-label', 'The illustrated portrait of Rachel and Sili from the room wall');
    } else {
      picture.classList.add('album-empty');
      const note = document.createElement('span');
      note.textContent = '';
      picture.append(note);
    }
    const heading = document.createElement('h3');
    heading.textContent = data.title;
    const caption = document.createElement('p');
    caption.textContent = data.caption;
    const number = document.createElement('span');
    number.className = 'album-page-number';
    number.textContent = String(index + 1).padStart(2, '0');
    page.append(picture);
    if (data.title) page.append(heading);
    if (data.caption) page.append(caption);
    page.append(number);
    return page;
  }
  function updateControls() {
    root.querySelector('[data-album-prev]').disabled = spread === 0;
    root.querySelector('[data-album-next]').disabled = spread === 3;
    root.querySelector('.album-book').setAttribute('aria-busy', String(turning));
    root.querySelector('.album-counter').textContent = `Pages ${spread * 2 + 1}–${spread * 2 + 2} of 8`;
  }
  function render() {
    if (!root) return;
    const book = root.querySelector('.album-book');
    book.replaceChildren(pageElement(spread * 2), pageElement(spread * 2 + 1));
    updateControls();
  }
  function finish() {
    clearTimeout(timer);
    if (pending !== null) spread = pending;
    pending = null;
    turning = false;
    render();
  }
  function beginTurn(next) {
    if (!root || turning || next < 0 || next > 3 || next === spread) return null;
    turning = true;
    pending = next;
    const forward = next > spread;
    const book = root.querySelector('.album-book');
    const sheet = document.createElement('div');
    sheet.className = `album-turn-sheet ${forward ? 'turn-forward' : 'turn-back'}`;
    sheet.setAttribute('aria-hidden', 'true');
    const front = pageElement(forward ? spread * 2 + 1 : spread * 2);
    const back = pageElement(forward ? next * 2 : next * 2 + 1);
    front.classList.add('sheet-front');
    back.classList.add('sheet-back');
    sheet.append(front, back);
    if (forward) book.children[1].replaceWith(pageElement(next * 2 + 1));
    else book.children[0].replaceWith(pageElement(next * 2));
    book.append(sheet);
    updateControls();
    return sheet;
  }
  function settle(commit) {
    const sheet = root?.querySelector('.album-turn-sheet');
    if (!sheet) return;
    const forward = pending > spread;
    sheet.style.transition = motion.matches ? 'none' : 'transform 620ms cubic-bezier(.2,.65,.25,1)';
    sheet.style.transform = `rotateY(${commit ? (forward ? -180 : 180) : 0}deg)`;
    if (!commit) pending = null;
    if (motion.matches) finish();
    else timer = setTimeout(finish, 640);
  }
  function turn(next) {
    if (!root || turning || next < 0 || next > 3 || next === spread) return;
    if (motion.matches) { spread = next; render(); return; }
    const sheet = beginTurn(next);
    if (sheet) { sheet.getBoundingClientRect(); settle(true); }
  }
  function pointerDown(event, direction) {
    if (turning || (event.button !== undefined && event.button !== 0)) return;
    const book = root.querySelector('.album-book');
    const rect = book.getBoundingClientRect();
    direction ||= event.clientX < rect.left + rect.width / 2 ? -1 : 1;
    if (spread + direction < 0 || spread + direction > 3) return;
    drag = { start: event.clientX, direction, width: rect.width, progress: 0, started: false };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function pointerMove(event) {
    if (!drag) return;
    const distance = (drag.start - event.clientX) * drag.direction;
    if (!drag.started && distance > 8) {
      drag.started = true;
      if (!motion.matches) beginTurn(spread + drag.direction);
    }
    if (!drag.started) return;
    event.preventDefault();
    drag.progress = Math.max(0, Math.min(1, distance / (drag.width * .65)));
    const sheet = root.querySelector('.album-turn-sheet');
    if (sheet) sheet.style.transform = `rotateY(${-drag.direction * drag.progress * 180}deg)`;
  }
  function pointerUp() {
    if (!drag) return;
    if (drag.started) {
      ignoreClickUntil = Date.now() + 350;
      if (motion.matches) { if (drag.progress > .16) turn(spread + drag.direction); }
      else settle(drag.progress > .16);
    }
    drag = null;
  }
  function pointerCancel() {
    if (drag?.started && !motion.matches) settle(false);
    drag = null;
  }
  function wireDrag(target, direction) {
    target.addEventListener('pointerdown', event => pointerDown(event, direction));
    target.addEventListener('pointermove', pointerMove);
    target.addEventListener('pointerup', pointerUp);
    target.addEventListener('pointercancel', pointerCancel);
  }  function destroy() {
    clearTimeout(timer);
    if (pending !== null) spread = pending;
    pending = null;
    turning = false;
    cleanup();
    cleanup = () => {};
    root?.remove();
    root = null;
    drag = null;
  }
  function mount(container, firstPage = false) {
    destroy();
    if (firstPage) spread = 0;
    root = document.createElement('section');
    root.className = 'photo-album';
    root.setAttribute('aria-label', 'Eight-page photo album');
    root.innerHTML = `<div class="album-stage"><div class="album-book"></div><button type="button" class="album-corner corner-prev" data-album-prev aria-label="Turn to the previous two pages"><span class="sr-only">Previous pages</span></button><button type="button" class="album-corner corner-next" data-album-next aria-label="Turn to the next two pages"><span class="sr-only">Next pages</span></button></div><p class="album-counter sr-only" role="status" aria-live="polite"></p>`;
    const previous = root.querySelector('[data-album-prev]');
    const next = root.querySelector('[data-album-next]');
    previous.addEventListener('click', () => { if (Date.now() >= ignoreClickUntil) turn(spread - 1); });
    next.addEventListener('click', () => { if (Date.now() >= ignoreClickUntil) turn(spread + 1); });
    wireDrag(previous, -1);
    wireDrag(next, 1);    const keydown = event => {
      if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        turn(spread + (event.key === 'ArrowRight' ? 1 : -1));
      }
    };
    const keyboardScope = container.closest('dialog') || container;
    keyboardScope.addEventListener('keydown', keydown);
    cleanup = () => keyboardScope.removeEventListener('keydown', keydown);
    wireDrag(root.querySelector('.album-book'));
    container.append(root);
    render();
  }
  motion.addEventListener('change', () => { if (motion.matches && turning) finish(); });
  window.siliAlbum = { mount, destroy };
})();
