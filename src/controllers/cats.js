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
    queue:[],action:null,elapsed:0,outside:false,delay:random(3,8),
    tour:shuffled(Object.keys(catExcursions)),trips:0,windowTripDue:false,groups:[]
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
    return actions;
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
    return [rest('sit',2,4)];
  }
  function clearForPerson(cat) {
    if(cat.evacuating||!cat.groups.length||usable(cat.route,cat)) return;
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
    cat.fromX=cat.x;cat.fromY=cat.y;cat.fromWidth=cat.width;
    const action=cat.action;
    cat.outside=Boolean(action.outside);
    cat.layer.hidden=cat.outside;
    cat.layer.classList.toggle('at-window',Boolean(action.portal));
    if(action.x!==undefined) cat.facing=action.x<cat.x?-1:1;
    cat.el.dataset.pose=action.pose;
    cat.layer.dataset.destination=action.surface||cat.surface;
  }
  function paint(cat) {
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
      cat.y=cat.fromY+(action.y-cat.fromY)*eased-Math.sin(progress*Math.PI)*action.arc;
      cat.width=cat.fromWidth+(action.width-cat.fromWidth)*eased;
      cat.el.dataset.airborne=String(action.pose==='hop'&&progress<1);
      if(action.pose==='walk') cat.el.style.setProperty('--frame',Math.floor(cat.elapsed*6)%2+1);
      if(progress===1) cat.surface=action.surface;
    }
    paint(cat);
    if(progress===1) {action.end?.();cat.action=null;}
  }
  function update() {
    if(!motion.matches) return;
    cats.forEach((cat,index)=>{
      release(cat);cat.queue=[];cat.action=null;cat.outside=false;cat.evacuating=false;
      Object.assign(cat,cat.home,{surface:'floor'});
      cat.layer.hidden=false;cat.layer.classList.remove('at-window');
      cat.el.dataset.pose=index?'sleep':'sit';cat.el.dataset.airborne='false';paint(cat);
    });
  }
  const abort=new AbortController();
  motion.addEventListener('change',update,{signal:abort.signal});
  let frameId,disposed=false,previous;
  function frame(now) {
    const dt=previous===undefined?0:Math.min((now-previous)/1000,.05);previous=now;
    if(!motion.matches&&!document.hidden) cats.forEach(cat=>{
      clearForPerson(cat);
      if(!dialog.open||cat.evacuating) tick(cat,dt);
    });
    if(!disposed) frameId=requestAnimationFrame(frame);
  }
  cats.forEach(cat=>{cat.el.dataset.pose='sit';paint(cat);});update();
  frameId=requestAnimationFrame(frame);
  return {destroy(){disposed=true;cancelAnimationFrame(frameId);abort.abort();cats.forEach(release);}};
}
