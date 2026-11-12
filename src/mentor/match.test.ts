import { describe, expect, it } from 'vitest';
import { findAnswer, scoreEntry, suggestions } from './match';
import { mentorQA } from '../data';
import type { MentorQA } from '../data/types';

const sample: MentorQA[] = [
  { id: 'a', keywords: ['ram', 'แรม'], topic: 'ram', q: { th: 'แรม', en: 'RAM' }, a: { th: 'ก', en: 'A' } },
  { id: 'b', keywords: ['ram', 'dual channel'], topic: 'motherboard', q: { th: 'ช่อง', en: 'Channels' }, a: { th: 'ข', en: 'B' } },
];

describe('mentor matcher', () => {
  it('matches Thai text without word spaces by substring', () => {
    expect(findAnswer(sample, 'แรมทำหน้าที่อะไร', { selected: null })?.id).toBe('a');
  });

  it('boosts entries about the selected component', () => {
    expect(scoreEntry(sample[1], 'ram', { selected: 'motherboard' })).toBeGreaterThan(scoreEntry(sample[0], 'ram', { selected: 'motherboard' }));
    expect(findAnswer(sample, 'ram', { selected: 'motherboard' })?.id).toBe('b');
  });

  it('returns null instead of guessing when nothing matches', () => {
    expect(findAnswer(sample, 'what is the weather', { selected: null })).toBeNull();
    expect(findAnswer(sample, '   ', { selected: null })).toBeNull();
  });

  it('answers core questions from the real curated bank', () => {
    expect(findAnswer(mentorQA, 'What is the difference between SATA and NVMe?', { selected: null })).not.toBeNull();
    expect(findAnswer(mentorQA, 'CPU ทำหน้าที่อะไร', { selected: null })).not.toBeNull();
    expect(findAnswer(mentorQA, 'where is the M.2 socket', { selected: null })?.point?.part).toBe('motherboard');
  });

  it('suggests context-relevant questions first', () => {
    expect(suggestions(sample, { selected: 'motherboard' }, 1)[0].id).toBe('b');
  });
});
