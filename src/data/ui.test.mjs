import test from 'node:test';
import assert from 'node:assert/strict';
import { UI, EDITION_LABELS } from './ui.ts';
import { PROFILE } from './portfolio.ts';

const ALL_EDITIONS = ['navy', 'emerald', 'violet', 'gold', 'obsidian', 'marine', 'cobalt', 'sky', 'frost'];
const TARGET_COMPANY_RE = /kbtg|kasikorn|kbank|scbx|\bscb\b|krungsri|bangkok bank|\bbbl\b|krungthai|\bktb\b|\bttb\b|nvidia|\bptt\b/i;

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

test('EDITION_LABELS covers all 9 silent cover colorways in both EN and TH', () => {
  for (const ed of ALL_EDITIONS) {
    assert.ok(EDITION_LABELS[ed]?.en.trim() && EDITION_LABELS[ed]?.th.trim(), `EDITION_LABELS.${ed} incomplete`);
  }
});

test('no target company names appear in any visible UI or EDITION_LABELS string', () => {
  for (const [k, v] of Object.entries(UI)) {
    assert.doesNotMatch(v.en, TARGET_COMPANY_RE, `UI.${k}.en leaks company name`);
    assert.doesNotMatch(v.th, TARGET_COMPANY_RE, `UI.${k}.th leaks company name`);
  }
  for (const [k, v] of Object.entries(EDITION_LABELS)) {
    assert.doesNotMatch(v.en, TARGET_COMPANY_RE, `EDITION_LABELS.${k}.en leaks company name`);
    assert.doesNotMatch(v.th, TARGET_COMPANY_RE, `EDITION_LABELS.${k}.th leaks company name`);
  }
});
