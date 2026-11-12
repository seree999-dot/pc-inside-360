import { useLayoutEffect, useRef } from 'react';
import type { KeyboardEvent, PointerEvent, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import type { Group } from 'three';
import { StudioLights } from './ExplorerScene';
import { renderModel } from './models';
import type { ModelId } from '../data/types';

/** Scales any model so its largest dimension equals `fit`, centred on the origin. */
function Normalize({ fit, children }: { fit: number; children: ReactNode }) {
  const outer = useRef<Group>(null);
  const inner = useRef<Group>(null);
  useLayoutEffect(() => {
    if (!outer.current || !inner.current) return;
    const box = new Box3().setFromObject(inner.current);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const s = fit / Math.max(size.x, size.y, size.z, 0.001);
    outer.current.scale.setScalar(s);
    inner.current.position.set(-center.x, -center.y, -center.z);
  }, [fit]);
  return <group ref={outer}><group ref={inner}>{children}</group></group>;
}

/** Shared rotation for synchronized viewing; written by pointer drags on the canvas. */
export const syncRotation = { x: 0.5, y: 0.6, dragging: false, idle: 0 };
const reduced = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Spinner({ children, offsetX }: { children: ReactNode; offsetX: number }) {
  const g = useRef<Group>(null);
  useFrame((_, dt) => {
    if (!syncRotation.dragging) {
      syncRotation.idle += dt;
      if (syncRotation.idle > 2.5 && !reduced()) syncRotation.y += dt * 0.25 / 2;
    }
    if (g.current) g.current.rotation.set(syncRotation.x, syncRotation.y, 0);
  });
  return <group position={[offsetX, 0, 0]}><group ref={g}>{children}</group></group>;
}

interface DualStageProps {
  a: ModelId;
  b: ModelId;
}

/** Two models side by side, sharing one rotation so students compare the same angle. */
export function DualStage({ a, b }: DualStageProps) {
  return (
    <>
      <StudioLights />
      <Spinner offsetX={-1.7}><Normalize fit={2.4}>{renderModel(a, { reveal: a === 'hdd' })}</Normalize></Spinner>
      <Spinner offsetX={1.7}><Normalize fit={2.4}>{renderModel(b, { reveal: b === 'hdd' })}</Normalize></Spinner>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.4} far={3} />
    </>
  );
}

/** Pointer handlers for the element wrapping a DualStage canvas. */
export function syncDragHandlers() {
  let last: { x: number; y: number } | null = null;
  return {
    onPointerDown: (e: PointerEvent) => { last = { x: e.clientX, y: e.clientY }; syncRotation.dragging = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); },
    onPointerMove: (e: PointerEvent) => {
      if (!last) return;
      syncRotation.y += (e.clientX - last.x) * 0.01;
      syncRotation.x = Math.max(-1.4, Math.min(1.4, syncRotation.x + (e.clientY - last.y) * 0.01));
      last = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: () => { last = null; syncRotation.dragging = false; syncRotation.idle = 0; },
    onKeyDown: (e: KeyboardEvent) => {
      const step = 0.2;
      if (e.key === 'ArrowLeft') syncRotation.y -= step;
      else if (e.key === 'ArrowRight') syncRotation.y += step;
      else if (e.key === 'ArrowUp') syncRotation.x -= step;
      else if (e.key === 'ArrowDown') syncRotation.x += step;
      else return;
      syncRotation.idle = 0;
      e.preventDefault();
    },
  };
}
