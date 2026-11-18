import React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { App } from '../App.jsx';
import { advance, audios, frames, media } from './setup.js';

const mount = () => render(<React.StrictMode><App /></React.StrictMode>);
const tick = seconds => act(() => advance(seconds));
const clickObject = name => fireEvent.click(within(document.querySelector('.room')).getByRole('button',{name,hidden:true}));

describe('React room integration',() => {
  it('mounts one pair of animation clocks under StrictMode and disposes both on unmount',() => {
    const app=mount(); expect(frames.size).toBe(2);
    expect(screen.getByRole('img',{name:/warmly lit/}).getAttribute('src')).toContain('rebuilt/v1/ready/bare-room');
    expect(screen.queryByText('Pause cats')).toBeNull();
    app.unmount(); expect(frames.size).toBe(0); expect(audios.every(audio=>audio.paused)).toBe(true);
  });
  it('opens Explore, restores focus with Escape, and closes on outside focus',() => {
    mount(); const explore=screen.getByRole('button',{name:/Explore/});
    fireEvent.click(explore); expect(explore.getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(document,{key:'Escape'}); expect(explore.getAttribute('aria-expanded')).toBe('false'); expect(document.activeElement).toBe(explore);
    fireEvent.click(explore); act(()=>screen.getByRole('button',{name:/^(Mute|Unmute) music$/}).focus());
    expect(explore.getAttribute('aria-expanded')).toBe('false');
  });
  it('waits for arrival before opening coffee and computer content',async() => {
    mount(); clickObject('Something brewing');
    expect(document.querySelector('#detail').open).toBe(false);
    await act(async()=>advance(12));
    expect(screen.getByRole('heading',{name:'Something brewing'})).toBeTruthy();
    fireEvent.click(screen.getByText(/I enjoy making/)); expect(document.querySelector('#detail').open).toBe(true);
    fireEvent.click(screen.getByRole('button',{name:/Open workstation projects/}));
    expect(document.querySelector('#detail').open).toBe(false);
    await act(async()=>advance(12));
    expect(screen.getByRole('heading',{name:'At my workstation'})).toBeTruthy();
    tick(12); expect(document.querySelector('#sili').dataset.activity).toBe('desk');
    fireEvent.click(screen.getByRole('button',{name:'Close and return to the room'}));
    expect(document.querySelector('#detail').open).toBe(false);
  });
  it('merges workstation content and destinations while preserving focus and arrival',async()=>{
    mount(); const button=within(document.querySelector('.room')).getByRole('button',{name:'At my workstation',hidden:true});
    fireEvent.click(button);expect(document.querySelector('#detail').open).toBe(false);
    await act(async()=>advance(15));
    expect(document.querySelector('#detail').dataset.entry).toBe('workstation');
    for(const title of ['CoffeeHeads','Biomedical machine learning','SVD & PCA','Cloud microphysics modeling'])expect(screen.getByRole('heading',{name:title})).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'Close and return to the room'}));expect(document.activeElement).toBe(button);
    fireEvent.click(screen.getByRole('button',{name:/Explore/}));
    expect(within(document.querySelector('#destinations')).getAllByRole('button')).toHaveLength(7);
    expect(within(document.querySelector('#destinations')).getAllByRole('button',{name:'At my workstation'})).toHaveLength(1);
  });
  it.each([false,true])('cycles workstation poses without moving the seat (reduced motion: %s)',async reduced=>{
    mount();if(reduced)act(()=>media.forEach(item=>{item.matches=true;item.dispatchEvent(new Event('change'));}));
    clickObject('At my workstation');await act(async()=>advance(15));
    const actor=document.querySelector('#sili'),seat={left:actor.style.left,bottom:actor.style.bottom,height:actor.style.height},seen=new Set();
    for(let i=0;i<300;i++){
      tick(.2);seen.add(actor.dataset.deskMode);
      expect(actor.dataset.activity).toBe('desk');
      expect({left:actor.style.left,bottom:actor.style.bottom,height:actor.style.height}).toEqual(seat);
    }
    expect(seen).toEqual(new Set(reduced?['computer']:['computer','writing']));
  });
  it('preserves piano browsing and reduced-motion cancellation for both workstation entries',async()=>{
    mount(); clickObject('At my workstation'); tick(.1);
    fireEvent.keyDown(document,{key:'Escape'}); await act(async()=>advance(15));
    expect(document.querySelector('#detail').open).toBe(false);
    act(()=>media.forEach(item=>{item.matches=true;item.dispatchEvent(new Event('change'));}));
    clickObject('At my workstation'); await act(async()=>{});
    expect(document.querySelector('#detail').dataset.entry).toBe('workstation');
    clickObject('At my workstation'); await act(async()=>{});
    expect(document.querySelector('#detail').dataset.entry).toBe('workstation');
    clickObject('At the piano'); await act(async()=>{});
    const audio=audios.at(-1); audio.currentTime=23;
    for(const [name,key] of [['At my workstation','workstation']]) {
      clickObject(name); await act(async()=>{});
      expect(document.querySelector('#detail').dataset.entry).toBe(key);
      expect(document.querySelector('#sili').classList.contains('at-piano')).toBe(true);
      expect(audio.paused).toBe(false); expect(audio.currentTime).toBe(23);
    }
  });
  it('interrupts album pickup and opens only the most recent selection',async() => {
    mount(); clickObject('Open the photo album'); tick(.5); clickObject('Something brewing');
    await act(async()=>advance(12));
    expect(screen.queryByLabelText('Eight-page photo album')).toBeNull();
    expect(screen.getByRole('heading',{name:'Something brewing'})).toBeTruthy();
  });
  it('opens the physical album after pickup, supports keyboard turns and preserves spread',async() => {
    vi.useFakeTimers({toFake:['setTimeout','clearTimeout']}); mount(); clickObject('Open the photo album');
    await act(async()=>advance(15));
    const album=screen.getByLabelText('Eight-page photo album');
    fireEvent.keyDown(album,{key:'ArrowRight'});
    act(()=>vi.advanceTimersByTime(700));
    expect(screen.getByText('Pages 3–4 of 8')).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'Close and return to the room'}));
    clickObject('Rachel & me'); await act(async()=>advance(15));
    expect(screen.getByText('Pages 1–2 of 8')).toBeTruthy();
  });
  it('uses six distance-driven walking frames at a smaller, slower pace',async()=>{
    mount(); const actor=document.querySelector('#sili');
    expect(actor.querySelector('.sheet-walking')).toBeTruthy();
    clickObject('At my workstation'); tick(.1);
    expect(actor.dataset.pose).toBe('walk');
    const initialX=parseFloat(actor.style.left), seen=new Set();
    let previousFrame=actor.dataset.walkFrame, changes=0;
    for(let i=0;i<20;i++) {
      tick(.05);seen.add(actor.dataset.walkFrame);
      if(actor.dataset.walkFrame!==previousFrame)changes++;
      previousFrame=actor.dataset.walkFrame;
    }
    expect(changes).toBeLessThanOrEqual(7);
    expect(parseFloat(actor.style.left)-initialX).toBeCloseTo(14,1);
    expect(seen).toEqual(new Set(['0','1','2','3','4','5']));
    expect(actor.style.getPropertyValue('--walk-facing')).toBe('1');
    await act(async()=>advance(15));
    expect(screen.getByRole('heading',{name:'At my workstation'})).toBeTruthy();
    clickObject('At the piano'); tick(1.4);
    expect(actor.style.getPropertyValue('--walk-facing')).toBe('-1');
    await act(async()=>advance(15));
    expect(actor.classList.contains('at-piano')).toBe(true);
  });
  it('keeps playing while other content opens immediately without another journey',async() => {
    mount(); fireEvent.click(screen.getByRole('button',{name:'At the piano',exact:true}));
    await act(async()=>advance(12));
    expect(audios.at(-1).play).toHaveBeenCalled();
    clickObject('Something brewing');
    await act(async()=>{});
    expect(screen.getByRole('heading',{name:'Something brewing'})).toBeTruthy();
    expect(audios.at(-1).paused).toBe(false);
    clickObject('Open the photo album'); await act(async()=>{});
    expect(screen.getByLabelText('Eight-page photo album')).toBeTruthy();
    expect(document.querySelector('#sili').classList.contains('at-piano')).toBe(true);
    expect(audios.at(-1).paused).toBe(false);
  });
  it('cancels pending content with Escape and ignores repeated clicks during travel',async() => {
    mount(); clickObject('Something brewing'); tick(.5);
    clickObject('Something brewing');
    expect(document.querySelector('#detail').open).toBe(false);
    fireEvent.keyDown(document,{key:'Escape'});
    await act(async()=>advance(15));
    expect(document.querySelector('#detail').open).toBe(false);
    clickObject('At the piano'); tick(.5); clickObject('At the piano');
    expect(screen.getByText('Settling in for a little music…').getAttribute('data-visible')).toBe('true');
    expect(document.querySelector('#detail').open).toBe(false);
    await act(async()=>advance(12));
    expect(screen.getByRole('heading',{name:'At the piano'})).toBeTruthy();
    expect(screen.getByText('Settling in for a little music…').getAttribute('data-visible')).toBe('false');
  });
  it('handles autoplay rejection, explicit resume, mute and recording end',async() => {
    mount(); const audio=audios.at(-1); audio.play.mockRejectedValueOnce(Error('blocked'));
    clickObject('At the piano'); await act(async()=>advance(12));
    expect(screen.getByRole('button',{name:'Play',exact:true})).toBeTruthy();
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Play',exact:true})));
    fireEvent.click(screen.getByRole('button',{name:'Mute',exact:true})); expect(audio.muted).toBe(true);
    act(()=>audio.dispatchEvent(new Event('ended')));
    expect(screen.getByRole('button',{name:/^(Mute|Unmute) music$/})).toBeTruthy();
  });
  it('uses the icon only for mute, with no journey, dialog, playback or resume side effects',async()=>{
    mount(); const audio=audios.at(-1);
    const icon=document.querySelector('#music-toggle');
    expect(icon.textContent).toBe('♪');
    fireEvent.click(screen.getByRole('button',{name:'Mute music',exact:true}));
    await act(async()=>advance(12));
    expect(audio.muted).toBe(true); expect(audio.play).not.toHaveBeenCalled();
    expect(document.querySelector('#detail').open).toBe(false);
    expect(document.querySelector('#sili').dataset.pose).toBe('idle');
    fireEvent.click(screen.getByRole('button',{name:'Unmute music',exact:true}));
    expect(audio.muted).toBe(false); expect(audio.play).not.toHaveBeenCalled();
    clickObject('At the piano'); await act(async()=>advance(12));
    expect(screen.getByRole('heading',{name:'At the piano'})).toBeTruthy();
    audio.currentTime=24;
    fireEvent.click(screen.getByRole('button',{name:'Close and return to the room'}));
    fireEvent.click(screen.getByRole('button',{name:'Mute music',exact:true}));
    expect(audio.muted).toBe(true); expect(audio.paused).toBe(false); expect(audio.currentTime).toBe(24);
    expect(document.querySelector('#detail').open).toBe(false);
    expect(document.querySelector('#sili').dataset.pose).toBe('playing');
    clickObject('At the piano'); await act(async()=>{});
    fireEvent.click(screen.getByRole('button',{name:'Pause',exact:true}));
    fireEvent.click(screen.getByRole('button',{name:'Close and return to the room'}));
    fireEvent.click(screen.getByRole('button',{name:'Unmute music',exact:true}));
    expect(audio.muted).toBe(false); expect(audio.paused).toBe(true); expect(audio.currentTime).toBe(24);
    expect(document.querySelector('#detail').open).toBe(false);
    clickObject('At the piano'); await act(async()=>{});
    expect(screen.getByRole('button',{name:'Continue',exact:true})).toBeTruthy();
    expect(screen.getByRole('button',{name:'Start over',exact:true})).toBeTruthy();
  });
  it('shows an icon-only piano transport beside mute only at an engaged piano',async()=>{
    mount(); expect(screen.queryByRole('button',{name:/^(Pause|Play) piano$/})).toBeNull();
    clickObject('At the piano'); tick(.1);
    expect(screen.queryByRole('button',{name:/^(Pause|Play) piano$/})).toBeNull();
    await act(async()=>advance(12));
    const audio=audios.at(-1); audio.currentTime=32;
    expect(document.querySelector('#detail #piano-playback')).toBeTruthy();
    fireEvent.click(screen.getByRole('button',{name:'Close and return to the room'}));
    fireEvent.click(screen.getByRole('button',{name:'Pause piano',exact:true}));
    expect(audio.paused).toBe(true); expect(audio.currentTime).toBe(32);
    expect(document.querySelector('#sili').dataset.pose).toBe('seated');
    expect(document.querySelector('#sili').classList.contains('inactive')).toBe(true);
    expect(document.querySelector('#detail').open).toBe(false);
    expect(document.querySelector('#piano-playback').textContent).toBe('');
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Play piano',exact:true})));
    expect(audio.paused).toBe(false); expect(audio.currentTime).toBe(32);
    expect(document.querySelector('#sili').dataset.pose).toBe('playing');
    fireEvent.click(screen.getByRole('button',{name:'Pause piano',exact:true}));
    clickObject('Something brewing'); await act(async()=>advance(12));
    expect(screen.queryByRole('button',{name:/^(Pause|Play) piano$/})).toBeNull();
    clickObject('At the piano'); await act(async()=>advance(12));
    expect(document.querySelector('#detail #piano-playback')).toBeTruthy();
    expect(screen.getByRole('button',{name:'Play piano',exact:true})).toBeTruthy();
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Play piano',exact:true})));
    act(()=>audio.dispatchEvent(new Event('ended')));
    expect(screen.queryByRole('button',{name:/^(Pause|Play) piano$/})).toBeNull();
  });
  it('keeps mute independent and resumes paused audio at the same position',async() => {
    mount(); clickObject('At the piano');
    await act(async()=>advance(12));
    const audio=audios.at(-1), actor=document.querySelector('#sili');
    audio.currentTime=41.3;
    fireEvent.click(screen.getByRole('button',{name:'Mute',exact:true}));
    expect(audio.muted).toBe(true); expect(audio.paused).toBe(false);
    expect(actor.dataset.pose).toBe('playing'); expect(actor.classList.contains('inactive')).toBe(false);
    fireEvent.click(screen.getByRole('button',{name:'Pause',exact:true}));
    expect(audio.paused).toBe(true); expect(audio.currentTime).toBe(41.3);
    expect(actor.classList.contains('inactive')).toBe(true);
    fireEvent.click(screen.getByRole('button',{name:'Close and return to the room'}));
    clickObject('At the piano');
    await act(async()=>{});
    expect(audio.paused).toBe(true); expect(audio.currentTime).toBe(41.3);
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Continue',exact:true})));
    expect(audio.paused).toBe(false); expect(audio.currentTime).toBe(41.3); expect(audio.muted).toBe(true);
    expect(actor.classList.contains('inactive')).toBe(false);
    fireEvent.click(screen.getByRole('button',{name:'Unmute',exact:true}));
    expect(audio.muted).toBe(false); expect(audio.paused).toBe(false);
    expect(screen.queryByText('Music list')).toBeNull();
    expect(screen.queryByText('Stop playing')).toBeNull();
  });
  it('leaves a paused piano for interactions and offers continue or restart on return',async() => {
    mount(); clickObject('At the piano'); await act(async()=>advance(12));
    const audio=audios.at(-1), actor=document.querySelector('#sili');
    audio.currentTime=52.4;
    fireEvent.click(screen.getByRole('button',{name:'Pause',exact:true}));
    clickObject('Something brewing');
    expect(document.querySelector('#detail').open).toBe(false);
    await act(async()=>advance(12));
    expect(screen.getByRole('heading',{name:'Something brewing'})).toBeTruthy();
    expect(actor.dataset.activity).toBe('coffee'); expect(actor.classList.contains('at-piano')).toBe(false);
    expect(audio.paused).toBe(true); expect(audio.currentTime).toBe(52.4);
    clickObject('At the piano'); await act(async()=>advance(12));
    expect(audio.paused).toBe(true); expect(audio.currentTime).toBe(52.4);
    expect(screen.getByRole('button',{name:'Continue',exact:true})).toBeTruthy();
    expect(screen.getByRole('button',{name:'Start over',exact:true})).toBeTruthy();
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Continue',exact:true})));
    expect(audio.paused).toBe(false); expect(audio.currentTime).toBe(52.4);
    fireEvent.click(screen.getByRole('button',{name:'Pause',exact:true}));
    clickObject('Open the photo album'); await act(async()=>advance(15));
    expect(screen.getByLabelText('Eight-page photo album')).toBeTruthy();
    expect(document.querySelector('.room').classList.contains('album-lifted')).toBe(true);
    expect(audio.currentTime).toBe(52.4);
    fireEvent.click(screen.getByRole('button',{name:'Close and return to the room'}));
    clickObject('At the piano'); await act(async()=>advance(15));
    expect(audio.paused).toBe(true);
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Start over',exact:true})));
    expect(audio.paused).toBe(false); expect(audio.currentTime).toBe(0);
  });
  it('preserves paused progress when a return journey is cancelled',async() => {
    mount(); clickObject('At the piano'); await act(async()=>advance(12));
    const audio=audios.at(-1); audio.currentTime=18;
    fireEvent.click(screen.getByRole('button',{name:'Pause',exact:true}));
    clickObject('At my workstation'); await act(async()=>advance(15));
    clickObject('At the piano'); tick(.1);
    fireEvent.keyDown(document,{key:'Escape'}); await act(async()=>advance(15));
    expect(audio.paused).toBe(true); expect(audio.currentTime).toBe(18);
    expect(document.querySelector('#detail').open).toBe(false);
    clickObject('At the piano'); await act(async()=>advance(15));
    expect(screen.getByRole('button',{name:'Continue',exact:true})).toBeTruthy();
    expect(audio.paused).toBe(true); expect(audio.currentTime).toBe(18);
  });
  it('pauses on tab inactivity and requires explicit resume',async() => {
    mount(); clickObject('At the piano'); await act(async()=>advance(12));
    act(()=>{document.hidden=true; document.dispatchEvent(new Event('visibilitychange'));});
    expect(audios.at(-1).paused).toBe(true);
    act(()=>{document.hidden=false; document.dispatchEvent(new Event('visibilitychange'));});
    expect(screen.getByRole('button',{name:'Continue',exact:true})).toBeTruthy();
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Continue',exact:true})));
    expect(screen.getByRole('button',{name:/^(Mute|Unmute) music$/})).toBeTruthy();
  });
  it('honors reduced motion and pauses grounded cats while content is open',async() => {
    mount(); tick(30); clickObject('Something brewing');
    // A perched cat first clears the counter for the person, then rests.
    await act(async()=>advance(12));
    // An existing hop lands before the content-reading pause takes over.
    await act(async()=>advance(2));
    const positions=()=>[...document.querySelectorAll('.cat')].map(cat=>cat.style.cssText);
    const before=positions(); tick(20); expect(positions()).toEqual(before);
    act(()=>media.forEach(item=>{item.matches=true;item.dispatchEvent(new Event('change'));}));
    expect(document.querySelector('#java .cat').dataset.pose).toBe('sleep');
    clickObject('Open the photo album'); await act(async()=>{});
    expect(screen.getByLabelText('Eight-page photo album')).toBeTruthy();
  });
});
