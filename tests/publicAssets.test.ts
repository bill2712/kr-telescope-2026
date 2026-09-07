import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const requiredAssets = [
  'images/kidrise-logo_new.png',
  'images/pwa-192.png',
  'images/pwa-512.png',
  'images/apple-touch-icon.png',
  'assets/knowledge/compass-rose.svg',
  'assets/knowledge/compass-needle.svg',
  'planisphere/STARMAP_jacket_front.svg',
  ...['IAU', 'CHN', 'URBAN'].flatMap((style) =>
    ['ENG', 'CHN'].map((language) => `planisphere/STARMAP_${style}_${language}.svg`),
  ),
];

describe('public assets', () => {
  it('contains every dynamically selected planisphere and control asset', () => {
    const missing = requiredAssets.filter((asset) => !existsSync(join(process.cwd(), 'public', asset)));
    expect(missing).toEqual([]);
  });
});
