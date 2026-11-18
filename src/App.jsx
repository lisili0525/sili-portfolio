import { useInteractionFeedback } from './hooks/useInteractionFeedback.js';
import { canonicalEntry } from './data/destinations.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Room } from './components/Room.jsx';
import { PhotoAlbum } from './components/PhotoAlbum.jsx';
import { PianoControls } from './components/PianoControls.jsx';
import { entries } from './data/entries.jsx';
import { useRoomRuntime } from './hooks/useRoomRuntime.js';
import { useFullscreen } from './hooks/useFullscreen.js';

export function App() {
  const rootRef = useRef(null), roomRef = useRef(null), dialogRef = useRef(null), exploreRef = useRef(null), navRef = useRef(null);
  const origin = useRef(null), request = useRef(0), mounted = useRef(false), switchingDialog = useRef(false);
  const [entry,setEntry] = useState(null), [menu,setMenu] = useState(false), [spread,setSpread] = useState(0);
  const {services,piano} = useRoomRuntime(rootRef);
  useInteractionFeedback(rootRef);
  const screen = useFullscreen();
  const closeMenu = useCallback((restore = false) => { setMenu(false); if (restore) exploreRef.current?.focus(); },[]);
  const openEntry = useCallback(async (key,trigger) => {
    key=canonicalEntry(key);
    if (!entries[key]) return;
    if(key==='cats'&&trigger?.dataset.cat){
      request.current++;setMenu(false);origin.current=trigger;
      if(dialogRef.current.open) { switchingDialog.current=true; dialogRef.current.close(); }
      setEntry(null);
      void services.current.actions.select('cats',{cat:trigger.dataset.cat,catInteraction:trigger.dataset.catInteraction,direct:true});
      return;
    }
    const id = ++request.current;
    const focus = trigger?.closest('#destinations') ? exploreRef.current : trigger;
    if (!dialogRef.current.open) origin.current = focus || exploreRef.current;
    setMenu(false);
    if (dialogRef.current.open) { switchingDialog.current=true; dialogRef.current.close(); }
    setEntry(null);
    origin.current = focus || exploreRef.current;
    origin.current?.focus();
    const arrived = await services.current.actions.select(key,{cat:trigger?.dataset.cat});
    if (!mounted.current || !arrived || request.current !== id) return;
    if (key === 'photos' && trigger?.dataset.albumFirst === 'true') setSpread(0);
    setEntry(key);
  },[services]);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; request.current++; };
  },[]);
  useEffect(() => {
    if (!entry) return;
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    if (entry === 'photos') dialog.querySelector('.photo-album')?.focus();
  },[entry]);
  useEffect(() => {
    if (!menu) return;
    navRef.current?.querySelector('button')?.focus();
    const closeOutside = event => { if (!event.target.closest('#destinations') && !event.target.closest('#explore')) closeMenu(); };
    const key = event => { if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); } };
    document.addEventListener('click',closeOutside);
    document.addEventListener('focusin',closeOutside);
    document.addEventListener('keydown',key);
    return () => { document.removeEventListener('click',closeOutside); document.removeEventListener('focusin',closeOutside); document.removeEventListener('keydown',key); };
  },[menu,closeMenu]);
  function closed() {
    // Programmatic closes must not cancel the next destination or restore old focus.
    if (switchingDialog.current) { switchingDialog.current=false; return; }
    if (dialogRef.current.open) return;
    setEntry(null); services.current.actions.closeAlbum(); origin.current?.focus();
  }
  const active = ['walking','playing'].includes(piano.state);
  const musicAction = piano.muted ? 'Unmute' : 'Mute';
  const canPause = piano.state === 'playing' && !piano.playbackBlocked;
  const showPlayback = piano.atPiano && ['playing','paused'].includes(piano.state);
  const content = entry ? entries[entry] : null;
  const musicButtons = <div className="room-music-controls">
    <button id="music-toggle" className="music-sound-toggle" type="button" aria-label={`${musicAction} music`} aria-pressed={piano.muted} data-playing={active} data-muted={piano.muted} onClick={() => services.current.piano.toggleSound()}><span className="music-glyph" aria-hidden="true">♪</span></button>
    {showPlayback && <button id="piano-playback" type="button" aria-label={canPause ? 'Pause piano' : 'Play piano'} onClick={() => services.current.piano.togglePlayback()}>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">{canPause ? <path d="M6 4h4v16H6zM14 4h4v16h-4z" /> : <path d="M7 3l15 9-15 9z" />}</svg>
    </button>}
  </div>;
  return <div ref={rootRef} className="app">
    <button ref={exploreRef} id="explore" aria-expanded={menu} aria-controls="destinations" onClick={() => setMenu(value => !value)}>Explore <span aria-hidden="true">↗</span></button>
    <button id="fullscreen" type="button" aria-label={screen.active ? 'Exit fullscreen' : 'Enter fullscreen'} aria-pressed={screen.active} hidden={!screen.supported} disabled={screen.busy} onClick={screen.toggle}><span aria-hidden="true">⛶</span> <span className="fullscreen-label">{screen.active ? 'Exit fullscreen' : 'Fullscreen'}</span></button>
    <p id="screen-status" className="sr-only" role="status">{screen.status}</p>
    <p id="journey-status" className="sr-only" role="status" aria-live="polite" />
    {!entry && musicButtons}
    <p className="piano-arrival-hint" role="status" aria-live="polite" aria-hidden={piano.state !== 'walking'} data-visible={piano.state === 'walking'}>Settling in for a little music…</p>
    <Room roomRef={roomRef} onEntry={openEntry} />
    <nav ref={navRef} id="destinations" aria-label="Room destinations" hidden={!menu}>{Object.entries(entries).map(([key,value]) => <button key={key} type="button" onClick={event => openEntry(key,event.currentTarget)}>{value.title}</button>)}</nav>
    <dialog ref={dialogRef} id="detail" aria-labelledby="detail-title" data-entry={entry || undefined}
      className={[entry === 'photos' ? 'album-view' : '', piano.engaged ? 'with-piano' : ''].filter(Boolean).join(' ')}
      onClose={closed} onCancel={() => { request.current++; }} onClick={event => {
        if (entry === 'photos') { if (!event.target.closest('.album-stage,.close,.music-browse-controls,.room-music-controls')) dialogRef.current.close(); return; }
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialogRef.current.close();
      }}>
      <button className="close" aria-label="Close and return to the room" onClick={() => dialogRef.current.close()}>×</button>
      <div className="paper"><p className="eyebrow" id="detail-label">{content?.label}</p><h2 id="detail-title">{content?.title}</h2>
        <div id="detail-body" onClick={event => { const trigger = event.target.closest('button[data-entry]'); if (trigger) openEntry(trigger.dataset.entry,trigger); }}>
          {entry === 'photos' ? <PhotoAlbum spread={spread} onSpread={setSpread} /> : entry === 'music' ? <><p>Music is part of my life, both listening and playing.</p><p className="note">Choose a recording below. Selecting a piece starts it from the beginning.</p><PianoControls piano={piano} controller={services} /></> : content ? content.body : null}
        </div>
      </div>
      {piano.engaged && entry && entry !== 'music' && <PianoControls piano={piano} controller={services} compact />}
      {entry && musicButtons}
    </dialog>
  </div>;
}
