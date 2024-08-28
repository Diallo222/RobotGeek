import React, { useRef, useMemo, useCallback } from "react";
import { Backdrop, useDepthBuffer, SpotLight } from "@react-three/drei";
import { easing } from "maath";
import { Model } from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { button, useControls } from "leva";

const Scene = () => {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const ScalingFactor = useMemo(
    () => Math.min(Math.max(window.innerWidth / 1300, 0.5), 1.2),
    []
  );

  return (
    <>
      <group scale={ScalingFactor} position={[0, 0, 0]}>
        <SceneLight
          // depthBuffer={depthBuffer}
          color="#eff3f4"
          position={[0, 1.5, 1]}
        />
        <mesh receiveShadow position={[0, -0.55, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial attach="material" color="#f8f8f8" />
        </mesh>
        <Model
          scale={1.6}
          castShadow
          receiveShadow
          position={[-0.9, -0.7, 1]}
        />
      </group>
      {/* <Rig /> */}
    </>
  );
};

export default Scene;
// function for rigging the camera by moving the mouse
function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(state.pointer.x / 4) * 9,
        1.25 + state.pointer.y,
        Math.cos(state.pointer.x / 4) * 9,
      ],
      0.5,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
}

// function for the light of the scene that track the mouse
function SceneLight({ vec = new THREE.Vector3(), ...props }) {
  const light = useRef();
  const viewport = useThree((state) => state.viewport);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(
    useCallback(
      (state) => {
        tempVec.set(
          (state.pointer.x * viewport.width) / 2,
          (state.pointer.y * viewport.height) / 2,
          0
        );
        light.current.target.position.lerp(tempVec, 0.1);
        light.current.target.updateMatrixWorld();
      },
      [viewport]
    )
  );

  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      radiusBottom={2}
      distance={6}
      angle={0.35}
      attenuation={3}
      anglePower={4}
      intensity={2}
      {...props}
    />
  );
}
