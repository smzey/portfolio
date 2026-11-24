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

export const DEFAULT_LOAD_TIMEOUT_MS = 15000;

/** Rejects with Error('timeout') if `p` hasn't settled within `ms`. */
export function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}

type WorkerLike = Pick<Worker, 'postMessage' | 'terminate'> & {
  onmessage: ((e: MessageEvent<OutMsg>) => void) | null;
  onerror: ((e: ErrorEvent) => void) | null;
};

export function createSignBridgeClient({
  makeWorker = () => new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' }) as unknown as WorkerLike,
  loadTimeoutMs = DEFAULT_LOAD_TIMEOUT_MS,
}: { makeWorker?: () => WorkerLike; loadTimeoutMs?: number } = {}): SignBridgeClient {
  const worker = makeWorker();
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
  const failAll = (err: Error) => {
    loadWaiter?.reject(err);
    loadWaiter = null;
    for (const p of pending.values()) p.reject(err);
    pending.clear();
  };

  worker.onerror = (e) => {
    failAll(new Error(e.message || 'worker error'));
  };

  return {
    load: () =>
      withTimeout(
        new Promise<void>((resolve, reject) => {
          loadWaiter = { resolve, reject };
          worker.postMessage({ type: 'load' });
        }),
        loadTimeoutMs,
      ).catch((e: unknown) => {
        loadWaiter = null;
        throw e;
      }),
    predict: (input) =>
      new Promise<TimedPrediction>((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        worker.postMessage({ type: 'predict', id, input });
      }),
    dispose: () => {
      worker.terminate();
      failAll(new Error('disposed'));
    },
  };
}
