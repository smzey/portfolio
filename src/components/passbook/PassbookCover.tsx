'use client';

import { useRef } from 'react';
import { EDUCATION, PROFILE, type Lang } from '@/data/portfolio';
import { UI } from '@/data/ui';
import type { PassbookEdition } from '@/lib/edition';
import CoverArtwork, { MonogramMark } from './CoverArtwork';
import styles from './Passbook.module.css';

export default function PassbookCover({
  lang,
  edition,
  opening,
  onOpen,
  onCopyEmail,
}: {
  lang: Lang;
  edition: PassbookEdition;
  opening: boolean;
  onOpen: () => void;
  onCopyEmail: () => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || opening) return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    el.style.setProperty('--tilt-x', `${((0.5 - py) * 6).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${((px - 0.5) * 7).toFixed(2)}deg`);
  };

  const onPointerLeave = () => {
    const el = frameRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <section className={styles.coverStage} aria-labelledby="cover-heading">
      <h1 id="cover-heading" className="sr-only">
        {PROFILE.nameEN} — {UI.coverTitle[lang]}
      </h1>
      <div
        ref={frameRef}
        className={styles.bookFrame}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className={`${styles.pageBlock} ${opening ? styles.pageBlockOpening : ''}`} aria-hidden="true" />
        <button
          id="cover-trigger"
          type="button"
          className={`${styles.bookClosed} ${opening ? styles.bookOpening : ''}`}
          onClick={onOpen}
          disabled={opening}
          aria-label={`${UI.openBook[lang]} — ${PROFILE.nameEN}`}
        >
          <span className={styles.spine} aria-hidden="true" />
          <span className={styles.coverFace}>
            <CoverArtwork edition={edition} />
            <span className={styles.coverSheen} aria-hidden="true" />

            <span className={styles.coverTop}>
              <span className={styles.coverBrand}>
                <MonogramMark />
                <span className={styles.coverTitleWrap}>
                  <span className={styles.coverBookTitle}>{UI.coverTitle[lang]}</span>
                  <span className={styles.coverSeries}>{UI.coverSeries[lang]}</span>
                </span>
              </span>
            </span>

            <span className={styles.coverBottom}>
              <span className={styles.coverIdentity}>
                <span className={styles.coverName}>{PROFILE.nameEN}</span>
                <span className={styles.coverNameTh} lang="th">
                  {PROFILE.nameTH}
                </span>
                <span className={styles.coverRole}>
                  {PROFILE.heroTitle[lang].replace(/\.$/, '')} · {EDUCATION.wil[lang].replace(/^[^:]*:\s*/, '')}
                </span>
              </span>

              <span className={styles.coverMetaRow}>
                <span className={styles.coverAc}>
                  <span className={styles.coverAcLabel}>{UI.accountNoLabel[lang]}</span>
                  <span className={styles.coverAcNo}>{PROFILE.accountNo}</span>
                </span>
                <span className={styles.coverPrompt}>{UI.coverTapHint[lang]}</span>
              </span>
            </span>
          </span>
        </button>
      </div>

      <div id="cover-actions" className={styles.deskControls}>
        <div className={styles.deskActions}>
          <button type="button" className={styles.deskBtnPrimary} onClick={onOpen}>
            {UI.openBook[lang]}
          </button>
          <a className={styles.deskBtnGhost} href={PROFILE.cvUrl} download>
            {UI.downloadCv[lang]}
          </a>
          <button type="button" className={styles.deskBtnGhost} onClick={onCopyEmail}>
            {UI.copyEmail[lang]}
          </button>
        </div>
      </div>
    </section>
  );
}
