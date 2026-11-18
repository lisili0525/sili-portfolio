import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { objectRecipes, artworkKey, books } from '../src/scene/assets/objectRecipes.js';

const manifest=JSON.parse(await readFile('assets/objects/manifest.json','utf8'));
const ids=manifest.objects.map(asset=>asset.id);
assert.equal(new Set(ids).size,ids.length,'Object IDs must be unique');
assert.equal(manifest.books.length,books.length,'Every authored book must be exported');
for(const book of manifest.books){
  const asset=manifest.objects.find(asset=>asset.kind==='book'&&asset.owner===book.owner&&asset.id.endsWith(`--${book.id}`));
  assert(asset,`Missing independent book ${book.id}`);
  for(const field of ['title','author','entry'])assert(book.content[field]===null||typeof book.content[field]==='string',`Invalid book content slot ${book.id}/${field}`);
}
for(const recipe of objectRecipes()){const asset=manifest.objects.find(asset=>asset.id===recipe.id);assert(asset,`Unexported recipe ${recipe.id}`);if(asset.key)assert.equal(asset.key,artworkKey(recipe.source,recipe.path,recipe.edgePadding??3.5));}
for(const asset of manifest.objects){
  const bytes=await readFile(asset.file);
  if(asset.sha256)assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,`Stale output ${asset.id}`);
  const {data,info}=await sharp(bytes).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let hasTransparent=false,hasVisible=false;
  for(let i=3;i<data.length;i+=info.channels){if(data[i]===0)hasTransparent=true;if(data[i]>0)hasVisible=true;}
  assert(hasTransparent&&hasVisible,`${asset.id} must contain actual transparent and visible pixels`);
  assert(asset.bounds.width>0&&asset.bounds.height>0,`Invalid bounds for ${asset.id}`);
  assert(asset.bounds.x>=0&&asset.bounds.y>=0&&asset.bounds.x+asset.bounds.width<=1672.001&&asset.bounds.y+asset.bounds.height<=941.001,`Out-of-world registration ${asset.id}`);
}
for(const actor of manifest.actors)for(const frame of actor.frames){
  const meta=await sharp(frame.file).metadata();assert(meta.hasAlpha,`${frame.id} has no alpha`);
  assert.equal(meta.width,frame.cell.width);assert.equal(meta.height,frame.cell.height);
}
for(const [source,expected]of Object.entries(manifest.sourceHashes))assert.equal(createHash('sha256').update(await readFile(source)).digest('hex'),expected,`Source changed; re-export ${source}`);
console.log(`Verified ${ids.length} genuine-alpha room layers, ${manifest.books.length} independent books, ${manifest.actors.reduce((n,a)=>n+a.frames.length,0)} registered frames and all source hashes.`);
