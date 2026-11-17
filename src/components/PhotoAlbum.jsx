import { useEffect, useRef, useState } from 'react';
import { albumPages } from '../data/album.js';

function Page({index, className = ''}) {
  const data = albumPages[index];
  return <article className={`album-page ${className}`} aria-label={`Page ${index+1}`}>
    <div className="album-photo-mount album-filled"><img src={data.src} alt={data.alt} />{['top-left','top-right','bottom-left','bottom-right'].map(corner=><span key={corner} className={`photo-corner ${corner}`} aria-hidden="true" />)}</div>
    {data.title && <h3>{data.title}</h3>}{data.caption && <p>{data.caption}</p>}
  </article>;
}

export function PhotoAlbum({spread, onSpread}) {
  const [turn,setTurn] = useState(null);
  const bookRef = useRef(null);
  const drag = useRef(null), timer = useRef(null), ignoreClick = useRef(0);
  const turnRef = useRef(null);
  const reduced = useRef(matchMedia('(prefers-reduced-motion: reduce)'));
  const currentSpread = useRef(spread);
  currentSpread.current = spread;
  const changeTurn = value => { turnRef.current = value; setTurn(value); };
  function finish(commit, target) {
    clearTimeout(timer.current);
    if (commit) onSpread(target);
    changeTurn(null);
  }
  function settle(commit, value) {
    if (!value) return;
    if (reduced.current.matches) { finish(commit,value.target); return; }
    changeTurn({...value, progress:commit ? 1 : 0, settling:true});
    timer.current = setTimeout(() => finish(commit,value.target),560);
  }
  function start(direction) {
    const from = currentSpread.current, target = from+direction;
    if (turnRef.current || target < 0 || target > 3) return null;
    const value = {from,target,direction,progress:0,settling:false};
    changeTurn(value); return value;
  }
  function navigate(direction) {
    const target = currentSpread.current+direction;
    if (turnRef.current || target < 0 || target > 3) return;
    if (reduced.current.matches) { onSpread(target); return; }
    const value = start(direction);
    // Commit the initial transform before starting the CSS transition.
    timer.current = setTimeout(() => settle(true,value),20);
  }
  useEffect(() => {
    const media = reduced.current;
    const change = () => { if (media.matches && turnRef.current) finish(true,turnRef.current.target); };
    media.addEventListener('change',change);
    return () => { clearTimeout(timer.current); media.removeEventListener('change',change); };
  },[]);
  function pointerDown(event,direction) {
    if (turnRef.current || event.button !== 0 || spread+direction < 0 || spread+direction > 3) return;
    drag.current = {id:event.pointerId,start:event.clientX,direction,width:bookRef.current.getBoundingClientRect().width,progress:0,started:false};
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }
  function pointerMove(event) {
    const value = drag.current;
    if (!value || value.id !== event.pointerId) return;
    const distance = (value.start-event.clientX)*value.direction;
    if (!value.started && distance > 8) { value.started = true; if (!reduced.current.matches) start(value.direction); }
    if (!value.started) return;
    event.preventDefault();
    value.progress = Math.max(0,Math.min(1,distance/(value.width*.85)));
    if (turnRef.current) changeTurn({...turnRef.current,progress:value.progress});
  }
  function pointerEnd(event,cancel = false) {
    const value = drag.current;
    if (!value || value.id !== event.pointerId) return;
    drag.current = null;
    if (!value.started) return;
    ignoreClick.current = Date.now()+350;
    const commit = !cancel && value.progress > .3;
    if (reduced.current.matches) { if (commit) onSpread(spread+value.direction); }
    else settle(commit,turnRef.current);
  }
  const forward = turn?.direction === 1;
  const left = turn && !forward ? turn.target*2 : spread*2;
  const right = turn && forward ? turn.target*2+1 : spread*2+1;
  return <section className="photo-album" aria-label="Eight-page photo album" tabIndex={-1} onKeyDown={event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); navigate(event.key === 'ArrowRight' ? 1 : -1); }
  }}>
    <div className="album-stage"><div ref={bookRef} className="album-book" aria-busy={Boolean(turn)}>
      <Page index={left} /><Page index={right} />
      <div className="album-binding" aria-hidden="true" />
      {turn && <div className={`album-turn-sheet ${forward ? 'turn-forward' : 'turn-back'}`} aria-hidden="true" style={{
        transform:`rotateY(${-turn.direction*turn.progress*180}deg)`,
        transition:turn.settling ? 'transform 540ms cubic-bezier(.25,.65,.3,1)' : 'none',
        '--turn-shade':Math.sin(turn.progress*Math.PI)*.12
      }}><Page index={forward ? turn.from*2+1 : turn.from*2} className="sheet-front" /><Page index={forward ? turn.target*2 : turn.target*2+1} className="sheet-back" /></div>}
    </div>
    {[-1,1].map(direction => <button key={direction} type="button" className={`album-corner ${direction === 1 ? 'corner-next' : 'corner-prev'}`}
      aria-label={direction === 1 ? 'Turn to the next two pages' : 'Turn to the previous two pages'}
      disabled={direction === -1 ? spread === 0 : spread === 3}
      onClick={() => { if (Date.now() >= ignoreClick.current) navigate(direction); }}
      onPointerDown={event => pointerDown(event,direction)} onPointerMove={pointerMove}
      onPointerUp={event => pointerEnd(event)} onPointerCancel={event => pointerEnd(event,true)} onLostPointerCapture={event => pointerEnd(event,true)}>
      <span className="sr-only">{direction === 1 ? 'Next pages' : 'Previous pages'}</span>
    </button>)}
    </div><p className="album-counter sr-only" role="status" aria-live="polite">Pages {spread*2+1}–{spread*2+2} of 8</p>
  </section>;
}
