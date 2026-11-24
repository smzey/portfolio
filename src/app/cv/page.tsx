'use client';

import styles from './cv.module.css';

export default function CvPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <a href="/" className={styles.toolbarBtn}>
          ← Back to Portfolio
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
          <div className={styles.headerTop}>
            <h1 className={styles.name}>PHANU SAWET</h1>
            <div className={styles.role}>Full-Stack &amp; On-Device AI Engineer</div>
          </div>

          <div className={styles.contactLine}>
            <span>Chiang Mai / Bangkok</span>
            <span className={styles.contactSep}>·</span>
            <span>+66 93 195 6230</span>
            <span className={styles.contactSep}>·</span>
            <a className={styles.contactLink} href="mailto:switzersawet@gmail.com">
              switzersawet@gmail.com
            </a>
            <span className={styles.contactSep}>·</span>
            <a className={styles.contactLink} href="https://portfolio-gamma-steel-51.vercel.app">
              portfolio-gamma-steel-51.vercel.app
            </a>
            <span className={styles.contactSep}>·</span>
            <a className={styles.contactLink} href="https://github.com/smzey">
              github.com/smzey
            </a>
            <span className={styles.contactSep}>·</span>
            <a className={styles.contactLink} href="https://linkedin.com/in/phanu-sawet">
              linkedin.com/in/phanu-sawet
            </a>
          </div>

          <p className={styles.summary}>
            Information-technology undergraduate at Chiang Mai University (Major GPA 3.56) and two-semester Computer Programming
            Teaching Assistant. I build reliable full-stack applications and privacy-preserving, on-device AI systems — from
            deterministic local-LLM safety architectures and zero-cloud CNN inference to 358-test TypeScript backends and native
            macOS tools.
          </p>
        </header>

        {/* Education */}
        <section className={styles.section}>
          <h2 className={styles.secTitle}>Education</h2>
          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Chiang Mai University — College of Arts, Media and Technology (CAMT)
              </div>
              <div className={styles.entryMeta}>2024 – 2028 (Expected)</div>
            </div>
            <div className={styles.entryTop}>
              <div className={styles.entrySub}>
                B.Sc. in Modern Management and Information Technology (MMIT) · Available for 10-Month Internship (Jun 2027 – Mar 2028)
              </div>
              <div className={styles.entryMetaStrong}>Major GPA 3.56 · Cumulative GPA 3.42</div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className={styles.section}>
          <h2 className={styles.secTitle}>Experience</h2>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Teaching Assistant — Computer Programming <span className={styles.entryOrg}>· CAMT, Chiang Mai University</span>
              </div>
              <div className={styles.entryMeta}>Aug 2025 – May 2026</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Lab TA across two consecutive semesters for <strong>Basic (954142)</strong> and{' '}
                <strong>Advanced Computer Programming</strong> — the two core programming courses in the MMIT curriculum.
              </li>
              <li>
                Supported ~32 students per section through live coding labs: debugging student programs in real time, walking
                through control-flow and algorithmic logic, and coaching first-time programmers 1-on-1.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Freelance Full-Stack Web Developer <span className={styles.entryOrg}>· Baan Bai Mai (BBM) Tutoring School</span>
              </div>
              <div className={styles.entryMeta}>2024</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Contracted to build an internal scheduling and attendance dashboard: a <strong>React</strong> frontend over an{' '}
                <strong>Express REST API</strong> tracking student schedules, teacher assignments, and per-subject session counts.
              </li>
              <li>
                Delivered a production <strong>LINE LIFF</strong> mini-app and companion admin panel for daily school operations.
              </li>
            </ul>
          </div>
        </section>

        {/* Selected Projects */}
        <section className={styles.section}>
          <h2 className={styles.secTitle}>Selected Engineering Projects</h2>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>KhaiDee v2 — Two-Sided QR POS &amp; Live Vendor Queue</div>
              <div className={styles.entryMeta}>TypeScript · Node.js · Monorepo · 358 Tests</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Architected a two-sided street-vendor ordering platform (customer QR ordering + live vendor queue) separating pure
                business invariants in <strong>packages/domain (172 unit tests)</strong> from HTTP/persistence in{' '}
                <strong>apps/api (186 integration tests)</strong>.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>Jaidee — Privacy-Preserving Mental-Health Screening</div>
              <div className={styles.entryMeta}>Python · Electron / React · Ollama</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Built a <strong>100% on-device local-LLM</strong> companion running PHQ-9 and GAD-7 screening with zero cloud data
                egress — no conversation ever leaves the machine.
              </li>
              <li>
                <strong>Deterministic safety boundary:</strong> isolated conversation (Ollama LLM) from a rule-based module that
                executes self-harm lexicon scans, computes clinically validated scores, and routes crisis triggers to hotline 1323.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>SignBridge — Offline ASL Fingerspelling Translator</div>
              <div className={styles.entryMeta}>Python · Keras (CNN) · MediaPipe · Pure JS</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Trained a compact CNN on Sign Language MNIST to <strong>94.8% held-out test accuracy</strong>, then exported
                weight tensors to run as a <strong>pure-JavaScript forward pass</strong> in the browser for real-time webcam
                recognition with zero cloud inference.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>Cockpit — Cross-Platform Personal OS &amp; AI Study Engine</div>
              <div className={styles.entryMeta}>SwiftUI · Next.js 16 · MCP · Gemini / Whisper</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Engineered a native Apple Silicon <strong>macOS SwiftUI app (~8.2K LOC)</strong> paired with a Vercel{' '}
                <strong>Next.js 16 Mobile PWA</strong> synced bi-directionally via Private GitHub Gist and Obsidian Vault.
              </li>
              <li>
                Built an automated <strong>Canvas LMS 3-step upload &amp; .xlsx pre-flight verifier</strong> alongside a multi-part
                lecture audio digest pipeline (FFmpeg + Gemini Flash cascade with local Whisper.cpp fallback).
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>Farmhouse — Truck-Loading Optimizer &amp; Distribution Map</div>
              <div className={styles.entryMeta}>React · Vite · Leaflet · Optimization</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Solved a bakery distributor brief packing bread baskets into 10-wheel trucks across <strong>40 distribution centers</strong>{' '}
                using <strong>Best-Fit-Decreasing bin packing</strong> with lat/long proximity constraints to minimize fleet count
                and empty cargo space.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>Anya (Thai Medicine-Label Reader) &amp; CAMT Grade Calculator</div>
              <div className={styles.entryMeta}>Python · Gemini Vision · Node.js · PostgreSQL</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                <strong>Anya:</strong> Audio-and-keyboard-only Vision OCR + Thai TTS reading webcam prescription dosages aloud for
                blind users. <strong>Grade API:</strong> Rebuilt an Excel tracker as an Express + raw pg PostgreSQL REST API
                covered by node --test and supertest.
              </li>
            </ul>
          </div>
        </section>

        {/* Technical Skills */}
        <section className={styles.section}>
          <h2 className={styles.secTitle}>Technical Skills</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillLabel}>Languages</div>
            <div className={styles.skillVal}>TypeScript, Python, JavaScript, Swift, SQL, PHP, HTML/CSS</div>
            <div className={styles.skillLabel}>Web &amp; Backend</div>
            <div className={styles.skillVal}>React, Next.js 16, Vite, Node.js, Express, REST APIs, PostgreSQL (raw pg), MySQL, Laravel, LINE LIFF</div>
            <div className={styles.skillLabel}>AI &amp; Data</div>
            <div className={styles.skillVal}>Keras (CNN), MediaPipe, Local LLMs (Ollama, Qwen), Gemini Vision/Audio API, Whisper.cpp, Hugging Face</div>
            <div className={styles.skillLabel}>Systems &amp; Tools</div>
            <div className={styles.skillVal}>SwiftUI, Electron, Docker, Git &amp; GitHub, MCP, Leaflet, node --test, Supertest</div>
            <div className={styles.skillLabel}>Spoken</div>
            <div className={styles.skillVal}>Thai (Native), English</div>
          </div>
        </section>
      </article>
    </div>
  );
}
