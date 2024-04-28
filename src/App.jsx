import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene, Loader, Effects } from "./components";
import { SoftShadows } from "@react-three/drei";

const App = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative z-0 w-screen h-screen overscroll-none overflow-y-hidden scrollbar-thin -ms-overflow-y-hidden">
      <Loader started={started} setStarted={setStarted} />
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [0, 2, 10], fov: 25, near: 1, far: 100 }}
      >
        <color attach="background" args={["#131313"]} />
        {/* <ambientLight intensity={0.7} /> */}
        {/* <directionalLight
          position={[-10, 4, 5]}
          shadow-mapSize={[256, 256]}
          shadow-bias={-0.0001}
          castShadow
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-10, 10, -10, 10]}
          />
        </directionalLight> */}
        <Suspense>{started && <Scene />}</Suspense>
        <Effects />
        {/* <SoftShadows size={25} samples={10} /> */}
      </Canvas>
    </div>
  );
};

export default App;
