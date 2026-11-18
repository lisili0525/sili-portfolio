import { copyFile, readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
const [id,source,promptFile]=process.argv.slice(2);
if(!/^[a-z0-9-]+$/.test(id)||!source?.startsWith('/Users/lisili/.codex/generated_images/'))throw Error('Invalid generated source');
const catalog=JSON.parse(await readFile('assets/rebuilt/v1/catalog.json','utf8'));
const spec=catalog.specs.find(spec=>spec.id===id);if(!spec)throw Error(`Unknown asset ${id}`);
const destination=`assets/rebuilt/v1/sources/${id}.png`;
if(spec.generatedFile&&spec.generationSource!==source){
  await mkdir('assets/rebuilt/v1/sources/revisions',{recursive:true});
  const previousFile=`assets/rebuilt/v1/sources/revisions/${id}-${Date.now()}.png`;
  await copyFile(spec.generatedFile,previousFile);
  (spec.revisions??=[]).push({generatedFile:previousFile,generationSource:spec.generationSource,sourceSha256:spec.sourceSha256,prompt:spec.prompt,references:spec.references??[]});
}
await copyFile(source,destination);
const bytes=await readFile(destination),meta=await sharp(bytes).metadata();
spec.status='generated';spec.generatedFile=destination;spec.generationSource=source;spec.sourceSha256=createHash('sha256').update(bytes).digest('hex');spec.sourceSize={width:meta.width,height:meta.height,hasAlpha:meta.hasAlpha};
if(promptFile)spec.prompt=await readFile(promptFile,'utf8');
catalog.integration={status:'review-in-progress'};
await writeFile('assets/rebuilt/v1/catalog.json',JSON.stringify(catalog,null,2)+'\n');
console.log(`Saved ${id}: ${meta.width} × ${meta.height}, alpha=${meta.hasAlpha}`);
