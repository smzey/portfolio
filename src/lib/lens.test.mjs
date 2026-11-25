import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeLens, selectProjectsForLens } from './lens.ts';

const MOCK_PROJECTS = [
  { id: 'jaidee', lensRank: { all: 1, ai: 2, fintech: 2, systems: 5 } },
  { id: 'signbridge', lensRank: { all: 2, ai: 1, fintech: 5, systems: 4 } },
  { id: 'khaidee-v2', lensRank: { all: 3, ai: 5, fintech: 1, systems: 3 } },
  { id: 'farmhouse', lensRank: { all: 4, ai: 6, fintech: 4, systems: 1 } },
  { id: 'cockpit', lensRank: { all: 5, ai: 4, fintech: 3, systems: 2 } },
  { id: 'anya', lensRank: { all: 6, ai: 3, fintech: 6, systems: 6 } },
];

test('normalizeLens accepts valid lenses case-insensitively', () => {
  assert.equal(normalizeLens('ai'), 'ai');
  assert.equal(normalizeLens('FINTECH'), 'fintech');
  assert.equal(normalizeLens('Systems'), 'systems');
  assert.equal(normalizeLens('all'), 'all');
});

test('normalizeLens maps company aliases to the matching focus lens', () => {
  assert.equal(normalizeLens('nvidia'), 'ai');
  assert.equal(normalizeLens('kbtg'), 'fintech');
  assert.equal(normalizeLens('kbank'), 'fintech');
  assert.equal(normalizeLens('scb'), 'fintech');
  assert.equal(normalizeLens('scbx'), 'fintech');
  assert.equal(normalizeLens('krungsri'), 'fintech');
  assert.equal(normalizeLens('bay'), 'fintech');
  assert.equal(normalizeLens('bbl'), 'fintech');
  assert.equal(normalizeLens('bangkokbank'), 'fintech');
  assert.equal(normalizeLens('ktb'), 'fintech');
  assert.equal(normalizeLens('krungthai'), 'fintech');
  assert.equal(normalizeLens('ttb'), 'fintech');
  assert.equal(normalizeLens('tmb'), 'fintech');
  assert.equal(normalizeLens('ptt'), 'systems');
});

test('normalizeLens falls back cleanly to all for invalid or empty inputs', () => {
  assert.equal(normalizeLens(undefined), 'all');
  assert.equal(normalizeLens(null), 'all');
  assert.equal(normalizeLens(''), 'all');
  assert.equal(normalizeLens('unknown-xyz'), 'all');
  assert.equal(normalizeLens('constructor'), 'all');
  assert.equal(normalizeLens('__proto__'), 'all');
  assert.equal(normalizeLens('toString'), 'all');
});

test('selectProjectsForLens orders projects by priority for each lens without mutating input', () => {
  const aiOrder = selectProjectsForLens(MOCK_PROJECTS, 'ai').map((p) => p.id);
  assert.deepEqual(aiOrder.slice(0, 3), ['signbridge', 'jaidee', 'anya']);

  const fintechOrder = selectProjectsForLens(MOCK_PROJECTS, 'fintech').map((p) => p.id);
  assert.deepEqual(fintechOrder.slice(0, 3), ['khaidee-v2', 'jaidee', 'cockpit']);

  const systemsOrder = selectProjectsForLens(MOCK_PROJECTS, 'systems').map((p) => p.id);
  assert.deepEqual(systemsOrder.slice(0, 3), ['farmhouse', 'cockpit', 'khaidee-v2']);

  // Original array untouched
  assert.equal(MOCK_PROJECTS[0].id, 'jaidee');
});

import { selectLedgerEntries } from './lens.ts';

test('selectLedgerEntries filters by featuredIn and prints newest first', () => {
  const P = [
    { id: 'a', featuredIn: ['all', 'ai'], ledger: { opened: '2026-06' } },
    { id: 'b', featuredIn: ['all', 'systems'], ledger: { opened: '2026-09' } },
    { id: 'c', featuredIn: ['all', 'ai'], ledger: { opened: '2026-07' } },
  ];
  assert.deepEqual(selectLedgerEntries(P, 'all').map((p) => p.id), ['b', 'c', 'a']);
  assert.deepEqual(selectLedgerEntries(P, 'ai').map((p) => p.id), ['c', 'a']);
  assert.deepEqual(P.map((p) => p.id), ['a', 'b', 'c'], 'input not mutated');
});
