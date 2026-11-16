// Build the public website without publishing project notes or unused artwork.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const files = ['index.html', 'styles.css', 'app.js', 'actions.js', 'album.js', 'cats.js', 'piano.js'];
const assets = new Set();
for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of source.matchAll(/assets\/[\w/.-]+/g)) assets.add(match[0]);
}
for (const file of [...files, ...assets]) {
  if (!fs.statSync(path.join(root, file)).isFile()) throw new Error(`Missing website file: ${file}`);
}
fs.rmSync(output, {recursive:true, force:true});
fs.mkdirSync(output, {recursive:true});
for (const file of [...files, ...assets]) {
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), {recursive:true});
  fs.copyFileSync(path.join(root, file), destination);
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');
console.log(`Built dist with ${files.length} website files and ${assets.size} assets.`);
