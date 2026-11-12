import { create } from 'zustand';
import type { L } from '../data/types';
import type { PartSpec } from './catalog';
import { checkBuild, hasErrors } from './compat';
import type { Build, Issue } from './compat';
import { cablesFor, PENALTY, STEPS } from './steps';
import type { CableId } from './steps';

export type Phase = 'choose' | 'prep' | 'place' | 'done';
export interface Feedback {
  level: 'ok' | 'error' | 'warn' | 'info';
  msg: L;
  issues?: Issue[];
}
export type PostState = 'idle' | 'running' | 'ok' | 'fail';

interface Snapshot {
  step: number;
  phase: Phase;
  build: Build;
  gpuSkipped: boolean;
  cpuRot: number;
  ramSlots: string[];
  paste: string | null;
  cables: Partial<Record<CableId, string>>;
}

interface AssemblyState extends Snapshot {
  mode: 'practice' | 'challenge';
  challengeId: string | null;
  score: number;
  mistakes: number;
  hintsUsed: number;
  feedback: Feedback | null;
  history: Snapshot[];
  firmwareUpdated: boolean;
  post: PostState;
  activeCable: CableId | null;
  started: boolean;

  start: (mode: 'practice' | 'challenge', challengeId?: string) => void;
  choose: (part: PartSpec) => void;
  skipGpu: (cpuHasIgpu: boolean) => void;
  setPrepOk: () => void;
  penalize: (points: number, msg: L) => void;
  install: () => void;
  misplace: () => void;
  setCpuRot: (r: number) => void;
  setRamSlots: (s: string[]) => void;
  setPaste: (p: string) => void;
  setActiveCable: (c: CableId | null) => void;
  connect: (cable: CableId, dest: string) => void;
  useHint: () => void;
  updateFirmware: () => void;
  setPost: (p: PostState) => void;
  undo: () => void;
  reset: () => void;
}

const INITIAL: Snapshot = { step: 0, phase: 'choose', build: {}, gpuSkipped: false, cpuRot: 2, ramSlots: [], paste: null, cables: {} };

const snap = (s: AssemblyState): Snapshot => ({
  step: s.step, phase: s.phase, build: s.build, gpuSkipped: s.gpuSkipped, cpuRot: s.cpuRot, ramSlots: s.ramSlots, paste: s.paste, cables: s.cables,
});

/** Steps with an extra preparation task between choosing and placing. */
const PREP_STEPS = new Set(['cpu', 'ram', 'cooler']);

