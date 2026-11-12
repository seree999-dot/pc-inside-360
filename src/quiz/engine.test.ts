import { describe, expect, it } from 'vitest';
import { buildSession, gradeMatch, gradeOrder, orderHits, scrambledIndices, shuffle } from './engine';
import { quizBank } from '../data';

/** Deterministic PRNG (mulberry32) so tests are repeatable. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('quiz engine', () => {
  it('shuffle keeps every element and does not mutate the input', () => {
    const src = [1, 2, 3, 4, 5, 6];
    const out = shuffle(src, seeded(1));
    expect([...out].sort()).toEqual(src);
    expect(src).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('scrambledIndices is never the identity permutation', () => {
    for (let s = 0; s < 50; s++) {
      const p = scrambledIndices(5, seeded(s));
      expect(gradeOrder(p)).toBe(false);
      expect([...p].sort()).toEqual([0, 1, 2, 3, 4]);
    }
  });

  it('buildSession respects count, filters and mixes types', () => {
    const session = buildSession(quizBank, { count: 12 }, seeded(7));
    expect(session).toHaveLength(12);
    expect(new Set(session.map((q) => q.id)).size).toBe(12);
    expect(new Set(session.map((q) => q.type)).size).toBeGreaterThanOrEqual(5);
    const hot = buildSession(quizBank, { count: 50, type: 'hotspot' }, seeded(3));
    expect(hot.length).toBeGreaterThan(0);
    expect(hot.every((q) => q.type === 'hotspot')).toBe(true);
  });

  it('grades matching and ordering', () => {
    expect(gradeMatch([0, 1, 2])).toBe(true);
    expect(gradeMatch([0, 2, 1])).toBe(false);
    expect(gradeMatch([0, null, 2])).toBe(false);
    expect(orderHits([0, 2, 1, 3])).toBe(2);
  });
});
