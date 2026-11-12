import type { L } from '../data/types';

/**
 * Generic, generation-labelled part profiles for the Assembly Lab. They describe real platform
 * rules (sockets, DDR generations, form factors, clearances, connectors) without naming SKUs.
 */
export type Socket = 'AM5' | 'LGA1700' | 'AM4';
export type RamType = 'DDR4' | 'DDR5';
export type FormFactor = 'ATX' | 'mATX' | 'ITX';
export type StorageIface = 'm2-nvme' | 'm2-sata' | 'sata-2.5' | 'sata-3.5';

export interface CaseSpec { kind: 'case'; id: string; name: L; note: L; formFactors: FormFactor[]; gpuMaxMm: number; coolerMaxMm: number; radiatorsMm: number[]; bays35: number }
export interface BoardSpec { kind: 'board'; id: string; name: L; note: L; socket: Socket; chipset: string; formFactor: FormFactor; ramType: RamType; dimmSlots: number; m2: ('nvme' | 'sata')[]; sataPorts: number; cpuGens: Record<string, 'native' | 'bios-update'> }
export interface CpuSpec { kind: 'cpu'; id: string; name: L; note: L; socket: Socket; gen: string; ramTypes: RamType[]; tdpW: number; peakW: number; hasIgpu: boolean }
export interface RamSpec { kind: 'ram'; id: string; name: L; note: L; type: RamType; sticks: number; sizeGb: number; speed: number }
export interface StorageSpec { kind: 'storage'; id: string; name: L; note: L; iface: StorageIface }
export interface CoolerSpec { kind: 'cooler'; id: string; name: L; note: L; type: 'air' | 'aio'; heightMm: number; radiatorMm?: number; sockets: Socket[]; ratedW: number }
export interface GpuSpec { kind: 'gpu'; id: string; name: L; note: L; lengthMm: number; boardPowerW: number; connector: { pcie8: number } | '12vhpwr' }
export interface PsuSpec { kind: 'psu'; id: string; name: L; note: L; watts: number; pcie8: number; has12vhpwr: boolean; eps8: number; efficiency: string }

export type PartSpec = CaseSpec | BoardSpec | CpuSpec | RamSpec | StorageSpec | CoolerSpec | GpuSpec | PsuSpec;
export type SlotKind = PartSpec['kind'];

export const CASES: CaseSpec[] = [
  { kind: 'case', id: 'case-mid', name: { th: 'เคสมิดทาวเวอร์ ATX', en: 'Mid-tower ATX case' }, note: { th: 'รองรับ ATX/mATX/ITX · การ์ดจอยาวสุด 360 มม. · ฮีตซิงก์สูงสุด 165 มม. · หม้อน้ำ 240/280/360 · ช่อง 3.5" 2 ช่อง', en: 'ATX/mATX/ITX · GPU ≤ 360 mm · cooler ≤ 165 mm · 240/280/360 radiators · 2 × 3.5" bays' }, formFactors: ['ATX', 'mATX', 'ITX'], gpuMaxMm: 360, coolerMaxMm: 165, radiatorsMm: [240, 280, 360], bays35: 2 },
  { kind: 'case', id: 'case-matx', name: { th: 'เคสไมโคร-ATX ขนาดกะทัดรัด', en: 'Compact micro-ATX case' }, note: { th: 'รองรับ mATX/ITX · การ์ดจอยาวสุด 320 มม. · ฮีตซิงก์สูงสุด 155 มม. · หม้อน้ำ 240 · ช่อง 3.5" 1 ช่อง', en: 'mATX/ITX · GPU ≤ 320 mm · cooler ≤ 155 mm · 240 radiator · 1 × 3.5" bay' }, formFactors: ['mATX', 'ITX'], gpuMaxMm: 320, coolerMaxMm: 155, radiatorsMm: [240], bays35: 1 },
  { kind: 'case', id: 'case-itx', name: { th: 'เคส Mini-ITX ขนาดเล็ก (SFF)', en: 'Small-form-factor Mini-ITX case' }, note: { th: 'รองรับ ITX เท่านั้น · การ์ดจอยาวสุด 300 มม. · ฮีตซิงก์สูงสุด 70 มม. · หม้อน้ำ 240 · ไม่มีช่อง 3.5"', en: 'ITX only · GPU ≤ 300 mm · cooler ≤ 70 mm · 240 radiator · no 3.5" bay' }, formFactors: ['ITX'], gpuMaxMm: 300, coolerMaxMm: 70, radiatorsMm: [240], bays35: 0 },
];

