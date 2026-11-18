import { useContext, useId } from 'react';
import { RoomTextureContext } from './RoomTextureContext.js';
import { styleStudy } from '../assets/styleStudy.js';
import { MaterialFinish } from './MaterialFinish.jsx';
import { originalArtwork, roomSpace } from '../sceneObjects.js';
import { findArtworkAsset } from '../assets/objectAssets.js';

// Full-room rasters and clipping geometry are authoring inputs only. The browser
// renders a small registered transparent image and retains the original motion API.
export function SceneArtwork({path,className='',children,style,source=originalArtwork,dataPart,contentClassName,edgePadding=3.5}) {
  const asset=findArtworkAsset(source,path,edgePadding);
  if(!asset)throw Error('Missing transparent scene asset. Run npm run assets:export.');
  return <svg className={`scene-artwork ${className}`} data-part={dataPart} style={style} viewBox={`0 0 ${roomSpace.width} ${roomSpace.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <g className={contentClassName}><RegisteredImages asset={asset} /></g>
    {children}
  </svg>;
}

export function RegisteredImages({asset}) {
  return (asset.parts || [asset]).map(part => <RegisteredPart key={part.id} part={part} />);
}
function RegisteredPart({part}) {
  const imageId=useId().replace(/:/g,'');
  const painted=useContext(RoomTextureContext)==='painted'&&styleStudy[part.id];
  return <><image className={styleStudy[part.id]?'study-original':undefined} id={imageId} href={part.file} x={part.bounds.x} y={part.bounds.y} width={part.bounds.width} height={part.bounds.height} transform={part.transform} preserveAspectRatio="none" data-asset-id={part.id} />{painted&&<image className="study-painted" href={styleStudy[part.id]} x={part.bounds.x} y={part.bounds.y} width={part.bounds.width} height={part.bounds.height} transform={part.transform} preserveAspectRatio="none" data-style-asset={part.id} />}<MaterialFinish part={part} imageId={imageId} /></>;
}
