// Controlled DOM/event simulation. This does not verify browser rendering.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
class Element {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase(); this.children = []; this.events = {};
    this.className = ''; this.attributes = {}; this.style = { setProperty() {} };
    this.classList = { add: value => { this.className += ` ${value}`; } };
  }
  append(...children) { children.forEach(child => { child.parent = this; this.children.push(child); }); }
  replaceChildren(...children) { this.children = []; this.append(...children); }
  replaceWith(child) { const p = this.parent; p.children[p.children.indexOf(this)] = child; child.parent = p; }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter(c => c !== this); }
  setAttribute(key, value) { this.attributes[key] = value; }
  addEventListener(key, fn) { (this.events[key] ||= []).push(fn); }
  removeEventListener(key, fn) { this.events[key] = this.events[key].filter(f => f !== fn); }
  closest() { return null; }
  getBoundingClientRect() { return { left: 0, width: 1000 }; }
  setPointerCapture() {}
  querySelector(selector) {
    for (const child of this.children) {
      if (selector[0] === '.' && child.className.split(' ').includes(selector.slice(1))) return child;
      if (selector[0] === '[' && selector.slice(1, -1) in child.attributes) return child;
      const nested = child.querySelector(selector); if (nested) return nested;
    }
    return null;
  }
  set innerHTML(value) {
    assert.ok(value.includes('album-stage'));
    const stage = new Element(); stage.className = 'album-stage';
    const book = new Element(); book.className = 'album-book'; stage.append(book);
    for (const direction of ['prev', 'next']) {
      const button = new Element('button'); button.setAttribute(`data-album-${direction}`, ''); stage.append(button);
    }
    const counter = new Element('p'); counter.className = 'album-counter'; this.append(stage, counter);
  }
}
const container = new Element();
const motion = { matches: false, addEventListener() {} };
const window = {};
let timer, now = 1000;
vm.runInNewContext(fs.readFileSync('album.js', 'utf8'), {
  document: { createElement: tag => new Element(tag) }, window,
  matchMedia: () => motion, setTimeout: fn => { timer = fn; return 1; },
  clearTimeout: () => { timer = null; }, Date: { now: () => now }
});
const flush = () => { const fn = timer; timer = null; fn?.(); now += 1000; };
const fire = (el, type, props = {}) => {
  if (type === 'click' && el.disabled) return;
  for (const fn of el.events[type] || []) fn({ target: el, currentTarget: el, button: 0, pointerId: 1, preventDefault() {}, ...props });
};
const find = selector => container.querySelector(selector);
const page = () => find('.album-book').children[0].attributes['aria-label'];
window.siliAlbum.mount(container);
assert.equal(page(), 'Page 1');
assert.equal(find('[data-album-prev]').disabled, true);
// Short drag returns, substantial drag turns, and synthetic click is suppressed.
let next = find('[data-album-next]');
fire(next, 'pointerdown', {clientX: 980}); fire(next, 'pointermove', {clientX: 900}); fire(next, 'pointerup'); flush();
assert.equal(page(), 'Page 1');
fire(next, 'pointerdown', {clientX: 980}); fire(next, 'pointermove', {clientX: 500});
assert.ok(find('.album-turn-sheet').style.transform.includes('rotateY(-101'));
fire(next, 'pointerup'); fire(next, 'click'); flush();
assert.equal(page(), 'Page 3');
// Pointer cancel returns to the current spread.
fire(next, 'pointerdown', {clientX: 980}); fire(next, 'pointermove', {clientX: 500}); fire(next, 'pointercancel'); flush();
assert.equal(page(), 'Page 3');
fire(container, 'keydown', {key:'ArrowRight'}); flush();
assert.equal(page(), 'Page 5');
fire(next, 'click'); flush(); assert.equal(page(), 'Page 7');
assert.equal(next.disabled, true);
fire(next, 'click'); flush(); assert.equal(page(), 'Page 7');
let prev = find('[data-album-prev]');
fire(prev, 'pointerdown', {clientX: 20}); fire(prev, 'pointermove', {clientX: 500}); fire(prev, 'pointerup'); flush();
assert.equal(page(), 'Page 5');
// Closing during an unfinished turn remembers the last fully revealed spread.
fire(prev, 'click'); window.siliAlbum.destroy(); window.siliAlbum.mount(container);
assert.equal(page(), 'Page 5');
motion.matches = true;
fire(find('[data-album-prev]'), 'click'); assert.equal(page(), 'Page 3');
window.siliAlbum.destroy(); window.siliAlbum.mount(container, true);
assert.equal(page(), 'Page 1');
assert.equal(container.events.keydown.length, 1, 'reopening cleans up keyboard handlers');
console.log('PASS: eight-page boundaries, forward/back drags, cancel, click suppression, keyboard, reduced motion, close/reopen.');
