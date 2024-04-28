import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useVideoTexture } from "@react-three/drei";
import { Color } from "three";
import { button, useControls } from "leva";

const baseColor = new Color("#44ff00").multiplyScalar(1.5);
const lowColor = new Color("#434343").multiplyScalar(1.5);
const hoverColor = new Color("#ff0101").multiplyScalar(1.5);

export function Model(props) {
  const { nodes, materials } = useGLTF("/RoboScene.glb");
  const angryMap = useVideoTexture(
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTE1OTRkbXoyeWpyNG0yNHFzbWYwNmgxdDdnemp6c2Q1cDN1NG5oYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEdv3VDEIbMQX8N3i/giphy.mp4"
  );
  const gameMap = useVideoTexture(
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnJwZndzN2U0OGYwNmZ6bzNwY3NtNThjbTlmb2VkYzlqZ3JpMGx0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKKH4z9OYrjWwz6/giphy.mp4"
  );

  //   const { position, rotation, scale } = useControls("name", {
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
  //   scale: {
  //     value: {x:1 , y: 1}
  //   },
  // });
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2.5;
    const y = (mouse.y * viewport.height) / 2.5;
    ref.current.lookAt(x, y, 1);
  });
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard.geometry}
        material={materials["Material.001"]}
        position={[0.324, -0.007, 0.546]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.418, 0.669, 0.195]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry}
          material={materials["Material.002"]}
          position={[0, 0.014, 0]}
          scale={0.99}
        />
      </mesh>
      <group
        position={[1.025, -0.01, 0.532]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.082, 0.103, 0.128]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane006_1.geometry}
          material={materials["Material.013"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Computer.geometry}
        material={materials["Material.015"]}
        position={[0.309, 0.593, -0.262]}
        scale={[0.398, 0.589, 0.384]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Button.geometry}
          material={nodes.Button.material}
          position={[-0.547, -0.441, 1.029]}
          rotation={[-1.571, -0.003, 0.004]}
          scale={[0.117, 0.561, 0.026]}
        />
        {/* <mesh
          castShadow
          receiveShadow
          position={[-0.12, 0, 0]}
          geometry={nodes.Screen.geometry}
          material={materials["Material.016"]}
       /> */}

      </mesh>
      <mesh position={[0.31, 0.75,0]} >
      <meshBasicMaterial
            map={hovered ? angryMap : gameMap}
            toneMapped={false}
          />
          <planeGeometry  args={[0.7, 0.6]} />
      </mesh>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
        geometry={nodes.Robot.geometry}
        material={materials.Material}
        position={[2.219, 0.416, -0.128]}
        scale={[0.495, 0.347, 0.295]}
      >
        <group
          position={[1.027, -0.21, 0.006]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.949, 0.665, 1.119]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_1.geometry}
            material={materials["Material.008"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_2.geometry}
            material={materials["Material.009"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle_3.geometry}
            material={materials["Material.010"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={nodes.Cube002.material}
          position={[0, 0.076, 0]}
        >
           <meshBasicMaterial
            color={hovered ? hoverColor : lowColor}
            toneMapped={false}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials["Material.011"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_2.geometry}
          // material={materials["Material.012"]}
        >
           <meshBasicMaterial
            color={hovered ? hoverColor : baseColor}
            toneMapped={false}
          />
        </mesh>
      </mesh>
    </group>
  );
}

useGLTF.preload("/RoboScene.glb");