export const BOARDS: BoardSpec[] = [
  { kind: 'board', id: 'mb-am5-atx', name: { th: 'เมนบอร์ด AM5 ATX (ชิปเซ็ตกลุ่ม B650)', en: 'AM5 ATX board (B650-class chipset)' }, note: { th: 'DDR5 · 4 DIMM · M.2 NVMe 2 ช่อง · SATA 4 พอร์ต', en: 'DDR5 · 4 DIMM · 2 × M.2 NVMe · 4 × SATA' }, socket: 'AM5', chipset: 'B650', formFactor: 'ATX', ramType: 'DDR5', dimmSlots: 4, m2: ['nvme'], sataPorts: 4, cpuGens: { 'ryzen-7000': 'native' } },
  { kind: 'board', id: 'mb-1700-ddr4', name: { th: 'เมนบอร์ด LGA1700 mATX แบบ DDR4 (ชิปเซ็ตกลุ่ม B660)', en: 'LGA1700 mATX DDR4 board (B660-class chipset)' }, note: { th: 'DDR4 · 4 DIMM · M.2 รองรับ NVMe และ SATA · SATA 4 พอร์ต · เฟิร์มแวร์จากโรงงานรองรับ Core รุ่นที่ 12', en: 'DDR4 · 4 DIMM · M.2 NVMe + SATA · 4 × SATA · factory firmware supports 12th-gen Core' }, socket: 'LGA1700', chipset: 'B660', formFactor: 'mATX', ramType: 'DDR4', dimmSlots: 4, m2: ['nvme', 'sata'], sataPorts: 4, cpuGens: { 'core-12': 'native', 'core-14': 'bios-update' } },
  { kind: 'board', id: 'mb-am5-itx', name: { th: 'เมนบอร์ด AM5 Mini-ITX (ชิปเซ็ตกลุ่ม B650)', en: 'AM5 Mini-ITX board (B650-class chipset)' }, note: { th: 'DDR5 · 2 DIMM · M.2 NVMe · SATA 2 พอร์ต', en: 'DDR5 · 2 DIMM · M.2 NVMe · 2 × SATA' }, socket: 'AM5', chipset: 'B650', formFactor: 'ITX', ramType: 'DDR5', dimmSlots: 2, m2: ['nvme'], sataPorts: 2, cpuGens: { 'ryzen-7000': 'native' } },
];

export const CPUS: CpuSpec[] = [
  { kind: 'cpu', id: 'cpu-am5', name: { th: 'CPU AM5 6 คอร์ (ระดับ Ryzen 7000)', en: 'AM5 6-core CPU (Ryzen 7000-series class)' }, note: { th: 'ซ็อกเก็ต AM5 · DDR5 เท่านั้น · TDP 105 W · มีกราฟิกในตัวขนาดเล็ก', en: 'Socket AM5 · DDR5 only · 105 W TDP · small integrated GPU' }, socket: 'AM5', gen: 'ryzen-7000', ramTypes: ['DDR5'], tdpW: 105, peakW: 142, hasIgpu: true },
  { kind: 'cpu', id: 'cpu-1700-14', name: { th: 'CPU LGA1700 (ระดับ Intel Core รุ่นที่ 14)', en: 'LGA1700 CPU (Intel 14th-gen Core class)' }, note: { th: 'ซ็อกเก็ต LGA1700 · รองรับ DDR4 หรือ DDR5 · กำลังไฟพื้นฐาน 65 W (สูงสุดราว 150 W)', en: 'Socket LGA1700 · DDR4 or DDR5 · 65 W base (up to ~150 W turbo)' }, socket: 'LGA1700', gen: 'core-14', ramTypes: ['DDR4', 'DDR5'], tdpW: 65, peakW: 150, hasIgpu: true },
  { kind: 'cpu', id: 'cpu-am4', name: { th: 'CPU AM4 8 คอร์ (ระดับ Ryzen 5000)', en: 'AM4 8-core CPU (Ryzen 5000-series class)' }, note: { th: 'ซ็อกเก็ต AM4 แบบขา PGA · DDR4 · TDP 105 W', en: 'Socket AM4 (PGA pins) · DDR4 · 105 W TDP' }, socket: 'AM4', gen: 'ryzen-5000', ramTypes: ['DDR4'], tdpW: 105, peakW: 142, hasIgpu: false },
];

