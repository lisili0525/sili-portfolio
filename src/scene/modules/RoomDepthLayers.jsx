// Keep these as direct stage siblings: calibrated actor-depth CSS depends on it.
export function RoomDepthLayers(){
  return <>
    <img className="desk-foreground" src="assets/room-hidden-surfaces-v1.png" alt="" aria-hidden="true" width="1672" height="941" />
    <img className="desk-chair desk-chair-front" src="assets/desk-chair-v1.png" alt="" aria-hidden="true" width="629" height="772" />
    <img className="table-foreground" src="assets/room-clean-v7.png" alt="" aria-hidden="true" width="1672" height="941" />
    <img className="table-empty-foreground" src="assets/room-hidden-surfaces-v1.png" alt="" aria-hidden="true" width="1672" height="941" />
    <img className="piano-foreground" src="assets/room-clean-v7.png" alt="" aria-hidden="true" width="1672" height="941" />
  </>;
}
