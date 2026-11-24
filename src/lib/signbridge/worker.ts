/// <reference lib="webworker" />
import { decodeModel, predict, type ModelMeta, type PackedModel } from './cnn';

type InMsg = { type: 'load' } | { type: 'predict'; id: number; input: Float32Array };

let model: PackedModel | null = null;
let encoding = '';

self.onmessage = async (e: MessageEvent<InMsg>) => {
  const msg = e.data;
  try {
    if (msg.type === 'load') {
      if (!model) {
        const [metaRes, binRes] = await Promise.all([
          fetch('/signbridge/model.meta.json'),
          fetch('/signbridge/model.bin'),
        ]);
        if (!metaRes.ok || !binRes.ok) throw new Error(`HTTP ${metaRes.status}/${binRes.status}`);
        const meta = (await metaRes.json()) as ModelMeta;
        model = decodeModel(meta, await binRes.arrayBuffer());
        encoding = meta.encoding;
      }
      self.postMessage({ type: 'ready', encoding });
    } else if (msg.type === 'predict') {
      if (!model) throw new Error('model not loaded');
      const t0 = performance.now();
      const r = predict(model, msg.input);
      self.postMessage({ type: 'result', id: msg.id, ...r, ms: performance.now() - t0 });
    }
  } catch (err) {
    self.postMessage({ type: 'error', id: msg.type === 'predict' ? msg.id : undefined, message: String(err) });
  }
};
