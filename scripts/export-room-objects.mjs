import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import { objectRecipes, artworkKey, books } from '../src/scene/assets/objectRecipes.js';
import { furniture, plants } from '../src/scene/furnitureCatalog.js';
import { roomSpace, originalArtwork, coffeeStation } from '../src/scene/sceneObjects.js';

const output = 'assets/objects/generated';
await mkdir(output, { recursive: true });
const sourceCache = new Map();
const sourceHashes = {};
async function embedded(file) {
  if (!sourceCache.has(file)) {
    const bytes = await readFile(file);
    sourceHashes[file] = createHash('sha256').update(bytes).digest('hex');
    sourceCache.set(file, `data:image/png;base64,${bytes.toString('base64')}`);
  }
  return sourceCache.get(file);
}
const escape = value => value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const clip = (id, paths, padding = 0) => {
  const d = padding/Math.sqrt(2);
  const offsets = padding ? [[0,0],[padding,0],[-padding,0],[0,padding],[0,-padding],[d,d],[-d,d],[d,-d],[-d,-d]] : [[0,0]];
  return `<clipPath id="${id}" clipPathUnits="userSpaceOnUse">${paths.flatMap(p=>offsets.map(([x,y])=>`<path d="${escape(p)}" transform="translate(${x} ${y})"/>`)).join('')}</clipPath>`;
};
const image = (href, attributes = '') => `<image href="${href}" width="1672" height="941" preserveAspectRatio="none" ${attributes}/>`;
const partPath = (object, name) => object.parts.find(part=>part.id===name)?.path;
const plantPaths = plants.flatMap(plant=>plant.parts.filter(part=>!part.id.includes('pot')).map(part=>part.path));
const repairMaster = 'assets/objects/masters/furniture-underpainting-v1.png';
const deskMaster = 'assets/objects/masters/desk-underpainting-v1.png';
const rugMaster = 'assets/objects/masters/rug-underpainting-v1.png';
function repairsFor(asset) {
  const id=asset.id;
  if(id==='rug--woven-rug') return [partPath(furniture.coffeeTable,'round-coffee-table'),partPath(furniture.sofa,'sofa-body'),...plantPaths,partPath(furniture.album,'physical-album')];
  if(id==='work-desk--desk-frame'||id==='work-desk--foreground') return [furniture.computer,furniture.notebook,furniture.stationery,furniture.lamp,furniture.deskBooks,...plants.filter(plant=>plant.id==='desk-plant')].flatMap(object=>object.parts.map(part=>part.path));
  if(id==='coffee-cabinet--cabinet-and-counter') return Object.values(coffeeStation.parts);
  if(id==='piano--cabinet') return [partPath(furniture.piano,'sheet-music'),...plantPaths];
  if(id==='piano-bench--wooden-bench') return [partPath(furniture.pianoBench,'bench-blanket')];
  if(id==='wall-shelf--shelf') return [...books.filter(book=>book.owner==='wall-shelf').map(book=>book.path),partPath(furniture.wallShelf,'camera'),...plantPaths];
  if(id==='bookcase--wooden-bookcase') return [...books.filter(book=>book.owner==='bookcase').map(book=>book.path),...plantPaths];
  if(id==='sofa--sofa-body') return [partPath(furniture.sofa,'sofa-cushion'),partPath(furniture.sofa,'sofa-throw'),...plantPaths];
  if(id==='coffee-table--round-coffee-table') return [...plantPaths,plants.find(plant=>plant.id==='table-plant').parts[0].path];
  return [];
}

