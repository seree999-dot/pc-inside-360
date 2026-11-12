import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { M } from '../materials';
import { Box, Cyl, Fan, spread } from '../prims';
import type { V3 } from '../prims';
import { useSlide } from './core';
import type { ModelProps } from './core';

/** Interior bounds of the mid-tower (scene units, 1 unit = 10 cm). */
export const CASE = { x0: -2.2, x1: 2.5, y0: -2.35, y1: 2.35, z0: -1.1, z1: 1.1 } as const;
const CX = (CASE.x0 + CASE.x1) / 2;
const W = CASE.x1 - CASE.x0;
const H = CASE.y1 - CASE.y0;
const D = CASE.z1 - CASE.z0;

const STANDOFFS: V3[] = [
  [-2.0, 2.0, -0.765], [-0.9, 2.0, -0.765], [0.2, 2.0, -0.765],
  [-2.0, 0.6, -0.765], [-0.9, 0.6, -0.765], [0.2, 0.6, -0.765],
  [-2.0, -0.8, -0.765], [-0.9, -0.8, -0.765], [0.2, -0.8, -0.765],
];
const NO_RAYCAST = () => null;

interface CaseProps {
  /** Slides the glass side panel away (exploded view). */
  open?: boolean;
  /** Hide fans, e.g. for the empty-case step of the assembly lab. */
  bare?: boolean;
  /** Render the glass side panel (off on the assembly bench, where it is removed). */
  glass?: boolean;
}

/** Mid-tower ATX case: steel frame, glass side panel, PSU shroud, two intake fans and one exhaust fan. */
export function CaseModel({ open, bare, glass: withGlass = true }: CaseProps) {
  const glass = useSlide([0, 0, open ? 2.6 : 0]);
  return (
    <group>
      {/* Motherboard tray, far side panel, top, bottom, front */}
      <Box s={[W, H, 0.03]} p={[CX, 0, -0.8]} m={M.caseBody} />
      <Box s={[W, H, 0.03]} p={[CX, 0, CASE.z0]} m={M.caseBody} />
      <Box s={[W, 0.04, D]} p={[CX, CASE.y1, 0]} m={M.caseBody} />
      <Box s={[W, 0.04, D]} p={[CX, CASE.y0, 0]} m={M.caseBody} />
      <Box s={[0.05, H, D]} p={[CASE.x1, 0, 0]} m={M.frontMesh} />
      <Box s={[0.012, H * 0.86, 0.03]} p={[CASE.x1 + 0.03, 0, 0.75]} m={M.led} />
      {/* Rear frame: columns and cross bars leave openings for I/O, fan, slots and PSU */}
      <Box s={[0.04, H, 0.2]} p={[CASE.x0, 0, 1.0]} m={M.caseBody} />
      <Box s={[0.04, H, 0.32]} p={[CASE.x0, 0, -0.94]} m={M.caseBody} />
      {[2.27, 0.52, -1.3].map((y) => (
        <Box key={y} s={[0.04, 0.16, D]} p={[CASE.x0, y, 0]} m={M.caseBody} />
      ))}
      {spread(7, 0.2).map((y) => (
        <Box key={y} s={[0.02, 0.03, 1.3]} p={[CASE.x0, -0.42 + y, -0.05]} m={M.steel} />
      ))}
      {/* PSU shroud plate */}
      <Box s={[W, 0.03, 1.9]} p={[CX, -1.3, 0.15]} m={M.caseBody} />
      {/* Standoffs */}
      {STANDOFFS.map((p, i) => (
        <Cyl key={i} rad={0.03} h={0.05} p={p} axis="z" m={M.gold} low />
      ))}
      {/* Front I/O on the top edge */}
      <Cyl rad={0.07} h={0.03} p={[2.2, CASE.y1 + 0.03, 0.6]} m={M.led} />
      <Box s={[0.14, 0.02, 0.06]} p={[1.9, CASE.y1 + 0.025, 0.6]} m={M.usbBlue} />
      <Box s={[0.14, 0.02, 0.06]} p={[1.65, CASE.y1 + 0.025, 0.6]} m={M.usbBlue} />
      {/* Feet */}
      {[CASE.x0 + 0.4, CASE.x1 - 0.4].map((x) =>
        [-0.8, 0.8].map((z) => <Box key={`${x}${z}`} s={[0.4, 0.1, 0.2]} p={[x, CASE.y0 - 0.06, z]} m={M.rubber} />),
      )}
      {!bare && (
        <>
          <Fan size={1.2} p={[CASE.x1 - 0.17, 0.9, 0.1]} axis="x" speed={5} blade={M.plasticGrey} />
          <Fan size={1.2} p={[CASE.x1 - 0.17, -0.4, 0.1]} axis="x" speed={5} blade={M.plasticGrey} />
          <Fan size={1.2} p={[CASE.x0 + 0.15, 1.3, 0.3]} axis="x" speed={5} blade={M.plasticGrey} />
        </>
      )}
      {/* Tempered-glass side panel — never blocks picking */}
      <group ref={glass} visible={withGlass}>
        <mesh position={[CX, 0, CASE.z1]} scale={[W, H, 0.03]} material={M.glass} raycast={NO_RAYCAST}>
          <boxGeometry />
        </mesh>
      </group>
    </group>
  );
}

