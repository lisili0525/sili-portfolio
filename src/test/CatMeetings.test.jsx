import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../App.jsx';
import { advance, audios, frames, media } from './setup.js';

const tick=seconds=>act(()=>advance(seconds));
const cat=name=>document.querySelector(`#${name} .cat`);
const actor=()=>document.querySelector('#sili');
function waitFor(condition,seconds=30){
  for(let i=0;i<seconds*5;i++){if(condition())return;tick(.2);}
  expect(condition()).toBe(true);
}
const meet=name=>fireEvent.click(cat(name));
const contact=()=>['petting','playing'].includes(actor().dataset.catPhase);
beforeEach(()=>{let seed=17;vi.spyOn(Math,'random').mockImplementation(()=>((seed=seed*16807%2147483647)-1)/2147483646);});
afterEach(()=>vi.restoreAllMocks());

describe('shared person/cat meetings',()=>{
  it('pets the actual sofa cat instead of falling back to a window-pointing pose',()=>{
    render(<App />);
    waitFor(()=>cat('java').parentElement.dataset.surface==='sofa'&&cat('java').dataset.airborne!=='true',700);
    meet('java');tick(.2);
    expect(document.querySelector('#detail').open).toBe(false);
    waitFor(contact,20);
    expect(actor().dataset.catTarget).toBe('java');expect(actor().dataset.catSurface).toBe('sofa');
    expect(actor().style.getPropertyValue('--activity-frame')).toBe('4');
    expect(parseFloat(actor().style.left)).toBeLessThan(40);
    expect(actor().style.getPropertyValue('--interaction-facing')).toBe('-1');
  });
  it('lets a walking cat decelerate, then holds her actual position through contact',()=>{
    render(<App />);waitFor(()=>cat('viola').dataset.pose==='walk'&&cat('viola').parentElement.dataset.surface==='floor',120);
    const before=parseFloat(cat('viola').style.left);meet('viola');tick(1);
    expect(Math.abs(parseFloat(cat('viola').style.left)-before)).toBeLessThan(2);
    waitFor(contact,20);
    const position=[cat('viola').style.left,cat('viola').style.top];tick(3);
    expect([cat('viola').style.left,cat('viola').style.top]).toEqual(position);
    expect(cat('viola').dataset.interaction).toBe('petting');
  });
  it('invites an inaccessible perched cat down before crouching, without any fixed pointing fallback',()=>{
    render(<App />);waitFor(()=>cat('java').parentElement.dataset.surface==='bookshelf'&&cat('java').dataset.airborne!=='true',700);
    meet('java');tick(.8);
    expect(actor().dataset.catTarget).toBe('java');expect(actor().style.getPropertyValue('--activity-frame')).not.toBe('5');
    waitFor(contact,25);
    expect(cat('java').parentElement.dataset.surface).toBe('floor');
    expect(actor().style.getPropertyValue('--activity-frame')).toBe('4');
  });
  it('withdraws the hand before the cat takes a measured step away and never leaves a frozen petting pose',()=>{
    render(<App />);meet('viola');waitFor(contact,20);
    waitFor(()=>cat('viola').dataset.interaction==='farewell',12);tick(.5);
    expect(actor().dataset.pose).not.toBe('activity');
    waitFor(()=>cat('viola').dataset.interaction==='leaving',5);
    expect(actor().style.getPropertyValue('--activity-frame')).not.toBe('4');
    tick(4);expect(actor().dataset.catTarget).toBeUndefined();expect(actor().dataset.pose).toBe('idle');
  });
  it('always follows the latest selected cat and cancels abandoned requests',()=>{
    render(<App />);meet('viola');tick(.3);meet('java');tick(.3);
    expect(actor().dataset.catTarget).toBe('java');waitFor(contact,20);
    expect(cat('java').dataset.interaction).toBe('petting');expect(cat('viola').dataset.interaction).not.toBe('petting');
    fireEvent.click(within(document.querySelector('.room')).getByRole('button',{name:'Something brewing'}));tick(12);
    expect(actor().dataset.activity).toBe('coffee');expect(actor().dataset.catTarget).toBeUndefined();
    expect(cat('java').dataset.interaction).not.toBe('petting');
  });
  it('starts a short Java play session from the existing introduction, then releases both participants',async()=>{
    render(<App />);fireEvent.click(screen.getByRole('button',{name:/Explore/}));
    fireEvent.click(within(screen.getByRole('navigation')).getByRole('button',{name:'Viola & Java'}));
    await act(async()=>advance(25));
    fireEvent.click(screen.getByRole('button',{name:'Play with Java'}));
    waitFor(contact,25);expect(actor().dataset.catPhase).toBe('playing');
    const x=cat('java').style.left;tick(2.2);expect(cat('java').style.left).not.toBe(x);
    tick(7);expect(actor().dataset.catTarget).toBeUndefined();
  });
  it('Escape finishes a greeting cleanly and unmount disposes both clocks',()=>{
    const app=render(<App />);meet('viola');waitFor(contact,20);
    fireEvent.keyDown(document,{key:'Escape'});tick(3);
    expect(actor().dataset.catTarget).toBeUndefined();expect(cat('viola').dataset.interaction).not.toBe('petting');
    app.unmount();expect(frames.size).toBe(0);
  });
  it('direct cat interaction interrupts piano playing while ordinary browsing remains independent',async()=>{
    render(<App />);fireEvent.click(screen.getByRole('button',{name:'Start piano playing'}));
    await act(async()=>advance(12));meet('java');tick(.5);
    expect(audios.at(-1).paused).toBe(true);waitFor(contact,20);expect(actor().dataset.catTarget).toBe('java');
  });
  it('uses a still bounded greeting for reduced motion',()=>{
    render(<App />);act(()=>media.forEach(preference=>{preference.matches=true;preference.dispatchEvent(new Event('change'));}));
    meet('viola');waitFor(contact,5);const position=cat('viola').style.cssText;
    tick(3);expect(cat('viola').style.cssText).toBe(position);
    tick(10);expect(actor().dataset.catTarget).toBeUndefined();
  });
});

