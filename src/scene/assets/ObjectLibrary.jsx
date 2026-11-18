import { useEffect, useMemo, useRef, useState } from 'react';
import { regeneratedManifest } from './regeneratedManifest.js';
import './objectLibrary.css';

export default function ObjectLibrary() {
  const [filter,setFilter]=useState('all'),[selected,setSelected]=useState(null);
  const dialog=useRef(null);
  useEffect(()=>{if(selected&&!dialog.current.open)dialog.current.showModal();else if(!selected&&dialog.current.open)dialog.current.close();},[selected]);
  const objects=useMemo(()=>[
    ...regeneratedManifest.assets,
    ...regeneratedManifest.actors.flatMap(actor=>actor.frames.map(frame=>({...frame,owner:actor.id}))),
  ],[]);
  const visible=objects.filter(asset=>filter==='all'||(filter==='books'?asset.kind==='book':filter==='actors'?asset.kind==='actor':filter==='plants'?asset.kind==='plant':asset.id==='bare-room'));
  return <section className="object-library">
    <header><div><h1>Room object library</h1><p>Complete transparent assets. Shelf books are integrated; individual book variants are preserved for reuse.</p></div><a href="./">Back to the room</a></header>
    <nav aria-label="Asset categories">{[['all','All assets'],['books','Books'],['plants','Plants'],['actors','Character frames'],['background','Bare room']].map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}</button>)}</nav>
    <p role="status">{visible.length} assets · {regeneratedManifest.assets.filter(a=>a.kind==='book').length} independent books</p>
    <div className="asset-grid">{visible.map(asset=><article key={asset.id}>
      <button className="asset-preview checkerboard" onClick={()=>setSelected(asset)} aria-label={`Inspect ${asset.id}`}><img src={asset.file} alt={asset.id} loading="lazy" /></button>
      <h2>{asset.id}</h2><p>{asset.owner}</p><a href={asset.file} download>Download PNG</a>
    </article>)}</div>
    <dialog ref={dialog} className="asset-inspector" aria-labelledby="asset-title" onClose={()=>setSelected(null)} onCancel={()=>setSelected(null)}>{selected&&<>
      <button autoFocus onClick={()=>setSelected(null)}>Close inspection</button>
      <h2 id="asset-title">{selected.id}</h2><div className="checkerboard"><img src={selected.file} alt={selected.id} /></div>
      <p>{selected.owner} · {selected.bounds.width} × {selected.bounds.height} world units</p>
      <a href={selected.file} download>Download PNG</a>
    </>}</dialog>
  </section>;
}
