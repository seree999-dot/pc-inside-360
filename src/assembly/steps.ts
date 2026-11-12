import type { L } from '../data/types';
import type { SlotKind } from './catalog';
import type { Build } from './compat';
import { checkBuild } from './compat';
import { LAYOUT } from '../three/layout';
import type { V3 } from '../three/prims';

export type StepId = 'case' | 'board' | 'cpu' | 'ram' | 'storage' | 'cooler' | 'gpu' | 'psu' | 'cables' | 'power';

export interface StepDef {
  id: StepId;
  /** Catalogue slot chosen in this step, if any. */
  slot?: SlotKind;
  title: L;
  instruction: L;
  hint: L;
}

export const STEPS: StepDef[] = [
  { id: 'case', slot: 'case', title: { th: 'เลือกเคส', en: 'Choose a case' }, instruction: { th: 'เลือกเคสที่จะใช้ประกอบ ดูขนาดเมนบอร์ดที่รองรับและระยะสูงสุดของการ์ดจอและฮีตซิงก์', en: 'Choose the case. Note the board sizes it accepts and its GPU and cooler clearances.' }, hint: { th: 'เคสมิดทาวเวอร์รองรับเมนบอร์ดได้หลายขนาดที่สุด ส่วนเคส ITX ต้องใช้ชิ้นส่วนขนาดเล็ก', en: 'A mid-tower accepts the widest range of boards; an ITX case needs compact parts.' } },
  { id: 'board', slot: 'board', title: { th: 'ติดตั้งเมนบอร์ด', en: 'Install the motherboard' }, instruction: { th: 'เลือกเมนบอร์ดที่ขนาดตรงกับเคส แล้วลากไปวางบนตำแหน่งน็อตรอง (standoff) ที่เรืองแสง ถ้าเมนบอร์ดไม่มีแผ่นปิด I/O (I/O shield) ติดมาในตัว ต้องกดแผ่นนี้เข้าช่องหลังเคสก่อนวางบอร์ด', en: 'Pick a board whose form factor the case accepts, then drag it onto the glowing standoff area. If the board has no pre-installed I/O shield, press the shield into the rear opening of the case first.' }, hint: { th: 'ATX ใหญ่ที่สุด รองลงมาคือ micro-ATX และ Mini-ITX เคสใหญ่ใส่บอร์ดเล็กได้ แต่เคสเล็กใส่บอร์ดใหญ่ไม่ได้', en: 'ATX is largest, then micro-ATX, then Mini-ITX. Big cases take small boards, never the reverse.' } },
  { id: 'cpu', slot: 'cpu', title: { th: 'ติดตั้ง CPU', en: 'Install the CPU' }, instruction: { th: 'เลือก CPU ที่ซ็อกเก็ตตรงกับเมนบอร์ด หมุนให้สามเหลี่ยมสีทองตรงกับมุมที่ทำเครื่องหมายบนซ็อกเก็ต แล้ววางลงตรง ๆ ห้ามกด', en: 'Choose a CPU for the board\'s socket, rotate it so the gold triangle matches the marked socket corner, then lower it straight in — never press.' }, hint: { th: 'ซ็อกเก็ตต้องเหมือนกันทุกตัวอักษร (AM5 ≠ AM4) และชิปเซ็ต/เฟิร์มแวร์ต้องรองรับรุ่นของ CPU ในงานจริง ช่างมักติดตั้ง CPU แรม และ SSD M.2 บนเมนบอร์ดที่วางบนกล่องก่อนนำเข้าเคส เพราะทำงานสะดวกกว่า', en: 'The socket must match exactly (AM5 ≠ AM4) and the chipset/firmware must support the CPU generation. In real builds, the CPU, RAM and M.2 SSD are usually fitted with the board resting on its box, before it goes into the case.' } },
  { id: 'ram', slot: 'ram', title: { th: 'ติดตั้งแรม', en: 'Install RAM' }, instruction: { th: 'เลือกแรมรุ่น DDR ที่ตรงกับเมนบอร์ด แล้วเลือกสล็อตที่ถูกต้องสำหรับ dual-channel ก่อนกดลงจนคลิปล็อก', en: 'Choose RAM of the board\'s DDR generation, select the correct slots for dual-channel, then press until the clips lock.' }, hint: { th: 'บอร์ด 4 สล็อตส่วนใหญ่แนะนำ A2 และ B2 (สล็อตที่ 2 และ 4 นับจาก CPU) สำหรับแรม 2 แถว', en: 'Most 4-slot boards specify A2 and B2 (the 2nd and 4th slots from the CPU) for two modules.' } },
  { id: 'storage', slot: 'storage', title: { th: 'ติดตั้งหน่วยเก็บข้อมูล', en: 'Install storage' }, instruction: { th: 'เลือกไดรฟ์ที่ช่องต่อของเมนบอร์ดและเคสรองรับ แล้ววางในตำแหน่งที่เรืองแสง', en: 'Choose a drive the board\'s connectors and the case support, then place it on the glowing target.' }, hint: { th: 'ช่อง M.2 อาจรองรับเฉพาะ NVMe หรือเฉพาะ SATA ให้ดูสเปกของเมนบอร์ด', en: 'An M.2 socket may be NVMe-only or SATA-only; check the board specification.' } },
  { id: 'cooler', slot: 'cooler', title: { th: 'ติดตั้งชุดระบายความร้อน CPU', en: 'Install CPU cooling' }, instruction: { th: 'เลือกชุดระบายความร้อนที่สูงไม่เกินเคสและรองรับกำลังไฟของ CPU เตรียมสารนำความร้อน แล้ววางบน CPU', en: 'Choose a cooler that fits the case height and handles the CPU\'s power, prepare the thermal paste, then seat it on the CPU.' }, hint: { th: 'สารนำความร้อนปริมาณเท่าเม็ดถั่วตรงกลางพอดี แรงกดของฮีตซิงก์จะเกลี่ยให้เอง', en: 'A pea-sized dot in the centre is enough; mounting pressure spreads it.' } },
  { id: 'gpu', slot: 'gpu', title: { th: 'ติดตั้งการ์ดจอ', en: 'Install the GPU' }, instruction: { th: 'เลือกการ์ดจอที่ความยาวไม่เกินเคส แล้วเสียบในสล็อต PCIe x16 ตัวบนสุดที่ต่อตรงกับ CPU', en: 'Choose a card no longer than the case allows and insert it in the top PCIe x16 slot, wired directly to the CPU.' }, hint: { th: 'ถ้า CPU มีกราฟิกในตัว สามารถเลือกไม่ใส่การ์ดจอได้', en: 'If the CPU has integrated graphics, you may skip the discrete card.' } },
  { id: 'psu', slot: 'psu', title: { th: 'ติดตั้ง PSU', en: 'Install the PSU' }, instruction: { th: 'เลือก PSU ที่มีกำลังไฟพอและมีหัวต่อครบ แล้ววางในช่องล่างด้านหลังของเคส', en: 'Choose a PSU with enough wattage and the right connectors, then place it in the bottom-rear bay.' }, hint: { th: 'ประมาณโหลดสูงสุด = CPU + GPU + ราว 75 W สำหรับส่วนอื่น แล้วเผื่อเพิ่มราว 30%', en: 'Estimate peak load = CPU + GPU + ~75 W for everything else, then add about 30% headroom.' } },
  { id: 'cables', title: { th: 'ต่อสายไฟและสายสัญญาณ', en: 'Connect the cables' }, instruction: { th: 'เลือกสายทางซ้ายแล้วเลือกปลายทางที่ถูกต้อง ทุกเส้นต้องต่อครบก่อนเปิดเครื่อง', en: 'Select a cable, then its correct destination. Every cable must be connected before power-on.' }, hint: { th: 'หัว 8-pin ใกล้ขอบบนของบอร์ดคือไฟเลี้ยง CPU (EPS) ไม่ใช่ PCIe แม้หน้าตาคล้ายกัน', en: 'The 8-pin header near the top edge is CPU power (EPS), not PCIe, even though they look alike.' } },
  { id: 'power', title: { th: 'ตรวจสอบและเปิดเครื่อง', en: 'Verify and power on' }, instruction: { th: 'ตรวจรายการความเข้ากันได้ แล้วกดปุ่ม Power เพื่อจำลองการบูต (POST)', en: 'Review the compatibility report, then press Power to simulate start-up (POST).' }, hint: { th: 'หากไม่ผ่าน POST ให้อ่านคำเตือนเรื่องเฟิร์มแวร์', en: 'If POST fails, read the firmware warning.' } },
];