const CABLES_Y = spread(5, 0.12);

/** ATX power supply (150 × 86 × 140 mm). Sealed unit: no internal view is offered, by design. */
export function PsuModel() {
  return (
    <group>
      <Box s={[1.4, 0.86, 1.5]} m={M.darkSteel} />
      <Fan size={1.2} thickness={0.04} p={[0, -0.44, 0]} axis="y" speed={2.5} />
      <Box s={[1.0, 0.5, 0.006]} p={[0, 0, 0.753]} m={M.label} />
      <Box s={[1.0, 0.08, 0.008]} p={[0, 0.17, 0.754]} m={M.amber} />
      <Box s={[0.5, 0.05, 0.008]} p={[-0.2, -0.05, 0.754]} m={M.chip} />
      <Box s={[0.3, 0.05, 0.008]} p={[-0.3, -0.15, 0.754]} m={M.chip} />
      {/* AC inlet and rocker switch on the rear face */}
      <Box s={[0.012, 0.2, 0.28]} p={[-0.705, 0.1, 0.3]} m={M.plastic} />
      <Box s={[0.016, 0.12, 0.1]} p={[-0.705, 0.1, -0.05]} m={M.red} />
      {/* Cable bundle leaving the front face */}
      {CABLES_Y.map((y) => (
        <Cyl key={y} rad={0.04} h={0.4} p={[0.9, y, 0.2]} axis="x" m={M.plastic} low />
      ))}
      <Box s={[0.1, 0.5, 0.14]} p={[1.14, 0, 0.2]} m={M.plasticGrey} />
    </group>
  );
}

/** 3.5-inch SATA hard disk drive. `reveal` lifts the lid to show platters, spindle and actuator. */
export function HddModel({ reveal }: ModelProps) {
  const lid = useSlide(reveal ? [0, 0.9, -0.9] : [0, 0, 0]);
  const arm = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (arm.current) arm.current.rotation.y = 0.42 + Math.sin(clock.elapsedTime * 2.2) * 0.2;
  });
  return (
    <group>
      <Box s={[1.02, 0.17, 1.47]} p={[0, -0.03, 0]} m={M.darkSteel} />
      <Box s={[0.9, 0.012, 1.0]} p={[0, -0.122, -0.1]} m={M.pcbGreen} />
      {/* SATA data + power connectors */}
      <Box s={[0.62, 0.06, 0.04]} p={[0, -0.08, -0.745]} m={M.plastic} />
      <Box s={[0.55, 0.012, 0.02]} p={[0, -0.08, -0.762]} m={M.gold} />
      {/* Platters and spindle */}
      <Cyl rad={0.46} h={0.01} p={[0.03, 0.062, 0.2]} m={M.platter} />
      <Cyl rad={0.46} h={0.01} p={[0.03, 0.08, 0.2]} m={M.platter} />
      <Cyl rad={0.12} h={0.045} p={[0.03, 0.075, 0.2]} m={M.nickel} />
      {/* Actuator: pivot, arm with head, voice-coil magnet */}
      <group ref={arm} position={[-0.33, 0.085, -0.48]}>
        <Cyl rad={0.07} h={0.04} m={M.nickel} low />
        <Box s={[0.07, 0.014, 0.62]} p={[0, 0.005, 0.31]} m={M.brushed} />
        <Box s={[0.03, 0.01, 0.05]} p={[0, 0, 0.62]} m={M.chip} />
      </group>
      <Box s={[0.34, 0.04, 0.2]} p={[-0.3, 0.075, -0.62]} m={M.nickel} />
      <group ref={lid}>
        <Box s={[1.0, 0.03, 1.45]} p={[0, 0.115, 0]} m={M.brushed} />
        <Box s={[0.62, 0.004, 0.7]} p={[0, 0.132, 0.1]} m={M.label} />
      </group>
    </group>
  );
}

/** 5.25-inch optical drive with tray bezel facing +x (front of the case). */
export function OpticalModel() {
  return (
    <group>
      <Box s={[1.7, 0.42, 1.46]} m={M.steel} />
      <Box s={[0.04, 0.42, 1.46]} p={[0.86, 0, 0]} m={M.plastic} />
      <Box s={[0.045, 0.06, 1.3]} p={[0.865, 0.06, 0]} m={M.plasticGrey} />
      <Box s={[0.05, 0.04, 0.12]} p={[0.865, -0.1, 0.5]} m={M.plasticGrey} />
      <Box s={[0.05, 0.02, 0.03]} p={[0.865, -0.1, 0.3]} m={M.green} />
      <Box s={[0.5, 0.06, 0.04]} p={[-0.86, -0.1, 0.2]} m={M.plastic} />
    </group>
  );
}
