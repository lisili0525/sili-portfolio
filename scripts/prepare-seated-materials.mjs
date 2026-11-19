import sharp from 'sharp';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='assets/rebuilt/v1/seating-study';
const geometry=JSON.parse(await readFile(`${root}/catalog.json`,'utf8'));
const materials={};
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
async function bbox(file){
 const {data,info}=await sharp(file).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let l=info.width,t=info.height,r=0,b=0;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>96){l=Math.min(l,x);t=Math.min(t,y);r=Math.max(r,x);b=Math.max(b,y);}
 return {x:l,y:t,width:r-l+1,height:b-t+1,canvas:{width:info.width,height:info.height}};
}
for(const role of ['upper','lower'])for(const mode of ['computer','writing']){
 const id=`${role}-${mode}-flat-v1`,source=`${root}/sources/${id}.png`,file=`${root}/ready/${id}.png`;
 let registration={scale:1,dx:0,dy:0};
 if(role==='upper'){
  await sharp(source).resize(576,576,{fit:'fill'}).png().toFile(file);
 }else{
  const base=geometry.poses[mode],old=await bbox(base.source),fresh=await bbox(source);
  const scale=old.height/fresh.height,dx=old.x+old.width/2-(fresh.x+fresh.width/2)*scale,dy=old.y-fresh.y*scale;
  registration={scale,dx,dy};
  const png=(await readFile(source)).toString('base64');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${old.canvas.width}" height="${old.canvas.height}"><image href="data:image/png;base64,${png}" width="${fresh.canvas.width}" height="${fresh.canvas.height}" transform="translate(${dx} ${dy}) scale(${scale})"/></svg>`;
  const aligned=await sharp(Buffer.from(svg)).png().toBuffer();
  await sharp(aligned).extract(base.crop).png().toFile(file);
 }
 const generationFiles={'upper-computer-flat-v1':'exec-559f6d62-b372-48e5-98a9-840eba5c3ff6.png','upper-writing-flat-v1':'exec-32c0cf29-4571-4029-8ae3-8c1d6b4b365a.png','lower-computer-flat-v1':'exec-790498b0-9423-467d-886e-551e44b2cf85.png','lower-writing-flat-v1':'exec-b518bd1d-f187-4f74-8e4a-31f231e3ef0d.png'};
 materials[id]={role,mode,source,file,generationSource:'/Users/lisili/.codex/generated_images/01a1ec13-4c16-72e1-968c-728c5474d237/'+generationFiles[id],sourceSha256:sha(await readFile(source)),readySha256:sha(await readFile(file)),registration,prompt:`${root}/prompts/${id}.txt`,references:[role==='upper'?`assets/rebuilt/v1/ready/actor-sili-${mode}.png`:geometry.poses[mode].source,'assets/rebuilt/v1/ready/actor-sili-coffee-02.png']};
}
await writeFile(`${root}/material-catalog.json`,JSON.stringify({version:1,status:'coffee-style-review',materials},null,2)+'\n');
await writeFile('src/scene/assets/seatedMaterials.js',`export const seatedMaterials=${JSON.stringify(Object.fromEntries(['computer','writing'].map(mode=>[mode,materials[`upper-${mode}-flat-v1`].file])),null,2)};\n`);
console.log('Prepared four coffee-style material variants with preserved canvas registration.');
