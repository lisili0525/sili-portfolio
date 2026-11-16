import { useEffect, useRef, useState } from 'react';
import { FurnitureModule } from '../shared/FurnitureModule.jsx';
import { ObjectHotspot } from '../../components/ObjectHotspot.jsx';
import { furniture,plants } from '../furnitureCatalog.js';

export const RoomRug=()=> <FurnitureModule object={furniture.rug} />;
export const PianoBench=()=> <FurnitureModule object={furniture.pianoBench} />;
export const CoffeeCabinet=()=> <FurnitureModule object={furniture.coffeeCabinet} />;
export const WindowStool=()=> <FurnitureModule object={furniture.stool} />;
export const Sofa=()=> <FurnitureModule object={furniture.sofa} />;
export const ToyMouse=()=> <FurnitureModule object={furniture.mouse} />;
export const Calendar=({onEntry})=> <FurnitureModule object={furniture.calendar} onEntry={onEntry} />;
export const TennisCorner=({onEntry})=> <FurnitureModule object={furniture.tennis} onEntry={onEntry} />;
export const Plants=()=>plants.map(plant=><FurnitureModule key={plant.id} object={plant} />);

export function Piano({onEntry}) {
  return <FurnitureModule object={furniture.piano} onEntry={onEntry}>
    <svg className="scene-artwork piano-keylights" viewBox="0 0 1672 941" aria-hidden="true" preserveAspectRatio="none">
      {[75,112,161,214,264,315].map((x,index)=><rect key={x} x={x} y={576-index*.7} width="9" height="13" rx="1" style={{animationDelay:`${index*-.31}s`}} />)}
    </svg>
  </FurnitureModule>;
}
export function WallPortrait({onEntry}) {
  return <FurnitureModule object={furniture.portrait} onEntry={onEntry}>
    <svg className="scene-artwork portrait-glass" viewBox="0 0 1672 941" aria-hidden="true"><path d="M408 165 L446 165 L606 341 L565 341 Z" fill="#fff6dd" /></svg>
  </FurnitureModule>;
}
export function Bookshelf() {
  return <FurnitureModule object={furniture.bookcase}>
    <svg className="scene-artwork bookcase-glint" viewBox="0 0 1672 941" aria-hidden="true"><path d="M1563 294 L1563 406 M1611 278 L1611 407 M1584 454 L1584 551" stroke="#ffe4a8" strokeWidth="2" /></svg>
  </FurnitureModule>;
}
export function CoffeeTable({onEntry}) {
  return <><FurnitureModule object={furniture.coffeeTable} /><FurnitureModule object={furniture.album} onEntry={onEntry} /></>;
}
export function WallShelf() {
  const [flash,setFlash]=useState(false);const timer=useRef(null);
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  function takePhoto(){clearTimeout(timer.current);setFlash(true);timer.current=setTimeout(()=>setFlash(false),220);}
  const camera=furniture.wallShelf.parts.find(part=>part.id==='camera');
  return <FurnitureModule object={furniture.wallShelf}>
    {flash&&<svg className="scene-artwork camera-flash" viewBox="0 0 1672 941" aria-hidden="true"><circle cx="318" cy="218" r="26" fill="#fff7dc" /><path d="M318 183 V253 M284 218 H352" stroke="#fff7dc" strokeWidth="3" /></svg>}
    <ObjectHotspot hotspot={{id:'camera',label:'Take a photo',tooltip:[19.5,21],paths:[camera.path]}} onActivate={takePhoto} />
  </FurnitureModule>;
}
export function DeskLamp() {
  const [lit,setLit]=useState(true);
  return <FurnitureModule object={furniture.lamp}>
    <svg className={`scene-artwork lamp-light ${lit?'is-lit':''}`} viewBox="0 0 1672 941" aria-hidden="true">
      <path d="M1444 458 L1358 599 Q1442 642 1532 618 L1487 460 Z" fill="#ffe4a8" />
      <ellipse cx="1465" cy="449" rx="23" ry="9" fill="#fff7cf" />
    </svg>
    <ObjectHotspot hotspot={{id:'lamp',label:lit?'Turn off desk lamp':'Turn on desk lamp',tooltip:[88,40],paths:furniture.lamp.parts.map(part=>part.path)}} pressed={lit} onActivate={()=>setLit(value=>!value)} />
  </FurnitureModule>;
}
export function Workstation({onEntry}) {
  return <>
    <FurnitureModule object={furniture.desk} />
    <DeskLamp />
    <FurnitureModule object={furniture.computer} onEntry={onEntry}>
      <svg className="scene-artwork computer-screen" viewBox="0 0 1672 941" aria-hidden="true">
        <path d="M1373 512 L1464 514 L1444 574 L1354 571 Z" fill="#849ba1" opacity=".12" />
        {[0,1,2,3,4].map(index=><path className="screen-code-line" key={index} d={`M1378 ${529+index*7} L${1427-index%3*12} ${530+index*7}`} stroke={index%2?'#c8d3ab':'#d6d6bb'} strokeWidth="1.5" style={{animationDelay:`${index*-.6}s`}} />)}
      </svg>
    </FurnitureModule>
    <FurnitureModule object={furniture.notebook} onEntry={onEntry} />
    <FurnitureModule object={furniture.stationery} />
    <FurnitureModule object={furniture.deskBooks} />
  </>;
}
export function WorkingChair(){
  const object=furniture.workChair;
  return <img className="desk-chair desk-chair-back" data-scene-object={object.id} style={{left:`${object.position.x/1672*100}%`,top:`${object.position.y/941*100}%`,height:`${object.height/941*100}%`}} src={object.image} alt="" aria-hidden="true" width="629" height="772" />;
}
