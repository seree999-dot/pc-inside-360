import { useEffect, useState } from 'react';
import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import { componentById, troubleScenarios } from '../data';
import type { TroubleScenario } from '../data/types';
import { Viewer } from '../three/Viewer';
import { ExplorerScene } from '../three/ExplorerScene';
import { Icon } from '../components/Icon';

const CAUSE_POINTS = 60;
const STEP_POINTS = 40;
const POOR_STEP_PENALTY = 8;

/** Score = correct cause (60) + share of useful checks performed (40) − poor checks. */
export function troubleScore(s: TroubleScenario, done: number[], causeCorrect: boolean): number {
  const useful = s.actions.filter((a) => a.useful).length;
  const usefulDone = done.filter((i) => s.actions[i].useful).length;
  const poor = done.length - usefulDone;
  const raw = (causeCorrect ? CAUSE_POINTS : 0) + (useful ? (usefulDone / useful) * STEP_POINTS : 0) - poor * POOR_STEP_PENALTY;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

function Case({ s, onExit }: { s: TroubleScenario; onExit: () => void }) {
  const lang = useApp((st) => st.lang);
  const [done, setDone] = useState<number[]>([]);
  const [cause, setCause] = useState<number | null>(null);
  const best = useProgress((p) => p.trouble[s.id]);

  useEffect(() => {
    const st = useApp.getState();
    st.set({ caseOpacity: 0.2 });
    st.select(s.parts[0]);
  }, [s.id, s.parts]);

  const act = (i: number) => {
    if (!done.includes(i)) setDone((d) => [...d, i]);
  };
  const decide = (i: number) => {
    setCause(i);
    useProgress.getState().recordTrouble(s.id, troubleScore(s, done, i === s.answer));
  };
  const score = cause === null ? null : troubleScore(s, done, cause === s.answer);

  return (
    <div className="trouble">
      <section className="trouble__case">
        <button type="button" className="linkish" onClick={onExit}>← {lang === 'th' ? 'กลับไปเลือกสถานการณ์' : 'All scenarios'}</button>
        <h1>{s.title[lang]}</h1>
        <blockquote className="symptom"><Icon name="bolt" size={18} /> {s.symptom[lang]}</blockquote>
        <h3>{lang === 'th' ? 'ชิ้นส่วนที่ควรตรวจ' : 'Hardware to inspect'}</h3>
        <div className="chips">
          {s.parts.map((p) => <button key={p} type="button" className="chip" onClick={() => useApp.getState().select(p)}>{componentById[p].name[lang]}</button>)}
        </div>
        <h3>{lang === 'th' ? '1. เลือกขั้นตอนการตรวจสอบ' : '1. Choose diagnostic steps'}</h3>
        <ul className="actions">
          {s.actions.map((a, i) => {
            const isDone = done.includes(i);
            return (
              <li key={i}>
                <button type="button" className={`choice${isDone ? (a.useful ? ' is-right' : ' is-wrong') : ''}`} disabled={isDone || cause !== null} onClick={() => act(i)}>
                  {a.label[lang]}
                </button>
                {isDone && <p className={`result ${a.useful ? '' : 'result--poor'}`}>{a.useful ? '🔎' : '⚠'} {a.result[lang]}</p>}
              </li>
            );
          })}
        </ul>
        <h3>{lang === 'th' ? '2. สาเหตุที่น่าจะเป็นที่สุด' : '2. Most likely cause'}</h3>
        {done.length === 0 && <p className="muted">{lang === 'th' ? 'ทำการตรวจอย่างน้อยหนึ่งขั้นก่อนสรุป' : 'Perform at least one check before concluding.'}</p>}
        <div className="qchoices">
          {s.causes.map((c, i) => (
            <button key={i} type="button" className={`choice${cause !== null && i === s.answer ? ' is-right' : cause === i ? ' is-wrong' : ''}`} disabled={done.length === 0 || cause !== null} onClick={() => decide(i)}>
              <span className="choice__key">{String.fromCharCode(65 + i)}</span>{c[lang]}
            </button>
          ))}
        </div>
        {cause !== null && score !== null && (
          <div className={`feedback ${cause === s.answer ? 'is-right' : 'is-wrong'}`} role="status">
            <b>{cause === s.answer ? (lang === 'th' ? 'วินิจฉัยถูกต้อง' : 'Correct diagnosis') : (lang === 'th' ? 'ยังไม่ใช่สาเหตุหลัก' : 'Not the main cause')}</b> · {lang === 'th' ? 'คะแนน' : 'Score'} {score}/100{best !== undefined ? ` (${lang === 'th' ? 'ดีที่สุด' : 'best'} ${best})` : ''}
            <p>{s.explain[lang]}</p>
            <p className="muted small">{lang === 'th' ? 'หมายเหตุ: นี่คือการจำลองเพื่อการเรียนรู้ การวินิจฉัยจริงต้องทดสอบชิ้นส่วนทีละชิ้นและอาจมีหลายสาเหตุร่วมกัน' : 'Note: this is an educational simulation. Real diagnosis requires testing parts one at a time, and several causes can combine.'}</p>
            <button type="button" className="btn btn--sm" onClick={() => { setDone([]); setCause(null); }}>{lang === 'th' ? 'ทำสถานการณ์นี้อีกครั้ง' : 'Retry this case'}</button>
          </div>
        )}
      </section>
      <section className="trouble__stage">
        <Viewer label={s.title[lang]} className="stage__viewer">
          <ExplorerScene towerOnly={!s.parts.some((p) => p === 'monitor' || p === 'keyboard' || p === 'mouse')} />
        </Viewer>
      </section>
    </div>
  );
}

/** Mode F: scenario-based diagnosis with simulated checks and a scored conclusion. */
export function TroubleView() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const best = useProgress((p) => p.trouble);
  const [id, setId] = useState<string | null>(null);
  const s = troubleScenarios.find((x) => x.id === id);
  if (s) return <Case key={s.id} s={s} onExit={() => { setId(null); useApp.getState().resetScene(); }} />;
  return (
    <div className="page">
      <header className="page__head">
        <div>
          <p className="eyebrow">{t('navTrouble')}</p>
          <h1>{lang === 'th' ? 'จำลองการแก้ปัญหาฮาร์ดแวร์' : 'Troubleshooting simulator'}</h1>
          <p>{lang === 'th' ? 'อ่านอาการ เลือกขั้นตอนตรวจสอบอย่างเป็นระบบ (สังเกต → แยกส่วน → ทดสอบทีละอย่าง → ยืนยัน) แล้วสรุปสาเหตุ ขั้นตอนที่ไม่เกิดประโยชน์จะถูกหักคะแนน' : 'Read the symptom, choose systematic checks (observe → isolate → change one thing → verify), then conclude. Unhelpful or risky steps cost points.'}</p>
        </div>
      </header>
      <ul className="scenario-grid">
        {troubleScenarios.map((x) => (
          <li key={x.id}>
            <button type="button" className="scenario" onClick={() => setId(x.id)}>
              <span className="scenario__icon"><Icon name="bolt" size={20} /></span>
              <b>{x.title[lang]}</b>
              <span>{x.symptom[lang]}</span>
              {best[x.id] !== undefined && <em className={best[x.id] >= 60 ? 'is-good' : ''}>{lang === 'th' ? 'คะแนนดีที่สุด' : 'Best'} {best[x.id]}</em>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
