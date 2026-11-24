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
            Chiang Mai University (CAMT MMIT) undergraduate (Major GPA 3.56), Head Teaching Assistant for AIoT at CMU School of
            Lifelong Education, and multi-term Programming &amp; Rapid Application TA. I build reliable full-stack applications and
            privacy-preserving, on-device AI systems — from deterministic local-LLM safety architectures and zero-cloud CNN/YOLOv8
            inference to 358-test TypeScript backends and native macOS tools.
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

        {/* Experience (Synced 1:1 with LinkedIn) */}
        <section className={styles.section}>
          <h2 className={styles.secTitle}>Experience</h2>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Head Teaching Assistant (Gen 1) &amp; Teaching Assistant (Gen 2–3) — AIoT Event{' '}
                <span className={styles.entryOrg}>· CMU School of Lifelong Education</span>
              </div>
              <div className={styles.entryMeta}>Sep 2026 – Present</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Led the 1st Generation AIoT cohort as <strong>Head Teaching Assistant</strong> (Sep 2026) and continued teaching the
                2nd and 3rd Generation cohorts (Oct 2026 – Present) on-site at CMU School of Lifelong Education.
              </li>
              <li>
                Facilitated hands-on AIoT and edge computer-vision labs covering Python, <strong>YOLOv8</strong> object detection,
                environment provisioning, and live troubleshooting.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Teaching Assistant — Rapid Application, Advanced &amp; Fundamental Programming{' '}
                <span className={styles.entryOrg}>· Chiang Mai University</span>
              </div>
              <div className={styles.entryMeta}>Jun 2025 – Aug 2026</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                <strong>Rapid Application (May – Aug 2026 · Remote):</strong> Supported remote lab cohorts across a 4-month
                contract, mentoring students on rapid full-stack prototyping, debugging, and end-to-end app delivery.
              </li>
              <li>
                <strong>Fundamental (Jun – Nov 2025) &amp; Advanced Computer Programming (Nov 2025 – Mar 2026 · On-site):</strong>{' '}
                Lab TA for ~32 students per section, debugging live code, tracing algorithmic logic, and coaching first-time
                programmers 1-on-1.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Full Stack Engineer (Freelance){' '}
                <span className={styles.entryOrg}>· Baan Bai Mai Music House and Dance Co., Ltd.</span>
              </div>
              <div className={styles.entryMeta}>Nov 2024 – Feb 2025</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                Built an internal scheduling and attendance platform (<strong>React</strong> frontend over an{' '}
                <strong>Express REST API</strong>) tracking student schedules, instructor assignments, and per-subject session
                counts, alongside a production <strong>LINE LIFF</strong> mini-app and companion admin panel.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Photographer &amp; Video Editor (Part-time) <span className={styles.entryOrg}>· M&amp;M Studio</span>
              </div>
              <div className={styles.entryMeta}>Jan 2023 – Present</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                3+ years delivering client photography and video post-production on tight turnarounds alongside university
                coursework and teaching contracts.
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
                Architected a two-sided ordering platform (customer QR ordering + live vendor queue) separating pure business
                invariants in <strong>packages/domain (172 unit tests)</strong> from HTTP/persistence in{' '}
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
                Built a <strong>100% on-device local-LLM</strong> companion running PHQ-9/GAD-7 screening with zero cloud egress and
                a <strong>deterministic safety boundary</strong> isolating conversation (Ollama) from rule-based self-harm scanning,
                validated scoring, and crisis hotline 1323 routing.
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
                Trained a compact CNN on Sign Language MNIST to <strong>94.8% held-out test accuracy</strong>, then exported weight
                tensors to a <strong>pure-JavaScript forward pass</strong> in the browser for real-time webcam inference with zero
                network calls.
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
                Built a native Apple Silicon <strong>macOS SwiftUI app (~8.2K LOC)</strong> paired with a{' '}
                <strong>Next.js 16 Mobile PWA</strong> synced via Private GitHub Gist and Obsidian Vault, featuring an automated
                Canvas LMS 3-step .xlsx verifier and a Gemini Flash / Whisper.cpp lecture audio digest pipeline.
              </li>
            </ul>
          </div>

          <div className={styles.entry}>
            <div className={styles.entryTop}>
              <div className={styles.entryTitle}>
                Farmhouse (Truck-Loading Optimizer) · Anya (Medicine Reader) · CAMT Grade API
              </div>
              <div className={styles.entryMeta}>React · Leaflet · Gemini Vision · Raw PostgreSQL</div>
            </div>
            <ul className={styles.bullets}>
              <li>
                <strong>Farmhouse:</strong> Best-Fit-Decreasing bin packing with lat/long proximity across{' '}
                <strong>40 distribution centers</strong>. <strong>Anya:</strong> Keyboard/audio-only Thai Vision OCR + TTS for blind
                users. <strong>Grade API:</strong> Express + raw pg PostgreSQL REST API covered by node --test and supertest.
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
            <div className={styles.skillVal}>YOLOv8, Keras (CNN), MediaPipe, Local LLMs (Ollama, Qwen), Gemini Vision/Audio API, Whisper.cpp, Hugging Face</div>
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
