// Eight individual pages, displayed as four spreads. Add reviewed photos here.
const albumPages = [
  { kind: 'portrait', title: 'Rachel & me', caption: 'A little portrait of us.' },
  ...Array.from({ length: 7 }, () => ({ title: 'A memory to keep', caption: 'A favorite photograph will find its place here.' }))
];

(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let spread = 0;
  let root = null;
  let timer;
  let turning = false;
  let pending = null;
  let touchStart = null;
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
      note.textContent = 'A moment, someday';
      picture.append(note);
    }
    const heading = document.createElement('h3');
    heading.textContent = data.title;
    const caption = document.createElement('p');
    caption.textContent = data.caption;
    const number = document.createElement('span');
    number.className = 'album-page-number';
    number.textContent = String(index + 1).padStart(2, '0');
    page.append(picture, heading, caption, number);
    return page;
  }
  function updateControls() {
    root.querySelector('[data-album-prev]').disabled = spread === 0;
    root.querySelector('[data-album-next]').disabled = spread === 3;
    root.querySelector('.album-book').setAttribute('aria-busy', String(turning));
    root.querySelector('.album-counter').textContent = `Pages ${spread * 2 + 1}–${spread * 2 + 2} of 8`;
    root.querySelectorAll('[data-album-spread]').forEach((button, index) => {
      button.setAttribute('aria-current', index === spread ? 'true' : 'false');
      button.setAttribute('aria-disabled', String(turning));
    });
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
  function turn(next) {
    if (!root || turning || next < 0 || next > 3 || next === spread) return;
    if (motion.matches || Math.abs(next - spread) > 1) { spread = next; render(); return; }
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
    timer = setTimeout(finish, 580);
  }
  function destroy() {
    clearTimeout(timer);
    if (pending !== null) spread = pending;
    pending = null;
    turning = false;
    cleanup();
    cleanup = () => {};
    root?.remove();
    root = null;
    touchStart = null;
  }
  function mount(container, firstPage = false) {
    destroy();
    if (firstPage) spread = 0;
    root = document.createElement('section');
    root.className = 'photo-album';
    root.setAttribute('aria-label', 'Eight-page photo album');
    root.innerHTML = `<p class="album-intro">A few pages for the people and moments I want to remember.</p><div class="album-book"></div><div class="album-navigation"><button type="button" data-album-prev aria-label="Previous two pages">← <span>Previous</span></button><p class="album-counter" role="status" aria-live="polite"></p><button type="button" data-album-next aria-label="Next two pages"><span>Next</span> →</button></div><nav class="album-spreads" aria-label="Album spreads"></nav>`;
    const spreads = root.querySelector('.album-spreads');
    for (let i = 0; i < 4; i++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.albumSpread = String(i);
      button.setAttribute('aria-label', `Open pages ${i * 2 + 1} and ${i * 2 + 2}`);
      button.textContent = `${i * 2 + 1}–${i * 2 + 2}`;
      button.addEventListener('click', () => turn(i));
      spreads.append(button);
    }
    root.querySelector('[data-album-prev]').addEventListener('click', () => turn(spread - 1));
    root.querySelector('[data-album-next]').addEventListener('click', () => turn(spread + 1));
    const keydown = event => {
      if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        turn(spread + (event.key === 'ArrowRight' ? 1 : -1));
      }
    };
    const keyboardScope = container.closest('dialog') || container;
    keyboardScope.addEventListener('keydown', keydown);
    cleanup = () => keyboardScope.removeEventListener('keydown', keydown);
    const book = root.querySelector('.album-book');
    book.addEventListener('pointerdown', event => {
      touchStart = { x: event.clientX, y: event.clientY };
      if (event.pointerType === 'touch') book.setPointerCapture(event.pointerId);
    });
    book.addEventListener('pointerup', event => {
      if (!touchStart) return;
      const dx = event.clientX - touchStart.x;
      const dy = event.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) turn(spread + (dx < 0 ? 1 : -1));
    });
    book.addEventListener('pointercancel', () => { touchStart = null; });
    container.append(root);
    render();
  }
  motion.addEventListener('change', () => { if (motion.matches && turning) finish(); });
  window.siliAlbum = { mount, destroy };
})();
