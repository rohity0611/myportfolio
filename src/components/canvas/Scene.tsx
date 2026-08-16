"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, useState, useEffect, createContext, useContext, useRef } from "react";
import Environment from "./Environment";
import Particles from "./Particles";
import NeuralCore from "./NeuralCore";
import Globe from "./Globe";
import { useTheme } from "@/hooks/useTheme";

interface MouseContextType {
  x: number;
  y: number;
}

const MouseContext = createContext<MouseContextType>({ x: 0, y: 0 });

export function useSceneMouse() {
  return useContext(MouseContext);
}

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

function MouseTracker({ children }: { children: React.ReactNode }) {
  const ref = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ref.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    let raf: number;
    const tick = () => {
      setPos((prev) => ({
        x: prev.x + (ref.current.x - prev.x) * 0.05,
        y: prev.y + (ref.current.y - prev.y) * 0.05,
      }));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <MouseContext.Provider value={pos}>{children}</MouseContext.Provider>;
}

export default function Scene() {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fogColor = isDark ? "#05070A" : "#f0f4f8";
  const ambientIntensity = isDark ? 0.15 : 0.4;
  const pointIntensity = isDark ? 0.4 : 0.25;
  const dirIntensity = isDark ? 0.3 : 0.5;

  return (
    <div className="canvas-container">
      <MouseTracker>
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
            <fog attach="fog" args={[fogColor, 3, 15]} />
            <ambientLight intensity={ambientIntensity} />
            <pointLight
              position={[5, 5, 5]}
              intensity={pointIntensity}
              color={isDark ? "#38BDF8" : "#0284c7"}
            />
            <pointLight position={[-5, -3, 3]} intensity={isDark ? 0.2 : 0.15} color="#818CF8" />
            <directionalLight position={[0, 5, 0]} intensity={dirIntensity} />
            <Environment isDark={isDark} />
            <Particles count={isMobile ? 200 : 800} />
            <SceneContent isDark={isDark} isMobile={isMobile} />
            <Preload all />
          </Suspense>
        </Canvas>
      </MouseTracker>
    </div>
  );
}

function SceneContent({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const mouse = useSceneMouse();
  return (
    <>
      {!isMobile && <Globe />}
      <NeuralCore isDark={isDark} mousePosition={mouse} />
    </>
  );
}
