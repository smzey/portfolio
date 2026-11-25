import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECTS, CODE_ON_REQUEST } from './portfolio.ts';

test('only public repos are linked: signbridge, khaidee-v2, farmhouse', () => {
  const linked = PROJECTS.filter((p) => p.repoUrl).map((p) => p.id).sort();
  assert.deepEqual(linked, ['farmhouse', 'khaidee-v2', 'signbridge']);
});

test('every repoUrl points at the smzey GitHub account', () => {
  for (const p of PROJECTS.filter((x) => x.repoUrl)) {
    assert.ok(p.repoUrl.startsWith('https://github.com/smzey/'), `${p.id}: ${p.repoUrl}`);
  }
});

test('CODE_ON_REQUEST is bilingual', () => {
  assert.ok(CODE_ON_REQUEST.en.trim() && CODE_ON_REQUEST.th.trim());
});

test('every project video has its files, ≤ 2 MB, and a bilingual caption', async () => {
  const { checkVideoAssets } = await import('../lib/video.ts');
  const pub = new URL('../../public', import.meta.url).pathname;
  for (const p of PROJECTS.filter((x) => x.video)) {
    assert.deepEqual(checkVideoAssets(p.video, pub), [], p.id);
  }
});

test('phone number is not on any public web page or client bundle (CV PDF only)', async () => {
  const { readFileSync } = await import('node:fs');
  const { PROFILE } = await import('./portfolio.ts');
  assert.equal('phone' in PROFILE, false);
  const cv = readFileSync(new URL('../app/cv/page.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(cv, /93\s*195\s*6230/);
});

test('every project has a ledger line: proof figure, bilingual condition, and an honest cloud-call value', async () => {
  const { PROJECTS } = await import('./portfolio.ts');
  for (const p of PROJECTS) {
    assert.ok(p.ledger, `${p.id} has no ledger`);
    assert.ok(p.ledger.figure.trim(), `${p.id} figure`);
    assert.ok(p.ledger.condition.en.trim() && p.ledger.condition.th.trim(), `${p.id} condition`);
    assert.ok(['0', 'cloud', 'n/a'].includes(p.ledger.cloud), `${p.id} cloud = ${p.ledger.cloud}`);
  }
  const byId = Object.fromEntries(PROJECTS.map((p) => [p.id, p.ledger.cloud]));
  assert.equal(byId.jaidee, '0');
  assert.equal(byId.signbridge, '0');
  assert.equal(byId.anya, 'cloud', 'Anya uses Gemini Vision, a cloud API');
});

test('every ledger line carries its first-commit month (YYYY-MM)', async () => {
  const { PROJECTS } = await import('./portfolio.ts');
  for (const p of PROJECTS) assert.match(p.ledger.opened ?? '', /^20\d\d-(0[1-9]|1[0-2])$/, p.id);
});

test('PROFILE has formatted accountNo and every ledger line has a 2-3 letter uppercase transaction code', async () => {
  const { PROFILE, PROJECTS } = await import('./portfolio.ts');
  assert.equal(PROFILE.accountNo, '672-1-10052-0');
  for (const p of PROJECTS) assert.match(p.ledger.code ?? '', /^[A-Z]{2,3}$/, p.id);
});

test('AIoT TA role ended in Oct 2026 (not "present") on the site and the web CV', async () => {
  const { EXPERIENCES, PROFILE } = await import('./portfolio.ts');
  const { readFileSync } = await import('node:fs');
  const aiot = EXPERIENCES.find((e) => /AIoT/.test(e.role.en));
  assert.equal(aiot.period, 'SEP 2026 – OCT 2026');
  for (const h of aiot.highlights) assert.doesNotMatch(h.en + h.th, /Present|ปัจจุบัน/);
  assert.match(PROFILE.intro.en, /former Head Teaching Assistant/);
  const cv = readFileSync(new URL('../app/cv/page.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(cv, /Sep 2026 – Present|Oct 2026 – Present/);
});

test('Nov 2026 Advanced Computer Programming TA (2 sections Thai & Inter) is synced on site and web CV', async () => {
  const { EXPERIENCES } = await import('./portfolio.ts');
  const { readFileSync } = await import('node:fs');
  const adv = EXPERIENCES.find((e) => e.id === 'ta-adv-prog-2569');
  assert.ok(adv, 'ta-adv-prog-2569 missing');
  assert.equal(adv.period, 'NOV 2026 – PRESENT');
  assert.match(adv.role.en, /2 Sections: Thai & International/);
  const cv = readFileSync(new URL('../app/cv/page.tsx', import.meta.url), 'utf8');
  assert.match(cv, /Advanced Computer Programming \(2 Sections: Thai &amp; International\)/);
  assert.match(cv, /Nov 2026 – Present/);
});
