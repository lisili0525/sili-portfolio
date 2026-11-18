import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
const manifest=JSON.parse(await readFile('assets/rebuilt/v1/manifest.json','utf8'));
// Trace actual alpha-cell boundaries of the newly generated asset. This is hit
// geometry only; it never clips or modifies the source artwork.
for(const asset of manifest.assets.filter(a=>!['background','glass','effect'].includes(a.kind))) {
  const w=Math.max(1,Math.round(asset.bounds.width)),h=Math.max(1,Math.round(asset.bounds.height));
  const {data}=await sharp(asset.file.split('?')[0]).resize(w,h).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const filled=(x,y)=>x>=0&&y>=0&&x<w&&y<h&&data[(y*w+x)*4+3]>128;
  const edges=new Map();
  function edge(x,y,nx,ny){const key=`${x},${y}`;if(!edges.has(key))edges.set(key,[]);edges.get(key).push([nx,ny]);}
  for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(filled(x,y)){
    if(!filled(x,y-1))edge(x,y,x+1,y);
    if(!filled(x+1,y))edge(x+1,y,x+1,y+1);
    if(!filled(x,y+1))edge(x+1,y+1,x,y+1);
    if(!filled(x-1,y))edge(x,y+1,x,y);
  }
  const loops=[];
  while(edges.size){
    const start=edges.keys().next().value,points=[start.split(',').map(Number)];let key=start;
    do {const choices=edges.get(key);if(!choices?.length)break;const p=choices.pop();if(!choices.length)edges.delete(key);points.push(p);key=p.join(',');}while(key!==start&&points.length<w*h*4);
    if(key!==start||points.length<5)continue;
    const area=points.reduce((sum,p,i)=>{const q=points[(i+1)%points.length];return sum+p[0]*q[1]-q[0]*p[1];},0)/2;
    if(Math.abs(area)<5)continue;
    const compact=points.filter((p,i)=>{if(i===0||i===points.length-1)return true;const a=points[i-1],b=points[i+1];return (p[0]-a[0])*(b[1]-p[1])!==(p[1]-a[1])*(b[0]-p[0]);});
    loops.push(`M${compact.map(p=>`${(asset.bounds.x+p[0]*asset.bounds.width/w).toFixed(1)} ${(asset.bounds.y+p[1]*asset.bounds.height/h).toFixed(1)}`).join('L')}Z`);
  }
  asset.hitPath=loops.join('');
}
await writeFile('assets/rebuilt/v1/manifest.json',JSON.stringify(manifest,null,2)+'\n');
const interactive=new Set(['piano','piano-bench','espresso-machine','grinder','beans-jar','mug','wall-portrait','physical-album','calendar','red-racket','blue-racket','ball-basket','laptop','notebook','camera','desk-lamp','curtain-open-left','curtain-open-right','curtain-closed-left','curtain-closed-right','curtain-closed-pair']);
const runtime={...manifest,assets:manifest.assets.map(({id,kind,file,bounds,hitPath,transform})=>({id,kind,file,bounds,...(transform?{transform}:{}),...(interactive.has(id)?{hitPath}: {})}))};
await writeFile('src/scene/assets/regeneratedManifest.js',`// Generated from fresh imagegen outputs; full provenance stays outside the client.\nexport const regeneratedManifest = ${JSON.stringify(runtime,null,2)};\n`);
console.log(`Traced fresh alpha contours for ${manifest.assets.filter(a=>a.hitPath).length} assets.`);
