import { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { PhotoAlbum } from '../components/PhotoAlbum.jsx';
function Album() { const [spread,setSpread]=useState(0); return <PhotoAlbum spread={spread} onSpread={setSpread} />; }
it('enforces first and last spread boundaries',() => {
  vi.useFakeTimers({toFake:['setTimeout','clearTimeout']}); render(<Album />);
  expect(screen.getByRole('button',{name:/previous two/}).disabled).toBe(true);
  for(let i=0;i<3;i++) { fireEvent.click(screen.getByRole('button',{name:/next two/})); act(()=>vi.advanceTimersByTime(700)); }
  expect(screen.getByText('Pages 7–8 of 8')).toBeTruthy(); expect(screen.getByRole('button',{name:/next two/}).disabled).toBe(true);
});
it('commits a pointer drag and suppresses the synthetic click after release',() => {
  vi.useFakeTimers({toFake:['setTimeout','clearTimeout']});
  vi.stubGlobal('PointerEvent',MouseEvent); render(<Album />);
  document.querySelector('.album-book').getBoundingClientRect=()=>({width:800});
  const next=screen.getByRole('button',{name:/next two/});
  fireEvent.pointerDown(next,{button:0,clientX:800}); fireEvent.pointerMove(next,{clientX:400}); fireEvent.pointerUp(next,{clientX:400});
  fireEvent.click(next); act(()=>vi.advanceTimersByTime(700));
  expect(screen.getByText('Pages 3–4 of 8')).toBeTruthy();
});
it('cancels a partial pointer turn and disposes an unfinished transition',() => {
  vi.useFakeTimers({toFake:['setTimeout','clearTimeout']}); vi.stubGlobal('PointerEvent',MouseEvent);
  const app=render(<Album />); document.querySelector('.album-book').getBoundingClientRect=()=>({width:800});
  const next=screen.getByRole('button',{name:/next two/});
  fireEvent.pointerDown(next,{button:0,clientX:800}); fireEvent.pointerMove(next,{clientX:750}); fireEvent.pointerCancel(next);
  act(()=>vi.advanceTimersByTime(700)); expect(screen.getByText('Pages 1–2 of 8')).toBeTruthy();
  fireEvent.keyDown(screen.getByLabelText('Eight-page photo album'),{key:'ArrowRight'});
  app.unmount(); expect(vi.getTimerCount()).toBe(0);
});
