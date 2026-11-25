'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PROFILE, PROJECTS, type Lang } from '@/data/portfolio';
import { UI, fill } from '@/data/ui';
import { parseProjectParam, withProjectParam } from '@/lib/deeplink';
import { buildPassbookUrl, resolveEdition, shouldStartOpen, type PassbookEdition } from '@/lib/edition';
import { normalizeLens, selectLedgerEntries, type FocusLens } from '@/lib/lens';
import { LANG_KEY, THEME_KEY, resolveLang, resolveTheme, type Theme } from '@/lib/preferences';
import BackCover from './passbook/BackCover';
import History from './passbook/History';
import HolderPage from './passbook/HolderPage';
import LedgerPage from './passbook/LedgerPage';
import PassbookCover from './passbook/PassbookCover';
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
  const [edition, setEdition] = useState<PassbookEdition>('navy');
  const [isOpen, setIsOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [animateOpen, setAnimateOpen] = useState(false);
  const [lens, setLens] = useState<FocusLens>('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const statementHeading = useRef<HTMLHeadingElement>(null);
  const lastOpened = useRef<string | null>(null);
  const focusOnOpen = useRef(false);
  const openTimer = useRef<number | null>(null);

  // Initial state from storage and URL (?cover, ?lens, ?project, #hash).
  useEffect(() => {
    let storedTheme: string | null = null;
    let storedLang: string | null = null;
    try {
      storedTheme = localStorage.getItem(THEME_KEY);
      storedLang = localStorage.getItem(LANG_KEY);
    } catch {
      /* storage blocked */
    }
    setTheme(resolveTheme(storedTheme));
    setLang(resolveLang(storedLang));

    const params = new URLSearchParams(window.location.search);
    const initialLens = normalizeLens(params.get('lens'));
    const initialEdition = resolveEdition(params.get('cover'), params.get('lens'));
    setLens(initialLens);
    setEdition(initialEdition);
    document.documentElement.setAttribute('data-edition', initialEdition);

    const startOpen = shouldStartOpen(window.location.search, window.location.hash, IDS);
    if (startOpen) setIsOpen(true);
    document.documentElement.removeAttribute('data-start-open');

    const fromUrl = parseProjectParam(window.location.search, IDS);
    if (fromUrl) {
      focusOnOpen.current = true;
      setActiveId(fromUrl);
    }

    const onPop = () => {
      const nextParams = new URLSearchParams(window.location.search);
      const nextLens = normalizeLens(nextParams.get('lens'));
      const nextEdition = resolveEdition(nextParams.get('cover'), nextParams.get('lens'));
      const id = parseProjectParam(window.location.search, IDS);
      setLens(nextLens);
      setEdition(nextEdition);
      setActiveId(id);
      if (id || shouldStartOpen(window.location.search, window.location.hash, IDS)) {
        setAnimateOpen(false);
        setIsOpen(true);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-edition', edition);
  }, [edition]);

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

  const ordered = useMemo(() => selectLedgerEntries(PROJECTS, lens), [lens]);
  const active = PROJECTS.find((p) => p.id === activeId) ?? null;

  const openBook = useCallback(() => {
    if (isOpen || opening) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setAnimateOpen(false);
      setIsOpen(true);
      window.requestAnimationFrame(() => {
        document.getElementById('holder-name')?.focus({ preventScroll: true });
      });
      return;
    }
    setOpening(true);
    openTimer.current = window.setTimeout(() => {
      openTimer.current = null;
      setOpening(false);
      setAnimateOpen(true);
      setIsOpen(true);
      window.requestAnimationFrame(() => {
        document.getElementById('holder-name')?.focus({ preventScroll: true });
      });
    }, 340);
  }, [isOpen, opening]);

  const closeBook = useCallback(() => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    lastOpened.current = null;
    setActiveId(null);
    setOpening(false);
    setAnimateOpen(false);
    setIsOpen(false);
    const nextUrl = buildPassbookUrl(window.location.href, { edition, lens, clearDeepLink: true });
    window.history.replaceState({}, '', nextUrl);
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.requestAnimationFrame(() => {
      document.getElementById('cover-trigger')?.focus({ preventScroll: true });
    });
  }, [edition, lens]);

  const openProject = useCallback((id: string) => {
    focusOnOpen.current = true;
    setIsOpen(true);
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

  const chooseLens = (nextLens: FocusLens) => {
    setLens(nextLens);
    const nextUrl = buildPassbookUrl(window.location.href, { edition, lens: nextLens });
    window.history.replaceState(window.history.state, '', nextUrl);
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
      <a className={styles.skip} href={isOpen ? '#ledger' : '#cover-actions'}>
        {isOpen ? UI.skip[lang] : UI.skipCover[lang]}
      </a>
      <div className={styles.wrap}>
        <header className={styles.bar}>
          <a
            className={styles.brand}
            href="/"
            onClick={(e) => {
              if (isOpen) {
                e.preventDefault();
                closeBook();
              }
            }}
          >
            <span className={styles.brandPip} aria-hidden="true" />
            <span>{PROFILE.brand}</span>
          </a>
          <nav className={styles.nav} aria-label="Primary">
            {isOpen ? (
              <>
                <a href="#ledger">{UI.navLedger[lang]}</a>
                <a href="#history">{UI.navHistory[lang]}</a>
                <a href="#contact">{UI.navContact[lang]}</a>
                <button type="button" className={styles.coverBtn} onClick={closeBook}>
                  {UI.closeBook[lang]}
                </button>
              </>
            ) : (
              <button type="button" className={styles.coverBtn} onClick={openBook}>
                {UI.openBook[lang]}
              </button>
            )}
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
          <div hidden={isOpen} data-cover-stage="">
            <PassbookCover
              lang={lang}
              edition={edition}
              opening={opening}
              onOpen={openBook}
              onCopyEmail={() => void copyEmail()}
            />
          </div>

          <div
            hidden={!isOpen}
            data-open-stage=""
            className={`${styles.openStack} ${animateOpen ? styles.bookEnter : ''}`}
          >
            <div className={styles.bookJacket}>
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
            </div>

            {active && <Statement ref={statementHeading} project={active} lang={lang} onClose={closeProject} />}

            <History lang={lang} />
            <BackCover lang={lang} onCopyEmail={() => void copyEmail()} />
          </div>
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
