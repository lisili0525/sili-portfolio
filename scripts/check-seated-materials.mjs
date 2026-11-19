import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {Resvg} from '@resvg/resvg-js';
const root='assets/rebuilt/v1/seating-study';
const book=JSON.parse(await readFile(`${root}/material-catalog.json`,'utf8'));
const css=await readFile('src/scene/roomAnimations.css','utf8');
async function alpha(file,mode){
 if(!mode)return sharp(file).ensureAlpha().extractChannel('alpha').raw().toBuffer();
 const points=css.match(new RegExp(`\\.sheet-${mode}\\{clip-path:polygon\\(([^)]+)\\)`))[1].split(',').map(pair=>pair.trim().split(/\s+/).map(v=>v.endsWith('%')?parseFloat(v)*576/100:parseFloat(v)).join(',')).join(' ');
 const png=(await readFile(file)).toString('base64');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="576" height="576"><defs><clipPath id="p"><polygon points="${points}"/></clipPath></defs><image href="data:image/png;base64,${png}" width="576" height="576" clip-path="url(#p)"/></svg>`;
 return sharp(new Resvg(svg).render().asPng()).ensureAlpha().extractChannel('alpha').raw().toBuffer();
}
for(const m of Object.values(book.materials)){
 for(const [file,hash]of [[m.source,m.sourceSha256],[m.file,m.readySha256]])assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'),hash,file);
 const meta=await sharp(m.file).metadata();assert.ok(meta.hasAlpha);
 const ref=m.role==='upper'?`assets/rebuilt/v1/ready/actor-sili-${m.mode}.png`:`${root}/ready/${m.mode}-photo-v1.png`;
 const a=await alpha(ref,m.role==='upper'?m.mode:null),b=await alpha(m.file,null);assert.equal(a.length,b.length);
 let intersection=0,union=0;for(let i=0;i<a.length;i++){const x=a[i]>=96,y=b[i]>=96;if(x&&y)intersection++;if(x||y)union++;}
 const iou=intersection/union;assert.ok(iou>.94,`${m.role}/${m.mode} geometry drift: ${iou}`);console.log(`${m.role}/${m.mode}: silhouette overlap ${iou.toFixed(3)}`);
}
