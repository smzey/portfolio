/** Reads ?project=<id> (case-insensitive) and returns it only when it names a known project. */
export function parseProjectParam(search: string, ids: readonly string[]): string | null {
  const raw = new URLSearchParams(search).get('project');
  if (!raw) return null;
  const id = raw.trim().toLowerCase();
  return ids.includes(id) ? id : null;
}

/** Returns `href` with ?project set to `id`, or removed when `id` is null; other params are kept. */
export function withProjectParam(href: string, id: string | null): string {
  const url = new URL(href);
  if (id) url.searchParams.set('project', id);
  else url.searchParams.delete('project');
  return url.toString();
}
