'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PROFILE, PROJECTS, type Lang } from '@/data/portfolio';
import { UI, fill } from '@/data/ui';
import { parseProjectParam, withProjectParam } from '@/lib/deeplink';
import { normalizeLens, selectProjectsForLens, type FocusLens } from '@/lib/lens';
import { LANG_KEY, THEME_KEY, resolveLang, resolveTheme, type Theme } from '@/lib/preferences';
import BackCover from './passbook/BackCover';
import History from './passbook/History';
import HolderPage from './passbook/HolderPage';
import LedgerPage from './passbook/LedgerPage';
import Statement from './passbook/Statement';
import styles from './passbook/Passbook.module.css';

const IDS = PROJECTS.map((p) => p.id);

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode: the choice just isn't remembered */
  }
}

export default function PortfolioClient() {
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [lens, setLens] = useState<FocusLens>('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const statementHeading = useRef<HTMLHeadingElement>(null);
  const lastOpened = useRef<string | null>(null);
  const focusOnOpen = useRef(false);

  // Initial state from storage, system preference and the URL (?lens, ?project).
  useEffect(() => {
    let storedTheme: string | null = null;
    let storedLang: string | null = null;
    try {
      storedTheme = localStorage.getItem(THEME_KEY);
      storedLang = localStorage.getItem(LANG_KEY);
    } catch {
      /* storage blocked */
    }
    setTheme(resolveTheme(storedTheme, window.matchMedia('(prefers-color-scheme: dark)').matches));
    setLang(resolveLang(storedLang));
    const params = new URLSearchParams(window.location.search);
    setLens(normalizeLens(params.get('lens')));
    const fromUrl = parseProjectParam(window.location.search, IDS);
    if (fromUrl) {
      focusOnOpen.current = true;
      setActiveId(fromUrl);
    }
    const onPop = () => setActiveId(parseProjectParam(window.location.search, IDS));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Move focus into a statement when it opens; give it back to its ledger row when it closes.
  useEffect(() => {
    if (activeId) {
      lastOpened.current = activeId;
      if (focusOnOpen.current) {
        focusOnOpen.current = false;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.getElementById('statement')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        statementHeading.current?.focus({ preventScroll: true });
      }
    } else if (lastOpened.current) {
      document.querySelector<HTMLButtonElement>(`button[data-project="${lastOpened.current}"]`)?.focus();
      lastOpened.current = null;
    }
  }, [activeId]);

  const ordered = useMemo(() => selectProjectsForLens(PROJECTS, lens), [lens]);
  const active = PROJECTS.find((p) => p.id === activeId) ?? null;

  const openProject = useCallback((id: string) => {
    focusOnOpen.current = true;
    setActiveId(id);
    window.history.pushState({ project: id }, '', withProjectParam(window.location.href, id));
  }, []);

  const closeProject = useCallback(() => {
    if (window.history.state?.project) {
      window.history.back();
    } else {
      window.history.replaceState({}, '', withProjectParam(window.location.href, null));
      setActiveId(null);
    }
  }, []);

  const chooseLens = (next: FocusLens) => {
    setLens(next);
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete('lens');
    else url.searchParams.set('lens', next);
    window.history.replaceState(window.history.state, '', url.toString());
  };

  const switchLang = () => {
    const next: Lang = lang === 'en' ? 'th' : 'en';
    setLang(next);
    store(LANG_KEY, next);
  };

  const switchTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    store(THEME_KEY, next);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((cur) => (cur === msg ? '' : cur)), 2600);
  };

  const copyEmail = async () => {
    const email = PROFILE.emailPrimary;
    try {
      await navigator.clipboard.writeText(email);
      showToast(fill(UI.copied[lang], { email }));
    } catch {
      showToast(fill(UI.copyFailed[lang], { email }));
    }
  };

  return (
    <div className={`${styles.page} ${styles.gutter}`}>
      <a className={styles.skip} href="#ledger">
        {UI.skip[lang]}
      </a>
      <div className={styles.wrap}>
        <header className={styles.bar}>
          <a className={styles.brand} href="/">
            {PROFILE.brand}
          </a>
          <nav className={styles.nav} aria-label="Primary">
            <a href="#ledger">{UI.navLedger[lang]}</a>
            <a href="#history">{UI.navHistory[lang]}</a>
            <a href="#contact">{UI.navContact[lang]}</a>
            <button
              type="button"
              className={styles.coverBtn}
              onClick={switchLang}
              lang={lang === 'en' ? 'th' : 'en'}
              aria-label={UI.switchLang[lang]}
            >
              {UI.switchLangShort[lang]}
            </button>
            <button
              type="button"
              className={styles.coverBtn}
              onClick={switchTheme}
              aria-label={UI.themeLabel[lang]}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? UI.toLight[lang] : UI.toDark[lang]}
            </button>
          </nav>
        </header>

        <main className={styles.wrap}>
          <div className={`${styles.spread} ${styles.paper}`}>
            <HolderPage lang={lang} onCopyEmail={() => void copyEmail()} />
            <LedgerPage
              lang={lang}
              projects={ordered}
              lens={lens}
              onLens={chooseLens}
              activeId={activeId}
              onOpen={openProject}
            />
          </div>

          {active && <Statement ref={statementHeading} project={active} lang={lang} onClose={closeProject} />}

          <History lang={lang} />
          <BackCover lang={lang} onCopyEmail={() => void copyEmail()} />
        </main>

        <footer className={styles.footer}>
          <span>
            © {new Date().getFullYear()} {PROFILE.nameEN} · {PROFILE.brand}
          </span>
          <span>{UI.footer[lang]}</span>
        </footer>
      </div>

      {toast && (
        <div className={styles.toast} role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
