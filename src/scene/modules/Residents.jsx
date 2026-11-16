export function Residents({onEntry}) {
  return <>
    {['viola','java'].map(name=><div id={name} key={name} className="cat-layer" data-scene-object={name}>
      <button type="button" className="cat" data-entry="cats" data-cat={name} onClick={event=>onEntry('cats',event.currentTarget)} aria-label={`Meet Viola & Java: ${name==='viola'?'Viola':'Java'}`} title="Meet Viola & Java"><span className="cat-sprite" aria-hidden="true" /></button>
    </div>)}
    <div id="sili" className="sili" data-scene-object="sili" data-pose="idle" aria-hidden="true"><div className="sili-sprite" /></div>
  </>;
}
