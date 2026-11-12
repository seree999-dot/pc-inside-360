import { useEffect } from 'react';
import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import { useAssembly } from './store';
import { CHALLENGES, DESTS, PASTE_OPTIONS, PENALTY, cablesFor } from './steps';
import { checkBuild, estimateLoadW, hasErrors } from './compat';
import { Icon } from '../components/Icon';

/** Rotation index 0 = triangle at bottom-left, matching the socket's marked corner. */
const ROT_DEG = [0, 90, 180, 270];

export function CpuOrientTask() {
  const lang = useApp((s) => s.lang);
  const rot = useAssembly((s) => s.cpuRot);
  const a = useAssembly.getState();
  const confirm = () => {
    if (rot === 0) a.setPrepOk();
    else a.penalize(PENALTY.orientation, { th: 'ทิศทางยังไม่ตรง สามเหลี่ยมสีทองบน CPU ต้องอยู่มุมเดียวกับสามเหลี่ยมบนซ็อกเก็ต ถ้าฝืนกดจะทำให้ขาในซ็อกเก็ตงอเสียหาย', en: 'Wrong orientation: the CPU\'s gold triangle must sit in the same corner as the socket marker. Forcing it would bend the socket pins.' });
  };
  return (
    <div className="task">
      <p>{lang === 'th' ? 'หมุน CPU ให้สามเหลี่ยมสีทองตรงกับมุมที่มีเครื่องหมายบนซ็อกเก็ต (มุมล่างซ้าย)' : 'Rotate the CPU so its gold triangle lines up with the marked socket corner (bottom-left).'}</p>
      <div className="orient">
        <svg viewBox="0 0 120 120" className="orient__socket" aria-label={lang === 'th' ? 'ซ็อกเก็ตและ CPU' : 'Socket and CPU'} role="img">
          <rect x="6" y="6" width="108" height="108" rx="6" className="o-socket" />
          <path d="M10 110 L10 92 L28 110 Z" className="o-mark" />
          <g transform={`rotate(${ROT_DEG[rot]} 60 60)`} className="o-cpu">
            <rect x="22" y="22" width="76" height="76" rx="4" />
            <rect x="34" y="34" width="52" height="52" rx="3" className="o-ihs" />
            <path d="M25 95 L25 81 L39 95 Z" className="o-tri" />
          </g>
        </svg>
        <div className="row">
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => a.setCpuRot((rot + 3) % 4)}>↺ 90°</button>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => a.setCpuRot((rot + 1) % 4)}>↻ 90°</button>
          <button type="button" className="btn btn--sm" onClick={confirm}>{lang === 'th' ? 'ยืนยันทิศทาง' : 'Confirm orientation'}</button>
        </div>
      </div>
    </div>
  );
}

export function RamSlotTask() {
  const lang = useApp((s) => s.lang);
  const build = useAssembly((s) => s.build);
  const picked = useAssembly((s) => s.ramSlots);
  const a = useAssembly.getState();
  const four = (build.board?.dimmSlots ?? 4) === 4;
  const labels = four ? ['A1', 'A2', 'B1', 'B2'] : ['A1', 'B1'];
  const sticks = build.ram?.sticks ?? 2;
  const correct = four ? (sticks === 1 ? ['A2'] : ['A2', 'B2']) : (sticks === 1 ? ['A1'] : ['A1', 'B1']);
  const toggle = (l: string) => {
    // Read the latest selection so rapid taps never drop a slot.
    const cur = useAssembly.getState().ramSlots;
    a.setRamSlots(cur.includes(l) ? cur.filter((x) => x !== l) : [...cur, l]);
  };
  const confirm = () => {
    const ok = picked.length === correct.length && correct.every((c) => picked.includes(c));
    if (ok) a.setPrepOk();
    else a.penalize(PENALTY.slots, { th: `ยังไม่ถูก แรม ${sticks} แถวบนบอร์ดนี้ควรอยู่ที่ ${four ? 'สล็อตที่คู่มือกำหนดสำหรับ dual-channel' : 'ทั้งสองสล็อต'} อ่านป้ายบนบอร์ดหรือกดคำใบ้`, en: `Not quite. ${sticks} module(s) on this board belong in ${four ? 'the slots the manual specifies for dual-channel' : 'both slots'}; read the board labels or use a hint.` });
  };
  return (
    <div className="task">
      <p>{lang === 'th' ? `เลือกสล็อตสำหรับแรม ${sticks} แถว (นับจาก CPU ออกไป)` : `Select slots for ${sticks} module(s) (counting outward from the CPU)`}</p>
      <div className="dimms" role="group" aria-label="DIMM slots">
        <span className="dimms__cpu">CPU</span>
        {labels.map((l) => (
          <button key={l} type="button" className={`dimm${picked.includes(l) ? ' is-on' : ''}`} aria-pressed={picked.includes(l)} onClick={() => toggle(l)}>
            <span>{l}</span>
          </button>
        ))}
      </div>
      <button type="button" className="btn btn--sm" disabled={picked.length === 0} onClick={confirm}>{lang === 'th' ? 'ยืนยันสล็อต' : 'Confirm slots'}</button>
    </div>
  );
}

