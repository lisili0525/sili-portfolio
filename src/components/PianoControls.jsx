import { recordings } from '../controllers/piano.js';

export function PianoControls({piano, controller, compact = false, onMusic}) {
  if (compact) return <div id="music-browse-controls" className="music-browse-controls" role="group" aria-label="Piano controls">
    <button type="button" onClick={onMusic}>Music list</button>
    <button id="browse-sound" type="button" aria-pressed={!piano.muted} onClick={() => controller.current.piano.toggleSound()}>{piano.muted ? 'Sound off' : 'Sound on'}</button>
    <button id="browse-stop" type="button" onClick={() => controller.current.piano.stop()}>Stop music</button>
  </div>;
  return <aside id="performance" aria-label="Piano recordings">
    <h3>Recordings</h3>
    <ul id="music-tracks" aria-label="Choose a recording">{recordings.map((track,index) => <li key={track.src}>
      <button type="button" className="music-track" aria-label={`Play ${track.title}`} aria-current={index === piano.selectedTrack ? 'true' : 'false'} onClick={() => controller.current.piano.chooseTrack(index)}>{track.title}</button>
    </li>)}</ul>
    <p id="performance-status" role="status">{piano.status}</p>
    <button id="sound" type="button" aria-pressed={!piano.muted} onClick={() => controller.current.piano.toggleSound()}>{piano.muted ? 'Sound off' : 'Sound on'}</button>
    {(piano.state === 'paused' || piano.playbackBlocked) && <button id="resume-recording" type="button" onClick={() => controller.current.piano.resume()}>{piano.state === 'paused' ? 'Resume recording' : 'Play recording'}</button>}
    <button type="button" className="inline-link" onClick={() => controller.current.piano.stop()}>Stop playing</button>
  </aside>;
}
