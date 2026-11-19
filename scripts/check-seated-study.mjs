import {readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';import sharp from 'sharp';
const catalog=JSON.parse(await readFile('assets/rebuilt/v1/seating-study/catalog.json','utf8'));
for(const p of Object.values(catalog.poses)){
 for(const [file,sha] of [[p.source,p.sourceSha256],[p.file,p.readySha256]])assert.equal(createHash('sha256').update(await readFile(file)).digest('hex'),sha,file);
 const m=await sharp(p.file).metadata();assert.ok(m.hasAlpha);assert.equal(m.width,p.crop.width);assert.equal(m.height,p.crop.height);
 assert.ok(Math.abs(p.bounds.y+p.bounds.height-p.displaySoleY)<1,'Sole must match the selected character scale');
}
console.log('Verified two transparent photo-guided seated sources, registration and ready hashes.');
