import type { ComponentId } from '../data/types';

/** Small schematic thumbnails (SVG) for each component, drawn on a 40×40 grid. */
const GLYPHS: Record<ComponentId, string> = {
  cpu: 'M12 12h16v16H12zM16 16h8v8h-8zM15 8v4M20 8v4M25 8v4M15 28v4M20 28v4M25 28v4M8 15h4M8 20h4M8 25h4M28 15h4M28 20h4M28 25h4',
  motherboard: 'M7 7h26v26H7zM11 11h8v8h-8zM23 10v14M26 10v14M11 24h14M11 28h8',
  ram: 'M5 14h30v10H5zM8 17h4v4H8zM14 17h4v4h-4zM20 17h4v4h-4zM26 17h4v4h-4zM5 27h13M21 27h14',
  gpu: 'M5 12h28v14H5zM13 19m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0M25 19m-4 0a4 4 0 1 0 8 0 4 4 0 1 0-8 0M8 26v4h14v-4M33 14v10',
  ssd: 'M6 16h28v8H6zM9 18h6v4H9zM18 18h6v4h-6zM27 18h5v4h-5zM6 16v8',
  hdd: 'M9 6h22v28H9zM20 17m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0M20 17h.01M13 30l9-9',
  psu: 'M6 10h28v20H6zM18 20m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0M29 14v4M29 22v4',
  cooler: 'M10 30h20M14 30V12M26 30V12M10 12h20M10 16h20M10 20h20M10 24h20',
  case: 'M11 4h18v32H11zM15 8h10v6H15zM20 26m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
  nic: 'M6 14h24v12H6zM24 17h6v6h-6zM10 26v4h10v-4M10 18h8',
  wifi: 'M8 16a17 17 0 0 1 24 0M12 21a11 11 0 0 1 16 0M16 26a5 5 0 0 1 8 0M20 30h.01',
  soundcard: 'M6 14h28v12H6zM12 20m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M20 20m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M28 20m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
  optical: 'M5 12h30v16H5zM20 20m-5 0a5 5 0 1 0 10 0 5 5 0 1 0-10 0M20 20h.01M8 24h6',
  firmware: 'M12 12h16v16H12zM12 16H8M12 20H8M12 24H8M28 16h4M28 20h4M28 24h4M16 16h.01',
  cmos: 'M20 20m-11 0a11 11 0 1 0 22 0 11 11 0 1 0-22 0M17 20h6M20 17v6',
  expansion: 'M6 12h28v12H6zM9 24v4h6v-4M17 24v4h12v-4M10 16h8M10 19h12',
  keyboard: 'M4 12h32v16H4zM8 16h2M12 16h2M16 16h2M20 16h2M24 16h2M28 16h2M8 20h2M12 20h2M16 20h2M20 20h2M24 20h2M28 20h2M12 24h16',
  mouse: 'M20 6a9 9 0 0 1 9 9v10a9 9 0 0 1-18 0V15a9 9 0 0 1 9-9zM20 6v9M11 15h18',
  monitor: 'M5 8h30v19H5zM16 33h8M20 27v6',
  ports: 'M8 8h24v24H8zM12 12h6v4h-6zM22 12h6v4h-6zM12 20h7v5h-7zM24 23m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0',
};

export function PartGlyph({ id, size = 34 }: { id: ComponentId; size?: number }) {
  return (
    <svg className="glyph" width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={GLYPHS[id]} />
    </svg>
  );
}
