import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import { lessonById, quizBank } from '../data';
import type { QuizQuestion, QuizTopic } from '../data/types';
import { Viewer } from '../three/Viewer';
import { ExplorerScene } from '../three/ExplorerScene';
import { Icon } from '../components/Icon';
import { buildSession } from './engine';
import { ChoiceCard, HotspotCard, IdentifyCard, MatchCard, OrderCard } from './QuestionCards';

export const TOPIC_LABEL: Record<QuizTopic, { th: string; en: string }> = {
  cpu: { th: 'CPU', en: 'CPU' }, memory: { th: 'หน่วยความจำ', en: 'Memory' }, storage: { th: 'หน่วยเก็บข้อมูล', en: 'Storage' },
  motherboard: { th: 'เมนบอร์ด', en: 'Motherboard' }, graphics: { th: 'กราฟิก', en: 'Graphics' }, power: { th: 'พลังงาน', en: 'Power' },
  cooling: { th: 'ระบายความร้อน', en: 'Cooling' }, assembly: { th: 'การประกอบ', en: 'Assembly' }, compat: { th: 'ความเข้ากันได้', en: 'Compatibility' },
  trouble: { th: 'แก้ปัญหา', en: 'Troubleshooting' }, peripheral: { th: 'อุปกรณ์ต่อพ่วง', en: 'Peripherals' },
};
const TYPE_LABEL: Record<QuizQuestion['type'], { th: string; en: string }> = {
  mcq: { th: 'ปรนัย 5 ตัวเลือก', en: 'Multiple choice' }, scenario: { th: 'สถานการณ์', en: 'Scenario' }, compat: { th: 'ความเข้ากันได้', en: 'Compatibility' },
  identify: { th: 'ระบุชิ้นส่วน 3 มิติ', en: '3D identification' }, hotspot: { th: 'คลิกจุดบนเมนบอร์ด', en: 'Hotspot' },
  match: { th: 'จับคู่', en: 'Matching' }, order: { th: 'เรียงลำดับ', en: 'Ordering' },
};

type Stage = 'setup' | 'run' | 'done';

/** Practice-mode nudge after a wrong answer: points to evidence without giving the answer away. */
function retryHint(q: QuizQuestion, lang: 'th' | 'en'): string {
  if (q.type === 'identify') return lang === 'th' ? 'ลองหมุนดูชิ้นส่วนที่ไฮไลต์จากหลายมุม สังเกตรูปทรง ขั้วต่อ และตำแหน่งในเคส แล้วตอบใหม่' : 'Rotate around the highlighted part and look at its shape, connectors and position in the case, then try again.';
  if (q.type === 'hotspot') return lang === 'th' ? 'ยังไม่ใช่จุดนั้น ลองซูมดูรูปร่างของสล็อตหรือขั้วต่อแต่ละจุดอีกครั้ง' : 'Not that one — zoom in and compare the shape of each slot or connector.';
  if (q.part) return lang === 'th' ? 'ลองคิดใหม่: ชิ้นส่วนที่เกี่ยวข้องถูกไฮไลต์ในมุมมอง 3 มิติแล้ว หรืออ่านบทเรียนที่เกี่ยวข้องก่อนตอบอีกครั้ง' : 'Think again: the related hardware is highlighted in the 3D view, or review the linked lesson before retrying.';
  return lang === 'th' ? 'ลองคิดใหม่ หรืออ่านบทเรียนที่เกี่ยวข้องก่อนตอบอีกครั้ง' : 'Think again, or review the linked lesson before retrying.';
}
interface Answer { id: string; correct: boolean; topic: QuizTopic }

