import { PROFILE, type Lang } from '@/data/portfolio';
import { UI } from '@/data/ui';
import styles from './Passbook.module.css';

/** Back cover: the availability line and the email set as the headline. */
export default function BackCover({ lang, onCopyEmail }: { lang: Lang; onCopyEmail: () => void }) {
  return (
    <section id="contact" className={styles.back} aria-labelledby="contact-title">
      <h2 id="contact-title" className={styles.backTitle}>
        {UI.contactTitle[lang]}
      </h2>
      <div className={styles.email}>{PROFILE.emailPrimary}</div>
      <p className={styles.backNote}>{UI.contactNote[lang]}</p>
      <div className={styles.backActions}>
        <button type="button" className={styles.backBtn} onClick={onCopyEmail}>
          {UI.copyEmail[lang]}
        </button>
        <a className={`${styles.backBtn} ${styles.backBtnGhost}`} href={PROFILE.cvUrl} download>
          {UI.downloadCv[lang]}
        </a>
        <a className={`${styles.backBtn} ${styles.backBtnGhost}`} href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className={`${styles.backBtn} ${styles.backBtnGhost}`} href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
      <p className={styles.backNote}>
        {UI.universityEmail[lang]}: {PROFILE.emailUniversity}
      </p>
    </section>
  );
}
