import type { L } from '../data/types';
import type { BoardSpec, CaseSpec, CoolerSpec, CpuSpec, GpuSpec, PsuSpec, RamSpec, StorageSpec } from './catalog';

export interface Build {
  case?: CaseSpec;
  board?: BoardSpec;
  cpu?: CpuSpec;
  ram?: RamSpec;
  storage?: StorageSpec;
  cooler?: CoolerSpec;
  gpu?: GpuSpec;
  psu?: PsuSpec;
}

export type RuleId =
  | 'socket' | 'firmware' | 'chipset' | 'ram-gen' | 'ram-cpu' | 'ram-slots' | 'ram-channel' | 'form-factor'
  | 'gpu-clearance' | 'cooler-height' | 'cooler-radiator' | 'cooler-socket' | 'cooler-capacity'
  | 'm2-protocol' | 'bay-35' | 'sata-ports' | 'psu-watts' | 'psu-headroom' | 'psu-gpu-connector' | 'psu-eps';

export interface Issue {
  rule: RuleId;
  /** error = will not physically fit / cannot work; warn = works with a caveat or extra step. */
  level: 'error' | 'warn';
  msg: L;
}

/** Board, RAM, drives, fans and USB devices: a conservative allowance for the rest of the system. */
export const BASE_LOAD_W = 75;
/** Recommended spare capacity on top of the estimated peak load. */
export const PSU_HEADROOM = 1.3;

export function estimateLoadW(b: Build): number {
  return (b.cpu?.peakW ?? 0) + (b.gpu?.boardPowerW ?? 0) + BASE_LOAD_W;
}

const err = (rule: RuleId, th: string, en: string): Issue => ({ rule, level: 'error', msg: { th, en } });
const warn = (rule: RuleId, th: string, en: string): Issue => ({ rule, level: 'warn', msg: { th, en } });

function cpuRules(b: Build): Issue[] {
  const out: Issue[] = [];
  const { cpu, board } = b;
  if (!cpu || !board) return out;
  if (cpu.socket !== board.socket) {
    out.push(err('socket', `ซ็อกเก็ตไม่ตรงกัน: CPU ใช้ ${cpu.socket} แต่เมนบอร์ดเป็น ${board.socket} ขาและหน้าสัมผัสจะไม่ตรงกันทางกายภาพ`, `Socket mismatch: the CPU is ${cpu.socket} but the board is ${board.socket}; pins and contacts physically do not line up.`));
    return out;
  }
  const support = board.cpuGens[cpu.gen];
  if (!support) {
    out.push(err('chipset', `ชิปเซ็ต ${board.chipset} ไม่รองรับ CPU รุ่นนี้ แม้ซ็อกเก็ตจะเหมือนกัน`, `The ${board.chipset} chipset does not support this CPU generation, even though the socket matches.`));
  } else if (support === 'bios-update') {
    out.push(warn('firmware', `ซ็อกเก็ตตรงกันแต่เฟิร์มแวร์ UEFI จากโรงงานยังไม่รู้จัก CPU รุ่นนี้ ต้องอัปเดต UEFI ก่อน (เช่น BIOS Flashback) มิฉะนั้นเครื่องจะไม่ผ่าน POST`, 'The socket matches, but the factory UEFI firmware does not know this CPU yet. Update the UEFI first (e.g. BIOS Flashback) or the system will not POST.'));
  }
  return out;
}

function ramRules(b: Build): Issue[] {
  const out: Issue[] = [];
  const { ram, board, cpu } = b;
  if (!ram) return out;
  if (board && ram.type !== board.ramType) {
    out.push(err('ram-gen', `เมนบอร์ดรองรับ ${board.ramType} แต่แรมเป็น ${ram.type} รอยบากของ DIMM อยู่คนละตำแหน่งจึงเสียบไม่ได้`, `The board takes ${board.ramType} but the kit is ${ram.type}; the DIMM notch is in a different place, so it cannot be inserted.`));
  }
  if (cpu && !cpu.ramTypes.includes(ram.type)) {
    out.push(err('ram-cpu', `ตัวควบคุมหน่วยความจำใน CPU รองรับเฉพาะ ${cpu.ramTypes.join('/')}`, `The CPU's memory controller only supports ${cpu.ramTypes.join('/')}.`));
  }
  if (board && ram.sticks > board.dimmSlots) {
    out.push(err('ram-slots', `แรม ${ram.sticks} แถว แต่เมนบอร์ดมีเพียง ${board.dimmSlots} สล็อต`, `${ram.sticks} modules but the board has only ${board.dimmSlots} slots.`));
  }
  if (ram.sticks === 1) {
    out.push(warn('ram-channel', 'แรมแถวเดียวทำงานแบบ single-channel แบนด์วิดท์หน่วยความจำจะเหลือราวครึ่งหนึ่งของ dual-channel', 'A single module runs single-channel, roughly halving memory bandwidth compared with dual-channel.'));
  }
  return out;
}

