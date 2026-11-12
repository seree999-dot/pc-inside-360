import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import type { ProgressData } from '../store/progressStore';
import { useT } from '../i18n';
import { components, lessonById, lessons, quizBank, troubleScenarios } from '../data';
import type { L, QuizTopic } from '../data/types';
import { Icon } from '../components/Icon';
import type { IconName } from '../components/Icon';
import { TOPIC_LABEL } from '../quiz/QuizView';

interface Badge {
  id: string;
  icon: IconName;
  name: L;
  rule: L;
  earned: (p: ProgressData) => boolean;
}

const BADGES: Badge[] = [
  { id: 'explorer', icon: 'cube', name: { th: 'นักสำรวจ', en: 'Explorer' }, rule: { th: 'สำรวจครบ 10 ชิ้นส่วน', en: 'Explore 10 components' }, earned: (p) => p.explored.length >= 10 },
  { id: 'cartographer', icon: 'views', name: { th: 'ผู้รู้ทุกชิ้น', en: 'Full inventory' }, rule: { th: 'สำรวจครบทั้ง 20 ชิ้นส่วน', en: 'Explore all 20 components' }, earned: (p) => p.explored.length >= components.length },
  { id: 'scholar', icon: 'book', name: { th: 'นักเรียนรู้', en: 'Scholar' }, rule: { th: 'เรียนจบ 5 บทเรียน', en: 'Complete 5 lessons' }, earned: (p) => p.lessonsDone.length >= 5 },
  { id: 'graduate', icon: 'sparkle', name: { th: 'จบหลักสูตร', en: 'Graduate' }, rule: { th: 'เรียนจบทั้ง 10 บทเรียน', en: 'Complete all 10 lessons' }, earned: (p) => p.lessonsDone.length >= lessons.length },
  { id: 'builder', icon: 'wrench', name: { th: 'ช่างประกอบ', en: 'Builder' }, rule: { th: 'ประกอบเครื่องผ่าน POST', en: 'Assemble a PC that passes POST' }, earned: (p) => p.assemblyRuns > 0 },
  { id: 'precision', icon: 'check', name: { th: 'แม่นยำ', en: 'Precision build' }, rule: { th: 'ประกอบเครื่องได้คะแนน ≥ 90', en: 'Score ≥ 90 in the assembly lab' }, earned: (p) => p.assemblyBest >= 90 },
  { id: 'sharp', icon: 'quiz', name: { th: 'ตอบแม่น', en: 'Sharp mind' }, rule: { th: 'ตอบ ≥ 20 ข้อ ถูก ≥ 80%', en: '≥ 20 answers at ≥ 80% accuracy' }, earned: (p) => p.quizAnswered >= 20 && p.quizCorrect / p.quizAnswered >= 0.8 },
  { id: 'medic', icon: 'bolt', name: { th: 'หมอคอมพิวเตอร์', en: 'PC medic' }, rule: { th: 'วินิจฉัยถูก 3 สถานการณ์', en: 'Solve 3 troubleshooting cases' }, earned: (p) => Object.values(p.trouble).filter((s) => s >= 60).length >= 3 },
];

function fmtTime(sec: number, th: boolean): string {
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return th ? `${h} ชม. ${m} นาที` : `${h} h ${m} min`;
}

