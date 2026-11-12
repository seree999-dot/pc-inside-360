import type { QuizQuestion, QuizTopic } from '../data/types';

export type Rng = () => number;

/** Fisher–Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** A permutation of 0..n-1 that is never the identity (so ordering tasks are never pre-solved). */
export function scrambledIndices(n: number, rng: Rng = Math.random): number[] {
  const base = Array.from({ length: n }, (_, i) => i);
  if (n < 2) return base;
  for (let tries = 0; tries < 20; tries++) {
    const p = shuffle(base, rng);
    if (p.some((v, i) => v !== i)) return p;
  }
  return [...base.slice(1), base[0]];
}

export interface SessionOptions {
  topic?: QuizTopic | 'all';
  type?: QuizQuestion['type'] | 'all';
  count: number;
}

/**
 * Picks `count` questions, round-robin across question types so a session mixes
 * recall, 3D identification, hotspot, matching, ordering and analysis items.
 */
export function buildSession(bank: readonly QuizQuestion[], opts: SessionOptions, rng: Rng = Math.random): QuizQuestion[] {
  const pool = bank.filter(
    (q) => (!opts.topic || opts.topic === 'all' || q.topic === opts.topic) && (!opts.type || opts.type === 'all' || q.type === opts.type),
  );
  const byType = new Map<string, QuizQuestion[]>();
  for (const q of shuffle(pool, rng)) byType.set(q.type, [...(byType.get(q.type) ?? []), q]);
  const queues = shuffle([...byType.values()], rng);
  const out: QuizQuestion[] = [];
  while (out.length < opts.count && queues.some((q) => q.length > 0)) {
    for (const q of queues) {
      const next = q.shift();
      if (next && out.length < opts.count) out.push(next);
    }
  }
  return out;
}

export function gradeChoice(answer: number, picked: number): boolean {
  return answer === picked;
}

/** `pairs[i]` = index into the original `right` array the student matched with `left[i]`. */
export function gradeMatch(pairs: readonly (number | null)[]): boolean {
  return pairs.every((p, i) => p === i);
}

/** `order` lists original item indices in the order the student arranged them. */
export function gradeOrder(order: readonly number[]): boolean {
  return order.every((v, i) => v === i);
}

/** Number of items already in their correct position — used for partial feedback. */
export function orderHits(order: readonly number[]): number {
  return order.filter((v, i) => v === i).length;
}
