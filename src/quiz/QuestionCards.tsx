import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../store/appStore';
import { componentById } from '../data';
import type { QChoice, QIdentify, QHotspot, QMatch, QOrder } from '../data/types';
import { gradeMatch, gradeOrder, orderHits, scrambledIndices, shuffle } from './engine';

/** Reported once per question: whether the student's answer is right on this attempt. */
export type Submit = (correct: boolean) => void;

interface CardProps<Q> {
  q: Q;
  locked: boolean;
  /** Reveal which option is correct (after final answer). */
  reveal: boolean;
  onSubmit: Submit;
}

export function ChoiceCard({ q, locked, reveal, onSubmit }: CardProps<QChoice>) {
  const lang = useApp((s) => s.lang);
  const [pick, setPick] = useState<number | null>(null);
  useEffect(() => setPick(null), [q.id]);
  return (
    <div className="qchoices" role="group">
      {q.choices.map((c, i) => {
        const state = reveal && i === q.answer ? ' is-right' : pick === i && locked ? (i === q.answer ? ' is-right' : ' is-wrong') : '';
        return (
          <button key={i} type="button" className={`choice${state}`} disabled={locked} onClick={() => { setPick(i); onSubmit(i === q.answer); }}>
            <span className="choice__key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>{c[lang]}
          </button>
        );
      })}
    </div>
  );
}

export function IdentifyCard({ q, locked, reveal, onSubmit }: CardProps<QIdentify>) {
  const lang = useApp((s) => s.lang);
  const [pick, setPick] = useState<string | null>(null);
  useEffect(() => {
    setPick(null);
    const s = useApp.getState();
    s.set({ caseOpacity: 0.15, isolate: false, exploded: false });
    s.setQuizScene({ anonymous: true });
    s.select(q.target);
  }, [q.id, q.target]);
  return (
    <div className="qchoices" role="group">
      {q.choices.map((id, i) => {
        const state = reveal && id === q.target ? ' is-right' : pick === id && locked ? (id === q.target ? ' is-right' : ' is-wrong') : '';
        return (
          <button key={id} type="button" className={`choice${state}`} disabled={locked} onClick={() => { setPick(id); onSubmit(id === q.target); }}>
            <span className="choice__key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>{componentById[id].name[lang]}
          </button>
        );
      })}
    </div>
  );
}

export function HotspotCard({ q, locked, reveal, onSubmit }: CardProps<QHotspot>) {
  const lang = useApp((s) => s.lang);
  useEffect(() => {
    const s = useApp.getState();
    s.set({ caseOpacity: 0.15, exploded: false, annotations: true });
    s.select('motherboard');
    s.set({ isolate: true });
  }, [q.id]);
  useEffect(() => {
    const s = useApp.getState();
    // While a wrong answer is shown (not yet revealed) keep markers numbered but inert.
    const pick = !locked ? (id: string) => onSubmit(id === q.target) : reveal ? null : () => undefined;
    s.setQuizScene({ hotspotPick: pick });
    return () => useApp.getState().setQuizScene({ hotspotPick: null });
  }, [q.id, q.target, locked, reveal, onSubmit]);
  return <p className="qhint">{lang === 'th' ? 'คลิกหมายเลขบนเมนบอร์ดในมุมมอง 3 มิติ (หมุน/ซูมได้)' : 'Click a numbered marker on the 3D motherboard (you can rotate and zoom).'}</p>;
}

