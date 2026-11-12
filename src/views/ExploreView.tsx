import { useEffect } from 'react';
import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import { Viewer } from '../three/Viewer';
import { ExplorerScene, useMissedDeselect } from '../three/ExplorerScene';
import { ComponentList } from '../explorer/ComponentList';
import { Inspector } from '../explorer/Inspector';
import { LessonPlayer } from '../explorer/LessonPlayer';
import { Onboarding } from '../explorer/Onboarding';
import { SceneLegend, Toolbar, TourBar } from '../explorer/Toolbar';
import { Icon } from '../components/Icon';

/** Screen 2/3: the three-panel 360° hardware explorer with lesson and inspector panels. */
export function ExploreView() {
  const t = useT();
  const lessonId = useApp((s) => s.lessonId);
  const leftOpen = useApp((s) => s.leftOpen);
  const rightOpen = useApp((s) => s.rightOpen);
  const onboarding = useApp((s) => s.onboarding);
  const tourActive = useApp((s) => s.tour.active);
  const selected = useApp((s) => s.selected);
  const missed = useMissedDeselect();

  useEffect(() => {
    const p = useProgress.getState();
    const s = useApp.getState();
    if (!p.onboardingDone && s.onboarding === null && !s.lessonId) s.setOnboarding(0);
    return () => {
      const st = useApp.getState();
      st.setOnboarding(null);
      st.setTour({ active: false, playing: false });
    };
  }, []);

  const setPanels = useApp.getState().setPanels;
  return (
    <div className={`explore${leftOpen ? ' left-open' : ''}${rightOpen ? ' right-open' : ''}`}>
      <aside className="panel panel--left" aria-label={t('components')}>
        <button type="button" className="panel__close tool tool--sm" aria-label={t('close')} onClick={() => setPanels({ leftOpen: false })}><Icon name="close" size={16} /></button>
        <ComponentList />
      </aside>
      <section className="stage" aria-label={t('viewport')}>
        <Viewer label={t('viewport')} className="stage__viewer" onMissed={missed} fallback={<p className="muted">{t('pickPart')}</p>}>
          <ExplorerScene />
        </Viewer>
        <div className="stage__top">
          <button type="button" className="btn btn--glass btn--sm stage__drawer" onClick={() => setPanels({ leftOpen: !leftOpen })}><Icon name="menu" size={16} /> {t('components')}</button>
          {onboarding === null && !tourActive && (
            <button type="button" className="btn btn--glass btn--sm" onClick={() => useApp.getState().setOnboarding(0)}><Icon name="sparkle" size={16} /> {useApp.getState().lang === 'th' ? 'แนะนำ' : 'Intro'}</button>
          )}
          {(selected || lessonId) && (
            <button type="button" className="btn btn--glass btn--sm stage__drawer stage__drawer--right" onClick={() => setPanels({ rightOpen: !rightOpen })}><Icon name="book" size={16} /> {t('inspector')}</button>
          )}
        </div>
        {!selected && onboarding === null && !tourActive && <p className="stage__hint">{t('hintIdle')}</p>}
        <SceneLegend />
        <Onboarding />
        <TourBar />
        <Toolbar />
      </section>
      <aside className="panel panel--right" aria-label={t('inspector')}>
        <button type="button" className="panel__close tool tool--sm" aria-label={t('close')} title={t('close')} onClick={() => setPanels({ rightOpen: false })}><Icon name="chevron" size={16} /></button>
        {lessonId ? <LessonPlayer /> : <Inspector />}
      </aside>
    </div>
  );
}
