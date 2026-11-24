import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_URL } from './site.ts';
import sitemap from '../app/sitemap.ts';
import robots from '../app/robots.ts';

test('SITE_URL is the phanu.xyz canonical origin without trailing slash', () => {
  assert.equal(SITE_URL, 'https://phanu.xyz');
  assert.ok(!SITE_URL.endsWith('/'));
});

test('sitemap lists home and cv on the canonical domain', () => {
  assert.deepEqual(sitemap().map((e) => e.url), ['https://phanu.xyz/', 'https://phanu.xyz/cv']);
});

test('robots allows everything and points at the sitemap', () => {
  assert.deepEqual(robots(), {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://phanu.xyz/sitemap.xml',
  });
});
