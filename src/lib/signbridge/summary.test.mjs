import test from 'node:test';
import assert from 'node:assert/strict';
import { SIGNBRIDGE_COPY, formatSampleStat, summarizeSamples } from './copy.ts';

test('summarizeSamples counts correct predictions and lists misses with index', () => {
  const r = summarizeSamples([
    { label: 'A', letter: 'A' },
    { label: 'T', letter: 'X' },
    { label: 'B', letter: 'B' },
  ]);
  assert.deepEqual(r, { correct: 2, total: 3, misses: [{ index: 1, label: 'T', predicted: 'X' }] });
});

test('every SignBridge copy key has non-empty en and th', () => {
  const keys = Object.keys(SIGNBRIDGE_COPY);
  assert.ok(keys.length >= 9);
  for (const k of ['tryLive', 'runsInBrowser', 'samplesMode', 'webcamMode', 'sampleStat', 'missLabel', 'loading', 'retry', 'loadFailed']) {
    assert.ok(SIGNBRIDGE_COPY[k], `missing key ${k}`);
  }
  for (const [k, v] of Object.entries(SIGNBRIDGE_COPY)) {
    assert.ok(v.en.trim() && v.th.trim(), `empty translation for ${k}`);
  }
});

test('formatSampleStat derives sample counts from summarizeSamples instead of hardcoding 43 / 48', () => {
  assert.ok(!SIGNBRIDGE_COPY.sampleStat.en.includes('43') && !SIGNBRIDGE_COPY.sampleStat.en.includes('48'));
  assert.ok(!SIGNBRIDGE_COPY.sampleStat.th.includes('43') && !SIGNBRIDGE_COPY.sampleStat.th.includes('48'));

  const summary = summarizeSamples([
    { label: 'A', letter: 'A' },
    { label: 'B', letter: 'C' },
    { label: 'D', letter: 'D' },
  ]);
  assert.equal(
    formatSampleStat(summary, 'en'),
    '2 / 3 correct on these samples · 94.8% on the full 7,172-image test set',
  );
  assert.equal(
    formatSampleStat(summary, 'th'),
    'ถูกต้อง 2 / 3 ภาพในชุดตัวอย่างนี้ · 94.8% บนชุดทดสอบเต็ม 7,172 ภาพ',
  );
});
