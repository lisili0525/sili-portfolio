export function ObjectHotspot({hotspot, onEntry}) {
  return <button type="button" className={`object ${hotspot.id}`}
    aria-label={hotspot.label} data-entry={hotspot.entry}
    data-album-first={hotspot.firstPage ? 'true' : undefined}
    style={{'--tooltip-x':`${hotspot.tooltip[0]}%`,'--tooltip-y':`${hotspot.tooltip[1]}%`}}
    onClick={event => onEntry(hotspot.entry,event.currentTarget)}>
    <svg className="object-shape" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {hotspot.paths.map((path,index) => <path key={index} d={path} vectorEffect="non-scaling-stroke" />)}
    </svg>
    <span className="object-label" aria-hidden="true">{hotspot.label}</span>
  </button>;
}
