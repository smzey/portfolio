'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import { CODE_ON_REQUEST, PROFILE, type Lang, type ProjectCaseStudy } from '@/data/portfolio';
import { UI } from '@/data/ui';
import ArchitectureDiagram from '../ArchitectureDiagram';
import ProjectVideo from '../ProjectVideo';
import styles from './Passbook.module.css';

const SignBridgeDemo = dynamic(() => import('../SignBridgeDemo'), { ssr: false });

/** A project's own statement page: problem, architecture, decisions, verified outcome, provenance. */
const Statement = forwardRef<HTMLHeadingElement, { project: ProjectCaseStudy; lang: Lang; onClose: () => void }>(
  function Statement({ project: p, lang, onClose }, headingRef) {
    return (
      <article id="statement" className={`${styles.statement} ${styles.paper} ${styles.leaf}`} aria-labelledby="statement-title">
        <div className={styles.statementTop}>
          <h2 id="statement-title" ref={headingRef} tabIndex={-1} className={styles.statementTitle}>
            {p.name}
          </h2>
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onClose}>
            {UI.closeStatement[lang]}
          </button>
        </div>

        <div className={styles.statementMeta}>
          <span>{p.category[lang]}</span>
          <span>
            {UI.stack[lang]}: {p.stack.join(' · ')}
          </span>
          <span>
            {UI.source[lang]}:{' '}
            {p.repoUrl ? (
              <a href={p.repoUrl} target="_blank" rel="noreferrer">
                {p.repoUrl.replace('https://', '')}
              </a>
            ) : (
              <a href={`mailto:${PROFILE.emailPrimary}?subject=${encodeURIComponent(`Source code request: ${p.name}`)}`}>
                {CODE_ON_REQUEST[lang]}
              </a>
            )}
          </span>
        </div>

        {p.video && (
          <div className={styles.full}>
            <ProjectVideo video={p.video} lang={lang} />
          </div>
        )}

        {p.id === 'signbridge' && (
          <div className={styles.full}>
            <SignBridgeDemo lang={lang} />
          </div>
        )}

        <div className={`${styles.block} ${styles.full}`}>
          <h3 className={styles.blockTitle}>{UI.architecture[lang]}</h3>
          <div className={styles.diagram}>
            <ArchitectureDiagram id={p.id} />
          </div>
          <p style={{ marginTop: 12 }}>{p.architectureNote[lang]}</p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>{UI.problem[lang]}</h3>
          <p>{p.problem[lang]}</p>
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>{UI.decisions[lang]}</h3>
          <ul>
            {p.decisions.map((d, i) => (
              <li key={i}>{d[lang]}</li>
            ))}
          </ul>
        </div>

        <div className={`${styles.block} ${styles.full}`}>
          <h3 className={styles.blockTitle}>{UI.outcome[lang]}</h3>
          <div className={styles.outcome}>
            <p>{p.impact[lang]}</p>
            <span className={styles.stamp}>
              {p.ledger.figure} · {p.ledger.condition[lang]}
            </span>
          </div>
        </div>

        {p.repoUrl && (
          <div className={styles.full}>
            <a className={styles.btn} href={p.repoUrl} target="_blank" rel="noreferrer">
              {UI.viewSource[lang]}
            </a>
          </div>
        )}
      </article>
    );
  },
);

export default Statement;
