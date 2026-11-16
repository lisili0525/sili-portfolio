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
    expect(screen.getByRole('img',{name:/warmly lit/}).getAttribute('src')).toContain('v7');
    expect(screen.queryByText('Pause cats')).toBeNull();
    app.unmount(); expect(frames.size).toBe(0); expect(audios.every(audio=>audio.paused)).toBe(true);
  });
  it('opens Explore, restores focus with Escape, and closes on outside focus',() => {
    mount(); const explore=screen.getByRole('button',{name:/Explore/});
    fireEvent.click(explore); expect(explore.getAttribute('aria-expanded')).toBe('true');
    fireEvent.keyDown(document,{key:'Escape'}); expect(explore.getAttribute('aria-expanded')).toBe('false'); expect(document.activeElement).toBe(explore);
    fireEvent.click(explore); act(()=>screen.getByRole('button',{name:'Start piano playing'}).focus());
    expect(explore.getAttribute('aria-expanded')).toBe('false');
  });
  it('navigates coffee to notebook without restarting from dialog content clicks',() => {
    mount(); clickObject('Something brewing');
    expect(screen.getByRole('heading',{name:'Something brewing'})).toBeTruthy();
    fireEvent.click(screen.getByText(/I enjoy making/)); expect(document.querySelector('#detail').open).toBe(true);
    fireEvent.click(screen.getByRole('button',{name:/Open the technical notebook/}));
    expect(screen.getByRole('heading',{name:'Inside my notebook'})).toBeTruthy();
    tick(12); expect(document.querySelector('#sili').dataset.activity).toBe('desk');
    fireEvent.click(screen.getByRole('button',{name:'Close and return to the room'}));
    expect(document.querySelector('#detail').open).toBe(false);
  });
  it('interrupts album pickup and opens only the most recent selection',async() => {
    mount(); clickObject('Open the photo album'); tick(.5); clickObject('Something brewing');
    await act(async()=>{}); tick(12);
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
  it('keeps playing while browsing and opens the album without a second pickup',async() => {
    mount(); fireEvent.click(screen.getByRole('button',{name:'Start piano playing'}));
    await act(async()=>advance(12));
    expect(screen.getByRole('button',{name:'Stop piano playing'})).toBeTruthy();
    expect(audios.at(-1).play).toHaveBeenCalled();
    clickObject('Something brewing');
    expect(screen.getByRole('button',{name:'Stop music'})).toBeTruthy();
    clickObject('Open the photo album'); await act(async()=>{});
    expect(screen.getByLabelText('Eight-page photo album')).toBeTruthy();
    expect(document.querySelector('#sili').classList.contains('at-piano')).toBe(true);
    fireEvent.click(screen.getByRole('button',{name:'Stop music'})); expect(audios.at(-1).paused).toBe(true);
  });
  it('handles autoplay rejection, explicit resume, mute and recording end',async() => {
    mount(); const audio=audios.at(-1); audio.play.mockRejectedValueOnce(Error('blocked'));
    clickObject('At the piano'); await act(async()=>advance(12));
    expect(screen.getByRole('button',{name:'Play recording'})).toBeTruthy();
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Play recording'})));
    fireEvent.click(screen.getByRole('button',{name:'Sound on'})); expect(audio.muted).toBe(true);
    act(()=>audio.dispatchEvent(new Event('ended')));
    expect(screen.getByRole('button',{name:'Start piano playing'})).toBeTruthy();
  });
  it('pauses on tab inactivity and requires explicit resume',async() => {
    mount(); clickObject('At the piano'); await act(async()=>advance(12));
    act(()=>{document.hidden=true; document.dispatchEvent(new Event('visibilitychange'));});
    expect(audios.at(-1).paused).toBe(true);
    act(()=>{document.hidden=false; document.dispatchEvent(new Event('visibilitychange'));});
    expect(screen.getByRole('button',{name:'Resume recording'})).toBeTruthy();
    await act(async()=>fireEvent.click(screen.getByRole('button',{name:'Resume recording'})));
    expect(screen.getByRole('button',{name:'Stop piano playing'})).toBeTruthy();
  });
  it('honors reduced motion and freezes cats while content is open',async() => {
    mount(); tick(30); clickObject('Something brewing');
    const positions=()=>[...document.querySelectorAll('.cat')].map(cat=>cat.style.cssText);
    const before=positions(); tick(20); expect(positions()).toEqual(before);
    act(()=>media.forEach(item=>{item.matches=true;item.dispatchEvent(new Event('change'));}));
    expect(document.querySelector('#java .cat').dataset.pose).toBe('sleep');
    clickObject('Open the photo album'); await act(async()=>{});
    expect(screen.getByLabelText('Eight-page photo album')).toBeTruthy();
  });
});
