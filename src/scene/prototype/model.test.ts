import { describe, expect, it } from 'vitest';
import { createActor } from 'xstate';
import { advance, journey, journeyMachine, viewport } from './model';

describe('prototype scene contracts', () => {
  it('ignores late completion after replacement and cancellation', () => {
    const actor = createActor(journeyMachine).start();
    actor.send({ type: 'SELECT', id: 1 }); actor.send({ type: 'SELECT', id: 2 });
    actor.send({ type: 'ARRIVED', id: 1 }); expect(actor.getSnapshot().value).toBe('moving');
    actor.send({ type: 'CANCEL' }); actor.send({ type: 'ARRIVED', id: 2 });
    expect(actor.getSnapshot().value).toBe('idle');
    actor.send({ type: 'SELECT', id: 3 }); actor.send({ type: 'ARRIVED', id: 3 });
    expect(actor.getSnapshot().value).toBe('idle'); actor.stop();
  });
  it('preserves accepted speed, exact endpoint and refresh-rate independence', () => {
    for (const hz of [30, 60, 120]) {
      const value = journey(1, { x: 0, y: 0 }, { x: 28, y: 0 });
      let point = advance(value, 0);
      for (let i = 0; i < hz; i++) point = advance(value, 1 / hz);
      expect(point.x).toBeCloseTo(14, 8);
      point = advance(value, 100); expect(point.x).toBe(28); expect(point.done).toBe(true);
    }
  });
  it('fits the same world without clipping or stretching', () => {
    for (const [width, height] of [[390, 844], [844, 390], [1440, 900]]) {
      const fit = viewport(width, height);
      expect(fit.x).toBeGreaterThanOrEqual(0); expect(fit.y).toBeGreaterThanOrEqual(0);
      expect(fit.scale * 1672).toBeLessThanOrEqual(width);
      expect(fit.scale * 941).toBeLessThanOrEqual(height);
    }
  });
});
