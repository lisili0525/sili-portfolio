import { useId } from 'react';
import { originalArtwork, roomSpace, underpainting } from '../sceneObjects.js';

export function SceneArtwork({path, className='', children, style, source=originalArtwork, dataPart, contentClassName}) {
  const id=`piece-${useId().replace(/[^a-zA-Z0-9]/g,'')}`;
  return <svg className={`scene-artwork ${className}`} data-part={dataPart} style={style} viewBox={`0 0 ${roomSpace.width} ${roomSpace.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs>
      <mask id={id} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" style={{maskType:'alpha'}} x="0" y="0" width={roomSpace.width} height={roomSpace.height}>
        {/* A plain stroke expands edges without animated SVG filter surfaces. */}
        <path d={path} fill="white" stroke="white" strokeWidth="7" strokeLinejoin="round" />
      </mask>
    </defs>
    <g className={contentClassName}><image href={source} width={roomSpace.width} height={roomSpace.height} preserveAspectRatio="none" mask={`url(#${id})`} /></g>
    {children}
  </svg>;
}

export function BackgroundRepair({paths}) {
  const id=`repair-${useId().replace(/[^a-zA-Z0-9]/g,'')}`;
  return <svg className="scene-artwork background-repair" viewBox={`0 0 ${roomSpace.width} ${roomSpace.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs>
      <mask id={id} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" style={{maskType:'alpha'}} x="0" y="0" width={roomSpace.width} height={roomSpace.height}>
        <g fill="white" stroke="white" strokeWidth="8" strokeLinejoin="round">{paths.map((path,index)=><path key={index} d={path} />)}</g>
      </mask>
    </defs>
    <image href={underpainting} width={roomSpace.width} height={roomSpace.height} preserveAspectRatio="none" mask={`url(#${id})`} />
  </svg>;
}
