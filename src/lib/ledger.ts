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
