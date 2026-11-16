// Integrated piano/journey state with controlled RAF. Not a browser rendering test.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function element() {
  const classes = new Set();
  return { hidden:false, dataset:{}, attributes:{}, events:{}, children:[],
    style:{setProperty(key,value){this[key]=value;}},
    classList:{add(...names){names.forEach(n=>classes.add(n));},remove(...names){names.forEach(n=>classes.delete(n));},contains:n=>classes.has(n),toggle(n,on){if(on)classes.add(n);else classes.delete(n);}},
    closest(){return null;},getBoundingClientRect(){return {width:1672};},
    setAttribute(n,v){this.attributes[n]=v;},append(child){this.children.push(child);},
    addEventListener(n,fn){(this.events[n] ||= []).push(fn);}
  };
}
const nodes=Object.fromEntries(['#sili','.room','#performance','#performance-status','#sound','#resume-recording','#music-toggle','#music-library','#music-tracks','#detail','#music-browse-controls','#browse-sound','#browse-stop','#station-cup','#journey-status'].map(id=>[id,element()]));
let raf=[], now=0;
const preferences=[];
const document={hidden:false,body:element(),events:{},querySelector:id=>nodes[id],createElement:element,querySelectorAll:()=>[],addEventListener(n,fn){(this.events[n] ||= []).push(fn);}};
const window={};
const context={window,document,innerWidth:1280,Math,Promise,
  Audio:class{constructor(src){this.src=src;this.currentTime=0;}play(){return Promise.resolve();}pause(){}addEventListener(){}},
  sessionStorage:{getItem(){return null;}},setTimeout(){throw Error('legacy piano timer used');},clearTimeout(){},
  matchMedia(){const m={matches:false,addEventListener(n,fn){this.change=fn;}};preferences.push(m);return m;},
  requestAnimationFrame(fn){raf.push(fn);}};
