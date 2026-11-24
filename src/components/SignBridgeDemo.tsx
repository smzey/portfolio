'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/portfolio';
import type { Sample } from '@/lib/signbridge/cnn';
import { createSignBridgeClient, withTimeout, type SignBridgeClient, type TimedPrediction } from '@/lib/signbridge/client';
import { SIGNBRIDGE_COPY as C, formatSampleStat, summarizeSamples } from '@/lib/signbridge/copy';
import SignBridgeWebcam from './SignBridgeWebcam';
import styles from './SignBridgeDemo.module.css';

type Status = 'idle' | 'loading' | 'ready' | 'error';

function sampleToDataUrl(px: number[]): string {
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

export default function SignBridgeDemo({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [samples, setSamples] = useState<(Sample & { src: string })[]>([]);
  const [preds, setPreds] = useState<TimedPrediction[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [mode, setMode] = useState<'samples' | 'webcam'>('samples');
  const backToSamples = useCallback(() => setMode('samples'), []);
  const clientRef = useRef<SignBridgeClient | null>(null);

  const start = useCallback(async () => {
    setStatus('loading');
    try {
      clientRef.current ??= createSignBridgeClient();
      const client = clientRef.current;
      const [, res] = await Promise.all([client.load(), withTimeout(fetch('/signbridge/samples.json'), 15000)]);
      if (!res.ok) throw new Error(`samples HTTP ${res.status}`);
      const raw = (await res.json()) as Sample[];
      const results: TimedPrediction[] = [];
      for (const s of raw) results.push(await client.predict(Float32Array.from(s.px, (v) => v / 255)));
      setSamples(raw.map((s) => ({ ...s, src: sampleToDataUrl(s.px) })));
      setPreds(results);
      setStatus('ready');
    } catch {
      clientRef.current?.dispose();
      clientRef.current = null;
      setStatus('error');
    }
  }, []);

  useEffect(() => () => clientRef.current?.dispose(), []);

  const handleOpen = () => {
    setOpen(true);
    if (status === 'idle' || status === 'error') void start();
  };

  const summary = summarizeSamples(samples.map((s, i) => ({ label: s.label, letter: preds[i]?.letter ?? '' })));
  const sel = selected !== null ? { s: samples[selected], p: preds[selected] } : null;

  if (!open) {
    return (
      <div className={styles.collapsed}>
        <button type="button" className={styles.tryBtn} onClick={handleOpen}>
          <span className={styles.liveDot} aria-hidden="true" />
          {C.tryLive[lang]}
        </button>
        <span className={styles.note}>{C.runsInBrowser[lang]}</span>
      </div>
    );
  }

  return (
    <section className={styles.panel} aria-label={`SignBridge — ${C.tryLive[lang]}`}>
      <div className={styles.head}>
        <div>
          <div className={styles.tabs} role="tablist">
            <button type="button" role="tab" className={styles.tab} aria-selected={mode === 'samples'} onClick={() => setMode('samples')}>
              {C.samplesMode[lang]}
            </button>
            <button
              type="button"
              role="tab"
              className={styles.tab}
              aria-selected={mode === 'webcam'}
              disabled={status !== 'ready'}
              onClick={() => setMode('webcam')}
            >
              {C.webcamMode[lang]}
            </button>
          </div>
          <div className={styles.note}>{C.runsInBrowser[lang]}</div>
        </div>
        <button
          type="button"
          className={styles.ghost}
          onClick={() => {
            setMode('samples');
            setOpen(false);
          }}
        >
          {C.close[lang]}
        </button>
      </div>

      {status === 'loading' && (
        <p className={styles.status} role="status">
          {C.loading[lang]}
        </p>
      )}
      {status === 'error' && (
        <p className={styles.status} role="alert">
          {C.loadFailed[lang]}{' '}
          <button type="button" className={styles.ghost} onClick={() => void start()}>
            {C.retry[lang]}
          </button>
        </p>
      )}

      {status === 'ready' && mode === 'webcam' && clientRef.current && (
        <SignBridgeWebcam client={clientRef.current} lang={lang} onLeaveView={backToSamples} />
      )}

      {status === 'ready' && mode === 'samples' && (
        <>
          <p className={styles.stat}>{formatSampleStat(summary, lang)}</p>
          <div className={styles.result} aria-live="polite">
            {sel ? (
              <>
                <span className={`${styles.bigLetter} ${sel.p.letter === sel.s.label ? '' : styles.bigMiss}`}>
                  {sel.p.letter}
                </span>
                <span className={styles.resultMeta}>
                  {C.predicted[lang]} · {(sel.p.conf * 100).toFixed(1)}% {C.confidence[lang]} · {sel.p.ms.toFixed(1)} ms
                  <br />
                  {C.trueLabel[lang]}: <strong>{sel.s.label}</strong> ·{' '}
                  {sel.p.letter === sel.s.label ? C.correctLabel[lang] : C.missLabel[lang].replace('{x}', sel.p.letter)}
                </span>
              </>
            ) : (
              <span className={styles.note}>{C.sampleHint[lang]}</span>
            )}
          </div>
          <div className={styles.grid}>
            {samples.map((s, i) => {
              const miss = preds[i]?.letter !== s.label;
              return (
                <button
                  key={i}
                  type="button"
                  className={`${styles.thumb} ${miss ? styles.thumbMiss : ''} ${selected === i ? styles.thumbSel : ''}`}
                  onClick={() => setSelected(i)}
                  aria-label={`${s.label}${miss ? ` — ${C.missLabel[lang].replace('{x}', preds[i]?.letter ?? '?')}` : ''}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.src} alt="" width={28} height={28} />
                  <span className={styles.thumbLabel}>{s.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