export const useAssembly = create<AssemblyState>((set, get) => ({
  ...INITIAL,
  mode: 'practice',
  challengeId: null,
  score: 100,
  mistakes: 0,
  hintsUsed: 0,
  feedback: null,
  history: [],
  firmwareUpdated: false,
  post: 'idle',
  activeCable: null,
  started: false,

  start: (mode, challengeId) => set({ ...INITIAL, mode, challengeId: challengeId ?? null, score: 100, mistakes: 0, hintsUsed: 0, feedback: null, history: [], firmwareUpdated: false, post: 'idle', activeCable: null, started: true }),

  choose: (part) => {
    const s = get();
    const slot = STEPS[s.step].slot;
    if (!slot || part.kind !== slot || s.phase !== 'choose') return;
    const trial: Build = { ...s.build, [slot]: part };
    const issues = checkBuild(trial).filter((i) => !checkBuild(s.build).some((p) => p.rule === i.rule));
    if (hasErrors(issues)) {
      set({
        score: Math.max(0, s.score - PENALTY.incompatible),
        mistakes: s.mistakes + 1,
        feedback: { level: 'error', msg: { th: 'ชิ้นส่วนนี้เข้ากันไม่ได้กับเครื่องที่ประกอบอยู่', en: 'This part is not compatible with the build so far' }, issues },
      });
      return;
    }
    const history = [...s.history, snap(s)];
    if (slot === 'case') {
      set({ history, build: trial, phase: 'done', feedback: { level: 'ok', msg: { th: 'วางเคสบนโต๊ะแล้ว ถอดฝาข้างออกเพื่อเริ่มประกอบ', en: 'Case on the bench, side panel removed — ready to build.' } } });
      return;
    }
    set({
      history,
      build: trial,
      phase: PREP_STEPS.has(STEPS[s.step].id) ? 'prep' : 'place',
      feedback: issues.length
        ? { level: 'warn', msg: { th: 'ใช้ได้ แต่มีข้อควรระวัง', en: 'Usable, with a caveat' }, issues }
        : PREP_STEPS.has(STEPS[s.step].id)
          ? { level: 'ok', msg: { th: 'เข้ากันได้ ทำขั้นเตรียมการด้านล่างก่อนติดตั้ง', en: 'Compatible. Complete the preparation task below before installing.' } }
          : { level: 'ok', msg: { th: 'เข้ากันได้ ลากชิ้นส่วนไปยังตำแหน่งที่เรืองแสง หรือกดปุ่มติดตั้ง', en: 'Compatible. Drag it to the glowing target, or press Install.' } },
    });
  },

  skipGpu: (cpuHasIgpu) => {
    const s = get();
    if (!cpuHasIgpu) {
      set({ score: Math.max(0, s.score - PENALTY.incompatible), mistakes: s.mistakes + 1, feedback: { level: 'error', msg: { th: 'CPU นี้ไม่มีกราฟิกในตัว ถ้าไม่ใส่การ์ดจอจะไม่มีสัญญาณภาพออกจอ', en: 'This CPU has no integrated graphics; without a graphics card there is no video output.' } } });
      return;
    }
    set({ history: [...s.history, snap(s)], gpuSkipped: true, phase: 'done', feedback: { level: 'ok', msg: { th: 'ใช้กราฟิกในตัว CPU ต่อจอที่พอร์ตด้านหลังเมนบอร์ด', en: 'Using the CPU\'s integrated graphics — the monitor connects to the motherboard\'s rear ports.' } } });
  },

  setPrepOk: () => set({ phase: 'place', feedback: { level: 'ok', msg: { th: 'เตรียมพร้อมแล้ว ลากชิ้นส่วนไปยังตำแหน่งที่เรืองแสง หรือกดปุ่มติดตั้ง', en: 'Ready. Drag the part to the glowing target, or press Install.' } } }),
  penalize: (points, msg) => set((s) => ({ score: Math.max(0, s.score - points), mistakes: s.mistakes + 1, feedback: { level: 'error', msg } })),

  install: () => {
    const s = get();
    if (s.phase !== 'place') return;
    set({ history: [...s.history, snap(s)], phase: 'done', feedback: { level: 'ok', msg: { th: 'ติดตั้งเข้าตำแหน่งแล้ว', en: 'Snapped into place.' } } });
  },
  misplace: () => get().penalize(PENALTY.misplace, { th: 'ตำแหน่งไม่ถูกต้อง ลองวางให้ตรงกับกรอบที่เรืองแสง', en: 'Not the right spot — drop it on the glowing outline.' }),

  setCpuRot: (cpuRot) => set({ cpuRot }),
  setRamSlots: (ramSlots) => set({ ramSlots }),
  setPaste: (paste) => set({ paste }),
  setActiveCable: (activeCable) => set({ activeCable }),

  connect: (cable, dest) => {
    const s = get();
    const def = cablesFor(s.build, !s.gpuSkipped).find((c) => c.id === cable);
    if (!def) return;
    if (def.dest !== dest) {
      s.penalize(PENALTY.cable, { th: 'สายนี้ไม่ได้ต่อที่ปลายทางนั้น ดูจำนวนขาและตำแหน่งของหัวต่ออีกครั้ง', en: 'That cable does not go there — check the pin count and header position again.' });
      return;
    }
    const cables = { ...s.cables, [cable]: dest };
    const all = cablesFor(s.build, !s.gpuSkipped).every((c) => cables[c.id]);
    set({ history: [...s.history, snap(s)], cables, activeCable: null, phase: all ? 'done' : 'place', feedback: { level: 'ok', msg: all ? { th: 'ต่อสายครบทุกเส้นแล้ว', en: 'All cables connected.' } : { th: 'ต่อสายถูกต้อง', en: 'Cable connected correctly.' } } });
  },

  useHint: () => set((s) => ({ hintsUsed: s.hintsUsed + 1, score: Math.max(0, s.score - PENALTY.hint), feedback: { level: 'info', msg: STEPS[s.step].hint } })),
  updateFirmware: () => set({ firmwareUpdated: true, post: 'idle', feedback: { level: 'ok', msg: { th: 'อัปเดต UEFI ด้วย BIOS Flashback จาก USB สำเร็จ (ทำได้แม้ไม่มี CPU ที่รองรับ) ลองเปิดเครื่องอีกครั้ง', en: 'UEFI updated via BIOS Flashback from a USB drive (works without a supported CPU). Try powering on again.' } } }),
  setPost: (post) => set({ post }),

  undo: () => {
    const s = get();
    const prev = s.history[s.history.length - 1];
    if (!prev) return;
    set({ ...prev, history: s.history.slice(0, -1), feedback: null, activeCable: null, post: 'idle' });
  },
  reset: () => set({ ...INITIAL, history: [], score: 100, mistakes: 0, hintsUsed: 0, feedback: null, firmwareUpdated: false, post: 'idle', activeCable: null }),
}));

/** Advance to the next step once the current one is done. */
export function nextStep(): void {
  const s = useAssembly.getState();
  if (s.phase !== 'done' || s.step >= STEPS.length - 1) return;
  const next = s.step + 1;
  useAssembly.setState({ step: next, phase: STEPS[next].id === 'cables' ? 'place' : STEPS[next].id === 'power' ? 'place' : 'choose', feedback: null });
}
