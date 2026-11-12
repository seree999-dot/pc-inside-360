import { BoxGeometry, Color, CylinderGeometry, MeshStandardMaterial } from 'three';

/** Shared unit geometries — every primitive is a scaled instance, which keeps GPU memory small. */
export const UNIT_BOX = new BoxGeometry(1, 1, 1);
export const UNIT_CYL = new CylinderGeometry(1, 1, 1, 40);
export const UNIT_CYL_LOW = new CylinderGeometry(1, 1, 1, 14);

interface MatOptions {
  metal?: number;
  rough?: number;
  emissive?: string;
  emissiveIntensity?: number;
  opacity?: number;
}

function mat(color: string, o: MatOptions = {}): MeshStandardMaterial {
  const m = new MeshStandardMaterial({
    color: new Color(color),
    metalness: o.metal ?? 0,
    roughness: o.rough ?? 0.6,
    emissive: new Color(o.emissive ?? '#000000'),
    emissiveIntensity: o.emissiveIntensity ?? 0,
  });
  if (o.opacity !== undefined) {
    m.transparent = true;
    m.opacity = o.opacity;
    m.depthWrite = false;
  }
  return m;
}

/** Physically based material palette. Parts clone what they need, so these act as templates. */
export const M = {
  pcb: mat('#12161d', { rough: 0.55, metal: 0.1 }),
  pcbGreen: mat('#0f4d38', { rough: 0.5, metal: 0.1 }),
  pcbBlue: mat('#143a6b', { rough: 0.5, metal: 0.1 }),
  steel: mat('#8d96a3', { metal: 0.9, rough: 0.38 }),
  darkSteel: mat('#262b34', { metal: 0.8, rough: 0.45 }),
  caseBody: mat('#1a1f29', { metal: 0.7, rough: 0.5 }),
  aluminium: mat('#c9cfd8', { metal: 1, rough: 0.28 }),
  brushed: mat('#9aa3af', { metal: 1, rough: 0.42 }),
  copper: mat('#c9794a', { metal: 1, rough: 0.3 }),
  gold: mat('#d9b45c', { metal: 1, rough: 0.25 }),
  nickel: mat('#d3d6da', { metal: 1, rough: 0.2 }),
  chip: mat('#0b0c0f', { rough: 0.35, metal: 0.2 }),
  slot: mat('#1c2029', { rough: 0.6 }),
  slotGrey: mat('#565d69', { rough: 0.6 }),
  plastic: mat('#101216', { rough: 0.65 }),
  plasticGrey: mat('#3a404b', { rough: 0.7 }),
  white: mat('#e8ecf2', { rough: 0.6 }),
  label: mat('#dfe5ee', { rough: 0.8 }),
  frontMesh: mat('#0d1118', { metal: 0.6, rough: 0.7, opacity: 0.55 }),
  glass: mat('#a9dcff', { rough: 0.05, metal: 0.1, opacity: 0.14 }),
  screen: mat('#0b1a33', { rough: 0.15, emissive: '#1b4f9c', emissiveIntensity: 0.55 }),
  led: mat('#00d9ff', { emissive: '#00d9ff', emissiveIntensity: 1.6 }),
  ledBlue: mat('#4778ff', { emissive: '#4778ff', emissiveIntensity: 1.2 }),
  usbBlue: mat('#1f66e0', { rough: 0.5 }),
  red: mat('#c8323c', { rough: 0.5 }),
  amber: mat('#ffbf47', { rough: 0.5 }),
  green: mat('#20d6a0', { rough: 0.5 }),
  pink: mat('#f28cb1', { rough: 0.5 }),
  silicon: mat('#5b6f9a', { metal: 0.9, rough: 0.15, emissive: '#2b3f7a', emissiveIntensity: 0.35 }),
  platter: mat('#e6e9ee', { metal: 1, rough: 0.06 }),
  rubber: mat('#0a0b0d', { rough: 0.9 }),
  desk: mat('#1b2538', { rough: 0.85 }),
  ghost: mat('#00d9ff', { emissive: '#00d9ff', emissiveIntensity: 0.6, opacity: 0.22 }),
} as const;

export type Mat = MeshStandardMaterial;
