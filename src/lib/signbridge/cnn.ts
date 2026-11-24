// Typed port of SignBridge's pure-JS CNN forward pass (hackathon_2/public/cnn.js).
// Op order: conv1 → relu → bn1 → pool → conv2 → relu → bn2 → pool → dense1+relu → dense2 → softmax.
// Feature maps are channels-last and flat: idx = (h*W + w)*C + c (matches Keras flatten).

export type LayerName = 'conv1' | 'conv2' | 'dense1' | 'dense2';
export type BNName = 'bn1' | 'bn2';
export type Encoding = 'int8' | 'float16' | 'float32';

export interface TensorMeta {
  name: string; // e.g. "conv1.W", "bn1.gamma"
  shape: number[];
  offset: number; // byte offset into model.bin
  length: number; // element count
  dtype: Encoding; // storage type of this tensor
  scale?: number; // int8 only: value = q * scale
}

export interface ModelMeta {
  classes: string[];
  encoding: Encoding;
  testAcc: number;
  bnEps: { bn1: number; bn2: number };
  tensors: TensorMeta[];
}

export interface Layer {
  shape: number[];
  W: Float32Array;
  b: Float32Array;
}

export interface BN {
  gamma: Float32Array;
  beta: Float32Array;
  mean: Float32Array;
  var: Float32Array;
  eps: number;
}

export interface PackedModel {
  classes: string[];
  layers: Record<LayerName, Layer>;
  bn1: BN;
  bn2: BN;
}

export interface Sample {
  label: string;
  px: number[]; // 784 values, 0..255
}

export interface Prediction {
  letter: string;
  conf: number;
  top: { letter: string; p: number }[];
}

function f16ToF32(h: number): number {
  const s = h & 0x8000 ? -1 : 1;
  const e = (h >> 10) & 0x1f;
  const f = h & 0x3ff;
  if (e === 0) return s * 2 ** -14 * (f / 1024);
  if (e === 31) return f ? NaN : s * Infinity;
  return s * 2 ** (e - 15) * (1 + f / 1024);
}

function readTensor(t: TensorMeta, bin: ArrayBuffer): Float32Array {
  if (t.dtype === 'float32') return new Float32Array(bin.slice(t.offset, t.offset + t.length * 4));
  const out = new Float32Array(t.length);
  if (t.dtype === 'int8') {
    const q = new Int8Array(bin, t.offset, t.length);
    const scale = t.scale ?? 1;
    for (let i = 0; i < t.length; i++) out[i] = q[i] * scale;
  } else {
    const dv = new DataView(bin, t.offset, t.length * 2);
    for (let i = 0; i < t.length; i++) out[i] = f16ToF32(dv.getUint16(i * 2, true));
  }
  return out;
}

export function decodeModel(meta: ModelMeta, bin: ArrayBuffer): PackedModel {
  const get = (name: string) => {
    const t = meta.tensors.find((x) => x.name === name);
    if (!t) throw new Error(`model.meta.json missing tensor ${name}`);
    return { t, data: readTensor(t, bin) };
  };
  const layer = (n: LayerName): Layer => {
    const w = get(`${n}.W`);
    return { shape: w.t.shape, W: w.data, b: get(`${n}.b`).data };
  };
  const bn = (n: BNName): BN => ({
    gamma: get(`${n}.gamma`).data,
    beta: get(`${n}.beta`).data,
    mean: get(`${n}.mean`).data,
    var: get(`${n}.var`).data,
    eps: meta.bnEps[n],
  });
  return {
    classes: meta.classes,
    layers: { conv1: layer('conv1'), conv2: layer('conv2'), dense1: layer('dense1'), dense2: layer('dense2') },
    bn1: bn('bn1'),
    bn2: bn('bn2'),
  };
}