vm.createContext(context);
for(const file of ['piano.js','actions.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
const advance=seconds=>{for(let i=0;i<seconds*20;i++){now+=50;const jobs=raf;raf=[];jobs.forEach(fn=>fn(now));
  if(nodes['#sili'].dataset.activity==='coffee')assert.ok([0,1,2,3].includes(nodes['#sili'].style['--activity-frame']),'every coffee tick uses a retained frame');
}};
const click=id=>nodes[id].events.click.forEach(fn=>fn());
const emit=(name,event={})=>(document.events[name]||[]).forEach(fn=>fn(event));
const actor=nodes['#sili'];
(async()=>{
  const coffee=window.siliActions.select('coffee'); advance(8); assert.equal(await coffee,true);
  assert.equal(actor.dataset.activity,'coffee');assert.equal(nodes['#station-cup'].hidden,true);
  const counterX=actor.style.left;
  const desk=window.siliActions.select('notebook');advance(.35);
  assert.equal(actor.style.left,counterX,'put cup down before moving');
  assert.equal(actor.style['--activity-frame'],0,'departure uses the rear pose, never the discarded cup-placement frame');
  assert.equal(nodes['#station-cup'].hidden,false,'cup is back on the station before departure');
  advance(9);assert.equal(await desk,true);assert.equal(nodes['#station-cup'].hidden,false);
  assert.equal(actor.dataset.activity,'desk');
  assert.equal(parseFloat(actor.style.height),58.4,'foreground perspective does not change approved workstation scale');
  assert.ok(Math.abs(parseFloat(actor.style.left)*16.72-1362)<.1,'seated anchor follows pulled-out chair');
  const seatedTop=941*(1-parseFloat(actor.style.bottom)/100)-941*.584;
  assert.ok(Math.abs(seatedTop+460*(941*.584/576)-762)<.1,'hips meet the new seat height');
  const deskModes=new Set();for(let i=0;i<700;i++){advance(.05);deskModes.add(actor.dataset.deskMode);}
  for(const mode of ['computer','writing'])assert.ok(deskModes.has(mode),'separate computer and notebook illustrations');
  let opened=false;
  const album=window.siliActions.select('photos').then(value=>{opened=value;return value;});
  advance(.3);await Promise.resolve();assert.equal(opened,false,'album waits for pickup');
  const approachScales=[];
  for(let i=0;i<160;i++){
    advance(.05);
    if(parseFloat(actor.style.left)===53){
      const base=actor.classList.contains('is-activity')?58.4:58;
      const scale=parseFloat(actor.style.height)/base;
      approachScales.push(scale);
      const bottomPadding=actor.classList.contains('is-activity')?26/576:.10;
      const feetY=100-parseFloat(actor.style.bottom)-parseFloat(actor.style.height)*bottomPadding;
      assert.ok(feetY>=84-1e-8&&feetY<=96+1e-8,'scaling remains anchored to the walking floor point');
    }
  }
  assert.equal(await album,true);assert.equal(nodes['.room'].classList.contains('album-lifted'),true);
  assert.ok(approachScales.length>10);
  for(let i=1;i<approachScales.length;i++)assert.ok(approachScales[i]>=approachScales[i-1]-1e-8,'approach and pickup never shrink Sili');
  assert.ok(Math.abs(parseFloat(actor.style.height)-58.4*1.18)<1e-8,'album pose is 18 percent larger in the foreground');
  assert.equal(actor.style.left,'53%','pickup is centered behind the tabletop, not its exposed left edge');
  const pickupFeet=100-parseFloat(actor.style.bottom)-parseFloat(actor.style.height)*26/576;
  assert.ok(Math.abs(pickupFeet-96)<1e-8,'feet lie behind the table on the rug');
  window.siliActions.closeAlbum();advance(2);assert.equal(nodes['.room'].classList.contains('album-lifted'),false);
  assert.ok(Math.abs(parseFloat(actor.style.height)-58*1.18)<1e-8,'returning the album keeps foreground standing scale');
  const stale=window.siliActions.select('coffee');const latest=window.siliActions.select('tennis');advance(6);
  assert.equal(await stale,false);assert.equal(await latest,true);
  const resident=element();resident.style.left='54%';resident.style.top='85%';
  document.querySelectorAll=()=>[resident];
  const catVisit=window.siliActions.select('cats');advance(6);assert.equal(await catVisit,true);
  assert.equal(actor.style.left,'46%','approach the actual floor cat');
  assert.equal(actor.style['--activity-frame'],4);assert.equal(resident.style.left,'54%','never move the cat');
  resident.dataset.cat='viola';
  const java=element();java.dataset.cat='java';java.style.left='64%';java.style.top='85%';
  document.querySelectorAll=()=>[resident,java];
  const clickedJava=window.siliActions.select('cats',{cat:'java'});advance(6);assert.equal(await clickedJava,true);
  assert.equal(actor.style.left,'56%','approach the clicked cat, even when another cat is closer');
  const clickedViola=window.siliActions.select('cats',{cat:'viola'});advance(6);assert.equal(await clickedViola,true);
  assert.equal(actor.style.left,'46%','switching cats updates the approach');
  document.querySelectorAll=()=>[resident];
  const perchedJava=window.siliActions.select('cats',{cat:'java'});advance(6);assert.equal(await perchedJava,true);
  assert.equal(actor.style.left,'65%','perched-cat visit stays on floor near the stool');
  assert.equal(actor.style['--activity-frame'],5,'look up rather than crouching beside a different cat');
  assert.equal(java.style.left,'64%','cat clicks never reposition cats');
  document.querySelectorAll=()=>[];
  const canceled=window.siliActions.select('photos');advance(.1);emit('keydown',{key:'Escape'});
  assert.equal(await canceled,false);advance(6);assert.equal(nodes['.room'].classList.contains('album-lifted'),false);
  const working=window.siliActions.select('notebook');advance(.5);document.hidden=true;const frozen=actor.style.left;
  advance(5);assert.equal(actor.style.left,frozen,'inactive tab freezes movement');document.hidden=false;advance(8);assert.equal(await working,true);
  const piano=window.siliActions.select('music');advance(.7);
  assert.equal(await window.siliActions.select('music'),true,'opening music list during approach does not cancel the walk');
  document.hidden=true;emit('visibilitychange');
  document.hidden=false;const pausedX=actor.style.left;advance(3);assert.equal(actor.style.left,pausedX,'piano requires explicit resume');
  click('#music-toggle');advance(8);assert.equal(await piano,true);assert.equal(actor.dataset.pose,'playing');
  assert.equal(actor.style.height,'','piano returns to its separately calibrated CSS seat height');
  const pianoX=actor.style.left,pianoY=actor.style.bottom;
  for(const entry of ['coffee','notebook','photos','milestones','tennis','cats']){
    assert.equal(await window.siliActions.select(entry),true);advance(2);
    assert.equal(actor.dataset.pose,'playing','browsing '+entry+' keeps hand animation');
    assert.equal(actor.classList.contains('at-piano'),true);
    assert.equal(actor.style.left,pianoX);assert.equal(actor.style.bottom,pianoY);
    assert.equal(window.siliActions.activity,'music','content does not replace piano activity');
    assert.equal(nodes['.room'].classList.contains('album-lifted'),false,'album browsing skips physical pickup');
    window.siliActions.closeAlbum();advance(.1);
    assert.equal(actor.dataset.pose,'playing','closing a browsed album keeps the performance');
  }
  click('#sound');await window.siliActions.select('coffee');advance(1);
  assert.equal(actor.dataset.pose,'playing','muting keeps performance mode');click('#sound');
  click('#music-toggle');assert.equal(actor.dataset.pose,'seated');
  for(const destination of ['music','notebook','photos','milestones','tennis','cats']){
    const visit=window.siliActions.select('coffee');advance(10);assert.equal(await visit,true);
    advance(30); // Include idle/sip changes before departure.
    const leave=window.siliActions.select(destination);advance(.1);
    assert.equal(actor.style['--activity-frame'],0,'every destination departs with safe rear pose');
    assert.equal(nodes['#station-cup'].hidden,false,'restore cup before every departure');
    advance(12);assert.equal(await leave,true);
    if(destination==='music')window.siliPiano.stop();
  }
  const rapidCoffee=window.siliActions.select('coffee');advance(10);assert.equal(await rapidCoffee,true);
  const interruptedDeparture=window.siliActions.select('notebook');advance(.1);
  const redirectedDeparture=window.siliActions.select('tennis');advance(10);
  assert.equal(await interruptedDeparture,false);assert.equal(await redirectedDeparture,true);
  assert.equal(nodes['#station-cup'].hidden,false,'rapid redirection keeps cup on station');
  const returnCoffee=window.siliActions.select('coffee');advance(8);assert.equal(await returnCoffee,true);
  preferences.forEach(m=>{m.matches=true;m.change();});
  const stillAlbum=window.siliActions.select('photos');assert.equal(await stillAlbum,true);
  assert.equal(nodes['#station-cup'].hidden,false,'reduced-motion departure puts cup down');
  assert.equal(actor.dataset.activity,'interactions');assert.equal(actor.style['--activity-frame'],2);
  assert.ok(Math.abs(parseFloat(actor.style.height)-58.4*1.18)<1e-8,'reduced motion preserves foreground perspective');
  console.log('PASS: coffee/cup cleanup, desk typing/writing, delayed pickup, return book, interruption, Escape, inactive tab, piano resume, reduced motion.');
})();
