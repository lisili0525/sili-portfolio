import { expect, it, vi } from 'vitest';
import { createCatController } from '../controllers/cats.js';
import { advance, frames } from './setup.js';
it('preserves autonomous window trips, safe floor spawns and indoor Java over twenty minutes',() => {
  let seed=17;
  vi.spyOn(Math,'random').mockImplementation(()=>((seed=(seed*16807)%2147483647)-1)/2147483646);
  const root=document.createElement('div');
  root.innerHTML='<dialog id="detail"></dialog><div id="viola" class="cat-layer"><button class="cat"></button></div><div id="java" class="cat-layer"><button class="cat"></button></div>';
  document.body.append(root);
  const cats=createCatController(root);
  const elements=[root.querySelector('#viola .cat'),root.querySelector('#java .cat')];
  expect(Math.abs(parseFloat(elements[0].style.left)-parseFloat(elements[1].style.left))).toBeGreaterThanOrEqual(14);
  let departures=0,returns=0,wasOutside=false,watchFrames=0;
  const foreground=[0,0],poses=new Set();
  for(let i=0;i<24000;i++) {
    advance(.05);
    const outside=root.querySelector('#viola').hidden;
    if(outside&&!wasOutside)departures++;
    if(!outside&&wasOutside)returns++;
    wasOutside=outside;
    expect(root.querySelector('#java').hidden).toBe(false);
    if(elements[1].dataset.pose==='watch')watchFrames++;
    elements.forEach((element,index)=>{
      poses.add(element.dataset.pose);
      const x=parseFloat(element.style.left),y=parseFloat(element.style.top);
      expect(x).toBeGreaterThanOrEqual(34); expect(x).toBeLessThanOrEqual(74);
      expect(y).toBeGreaterThanOrEqual(18); expect(y).toBeLessThanOrEqual(86);
      if(!element.parentElement.hidden&&y>=80)foreground[index]++;
    });
  }
  expect(departures).toBeGreaterThanOrEqual(2);expect(returns).toBeGreaterThanOrEqual(2);expect(watchFrames).toBeGreaterThan(0);
  foreground.forEach(count=>expect(count/24000).toBeGreaterThan(.7));
  for(const pose of ['walk','hop','groom','sleep','sit'])expect(poses.has(pose)).toBe(true);
  cats.destroy(); expect(frames.size).toBe(0); root.remove(); vi.restoreAllMocks();
});
