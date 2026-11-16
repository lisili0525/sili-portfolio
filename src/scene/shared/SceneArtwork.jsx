import { useId } from 'react';
import { originalArtwork, roomSpace, underpainting } from '../sceneObjects.js';

// Geometric clipping avoids full-stage alpha-mask textures in animated layers.
// Offset copies retain the former edge padding without filters or mask buffers.
function ExpandedClip({id,paths,padding}) {
  const diagonal=padding/Math.sqrt(2);
  const offsets=[[0,0],[padding,0],[-padding,0],[0,padding],[0,-padding],
    [diagonal,diagonal],[-diagonal,diagonal],[diagonal,-diagonal],[-diagonal,-diagonal]];
  return <clipPath id={id} clipPathUnits="userSpaceOnUse">
    {paths.flatMap((path,index)=>offsets.map(([x,y],copy)=><path key={`${index}-${copy}`} d={path} transform={`translate(${x} ${y})`} />))}
  </clipPath>;
}

export function SceneArtwork({path, className='', children, style, source=originalArtwork, dataPart, contentClassName}) {
  const id=`piece-${useId().replace(/[^a-zA-Z0-9]/g,'')}`;
  return <svg className={`scene-artwork ${className}`} data-part={dataPart} style={style} viewBox={`0 0 ${roomSpace.width} ${roomSpace.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs><ExpandedClip id={id} paths={[path]} padding={3.5} /></defs>
    <g className={contentClassName}><image href={source} width={roomSpace.width} height={roomSpace.height} preserveAspectRatio="none" clipPath={`url(#${id})`} /></g>
    {children}
  </svg>;
}

export function BackgroundRepair({paths}) {
  const id=`repair-${useId().replace(/[^a-zA-Z0-9]/g,'')}`;
  return <svg className="scene-artwork background-repair" viewBox={`0 0 ${roomSpace.width} ${roomSpace.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs><ExpandedClip id={id} paths={paths} padding={4} /></defs>
    <image href={underpainting} width={roomSpace.width} height={roomSpace.height} preserveAspectRatio="none" clipPath={`url(#${id})`} />
  </svg>;
}
