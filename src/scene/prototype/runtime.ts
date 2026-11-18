import { Application, Assets, Container, Rectangle, Sprite, Texture } from 'pixi.js';
import { createActor } from 'xstate';
import { advance, journey, journeyMachine, WORLD, type Journey, type Point } from './model';
import { findObjectAsset, findActorAsset } from '../assets/objectAssets.js';
import { catSurfaces } from '../../data/catSurfaces.js';

export type Runtime = { select(point: Point): void; jump(): void; cancel(): void; pause(value: boolean): void; destroy(): void };
export async function createPrototypeRuntime(host: HTMLElement, signal: AbortSignal, report: (state: string) => void): Promise<Runtime | null> {
  const app = new Application();
  await app.init({ width: WORLD.width, height: WORLD.height, preference: 'webgl',
    backgroundAlpha: 0, antialias: true, autoStart: false, sharedTicker: false,
    resolution: Math.min(devicePixelRatio || 1, 2), autoDensity: true });
  if (signal.aborted) { app.destroy(true); return null; }
  // Assets owns cached source textures. Frame views are owned by this runtime.
  let textures: Texture[];
  try { textures = await Promise.all([findActorAsset('sili-standing')!.file, findActorAsset('sili-walking')!.file, findActorAsset('java')!.file].map(url => Assets.load<Texture>(url))); }
  catch (error) { app.destroy(true); throw error; }
  if (signal.aborted) { app.destroy(true); return null; }
  const sofa=findObjectAsset('sofa--sofa-body');
  if(!sofa){app.destroy(true);throw Error('Missing sofa asset');}
  let foregroundTexture: Texture;
  try { foregroundTexture=await Assets.load<Texture>(sofa.file); }
  catch(error){app.destroy(true);throw error;}
  if(signal.aborted){app.destroy(true);return null;}
  const foreground = new Sprite(foregroundTexture);
  foreground.position.set(sofa.bounds.x,sofa.bounds.y);foreground.zIndex=90.5;
  app.stage.addChild(foreground);
  const frames: Texture[] = [];
  function cell(source: Texture, x: number, y: number, width: number, height: number) {
    const texture = new Texture({ source: source.source, frame: new Rectangle(x, y, width, height) });
    frames.push(texture); return texture;
  }
  const [standing, walking, cats] = textures;
  const idle = cell(standing, 0, 0, standing.width / 4, standing.height);
  const steps = Array.from({ length: 6 }, (_, i) => cell(walking, i % 3 * 512, Math.floor(i / 3) * 512, 512, 512));
  const catFrames = [0, 5].map(i => cell(cats, i * cats.width / 6, 0, cats.width / 6, cats.height));
  const person = new Container();
  const pose = new Sprite(idle); person.addChild(pose);
  const cat = new Sprite(catFrames[0]);
  app.stage.sortableChildren = true; app.stage.addChild(person, cat);
  app.canvas.setAttribute('aria-hidden', 'true'); host.append(app.canvas);
  const actor = createActor(journeyMachine).start();
  const subscription = actor.subscribe(value => report(String(value.value)));
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let disposed = false, paused = false, requestId = 0, walkingDistance = 0, routeStartDistance = 0;
  let position: Point = { x: 48.5, y: 84 }, current: Journey | null = null;
  let catPosition = { x: 49, y: 86, width: 14 }, hop: { elapsed: number; from: typeof catPosition; to: typeof catPosition; duration: number } | null = null;
  let perched = false, facing = 1;
  function render(draw = true) {
    host.dataset.personX = String(position.x); host.dataset.personY = String(position.y);
    host.dataset.catY = String(catPosition.y); host.dataset.jumping = String(Boolean(hop));
    const foreground = Math.max(0, Math.min(1, (position.y - 84) / 10));
    const tableLane = Math.max(0, Math.min(1, (position.x - 35) / 8, (69 - position.x) / 8));
    const height = WORLD.height * .58 * (1 + .18 * foreground * tableLane);
    const frame = Math.floor(walkingDistance / 12 * 6) % 6;
    person.position.set(position.x / 100 * WORLD.width, position.y / 100 * WORLD.height);
    person.scale.x = facing;
    if (current && !motion.matches) {
      pose.texture = steps[frame]; pose.width = height * .96; pose.height = height * .96;
      // Match the CSS square surface, bottom-origin scale and per-frame sole offsets.
      const offsets = [-.038125, -.04, -.038125, -.030625, -.02875, -.034375];
      pose.position.set(-pose.width / 2, -height * .9 + height * (offsets[frame] + .04));
    } else {
      pose.texture = idle; pose.height = height; pose.width = height * 543 / 724;
      pose.position.set(-pose.width / 2, -height * .9);
    }
    const t = hop ? hop.elapsed / hop.duration : 0;
    const arc = hop ? Math.sin(t * Math.PI) * Math.min(6, Math.max(2, Math.hypot(hop.to.x-hop.from.x, hop.to.y-hop.from.y)*.16)) : 0;
    cat.texture = catFrames[hop ? 1 : 0];
    cat.width = cat.height = catPosition.width / 100 * WORLD.width;
    cat.position.set(catPosition.x / 100 * WORLD.width - cat.width / 2,
      (catPosition.y - arc) / 100 * WORLD.height - cat.height * .88);
    // Supported depth never includes the visual jump arc.
    person.zIndex = position.y; cat.zIndex = catPosition.y;
    if (draw) app.render();
  }
  function syncClock() {
    if (!disposed && !paused && !document.hidden && !motion.matches && (current || hop)) app.start();
    else app.stop();
  }
  function finishMotion() {
    if (current) { position = { ...current.to }; actor.send({ type: 'ARRIVED', id: current.id }); current = null; }
    if (hop) { catPosition = { ...hop.to }; hop = null; }
  }
  app.ticker.add(ticker => {
    const dt = Math.min(ticker.deltaMS / 1000, .05);
    if (current) {
      const value = advance(current, dt); position = { x: value.x, y: value.y };
      walkingDistance = routeStartDistance + value.distance;
      if (value.done) { actor.send({ type: 'ARRIVED', id: current.id }); current = null; }
    }
    if (hop) {
      hop.elapsed = Math.min(hop.duration, hop.elapsed + dt);
      const progress = hop.elapsed / hop.duration;
      const t = progress * progress * (3 - 2 * progress);
      catPosition = { x: hop.from.x + (hop.to.x-hop.from.x)*t, y: hop.from.y + (hop.to.y-hop.from.y)*t,
        width: hop.from.width + (hop.to.width-hop.from.width)*t };
      if (t === 1) hop = null;
    }
    render(false); syncClock();
  });
  const visibility = () => { app.ticker.lastTime = performance.now(); syncClock(); };
  const reduced = () => { if (motion.matches) finishMotion(); render(); syncClock(); };
  document.addEventListener('visibilitychange', visibility); motion.addEventListener('change', reduced);
  render();
  return {
    select(to) {
      if (disposed) return;
      facing = to.x < position.x ? -1 : 1;
      current = journey(++requestId, position, to); routeStartDistance = walkingDistance;
      actor.send({ type: 'SELECT', id: requestId });
      if (motion.matches) finishMotion(); render(); syncClock();
    },
    jump() {
      if (disposed || hop) return;
      perched = !perched;
      const to = perched ? { ...catSurfaces['coffee-table'] } : { x: 49, y: 86, width: 14 };
      hop = { elapsed: 0, from: { ...catPosition }, to, duration: Math.min(1.65, Math.max(.65, Math.hypot(to.x-catPosition.x,to.y-catPosition.y)/20)) };
      if (motion.matches) finishMotion(); render(); syncClock();
    },
    cancel() { if (disposed) return; current = null; actor.send({ type: 'CANCEL' }); render(); syncClock(); },
    pause(value) { paused = value; syncClock(); },
    destroy() {
      if (disposed) return; disposed = true;
      document.removeEventListener('visibilitychange', visibility); motion.removeEventListener('change', reduced);
      subscription.unsubscribe(); actor.stop(); app.stop(); app.destroy(true, { children: true });
      frames.forEach(texture => texture.destroy(false));
    },
  };
}
