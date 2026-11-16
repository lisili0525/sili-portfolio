import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

// Keep source artwork in one place and publish only assets used by the app.
function artwork() {
  return {
    name: 'portfolio-artwork',
    generateBundle() {
      const sources = [];
      function read(directory) {
        for (const entry of fs.readdirSync(directory, {withFileTypes:true})) {
          const file = path.join(directory, entry.name);
          if (entry.isDirectory() && entry.name !== 'test') read(file);
          else if (/\.(jsx?|css)$/.test(file)) sources.push(fs.readFileSync(file, 'utf8'));
        }
      }
      read('src');
      // CSS assets are already emitted and rewritten by Vite.
      const assets = new Set(sources.join('\n').match(/assets\/[\w/.-]+/g));
      for (const file of assets) this.emitFile({type:'asset', fileName:file, source:fs.readFileSync(file)});
      this.emitFile({type:'asset',fileName:'.nojekyll',source:''});
    }
  };
}
export default defineConfig({
  base: './',
  plugins: [artwork()],
  oxc: {jsx: {runtime: 'automatic'}},
  test: {environment: 'jsdom', setupFiles: ['./src/test/setup.js'], include:['src/**/*.test.{js,jsx}']}
});
