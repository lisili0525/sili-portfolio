import { useId } from 'react';
import { originalArtwork, roomSpace, underpainting } from '../sceneObjects.js';

export function SceneArtwork({path, className='', children, style, source=originalArtwork, dataPart, contentClassName}) {
  const id=`piece-${useId().replace(/[^a-zA-Z0-9]/g,'')}`;
  return <svg className={`scene-artwork ${className}`} data-part={dataPart} style={style} viewBox={`0 0 ${roomSpace.width} ${roomSpace.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs>
      <filter id={`${id}-edge`} x="-20%" y="-20%" width="140%" height="140%"><feMorphology operator="dilate" radius="3.5" /></filter>
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={roomSpace.width} height={roomSpace.height}>
        <path d={path} fill="white" filter={`url(#${id}-edge)`} />
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
      <filter id={`${id}-expand`} x="-20%" y="-20%" width="140%" height="140%"><feMorphology operator="dilate" radius="4" /></filter>
      <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={roomSpace.width} height={roomSpace.height}>
        <g fill="white" filter={`url(#${id}-expand)`}>{paths.map((path,index)=><path key={index} d={path} />)}</g>
      </mask>
    </defs>
    <image href={underpainting} width={roomSpace.width} height={roomSpace.height} preserveAspectRatio="none" mask={`url(#${id})`} />
  </svg>;
}
