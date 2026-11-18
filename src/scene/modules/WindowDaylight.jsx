import { useId } from 'react';

// One floor projection for both the aperture and its mullions. The closed
// window has four columns / three rows; open leaves cast only side wedges.
const corners=[[1040,724],[1530,715],[1740,924],[1110,940]];
function project(u,v,plane=corners) {
 const top=plane[0].map((n,i)=>n+(plane[1][i]-n)*u);
 const bottom=plane[3].map((n,i)=>n+(plane[2][i]-n)*u);
 return top.map((n,i)=>Math.round((n+(bottom[i]-n)*v)*10)/10).join(',');
}
function quad(u0,v0,u1,v1,plane=corners) {return `${project(u0,v0,plane)} ${project(u1,v0,plane)} ${project(u1,v1,plane)} ${project(u0,v1,plane)}`;}
export function WindowGroundLight() {
 const id=useId().replace(/:/g,'');
 return <svg className="scene-artwork right-daylight-ground" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" focusable="false">
  <defs>
   <linearGradient id={`${id}-warm`} x1="0%" y1="0%" x2="80%" y2="100%"><stop stopColor="#fff0b8" stopOpacity=".12"/><stop offset=".4" stopColor="#ffe7a7" stopOpacity=".3"/><stop offset="1" stopColor="#ffe7a7" stopOpacity="0"/></linearGradient>
   <filter id={`${id}-soft`} x="-15%" y="-30%" width="130%" height="160%"><feGaussianBlur stdDeviation="12"/></filter>
  </defs>
  <g filter={`url(#${id}-soft)`}>
   <polygon points={quad(0,0,1,1)} fill={`url(#${id}-warm)`}/>
   <g className="daylight-closed-shadow" data-projection="closed-grid" fill="#67502e" opacity=".14">
    {[.25,.5,.75].map(u=><polygon key={u} points={quad(u-.009,0,u+.009,1)}/>)}
    {[1/3,2/3].map(v=><polygon key={v} points={quad(0,v-.014,1,v+.014)}/>)}
   </g>
   <g className="daylight-open-shadow" data-projection="open-sashes" fill="#67502e" opacity=".1">
    <polygon points={`${project(0,0)} ${project(.095,0)} ${project(.035,1)} ${project(0,1)}`}/>
    <polygon points={`${project(.905,0)} ${project(1,0)} ${project(1,1)} ${project(.965,1)}`}/>
   </g>
  </g>
 </svg>;
}
export function WindowAirLight() {
 const id=useId().replace(/:/g,'');
 return <svg className="scene-artwork window-air-light" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" focusable="false">
  <defs>
   <linearGradient id={`${id}-ray`} gradientUnits="userSpaceOnUse" x1="1100" y1="435" x2="1440" y2="1040"><stop stopColor="#fff4cc" stopOpacity=".025"/><stop offset=".24" stopColor="#fff4cc" stopOpacity=".18"/><stop offset=".7" stopColor="#ffecbb" stopOpacity=".1"/><stop offset="1" stopColor="#ffecbb" stopOpacity="0"/></linearGradient>
   <filter id={`${id}-haze`} filterUnits="userSpaceOnUse" x="900" y="350" width="1100" height="800"><feGaussianBlur stdDeviation="26"/></filter>
  </defs>
  <g fill={`url(#${id}-ray)`} filter={`url(#${id}-haze)`}>
   {/* One continuous fan reaches the lower bookcase without overlapping light bands.
       Its feathered left edge meets the rug near (1110,940); the far cap lies
       below the viewport so it cannot draw a hard horizontal cutoff. */}
   <path d="M1000 418 L1308 312 L1900 466 L2100 1060 L1135 1060 Z"/>
  </g>
 </svg>;
}

// Table light sits after the desktop artwork and before the independent props,
// so the computer/notebook/lamp naturally occlude it instead of being washed out.
export function WindowDeskLight() {
 const plane=[[1219,591],[1386,565],[1740,625],[1573,700]];
 return <svg className="scene-artwork window-desk-light" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" focusable="false">
  <polygon points={quad(0,0,1,1,plane)} fill="#ffeab0" opacity=".14"/>
  <g className="daylight-closed-shadow" data-projection="closed-desk-grid" fill="#61452c" opacity=".14">
   {[.25,.5,.75].map(u=><polygon key={u} points={quad(u-.009,0,u+.009,1,plane)}/>)}
   {[1/3,2/3].map(v=><polygon key={v} points={quad(0,v-.012,1,v+.012,plane)}/>)}
  </g>
 </svg>;
}
