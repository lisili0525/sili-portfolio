import { useEffect, useRef, useState } from 'react';
import { CoffeeStation } from './modules/CoffeeStation.jsx';
import { RoomWindow } from './modules/RoomWindow.jsx';
import { originalArtwork, roomSpace } from './sceneObjects.js';
import './demo.css';

function SceneCloseup({bounds,children,label}) {
  const [x,y,width,height]=bounds;
  return <div className="module-demo-crop" style={{aspectRatio:`${width}/${height}`}} aria-label={label}>
    <div className="module-demo-world" style={{left:`${-x/width*100}%`,top:`${-y/height*100}%`,width:`${roomSpace.width/width*100}%`,height:`${roomSpace.height/height*100}%`}}>
      <img className="room-art" src={originalArtwork} alt="" />{children}
    </div>
  </div>;
}

export function ModuleDemo() {
  const [brewing,setBrewing]=useState(false);
  const timer=useRef(null);
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  function brew() {
    clearTimeout(timer.current);setBrewing(true);
    timer.current=setTimeout(()=>setBrewing(false),5500);
  }
  return <main className="module-demo">
    <header className="module-demo-header"><div><p className="eyebrow">A LITTLE HOUSE, ONE PIECE AT A TIME</p><h1>Small objects. Their own little lives.</h1><p>Two independent pieces of the same room. Try each one below.</p></div><a className="demo-return" href={location.pathname}>Back to the room ↗</a></header>
    <div className="module-demo-grid">
      <section className="module-demo-card" aria-labelledby="coffee-demo-title">
        <SceneCloseup bounds={[490,335,365,225]} label="Coffee station close-up"><CoffeeStation onEntry={brew} brewing={brewing} /></SceneCloseup>
        <div className="module-demo-copy"><p className="eyebrow">01 / COFFEE STATION</p><h2 id="coffee-demo-title">A quiet coffee break</h2><p>Steam rises, the indicator glows, and a little espresso flows. The machine, grinder, jar and cup are separate layers.</p><button type="button" className="demo-action" onClick={brew}>{brewing?'Brew another cup':'Brew espresso'}</button><span className="demo-state" role="status">{brewing?'Brewing a fresh cup…':'Ready when you are'}</span></div>
      </section>
      <section className="module-demo-card" aria-labelledby="window-demo-title">
        <SceneCloseup bounds={[845,90,620,420]} label="Window close-up"><RoomWindow /></SceneCloseup>
        <div className="module-demo-copy"><p className="eyebrow">02 / WINDOW</p><h2 id="window-demo-title">A breeze through the room</h2><p>Click the glass to open or close the window. Click either curtain to draw or open the curtains. Wind moves the fabric only while the window is open.</p><p className="demo-hint">The outward-opening windows keep their original proportions.</p></div>
      </section>
    </div>
    <p className="demo-footnote">Motion pauses in inactive tabs and respects your device’s reduced-motion setting.</p>
  </main>;
}
