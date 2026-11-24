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