function Setup({ onStart }: { onStart: (practice: boolean, topic: QuizTopic | 'all', count: number) => void }) {
  const lang = useApp((s) => s.lang);
  const [practice, setPractice] = useState(true);
  const [topic, setTopic] = useState<QuizTopic | 'all'>('all');
  const [count, setCount] = useState(10);
  const topics = [...new Set(quizBank.map((q) => q.topic))];
  const available = quizBank.filter((q) => topic === 'all' || q.topic === topic).length;
  return (
    <div className="page quiz-setup">
      <header className="page__head">
        <div>
          <p className="eyebrow">{lang === 'th' ? 'แบบทดสอบ' : 'Assessment'}</p>
          <h1>{lang === 'th' ? 'ทดสอบความรู้ฮาร์ดแวร์' : 'Test your hardware knowledge'}</h1>
          <p>{lang === 'th' ? `คลังคำถาม ${quizBank.length} ข้อ ผสมทั้งปรนัย การระบุชิ้นส่วนในโมเดล 3 มิติ การคลิกจุดบนเมนบอร์ด การจับคู่ การเรียงลำดับ และโจทย์ความเข้ากันได้` : `${quizBank.length} questions mixing multiple choice, 3D identification, motherboard hotspots, matching, ordering and compatibility analysis.`}</p>
        </div>
      </header>
      <div className="setup card">
        <fieldset>
          <legend>{lang === 'th' ? 'โหมด' : 'Mode'}</legend>
          <div className="seg">
            <button type="button" className={practice ? 'is-on' : ''} aria-pressed={practice} onClick={() => setPractice(true)}>{lang === 'th' ? 'ฝึกซ้อม (ตอบใหม่ได้)' : 'Practice (retry allowed)'}</button>
            <button type="button" className={!practice ? 'is-on' : ''} aria-pressed={!practice} onClick={() => setPractice(false)}>{lang === 'th' ? 'สอบจริง (ตอบครั้งเดียว)' : 'Test (one attempt)'}</button>
          </div>
        </fieldset>
        <fieldset>
          <legend>{lang === 'th' ? 'หัวข้อ' : 'Topic'}</legend>
          <div className="chips">
            <button type="button" className={`chip${topic === 'all' ? ' is-on' : ''}`} onClick={() => setTopic('all')}>{lang === 'th' ? 'ทุกหัวข้อ' : 'All topics'}</button>
            {topics.map((t) => <button key={t} type="button" className={`chip${topic === t ? ' is-on' : ''}`} onClick={() => setTopic(t)}>{TOPIC_LABEL[t][lang]}</button>)}
          </div>
        </fieldset>
        <fieldset>
          <legend>{lang === 'th' ? 'จำนวนข้อ' : 'Questions'}</legend>
          <div className="seg">
            {[5, 10, 20].map((n) => <button key={n} type="button" className={count === n ? 'is-on' : ''} aria-pressed={count === n} onClick={() => setCount(n)}>{n}</button>)}
          </div>
          <small className="muted"> {lang === 'th' ? `มีคำถามในหัวข้อนี้ ${available} ข้อ` : `${available} available for this topic`}</small>
        </fieldset>
        <button type="button" className="btn btn--lg" onClick={() => onStart(practice, topic, count)}>{lang === 'th' ? 'เริ่มทำแบบทดสอบ' : 'Start quiz'} <Icon name="chevron" /></button>
      </div>
    </div>
  );
}