export const RAMS: RamSpec[] = [
  { kind: 'ram', id: 'ram-ddr5-2x16', name: { th: 'DDR5 2×16 GB 6000 MT/s', en: 'DDR5 2×16 GB 6000 MT/s' }, note: { th: 'ชุด 2 แถวสำหรับ dual-channel', en: 'Two-module dual-channel kit' }, type: 'DDR5', sticks: 2, sizeGb: 16, speed: 6000 },
  { kind: 'ram', id: 'ram-ddr4-2x16', name: { th: 'DDR4 2×16 GB 3200 MT/s', en: 'DDR4 2×16 GB 3200 MT/s' }, note: { th: 'ชุด 2 แถว รอยบาก DIMM ต่างจาก DDR5', en: 'Two-module kit; DIMM notch differs from DDR5' }, type: 'DDR4', sticks: 2, sizeGb: 16, speed: 3200 },
  { kind: 'ram', id: 'ram-ddr5-1x16', name: { th: 'DDR5 1×16 GB 5600 MT/s', en: 'DDR5 1×16 GB 5600 MT/s' }, note: { th: 'แถวเดียว ทำงานแบบ single-channel', en: 'Single module, runs single-channel' }, type: 'DDR5', sticks: 1, sizeGb: 16, speed: 5600 },
];

export const STORAGES: StorageSpec[] = [
  { kind: 'storage', id: 'st-nvme', name: { th: 'SSD M.2 2280 NVMe (PCIe 4.0 x4)', en: 'M.2 2280 NVMe SSD (PCIe 4.0 x4)' }, note: { th: 'M-key · อ่านต่อเนื่องราว 7,000 MB/s', en: 'M-key · ~7,000 MB/s sequential read' }, iface: 'm2-nvme' },
  { kind: 'storage', id: 'st-m2sata', name: { th: 'SSD M.2 2280 แบบ SATA', en: 'M.2 2280 SATA SSD' }, note: { th: 'B+M key · ใช้โปรโตคอล SATA ราว 550 MB/s', en: 'B+M key · SATA protocol, ~550 MB/s' }, iface: 'm2-sata' },
  { kind: 'storage', id: 'st-hdd', name: { th: 'HDD 3.5" SATA 4 TB 7200 rpm', en: '3.5" SATA HDD 4 TB 7200 rpm' }, note: { th: 'ต้องการช่อง 3.5" และสาย SATA + ไฟ SATA', en: 'Needs a 3.5" bay, SATA data and SATA power' }, iface: 'sata-3.5' },
];

export const COOLERS: CoolerSpec[] = [
  { kind: 'cooler', id: 'cool-tower', name: { th: 'ฮีตซิงก์ทาวเวอร์ 120 มม. สูง 158 มม.', en: '120 mm tower air cooler, 158 mm tall' }, note: { th: 'รองรับ AM5/AM4/LGA1700 · ระบายได้ราว 220 W', en: 'AM5/AM4/LGA1700 · ~220 W rated' }, type: 'air', heightMm: 158, sockets: ['AM5', 'AM4', 'LGA1700'], ratedW: 220 },
  { kind: 'cooler', id: 'cool-low', name: { th: 'ฮีตซิงก์โลว์โปรไฟล์ สูง 47 มม.', en: 'Low-profile air cooler, 47 mm tall' }, note: { th: 'รองรับ AM5/AM4/LGA1700 · ระบายได้ราว 95 W', en: 'AM5/AM4/LGA1700 · ~95 W rated' }, type: 'air', heightMm: 47, sockets: ['AM5', 'AM4', 'LGA1700'], ratedW: 95 },
  { kind: 'cooler', id: 'cool-aio', name: { th: 'ชุดน้ำปิด AIO หม้อน้ำ 240 มม.', en: '240 mm AIO liquid cooler' }, note: { th: 'รองรับ AM5/AM4/LGA1700 · ต้องมีจุดยึดหม้อน้ำ 240 มม.', en: 'AM5/AM4/LGA1700 · needs a 240 mm radiator mount' }, type: 'aio', heightMm: 55, radiatorMm: 240, sockets: ['AM5', 'AM4', 'LGA1700'], ratedW: 250 },
];

