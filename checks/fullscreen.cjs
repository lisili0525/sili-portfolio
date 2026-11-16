// Controlled API checks; these do not replace real-browser fullscreen review.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('app.js', 'utf8').split("const fullscreen=document.querySelector('#fullscreen');")[1];
async function check(prefix, reject = false) {
  const events = {}, clicks = {}, attributes = {}, label = {};
  const button = {hidden:true, addEventListener:(n,f)=>clicks[n]=f,
    setAttribute:(n,v)=>attributes[n]=v, querySelector:()=>label};
  const status = {};
  const root = {};
  const doc = {documentElement:root, querySelector:s=>s==='#fullscreen'?button:status,
    addEventListener:(n,f)=>events[n]=f};
  const enabled = prefix ? 'webkitFullscreenEnabled' : 'fullscreenEnabled';
  const active = prefix ? 'webkitFullscreenElement' : 'fullscreenElement';
  const change = prefix ? 'webkitfullscreenchange' : 'fullscreenchange';
  doc[enabled] = true;
  root[prefix ? 'webkitRequestFullscreen' : 'requestFullscreen'] = async function() {
    assert.equal(this, root);
    if (reject) throw Error('blocked');
    doc[active] = root; events[change]();
  };
  doc[prefix ? 'webkitExitFullscreen' : 'exitFullscreen'] = async function() {
    assert.equal(this, doc); doc[active] = null; events[change]();
  };
  vm.runInNewContext("const fullscreen=document.querySelector('#fullscreen');"+source, {document:doc});
  assert.equal(button.hidden,false);
  await clicks.click();
  assert.equal(button.disabled,false);
  if (reject) { assert.match(status.textContent,/unavailable/); return; }
  assert.equal(attributes['aria-pressed'],'true');
  assert.equal(label.textContent,'Exit fullscreen');
  await clicks.click();
  assert.equal(attributes['aria-pressed'],'false');
  assert.equal(label.textContent,'Fullscreen');
  // Escape/native exit must also update the button.
  await clicks.click(); doc[active]=null; events[change]();
  assert.equal(attributes['aria-pressed'],'false');
}
(async()=>{
  await check(false); await check(true); await check(false,true); await check(true,true);
  const button={hidden:true};
  vm.runInNewContext("const fullscreen=document.querySelector('#fullscreen');"+source,
    {document:{documentElement:{},querySelector:()=>button}});
  assert.equal(button.hidden,true);
  console.log('PASS: standard and WebKit fullscreen entry/exit, native exit, rejection recovery and unsupported browsers.');
})().catch(e=>{console.error(e);process.exitCode=1;});
