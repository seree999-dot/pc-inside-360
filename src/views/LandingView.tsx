import { useEffect } from 'react';
import { useApp } from '../store/appStore';
import { useProgress } from '../store/progressStore';
import { useT } from '../i18n';
import type { UIKey } from '../i18n';
import { Viewer } from '../three/Viewer';
import { ExplorerScene } from '../three/ExplorerScene';
import { components, hotspots, lessons, quizBank } from '../data';
import { Icon } from '../components/Icon';
import type { IconName } from '../components/Icon';
import type { View } from '../store/appStore';

const FEATURES: { icon: IconName; title: UIKey; desc: UIKey; view: View }[] = [
  { icon: 'cube', title: 'featExplore', desc: 'featExploreD', view: 'explore' },
  { icon: 'wrench', title: 'featAssembly', desc: 'featAssemblyD', view: 'assembly' },
  { icon: 'quiz', title: 'featQuiz', desc: 'featQuizD', view: 'quiz' },
  { icon: 'chat', title: 'featMentor', desc: 'featMentorD', view: 'explore' },
];

/** Screen 1: hero with a live, auto-rotating 3D PC the student can already grab and turn. */
export function LandingView() {
  const t = useT();
  const onboardingDone = useProgress((s) => s.onboardingDone);
  useEffect(() => {
    const s = useApp.getState();
    s.set({ autoRotate: true, caseOpacity: 0.32 });
    return () => s.set({ autoRotate: false, caseOpacity: 1 });
  }, []);

  const explore = (intro: boolean) => {
    const s = useApp.getState();
    s.go('explore');
    if (intro) s.setOnboarding(0);
  };
  const stats = [components.length, hotspots.length, lessons.length, quizBank.length];
  const statLabels = t('landingStats').split(' · ');

  return (
    <div className="landing">
      <div className="landing__grid" aria-hidden="true" />
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">{t('tagline')}</p>
          <h1>{t('heroTitle').split('\n').map((line, i) => <span key={i}>{line}</span>)}</h1>
          <p className="hero__lead">{t('heroLead')}</p>
          <div className="row">
            <button type="button" className="btn btn--lg" onClick={() => explore(!onboardingDone)}>
              {t('startExploring')} <Icon name="chevron" />
            </button>
            <button type="button" className="btn btn--ghost btn--lg" onClick={() => useApp.getState().go('lessons')}>{t('browseLessons')}</button>
          </div>
          {onboardingDone && (
            <button type="button" className="linkish" onClick={() => explore(true)}><Icon name="sparkle" size={14} /> {t('startTour')}</button>
          )}
          <dl className="hero__stats">
            {stats.map((n, i) => (
              <div key={i}><dt>{statLabels[i]}</dt><dd>{n}</dd></div>
            ))}
          </dl>
        </div>
        <div className="hero__stage">
          <div className="hero__halo" aria-hidden="true" />
          <Viewer label={t('viewport')} className="hero__viewer" camera={{ position: [6.5, 2.6, 10.5], fov: 38 }}>
            <ExplorerScene towerOnly />
          </Viewer>
          <p className="hero__caption">{t('hintIdle').split(' · ')[0]}</p>
        </div>
      </section>
      <section className="features" aria-label="Features">
        {FEATURES.map((f) => (
          <button key={f.title} type="button" className="feature" onClick={() => (f.title === 'featMentor' ? useApp.getState().setMentorOpen(true) : useApp.getState().go(f.view))}>
            <span className="feature__icon"><Icon name={f.icon} size={22} /></span>
            <b>{t(f.title)}</b>
            <span>{t(f.desc)}</span>
          </button>
        ))}
      </section>
      <p className="landing__note">{t('modelNote')}</p>
    </div>
  );
}
