import {test,expect} from '@playwright/test';
test('closed curtains meet and calendar pose keeps walking scale',async({page},info)=>{
 await page.clock.install();await page.goto('/');
 await page.locator('.room').getByRole('button',{name:'Close curtains',exact:true}).press('Enter');
 await page.clock.runFor(1500);
 for(const name of ['left','right']){
  const clip=await page.locator(`.curtain-closed-${name}`).evaluate(el=>getComputedStyle(el).clipPath);
  expect(clip).toContain('polygon(');expect(clip).toContain('69.138');
 }
 await page.locator('.room').screenshot({animations:'disabled',path:`tmp/${info.project.name}-curtain-seam.png`});
 await page.locator('.room').getByRole('button',{name:'Along the way',exact:true}).press('Enter');await page.clock.runFor(12000);
 await expect(page.locator('#sili')).toHaveAttribute('data-activity-frame','5');
 const scale=await page.locator('#sili .sili-sprite').evaluate(el=>new DOMMatrix(getComputedStyle(el).transform).a);expect(scale).toBeCloseTo(.95,3);
 await page.locator('.room').screenshot({animations:'disabled',path:`tmp/${info.project.name}-calendar-scale.png`});
});

test('curtains reopen using the visible fabric after repeated closing',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 const curtain=page.locator('[data-scene-object="room-window"]');
 for(let i=0;i<3;i++){
  await page.locator('.curtain-toggle path').first().click();
  await expect(curtain).toHaveAttribute('data-curtains-open','false');
  await expect(page.locator('.curtain-toggle path')).toHaveCount(1);
  await page.locator('.curtain-toggle path').click();
  await expect(curtain).toHaveAttribute('data-curtains-open','true');
 }
});
