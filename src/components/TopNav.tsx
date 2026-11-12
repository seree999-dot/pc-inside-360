import { useEffect, useState } from 'react';
import { useApp } from '../store/appStore';
import type { View } from '../store/appStore';
import { useT } from '../i18n';
import type { UIKey } from '../i18n';
import { Icon } from './Icon';
import type { IconName } from './Icon';

const NAV: { view: View; key: UIKey; icon: IconName }[] = [
  { view: 'explore', key: 'navExplore', icon: 'cube' },
  { view: 'lessons', key: 'navLessons', icon: 'book' },
  { view: 'assembly', key: 'navAssembly', icon: 'wrench' },
  { view: 'compare', key: 'navCompare', icon: 'scale' },
  { view: 'quiz', key: 'navQuiz', icon: 'quiz' },
  { view: 'trouble', key: 'navTrouble', icon: 'bolt' },
  { view: 'progress', key: 'navProgress', icon: 'chart' },
  { view: 'instructor', key: 'navInstructor', icon: 'user' },
];

function Logo() {
  return (
    <svg className="logo" width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00d9ff" />
          <stop offset="1" stopColor="#4778ff" />
        </linearGradient>
      </defs>
      <path d="M16 2l12 7v14l-12 7-12-7V9z" fill="none" stroke="url(#lg)" strokeWidth="2" />
      <path d="M16 9l6 3.5v7L16 23l-6-3.5v-7z" fill="url(#lg)" opacity="0.9" />
      <circle cx="16" cy="16" r="13.5" fill="none" stroke="url(#lg)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
    </svg>
  );
}

/** Global navigation: modules, language, theme and fullscreen. */
export function TopNav() {
  const t = useT();
  const view = useApp((s) => s.view);
  const lang = useApp((s) => s.lang);
  const theme = useApp((s) => s.theme);
  const [open, setOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    const on = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  useEffect(() => setOpen(false), [view]);

  const fullscreen = () => {
    const req = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.();
    req?.catch(() => undefined);
  };
  const go = (v: View) => useApp.getState().go(v);

  return (
    <header className="topnav">
      <button type="button" className="brand" onClick={() => go('landing')} aria-label={`${t('appName')} — ${t('appSub')}`}>
        <Logo />
        <span className="brand__text"><b>PC INSIDE <em>360°</em></b><small>{t('appSub')}</small></span>
      </button>
      <nav className={`topnav__links${open ? ' is-open' : ''}`} aria-label="Main">
        {NAV.map((n) => (
          <a
            key={n.view}
            href={`#/${n.view}`}
            className={view === n.view ? 'is-on' : ''}
            aria-current={view === n.view ? 'page' : undefined}
            onClick={(e) => { e.preventDefault(); go(n.view); }}
          >
            <Icon name={n.icon} size={16} />
            <span>{t(n.key)}</span>
          </a>
        ))}
      </nav>
      <div className="topnav__tools">
        <button type="button" className="tool lang" aria-label={t('langLabel')} title={t('langLabel')} onClick={() => useApp.getState().setLang(lang === 'th' ? 'en' : 'th')}>
          {t('langSwitch')}
        </button>
        <button type="button" className="tool" aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')} title={theme === 'dark' ? t('themeLight') : t('themeDark')} onClick={() => useApp.getState().setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
        </button>
        <button type="button" className="tool hide-sm" aria-label={t('fullscreen')} aria-pressed={isFull} title={t('fullscreen')} onClick={fullscreen}>
          <Icon name="expand" />
        </button>
        <button type="button" className="tool topnav__burger" aria-label={t('menu')} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
