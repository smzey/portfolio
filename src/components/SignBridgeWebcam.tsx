'use client';

import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/portfolio';
import type { SignBridgeClient, TimedPrediction } from '@/lib/signbridge/client';
import {
  cropBox,
  handsLocateFile,
  loadHandTracker,
  mapCameraError,
  toModelInput,
  type CamState,
  type HandsInstance,
} from '@/lib/signbridge/camera';
import { SIGNBRIDGE_COPY as C } from '@/lib/signbridge/copy';
import styles from './SignBridgeDemo.module.css';

const MARGIN = 0.15;
const MIN_INTERVAL_MS = 100; // ≤ 10 predictions per second
const EASY = [
  { l: 'A', en: 'Fist, thumb along the side', th: 'กำมือ นิ้วโป้งแนบข้าง' },
  { l: 'B', en: 'Flat hand, thumb folded', th: 'แบมือตรง พับนิ้วโป้ง' },
  { l: 'L', en: 'Thumb out, index up', th: 'นิ้วโป้งกาง นิ้วชี้ตั้ง' },
  { l: 'V', en: 'Peace sign', th: 'ชูสองนิ้วแยกกัน' },
  { l: 'Y', en: 'Thumb and pinky out', th: 'กางนิ้วโป้งและนิ้วก้อย' },
];

export default function SignBridgeWebcam({
  client,
  lang,
  onLeaveView,
}: {
  client: SignBridgeClient;
  lang: Lang;
  onLeaveView: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<CamState>('starting');
  const [pred, setPred] = useState<TimedPrediction | null>(null);
  const [handSeen, setHandSeen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let stream: MediaStream | null = null;
    let hands: HandsInstance | null = null;
    let raf = 0;
    let busy = false;
    let inflight = false;
    let last = 0;
    const crop = document.createElement('canvas');
    crop.width = 28;
    crop.height = 28;
    const cctx = crop.getContext('2d', { willReadFrequently: true });

    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } });
      } catch (err) {
        if (!cancelled) setState(mapCameraError(err));
        return;
      }
      if (cancelled) return stream.getTracks().forEach((t) => t.stop());
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play().catch(() => {});

      try {
        const Hands = await loadHandTracker();
        if (cancelled) return;
        hands = new Hands({ locateFile: handsLocateFile });
        hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.6, minTrackingConfidence: 0.6 });
        hands.onResults((r) => {
          const lm = r.multiHandLandmarks?.[0];
          setHandSeen(!!lm);
          if (!lm || !cctx || inflight || cancelled) return;
          const now = performance.now();
          if (now - last < MIN_INTERVAL_MS) return;
          last = now;
          const { cx, cy, half } = cropBox(lm, MARGIN);
          const W = video.videoWidth;
          const H = video.videoHeight;
          cctx.clearRect(0, 0, 28, 28);
          cctx.drawImage(video, (cx - half) * W, (cy - half) * H, half * 2 * W, half * 2 * H, 0, 0, 28, 28);
          inflight = true;
          client
            .predict(toModelInput(cctx.getImageData(0, 0, 28, 28).data))
            .then((p) => !cancelled && setPred(p))
            .catch(() => {})
            .finally(() => (inflight = false));
        });
      } catch {
        // No tracker → no use for the camera: release it now so the camera light turns off.
        stream.getTracks().forEach((t) => t.stop());
        if (!cancelled) setState('tracker-failed');
        return;
      }
      if (cancelled) return;
      setState('live');
      const loop = async () => {
        if (cancelled) return;
        if (!busy && video.readyState >= 2 && hands) {
          busy = true;
          try {
            await hands.send({ image: video });
          } catch {
            /* transient frame errors are ignored */
          }
          busy = false;
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
      void hands?.close().catch(() => {});
    };
  }, [client]);

  const failed = state === 'denied' || state === 'unavailable' || state === 'tracker-failed';

  // Camera off as soon as the video itself is scrolled out of view (not just the panel's text below it).
  useEffect(() => {
    const el = videoRef.current;
    if (!el || failed) return;
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && onLeaveView(), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [onLeaveView, failed]);
  const failMsg = state === 'denied' ? C.denied : state === 'unavailable' ? C.unavailable : C.trackerFailed;

  return (
    <div className={styles.cam}>
      {failed ? (
        <p className={styles.status} role="alert">
          {failMsg[lang]}
        </p>
      ) : (
        <>
          <div className={styles.camStage}>
            <video ref={videoRef} className={styles.video} playsInline muted aria-hidden="true" />
            <div className={styles.camOverlay} aria-live="polite">
              {state === 'starting' ? (
                <span className={styles.note}>{C.startingCam[lang]}</span>
              ) : handSeen && pred ? (
                <span className={styles.camLetter}>{pred.letter}</span>
              ) : (
                <span className={styles.note}>{C.showHand[lang]}</span>
              )}
            </div>
          </div>
          {pred && handSeen && (
            <div className={styles.bars}>
              {pred.top.map((t) => (
                <div key={t.letter} className={styles.barRow}>
                  <span className={styles.barLetter}>{t.letter}</span>
                  <span className={styles.barTrack}>
                    <span className={styles.barFill} style={{ width: `${(t.p * 100).toFixed(1)}%` }} />
                  </span>
                  <span className={styles.barPct}>{(t.p * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className={styles.easy}>
        <div className={styles.easyTitle}>{C.tryLetters[lang]}</div>
        <ul>
          {EASY.map((e) => (
            <li key={e.l}>
              <strong>{e.l}</strong> {e[lang]}
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.note}>{C.webcamNote[lang]}</p>
    </div>
  );
}
