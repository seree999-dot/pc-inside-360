import type { ReactNode } from 'react';
import { Instance, Instances } from '@react-three/drei';
import { M, UNIT_BOX } from '../materials';
import type { Mat } from '../materials';
import { Box, Cyl, Fan, spread } from '../prims';
import { useSlide } from './core';
import type { ModelProps } from './core';

const GPU_FINS = spread(38, 0.064);
const GPU_FANS = [-0.8, 0.05, 0.9];
const VRAM_POS: [number, number][] = [
  [-0.52, 0.2], [-0.52, 0], [-0.52, -0.2], [-0.08, 0.2], [-0.08, -0.2], [-0.3, 0.26], [-0.3, -0.26], [-0.08, 0],
];
const DP_Z = [0.02, 0.2, 0.38];

/**
 * Triple-fan graphics card in its installed orientation: length along x, PCB on top (y+),
 * fans facing down, PCIe edge toward −z. `reveal` drops the cooler to expose GPU chip and VRAM.
 */
export function GpuModel({ reveal }: ModelProps) {
  const coolerRef = useSlide([0, reveal ? -0.85 : 0, 0]);
  return (
    <group>
      {/* PCB, backplate, PCIe edge with key notch */}
      <Box s={[2.7, 0.02, 1.05]} p={[0, 0.2, 0]} m={M.pcb} />
      <Box s={[2.76, 0.016, 1.12]} p={[0, 0.222, 0]} m={M.darkSteel} />
      <Box s={[0.12, 0.02, 0.08]} p={[-1.2, 0.2, -0.56]} m={M.gold} />
      <Box s={[0.72, 0.02, 0.08]} p={[-0.72, 0.2, -0.56]} m={M.gold} />
      {/* GPU processor, VRAM, power stages (visible when revealed) */}
      <Box s={[0.34, 0.016, 0.34]} p={[-0.3, 0.184, 0]} m={M.pcbGreen} />
      <Box s={[0.2, 0.012, 0.2]} p={[-0.3, 0.172, 0]} m={M.silicon} />
      {VRAM_POS.map(([x, z], i) => (
        <Box key={i} s={[0.1, 0.014, 0.13]} p={[x, 0.183, z]} m={M.chip} />
      ))}
      {spread(7, 0.11).map((z) => (
        <Box key={z} s={[0.08, 0.06, 0.08]} p={[0.45, 0.16, z]} m={M.chip} />
      ))}
      {/* Auxiliary power connector */}
      <Box s={[0.2, 0.09, 0.07]} p={[0.9, 0.15, 0.555]} m={M.plastic} />
      {/* I/O bracket with one HDMI and three DisplayPort outputs */}
      <Box s={[0.02, 0.46, 1.25]} p={[-1.4, 0, 0]} m={M.steel} />
      <Box s={[0.035, 0.055, 0.15]} p={[-1.41, 0.09, -0.22]} m={M.plastic} />
      {DP_Z.map((z) => (
        <Box key={z} s={[0.035, 0.05, 0.16]} p={[-1.41, 0.09, z]} m={M.darkSteel} />
      ))}
      {/* Cooler assembly: fin stack, shroud rails, fans */}
      <group ref={coolerRef}>
        <Instances geometry={UNIT_BOX} material={M.aluminium} limit={GPU_FINS.length} castShadow>
          {GPU_FINS.map((x) => (
            <Instance key={x} position={[x, 0.04, 0]} scale={[0.012, 0.25, 0.98]} />
          ))}
        </Instances>
        <Box s={[2.5, 0.03, 0.9]} p={[0, 0.16, 0]} m={M.copper} />
        <Box s={[2.76, 0.16, 0.12]} p={[0, -0.13, 0.5]} m={M.plastic} />
        <Box s={[2.76, 0.16, 0.12]} p={[0, -0.13, -0.5]} m={M.plastic} />
        <Box s={[0.06, 0.16, 0.9]} p={[-1.35, -0.13, 0]} m={M.plastic} />
        <Box s={[0.06, 0.16, 0.9]} p={[1.35, -0.13, 0]} m={M.plastic} />
        <Box s={[1.3, 0.02, 0.02]} p={[0.1, -0.06, 0.565]} m={M.led} />
        {GPU_FANS.map((x) => (
          <Fan key={x} size={0.86} thickness={0.1} p={[x, -0.16, 0]} axis="y" speed={6} />
        ))}
      </group>
    </group>
  );
}

interface CardProps {
  len: number;
  height: number;
  pcb: Mat;
  children?: ReactNode;
}
/** Low-profile PCIe x1 add-in card base: PCB, bracket and gold edge connector. */
function SmallCard({ len, height, pcb, children }: CardProps) {
  return (
    <group>
      <Box s={[len, 0.02, height]} m={pcb} />
      <Box s={[0.07, 0.02, 0.07]} p={[-len / 2 + 0.1, 0, -height / 2 - 0.03]} m={M.gold} />
      <Box s={[0.16, 0.02, 0.07]} p={[-len / 2 + 0.25, 0, -height / 2 - 0.03]} m={M.gold} />
      <Box s={[0.02, 0.19, height + 0.4]} p={[-len / 2 - 0.02, -0.04, 0.05]} m={M.steel} />
      {children}
    </group>
  );
}