export function PasteTask() {
  const lang = useApp((s) => s.lang);
  const build = useAssembly((s) => s.build);
  const a = useAssembly.getState();
  return (
    <div className="task">
      <p>{lang === 'th' ? 'เตรียมวัสดุนำความร้อน (TIM) ก่อนวางชุดระบายความร้อน:' : 'Prepare the thermal interface material before seating the cooler:'}</p>
      {build.cooler?.type === 'aio' && <p className="muted">{lang === 'th' ? 'หลักการเดียวกันใช้กับฐานปั๊มของชุดน้ำ' : 'The same applies to the AIO pump\'s cold plate.'}</p>}
      {PASTE_OPTIONS.map((p) => (
        <button key={p.id} type="button" className="choice" onClick={() => {
          if (p.id === 'dot') { a.setPaste(p.id); a.setPrepOk(); useAssembly.setState({ feedback: { level: 'ok', msg: { th: `${p.feedback.th} จากนั้นวางชุดระบายความร้อนบน CPU`, en: `${p.feedback.en} Now seat the cooler on the CPU.` } } }); }
          else a.penalize(PENALTY.paste, p.feedback);
        }}>
          {p.label[lang]}
        </button>
      ))}
    </div>
  );
}

export function CableTask() {
  const lang = useApp((s) => s.lang);
  const build = useAssembly((s) => s.build);
  const gpuSkipped = useAssembly((s) => s.gpuSkipped);
  const cables = useAssembly((s) => s.cables);
  const active = useAssembly((s) => s.activeCable);
  const a = useAssembly.getState();
  const list = cablesFor(build, !gpuSkipped);
  const destIds = new Set(list.map((c) => c.dest));
  return (
    <div className="task cables">
      <div>
        <h4>{lang === 'th' ? '1. เลือกสาย' : '1. Pick a cable'}</h4>
        {list.map((c) => (
          <button key={c.id} type="button" className={`choice${cables[c.id] ? ' is-right' : active === c.id ? ' is-picked' : ''}`} disabled={Boolean(cables[c.id])} aria-pressed={active === c.id} onClick={() => a.setActiveCable(c.id)}>
            {cables[c.id] && <Icon name="check" size={16} />} {c.name[lang]}
          </button>
        ))}
      </div>
      <div>
        <h4>{lang === 'th' ? '2. เลือกปลายทาง' : '2. Pick its destination'}</h4>
        {DESTS.filter((d) => destIds.has(d.id)).map((d) => (
          <button key={d.id} type="button" className="choice" disabled={!active || Object.values(cables).includes(d.id)} onClick={() => active && a.connect(active, d.id)}>
            {d.name[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}

const POST_MS = 1600;

export function PowerTask() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const s = useAssembly();
  const issues = checkBuild(s.build);
  const needsFw = issues.some((i) => i.rule === 'firmware') && !s.firmwareUpdated;
  const challenge = CHALLENGES.find((c) => c.id === s.challengeId);
  const checks = challenge?.checks(s.build, s.gpuSkipped, s.firmwareUpdated) ?? [];

  const blocked = needsFw || hasErrors(issues);
  useEffect(() => {
    if (s.post !== 'running') return;
    const id = window.setTimeout(() => {
      const ok = !blocked;
      useAssembly.getState().setPost(ok ? 'ok' : 'fail');
      if (ok) useProgress.getState().recordAssembly(useAssembly.getState().score);
    }, POST_MS);
    return () => window.clearTimeout(id);
  }, [s.post, blocked]);

  return (
    <div className="task power">
      <ul className="report">
        <li><b>{lang === 'th' ? 'โหลดสูงสุดโดยประมาณ' : 'Estimated peak load'}</b> {estimateLoadW(s.build)} W / PSU {s.build.psu?.watts ?? 0} W</li>
        {issues.length === 0 && <li className="is-ok"><Icon name="check" size={16} /> {lang === 'th' ? 'ไม่พบปัญหาความเข้ากันได้' : 'No compatibility issues found'}</li>}
        {issues.map((i, k) => (i.rule === 'firmware' && s.firmwareUpdated
          ? <li key={k} className="is-ok">✓ {lang === 'th' ? 'อัปเดต UEFI แล้ว: เฟิร์มแวร์รองรับ CPU รุ่นนี้' : 'UEFI updated: the firmware now supports this CPU'}</li>
          : <li key={k} className={i.level === 'error' ? 'is-err' : 'is-warn'}>{i.level === 'error' ? '✕' : '!'} {i.msg[lang]}</li>))}
      </ul>
      {s.post === 'idle' && (
        <button type="button" className="power-btn" onClick={() => s.setPost('running')} aria-label="Power on">
          <Icon name="bolt" size={26} /> {lang === 'th' ? 'เปิดเครื่อง' : 'Power on'}
        </button>
      )}
      {s.post === 'running' && <p className="post-run" role="status"><span className="pulse" /> POST…</p>}
      {s.post === 'fail' && (
        <div className="feedback is-wrong" role="alert">
          <b>{lang === 'th' ? 'ไม่ผ่าน POST: พัดลมหมุนแต่ไม่มีภาพ' : 'POST failed: fans spin, but no display'}</b>
          <p>{lang === 'th' ? 'เฟิร์มแวร์ UEFI รุ่นเดิมไม่มีโค้ดสำหรับเริ่มการทำงานของ CPU รุ่นนี้ ไฟ debug LED บนบอร์ดค้างที่ CPU' : 'The old UEFI firmware has no code to initialise this CPU; the board\'s debug LED stops at CPU.'}</p>
          <button type="button" className="btn btn--sm" onClick={() => s.updateFirmware()}>{lang === 'th' ? 'อัปเดต UEFI ด้วย BIOS Flashback' : 'Update UEFI with BIOS Flashback'}</button>
        </div>
      )}
      {s.post === 'ok' && (
        <div className="post-ok" role="status">
          <div className="celebrate" aria-hidden="true"><Icon name="check" size={36} /></div>
          <h3>{lang === 'th' ? 'ผ่าน POST แล้ว — เข้าสู่หน้า UEFI Setup' : 'POST passed — entering UEFI setup'}</h3>
          <p className="muted">{lang === 'th' ? 'นี่คือการจำลองเพื่อการเรียนรู้ เครื่องจริงอาจมีปัจจัยอื่น เช่น ชิ้นส่วนชำรุดหรือการตั้งค่า' : 'This is an educational simulation; a real build can still fail for other reasons such as faulty parts or settings.'}</p>
          <p className="score">{lang === 'th' ? 'คะแนน' : 'Score'} <b>{s.score}</b>/100 · {lang === 'th' ? 'ข้อผิดพลาด' : 'mistakes'} {s.mistakes} · {lang === 'th' ? 'คำใบ้' : 'hints'} {s.hintsUsed}</p>
          {challenge && (
            <ul className="report">
              {checks.map((c, i) => <li key={i} className={c.pass ? 'is-ok' : 'is-err'}>{c.pass ? '✓' : '✕'} {c.label[lang]}</li>)}
            </ul>
          )}
          <div className="row">
            <button type="button" className="btn btn--sm" onClick={() => useAssembly.getState().reset()}>{t('reset')}</button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => useApp.getState().go('progress')}>{t('navProgress')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
