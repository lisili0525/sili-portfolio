import { memo, useState } from 'react';
import { ContactLinks } from './ContactLinks.jsx';
import { CoffeeStation } from '../scene/modules/CoffeeStation.jsx';
import { RoomWindow } from '../scene/modules/RoomWindow.jsx';
import { RoomLighting } from '../scene/modules/RoomLighting.jsx';
import { Residents } from '../scene/modules/Residents.jsx';
import { RoomDepthLayers } from '../scene/modules/RoomDepthLayers.jsx';
import { Bookshelf,Calendar,CoffeeCabinet,CoffeeTable,Piano,PianoBench,Plants,RoomRug,Sofa,TennisCorner,ToyMouse,WallPortrait,WallShelf,WindowStool,WorkingChair,Workstation } from '../scene/modules/Furniture.jsx';
import '../scene/roomAnimations.css';

export const Room=memo(function Room({roomRef,onEntry}){
  const [windowOpen,setWindowOpen]=useState(true),[curtainsOpen,setCurtainsOpen]=useState(true);
  return <main><div className="room-frame">
    <section ref={roomRef} className="room" data-window-open={windowOpen} data-curtains-open={curtainsOpen} aria-label="Sili's illustrated room. Select an object to explore.">
      <img className="room-art" src="assets/room-architecture-v2.png" alt="Sili Li's warmly lit cartoon room, with a piano, espresso station, technical desk, tennis rackets, a framed couple portrait, and an open photo album on the foreground table." width="1672" height="941" />
      <RoomLighting /><RoomRug /><Bookshelf /><WallShelf /><Piano onEntry={onEntry} /><PianoBench />
      <WallPortrait onEntry={onEntry} /><Calendar onEntry={onEntry} />
      <CoffeeCabinet /><CoffeeStation onEntry={onEntry} repair={false} />
      <RoomWindow windowOpen={windowOpen} onWindowChange={setWindowOpen} curtainsOpen={curtainsOpen} onCurtainsChange={setCurtainsOpen} repair={false} />
      <TennisCorner onEntry={onEntry} /><WindowStool /><Sofa />
      <CoffeeTable onEntry={onEntry} /><Workstation onEntry={onEntry} /><Plants /><ToyMouse />
      <WorkingChair /><Residents onEntry={onEntry} /><RoomDepthLayers /><ContactLinks />
    </section>
  </div></main>;
});