function caseRules(b: Build): Issue[] {
  const out: Issue[] = [];
  const c = b.case;
  if (!c) return out;
  if (b.board && !c.formFactors.includes(b.board.formFactor)) {
    out.push(err('form-factor', `เคสรองรับ ${c.formFactors.join('/')} แต่เมนบอร์ดเป็น ${b.board.formFactor} ตำแหน่งรูยึด (standoff) และขนาดไม่ตรงกัน`, `The case accepts ${c.formFactors.join('/')} but the board is ${b.board.formFactor}; size and standoff positions do not match.`));
  }
  if (b.gpu && b.gpu.lengthMm > c.gpuMaxMm) {
    out.push(err('gpu-clearance', `การ์ดจอยาว ${b.gpu.lengthMm} มม. เกินระยะที่เคสรองรับ ${c.gpuMaxMm} มม.`, `The ${b.gpu.lengthMm} mm card exceeds the case's ${c.gpuMaxMm} mm GPU clearance.`));
  }
  if (b.cooler?.type === 'air' && b.cooler.heightMm > c.coolerMaxMm) {
    out.push(err('cooler-height', `ฮีตซิงก์สูง ${b.cooler.heightMm} มม. เกินความสูงสูงสุด ${c.coolerMaxMm} มม. ฝาข้างจะปิดไม่ได้`, `The ${b.cooler.heightMm} mm cooler exceeds the ${c.coolerMaxMm} mm limit; the side panel will not close.`));
  }
  if (b.cooler?.type === 'aio' && b.cooler.radiatorMm && !c.radiatorsMm.includes(b.cooler.radiatorMm)) {
    out.push(err('cooler-radiator', `เคสไม่มีจุดยึดหม้อน้ำ ${b.cooler.radiatorMm} มม.`, `The case has no ${b.cooler.radiatorMm} mm radiator mount.`));
  }
  if (b.storage?.iface === 'sata-3.5' && c.bays35 === 0) {
    out.push(err('bay-35', 'เคสนี้ไม่มีช่องใส่ไดรฟ์ 3.5 นิ้ว', 'This case has no 3.5-inch drive bay.'));
  }
  return out;
}

function coolerRules(b: Build): Issue[] {
  const out: Issue[] = [];
  const { cooler, cpu } = b;
  if (!cooler || !cpu) return out;
  if (!cooler.sockets.includes(cpu.socket)) {
    out.push(err('cooler-socket', `ชุดยึดของฮีตซิงก์ไม่รองรับซ็อกเก็ต ${cpu.socket}`, `The cooler's mounting kit does not support socket ${cpu.socket}.`));
  }
  if (cooler.ratedW < cpu.peakW) {
    out.push(warn('cooler-capacity', `ระบายความร้อนได้ราว ${cooler.ratedW} W แต่ CPU ใช้ไฟสูงสุดราว ${cpu.peakW} W อาจร้อนจนลดความเร็วตัวเอง (thermal throttling)`, `Rated for ~${cooler.ratedW} W but the CPU can draw ~${cpu.peakW} W; expect thermal throttling under load.`));
  }
  return out;
}

