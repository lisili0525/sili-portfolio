import { test, expect } from '@playwright/test';
import { cpus, platform, release } from 'node:os';
import { mkdir, writeFile } from 'node:fs/promises';
import { once } from 'node:events';

test('records original renderer performance baseline', async ({ page, browserName, browser }, info) => {
  test.skip(info.project.name !== 'chromium', 'One named desktop reference measurement; other engines use functional tests.');
  await page.goto('/');
  await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
  const cdp = await page.context().newCDPSession(page);
  const events = []; cdp.on('Tracing.dataCollected', value => events.push(...value.value));
  await cdp.send('Tracing.start', { categories: 'devtools.timeline,disabled-by-default-devtools.timeline.frame', transferMode: 'ReportEvents' });
  const sample = () => page.evaluate(() => new Promise(resolve => {
    const intervals = [], tasks = [];
    let previous = performance.now(), start = previous;
    const observer = new PerformanceObserver(list => list.getEntries().forEach(entry => tasks.push(entry.duration)));
    observer.observe({ entryTypes: ['longtask'] });
    function frame(now) {
      intervals.push(now-previous); previous = now;
      if (now-start < 3000) requestAnimationFrame(frame);
      else {
        observer.disconnect(); intervals.sort((a,b) => a-b);
        resolve({ samples: intervals.length, p50: intervals[Math.floor(intervals.length*.5)], p95: intervals[Math.floor(intervals.length*.95)],
          max: intervals.at(-1), over33ms: intervals.filter(value => value > 33.34).length, longTasks: tasks });
      }
    }
    requestAnimationFrame(frame);
  }));
  const idle = await sample();
  await page.getByRole('button', { name: 'Explore' }).click();
  await page.locator('#destinations').getByRole('button', { name: 'At my workstation', exact: true }).click();
  const journey = await sample();
  const complete = once(cdp, 'Tracing.tracingComplete');
  await cdp.send('Tracing.end'); await complete; await cdp.detach();
  const metadata = await page.evaluate(() => ({ userAgent: navigator.userAgent, dpr: devicePixelRatio, viewport: { width: innerWidth, height: innerHeight } }));
  await mkdir('tmp/baseline', { recursive: true });
  await writeFile('tmp/baseline/chromium-performance.json', JSON.stringify({
    recordedAt: new Date().toISOString(), machine: { platform: platform(), release: release(), cpu: cpus()[0].model },
    browser: { name: browserName, version: browser.version() }, ...metadata,
    conditions: 'Headless Playwright, warmed artwork cache, local Vite dev server, no network throttling; original room with autonomous cats. Not a production or real-phone benchmark.',
    idle, journey,
  }, null, 2));
  await writeFile('tmp/baseline/chromium-timeline.json', JSON.stringify({ traceEvents: events }));
  expect(idle.samples).toBeGreaterThan(0); expect(journey.samples).toBeGreaterThan(0);
});
