#!/usr/bin/env node
// Pack SignBridge weights (model_cnn.json, ~9 MB) into public/signbridge/model.bin + model.meta.json.
// Usage: node scripts/pack-signbridge.mjs [srcDir] [outDir] [--encoding int8|float16|float32]
// Source dir defaults to SIGNBRIDGE_SRC env var, falling back to the local hackathon_2 path.
// Conv/dense weight matrices use the chosen encoding; biases and BatchNorm params stay float32.
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DEFAULT_SRC_DIR = '/Users/phanu/Developer/projects/hackathon_2/public';
const DEFAULT_OUT_DIR = 'public/signbridge';
const argv = process.argv.slice(2);
const encIdx = argv.indexOf('--encoding');
const encoding = encIdx > -1 ? argv[encIdx + 1] : 'int8';
const positional = argv.filter((_, i) => i !== encIdx && (encIdx === -1 || i !== encIdx + 1));
const srcDir = positional[0] || process.env.SIGNBRIDGE_SRC || DEFAULT_SRC_DIR;
const outDir = positional[1] || DEFAULT_OUT_DIR;
if (!srcDir || !outDir || !['int8', 'float16', 'float32'].includes(encoding)) {
  console.error('usage: pack-signbridge.mjs [srcDir] [outDir] [--encoding int8|float16|float32]');
  process.exit(2);
}

const m = JSON.parse(readFileSync(join(srcDir, 'model_cnn.json'), 'utf8'));
const flat = (x) => (Array.isArray(x) ? x.flat(Infinity) : [x]);

function f32ToF16(v) {
  const f = new Float32Array([v]);
  const u = new Uint32Array(f.buffer)[0];
  const sign = (u >> 16) & 0x8000;
  let exp = ((u >> 23) & 0xff) - 127 + 15;
  let mant = u & 0x7fffff;
  if (exp <= 0) {
    if (exp < -10) return sign;
    mant = (mant | 0x800000) >> (1 - exp);
    return sign | ((mant + 0x1000) >> 13);
  }
  if (exp >= 31) return sign | 0x7c00;
  const r = sign | (exp << 10) | ((mant + 0x1000) >> 13);
  return r;
}

const chunks = [];
const tensors = [];
let offset = 0;
function push(name, shape, values, dtype) {
  let buf;
  const t = { name, shape, offset, length: values.length, dtype };
  if (dtype === 'int8') {
    let max = 0;
    for (const v of values) max = Math.max(max, Math.abs(v));
    const scale = max / 127 || 1;
    buf = Buffer.from(Int8Array.from(values, (v) => Math.max(-127, Math.min(127, Math.round(v / scale)))).buffer);
    t.scale = scale;
  } else if (dtype === 'float16') {
    buf = Buffer.from(Uint16Array.from(values, f32ToF16).buffer);
  } else {
    buf = Buffer.from(Float32Array.from(values).buffer);
  }
  // keep every tensor 4-byte aligned so Float32Array views are valid
  const pad = (4 - (buf.length % 4)) % 4;
  chunks.push(buf, Buffer.alloc(pad));
  offset += buf.length + pad;
  tensors.push(t);
}

for (const n of ['conv1', 'conv2', 'dense1', 'dense2']) {
  push(`${n}.W`, m[n].shape, flat(m[n].W), encoding);
  push(`${n}.b`, [m[n].b.length], flat(m[n].b), 'float32');
}
for (const n of ['bn1', 'bn2']) {
  for (const k of ['gamma', 'beta', 'mean', 'var']) push(`${n}.${k}`, [m[n][k].length], flat(m[n][k]), 'float32');
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'model.bin'), Buffer.concat(chunks));
writeFileSync(
  join(outDir, 'model.meta.json'),
  JSON.stringify({ classes: m.classes, encoding, testAcc: m.test_acc, bnEps: { bn1: m.bn1.eps, bn2: m.bn2.eps }, tensors }),
);
copyFileSync(join(srcDir, 'samples.json'), join(outDir, 'samples.json'));
console.log(`packed ${encoding}: ${offset} bytes, ${tensors.length} tensors → ${outDir}`);
