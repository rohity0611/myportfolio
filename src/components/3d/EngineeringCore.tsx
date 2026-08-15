"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function CoreSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref} scale={1.1}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#4f8fff"
          emissive="#4f8fff"
          emissiveIntensity={0.15}
          roughness={0.3}
          metalness={0.8}
          distort={0.15}
          speed={1.5}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function OrbitalRing({
  radius,
  speed,
  tilt,
  color,
}: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = tilt;
    ref.current.rotation.y = state.clock.getElapsedTime() * speed;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 8, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

function FloatingNode({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.x = position[0] + Math.sin(t) * 0.15;
    ref.current.position.y = position[1] + Math.cos(t * 0.8) * 0.15;
    ref.current.position.z = position[2] + Math.sin(t * 0.6) * 0.1;
  });

  return (
    <mesh ref={ref} position={position} scale={0.06}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function ParticleField() {
  const count = 40;
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  });

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#4f8fff" size={0.02} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#4f8fff" />
      <pointLight position={[-3, -3, 2]} intensity={0.3} color="#a855f7" />

      <CoreSphere />

      <OrbitalRing radius={1.6} speed={0.2} tilt={Math.PI * 0.3} color="#4f8fff" />
      <OrbitalRing radius={1.9} speed={-0.15} tilt={Math.PI * 0.6} color="#a855f7" />
      <OrbitalRing radius={2.2} speed={0.1} tilt={Math.PI * 0.1} color="#6366f1" />

      <FloatingNode position={[1.5, 0.8, 0.5]} color="#4f8fff" speed={1.2} />
      <FloatingNode position={[-1.2, -0.6, 0.8]} color="#a855f7" speed={0.9} />
      <FloatingNode position={[0.5, -1.3, -0.5]} color="#6366f1" speed={1.1} />
      <FloatingNode position={[-0.8, 1.1, -0.3]} color="#34d399" speed={0.8} />

      <ParticleField />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.6}
        minPolarAngle={Math.PI * 0.4}
      />
    </>
  );
}

export default function EngineeringCore({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none rounded-full opacity-30 blur-3xl">
        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-purple-500/10" />
      </div>
    </div>
  );
}
