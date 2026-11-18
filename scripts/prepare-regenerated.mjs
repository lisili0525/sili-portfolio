import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Normalize only newly generated images. No historical room pixels or masks.
const root = 'assets/rebuilt/v1';
const catalog = JSON.parse(await readFile(`${root}/catalog.json`, 'utf8'));
const layout = JSON.parse(await readFile(`${root}/layout.json`, 'utf8'));
await mkdir(`${root}/ready`, { recursive: true });
const assets = [];
const actors = [];
function removeIsolatedNoise(data,width,height){
  const seen=new Uint8Array(width*height);let largest=[];
  for(let start=0;start<seen.length;start++)if(!seen[start]&&data[start*4+3]){
    const component=[],queue=[start];seen[start]=1;
    while(queue.length){const p=queue.pop();component.push(p);const x=p%width,y=Math.floor(p/width);
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=width||ny>=height)continue;const n=ny*width+nx;if(!seen[n]&&data[n*4+3]){seen[n]=1;queue.push(n);}}
    }
    if(component.length>largest.length)largest=component;
  }
  const keep=new Uint8Array(width*height);for(const p of largest)keep[p]=1;
  for(let i=0;i<keep.length;i++)if(!keep[i])data[i*4+3]=0;
}
for (const sourceSpec of catalog.specs.filter(s => s.status === 'generated')) {
  const spec={...sourceSpec,...layout.assets[sourceSpec.id]};
  if (spec.kind === 'actor') {
    const meta = await sharp(spec.generatedFile).metadata();
    const [columns, rows] = spec.grid, count = columns * rows;
    const [cw, ch] = spec.cell, frames = [];
    if(spec.registeredCanvas) {
      if(count!==1)throw Error('Registered-canvas edits require one frame');
      const {data,info}=await sharp(spec.generatedFile).resize(cw,ch,{fit:'fill'}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
      for(let i=3;i<data.length;i+=4){if(data[i]<96)data[i]=0;else if(data[i]>240)data[i]=255;}
      const bytes=await sharp(data,{raw:info}).png().toBuffer();
      const file=`${root}/ready/${spec.id}.png`,frameFile=`${root}/ready/${spec.id}-00.png`;
      await writeFile(file,bytes);await writeFile(frameFile,bytes);
      const version=createHash('sha256').update(bytes).digest('hex').slice(0,12);
      actors.push({id:spec.id,file:`${file}?v=${version}`,frames:[{id:`${spec.id}-0`,kind:'actor',file:`${frameFile}?v=${version}`,bounds:{width:cw,height:ch}}],cell:spec.cell,grid:[1,1]});
      continue;
    }
    for (let i = 0; i < count; i++) {
      const left = Math.round(i % columns * meta.width / columns);
      const top = Math.round(Math.floor(i / columns) * meta.height / rows);
      const width = Math.round((i % columns + 1) * meta.width / columns) - left;
      const height = Math.round((Math.floor(i / columns) + 1) * meta.height / rows) - top;
      const { data, info } = await sharp(spec.generatedFile).extract({ left, top, width, height }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      let l = width, r = -1, t = height, b = -1;
      for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
        const p = (y * width + x) * 4;
        if (data[p + 3] < 96) data[p + 3] = 0;
        else if (data[p + 3] > 240) data[p + 3] = 255;
      }
      removeIsolatedNoise(data,width,height);
      for(let y=0;y<height;y++)for(let x=0;x<width;x++)if(data[(y*width+x)*4+3]>96){l=Math.min(l,x);r=Math.max(r,x);t=Math.min(t,y);b=Math.max(b,y);}
      if (r < l) throw Error(`Empty actor cell: ${spec.id}/${i}`);
      frames.push({ data, info, crop: { left: l, top: t, width: r - l + 1, height: b - t + 1 } });
    }
    const cat = /actor-(java|viola)$/.test(spec.id);
    const reference = frames[spec.id.endsWith('interactions') ? 2 : 0].crop;
    const desiredHeight = spec.normalizedHeight ?? (spec.id.endsWith('standing') ? 650 : cat ? 365 : spec.id.endsWith('walking') ? 470 : spec.id.endsWith('piano') ? 446 : 515);
    const uniformScale = Math.min(desiredHeight / reference.height, ...frames.map(f => cw * .88 / f.crop.width));
    const outputColumns = spec.id.endsWith('walking') ? 3 : count;
    const outputRows = spec.id.endsWith('walking') ? 2 : 1;
    const composites = [], registered = [];
    const piano = spec.id.endsWith('piano');
    const commonBottom = Math.max(...frames.map(f=>f.crop.top+f.crop.height));
    for (let i = 0; i < count; i++) {
      const frame = frames[i], w = Math.round(frame.crop.width * uniformScale), h = Math.round(frame.crop.height * uniformScale);
      const baseline = spec.id.endsWith('standing') ? 652 : cat ? 451 : spec.id.endsWith('walking') ? 499 : ch - 26;
      const input = await sharp(frame.data, { raw: frame.info }).extract(frame.crop).resize(w, h).png().toBuffer();
      // Piano hands move between the lap and keyboard. Preserve each cell's
      // shared coordinate system so a narrower resting silhouette cannot
      // recenter the pelvis or head when playback is paused.
      const cellLeft = spec.seatAnchor ? Math.round(cw/2+(frame.crop.left-frame.info.width*spec.seatAnchor[0])*uniformScale)
        : piano ? Math.round((cw-frame.info.width*uniformScale)/2+frame.crop.left*uniformScale) : Math.round((cw - w) / 2);
      const cellTop = spec.seatAnchor ? Math.round(468+(frame.crop.top-frame.info.height*spec.seatAnchor[1])*uniformScale)
        : piano ? Math.round(baseline-(commonBottom-frame.crop.top)*uniformScale) : baseline-h;
      if (cellTop < 0) throw Error(`Actor cell overflow: ${spec.id}/${i}`);
      const png = await sharp({ create: { width: cw, height: ch, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input, left: cellLeft, top: cellTop }]).png().toBuffer();
      const file = `${root}/ready/${spec.id}-${String(i).padStart(2, '0')}.png`;
      await writeFile(file, png);
      registered.push({ id: `${spec.id}-${i}`, kind: 'actor', file:`${file}?v=${createHash('sha256').update(png).digest('hex').slice(0,12)}`, bounds: { width: cw, height: ch } });
      composites.push({ input: png, left: i % outputColumns * cw, top: Math.floor(i / outputColumns) * ch });
    }
    const bytes = await sharp({ create: { width: outputColumns * cw, height: outputRows * ch, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(composites).png().toBuffer();
    const file = `${root}/ready/${spec.id}.png`;
    await writeFile(file, bytes);
    actors.push({ id: spec.id, file: `${file}?v=${createHash('sha256').update(bytes).digest('hex').slice(0, 12)}`, frames: registered, cell: spec.cell, grid: [outputColumns, outputRows] });
    continue;
  }
  let source=sharp(spec.generatedFile);
  if (spec.id==='red-racket'||spec.id==='blue-racket') source=source.rotate(-28,{background:{r:0,g:0,b:0,alpha:0}});
  const { data, info } = await source.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const effect = /glass|sunlight|window-shade/.test(spec.id);
  let left = info.width, top = info.height, right = -1, bottom = -1;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    if (spec.transparent && !effect) {
      // Some generated outputs contain a broad, low-opacity haze. Physical
      // surfaces are opaque; remove that alpha noise without an old contour.
      if (data[i + 3] < 96) data[i + 3] = 0;
      else if (data[i + 3] > 240) data[i + 3] = 255;
    }
    if (data[i + 3] > 96) {
      left = Math.min(left, x); top = Math.min(top, y);
      right = Math.max(right, x); bottom = Math.max(bottom, y);
    }
  }
  if (right < left) throw Error(`Empty generated asset: ${spec.id}`);
  if (!spec.transparent) { left = top = 0; right = info.width - 1; bottom = info.height - 1; }
  if(spec.kind==='glass')for(let i=3;i<data.length;i+=4)data[i]=data[i]<96?0:Math.round(data[i]*.08);
  const crop = { left, top, width: right - left + 1, height: bottom - top + 1 };
  const scale = spec.transparent ? 2 : 1;
  const width = Math.max(1, Math.round(spec.bounds.width * scale));
  const height = Math.max(1, Math.round(spec.bounds.height * scale));
  const bytes = await sharp(data, { raw: info }).extract(crop).resize(width, height, {
    fit: spec.fit||(spec.transparent&&!spec.id.includes('sash')&&spec.kind!=='glass' ? 'contain' : 'fill'), background: { r: 0, g: 0, b: 0, alpha: 0 },
  }).png().toBuffer();
  const file = `${root}/ready/${spec.id}.png`;
  await writeFile(file, bytes);
  assets.push({ id: spec.id, kind: spec.kind, bounds: spec.bounds, ...(spec.transform?{transform:spec.transform}:{}), file: `${file}?v=${createHash('sha256').update(bytes).digest('hex').slice(0, 12)}`, sourceCrop: crop, pixelSize: { width, height } });
}
const manifest = { version: 1, complete: catalog.integration?.status==='verified', expected: catalog.specs.length, generated: catalog.specs.filter(s => s.status === 'generated').length, assets, actors };
await writeFile(`${root}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
await writeFile('src/scene/assets/regeneratedManifest.js', `// Generated from fresh imagegen outputs; historical cutout masks are never used.\nexport const regeneratedManifest = ${JSON.stringify(manifest, null, 2)};\n`);
console.log(`Prepared ${assets.length} fresh assets; ${manifest.generated}/${manifest.expected} sources generated. Integration ${manifest.complete?'verified':'pending verification'}.`);
