const entries = {
  music:{label:'A few music sheets',title:'At the piano',body:`<p>Music is part of my life, both listening and playing.</p><div class="piece"><strong>Il Porco Rosso</strong><small>Joe Hisaishi · a listening and playing reference</small></div><div class="piece"><strong>Without His Cross</strong><small>Joseph M. Martin · a choral piece I play</small></div><div class="piece"><strong>Étude, Op. 10, No. 3</strong><small>Frédéric Chopin</small></div><p class="note">Perhaps a recording here someday. For now, a few pieces to get to know me through.</p>`},
  coffee:{label:'Coffee, slowly',title:'Something brewing',body:`<p>I enjoy making my own coffee, exploring different beans and brewing techniques, and discovering local coffee shops.</p><h3>From a cup to code</h3><p>CoffeeHeads is also one of my technical projects: a full-stack web application built with Java, Spring Boot, React, PostgreSQL, and Redis.</p><button class="inline-link" data-entry="notebook">Open the technical notebook ↗</button><p class="note">This journal has room for beans, brewing experiments, and café memories as I choose what to share.</p>`},
  notebook:{label:'Questions, experiments & code',title:'Inside my notebook',body:`<p>I'm interested in mathematical modeling, machine learning, abstract algebra, and cybersecurity.</p><article><h3>CoffeeHeads</h3><p>A full-stack web application with REST APIs, authentication, PostgreSQL persistence, Redis caching and rate limiting, and integration testing.</p></article><article><h3>Cloud microphysics modeling</h3><p>Numerical modeling connecting turbulence fields and particle-based cloud microphysics, including droplet growth, numerical stability, and GPU feasibility exploration.</p></article><article><h3>SVD & PCA</h3><p>Exploring image compression and classification through low-rank matrix approximations and dimensionality reduction.</p></article><article><h3>Biomedical machine learning</h3><p>During my internship at UNMC's Wan Lab, I worked on machine learning models, Python data pipelines, architecture investigation, and experimental analysis.</p></article><p class="note">Detailed write-ups and verified project links will be added as this site takes shape.</p>`},
  photos:{label:'People & little moments',title:'A wall of memories',body:`<p>A place for the people and experiences that make life feel like mine.</p><h3>Rachel & me</h3><p>The illustrated portrait on the wall is based on a photo of us together.</p><p class="note">The other pictures in this room are concept illustrations. My personal photo collection and captions are still being selected.</p>`},
  milestones:{label:'Along the way',title:'Pages on the calendar',body:`<h3>University of Wisconsin–Madison</h3><p>I recently graduated with a bachelor's degree, double majoring in Computer Science and Mathematics.</p><h3>UNMC · Wan Lab</h3><p>A machine learning engineering internship exploring biomedical datasets and research questions.</p><p class="note">A fuller timeline will follow once I've selected the milestones and checked the dates.</p>`},
  tennis:{label:'Away from the keyboard',title:'On the court',body:`<p>I like playing tennis. The rackets and basket are a little reminder that there is life beyond a notebook or screen.</p><p class="note">Court photos and personal stories will go here once I've chosen them.</p>`},
  cats:{label:'The actual residents',title:'Viola & Java',body:`<h3>Viola</h3><p>The older, brave, quieter one. A black-and-white cat who heads outside and returns with confidence.</p><h3>Java</h3><p>The younger orange tabby. She might spend a long time at the window watching Viola outside, but she especially loves to play. Really loves to play.</p><p class="note">In this first room study, the cats are part of the illustration. Their independent wandering, playing, and window visits come in the animation phase.</p>`}
};
const dialog=document.querySelector('#detail');
let origin=null;
function openEntry(key,trigger){const entry=entries[key];if(!entry)return;if(!dialog.open)origin=trigger;document.querySelector('#detail-label').textContent=entry.label;document.querySelector('#detail-title').textContent=entry.title;document.querySelector('#detail-body').innerHTML=entry.body;if(!dialog.open)dialog.showModal();dialog.scrollTop=0;}
document.addEventListener('click',event=>{const trigger=event.target.closest('[data-entry]');if(trigger)openEntry(trigger.dataset.entry,trigger);});
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
dialog.addEventListener('close',()=>origin?.focus());
const destinations=document.querySelector('#destinations');
for(const [key,entry] of Object.entries(entries)){const button=document.createElement('button');button.dataset.entry=key;button.textContent=entry.title;destinations.append(button);}
const explore=document.querySelector('#explore');
explore.addEventListener('click',()=>{destinations.hidden=!destinations.hidden;explore.setAttribute('aria-expanded',String(!destinations.hidden));if(!destinations.hidden)destinations.querySelector('button').focus();});

const fullscreen=document.querySelector('#fullscreen');
const screenStatus=document.querySelector('#screen-status');
if(document.fullscreenEnabled && document.documentElement.requestFullscreen){
  fullscreen.hidden=false;
  fullscreen.addEventListener('click',async()=>{
    fullscreen.disabled=true;
    try{
      if(document.fullscreenElement)await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
      screenStatus.textContent='';
    }catch(error){
      screenStatus.textContent='Fullscreen is unavailable in this browser view. Try opening the page in a separate browser window.';
      fullscreen.title=screenStatus.textContent;
    }finally{fullscreen.disabled=false;}
  });
  document.addEventListener('fullscreenchange',()=>{
    const active=Boolean(document.fullscreenElement);
    fullscreen.setAttribute('aria-pressed',String(active));
    fullscreen.setAttribute('aria-label',active?'Exit fullscreen':'Enter fullscreen');
    fullscreen.querySelector('.fullscreen-label').textContent=active?'Exit fullscreen':'Fullscreen';
    fullscreen.title=active?'Exit fullscreen (Esc)':'Enter fullscreen';
  });
}
