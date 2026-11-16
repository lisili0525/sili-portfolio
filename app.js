const entries = {
  music:{label:'From my piano',title:'At the piano',body:`<p>Music is part of my life, both listening and playing.</p><p class="note">Choose a recording to listen.</p>`},
  coffee:{label:'Coffee, slowly',title:'Something brewing',body:`<p>I enjoy making my own coffee, exploring different beans and brewing techniques, and discovering local coffee shops.</p><h3>From a cup to code</h3><p>CoffeeHeads is also one of my technical projects: a full-stack web application built with Java, Spring Boot, React, PostgreSQL, and Redis.</p><button class="inline-link" data-entry="notebook">Open the technical notebook ↗</button><p class="note">This journal has room for beans, brewing experiments, and café memories as I choose what to share.</p>`},
  notebook:{label:'Questions, experiments & code',title:'Inside my notebook',body:`<p>I'm interested in mathematical modeling, machine learning, abstract algebra, and cybersecurity.</p><article><h3>CoffeeHeads</h3><p>A full-stack web application with REST APIs, authentication, PostgreSQL persistence, Redis caching and rate limiting, and integration testing.</p></article><article><h3>Cloud microphysics modeling</h3><p>Numerical modeling connecting turbulence fields and particle-based cloud microphysics, including droplet growth, numerical stability, and GPU feasibility exploration.</p></article><article><h3>SVD & PCA</h3><p>Exploring image compression and classification through low-rank matrix approximations and dimensionality reduction.</p></article><article><h3>Biomedical machine learning</h3><p>During my internship at UNMC's Wan Lab, I worked on machine learning models, Python data pipelines, architecture investigation, and experimental analysis.</p></article><p class="note">Detailed write-ups and verified project links will be added as this site takes shape.</p>`},
  photos:{label:'People & little moments',title:'The photo album',body:''},
  milestones:{label:'Along the way',title:'Pages on the calendar',body:`<h3>University of Wisconsin–Madison</h3><p>I recently graduated with a bachelor's degree, double majoring in Computer Science and Mathematics.</p><h3>UNMC · Wan Lab</h3><p>A machine learning engineering internship exploring biomedical datasets and research questions.</p><p class="note">A fuller timeline will follow once I've selected the milestones and checked the dates.</p>`},
  tennis:{label:'Away from the keyboard',title:'On the court',body:`<p>I like playing tennis. The rackets and basket are a little reminder that there is life beyond a notebook or screen.</p><p class="note">Court photos and personal stories will go here once I've chosen them.</p>`},
  cats:{label:'The actual residents',title:'Viola & Java',body:`<h3>Viola</h3><p>The older, brave, quieter one. A black-and-white cat who heads outside and returns with confidence.</p><h3>Java</h3><p>The younger orange tabby. She might spend a long time at the window watching Viola outside, but she especially loves to play. Really loves to play.</p><p class="note">They follow their own little routines. Use Pause cats in the room whenever you prefer a quieter visit.</p>`}
};
const dialog=document.querySelector('#detail');
let origin=null;
let entryRequest = 0;
async function openEntry(key, trigger) {
  const entry = entries[key];
  if (!entry) return;
  const request = ++entryRequest;
  window.siliAlbum.destroy();
  window.siliPiano.detach();
  const returnFocus = trigger.closest('#destinations') ? explore : trigger;
  if (!dialog.open) origin = returnFocus;
  destinations.hidden = true;
  explore.setAttribute('aria-expanded', 'false');
  if (key === 'photos') {
    if (dialog.open) {
      await new Promise(resolve => {
        dialog.addEventListener('close', resolve, { once: true });
        dialog.close();
      });
      if (request !== entryRequest) return;
    }
    origin = returnFocus;
    returnFocus.focus();
    const pickedUp = await window.siliActions.select(key);
    if (!pickedUp || request !== entryRequest) return;
  } else window.siliActions.select(key, { cat: trigger.dataset.cat });
  dialog.classList.toggle('album-view', key === 'photos');
  dialog.dataset.entry = key;
  document.querySelector('#detail-label').textContent = entry.label;
  document.querySelector('#detail-title').textContent = entry.title;
  const body = document.querySelector('#detail-body');
  body.innerHTML = entry.body;
  if (key === 'photos') window.siliAlbum.mount(body, trigger.dataset.albumFirst === 'true');
  if (key === 'music') {
    body.querySelector('.note').textContent = window.siliPiano.hasRecording ? 'Choose a recording below. Selecting a piece starts it from the beginning.' : 'Sili is playing silently. A personal recording will be added later.';
    const stop = document.createElement('button');
    stop.className = 'inline-link';
    stop.textContent = 'Stop playing';
    stop.addEventListener('click', () => window.siliPiano.stop());
    window.siliPiano.attach(body);
    body.append(stop);
  }
  if (!dialog.open) dialog.showModal();
  window.siliPiano.refresh?.();
  dialog.scrollTop = 0;
  destinations.hidden = true;
  explore.setAttribute('aria-expanded', 'false');
}
// Dialogs also carry data-entry for presentation; only buttons navigate.
document.addEventListener('click',event=>{const trigger=event.target.closest('button[data-entry]');if(trigger)openEntry(trigger.dataset.entry,trigger);});
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(dialog.classList.contains('album-view')){if(!event.target.closest('.album-stage')&&!event.target.closest('.close')&&!event.target.closest('.music-browse-controls'))dialog.close();return;}if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>{window.siliAlbum.destroy();window.siliPiano.detach();window.siliActions.closeAlbum();origin?.focus();});
const destinations=document.querySelector('#destinations');
for(const [key,entry] of Object.entries(entries)){const button=document.createElement('button');button.dataset.entry=key;button.textContent=entry.title;destinations.append(button);}
const explore=document.querySelector('#explore');
explore.addEventListener('click',()=>{destinations.hidden=!destinations.hidden;explore.setAttribute('aria-expanded',String(!destinations.hidden));if(!destinations.hidden)destinations.querySelector('button').focus();});
function closeDestinations(returnFocus = false) {
  destinations.hidden = true;
  explore.setAttribute('aria-expanded', 'false');
  if (returnFocus) explore.focus();
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !destinations.hidden) {
    event.preventDefault();
    closeDestinations(true);
  }
});
document.addEventListener('click', event => {
  if (!destinations.hidden && !event.target.closest('#destinations') && !event.target.closest('#explore')) closeDestinations();
});
document.addEventListener('focusin', event => {
  if (!destinations.hidden && !event.target.closest('#destinations') && !event.target.closest('#explore')) closeDestinations();
});

