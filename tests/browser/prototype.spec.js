import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const layout=JSON.parse(readFileSync(new URL('../../assets/rebuilt/v1/layout.json',import.meta.url),'utf8'));

test('prototype supports replacement, cancellation, jump completion and reduced motion', async ({ page }, info) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/?demo=runtime');
  await expect(page.locator('.prototype-controls [role=status]')).toHaveText('idle', { timeout: 30000 });
  await expect(page.locator('.prototype-canvas canvas')).toHaveCount(1);
  await page.screenshot({ path: `tmp/prototype/${info.project.name}-idle.png` });
  await page.getByRole('button', { name: 'Walk left', exact: true }).click();
  await expect(page.locator('.prototype-controls [role=status]')).toHaveText('moving');
  await page.getByRole('button', { name: 'Pause prototype', exact: true }).click();
  const pausedX = await page.locator('.prototype-canvas').getAttribute('data-person-x');
  await page.waitForTimeout(150);
  expect(await page.locator('.prototype-canvas').getAttribute('data-person-x')).toBe(pausedX);
  await page.screenshot({ path: `tmp/prototype/${info.project.name}-mid-walk.png` });
  await page.getByRole('button', { name: 'Resume prototype', exact: true }).click();
  await page.getByRole('button', { name: 'Walk right', exact: true }).click();
  await page.getByRole('button', { name: 'Cancel journey', exact: true }).click();
  await expect(page.locator('.prototype-controls [role=status]')).toHaveText('idle');
  const host = page.locator('.prototype-canvas');
  const x = await host.getAttribute('data-person-x');
  await page.waitForTimeout(150);
  expect(await host.getAttribute('data-person-x')).toBe(x);
  await page.getByRole('button', { name: 'Jump Java', exact: true }).click();
  await expect(host).toHaveAttribute('data-jumping', 'true');
  await page.getByRole('button', { name: 'Cancel journey', exact: true }).click();
  await expect(host).toHaveAttribute('data-jumping', 'false');
  expect(Number(await host.getAttribute('data-cat-y'))).toBeCloseTo(layout.supports['coffee-table'].y/941*100, 8);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Walk right', exact: true }).click();
  await expect(host).toHaveAttribute('data-person-x', '72');
  await expect(page.locator('.prototype-controls [role=status]')).toHaveText('idle');
  await page.screenshot({ path: `tmp/prototype/${info.project.name}-arrived.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `tmp/prototype/${info.project.name}-portrait.png` });
  expect(errors).toEqual([]);
});

test('prototype survives repeated initialization without duplicate canvases', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  for (let i = 0; i < 3; i++) {
    await page.goto('/?demo=runtime');
    await expect(page.locator('.prototype-controls [role=status]')).toHaveText('idle', { timeout: 30000 });
    await expect(page.locator('.prototype-canvas canvas')).toHaveCount(1);
    await page.getByRole('link', { name: 'Open original room' }).click();
    await expect(page.locator('.prototype-canvas')).toHaveCount(0);
    await expect(page.locator('#explore')).toBeVisible();
  }
  expect(errors).toEqual([]);
});
