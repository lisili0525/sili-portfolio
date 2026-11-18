// Stable synchronous lookup key; provenance and full paths remain in manifest.json.
export function artworkKey(source, path, padding = 3.5) {
  const text=`${source}\n${path}\n${padding}`;
  let hash=2166136261;
  for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);
  return `art-${(hash>>>0).toString(16)}`;
}