export interface Target {
  center: V3;
  size: V3;
}
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];

/** Ghost placement targets (world space) for drag-and-drop steps. */
export function targetFor(step: StepId, build: Build): Target | null {
  switch (step) {
    case 'board': return { center: LAYOUT.motherboard.pos, size: [2.44, 3.05, 0.12] };
    case 'cpu': return { center: LAYOUT.cpu.pos, size: [0.42, 0.42, 0.06] };
    case 'ram': return { center: LAYOUT.ram.pos, size: [0.36, 1.4, 0.32] };
    case 'storage':
      return build.storage?.iface === 'sata-3.5'
        ? { center: LAYOUT.hdd.pos, size: [1.02, 0.2, 1.47] }
        : { center: LAYOUT.ssd.pos, size: [0.8, 0.22, 0.05] };
    case 'cooler': return { center: add(LAYOUT.cooler.pos, [0, 0, build.cooler?.type === 'air' ? 0.8 : 0.15]), size: build.cooler?.type === 'air' ? [0.8, 1.25, 1.6] : [0.65, 0.65, 0.3] };
    case 'gpu': return { center: LAYOUT.gpu.pos, size: [2.8, 0.5, 1.15] };
    case 'psu': return { center: LAYOUT.psu.pos, size: [1.4, 0.86, 1.5] };
    default: return null;
  }
}

