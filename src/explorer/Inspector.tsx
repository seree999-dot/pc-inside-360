import { useEffect, useState } from 'react';
import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import { componentById, hotspotById, hotspotsOf, lessonById } from '../data';
import type { HardwareComponent, Lang } from '../data/types';
import { Icon } from '../components/Icon';
import { PartGlyph } from '../components/PartGlyph';
import { REVEALABLE } from '../three/models';
import type { ScenePartId } from '../three/layout';
import { FdeDiagram, ThermalDiagram } from './Diagrams';

type Tab = 'overview' | 'structure' | 'specs' | 'connect' | 'care' | 'review';
const TABS: { id: Tab; key: 'tabOverview' | 'tabStructure' | 'tabSpecs' | 'tabConnect' | 'tabCare' | 'tabReview' }[] = [
  { id: 'overview', key: 'tabOverview' }, { id: 'structure', key: 'tabStructure' }, { id: 'specs', key: 'tabSpecs' },
  { id: 'connect', key: 'tabConnect' }, { id: 'care', key: 'tabCare' }, { id: 'review', key: 'tabReview' },
];

function HotspotCard({ id }: { id: string }) {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const h = hotspotById[id];
  if (!h) return null;
  const lesson = h.lesson ? lessonById[h.lesson] : undefined;
  return (
    <article className="hcard" aria-live="polite">
      <header>
        <span className="hcard__pin" aria-hidden="true" />
        <h3>{h.name[lang]}</h3>
        <button type="button" className="tool tool--sm" aria-label={t('close')} onClick={() => useApp.getState().setHotspot(null)}><Icon name="close" size={16} /></button>
      </header>
      <p className="hcard__brief">{h.brief[lang]}</p>
      <p>{h.detail[lang]}</p>
      <p className="hcard__sig"><b>{t('significance')}:</b> {h.significance[lang]}</p>
      {lesson && (
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => useApp.getState().startLesson(lesson.id)}>
          <Icon name="book" size={16} /> {t('openLesson')}: {lesson.title[lang]}
        </button>
      )}
    </article>
  );
}

