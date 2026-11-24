import test from 'node:test';
import assert from 'node:assert/strict';
import { createSignBridgeClient, withTimeout } from './client.ts';

class SilentWorker {
  onmessage = null;
  onerror = null;
  postMessage() {}
  terminate() { this.terminated = true; }
}

test('load() rejects with a timeout when the worker never answers', async () => {
  const w = new SilentWorker();
  const client = createSignBridgeClient({ makeWorker: () => w, loadTimeoutMs: 30 });
  await assert.rejects(client.load(), /timeout/);
});

test('withTimeout resolves fast promises and rejects slow ones', async () => {
  assert.equal(await withTimeout(Promise.resolve(7), 50), 7);
  await assert.rejects(withTimeout(new Promise(() => {}), 20), /timeout/);
});

test('dispose() rejects a pending load() immediately', async () => {
  const w = new SilentWorker();
  const client = createSignBridgeClient({ makeWorker: () => w, loadTimeoutMs: 5000 });
  const loadP = client.load();
  client.dispose();
  assert.equal(w.terminated, true);
  await assert.rejects(loadP, /disposed/);
});

test('worker.onerror after load rejects all pending predictions', async () => {
  const w = new SilentWorker();
  const client = createSignBridgeClient({ makeWorker: () => w, loadTimeoutMs: 500 });
  const loadP = client.load();
  w.onmessage({ data: { type: 'ready', encoding: 'int8' } });
  await loadP;

  const p1 = client.predict(new Float32Array(784));
  const p2 = client.predict(new Float32Array(784));
  w.onerror({ message: 'worker crashed' });

  await assert.rejects(p1, /worker crashed/);
  await assert.rejects(p2, /worker crashed/);
});
