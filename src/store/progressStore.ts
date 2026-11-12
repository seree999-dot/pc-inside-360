import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ComponentId, QuizTopic } from '../data/types';

interface TopicStat {
  correct: number;
  total: number;
}

export interface ProgressData {
  lessonsDone: string[];
  explored: ComponentId[];
  quizSessions: number;
  quizAnswered: number;
  quizCorrect: number;
  byTopic: Partial<Record<QuizTopic, TopicStat>>;
  /** Question id → number of wrong answers, for "frequently missed". */
  missed: Record<string, number>;
  assemblyRuns: number;
  assemblyBest: number;
  assemblyLast: number | null;
  /** Scenario id → best score (0–100). */
  trouble: Record<string, number>;
  /** Seconds of active learning time (tab visible and recently interacted with). */
  seconds: number;
  onboardingDone: boolean;
}

interface ProgressState extends ProgressData {
  completeLesson: (id: string) => void;
  markExplored: (id: ComponentId) => void;
  recordAnswer: (qid: string, topic: QuizTopic, correct: boolean) => void;
  finishQuiz: () => void;
  recordAssembly: (score: number) => void;
  recordTrouble: (id: string, score: number) => void;
  addSeconds: (n: number) => void;
  setOnboardingDone: () => void;
  resetAll: () => void;
}

const EMPTY: ProgressData = {
  lessonsDone: [],
  explored: [],
  quizSessions: 0,
  quizAnswered: 0,
  quizCorrect: 0,
  byTopic: {},
  missed: {},
  assemblyRuns: 0,
  assemblyBest: 0,
  assemblyLast: null,
  trouble: {},
  seconds: 0,
  onboardingDone: false,
};

/** Progress is stored only in this browser (localStorage). No account or server is involved. */
export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...EMPTY,
      completeLesson: (id) =>
        set((s) => (s.lessonsDone.includes(id) ? s : { lessonsDone: [...s.lessonsDone, id] })),
      markExplored: (id) => set((s) => (s.explored.includes(id) ? s : { explored: [...s.explored, id] })),
      recordAnswer: (qid, topic, correct) =>
        set((s) => {
          const prev = s.byTopic[topic] ?? { correct: 0, total: 0 };
          return {
            quizAnswered: s.quizAnswered + 1,
            quizCorrect: s.quizCorrect + (correct ? 1 : 0),
            byTopic: { ...s.byTopic, [topic]: { correct: prev.correct + (correct ? 1 : 0), total: prev.total + 1 } },
            missed: correct ? s.missed : { ...s.missed, [qid]: (s.missed[qid] ?? 0) + 1 },
          };
        }),
      finishQuiz: () => set((s) => ({ quizSessions: s.quizSessions + 1 })),
      recordAssembly: (score) =>
        set((s) => ({
          assemblyRuns: s.assemblyRuns + 1,
          assemblyBest: Math.max(s.assemblyBest, score),
          assemblyLast: score,
        })),
      recordTrouble: (id, score) =>
        set((s) => ({ trouble: { ...s.trouble, [id]: Math.max(s.trouble[id] ?? 0, score) } })),
      addSeconds: (n) => set((s) => ({ seconds: s.seconds + n })),
      setOnboardingDone: () => set({ onboardingDone: true }),
      resetAll: () => set({ ...EMPTY }),
    }),
    { name: 'pc360.progress.v1' },
  ),
);
