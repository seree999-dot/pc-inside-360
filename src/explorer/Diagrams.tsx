import { useEffect, useState } from 'react';
import { useApp } from '../store/appStore';
import { useT } from '../i18n';
import type { L } from '../data/types';

const FDE: { k: L; d: L }[] = [
  { k: { th: 'Fetch ดึงคำสั่ง', en: 'Fetch' }, d: { th: 'Program Counter ชี้ตำแหน่งคำสั่งถัดไป CPU อ่านคำสั่งจากแคช L1 (หรือ L2/L3/RAM หากไม่พบ)', en: 'The program counter points to the next instruction; the CPU reads it from L1 cache (or L2/L3/RAM on a miss).' } },
  { k: { th: 'Decode ถอดรหัส', en: 'Decode' }, d: { th: 'หน่วยถอดรหัสแปลคำสั่งเป็นการทำงานย่อย (micro-ops) และระบุรีจิสเตอร์ที่ต้องใช้', en: 'The decoder turns the instruction into micro-operations and identifies the registers involved.' } },
  { k: { th: 'Execute ประมวลผล', en: 'Execute' }, d: { th: 'ALU/FPU คำนวณ หรือหน่วย load/store อ่าน-เขียนหน่วยความจำ', en: 'The ALU/FPU computes, or the load/store unit reads or writes memory.' } },
  { k: { th: 'Write-back เขียนผล', en: 'Write-back' }, d: { th: 'ผลลัพธ์ถูกเขียนกลับรีจิสเตอร์ PC เลื่อนไปคำสั่งถัดไป แล้ววนซ้ำหลายพันล้านครั้งต่อวินาที', en: 'The result is written to a register, the PC advances and the cycle repeats billions of times per second.' } },
];

const reduced = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useStepper(n: number, ms: number): [number, (i: number) => void] {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(!reduced());
  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(id);
  }, [auto, n, ms]);
  return [i, (v: number) => { setAuto(false); setI(v); }];
}

/** Animated, steppable fetch-decode-execute cycle (conceptual). */
export function FdeDiagram() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const [i, go] = useStepper(FDE.length, 2200);
  return (
    <figure className="diagram">
      <figcaption>{t('fdeTitle')} <small>({t('conceptual')})</small></figcaption>
      <ol className="cycle" role="list">
        {FDE.map((s, idx) => (
          <li key={idx}>
            <button type="button" className={`cycle__step${idx === i ? ' is-on' : ''}`} aria-pressed={idx === i} onClick={() => go(idx)}>
              {s.k[lang]}
            </button>
          </li>
        ))}
      </ol>
      <p className="diagram__text" aria-live="polite">{FDE[i].d[lang]}</p>
    </figure>
  );
}

const HEAT: L[] = [
  { th: 'แกนซีพียู (die)', en: 'CPU die' },
  { th: 'ฝาครอบ IHS', en: 'Heat spreader (IHS)' },
  { th: 'สารนำความร้อน (TIM)', en: 'Thermal paste (TIM)' },
  { th: 'ฐานทองแดง', en: 'Copper base' },
  { th: 'ท่อฮีตไปป์', en: 'Heat pipes' },
  { th: 'ครีบอลูมิเนียม', en: 'Aluminium fins' },
  { th: 'ลมจากพัดลม', en: 'Fan airflow' },
];
const HEAT_NOTE: L = {
  th: 'ความร้อนไหลจากจุดร้อนไปจุดเย็นเสมอ สารนำความร้อนเติมช่องว่างอากาศเล็ก ๆ ระหว่างผิวโลหะ ท่อฮีตไปป์ใช้ของเหลวที่ระเหยและควบแน่นพาความร้อนได้เร็ว ครีบเพิ่มพื้นที่ผิวให้ลมพาความร้อนออกจากเคส',
  en: 'Heat always flows from hot to cold. Paste fills microscopic air gaps between metal surfaces, heat pipes move heat fast by evaporating and condensing a working fluid, and fins add surface area so airflow can carry the heat out of the case.',
};

/** CPU → TIM → heatsink → airflow conduction chain, with a travelling heat pulse. */
export function ThermalDiagram() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const [i, go] = useStepper(HEAT.length, 900);
  return (
    <figure className="diagram">
      <figcaption>{t('thermalTitle')} <small>({t('conceptual')})</small></figcaption>
      <ol className="heatchain" role="list">
        {HEAT.map((h, idx) => (
          <li key={idx}>
            <button
              type="button"
              className={`heatchain__node${idx <= i ? ' is-hot' : ''}`}
              style={{ ['--heat' as string]: String(1 - idx / (HEAT.length - 1)) }}
              onClick={() => go(idx)}
            >
              {h[lang]}
            </button>
          </li>
        ))}
      </ol>
      <p className="diagram__text">{HEAT_NOTE[lang]}</p>
    </figure>
  );
}
