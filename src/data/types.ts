/**
 * Content schema for PC INSIDE 360°.
 * All student-facing text is bilingual: Thai (default) and English.
 */
export type Lang = 'th' | 'en';
export type L = Record<Lang, string>;

export type ComponentId =
  | 'cpu' | 'motherboard' | 'ram' | 'gpu' | 'ssd' | 'hdd' | 'psu' | 'cooler' | 'case'
  | 'nic' | 'wifi' | 'soundcard' | 'optical' | 'firmware' | 'cmos' | 'expansion'
  | 'keyboard' | 'mouse' | 'monitor' | 'ports';

export type Category = 'core' | 'storage' | 'power-cooling' | 'expansion' | 'firmware' | 'peripheral';

export interface Spec {
  label: L;
  /** Typical value or range. Product-specific numbers must name the family in `note`. */
  value: L;
  note?: L;
}

export interface Vocab {
  en: string;
  th: string;
  meaning: L;
}

export interface HardwareComponent {
  id: ComponentId;
  name: L;
  abbr: string;
  category: Category;
  overview: L;
  mainFunction: L;
  howItWorks: { beginner: L; technical: L };
  structure: { name: L; desc: L }[];
  specs: Spec[];
  connects: L;
  related: ComponentId[];
  compatibility: L[];
  useCases: L[];
  problems: { symptom: L; check: L }[];
  safety: L[];
  vocab: Vocab[];
  facts: L[];
  review: { q: L; a: L }[];
}

/** 3D hotspot anchored in a part's local coordinate space. */
export interface Hotspot {
  id: string;
  part: ComponentId;
  pos: [number, number, number];
  name: L;
  brief: L;
  detail: L;
  significance: L;
  lesson?: string;
}

/* ---------- Lessons ---------- */
export interface Checkpoint {
  q: L;
  choices: L[];
  answer: number;
  explain: L;
}

export interface LessonStep {
  title: L;
  body: L;
  /** Part to select and focus the camera on. */
  focus?: ComponentId;
  /** Hotspot id to open (must belong to `focus`). */
  hotspot?: string;
  view?: { exploded?: boolean; xray?: boolean; isolate?: boolean; airflow?: boolean };
  checkpoint?: Checkpoint;
}

export interface Lesson {
  id: string;
  title: L;
  summary: L;
  minutes: number;
  /** Bloom's taxonomy level this lesson mainly targets. */
  bloom: 'remember' | 'understand' | 'apply' | 'analyze';
  objectives: L[];
  steps: LessonStep[];
}

/* ---------- Quiz ---------- */
export type QuizTopic = 'cpu' | 'memory' | 'storage' | 'motherboard' | 'graphics' | 'power' | 'cooling' | 'assembly' | 'compat' | 'trouble' | 'peripheral';

interface QBase {
  id: string;
  topic: QuizTopic;
  prompt: L;
  explain: L;
  /** Part to highlight in 3D when feedback is shown. */
  part?: ComponentId;
  lesson?: string;
}
/** Multiple choice / scenario / compatibility: exactly five choices. */
export interface QChoice extends QBase {
  type: 'mcq' | 'scenario' | 'compat';
  choices: [L, L, L, L, L];
  answer: number;
}
/** A part is highlighted in 3D; student picks its name from five choices. */
export interface QIdentify extends QBase {
  type: 'identify';
  target: ComponentId;
  choices: [ComponentId, ComponentId, ComponentId, ComponentId, ComponentId];
}
/** Student clicks the correct hotspot on the 3D motherboard. */
export interface QHotspot extends QBase {
  type: 'hotspot';
  target: string;
}
/** Match each left item to its purpose. `right[i]` is the correct partner of `left[i]`. */
export interface QMatch extends QBase {
  type: 'match';
  left: L[];
  right: L[];
}
/** Items listed in the correct order; the UI shuffles them. */
export interface QOrder extends QBase {
  type: 'order';
  items: L[];
}
export type QuizQuestion = QChoice | QIdentify | QHotspot | QMatch | QOrder;

/* ---------- Comparison ---------- */
export interface Comparison {
  id: string;
  title: L;
  a: { label: L; model: ModelId };
  b: { label: L; model: ModelId };
  intro: L;
  rows: { aspect: L; a: L; b: L }[];
  verdict: L;
}
export type ModelId = ComponentId | 'ssd-sata' | 'aio';

/* ---------- Troubleshooting ---------- */
export interface TroubleAction {
  label: L;
  /** What the simulated check reveals. */
  result: L;
  /** true = a sensible diagnostic step for this symptom. */
  useful: boolean;
}
export interface TroubleScenario {
  id: string;
  title: L;
  symptom: L;
  parts: ComponentId[];
  actions: TroubleAction[];
  causes: L[];
  answer: number;
  explain: L;
}

/* ---------- Curated mentor Q&A (offline fallback) ---------- */
export interface MentorQA {
  id: string;
  /** Lower-case keywords in Thai and English; any match counts. */
  keywords: string[];
  topic?: ComponentId;
  q: L;
  a: L;
  /** Optional pointer into the 3D scene. */
  point?: { part: ComponentId; hotspot?: string };
  next?: L;
}
