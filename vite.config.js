import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

// Keep source artwork in one place and publish only assets used by the app.
function artwork(includeLibrary) {
  return {
    name: 'portfolio-artwork',
    generateBundle() {
      const sources = [];
      function read(directory) {
        for (const entry of fs.readdirSync(directory, {withFileTypes:true})) {
          const file = path.join(directory, entry.name);
          if (entry.isDirectory() && entry.name !== 'test') read(file);
          else if (/\.jsx?$/.test(file)) sources.push(fs.readFileSync(file, 'utf8'));
        }
      }
      read('src');
      // CSS assets are already emitted and rewritten by Vite.
      const assets = new Set(sources.join('\n').match(/assets\/[\w/.-]+/g));
      const manifest=JSON.parse(fs.readFileSync('assets/objects/manifest.json','utf8'));
      if(includeLibrary)for(const actor of manifest.actors)for(const frame of actor.frames)assets.add(frame.file);
      // Historical room rasters/cutouts are authoring references only. Publish
      // the new ready set, album content and recording; never raw generations.
      for (const file of assets) if(!file.includes('/masters/')&&!file.includes('/sources/')&&!file.includes('/objects/generated/')&&!/^assets\/(room-|window-closed-|curtains-closed-|desk-chair-|station-cup-|sili-|viola-poses-|java-poses-)/.test(file)&&fs.existsSync(file)&&fs.statSync(file).isFile()) this.emitFile({type:'asset', fileName:file, source:fs.readFileSync(file)});
      this.emitFile({type:'asset',fileName:'.nojekyll',source:''});
    }
  };
}
export default defineConfig(({mode})=>({
  base: './',
  plugins: [artwork(mode==='runtime-preview')],
  oxc: {jsx: {runtime: 'automatic'}},
  test: {environment: 'jsdom', setupFiles: ['./src/test/setup.js'], include:['src/**/*.test.{js,jsx,ts,tsx}']}
}));
