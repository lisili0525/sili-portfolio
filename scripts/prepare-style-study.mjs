// Register an opt-in freshly repainted candidate without replacing any master.
// Usage: node scripts/prepare-style-study.mjs ID GENERATED_FILE PROMPT_FILE
import sharp from 'sharp';
import {readFile,writeFile,copyFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const [id,source,prompt]=process.argv.slice(2),root='assets/rebuilt/v1/style-study';
const manifest=JSON.parse(await readFile('assets/rebuilt/v1/manifest.json','utf8'));
const original=manifest.assets.find(a=>a.id===id);if(!original)throw Error('Unknown candidate');
await mkdir(`${root}/sources`,{recursive:true});await mkdir(`${root}/ready`,{recursive:true});
const sources=JSON.parse(await readFile(`${root}/catalog.json`,'utf8').catch(()=>'[]'));
const version=sources.filter(a=>a.id===id).length+1;
const master=`${root}/sources/${id}-v${version}.png`,file=`${root}/ready/${id}-v${version}.png`;
await copyFile(source,master);
const meta=await sharp(master).metadata();
const bytes=await readFile(master);
let pipeline=sharp(master);
// Only normalization of generated output: no extraction from historical artwork.
if(id!=='garden') {
 if(!meta.hasAlpha)throw Error('Candidate lacks alpha');
 pipeline=pipeline.trim({background:'#00000000',threshold:30});
}
const target=await sharp(original.file.split('?')[0]).metadata();
await pipeline.resize(target.width,target.height,{fit:id==='garden'?'fill':'contain',background:'#00000000'}).png().toFile(file);
const entry={id,version,master,file,bounds:original.bounds,originalFile:original.file,generationSource:source,prompt:await readFile(prompt,'utf8'),sourceSha256:createHash('sha256').update(bytes).digest('hex'),references:['assets/rebuilt/v1/references/original-site-texture-target.png',original.file.split('?')[0]],method:'built-in imagegen style-transfer; trim/resize only'};
sources.push(entry);await writeFile(`${root}/catalog.json`,JSON.stringify(sources,null,2)+'\n');
const latest=Object.fromEntries(sources.map(s=>[s.id,s.file]));
await writeFile('src/scene/assets/styleStudy.js',`// Opt-in candidates; masters and provenance are retained in style-study/catalog.json.\nexport const styleStudy = ${JSON.stringify(latest,null,2)};\n`);
console.log(JSON.stringify({id,master,file,width:target.width,height:target.height}));
