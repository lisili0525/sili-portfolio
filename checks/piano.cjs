// Piano lifecycle with a controlled clock and media state; not browser/audio QA.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function element() {
  const classes = new Set();
  return { dataset: {}, events: {}, attributes: {}, hidden: false,
    classList: { add: (...names) => names.forEach(n => classes.add(n)),
      remove: (...names) => names.forEach(n => classes.delete(n)), contains: n => classes.has(n) },
    addEventListener(name, fn) { (this.events[name] ||= []).push(fn); },
    setAttribute(name,value) { this.attributes[name]=value; }, closest() { return null; }, append() {} };
}
const nodes = Object.fromEntries(['#sili','.room','#performance','#performance-status','#sound','#resume-recording','#music-toggle','#music-library','#music-tracks','#detail','#music-browse-controls','#browse-sound','#browse-stop'].map(id => [id, element()]));
const motion = { matches:false, addEventListener(name, fn) { this.change=fn; } };
const document = { hidden:false, body:element(), events:{}, querySelector:id=>nodes[id], addEventListener(name,fn) {this.events[name]=fn;} };
const window = {};
let arrival;
vm.runInNewContext(fs.readFileSync('piano.js','utf8').replace(/const pianoRecordings = \[[\s\S]*?\];/, 'const pianoRecordings = [];'), {
  window, document, matchMedia:()=>motion, sessionStorage:{getItem(){return null;}},
  setTimeout:fn=>{arrival=fn;return 1;}, clearTimeout:()=>{arrival=null;}
});
const click = id => nodes[id].events.click.forEach(fn=>fn());
window.siliPiano.select('music');
assert.equal(nodes['#sili'].dataset.pose,'walk');
arrival();
assert.equal(nodes['#sili'].dataset.pose,'playing');
assert.equal(nodes['#sound'].hidden,true,'no playback controls without recording');
motion.matches=true; motion.change();
assert.equal(nodes['#sili'].dataset.pose,'seated','reduced motion uses still frame');
motion.matches=false; motion.change();
assert.equal(nodes['#sili'].dataset.pose,'playing');
document.hidden=true; document.events.visibilitychange();
assert.equal(nodes['#sili'].dataset.pose,'seated');
document.hidden=false; click('#resume-recording');
assert.equal(nodes['#sili'].dataset.pose,'playing');
assert.equal(nodes['#sili'].classList.contains('inactive'),false);
window.siliPiano.stop();
assert.equal(nodes['#sili'].dataset.pose,'seated');
window.siliPiano.select('photos');
assert.equal(nodes['#sili'].dataset.pose,'idle');
assert.equal(nodes['#sili'].classList.contains('at-piano'),false);
window.siliPiano.select('music');
window.siliPiano.select('coffee');
assert.equal(arrival,null,'another destination cancels pending arrival');
click('#music-toggle');
assert.equal(nodes['#sili'].dataset.pose,'walk');
assert.equal(nodes['#music-toggle'].attributes['aria-pressed'],'true');
arrival();
click('#music-toggle');
assert.equal(nodes['#sili'].dataset.pose,'seated');
assert.equal(nodes['#music-toggle'].attributes['aria-pressed'],'false');
click('#music-toggle');
assert.equal(nodes['#sili'].dataset.pose,'playing');
document.hidden=true; document.events.visibilitychange();
assert.equal(nodes['#music-toggle'].attributes['aria-label'],'Resume piano playing');
document.hidden=false; click('#music-toggle');
assert.equal(nodes['#sili'].dataset.pose,'playing');
assert.equal(nodes['#performance'].hidden,true,'no performance bar over the room');
console.log('PASS: piano lifecycle, corner toggle start/stop/resume, state labels, no room bar.');
