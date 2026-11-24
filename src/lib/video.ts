import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { ProjectVideo } from '../data/portfolio.ts';

export const MAX_VIDEO_BYTES = 2 * 1024 * 1024;

/** Build-time/test check of a project's video assets under `publicDir`. Returns human-readable problems. */
export function checkVideoAssets(video: ProjectVideo, publicDir: string): string[] {
  const errors: string[] = [];
  for (const key of ['mp4', 'webm', 'poster'] as const) {
    const rel = video[key];
    const abs = join(publicDir, rel);
    if (!existsSync(abs)) {
      errors.push(`missing ${rel}`);
      continue;
    }
    if (key !== 'poster' && statSync(abs).size > MAX_VIDEO_BYTES) errors.push(`${rel} is over 2 MB`);
  }
  if (!video.caption.en.trim() || !video.caption.th.trim()) errors.push('caption missing en or th');
  return errors;
}
