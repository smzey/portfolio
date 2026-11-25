import { EDUCATION, PROFILE, type Lang } from '@/data/portfolio';
import { UI } from '@/data/ui';
import styles from './Passbook.module.css';

function BarcodeStrip() {
  const bars = [2, 1, 3, 1, 1, 2, 1, 4, 1, 2, 1, 1, 3, 2, 1, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1, 2, 1, 1, 2];
  let x = 0;
  return (
    <svg className={styles.barcodeSvg} viewBox="0 0 116 22" fill="currentColor" aria-hidden="true">
      {bars.map((w, i) => {
        const curX = x;
        x += w * 2 + 1.5;
        return <rect key={i} x={curX} y={0} width={w * 1.4} height={22} />;
      })}
    </svg>
  );
}

/** Left page of the open spread: authentic inside-front-cover Account Holder Plate. */
export default function HolderPage({ lang, onCopyEmail }: { lang: Lang; onCopyEmail: () => void }) {
  return (
    <section className={styles.holder} aria-labelledby="holder-name">
      <div className={styles.plateBar}>
        <span>{UI.accountPlateTitle[lang]}</span>
        <span>{UI.coverSeries[lang]}</span>
      </div>

      <div className={styles.accountStrip}>
        <div className={styles.accountCell}>
          <span className={styles.accountLabel}>{UI.accountNoLabel[lang]}</span>
          <span className={`${styles.accountValue} ${styles.dot}`}>{PROFILE.accountNo}</span>
          <span className={styles.accountHint}>{UI.accountNoHint[lang]}</span>
        </div>
        <div className={styles.accountCell}>
          <span className={styles.accountLabel}>{UI.accountStatusLabel[lang]}</span>
          <span className={styles.accountValue}>{UI.accountStatusValue[lang]}</span>
        </div>
      </div>

      <h1 id="holder-name" tabIndex={-1} className={styles.name}>
        {PROFILE.nameEN}
      </h1>
      <div className={styles.nameTh} lang="th">
        {PROFILE.nameTH}
      </div>
      <p className={styles.thesis}>{PROFILE.thesis[lang]}</p>
      <p className={styles.intro}>{PROFILE.intro[lang]}</p>

      <div className={styles.actions}>
        <a className={styles.btn} href={PROFILE.cvUrl} download>
          {UI.downloadCv[lang]}
        </a>
        <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onCopyEmail}>
          {UI.copyEmail[lang]}
        </button>
      </div>

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

      <div className={styles.holderFoot}>
        <div className={styles.quietLinks}>
          <div className={styles.quietLinksGroup}>
            <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
          <span className={`${styles.stamp} ${styles.holderStamp}`} aria-hidden="true">
            {UI.authorizedStamp[lang]}
          </span>
        </div>
        <div className={styles.barcodeBand} aria-hidden="true">
          <BarcodeStrip />
          <span className={styles.dot} style={{ fontSize: 12 }}>
            {PROFILE.accountNo}
          </span>
        </div>
      </div>
    </section>
  );
}
