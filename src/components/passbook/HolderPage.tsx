import { EDUCATION, PROFILE, type Lang } from '@/data/portfolio';
import { UI } from '@/data/ui';
import styles from './Passbook.module.css';

/** Left page of the spread: who holds the account, the one claim, and how to reach him. */
export default function HolderPage({ lang, onCopyEmail }: { lang: Lang; onCopyEmail: () => void }) {
  return (
    <section className={styles.holder} aria-labelledby="holder-name">
      <h1 id="holder-name" className={styles.name}>
        {PROFILE.nameEN}
      </h1>
      <div className={styles.nameTh} lang="th">
        {PROFILE.nameTH}
      </div>
      <p className={styles.thesis}>{PROFILE.thesis[lang]}</p>
      <p className={styles.intro}>{PROFILE.intro[lang]}</p>
      <dl className={styles.details}>
        <dt>{UI.detailType[lang]}</dt>
        <dd>{PROFILE.heroTitle[lang].replace(/\.$/, '')}</dd>
        <dt>{UI.detailBranch[lang]}</dt>
        <dd>{PROFILE.location[lang]}</dd>
        <dt>{UI.detailAvailable[lang]}</dt>
        <dd>{EDUCATION.wil[lang].replace(/^[^:]*:\s*/, '')}</dd>
        <dt>{UI.detailGpa[lang]}</dt>
        <dd>{EDUCATION.gpa}</dd>
      </dl>
      <div className={styles.actions}>
        <a className={styles.btn} href={PROFILE.cvUrl} download>
          {UI.downloadCv[lang]}
        </a>
        <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onCopyEmail}>
          {UI.copyEmail[lang]}
        </button>
      </div>
      <div className={styles.quietLinks}>
        <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  );
}
