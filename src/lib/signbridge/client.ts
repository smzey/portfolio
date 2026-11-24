import type { Prediction } from './cnn';

export type TimedPrediction = Prediction & { ms: number };

export interface SignBridgeClient {
  load(): Promise<void>;
  predict(input: Float32Array): Promise<TimedPrediction>;
  dispose(): void;
}

type OutMsg =
  | { type: 'ready'; encoding: string }
  | ({ type: 'result'; id: number } & TimedPrediction)
  | { type: 'error'; id?: number; message: string };

export function createSignBridgeClient(): SignBridgeClient {
  const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
  const pending = new Map<number, { resolve: (p: TimedPrediction) => void; reject: (e: Error) => void }>();
  let loadWaiter: { resolve: () => void; reject: (e: Error) => void } | null = null;
  let nextId = 1;

  worker.onmessage = (e: MessageEvent<OutMsg>) => {
    const m = e.data;
    if (m.type === 'ready') {
      loadWaiter?.resolve();
      loadWaiter = null;
    } else if (m.type === 'result') {
      const { type: _t, id, ...pred } = m;
      pending.get(id)?.resolve(pred);
      pending.delete(id);
    } else if (m.id !== undefined) {
      pending.get(m.id)?.reject(new Error(m.message));
      pending.delete(m.id);
    } else {
      loadWaiter?.reject(new Error(m.message));
      loadWaiter = null;
    }
  };
  worker.onerror = (e) => {
    loadWaiter?.reject(new Error(e.message || 'worker error'));
    loadWaiter = null;
  };

  return {
    load: () =>
      new Promise<void>((resolve, reject) => {
        loadWaiter = { resolve, reject };
        worker.postMessage({ type: 'load' });
      }),
    predict: (input) =>
      new Promise<TimedPrediction>((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        worker.postMessage({ type: 'predict', id, input });
      }),
    dispose: () => {
      worker.terminate();
      for (const p of pending.values()) p.reject(new Error('disposed'));
      pending.clear();
    },
  };
}
