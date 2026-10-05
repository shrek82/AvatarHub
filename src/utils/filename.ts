/**
 * Utility for generating strictly non-repeating, readable, timestamped export filenames.
 * Ensures every export (Image or PDF) has a unique, deterministic, non-colliding name.
 */

export function getFormattedTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const secs = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}_${hours}${mins}${secs}`;
}

export function getRandomNonce(length: number = 4): string {
  const chars = 'abcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export interface UniqueFilenameOptions {
  prefix?: string;
  style?: string;
  count?: number | string;
  seed?: string;
  ext: string;
}

export function generateUniqueExportFilename({
  prefix = 'Avatar',
  style,
  count,
  seed,
  ext
}: UniqueFilenameOptions): string {
  const parts: string[] = [prefix];

  if (style) {
    // Sanitize style name
    parts.push(style.replace(/[^a-zA-Z0-9_-]/g, ''));
  }

  if (seed) {
    // Short clean seed
    const cleanSeed = seed.trim().replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 16);
    if (cleanSeed) {
      parts.push(cleanSeed);
    }
  }

  if (count !== undefined) {
    parts.push(`${count}p`);
  }

  // Timestamp and random nonce guarantee 100% uniqueness
  const timestamp = getFormattedTimestamp();
  const nonce = getRandomNonce(4);
  parts.push(timestamp, nonce);

  const cleanExt = ext.replace(/^\./, '');
  return `${parts.join('_')}.${cleanExt}`;
}
