import { test, expect } from '@playwright/test';

// Seed before application startup so autonomous schedules remain reproducible.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    let seed = 20261116;
    Math.random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  });
});

test('original room preserves separate destinations, focus and music browsing', async ({ page }, info) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.room')).toBeVisible();
  await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
  await page.screenshot({ path: `tmp/baseline/${info.project.name}-room.png` });
  await page.getByRole('button', { name: 'Explore' }).click();
  await expect(page.locator('#destinations button')).toHaveCount(7);
  await page.locator('#destinations').getByRole('button', { name: 'At my workstation', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'CoffeeHeads', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'SVD & PCA', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Close and return to the room' }).click();
  await expect(page.getByRole('button', { name: 'Explore' })).toBeFocused();
  await page.getByRole('button', { name: 'Explore' }).click();
  await page.locator('#destinations').getByRole('button', { name: 'At my workstation', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'SVD & PCA', exact: true })).toBeVisible();
  await page.screenshot({ path: `tmp/baseline/${info.project.name}-notebook.png` });
  await page.getByRole('button', { name: 'Close and return to the room' }).click();
  await page.getByRole('button', { name: 'Explore' }).click();
  await page.locator('#destinations').getByRole('button', { name: 'At the piano', exact: true }).click();
  await expect(page.locator('#sili')).toHaveAttribute('data-pose', /playing|seated/);
  await page.getByRole('button', { name: 'Close and return to the room' }).click();
  await page.getByRole('button', { name: 'Explore' }).click();
  await page.locator('#destinations').getByRole('button', { name: 'Something brewing', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#sili')).toHaveClass(/at-piano/);
  await expect(page.getByRole('button', { name: /^(Mute|Unmute) music$/ })).toBeVisible();
  expect(errors).toEqual([]);
});

test('original room keeps viewport geometry in portrait and landscape', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const size of [{ width: 390, height: 844 }, { width: 844, height: 390 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(size); await page.goto('/');
    const room = page.locator('.room'); await expect(room).toBeVisible();
    const rect = await room.boundingBox();
    expect(rect.width / rect.height).toBeCloseTo(1672 / 941, 2);
    expect(rect.x).toBeGreaterThanOrEqual(-1); expect(rect.y).toBeGreaterThanOrEqual(-1);
    await page.getByRole('button', { name: 'Explore' }).click();
    await expect(page.locator('#destinations')).toBeVisible();
    await page.screenshot({ path: `tmp/baseline/${info.project.name}-${size.width}x${size.height}.png` });
  }
});