const fullscreen=document.querySelector('#fullscreen');
const screenStatus=document.querySelector('#screen-status');
const screenRoot=document.documentElement || {};
const requestScreen=screenRoot.requestFullscreen || screenRoot.webkitRequestFullscreen;
const exitScreen=document.exitFullscreen || document.webkitExitFullscreen;
const activeScreen=()=>document.fullscreenElement || document.webkitFullscreenElement;
const screenEnabled=document.fullscreenEnabled ?? document.webkitFullscreenEnabled;
if(screenEnabled && requestScreen && exitScreen){
  fullscreen.hidden=false;
  fullscreen.addEventListener('click',async()=>{
    fullscreen.disabled=true;
    try{
      if(activeScreen())await exitScreen.call(document);
      else await requestScreen.call(screenRoot);
      screenStatus.textContent='';
    }catch(error){
      screenStatus.textContent='Fullscreen is unavailable in this browser view. Try opening the page in a separate browser window.';
      fullscreen.title=screenStatus.textContent;
    }finally{fullscreen.disabled=false;}
  });
  const updateScreen=()=>{
    const active=Boolean(activeScreen());
    fullscreen.setAttribute('aria-pressed',String(active));
    fullscreen.setAttribute('aria-label',active?'Exit fullscreen':'Enter fullscreen');
    fullscreen.querySelector('.fullscreen-label').textContent=active?'Exit fullscreen':'Fullscreen';
    fullscreen.title=active?'Exit fullscreen (Esc)':'Enter fullscreen';
  };
  document.addEventListener('fullscreenchange',updateScreen);
  document.addEventListener('webkitfullscreenchange',updateScreen);
}