export const GPUS: GpuSpec[] = [
  { kind: 'gpu', id: 'gpu-mid', name: { th: 'การ์ดจอระดับกลาง 2 พัดลม', en: 'Mid-range dual-fan graphics card' }, note: { th: 'ยาว 242 มม. · กินไฟราว 170 W · PCIe 8-pin ×1', en: '242 mm long · ~170 W · 1 × 8-pin PCIe' }, lengthMm: 242, boardPowerW: 170, connector: { pcie8: 1 } },
  { kind: 'gpu', id: 'gpu-high', name: { th: 'การ์ดจอระดับสูง 3 พัดลม', en: 'High-end triple-fan graphics card' }, note: { th: 'ยาว 336 มม. · กินไฟราว 300 W · PCIe 8-pin ×2', en: '336 mm long · ~300 W · 2 × 8-pin PCIe' }, lengthMm: 336, boardPowerW: 300, connector: { pcie8: 2 } },
  { kind: 'gpu', id: 'gpu-flag', name: { th: 'การ์ดจอเรือธง 16-pin', en: 'Flagship 16-pin graphics card' }, note: { th: 'ยาว 304 มม. · กินไฟราว 450 W · หัว 12VHPWR / 12V-2x6 (16 พิน)', en: '304 mm long · ~450 W · 12VHPWR / 12V-2x6 connector' }, lengthMm: 304, boardPowerW: 450, connector: '12vhpwr' },
];

export const PSUS: PsuSpec[] = [
  { kind: 'psu', id: 'psu-450', name: { th: 'PSU 450 W 80 PLUS Bronze', en: '450 W 80 PLUS Bronze PSU' }, note: { th: 'EPS 8-pin ×1 · PCIe 6+2-pin ×1', en: '1 × EPS 8-pin · 1 × PCIe 6+2-pin' }, watts: 450, pcie8: 1, has12vhpwr: false, eps8: 1, efficiency: 'Bronze' },
  { kind: 'psu', id: 'psu-750', name: { th: 'PSU 750 W 80 PLUS Gold', en: '750 W 80 PLUS Gold PSU' }, note: { th: 'EPS 8-pin ×2 · PCIe 6+2-pin ×3', en: '2 × EPS 8-pin · 3 × PCIe 6+2-pin' }, watts: 750, pcie8: 3, has12vhpwr: false, eps8: 2, efficiency: 'Gold' },
  { kind: 'psu', id: 'psu-1000', name: { th: 'PSU 1000 W ATX 3.x 80 PLUS Gold', en: '1000 W ATX 3.x 80 PLUS Gold PSU' }, note: { th: 'EPS 8-pin ×2 · PCIe 6+2-pin ×3 · หัว 12VHPWR / 12V-2x6 (16 พิน) แบบเนทีฟ', en: '2 × EPS 8-pin · 3 × PCIe 6+2-pin · native 12VHPWR / 12V-2x6 (16-pin)' }, watts: 1000, pcie8: 3, has12vhpwr: true, eps8: 2, efficiency: 'Gold' },
];

export const CATALOG: Record<SlotKind, PartSpec[]> = {
  case: CASES, board: BOARDS, cpu: CPUS, ram: RAMS, storage: STORAGES, cooler: COOLERS, gpu: GPUS, psu: PSUS,
};
