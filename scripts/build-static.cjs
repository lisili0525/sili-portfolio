// Compatibility entry point for the React/Vite production build.
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const result = spawnSync(process.execPath, [path.resolve(__dirname,'../node_modules/vite/bin/vite.js'),'build'], {cwd:path.resolve(__dirname,'..'),stdio:'inherit'});
process.exit(result.status ?? 1);
