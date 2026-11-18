import { RegisteredImages } from '../shared/SceneArtwork.jsx';
import { findObjectAsset } from '../assets/objectAssets.js';

function Pieces({ids,className}) {
  return <svg className={className} viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
    {ids.map(id=>{const asset=findObjectAsset(id);return asset&&<RegisteredImages key={id} asset={asset} />;})}
  </svg>;
}
// Keep direct sibling ordering and the existing pose-specific occlusion geometry.
export function RoomDepthLayers(){
  const chair=findObjectAsset('work-chair--complete');
  const table=['coffee-table--round-coffee-table','table-plant--pot','table-plant--leaves'];
  return <>
    <img className="desk-chair desk-chair-front" src={chair.file} style={{left:`${chair.bounds.x/1672*100}%`,top:`${chair.bounds.y/941*100}%`,width:`${chair.bounds.width/1672*100}%`,height:`${chair.bounds.height/941*100}%`}} alt="" aria-hidden="true" />
    <img className="desk-chair desk-chair-seat-front" src={chair.file} style={{left:`${chair.bounds.x/1672*100}%`,top:`${chair.bounds.y/941*100}%`,width:`${chair.bounds.width/1672*100}%`,height:`${chair.bounds.height/941*100}%`}} alt="" aria-hidden="true" />
    <Pieces className="scene-artwork desk-leg-foreground" ids={['work-desk--desk-frame']} />
    <Pieces className="table-foreground" ids={[table[0],'table-album--physical-album',...table.slice(1)]} />
    <Pieces className="table-empty-foreground" ids={table} />
    <Pieces className="piano-foreground" ids={['piano-bench--wooden-bench','piano-bench--bench-blanket']} />
  </>;
}
