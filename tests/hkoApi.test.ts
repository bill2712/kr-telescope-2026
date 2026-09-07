import { describe, expect, it } from 'vitest';
import { deriveStargazingStatus, RHRReadData } from '../src/utils/hkoApi';

const currentWeather = (icons: number[]): RHRReadData => ({
  temperature: { data: [], recordTime: '' },
  humidity: { data: [], recordTime: '' },
  rainfall: { data: [], startTime: '', endTime: '' },
  icon: icons,
  updateTime: '',
});

describe('HKO stargazing score', () => {
  it('treats fine night icons as favorable', () => {
    const result = deriveStargazingStatus(currentWeather([70]), 'en');
    expect(result.factors.weather.status).toBe('Good');
    expect(result.score).toBeGreaterThanOrEqual(55);
  });

  it('treats rain and thunderstorms as poor', () => {
    const result = deriveStargazingStatus(currentWeather([63, 65]), 'en');
    expect(result.factors.weather.status).toBe('Poor');
    expect(result.score).toBeLessThan(50);
  });

  it('reads every icon instead of only the first one', () => {
    const calm = deriveStargazingStatus(currentWeather([77]), 'en');
    const windy = deriveStargazingStatus(currentWeather([77, 80]), 'en');
    expect(windy.score).toBeLessThan(calm.score);
  });
});