/** Screen 7: mixed-format assessment with 3D questions and explanatory feedback. */
export function QuizView() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const [stage, setStage] = useState<Stage>('setup');
  const [practice, setPractice] = useState(true);
  const [qs, setQs] = useState<QuizQuestion[]>([]);
  const [i, setI] = useState(0);
  const [result, setResult] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const q = qs[i];

  const start = (p: boolean, topic: QuizTopic | 'all', count: number) => {
    setPractice(p); setQs(buildSession(quizBank, { topic, count })); setI(0); setAnswers([]); setResult(null); setRevealed(false); setStage('run');
  };

  // Layout effect: resets the scene before each question card's own effects configure it.
  useLayoutEffect(() => {
    if (!q) return;
    const s = useApp.getState();
    s.resetScene();
    s.cam({ kind: 'reset' });
  }, [q]);

  const submit = useCallback((correct: boolean) => {
    if (!q) return;
    setResult(correct);
    const first = !answers.some((a) => a.id === q.id);
    if (first) {
      setAnswers((a) => [...a, { id: q.id, correct, topic: q.topic }]);
      useProgress.getState().recordAnswer(q.id, q.topic, correct);
    }
    const final = correct || !practice;
    if (final) setRevealed(true);
    if (q.part && q.type !== 'identify' && q.type !== 'hotspot') useApp.getState().select(q.part);
  }, [q, answers, practice]);

  // Never leave quiz-only scene modes behind when the quiz screen closes.
  useEffect(() => () => useApp.getState().setQuizScene({ anonymous: false, hotspotPick: null }), []);

  // Reveal the answer in 3D only once it is final (correct, test mode, or "Show answer"):
  // practice retries must not expose part names or hotspot labels.
  useEffect(() => {
    if (!revealed || !q) return;
    const s = useApp.getState();
    s.setQuizScene({ anonymous: false, hotspotPick: null });
    if (q.type === 'hotspot') s.setHotspot(q.target);
  }, [revealed, q]);

  if (stage === 'setup') return <Setup onStart={start} />;
  if (stage === 'done' || !q) {
    const right = answers.filter((a) => a.correct).length;
    const pct = answers.length ? Math.round((right / answers.length) * 100) : 0;
    const missed = qs.filter((x) => answers.find((a) => a.id === x.id && !a.correct));
    return (
      <div className="page quiz-done">
        <div className="card result">
          <div className="ring-stat ring-stat--lg" style={{ ['--p' as string]: pct }}><b>{pct}%</b><span>{right}/{answers.length}</span></div>
          <div>
            <h1>{pct >= 80 ? (lang === 'th' ? 'ยอดเยี่ยม!' : 'Excellent!') : pct >= 50 ? (lang === 'th' ? 'ทำได้ดี' : 'Good work') : (lang === 'th' ? 'ทบทวนอีกนิด' : 'Keep practising')}</h1>
            <p className="muted">{lang === 'th' ? 'คิดคะแนนจากคำตอบครั้งแรกของแต่ละข้อ' : 'Scored on your first attempt for each question.'}</p>
            {missed.length > 0 && (
              <>
                <h3>{lang === 'th' ? 'หัวข้อที่ควรทบทวน' : 'Review these'}</h3>
                <ul className="missed">
                  {missed.map((m) => (
                    <li key={m.id}>
                      <span>{m.prompt[lang]}</span>
                      {m.lesson && lessonById[m.lesson] && <button type="button" className="linkish" onClick={() => useApp.getState().startLesson(m.lesson as string)}>{lessonById[m.lesson].title[lang]}</button>}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div className="row">
              <button type="button" className="btn" onClick={() => setStage('setup')}>{lang === 'th' ? 'ทำแบบทดสอบใหม่' : 'New quiz'}</button>
              <button type="button" className="btn btn--ghost" onClick={() => useApp.getState().go('progress')}>{t('navProgress')}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const locked = result !== null;
  const next = () => {
    if (i + 1 >= qs.length) { useProgress.getState().finishQuiz(); setStage('done'); return; }
    setI(i + 1); setResult(null); setRevealed(false);
  };
  const retry = () => {
    setResult(null);
  };
  const lesson = q.lesson ? lessonById[q.lesson] : undefined;
  const card = (() => {
    const common = { locked, reveal: revealed, onSubmit: submit };
    switch (q.type) {
      case 'mcq': case 'scenario': case 'compat': return <ChoiceCard q={q} {...common} />;
      case 'identify': return <IdentifyCard q={q} {...common} />;
      case 'hotspot': return <HotspotCard q={q} {...common} />;
      case 'match': return <MatchCard q={q} {...common} />;
      case 'order': return <OrderCard q={q} {...common} />;
    }
  })();

  return (
    <div className="quiz">
      <section className="quiz__q" aria-live="polite">
        <div className="quiz__meta">
          <span>{i + 1}/{qs.length}</span>
          <span className="badge">{TYPE_LABEL[q.type][lang]}</span>
          <span className="badge badge--alt">{TOPIC_LABEL[q.topic][lang]}</span>
          <span className="muted">{practice ? (lang === 'th' ? 'โหมดฝึกซ้อม' : 'Practice') : (lang === 'th' ? 'โหมดสอบ' : 'Test')}</span>
        </div>
        <div className="meter" aria-hidden="true"><i style={{ width: `${(i / qs.length) * 100}%` }} /></div>
        <h2 className="quiz__prompt">{q.prompt[lang]}</h2>
        {card}
        {result !== null && (
          <div className={`feedback ${result ? 'is-right' : 'is-wrong'}`} role="status">
            <b>{result ? t('correct') : t('incorrect')}</b>
            {revealed ? <p>{q.explain[lang]}</p> : <p>{retryHint(q, lang)}</p>}
            <div className="row">
              {!result && practice && !revealed && <button type="button" className="btn btn--sm" onClick={retry}>{t('retry')}</button>}
              {!result && practice && !revealed && <button type="button" className="btn btn--ghost btn--sm" onClick={() => setRevealed(true)}>{t('showAnswer')}</button>}
              {lesson && <button type="button" className="btn btn--ghost btn--sm" onClick={() => useApp.getState().startLesson(lesson.id)}><Icon name="book" size={14} /> {lesson.title[lang]}</button>}
              {(result || revealed) && <button type="button" className="btn btn--sm" onClick={next}>{i + 1 >= qs.length ? t('finish') : t('next')} <Icon name="chevron" size={14} /></button>}
            </div>
          </div>
        )}
      </section>
      <section className="quiz__stage">
        <Viewer label={t('viewport')} className="stage__viewer" camera={{ position: [5.2, 2.4, 9.2] }}>
          <ExplorerScene towerOnly />
        </Viewer>
        <div className="quiz__cam row">
          <button type="button" className="tool" aria-label={t('tbReset')} title={t('tbReset')} onClick={() => useApp.getState().cam({ kind: 'reset' })}><Icon name="home" /></button>
          <button type="button" className="tool" aria-label={t('tbZoomIn')} title={t('tbZoomIn')} onClick={() => useApp.getState().cam({ kind: 'zoom', factor: 0.7 })}><Icon name="zoomIn" /></button>
          <button type="button" className="tool" aria-label={t('tbZoomOut')} title={t('tbZoomOut')} onClick={() => useApp.getState().cam({ kind: 'zoom', factor: 1.4 })}><Icon name="zoomOut" /></button>
        </div>
      </section>
    </div>
  );
}
