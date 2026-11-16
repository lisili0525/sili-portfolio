import { SceneArtwork } from '../shared/SceneArtwork.jsx';
export function RoomLighting(){
  return <div className="scene-module daylight-module" data-scene-object="sunlight">
    <SceneArtwork source="assets/room-architecture-v1.png" path="M15 704 H705 V817 H15 Z" className="floor-sunlight" />
  </div>;
}
