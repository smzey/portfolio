import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { decodeModel, predict } from './cnn.ts';

const PUB = new URL('../../../public/signbridge/', import.meta.url);
const meta = JSON.parse(readFileSync(new URL('model.meta.json', PUB)));
const bin = readFileSync(new URL('model.bin', PUB));
const model = decodeModel(meta, bin.buffer.slice(bin.byteOffset, bin.byteOffset + bin.byteLength));

test('hero-samples.json holds 8 real held-out hands: 6 the model reads correctly, 2 it misses', () => {
  const hero = JSON.parse(readFileSync(new URL('hero-samples.json', PUB)));
  const all = JSON.parse(readFileSync(new URL('samples.json', PUB)));
  assert.equal(hero.length, 8);
  for (const h of hero) assert.ok(all.some((s) => s.label === h.label && s.px.join() === h.px.join()), 'sample must come from samples.json');
  const misses = hero.filter((h) => predict(model, Float32Array.from(h.px, (v) => v / 255)).letter !== h.label);
  assert.equal(misses.length, 2);
});
