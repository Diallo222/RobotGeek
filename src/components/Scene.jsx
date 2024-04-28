import React, { useRef, useState, useEffect } from "react";
import {  useDepthBuffer , Backdrop , useVideoTexture } from "@react-three/drei";
import { Model } from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { button, useControls } from "leva";

const Scene = ({ section , light }) => {
  const depthBuffer = useDepthBuffer({ frames: 1 });


  const angryMap = useVideoTexture(
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTE1OTRkbXoyeWpyNG0yNHFzbWYwNmgxdDdnemp6c2Q1cDN1NG5oYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEdv3VDEIbMQX8N3i/giphy.mp4"
  );
  const gameMap = useVideoTexture(
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnJwZndzN2U0OGYwNmZ6bzNwY3NtNThjbTlmb2VkYzlqZ3JpMGx0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKKH4z9OYrjWwz6/giphy.mp4"
  );

  const ScalingFactor = Math.min(Math.max(window.innerWidth / 1300, 0.5), 1.2);
  return (
    <>
    <spotLight
          angle={2}
          intensity={6}
          penumbra={1}
          position={[0, 3, 0]}
          color={"#d1d1d1"}
          rotation={[0,2,0]}
          shadow-bias={-0.0001}
          castShadow
        />
      <group scale={ScalingFactor} position={[0, 0, 0]}>
     <Backdrop receiveShadow scale={[20, 5, 5]} floor={2} position={[0, -0.5, -2]}>
        <meshPhysicalMaterial  color="#ececec" />
      </Backdrop>
        <Model
         scale={0.85}
          castShadow
          receiveShadow
          position={[-1.3, -0.49, -0.1]}
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
