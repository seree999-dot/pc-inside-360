import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/base.css';
import './styles/explore.css';
import './styles/views.css';

if (import.meta.env.DEV) {
  // Dev-only inspection handle for manual/automated testing; removed from production builds.
  void Promise.all([import('./store/appStore'), import('./store/progressStore'), import('./assembly/store')]).then(([a, p, s]) => {
    Object.assign(window, { __pc360: { app: a.useApp, progress: p.useProgress, assembly: s.useAssembly } });
  });
}

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
