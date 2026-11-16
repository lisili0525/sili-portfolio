import { ObjectHotspot } from '../../components/ObjectHotspot.jsx';
import { SceneArtwork } from './SceneArtwork.jsx';
import { moduleStyle, roomSpace } from '../sceneObjects.js';
import { useSceneMotion } from './useSceneMotion.js';

export function FurnitureModule({object,onEntry,children,artwork=true}) {
  const motion=useSceneMotion();
  return <div className={`scene-module furniture-module ${object.id}-module`} data-scene-object={object.id} data-motion={motion?'running':'still'} style={moduleStyle(object)}>
    {artwork&&object.parts.map(part=><SceneArtwork key={part.id} path={part.path} source={part.source} className={part.animation||''} dataPart={part.id}
      style={part.pivot?{transformOrigin:`${part.pivot[0]/roomSpace.width*100}% ${part.pivot[1]/roomSpace.height*100}%`}:undefined} />)}
    {children}
    {object.hotspot&&<ObjectHotspot hotspot={object.hotspot} onEntry={onEntry} />}
  </div>;
}
