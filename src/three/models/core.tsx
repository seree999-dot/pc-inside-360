import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances } from '@react-three/drei';
import type { Group } from 'three';
import { M, UNIT_BOX } from '../materials';
import { Box, Cyl, Fan, spread } from '../prims';
import type { V3 } from '../prims';

export interface ModelProps {
  /** Opens the part to show internal structure (educational reveal). */
  reveal?: boolean;
}

/** Smoothly slides a group toward `target` — used by the reveal animations. */
export function useSlide(target: V3) {
  const ref = useRef<Group>(null);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = 1 - Math.exp(-dt * 6);
    g.position.x += (target[0] - g.position.x) * k;
    g.position.y += (target[1] - g.position.y) * k;
    g.position.z += (target[2] - g.position.z) * k;
  });
  return ref;
}

const DIMM_X = [0.45, 0.57, 0.69, 0.81];
const X1_SLOTS_Y = [-0.55, -1.15, -1.4];
const SATA_Y = [-0.5, -0.66, -0.82, -0.98];

/** ATX motherboard, 305 × 244 mm. Origin at board centre, components rise along +z. */
export function MotherboardModel() {
  return (
    <group>
      <Box s={[2.44, 3.05, 0.03]} m={M.pcb} />
      {/* CPU socket (LGA style) */}
      <Box s={[0.52, 0.52, 0.04]} p={[-0.25, 0.75, 0.035]} m={M.darkSteel} />
      <Box s={[0.4, 0.4, 0.012]} p={[-0.25, 0.75, 0.058]} m={M.gold} />
      <Box s={[0.03, 0.5, 0.03]} p={[0.04, 0.75, 0.05]} m={M.steel} />
      {/* VRM heatsinks and chokes */}
      <Box s={[0.2, 0.85, 0.22]} p={[-0.72, 0.75, 0.125]} m={M.brushed} />
      <Box s={[0.8, 0.18, 0.22]} p={[-0.25, 1.3, 0.125]} m={M.brushed} />
      {spread(6, 0.12).map((y) => (
        <Box key={`ch${y}`} s={[0.07, 0.08, 0.07]} p={[-0.57, 0.75 + y, 0.05]} m={M.chip} />
      ))}
      {spread(5, 0.13).map((x) => (
        <Box key={`ct${x}`} s={[0.08, 0.07, 0.07]} p={[-0.25 + x, 1.14, 0.05]} m={M.chip} />
      ))}
      {/* DIMM slots */}
      {DIMM_X.map((x, i) => (
        <group key={x}>
          <Box s={[0.07, 1.4, 0.1]} p={[x, 0.75, 0.065]} m={i % 2 ? M.slot : M.slotGrey} />
          <Box s={[0.085, 0.06, 0.15]} p={[x, 1.47, 0.09]} m={M.white} />
          <Box s={[0.085, 0.06, 0.15]} p={[x, 0.03, 0.09]} m={M.white} />
        </group>
      ))}
      {/* Power: 24-pin ATX and 8-pin EPS */}
      <Box s={[0.1, 0.52, 0.14]} p={[1.12, 0.7, 0.085]} m={M.plasticGrey} />
      <Box s={[0.22, 0.1, 0.14]} p={[-0.85, 1.43, 0.085]} m={M.plasticGrey} />
      {/* PCIe slots */}
      <Box s={[0.92, 0.075, 0.1]} p={[-0.45, -0.25, 0.065]} m={M.brushed} />
      <Box s={[0.92, 0.075, 0.1]} p={[-0.45, -0.85, 0.065]} m={M.slot} />
      {X1_SLOTS_Y.map((y) => (
        <Box key={y} s={[0.26, 0.075, 0.1]} p={[-0.78, y, 0.065]} m={M.slot} />
      ))}
      {/* M.2 socket and standoff */}
      <Box s={[0.06, 0.24, 0.05]} p={[-0.34, 0.05, 0.04]} m={M.slot} />
      <Cyl rad={0.03} h={0.05} p={[0.52, 0.05, 0.04]} axis="z" m={M.gold} low />
      {/* Chipset heatsink */}
      <Box s={[0.5, 0.5, 0.1]} p={[0.6, -0.6, 0.065]} m={M.darkSteel} />
      <Box s={[0.36, 0.02, 0.012]} p={[0.6, -0.76, 0.118]} m={M.led} />
      {/* SATA ports */}
      {SATA_Y.map((y) => (
        <Box key={y} s={[0.1, 0.13, 0.08]} p={[1.14, y, 0.055]} m={M.plastic} />
      ))}
      {/* Fan headers */}
      <Box s={[0.09, 0.035, 0.07]} p={[0.1, 1.42, 0.05]} m={M.white} />
      <Box s={[0.035, 0.09, 0.07]} p={[1.1, 0.2, 0.05]} m={M.white} />
      {/* USB 2.0 and USB 3.x internal headers */}
      <Box s={[0.2, 0.06, 0.07]} p={[0.3, -1.45, 0.05]} m={M.plastic} />
      <Box s={[0.08, 0.22, 0.08]} p={[1.12, 0.33, 0.055]} m={M.usbBlue} />
      {/* Front-panel header */}
      <Box s={[0.17, 0.05, 0.06]} p={[1.0, -1.45, 0.045]} m={M.plastic} />
      {/* Audio header and capacitors */}
      <Box s={[0.14, 0.05, 0.06]} p={[-1.0, -1.4, 0.045]} m={M.plastic} />
      {spread(4, 0.08).map((x) => (
        <Cyl key={`cap${x}`} rad={0.028} h={0.08} p={[-0.95 + x, -1.25, 0.055]} axis="z" m={M.gold} low />
      ))}
      {/* Silkscreen accent traces (decorative) */}
      <Box s={[0.012, 1.2, 0.004]} p={[0.2, -0.75, 0.017]} m={M.slotGrey} />
      <Box s={[1.1, 0.012, 0.004]} p={[0.55, -1.28, 0.017]} m={M.slotGrey} />
    </group>
  );
}