function conv2d(inp: Float32Array, H: number, W: number, Cin: number, layer: Layer): Float32Array {
  const [kh, kw, , Cout] = layer.shape;
  const Wt = layer.W;
  const padH = (kh - 1) >> 1;
  const padW = (kw - 1) >> 1;
  const out = new Float32Array(H * W * Cout);
  for (let h = 0; h < H; h++) {
    for (let w = 0; w < W; w++) {
      const oBase = (h * W + w) * Cout;
      for (let co = 0; co < Cout; co++) out[oBase + co] = layer.b[co];
      for (let ki = 0; ki < kh; ki++) {
        const ih = h + ki - padH;
        if (ih < 0 || ih >= H) continue;
        for (let kj = 0; kj < kw; kj++) {
          const iw = w + kj - padW;
          if (iw < 0 || iw >= W) continue;
          const inBase = (ih * W + iw) * Cin;
          const kBase = (ki * kw + kj) * Cin;
          for (let ci = 0; ci < Cin; ci++) {
            const x = inp[inBase + ci];
            if (x === 0) continue;
            const wBase = (kBase + ci) * Cout;
            for (let co = 0; co < Cout; co++) out[oBase + co] += x * Wt[wBase + co];
          }
        }
      }
    }
  }
  return out;
}

function reluInPlace(a: Float32Array): void {
  for (let i = 0; i < a.length; i++) if (a[i] < 0) a[i] = 0;
}

function batchNorm(a: Float32Array, HW: number, C: number, bn: BN): void {
  const inv = new Float32Array(C);
  for (let c = 0; c < C; c++) inv[c] = bn.gamma[c] / Math.sqrt(bn.var[c] + bn.eps);
  for (let p = 0; p < HW; p++) {
    const base = p * C;
    for (let c = 0; c < C; c++) a[base + c] = (a[base + c] - bn.mean[c]) * inv[c] + bn.beta[c];
  }
}

function maxPool2(a: Float32Array, H: number, W: number, C: number): Float32Array {
  const oH = H >> 1;
  const oW = W >> 1;
  const out = new Float32Array(oH * oW * C);
  for (let h = 0; h < oH; h++) {
    for (let w = 0; w < oW; w++) {
      const oBase = (h * oW + w) * C;
      for (let c = 0; c < C; c++) {
        let m = -Infinity;
        for (let di = 0; di < 2; di++)
          for (let dj = 0; dj < 2; dj++) {
            const v = a[((h * 2 + di) * W + (w * 2 + dj)) * C + c];
            if (v > m) m = v;
          }
        out[oBase + c] = m;
      }
    }
  }
  return out;
}

function dense(a: Float32Array, layer: Layer, relu: boolean): Float32Array {
  const [In, Out] = layer.shape;
  const out = new Float32Array(Out);
  for (let o = 0; o < Out; o++) out[o] = layer.b[o];
  for (let i = 0; i < In; i++) {
    const x = a[i];
    if (x === 0) continue;
    const base = i * Out;
    for (let o = 0; o < Out; o++) out[o] += x * layer.W[base + o];
  }
  if (relu) reluInPlace(out);
  return out;
}

function softmax(a: Float32Array): Float32Array {
  let max = -Infinity;
  for (const v of a) if (v > max) max = v;
  let z = 0;
  const out = new Float32Array(a.length);
  for (let i = 0; i < a.length; i++) {
    out[i] = Math.exp(a[i] - max);
    z += out[i];
  }
  for (let i = 0; i < out.length; i++) out[i] /= z;
  return out;
}

/** input: Float32Array(784), row-major 28×28, values 0..1. */
export function predict(model: PackedModel, input: Float32Array): Prediction {
  const { layers: L } = model;
  let x = conv2d(input, 28, 28, 1, L.conv1);
  reluInPlace(x);
  batchNorm(x, 28 * 28, 32, model.bn1);
  x = maxPool2(x, 28, 28, 32);
  x = conv2d(x, 14, 14, 32, L.conv2);
  reluInPlace(x);
  batchNorm(x, 14 * 14, 64, model.bn2);
  x = maxPool2(x, 14, 14, 64);
  x = dense(x, L.dense1, true);
  x = dense(x, L.dense2, false);
  const probs = softmax(x);
  const order = Array.from(probs.keys()).sort((a, b) => probs[b] - probs[a]);
  const top = order.slice(0, 3).map((i) => ({ letter: model.classes[i], p: probs[i] }));
  return { letter: top[0].letter, conf: top[0].p, top };
}
