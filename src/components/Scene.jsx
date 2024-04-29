import React from "react";
import { Backdrop } from "@react-three/drei";
import { easing } from "maath";
import { Model } from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { button, useControls } from "leva";

const Scene = () => {
  const ScalingFactor = Math.min(Math.max(window.innerWidth / 1300, 0.5), 1.2);
  return (
    <>
      <spotLight
        angle={2}
        intensity={6}
        penumbra={1}
        position={[0, 3, 0]}
        color={"#d1d1d1"}
        rotation={[0, 2, 0]}
        shadow-bias={-0.0001}
        castShadow
      />
      <group scale={ScalingFactor} position={[0, 0, 0]}>
        <Backdrop
          receiveShadow
          scale={[20, 7, 5]}
          floor={4}
          position={[0, -0.5, -2]}
        >
          <meshPhysicalMaterial color="#ececec" />
        </Backdrop>
        <Model
          scale={0.85}
          castShadow
          receiveShadow
          position={[-1.3, -0.49, -0.1]}
        />
      </group>
      {/* <Rig /> */}
    </>
  );
};

export default Scene;
function Rig() {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  return useFrame((state , delta) => {
    easing.damp3(state.camera.position, [Math.sin(state.pointer.x / 4) * 9, 1.25 + state.pointer.y, Math.cos(state.pointer.x / 4) * 9], 0.5, delta)
    state.camera.lookAt(0, 0, 0)
  });
}
