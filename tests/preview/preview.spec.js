import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const layout=JSON.parse(readFileSync(new URL('../../assets/rebuilt/v1/layout.json',import.meta.url),'utf8'));

test('built preview serves every frame, the registered room and the Pixi prototype',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  const failed=[];page.on('response',response=>{if(response.status()>=400)failed.push(`${response.status()} ${response.url()}`);});
  await page.goto('/?demo=objects');
  await expect(page.getByRole('heading',{name:'Room object library'})).toBeVisible();
  await page.getByRole('button',{name:'Character frames',exact:true}).click();
  await expect(page.locator('.asset-grid img')).toHaveCount(44);
  const loaded=await page.locator('.asset-grid img').evaluateAll(async images=>{
    images.forEach(image=>image.loading='eager');
    await Promise.all(images.map(image=>image.decode()));return images.every(image=>image.naturalWidth>0);
  });expect(loaded).toBe(true);
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
  await expect(page.locator('[data-asset-id="sheet-music"]')).toHaveAttribute('transform',layout.assets['sheet-music'].transform);
  await page.getByRole('button',{name:'Explore',exact:true}).click();
  await expect(page.locator('#destinations button')).toHaveCount(7);
  await page.locator('#destinations').getByRole('button',{name:'At my workstation',exact:true}).click();
  await expect(page.getByRole('heading',{name:'SVD & PCA',exact:true})).toBeVisible();
  const seated=page.locator('.desk-seated-anatomy image');
  await expect(seated).toHaveCount(2);
  expect(await seated.evaluateAll(async elements=>Promise.all(elements.map(async element=>{
    const image=new Image();image.src=element.getAttribute('href');await image.decode();return image.naturalWidth>0;
  })))).toEqual([true,true]);
  const upper=page.locator('.sili-sheet[data-pose-material="coffee"]');
  await expect(upper).toHaveCount(2);
  expect(await upper.evaluateAll(async elements=>Promise.all(elements.map(async element=>{
    const image=new Image();image.src=element.style.backgroundImage.slice(5,-2);await image.decode();return image.naturalWidth>0;
  })))).toEqual([true,true]);
  await page.goto('/?demo=runtime');
  await expect(page.locator('.prototype-controls [role=status]')).toHaveText('idle',{timeout:30000});
  await expect(page.locator('.prototype-canvas canvas')).toHaveCount(1);
  expect(errors).toEqual([]);expect(failed).toEqual([]);
});

test('built preview always uses D even with a legacy texture URL',async({page})=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/?texture=soft');
  const images=page.locator('[data-style-asset]');
  expect(await images.count()).toBeGreaterThanOrEqual(15);
  const decoded=await images.evaluateAll(async elements=>Promise.all(elements.map(async element=>{
    const image=new Image();image.src=element.getAttribute('href');await image.decode();return image.naturalWidth>0;
  })));
  expect(decoded.every(Boolean)).toBe(true);
  await expect(page.locator('.texture-review')).toHaveCount(0);
  await expect(page.locator('.room')).toHaveAttribute('data-texture','painted');
  expect(errors).toEqual([]);
});
