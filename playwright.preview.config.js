import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir:'./tests/preview',workers:1,reporter:'list',
  outputDir:'./tmp/preview-results',
  use:{baseURL:'http://127.0.0.1:5177'},
  webServer:{command:'npm run preview -- --host 127.0.0.1 --port 5177 --outDir tmp/runtime-preview/site/dist',url:'http://127.0.0.1:5177',reuseExistingServer:false},
  projects:[{name:'chromium',use:{...devices['Desktop Chrome']}},{name:'iphone',use:{...devices['iPhone 13']}}],
});
