import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App.jsx';
import { advance, media } from './setup.js';

describe('independent room modules',()=>{
  it('opens and closes window and curtains independently, deriving wind from the glass state',()=>{
    render(<App />);
    const coffee=document.querySelector('[data-scene-object="coffee-station"]');
    const window=document.querySelector('[data-scene-object="room-window"]');
    expect(window.dataset.motion).toBe('running');
    fireEvent.click(screen.getByRole('button',{name:'Close window',exact:true}));
    expect(window.dataset.windowOpen).toBe('false');expect(window.dataset.motion).toBe('still');
    expect(coffee.dataset.motion).toBe('running');expect(document.querySelector('#detail').open).toBe(false);
    fireEvent.click(screen.getByRole('button',{name:'Close curtains',exact:true}));
    expect(window.dataset.curtainsOpen).toBe('false');expect(window.dataset.motion).toBe('still');
    fireEvent.click(screen.getByRole('button',{name:'Open window',exact:true}));
    expect(window.dataset.motion).toBe('running');expect(window.dataset.curtainsOpen).toBe('false');
    fireEvent.click(screen.getByRole('button',{name:'Open curtains',exact:true}));
    expect(window.dataset.curtainsOpen).toBe('true');
  });
  it('synchronizes coffee effects with preparation and turns them off when the person leaves',async()=>{
    render(<App />);
    const coffee=document.querySelector('[data-scene-object="coffee-station"]');
    fireEvent.click(within(document.querySelector('.room')).getByRole('button',{name:'Something brewing'}));
    let brewing=false;
    for(let i=0;i<120;i++) {act(()=>advance(.05));if(coffee.dataset.brewing==='true'){brewing=true;break;}}
    expect(brewing).toBe(true);
    await act(async()=>advance(12));
    fireEvent.click(screen.getByRole('button',{name:/Open the technical notebook/}));
    act(()=>advance(12));expect(coffee.dataset.brewing).toBe('false');
    expect(document.querySelectorAll('#station-cup')).toHaveLength(1);
  });
  it('pauses both independent animations in hidden tabs and for reduced motion',()=>{
    render(<App />);
    const modules=()=>[...document.querySelectorAll('[data-scene-object][data-motion]')];
    act(()=>{document.hidden=true;document.dispatchEvent(new Event('visibilitychange'));});
    expect(modules().every(module=>module.dataset.motion==='still')).toBe(true);
    act(()=>{document.hidden=false;document.dispatchEvent(new Event('visibilitychange'));});
    expect(modules().every(module=>module.dataset.motion==='running')).toBe(true);
    act(()=>media.forEach(preference=>{preference.matches=true;preference.dispatchEvent(new Event('change'));}));
    expect(modules().every(module=>module.dataset.motion==='still')).toBe(true);
  });
});

describe('whole-room object ownership',()=>{
  it('renders the physical objects as separate owned modules rather than one decorated background',()=>{
    render(<App />);
    const ids=[...document.querySelectorAll('[data-scene-object]')].map(element=>element.dataset.sceneObject);
    for(const id of ['piano','piano-bench','wall-portrait','calendar','coffee-cabinet','coffee-station','room-window','tennis-corner','window-stool','bookcase','work-desk','computer','desk-notebook','stationery','desk-lamp','desk-books','work-chair','sofa','coffee-table','table-album','wall-shelf','toy-mouse','shelf-plant','bookcase-plant','desk-plant','table-plant','sofa-plant','sunlight','sili','viola','java'])expect(ids.includes(id),id).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
    expect(document.querySelector('.room-art').getAttribute('src')).toContain('architecture-v2');
  });
  it('toggles the lamp independently without navigating away or affecting window state',()=>{
    render(<App />);
    fireEvent.click(screen.getByRole('button',{name:'Turn off desk lamp',exact:true}));
    expect(document.querySelector('.lamp-light').classList.contains('is-lit')).toBe(false);
    expect(document.querySelector('.room').dataset.windowOpen).toBe('true');
    expect(document.querySelector('#detail').open).toBe(false);
    fireEvent.click(screen.getByRole('button',{name:'Turn on desk lamp',exact:true}));
    expect(document.querySelector('.lamp-light').classList.contains('is-lit')).toBe(true);
  });
  it('does not close glass while a visible cat is passing through it',()=>{
    render(<App />);const cat=document.querySelector('#viola');cat.classList.add('at-window');
    fireEvent.click(screen.getByRole('button',{name:'Close window',exact:true}));
    expect(document.querySelector('.room').dataset.windowOpen).toBe('true');
    expect(screen.getByText('A cat is using the window. Try again in a moment.')).toBeTruthy();
    cat.classList.remove('at-window');
    fireEvent.click(screen.getByRole('button',{name:'Close window',exact:true}));
    expect(document.querySelector('.room').dataset.windowOpen).toBe('false');
  });
});
