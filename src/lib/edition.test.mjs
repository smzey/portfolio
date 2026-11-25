import test from 'node:test';
import assert from 'node:assert/strict';
import { VISIBLE_EDITIONS, resolveEdition, shouldStartOpen, buildPassbookUrl } from './edition.ts';

test('VISIBLE_EDITIONS exposes exactly the 6 neutral cover colorways', () => {
  assert.deepEqual(VISIBLE_EDITIONS, ['navy', 'emerald', 'violet', 'gold', 'obsidian', 'marine']);
});

test('resolveEdition silently maps explicit company aliases and neutral cover names', () => {
  assert.equal(resolveEdition(null, 'kbtg'), 'emerald');
  assert.equal(resolveEdition(null, 'Kasikorn'), 'emerald');
  assert.equal(resolveEdition(null, 'kbank'), 'emerald');
  assert.equal(resolveEdition(null, 'scb'), 'violet');
  assert.equal(resolveEdition(null, 'scbx'), 'violet');
  assert.equal(resolveEdition(null, 'krungsri'), 'gold');
  assert.equal(resolveEdition(null, 'bay'), 'gold');
  assert.equal(resolveEdition(null, 'nvidia'), 'obsidian');
  assert.equal(resolveEdition(null, 'ptt'), 'marine');
  assert.equal(resolveEdition(null, 'bbl'), 'cobalt');
  assert.equal(resolveEdition(null, 'bangkokbank'), 'cobalt');
  assert.equal(resolveEdition(null, 'ktb'), 'sky');
  assert.equal(resolveEdition(null, 'krungthai'), 'sky');
  assert.equal(resolveEdition(null, 'ttb'), 'frost');
  assert.equal(resolveEdition(null, 'tmb'), 'frost');
  assert.equal(resolveEdition('gold', 'kbtg'), 'gold');
  assert.equal(resolveEdition('navy', 'kbtg'), 'navy');
});

test('resolveEdition keeps generic lens slugs on navy so no company cover leaks', () => {
  for (const slug of [
    'all',
    'ai',
    'edge',
    'ml',
    'fintech',
    'web',
    'fullstack',
    'systems',
    'logistics',
    'iot',
    '',
    null,
    undefined,
    'unknown',
    'constructor',
    '__proto__',
    'toString',
  ]) {
    assert.equal(resolveEdition(null, slug), 'navy', String(slug));
    assert.equal(resolveEdition(slug, null), 'navy', `cover=${String(slug)}`);
  }
});

test('shouldStartOpen returns true for valid ?project= or interior anchors, false otherwise', () => {
  const ids = ['jaidee', 'signbridge', 'khaidee-v2'];
  assert.equal(shouldStartOpen('?project=khaidee-v2', '', ids), true);
  assert.equal(shouldStartOpen('?lens=kbtg&project=signbridge', '', ids), true);
  assert.equal(shouldStartOpen('?project=invalid', '', ids), false);
  assert.equal(shouldStartOpen('', '#ledger', ids), true);
  assert.equal(shouldStartOpen('', '#history', ids), true);
  assert.equal(shouldStartOpen('', '#contact', ids), true);
  assert.equal(shouldStartOpen('', '#statement', ids), true);
  assert.equal(shouldStartOpen('?lens=kbtg', '', ids), false);
  assert.equal(shouldStartOpen('', '#unknown', ids), false);
});

test('buildPassbookUrl keeps cover silent, preserves cover across lens changes, and cleans deep links on close', () => {
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?lens=kbtg', { edition: 'emerald', lens: 'all' }),
    'https://phanu.xyz/?cover=emerald',
  );
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?lens=kbtg', { edition: 'emerald', lens: 'ai' }),
    'https://phanu.xyz/?cover=emerald&lens=ai',
  );
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?lens=ai', { edition: 'gold', lens: 'ai' }),
    'https://phanu.xyz/?cover=gold&lens=ai',
  );
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?cover=gold&lens=all', { edition: 'navy', lens: 'all' }),
    'https://phanu.xyz/',
  );
  assert.equal(
    buildPassbookUrl('https://phanu.xyz/?lens=scb&project=khaidee-v2#statement', {
      edition: 'violet',
      lens: 'fintech',
      clearDeepLink: true,
    }),
    'https://phanu.xyz/?cover=violet&lens=fintech',
  );
});
