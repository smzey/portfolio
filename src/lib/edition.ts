import type { FocusLens } from './lens.ts';
import { parseProjectParam } from './deeplink.ts';

export type PassbookEdition =
  | 'navy'
  | 'emerald'
  | 'violet'
  | 'gold'
  | 'obsidian'
  | 'marine'
  | 'cobalt'
  | 'sky'
  | 'frost';

export const VISIBLE_EDITIONS: readonly PassbookEdition[] = [
  'navy',
  'emerald',
  'violet',
  'gold',
  'obsidian',
  'marine',
];

const EDITION_MAP: Record<string, PassbookEdition> = {
  navy: 'navy',
  default: 'navy',
  emerald: 'emerald',
  kbtg: 'emerald',
  kasikorn: 'emerald',
  kbank: 'emerald',
  violet: 'violet',
  scb: 'violet',
  scbx: 'violet',
  gold: 'gold',
  krungsri: 'gold',
  bay: 'gold',
  obsidian: 'obsidian',
  nvidia: 'obsidian',
  marine: 'marine',
  ptt: 'marine',
  cobalt: 'cobalt',
  bbl: 'cobalt',
  bangkokbank: 'cobalt',
  sky: 'sky',
  ktb: 'sky',
  krungthai: 'sky',
  frost: 'frost',
  ttb: 'frost',
  tmb: 'frost',
};

const OPEN_HASHES = new Set(['#ledger', '#history', '#contact', '#statement']);

function lookupEdition(raw?: string | null): PassbookEdition | null {
  if (!raw) return null;
  return EDITION_MAP[raw.trim().toLowerCase()] ?? null;
}

/**
 * Resolves the silent cover colorway from ?cover= (preferred) or ?lens=.
 * Generic lens slugs (ai, fintech, systems, all) stay on 'navy' so no company cover leaks.
 */
export function resolveEdition(coverParam?: string | null, lensParam?: string | null): PassbookEdition {
  const fromCover = lookupEdition(coverParam);
  if (fromCover) return fromCover;
  return lookupEdition(lensParam) ?? 'navy';
}

/** Returns true when a deep link (?project=<known>) or interior anchor should bypass the closed cover. */
export function shouldStartOpen(
  search: string,
  hash: string,
  knownProjectIds: readonly string[],
): boolean {
  if (parseProjectParam(search, knownProjectIds)) return true;
  return OPEN_HASHES.has(hash.trim().toLowerCase());
}

/** Builds a clean, company-free URL preserving the active silent cover colorway and lens. */
export function buildPassbookUrl(
  currentHref: string,
  next: { edition: PassbookEdition; lens: FocusLens; clearDeepLink?: boolean },
): string {
  const url = new URL(currentHref);
  const preserved = new URLSearchParams();
  if (next.edition !== 'navy') preserved.set('cover', next.edition);
  if (next.lens !== 'all') preserved.set('lens', next.lens);
  for (const [k, v] of url.searchParams.entries()) {
    if (k === 'cover' || k === 'lens') continue;
    if (next.clearDeepLink && k === 'project') continue;
    preserved.append(k, v);
  }
  url.search = preserved.toString();
  if (next.clearDeepLink) url.hash = '';
  return url.toString();
}