describe('interaction interruptions',()=>{
  async function play(){
    fireEvent.click(screen.getByRole('button',{name:/Explore/}));
    fireEvent.click(within(screen.getByRole('navigation')).getByRole('button',{name:'Viola & Java'}));
    await act(async()=>advance(25));
    fireEvent.click(screen.getByRole('button',{name:'Play with Java'}));waitFor(contact,25);
  }
  it('lands a play hop smoothly when Escape interrupts it',async()=>{
    render(<App />);await play();const baseline=parseFloat(cat('java').style.top);tick(1.9);
    const airborne=parseFloat(cat('java').style.top);expect(airborne).toBeLessThan(baseline);
    fireEvent.keyDown(document,{key:'Escape'});tick(.4);
    expect(parseFloat(cat('java').style.top)).toBeCloseTo(baseline,3);
    tick(3);expect(actor().dataset.catTarget).toBeUndefined();
  });
  it('finishes a furniture hop instead of freezing in the air when interrupted',()=>{
    render(<App />);waitFor(()=>cat('java').parentElement.dataset.surface==='bookshelf'&&cat('java').dataset.airborne!=='true',700);
    meet('java');waitFor(()=>cat('java').dataset.interaction==='invited'&&cat('java').dataset.airborne==='true',5);
    const before=cat('java').style.top;fireEvent.keyDown(document,{key:'Escape'});tick(.25);
    expect(cat('java').style.top).not.toBe(before);tick(7);
    expect(actor().dataset.catTarget).toBeUndefined();expect(cat('java').dataset.airborne).not.toBe('true');
  });
  it('pauses the greeting clock in hidden tabs instead of expiring contact offscreen',()=>{
    render(<App />);meet('viola');waitFor(contact,20);tick(.5);
    const position=cat('viola').style.cssText;
    act(()=>{document.hidden=true;document.dispatchEvent(new Event('visibilitychange'));});tick(40);
    expect(cat('viola').style.cssText).toBe(position);expect(actor().dataset.catPhase).toBe('petting');
    act(()=>{document.hidden=false;document.dispatchEvent(new Event('visibilitychange'));});tick(1);
    expect(actor().dataset.catPhase).toBe('petting');tick(10);expect(actor().dataset.catTarget).toBeUndefined();
  });
  it('can begin a fresh greeting during farewell without reviving a stale target',()=>{
    render(<App />);meet('viola');waitFor(contact,20);
    waitFor(()=>cat('viola').dataset.interaction==='farewell',12);meet('viola');
    waitFor(contact,15);expect(actor().dataset.catTarget).toBe('viola');tick(2);
    expect(actor().dataset.catPhase).toBe('petting');
  });
});
