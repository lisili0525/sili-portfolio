// Run with Node: node checks/cats.cjs. Uses a controlled clock, not a browser.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function element() {
  return { hidden: false, dataset: {}, style: { setProperty() {} },
    classList: { toggle() {}, remove() {} }, events: {},
    addEventListener(name, fn) { this.events[name] = fn; }, setAttribute() {} };
}
const nodes = Object.fromEntries(['#ambient', '#detail', '#viola', '#java', '#viola .cat', '#java .cat'].map(id => [id, element()]));
const motion = { matches: false, addEventListener(name, fn) { this.change = fn; } };
let callback;
let seed = 17;
const math = Object.create(Math);
math.random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const document = { hidden: false, querySelector: id => nodes[id] };
vm.runInNewContext(fs.readFileSync('cats.js', 'utf8'), {
  document, Math: math, matchMedia: () => motion,
  sessionStorage: { getItem() { return null; }, setItem() {} },
  requestAnimationFrame(fn) { callback = fn; }
});
let now = 0;
const spawnX = ['#viola .cat', '#java .cat'].map(id => parseFloat(nodes[id].style.left));
assert.ok(Math.abs(spawnX[0] - spawnX[1]) >= 14, 'initial cats must not overlap');
for (const x of spawnX) assert.ok(x >= 34 && x <= 66, 'spawn on clear foreground floor');
function advance(seconds) { for (let i = 0; i < seconds * 20; i++) { now += 50; callback(now); } }
function positions() { return ['#viola .cat', '#java .cat'].map(id => JSON.stringify(nodes[id].style)); }
advance(20);
const initial = positions();
nodes['#detail'].open = true;
advance(10);
assert.deepEqual(positions(), initial, 'content must freeze both cats');
nodes['#detail'].open = false;
document.hidden = true;
advance(10);
assert.deepEqual(positions(), initial, 'inactive page must freeze both cats');
document.hidden = false;
nodes['#ambient'].events.click();
advance(10);
assert.deepEqual(positions(), initial, 'manual pause must freeze both cats');
nodes['#ambient'].events.click();
let departures = 0, returns = 0, wasOutside = false, javaWatches = 0;
const foregroundFrames = [0, 0];
const poses = new Set();
for (let i = 0; i < 1200 * 20; i++) {
  advance(.05);
  const outside = nodes['#viola'].hidden;
  if (outside && !wasOutside) departures++;
  if (!outside && wasOutside) returns++;
  wasOutside = outside;
  assert.equal(nodes['#java'].hidden, false, 'Java stays indoors');
  if (nodes['#java .cat'].dataset.pose === 'watch') javaWatches++;
  for (const [index, id] of ['#viola .cat', '#java .cat'].entries()) {
    const el = nodes[id];
    poses.add(el.dataset.pose);
    assert.ok(parseFloat(el.style.left) >= 34 && parseFloat(el.style.left) <= 74);
    assert.ok(parseFloat(el.style.top) >= 18 && parseFloat(el.style.top) <= 86);
    if (!nodes[index ? '#java' : '#viola'].hidden && parseFloat(el.style.top) >= 80) foregroundFrames[index]++;
  }
}
assert.ok(departures >= 2 && returns >= 2, 'Viola repeats complete trips');
assert.ok(javaWatches > 0, 'Java has window-watching pauses');
for (const count of foregroundFrames) assert.ok(count / (1200 * 20) > .7, 'cats mostly stay in foreground');
for (const pose of ['walk', 'hop', 'groom', 'sleep', 'sit']) assert.ok(poses.has(pose));
motion.matches = true;
motion.change();
const resting = positions();
advance(20);
assert.deepEqual(positions(), resting, 'reduced motion stays still');
assert.equal(nodes['#viola'].hidden, false);
assert.equal(nodes['#ambient'].disabled, true);
console.log(`PASS: random separated spawns; foreground time ${foregroundFrames.map(n => Math.round(n / 240)).join('/')}%; ${departures} departures, ${returns} returns; pause, inactivity, reduced motion.`);
