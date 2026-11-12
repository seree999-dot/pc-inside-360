import { create } from 'zustand';
import type { ComponentId, Lang } from '../data/types';
import type { CameraPreset, ScenePartId } from '../three/layout';
import type { V3 } from '../three/prims';

export type View =
  | 'landing' | 'explore' | 'lessons' | 'assembly' | 'compare' | 'quiz' | 'progress' | 'trouble' | 'instructor';
export const VIEWS: View[] = ['landing', 'explore', 'lessons', 'assembly', 'compare', 'quiz', 'progress', 'trouble', 'instructor'];
export type Theme = 'dark' | 'light';
export type Level = 'beginner' | 'technical';

export type CameraCommand =
  | { kind: 'reset' }
  | { kind: 'overview' }
  | { kind: 'preset'; preset: CameraPreset }
  | { kind: 'focus'; part: ScenePartId }
  | { kind: 'point'; point: V3 }
  | { kind: 'orbit'; angle: number }
  | { kind: 'zoom'; factor: number };

interface ViewToggles {
  exploded: boolean;
  /** 1 = opaque case, lower values = x-ray. */
  caseOpacity: number;
  isolate: boolean;
  annotations: boolean;
  connections: boolean;
  airflow: boolean;
  autoRotate: boolean;
  panMode: boolean;
  reveal: boolean;
}

interface TourState {
  active: boolean;
  playing: boolean;
  index: number;
}

interface AppState extends ViewToggles {
  view: View;
  lang: Lang;
  theme: Theme;
  level: Level;
  selected: ComponentId | null;
  hovered: ScenePartId | null;
  activeHotspot: string | null;
  hidden: ScenePartId[];
  camera: { cmd: CameraCommand; n: number };
  tour: TourState;
  lessonId: string | null;
  lessonStep: number;
  /** null = onboarding not running. */
  onboarding: number | null;
  hasRotated: boolean;
  mentorOpen: boolean;
  leftOpen: boolean;
  rightOpen: boolean;
  /** When set, motherboard hotspots render unlabeled and report clicks here (quiz). */
  hotspotPick: ((id: string) => void) | null;
  /** Hide the name label of the selected part (identify quiz). */
  anonymous: boolean;

  go: (view: View) => void;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  setLevel: (level: Level) => void;
  select: (id: ComponentId | null, focus?: boolean) => void;
  setHovered: (id: ScenePartId | null) => void;
  setHotspot: (id: string | null) => void;
  toggle: (key: Exclude<keyof ViewToggles, 'caseOpacity'>) => void;
  set: (patch: Partial<ViewToggles>) => void;
  toggleHidden: (id: ScenePartId) => void;
  showAll: () => void;
  cam: (cmd: CameraCommand) => void;
  setTour: (patch: Partial<TourState>) => void;
  startLesson: (id: string) => void;
  setLessonStep: (step: number) => void;
  endLesson: () => void;
  setOnboarding: (step: number | null) => void;
  markRotated: () => void;
  setMentorOpen: (open: boolean) => void;
  setPanels: (patch: { leftOpen?: boolean; rightOpen?: boolean }) => void;
  setQuizScene: (patch: { hotspotPick?: ((id: string) => void) | null; anonymous?: boolean }) => void;
  resetScene: () => void;
}

const SCENE_DEFAULTS: ViewToggles = {
  exploded: false,
  caseOpacity: 1,
  isolate: false,
  annotations: true,
  connections: false,
  airflow: false,
  autoRotate: false,
  panMode: false,
  reveal: false,
};

function readPref<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return allowed.includes(v as T) ? (v as T) : fallback;
  } catch {
    return fallback;
  }
}
function writePref(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode) — preference simply is not remembered */
  }
}

function viewFromHash(): View {
  const h = (typeof location !== 'undefined' ? location.hash : '').replace(/^#\/?/, '');
  return VIEWS.includes(h as View) ? (h as View) : 'landing';
}

export const useApp = create<AppState>((set, get) => ({
  ...SCENE_DEFAULTS,
  view: viewFromHash(),
  lang: readPref<Lang>('pc360.lang', ['th', 'en'], 'th'),
  theme: readPref<Theme>('pc360.theme', ['dark', 'light'], 'dark'),
  level: readPref<Level>('pc360.level', ['beginner', 'technical'], 'beginner'),
  selected: null,
  hovered: null,
  activeHotspot: null,
  hidden: [],
  camera: { cmd: { kind: 'reset' }, n: 0 },
  tour: { active: false, playing: false, index: 0 },
  lessonId: null,
  lessonStep: 0,
  onboarding: null,
  hasRotated: false,
  mentorOpen: false,
  leftOpen: false,
  rightOpen: false,
  hotspotPick: null,
  anonymous: false,

  go: (view) => {
    if (location.hash !== `#/${view}`) history.pushState(null, '', `#/${view}`);
    set({ view, leftOpen: false, rightOpen: false });
  },
  setLang: (lang) => {
    writePref('pc360.lang', lang);
    set({ lang });
  },
  setTheme: (theme) => {
    writePref('pc360.theme', theme);
    set({ theme });
  },
  setLevel: (level) => {
    writePref('pc360.level', level);
    set({ level });
  },
  select: (id, focus = true) => {
    set({ selected: id, activeHotspot: null, reveal: false, ...(id ? { rightOpen: true } : { isolate: false }) });
    if (id && focus) get().cam({ kind: 'focus', part: id === 'expansion' ? 'soundcard' : id });
  },
  setHovered: (hovered) => set({ hovered }),
  setHotspot: (activeHotspot) => set({ activeHotspot }),
  toggle: (key) => set((s) => ({ [key]: !s[key] }) as Partial<AppState>),
  set: (patch) => set(patch),
  toggleHidden: (id) =>
    set((s) => ({ hidden: s.hidden.includes(id) ? s.hidden.filter((h) => h !== id) : [...s.hidden, id] })),
  showAll: () => set({ hidden: [], isolate: false }),
  cam: (cmd) => set((s) => ({ camera: { cmd, n: s.camera.n + 1 } })),
  setTour: (patch) => set((s) => ({ tour: { ...s.tour, ...patch } })),
  startLesson: (id) => {
    get().resetScene();
    set({ lessonId: id, lessonStep: 0, rightOpen: true });
    get().go('explore');
  },
  setLessonStep: (lessonStep) => set({ lessonStep }),
  endLesson: () => set({ lessonId: null, lessonStep: 0 }),
  setOnboarding: (onboarding) => set({ onboarding }),
  markRotated: () => {
    if (!get().hasRotated) set({ hasRotated: true });
  },
  setMentorOpen: (mentorOpen) => set({ mentorOpen }),
  setPanels: (patch) => set(patch),
  setQuizScene: (patch) => set(patch),
  resetScene: () =>
    set({
      ...SCENE_DEFAULTS,
      selected: null,
      hovered: null,
      activeHotspot: null,
      hidden: [],
      hotspotPick: null,
      anonymous: false,
      tour: { active: false, playing: false, index: 0 },
    }),
}));

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => useApp.setState({ view: viewFromHash() }));
  window.addEventListener('hashchange', () => useApp.setState({ view: viewFromHash() }));
}
