import React, { useRef, useState, useEffect } from "react";
import {  useDepthBuffer, SpotLight , Backdrop } from "@react-three/drei";
import { Model } from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { button, useControls } from "leva";

const Scene = ({ section , light }) => {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  // const { position, rotation, visible } = useControls("name", {
  //   position: {
  //     value: { x: -2, y: 0, z: 0 },
  //     step: 0.01,
  //     joystick: "invertY",
  //   },
  //   rotation: {
  //     value: { x: 1.6, y: 0, z: 0 },
  //     step: 0.01,
  //     joystick: "invertY",
  //   },
  //   visible: true,
  // });



  const ScalingFactor = Math.min(Math.max(window.innerWidth / 1300, 0.5), 1.2);
  return (
    <>
      <group scale={ScalingFactor} position={[0, 0, 0]}>
      <Light
        //  depthBuffer={depthBuffer}
        color="#ffffff"
        position={[0, 1.8, 0.8]}
      />
     <Backdrop receiveShadow scale={[20, 5, 5]} floor={1.5} position={[0, -0.5, -2]}>
        <meshPhysicalMaterial  color="#ffffff" />
      </Backdrop>
        <Model
         scale={0.85}
          castShadow
          receiveShadow
          position={[0, -0.5, 0]}
          position={[-1.3, -0.5, -0.1]}
        />
      </group>
    </>
  );
};

export default Scene;
// function Rig() {
//   const { camera, mouse } = useThree()
//   const vec = new THREE.Vector3()

//   return useFrame(() => {
//       camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.05)
//       camera.lookAt(0, 0, 0)
//   })
// }

function Light({ vec = new THREE.Vector3(), ...props }) {
    const light = useRef();
    const viewport = useThree((state) => state.viewport);
    useFrame((state) => {
      light.current.target.position.lerp(
        vec.set(
          (state.mouse.x * viewport.width) / 2,
          (state.mouse.y * viewport.height) / 2,
          0
        ),
        0.1
      );
      light.current.target.updateMatrixWorld();
    });
    return (
      <SpotLight
        castShadow
        ref={light}
        penumbra={0.2}
        radiusTop={0.098}
        radiusBottom={30}
        distance={90}
        angle={0.45}
        attenuation={10}
        anglePower={4}
        intensity={0.6}
        opacity={0.3}
        {...props}
      />
    );
  }
