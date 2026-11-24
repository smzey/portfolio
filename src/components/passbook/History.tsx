import { EDUCATION, EXPERIENCES, STACK_GROUPS, type Lang } from '@/data/portfolio';
import { UI } from '@/data/ui';
import styles from './Passbook.module.css';

/** Work, teaching and education as ruled ledger lines, then the tools as plain prose lists. */
export default function History({ lang }: { lang: Lang }) {
  return (
    <section id="history" className={`${styles.section} ${styles.paper} ${styles.leaf}`} aria-labelledby="history-title">
      <h2 id="history-title" className={styles.sectionTitle}>
        {UI.historyTitle[lang]}
      </h2>

      <div className={styles.history}>
        {EXPERIENCES.map((e) => (
          <div key={e.id} className={styles.histRow}>
            <div className={styles.histPeriod}>{e.period}</div>
            <div>
              <h3 className={styles.histRole}>{e.role[lang]}</h3>
              <div className={styles.histOrg}>
                {e.org} · {e.location}
              </div>
              <ul className={styles.histList}>
                {e.highlights.map((h, i) => (
                  <li key={i}>{h[lang]}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className={styles.histRow}>
          <div className={styles.histPeriod}>{EDUCATION.period}</div>
          <div>
            <h3 className={styles.histRole}>{EDUCATION.degree[lang]}</h3>
            <div className={styles.histOrg}>
              {EDUCATION.school} · {EDUCATION.gpa}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cols}>
        <div>
          <h3 className={styles.blockTitle}>{UI.toolsTitle[lang]}</h3>
          <dl className={styles.tools}>
            {STACK_GROUPS.map((g) => (
              <div key={g.title.en}>
                <dt>{g.title[lang]}</dt>
                <dd>{g.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className={styles.blockTitle}>{UI.coursework[lang]}</h3>
          <p className={styles.tools} style={{ color: 'var(--ink-2)' }}>
            {EDUCATION.coursework.join(', ')}
          </p>
          <h3 className={styles.blockTitle} style={{ marginTop: 20 }}>
            {UI.spoken[lang]}
          </h3>
          <p className={styles.tools} style={{ color: 'var(--ink-2)' }}>
            {EDUCATION.spokenLanguages.map((s) => s[lang]).join(' · ')}
          </p>
        </div>
      </div>
    </section>
  );
}
