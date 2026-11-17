import { recordings } from '../controllers/piano.js';

export function PianoControls({piano, controller, compact = false}) {
  const canPause = ['walking','playing'].includes(piano.state) && !piano.playbackBlocked;
  const controls = <>
    <button type="button" aria-pressed={piano.muted} onClick={() => controller.current.piano.toggleSound()}>{piano.muted ? 'Unmute' : 'Mute'}</button>
    {piano.state === 'paused' ? <>
      <button type="button" onClick={() => controller.current.piano.resume()}>Continue</button>
      <button type="button" onClick={() => controller.current.piano.restart()}>Start over</button>
    </> : <button type="button" onClick={() => controller.current.piano.togglePlayback()}>{canPause ? 'Pause' : 'Play'}</button>}
  </>;
  if (compact) return <div id="music-browse-controls" className="music-browse-controls" role="group" aria-label="Piano controls">
    {controls}
  </div>;
  return <aside id="performance" aria-label="Piano recordings">
    <h3>Recordings</h3>
    <ul id="music-tracks" aria-label="Choose a recording">{recordings.map((track,index) => <li key={track.src}>
      <button type="button" className="music-track" aria-label={`Play ${track.title}`} aria-current={index === piano.selectedTrack ? 'true' : 'false'} onClick={() => controller.current.piano.chooseTrack(index)}>{track.title}</button>
    </li>)}</ul>
    <p id="performance-status" role="status">{piano.status}</p>
    <div className="playback-actions" role="group" aria-label="Playback controls">{controls}</div>
  </aside>;
}
