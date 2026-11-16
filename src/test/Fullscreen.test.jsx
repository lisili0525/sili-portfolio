import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { useFullscreen } from '../hooks/useFullscreen.js';
function Control() {
  const screenState=useFullscreen();
  return <><button hidden={!screenState.supported} disabled={screenState.busy} onClick={screenState.toggle}>{screenState.active ? 'Exit fullscreen' : 'Fullscreen'}</button><p role="status">{screenState.status}</p></>;
}
afterEach(()=>{
  for(const key of ['fullscreenEnabled','webkitFullscreenEnabled','fullscreenElement','webkitFullscreenElement','exitFullscreen','webkitExitFullscreen']) delete document[key];
  for(const key of ['requestFullscreen','webkitRequestFullscreen']) delete document.documentElement[key];
});
for(const webkit of [false,true]) it(`supports ${webkit?'WebKit':'standard'} fullscreen and native exit`,async()=>{
  const enabled=webkit?'webkitFullscreenEnabled':'fullscreenEnabled', element=webkit?'webkitFullscreenElement':'fullscreenElement', request=webkit?'webkitRequestFullscreen':'requestFullscreen', exit=webkit?'webkitExitFullscreen':'exitFullscreen', change=webkit?'webkitfullscreenchange':'fullscreenchange';
  Object.defineProperty(document,enabled,{configurable:true,value:true});
  document.documentElement[request]=vi.fn(async()=>{document[element]=document.documentElement;document.dispatchEvent(new Event(change));});
  document[exit]=vi.fn(async()=>{document[element]=null;document.dispatchEvent(new Event(change));});
  render(<Control />);
  await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Fullscreen'})));
  await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Exit fullscreen'})));
  expect(screen.getByRole('button',{name:'Fullscreen'})).toBeTruthy();
});
it('recovers from rejected fullscreen requests',async()=>{
  document.fullscreenEnabled=true; document.documentElement.requestFullscreen=vi.fn(async()=>{throw Error('blocked');}); document.exitFullscreen=vi.fn();
  render(<Control />); await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Fullscreen'})));
  expect(screen.getByRole('status').textContent).toMatch(/unavailable/); expect(screen.getByRole('button').disabled).toBe(false);
});
