import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { decodeModel, predict } from './cnn.ts';

const PUB = new URL('../../../public/signbridge/', import.meta.url);
const SRC = `${homedir()}/Developer/projects/hackathon_2/public`;

const meta = JSON.parse(readFileSync(new URL('model.meta.json', PUB)));
const bin = readFileSync(new URL('model.bin', PUB));
const model = decodeModel(meta, bin.buffer.slice(bin.byteOffset, bin.byteOffset + bin.byteLength));
const samples = JSON.parse(readFileSync(new URL('samples.json', PUB)));
const toInput = (px) => Float32Array.from(px, (v) => v / 255);

test('packed model matches original top-1 on every sample', { skip: !existsSync(`${SRC}/cnn.js`) && `original not found at ${SRC}` }, async () => {
  const orig = await import(`${SRC}/cnn.js`);
  orig.loadModel(JSON.parse(readFileSync(`${SRC}/model_cnn.json`)));
  for (const [i, s] of samples.entries()) {
    assert.equal(predict(model, toInput(s.px)).letter, orig.predict(toInput(s.px)).letter, `sample ${i} (${s.label})`);
  }
});

test('43 of 48 samples correct; misses are T,K,T,G,U in order', () => {
  const misses = samples.filter((s) => predict(model, toInput(s.px)).letter !== s.label).map((s) => s.label);
  assert.equal(samples.length, 48);
  assert.deepEqual(misses, ['T', 'K', 'T', 'G', 'U']);
});

test('quantized model.bin is at most 1.5 MB', () => {
  if (meta.encoding === 'float32') return;
  assert.ok(statSync(new URL('model.bin', PUB)).size <= 1.5 * 1024 * 1024);
});
