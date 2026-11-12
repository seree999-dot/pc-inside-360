import { Component, Suspense, useState } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor, useProgress } from '@react-three/drei';
import { useApp } from '../store/appStore';
import { useT } from '../i18n';

/** True when the browser can create a WebGL context. Evaluated once. */
export const hasWebGL: boolean = (() => {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') ?? c.getContext('webgl'));
  } catch {
    return false;
  }
})();

function Loader() {
  const { progress, active } = useProgress();
  const t = useT();
  if (!active) return null;
  return (
    <div className="viewer__loading" role="status">
      <div className="viewer__ring" aria-hidden="true" />
      <span>{t('loading3d')} {Math.round(progress)}%</span>
    </div>
  );
}

interface BoundaryState {
  error: string | null;
}
interface BoundaryProps {
  fallback: (msg: string, retry: () => void) => ReactNode;
  children: ReactNode;
}
/** Keeps a 3D failure (context loss, model error) from taking down the whole page. */
export class SceneBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { error: null };
  static getDerivedStateFromError(err: unknown): BoundaryState {
    return { error: err instanceof Error ? err.message : String(err) };
  }
  componentDidCatch(err: unknown, info: ErrorInfo): void {
    // Surfaced in the UI; also kept in the console for instructors debugging a lab machine.
    console.error('3D scene error', err, info.componentStack);
  }
  render() {
    if (this.state.error) return this.props.fallback(this.state.error, () => this.setState({ error: null }));
    return this.props.children;
  }
}

interface ViewerProps {
  children: ReactNode;
  label: string;
  className?: string;
  onMissed?: (e: MouseEvent) => void;
  camera?: { position: [number, number, number]; fov?: number };
  /** Rendered instead of the canvas when WebGL is not available. */
  fallback?: ReactNode;
}

/** Shared WebGL viewport: adaptive resolution, loading state, error boundary and non-3D fallback. */
export function Viewer({ children, label, className = '', onMissed, camera, fallback }: ViewerProps) {
  const t = useT();
  const [dprCap, setDprCap] = useState(1.75);
  const lowPower = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;

  if (!hasWebGL) {
    return (
      <div className={`viewer viewer--fallback ${className}`} role="note">
        <p className="viewer__nogl">{t('noWebGL')}</p>
        {fallback}
      </div>
    );
  }
  return (
    <div className={`viewer ${className}`} role="region" aria-label={label}>
      <SceneBoundary
        fallback={(msg, retry) => (
          <div className="viewer__error" role="alert">
            <strong>{t('sceneError')}</strong>
            <code>{msg}</code>
            <button type="button" className="btn" onClick={retry}>{t('retry')}</button>
            {fallback}
          </div>
        )}
      >
        <Canvas
          shadows={!lowPower}
          dpr={[1, lowPower ? 1.5 : dprCap]}
          gl={{ antialias: true, preserveDrawingBuffer: true, alpha: true, powerPreference: 'high-performance' }}
          camera={{ position: camera?.position ?? [5.2, 2.4, 9.2], fov: camera?.fov ?? 42, near: 0.05, far: 200 }}
          onPointerMissed={onMissed}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <PerformanceMonitor onDecline={() => setDprCap(1)} onIncline={() => setDprCap(1.75)} />
          <AdaptiveDpr pixelated={false} />
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
        <Loader />
      </SceneBoundary>
    </div>
  );
}

/** Keeps selection state sane when a view that used the explorer scene unmounts. */
export function useSceneReset(): () => void {
  return () => useApp.getState().resetScene();
}
