'use client';

import styles from './cv.module.css';

export default function CvPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <a href="/" className={styles.toolbarBtn}>
          ← Back to phanu.dev
        </a>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="/Phanu_Sawet_CV.pdf" download className={styles.toolbarBtn}>
            Download PDF
          </a>
          <button
            type="button"
            className={`${styles.toolbarBtn} ${styles.toolbarPrimary}`}
            onClick={() => window.print()}
          >
            Print / Save A4 PDF
          </button>
        </div>
      </div>

      <article className={styles.sheet}>
        {/* Header */}
        <header className={styles.header}>
          <div>
            <h1 className={styles.name}>PHANU SAWET</h1>
            <div className={styles.role}>Full-Stack &amp; On-Device AI Engineer</div>
            <p className={styles.summary}>
              Chiang Mai University (CAMT MMIT) undergraduate and two-semester Programming Teaching Assistant.
              Specializes in reliable TypeScript/Python full-stack systems and privacy-preserving, edge-first AI —
              from deterministic local-LLM safety guardrails and zero-cloud CNN inference to 358-test API architectures.
            </p>
          </div>
          <div className={`${styles.contactBlock} ${styles.mono}`}>
            <span>Chiang Mai, Thailand (Open to Bangkok)</span>
            <span>+66 93 195 6230</span>
            <a className={styles.contactLink} href="mailto:switzersawet@gmail.com">
              switzersawet@gmail.com
            </a>
            <a className={styles.contactLink} href="https://portfolio-gamma-steel-51.vercel.app">
              portfolio-gamma-steel-51.vercel.app
            </a>
            <a className={styles.contactLink} href="https://github.com/smzey">
              github.com/smzey · linkedin.com/in/phanu-sawet
            </a>
          </div>
        </header>

        {/* Engineering Proof & WIL 19 Availability Strip */}
        <section className={styles.strip}>
          <div className={styles.stripItem}>
            <span className={`${styles.stripKey} ${styles.mono}`}>WIL 19 CO-OP WINDOW</span>
            <span className={`${styles.stripVal} ${styles.mono}`}>Jun 2027 – Mar 2028 (10 Mo)</span>
          </div>
          <div className={styles.stripItem}>
            <span className={`${styles.stripKey} ${styles.mono}`}>ACADEMIC STANDING</span>
            <span className={`${styles.stripVal} ${styles.mono}`}>Major 3.56 · Cum 3.42</span>
          </div>
          <div className={styles.stripItem}>
            <span className={`${styles.stripKey} ${styles.mono}`}>TEST RIGOR</span>
            <span className={`${styles.stripVal} ${styles.mono}`}>358 Automated Tests</span>
          </div>
          <div className={styles.stripItem}>
            <span className={`${styles.stripKey} ${styles.mono}`}>EDGE ML ACCURACY</span>
            <span className={`${styles.stripVal} ${styles.mono}`}>94.8% CNN · 0 Cloud</span>
          </div>
        </section>

        {/* Education */}
        <section className={styles.section}>
          <div className={styles.secHead}>
            <h2 className={styles.secTitle}>Education</h2>
            <div className={styles.secRule} />
          </div>
          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Chiang Mai University — College of Arts, Media and Technology (CAMT)
              </div>
              <div className={`${styles.entryMeta} ${styles.mono}`}>2024 – 2028 (Expected)</div>
            </div>
            <div className={styles.entryTop}>
              <div className={styles.entryOrg} style={{ fontSize: '9px' }}>
                B.Sc. in Modern Management and Information Technology (MMIT) · 90/126 credits completed
              </div>
              <div className={`${styles.entryMeta} ${styles.mono}`} style={{ color: '#09090b', fontWeight: 600 }}>
                Major GPA 3.56 · Cumulative GPA 3.42
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className={styles.section}>
          <div className={styles.secHead}>
            <h2 className={styles.secTitle}>Experience</h2>
            <div className={styles.secRule} />
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Teaching Assistant — Computer Programming <span className={styles.entryOrg}>· CAMT, Chiang Mai University</span>
              </div>
              <div className={`${styles.entryMeta} ${styles.mono}`}>Aug 2025 – May 2026</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Lab TA across two consecutive semesters for <strong>Basic (954142)</strong> and{' '}
                <strong>Advanced Computer Programming</strong>, supporting ~32 students per section in live coding labs.
              </li>
              <li>
                Debugged student programs in real time, walked through control-flow and algorithmic logic, and coached first-time programmers 1-on-1.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Freelance Full-Stack Web Developer <span className={styles.entryOrg}>· Baan Bai Mai (BBM) Tutoring School</span>
              </div>
              <div className={`${styles.entryMeta} ${styles.mono}`}>2024</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Contracted to build an internal scheduling &amp; attendance dashboard (<strong>React</strong> frontend over{' '}
                <strong>Express REST API</strong>) tracking student schedules, teacher assignments, and per-subject session counts.
              </li>
              <li>
                Delivered a production <strong>LINE LIFF</strong> mini-app and companion admin panel for school staff operations.
              </li>
            </ul>
          </div>
        </section>

        {/* Selected Engineering Projects */}
        <section className={styles.section}>
          <div className={styles.secHead}>
            <h2 className={styles.secTitle}>Selected Engineering Projects</h2>
            <div className={styles.secRule} />
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>KhaiDee v2 — Two-Sided QR POS &amp; Live Vendor Queue</div>
              <div className={`${styles.entryMeta} ${styles.mono}`}>TypeScript · Node.js · Monorepo · 358 Tests</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Architected a two-sided street-vendor ordering platform (customer QR ordering + live vendor queue) separating pure business invariants in{' '}
                <strong>packages/domain (172 unit tests)</strong> from HTTP/persistence in <strong>apps/api (186 integration tests)</strong>.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>Jaidee — Privacy-Preserving Mental-Health Screening Platform</div>
              <div className={`${styles.entryMeta} ${styles.mono}`}>Python · Electron / React · Ollama</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Built a <strong>100% on-device local-LLM</strong> companion running PHQ-9 and GAD-7 screening with zero cloud data egress.
              </li>
              <li>
                <strong>Deterministic safety boundary:</strong> isolated conversation (Ollama LLM) from a rule-based module that runs self-harm lexicon scans, computes validated scores, and routes crisis triggers to hotline 1323.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>SignBridge — Offline ASL Fingerspelling Translator</div>
              <div className={`${styles.entryMeta} ${styles.mono}`}>Python · Keras (CNN) · MediaPipe · Pure JS</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Trained a compact CNN on Sign Language MNIST to <strong>94.8% held-out test accuracy</strong>, then exported weight tensors to run as a{' '}
                <strong>pure-JavaScript forward pass</strong> in the browser — real-time webcam inference with zero network calls.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>Cockpit — Cross-Platform Personal OS &amp; AI Study Engine</div>
              <div className={`${styles.entryMeta} ${styles.mono}`}>SwiftUI · Next.js 16 · MCP · Gemini / Whisper</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Built a native Apple Silicon <strong>macOS SwiftUI app (~8.2K LOC)</strong> paired with a Vercel <strong>Next.js 16 Mobile PWA</strong> synced bi-directionally via Private GitHub Gist and Obsidian Vault.
              </li>
              <li>
                Engineered an automated <strong>Canvas LMS 3-step upload &amp; .xlsx pre-flight verifier</strong> plus a multi-part lecture audio pipeline (FFmpeg + Gemini Flash cascade with local Apple Silicon Whisper fallback).
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>Farmhouse — Truck-Loading Optimizer &amp; Distribution Map</div>
              <div className={`${styles.entryMeta} ${styles.mono}`}>React · Vite · Leaflet · Optimization</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Solved a bakery distributor brief packing bread baskets into 10-wheel trucks across <strong>40 distribution centers</strong> using{' '}
                <strong>Best-Fit-Decreasing bin packing</strong> with lat/long proximity constraints to minimize fleet count and empty cargo space.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>Anya (Thai Medicine-Label Reader) &amp; CAMT Grade Calculator</div>
              <div className={`${styles.entryMeta} ${styles.mono}`}>Python · Gemini Vision · Node · Raw PostgreSQL</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                <strong>Anya:</strong> Audio-and-keyboard-only Vision OCR + Thai TTS reading webcam prescription dosages aloud for blind users.{' '}
                <strong>Grade API:</strong> Rebuilt Excel tracker as Express + raw <code>pg</code> PostgreSQL REST API covered by <code>node --test</code> &amp; <code>supertest</code>.
              </li>
            </ul>
          </div>
        </section>

        {/* Technical Skills */}
        <section className={styles.section}>
          <div className={styles.secHead}>
            <h2 className={styles.secTitle}>Technical Skills</h2>
            <div className={styles.secRule} />
          </div>
          <div className={styles.skillsGrid}>
            <div className={`${styles.skillLabel} ${styles.mono}`}>Languages</div>
            <div className={styles.skillVal}>TypeScript, Python, JavaScript, Swift, SQL, PHP, HTML/CSS</div>
            <div className={`${styles.skillLabel} ${styles.mono}`}>Web &amp; Backend</div>
            <div className={styles.skillVal}>React, Next.js 16, Vite, Node.js, Express, REST APIs, PostgreSQL (raw pg), MySQL, Laravel, LINE LIFF</div>
            <div className={`${styles.skillLabel} ${styles.mono}`}>AI, ML &amp; Data</div>
            <div className={styles.skillVal}>Keras (CNN), MediaPipe, Local LLMs (Ollama, Qwen), Gemini Vision/Audio API, Whisper.cpp, Hugging Face</div>
            <div className={`${styles.skillLabel} ${styles.mono}`}>Systems &amp; Spoken</div>
            <div className={styles.skillVal}>SwiftUI, Electron, Docker, Git/GitHub, MCP, Leaflet, node --test / Supertest · Spoken: Thai (Native), English</div>
          </div>
        </section>
      </article>
    </div>
  );
}
