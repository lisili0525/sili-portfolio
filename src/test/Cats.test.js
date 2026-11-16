import { afterEach, expect, it, vi } from 'vitest';
import { createCatController } from '../controllers/cats.js';
import { catSurfaces } from '../data/catSurfaces.js';
import { advance, frames, media } from './setup.js';

const roots=[];
afterEach(()=>{roots.forEach(root=>root.remove());roots.length=0;vi.restoreAllMocks();});
function setup(seed=17) {
  vi.spyOn(Math,'random').mockImplementation(()=>((seed=(seed*16807)%2147483647)-1)/2147483646);
  const root=document.createElement('div');
  root.innerHTML='<section class="room"><div id="sili"></div><div id="viola" class="cat-layer"><button class="cat"></button></div><div id="java" class="cat-layer"><button class="cat"></button></div></section><dialog id="detail"></dialog>';
  document.body.append(root);roots.push(root);
  return {root,controller:createCatController(root),elements:[root.querySelector('#viola .cat'),root.querySelector('#java .cat')]};
}
it('both cats explore every requested surface, return safely and keep Java indoors over thirty minutes',()=>{
  const {root,controller,elements}=setup();
  expect(Math.abs(parseFloat(elements[0].style.left)-parseFloat(elements[1].style.left))).toBeGreaterThanOrEqual(16);
  const visits=[new Set(),new Set()],poses=new Set();
  let departures=0,returns=0,wasOutside=false;
  for(let i=0;i<36000;i++) {
    advance(.05);
    const outside=root.querySelector('#viola').hidden;
    if(outside&&!wasOutside)departures++;
    if(!outside&&wasOutside)returns++;
    wasOutside=outside;
    expect(root.querySelector('#java').hidden).toBe(false);
    elements.forEach((element,index)=>{
      const x=parseFloat(element.style.left),y=parseFloat(element.style.top),width=parseFloat(element.style.width);
      expect(Number.isFinite(x+y+width)).toBe(true);
      expect(x-width/2).toBeGreaterThanOrEqual(0);expect(x+width/2).toBeLessThanOrEqual(100);
      expect(y).toBeGreaterThanOrEqual(14);expect(y).toBeLessThanOrEqual(100);
      poses.add(element.dataset.pose);
      if(element.dataset.airborne!=='true'&&!element.parentElement.hidden) visits[index].add(element.parentElement.dataset.surface);
    });
    const [a,b]=elements.map(element=>element.parentElement.dataset.surface);
    if(a!=='floor'&&a!=='outside'&&b!=='floor'&&b!=='outside') {
      expect(catSurfaces[a]?.group===catSurfaces[b]?.group).toBe(false);
    }
  }
  for(const visited of visits) for(const surface of ['piano-bench','piano-top','coffee-counter','coffee-table','bookshelf','desk','chair','sofa','window']) expect(visited.has(surface),surface).toBe(true);
  expect(departures).toBeGreaterThanOrEqual(2);expect(returns).toBeGreaterThanOrEqual(2);
  for(const pose of ['walk','hop','groom','sleep','sit','watch'])expect(poses.has(pose),pose).toBe(true);
  controller.destroy();expect(frames.size).toBe(0);
});
it('keeps occupied furniture clear, still explores other stops, and resets safely for reduced motion',()=>{
  const {root,controller,elements}=setup(31);
  root.querySelector('.room').dataset.activity='notebook';
  const visits=new Set();
  for(let i=0;i<18000;i++) {
    advance(.05);
    elements.forEach(element=>{
      const surface=element.parentElement.dataset.surface;
      expect(['chair','desk','bookshelf','bookshelf-step'].includes(surface)).toBe(false);
      visits.add(surface);
    });
  }
  expect(visits.has('piano-top')).toBe(true);expect(visits.has('sofa')).toBe(true);expect(visits.has('coffee-table')).toBe(true);
  media[0].matches=true;media[0].dispatchEvent(new Event('change'));
  const positions=elements.map(element=>element.style.cssText);
  advance(30);expect(elements.map(element=>element.style.cssText)).toEqual(positions);
  for(const element of elements)expect(element.parentElement.dataset.surface).toBe('floor');
  controller.destroy();expect(frames.size).toBe(0);
});
it('evacuates a perch for a new person activity even while a content dialog is open',()=>{
  const {root,controller,elements}=setup();
  let found=false;
  for(let i=0;i<12000&&!found;i++) {
    advance(.05);
    found=elements.some(element=>element.parentElement.dataset.surface==='coffee-counter');
  }
  expect(found).toBe(true);
  root.querySelector('.room').dataset.activity='coffee';root.querySelector('#detail').open=true;
  advance(5);
  expect(elements.some(element=>element.parentElement.dataset.surface==='coffee-counter')).toBe(false);
  controller.destroy();expect(frames.size).toBe(0);
});
