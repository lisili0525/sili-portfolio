import { memo } from "react";

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
        <button type="button" className="object piano" aria-label="At the piano" data-entry="music" onClick={(event) => onEntry("music", event.currentTarget)}><span>At the piano</span></button>
        <button type="button" className="object coffee" aria-label="Something brewing" data-entry="coffee" onClick={(event) => onEntry("coffee", event.currentTarget)}><span>Something brewing</span></button>
        <button type="button" className="object photos" aria-label="Rachel & me" data-entry="photos" data-album-first="true" onClick={(event) => onEntry("photos", event.currentTarget)}><span>Rachel & me</span></button>
        <button type="button" className="object album" aria-label="Open the photo album" data-entry="photos" onClick={(event) => onEntry("photos", event.currentTarget)}><span>Open the photo album</span></button>
        <button type="button" className="object calendar" aria-label="Along the way" data-entry="milestones" onClick={(event) => onEntry("milestones", event.currentTarget)}><span>Along the way</span></button>
        <button type="button" className="object tennis" aria-label="On the court" data-entry="tennis" onClick={(event) => onEntry("tennis", event.currentTarget)}><span>On the court</span></button>
        <button type="button" className="object desk" aria-label="Inside my notebook" data-entry="notebook" onClick={(event) => onEntry("notebook", event.currentTarget)}><span>Inside my notebook</span></button>
      </section>
    </div>
  </main>
  );
});
