import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

export const media = [];
export const audios = [];
export const frames = new Map();
let frameId = 0, now = 0;
export function advance(seconds) {
  for (let i=0;i<seconds*20;i++) {
    now+=50;
    const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback(now));
  }
}
beforeEach(() => {
  media.length = 0; audios.length = 0; frames.clear(); now=0;
  Object.defineProperty(document,'hidden',{configurable:true,value:false,writable:true});
  vi.stubGlobal('requestAnimationFrame',callback => { frames.set(++frameId,callback); return frameId; });
  vi.stubGlobal('cancelAnimationFrame',id => frames.delete(id));
  vi.stubGlobal('matchMedia',query => {
    const target = new EventTarget();
    Object.assign(target,{matches:false,media:query}); media.push(target); return target;
  });
  vi.stubGlobal('Audio',class extends EventTarget {
    constructor(src) { super(); this.src=src; this.currentTime=0; this.muted=false; this.paused=true; this.play=vi.fn(async()=>{this.paused=false;}); this.pause=vi.fn(()=>{this.paused=true;}); audios.push(this); }
    removeAttribute() {} load() {}
  });
  HTMLDialogElement.prototype.showModal = function() { this.open=true; this.setAttribute('open',''); };
  HTMLDialogElement.prototype.close = function() { if (!this.open) return; this.open=false; this.removeAttribute('open'); this.dispatchEvent(new Event('close')); };
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); sessionStorage.clear(); });
