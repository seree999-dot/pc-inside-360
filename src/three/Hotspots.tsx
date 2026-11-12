import { useMemo } from 'react';
import { Html } from '@react-three/drei';
import { useApp } from '../store/appStore';
import { hotspotsOf } from '../data';
import { partsOf } from './layout';
import type { ScenePartId } from './layout';

interface PartHotspotsProps {
  part: ScenePartId;
}

/**
 * Interactive annotations anchored to physical features. They live inside the part's group,
 * so they stay attached while the model rotates or explodes.
 */
export function PartHotspots({ part }: PartHotspotsProps) {
  const spots = useMemo(() => hotspotsOf(part), [part]);
  const show = useApp(
    (s) => s.annotations && !s.anonymous && s.selected !== null && partsOf(s.selected).includes(part),
  );
  const active = useApp((s) => s.activeHotspot);
  const lang = useApp((s) => s.lang);
  const pick = useApp((s) => s.hotspotPick);
  if (!show || spots.length === 0) return null;

  return (
    <>
      {spots.map((h, i) => {
        const isActive = active === h.id && !pick;
        return (
          <Html key={h.id} position={h.pos} center zIndexRange={isActive ? [60, 50] : [40, 31]}>
            <button
              type="button"
              className={`hotspot${isActive ? ' is-active' : ''}${pick ? ' is-quiz' : ''}`}
              aria-label={pick ? `${i + 1}` : h.name[lang]}
              aria-pressed={isActive}
              onClick={(e) => {
                e.stopPropagation();
                if (pick) pick(h.id);
                else useApp.getState().setHotspot(isActive ? null : h.id);
              }}
            >
              <span className="hotspot__dot" aria-hidden="true">{pick ? i + 1 : ''}</span>
              {!pick && <span className="hotspot__label">{h.name[lang]}</span>}
            </button>
          </Html>
        );
      })}
    </>
  );
}
