// Simulates bubbling through the real app handlers, including a queued close event.
// This catches accidental navigation from dialog[data-entry], not browser layout.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const pending=[];
class Element {
  constructor(tag='div',id='') {
    this.tagName=tag.toUpperCase();this.id=id;this.dataset={};this.events={};this.children=[];this.open=false;
    const classes=new Set();
    this.classList={contains:n=>classes.has(n),toggle(n,on){if(on)classes.add(n);else classes.delete(n);}};
  }
  addEventListener(name,fn,options={}){(this.events[name] ||= []).push({fn,once:options.once});}
  emit(name,event){for(const listener of [...(this.events[name]||[])]){listener.fn(event);if(listener.once)this.events[name]=this.events[name].filter(l=>l!==listener);}}
  setAttribute(){}
  append(child){child.parent=this;this.children.push(child);}
  focus(){focused=this;}
  closest(selector){
    for(let el=this;el;el=el.parent){
      if(selector==='[data-entry]' && el.dataset.entry)return el;
      if(selector==='button[data-entry]' && el.tagName==='BUTTON' && el.dataset.entry)return el;
      if(selector==='#destinations' && el.id==='destinations')return el;
      if(selector==='#explore' && el.id==='explore')return el;
      if(selector==='.close' && el===close)return el;
      if(selector==='.album-stage' && el.className==='album-stage')return el;
      if(selector==='.music-browse-controls' && el.className==='music-browse-controls')return el;
    }return null;
  }
  querySelector(selector){if(selector==='.note')return note;if(selector==='button')return this.children.find(c=>c.tagName==='BUTTON');return null;}
  showModal(){this.open=true;}
  close(){if(!this.open)return;this.open=false;pending.push(()=>this.emit('close',{}));}
  getBoundingClientRect(){return {left:100,right:500,top:100,bottom:500};}
}
let focused;
const dialog=new Element('dialog','detail');
const close=new Element('button');dialog.append(close);
const body=new Element('div','detail-body');dialog.append(body);
const text=new Element('p');body.append(text);
const closeGlyph=new Element('span');close.append(closeGlyph);
const note=new Element('p');
const destinations=new Element('nav','destinations');
const explore=new Element('button','explore');
const nodes={'#detail':dialog,'.close':close,'#detail-body':body,'#destinations':destinations,'#explore':explore,
 '#detail-label':new Element(),'#detail-title':new Element(),'#fullscreen':new Element('button'),'#screen-status':new Element()};
const document={events:{},fullscreenEnabled:false,querySelector:s=>nodes[s],createElement:tag=>new Element(tag),
 addEventListener(name,fn){(this.events[name] ||= []).push(fn);}};
let selections=0,albumReturns=0,lastSelection;
const window={siliAlbum:{destroy(){},mount(){}},siliPiano:{detach(){},attach(){},stop(){},hasRecording:false},
 siliActions:{select(key,options){selections++;lastSelection={key,options};return Promise.resolve(true);},closeAlbum(){albumReturns++;}}};
vm.runInNewContext(fs.readFileSync('app.js','utf8'),{document,window,console});
async function click(target,coordinates={clientX:200,clientY:200}){
 const event={target,...coordinates};
 for(let el=target;el;el=el.parent)el.emit('click',event);
 for(const listener of document.events.click||[])listener(event);
 while(pending.length)pending.shift()();
 await Promise.resolve();await Promise.resolve();
}
function trigger(key){const el=new Element('button');el.dataset.entry=key;return el;}
(async()=>{
 for(const key of ['coffee','notebook','music','milestones','tennis','cats','photos']){
   text.className=key==='photos'?'album-stage':'';
   const origin=trigger(key);await click(origin);assert.equal(dialog.open,true,key+' opens');
   const visits=selections;await click(text);
   assert.equal(dialog.open,true,'reading content keeps the current dialog open');
   assert.equal(selections,visits,'content must not restart its own activity');
   await click(closeGlyph);
   assert.equal(dialog.open,false,key+' closes without reopening');
   assert.equal(selections,visits,'close click must not navigate');
   assert.equal(focused,origin,'focus returns to originating control');
 }
 await click(trigger('coffee'));
 const inline=trigger('notebook');body.append(inline);const before=selections;await click(inline);
 assert.equal(dialog.dataset.entry,'notebook');assert.equal(selections,before+1,'explicit inline button still navigates');
 await click(dialog,{clientX:10,clientY:10});assert.equal(dialog.open,false,'outside dismissal stays closed');
 await click(trigger('photos'));await click(dialog,{clientX:10,clientY:10});assert.equal(dialog.open,false,'album outside dismissal stays closed');
 const musicControls=new Element();musicControls.className='music-browse-controls';dialog.append(musicControls);
 const mute=new Element('button');musicControls.append(mute);
 await click(trigger('photos'));const albumVisits=selections;
 await click(mute);assert.equal(dialog.open,true,'album music controls do not dismiss the album');
 assert.equal(selections,albumVisits,'mute does not navigate or restart a journey');
 const musicList=trigger('music');musicControls.append(musicList);await click(musicList);
 assert.equal(dialog.dataset.entry,'music','music list remains reachable from the album');
 await click(close);
 for(const name of ['viola','java']){
   const cat=trigger('cats');cat.dataset.cat=name;
   const sprite=new Element('span');cat.append(sprite);
   await click(sprite);
   assert.equal(dialog.dataset.entry,'cats','clicking either sprite opens resident content');
   assert.equal(lastSelection.options.cat,name,'clicked identity reaches the journey controller');
   await click(close);assert.equal(focused,cat,'closing returns focus to the moving cat button');
 }
 await click(explore);assert.equal(destinations.hidden,false,'Explore opens');
 await click(destinations.children[0]);assert.equal(dialog.open,true,'Explore destination opens content');
 await click(close);assert.equal(focused,explore,'Explore destination restores focus to menu toggle');
 await click(explore);
 let prevented=false;
 for(const listener of document.events.keydown||[])listener({key:'Escape',preventDefault(){prevented=true;}});
 assert.equal(destinations.hidden,true,'Escape dismisses Explore');assert.equal(focused,explore);assert.equal(prevented,true);
 await click(explore);await click(explore);assert.equal(destinations.hidden,true,'toggle still closes Explore');
 await click(explore);await click(nodes['#fullscreen']);assert.equal(destinations.hidden,true,'outside click dismisses Explore');
 await click(explore);
 for(const listener of document.events.focusin||[])listener({target:destinations.children[1]});
 assert.equal(destinations.hidden,false,'focus within destinations keeps Explore open');
 nodes['#fullscreen'].focus();
 for(const listener of document.events.focusin||[])listener({target:nodes['#fullscreen']});
 assert.equal(destinations.hidden,true,'tabbing away dismisses Explore');assert.equal(focused,nodes['#fullscreen'],'outside dismissal preserves new focus');
 console.log('PASS: close buttons on all seven entries, nested close glyph, content clicks, inline navigation, outside dismissal, focus restoration.');
})();
