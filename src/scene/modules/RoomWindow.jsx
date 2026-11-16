import { useRef, useState } from 'react';
import { ObjectHotspot } from '../../components/ObjectHotspot.jsx';
import { BackgroundRepair, SceneArtwork } from '../shared/SceneArtwork.jsx';
import { useSceneMotion } from '../shared/useSceneMotion.js';
import { moduleStyle, originalArtwork, roomWindow } from '../sceneObjects.js';
import '../scene.css';

export function RoomWindow({windowOpen:controlledWindow,onWindowChange,curtainsOpen:controlledCurtains,onCurtainsChange,repair=true}) {
  const [localWindow,setWindow]=useState(true),[localCurtains,setCurtains]=useState(true),[status,setStatus]=useState('');
  const ref=useRef(null);const motion=useSceneMotion();
  const windowOpen=controlledWindow??localWindow,curtainsOpen=controlledCurtains??localCurtains;
  function toggleWindow(){
    const room=ref.current.closest('.room');
    if(windowOpen&&room?.querySelector('.cat-layer.at-window:not([hidden])')) {setStatus('A cat is using the window. Try again in a moment.');return;}
    setStatus('');setWindow(!windowOpen);onWindowChange?.(!windowOpen);
  }
  function toggleCurtains(){
    if(curtainsOpen&&ref.current.closest('.room')?.querySelector('.cat-layer.at-window:not([hidden])')) {setStatus('A cat is using the window. Try again in a moment.');return;}
    setCurtains(!curtainsOpen);onCurtainsChange?.(!curtainsOpen);setStatus('');
  }
  const curtainPaths=curtainsOpen?[roomWindow.parts.leftCurtain,roomWindow.parts.rightCurtain]:[roomWindow.parts.closedLeft,roomWindow.parts.closedRight];
  return <>
    {repair&&<BackgroundRepair paths={[roomWindow.parts.leftCurtain,roomWindow.parts.rightCurtain]} />}
    <div ref={ref} className="scene-module window-module" style={{...moduleStyle(roomWindow),'--left-curtain-duration':`${roomWindow.animation.leftDuration}s`,'--right-curtain-duration':`${roomWindow.animation.rightDuration}s`}} data-scene-object={roomWindow.id} data-window-open={windowOpen} data-curtains-open={curtainsOpen} data-motion={motion&&windowOpen?'running':'still'}>
      <SceneArtwork path="M928 162 H1378 V479 H928 Z" source="assets/room-module-underpainting-v2.png" className="window-frame" />
      <svg className="scene-artwork window-garden" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
        <svg x="955" y="180" width="401" height="259" viewBox="1012 180 292 259" preserveAspectRatio="none"><image href={originalArtwork} width="1672" height="941" preserveAspectRatio="none" /></svg>
      </svg>
      <SceneArtwork path="M868 130 H1450 V154 H868 Z" source="assets/room-module-underpainting-v2.png" className="curtain-rod" />
      <SceneArtwork path={roomWindow.parts.leftSash} className="window-left-sash" />
      <SceneArtwork path={roomWindow.parts.rightSash} className="window-right-sash" />
      <SceneArtwork path="M954 178 H1356 V441 H954 Z" source="assets/window-closed-v1.png" className="window-closed-glass" />
      <SceneArtwork path={roomWindow.parts.leftCurtain} className="window-left-curtain curtain-open-piece" />
      <SceneArtwork path={roomWindow.parts.rightCurtain} className="window-right-curtain curtain-open-piece" />
      <SceneArtwork path={roomWindow.parts.closedLeft} source="assets/curtains-closed-v1.png" className="curtain-closed-left curtain-closed-piece" contentClassName="curtain-fabric-left" />
      <SceneArtwork path={roomWindow.parts.closedRight} source="assets/curtains-closed-v1.png" className="curtain-closed-right curtain-closed-piece" contentClassName="curtain-fabric-right" />
      <ObjectHotspot hotspot={{id:'window-toggle',label:windowOpen?'Close window':'Open window',tooltip:[69,18],paths:['M957 180 H1354 V440 H957 Z']}} onActivate={toggleWindow} pressed={windowOpen} />
      <ObjectHotspot hotspot={{id:'curtain-toggle',label:curtainsOpen?'Close curtains':'Open curtains',tooltip:roomWindow.tooltip,paths:curtainPaths}} onActivate={toggleCurtains} pressed={curtainsOpen} />
      <p className="sr-only" role="status">{status}</p>
    </div>
  </>;
}
