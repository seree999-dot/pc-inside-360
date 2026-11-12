import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { Color, Object3D, QuadraticBezierCurve3, Vector3 } from 'three';
import type { InstancedMesh } from 'three';
import type { Line2 } from 'three-stdlib';
import { useApp } from '../store/appStore';
import { LAYOUT, LINKS, partsOf } from './layout';
import type { LinkKind, ScenePartId } from './layout';
import { partRegistry } from './registry';

export const LINK_COLOR: Record<LinkKind, string> = { data: '#00d9ff', power: '#ffbf47', thermal: '#ff6b5e' };
const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Where a part will rest once the exploded-view transition settles. */
function restingCenter(id: ScenePartId, exploded: boolean): Vector3 | null {
  const entry = partRegistry.get(id);
  if (!entry) return null;
  const l = LAYOUT[id];
  const f = exploded ? 1 : 0;
  return new Vector3(l.pos[0] + l.explode[0] * f, l.pos[1] + l.explode[1] * f, l.pos[2] + l.explode[2] * f).add(entry.center);
}

interface PathProps {
  from: Vector3;
  to: Vector3;
  kind: LinkKind;
}
function FlowPath({ from, to, kind }: PathProps) {
  const ref = useRef<Line2>(null);
  const points = useMemo(() => {
    const mid = from.clone().lerp(to, 0.5);
    mid.z += 0.6 + from.distanceTo(to) * 0.18;
    return new QuadraticBezierCurve3(from, mid, to).getPoints(28);
  }, [from, to]);
  useFrame((_, dt) => {
    if (ref.current && !reducedMotion()) ref.current.material.dashOffset -= dt * 0.9;
  });
  return (
    <Line ref={ref} points={points} color={LINK_COLOR[kind]} lineWidth={2.4} dashed dashSize={0.16} gapSize={0.1} transparent opacity={0.95} depthTest={false} />
  );
}

/** Animated conceptual data / power / heat relationships of the selected component. */
export function Connections() {
  const selected = useApp((s) => s.selected);
  const on = useApp((s) => s.connections);
  const exploded = useApp((s) => s.exploded);
  const hidden = useApp((s) => s.hidden);
  const [ready, setReady] = useState(0);
  // Parts register their bounds in a layout effect; re-evaluate once after mount.
  useEffect(() => setReady((n) => n + 1), [selected, on]);

  const paths = useMemo(() => {
    if (!on || !selected) return [];
    const mine = partsOf(selected);
    return LINKS.filter((l) => (mine.includes(l.a) || mine.includes(l.b)) && !hidden.includes(l.a) && !hidden.includes(l.b))
      .map((l) => ({ key: `${l.a}-${l.b}`, kind: l.kind, from: restingCenter(l.a, exploded), to: restingCenter(l.b, exploded) }))
      .filter((p): p is { key: string; kind: LinkKind; from: Vector3; to: Vector3 } => p.from !== null && p.to !== null);
  }, [on, selected, exploded, hidden, ready]);

  return (
    <>
      {paths.map((p) => (
        <FlowPath key={p.key} from={p.from} to={p.to} kind={p.kind} />
      ))}
    </>
  );
}

const PARTICLES = 70;
const COOL = new Color('#4cc9ff');
const HOT = new Color('#ff7a45');
const dummy = new Object3D();
const tint = new Color();

/**
 * Conceptual airflow + heat overlay: cool air enters at the front fans, crosses the CPU cooler
 * fin stack where it picks up heat, and leaves through the rear exhaust fan.
 */
export function Airflow() {
  const on = useApp((s) => s.airflow);
  const mesh = useRef<InstancedMesh>(null);
  const seeds = useMemo(
    () => Array.from({ length: PARTICLES }, (_, i) => ({ phase: i / PARTICLES, lane: i % 2, wobble: (i * 0.618) % 1 })),
    [],
  );
  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m || !on) return;
    const time = reducedMotion() ? 0 : clock.elapsedTime * 0.16;
    seeds.forEach((s, i) => {
      const t = (s.phase + time) % 1;
      const x = 2.3 - t * 5.4;
      const startY = s.lane ? 0.9 : -0.4;
      const ease = Math.min(1, Math.max(0, (t - 0.1) / 0.5));
      const y = startY + (1.35 - startY) * ease * ease * (3 - 2 * ease) + Math.sin(s.wobble * 20 + t * 9) * 0.12;
      const z = -0.05 + (s.wobble - 0.5) * 0.9;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.035 + 0.02 * Math.sin(t * Math.PI));
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      const heat = Math.min(1, Math.max(0, (-0.75 - x) / 0.9));
      m.setColorAt(i, tint.copy(COOL).lerp(HOT, heat));
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });
  if (!on) return null;
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PARTICLES]} raycast={() => null}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshBasicMaterial transparent opacity={0.9} depthWrite={false} />
    </instancedMesh>
  );
}
