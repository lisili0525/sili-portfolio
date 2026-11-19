import { useEffect } from 'react';
import { seatedMaterials } from '../assets/seatedMaterials.js';
import { findActorAsset, rebuiltArtwork } from '../assets/objectAssets.js';
import layout from '../../../assets/rebuilt/v1/layout.json';

const characterSheets=Object.fromEntries(['standing','walking','piano','coffee','coffee-brewing','computer','writing','interactions'].map(name=>[name,findActorAsset(`sili-${name}`).file]));
Object.assign(characterSheets,seatedMaterials);
const pianoSeat=layout.seating.piano;
const seatedStyle={
  '--piano-left':`${pianoSeat.x/1672*100}%`,
  '--piano-bottom':`${(941-pianoSeat.feetY-pianoSeat.height*26/512)/941*100}%`,
  '--piano-height':`${pianoSeat.height/941*100}%`,
};

export function Residents({onEntry}) {
  useEffect(()=>{
    // Decode all poses before their first interaction instead of fetching on a swap.
    for(const src of Object.values(characterSheets)) {
      const image=new Image();image.src=src;
      if(image.decode) void image.decode().catch(()=>{});
    }
  },[]);
  return <>
    {['viola','java'].map(name=><div id={name} key={name} className="cat-layer" data-scene-object={name}>
      <button type="button" className="cat" data-entry="cats" data-cat={name} onClick={event=>onEntry('cats',event.currentTarget)} aria-label={`Meet Viola & Java: ${name==='viola'?'Viola':'Java'}`} title="Meet Viola & Java"><span className="cat-sprite" style={rebuiltArtwork?{backgroundImage:`url("${findActorAsset(name).file}")`}:undefined} aria-hidden="true" /></button>
    </div>)}
    <div id="sili" className="sili" style={seatedStyle} data-scene-object="sili" data-pose="idle" aria-hidden="true"><div className="sili-sprite">{Object.entries(characterSheets).map(([sheet,file])=><span key={sheet} className={`sili-sheet sheet-${sheet}`} data-pose-material={seatedMaterials[sheet]?'coffee':undefined} style={{backgroundImage:`url("${file}")`}} />)}</div></div>
  </>;
}
