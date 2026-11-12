import type { ComponentId, L } from '../data/types';
import type { CameraPreset } from '../three/layout';

export interface TourStop {
  part?: ComponentId;
  preset?: CameraPreset;
  overview?: boolean;
  hotspot?: string;
  exploded?: boolean;
  xray?: boolean;
  airflow?: boolean;
  caption: L;
}

/** "Inside a desktop PC" guided camera tour. Each stop holds for TOUR_STOP_MS. */
export const TOUR: TourStop[] = [
  { overview: true, caption: { th: 'นี่คือคอมพิวเตอร์ตั้งโต๊ะครบชุด: เคสแบบมิดทาวเวอร์ จอภาพ คีย์บอร์ด และเมาส์', en: 'A complete desktop setup: a mid-tower case, monitor, keyboard and mouse.' } },
  { preset: 'iso', xray: true, caption: { th: 'ทำให้เคสโปร่งใส (X-ray) เพื่อมองเห็นชิ้นส่วนทั้งหมดที่อยู่ภายใน', en: 'X-ray mode makes the case see-through so every internal part is visible.' } },
  { part: 'motherboard', hotspot: 'mb-socket', caption: { th: 'เมนบอร์ดคือแผงวงจรหลักที่ทุกชิ้นส่วนเชื่อมต่อเข้าหา', en: 'The motherboard is the main circuit board every other part connects to.' } },
  { part: 'cooler', caption: { th: 'ชุดระบายความร้อน CPU ครอบอยู่บนซีพียู ดึงความร้อนออกผ่านท่อฮีตไปป์และครีบอลูมิเนียม', en: 'The CPU cooler sits on the processor, pulling heat out through heat pipes and aluminium fins.' } },
  { part: 'ram', hotspot: 'ram-notch', caption: { th: 'แรม 2 แถวติดตั้งในสล็อต A2 และ B2 เพื่อทำงานแบบ dual-channel', en: 'Two RAM modules sit in slots A2 and B2 for dual-channel operation.' } },
  { part: 'gpu', caption: { th: 'การ์ดจอเสียบในสล็อต PCIe x16 ตัวบนสุด ซึ่งต่อกับ CPU โดยตรง', en: 'The graphics card uses the top PCIe x16 slot, wired directly to the CPU.' } },
  { part: 'ssd', caption: { th: 'SSD แบบ M.2 NVMe วางราบบนเมนบอร์ด รับส่งข้อมูลผ่านเลน PCIe', en: 'The M.2 NVMe SSD lies flat on the board and moves data over PCIe lanes.' } },
  { part: 'psu', caption: { th: 'พาวเวอร์ซัพพลายอยู่ด้านล่างหลัง แปลงไฟบ้าน AC เป็นไฟ DC ให้ทุกชิ้นส่วน', en: 'The power supply at the bottom rear converts mains AC into DC for every part.' } },
  { part: 'hdd', caption: { th: 'ฮาร์ดดิสก์ 3.5 นิ้วเก็บข้อมูลจำนวนมากบนจานแม่เหล็กที่หมุนอยู่', en: 'The 3.5-inch hard drive stores bulk data on spinning magnetic platters.' } },
  { preset: 'iso', airflow: true, caption: { th: 'อากาศเย็นไหลเข้าด้านหน้า ผ่านฮีตซิงก์ แล้วถูกเป่าออกทางพัดลมด้านหลัง', en: 'Cool air enters at the front, crosses the heatsink and leaves through the rear fan.' } },
  { preset: 'iso', exploded: true, caption: { th: 'มุมมองแยกชิ้นส่วนเผยลำดับการวางซ้อนของชิ้นส่วนทั้งหมด', en: 'The exploded view reveals how all the parts stack together.' } },
];

export const TOUR_STOP_MS = 5200;
