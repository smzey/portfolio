import type { BilingualText, Lang } from '../../data/portfolio.ts';

export const SIGNBRIDGE_COPY = {
  tryLive: { en: 'Try it live', th: 'ลองใช้งานจริง' },
  runsInBrowser: {
    en: 'Runs entirely in your browser — no server, nothing uploaded.',
    th: 'ประมวลผลบนเบราว์เซอร์ของคุณทั้งหมด ไม่มีเซิร์ฟเวอร์ ไม่มีการอัปโหลดข้อมูล',
  },
  samplesMode: { en: 'Test images', th: 'ภาพทดสอบ' },
  webcamMode: { en: 'Use webcam', th: 'ใช้กล้องเว็บแคม' },
  sampleStat: {
    en: '{correct} / {total} correct on these samples · 94.8% on the full 7,172-image test set',
    th: 'ถูกต้อง {correct} / {total} ภาพในชุดตัวอย่างนี้ · 94.8% บนชุดทดสอบเต็ม 7,172 ภาพ',
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
  webcamNote: {
    en: 'Trained on Sign Language MNIST, so live accuracy is lower than on test images. Use a plain background and good light. J and Z need motion and are not supported.',
    th: 'โมเดลเทรนจาก Sign Language MNIST ความแม่นยำสดจึงต่ำกว่าภาพทดสอบ ใช้พื้นหลังเรียบและแสงสว่างเพียงพอ ไม่รองรับตัว J และ Z เพราะต้องขยับมือ',
  },
  startingCam: { en: 'Starting camera and hand tracker…', th: 'กำลังเปิดกล้องและตัวติดตามมือ…' },
  showHand: { en: 'Show one hand to the camera', th: 'ยกมือหนึ่งข้างให้กล้องเห็น' },
  tryLetters: { en: 'Easy letters to try', th: 'ตัวอักษรที่ลองง่าย' },
  denied: {
    en: 'Camera permission was denied. You can still try the test images.',
    th: 'ไม่ได้รับอนุญาตให้ใช้กล้อง ยังสามารถลองกับภาพทดสอบได้',
  },
  unavailable: {
    en: 'No camera available on this device. You can still try the test images.',
    th: 'ไม่พบกล้องบนอุปกรณ์นี้ ยังสามารถลองกับภาพทดสอบได้',
  },
  trackerFailed: {
    en: "The hand tracker couldn't load (it comes from cdn.jsdelivr.net, which some networks block). The test images still work.",
    th: 'โหลดตัวติดตามมือไม่สำเร็จ (โหลดจาก cdn.jsdelivr.net ซึ่งบางเครือข่ายบล็อก) ภาพทดสอบยังใช้งานได้',
  },
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

export function formatSampleStat(summary: { correct: number; total: number }, lang: Lang): string {
  return SIGNBRIDGE_COPY.sampleStat[lang]
    .replace('{correct}', String(summary.correct))
    .replace('{total}', String(summary.total));
}
