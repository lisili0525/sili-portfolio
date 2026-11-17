import { furniture } from '../furnitureCatalog.js';
import { SceneArtwork } from '../shared/SceneArtwork.jsx';

// Keep these as direct stage siblings: calibrated actor-depth CSS depends on it.
export function RoomDepthLayers(){
  const deskFrame=furniture.desk.parts.find(part=>part.id==='desk-frame');
  return <>
    <SceneArtwork className="desk-foreground" dataPart="desk-occlusion" path={deskFrame.path} source={deskFrame.source} edgePadding={0} />
    <img className="desk-chair desk-chair-front" src="assets/desk-chair-v1.png" alt="" aria-hidden="true" width="629" height="772" />
    <img className="table-foreground" src="assets/room-clean-v7.png" alt="" aria-hidden="true" width="1672" height="941" />
    <img className="table-empty-foreground" src="assets/room-hidden-surfaces-v1.png" alt="" aria-hidden="true" width="1672" height="941" />
    <img className="piano-foreground" src="assets/room-clean-v7.png" alt="" aria-hidden="true" width="1672" height="941" />
  </>;
}
