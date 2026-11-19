// Static raster grain: one tiny tile, no live turbulence or animation per frame.
import paper from './assets/illustration-paper.png';
export function RoomPaper() {
  return <div className="room-paper" style={{backgroundImage:`url("${paper}")`,backgroundSize:'11.4833% auto'}} aria-hidden="true" />;
}
