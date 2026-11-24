import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme, resolveLang } from './preferences.ts';

test('resolveTheme: a stored choice wins, otherwise light (paper by day), whatever the system says', () => {
  assert.equal(resolveTheme('dark'), 'dark');
  assert.equal(resolveTheme('light'), 'light');
  assert.equal(resolveTheme(null), 'light');
  assert.equal(resolveTheme('purple'), 'light');
});

test('resolveLang: stored th or en, anything else falls back to en', () => {
  assert.equal(resolveLang('th'), 'th');
  assert.equal(resolveLang('en'), 'en');
  assert.equal(resolveLang(null), 'en');
  assert.equal(resolveLang('kr'), 'en');
});

test('dark mode is opt-in only: no system dark-mode CSS, and the page never reads prefers-color-scheme', async () => {
  const { readFileSync } = await import('node:fs');
  const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /prefers-color-scheme:\s*dark/);
  const page = readFileSync(new URL('../components/PortfolioClient.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(page, /prefers-color-scheme/);
});
