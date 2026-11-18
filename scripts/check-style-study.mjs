// Check provenance, alpha and geometry of optional fresh repaint candidates.
import sharp from 'sharp';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {styleStudy} from '../src/scene/assets/styleStudy.js';
const entries=JSON.parse(await readFile('assets/rebuilt/v1/style-study/catalog.json','utf8'));
const results=[];
for(const [id,file] of Object.entries(styleStudy)) {
 const entry=entries.find(e=>e.file===file);if(!entry)throw Error(`Unregistered ${id}`);
 const bytes=await readFile(entry.master);
 if(createHash('sha256').update(bytes).digest('hex')!==entry.sourceSha256)throw Error(`Changed master ${id}`);
 const original=entry.originalFile.split('?')[0];
 const [a,b]=await Promise.all([sharp(original).ensureAlpha().raw().toBuffer({resolveWithObject:true}),sharp(file).ensureAlpha().raw().toBuffer({resolveWithObject:true})]);
 if(a.info.width!==b.info.width||a.info.height!==b.info.height)throw Error(`Canvas changed ${id}`);
 let intersection=0,union=0,transparent=0;
 for(let i=3;i<a.data.length;i+=4){if(a.data[i]>128||b.data[i]>128)union++;if(a.data[i]>128&&b.data[i]>128)intersection++;if(b.data[i]===0)transparent++;}
 const iou=intersection/union;
 if(iou<.88)throw Error(`Shape drift ${id}: ${iou}`);
 if(id!=='garden'&&!transparent)throw Error(`Missing transparency ${id}`);
 results.push({id,alphaOverlap:Number(iou.toFixed(3)),transparentPixels:transparent});
}
console.log(JSON.stringify(results,null,2));
