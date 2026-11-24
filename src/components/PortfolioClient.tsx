'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import {
  EDUCATION,
  EXPERIENCES,
  LENS_CONFIG,
  PROFILE,
  PROJECTS,
  STACK_GROUPS,
  type Lang,
  type ProjectCaseStudy,
} from '@/data/portfolio';
import { normalizeLens, selectProjectsForLens, type FocusLens } from '@/lib/lens';
import ArchitectureDiagram from './ArchitectureDiagram';
import HeroSchematicCanvas, { type GyroStatus } from './HeroSchematicCanvas';
import styles from './Portfolio.module.css';

const LENS_ORDER: FocusLens[] = ['all', 'ai', 'fintech', 'systems'];

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3.5 8h9m0 0-3.5-3.5M12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowUpRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 11 11 5m0 0H6m5 0v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v7m0 0-3-3m3 3 3-3M3.5 12.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8m0-8-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function PortfolioClient() {
  const [lang, setLang] = useState<Lang>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [lens, setLens] = useState<FocusLens>('all');
  const [activeProject, setActiveProject] = useState<ProjectCaseStudy | null>(null);
  const [toast, setToast] = useState<string>('');
  const [gyroStatus, setGyroStatus] = useState<GyroStatus>('desktop');
  const gyroActionRef = useRef<(() => Promise<void>) | null>(null);
  const handleGyroStatusChange = useCallback((status: GyroStatus) => {
    setGyroStatus(status);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initial = normalizeLens(params.get('lens'));
    if (initial !== 'all') setLens(initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!activeProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [activeProject]);

  const orderedProjects = useMemo(() => selectProjectsForLens(PROJECTS, lens), [lens]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((cur) => (cur === msg ? '' : cur));
    }, 2400);
  };

  const handleSelectLens = (next: FocusLens) => {
    setLens(next);
    const url = new URL(window.location.href);
    if (next === 'all') {
      url.searchParams.delete('lens');
    } else {
      url.searchParams.set('lens', next);
    }
    window.history.replaceState({}, '', url.toString());
  };

  const safeCopy = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(label);
        return;
      }
    } catch {
      // Fallback below
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast(label);
    } catch {
      showToast(text);
    }
  };

  const handleCardPointerMove = (e: MouseEvent<HTMLButtonElement>) => {
    const inner = e.currentTarget.firstElementChild as HTMLElement | null;
    if (!inner) return;
    const rect = inner.getBoundingClientRect();
    inner.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    inner.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div className={styles.page}>
      {/* Sticky Minimal Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.brand}>
            <svg className={styles.brandIcon} width="15" height="15" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M32 8v48M8 32h48M15 15l34 34M15 49l34-34"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="square"
              />
            </svg>
            <span className={styles.mono}>{PROFILE.brand}</span>
          </a>

          <nav className={styles.navLinks} aria-label="Primary">
            <a href="#work">{lang === 'en' ? 'Work' : 'ผลงาน'}</a>
            <a href="#experience">{lang === 'en' ? 'Experience' : 'ประสบการณ์'}</a>
            <a href="#stack">{lang === 'en' ? 'Stack' : 'เทคโนโลยี'}</a>
            <a href="#contact">{lang === 'en' ? 'Contact' : 'ติดต่อ'}</a>
          </nav>

          <div className={styles.headerControls}>
            <button
              type="button"
              className={`${styles.ghostBtn} ${styles.mono}`}
              onClick={() => setLang((l) => (l === 'en' ? 'th' : 'en'))}
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'TH' : 'EN'}
            </button>
            <button
              type="button"
              className={`${styles.ghostBtn} ${styles.mono}`}
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 'LIGHT' : 'DARK'}
            </button>
            <a href={PROFILE.cvUrl} download className={styles.primaryBtn}>
              <span>{lang === 'en' ? 'CV (PDF)' : 'ดาวน์โหลด CV'}</span>
              <IconDownload />
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero: Editorial Thesis + Live 3D Architectural Lattice */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div>
                <div className={`${styles.statusPill} ${styles.mono} ${styles.arrive1}`}>
                  <span className={styles.statusDot} />
                  <span>{PROFILE.availability[lang]}</span>
                </div>

                <div className={`${styles.heroIdentity} ${styles.arrive1}`}>
                  {PROFILE.nameEN} ({PROFILE.nameTH}) · {PROFILE.location[lang]}
                </div>

                <h1 className={`${styles.heroTitle} ${styles.arrive2}`}>{PROFILE.heroTitle[lang]}</h1>
                <p className={`${styles.heroSub} ${styles.arrive3}`}>{PROFILE.heroSubtitle[lang]}</p>

                <div className={`${styles.ctaRow} ${styles.arrive4}`}>
                  <a href={PROFILE.cvUrl} download className={styles.primaryBtn}>
                    <span>{lang === 'en' ? 'Download CV (PDF)' : 'ดาวน์โหลดเรซูเม่ (PDF)'}</span>
                    <IconDownload />
                  </a>
                  <button
                    type="button"
                    className={styles.ghostBtn}
                    onClick={() => void safeCopy(PROFILE.emailPrimary, `Copied ${PROFILE.emailPrimary}`)}
                  >
                    {lang === 'en' ? 'Copy Email' : 'คัดลอกอีเมล'}
                  </button>
                  <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className={styles.ghostBtn}>
                    <span>GitHub</span>
                    <IconArrowUpRight />
                  </a>
                  <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer" className={styles.ghostBtn}>
                    <span>LinkedIn</span>
                    <IconArrowUpRight />
                  </a>
                </div>
              </div>

              {/* Authored Focal Moment: Interactive 3D Systems Lattice */}
              <div className={`${styles.schematicStage} ${styles.arrive3}`}>
                <div className={`${styles.schematicHeader} ${styles.mono}`}>
                  <span>SYSTEMS TOPOLOGY · LIVE</span>
                  {gyroStatus === 'prompt' ? (
                    <button
                      type="button"
                      className={`${styles.gyroChip} ${styles.mono}`}
                      onClick={() => void gyroActionRef.current?.()}
                    >
                      {lang === 'en' ? 'ENABLE TILT GYRO' : 'เปิดไจโรเอียงจอ'}
                    </button>
                  ) : gyroStatus === 'active' ? (
                    <button
                      type="button"
                      className={`${styles.gyroChip} ${styles.gyroChipActive} ${styles.mono}`}
                      onClick={() => void gyroActionRef.current?.()}
                      title="Tap to recenter gyroscope baseline"
                    >
                      <span className={styles.gyroDot} aria-hidden="true" />
                      <span>{lang === 'en' ? 'GYRO LIVE · RECENTER' : 'ไจโรทำงาน · รีเซ็ตมุม'}</span>
                    </button>
                  ) : gyroStatus === 'touch' ? (
                    <span>{lang === 'en' ? 'DRAG TO ORBIT' : 'ลากเพื่อหมุน 3D'}</span>
                  ) : (
                    <span>MOVE CURSOR TO ORBIT</span>
                  )}
                </div>
                <div className={styles.schematicCanvasWrap}>
                  <HeroSchematicCanvas
                    theme={theme}
                    onGyroStatusChange={handleGyroStatusChange}
                    gyroActionRef={gyroActionRef}
                  />
                </div>
                <div className={`${styles.schematicFooter} ${styles.mono}`}>
                  <span>ON-DEVICE · 0 CLOUD</span>
                  <span>CMU CAMT · MMIT</span>
                </div>
              </div>
            </div>

            <div className={`${styles.metricsGrid} ${styles.arrive4}`}>
              {PROFILE.metrics.map((m) => (
                <div key={m.value} className={styles.metricCard}>
                  <div className={`${styles.metricVal} ${styles.mono}`}>{m.value}</div>
                  <div className={styles.metricLabel}>{m.label[lang]}</div>
                  <div className={`${styles.metricDetail} ${styles.mono}`}>{m.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Flagship Engineering Work + Focus Lens */}
        <section id="work" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {lang === 'en' ? 'Systems & Architecture Case Studies' : 'กรณีศึกษาสถาปัตยกรรมและระบบที่สร้างจริง'}
              </h2>
              <div className={`${styles.sectionHint} ${styles.mono}`}>
                {lang === 'en' ? 'Select any system to inspect full architecture' : 'คลิกการ์ดเพื่อดูรายละเอียดสถาปัตยกรรม'}
              </div>
            </div>

            <div className={styles.lensBar} role="tablist" aria-label="Domain filter">
              {LENS_ORDER.map((key) => {
                const cfg = LENS_CONFIG[key];
                const active = lens === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`${styles.lensBtn} ${active ? styles.lensBtnActive : ''}`}
                    onClick={() => handleSelectLens(key)}
                  >
                    <span>{cfg.label[lang]}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.lensBanner}>
              <span>{LENS_CONFIG[lens].banner[lang]}</span>
              <span className={styles.mono} style={{ fontSize: 10.5, color: 'var(--text-subtle)' }}>
                {LENS_CONFIG[lens].audience}
              </span>
            </div>

            <div className={styles.projectsGrid} key={lens}>
              {orderedProjects.map((project, idx) => (
                <button
                  key={project.id}
                  type="button"
                  className={styles.projectCard}
                  style={{ animationDelay: `${Math.min(idx * 45, 220)}ms` }}
                  onMouseMove={handleCardPointerMove}
                  onClick={() => setActiveProject(project)}
                >
                  <div className={styles.projectInner}>
                    <div>
                      <div className={styles.projectCardTop}>
                        <span className={`${styles.projectIndex} ${styles.mono}`}>
                          {String(idx + 1).padStart(2, '0')} · {project.category[lang]}
                        </span>
                        <span className={`${styles.metricPill} ${styles.mono}`}>{project.metricBadge}</span>
                      </div>

                      <h3 className={styles.projectName}>{project.name}</h3>
                      <p className={styles.projectTagline}>{project.tagline[lang]}</p>

                      <div className={styles.diagramPreview}>
                        <ArchitectureDiagram id={project.id} />
                      </div>
                    </div>

                    <div className={styles.projectFooter}>
                      <div className={styles.tagList}>
                        {project.stack.slice(0, 4).map((tech) => (
                          <span key={tech} className={`${styles.tag} ${styles.mono}`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className={`${styles.inspectLabel} ${styles.mono}`}>
                        <span>{lang === 'en' ? 'Inspect' : 'ดูรายละเอียด'}</span>
                        <IconArrowRight className={styles.inspectArrow} />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education */}
        <section id="experience" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {lang === 'en' ? 'Experience & Education' : 'ประสบการณ์ทำงานและการศึกษา'}
              </h2>
            </div>

            <div className={styles.twoCol}>
              <div className={styles.timeline}>
                {EXPERIENCES.map((exp) => (
                  <article key={exp.id} className={styles.expCard}>
                    <div className={styles.expHeader}>
                      <div className={styles.expRole}>{exp.role[lang]}</div>
                      <span className={`${styles.expPeriod} ${styles.mono}`}>{exp.period}</span>
                    </div>
                    <div className={styles.expOrg}>
                      {exp.org} · {exp.location}
                    </div>
                    <ul className={styles.bulletList}>
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h[lang]}</li>
                      ))}
                    </ul>
                    <div className={styles.tagList} style={{ marginTop: 14 }}>
                      {exp.tags.map((t) => (
                        <span key={t} className={`${styles.tag} ${styles.mono}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <aside className={styles.eduCard}>
                <div style={{ fontSize: 16.5, fontWeight: 600, lineHeight: 1.35 }}>{EDUCATION.degree[lang]}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{EDUCATION.school}</div>
                <div className={styles.mono} style={{ fontSize: 11.5, color: 'var(--text)' }}>
                  {EDUCATION.period} · <strong>{EDUCATION.gpa}</strong>
                </div>

                <div className={styles.wilBox}>
                  <div className={styles.mono} style={{ fontSize: 10, color: 'var(--emerald)', marginBottom: 4 }}>
                    CO-OP / INTERNSHIP AVAILABILITY
                  </div>
                  {EDUCATION.wil[lang]}
                </div>

                <div>
                  <div className={styles.mono} style={{ fontSize: 10, color: 'var(--text-subtle)', marginBottom: 8, letterSpacing: '0.07em' }}>
                    {lang === 'en' ? 'RELEVANT COURSEWORK' : 'รายวิชาที่เกี่ยวข้อง'}
                  </div>
                  <div className={styles.tagList}>
                    {EDUCATION.coursework.map((c) => (
                      <span key={c} className={`${styles.tag} ${styles.mono}`}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className={styles.mono} style={{ fontSize: 10, color: 'var(--text-subtle)', marginBottom: 8, letterSpacing: '0.07em' }}>
                    {lang === 'en' ? 'SPOKEN LANGUAGES (TH · EN · KR)' : 'ภาษาที่สื่อสารได้ (ไทย · อังกฤษ · เกาหลี)'}
                  </div>
                  <div className={styles.tagList}>
                    {EDUCATION.spokenLanguages.map((sp) => (
                      <span key={sp.en} className={`${styles.tag} ${styles.mono}`}>
                        {sp[lang]}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Engineering Stack Matrix */}
        <section id="stack" className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {lang === 'en' ? 'Engineering Stack' : 'เทคโนโลยีและเครื่องมือที่ใช้จริง'}
              </h2>
            </div>

            <div className={styles.stackGrid}>
              {STACK_GROUPS.map((grp) => (
                <div key={grp.title.en} className={styles.stackCard}>
                  <div className={`${styles.stackTitle} ${styles.mono}`}>{grp.title[lang]}</div>
                  <ul className={styles.stackList}>
                    {grp.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={styles.section} style={{ borderBottom: 'none' }}>
          <div className={styles.container}>
            <div className={styles.contactCard}>
              <div>
                <h2 className={styles.sectionTitle}>
                  {lang === 'en'
                    ? 'Available for a 10-month engineering internship (Jun 2027 – Mar 2028).'
                    : 'พร้อมเข้าร่วมทีมฝึกงานวิศวกรรมเต็มเวลา 10 เดือน (มิ.ย. 2570 – มี.ค. 2571)'}
                </h2>
                <p style={{ margin: '10px 0 0', fontSize: 14, color: 'var(--text-muted)', maxWidth: '64ch' }}>
                  {lang === 'en'
                    ? 'Open to Full-Stack, On-Device / Applied AI, and Data Systems teams in Bangkok or hybrid/remote.'
                    : 'สนใจตำแหน่ง Full-Stack, On-Device / Applied AI และ Data Systems ในกรุงเทพฯ หรือแบบ Hybrid'}
                </p>
              </div>

              <div className={styles.ctaRow} style={{ marginTop: 0 }}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => void safeCopy(PROFILE.emailPrimary, `Copied ${PROFILE.emailPrimary}`)}
                >
                  {PROFILE.emailPrimary} (Copy)
                </button>
                <button
                  type="button"
                  className={styles.ghostBtn}
                  onClick={() => void safeCopy(PROFILE.emailUniversity, `Copied ${PROFILE.emailUniversity}`)}
                >
                  {PROFILE.emailUniversity}
                </button>
                <a href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`} className={styles.ghostBtn}>
                  {PROFILE.phone}
                </a>
                <a href={PROFILE.cvUrl} download className={styles.ghostBtn}>
                  <span>Download CV (PDF)</span>
                  <IconDownload />
                </a>
              </div>
            </div>

            <footer className={`${styles.footer} ${styles.mono}`}>
              <span>
                © {new Date().getFullYear()} {PROFILE.nameEN} · CMU CAMT MMIT
              </span>
              <span>
                {PROFILE.githubHandle} · {PROFILE.linkedinHandle}
              </span>
            </footer>
          </div>
        </section>
      </main>

      {/* Interactive Architecture & Case Study Drawer */}
      {activeProject && (
        <div
          className={styles.drawerBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.name}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveProject(null);
          }}
        >
          <div className={styles.drawerPanel}>
            <div className={styles.drawerTop}>
              <div>
                <div className={styles.mono} style={{ fontSize: 10.5, color: 'var(--text-subtle)' }}>
                  {activeProject.index} · {activeProject.category[lang]}
                </div>
                <h2 style={{ margin: '6px 0 0', fontSize: 21, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                  {activeProject.name}
                </h2>
              </div>
              <button
                type="button"
                className={`${styles.ghostBtn} ${styles.mono}`}
                onClick={() => setActiveProject(null)}
                aria-label="Close case study"
              >
                <span>ESC</span>
                <IconClose />
              </button>
            </div>

            <div className={styles.tagList}>
              <span className={`${styles.metricPill} ${styles.mono}`}>{activeProject.metricBadge}</span>
              {activeProject.stack.map((s) => (
                <span key={s} className={`${styles.tag} ${styles.mono}`}>
                  {s}
                </span>
              ))}
            </div>

            <div>
              <div className={`${styles.drawerBlockTitle} ${styles.mono}`}>
                {lang === 'en' ? 'SYSTEM ARCHITECTURE' : 'สถาปัตยกรรมระบบ'}
              </div>
              <div className={styles.diagramPreview} style={{ marginTop: 0 }}>
                <ArchitectureDiagram id={activeProject.id} />
              </div>
              <p className={styles.drawerBodyText} style={{ marginTop: 12 }}>
                {activeProject.architectureNote[lang]}
              </p>
            </div>

            <div>
              <div className={`${styles.drawerBlockTitle} ${styles.mono}`}>
                {lang === 'en' ? 'PROBLEM & CONSTRAINT' : 'โจทย์และข้อจำกัด'}
              </div>
              <p className={styles.drawerBodyText}>{activeProject.problem[lang]}</p>
            </div>

            <div>
              <div className={`${styles.drawerBlockTitle} ${styles.mono}`}>
                {lang === 'en' ? 'KEY ENGINEERING DECISIONS' : 'การตัดสินใจเชิงวิศวกรรมที่สำคัญ'}
              </div>
              <ul className={styles.bulletList} style={{ marginTop: 0 }}>
                {activeProject.decisions.map((d, i) => (
                  <li key={i}>{d[lang]}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className={`${styles.drawerBlockTitle} ${styles.mono}`}>
                {lang === 'en' ? 'VERIFIED OUTCOME' : 'ผลลัพธ์ที่ตรวจสอบได้'}
              </div>
              <p className={styles.drawerBodyText}>{activeProject.impact[lang]}</p>
            </div>

            <div className={styles.ctaRow} style={{ marginTop: 4 }}>
              {activeProject.repoUrl && (
                <a href={activeProject.repoUrl} target="_blank" rel="noreferrer" className={styles.primaryBtn}>
                  <span>View Source on GitHub</span>
                  <IconArrowUpRight />
                </a>
              )}
              <a href={PROFILE.cvUrl} download className={styles.ghostBtn}>
                <span>Download CV (PDF)</span>
                <IconDownload />
              </a>
            </div>
          </div>
        </div>
      )}

      {toast && <div className={`${styles.toast} ${styles.mono}`}>{toast}</div>}
    </div>
  );
}
