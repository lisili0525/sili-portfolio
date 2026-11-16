import { useEffect, useRef, useState } from 'react';
import { ObjectHotspot } from '../../components/ObjectHotspot.jsx';
import { BackgroundRepair, SceneArtwork } from '../shared/SceneArtwork.jsx';
import { useSceneMotion } from '../shared/useSceneMotion.js';
import { coffeeStation, moduleStyle } from '../sceneObjects.js';
import '../scene.css';

export function CoffeeStation({onEntry, brewing:controlledBrewing, repair=true}) {
  const ref=useRef(null);
  const [personBrewing,setBrewing]=useState(false);
  const brewing=controlledBrewing ?? personBrewing;
  const motion=useSceneMotion();
  useEffect(()=>{
    const room=ref.current.closest('.room') || ref.current;
    const pose=event=>setBrewing(event.detail.group==='coffee'&&[0,1].includes(event.detail.frame));
    room.addEventListener('room:pose',pose);
    return ()=>room.removeEventListener('room:pose',pose);
  },[]);
  return <>
    {repair&&<BackgroundRepair paths={Object.values(coffeeStation.parts)} />}
    <div ref={ref} className={`scene-module coffee-module ${brewing?'is-brewing':''}`} style={{...moduleStyle(coffeeStation),'--steam-duration':`${coffeeStation.animation.steamDuration}s`,'--brew-pulse-duration':`${coffeeStation.animation.brewPulseDuration}s`}} data-scene-object={coffeeStation.id} data-motion={motion?'running':'still'} data-brewing={brewing}>
    <SceneArtwork path={coffeeStation.parts.machine} className="coffee-machine-piece" />
    <SceneArtwork path={coffeeStation.parts.grinder} className="coffee-grinder-piece" />
    <SceneArtwork path={coffeeStation.parts.beans} className="coffee-beans-piece" />
    <SceneArtwork path={coffeeStation.parts.cup} className="coffee-cup-piece" />
    <svg className="scene-artwork coffee-effects" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <circle className="machine-indicator" cx="650" cy="430" r="3.2" />
      <g className="machine-steam"><path d="M604 400 C597 390 614 386 607 375" /><path d="M618 400 C628 389 610 385 619 371" /><path d="M631 401 C624 393 639 387 633 379" /></g>
      <path className="coffee-stream" d="M625 458 Q624 472 625 486" />
    </svg>
    <div id="station-cup" className="station-cup" aria-hidden="true" />
    <ObjectHotspot hotspot={coffeeStation.hotspot} onEntry={onEntry} />
  </div></>;
}
