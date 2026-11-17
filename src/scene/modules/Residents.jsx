import { useEffect } from 'react';
import standing from '../../../assets/sili-poses-v1.png';
import walking from '../../../assets/sili-walk-v2.png';
import piano from '../../../assets/sili-piano-v4.png';
import coffee from '../../../assets/sili-coffee-v3.png';
import computer from '../../../assets/sili-computer-v3.png';
import writing from '../../../assets/sili-writing-v2.png';
import interactions from '../../../assets/sili-interactions-v1.png';

const characterSheets={standing,walking,piano,coffee,computer,writing,interactions};

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
      <button type="button" className="cat" data-entry="cats" data-cat={name} onClick={event=>onEntry('cats',event.currentTarget)} aria-label={`Meet Viola & Java: ${name==='viola'?'Viola':'Java'}`} title="Meet Viola & Java"><span className="cat-sprite" aria-hidden="true" /></button>
    </div>)}
    <div id="sili" className="sili" data-scene-object="sili" data-pose="idle" aria-hidden="true"><div className="sili-sprite">{Object.keys(characterSheets).map(sheet=><span key={sheet} className={`sili-sheet sheet-${sheet}`} />)}</div></div>
  </>;
}
