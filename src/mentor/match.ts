import type { ComponentId, MentorQA } from '../data/types';

export interface MentorContext {
  selected: ComponentId | null;
  lessonTopic?: ComponentId;
}

const CONTEXT_BOOST = 1.5;
const MIN_SCORE = 1;

function normalise(s: string): string {
  return s.toLowerCase().replace(/[?!.,;:()"'“”]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Scores curated Q&A entries by keyword hits (Thai has no word spaces, so substring matching is
 * used), favouring entries about the component the student is looking at.
 */
export function scoreEntry(entry: MentorQA, question: string, ctx: MentorContext): number {
  const q = normalise(question);
  if (!q) return 0;
  let score = 0;
  for (const k of entry.keywords) {
    const key = normalise(k);
    if (key && q.includes(key)) score += key.length >= 4 ? 2 : 1;
  }
  if (score > 0 && entry.topic && (entry.topic === ctx.selected || entry.topic === ctx.lessonTopic)) score += CONTEXT_BOOST;
  return score;
}

/** Best curated answer, or null when nothing matches well enough (the UI then says so honestly). */
export function findAnswer(bank: readonly MentorQA[], question: string, ctx: MentorContext): MentorQA | null {
  let best: MentorQA | null = null;
  let bestScore = 0;
  for (const e of bank) {
    const s = scoreEntry(e, question, ctx);
    if (s > bestScore) {
      best = e;
      bestScore = s;
    }
  }
  return bestScore >= MIN_SCORE ? best : null;
}

/** Suggested questions: entries about the current component first, then general ones. */
export function suggestions(bank: readonly MentorQA[], ctx: MentorContext, n = 4): MentorQA[] {
  const mine = bank.filter((e) => e.topic && e.topic === ctx.selected);
  const rest = bank.filter((e) => !mine.includes(e));
  return [...mine, ...rest].slice(0, n);
}
