"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import Environment from "./Environment";
import Particles from "./Particles";
import NeuralCore from "./NeuralCore";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Scene() {
  const isMobile = useIsMobile();

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#05070A", 3, 15]} />
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 5, 5]} intensity={0.4} color="#38BDF8" />
          <pointLight position={[-5, -3, 3]} intensity={0.2} color="#818CF8" />
          <directionalLight position={[0, 5, 0]} intensity={0.3} />
          <Environment />
          <Particles count={isMobile ? 200 : 800} />
          <NeuralCore />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
