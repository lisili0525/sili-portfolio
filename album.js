// Eight individual pages, displayed as four spreads. Add reviewed photos here.
const albumPages = Array.from({ length: 8 }, () => ({ title: '', caption: '' }));
albumPages[0] = { src: 'assets/album-festive-v1.png', alt: 'Cartoon of Sili and Rachel holding colorful paper dragons, in black, ivory and red festive clothing against a red backdrop.', title: '', caption: '' };
albumPages[1] = { src: 'assets/album-family-v2.png', alt: 'Cartoon family portrait: Rachel holds orange-tabby Java on the left, and Sili holds black-and-white Viola on the right, sitting together on a cozy couch.', title: '', caption: '' };
albumPages[2] = { src: 'assets/album-tennis-v1.png', alt: 'Cartoon tennis-court selfie of Sili in a navy hoodie and Rachel in a pale visor and blue jacket, with a red-stringed racket in the foreground.', title: '', caption: '' };
albumPages[3] = { src: 'assets/album-pier-v1.png', alt: 'Cartoon of Rachel in a cap and orange sunglasses beside Sili at a seaside railing, with a Ferris wheel and pier behind them.', title: '', caption: '' };
albumPages[4] = { src: 'assets/album-java-v1.png', alt: 'Cartoon of an orange tabby lying belly-up on beige carpet with curled paws and a clothes hanger beside her hind legs.', title: '', caption: '' };
albumPages[5] = { src: 'assets/album-viola-v1.png', alt: 'Cartoon of a black-and-white tuxedo cat lying on a wooden floor beside a yellow-green tennis ball and looking up.', title: '', caption: '' };
albumPages[6] = { src: 'assets/album-bench-press-v1.png', alt: 'Cartoon illustration of Sili bench pressing a barbell in a warmly lit gym, wearing a navy athletic shirt and gray trousers.', title: '', caption: '' };
albumPages[7] = { src: 'assets/album-hip-hop-v1.png', alt: 'Cartoon illustration of Rachel dancing hip-hop in a sunny studio, wearing a loose navy-and-cream shirt, sage joggers and cream sneakers.', title: '', caption: '' };

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
      picture.classList.add('album-filled');
      const img = document.createElement('img');
      img.src = data.src;
      img.alt = data.alt || data.title;
      picture.append(img);
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
  function positionSheet(sheet, progress, direction) {
    // A shallow lower-edge lift and changing shade soften the rigid hinge.
    sheet.style.transform = `rotateY(${-direction * progress * 180}deg) rotateX(${Math.sin(progress * Math.PI) * -3}deg)`;
    sheet.style.setProperty('--turn-shade', Math.sin(progress * Math.PI) * .25);
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
    drag = { start: event.clientX, direction, width: rect.width, progress: 0, started: false, pointerId: event.pointerId };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function pointerMove(event) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const distance = (drag.start - event.clientX) * drag.direction;
    if (!drag.started && distance > 8) {
      drag.started = true;
      if (!motion.matches) beginTurn(spread + drag.direction);
    }
    if (!drag.started) return;
    event.preventDefault();
    drag.progress = Math.max(0, Math.min(1, distance / (drag.width * .85)));
    const sheet = root.querySelector('.album-turn-sheet');
    if (sheet) positionSheet(sheet, drag.progress, drag.direction);
  }
  function pointerUp(event) {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (drag.started) {
      ignoreClickUntil = Date.now() + 350;
      if (motion.matches) { if (drag.progress > .3) turn(spread + drag.direction); }
      else settle(drag.progress > .3);
    }
    drag = null;
  }
  function pointerCancel(event) {
    if (drag && event.pointerId !== drag.pointerId) return;
    if (drag?.started && !motion.matches) settle(false);
    drag = null;
  }
  function wireDrag(target, direction) {
    target.addEventListener('pointerdown', event => pointerDown(event, direction));
    target.addEventListener('pointermove', pointerMove);
    target.addEventListener('pointerup', pointerUp);
    target.addEventListener('pointercancel', pointerCancel);
    target.addEventListener('lostpointercapture', pointerCancel);
  }
  function destroy() {
    clearTimeout(timer);
    // Keep the last fully revealed spread if the book closes mid-turn.
    pending = null;
    turning = false;
    cleanup();
    cleanup = () => {};
    root?.remove();
    root = null;
    drag = null;
    ignoreClickUntil = 0;
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
    wireDrag(next, 1);
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
    container.append(root);
    render();
  }
  motion.addEventListener('change', () => { if (motion.matches && turning) finish(); });
  window.siliAlbum = { mount, destroy };
})();
