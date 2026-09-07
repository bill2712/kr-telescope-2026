import { describe, expect, it } from 'vitest';
import { translations } from '../src/utils/i18n';

const collectStrings = (value: unknown): string[] => {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
};

describe('first-run experience copy', () => {
  it('keeps every task available and translated', () => {
    const zhTasks = translations['zh-HK'].homeExperience.tasks;
    const enTasks = translations.en.homeExperience.tasks;

    expect(Object.keys(enTasks)).toEqual(Object.keys(zhTasks));
    expect(collectStrings(zhTasks).every((value) => value.trim() !== '')).toBe(true);
    expect(collectStrings(enTasks).every((value) => value.trim() !== '')).toBe(true);
  });

  it('provides complete labels for both experience modes', () => {
    for (const language of ['zh-HK', 'en'] as const) {
      const copy = translations[language].homeExperience;
      expect(copy.beginner.trim()).not.toBe('');
      expect(copy.advanced.trim()).not.toBe('');
      expect(copy.beginnerDesc.trim()).not.toBe('');
      expect(copy.advancedDesc.trim()).not.toBe('');
      expect(copy.replayGuide.trim()).not.toBe('');
    }
  });
});