const CORE_TILES: V3[] = [
  [-0.045, 0.022, 0], [0, 0.022, 0], [0.045, 0.022, 0],
  [-0.045, -0.016, 0], [0, -0.016, 0], [0.045, -0.016, 0],
];

/** LGA processor. Origin at substrate centre. `reveal` lifts the heat spreader over a conceptual die. */
export function CpuModel({ reveal }: ModelProps) {
  const ihs = useSlide([0, 0, reveal ? 0.3 : 0]);
  return (
    <group>
      <Box s={[0.4, 0.4, 0.02]} m={M.pcbGreen} />
      <Box s={[0.35, 0.35, 0.004]} p={[0, 0, -0.012]} m={M.gold} />
      <Box s={[0.05, 0.05, 0.003]} p={[-0.17, -0.17, 0.011]} r={[0, 0, Math.PI / 4]} m={M.gold} />
      {/* Conceptual die: six core tiles and a shared cache strip */}
      <Box s={[0.17, 0.115, 0.012]} p={[0.02, 0, 0.016]} m={M.silicon} />
      {CORE_TILES.map((p, i) => (
        <Box key={i} s={[0.036, 0.03, 0.004]} p={[p[0] + 0.02, p[1] + 0.012, 0.0235]} m={M.ledBlue} />
      ))}
      <Box s={[0.13, 0.014, 0.004]} p={[0.02, -0.04, 0.0235]} m={M.amber} />
      <group ref={ihs}>
        <Box s={[0.38, 0.38, 0.01]} p={[0, 0, 0.016]} m={M.nickel} />
        <Box s={[0.31, 0.31, 0.03]} p={[0, 0, 0.034]} m={M.nickel} />
      </group>
    </group>
  );
}

const CHIPS_Y = spread(8, 0.15);

function Dimm({ x }: { x: number }) {
  return (
    <group position={[x, 0, 0]}>
      <Box s={[0.03, 1.33, 0.3]} m={M.pcb} />
      {CHIPS_Y.map((y) => (
        <Box key={y} s={[0.014, 0.11, 0.13]} p={[0.022, y, 0.03]} m={M.chip} />
      ))}
      <Box s={[0.012, 0.05, 0.04]} p={[0.022, 0, -0.07]} m={M.chip} />
      <Box s={[0.004, 0.5, 0.12]} p={[-0.017, -0.2, 0.03]} m={M.label} />
      {/* Gold contact edge, split by the off-centre key notch */}
      <Box s={[0.034, 0.7, 0.035]} p={[0, -0.3, -0.14]} m={M.gold} />
      <Box s={[0.034, 0.54, 0.035]} p={[0, 0.38, -0.14]} m={M.gold} />
    </group>
  );
}

/** Two DIMMs spaced for slots A2/B2. Origin midway between the sticks. */
export function RamModel() {
  return (
    <group>
      <Dimm x={-0.12} />
      <Dimm x={0.12} />
    </group>
  );
}

const FIN_Z = Array.from({ length: 26 }, (_, i) => 0.38 + i * 0.044);
const PIPE_X = [-0.1, 0.1];

/** Single-tower air cooler. Origin at the centre of the contact base; the tower rises along +z. */
export function CoolerModel() {
  return (
    <group>
      <Box s={[0.42, 0.42, 0.06]} p={[0, 0, 0.03]} m={M.copper} />
      <Box s={[0.74, 0.08, 0.03]} p={[0, 0, 0.075]} m={M.steel} />
      {PIPE_X.map((x) => (
        <group key={x}>
          <Cyl rad={0.03} h={0.9} p={[x, 0, 0.1]} axis="y" m={M.copper} low />
          <Cyl rad={0.03} h={1.45} p={[x, 0.43, 0.82]} axis="z" m={M.copper} low />
          <Cyl rad={0.03} h={1.45} p={[x, -0.43, 0.82]} axis="z" m={M.copper} low />
        </group>
      ))}
      <Instances geometry={UNIT_BOX} material={M.aluminium} limit={FIN_Z.length} castShadow>
        {FIN_Z.map((z) => (
          <Instance key={z} position={[0, 0, z]} scale={[0.5, 1.2, 0.012]} />
        ))}
      </Instances>
      <Box s={[0.5, 1.2, 0.03]} p={[0, 0, 1.535]} m={M.plastic} />
      <Fan size={1.2} thickness={0.25} p={[0.385, 0, 0.95]} axis="x" speed={7} />
    </group>
  );
}
