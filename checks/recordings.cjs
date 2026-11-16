// Controlled media promises and DOM. This does not decode audio or test a browser.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function element() {
  const classes = new Set();
  return {dataset:{},attributes:{},events:{},children:[],hidden:false,
    classList:{add:(...v)=>v.forEach(n=>classes.add(n)),remove:(...v)=>v.forEach(n=>classes.delete(n)),contains:n=>classes.has(n)},
    append(child){child.parent=this;this.children.push(child);},closest(){return this.inMusic ? {} : null;},
    setAttribute(n,v){this.attributes[n]=v;},addEventListener(n,fn){(this.events[n] ||= []).push(fn);}};
}
const nodes=Object.fromEntries(['#sili','.room','#performance','#performance-status','#sound','#resume-recording','#music-toggle','#music-library','#music-tracks','#detail','#music-browse-controls','#browse-sound','#browse-stop'].map(id=>[id,element()]));
const doc={hidden:false,body:element(),events:{},querySelector:id=>nodes[id],createElement:element,addEventListener(n,fn){(this.events[n] ||= []).push(fn);}};
const window={};
const motion={matches:false,addEventListener(n,fn){this.change=fn;}};
let timer, audio;
class Media {
  constructor(src){audio=this;this.src=src;this.events={};this.currentTime=0;this.plays=0;this.paused=true;}
  addEventListener(n,fn){this.events[n]=fn;}
  pause(){this.paused=true;}
  play(){this.plays++;this.paused=false;return this.reject ? Promise.reject(Error('blocked')) : this.deferred || Promise.resolve();}
}
const source=fs.readFileSync('piano.js','utf8');
vm.runInNewContext(source,{window,document:doc,Audio:Media,matchMedia:()=>motion,sessionStorage:{getItem(){return null;},setItem(){}},setTimeout(fn){timer=fn;return 1;},clearTimeout(){timer=null;}});
const click=el=>(el.events.click||[]).forEach(fn=>fn());
const emit=name=>(doc.events[name]||[]).forEach(fn=>fn());
const settle=async()=>{await Promise.resolve();await Promise.resolve();};
(async()=>{
  assert.equal(audio.src,'assets/music/one-summers-day.m4a');
  assert.equal(audio.preload,'none');assert.equal(audio.plays,0,'no audio on page load');
  assert.equal(nodes['#music-tracks'].children.length,1,'only supplied recording appears');
  const track=nodes['#music-tracks'].children[0].children[0];
  assert.equal(track.textContent,'One Summer’s Day');
  assert.equal(nodes['#music-library'].hidden,true,'quiet room has no extra list button');
  window.siliPiano.select('music');
  assert.equal(audio.plays,0,'audio waits for arrival');
  assert.equal(nodes['#music-library'].hidden,false,'list reachable during approach');
  click(track);assert.ok(timer,'selecting during approach preserves arrival');
  timer();await settle();assert.equal(audio.plays,1);assert.equal(audio.paused,false);
  assert.equal(nodes['#resume-recording'].hidden,true);assert.equal(track.attributes['aria-current'],'true');
  nodes['#performance'].inMusic=true;window.siliPiano.attach(element());
  assert.equal(nodes['#performance'].hidden,false,'playlist and controls appear in music content');
  nodes['#detail'].open=true;nodes['#detail'].dataset.entry='coffee';window.siliPiano.refresh();
  assert.equal(nodes['#music-browse-controls'].hidden,false,'other modal content exposes music controls');
  assert.equal(nodes['#detail'].classList.contains('with-piano'),true,'content keeps piano visible');
  click(nodes['#browse-sound']);assert.equal(audio.muted,true,'content mute controls same recording');
  click(nodes['#browse-sound']);assert.equal(audio.muted,false);
  audio.currentTime=45;click(track);await settle();assert.equal(audio.currentTime,0,'click track restarts');
  click(nodes['#sound']);assert.equal(audio.muted,true);click(nodes['#sound']);assert.equal(audio.muted,false);
  audio.currentTime=30;doc.hidden=true;emit('visibilitychange');assert.equal(audio.paused,true);
  const plays=audio.plays;doc.hidden=false;emit('visibilitychange');assert.equal(audio.plays,plays,'return never auto-resumes');
  click(nodes['#resume-recording']);await settle();assert.equal(audio.currentTime,30,'explicit resume preserves position');
  audio.reject=true;click(track);await settle();assert.equal(nodes['#resume-recording'].hidden,false,'blocked autoplay offers Play');
  audio.reject=false;click(nodes['#resume-recording']);await settle();assert.equal(nodes['#resume-recording'].hidden,true);
  let resolvePlay;audio.deferred=new Promise(resolve=>{resolvePlay=resolve;});
  click(track);window.siliPiano.select('coffee');resolvePlay();await settle();
  assert.equal(audio.paused,true,'late play resolution cannot restart after departure');
  assert.equal(audio.currentTime,0);assert.equal(nodes['#music-library'].hidden,true);
  audio.deferred=null;motion.matches=true;window.siliPiano.select('music');await settle();
  assert.equal(nodes['#sili'].dataset.pose,'seated','reduced motion keeps audio with still pose');
  audio.events.ended();assert.equal(audio.paused,true);assert.equal(nodes['#music-toggle'].attributes['aria-pressed'],'false');
  assert.equal(window.siliPiano.keepsPiano,false,'recording end releases normal room activities');
  assert.equal(nodes['#music-browse-controls'].hidden,true);
  click(track);await settle();assert.equal(audio.paused,false,'list can restart after recording end');
  click(nodes['#browse-stop']);assert.equal(audio.paused,true);assert.equal(window.siliPiano.keepsPiano,false,'stop from other content releases activities');
  click(track);await settle();
  audio.events.error();assert.equal(audio.paused,true);assert.match(nodes['#performance-status'].textContent,/could not be played/);
  console.log('PASS: single clickable recording, arrival playback, restart, mute, inactivity/resume, autoplay fallback, late play cancellation, reduced motion, end and errors.');
})();
