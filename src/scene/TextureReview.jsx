// Static raster grain: one tiny tile, no live turbulence or animation per frame.
import paper from './assets/illustration-paper.png';
export const textureReviewEnabled = import.meta.env.DEV || import.meta.env.MODE === 'runtime-preview';
export function RoomPaper() {
  return <div className="room-paper" style={{backgroundImage:`url("${paper}")`,backgroundSize:'11.4833% auto'}} aria-hidden="true" />;
}
export function TextureReview({value,onChange}) {
  return <div className="texture-review" role="group" aria-label="Illustration texture comparison">
    <button type="button" aria-pressed={value==='original'} onClick={()=>onChange('original')}>A · Current</button>
    <button type="button" aria-pressed={value==='soft'} onClick={()=>onChange('soft')}>B · Soft paper</button>
    <button type="button" aria-pressed={value==='painted'} onClick={()=>onChange('painted')}>D · Repaint</button>
  </div>;
}
