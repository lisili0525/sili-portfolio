import { findObjectAsset } from '../assets/objectAssets.js';
import { useId, useRef, useState } from 'react';
import { ObjectHotspot } from '../../components/ObjectHotspot.jsx';
import { SceneArtwork, RegisteredImages } from '../shared/SceneArtwork.jsx';
import { useSceneMotion } from '../shared/useSceneMotion.js';
import { moduleStyle, roomWindow } from '../sceneObjects.js';
import '../scene.css';
import layout from '../../../assets/rebuilt/v1/layout.json';
const closedSeam=layout.curtains.closedSeamX/1672*100;
const closedLeftClip=`polygon(0 0,${closedSeam}% 0,${closedSeam}% 100%,0 100%)`;
const closedRightClip=`polygon(${closedSeam}% 0,100% 0,100% 100%,${closedSeam}% 100%)`;

function WindowImage({id}) {
  const asset=findObjectAsset(id);
  return asset&&<RegisteredImages asset={asset} />;
}

export function RoomWindow({windowOpen:controlledWindow,onWindowChange,curtainsOpen:controlledCurtains,onCurtainsChange}) {
  const [localWindow,setWindow]=useState(true),[localCurtains,setCurtains]=useState(true),[status,setStatus]=useState('');
  const ref=useRef(null);const motion=useSceneMotion();
  const aperture=useId().replace(/:/g,'');
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
  const garden=findObjectAsset('window--garden');
  const curtainPaths=curtainsOpen?[roomWindow.parts.leftCurtain,roomWindow.parts.rightCurtain]:[roomWindow.parts.closedLeft,roomWindow.parts.closedRight];
  return <>
    <div ref={ref} className="scene-module window-module" style={{...moduleStyle(roomWindow),'--left-curtain-duration':`${roomWindow.animation.leftDuration}s`,'--right-curtain-duration':`${roomWindow.animation.rightDuration}s`}} data-scene-object={roomWindow.id} data-window-open={windowOpen} data-curtains-open={curtainsOpen} data-motion={motion&&windowOpen?'running':'still'}>
      <SceneArtwork path={roomWindow.parts.frame} edgePadding={.5} source="assets/room-module-underpainting-v2.png" className="window-frame" />
      <svg className="scene-artwork window-garden" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
        <RegisteredImages asset={garden} />
        <g className="garden-aperture" pointerEvents="none">
          <defs>
            <linearGradient id={`${aperture}-top`} x1="0%" y1="0%" x2="0%" y2="100%"><stop stopColor="#253b2b" stopOpacity=".2"/><stop offset=".1" stopColor="#253b2b" stopOpacity="0"/></linearGradient>
            <linearGradient id={`${aperture}-sides`}><stop stopColor="#253b2b" stopOpacity=".13"/><stop offset=".04" stopColor="#253b2b" stopOpacity="0"/><stop offset=".96" stopColor="#253b2b" stopOpacity="0"/><stop offset="1" stopColor="#253b2b" stopOpacity=".13"/></linearGradient>
          </defs>
          <rect x={garden.bounds.x} y={garden.bounds.y} width={garden.bounds.width} height={garden.bounds.height} fill={`url(#${aperture}-top)`}/>
          <rect x={garden.bounds.x} y={garden.bounds.y} width={garden.bounds.width} height={garden.bounds.height} fill={`url(#${aperture}-sides)`}/>
        </g>
        <g className="window-left-sash"><WindowImage id="window--open-left-view" /></g>
        <g className="window-right-sash"><WindowImage id="window--open-right-view" /></g>
        <g className="window-closed-glass"><WindowImage id="window--closed-view" /></g>
      </svg>
      <SceneArtwork path={roomWindow.parts.rod} source="assets/room-module-underpainting-v2.png" className="curtain-rod" />
      <SceneArtwork path={roomWindow.parts.leftSash} className="window-left-sash"><WindowImage id="window--open-left-pane" /></SceneArtwork>
      <SceneArtwork path={roomWindow.parts.rightSash} className="window-right-sash"><WindowImage id="window--open-right-pane" /></SceneArtwork>
      <SceneArtwork path="M954 178 H1356 V441 H954 Z" source="assets/window-closed-v1.png" className="window-closed-glass"><WindowImage id="window--closed-pane" /></SceneArtwork>
      <SceneArtwork path={roomWindow.parts.leftCurtain} className="window-left-curtain curtain-open-piece" />
      <SceneArtwork path={roomWindow.parts.rightCurtain} className="window-right-curtain curtain-open-piece" />
      <SceneArtwork path={roomWindow.parts.closedLeft} source="assets/curtains-closed-v1.png" className="curtain-closed-left curtain-closed-piece" style={{clipPath:closedLeftClip}} contentClassName="curtain-fabric-left" />
      <SceneArtwork path={roomWindow.parts.closedRight} source="assets/curtains-closed-v1.png" className="curtain-closed-right curtain-closed-piece" style={{clipPath:closedRightClip}} contentClassName="curtain-fabric-right" />
      <ObjectHotspot hotspot={{id:'window-toggle',label:windowOpen?'Close window':'Open window',tooltip:[69,18],paths:['M957 180 H1354 V440 H957 Z']}} onActivate={toggleWindow} pressed={windowOpen} />
      <ObjectHotspot hotspot={{id:'curtain-toggle',label:curtainsOpen?'Close curtains':'Open curtains',tooltip:roomWindow.tooltip,paths:curtainPaths}} onActivate={toggleCurtains} pressed={curtainsOpen} />
      <p className="sr-only" role="status">{status}</p>
    </div>
  </>;
}
