import { objectManifest as historicalManifest } from './objectManifest.js';
import { regeneratedManifest } from './regeneratedManifest.js';
import { regeneratedAliases } from './regeneratedAliases.js';
import layout from '../../../assets/rebuilt/v1/layout.json' with { type:'json' };

import { artworkKey } from './assetKey.js';
export const rebuiltArtwork = true;
const fresh = new Map(regeneratedManifest.assets.map(asset => [asset.id, asset]));
function replaceAsset(legacy) {
  const name = legacy.id.split('--')[1];
  const shelfBook=name?.startsWith('wall-shelf-book-')||name?.startsWith('bookcase-');
  const alias = shelfBook ? null : name?.includes('-book-') ? name : regeneratedAliases[legacy.id];
  if (alias === undefined) throw Error(`Missing regenerated alias: ${legacy.id}`);
  const parts = alias === null ? [] : (Array.isArray(alias) ? alias : [alias]).map(id => {
    const asset = fresh.get(id);
    if (!asset) throw Error(`Missing freshly generated asset: ${id}`);
    return asset;
  }).filter(asset=>!layout.hiddenAssets?.includes(asset.id));
  if(legacy.id==='window--closed-pane')parts.push({...parts[0],id:'glass-closed-right-instance',bounds:{...parts[0].bounds,x:1154},transform:'translate(2506 0) scale(-1 1)'});
  return { ...legacy, ...(parts[0] || {}), id: legacy.id, key: legacy.key, parts, suppressed: !parts.length };
}
export const objectManifest = rebuiltArtwork ? { ...historicalManifest, version: 2,
  background: fresh.get('bare-room'), objects: historicalManifest.objects.map(replaceAsset),
} : historicalManifest;
const byArtwork = new Map(objectManifest.objects.filter(asset=>asset.key).map(asset=>[asset.key,asset]));
const byId = new Map(objectManifest.objects.map(asset=>[asset.id,asset]));
export const findArtworkAsset = (source, path, padding = 3.5) => byArtwork.get(artworkKey(source,path,padding));
export const findObjectAsset = id => byId.get(id);
export const findActorAsset = name => regeneratedManifest.actors.find(actor => actor.id === `actor-${name}`);
const hotspotAssets={workstation:['laptop','notebook'],piano:['piano','piano-bench'],coffee:['espresso-machine','grinder','beans-jar','mug'],photos:['wall-portrait'],album:['physical-album'],calendar:['calendar'],tennis:['red-racket','blue-racket','ball-basket'],computer:['laptop'],notebook:['notebook'],desk:['notebook'],camera:['camera'],lamp:['desk-lamp']};
export function freshHotspotPaths(id,pressed) {
  const ids=id==='curtain-toggle'?(pressed?['curtain-open-left','curtain-open-right']:['curtain-closed-pair']):hotspotAssets[id];
  return ids?.map(id=>fresh.get(id)?.hitPath).filter(Boolean);
}
