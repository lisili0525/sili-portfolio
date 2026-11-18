import { useEffect, useRef, useState } from 'react';
import { ObjectHotspot } from '../../components/ObjectHotspot.jsx';
import { SceneArtwork } from '../shared/SceneArtwork.jsx';
import { useSceneMotion } from '../shared/useSceneMotion.js';
import { coffeeStation, moduleStyle } from '../sceneObjects.js';
import '../scene.css';
import { findObjectAsset } from '../assets/objectAssets.js';

export function CoffeeStation({onEntry, brewing:controlledBrewing}) {
  const ref=useRef(null);
  const [personBrewing,setBrewing]=useState(false);
  const brewing=controlledBrewing ?? personBrewing;
  const motion=useSceneMotion();
  const mug=findObjectAsset('coffee-station--cup');
  useEffect(()=>{
    const room=ref.current.closest('.room') || ref.current;
    const pose=event=>setBrewing(event.detail.group==='coffee'&&event.detail.coffeePhase==='extracting');
    room.addEventListener('room:pose',pose);
    return ()=>room.removeEventListener('room:pose',pose);
  },[]);
  return <>
    <div ref={ref} className={`scene-module coffee-module ${brewing?'is-brewing':''}`} style={{...moduleStyle(coffeeStation),'--steam-duration':`${coffeeStation.animation.steamDuration}s`,'--brew-pulse-duration':`${coffeeStation.animation.brewPulseDuration}s`}} data-scene-object={coffeeStation.id} data-motion={motion?'running':'still'} data-brewing={brewing}>
    <svg className="scene-artwork coffee-contact-shadows" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <g fill="#573521" opacity=".16"><ellipse cx="626" cy="536" rx="46" ry="3"/><ellipse cx="711" cy="536" rx="25" ry="2.5"/><ellipse cx="772" cy="536" rx="23" ry="2.5"/></g>
    </svg>
    <SceneArtwork path={coffeeStation.parts.machine} className="coffee-machine-piece" />
    <SceneArtwork path={coffeeStation.parts.grinder} className="coffee-grinder-piece" />
    <SceneArtwork path={coffeeStation.parts.beans} className="coffee-beans-piece" />
    <svg className="scene-artwork coffee-effects" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <g transform="translate(0 12)"><circle className="machine-indicator" cx="650" cy="430" r="3.2" />
      <g className="machine-steam"><path d="M604 400 C597 390 614 386 607 375" /><path d="M618 400 C628 389 610 385 619 371" /><path d="M631 401 C624 393 639 387 633 379" /></g>
      <path className="coffee-stream" d="M625 458 Q624 472 625 486" /></g>
    </svg>
    <div id="station-cup" className="station-cup coffee-cup-piece" style={{backgroundImage:`url("${mug.file}")`,left:`${mug.bounds.x/1672*100}%`,top:`${mug.bounds.y/941*100}%`,width:`${mug.bounds.width/1672*100}%`,height:`${mug.bounds.height/941*100}%`,aspectRatio:'auto'}} aria-hidden="true" />
    <ObjectHotspot hotspot={coffeeStation.hotspot} onEntry={onEntry} />
  </div></>;
}