function storageRules(b: Build): Issue[] {
  const out: Issue[] = [];
  const { storage, board } = b;
  if (!storage || !board) return out;
  if (storage.iface === 'm2-nvme' && !board.m2.includes('nvme')) {
    out.push(err('m2-protocol', 'ช่อง M.2 ของบอร์ดรองรับเฉพาะ SATA ไดรฟ์ NVMe จะเสียบได้แต่ไม่ถูกตรวจพบ', 'The board\'s M.2 socket is SATA-only; an NVMe drive may fit but will not be detected.'));
  }
  if (storage.iface === 'm2-sata' && !board.m2.includes('sata')) {
    out.push(err('m2-protocol', 'ช่อง M.2 ของบอร์ดนี้รองรับเฉพาะ NVMe (PCIe) จึงตรวจไม่พบ SSD M.2 แบบ SATA', 'This board\'s M.2 socket is NVMe (PCIe) only, so an M.2 SATA SSD will not be detected.'));
  }
  if ((storage.iface === 'sata-2.5' || storage.iface === 'sata-3.5') && board.sataPorts === 0) {
    out.push(err('sata-ports', 'เมนบอร์ดไม่มีพอร์ต SATA', 'The board has no SATA ports.'));
  }
  return out;
}

function psuRules(b: Build): Issue[] {
  const out: Issue[] = [];
  const { psu, gpu } = b;
  if (!psu) return out;
  const load = estimateLoadW(b);
  if (psu.watts < load) {
    out.push(err('psu-watts', `โหลดสูงสุดประมาณ ${load} W เกินกำลัง PSU ${psu.watts} W`, `Estimated peak load of ${load} W exceeds the ${psu.watts} W PSU.`));
  } else if (psu.watts < load * PSU_HEADROOM) {
    out.push(warn('psu-headroom', `โหลดประมาณ ${load} W ควรมีกำลังสำรองราว 30% (≈ ${Math.round(load * PSU_HEADROOM)} W) เพื่อรับไฟกระชากและการเสื่อมตามอายุ`, `Estimated load ${load} W; about 30% headroom (≈ ${Math.round(load * PSU_HEADROOM)} W) is recommended for spikes and ageing.`));
  }
  if (gpu) {
    if (gpu.connector === '12vhpwr') {
      if (!psu.has12vhpwr && psu.pcie8 < 3) {
        out.push(err('psu-gpu-connector', 'การ์ดจอต้องใช้หัว 12VHPWR / 12V-2x6 (16-pin) หรืออะแดปเตอร์จาก 8-pin ×3 แต่ PSU มีหัวไม่พอ', 'The card needs a 12VHPWR / 12V-2x6 (16-pin) cable or an adapter from 3 × 8-pin, and this PSU has too few connectors.'));
      } else if (!psu.has12vhpwr) {
        out.push(warn('psu-gpu-connector', 'PSU ไม่มีหัว 12VHPWR / 12V-2x6 (16 พิน) แบบเนทีฟ ต้องใช้อะแดปเตอร์ที่ให้มากับการ์ด เสียบให้สุดและไม่งอสายใกล้หัว', 'No native 12VHPWR / 12V-2x6 (16-pin) cable: use the adapter supplied with the card, seat it fully and avoid bending the cable near the plug.'));
      }
    } else if (gpu.connector.pcie8 > psu.pcie8) {
      out.push(err('psu-gpu-connector', `การ์ดจอต้องการหัว PCIe 8-pin ${gpu.connector.pcie8} เส้น แต่ PSU มี ${psu.pcie8} เส้น`, `The card needs ${gpu.connector.pcie8} × 8-pin PCIe but the PSU provides ${psu.pcie8}.`));
    }
  }
  if (psu.eps8 < 1) out.push(err('psu-eps', 'PSU ไม่มีหัวไฟเลี้ยง CPU (EPS 8-pin)', 'The PSU has no CPU (EPS 8-pin) power connector.'));
  return out;
}

/** Evaluates every rule that applies to the parts chosen so far. Order: errors first. */
export function checkBuild(b: Build): Issue[] {
  const all = [...cpuRules(b), ...ramRules(b), ...caseRules(b), ...coolerRules(b), ...storageRules(b), ...psuRules(b)];
  return [...all.filter((i) => i.level === 'error'), ...all.filter((i) => i.level === 'warn')];
}

export function hasErrors(issues: Issue[]): boolean {
  return issues.some((i) => i.level === 'error');
}
