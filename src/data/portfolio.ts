import type { FocusLens } from '../lib/lens';

export type Lang = 'en' | 'th';

export interface BilingualText {
  en: string;
  th: string;
}

export interface ProjectVideo {
  mp4: string; // public path, e.g. /videos/khaidee-v2.mp4 (H.264, ≤ 2 MB)
  webm: string; // ≤ 2 MB
  poster: string; // JPG shown before play / under reduced motion
  caption: BilingualText;
}

/** One printed passbook line: the proof figure, the condition it was measured under, and cloud use. */
export interface LedgerLine {
  figure: string;
  condition: BilingualText;
  /** '0' = verified zero cloud calls; 'cloud' = uses a cloud API; 'n/a' = server/web app, no on-device claim. */
  cloud: '0' | 'cloud' | 'n/a';
}

export interface ProjectCaseStudy {
  id: 'jaidee' | 'signbridge' | 'khaidee-v2' | 'farmhouse' | 'cockpit' | 'anya';
  index: string;
  name: string;
  tagline: BilingualText;
  metricBadge: string;
  ledger: LedgerLine;
  category: BilingualText;
  lensRank: Record<FocusLens, number>;
  featuredIn: FocusLens[];
  stack: string[];
  repoUrl?: string;
  liveNote?: string;
  video?: ProjectVideo;
  summary: BilingualText;
  problem: BilingualText;
  architectureNote: BilingualText;
  decisions: BilingualText[];
  impact: BilingualText;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: BilingualText;
  org: string;
  location: string;
  highlights: BilingualText[];
  tags: string[];
}

export const CODE_ON_REQUEST: BilingualText = {
  en: 'Code available on request',
  th: 'ขอดูซอร์สโค้ดได้ทางอีเมล',
};

export const PROFILE = {
  nameEN: 'Phanu Sawet',
  nameTH: 'ภาณุ สาเวศ',
  brand: 'phanu.xyz',
  emailPrimary: 'switzersawet@gmail.com',
  emailUniversity: 'phanu_sawet@cmu.ac.th',
  githubUrl: 'https://github.com/smzey',
  githubHandle: 'github.com/smzey',
  linkedinUrl: 'https://linkedin.com/in/phanu-sawet',
  linkedinHandle: 'linkedin.com/in/phanu-sawet',
  cvUrl: '/Phanu_Sawet_CV.pdf',
  location: {
    en: 'Chiang Mai, Thailand · Open to Bangkok relocation',
    th: 'เชียงใหม่, ประเทศไทย · พร้อมย้ายเข้ากรุงเทพฯ',
  },
  availability: {
    en: 'AVAILABLE FOR 10-MONTH CO-OP / INTERNSHIP · JUN 2027 – MAR 2028',
    th: 'พร้อมฝึกงานสหกิจศึกษาเต็มเวลา 10 เดือน · มิ.ย. 2570 – มี.ค. 2571',
  },
  heroTitle: {
    en: 'Full-Stack & On-Device AI Engineer.',
    th: 'วิศวกรซอฟต์แวร์ Full-Stack และ On-Device AI',
  },
  heroSubtitle: {
    en: 'Chiang Mai University (CAMT MMIT) undergraduate, Head Teaching Assistant for AIoT at CMU School of Lifelong Education, and multi-term Programming & Rapid Application TA. I design reliable full-stack systems and privacy-preserving, edge-first AI — from deterministic local-LLM guardrails and pure-JS CNN inference to 358-test TypeScript architectures.',
    th: 'นักศึกษา CAMT (MMIT) มหาวิทยาลัยเชียงใหม่, Head TA โครงการ AIoT (CMU School of Lifelong Education) และผู้ช่วยสอนวิชาเขียนโปรแกรมและ Rapid Application ต่อเนื่องหลายภาคการศึกษา เชี่ยวชาญการออกแบบระบบ Full-Stack ที่เสถียรและ On-Device AI ตั้งแต่ Local-LLM แยกชั้นความปลอดภัย, CNN รันในเบราว์เซอร์แบบไม่พึ่งคลาวด์ ไปจนถึงระบบ TypeScript ทดสอบอัตโนมัติ 358 เคส',
  },
  metrics: [
    {
      value: '3.56',
      label: { en: 'Major GPA (Cum. 3.42)', th: 'GPA วิชาเอก (สะสม 3.42)' },
      detail: 'CMU CAMT · MMIT',
    },
    {
      value: '6 Cohorts',
      label: { en: 'Head TA (AIoT) & CMU TA', th: 'Head TA (AIoT) และ TA มช.' },
      detail: 'AIoT Gen 1–3 · Rapid App · Prog 1–2',
    },
    {
      value: '358',
      label: { en: 'Automated Tests', th: 'ชุดทดสอบอัตโนมัติ' },
      detail: '172 Domain + 186 API',
    },
    {
      value: '94.8%',
      label: { en: 'Edge CNN Accuracy', th: 'ความแม่นยำ Edge CNN' },
      detail: '0 Cloud Calls · Pure JS',
    },
  ],
};

