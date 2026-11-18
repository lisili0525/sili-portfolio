// Repeatable visual review, separate from pass/fail geometry tests.
// Usage: node scripts/review-room.mjs [baseURL] [output directory]
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const baseURL=process.argv[2]||'http://127.0.0.1:5173/';
const directory=process.argv[3]||'tmp/room-review';
await mkdir(directory,{recursive:true});
const browser=await chromium.launch();
const errors=[],contacts={};
try {
  const page=await browser.newPage({viewport:{width:1672,height:941}});
  page.on('pageerror',error=>errors.push(error.message));
  await page.clock.install();
  await page.addInitScript(()=>{
    let seed=34;
    Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  });
  await page.goto(baseURL,{waitUntil:'networkidle'});
  await page.screenshot({path:path.join(directory,'room.png')});
  for(let second=0;second<600;second++) {
    await page.clock.runFor(1000);
    const cats=await page.locator('.cat-layer').evaluateAll(layers=>layers.map(layer=>({
      id:layer.id,surface:layer.dataset.surface,hidden:layer.hidden,
      airborne:layer.querySelector('.cat').dataset.airborne,
      position:layer.querySelector('.cat').getAttribute('style'),
    })));
    for(const cat of cats) if(!cat.hidden&&cat.airborne!=='true'&&cat.surface!=='floor'&&!contacts[cat.surface]) {
      contacts[cat.surface]={...cat,second};
      await page.screenshot({path:path.join(directory,`perch-${cat.surface}.png`)});
    }
  }
  await page.close();
  for(const [id,label] of [['workstation','At my workstation'],['coffee','Something brewing'],['album','The photo album'],['piano','At the piano']]) {
    const activity=await browser.newPage({viewport:{width:1672,height:941},reducedMotion:'reduce'});
    activity.on('pageerror',error=>errors.push(error.message));
    await activity.goto(baseURL,{waitUntil:'networkidle'});
    await activity.getByRole('button',{name:'Explore',exact:true}).click();
    await activity.locator('#destinations').getByRole('button',{name:label,exact:true}).click();
    await activity.getByRole('dialog').waitFor();
    await activity.screenshot({path:path.join(directory,`${id}-content.png`)});
    await activity.getByRole('button',{name:'Close and return to the room'}).click();
    await activity.screenshot({path:path.join(directory,`${id}-pose.png`)});
    await activity.close();
    const motion=await browser.newPage({viewport:{width:1672,height:941}});
    motion.on('pageerror',error=>errors.push(error.message));
    await motion.clock.install();
    await motion.goto(baseURL,{waitUntil:'networkidle'});
    await motion.getByRole('button',{name:'Explore',exact:true}).click();
    await motion.locator('#destinations').getByRole('button',{name:label,exact:true}).click();
    const frames=new Set();
    for(let step=0;step<450;step++) {
      await motion.clock.runFor(100);
      if(await motion.getByRole('dialog').isVisible())await motion.getByRole('button',{name:'Close and return to the room'}).click();
      const pose=await motion.locator('#sili').evaluate(actor=>[
        actor.dataset.pose,actor.dataset.activity||'standing',actor.dataset.activityFrame||0,
      ].join('-'));
      if(!frames.has(pose)) {
        frames.add(pose);
        await motion.screenshot({path:path.join(directory,`${id}-motion-${pose}.png`)});
      }
    }
    await motion.close();
  }
  await writeFile(path.join(directory,'review.json'),JSON.stringify({baseURL,contacts,errors,visualReviewRequired:true},null,2)+'\n');
  if(errors.length)throw new Error(errors.join('\n'));
  console.log(`Captured ${Object.keys(contacts).length} supported contacts and five activities in ${directory}. Inspect images before accepting artwork.`);
} finally { await browser.close(); }
