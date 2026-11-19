import { memo, useState } from 'react';
import { objectManifest } from '../scene/assets/objectAssets.js';
import { ContactLinks } from './ContactLinks.jsx';
import { CoffeeStation } from '../scene/modules/CoffeeStation.jsx';
import { RoomWindow } from '../scene/modules/RoomWindow.jsx';
import { RoomLighting } from '../scene/modules/RoomLighting.jsx';
import { Residents } from '../scene/modules/Residents.jsx';
import { RoomDepthLayers } from '../scene/modules/RoomDepthLayers.jsx';
import { DeskSeatedBody } from '../scene/modules/DeskSeatedBody.jsx';
import { Bookshelf,Calendar,CoffeeCabinet,CoffeeTable,Piano,PianoBench,Plants,RoomRug,Sofa,TennisCorner,ToyMouse,WallPortrait,WallShelf,WindowStool,WorkingChair,Workstation } from '../scene/modules/Furniture.jsx';
import '../scene/roomAnimations.css';
import { RoomPaper } from '../scene/TextureReview.jsx';
import '../scene/textureReview.css';
import { WindowAirLight } from '../scene/modules/WindowDaylight.jsx';
import { RoomTextureContext } from '../scene/shared/RoomTextureContext.js';
import { FurnitureContacts } from '../scene/shared/MaterialFinish.jsx';

export const Room=memo(function Room(/** @type {{roomRef: import("react").RefObject<HTMLElement | null>, onEntry: (key: string, trigger?: HTMLElement) => void}} */ {roomRef,onEntry}){
  const [windowOpen,setWindowOpen]=useState(true),[curtainsOpen,setCurtainsOpen]=useState(true);
  const texture='painted';
  const lettering=objectManifest.objects.find(asset=>asset.id==='room--lettering');
  return <main><div className="room-frame">
    <RoomTextureContext.Provider value={texture}><section ref={roomRef} className="room rebuilt-room" data-artwork-version="regenerated-v1" data-texture={texture} data-window-open={windowOpen} data-curtains-open={curtainsOpen} aria-label="Sili's illustrated room. Select an object to explore.">
      <img className="room-art" src={objectManifest.background.file} alt="Sili Li's warmly lit cartoon room, with a piano, espresso station, technical desk, tennis rackets, a framed couple portrait, and an open photo album on the foreground table." width="1672" height="941" />
      {lettering&&<svg className="scene-artwork" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" data-scene-object="room-lettering"><image href={lettering.file} x={lettering.bounds.x} y={lettering.bounds.y} width={lettering.bounds.width} height={lettering.bounds.height} /></svg>}
      <RoomLighting /><FurnitureContacts /><RoomRug /><Bookshelf /><WallShelf /><Piano onEntry={onEntry} /><PianoBench />
      <WallPortrait onEntry={onEntry} /><Calendar onEntry={onEntry} />
      <CoffeeCabinet /><CoffeeStation onEntry={onEntry} />
      <RoomWindow windowOpen={windowOpen} onWindowChange={setWindowOpen} curtainsOpen={curtainsOpen} onCurtainsChange={setCurtainsOpen} />
      <TennisCorner onEntry={onEntry} /><WindowStool /><Sofa />
      <CoffeeTable onEntry={onEntry} /><Workstation onEntry={onEntry} /><Plants /><ToyMouse />
      <WorkingChair /><DeskSeatedBody /><Residents onEntry={onEntry} /><RoomDepthLayers /><WindowAirLight /><RoomPaper /><ContactLinks />
    </section></RoomTextureContext.Provider>
  </div></main>;
});
