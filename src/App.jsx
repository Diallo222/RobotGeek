import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene , Loader , Effects } from "./components";
import { SoftShadows } from "@react-three/drei";

const App = () => {
  const [started, setStarted] = useState(false);



  return (
    <div className="relative z-0 w-screen h-screen overscroll-none overflow-y-hidden scrollbar-thin -ms-overflow-y-hidden">
      <Loader started={started} setStarted={setStarted} />
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ position: [0, 4, 10], fov: 25, near: 1, far: 100 }}
      >
        <color attach="background" args={["#000000"]} />
        {/* <ambientLight intensity={0.01} /> */}
          <Suspense>
           {started && <Scene />}
          </Suspense>
        {/* <Effects /> */}
        <SoftShadows size={25} samples={10} />
      </Canvas>

    </div>
  );
};

export default App;
