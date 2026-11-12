import { Vector3 } from 'three';
import type { Object3D } from 'three';

interface PartEntry {
  group: Object3D;
  /** Bounding-box centre in the part's local space. */
  center: Vector3;
  radius: number;
}

/** Live lookup of mounted scene parts, used by the camera rig and connection paths. */
export const partRegistry = new Map<string, PartEntry>();

export function partWorldCenter(id: string, out: Vector3): Vector3 | null {
  const e = partRegistry.get(id);
  if (!e) return null;
  return e.group.localToWorld(out.copy(e.center));
}

/** Handle to the active WebGL canvas (for screenshots). */
export const sceneApi: { canvas: HTMLCanvasElement | null } = { canvas: null };

/** Composites the transparent WebGL canvas over a solid background and downloads it as PNG. */
export function downloadScreenshot(background: string, filename: string): boolean {
  const src = sceneApi.canvas;
  if (!src) return false;
  const out = document.createElement('canvas');
  out.width = src.width;
  out.height = src.height;
  const ctx = out.getContext('2d');
  if (!ctx) return false;
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(src, 0, 0);
  const a = document.createElement('a');
  a.href = out.toDataURL('image/png');
  a.download = filename;
  a.click();
  return true;
}
