import { useEffect, useMemo } from 'react';
import { Instance, Instances } from '@react-three/drei';
import { CatmullRomCurve3, TubeGeometry, Vector3 } from 'three';
import { M, UNIT_BOX } from '../materials';
import type { Mat } from '../materials';
import { Box, Cyl, Fan, spread } from '../prims';

/** Rear I/O block. Origin at block centre; ports face −x (the back of the case). */
export function PortsModel() {
  const face = -0.13;
  return (
    <group>
      <Box s={[0.25, 1.1, 0.36]} m={M.steel} />
      {[-0.08, 0.08].map((z) => (
        <Box key={`u2${z}`} s={[0.03, 0.06, 0.13]} p={[face, 0.42, z]} m={M.plastic} />
      ))}
      <Box s={[0.03, 0.06, 0.17]} p={[face, 0.25, 0]} m={M.darkSteel} />
      <Box s={[0.03, 0.055, 0.15]} p={[face, 0.1, 0]} m={M.plastic} />
      {[-0.08, 0.08].map((z) => (
        <Box key={`u3${z}`} s={[0.03, 0.06, 0.13]} p={[face, -0.05, z]} m={M.usbBlue} />
      ))}
      <Box s={[0.03, 0.14, 0.17]} p={[face, -0.22, 0]} m={M.darkSteel} />
      <Box s={[0.034, 0.025, 0.03]} p={[face, -0.17, -0.06]} m={M.amber} />
      <Box s={[0.034, 0.025, 0.03]} p={[face, -0.17, 0.06]} m={M.green} />
      {([M.pink, M.green, M.usbBlue] as Mat[]).map((m, i) => (
        <Cyl key={i} rad={0.035} h={0.04} p={[face, -0.42, -0.1 + i * 0.1]} axis="x" m={m} low />
      ))}
    </group>
  );
}

const LEGS = spread(4, 0.022);

/** SPI flash chip (SOIC-8) that stores the UEFI firmware. */
export function FirmwareModel() {
  return (
    <group>
      <Box s={[0.1, 0.08, 0.03]} p={[0, 0, 0.005]} m={M.chip} />
      <Cyl rad={0.008} h={0.004} p={[-0.035, 0.025, 0.021]} axis="z" m={M.white} low />
      {LEGS.map((x) => (
        <group key={x}>
          <Box s={[0.01, 0.03, 0.008]} p={[x, 0.05, -0.006]} m={M.nickel} />
          <Box s={[0.01, 0.03, 0.008]} p={[x, -0.05, -0.006]} m={M.nickel} />
        </group>
      ))}
    </group>
  );
}

/** CR2032 lithium coin cell in its holder. */
export function CmosModel() {
  return (
    <group>
      <Cyl rad={0.115} h={0.02} p={[0, 0, -0.004]} axis="z" m={M.plastic} />
      <Cyl rad={0.1} h={0.032} p={[0, 0, 0.012]} axis="z" m={M.nickel} />
      <Box s={[0.05, 0.06, 0.02]} p={[0, 0.1, 0.03]} m={M.gold} />
    </group>
  );
}

const SCREEN_BARS: { s: [number, number, number]; p: [number, number, number]; m: Mat }[] = [
  { s: [4.6, 0.12, 0.004], p: [0, 1.2, 0.024], m: M.ledBlue },
  { s: [1.6, 1.7, 0.004], p: [-1.5, 0.05, 0.024], m: M.led },
  { s: [2.7, 0.75, 0.004], p: [0.95, 0.52, 0.024], m: M.ledBlue },
  { s: [2.7, 0.75, 0.004], p: [0.95, -0.42, 0.024], m: M.green },
  { s: [4.6, 0.1, 0.004], p: [0, -1.25, 0.024], m: M.slotGrey },
];

/** 24-inch 16:9 monitor. Origin at screen centre. */
export function MonitorModel() {
  return (
    <group>
      <Box s={[5.42, 3.12, 0.12]} p={[0, 0, -0.05]} m={M.plastic} />
      <Box s={[5.22, 2.92, 0.02]} p={[0, 0, 0.012]} m={M.screen} />
      {SCREEN_BARS.map((b, i) => (
        <Box key={i} s={b.s} p={b.p} m={b.m} />
      ))}
      <Box s={[1.4, 0.7, 0.16]} p={[0, -0.6, -0.17]} m={M.plasticGrey} />
      <Box s={[0.16, 0.04, 0.05]} p={[-0.3, -0.96, -0.17]} m={M.darkSteel} />
      <Box s={[0.15, 0.04, 0.05]} p={[0, -0.96, -0.17]} m={M.plastic} />
      <Box s={[0.3, 1.5, 0.14]} p={[0, -1.95, -0.3]} m={M.plasticGrey} />
      <Box s={[1.9, 0.06, 1.1]} p={[0, -2.67, -0.2]} m={M.plasticGrey} />
    </group>
  );
}