export function MatchCard({ q, locked, reveal, onSubmit }: CardProps<QMatch>) {
  const lang = useApp((s) => s.lang);
  const rightOrder = useMemo(() => shuffle(q.right.map((_, i) => i)), [q.id]);
  const [pairs, setPairs] = useState<(number | null)[]>(() => q.left.map(() => null));
  const [activeLeft, setActiveLeft] = useState<number | null>(null);
  useEffect(() => { setPairs(q.left.map(() => null)); setActiveLeft(null); }, [q.id]);
  const assign = (r: number) => {
    if (activeLeft === null || locked) return;
    setPairs((p) => p.map((v, i) => (i === activeLeft ? r : v === r ? null : v)));
    setActiveLeft(null);
  };
  const complete = pairs.every((p) => p !== null);
  return (
    <div className="match">
      <div className="match__cols">
        <ol>
          {q.left.map((l, i) => {
            const ok = locked && pairs[i] === i;
            return (
              <li key={i}>
                <button type="button" className={`choice${activeLeft === i ? ' is-picked' : ''}${locked ? (ok ? ' is-right' : ' is-wrong') : ''}`} disabled={locked} aria-pressed={activeLeft === i} onClick={() => setActiveLeft(i)}>
                  <span className="choice__key">{i + 1}</span>
                  <span>{l[lang]}{pairs[i] !== null && <em className="match__tag"> → {String.fromCharCode(65 + rightOrder.indexOf(pairs[i] as number))}</em>}</span>
                </button>
                {reveal && !ok && <small className="match__fix">✓ {q.right[i][lang]}</small>}
              </li>
            );
          })}
        </ol>
        <ul>
          {rightOrder.map((r, k) => (
            <li key={r}>
              <button type="button" className={`choice${pairs.includes(r) ? ' is-used' : ''}`} disabled={locked || activeLeft === null} onClick={() => assign(r)}>
                <span className="choice__key">{String.fromCharCode(65 + k)}</span>{q.right[r][lang]}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="qhint">{lang === 'th' ? 'เลือกรายการทางซ้าย แล้วเลือกคำอธิบายที่คู่กันทางขวา' : 'Select an item on the left, then its matching description on the right.'}</p>
      {!locked && <button type="button" className="btn" disabled={!complete} onClick={() => onSubmit(gradeMatch(pairs))}>{lang === 'th' ? 'ตรวจคำตอบ' : 'Check'}</button>}
    </div>
  );
}

export function OrderCard({ q, locked, reveal, onSubmit }: CardProps<QOrder>) {
  const lang = useApp((s) => s.lang);
  const [order, setOrder] = useState<number[]>(() => scrambledIndices(q.items.length));
  useEffect(() => setOrder(scrambledIndices(q.items.length)), [q.id, q.items.length]);
  const move = (pos: number, dir: -1 | 1) => {
    const to = pos + dir;
    if (to < 0 || to >= order.length) return;
    setOrder((o) => { const n = [...o]; [n[pos], n[to]] = [n[to], n[pos]]; return n; });
  };
  const shown = reveal ? q.items.map((_, i) => i) : order;
  return (
    <div className="order">
      <ol>
        {shown.map((idx, pos) => (
          <li key={idx} className={`order__item${locked ? (idx === pos ? ' is-right' : ' is-wrong') : ''}`}>
            <span className="order__pos">{pos + 1}</span>
            <span className="order__text">{q.items[idx][lang]}</span>
            {!locked && (
              <span className="order__btns">
                <button type="button" className="tool tool--sm" aria-label={lang === 'th' ? 'เลื่อนขึ้น' : 'Move up'} disabled={pos === 0} onClick={() => move(pos, -1)}>▲</button>
                <button type="button" className="tool tool--sm" aria-label={lang === 'th' ? 'เลื่อนลง' : 'Move down'} disabled={pos === order.length - 1} onClick={() => move(pos, 1)}>▼</button>
              </span>
            )}
          </li>
        ))}
      </ol>
      {locked && !reveal && <p className="qhint">{lang === 'th' ? `ถูกตำแหน่ง ${orderHits(order)} จาก ${order.length} รายการ` : `${orderHits(order)} of ${order.length} in the right place`}</p>}
      {!locked && <button type="button" className="btn" onClick={() => onSubmit(gradeOrder(order))}>{lang === 'th' ? 'ตรวจลำดับ' : 'Check order'}</button>}
    </div>
  );
}
