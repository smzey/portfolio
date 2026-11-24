export type Theme = 'light' | 'dark';
export type UiLang = 'en' | 'th';

export const THEME_KEY = 'phanu-theme';
export const LANG_KEY = 'phanu-lang';

/** The visitor's own stored choice wins; otherwise light (paper by day). The system setting is ignored on purpose. */
export function resolveTheme(stored: string | null): Theme {
  return stored === 'dark' ? 'dark' : 'light';
}

export function resolveLang(stored: string | null): UiLang {
  return stored === 'th' ? 'th' : 'en';
}
