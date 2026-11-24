export type FocusLens = 'all' | 'ai' | 'fintech' | 'systems';

export interface LensRanked {
  id: string;
  lensRank: Record<FocusLens, number>;
}

const ALIAS_MAP: Record<string, FocusLens> = {
  all: 'all',
  ai: 'ai',
  edge: 'ai',
  nvidia: 'ai',
  ml: 'ai',
  fintech: 'fintech',
  web: 'fintech',
  fullstack: 'fintech',
  kbtg: 'fintech',
  kasikorn: 'fintech',
  scb: 'fintech',
  scbx: 'fintech',
  systems: 'systems',
  logistics: 'systems',
  ptt: 'systems',
  iot: 'systems',
};

export function normalizeLens(raw?: string | null): FocusLens {
  if (!raw) return 'all';
  const key = raw.trim().toLowerCase();
  return ALIAS_MAP[key] ?? 'all';
}

export function selectProjectsForLens<T extends LensRanked>(projects: readonly T[], lens: FocusLens): T[] {
  return [...projects].sort((a, b) => (a.lensRank[lens] ?? 99) - (b.lensRank[lens] ?? 99));
}

export interface LedgerEntry {
  featuredIn: readonly FocusLens[];
  ledger: { opened: string };
}

/** Passbook order: entries tagged for the lens ('all' shows every entry), newest first. */
export function selectLedgerEntries<T extends LedgerEntry>(projects: readonly T[], lens: FocusLens): T[] {
  return projects
    .filter((p) => lens === 'all' || p.featuredIn.includes(lens))
    .sort((a, b) => b.ledger.opened.localeCompare(a.ledger.opened));
}
