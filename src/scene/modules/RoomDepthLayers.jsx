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
    <svg width="0" height="0" aria-hidden="true" style={{position:'absolute'}}><defs>
      <clipPath id="seated-chair-front" clipPathUnits="objectBoundingBox">
        <polygon points="0,0 .60,0 .60,.36 0,.36" />
        <polygon points=".38,.16 .47,.16 .54,.48 .55,.68 .51,1 .41,1 .445,.56 .42,.38" />
        <polygon points=".03,.23 .115,.26 .15,.48 .10,.88 0,.88 .065,.5" />
        <polygon points="0,.54 .14,.54 .19,.53 .31,.56 .43,.585 .54,.59 .66,.575 .84,.554 .98,.54 1,.54 1,1 0,1" />
      </clipPath>
    </defs></svg>
    <img className="desk-chair desk-chair-front" src={chair.file} style={{left:`${chair.bounds.x/1672*100}%`,top:`${chair.bounds.y/941*100}%`,width:`${chair.bounds.width/1672*100}%`,height:`${chair.bounds.height/941*100}%`}} alt="" aria-hidden="true" />
    <Pieces className="scene-artwork desk-leg-foreground" ids={['work-desk--desk-frame']} />
    <Pieces className="table-foreground" ids={[table[0],'table-album--physical-album',...table.slice(1)]} />
    <Pieces className="table-empty-foreground" ids={table} />
    <Pieces className="piano-foreground" ids={['piano-bench--wooden-bench','piano-bench--bench-blanket']} />
  </>;
}
