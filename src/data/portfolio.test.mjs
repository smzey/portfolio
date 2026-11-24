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
