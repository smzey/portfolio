import test from 'node:test';
import assert from 'node:assert/strict';
import { parseProjectParam, withProjectParam } from './deeplink.ts';

const IDS = ['jaidee', 'signbridge', 'anya'];

test('parseProjectParam returns a known project id or null', () => {
  assert.equal(parseProjectParam('?project=signbridge', IDS), 'signbridge');
  assert.equal(parseProjectParam('?lens=ai&project=JAIDEE', IDS), 'jaidee');
  assert.equal(parseProjectParam('?project=nope', IDS), null);
  assert.equal(parseProjectParam('', IDS), null);
});

test('withProjectParam sets or removes project and keeps other params', () => {
  assert.equal(withProjectParam('https://phanu.xyz/?lens=ai', 'anya'), 'https://phanu.xyz/?lens=ai&project=anya');
  assert.equal(withProjectParam('https://phanu.xyz/?lens=ai&project=anya', null), 'https://phanu.xyz/?lens=ai');
  assert.equal(withProjectParam('https://phanu.xyz/', null), 'https://phanu.xyz/');
});
