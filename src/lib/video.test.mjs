import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkVideoAssets, MAX_VIDEO_BYTES } from './video.ts';

const caption = { en: 'Live queue demo', th: 'เดโมคิวสด' };

function fixture(sizes) {
  const dir = mkdtempSync(join(tmpdir(), 'vid-'));
  mkdirSync(join(dir, 'videos'));
  for (const [name, bytes] of Object.entries(sizes)) writeFileSync(join(dir, 'videos', name), Buffer.alloc(bytes));
  return dir;
}
const video = { mp4: '/videos/x.mp4', webm: '/videos/x.webm', poster: '/videos/x.jpg', caption };

test('valid video assets produce no errors', () => {
  const dir = fixture({ 'x.mp4': 1000, 'x.webm': 1000, 'x.jpg': 100 });
  assert.deepEqual(checkVideoAssets(video, dir), []);
});

test('missing files are reported', () => {
  const dir = fixture({ 'x.mp4': 1000 });
  assert.deepEqual(checkVideoAssets(video, dir), ['missing /videos/x.webm', 'missing /videos/x.jpg']);
});

test('videos over 2 MB are reported', () => {
  assert.equal(MAX_VIDEO_BYTES, 2 * 1024 * 1024);
  const dir = fixture({ 'x.mp4': MAX_VIDEO_BYTES + 1, 'x.webm': 10, 'x.jpg': 10 });
  assert.deepEqual(checkVideoAssets(video, dir), ['/videos/x.mp4 is over 2 MB']);
});

test('caption must be bilingual', () => {
  const dir = fixture({ 'x.mp4': 1, 'x.webm': 1, 'x.jpg': 1 });
  assert.deepEqual(checkVideoAssets({ ...video, caption: { en: 'x', th: ' ' } }, dir), ['caption missing en or th']);
});
