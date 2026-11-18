import { useEffect, useRef, useState } from 'react';
import { Room } from '../../components/Room.jsx';
import { createPrototypeRuntime, type Runtime } from './runtime';
import './prototype.css';

// Development-only experiment. The original room remains the visual reference.
export default function Prototype() {
  const roomRef = useRef<HTMLElement>(null);
  const runtime = useRef<Runtime | null>(null);
  const [status, setStatus] = useState('Loading prototype…');
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const abort = new AbortController();
    const host = document.createElement('div'); host.className = 'prototype-canvas';
    roomRef.current!.append(host);
    roomRef.current!.closest('main')!.inert = true;
    void createPrototypeRuntime(host, abort.signal, setStatus).then(value => {
      if (abort.signal.aborted) value?.destroy();
      else { runtime.current = value; if (value) setStatus('idle'); }
    }).catch(() => { if (!abort.signal.aborted) setStatus('Renderer unavailable. Open the original room below.'); });
    const cancel = (event: KeyboardEvent) => { if (event.key === 'Escape') runtime.current?.cancel(); };
    document.addEventListener('keydown', cancel);
    return () => { abort.abort(); runtime.current?.destroy(); runtime.current = null; host.remove(); document.removeEventListener('keydown', cancel); };
  }, []);
  return <div className="scene-prototype">
    <Room roomRef={roomRef} onEntry={() => {}} />
    <nav className="prototype-controls" aria-label="Scene prototype controls">
      <p role="status">{status}</p>
      <button onClick={() => runtime.current?.select({ x: 28, y: 86 })}>Walk left</button>
      <button onClick={() => runtime.current?.select({ x: 72, y: 87 })}>Walk right</button>
      <button onClick={() => runtime.current?.jump()}>Jump Java</button>
      <button onClick={() => runtime.current?.cancel()}>Cancel journey</button>
      <button aria-pressed={paused} onClick={() => { runtime.current?.pause(!paused); setPaused(!paused); }}>{paused ? 'Resume prototype' : 'Pause prototype'}</button>
      <a href="./">Open original room</a>
    </nav>
  </div>;
}
