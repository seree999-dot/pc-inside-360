import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Box3, BoxGeometry, Color, EdgesGeometry, Vector3 } from 'three';
import type { Group, Mesh, MeshStandardMaterial } from 'three';
import { useApp } from '../store/appStore';
import { componentById } from '../data';
import { LAYOUT, isolationSet, partsOf } from './layout';
import type { ScenePartId } from './layout';
import { partRegistry } from './registry';
import { PartHotspots } from './Hotspots';

const EDGE_GEOMETRY = new EdgesGeometry(new BoxGeometry(1, 1, 1));
const CYAN = new Color('#00d9ff');
const CLICK_TOLERANCE_PX = 6;
const NO_RAYCAST = () => null;
const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Bounds {
  center: Vector3;
  size: Vector3;
}

/** Clones each mesh material once so highlight and x-ray never leak into other parts. */
function ownMaterials(root: Group): MeshStandardMaterial[] {
  const mats: MeshStandardMaterial[] = [];
  root.traverse((o) => {
    const mesh = o as Mesh;
    if (!mesh.isMesh) return;
    let m = mesh.material as MeshStandardMaterial;
    if (!m.userData.owned) {
      const base = m;
      m = base.clone();
      m.userData = {
        owned: true,
        emissive: base.emissive.clone(),
        intensity: base.emissiveIntensity,
        opacity: base.opacity,
        transparent: base.transparent,
        depthWrite: base.depthWrite,
      };
      mesh.material = m;
    }
    mats.push(m);
  });
  return mats;
}

interface PartProps {
  id: ScenePartId;
  children: ReactNode;
}

/**
 * Selectable scene part: exploded-view motion, hover/selection highlight, isolation,
 * x-ray opacity, name tag and its hotspots.
 */
export function Part({ id, children }: PartProps) {
  const outer = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const layout = LAYOUT[id];

  const exploded = useApp((s) => s.exploded);
  const reveal = useApp((s) => s.reveal);
  const lang = useApp((s) => s.lang);
  const level = useApp((s) => {
    if (s.selected && partsOf(s.selected).includes(id)) return 2;
    return s.hovered === id ? 1 : 0;
  });
  const visible = useApp(
    (s) => !s.hidden.includes(id) && (!s.isolate || !s.selected || isolationSet(s.selected).includes(id)),
  );
  const opacity = useApp((s) => (id === 'case' ? s.caseOpacity : 1));
  const locked = useApp((s) => s.anonymous || s.hotspotPick !== null);
  const anonymous = useApp((s) => s.anonymous);

  useFrame((_, dt) => {
    const g = outer.current;
    if (!g) return;
    const k = reducedMotion() ? 1 : 1 - Math.exp(-dt * 5);
    const f = exploded ? 1 : 0;
    g.position.x += (layout.pos[0] + layout.explode[0] * f - g.position.x) * k;
    g.position.y += (layout.pos[1] + layout.explode[1] * f - g.position.y) * k;
    g.position.z += (layout.pos[2] + layout.explode[2] * f - g.position.z) * k;
  });

  useLayoutEffect(() => {
    const g = outer.current;
    const model = inner.current;
    if (!g || !model) return;
    g.updateWorldMatrix(true, true);
    const box = new Box3().setFromObject(model).applyMatrix4(g.matrixWorld.clone().invert());
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    setBounds({ center, size });
    partRegistry.set(id, { group: g, center, radius: size.length() / 2 });
    return () => {
      partRegistry.delete(id);
    };
  }, [id]);

  useEffect(() => {
    if (!inner.current) return;
    for (const m of ownMaterials(inner.current)) {
      const u = m.userData;
      if (u.intensity < 0.3) {
        if (level > 0) {
          m.emissive.copy(CYAN);
          m.emissiveIntensity = level === 2 ? 0.26 : 0.13;
        } else {
          m.emissive.copy(u.emissive);
          m.emissiveIntensity = u.intensity;
        }
      }
      m.opacity = u.opacity * opacity;
      m.transparent = u.transparent || opacity < 1;
      m.depthWrite = opacity < 1 ? false : u.depthWrite;
    }
  }, [level, opacity, reveal]);

  const over = (e: ThreeEvent<PointerEvent>) => {
    if (locked) return;
    e.stopPropagation();
    useApp.getState().setHovered(id);
    document.body.style.cursor = 'pointer';
  };
  const out = () => {
    if (useApp.getState().hovered === id) useApp.getState().setHovered(null);
    document.body.style.cursor = '';
  };
  const click = (e: ThreeEvent<MouseEvent>) => {
    if (locked || e.delta > CLICK_TOLERANCE_PX) return;
    e.stopPropagation();
    useApp.getState().select(id);
  };
  const doubleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    useApp.getState().cam({ kind: 'point', point: e.point.toArray() as [number, number, number] });
  };

  const showTag = bounds && visible && !anonymous && (level === 2 || (exploded && id !== 'case'));
  return (
    <group
      ref={outer}
      position={layout.pos}
      visible={visible}
      onPointerOver={visible ? over : undefined}
      onPointerOut={out}
      onClick={visible ? click : undefined}
      onDoubleClick={visible ? doubleClick : undefined}
    >
      <group ref={inner}>{children}</group>
      {bounds && level > 0 && (
        <lineSegments geometry={EDGE_GEOMETRY} position={bounds.center} scale={bounds.size} raycast={NO_RAYCAST}>
          <lineBasicMaterial color="#00d9ff" transparent opacity={level === 2 ? 0.95 : 0.5} depthTest={false} />
        </lineSegments>
      )}
      {showTag && (
        <Html
          position={[bounds.center.x, bounds.center.y + bounds.size.y / 2 + 0.12, bounds.center.z]}
          center
          zIndexRange={[30, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div className={`tag3d${level === 2 ? ' is-active' : ''}`}>{componentById[id].name[lang]}</div>
        </Html>
      )}
      {visible && <PartHotspots part={id} />}
    </group>
  );
}
