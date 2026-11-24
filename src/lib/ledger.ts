export const MAX_PRINTED = 3;

export interface PrintedLine {
  time: string;
  truth: string;
  read: string;
  miss: boolean;
  ms: string;
  conf: string;
}

/** One printed passbook line for a live SignBridge prediction. */
export function printedLine(
  r: { label: string; letter: string; conf: number; ms: number },
  now: Date,
): PrintedLine {
  const pad = (n: number) => String(n).padStart(2, '0');
  return {
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    truth: r.label,
    read: r.letter,
    miss: r.letter !== r.label,
    ms: r.ms.toFixed(1),
    conf: (r.conf * 100).toFixed(1),
  };
}

const EN_MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const TH_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

/** 'YYYY-MM' → 'JUN 2026' (EN) or 'มิ.ย. 2569' (TH, Buddhist era). Unparseable input is returned unchanged. */
export function ledgerMonth(ym: string, lang: 'en' | 'th'): string {
  const m = /^(\d{4})-(\d{2})$/.exec(ym);
  if (!m) return ym;
  const year = Number(m[1]);
  const month = Number(m[2]) - 1;
  if (month < 0 || month > 11) return ym;
  return lang === 'th' ? `${TH_MONTHS[month]} ${year + 543}` : `${EN_MONTHS[month]} ${year}`;
}
