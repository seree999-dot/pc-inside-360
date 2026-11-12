import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Line } from '@react-three/drei';
import { QuadraticBezierCurve3, Vector3 } from 'three';
import type { Mesh } from 'three';
import { useAssembly } from './store';
import { useApp } from '../store/appStore';
import { STEPS, cablesFor, targetFor } from './steps';
import { LAYOUT } from '../three/layout';
import { CameraRig } from '../three/CameraRig';
import { StudioLights } from '../three/ExplorerScene';
import { CaseModel } from '../three/models/chassis';
import { CoolerModel, CpuModel, MotherboardModel, RamModel } from '../three/models/core';
import { GpuModel, M2SsdModel } from '../three/models/cards';
import { HddModel, PsuModel } from '../three/models/chassis';
import { AioModel } from '../three/models/peripherals';
import { M } from '../three/materials';

export const ASSEMBLY_HOME = { pos: [2.2, 1.6, 9.6] as [number, number, number], target: [0.1, -0.1, 0] as [number, number, number] };

/** Screen-space position of the current drop target, updated every frame for drag-and-drop hit tests. */
export const targetScreen = { x: 0, y: 0, r: 0, visible: false };
const tmp = new Vector3();
const edge = new Vector3();

function GhostTarget() {
  const mesh = useRef<Mesh>(null);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const step = useAssembly((s) => s.step);
  const phase = useAssembly((s) => s.phase);
  const build = useAssembly((s) => s.build);
  const target = phase === 'place' ? targetFor(STEPS[step].id, build) : null;
  const ghostMat = useMemo(() => M.ghost.clone(), []);
  useEffect(() => () => ghostMat.dispose(), [ghostMat]);

  useFrame(({ clock }) => {
    if (!target) {
      targetScreen.visible = false;
      return;
    }
    if (mesh.current) ghostMat.opacity = 0.16 + Math.sin(clock.elapsedTime * 4) * 0.08;
    tmp.set(...target.center).project(camera);
    edge.set(target.center[0] + target.size[0] / 2, target.center[1] + target.size[1] / 2, target.center[2]).project(camera);
    targetScreen.x = ((tmp.x + 1) / 2) * size.width;
    targetScreen.y = ((1 - tmp.y) / 2) * size.height;
    const ex = ((edge.x + 1) / 2) * size.width;
    const ey = ((1 - edge.y) / 2) * size.height;
    targetScreen.r = Math.max(70, Math.hypot(ex - targetScreen.x, ey - targetScreen.y));
    targetScreen.visible = true;
  });

  if (!target) return null;
  return (
    <mesh
      ref={mesh}
      position={target.center}
      scale={target.size}
      material={ghostMat}
      onClick={(e) => { e.stopPropagation(); useAssembly.getState().install(); }}
      onPointerOver={() => { document.body.style.cursor = 'copy'; }}
      onPointerOut={() => { document.body.style.cursor = ''; }}
    >
      <boxGeometry />
    </mesh>
  );
}

function Cables() {
  const build = useAssembly((s) => s.build);
  const cables = useAssembly((s) => s.cables);
  const gpuSkipped = useAssembly((s) => s.gpuSkipped);
  return (
    <>
      {cablesFor(build, !gpuSkipped).filter((c) => cables[c.id]).map((c) => {
        const a = new Vector3(...c.from);
        const b = new Vector3(...c.to);
        const mid = a.clone().lerp(b, 0.5).add(new Vector3(0, 0, 0.9));
        return <Line key={c.id} points={new QuadraticBezierCurve3(a, mid, b).getPoints(24)} color={c.color} lineWidth={3.2} />;
      })}
    </>
  );
}

/** Live assembly bench: installed parts appear at their real positions inside the case. */
export function AssemblyScene() {
  const s = useAssembly();
  // Start from the bench's home pose, not whatever camera command a previous screen issued.
  useEffect(() => useApp.getState().cam({ kind: 'reset' }), []);
  const idx = (id: string) => STEPS.findIndex((x) => x.id === id);
  // A part is shown once installed (its step is past, or the current step is done).
  const shown = (id: string) => s.step > idx(id) || (s.step === idx(id) && s.phase === 'done');
  const b = s.build;
  return (
    <>
      <StudioLights />
      <CameraRig home={ASSEMBLY_HOME} />
      {b.case && <CaseModel glass={false} />}
      {b.board && shown('board') && <group position={LAYOUT.motherboard.pos}><MotherboardModel /></group>}
      {b.cpu && shown('cpu') && <group position={LAYOUT.cpu.pos}><CpuModel /></group>}
      {b.ram && shown('ram') && <group position={LAYOUT.ram.pos}><RamModel /></group>}
      {b.storage && shown('storage') && (b.storage.iface === 'sata-3.5'
        ? <group position={LAYOUT.hdd.pos}><HddModel /></group>
        : <group position={LAYOUT.ssd.pos}><M2SsdModel /></group>)}
      {b.cooler && shown('cooler') && (
        <group position={LAYOUT.cooler.pos} scale={b.cooler.type === 'air' && b.cooler.heightMm < 100 ? [1, 1, 0.32] : [1, 1, 1]}>
          {b.cooler.type === 'aio' ? <AioModel topMount /> : <CoolerModel />}
        </group>
      )}
      {b.gpu && shown('gpu') && !s.gpuSkipped && <group position={LAYOUT.gpu.pos}><GpuModel /></group>}
      {b.psu && shown('psu') && <group position={LAYOUT.psu.pos}><PsuModel /></group>}
      <GhostTarget />
      <Cables />
      <ContactShadows position={[0, -2.45, 0]} opacity={0.4} scale={20} blur={2.4} far={4} resolution={512} frames={1} />
    </>
  );
}
