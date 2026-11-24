// Webcam helpers for the SignBridge demo. Pure functions are unit-tested;
// loadHandTracker touches the DOM and is verified in the browser.

export const MEDIAPIPE_HANDS_VERSION = '0.4.1675469240';
const HANDS_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${MEDIAPIPE_HANDS_VERSION}/`;

export type CamState = 'idle' | 'starting' | 'live' | 'denied' | 'unavailable' | 'tracker-failed';

export interface Landmark {
  x: number;
  y: number;
}

export interface HandsResults {
  multiHandLandmarks?: Landmark[][];
}

export interface HandsInstance {
  setOptions(o: Record<string, unknown>): void;
  onResults(cb: (r: HandsResults) => void): void;
  initialize(): Promise<void>;
  send(input: { image: HTMLVideoElement }): Promise<void>;
  close(): Promise<void>;
}

export type HandsCtor = new (cfg: { locateFile: (f: string) => string }) => HandsInstance;

/** Square crop (normalized 0..1) snugly around the hand, enlarged by `margin`. Mirrors hackathon_2/public/app.js. */
export function cropBox(landmarks: Landmark[], margin: number): { cx: number; cy: number; half: number } {
  let minX = 1;
  let minY = 1;
  let maxX = 0;
  let maxY = 0;
  for (const p of landmarks) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  const ext = Math.max(maxX - minX, maxY - minY);
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2, half: (ext * (1 + margin)) / 2 };
}

/** 28×28 RGBA → Float32Array(784): luma, then per-frame contrast stretch to 0..1. */
export function toModelInput(rgba: Uint8ClampedArray): Float32Array {
  const gray = new Float32Array(784);
  let lo = 255;
  let hi = 0;
  for (let i = 0; i < 784; i++) {
    const v = 0.299 * rgba[i * 4] + 0.587 * rgba[i * 4 + 1] + 0.114 * rgba[i * 4 + 2];
    gray[i] = v;
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  const span = hi - lo;
  const out = new Float32Array(784);
  if (span === 0) return out;
  for (let i = 0; i < 784; i++) out[i] = (gray[i] - lo) / span;
  return out;
}

export function mapCameraError(err: unknown): CamState {
  const name = typeof err === 'object' && err !== null && 'name' in err ? String((err as { name: unknown }).name) : '';
  return name === 'NotAllowedError' || name === 'SecurityError' ? 'denied' : 'unavailable';
}

export interface StreamLike {
  getTracks(): { stop(): void }[];
}

export function stopStream(stream: StreamLike | null | undefined): void {
  stream?.getTracks().forEach((t) => t.stop());
}

/** Attaches `stream` to `video` unless cancelled or unmounted; stops all tracks and returns false otherwise. */
export function attachStream<V extends { srcObject: unknown }>(
  video: V | null,
  stream: StreamLike,
  cancelled: boolean,
): video is V {
  if (cancelled || !video) {
    stopStream(stream);
    return false;
  }
  (video as { srcObject: StreamLike | null }).srcObject = stream;
  return true;
}

let trackerPromise: Promise<HandsCtor> | null = null;

/** Injects the pinned MediaPipe Hands script once; rejects with 'tracker-failed' on error or timeout. */
export function loadHandTracker(timeoutMs = 8000): Promise<HandsCtor> {
  const w = window as unknown as { Hands?: HandsCtor };
  if (w.Hands) return Promise.resolve(w.Hands);
  trackerPromise ??= new Promise<HandsCtor>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `${HANDS_BASE}hands.js`;
    s.crossOrigin = 'anonymous';
    s.async = true;
    const fail = () => {
      clearTimeout(timer);
      s.remove();
      trackerPromise = null;
      reject(new Error('tracker-failed'));
    };
    const timer = setTimeout(fail, timeoutMs);
    s.onerror = fail;
    s.onload = () => {
      clearTimeout(timer);
      if (w.Hands) resolve(w.Hands);
      else fail();
    };
    document.head.appendChild(s);
  });
  return trackerPromise;
}

export function handsLocateFile(f: string): string {
  return `${HANDS_BASE}${f}`;
}
