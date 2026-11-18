import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';
import { objectManifest, freshHotspotPaths } from '../src/scene/assets/objectAssets.js';

const catalog=JSON.parse(await readFile('assets/rebuilt/v1/catalog.json','utf8'));
const manifest=JSON.parse(await readFile('assets/rebuilt/v1/manifest.json','utf8'));
const layout=JSON.parse(await readFile('assets/rebuilt/v1/layout.json','utf8'));
assert.equal(catalog.specs.length,89);
assert.equal(new Set(catalog.specs.map(s=>s.id)).size,89);
for(const spec of catalog.specs){
  assert.equal(spec.status,'generated',spec.id);
  assert.ok(spec.generatedFile.startsWith('assets/rebuilt/v1/sources/'),spec.id);
  assert.ok(spec.generationSource.startsWith('/Users/lisili/.codex/generated_images/'),spec.id);
  const hash=createHash('sha256').update(await readFile(spec.generatedFile)).digest('hex');
  assert.equal(hash,spec.sourceSha256,`Source changed without provenance: ${spec.id}`);
}
assert.equal(manifest.assets.length,79);
assert.equal(manifest.assets.filter(a=>a.kind==='book').length,20);
assert.equal(manifest.actors.length,10);
assert.equal(manifest.actors.reduce((n,a)=>n+a.frames.length,0),44);
for(const asset of [...manifest.assets,...manifest.actors.flatMap(a=>a.frames)]){
  assert.ok(asset.file.startsWith('assets/rebuilt/v1/ready/'),asset.id);
  const {data,info}=await sharp(asset.file.split('?')[0]).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let clear=0,opaque=0,visible=0;
  for(let i=3;i<data.length;i+=4){if(!data[i])clear++;if(data[i]===255)opaque++;if(data[i])visible++;}
  assert.ok(visible>0,`Empty asset: ${asset.id}`);
  if(['bare-room','garden'].includes(asset.id))assert.equal(opaque,info.width*info.height,asset.id);
  else assert.ok(clear>info.width*info.height*.01,`Missing genuine transparent space: ${asset.id}`);
}
assert.ok(objectManifest.background.file.startsWith('assets/rebuilt/v1/ready/'));
for(const asset of objectManifest.objects)for(const part of asset.parts||[asset])assert.ok(part.file.startsWith('assets/rebuilt/v1/ready/'),asset.id);
// A closed fabric silhouette must actually cover the window, not merely have
// two enabled DOM nodes whose transparent margins leave a gap.
const curtains=[];
const closed=manifest.assets.find(a=>a.id==='curtain-closed-pair');
curtains.push({input:await sharp(closed.file.split('?')[0]).resize(closed.bounds.width,closed.bounds.height).png().toBuffer(),left:closed.bounds.x,top:closed.bounds.y});
const fabric=await sharp({create:{width:1672,height:941,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(curtains).raw().toBuffer();
for(let y=178;y<441;y++)for(let x=954;x<1356;x++)assert.ok(fabric[(y*1672+x)*4+3]>=240,`Curtain gap at ${x},${y}`);
assert.equal(freshHotspotPaths('curtain-toggle',false).length,1,'Closed curtain click contour missing');
assert.equal(freshHotspotPaths('curtain-toggle',true).length,2,'Open curtain click contours missing');
assert.equal(layout.booksIntegratedIntoShelves,true);
for(const asset of objectManifest.objects.filter(a=>/--(wall-shelf-book-|bookcase-)/.test(a.id)))assert.equal(asset.parts.length,0,asset.id);
for(const id of layout.hiddenAssets)assert.ok(!objectManifest.objects.flatMap(a=>a.parts).some(a=>a.id===id),`Removed ${id} is still rendered`);
// Compare the actual registered alpha, not just overlapping rectangles. The
// lamp and pot must be separate; adjacent stack layers must physically overlap.
const masks=new Map();
for(const id of ['coffee-cabinet','espresso-machine','grinder','beans-jar','mug','red-racket','blue-racket','desk','laptop','pencil-cup','pencil-1','pencil-2','pencil-3','sheet-music','desk-lamp','desk-plant','desk-book-01','desk-book-02','desk-book-03']) {
  const asset=manifest.assets.find(a=>a.id===id),b=asset.bounds;
  const data=await sharp(asset.file.split('?')[0]).resize(b.width,b.height).ensureAlpha().raw().toBuffer();
  masks.set(id,{b,data});
}
function overlap(a,b) {
  let pixels=0;
  for(let y=Math.max(a.b.y,b.b.y);y<Math.min(a.b.y+a.b.height,b.b.y+b.b.height);y++)
    for(let x=Math.max(a.b.x,b.b.x);x<Math.min(a.b.x+a.b.width,b.b.x+b.b.width);x++)
      if(a.data[((y-a.b.y)*a.b.width+x-a.b.x)*4+3]>240&&b.data[((y-b.b.y)*b.b.width+x-b.b.x)*4+3]>240)pixels++;
  return pixels;
}
assert.equal(overlap(masks.get('desk-lamp'),masks.get('desk-plant')),0,'Lamp merges with desk plant');
assert.ok(overlap(masks.get('desk-book-01'),masks.get('desk-book-02'))>50,'Top desk book floats above the middle book');
assert.ok(overlap(masks.get('desk-book-02'),masks.get('desk-book-03'))>50,'Middle desk book floats above the bottom book');
function alphaAt(mask,x,y) {
  const dx=x-mask.b.x,dy=y-mask.b.y;
  return dx<0||dy<0||dx>=mask.b.width||dy>=mask.b.height?0:mask.data[(dy*mask.b.width+dx)*4+3];
}
function footAt(mask,x) {
  for(let y=mask.b.y+mask.b.height-1;y>=mask.b.y;y--)if(alphaAt(mask,x,y)>240)return y;
  throw Error('Missing opaque foot');
}
// Actual base pixels must sit inside the cabinet's top surface.
for(const id of ['espresso-machine','grinder','beans-jar','mug']) {
  const object=masks.get(id);let lowest=0,contactX=0;
  for(let x=object.b.x;x<object.b.x+object.b.width;x++)for(let y=object.b.y+object.b.height-1;y>=object.b.y;y--)if(alphaAt(object,x,y)>240){if(y>lowest){lowest=y;contactX=x;}break;}
  assert.ok(lowest>=532&&lowest<=540,`${id} base floats or sinks: ${lowest}`);
  assert.ok(alphaAt(masks.get('coffee-cabinet'),contactX,lowest+1)>240,`${id} misses counter`);
}
function opaqueHeight(mask){let top=Infinity,bottom=-Infinity;for(let y=mask.b.y;y<mask.b.y+mask.b.height;y++)for(let x=mask.b.x;x<mask.b.x+mask.b.width;x++)if(alphaAt(mask,x,y)>240){top=Math.min(top,y);bottom=Math.max(bottom,y);}return bottom-top+1;}
assert.ok(Math.abs(opaqueHeight(masks.get('red-racket'))-opaqueHeight(masks.get('blue-racket')))<=3,'Racket visible heights differ');
const cup=masks.get('pencil-cup'),desk=masks.get('desk'),laptop=masks.get('laptop');
assert.ok(cup.b.x+cup.b.width<=laptop.b.x,'Pencil cup must sit beside the computer');
for(const t of [.35,.5,.65]) {
  const x=Math.round(cup.b.x+cup.b.width*t),y=footAt(cup,x);
  assert.ok(alphaAt(desk,x,y+1)>240,`Pencil cup has no desktop contact at ${x},${y}`);
}
for(const id of ['pencil-1','pencil-2','pencil-3'])assert.ok(overlap(cup,masks.get(id))>0,`${id} floats above its cup`);
const score=masks.get('sheet-music'),rack=layout.contacts.musicRack;
let scoreMask=score;
const scoreAsset=manifest.assets.find(a=>a.id==='sheet-music');
const runtimeScore=objectManifest.objects.find(a=>a.id==='piano--sheet-music').parts[0];
assert.equal(runtimeScore.transform,scoreAsset.transform,'Runtime export lost the score display registration');
if(scoreAsset.transform) {
  const png=(await readFile(scoreAsset.file.split('?')[0])).toString('base64'),b=score.b;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1672" height="941"><image href="data:image/png;base64,${png}" x="${b.x}" y="${b.y}" width="${b.width}" height="${b.height}" preserveAspectRatio="none" transform="${scoreAsset.transform}"/></svg>`;
  const image=new Resvg(svg).render().asPng();
  scoreMask={b:{x:0,y:0,width:1672,height:941},data:await sharp(image).ensureAlpha().raw().toBuffer()};
}
for(const t of [.25,.5,.75]) {
  const x=Math.round(score.b.x+score.b.width*t),y=footAt(scoreMask,x);
  const ledgeY=rack.left.y+(rack.right.y-rack.left.y)*(x-rack.left.x)/(rack.right.x-rack.left.x);
  assert.ok(Math.abs(y-ledgeY)<=4,`Score misses the upper-panel rack at ${x},${y}`);
}
console.log('Verified fresh sources, alpha, integrated shelf books, archived book variants, actor frames and closed-curtain coverage.');
