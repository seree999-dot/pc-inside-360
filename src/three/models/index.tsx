import type { ReactNode } from 'react';
import type { ModelId } from '../../data/types';
import type { ScenePartId } from '../layout';
import { CoolerModel, CpuModel, MotherboardModel, RamModel } from './core';
import { GpuModel, M2SsdModel, NicModel, SataSsdModel, SoundCardModel, WifiModel } from './cards';
import { CaseModel, HddModel, OpticalModel, PsuModel } from './chassis';
import { AioModel, CmosModel, FirmwareModel, KeyboardModel, MonitorModel, MouseModel, PortsModel } from './peripherals';

interface RenderOptions {
  reveal?: boolean;
  open?: boolean;
}

/**
 * Model registry. Each entry is an original procedural educational model; replace an entry
 * (for example with a licensed GLB wrapped in a component) without touching layout or content.
 */
const REGISTRY: Record<ScenePartId | 'ssd-sata' | 'aio', (o: RenderOptions) => ReactNode> = {
  case: (o) => <CaseModel open={o.open} />,
  motherboard: () => <MotherboardModel />,
  cpu: (o) => <CpuModel reveal={o.reveal} />,
  ram: () => <RamModel />,
  gpu: (o) => <GpuModel reveal={o.reveal} />,
  ssd: () => <M2SsdModel />,
  hdd: (o) => <HddModel reveal={o.reveal} />,
  psu: () => <PsuModel />,
  cooler: () => <CoolerModel />,
  nic: () => <NicModel />,
  wifi: () => <WifiModel />,
  soundcard: () => <SoundCardModel />,
  optical: () => <OpticalModel />,
  firmware: () => <FirmwareModel />,
  cmos: () => <CmosModel />,
  keyboard: () => <KeyboardModel />,
  mouse: () => <MouseModel />,
  monitor: () => <MonitorModel />,
  ports: () => <PortsModel />,
  'ssd-sata': () => <SataSsdModel />,
  aio: () => <AioModel />,
};

/** Parts that offer an internal "reveal" view. The PSU is deliberately excluded for safety. */
export const REVEALABLE: ScenePartId[] = ['cpu', 'gpu', 'hdd'];

export function renderModel(id: ModelId, options: RenderOptions = {}): ReactNode {
  const key = id === 'expansion' ? 'soundcard' : id;
  return REGISTRY[key](options);
}
