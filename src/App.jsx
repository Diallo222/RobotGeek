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
        camera={{ position: [0, 3, 10], fov: 30, near: 1, far: 100 }}
      >
        <color attach="background" args={["#131313"]} />
        {/* <ambientLight intensity={0.7} /> */}
        <Suspense>{started && <Scene />}</Suspense>
        <Effects />
        {/* <SoftShadows size={25} samples={10} /> */}
      </Canvas>
    </div>
  );
};

export default App;