/** Screen 8: personal learning dashboard built only from this browser's real activity. */
export function ProgressView() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const p = useProgress();
  const accuracy = p.quizAnswered ? Math.round((p.quizCorrect / p.quizAnswered) * 100) : 0;
  const lessonPct = Math.round((p.lessonsDone.length / lessons.length) * 100);
  const explorePct = Math.round((p.explored.length / components.length) * 100);
  const troubleSolved = Object.values(p.trouble).filter((s) => s >= 60).length;
  const assemblyPart = p.assemblyBest;
  const quizPart = Math.min(100, accuracy * Math.min(1, p.quizAnswered / 20));
  const overall = Math.round((lessonPct + explorePct + quizPart + assemblyPart + (troubleSolved / troubleScenarios.length) * 100) / 5);
  const topics = (Object.entries(p.byTopic) as [QuizTopic, { correct: number; total: number }][]).sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total);
  const weak = topics.filter(([, v]) => v.total >= 2 && v.correct / v.total < 0.6);
  const missed = Object.entries(p.missed).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([id, n]) => ({ q: quizBank.find((q) => q.id === id), n })).filter((x) => x.q);
  const empty = p.quizAnswered === 0 && p.lessonsDone.length === 0 && p.explored.length === 0 && p.assemblyRuns === 0;

  return (
    <div className="page progress">
      <header className="page__head">
        <div>
          <p className="eyebrow">{t('navProgress')}</p>
          <h1>{lang === 'th' ? 'แดชบอร์ดการเรียนรู้' : 'Learning dashboard'}</h1>
          <p>{lang === 'th' ? 'ข้อมูลทั้งหมดมาจากกิจกรรมจริงของคุณบนอุปกรณ์นี้ และบันทึกในเบราว์เซอร์นี้เท่านั้น' : 'Everything here comes from your real activity on this device and is saved in this browser only.'}</p>
        </div>
        <div className="ring-stat ring-stat--lg" style={{ ['--p' as string]: overall }}><b>{overall}%</b><span>{lang === 'th' ? 'ภาพรวม' : 'overall'}</span></div>
      </header>
      {empty && <p className="notice">{lang === 'th' ? 'ยังไม่มีข้อมูล เริ่มจากสำรวจโมเดล 3 มิติหรือทำบทเรียนแรก แล้วกลับมาดูความก้าวหน้าที่นี่' : 'No activity yet. Explore the 3D model or take the first lesson, then come back here.'}</p>}
      <div className="bento">
        <div className="stat card"><span>{lang === 'th' ? 'บทเรียนที่จบ' : 'Lessons completed'}</span><b>{p.lessonsDone.length}<small>/{lessons.length}</small></b><div className="meter"><i style={{ width: `${lessonPct}%` }} /></div></div>
        <div className="stat card"><span>{lang === 'th' ? 'ความแม่นยำแบบทดสอบ' : 'Quiz accuracy'}</span><b>{accuracy}<small>%</small></b><em>{p.quizAnswered} {lang === 'th' ? 'ข้อ' : 'answers'} · {p.quizSessions} {lang === 'th' ? 'ครั้ง' : 'sessions'}</em></div>
        <div className="stat card"><span>{lang === 'th' ? 'ชิ้นส่วนที่สำรวจ' : 'Components explored'}</span><b>{p.explored.length}<small>/{components.length}</small></b><div className="meter"><i style={{ width: `${explorePct}%` }} /></div></div>
        <div className="stat card"><span>{lang === 'th' ? 'ห้องประกอบเครื่อง' : 'Assembly lab'}</span><b>{p.assemblyBest}<small>/100</small></b><em>{p.assemblyRuns} {lang === 'th' ? 'ครั้งที่สำเร็จ' : 'successful builds'}{p.assemblyLast !== null ? ` · ${lang === 'th' ? 'ล่าสุด' : 'last'} ${p.assemblyLast}` : ''}</em></div>
        <div className="stat card"><span>{lang === 'th' ? 'จำลองแก้ปัญหา' : 'Troubleshooting'}</span><b>{troubleSolved}<small>/{troubleScenarios.length}</small></b><em>{lang === 'th' ? 'สถานการณ์ที่วินิจฉัยถูก' : 'cases diagnosed'}</em></div>
        <div className="stat card"><span>{lang === 'th' ? 'เวลาเรียนที่ใช้งานจริง' : 'Active learning time'}</span><b className="stat__time">{fmtTime(p.seconds, lang === 'th')}</b><em>{lang === 'th' ? 'นับเฉพาะเมื่อแท็บเปิดอยู่และมีการใช้งาน' : 'Counted only while the tab is visible and in use'}</em></div>

        <div className="card bento__wide">
          <h3>{lang === 'th' ? 'ความแม่นยำรายหัวข้อ' : 'Accuracy by topic'}</h3>
          {topics.length === 0 ? <p className="muted">{lang === 'th' ? 'ทำแบบทดสอบเพื่อดูผลรายหัวข้อ' : 'Take a quiz to see topic results.'}</p> : (
            <ul className="bars">
              {topics.map(([k, v]) => {
                const pct = Math.round((v.correct / v.total) * 100);
                return <li key={k}><span>{TOPIC_LABEL[k][lang]}</span><div className="bar"><i className={pct < 60 ? 'is-low' : pct >= 80 ? 'is-high' : ''} style={{ width: `${pct}%` }} /></div><b>{pct}%</b><small>{v.correct}/{v.total}</small></li>;
              })}
            </ul>
          )}
        </div>
        <div className="card">
          <h3>{lang === 'th' ? 'ควรปรับปรุง' : 'Areas to improve'}</h3>
          {weak.length === 0 && missed.length === 0 ? <p className="muted">{lang === 'th' ? 'ยังไม่พบจุดอ่อนที่ชัดเจน' : 'No clear weak areas yet.'}</p> : (
            <ul className="improve">
              {weak.map(([k]) => <li key={k}><Icon name="bolt" size={14} /> {TOPIC_LABEL[k][lang]}</li>)}
              {missed.map(({ q, n }) => q && (
                <li key={q.id}>
                  <span>{q.prompt[lang]} <small className="muted">×{n}</small></span>
                  {q.lesson && lessonById[q.lesson] && <button type="button" className="linkish" onClick={() => useApp.getState().startLesson(q.lesson as string)}>{lessonById[q.lesson].title[lang]}</button>}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card bento__wide">
          <h3>{lang === 'th' ? 'บทเรียน' : 'Lessons'}</h3>
          <ol className="lesson-track">
            {lessons.map((l) => (
              <li key={l.id} className={p.lessonsDone.includes(l.id) ? 'is-done' : ''}>
                <button type="button" onClick={() => useApp.getState().startLesson(l.id)} title={l.title[lang]}>
                  <span>{l.id.slice(1)}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="card">
          <h3>{lang === 'th' ? 'เหรียญรางวัล' : 'Achievement badges'}</h3>
          <ul className="badges">
            {BADGES.map((b) => {
              const got = b.earned(p);
              return (
                <li key={b.id} className={got ? 'is-earned' : ''} title={b.rule[lang]}>
                  <span className="badge-icon"><Icon name={b.icon} size={20} /></span>
                  <b>{b.name[lang]}</b>
                  <small>{b.rule[lang]}</small>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="row progress__foot">
        <span className="muted">{t('localOnly')}</span>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => { if (window.confirm(lang === 'th' ? 'ล้างข้อมูลความก้าวหน้าทั้งหมดในเบราว์เซอร์นี้? ไม่สามารถย้อนกลับได้' : 'Erase all progress stored in this browser? This cannot be undone.')) p.resetAll(); }}>
          {lang === 'th' ? 'ล้างข้อมูลความก้าวหน้า' : 'Reset progress'}
        </button>
      </div>
    </div>
  );
}
