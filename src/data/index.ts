import type { Category, ComponentId, HardwareComponent, Hotspot, Lesson, QuizQuestion, L } from './types';
import { component as cpu } from './components/cpu';
import { component as motherboard } from './components/motherboard';
import { component as ram } from './components/ram';
import { component as gpu } from './components/gpu';
import { component as ssd } from './components/ssd';
import { component as hdd } from './components/hdd';
import { component as psu } from './components/psu';
import { component as cooler } from './components/cooler';
import { component as pcCase } from './components/case';
import { component as nic } from './components/nic';
import { component as wifi } from './components/wifi';
import { component as soundcard } from './components/soundcard';
import { component as optical } from './components/optical';
import { component as firmware } from './components/firmware';
import { component as cmos } from './components/cmos';
import { component as expansion } from './components/expansion';
import { component as keyboard } from './components/keyboard';
import { component as mouse } from './components/mouse';
import { component as monitor } from './components/monitor';
import { component as ports } from './components/ports';
import { motherboardHotspots } from './hotspots/motherboard';
import { coreHotspots } from './hotspots/core';
import { otherHotspots } from './hotspots/other';
import { lessonsPart1 } from './lessons/part1';
import { lessonsPart2 } from './lessons/part2';
import { choiceQuestions } from './quiz/choice';
import { interactiveQuestions } from './quiz/interactive';

export { comparisons } from './comparisons';
export { troubleScenarios } from './troubleshooting';
export { mentorQA } from './mentorQA';

/** Display order follows the 20-item syllabus. */
export const components: HardwareComponent[] = [
  cpu, motherboard, ram, gpu, ssd, hdd, psu, cooler, pcCase, nic,
  wifi, soundcard, optical, firmware, cmos, expansion, keyboard, mouse, monitor, ports,
];

export const componentById: Record<ComponentId, HardwareComponent> = Object.fromEntries(
  components.map((c) => [c.id, c]),
) as Record<ComponentId, HardwareComponent>;

export const categories: { id: Category; name: L }[] = [
  { id: 'core', name: { th: 'ส่วนประมวลผลหลัก', en: 'Core system' } },
  { id: 'storage', name: { th: 'หน่วยเก็บข้อมูล', en: 'Storage' } },
  { id: 'power-cooling', name: { th: 'พลังงาน · ระบายความร้อน · เคส', en: 'Power · Cooling · Case' } },
  { id: 'expansion', name: { th: 'การ์ดขยาย', en: 'Expansion cards' } },
  { id: 'firmware', name: { th: 'เฟิร์มแวร์', en: 'Firmware' } },
  { id: 'peripheral', name: { th: 'อุปกรณ์ต่อพ่วง', en: 'Peripherals' } },
];

export const hotspots: Hotspot[] = [...motherboardHotspots, ...coreHotspots, ...otherHotspots];
export const hotspotById: Record<string, Hotspot> = Object.fromEntries(hotspots.map((h) => [h.id, h]));
export function hotspotsOf(part: ComponentId): Hotspot[] {
  return hotspots.filter((h) => h.part === part);
}

export const lessons: Lesson[] = [...lessonsPart1, ...lessonsPart2];
export const lessonById: Record<string, Lesson> = Object.fromEntries(lessons.map((l) => [l.id, l]));

export const quizBank: QuizQuestion[] = [...choiceQuestions, ...interactiveQuestions];
