import type { ComponentId } from '../data/types';
import type { V3 } from './prims';

/** Every physically modelled part. "expansion" is a concept that maps onto three cards. */
export type ScenePartId = Exclude<ComponentId, 'expansion'>;

const BOARD: V3 = [-0.9, 0.6, -0.72];
const onBoard = (x: number, y: number, z: number): V3 => [BOARD[0] + x, BOARD[1] + y, BOARD[2] + z];

interface PartLayout {
  /** Installed position (world units, 1 unit = 10 cm). */
  pos: V3;
  /** Offset applied in exploded view. Mostly along +z so relative positions stay readable. */
  explode: V3;
}

/** Asset-agnostic placement table: swap a model without touching positions. */
export const LAYOUT: Record<ScenePartId, PartLayout> = {
  case: { pos: [0, 0, 0], explode: [0, 0, 0] },
  motherboard: { pos: BOARD, explode: [0, 0, 1.0] },
  cpu: { pos: onBoard(-0.25, 0.75, 0.075), explode: [0, 0, 2.3] },
  cooler: { pos: onBoard(-0.25, 0.75, 0.125), explode: [0, 0, 3.4] },
  ram: { pos: onBoard(0.69, 0.75, 0.27), explode: [0.5, 0, 2.2] },
  gpu: { pos: onBoard(0.15, -0.45, 0.7), explode: [0, -0.35, 3.0] },
  ssd: { pos: onBoard(0.1, 0.05, 0.06), explode: [0.5, 0, 1.9] },
  soundcard: { pos: onBoard(-0.5, -0.87, 0.57), explode: [-0.3, -0.5, 2.4] },
  nic: { pos: onBoard(-0.75, -1.17, 0.47), explode: [-0.5, -0.7, 2.0] },
  wifi: { pos: onBoard(-0.8, -1.42, 0.47), explode: [-0.7, -0.9, 1.6] },
  firmware: { pos: onBoard(0.95, -1.1, 0.03), explode: [0.25, 0, 1.5] },
  cmos: { pos: onBoard(0.15, -0.55, 0.03), explode: [0, 0, 1.5] },
  ports: { pos: onBoard(-1.1, 1.0, 0.2), explode: [-0.9, 0, 1.0] },
  psu: { pos: [-1.5, -1.85, -0.25], explode: [-1.6, 0, 1.8] },
  hdd: { pos: [1.5, -1.85, -0.2], explode: [1.6, 0, 1.8] },
  optical: { pos: [1.63, 1.9, 0], explode: [1.5, 0.7, 1.2] },
  monitor: { pos: [-6.2, 0.35, -0.3], explode: [0, 0, 0] },
  keyboard: { pos: [-6.2, -2.28, 1.7], explode: [0, 0, 0] },
  mouse: { pos: [-3.5, -2.33, 1.7], explode: [0, 0, 0] },
};

export const SCENE_PARTS = Object.keys(LAYOUT) as ScenePartId[];

/** Parts that light up when a syllabus component is selected. */
export function partsOf(id: ComponentId): ScenePartId[] {
  return id === 'expansion' ? ['nic', 'wifi', 'soundcard'] : [id];
}

/** Parts that stay visible when a component is isolated (context needed to explain it). */
export function isolationSet(id: ComponentId): ScenePartId[] {
  switch (id) {
    case 'motherboard': return ['motherboard', 'firmware', 'cmos', 'ports'];
    case 'firmware': return ['firmware', 'motherboard'];
    case 'cmos': return ['cmos', 'motherboard'];
    case 'ports': return ['ports', 'motherboard'];
    case 'expansion': return ['nic', 'wifi', 'soundcard', 'motherboard'];
    default: return partsOf(id);
  }
}

export const HOME = { pos: [6.4, 3.0, 11.6] as V3, target: [-0.6, -0.2, 0] as V3 };
export const OVERVIEW = { pos: [-0.5, 3.4, 17] as V3, target: [-2.6, -0.3, 0] as V3 };

export type CameraPreset = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom' | 'iso';
export const PRESET_DIR: Record<CameraPreset, V3> = {
  front: [0, 0.05, 1],
  back: [0, 0.05, -1],
  left: [-1, 0.05, 0.15],
  right: [1, 0.05, 0.15],
  top: [0, 1, 0.02],
  bottom: [0, -1, 0.02],
  iso: [0.5, 0.28, 0.82],
};

export type LinkKind = 'data' | 'power' | 'thermal';
/** Conceptual relationships drawn as animated paths when a part is selected. */
export const LINKS: { a: ScenePartId; b: ScenePartId; kind: LinkKind }[] = [
  { a: 'cpu', b: 'motherboard', kind: 'data' },
  { a: 'cpu', b: 'ram', kind: 'data' },
  { a: 'cpu', b: 'gpu', kind: 'data' },
  { a: 'cpu', b: 'ssd', kind: 'data' },
  { a: 'cpu', b: 'cooler', kind: 'thermal' },
  { a: 'motherboard', b: 'hdd', kind: 'data' },
  { a: 'motherboard', b: 'optical', kind: 'data' },
  { a: 'motherboard', b: 'nic', kind: 'data' },
  { a: 'motherboard', b: 'wifi', kind: 'data' },
  { a: 'motherboard', b: 'soundcard', kind: 'data' },
  { a: 'motherboard', b: 'ports', kind: 'data' },
  { a: 'motherboard', b: 'firmware', kind: 'data' },
  { a: 'cmos', b: 'firmware', kind: 'power' },
  { a: 'gpu', b: 'monitor', kind: 'data' },
  { a: 'ports', b: 'keyboard', kind: 'data' },
  { a: 'ports', b: 'mouse', kind: 'data' },
  { a: 'psu', b: 'motherboard', kind: 'power' },
  { a: 'psu', b: 'cpu', kind: 'power' },
  { a: 'psu', b: 'gpu', kind: 'power' },
  { a: 'psu', b: 'hdd', kind: 'power' },
  { a: 'psu', b: 'optical', kind: 'power' },
];
