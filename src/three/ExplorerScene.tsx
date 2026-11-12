import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import { useApp } from '../store/appStore';
import { Part } from './Part';
import { SCENE_PARTS } from './layout';
import { CameraRig } from './CameraRig';
import { Airflow, Connections } from './Effects';
import { renderModel, REVEALABLE } from './models';
import { M } from './materials';
import { Box } from './prims';
import { sceneApi } from './registry';

/** Studio lighting built from in-scene light formers — no external HDR download. */
export function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 9, 8]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-8, 4, -6]} intensity={0.55} color="#7fa8ff" />
      {/* Soft fill inside the tower so internal parts read clearly through the glass. */}
      <pointLight position={[0.2, 0.6, 0.7]} intensity={4} distance={5} decay={1.6} color="#cfe6ff" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 6, 6]} scale={[12, 4, 1]} />
        <Lightformer form="rect" intensity={1.4} color="#9fd8ff" position={[-8, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={1.0} color="#4778ff" position={[8, 1, -4]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={0.8} color="#00d9ff" position={[0, -4, 6]} scale={3} />
        {/* Broad soft fills so metallic parts reflect light from most viewing angles. */}
        <Lightformer form="rect" intensity={0.9} color="#dbe8ff" position={[0, 0, 14]} scale={[30, 18, 1]} />
        <Lightformer form="rect" intensity={1.1} position={[0, 12, 0]} rotation-x={Math.PI / 2} scale={[30, 30, 1]} />
      </Environment>
    </>
  );
}

function CanvasHandle() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    sceneApi.canvas = gl.domElement;
    return () => {
      if (sceneApi.canvas === gl.domElement) sceneApi.canvas = null;
    };
  }, [gl]);
  return null;
}

/** Deselect when clicking empty space (but not after a drag). */
function useMissedDeselect() {
  return (e: MouseEvent) => {
    const s = useApp.getState();
    if (s.anonymous || s.hotspotPick || e.type !== 'click') return;
    s.select(null, false);
  };
}

interface ExplorerSceneProps {
  /** Hide the desk peripherals (hero / compact layouts). */
  towerOnly?: boolean;
}

/** The full desktop PC: every syllabus part as an individually selectable model. */
export function ExplorerScene({ towerOnly }: ExplorerSceneProps) {
  const exploded = useApp((s) => s.exploded);
  const reveal = useApp((s) => s.reveal);
  const selected = useApp((s) => s.selected);
  const firstFrame = useRef(true);
  useEffect(() => {
    if (firstFrame.current) {
      firstFrame.current = false;
      // Parts register their bounds in layout effects, so a selection made while the scene
      // was still mounting can only be framed now.
      const s = useApp.getState();
      if (s.selected) s.cam({ kind: 'focus', part: s.selected === 'expansion' ? 'soundcard' : s.selected });
      else s.cam({ kind: 'reset' });
    }
  }, []);

  const parts = towerOnly ? SCENE_PARTS.filter((p) => !['monitor', 'keyboard', 'mouse'].includes(p)) : SCENE_PARTS;
  return (
    <>
      <CanvasHandle />
      <StudioLights />
      <CameraRig />
      {parts.map((id) => (
        <Part key={id} id={id}>
          {renderModel(id, {
            open: id === 'case' && exploded,
            reveal: reveal && selected === id && REVEALABLE.includes(id),
          })}
        </Part>
      ))}
      {!towerOnly && <Box s={[16, 0.12, 6]} p={[-3.4, -2.44, 0.6]} m={M.desk} />}
      <Connections />
      <Airflow />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.45} scale={26} blur={2.6} far={4} resolution={512} frames={1} />
    </>
  );
}

export { useMissedDeselect };
