'use client';

import { useEffect, useRef, useState } from 'react';
import { LENS_CONFIG, type Lang, type ProjectCaseStudy } from '@/data/portfolio';
import { UI, fill } from '@/data/ui';
import type { FocusLens } from '@/lib/lens';
import { MAX_PRINTED, ledgerMonth, printedLine, type PrintedLine } from '@/lib/ledger';
import type { Sample } from '@/lib/signbridge/cnn';
import { createSignBridgeClient, type SignBridgeClient } from '@/lib/signbridge/client';
import styles from './Passbook.module.css';

const LENS_ORDER: FocusLens[] = ['all', 'ai', 'fintech', 'systems'];

type PrintState = 'idle' | 'loading' | 'ready' | 'error';

function toDataUrl(px: number[]): string {
  const c = document.createElement('canvas');
  c.width = 28;
  c.height = 28;
  const ctx = c.getContext('2d');
  if (!ctx) return '';
  const img = ctx.createImageData(28, 28);
  for (let i = 0; i < 784; i++) {
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = px[i];
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

function shortName(name: string): string {
  return name.split(' — ')[0];
}

export default function LedgerPage({
  lang,
  projects,
  lens,
  onLens,
  activeId,
  onOpen,
}: {
  lang: Lang;
  projects: ProjectCaseStudy[];
  lens: FocusLens;
  onLens: (l: FocusLens) => void;
  activeId: string | null;
  onOpen: (id: string) => void;
}) {
  const [hands, setHands] = useState<(Sample & { src: string })[]>([]);
  const [printed, setPrinted] = useState<(PrintedLine & { key: number })[]>([]);
  const [state, setState] = useState<PrintState>('idle');
  const clientRef = useRef<SignBridgeClient | null>(null);
  const keyRef = useRef(0);

  // 8 real held-out hands (24 KB). The 416 KB model itself loads only on the first tap.
  useEffect(() => {
    let cancelled = false;
    fetch('/signbridge/hero-samples.json')
      .then((r) => (r.ok ? (r.json() as Promise<Sample[]>) : Promise.reject(new Error(String(r.status)))))
      .then((list) => !cancelled && setHands(list.map((s) => ({ ...s, src: toDataUrl(s.px) }))))
      .catch(() => {});
    return () => {
      cancelled = true;
      clientRef.current?.dispose();
    };
  }, []);

  const runHand = async (s: Sample) => {
    try {
      if (!clientRef.current || state === 'error') {
        clientRef.current?.dispose();
        clientRef.current = createSignBridgeClient();
        setState('loading');
        await clientRef.current.load();
        setState('ready');
      }
      const r = await clientRef.current.predict(Float32Array.from(s.px, (v) => v / 255));
      const line = printedLine({ label: s.label, letter: r.letter, conf: r.conf, ms: r.ms }, new Date());
      keyRef.current += 1;
      const key = keyRef.current;
      setPrinted((cur) => [{ ...line, key }, ...cur].slice(0, MAX_PRINTED));
    } catch {
      clientRef.current?.dispose();
      clientRef.current = null;
      setState('error');
    }
  };

  const latest = printed[0];
  let status = '';
  if (state === 'loading') status = UI.printLoading[lang];
  else if (state === 'error') status = UI.printFailed[lang];
  else if (latest)
    status = latest.miss
      ? fill(UI.printedMiss[lang], { truth: latest.truth, read: latest.read })
      : fill(UI.printedOk[lang], { read: latest.read, conf: latest.conf, ms: latest.ms });

  return (
    <section id="ledger" className={styles.ledgerPage} aria-labelledby="ledger-title">
      <div className={styles.ledgerHead}>
        <h2 id="ledger-title" className={styles.ledgerTitle}>
          {UI.ledgerTitle[lang]}
        </h2>
        <div className={styles.lens} role="group" aria-label={UI.lensLabel[lang]}>
          <span className={styles.lensLabel}>{UI.lensLabel[lang]}</span>
          {LENS_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              className={styles.lensBtn}
              aria-pressed={lens === key}
              onClick={() => onLens(key)}
            >
              {LENS_CONFIG[key].label[lang]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.ledger}>
          <thead>
            <tr>
              <th scope="col" className={styles.colNo}>
                {UI.colNo[lang]}
              </th>
              <th scope="col">{UI.colEntry[lang]}</th>
              <th scope="col" className={styles.num}>
                {UI.colProof[lang]}
              </th>
              <th scope="col" className={styles.num}>
                {UI.colCloud[lang]}
              </th>
            </tr>
          </thead>
          <tbody>
            {printed.map((p) => (
              <tr key={p.key} className={`${styles.printed} ${p.miss ? styles.miss : ''}`}>
                <td className={`${styles.colNo} ${styles.dot}`}>{p.time}</td>
                <td className={styles.printedText}>
                  {fill(UI.printedEntry[lang], { truth: p.truth, read: p.read })}
                  {p.miss ? ` · ${UI.printedMissTag[lang]}` : ''}
                </td>
                <td className={`${styles.num} ${styles.dot} ${styles.proofFig}`}>{p.ms} ms</td>
                <td className={`${styles.num} ${styles.dot} ${styles.cloud}`}>0</td>
              </tr>
            ))}
            {projects.map((p) => (
              <tr
                key={p.id}
                className={`${styles.entry} ${activeId === p.id ? styles.active : ''}`}
                onClick={() => onOpen(p.id)}
              >
                <td className={`${styles.colNo} ${lang === 'en' ? styles.dot : ''} ${styles.entryNo}`}>{ledgerMonth(p.ledger.opened, lang)}</td>
                <td>
                  <button
                    type="button"
                    className={styles.rowBtn}
                    aria-label={fill(UI.openStatement[lang], { name: shortName(p.name) })}
                    aria-expanded={activeId === p.id}
                    aria-controls="statement"
                    data-project={p.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen(p.id);
                    }}
                  >
                    <span className={styles.entryName}>{shortName(p.name)}</span>
                    <span className={styles.entryCat}>{p.category[lang]}</span>
                  </button>
                </td>
                <td className={styles.num}>
                  <span className={`${styles.dot} ${styles.proofFig}`}>{p.ledger.figure}</span>
                  <span className={styles.proofCond}>{p.ledger.condition[lang]}</span>
                </td>
                <td className={styles.num}>
                  {p.ledger.cloud === '0' ? (
                    <span className={`${styles.dot} ${styles.cloud}`}>{UI.cloudZero[lang]}</span>
                  ) : p.ledger.cloud === 'cloud' ? (
                    <span className={styles.cloudApi}>{UI.cloudUses[lang]}</span>
                  ) : (
                    <span className={styles.cloudApi}>
                      <span aria-hidden="true">{UI.cloudNa[lang]}</span>
                      <span className="sr-only">{UI.cloudNaSr[lang]}</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.printer}>
        <h3 className={styles.printerTitle}>{UI.printTitle[lang]}</h3>
        <div className={styles.hands}>
          {hands.map((h, i) => (
            <button
              key={i}
              type="button"
              className={styles.hand}
              aria-label={fill(UI.printHand[lang], { label: h.label })}
              onClick={() => void runHand(h)}
              disabled={state === 'loading'}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={h.src} alt="" width={28} height={28} />
              <span aria-hidden="true">{h.label}</span>
            </button>
          ))}
        </div>
        <p
          className={`${styles.printStatus} ${latest?.miss && state === 'ready' ? styles.missText : ''}`}
          role="status"
        >
          {status || UI.printHint[lang]}
        </p>
        <p className={styles.honesty}>{UI.honesty[lang]}</p>
      </div>

      <div className={`${styles.stamp} ${styles.stampCorner}`} aria-hidden="true">
        {UI.verified[lang]}
      </div>
    </section>
  );
}
