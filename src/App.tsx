import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { useApp } from './store/appStore';
import type { View } from './store/appStore';
import { useProgress } from './store/progressStore';
import { useT } from './i18n';
import { TopNav } from './components/TopNav';
import { Mentor } from './mentor/Mentor';
import { LandingView } from './views/LandingView';
import { ExploreView } from './views/ExploreView';

const LessonsView = lazy(() => import('./views/LessonsView').then((m) => ({ default: m.LessonsView })));
const AssemblyView = lazy(() => import('./assembly/AssemblyView').then((m) => ({ default: m.AssemblyView })));
const CompareView = lazy(() => import('./views/CompareView').then((m) => ({ default: m.CompareView })));
const QuizView = lazy(() => import('./quiz/QuizView').then((m) => ({ default: m.QuizView })));
const ProgressView = lazy(() => import('./views/ProgressView').then((m) => ({ default: m.ProgressView })));
const TroubleView = lazy(() => import('./views/TroubleView').then((m) => ({ default: m.TroubleView })));
const InstructorView = lazy(() => import('./views/InstructorView').then((m) => ({ default: m.InstructorView })));

const ACTIVE_WINDOW_MS = 60_000;
const TICK_MS = 15_000;

/** Counts learning time only while the tab is visible and the student interacted recently. */
function useLearningTimer() {
  useEffect(() => {
    let last = Date.now();
    const mark = () => { last = Date.now(); };
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, mark, { passive: true }));
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible' && Date.now() - last < ACTIVE_WINDOW_MS) {
        useProgress.getState().addSeconds(TICK_MS / 1000);
      }
    }, TICK_MS);
    return () => {
      events.forEach((e) => window.removeEventListener(e, mark));
      window.clearInterval(id);
    };
  }, []);
}

function Screen({ view }: { view: View }) {
  switch (view) {
    case 'landing': return <LandingView />;
    case 'explore': return <ExploreView />;
    case 'lessons': return <LessonsView />;
    case 'assembly': return <AssemblyView />;
    case 'compare': return <CompareView />;
    case 'quiz': return <QuizView />;
    case 'progress': return <ProgressView />;
    case 'trouble': return <TroubleView />;
    case 'instructor': return <InstructorView />;
  }
}

export function App() {
  const view = useApp((s) => s.view);
  const theme = useApp((s) => s.theme);
  const lang = useApp((s) => s.lang);
  const t = useT();
  useLearningTimer();
  const prevView = useRef<View>(view);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang;
  }, [theme, lang]);
  // Layout effect: runs before the new screen's own effects, so screens can set their scene state.
  useLayoutEffect(() => {
    // Leaving a 3D screen must not carry quiz/selection state into the next one.
    // The explorer keeps a selection made just before navigating (lesson start, Mentor "show me"),
    // but never inherits quiz-only modes or quiz view settings.
    const st = useApp.getState();
    if (view !== 'explore' || prevView.current === 'quiz') st.resetScene();
    st.setQuizScene({ anonymous: false, hotspotPick: null });
    prevView.current = view;
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className={`app app--${view}`}>
      <a href="#main" className="skip">{t('skipToContent')}</a>
      <TopNav />
      <main id="main" className="main" tabIndex={-1}>
        <Suspense fallback={<div className="page-loading" role="status"><div className="viewer__ring" /></div>}>
          <Screen view={view} />
        </Suspense>
      </main>
      <Mentor />
    </div>
  );
}