const KEY_ROWS = spread(5, 0.26);
const KEY_COLS = spread(15, 0.285);

/** Tenkeyless-style keyboard. Origin at centre of the case. */
export function KeyboardModel() {
  return (
    <group>
      <Box s={[4.4, 0.12, 1.45]} m={M.plastic} />
      <Instances geometry={UNIT_BOX} material={M.plasticGrey} limit={KEY_ROWS.length * KEY_COLS.length} castShadow>
        {KEY_ROWS.map((z, r) =>
          KEY_COLS.map((x) => {
            const isSpace = r === 4 && Math.abs(x) < 0.9;
            if (isSpace && Math.abs(x) > 0.01) return null;
            return (
              <Instance key={`${z}:${x}`} position={[x, 0.09, z]} scale={[isSpace ? 1.65 : 0.245, 0.07, 0.22]} />
            );
          }),
        )}
      </Instances>
      <Box s={[0.06, 0.02, 0.03]} p={[2.0, 0.065, -0.66]} m={M.led} />
      <Cyl rad={0.03} h={0.5} p={[0, 0, -0.95]} axis="z" m={M.rubber} low />
    </group>
  );
}

/** Optical mouse: shell, two buttons, scroll wheel, underside sensor window. */
export function MouseModel() {
  return (
    <group>
      <mesh scale={[0.34, 0.2, 0.56]} material={M.plastic} castShadow>
        <sphereGeometry args={[1, 32, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <Box s={[0.66, 0.02, 1.1]} p={[0, -0.005, 0]} m={M.rubber} />
      <Box s={[0.012, 0.03, 0.42]} p={[0, 0.165, -0.3]} m={M.rubber} />
      <Cyl rad={0.06} h={0.05} p={[0, 0.18, -0.28]} axis="x" m={M.plasticGrey} />
      <Box s={[0.1, 0.006, 0.1]} p={[0, -0.018, 0]} m={M.led} />
      <Cyl rad={0.025} h={0.5} p={[0, 0.03, -0.78]} axis="z" m={M.rubber} low />
    </group>
  );
}

const TUBE_DISPLAY = [
  [[0.18, 0.1, 0.22], [0.3, 0.7, 0.3], [0.2, 1.3, 0.25]],
  [[-0.18, 0.1, 0.22], [-0.05, 0.75, 0.32], [-0.2, 1.3, 0.25]],
] as const;
const TUBE_TOP = [
  [[0.18, 0.1, 0.22], [0.7, 0.55, 0.5], [1.0, 0.78, 0.45]],
  [[-0.18, 0.1, 0.22], [0.5, 0.6, 0.75], [1.0, 0.78, 0.75]],
] as const;

function Tube({ pts }: { pts: readonly (readonly [number, number, number])[] }) {
  const geo = useMemo(() => new TubeGeometry(new CatmullRomCurve3(pts.map((p) => new Vector3(...p))), 24, 0.035, 8), [pts]);
  useEffect(() => () => geo.dispose(), [geo]);
  return <mesh geometry={geo} material={M.rubber} castShadow />;
}

interface AioProps {
  /** Radiator mounted horizontally under the case roof (assembly lab) instead of displayed upright. */
  topMount?: boolean;
}

/** All-in-one liquid cooler: pump/cold-plate block, tubes and a 240 mm radiator with two fans. */
export function AioModel({ topMount }: AioProps) {
  return (
    <group>
      <Cyl rad={0.32} h={0.28} p={[0, 0, 0.14]} axis="z" m={M.plastic} />
      <Box s={[0.42, 0.42, 0.04]} p={[0, 0, 0.0]} m={M.copper} />
      <Cyl rad={0.2} h={0.01} p={[0, 0, 0.285]} axis="z" m={M.led} />
      {(topMount ? TUBE_TOP : TUBE_DISPLAY).map((pts, i) => <Tube key={i} pts={pts} />)}
      <group position={topMount ? [1.3, 0.8, 0.6] : [0, 1.75, 0.25]} rotation={topMount ? [Math.PI / 2, 0, 0] : [0, 0, 0]}>
        <Box s={[2.75, 1.2, 0.27]} m={M.plastic} />
        <Box s={[2.5, 1.1, 0.275]} m={M.aluminium} />
        <Fan size={1.2} thickness={0.25} p={[-0.62, 0, 0.27]} axis="z" speed={6} />
        <Fan size={1.2} thickness={0.25} p={[0.62, 0, 0.27]} axis="z" speed={6} />
      </group>
    </group>
  );
}
