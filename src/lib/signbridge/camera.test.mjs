import test from 'node:test';
import assert from 'node:assert/strict';
import { cropBox, toModelInput, mapCameraError, attachStream, stopStream } from './camera.ts';

const close = (a, b) => Math.abs(a - b) < 1e-9;

test('cropBox returns a square box around the hand with margin', () => {
  const lm = [
    { x: 0.4, y: 0.3 },
    { x: 0.6, y: 0.7 },
    { x: 0.5, y: 0.5 },
  ];
  const b = cropBox(lm, 0.2);
  assert.ok(close(b.cx, 0.5) && close(b.cy, 0.5) && close(b.half, 0.24), JSON.stringify(b));
});

test('toModelInput converts RGBA to luma and stretches contrast to 0..1', () => {
  const rgba = new Uint8ClampedArray(784 * 4);
  for (let i = 0; i < 784; i++) {
    const v = i === 0 ? 200 : 50;
    rgba.set([v, v, v, 255], i * 4);
  }
  const x = toModelInput(rgba);
  assert.equal(x.length, 784);
  assert.ok(close(x[0], 1) && close(x[1], 0) && close(x[783], 0));
});

test('toModelInput on a uniform image does not divide by zero', () => {
  const rgba = new Uint8ClampedArray(784 * 4).fill(128);
  const x = toModelInput(rgba);
  assert.ok(x.every((v) => v === 0));
});

test('mapCameraError maps permission errors to denied and others to unavailable', () => {
  assert.equal(mapCameraError({ name: 'NotAllowedError' }), 'denied');
  assert.equal(mapCameraError({ name: 'SecurityError' }), 'denied');
  assert.equal(mapCameraError({ name: 'NotFoundError' }), 'unavailable');
  assert.equal(mapCameraError(new Error('boom')), 'unavailable');
  assert.equal(mapCameraError(undefined), 'unavailable');
});

test('attachStream stops all tracks when video element is missing or cancelled', () => {
  const mkStream = () => {
    const stopped = [false, false];
    return {
      stopped,
      getTracks: () => stopped.map((_, i) => ({ stop: () => { stopped[i] = true; } })),
    };
  };

  const s1 = mkStream();
  assert.equal(attachStream(null, s1, false), false);
  assert.deepEqual(s1.stopped, [true, true]);

  const video = { srcObject: null };
  const s2 = mkStream();
  assert.equal(attachStream(video, s2, true), false);
  assert.equal(video.srcObject, null);
  assert.deepEqual(s2.stopped, [true, true]);

  const s3 = mkStream();
  assert.equal(attachStream(video, s3, false), true);
  assert.equal(video.srcObject, s3);
  assert.deepEqual(s3.stopped, [false, false]);

  stopStream(s3);
  assert.deepEqual(s3.stopped, [true, true]);
  assert.doesNotThrow(() => stopStream(null));
});