export type CableId = 'atx24' | 'eps' | 'pcie' | 'sata' | 'front';
export interface CableDef {
  id: CableId;
  name: L;
  /** Correct destination id. */
  dest: string;
  from: V3;
  to: V3;
  color: string;
}

const MB = LAYOUT.motherboard.pos;
const PSU_OUT = add(LAYOUT.psu.pos, [1.15, 0, 0.2]);

export const DESTS: { id: string; name: L }[] = [
  { id: 'mb-24', name: { th: 'ขั้ว 24-pin ขอบขวาของเมนบอร์ด', en: '24-pin header, right edge of the board' } },
  { id: 'mb-eps', name: { th: 'ขั้ว 8-pin มุมบนซ้ายของเมนบอร์ด', en: '8-pin header, top-left of the board' } },
  { id: 'gpu-pwr', name: { th: 'ขั้วไฟเลี้ยงบนการ์ดจอ', en: 'Power socket on the graphics card' } },
  { id: 'hdd-pwr', name: { th: 'ขั้วไฟ SATA บนฮาร์ดดิสก์', en: 'SATA power socket on the hard drive' } },
  { id: 'mb-fp', name: { th: 'หัวต่อ Front panel มุมล่างขวาของเมนบอร์ด', en: 'Front-panel header, bottom-right of the board' } },
];

export function cablesFor(build: Build, hasGpu: boolean): CableDef[] {
  const list: CableDef[] = [
    { id: 'atx24', name: { th: 'สาย ATX 24-pin (PSU)', en: 'ATX 24-pin cable (PSU)' }, dest: 'mb-24', from: PSU_OUT, to: add(MB, [1.12, 0.7, 0.15]), color: '#ffbf47' },
    { id: 'eps', name: { th: 'สาย EPS 4+4-pin ไฟเลี้ยง CPU (PSU)', en: 'EPS 4+4-pin CPU power (PSU)' }, dest: 'mb-eps', from: PSU_OUT, to: add(MB, [-0.85, 1.43, 0.15]), color: '#ffbf47' },
  ];
  if (hasGpu) {
    const flag = build.gpu?.connector === '12vhpwr';
    list.push({ id: 'pcie', name: flag ? { th: 'สาย 12VHPWR / 12V-2x6 (16 พิน) จาก PSU', en: '12VHPWR / 12V-2x6 (16-pin) cable (PSU)' } : { th: 'สาย PCIe 6+2-pin (PSU)', en: 'PCIe 6+2-pin cable (PSU)' }, dest: 'gpu-pwr', from: PSU_OUT, to: add(LAYOUT.gpu.pos, [0.9, 0.15, 0.55]), color: '#ffbf47' });
  }
  if (build.storage?.iface === 'sata-3.5') {
    list.push({ id: 'sata', name: { th: 'สายไฟ SATA (PSU)', en: 'SATA power cable (PSU)' }, dest: 'hdd-pwr', from: PSU_OUT, to: add(LAYOUT.hdd.pos, [0, -0.08, -0.75]), color: '#ffbf47' });
  }
  list.push({ id: 'front', name: { th: 'สาย Power SW / Reset / LED (เคส)', en: 'Power SW / Reset / LED leads (case)' }, dest: 'mb-fp', from: [2.4, 2.2, 0.6], to: add(MB, [1.0, -1.45, 0.1]), color: '#00d9ff' });
  return list;
}

