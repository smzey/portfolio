import type { BilingualText } from '../../data/portfolio.ts';

export const SIGNBRIDGE_COPY = {
  tryLive: { en: 'Try it live', th: 'ลองใช้งานจริง' },
  runsInBrowser: {
    en: 'Runs entirely in your browser — no server, nothing uploaded.',
    th: 'ประมวลผลบนเบราว์เซอร์ของคุณทั้งหมด ไม่มีเซิร์ฟเวอร์ ไม่มีการอัปโหลดข้อมูล',
  },
  samplesMode: { en: 'Test images', th: 'ภาพทดสอบ' },
  webcamMode: { en: 'Use webcam', th: 'ใช้กล้องเว็บแคม' },
  sampleStat: {
    en: '43 / 48 correct on these samples · 94.8% on the full 7,172-image test set',
    th: 'ถูกต้อง 43 / 48 ภาพในชุดตัวอย่างนี้ · 94.8% บนชุดทดสอบเต็ม 7,172 ภาพ',
  },
  sampleHint: {
    en: 'Tap a hand to run the real CNN on it.',
    th: 'แตะภาพมือเพื่อรันโมเดล CNN จริงกับภาพนั้น',
  },
  missLabel: { en: 'Model got this wrong — predicted {x}', th: 'โมเดลทายผิด — ทายว่าเป็น {x}' },
  correctLabel: { en: 'Correct', th: 'ถูกต้อง' },
  trueLabel: { en: 'True letter', th: 'ตัวอักษรจริง' },
  predicted: { en: 'Predicted', th: 'ผลทำนาย' },
  confidence: { en: 'confidence', th: 'ความมั่นใจ' },
  loading: { en: 'Loading 416 KB model…', th: 'กำลังโหลดโมเดล 416 KB…' },
  retry: { en: 'Retry', th: 'ลองใหม่' },
  loadFailed: {
    en: "Couldn't load the model. Check your connection and retry.",
    th: 'โหลดโมเดลไม่สำเร็จ กรุณาตรวจสอบการเชื่อมต่อแล้วลองใหม่',
  },
  close: { en: 'Hide demo', th: 'ซ่อนเดโม' },
} satisfies Record<string, BilingualText>;

export type SignBridgeCopyKey = keyof typeof SIGNBRIDGE_COPY;

export function summarizeSamples(results: { label: string; letter: string }[]): {
  correct: number;
  total: number;
  misses: { index: number; label: string; predicted: string }[];
} {
  const misses = results.flatMap((r, index) => (r.letter === r.label ? [] : [{ index, label: r.label, predicted: r.letter }]));
  return { correct: results.length - misses.length, total: results.length, misses };
}
