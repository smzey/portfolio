import test from 'node:test';
import assert from 'node:assert/strict';
import { printedLine, MAX_PRINTED } from './ledger.ts';

test('printedLine formats a correct prediction', () => {
  const l = printedLine({ label: 'N', letter: 'N', conf: 0.984, ms: 6.27 }, new Date(2026, 10, 24, 9, 5));
  assert.deepEqual(l, { time: '09:05', truth: 'N', read: 'N', miss: false, ms: '6.3', conf: '98.4' });
});

test('printedLine marks a miss', () => {
  const l = printedLine({ label: 'K', letter: 'S', conf: 0.463, ms: 5.5 }, new Date(2026, 10, 24, 14, 28));
  assert.equal(l.miss, true);
  assert.equal(l.read, 'S');
  assert.equal(l.time, '14:28');
});

test('at most 3 printed lines are kept', () => {
  assert.equal(MAX_PRINTED, 3);
});

import { ledgerMonth } from './ledger.ts';

test('ledgerMonth prints the first-commit month in each language', () => {
  assert.equal(ledgerMonth('2026-06', 'en'), 'JUN 2026');
  assert.equal(ledgerMonth('2026-06', 'th'), 'มิ.ย. 2569');
  assert.equal(ledgerMonth('2026-09', 'th'), 'ก.ย. 2569');
  assert.equal(ledgerMonth('bad', 'en'), 'bad');
});