export const LENS_CONFIG: Record<
  FocusLens,
  { label: BilingualText; audience: string; banner: BilingualText }
> = {
  all: {
    label: { en: 'All Work', th: 'ผลงานทั้งหมด' },
    audience: '6 Case Studies',
    banner: {
      en: 'Showing all 6 flagship engineering projects across on-device AI, full-stack web systems, and operational optimization.',
      th: 'แสดงผลงานวิศวกรรมหลักทั้ง 6 โปรเจกต์ ครอบคลุม On-Device AI, ระบบเว็บ Full-Stack และการเพิ่มประสิทธิภาพเชิงระบบ',
    },
  },
  ai: {
    label: { en: 'Edge & On-Device AI', th: 'Edge & On-Device AI' },
    audience: 'Local LLMs · Edge ML · Vision',
    banner: {
      en: 'Focused on edge & privacy-preserving AI: zero-cloud CNN forward passes, local Ollama LLM safety separation, and Vision OCR pipelines.',
      th: 'เน้นด้าน Edge และ Privacy-Preserving AI: โมเดล CNN รันบนเบราว์เซอร์แบบไม่พึ่งคลาวด์, Local LLM แยกชั้นความปลอดภัย และ Vision OCR',
    },
  },
  fintech: {
    label: { en: 'Full-Stack & Reliability', th: 'Full-Stack และความเสถียร' },
    audience: 'Tested APIs · Guardrails · SQL',
    banner: {
      en: 'Focused on reliable backend & full-stack engineering: 358-test domain-driven APIs, deterministic AI safety layers, and raw-SQL precision.',
      th: 'เน้นวิศวกรรมแบ็กเอนด์และ Full-Stack ที่เสถียร: สถาปัตยกรรมที่ผ่านการทดสอบ 358 เคส, ระบบ AI แบบ Deterministic และฐานข้อมูล SQL ที่ตรวจสอบได้',
    },
  },
  systems: {
    label: { en: 'Optimization & Systems', th: 'อัลกอริทึมและระบบ' },
    audience: 'Algorithms · Native · Sync',
    banner: {
      en: 'Focused on operational optimization & systems engineering: geo-constrained truck bin-packing across 40 centers, native macOS/PWA tooling, and live queues.',
      th: 'เน้นการเพิ่มประสิทธิภาพเชิงระบบและวิศวกรรมซอฟต์แวร์: อัลกอริทึมจัดเรียงสินค้ารถบรรทุก 40 ศูนย์กระจายสินค้า และระบบ Cross-Platform แบบเรียลไทม์',
    },
  },
};

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'jaidee',
    index: '01',
    name: 'Jaidee — Privacy-Preserving Mental-Health Screening',
    tagline: {
      en: '100% on-device local-LLM companion with deterministic PHQ-9 / GAD-7 safety scoring.',
      th: 'ระบบคัดกรองสุขภาพจิต PHQ-9 / GAD-7 ด้วย Local LLM บนเครื่อง 100% แยกชั้นคำนวณคะแนนแบบ Deterministic',
    },
    metricBadge: '0 Cloud Calls · Deterministic Guardrails',
    ledger: { figure: 'PHQ-9 · GAD-7', condition: { en: 'scored by a deterministic rule engine', th: 'ให้คะแนนด้วย Rule Engine แบบ Deterministic' }, cloud: '0' },
    category: { en: 'On-Device AI · Safety Architecture', th: 'On-Device AI · ความปลอดภัยระบบ' },
    lensRank: { all: 1, ai: 2, fintech: 2, systems: 5 },
    featuredIn: ['all', 'ai', 'fintech'],
    stack: ['Python', 'Electron', 'React', 'Ollama', 'Rule Engine'],
    summary: {
      en: 'Frontline mental-health screening platform built for people with disabilities, caregivers, and families. Runs conversation locally via Ollama while isolating clinical scoring and crisis detection inside a deterministic rule module.',
      th: 'แพลตฟอร์มคัดกรองสุขภาพจิตเบื้องต้นสำหรับผู้พิการและผู้ดูแล รันบทสนทนาด้วย Ollama บนเครื่องทั้งหมด โดยแยกการประเมินคะแนนและการตรวจจับภาวะวิกฤตไว้ใน Rule Engine แบบ Deterministic',
    },
    problem: {
      en: 'Sensitive mental-health conversations cannot be leaked to third-party cloud APIs, and letting an LLM hallucinate clinical severity scores or miss self-harm signals is unacceptable.',
      th: 'ข้อมูลสนทนาสุขภาพจิตมีความอ่อนไหวสูง ห้ามส่งออกนอกเครื่อง และไม่สามารถปล่อยให้ LLM คาดเดาคะแนนประเมินหรือพลาดสัญญาณอันตรายได้',
    },
    architectureNote: {
      en: 'Strict two-lane separation: the local Ollama LLM handles empathetic dialogue only, while a deterministic Python rule engine performs self-harm lexicon scanning, computes validated PHQ-9/GAD-7 scores, and immediately surfaces the 24/7 hotline 1323 on crisis triggers.',
      th: 'แยกการทำงานชัดเจน 2 ชั้น: Ollama ทำหน้าที่สนทนาอย่างเดียว ส่วนโมดูล Rule-Based ตรวจจับคำวิกฤต คำนวณคะแนน PHQ-9/GAD-7 ตามเกณฑ์มาตรฐาน และแสดงสายด่วน 1323 ทันทีเมื่อพบความเสี่ยง',
    },
    decisions: [
      {
        en: 'Separated conversational fluency (probabilistic LLM) from risk scoring (deterministic code) so clinical instruments remain auditable and reproducible.',
        th: 'แยกความสามารถด้านภาษาของ LLM ออกจากตรรกะให้คะแนน เพื่อให้ผลคัดกรองตรวจสอบย้อนกลับได้ 100%',
      },
      {
        en: 'Kept 100% of inference local on-device via Ollama — zero external telemetry or conversation storage outside the machine.',
        th: 'ประมวลผลทั้งหมดบนเครื่องผ่าน Ollama ไม่มีข้อมูลบทสนทนาหลุดออกไปยังคลาวด์',
      },
      {
        en: 'Refused to claim fabricated "90% AI diagnosis accuracy" — scoped explicitly as clinically grounded screening & triage.',
        th: 'ออกแบบขอบเขตชัดเจนเป็นเครื่องมือคัดกรองเบื้องต้น ไม่โอ้อวดตัวเลขความแม่นยำที่ไม่มีหลักฐาน',
      },
    ],
    impact: {
      en: 'Delivered complete offline desktop prototype with deterministic crisis routing for Thailand HealthTech / BDI Hackathon.',
      th: 'ส่งมอบต้นแบบ Desktop ออฟไลน์สมบูรณ์พร้อมระบบคัดกรองภาวะวิกฤตสำหรับงานแข่ง HealthTech / BDI Hackathon',
    },
  },
  {
    id: 'signbridge',
    index: '02',
    name: 'SignBridge — Offline ASL Fingerspelling Translator',
    tagline: {
      en: 'CNN trained to 94.8% test accuracy, exported to pure JavaScript for zero-cloud browser inference.',
      th: 'เทรนโมเดล CNN ความแม่นยำ 94.8% แล้วแปลง Weight เป็น Pure JavaScript เพื่อรันจับภาพมือเรียลไทม์บนเบราว์เซอร์',
    },
    metricBadge: '94.8% Test Acc · Pure-JS Forward Pass',
    ledger: { figure: '94.8%', condition: { en: '7,172 held-out test images', th: 'ชุดทดสอบ 7,172 ภาพ' }, cloud: '0' },
    category: { en: 'Edge ML · Computer Vision', th: 'Edge ML · คอมพิวเตอร์วิชัน' },
    lensRank: { all: 2, ai: 1, fintech: 5, systems: 4 },
    featuredIn: ['all', 'ai'],
    stack: ['Python', 'Keras (CNN)', 'MediaPipe', 'JavaScript'],
    repoUrl: 'https://github.com/smzey/hackathon-signbridge',
    summary: {
      en: 'Real-time American Sign Language fingerspelling translator running entirely inside a standard web browser from webcam video — zero backend servers, zero GPU cloud cost, zero network latency.',
      th: 'ระบบแปลภาษามือ ASL แบบเรียลไทม์จากกล้องเว็บแคมที่ประมวลผลบนเบราว์เซอร์ 100% ไม่ต้องใช้เซิร์ฟเวอร์และไม่มีดีเลย์จากเครือข่าย',
    },
    problem: {
      en: 'Cloud vision APIs add round-trip latency, require constant connectivity, and break down in low-resource classroom or accessibility settings.',
      th: 'การส่งภาพขึ้นคลาวด์มีค่าหน่วงเวลาสูง ต้องพึ่งอินเทอร์เน็ตตลอดเวลา และไม่เหมาะกับการใช้งานช่วยสื่อสารแบบเรียลไทม์',
    },
    architectureNote: {
      en: 'Trained a compact convolutional neural network in Python/Keras on Sign Language MNIST (94.8% held-out accuracy), extracted the learned weights, and implemented the forward pass directly in pure JavaScript paired with MediaPipe hand landmarks.',
      th: 'เทรนโครงข่าย CNN ขนาดกะทัดรัดด้วย Python/Keras บนชุดข้อมูล Sign Language MNIST (ความแม่นยำ 94.8%) จากนั้นดึงค่าน้ำหนักออกมาเขียน Forward Pass ด้วย Pure JS ร่วมกับ MediaPipe',
    },
    decisions: [
      {
        en: 'Exported weights to a custom pure-JS forward pass instead of pulling heavy server runtimes, enabling instant offline browser execution.',
        th: 'แปลงน้ำหนักโมเดลมารัน Forward Pass ด้วย Pure JS โดยตรง ลดขนาดและทำงานแบบออฟไลน์ได้ทันที',
      },
      {
        en: 'Evaluated strictly on held-out test split (94.8%) rather than training accuracy to prevent overfitting on hand backgrounds.',
        th: 'วัดผลบนชุดทดสอบที่แยกไว้ชัดเจน (94.8%) เพื่อยืนยันความแม่นยำในการใช้งานจริง',
      },
    ],
    impact: {
      en: 'Open-sourced public repository demonstrating end-to-end ML training → model export → real-time edge inference.',
      th: 'เผยแพร่เป็นโอเพนซอร์ส แสดงศักยภาพครบวงจรตั้งแต่การเทรนโมเดล ML จนถึงการรันจริงบน Edge',
    },
  },
  {
    id: 'khaidee-v2',
    index: '03',
    name: 'KhaiDee v2 — Two-Sided QR POS & Live Vendor Queue',
    tagline: {
      en: 'Monorepo QR ordering & vendor queue platform backed by 358 automated domain and API tests.',
      th: 'ระบบสั่งอาหารผ่าน QR และจัดการคิวร้านค้าแบบ Monorepo พร้อมชุดทดสอบอัตโนมัติ 358 เคส',
    },
    metricBadge: '358 Automated Tests · Monorepo TS',
    ledger: { figure: '358 tests', condition: { en: '172 domain + 186 API', th: 'Domain 172 + API 186 เคส' }, cloud: 'n/a' },
    category: { en: 'Full-Stack · FinTech-Grade Testing', th: 'Full-Stack · วิศวกรรมซอฟต์แวร์' },
    lensRank: { all: 3, ai: 5, fintech: 1, systems: 3 },
    featuredIn: ['all', 'fintech', 'systems'],
    stack: ['TypeScript', 'Node.js', 'REST API', 'Monorepo', 'Automated Tests'],
    repoUrl: 'https://github.com/smzey/khaidee-v2',
    summary: {
      en: 'Ground-up v2 re-architecture of a street-vendor POS into a two-sided system: customers scan a stall QR code to place orders while vendors process a live synchronized order queue.',
      th: 'ออกแบบสถาปัตยกรรมใหม่จากแอปเดี่ยวสู่ระบบ 2 ฝั่ง: ลูกค้าสแกน QR สั่งอาหารหน้าร้าน ส่วนแม่ค้าจัดการคิวและสถานะออเดอร์แบบเรียลไทม์',
    },
    problem: {
      en: 'v1 coupled UI state directly to local device storage, making concurrent multi-customer ordering impossible and order state transitions fragile under rush-hour load.',
      th: 'เวอร์ชันแรกผูกข้อมูลไว้กับเครื่องเดียว ทำให้รองรับลูกค้าสั่งพร้อมกันไม่ได้และสถานะออเดอร์ผิดพลาดง่ายช่วงคนเยอะ',
    },
    architectureNote: {
      en: 'Clean workspace split between a pure `packages/domain` state machine (order lifecycle, pricing, queue invariants — 172 unit tests) and `apps/api` HTTP/persistence layer (186 integration tests).',
      th: 'แยกโครงสร้างชัดเจนระหว่าง `packages/domain` ที่คุมกฎธุรกิจและสถานะออเดอร์ (172 unit tests) กับ `apps/api` ที่จัดการ HTTP และฐานข้อมูล (186 integration tests)',
    },
    decisions: [
      {
        en: 'Isolated pure business rules inside `packages/domain` with zero framework coupling so order state transitions are provably valid.',
        th: 'แยกกฎธุรกิจไว้ใน `packages/domain` แบบไม่ผูกกับเฟรมเวิร์ก ทำให้ตรวจสอบความถูกต้องของสถานะออเดอร์ได้แม่นยำ',
      },
      {
        en: 'Covered every API contract and edge case with 186 integration tests before scaling frontend features.',
        th: 'เขียน integration tests 186 เคสคลุมทุกเส้นทาง API เพื่อลดบั๊กก่อนขยายฝั่งหน้าบ้าน',
      },
    ],
    impact: {
      en: '358 passing automated tests (172 domain + 186 API integration) demonstrating enterprise backend discipline.',
      th: 'ผ่านชุดทดสอบอัตโนมัติรวม 358 เคส (172 Domain + 186 API) สะท้อนมาตรฐานการพัฒนาซอฟต์แวร์ระดับองค์กร',
    },
  },
  {
    id: 'farmhouse',
    index: '04',
    name: 'Farmhouse — Truck-Loading Optimizer & Distribution Map',
    tagline: {
      en: 'Best-Fit-Decreasing bin packing with lat/long proximity routing across 40 distribution centers.',
      th: 'ระบบคำนวณการจัดเรียงตะกร้าขนมปังขึ้นรถ 10 ล้อ พร้อมแผนที่เส้นทาง 40 ศูนย์กระจายสินค้า',
    },
    metricBadge: '40 Centers · Best-Fit-Decreasing',
    ledger: { figure: '40 centers', condition: { en: 'best-fit-decreasing truck packing', th: 'จัดเรียงสินค้าด้วย Best-Fit-Decreasing' }, cloud: 'n/a' },
    category: { en: 'Optimization · Logistics Systems', th: 'อัลกอริทึม · ระบบโลจิสติกส์' },
    lensRank: { all: 4, ai: 6, fintech: 4, systems: 1 },
    featuredIn: ['all', 'systems'],
    stack: ['React', 'Vite', 'Leaflet', 'Bin-Packing Algorithm'],
    repoUrl: 'https://github.com/smzey/farmhouse-map-dc',
    summary: {
      en: 'Built to a real bakery distributor brief: pack bread baskets into 10-wheel trucks serving 40 distribution centers while minimizing both total trucks dispatched and wasted cargo volume.',
      th: 'พัฒนาตามโจทย์จริงของธุรกิจกระจายสินค้าเบเกอรี่: จัดเรียงตะกร้าสินค้าลงรถ 10 ล้อสำหรับ 40 ศูนย์กระจายสินค้า เพื่อลดทั้งจำนวนรถและพื้นที่ว่างเปล่า',
    },
    problem: {
      en: 'Naive volume packing minimizes truck count on paper but assigns geographically opposite drop-offs to the same truck, wasting fuel and delivery time.',
      th: 'การจัดเรียงตามปริมาตรอย่างเดียวอาจทำให้รถคันเดียวกันต้องวิ่งข้ามโซน เสียค่าน้ำมันและเวลาจัดส่งโดยไม่จำเป็น',
    },
    architectureNote: {
      en: 'Combines Best-Fit-Decreasing bin packing with a geographic lat/long proximity constraint, visualizing per-truck load utilization and route clusters interactively on a Leaflet map.',
      th: 'ผสานอัลกอริทึม Best-Fit-Decreasing เข้ากับเงื่อนไขระยะใกล้เคียงพิกัดละติจูด/ลองจิจูด พร้อมแสดงสัดส่วนการบรรทุกและกลุ่มเส้นทางบนแผนที่ Leaflet',
    },
    decisions: [
      {
        en: 'Coupled spatial proximity directly into the bin-packing heuristic so every truck stays both densely packed and geographically coherent.',
        th: 'รวมเงื่อนไขระยะทางเชิงพื้นที่เข้าในฮิวริสติกจัดเรียง ทำให้รถทุกคันเต็มพื้นที่และวิ่งในโซนเดียวกัน',
      },
      {
        en: 'Rendered interactive map layers in Leaflet so dispatch planners can inspect truck-by-truck assignments visually.',
        th: 'แสดงผลแบบโต้ตอบผ่าน Leaflet ให้ฝ่ายจัดส่งตรวจสอบการจัดสรรรถแต่ละคันได้ทันที',
      },
    ],
    impact: {
      en: 'Directly translates algorithmic optimization (bin packing + geo clustering) into measurable fleet utilization gains.',
      th: 'นำอัลกอริทึมการหาค่าเหมาะที่สุดมาแก้ปัญหาจริงด้านโลจิสติกส์และการใช้ทรัพยากรยานพาหนะ',
    },
  },
  {
    id: 'cockpit',
    index: '05',
    name: 'Cockpit — Cross-Platform Personal OS & AI Study Engine',
    tagline: {
      en: 'Native SwiftUI macOS app + Next.js 16 PWA synced via Private Gist, MCP, and Gemini / Whisper audio.',
      th: 'แอป Native macOS (SwiftUI) + Mobile PWA (Next.js 16) เชื่อมต่อ Obsidian, Mango Canvas API และสรุปเสียงเลกเชอร์ด้วย AI',
    },
    metricBadge: 'SwiftUI + Next.js 16 · Bi-Directional Sync',
    ledger: { figure: 'macOS + PWA', condition: { en: 'two-way sync, one codebase per platform', th: 'ซิงก์สองทางระหว่าง macOS และ PWA' }, cloud: 'cloud' },
    category: { en: 'Systems Engineering · Cross-Platform', th: 'วิศวกรรมระบบ · Cross-Platform' },
    lensRank: { all: 5, ai: 4, fintech: 3, systems: 2 },
    featuredIn: ['all', 'systems', 'fintech', 'ai'],
    stack: ['SwiftUI', 'Next.js 16', 'TypeScript', 'Node.js', 'MCP', 'Gemini / Whisper'],
    summary: {
      en: 'End-to-end productivity OS uniting a native Apple Silicon SwiftUI desktop app (~8,200 LOC), a deployed mobile PWA, bi-directional Obsidian Vault sync, Canvas LMS pre-flight submission verifier, and multi-part lecture recording + Gemini/Whisper digestion.',
      th: 'ระบบจัดการงานและเรียนครบวงจร เชื่อมแอป macOS SwiftUI กว่า 8,200 บรรทัด เข้ากับ Mobile PWA, ซิงก์ Obsidian สองทาง, ตรวจสอบและส่งงาน Mango Canvas ผ่าน API และอัดเสียงเลกเชอร์สรุปด้วย Gemini/Whisper',
    },
    problem: {
      en: 'Academic schedules, LMS deadlines, Obsidian Markdown notes, and recorded lectures were fragmented across disconnected apps with no offline-first mobile sync.',
      th: 'ตารางเรียน เดดไลน์ Canvas โน้ต Obsidian และไฟล์อัดเสียงกระจัดกระจายอยู่หลายแอปและไม่ซิงก์กันบนมือถือ',
    },
    architectureNote: {
      en: 'Native macOS SwiftUI client talks to local Node bridges (Cloud Sync, Google Calendar, Canvas 3-step file upload API, FFmpeg + Gemini Flash / local Whisper fallback), syncing deterministically with a Vercel-hosted Next.js PWA via Private GitHub Gist.',
      th: 'แอป SwiftUI สื่อสารผ่าน Node Bridges (Cloud Sync, Calendar, Canvas 3-Step Upload API, FFmpeg + Gemini Flash / Whisper) และซิงก์สถานะกับ Next.js PWA บน Vercel ผ่าน Private Gist',
    },
    decisions: [
      {
        en: 'Built resilient audio pipeline: uploads merged lecture parts to Gemini Flash cascade (15–25s digest) with automatic local Apple Silicon `whisper-cli` fallback when offline.',
        th: 'ออกแบบท่อประมวลผลเสียงที่ยืดหยุ่น: ใช้ Gemini Flash เป็นหลัก (15–25 วินาที) และสลับเป็น Whisper ออฟไลน์อัตโนมัติเมื่อไม่มีเน็ต',
      },
      {
        en: 'Added pre-flight `.xlsx` ZIP/XML workbook inspector before Canvas API submission to verify formulas, charts, and student ID naming.',
        th: 'สร้างตัวตรวจสอบไฟล์ `.xlsx` อัตโนมัติก่อนส่งเข้า Canvas API เพื่อเช็กสูตร กราฟ และรหัสนักศึกษาในชื่อไฟล์',
      },
    ],
    impact: {
      en: 'Used daily in production across macOS and iOS PWA; showcases full vertical ownership from native UI to APIs and AI pipelines.',
      th: 'ใช้งานจริงทุกวันทั้งบน macOS และมือถือ แสดงความสามารถครอบคลุมตั้งแต่ Native UI, API จนถึง AI Pipeline',
    },
  },
  {
    id: 'anya',
    index: '06',
    name: 'Anya — Thai Medicine-Label Reader for Blind Users',
    tagline: {
      en: 'Audio-and-keyboard-only Vision OCR + Thai TTS assistant reading prescription dosages aloud.',
      th: 'ผู้ช่วยอ่านฉลากยาภาษาไทยด้วย Vision OCR และเสียงสังเคราะห์ TTS สำหรับผู้พิการทางสายตา (ควบคุมด้วยเสียงและคีย์บอร์ด)',
    },
    metricBadge: 'Zero-UI Accessibility · Thai Vision OCR',
    ledger: { figure: 'Thai OCR', condition: { en: 'medicine label to speech, zero-UI', th: 'อ่านฉลากยาเป็นเสียง ไม่ต้องใช้หน้าจอ' }, cloud: 'cloud' },
    category: { en: 'Multimodal AI · Accessibility', th: 'Multimodal AI · เทคโนโลยีเพื่อการเข้าถึง' },
    lensRank: { all: 6, ai: 3, fintech: 6, systems: 6 },
    featuredIn: ['all', 'ai'],
    stack: ['Python', 'Gemini Vision', 'OCR', 'Thai TTS'],
    summary: {
      en: 'Captures Thai prescription medicine labels from a webcam, extracts structured dosage instructions using Vision OCR, and speaks clear Thai audio guidance — designed strictly for audio-and-keyboard operation with zero visual UI dependency.',
      th: 'ถ่ายภาพฉลากยาภาษาไทยจากเว็บแคม สกัดข้อความและขนาดยาด้วย Vision OCR แล้วอ่านออกเสียงภาษาไทยชัดเจน ออกแบบให้ใช้งานผ่านคีย์บอร์ดและเสียงโดยไม่ต้องพึ่งหน้าจอ',
    },
    problem: {
      en: 'Blind and low-vision patients face daily medication errors because Thai pharmacy labels are printed in small text with no tactile dosage markings.',
      th: 'ผู้พิการทางสายตามีความเสี่ยงกินยาผิดขนาดเพราะฉลากยาภาษาไทยตัวเล็กและไม่มีอักษรเบรลล์บอกวิธีใช้',
    },
    architectureNote: {
      en: 'Keyboard trigger captures webcam frame → Gemini Vision extracts drug name, dosage frequency, and warnings in Thai → Thai TTS engine reads structured spoken instructions immediately.',
      th: 'กดคีย์ลัดจับภาพจากกล้อง → Gemini Vision สกัดชื่อยา ปริมาณ และคำเตือน → ระบบ TTS อ่านคำแนะนำเป็นภาษาไทยทันที',
    },
    decisions: [
      {
        en: 'Eliminated screen-based controls entirely — every action maps to tactile keyboard triggers and immediate spoken feedback.',
        th: 'ตัดการพึ่งพาปุ่มบนหน้าจอทั้งหมด ใช้คีย์ลัดและเสียงตอบรับทุกขั้นตอนเพื่อให้ผู้พิการทางสายตาใช้ได้จริง',
      },
      {
        en: 'Structured OCR prompts to isolate critical dosage & timing fields first rather than reading cluttered raw label noise.',
        th: 'จัดโครงสร้าง Prompt ให้ดึงชื่อยาและวิธีรับประทานขึ้นมาก่อน ลดข้อมูลรบกวนบนฉลาก',
      },
    ],
    impact: {
      en: 'Demonstrates practical multimodal Thai AI engineering focused on real human safety and accessibility.',
      th: 'แสดงการประยุกต์ใช้ Multimodal AI ภาษาไทยเพื่อแก้ปัญหาความปลอดภัยในชีวิตจริง',
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'ta-aiot-lifelong',
    period: 'SEP 2026 – PRESENT',
    role: {
      en: 'Head Teaching Assistant (Gen 1) & Teaching Assistant (Gen 2–3) — AIoT Event',
      th: 'หัวหน้าผู้ช่วยสอน (รุ่น 1) และผู้ช่วยสอน (รุ่น 2–3) — โครงการ AIoT',
    },
    org: 'CMU School of Lifelong Education',
    location: 'Chiang Mai, Thailand · On-site',
    highlights: [
      {
        en: 'Served as Head Teaching Assistant for the 1st Generation cohort (Sep 2026) and continued teaching across the 2nd and 3rd Generation AIoT cohorts (Oct 2026 – Present).',
        th: 'ดำรงตำแหน่งหัวหน้าผู้ช่วยสอน (Head TA) สำหรับโครงการ AIoT รุ่นที่ 1 (ก.ย. 2569) และผู้ช่วยสอนต่อเนื่องในรุ่นที่ 2 และ 3 (ต.ค. 2569 – ปัจจุบัน)',
      },
      {
        en: 'Facilitated hands-on AIoT and edge computer-vision workshops (Python, YOLOv8 object detection, environment setup, and real-time lab troubleshooting).',
        th: 'ดูแลแล็บปฏิบัติการ AIoT และ Computer Vision (Python, YOLOv8 Object Detection, ตั้งค่าสภาพแวดล้อม และแก้ปัญหาหน้างานแบบเรียลไทม์)',
      },
    ],
    tags: ['Head TA', 'AIoT', 'YOLOv8', 'Python', 'Technical Leadership'],
  },
  {
    id: 'ta-rapid-app',
    period: 'MAY 2026 – AUG 2026',
    role: {
      en: 'Teaching Assistant — Rapid Application',
      th: 'ผู้ช่วยสอน (TA) — วิชา Rapid Application',
    },
    org: 'Chiang Mai University',
    location: 'Chiang Mai, Thailand · Remote',
    highlights: [
      {
        en: 'Supported remote Rapid Application labs across a 4-month contract, helping students architect, debug, and ship end-to-end application prototypes.',
        th: 'เป็นผู้ช่วยสอนออนไลน์ตลอด 4 เดือน แนะนำการออกแบบ ดีบัก และส่งมอบต้นแบบแอปพลิเคชันแบบครบวงจร',
      },
    ],
    tags: ['Rapid Prototyping', 'Full-Stack', 'Remote Mentoring'],
  },
  {
    id: 'ta-cmu-prog',
    period: 'JUN 2025 – MAR 2026',
    role: {
      en: 'Teaching Assistant — Fundamental & Advanced Computer Programming',
      th: 'ผู้ช่วยสอน (TA) — วิชาการเขียนโปรแกรมพื้นฐานและขั้นสูง',
    },
    org: 'Chiang Mai University (CAMT)',
    location: 'Chiang Mai, Thailand · On-site',
    highlights: [
      {
        en: 'Lab TA across two consecutive semesters: Fundamental Computer Programming (Jun – Nov 2025) and Advanced Computer Programming (Nov 2025 – Mar 2026).',
        th: 'ผู้ช่วยสอนห้องปฏิบัติการต่อเนื่อง 2 ภาคการศึกษา: Fundamental (มิ.ย. – พ.ย. 2568) และ Advanced Computer Programming (พ.ย. 2568 – มี.ค. 2569)',
      },
      {
        en: 'Mentored ~32 students per section through hands-on coding labs: live debugging, tracing control-flow logic, and coaching first-time programmers 1-on-1.',
        th: 'ดูแลและสอนนักศึกษา ~32 คนต่อกลุ่ม ผ่านแล็บเขียนโค้ดจริง ช่วยดีบักโปรแกรม อธิบายตรรกะอัลกอริทึมแบบตัวต่อตัว',
      },
    ],
    tags: ['Python', 'Debugging', 'Technical Mentoring', 'Code Review'],
  },
  {
    id: 'freelance-bbm',
    period: 'NOV 2024 – FEB 2025',
    role: {
      en: 'Full Stack Engineer (Freelance)',
      th: 'วิศวกร Full-Stack (ฟรีแลนซ์)',
    },
    org: 'Baan Bai Mai Music House and Dance Co., Ltd.',
    location: 'Chiang Mai, Thailand · Hybrid',
    highlights: [
      {
        en: 'Contracted to build an internal scheduling and attendance dashboard: React frontend over an Express REST API tracking student schedules, instructor assignments, and per-subject session counts.',
        th: 'พัฒนาระบบจัดตารางเรียนและเช็กชื่อภายในด้วย React + Express REST API ติดตามตารางนักเรียน ครูผู้สอน และจำนวนชั่วโมงเรียนรายวิชา',
      },
      {
        en: 'Delivered a production LINE LIFF mini-app and companion admin panel for daily studio operations.',
        th: 'ส่งมอบ LINE LIFF Mini-App พร้อมระบบหลังบ้านสำหรับเจ้าหน้าที่ใช้งานจริง',
      },
    ],
    tags: ['React', 'Node.js', 'Express REST API', 'LINE LIFF'],
  },
  {
    id: 'mm-studio',
    period: 'JAN 2023 – PRESENT',
    role: {
      en: 'Photographer & Video Editor (Part-time)',
      th: 'ช่างภาพและตัดต่อวิดีโอ (พาร์ทไทม์)',
    },
    org: 'M&M Studio',
    location: 'Chiang Mai, Thailand · Hybrid',
    highlights: [
      {
        en: '3+ years delivering client photography and video post-production on tight turnarounds alongside university engineering coursework and teaching contracts.',
        th: 'ประสบการณ์กว่า 3 ปีในการถ่ายภาพและตัดต่อวิดีโอให้ลูกค้าภายใต้กำหนดส่งที่เข้มงวด ควบคู่กับการเรียนและงานผู้ช่วยสอน',
      },
    ],
    tags: ['Visual Production', 'Client Delivery', 'Video Editing'],
  },
];

