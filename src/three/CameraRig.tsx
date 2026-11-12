import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { MOUSE, TOUCH, Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useApp } from '../store/appStore';
import type { CameraCommand } from '../store/appStore';
import { HOME, OVERVIEW, PRESET_DIR } from './layout';
import { partRegistry, partWorldCenter } from './registry';

interface Flight {
  target: Vector3;
  dir: Vector3;
  dist: number;
  /** Keep tracking this part while it moves (exploded-view transitions). */
  follow?: string;
  age: number;
}

const FLIGHT_SECONDS = 1.8;
const MIN_FOCUS_DIST = 0.9;
const tmp = new Vector3();
const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface CameraRigProps {
  /** Disable user-driven rotation tracking (non-explorer scenes). */
  home?: { pos: [number, number, number]; target: [number, number, number] };
}

/** Orbit camera with damping plus smooth, interruptible fly-to transitions driven by store commands. */
export function CameraRig({ home = HOME }: CameraRigProps) {
  const controls = useRef<OrbitControlsImpl>(null);
  const camera = useThree((s) => s.camera);
  const flight = useRef<Flight | null>(null);
  const userDriving = useRef(false);
  const command = useApp((s) => s.camera);
  const autoRotate = useApp((s) => s.autoRotate);
  const panMode = useApp((s) => s.panMode);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const aspect = 'aspect' in camera ? (camera as { aspect: number }).aspect : 1.5;
    const plan = planFlight(command.cmd, camera.position, c.target, home, aspect);
    if (plan) flight.current = plan;
  }, [command, camera, home]);

  useFrame((_, dt) => {
    const c = controls.current;
    const f = flight.current;
    if (!c || !f) return;
    if (f.follow) partWorldCenter(f.follow, f.target);
    f.age += dt;
    const k = reducedMotion() ? 1 : 1 - Math.exp(-dt * 4.5);
    c.target.lerp(f.target, k);
    tmp.copy(f.target).addScaledVector(f.dir, f.dist);
    camera.position.lerp(tmp, k);
    c.update();
    if (f.age > FLIGHT_SECONDS || reducedMotion()) flight.current = null;
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.09}
      minDistance={0.5}
      maxDistance={34}
      minPolarAngle={0.02}
      maxPolarAngle={Math.PI - 0.02}
      autoRotate={autoRotate}
      autoRotateSpeed={1.2}
      mouseButtons={{ LEFT: panMode ? MOUSE.PAN : MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: panMode ? MOUSE.ROTATE : MOUSE.PAN }}
      touches={{ ONE: panMode ? TOUCH.PAN : TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }}
      onStart={() => {
        flight.current = null;
        userDriving.current = true;
      }}
      onChange={() => {
        if (userDriving.current) useApp.getState().markRotated();
      }}
      onEnd={() => {
        userDriving.current = false;
      }}
    />
  );
}

/** Poses are authored for a ~1.5 aspect viewport; pull back on narrow or tall viewports. */
const AUTHORED_ASPECT = 1.5;

function planFlight(
  cmd: CameraCommand,
  camPos: Vector3,
  target: Vector3,
  home: { pos: [number, number, number]; target: [number, number, number] },
  aspect: number,
): Flight | null {
  const offset = camPos.clone().sub(target);
  const dist = offset.length();
  const dir = offset.clone().normalize();
  const fit = Math.max(1, Math.min(2.4, AUTHORED_ASPECT / Math.max(aspect, 0.3)));
  const fromPose = (pos: [number, number, number], tgt: [number, number, number]): Flight => {
    const t = new Vector3(...tgt);
    const o = new Vector3(...pos).sub(t);
    return { target: t, dir: o.clone().normalize(), dist: o.length() * fit, age: 0 };
  };

  switch (cmd.kind) {
    case 'reset':
      return fromPose(home.pos, home.target);
    case 'overview':
      return fromPose(OVERVIEW.pos, OVERVIEW.target);
    case 'preset':
      return { target: new Vector3(0.15, 0, 0), dir: new Vector3(...PRESET_DIR[cmd.preset]).normalize(), dist: 13 * fit, age: 0 };
    case 'focus': {
      const entry = partRegistry.get(cmd.part);
      if (!entry) return null;
      if (cmd.part === 'case') return fromPose(home.pos, home.target);
      const center = partWorldCenter(cmd.part, new Vector3());
      if (!center) return null;
      // Parts inside the tower are only visible from the glass side; avoid ending up behind the tray.
      const inside = center.x > -2.6;
      const viewDir = inside && dir.z < 0.35 ? new Vector3(...PRESET_DIR.iso).normalize() : dir;
      return { target: center, dir: viewDir, dist: Math.max(entry.radius * 2.6, MIN_FOCUS_DIST), follow: cmd.part, age: 0 };
    }
    case 'point':
      return { target: new Vector3(...cmd.point), dir, dist: Math.max(dist * 0.55, 0.7), age: 0 };
    case 'orbit': {
      const rotated = dir.clone().applyAxisAngle(new Vector3(0, 1, 0), cmd.angle);
      return { target: target.clone(), dir: rotated, dist, age: 0 };
    }
    case 'zoom':
      return { target: target.clone(), dir, dist: Math.min(Math.max(dist * cmd.factor, 0.6), 32), age: 0 };
  }
}
