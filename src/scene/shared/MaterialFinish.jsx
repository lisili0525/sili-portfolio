// Reversible SVG pigment passes, clipped by each independent source alpha.
// No bitmap is rewritten; duplicate depth passes receive identical local marks.
const wood=new Set(['piano','piano-bench','coffee-cabinet','wall-shelf','stool','desk','coffee-table']);
const cloth=new Set(['bench-throw','sofa','sofa-cushion','sofa-throw','rug','curtain-open-left','curtain-open-right','curtain-closed-pair']);
export function MaterialFinish({part,imageId}) {
  const material=wood.has(part.id)?'wood':cloth.has(part.id)?'cloth':null;
  if(!material)return null;
  const {x,y,width,height}=part.bounds;
  return <g className={`material-finish material-${material}`} aria-hidden="true" pointerEvents="none">
    <defs>
      <mask id={`${imageId}-alpha`} maskUnits="userSpaceOnUse" x={x} y={y} width={width} height={height} style={{maskType:'alpha'}}><use href={`#${imageId}`} /></mask>
      <radialGradient id={`${imageId}-wash`} cx="28%" cy="24%" r="80%"><stop stopColor="#fff2ce" stopOpacity=".075"/><stop offset=".48" stopColor="#a87650" stopOpacity="0"/><stop offset="1" stopColor="#64462e" stopOpacity=".055"/></radialGradient>
      <pattern id={`${imageId}-tooth`} width={material==='wood'?93:13} height={material==='wood'?37:17} patternUnits="userSpaceOnUse">
        {material==='wood'?<g fill="none" strokeLinecap="round"><path d="M3 8 Q24 5 47 9 T89 7 M17 28 Q35 31 58 27 T81 29" stroke="#5a3724" strokeWidth=".65" opacity=".025"/><path d="M0 17 Q27 20 48 16 T92 18" stroke="#fff0cf" strokeWidth="1.5" opacity=".035"/></g>:<g fill="none" strokeLinecap="round"><path d="M1 4 L6 3 M8 12 L12 13 M4 9 L4 14" stroke="#685344" strokeWidth=".6" opacity=".035"/><path d="M9 1 L10 5 M0 16 L5 16" stroke="#fff4dd" strokeWidth=".7" opacity=".045"/></g>}
      </pattern>
    </defs>
    <g mask={`url(#${imageId}-alpha)`}>
      <rect x={x} y={y} width={width} height={height} fill={`url(#${imageId}-wash)`} />
      <rect x={x} y={y} width={width} height={height} fill={`url(#${imageId}-tooth)`} />
    </g>
  </g>;
}
export function FurnitureContacts() {
  return <svg className="scene-artwork material-contacts" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" focusable="false"><defs><filter id="material-contact-softness" x="-50%" y="-150%" width="200%" height="400%"><feGaussianBlur stdDeviation="2.5"/></filter></defs><g fill="#523622" opacity=".16" filter="url(#material-contact-softness)">
    <ellipse cx="32" cy="749" rx="21" ry="4"/><ellipse cx="370" cy="748" rx="15" ry="3"/>
    <ellipse cx="119" cy="801" rx="17" ry="3"/><ellipse cx="317" cy="786" rx="16" ry="3"/>
    <ellipse cx="520" cy="717" rx="16" ry="3"/><ellipse cx="824" cy="716" rx="15" ry="3"/>
    <ellipse cx="1091" cy="707" rx="16" ry="3"/><ellipse cx="1184" cy="707" rx="16" ry="3"/>
  </g></svg>;
}
