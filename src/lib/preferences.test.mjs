import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme, resolveLang } from './preferences.ts';

test('resolveTheme: a stored choice wins, otherwise follow the system', () => {
  assert.equal(resolveTheme('dark', false), 'dark');
  assert.equal(resolveTheme('light', true), 'light');
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme(null, false), 'light');
  assert.equal(resolveTheme('purple', true), 'dark');
});

test('resolveLang: stored th or en, anything else falls back to en', () => {
  assert.equal(resolveLang('th'), 'th');
  assert.equal(resolveLang('en'), 'en');
  assert.equal(resolveLang(null), 'en');
  assert.equal(resolveLang('kr'), 'en');
});
