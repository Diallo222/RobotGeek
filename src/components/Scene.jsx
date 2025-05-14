import React, {
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Backdrop,
  useDepthBuffer,
  SpotLight,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { easing } from "maath";
import { Model } from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import { throttle } from "lodash";
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
        <MovingSpot
          key="moving"
          // depthBuffer={depthBuffer}
          color="#dddcdb"
          position={[0, 1.4, 0.8]}
        />
        {/* <spotLight
          key="static"
          position={[0, 2, 0.8]}
          color="#2c3132bc"
          castShadow
          penumbra={0.3}
          radiusTop={0.2}
          radiusBottom={15}
          distance={50}
          angle={0.7}
          attenuation={15}
          anglePower={5}
          intensity={4}
          shadow-mapSize={1024}
          shadow-bias={-0.001}
        /> */}
        <mesh receiveShadow position={[0, -0.55, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            mirror={0.5}
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#f0f0f0"
            metalness={0.5}
          />
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

const MovingSpot = React.memo((props) => {
  const light = useRef();
  // const track = useLightStore((state) => state.light);
  const tempVec = useRef(new THREE.Vector3());
  const targetVec = useRef(new THREE.Vector3());

  // Use useCallback for throttle to prevent recreation
  const throttledUpdate = useCallback(
    throttle((state) => {
      const { viewport } = state;
      tempVec.current.set(
        THREE.MathUtils.clamp((state.mouse.x * viewport.width) / 2, -1, 1),
        THREE.MathUtils.clamp((state.mouse.y * viewport.height) / 2, -1, 1),
        0
      );

      targetVec.current.lerp(tempVec.current, 0.1);
      light.current.target.position.copy(targetVec.current);
      light.current.target.updateMatrixWorld();
    }, 50),
    [light]
  );

  useFrame(throttledUpdate);

  // Cleanup throttled function on unmount
  useEffect(() => {
    return () => throttledUpdate.cancel();
  }, [throttledUpdate]);

  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={0.3}
      radiusTop={0.05}
      radiusBottom={16}
      distance={50}
      angle={0.5}
      attenuation={1}
      anglePower={1}
      intensity={4}
      opacity={0.6}
      shadow-mapSize={1024}
      shadow-bias={-0.001}
      {...props}
    />
  );
});
