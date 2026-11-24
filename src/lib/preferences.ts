export type Theme = 'light' | 'dark';
export type UiLang = 'en' | 'th';

export const THEME_KEY = 'phanu-theme';
export const LANG_KEY = 'phanu-lang';

/** A stored, valid choice wins; otherwise follow the visitor's system setting. */
export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored;
  return prefersDark ? 'dark' : 'light';
}

export function resolveLang(stored: string | null): UiLang {
  return stored === 'th' ? 'th' : 'en';
}
