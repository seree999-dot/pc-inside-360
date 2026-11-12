import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useApp } from '../store/appStore';
import { useT } from '../i18n';
import type { UIKey } from '../i18n';
import { Icon } from '../components/Icon';
import type { IconName } from '../components/Icon';
import { componentById } from '../data';
import { SCENE_PARTS } from '../three/layout';
import type { CameraPreset } from '../three/layout';
import { downloadScreenshot } from '../three/registry';
import { TOUR, TOUR_STOP_MS } from './tour';

interface ToolProps {
  icon: IconName;
  label: string;
  active?: boolean;
  onClick: () => void;
  wide?: boolean;
  disabled?: boolean;
}
function Tool({ icon, label, active, onClick, wide, disabled }: ToolProps) {
  return (
    <button
      type="button"
      className={`tool${active ? ' is-on' : ''}${wide ? ' tool--wide' : ''}`}
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon name={icon} />
      {wide && <span>{label}</span>}
    </button>
  );
}

const PRESETS: { id: CameraPreset; key: UIKey }[] = [
  { id: 'front', key: 'presetFront' }, { id: 'back', key: 'presetBack' }, { id: 'left', key: 'presetLeft' },
  { id: 'right', key: 'presetRight' }, { id: 'top', key: 'presetTop' }, { id: 'bottom', key: 'presetBottom' },
  { id: 'iso', key: 'presetIso' },
];

function Popover({ open, children, label }: { open: boolean; children: ReactNode; label: string }) {
  if (!open) return null;
  return <div className="popover" role="dialog" aria-label={label}>{children}</div>;
}

/** Bottom 3D toolbar. Every control drives the scene through the app store. */
export function Toolbar() {
  const t = useT();
  const s = useApp();
  const [menu, setMenu] = useState<'views' | 'hide' | 'xray' | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const flip = (m: 'views' | 'hide' | 'xray') => setMenu((cur) => (cur === m ? null : m));

  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 1800);
    return () => window.clearTimeout(id);
  }, [flash]);

  const shot = () => {
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#071426';
    if (downloadScreenshot(bg, `pc-inside-360-${Date.now()}.png`)) setFlash(t('shotSaved'));
  };
  const xrayOn = s.caseOpacity < 1;

  return (
    <div className="toolbar" role="toolbar" aria-label="3D">
      <div className="toolbar__group">
        <Tool icon="rotate" label={t('tbRotate')} active={!s.panMode} onClick={() => s.set({ panMode: false })} />
        <Tool icon="pan" label={t('tbPan')} active={s.panMode} onClick={() => s.set({ panMode: true })} />
        <Tool icon="zoomIn" label={t('tbZoomIn')} onClick={() => s.cam({ kind: 'zoom', factor: 0.7 })} />
        <Tool icon="zoomOut" label={t('tbZoomOut')} onClick={() => s.cam({ kind: 'zoom', factor: 1.4 })} />
        <Tool icon="home" label={t('tbReset')} onClick={() => s.cam({ kind: 'reset' })} />
        <Tool icon="fit" label={t('tbFit')} onClick={() => s.cam({ kind: 'overview' })} />
        <div className="toolbar__anchor">
          <Tool icon="views" label={t('tbViews')} active={menu === 'views'} onClick={() => flip('views')} />
          <Popover open={menu === 'views'} label={t('tbViews')}>
            <div className="preset-grid">
              {PRESETS.map((p) => (
                <button key={p.id} type="button" className="chip" onClick={() => { s.cam({ kind: 'preset', preset: p.id }); setMenu(null); }}>
                  {t(p.key)}
                </button>
              ))}
            </div>
          </Popover>
        </div>
        <Tool icon="spin" label={t('tbAuto')} active={s.autoRotate} onClick={() => s.toggle('autoRotate')} />
      </div>
      <span className="toolbar__sep" aria-hidden="true" />
      <div className="toolbar__group">
        <Tool icon="explode" label={t('tbExplode')} active={s.exploded} onClick={() => s.toggle('exploded')} wide />
        <div className="toolbar__anchor">
          <Tool icon="xray" label={t('tbXray')} active={xrayOn} onClick={() => { s.set({ caseOpacity: xrayOn ? 1 : 0.18 }); flip('xray'); }} />
          <Popover open={menu === 'xray'} label={t('tbOpacity')}>
            <label className="slider">
              <span>{t('tbOpacity')} {Math.round(s.caseOpacity * 100)}%</span>
              <input type="range" min={0.05} max={1} step={0.05} value={s.caseOpacity} onChange={(e) => s.set({ caseOpacity: Number(e.target.value) })} />
            </label>
          </Popover>
        </div>
        <Tool icon="isolate" label={t('tbIsolate')} active={s.isolate} disabled={!s.selected} onClick={() => s.toggle('isolate')} />
        <div className="toolbar__anchor">
          <Tool icon="layers" label={t('tbHide')} active={menu === 'hide' || s.hidden.length > 0} onClick={() => flip('hide')} />
          <Popover open={menu === 'hide'} label={t('tbHide')}>
            <div className="hide-list">
              {SCENE_PARTS.map((id) => (
                <label key={id} className="check">
                  <input type="checkbox" checked={!s.hidden.includes(id)} onChange={() => s.toggleHidden(id)} />
                  <span>{componentById[id].name[s.lang]}</span>
                </label>
              ))}
            </div>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => s.showAll()}>{t('tbShowAll')}</button>
          </Popover>
        </div>
        <Tool icon="link" label={t('tbLinks')} active={s.connections} onClick={() => s.toggle('connections')} />
        <Tool icon="wind" label={t('tbAirflow')} active={s.airflow} onClick={() => s.toggle('airflow')} />
        <Tool icon="tag" label={t('tbLabels')} active={s.annotations} onClick={() => s.toggle('annotations')} />
      </div>
      <span className="toolbar__sep" aria-hidden="true" />
      <div className="toolbar__group">
        <Tool icon="camera" label={t('tbShot')} onClick={shot} />
        <Tool icon="tour" label={t('tbTour')} active={s.tour.active} onClick={() => s.setTour({ active: !s.tour.active, playing: true, index: 0 })} />
      </div>
      {flash && <div className="toast" role="status">{flash}</div>}
    </div>
  );
}

