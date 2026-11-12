import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import { lessons } from '../data';
import type { Lesson } from '../data/types';
import { Icon } from '../components/Icon';

const BLOOM: Record<Lesson['bloom'], { th: string; en: string; tone: string }> = {
  remember: { th: 'จำ', en: 'Remember', tone: 'b1' },
  understand: { th: 'เข้าใจ', en: 'Understand', tone: 'b2' },
  apply: { th: 'ประยุกต์', en: 'Apply', tone: 'b3' },
  analyze: { th: 'วิเคราะห์', en: 'Analyze', tone: 'b4' },
};

/** Screen 5: structured lessons ordered along Bloom's taxonomy. */
export function LessonsView() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const done = useProgress((s) => s.lessonsDone);
  const pct = Math.round((done.length / lessons.length) * 100);
  const nextUp = lessons.find((l) => !done.includes(l.id));

  return (
    <div className="page lessons">
      <header className="page__head">
        <div>
          <p className="eyebrow">{t('navLessons')}</p>
          <h1>{lang === 'th' ? 'บทเรียนแบบมีผู้นำทาง' : 'Guided lessons'}</h1>
          <p>{lang === 'th' ? 'แต่ละบทพากล้อง 3 มิติไปยังชิ้นส่วนที่เกี่ยวข้อง มีจุดตรวจความเข้าใจระหว่างทาง และไล่ระดับตาม Bloom\'s Taxonomy จากการจำไปจนถึงการวิเคราะห์' : 'Each lesson flies the 3D camera to the relevant hardware, includes comprehension checkpoints, and climbs Bloom\'s taxonomy from remembering to analysing.'}</p>
        </div>
        <div className="ring-stat" style={{ ['--p' as string]: pct }}>
          <b>{pct}%</b><span>{done.length}/{lessons.length}</span>
        </div>
      </header>
      {nextUp && (
        <button type="button" className="continue" onClick={() => useApp.getState().startLesson(nextUp.id)}>
          <span className="eyebrow">{lang === 'th' ? 'เรียนต่อ' : 'Continue'}</span>
          <b>{nextUp.title[lang]}</b>
          <Icon name="chevron" />
        </button>
      )}
      <ol className="lesson-grid">
        {lessons.map((l, i) => {
          const isDone = done.includes(l.id);
          const b = BLOOM[l.bloom];
          return (
            <li key={l.id} className={`lcard${isDone ? ' is-done' : ''}`}>
              <div className="lcard__top">
                <span className="lcard__num">{String(i + 1).padStart(2, '0')}</span>
                <span className={`bloom bloom--${b.tone}`}>{b[lang]}</span>
                {isDone && <span className="lcard__done"><Icon name="check" size={14} /> {t('completed')}</span>}
              </div>
              <h2>{l.title[lang]}</h2>
              <p>{l.summary[lang]}</p>
              <ul>{l.objectives.slice(0, 3).map((o, k) => <li key={k}>{o[lang]}</li>)}</ul>
              <div className="lcard__foot">
                <span className="muted">{l.minutes} {t('minutes')} · {l.steps.length} {lang === 'th' ? 'ขั้น' : 'steps'}</span>
                <button type="button" className={`btn btn--sm${isDone ? ' btn--ghost' : ''}`} onClick={() => useApp.getState().startLesson(l.id)}>
                  {isDone ? (lang === 'th' ? 'ทบทวน' : 'Review') : t('start')}
                </button>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
