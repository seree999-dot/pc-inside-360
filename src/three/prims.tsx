import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { M, UNIT_BOX, UNIT_CYL, UNIT_CYL_LOW } from './materials';
import type { Mat } from './materials';

export type V3 = [number, number, number];

interface BoxProps {
  s: V3;
  p?: V3;
  r?: V3;
  m: Mat;
}
/** Axis-aligned box: size `s`, position `p`. */
export function Box({ s, p, r, m }: BoxProps) {
  return <mesh geometry={UNIT_BOX} material={m} scale={s} position={p} rotation={r} castShadow receiveShadow />;
}

interface CylProps {
  rad: number;
  h: number;
  p?: V3;
  /** Axis the cylinder runs along. */
  axis?: 'x' | 'y' | 'z';
  m: Mat;
  low?: boolean;
}
const AXIS_ROT: Record<'x' | 'y' | 'z', V3> = { x: [0, 0, Math.PI / 2], y: [0, 0, 0], z: [Math.PI / 2, 0, 0] };
export function Cyl({ rad, h, p, axis = 'y', m, low }: CylProps) {
  return (
    <mesh
      geometry={low ? UNIT_CYL_LOW : UNIT_CYL}
      material={m}
      scale={[rad, h, rad]}
      position={p}
      rotation={AXIS_ROT[axis]}
      castShadow
      receiveShadow
    />
  );
}

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface FanProps {
  size: number;
  thickness?: number;
  p?: V3;
  /** Axis the fan blows along. */
  axis?: 'x' | 'y' | 'z';
  speed?: number;
  blade?: Mat;
  frame?: Mat;
  children?: ReactNode;
}
const FAN_ROT: Record<'x' | 'y' | 'z', V3> = { x: [0, Math.PI / 2, 0], y: [Math.PI / 2, 0, 0], z: [0, 0, 0] };
const BLADES = [0, 1, 2, 3, 4, 5, 6];

/** Axial fan with a square frame, hub and seven blades. Built facing +z, then turned to `axis`. */
export function Fan({ size, thickness = 0.25, p, axis = 'z', speed = 5, blade = M.plasticGrey, frame = M.plastic }: FanProps) {
  const rotor = useRef<Group>(null);
  const still = prefersReducedMotion();
  useFrame((_, dt) => {
    if (rotor.current && !still && speed > 0) rotor.current.rotation.z += dt * speed;
  });
  const half = size / 2;
  const bar = size * 0.07;
  const r = half - bar;
  return (
    <group position={p} rotation={FAN_ROT[axis]}>
      <Box s={[size, bar, thickness]} p={[0, half - bar / 2, 0]} m={frame} />
      <Box s={[size, bar, thickness]} p={[0, -half + bar / 2, 0]} m={frame} />
      <Box s={[bar, size, thickness]} p={[half - bar / 2, 0, 0]} m={frame} />
      <Box s={[bar, size, thickness]} p={[-half + bar / 2, 0, 0]} m={frame} />
      <group ref={rotor}>
        <Cyl rad={size * 0.17} h={thickness * 0.8} axis="z" m={frame} />
        {BLADES.map((i) => {
          const a = (i / BLADES.length) * Math.PI * 2;
          return (
            <group key={i} rotation={[0, 0, a]}>
              <Box s={[r * 0.72, size * 0.2, thickness * 0.12]} p={[r * 0.55, 0, 0]} r={[0.5, 0, 0.25]} m={blade} />
            </group>
          );
        })}
      </group>
    </group>
  );
}

/** Row helper: returns `n` evenly spaced values centred on 0 with the given pitch. */
export function spread(n: number, pitch: number): number[] {
  return Array.from({ length: n }, (_, i) => (i - (n - 1) / 2) * pitch);
}
