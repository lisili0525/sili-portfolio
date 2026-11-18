import { test, expect } from '@playwright/test';

test('transparent library exposes individual books, native inspection and the bare room',async({page},info)=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/?demo=objects');
  await expect(page.getByRole('heading',{name:'Room object library'})).toBeVisible();
  await page.getByRole('button',{name:'Books',exact:true}).click();
  await expect(page.locator('.asset-grid article')).toHaveCount(20);
  await page.locator('.asset-preview').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button',{name:'Close inspection'}).click();
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByRole('button',{name:'Bare room',exact:true}).click();
  await expect(page.locator('.asset-grid article')).toHaveCount(1);
  const image=page.locator('.asset-grid img');await expect(image).toBeVisible();
  await expect.poll(()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.screenshot({path:`tmp/object-review/${info.project.name}-library.png`});
  expect(errors).toEqual([]);
});

test('transparent window states and seated foregrounds stay complete',async({page},info)=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  await page.evaluate(()=>Promise.all([...document.images].map(image=>image.decode().catch(()=>{}))));
  const room=page.locator('.room');
  const activate=async name=>{const path=page.getByRole('button',{name,exact:true}).locator('path').first();if(['android','iphone'].includes(info.project.name))await path.tap();else await path.click();};
  await activate('Close window');
  await expect(room).toHaveAttribute('data-window-open','false');
  await page.screenshot({path:`tmp/object-review/${info.project.name}-glass-closed.png`});
  await activate('Close curtains');
  await expect(room).toHaveAttribute('data-curtains-open','false');
  await page.screenshot({path:`tmp/object-review/${info.project.name}-curtains-closed.png`});
  await activate('Open curtains');
  await activate('Open window');
  await page.getByRole('button',{name:'Explore',exact:true}).click();
  await page.locator('#destinations').getByRole('button',{name:'At my workstation',exact:true}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.desk-chair-front')).toBeVisible();
  await page.screenshot({path:`tmp/object-review/${info.project.name}-seated.png`});
  await page.getByRole('button',{name:'Close and return to the room'}).click();
  await page.addStyleTag({content:'.room>:not(.room-art),.room>:not(.room-art) *{visibility:hidden!important}'});
  await page.screenshot({path:`tmp/object-review/${info.project.name}-bare-room.png`});
});

test('one workstation cycles typing and writing without moving the seat or duplicating the pen',async({page},info)=>{
  await page.clock.install();await page.goto('/?texture=painted');
  await page.getByRole('button',{name:'Explore',exact:true}).click();
  await expect(page.locator('#destinations button')).toHaveCount(7);
  await page.locator('#destinations').getByRole('button',{name:'At my workstation',exact:true}).click();
  await page.clock.runFor(12000);await expect(page.getByRole('dialog')).toBeVisible();
  for(const name of ['CoffeeHeads','Biomedical machine learning','SVD & PCA','Cloud microphysics modeling'])await expect(page.getByRole('heading',{name,exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Close and return to the room'}).click();
  const actor=page.locator('#sili'),position=()=>actor.evaluate(el=>({left:el.style.left,bottom:el.style.bottom,height:el.style.height}));
  const seat=await position(),seen=new Set();
  await expect(page.locator('.desk-leg-foreground')).toBeVisible();
  for(let i=0;i<45;i++){
    await page.clock.runFor(1000);await expect(actor).toHaveAttribute('data-activity','desk');expect(await position()).toEqual(seat);
    const mode=await actor.getAttribute('data-desk-mode');
    if(!seen.has(mode)){
      seen.add(mode);await expect(actor.locator(mode==='writing'?'.sheet-writing':'.sheet-computer')).toHaveCSS('opacity','1');
      if(mode==='writing')await expect(page.locator('[data-part="writing-pen"]')).toBeHidden();
      else await expect(page.locator('[data-part="writing-pen"]')).toBeVisible();
      await page.screenshot({path:`tmp/object-review/${info.project.name}-${mode}-contact.png`});
    }
  }
  expect([...seen].sort()).toEqual(['computer','writing']);
  await page.emulateMedia({reducedMotion:'reduce'});await page.clock.runFor(30000);
  await expect(actor).toHaveAttribute('data-desk-mode','computer');expect(await position()).toEqual(seat);
});

test('piano pause lowers the hands without moving the seat and resume restores playing',async({page},info)=>{
  await page.clock.install();
  for(const reducedMotion of ['no-preference','reduce']) {
    await page.emulateMedia({reducedMotion});await page.goto('/');
    await page.getByRole('button',{name:'Explore',exact:true}).click();
    await page.locator('#destinations').getByRole('button',{name:'At the piano',exact:true}).click();
    await page.clock.runFor(15000);await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button',{name:'Close and return to the room'}).click();
    const actor=page.locator('#sili');await expect(actor).toHaveAttribute('data-pose','playing');
    await expect(actor.locator('.sili-sprite')).toHaveCSS('animation-name',reducedMotion==='reduce'?'none':'piano-hands');
    const position=await actor.boundingBox();
    await page.screenshot({path:`tmp/object-review/${info.project.name}-piano-playing-${reducedMotion}.png`});
    await page.getByRole('button',{name:'Pause piano',exact:true}).click();
    await expect(actor).toHaveAttribute('data-pose','seated');
    await expect(actor.locator('.sili-sprite')).toHaveCSS('animation-name','none');
    expect(await actor.boundingBox()).toEqual(position);
    expect(await actor.locator('.sili-sprite').evaluate(el=>getComputedStyle(el).backgroundPosition.split(' ').map(parseFloat))).toEqual([0,0]);
    await page.screenshot({path:`tmp/object-review/${info.project.name}-piano-resting-${reducedMotion}.png`});
    await page.getByRole('button',{name:'Play piano',exact:true}).click();
    await expect(actor).toHaveAttribute('data-pose','playing');
    expect(await actor.boundingBox()).toEqual(position);
  }
});
