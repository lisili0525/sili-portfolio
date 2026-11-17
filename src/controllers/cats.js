import { paceRoaming, roamingRates } from '../data/catBehavior.js';
import { canReachCat } from '../data/catInteraction.js';
import { catSurfaces, catExcursions } from '../data/catSurfaces.js';

export function createCatController(root) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const dialog = root.querySelector('#detail');
  const room = root.querySelector('.room');
  const actor = root.querySelector('#sili');
  const random = (min,max) => min+Math.random()*(max-min);
  const rest = (pose,min,max=min,extra={}) => ({pose,duration:random(min,max),...extra});
  const floorSpot = () => ({x:random(30,70),y:random(84,88),width:14,floor:true});
  const shuffled = values => {
    const result=[...values];
    for(let i=result.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [result[i],result[j]]=[result[j],result[i]]; }
    return result;
  };
  const first=floorSpot();
  const second={...floorSpot(),x:first.x<50 ? random(first.x+16,74) : random(27,first.x-16)};
  const reservations=new Map();
  const cats=['viola','java'].map((name,index)=>({
    name,layer:root.querySelector(`#${name}`),el:root.querySelector(`#${name} .cat`),
    ...(index ? second : first),home:index ? second : first,
    surface:'floor',facing:Math.random()<.5 ? -1 : 1,
    queue:[],action:null,elapsed:0,outside:false,delay:random(3,8)/roamingRates[name],
    tour:shuffled(Object.keys(catExcursions)),trips:0,windowTripDue:false,groups:[],interaction:null,clicks:0,departing:false
  }));
  function release(cat) {
    for(const group of cat.groups) if(reservations.get(group)===cat.name) reservations.delete(group);
    cat.groups=[];
  }
  function groupsFor(route) {
    return [...new Set(route.map(id=>catSurfaces[id].group).filter(Boolean))];
  }
  function usable(route,cat) {
    const groups=groupsFor(route);
    if(groups.some(group=>reservations.has(group)&&reservations.get(group)!==cat.name)) return false;
    if(groups.includes('window')&&(room?.dataset.windowOpen==='false'||room?.dataset.curtainsOpen==='false')) return false;
    if(groups.includes('piano')&&(actor?.classList.contains('at-piano')||room?.dataset.activity==='music')) return false;
    if(groups.includes('workstation')&&room?.dataset.activity==='notebook') return false;
    if(groups.includes('counter')&&room?.dataset.activity==='coffee') return false;
    if(groups.includes('table')&&(room?.classList.contains('album-lifted')||room?.classList.contains('near-album'))) return false;
    return true;
  }
  function travel(id,from) {
    const target=catSurfaces[id];
    const walking=target.floor&&from.floor;
    const distance=Math.hypot(target.x-from.x,target.y-from.y);
    return {...target,surface:target.floor?'floor':id,pose:walking?'walk':'hop',
      duration:walking?Math.max(.8,distance/12):Math.min(1.65,Math.max(.65,distance/20)),
      arc:walking?0:Math.min(6,Math.max(2,distance*.16))};
  }
  function excursion(cat,target,outside=false) {
    const route=catExcursions[target];
    const groups=groupsFor(route);
    groups.forEach(group=>reservations.set(group,cat.name)); cat.groups=groups;
    const actions=[rest('sit',2,5)];
    let from={x:cat.x,y:cat.y,width:cat.width,floor:true};
    for(const id of route) {
      actions.push(travel(id,from));
      if(!catSurfaces[id].floor&&id!==target) actions.push(rest('sit',.5,1.2));
      from=catSurfaces[id];
    }
    if(outside) {
      actions.push(rest('sit',5,10),{x:69,y:18,width:9.5,surface:'outside',pose:'hop',duration:1.6,arc:0,portal:true},
        rest('sleep',20,35,{outside:true}),
        {...travel('window',{x:69,y:18,width:9.5,floor:false}),portal:true},rest('sit',4,8));
      cat.windowTripDue=false;
    } else {
      const pose=target==='window'&&cat.name==='java' ? 'watch' : Math.random()<.4?'sleep':'sit';
      actions.push(rest(pose,10,20),rest('groom',3,6));
    }
    for(const id of [...route].reverse().slice(1)) {
      actions.push(travel(id,from)); from=catSurfaces[id];
    }
    const spot=floorSpot();
    actions.push({...spot,surface:'floor',pose:'walk',duration:Math.max(1,Math.abs(spot.x-from.x)/12),arc:0,end:()=>release(cat)},
      rest('sit',3,8));
    cat.route=route;
    cat.trips++;
    if(cat.name==='viola'&&cat.trips%6===0) cat.windowTripDue=true;
    return paceRoaming(actions,roamingRates[cat.name]);
  }
  function plan(cat) {
    if(cat.windowTripDue&&usable(catExcursions.window,cat)) return excursion(cat,'window',true);
    for(let i=0;i<cat.tour.length;i++) {
      const target=cat.tour.shift();
      if(usable(catExcursions[target],cat)) {
        // A shuffled tour visits every destination before starting a new tour.
        if(!cat.tour.length) cat.tour=shuffled(Object.keys(catExcursions));
        return excursion(cat,target);
      }
      cat.tour.push(target);
    }
    // Keep exploring available furniture even if a person occupies one stop.
    const deferred=new Set(cat.tour);
    cat.tour.push(...shuffled(Object.keys(catExcursions).filter(id=>!deferred.has(id))));
    return [rest('sit',2/roamingRates[cat.name],4/roamingRates[cat.name])];
  }
  function clearForPerson(cat) {
    if(cat.outside||cat.evacuating||!cat.groups.length||usable(cat.route,cat)) return;
    if(cat.interaction){cat.interaction.phase='cancelled';cat.interaction=null;cat.el.dataset.interaction='';}
    // Finish an in-flight hop, then leap down to clear the person's activity.
    cat.evacuating=true;
    if(cat.action?.x===undefined) cat.action=null;
    const spot=cat.home;
    cat.queue=[{...spot,surface:'floor',pose:'hop',duration:1.3,arc:5,end:()=>{
      release(cat);cat.evacuating=false;
    }}];
  }
  function start(cat) {
    if(!cat.queue.length) cat.queue=plan(cat);
    cat.action=cat.queue.shift(); cat.elapsed=0;
    cat.fromX=cat.x;cat.fromY=cat.y;cat.fromWidth=cat.width;cat.fromDepthY=cat.depthY??cat.y;
    const action=cat.action;
    cat.outside=Boolean(action.outside);
    cat.layer.hidden=cat.outside;
    cat.layer.classList.toggle('at-window',Boolean(action.portal));
    if(action.x!==undefined) cat.facing=action.x<cat.x?-1:1;
    cat.el.dataset.pose=action.pose;
    cat.layer.dataset.destination=action.surface||cat.surface;
  }
  function paintDepth(cat) {
    // Keep the existing person/foreground passes: rear residents share the
    // person's plane but precede it in DOM order; nearer residents sit above it.
    // Use the supported foot position, not the visual height of a jumping cat.
    const actorDepth=Number(actor?.dataset.depthY ?? 84);
    const depth=cat.depthY??cat.y;
    const inFront=depth>=actorDepth;
    cat.layer.style.zIndex=inFront?'3':'1';
    cat.layer.dataset.depth=inFront?'front':'behind';
  }
  function paint(cat) {
    paintDepth(cat);
    cat.layer.classList.toggle('perched',cat.surface!=='floor'&&cat.surface!=='outside');
    cat.layer.dataset.surface=cat.surface;
    cat.el.style.left=`${cat.x}%`;cat.el.style.top=`${cat.y}%`;cat.el.style.width=`${cat.width}%`;
    cat.el.style.setProperty('--facing',cat.facing===-1?1:-1);
  }
  function tick(cat,dt) {
    if(cat.delay>0) {cat.delay-=dt;return;}
    if(!cat.action) start(cat);
    const action=cat.action;
    cat.elapsed=Math.min(action.duration,cat.elapsed+dt);
    const progress=cat.elapsed/action.duration;
    if(action.x!==undefined) {
      const eased=action.pose==='hop'?progress*progress*(3-2*progress):progress;
      cat.x=cat.fromX+(action.x-cat.fromX)*eased;
      cat.depthY=cat.fromDepthY+(action.y-cat.fromDepthY)*eased;
      cat.y=cat.fromY+(action.y-cat.fromY)*eased-Math.sin(progress*Math.PI)*action.arc;
      cat.width=cat.fromWidth+(action.width-cat.fromWidth)*eased;
      cat.el.dataset.airborne=String(action.pose==='hop'&&progress<1);
      if(action.pose==='walk') cat.el.style.setProperty('--frame',Math.floor(cat.elapsed*6)%2+1);
      if(progress===1) cat.surface=action.surface;
    }
    paint(cat);
    if(progress===1) {action.end?.();cat.action=null;}
  }

  let interactionId=0;
  function facePerson(cat,actorX) {
    cat.facing=actorX<cat.x?-1:1;
    cat.el.dataset.pose='sit';paint(cat);
  }
  function descent(cat,complete) {
    const route=cat.route||[];
    const index=route.indexOf(cat.surface);
    const actions=[];
    let from={x:cat.x,y:cat.y,width:cat.width,floor:cat.surface==='floor'};
    if(index>0) for(const id of route.slice(0,index).reverse()) {
      actions.push(travel(id,from));from=catSurfaces[id];
    }
    if(!from.floor) {
      const spot=cat.home;
      actions.push({...spot,surface:'floor',pose:'hop',duration:1.2,arc:4});
    }
    actions.push({pose:'sit',duration:.4,end:()=>{release(cat);complete?.();}});
    return actions;
  }
  function releaseInteraction(cat,session,immediate=false) {
    if(cat.interaction!==session) return;
    session.elapsed=0;
    if(immediate){session.phase='cancelled';cat.interaction=null;cat.el.dataset.interaction='';return;}
    if(cat.action?.x!==undefined){session.phase='cancel-landing';return;}
    if(session.mode==='play'&&session.anchor&&Math.hypot(cat.x-session.anchor.x,cat.y-session.anchor.y)>.05){
      session.phase='settle-play';session.settleFrom={x:cat.x,y:cat.y};return;
    }
    session.phase='farewell';cat.el.dataset.interaction='farewell';cat.el.dataset.pose='sit';
    cat.facing=cat.x<50?1:-1;paint(cat);
  }
  function depart(cat,session) {
    session.phase='departed';cat.interaction=null;cat.action=null;cat.departing=true;
    cat.el.dataset.interaction='leaving';
    const finish=()=>{release(cat);cat.departing=false;cat.el.dataset.interaction='';};
    if(motion.matches){finish();return;}
    if(cat.surface!=='floor') cat.queue=descent(cat,finish);
    else {
      release(cat);
      const direction=cat.facing;
      cat.queue=[{x:Math.max(15,Math.min(86,cat.x+direction*5)),y:cat.y,width:cat.width,
        surface:'floor',pose:'walk',duration:1.35,arc:0,end:finish},rest('groom',2,4),rest('sit',2,4)];
    }
  }
  function tickInteraction(cat,dt) {
    const session=cat.interaction;
    if(!session) return;
    session.elapsed+=dt;
    if(session.phase==='cancel-landing'){
      if(cat.action) tick(cat,dt);
      if(!cat.action) releaseInteraction(cat,session);
      return;
    }
    if(session.phase==='settle-play'){
      const progress=Math.min(1,session.elapsed/.35);
      cat.x=session.settleFrom.x+(session.anchor.x-session.settleFrom.x)*progress;
      cat.y=session.settleFrom.y+(session.anchor.y-session.settleFrom.y)*progress;cat.depthY=session.anchor.y;paint(cat);
      if(progress===1) releaseInteraction(cat,session);
      return;
    }
    if(session.phase==='landing') {
      // Finish a jump; a walking cat first decelerates to its next safe step.
      if(cat.action) tick(cat,dt);
      if(cat.action) return;
      const needsFloor=!canReachCat(cat)||(session.mode==='play'&&cat.surface!=='floor');
      if(needsFloor&&!motion.matches) {
        session.phase='inviting';session.elapsed=0;
        cat.queue=descent(cat,()=>{session.phase='attention';session.elapsed=0;facePerson(cat,session.actorX);});
        cat.el.dataset.interaction='invited';
      } else {session.phase='attention';session.elapsed=0;facePerson(cat,session.actorX);}
      return;
    }
    if(session.phase==='inviting') {tick(cat,dt);return;}
    if(session.phase==='attention') {
      cat.el.dataset.interaction='attention';
      if(session.elapsed >= (session.wasSleeping ? .9 : .55)) {session.phase='ready';session.elapsed=0;}
      return;
    }
    if(session.phase==='ready') {
      // Abandoned approaches cannot reserve a cat forever.
      if(session.elapsed>14) releaseInteraction(cat,session);
      return;
    }
    if(session.phase==='contact') {
      const time=session.elapsed;
      if(session.mode==='play'&&!motion.matches) {
        const progress=Math.max(0,Math.min(1,(time-1.3)/2));
        const bounce=Math.sin(progress*Math.PI*2);
        cat.x=session.anchor.x+(session.actorX<session.anchor.x?-1:1)*Math.sin(progress*Math.PI)*1.8;
        cat.depthY=session.anchor.y;
        cat.y=session.anchor.y-Math.abs(bounce)*1.3;
        cat.el.dataset.pose=time<1.3?'sit':time<3.3?'hop':time<4.5?'groom':'sit';
      } else cat.el.dataset.pose=time>2.5&&time<3.4?'groom':'sit';
      paint(cat);
      if(time>=session.duration) {Object.assign(cat,session.anchor);releaseInteraction(cat,session);}
      return;
    }
    if(session.phase==='farewell'&&session.elapsed>=1.4) depart(cat,session);
  }
  function beginInteraction({name,mode,actor={x:48.5,y:84}}={}) {
    let cat=name?cats.find(cat=>cat.name===name):cats.filter(cat=>!cat.outside&&!cat.layer.hidden&&!cat.action?.portal)
      .sort((a,b)=>Math.hypot(a.x-actor.x,(a.y-actor.y)*.5)-Math.hypot(b.x-actor.x,(b.y-actor.y)*.5))[0];
    if(!cat||cat.outside||cat.layer.hidden||cat.action?.portal||cat.evacuating) return null;
    if(cat.interaction&&['landing','inviting','attention','ready','contact'].includes(cat.interaction.phase)) {
      const session=cat.interaction;
      if(session.phase==='contact'&&session.mode==='pet') session.duration=Math.min(11,Math.max(session.duration,session.elapsed+2));
      return session.handle;
    }
    for(const other of cats) if(other!==cat&&other.interaction) releaseInteraction(other,other.interaction);
    cat.clicks++;
    const session={id:++interactionId,phase:'landing',elapsed:0,mode:mode||(cat.name==='java'&&cat.clicks%2===0?'play':'pet'),
      actorX:actor.x,wasSleeping:cat.el.dataset.pose==='sleep',duration:cat.name==='viola'?6.5:5.8};
    cat.interaction=session;cat.delay=0;cat.queue=[];cat.departing=false;
    cat.el.dataset.interaction='attention';
    if(cat.action?.x!==undefined&&cat.action.pose==='walk') {
      const target=cat.action;
      const distance=Math.hypot(target.x-cat.x,target.y-cat.y)||1;
      const step=Math.min(1.3,distance);
      cat.action={...target,x:cat.x+(target.x-cat.x)/distance*step,y:cat.y+(target.y-cat.y)/distance*step,
        fromX:cat.x,fromY:cat.y,duration:.35,end:undefined};
      cat.fromX=cat.x;cat.fromY=cat.y;cat.fromWidth=cat.width;cat.fromDepthY=cat.depthY??cat.y;cat.elapsed=0;
    } else if(cat.action?.x===undefined) cat.action=null;
    const handle={
      id:session.id,name:cat.name,mode:session.mode,
      snapshot:()=>({name:cat.name,x:cat.x,y:cat.y,width:cat.width,surface:cat.surface,
        phase:session.phase,ready:session.phase==='ready'||session.phase==='contact',outside:cat.outside}),
      contact(actorPosition) {
        if(cat.interaction!==session||session.phase!=='ready') return false;
        session.phase='contact';session.elapsed=0;session.actorX=actorPosition.x;
        session.anchor={x:cat.x,y:cat.y,width:cat.width};
        cat.el.dataset.interaction=session.mode==='play'?'playing':'petting';
        facePerson(cat,actorPosition.x);return true;
      },
      cancel:()=>releaseInteraction(cat,session)
    };
    session.handle=handle;return handle;
  }

  function update() {
    if(!motion.matches) return;
    cats.forEach((cat,index)=>{
      if(cat.interaction){cat.interaction.phase='cancelled';cat.interaction=null;}
      cat.el.dataset.interaction='';cat.departing=false;
      release(cat);cat.queue=[];cat.action=null;cat.outside=false;cat.evacuating=false;
      Object.assign(cat,cat.home,{surface:'floor',depthY:cat.home.y});
      cat.layer.hidden=false;cat.layer.classList.remove('at-window');
      cat.el.dataset.pose=index?'sleep':'sit';cat.el.dataset.airborne='false';paint(cat);
    });
  }
  const abort=new AbortController();
  motion.addEventListener('change',update,{signal:abort.signal});
  let frameId,disposed=false,previous;
  function frame(now) {
    const dt=previous===undefined?0:Math.min((now-previous)/1000,.05);previous=now;
    if(!document.hidden) cats.forEach(cat=>{
      if(cat.outside&&(room?.dataset.windowOpen==='false'||room?.dataset.curtainsOpen==='false')) return;
      clearForPerson(cat);
      if(cat.interaction) {tickInteraction(cat,dt);return;}
      if(!motion.matches&&(!dialog.open||cat.evacuating||cat.departing)) tick(cat,dt);
    });
    // Depth must follow a moving person even while the cat rests or reading pauses it.
    cats.forEach(paintDepth);
    if(!disposed) frameId=requestAnimationFrame(frame);
  }
  cats.forEach(cat=>{cat.el.dataset.pose='sit';paint(cat);});update();
  frameId=requestAnimationFrame(frame);
  return {beginInteraction,destroy(){disposed=true;cancelAnimationFrame(frameId);abort.abort();cats.forEach(cat=>{if(cat.interaction)cat.interaction.phase='cancelled';release(cat);});}};
}