function Body({ c, tab, lang }: { c: HardwareComponent; tab: Tab; lang: Lang }) {
  const t = useT();
  const level = useApp((s) => s.level);
  const [shown, setShown] = useState<number[]>([]);
  useEffect(() => setShown([]), [c.id]);

  switch (tab) {
    case 'overview':
      return (
        <>
          <p className="lead">{c.overview[lang]}</p>
          <h4>{t('mainFunction')}</h4>
          <p>{c.mainFunction[lang]}</p>
          <h4>{t('howItWorks')} <span className="badge">{level === 'beginner' ? t('beginner') : t('technical')}</span></h4>
          <p>{c.howItWorks[level][lang]}</p>
          {c.id === 'cpu' && <FdeDiagram />}
          {c.id === 'cooler' && <ThermalDiagram />}
          <details>
            <summary>{t('useCases')}</summary>
            <ul>{c.useCases.map((u, i) => <li key={i}>{u[lang]}</li>)}</ul>
          </details>
          <details>
            <summary>{t('facts')}</summary>
            <ul>{c.facts.map((f, i) => <li key={i}>{f[lang]}</li>)}</ul>
          </details>
        </>
      );
    case 'structure': {
      const spots = hotspotsOf(c.id);
      return (
        <>
          <ul className="deflist">
            {c.structure.map((s, i) => <li key={i}><b>{s.name[lang]}</b><span>{s.desc[lang]}</span></li>)}
          </ul>
          {spots.length > 0 && (
            <>
              <h4>{t('hotspotsTitle')}</h4>
              <div className="chips">
                {spots.map((h) => (
                  <button key={h.id} type="button" className="chip" onClick={() => useApp.getState().setHotspot(h.id)}>{h.name[lang]}</button>
                ))}
              </div>
            </>
          )}
        </>
      );
    }
    case 'specs':
      return (
        <table className="spec">
          <tbody>
            {c.specs.map((s, i) => (
              <tr key={i}>
                <th scope="row">{s.label[lang]}</th>
                <td>{s.value[lang]}{s.note && <small>{s.note[lang]}</small>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'connect':
      return (
        <>
          <p>{c.connects[lang]}</p>
          <h4>{t('compat')}</h4>
          <ul>{c.compatibility.map((x, i) => <li key={i}>{x[lang]}</li>)}</ul>
          <h4>{t('related')}</h4>
          <div className="chips">
            {c.related.map((r) => (
              <button key={r} type="button" className="chip" onClick={() => useApp.getState().select(r)}>{componentById[r].name[lang]}</button>
            ))}
          </div>
        </>
      );
    case 'care':
      return (
        <>
          <h4>{t('problems')}</h4>
          {c.problems.map((p, i) => (
            <details key={i}>
              <summary>{p.symptom[lang]}</summary>
              <p><b>{t('diagnose')}:</b> {p.check[lang]}</p>
            </details>
          ))}
          <h4>{t('safety')}</h4>
          <ul className="safety">{c.safety.map((s, i) => <li key={i}>{s[lang]}</li>)}</ul>
        </>
      );
    case 'review':
      return (
        <>
          <h4>{t('vocab')}</h4>
          <dl className="vocab">
            {c.vocab.map((v) => (
              <div key={v.en}><dt>{v.en} <span>{v.th}</span></dt><dd>{v.meaning[lang]}</dd></div>
            ))}
          </dl>
          <h4>{t('reviewQs')}</h4>
          <ol className="review">
            {c.review.map((r, i) => (
              <li key={i}>
                <p>{r.q[lang]}</p>
                {shown.includes(i) ? (
                  <p className="review__a">{r.a[lang]}</p>
                ) : (
                  <button type="button" className="btn btn--ghost btn--sm" onClick={() => setShown((s) => [...s, i])}>{t('showAnswer')}</button>
                )}
              </li>
            ))}
          </ol>
        </>
      );
  }
}

/** Right panel: structured, bilingual educational content for the current selection. */
export function Inspector() {
  const t = useT();
  const lang = useApp((s) => s.lang);
  const level = useApp((s) => s.level);
  const selected = useApp((s) => s.selected);
  const activeHotspot = useApp((s) => s.activeHotspot);
  const reveal = useApp((s) => s.reveal);
  const [tab, setTab] = useState<Tab>('overview');

  useEffect(() => {
    if (selected) useProgress.getState().markExplored(selected);
  }, [selected]);
  useEffect(() => {
    if (activeHotspot) setTab('structure');
  }, [activeHotspot]);

  if (!selected) {
    return (
      <div className="inspector inspector--empty">
        <h2 className="panel-title">{t('inspector')}</h2>
        <div className="empty-art" aria-hidden="true"><PartGlyph id="motherboard" size={72} /></div>
        <p className="muted">{t('pickPart')}</p>
      </div>
    );
  }
  const c = componentById[selected];
  const canReveal = REVEALABLE.includes(selected as ScenePartId);
  return (
    <div className="inspector">
      <header className="inspector__head">
        <PartGlyph id={c.id} size={42} />
        <div>
          <h2>{c.name[lang]}</h2>
          <p className="muted">{lang === 'th' ? c.name.en : c.name.th} · <b>{c.abbr}</b></p>
        </div>
      </header>
      <div className="inspector__actions">
        <div className="seg" role="group" aria-label={t('howItWorks')}>
          <button type="button" className={level === 'beginner' ? 'is-on' : ''} aria-pressed={level === 'beginner'} onClick={() => useApp.getState().setLevel('beginner')}>{t('beginner')}</button>
          <button type="button" className={level === 'technical' ? 'is-on' : ''} aria-pressed={level === 'technical'} onClick={() => useApp.getState().setLevel('technical')}>{t('technical')}</button>
        </div>
        {canReveal && (
          <button type="button" className={`btn btn--ghost btn--sm${reveal ? ' is-on' : ''}`} aria-pressed={reveal} onClick={() => useApp.getState().toggle('reveal')}>
            <Icon name="layers" size={16} /> {reveal ? t('hideInside') : t('revealInside')}
          </button>
        )}
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => useApp.getState().setMentorOpen(true)}><Icon name="chat" size={16} /> {t('askMentor')}</button>
      </div>
      {activeHotspot && <HotspotCard id={activeHotspot} />}
      <div className="tabs" role="tablist" aria-label={c.name[lang]}>
        {TABS.map((x) => (
          <button key={x.id} type="button" role="tab" id={`tab-${x.id}`} aria-selected={tab === x.id} aria-controls="inspector-panel" className={tab === x.id ? 'is-on' : ''} onClick={() => setTab(x.id)}>
            {t(x.key)}
          </button>
        ))}
      </div>
      <div className="inspector__body" role="tabpanel" id="inspector-panel" aria-labelledby={`tab-${tab}`} tabIndex={0}>
        <Body c={c} tab={tab} lang={lang} />
      </div>
    </div>
  );
}
