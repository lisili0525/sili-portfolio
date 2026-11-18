import { WindowGroundLight } from './WindowDaylight.jsx';
import { findObjectAsset } from '../assets/objectAssets.js';
export function RoomLighting(){
  return <div className="scene-module daylight-module" data-scene-object="sunlight">
    <svg className="scene-artwork floor-sunlight" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
      {['lighting--window-shade','lighting--window-sunlight'].map(id=>{const asset=findObjectAsset(id);return <image key={id} data-lighting-part={id} href={asset.file} x={asset.bounds.x} y={asset.bounds.y} width={asset.bounds.width} height={asset.bounds.height} />;})}
    </svg><WindowGroundLight />
  </div>;
}
