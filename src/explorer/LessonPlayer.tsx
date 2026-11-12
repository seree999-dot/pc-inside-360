import { useEffect, useState } from 'react';
import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import { lessonById, lessons } from '../data';
import type { Checkpoint } from '../data/types';
import { Icon } from '../components/Icon';

function CheckpointBox({ cp, onAnswered }: { cp: Checkpoint; onAnswered: () => void }) {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const [pick, setPick] = useState<number | null>(null);
  const done = pick === cp.answer;
  return (
    <fieldset className="checkpoint">
      <legend>{cp.q[lang]}</legend>
      {cp.choices.map((ch, i) => {
        const state = pick === null ? '' : i === cp.answer && done ? ' is-right' : i === pick ? ' is-wrong' : '';
        return (
          <button
            key={i}
            type="button"
            className={`choice${state}`}
            disabled={done}
            onClick={() => { setPick(i); if (i === cp.answer) onAnswered(); }}
          >
            <span className="choice__key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>{ch[lang]}
          </button>
        );
      })}
      {pick !== null && (
        <p className={`feedback ${done ? 'is-right' : 'is-wrong'}`} role="status">
          <b>{done ? t('correct') : t('incorrect')}</b> {done ? cp.explain[lang] : lang === 'th' ? 'ลองพิจารณาอีกครั้ง แล้วเลือกคำตอบใหม่' : 'Think again and choose another answer.'}
        </p>
      )}
    </fieldset>
  );
}

/** Guided lesson: each step moves the 3D camera, toggles views and may hold a checkpoint. */
export function LessonPlayer() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const lessonId = useApp((s) => s.lessonId);
  const stepIdx = useApp((s) => s.lessonStep);
  const [answered, setAnswered] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const lesson = lessonId ? lessonById[lessonId] : undefined;
  const step = lesson?.steps[stepIdx];

  useEffect(() => {
    if (!step) return;
    const s = useApp.getState();
    s.set({
      exploded: Boolean(step.view?.exploded),
      caseOpacity: step.view?.xray ? 0.18 : 1,
      airflow: Boolean(step.view?.airflow),
      isolate: Boolean(step.view?.isolate),
    });
    if (step.focus) {
      s.select(step.focus);
      if (step.hotspot) s.setHotspot(step.hotspot);
      if (step.view?.isolate) s.set({ isolate: true });
    } else {
      s.select(null, false);
      s.cam({ kind: 'reset' });
    }
  }, [lessonId, stepIdx, step]);

  useEffect(() => { setFinished(false); setAnswered({}); }, [lessonId]);

  if (!lesson || !step) return null;
  const key = `${lesson.id}:${stepIdx}`;
  const blocked = Boolean(step.checkpoint) && !answered[key];
  const last = stepIdx === lesson.steps.length - 1;
  const go = (i: number) => useApp.getState().setLessonStep(i);
  const exit = () => { useApp.getState().endLesson(); useApp.getState().resetScene(); useApp.getState().cam({ kind: 'reset' }); };
  const nextLesson = lessons[lessons.findIndex((l) => l.id === lesson.id) + 1];

  if (finished) {
    return (
      <section className="lesson lesson--done" aria-live="polite">
        <div className="celebrate" aria-hidden="true"><Icon name="check" size={40} /></div>
        <h2>{t('completed')}</h2>
        <p>{lesson.title[lang]}</p>
        <ul className="objectives">{lesson.objectives.map((o, i) => <li key={i}><Icon name="check" size={14} /> {o[lang]}</li>)}</ul>
        <div className="row">
          {nextLesson && <button type="button" className="btn" onClick={() => useApp.getState().startLesson(nextLesson.id)}>{t('next')}: {nextLesson.title[lang]}</button>}
          <button type="button" className="btn btn--ghost" onClick={() => { exit(); useApp.getState().go('lessons'); }}>{t('navLessons')}</button>
          <button type="button" className="btn btn--ghost" onClick={() => { exit(); useApp.getState().go('quiz'); }}>{t('navQuiz')}</button>
        </div>
      </section>
    );
  }

  return (
    <section className="lesson" aria-labelledby="lesson-title">
      <header className="lesson__head">
        <p className="eyebrow">{lesson.id.toUpperCase()} · {lesson.minutes} {t('minutes')}</p>
        <h2 id="lesson-title">{lesson.title[lang]}</h2>
        <button type="button" className="tool tool--sm" aria-label={t('close')} onClick={exit}><Icon name="close" size={16} /></button>
      </header>
      {stepIdx === 0 && (
        <ul className="objectives">{lesson.objectives.map((o, i) => <li key={i}><Icon name="sparkle" size={14} /> {o[lang]}</li>)}</ul>
      )}
      <div className="stepper" aria-hidden="true">
        {lesson.steps.map((_, i) => <span key={i} className={i < stepIdx ? 'is-done' : i === stepIdx ? 'is-on' : ''} />)}
      </div>
      <article className="lesson__step" aria-live="polite">
        <h3>{stepIdx + 1}. {step.title[lang]}</h3>
        <p>{step.body[lang]}</p>
        {step.checkpoint && <CheckpointBox key={key} cp={step.checkpoint} onAnswered={() => setAnswered((a) => ({ ...a, [key]: true }))} />}
      </article>
      <footer className="lesson__nav">
        <button type="button" className="btn btn--ghost" disabled={stepIdx === 0} onClick={() => go(stepIdx - 1)}>{t('back')}</button>
        {last ? (
          <button type="button" className="btn" disabled={blocked} onClick={() => { useProgress.getState().completeLesson(lesson.id); setFinished(true); }}>{t('finish')}</button>
        ) : (
          <button type="button" className="btn" disabled={blocked} onClick={() => go(stepIdx + 1)}>{t('next')}</button>
        )}
      </footer>
    </section>
  );
}
