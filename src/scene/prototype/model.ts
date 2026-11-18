import { assign, setup } from 'xstate';

export const WORLD = { width: 1672, height: 941 } as const;
export type Point = { x: number; y: number };
export type Journey = { id: number; from: Point; to: Point; elapsed: number; duration: number; distance: number };
export type JourneyEvent = { type: 'SELECT'; id: number } | { type: 'ARRIVED'; id: number } | { type: 'CANCEL' };

// Completion belongs to the current intent. Superseded render work cannot arrive.
export const journeyMachine = setup({
  types: { context: {} as { requestId: number }, events: {} as JourneyEvent },
  actions: { select: assign({ requestId: ({ event }) => event.type === 'SELECT' ? event.id : 0 }) },
  guards: { current: ({ context, event }) => event.type === 'ARRIVED' && event.id === context.requestId },
}).createMachine({
  context: { requestId: 0 }, initial: 'idle',
  on: { SELECT: { target: '.moving', actions: 'select' }, CANCEL: '.idle' },
  states: { idle: {}, moving: { on: { ARRIVED: { target: 'idle', guard: 'current' } } } },
});

export function journey(id: number, from: Point, to: Point): Journey {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  return { id, from: { ...from }, to: { ...to }, elapsed: 0, duration: Math.max(.35, distance / 14), distance };
}
export function advance(value: Journey, seconds: number) {
  value.elapsed = Math.min(value.duration, value.elapsed + Math.max(0, seconds));
  const t = value.elapsed / value.duration;
  return { x: value.from.x + (value.to.x - value.from.x) * t,
    y: value.from.y + (value.to.y - value.from.y) * t, done: t === 1, distance: value.distance * t };
}
export function viewport(width: number, height: number) {
  const scale = Math.min(width / WORLD.width, height / WORLD.height);
  return { scale, x: (width - WORLD.width * scale) / 2, y: (height - WORLD.height * scale) / 2 };
}
