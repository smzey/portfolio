import test from 'node:test';
import assert from 'node:assert/strict';
import { UI } from './ui.ts';
import { PROFILE } from './portfolio.ts';

test('every UI string has non-empty English and Thai', () => {
  const keys = Object.keys(UI);
  assert.ok(keys.length >= 30, `only ${keys.length} keys`);
  for (const [k, v] of Object.entries(UI)) assert.ok(v.en.trim() && v.th.trim(), `UI.${k} missing a language`);
});

test('placeholders match between English and Thai', () => {
  for (const [k, v] of Object.entries(UI)) {
    const ph = (s) => (s.match(/\{\w+\}/g) ?? []).sort().join();
    assert.equal(ph(v.th), ph(v.en), `UI.${k} placeholders differ`);
  }
});

test('the hero thesis and intro are bilingual and the intro stays short (≤ 30 words)', () => {
  for (const f of ['thesis', 'intro']) assert.ok(PROFILE[f].en.trim() && PROFILE[f].th.trim(), f);
  assert.ok(PROFILE.intro.en.split(/\s+/).length <= 30, `intro is ${PROFILE.intro.en.split(/\s+/).length} words`);
});
