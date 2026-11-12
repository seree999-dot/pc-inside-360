import { describe, expect, it } from 'vitest';
import { comparisons, componentById, components, hotspotById, hotspots, lessons, mentorQA, quizBank, troubleScenarios } from './index';
import type { L } from './types';

const filled = (v: L): boolean => v.th.trim().length > 0 && v.en.trim().length > 0;

describe('content integrity', () => {
  it('has all 20 components with unique ids and bilingual names', () => {
    expect(components).toHaveLength(20);
    expect(new Set(components.map((c) => c.id)).size).toBe(20);
    for (const c of components) {
      expect(filled(c.name) && filled(c.overview) && filled(c.howItWorks.beginner) && filled(c.howItWorks.technical)).toBe(true);
      expect(c.specs.length).toBeGreaterThan(0);
      for (const r of c.related) expect(componentById[r]).toBeDefined();
    }
  });

  it('never repeats an overview between components', () => {
    const overviews = components.map((c) => c.overview.en);
    expect(new Set(overviews).size).toBe(overviews.length);
  });

  it('has unique hotspot ids that point to real parts and lessons', () => {
    expect(new Set(hotspots.map((h) => h.id)).size).toBe(hotspots.length);
    const lessonIds = new Set(lessons.map((l) => l.id));
    for (const h of hotspots) {
      expect(componentById[h.part]).toBeDefined();
      if (h.lesson) expect(lessonIds.has(h.lesson)).toBe(true);
    }
  });

  it('lesson steps reference hotspots that belong to the focused part', () => {
    expect(lessons.map((l) => l.id)).toEqual(['l01', 'l02', 'l03', 'l04', 'l05', 'l06', 'l07', 'l08', 'l09', 'l10']);
    for (const l of lessons) {
      for (const s of l.steps) {
        if (s.hotspot) {
          expect(hotspotById[s.hotspot], `${l.id} ${s.hotspot}`).toBeDefined();
          expect(hotspotById[s.hotspot].part, `${l.id} ${s.hotspot}`).toBe(s.focus);
        }
        if (s.checkpoint) {
          expect(s.checkpoint.answer).toBeGreaterThanOrEqual(0);
          expect(s.checkpoint.answer).toBeLessThan(s.checkpoint.choices.length);
        }
      }
    }
  });

  it('quiz questions are well-formed', () => {
    expect(new Set(quizBank.map((q) => q.id)).size).toBe(quizBank.length);
    for (const q of quizBank) {
      if (q.type === 'mcq' || q.type === 'scenario' || q.type === 'compat') {
        expect(q.choices).toHaveLength(5);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(5);
      }
      if (q.type === 'identify') {
        expect(q.choices).toContain(q.target);
        expect(new Set(q.choices).size).toBe(5);
      }
      if (q.type === 'hotspot') expect(hotspotById[q.target]?.part).toBe('motherboard');
      if (q.type === 'match') expect(q.left.length).toBe(q.right.length);
      if (q.type === 'order') expect(q.items.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('comparisons, troubleshooting and mentor answers are consistent', () => {
    expect(comparisons).toHaveLength(6);
    expect(troubleScenarios).toHaveLength(6);
    for (const t of troubleScenarios) {
      expect(t.answer).toBeLessThan(t.causes.length);
      expect(t.actions.some((a) => a.useful)).toBe(true);
    }
    for (const m of mentorQA) {
      expect(m.keywords.length).toBeGreaterThan(0);
      if (m.point?.hotspot) expect(hotspotById[m.point.hotspot]?.part).toBe(m.point.part);
    }
  });
});