const manifest = [];
async function saveAsset(asset, svg, transform) {
  const rendered = new Resvg(svg,{font:{loadSystemFonts:false}}).render().asPng();
  let { data, info } = await sharp(rendered).ensureAlpha().raw().toBuffer({ resolveWithObject:true });
  if (transform) data = await transform(data, info);
  if(asset.owner==='sofa'&&(asset.id.includes('throw')||asset.id.includes('cushion')))for(let i=0;i<data.length;i+=4)if(data[i+2]>data[i]*.95&&data[i+1]>data[i]*.9)data[i+3]=0;
  if(asset.kind==='book'&&asset.owner==='wall-shelf'){
    const fill=asset.repairColor.slice(1).match(/../g).map(value=>parseInt(value,16));
    for(let i=0;i<data.length;i+=4){const r=data[i],g=data[i+1],b=data[i+2];if(data[i+3]&&r<g*1.22&&g>38&&b<Math.max(r,g)*.64){data[i]=fill[0];data[i+1]=fill[1];data[i+2]=fill[2];}}
  }
  if(asset.owner==='tennis-corner')for(let y=610;y<712;y++)for(let x=895;x<1044;x++){
    const p=(y*info.width+x)*4;if(!data[p+3])continue;
    const head=asset.id.includes('red-racket')?((x-960)/26)**2+((y-658)/40)**2<1:asset.id.includes('blue-racket')?((x-1009)/25)**2+((y-674)/31)**2<1:false;
    if(head&&data[p]>120&&data[p+1]>95&&data[p+2]>40)data[p+3]=0;
    if(asset.id.includes('ball-basket')&&x>897&&x<966&&y>660&&y<708&&data[p]>data[p+1]*1.4&&data[p+1]>95)data[p+3]=0;
  }

  let left=info.width,top=info.height,right=-1,bottom=-1,opaque=0,transparent=0;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++) {
    const alpha=data[(y*info.width+x)*4+3];
    if(alpha){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y);opaque++;} else transparent++;
  }
  if(right<left)throw Error(`Empty object: ${asset.id}`);
  left=Math.max(0,left-2);top=Math.max(0,top-2);right=Math.min(info.width-1,right+2);bottom=Math.min(info.height-1,bottom+2);
  const bounds={x:left,y:top,width:right-left+1,height:bottom-top+1};
  const file=`${output}/${asset.id}.png`;
  await sharp(data,{raw:{...info,channels:4}}).extract({left,top,width:bounds.width,height:bounds.height}).png().toFile(file);
  const bytes=await readFile(file);
  console.log(`Exported ${asset.id} (${bounds.width} × ${bounds.height})`);
  const item={...asset,file,bounds,alpha:true,sha256:createHash('sha256').update(bytes).digest('hex'),
    pivot:asset.pivot||[bounds.x+bounds.width/2,bounds.y+bounds.height],
    anchor:{x:bounds.x+bounds.width/2,y:bounds.y+bounds.height},
    clippedByViewport:bounds.x===0||bounds.y===0||bounds.x+bounds.width===1672||bounds.y+bounds.height===941,
    pixelCount:opaque,transparentPixels:transparent};
  manifest.push(item);return item;
}
const wrap = (defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1672" height="941" viewBox="0 0 1672 941"><defs>${defs}</defs>${body}</svg>`;

// Keep source pixels; remove the orange wall/wood between green leaves, while
// retaining the dark ink adjacent to foliage. Pots remain separate authored parts.
function foliage(data, info) {
  const {width,height}=info, green=new Uint8Array(width*height);
  for(let i=0;i<green.length;i++) {
    const [r,g,b,a]=data.subarray(i*4,i*4+4);
    green[i]=a>0 && g>38 && r<g*1.22 && g>r*.65 && b<Math.max(r,g)*.64 ? 1:0;
  }
  for(let y=0;y<height;y++)for(let x=0;x<width;x++) {
    const i=y*width+x;if(!data[i*4+3]||green[i])continue;
    const [r,g,b]=data.subarray(i*4,i*4+3);let keep=false;
    if(Math.max(r,g,b)<145 && b<95) {
      for(let dy=-3;dy<=3&&!keep;dy++)for(let dx=-3;dx<=3;dx++) {
        if(x+dx>=0&&x+dx<width&&y+dy>=0&&y+dy<height&&green[(y+dy)*width+x+dx]){keep=true;break;}
      }
    }
    if(!keep)data[i*4+3]=0;
  }
  return data;
}

function compensateGlass(data) {
  const alpha=8/255;
  for(let i=0;i<data.length;i+=4)for(let c=0;c<3;c++)data[i+c]=Math.round(Math.max(0,(data[i+c]-alpha*255)/(1-alpha)));
  return data;
}

for(const asset of objectRecipes()) {
  const padding=asset.edgePadding??3.5;
  const repair=repairsFor(asset).filter(Boolean);
  const repairSource=asset.id==='rug--woven-rug'?rugMaster:asset.owner==='work-desk'?deskMaster:repairMaster;
  const renderSource=asset.id==='bookcase--wooden-bookcase'?repairMaster:asset.source;
  let defs=clip('object',[asset.path],padding),body=image(await embedded(renderSource));
  if(repair.length) {
    defs+=clip('repair',repair,1);
    body+=`<g clip-path="url(#repair)">${image(await embedded(repairSource))}</g>`;
  }
  if(asset.markup)body=asset.markup;
  if(asset.id==='computer--laptop') {
    defs+=`<mask id="notebook"><rect width="1672" height="941" fill="white"/><path d="${partPath(furniture.notebook,'open-notebook')}" fill="black" stroke="black" stroke-width="2"/></mask>`;
    const insert=await embedded('assets/objects/masters/laptop-candidate-v1.png');
    const keyboard=`<svg x="1296" y="497" width="188" height="132" viewBox="260 175 1044 705" preserveAspectRatio="none"><image href="${insert}" width="1536" height="1024"/></svg>`;
    body=keyboard+`<g mask="url(#notebook)">${image(await embedded(asset.source))}</g>`;
    asset.completionSource='assets/objects/masters/laptop-candidate-v1.png';
  }
  if(asset.exclude?.length) {
    defs+=`<mask id="holes"><rect width="1672" height="941" fill="white"/>${asset.exclude.map(p=>`<path d="${p}" fill="black"/>`).join('')}</mask>`;
    body=`<g mask="url(#holes)">${body}</g>`;
  }
  body=`<g clip-path="url(#object)">${body}</g>`;
  await saveAsset({...asset,key:['glass','scenery'].includes(asset.kind)?undefined:artworkKey(asset.source,asset.path,padding),edgePadding:padding,
    repairSource:repair.length?repairSource:null,renderSource,repairPaths:repair},wrap(defs,body),asset.kind==='plant'&&!asset.id.includes('pot')?foliage:asset.glassCompensation?compensateGlass:null);
}

// The already transparent chair keeps its original pixels and calibrated world size.
const chair=furniture.workChair;
manifest.push({id:'work-chair--complete',owner:chair.id,kind:'object',source:chair.image,file:chair.image,alpha:true,
  bounds:{x:chair.position.x,y:chair.position.y,width:629/772*chair.height,height:chair.height},
  pivot:[1362.68,766.915],anchor:{x:1362.68,y:766.915},supports:chair.supports});

// Window scenery is its own object, not baked into the frame or glass.
const gardenSvg=`<svg x="955" y="180" width="401" height="259" viewBox="1012 180 292 259" preserveAspectRatio="none">${image(await embedded(originalArtwork))}</svg>`;
await saveAsset({id:'window--garden',owner:'room-window',kind:'scenery',source:originalArtwork},wrap('',gardenSvg));

// Existing transparent actor atlases are preserved, with each frame exported too.
const atlases=[
  ['sili-standing','assets/sili-poses-v1.png',4,1],['sili-walking','assets/sili-walk-v2.png',3,2],
  ['sili-piano','assets/sili-piano-v4.png',6,1],['sili-coffee','assets/sili-coffee-v3.png',4,1],
  ['sili-computer','assets/sili-computer-v3.png',1,1],['sili-writing','assets/sili-writing-v2.png',1,1],
  ['sili-interactions','assets/sili-interactions-v1.png',6,1],['viola','assets/viola-poses-v1.png',6,1],['java','assets/java-poses-v1.png',6,1],
];
const actors=[];
for(const [id,file,columns,rows] of atlases) {
  await embedded(file);
  const meta=await sharp(file).metadata();const width=meta.width/columns,height=meta.height/rows;
  const frames=[];
  for(let i=0;i<columns*rows;i++) {
    const target=`${output}/${id}--frame-${String(i+1).padStart(2,'0')}.png`;
    await sharp(file).extract({left:i%columns*width,top:Math.floor(i/columns)*height,width,height}).png().toFile(target);
    frames.push({id:`${id}--frame-${i+1}`,file:target,sha256:createHash('sha256').update(await readFile(target)).digest('hex'),cell:{x:i%columns*width,y:Math.floor(i/columns)*height,width,height}});
  }
  actors.push({id,source:file,columns,rows,frames});
}
// Keep the original clean architecture except for the agreed empty window opening.
const architecture='assets/room-architecture-v3.png';
const backgroundFile=`${output}/bare-room.png`;
const beam='assets/objects/masters/beam-underpainting-v1.png';
const base = image(await embedded(architecture))+`<g clip-path="url(#lettering)">${image(await embedded(beam))}</g>`;
const opening='M954 178 H1356 V441 H954 Z';
const hole = `<g clip-path="url(#opening)"><rect x="954" y="178" width="402" height="263" fill="#b8bdac"/></g>`;
await sharp(new Resvg(wrap(clip('opening',[opening])+clip('lettering',['M42 18 H189 V63 H42 Z']),base+hole),{font:{loadSystemFonts:false}}).render().asPng()).png().toFile(backgroundFile);

// Handwritten lettering is a decoration too, not part of the bare beam.
await saveAsset({id:'room--lettering',owner:'room-lettering',kind:'decoration',source:architecture,path:'M42 18 H189 V63 H42 Z',edgePadding:0},
  wrap(clip('letters',['M42 18 H189 V63 H42 Z']),`<g clip-path="url(#letters)">${image(await embedded(architecture))}</g>`),
  (data,info)=>{for(let i=0;i<info.width*info.height;i++){const p=i*4,r=data[p],g=data[p+1],b=data[p+2];if(r<170||g<130||b<80)data[p+3]=0;else data[p+3]=Math.round(data[p+3]*Math.min(1,Math.max(0,(g-130)/75)));}return data;});

// Solve the original window lighting as two genuine-alpha passes over the
// neutral architecture: shade first, then sunlight. No floor rectangle is baked in.
const sunSource='assets/room-architecture-v1.png';
await embedded(sunSource);
const lit=await sharp(sunSource).resize(1672,941,{fit:'fill'}).ensureAlpha().raw().toBuffer();
const neutral=await sharp(backgroundFile).ensureAlpha().raw().toBuffer();
const area={left:11,top:700,width:699,height:122};
const layers=['window-shade','window-sunlight'].map(id=>({id,data:Buffer.alloc(area.width*area.height*4)}));
for(let y=0;y<area.height;y++)for(let x=0;x<area.width;x++) {
  const original=((y+area.top)*1672+x+area.left)*4,local=(y*area.width+x)*4;
  const b=[neutral[original],neutral[original+1],neutral[original+2]],target=[lit[original],lit[original+1],lit[original+2]];
  if(Math.max(...target.map((v,c)=>Math.abs(v-b[c])))<3)continue;
  const middle=target.map((v,c)=>Math.min(v,b[c]));
  const dark=Math.max(...middle.map((v,c)=>b[c]?(b[c]-v)/b[c]:0));
  const light=Math.max(...target.map((v,c)=>middle[c]<255?(v-middle[c])/(255-middle[c]):0));
  for(const [index,alpha] of [dark,light].entries()) {
    if(alpha<=0)continue;
    for(let c=0;c<3;c++)layers[index].data[local+c]=Math.round(Math.max(0,Math.min(255,index?middle[c]+(target[c]-middle[c])/alpha:b[c]+(middle[c]-b[c])/alpha)));
    layers[index].data[local+3]=Math.round(alpha*255);
  }
}
for(const layer of layers) {
  const file=`${output}/lighting--${layer.id}.png`;
  await sharp(layer.data,{raw:{width:area.width,height:area.height,channels:4}}).png().toFile(file);
  manifest.push({id:`lighting--${layer.id}`,owner:'sunlight',kind:'lighting',source:sunSource,file,alpha:true,
    bounds:{x:area.left,y:area.top,width:area.width,height:area.height}});
}

const result={version:1,world:roomSpace,background:{file:backgroundFile,source:architecture,opening},
  sourceHashes,objects:manifest,actors,books:books.map(book=>({id:book.id,owner:book.owner,content:book.content})),
  groups:[...new Set(manifest.map(item=>item.owner))].map(id=>({id,parts:manifest.filter(item=>item.owner===id).map(item=>item.id)}))};
const runtime={version:result.version,world:roomSpace,background:{file:`${backgroundFile}?v=${createHash('sha256').update(await readFile(backgroundFile)).digest('hex').slice(0,12)}`},books:result.books,groups:result.groups,
  objects:manifest.map(({id,owner,kind,file,bounds,key,pivot,anchor,supports,content,animation,sha256})=>({id,owner,kind,file:sha256?`${file}?v=${sha256.slice(0,12)}`:file,bounds,key,pivot,anchor,supports,content,animation}))};
const keys=runtime.objects.map(asset=>asset.key).filter(Boolean);
if(new Set(keys).size!==keys.length)throw Error('Duplicate artwork key');
await writeFile('src/scene/assets/objectManifest.js',`// Generated by npm run assets:export. Full provenance: assets/objects/manifest.json.\nexport const objectManifest = ${JSON.stringify(runtime,null,2)};\n`);
await writeFile('assets/objects/manifest.json',JSON.stringify(result,null,2)+'\n');
console.log(`Exported ${manifest.length} transparent room layers, ${actors.reduce((n,a)=>n+a.frames.length,0)} actor frames and ${books.length} independent books.`);