/** Drives the guided camera tour: pause, resume, skip, back and replay. */
export function TourBar() {
  const t = useT();
  const tour = useApp((s) => s.tour);
  const lang = useApp((s) => s.lang);
  const stop = TOUR[tour.index];

  useEffect(() => {
    if (!tour.active || !stop) return;
    const s = useApp.getState();
    s.set({ exploded: Boolean(stop.exploded), caseOpacity: stop.xray || stop.exploded ? 0.2 : 1, airflow: Boolean(stop.airflow), isolate: false });
    if (stop.part) {
      s.select(stop.part);
      if (stop.hotspot) s.setHotspot(stop.hotspot);
    } else {
      s.select(null, false);
      s.cam(stop.overview ? { kind: 'overview' } : { kind: 'preset', preset: stop.preset ?? 'iso' });
    }
  }, [tour.active, tour.index, stop]);

  useEffect(() => {
    if (!tour.active || !tour.playing) return;
    const id = window.setTimeout(() => {
      const s = useApp.getState();
      if (s.tour.index < TOUR.length - 1) s.setTour({ index: s.tour.index + 1 });
      else s.setTour({ playing: false });
    }, TOUR_STOP_MS);
    return () => window.clearTimeout(id);
  }, [tour.active, tour.playing, tour.index]);

  if (!tour.active || !stop) return null;
  const set = useApp.getState().setTour;
  const last = tour.index === TOUR.length - 1;
  return (
    <div className="tourbar" role="region" aria-label={t('tbTour')} aria-live="polite">
      <div className="tourbar__progress" aria-hidden="true">
        {TOUR.map((_, i) => <span key={i} className={i <= tour.index ? 'is-on' : ''} />)}
      </div>
      <p className="tourbar__caption"><b>{tour.index + 1}/{TOUR.length}</b> {stop.caption[lang]}</p>
      <div className="tourbar__ctrl">
        <button type="button" className="tool" aria-label={t('tourPrev')} title={t('tourPrev')} disabled={tour.index === 0} onClick={() => set({ index: tour.index - 1 })}><Icon name="prev" /></button>
        {last && !tour.playing ? (
          <button type="button" className="tool" aria-label={t('tourReplay')} title={t('tourReplay')} onClick={() => set({ index: 0, playing: true })}><Icon name="rotate" /></button>
        ) : (
          <button type="button" className="tool" aria-label={tour.playing ? t('tourPause') : t('tourPlay')} title={tour.playing ? t('tourPause') : t('tourPlay')} onClick={() => set({ playing: !tour.playing })}>
            <Icon name={tour.playing ? 'pause' : 'tour'} />
          </button>
        )}
        <button type="button" className="tool" aria-label={t('tourNext')} title={t('tourNext')} disabled={last} onClick={() => set({ index: tour.index + 1 })}><Icon name="next" /></button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => { set({ active: false, playing: false }); useApp.getState().resetScene(); useApp.getState().cam({ kind: 'reset' }); }}>{t('tourEnd')}</button>
      </div>
    </div>
  );
}

/** Colour legend shown when connection paths or airflow are on. */
export function SceneLegend() {
  const t = useT();
  const connections = useApp((s) => s.connections && s.selected !== null);
  const airflow = useApp((s) => s.airflow);
  if (!connections && !airflow) return null;
  return (
    <div className="legend" aria-live="polite">
      {connections && (
        <>
          <span><i style={{ background: '#00d9ff' }} />{t('legendData')}</span>
          <span><i style={{ background: '#ffbf47' }} />{t('legendPower')}</span>
          <span><i style={{ background: '#ff6b5e' }} />{t('legendHeat')}</span>
        </>
      )}
      {airflow && <span className="legend__note">{t('airflowNote')}</span>}
    </div>
  );
}
