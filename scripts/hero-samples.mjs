#!/usr/bin/env node
// Picks 8 held-out hands for the homepage print strip: the first 6 the model reads
// correctly and the first 2 it misses, so the hero shows honest misses too.
import { readFileSync, writeFileSync } from 'node:fs';
import { decodeModel, predict } from '../src/lib/signbridge/cnn.ts';

const pub = new URL('../public/signbridge/', import.meta.url);
const meta = JSON.parse(readFileSync(new URL('model.meta.json', pub)));
const bin = readFileSync(new URL('model.bin', pub));
const model = decodeModel(meta, bin.buffer.slice(bin.byteOffset, bin.byteOffset + bin.byteLength));
const samples = JSON.parse(readFileSync(new URL('samples.json', pub)));
const ok = [], miss = [];
for (const s of samples) (predict(model, Float32Array.from(s.px, (v) => v / 255)).letter === s.label ? ok : miss).push(s);
const hero = [...ok.slice(0, 3), miss[0], ...ok.slice(3, 6), miss[1]];
writeFileSync(new URL('hero-samples.json', pub), JSON.stringify(hero));
console.log(`wrote hero-samples.json: ${hero.map((h) => h.label).join(' ')} (${hero.length} hands, 2 misses)`);
