import { freshHotspotPaths } from '../scene/assets/objectAssets.js';
export function ObjectHotspot({hotspot, onEntry, onActivate, pressed}) {
  return <button type="button" className={`object ${hotspot.id}`}
    aria-label={hotspot.label} aria-pressed={pressed} data-entry={hotspot.entry}
    data-album-first={hotspot.firstPage ? 'true' : undefined}
    onClick={event => onActivate ? onActivate(event) : onEntry(hotspot.entry,event.currentTarget)}>
    <svg className="object-shape" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {(freshHotspotPaths(hotspot.id,pressed)||hotspot.paths).map((path,index) => <path key={index} d={path} vectorEffect="non-scaling-stroke" />)}
    </svg>
  </button>;
}