export const PASTE_OPTIONS: { id: 'dot' | 'none' | 'flood'; label: L; feedback: L }[] = [
  { id: 'none', label: { th: 'ไม่ต้องทาอะไร ประกบโลหะกับโลหะโดยตรง', en: 'Nothing — metal straight onto metal' }, feedback: { th: 'ผิวโลหะมีร่องเล็ก ๆ ที่กักอากาศซึ่งนำความร้อนได้แย่มาก ต้องมีวัสดุนำความร้อน (TIM) เว้นแต่ฐานฮีตซิงก์มีสารนำความร้อนทาไว้แล้ว', en: 'Metal surfaces trap microscopic air gaps, and air conducts heat very poorly. A thermal interface material is needed unless the cooler base comes pre-applied.' } },
  { id: 'dot', label: { th: 'สารนำความร้อนเม็ดเท่าเมล็ดถั่วตรงกลางฝา IHS', en: 'A pea-sized dot in the centre of the IHS' }, feedback: { th: 'ถูกต้อง แรงกดจากการขันฮีตซิงก์จะเกลี่ยสารนำความร้อนเป็นชั้นบางทั่วผิว', en: 'Correct: mounting pressure spreads it into a thin, even layer.' } },
  { id: 'flood', label: { th: 'ทาหนา ๆ ให้ล้นลงไปรอบซ็อกเก็ต', en: 'A thick layer spilling over onto the socket' }, feedback: { th: 'ชั้นหนาเกินไปทำให้ระบายความร้อนแย่ลง และสารนำความร้อนที่ล้นอาจเลอะหน้าสัมผัสหรือชิ้นส่วนบนบอร์ด', en: 'Too thick a layer insulates rather than conducts, and overflow can contaminate the socket or nearby components.' } },
];

export interface ChallengeCheck {
  label: L;
  pass: boolean;
}
export interface Challenge {
  id: string;
  title: L;
  brief: L;
  checks: (b: Build, gpuSkipped: boolean, firmwareUpdated: boolean) => ChallengeCheck[];
}

const noWarnings = (b: Build): boolean => checkBuild(b).length === 0;

export const CHALLENGES: Challenge[] = [
  {
    id: 'sff',
    title: { th: 'เครื่องเกมขนาดเล็ก Mini-ITX', en: 'Compact Mini-ITX gaming PC' },
    brief: { th: 'ประกอบเครื่องเกมในเคส Mini-ITX ที่มีการ์ดจอแยก และต้องไม่มีคำเตือนความเข้ากันได้เลย', en: 'Build a gaming PC in the Mini-ITX case with a discrete GPU and zero compatibility warnings.' },
    checks: (b, skipped) => [
      { label: { th: 'ใช้เคส Mini-ITX', en: 'Uses the Mini-ITX case' }, pass: b.case?.id === 'case-itx' },
      { label: { th: 'มีการ์ดจอแยก', en: 'Has a discrete GPU' }, pass: Boolean(b.gpu) && !skipped },
      { label: { th: 'ไม่มีคำเตือนความเข้ากันได้', en: 'No compatibility warnings' }, pass: noWarnings(b) },
    ],
  },
  {
    id: 'upgrade',
    title: { th: 'อัปเกรดบนบอร์ด DDR4 เดิม', en: 'Upgrade on an existing DDR4 board' },
    brief: { th: 'นักศึกษามีเมนบอร์ด LGA1700 DDR4 อยู่แล้ว และต้องการใช้ CPU รุ่นที่ 14 ทำให้เครื่องบูตผ่านให้ได้', en: 'A student already owns the LGA1700 DDR4 board and wants a 14th-gen CPU. Get the system to POST.' },
    checks: (b, _s, fw) => [
      { label: { th: 'ใช้บอร์ด LGA1700 DDR4', en: 'Uses the LGA1700 DDR4 board' }, pass: b.board?.id === 'mb-1700-ddr4' },
      { label: { th: 'ใช้ CPU รุ่นที่ 14', en: 'Uses the 14th-gen CPU' }, pass: b.cpu?.id === 'cpu-1700-14' },
      { label: { th: 'อัปเดตเฟิร์มแวร์ UEFI แล้ว', en: 'UEFI firmware updated' }, pass: fw },
    ],
  },
  {
    id: 'workstation',
    title: { th: 'เวิร์กสเตชันตัดต่อ 4K', en: '4K editing workstation' },
    brief: { th: 'ใช้การ์ดจอเรือธง SSD NVMe แรม dual-channel และ PSU ที่มีกำลังสำรองอย่างน้อย 30%', en: 'Use the flagship GPU, an NVMe SSD, dual-channel RAM and a PSU with at least 30% headroom.' },
    checks: (b) => [
      { label: { th: 'การ์ดจอเรือธง', en: 'Flagship GPU' }, pass: b.gpu?.id === 'gpu-flag' },
      { label: { th: 'SSD NVMe', en: 'NVMe SSD' }, pass: b.storage?.iface === 'm2-nvme' },
      { label: { th: 'แรม dual-channel', en: 'Dual-channel RAM' }, pass: (b.ram?.sticks ?? 0) >= 2 },
      { label: { th: 'PSU เผื่อกำลังเพียงพอ ไม่มีคำเตือน', en: 'PSU headroom with no warnings' }, pass: noWarnings(b) },
    ],
  },
];

export const PENALTY = { incompatible: 5, misplace: 3, orientation: 5, slots: 5, paste: 5, cable: 3, hint: 2 } as const;
