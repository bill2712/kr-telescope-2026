import { describe, expect, it } from 'vitest';
import {
  getJupiterPosition,
  getLocalSiderealTime,
  getMarsPosition,
  getMoonPhase,
  getMoonPosition,
  getSunPosition,
} from '../src/utils/astroUtils';

describe('astronomy calculations', () => {
  const date = new Date('2026-09-06T12:00:00.000Z');

  it('normalizes local sidereal time to degrees', () => {
    expect(getLocalSiderealTime(date, 114.1694)).toBeGreaterThanOrEqual(0);
    expect(getLocalSiderealTime(date, 114.1694)).toBeLessThan(360);
  });

  it('returns finite sky coordinates', () => {
    for (const position of [getSunPosition(date), getMoonPosition(date), getMarsPosition(date), getJupiterPosition(date)]) {
      expect(Number.isFinite(position.ra)).toBe(true);
      expect(Number.isFinite(position.dec)).toBe(true);
      expect(position.ra).toBeGreaterThanOrEqual(0);
      expect(position.ra).toBeLessThan(24);
      expect(position.dec).toBeGreaterThanOrEqual(-90);
      expect(position.dec).toBeLessThanOrEqual(90);
    }
  });

  it('keeps moon illumination within physical bounds', () => {
    const phase = getMoonPhase(date);
    expect(phase.age).toBeGreaterThanOrEqual(0);
    expect(phase.age).toBeLessThanOrEqual(30);
    expect(phase.illumination).toBeGreaterThanOrEqual(0);
    expect(phase.illumination).toBeLessThanOrEqual(100);
  });
});
