import React, { useRef, useMemo, useCallback, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useVideoTexture, Float } from "@react-three/drei";

const baseColor = new THREE.Color("#f5f5f5").multiplyScalar(1.5);
const hoverColor = new THREE.Color("#ff0101").multiplyScalar(1.5);

export function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/portfolioScene.glb");
  const robot = useRef();
  const target = useMemo(() => new THREE.Vector3(), []);
  const [hovered, setHovered] = useState(false);

  useFrame(
    useCallback(
      ({ pointer }) => {
        // Update the target position only if the mouse position has changed
        const newTarget = new THREE.Vector3(pointer.x, pointer.y, 1);
        if (!target.equals(newTarget)) {
          target.copy(newTarget);
          robot.current.lookAt(target);
        }
      },
      [target]
    )
  );
  const angryMap = useVideoTexture(
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTE1OTRkbXoyeWpyNG0yNHFzbWYwNmgxdDdnemp6c2Q1cDN1NG5oYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEdv3VDEIbMQX8N3i/giphy.mp4"
  );
  const gameMap = useVideoTexture(
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnJwZndzN2U0OGYwNmZ6bzNwY3NtNThjbTlmb2VkYzlqZ3JpMGx0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKKH4z9OYrjWwz6/giphy.mp4"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
         {/* The computer Model*/}
        <mesh
          name="Computer"
          castShadow
          receiveShadow
          geometry={nodes.Computer.geometry}
          material={nodes.Computer.material}
          position={[0.38, 0.33, -0.804]}
          scale={[0.154, 0.228, 0.149]}
        >
          <mesh
            name="Button"
            castShadow
            receiveShadow
            geometry={nodes.Button.geometry}
            material={materials["Material.004"]}
            position={[-0.547, -0.441, 1.029]}
            rotation={[-1.571, -0.003, 0.004]}
            scale={[0.117, 0.561, 0.026]}
          />
        </mesh>
        {/*basic material to replace the computer screen*/}
        <mesh position={[0.376, 0.395, -0.69]}>
          <meshBasicMaterial
            map={hovered ? angryMap : gameMap}
            toneMapped={false}
          />
          <planeGeometry args={[0.27, 0.25]} />
        </mesh>

        {/* The robot model */}
        <mesh
          ref={robot}
          name="Robot"
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
          receiveShadow
          geometry={nodes.Robot.geometry}
          material={nodes.Robot.material}
          position={[0.839, 0.197, -0.752]}
          scale={[0.127, 0.089, 0.075]}
        >
          <mesh
            name="Circle"
            castShadow
            receiveShadow
            geometry={nodes.Circle.geometry}
            material={nodes.Circle.material}
            position={[1.027, -0.21, 0.006]}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[0.949, 0.665, 1.119]}
          />
          <group name="Cube001">
            <mesh
              name="Cube006"
              castShadow
              receiveShadow
              geometry={nodes.Cube006.geometry}
              material={materials["Material.011"]}
            />
            <mesh
              name="Cube006_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube006_1.geometry}
              material={materials["Material.012"]}
            >
              <meshBasicMaterial
                color={hovered ? hoverColor : baseColor}
                toneMapped={false}
              />
            </mesh>
          </group>
          <mesh
            name="Cube002"
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            // material={materials["Material.003"]}
            position={[0, 0.076, 0]}
          >
            <meshBasicMaterial
              color={hovered ? hoverColor : baseColor}
              toneMapped={false}
            />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/portfolioScene.glb");