export const EDUCATION = {
  school: 'Chiang Mai University — College of Arts, Media and Technology (CAMT)',
  degree: {
    en: 'B.Sc. in Modern Management and Information Technology (MMIT)',
    th: 'วิทยาศาสตรบัณฑิต สาขาการจัดการสมัยใหม่และเทคโนโลยีสารสนเทศ (MMIT)',
  },
  period: '2024 – 2028 (Expected)',
  gpa: 'Major GPA 3.56 · Cumulative GPA 3.42',
  wil: {
    en: 'Co-op / Full-Time Internship Window: June 2027 – March 2028 (10 Months)',
    th: 'ช่วงฝึกงานสหกิจศึกษาเต็มเวลา: มิถุนายน 2570 – มีนาคม 2571 (10 เดือน)',
  },
  coursework: [
    'Computer Programming (Basic & Advanced)',
    'Web Application Development (Laravel / SQL)',
    'Application Dev for Business Sector',
    'AIoT for Business Applications',
    'Business Data Visualization',
    'Elementary Statistics',
    'Informatics Research Methodology',
  ],
  spokenLanguages: [
    { en: 'Thai (Native)', th: 'ไทย (เจ้าของภาษา)' },
    { en: 'English', th: 'อังกฤษ' },
    { en: 'Korean', th: 'เกาหลี' },
  ],
};

export const STACK_GROUPS: { title: BilingualText; items: string[] }[] = [
  {
    title: { en: 'Languages', th: 'ภาษาโปรแกรม' },
    items: ['TypeScript', 'Python', 'JavaScript', 'Swift', 'SQL', 'PHP', 'HTML / CSS'],
  },
  {
    title: { en: 'Web & Backend', th: 'เว็บและแบ็กเอนด์' },
    items: ['React & Next.js', 'Node.js & Express', 'REST APIs', 'PostgreSQL (raw pg)', 'MySQL', 'Laravel / Blade', 'LINE LIFF'],
  },
  {
    title: { en: 'AI, ML & Data', th: 'AI, ML และข้อมูล' },
    items: ['YOLOv8', 'Keras (CNN)', 'MediaPipe', 'Local LLMs (Ollama / Qwen)', 'Gemini Vision & Audio API', 'Whisper.cpp', 'Hugging Face', 'Deterministic Guardrails'],
  },
  {
    title: { en: 'Systems & Tooling', th: 'ระบบและเครื่องมือ' },
    items: ['SwiftUI (macOS)', 'Electron', 'Docker', 'Git & GitHub', 'MCP Servers', 'Leaflet Geo-Maps', 'node --test & Supertest'],
  },
];
