import {test,expect} from '@playwright/test';
test('D is the only texture and preserves live scene state and fabric hit contours',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/?texture=soft');
  await expect(page.locator('.room')).toHaveAttribute('data-texture','painted');
  const actor=page.locator('#sili');
  await page.locator('.room').getByRole('button',{name:'At my workstation',exact:true}).press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button',{name:'Close and return to the room'}).click();
  const geometry=await actor.getAttribute('style');
  await expect(page.getByRole('group',{name:'Illustration texture comparison'})).toHaveCount(0);
  await expect(actor).toHaveAttribute('data-desk-mode','computer');
  expect(await actor.getAttribute('style')).toBe(geometry);
  for(let i=0;i<3;i++) {
    await page.locator('.curtain-toggle path').first().click();
    await expect(page.locator('.room')).toHaveAttribute('data-curtains-open','false');
    await page.locator('.curtain-toggle path').click();
    await expect(page.locator('.room')).toHaveAttribute('data-curtains-open','true');
  }
  await page.reload();
  await expect(page.locator('.room')).toHaveAttribute('data-texture','painted');
  expect(await page.locator('[data-style-asset]').count()).toBeGreaterThan(5);
  expect(await page.locator('[data-style-asset="piano"]').isVisible()).toBe(true);
  expect(await page.locator('[data-style-asset="garden"]').isVisible()).toBe(true);
  expect(await page.locator('[data-part="physical-album"] .material-finish').count()).toBe(0);
  await expect(page.locator('[data-style-asset="calendar"]')).toBeVisible();
  await page.locator('.room').getByRole('button',{name:'Along the way',exact:true}).press('Enter');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(actor).toHaveAttribute('data-activity-frame','5');
});
