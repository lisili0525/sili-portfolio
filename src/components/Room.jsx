import { memo } from "react";
import { ObjectHotspot } from "./ObjectHotspot.jsx";
import { hotspots } from "../data/hotspots.js";

export const Room = memo(function Room({ roomRef, onEntry }) {
  return (
  <main>
    <div className="room-frame">
      <section ref={roomRef} className="room" aria-label="Sili's illustrated room. Select an object to explore.">
        <img className="room-art" src="assets/room-clean-v7.png" alt="Sili Li's warmly lit cartoon room, with a piano, espresso station, technical desk, tennis rackets, a framed couple portrait, and an open photo album on the foreground table." width="1672" height="941" />
        <img className="desk-chair-clear" src="assets/room-desk-chair-clear-v1.png" alt="" aria-hidden="true" width="1672" height="941" />
        <div id="viola" className="cat-layer"><button type="button" className="cat" data-entry="cats" data-cat="viola" onClick={(event) => onEntry("cats", event.currentTarget)} aria-label="Meet Viola & Java: Viola" title="Meet Viola & Java"><span className="cat-sprite" aria-hidden="true"></span></button></div>
        <div id="java" className="cat-layer"><button type="button" className="cat" data-entry="cats" data-cat="java" onClick={(event) => onEntry("cats", event.currentTarget)} aria-label="Meet Viola & Java: Java" title="Meet Viola & Java"><span className="cat-sprite" aria-hidden="true"></span></button></div>
        <img className="album-table-patch" src="assets/room-table-empty-v1.png" alt="" aria-hidden="true" width="1672" height="941" />
        <div id="station-cup" className="station-cup" aria-hidden="true"></div>
        <img className="desk-chair desk-chair-back" src="assets/desk-chair-v1.png" alt="" aria-hidden="true" width="629" height="772" />
        <div id="sili" className="sili" data-pose="idle" aria-hidden="true"><div className="sili-sprite"></div></div>
        <img className="desk-foreground" src="assets/room-desk-chair-clear-v1.png" alt="" aria-hidden="true" width="1672" height="941" />
        <img className="desk-chair desk-chair-front" src="assets/desk-chair-v1.png" alt="" aria-hidden="true" width="629" height="772" />
        <img className="table-foreground" src="assets/room-clean-v4.png" alt="" aria-hidden="true" width="1672" height="941" />
        <img className="table-empty-foreground" src="assets/room-table-empty-v1.png" alt="" aria-hidden="true" width="1672" height="941" />
        <img className="piano-foreground" src="assets/room-clean-v4.png" alt="" aria-hidden="true" width="1672" height="941" />
        {hotspots.map(hotspot => <ObjectHotspot key={hotspot.id} hotspot={hotspot} onEntry={onEntry} />)}
      </section>
    </div>
  </main>
  );
});