/** Wired Ethernet adapter with RJ-45 jack. */
export function NicModel() {
  return (
    <SmallCard len={1.0} height={0.7} pcb={M.pcbGreen}>
      <Box s={[0.22, 0.14, 0.17]} p={[-0.4, -0.08, 0.1]} m={M.steel} />
      <Box s={[0.012, 0.03, 0.03]} p={[-0.535, -0.03, 0.05]} m={M.amber} />
      <Box s={[0.012, 0.03, 0.03]} p={[-0.535, -0.03, 0.15]} m={M.green} />
      <Box s={[0.16, 0.02, 0.16]} p={[0.05, -0.02, 0]} m={M.chip} />
      <Box s={[0.12, 0.06, 0.1]} p={[-0.15, -0.04, -0.15]} m={M.plasticGrey} />
      <Cyl rad={0.03} h={0.05} p={[0.3, -0.035, 0.15]} m={M.gold} low />
    </SmallCard>
  );
}

/** Wi-Fi + Bluetooth adapter with shielded radio module and two antennas. */
export function WifiModel() {
  return (
    <SmallCard len={0.9} height={0.7} pcb={M.pcbBlue}>
      <Box s={[0.42, 0.045, 0.36]} p={[0.05, -0.03, 0]} m={M.brushed} />
      {[-0.12, 0.2].map((z) => (
        <group key={z}>
          <Cyl rad={0.028} h={0.1} p={[-0.52, -0.04, z]} axis="x" m={M.gold} low />
          <Cyl rad={0.026} h={0.75} p={[-0.6, -0.04, z + 0.36]} axis="z" m={M.plastic} low />
        </group>
      ))}
      <Box s={[0.1, 0.02, 0.1]} p={[-0.25, -0.02, 0.22]} m={M.chip} />
    </SmallCard>
  );
}

const JACKS: Mat[] = [M.green, M.pink, M.usbBlue, M.amber];

/** Dedicated sound card: DAC, op-amps, audio-grade capacitors, colour-coded 3.5 mm jacks. */
export function SoundCardModel() {
  return (
    <SmallCard len={1.5} height={0.9} pcb={M.pcb}>
      <Box s={[0.18, 0.025, 0.18]} p={[0.1, -0.022, 0.1]} m={M.chip} />
      <Box s={[0.1, 0.025, 0.08]} p={[-0.15, -0.022, -0.2]} m={M.chip} />
      <Box s={[0.1, 0.025, 0.08]} p={[-0.15, -0.022, 0.05]} m={M.chip} />
      {spread(6, 0.1).map((x) => (
        <Cyl key={x} rad={0.035} h={0.1} p={[0.35 + x, -0.06, -0.25]} m={M.gold} low />
      ))}
      <Box s={[0.5, 0.05, 0.3]} p={[0.4, -0.035, 0.22]} m={M.darkSteel} />
      {JACKS.map((m, i) => (
        <Cyl key={i} rad={0.035} h={0.06} p={[-0.79, -0.04, -0.3 + i * 0.2]} axis="x" m={m} low />
      ))}
    </SmallCard>
  );
}

/** M.2 2280 NVMe SSD (22 × 80 mm), M-key. Origin at centre, connector toward −x. */
export function M2SsdModel() {
  return (
    <group>
      <Box s={[0.8, 0.22, 0.012]} m={M.pcb} />
      <Box s={[0.12, 0.12, 0.014]} p={[-0.2, 0, 0.013]} m={M.chip} />
      <Box s={[0.07, 0.09, 0.012]} p={[-0.06, 0.03, 0.012]} m={M.chip} />
      <Box s={[0.18, 0.16, 0.014]} p={[0.1, 0, 0.013]} m={M.chip} />
      <Box s={[0.18, 0.16, 0.014]} p={[0.3, 0, 0.013]} m={M.chip} />
      <Box s={[0.34, 0.12, 0.003]} p={[0.2, 0, 0.0215]} m={M.label} />
      {/* Gold fingers split by the M-key notch */}
      <Box s={[0.035, 0.14, 0.014]} p={[-0.39, -0.035, 0]} m={M.gold} />
      <Box s={[0.035, 0.03, 0.014]} p={[-0.39, 0.09, 0]} m={M.gold} />
      <Cyl rad={0.028} h={0.02} p={[0.4, 0, 0.004]} axis="z" m={M.gold} low />
    </group>
  );
}

/** 2.5-inch SATA SSD (70 × 100 × 7 mm) for the comparison lab. */
export function SataSsdModel() {
  return (
    <group>
      <Box s={[0.7, 1.0, 0.07]} m={M.brushed} />
      <Box s={[0.5, 0.6, 0.004]} p={[0, 0.05, 0.037]} m={M.label} />
      <Box s={[0.3, 0.08, 0.004]} p={[-0.05, 0.22, 0.04]} m={M.ledBlue} />
      <Box s={[0.42, 0.05, 0.045]} p={[-0.08, -0.5, -0.005]} m={M.plastic} />
      <Box s={[0.36, 0.03, 0.01]} p={[-0.08, -0.515, 0.012]} m={M.gold} />
    </group>
  );
}
