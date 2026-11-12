import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useApp } from '../store/appStore';
import { useT } from '../i18n';
import { Viewer } from '../three/Viewer';
import { Icon } from '../components/Icon';
import { CATALOG } from './catalog';
import type { PartSpec } from './catalog';
import { CHALLENGES, STEPS } from './steps';
import { nextStep, useAssembly } from './store';
import { AssemblyScene, ASSEMBLY_HOME, targetScreen } from './AssemblyScene';
import { CableTask, CpuOrientTask, PasteTask, PowerTask, RamSlotTask } from './Tasks';

const GLYPH: Record<PartSpec['kind'], 'cube' | 'chart' | 'sparkle' | 'layers' | 'wind' | 'bolt' | 'scale'> = {
  case: 'cube', board: 'layers', cpu: 'sparkle', ram: 'chart', storage: 'layers', cooler: 'wind', gpu: 'scale', psu: 'bolt',
};

interface DragState {
  x: number;
  y: number;
  label: string;
}

function Intro() {
  const lang = useApp((s) => s.lang);
  const a = useAssembly.getState();
  return (
    <div className="page asm-intro">
      <header className="page__head">
        <div>
          <p className="eyebrow">{lang === 'th' ? 'ห้องปฏิบัติการประกอบเครื่องเสมือน' : 'Virtual PC Assembly Laboratory'}</p>
          <h1>{lang === 'th' ? 'ประกอบคอมพิวเตอร์ 10 ขั้นตอน' : 'Build a PC in 10 steps'}</h1>
          <p>{lang === 'th' ? 'เลือกชิ้นส่วนจากข้อมูลสเปกจริง ระบบจะตรวจความเข้ากันได้ด้วยกฎที่ชัดเจน (ซ็อกเก็ต, DDR, ขนาดบอร์ด, ระยะในเคส, กำลังไฟ, หัวต่อ) การติดตั้งเป็นการจำลองแบบย่อเพื่อการเรียนรู้ ไม่ใช่การจำลองทางฟิสิกส์' : 'Choose parts from explicit specs; compatibility is checked with clear rules (socket, DDR, form factor, clearances, wattage, connectors). Installation is a simplified teaching interaction, not a physics simulation.'}</p>
        </div>
      </header>
      <aside className="asm-note card">
        <b>{lang === 'th' ? 'ลำดับในห้องนี้กับงานจริง' : 'Lab order vs real builds'}</b>
        <p>{lang === 'th'
          ? 'ห้องปฏิบัติการใช้ลำดับเพื่อการสอน: เคส → เมนบอร์ด → CPU → แรม → หน่วยเก็บข้อมูล → ชุดระบายความร้อน → การ์ดจอ → PSU → สายไฟ → เปิดเครื่อง เพื่อให้เห็นความสัมพันธ์ของแต่ละชิ้นทีละขั้น ในงานจริงช่างมักติดตั้ง CPU แรม SSD M.2 และหลายครั้งรวมถึงชุดระบายความร้อน บนเมนบอร์ดที่วางบนกล่องก่อนนำเข้าเคส ติดแผ่นปิด I/O ก่อนวางบอร์ด (ถ้าไม่ได้ติดมากับบอร์ด) และมักใส่ PSU ก่อนการ์ดจอเพื่อเดินสายได้สะดวก'
          : 'The lab uses a teaching order — case → motherboard → CPU → RAM → storage → cooler → GPU → PSU → cables → power on — so each relationship is seen one step at a time. In real builds the CPU, RAM, M.2 SSD and often the cooler are fitted to the board on its box before it goes into the case, the I/O shield goes in first (unless pre-installed), and the PSU is often installed before the GPU to make cable routing easier.'}</p>
      </aside>
      <div className="asm-modes">
        <button type="button" className="mode-card" onClick={() => a.start('practice')}>
          <span className="feature__icon"><Icon name="wrench" size={22} /></span>
          <b>{lang === 'th' ? 'ฝึกประกอบอิสระ' : 'Guided practice'}</b>
          <span>{lang === 'th' ? 'เลือกชิ้นส่วนได้อิสระ พร้อมคำแนะนำทุกขั้น' : 'Free choice of parts with guidance at every step.'}</span>
        </button>
        {CHALLENGES.map((c) => (
          <button key={c.id} type="button" className="mode-card mode-card--challenge" onClick={() => a.start('challenge', c.id)}>
            <span className="badge">{lang === 'th' ? 'ภารกิจ' : 'Challenge'}</span>
            <b>{c.title[lang]}</b>
            <span>{c.brief[lang]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Screen 4: step-by-step assembly with drag-and-drop, snap targets, scoring and compatibility checks. */
export function AssemblyView() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const s = useAssembly();
  const stageRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<DragState | null>(null);

  if (!s.started) return <Intro />;
  const step = STEPS[s.step];
  const options = step.slot ? CATALOG[step.slot] : [];
  const chosen = step.slot ? s.build[step.slot] : undefined;
  const challenge = CHALLENGES.find((c) => c.id === s.challengeId);

  const beginDrag = (e: ReactPointerEvent<HTMLButtonElement>, label: string) => {
    if (s.phase !== 'place') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ x: e.clientX, y: e.clientY, label });
  };
  const moveDrag = (e: ReactPointerEvent) => { if (drag) setDrag({ ...drag, x: e.clientX, y: e.clientY }); };
  const endDrag = (e: ReactPointerEvent) => {
    if (!drag) return;
    setDrag(null);
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!inside) return;
    const d = Math.hypot(e.clientX - rect.left - targetScreen.x, e.clientY - rect.top - targetScreen.y);
    if (targetScreen.visible && d <= targetScreen.r) useAssembly.getState().install();
    else useAssembly.getState().misplace();
  };

  return (
    <div className="asm" onPointerMove={moveDrag} onPointerUp={endDrag}>
      <aside className="asm__steps" aria-label={lang === 'th' ? 'ขั้นตอน' : 'Steps'}>
        <div className="asm__score">
          <span>{lang === 'th' ? 'คะแนน' : 'Score'}</span><b>{s.score}</b>
          <div className="meter" aria-hidden="true"><i style={{ width: `${(s.step / (STEPS.length - 1)) * 100}%` }} /></div>
          <small>{s.step + 1}/{STEPS.length} · {challenge ? challenge.title[lang] : lang === 'th' ? 'ฝึกอิสระ' : 'Practice'}</small>
        </div>
        <ol>
          {STEPS.map((st, i) => (
            <li key={st.id} className={i < s.step || (i === s.step && s.phase === 'done') ? 'is-done' : i === s.step ? 'is-on' : ''} aria-current={i === s.step ? 'step' : undefined}>
              <span>{i + 1}</span>{st.title[lang]}
            </li>
          ))}
        </ol>
        <div className="row">
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => s.undo()} disabled={s.history.length === 0}>{t('undo')}</button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => s.reset()}>{t('reset')}</button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => useAssembly.setState({ started: false })}>{lang === 'th' ? 'เปลี่ยนโหมด' : 'Change mode'}</button>
        </div>
      </aside>

      <section className="asm__stage" ref={stageRef}>
        <Viewer label={lang === 'th' ? 'โต๊ะประกอบเครื่อง 3 มิติ' : '3D assembly bench'} className="stage__viewer" camera={{ position: ASSEMBLY_HOME.pos }}>
          <AssemblyScene />
        </Viewer>
        {s.build.board && s.build.board.formFactor !== 'ATX' && (
          <p className="asm__note">{lang === 'th' ? `โมเดล 3 มิติแสดงเมนบอร์ดแบบ ATX เป็นตัวแทนทั่วไป (บอร์ดที่เลือกเป็น ${s.build.board.formFactor})` : `The 3D bench shows a generic ATX board as a representation (your board is ${s.build.board.formFactor}).`}</p>
        )}
        {!s.build.case && <p className="stage__hint">{lang === 'th' ? 'เริ่มจากเลือกเคสทางขวา' : 'Start by choosing a case on the right'}</p>}
        {s.phase === 'place' && step.slot && (
          <p className="asm__drop-hint" aria-live="polite"><Icon name="cube" size={16} /> {lang === 'th' ? 'ลากการ์ดชิ้นส่วนมาวางบนกรอบเรืองแสง · หรือคลิกกรอบ · หรือกด "ติดตั้ง"' : 'Drag the part card onto the glowing outline · or click the outline · or press "Install"'}</p>
        )}
        <div className="asm__cam row">
          <button type="button" className="tool" aria-label={t('tbReset')} title={t('tbReset')} onClick={() => useApp.getState().cam({ kind: 'reset' })}><Icon name="home" /></button>
          <button type="button" className="tool" aria-label={t('tbZoomIn')} title={t('tbZoomIn')} onClick={() => useApp.getState().cam({ kind: 'zoom', factor: 0.75 })}><Icon name="zoomIn" /></button>
          <button type="button" className="tool" aria-label={t('tbZoomOut')} title={t('tbZoomOut')} onClick={() => useApp.getState().cam({ kind: 'zoom', factor: 1.3 })}><Icon name="zoomOut" /></button>
        </div>
      </section>

      <aside className="asm__panel" aria-live="polite">
        <p className="eyebrow">{lang === 'th' ? 'ขั้นที่' : 'Step'} {s.step + 1}</p>
        <h2>{step.title[lang]}</h2>
        <p className="muted">{step.instruction[lang]}</p>
        {challenge && <p className="asm__brief"><b>{lang === 'th' ? 'ภารกิจ:' : 'Brief:'}</b> {challenge.brief[lang]}</p>}

        {s.feedback && (
          <div className={`feedback ${s.feedback.level === 'error' ? 'is-wrong' : s.feedback.level === 'ok' ? 'is-right' : 'is-info'}`} role={s.feedback.level === 'error' ? 'alert' : 'status'}>
            <b>{s.feedback.msg[lang]}</b>
            {s.feedback.issues?.map((i, k) => <p key={k}>{i.level === 'error' ? '✕' : '!'} {i.msg[lang]}</p>)}
          </div>
        )}

        {s.phase === 'choose' && step.slot && (
          <div className="parts">
            {options.map((p) => (
              <button key={p.id} type="button" className="part-card" onClick={() => s.choose(p)}>
                <span className="part-card__icon"><Icon name={GLYPH[p.kind]} size={20} /></span>
                <b>{p.name[lang]}</b>
                <small>{p.note[lang]}</small>
              </button>
            ))}
            {step.id === 'gpu' && (
              <button type="button" className="part-card part-card--alt" onClick={() => s.skipGpu(Boolean(s.build.cpu?.hasIgpu))}>
                <b>{lang === 'th' ? 'ไม่ใส่การ์ดจอ (ใช้กราฟิกในตัว CPU)' : 'No graphics card (use integrated graphics)'}</b>
              </button>
            )}
          </div>
        )}
        {s.phase === 'prep' && step.id === 'cpu' && <CpuOrientTask />}
        {s.phase === 'prep' && step.id === 'ram' && <RamSlotTask />}
        {s.phase === 'prep' && step.id === 'cooler' && <PasteTask />}
        {s.phase === 'place' && chosen && (
          <div className="drag-src">
            <button type="button" className="part-card part-card--drag" onPointerDown={(e) => beginDrag(e, chosen.name[lang])} aria-describedby="drag-help">
              <span className="part-card__icon"><Icon name={GLYPH[chosen.kind]} size={20} /></span>
              <b>{chosen.name[lang]}</b>
              <small id="drag-help">{lang === 'th' ? 'ลากไปที่กรอบเรืองแสงในมุมมอง 3 มิติ' : 'Drag onto the glowing outline in the 3D view'}</small>
            </button>
            <button type="button" className="btn" onClick={() => s.install()}><Icon name="check" size={16} /> {lang === 'th' ? 'ติดตั้ง' : 'Install'}</button>
          </div>
        )}
        {step.id === 'cables' && s.phase !== 'done' && <CableTask />}
        {step.id === 'power' && <PowerTask />}

        <div className="asm__foot row">
          {step.id !== 'power' && <button type="button" className="btn btn--ghost btn--sm" onClick={() => s.useHint()}><Icon name="sparkle" size={14} /> {lang === 'th' ? 'คำใบ้ (−2)' : 'Hint (−2)'}</button>}
          {s.phase === 'done' && step.id !== 'power' && <button type="button" className="btn" onClick={nextStep}>{t('next')} <Icon name="chevron" size={14} /></button>}
        </div>
      </aside>
      {drag && <div className="drag-ghost" style={{ left: drag.x, top: drag.y }} aria-hidden="true">{drag.label}</div>}
    </div>
  );
}
