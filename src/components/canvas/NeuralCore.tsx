"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateCoreParticles() {
  return Array.from({ length: 60 }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: 0.8 + Math.random() * 0.6,
    speed: 0.3 + Math.random() * 0.8,
    y: (Math.random() - 0.5) * 1.2,
    scale: 0.015 + Math.random() * 0.02,
  }));
}

interface NeuralCoreProps {
  isDark: boolean;
}

export default function NeuralCore({ isDark }: NeuralCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useState(() => new THREE.Object3D())[0];
  const [coreParticles] = useState(generateCoreParticles);

  const accentColor = isDark ? "#38BDF8" : "#0284c7";
  const innerColor = isDark ? "#0B1017" : "#e2e8f0";
  const emissiveIntensity = isDark ? 0.1 : 0.05;

  const wireframeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: accentColor,
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.15 : 0.08,
      }),
    [accentColor, isDark],
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: isDark ? 0.25 : 0.12,
        side: THREE.DoubleSide,
      }),
    [accentColor, isDark],
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = time * 0.2;
      innerRef.current.rotation.z = time * 0.15;
      const scale = 1 + Math.sin(time * 1.5) * 0.05;
      innerRef.current.scale.setScalar(scale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.3;
      ring1Ref.current.rotation.y = time * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = time * 0.25;
      ring2Ref.current.rotation.z = time * 0.15;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.2;
      ring3Ref.current.rotation.x = time * 0.1;
    }

    if (particlesRef.current) {
      coreParticles.forEach((p, i) => {
        const angle = p.angle + time * p.speed;
        dummy.position.set(
          Math.cos(angle) * p.radius,
          p.y + Math.sin(time * p.speed + p.angle) * 0.2,
          Math.sin(angle) * p.radius,
        );
        dummy.scale.setScalar(p.scale * (1 + Math.sin(time * 3 + p.angle) * 0.3));
        dummy.updateMatrix();
        particlesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color={innerColor}
          metalness={0.9}
          roughness={0.1}
          emissive={accentColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.72, 1]} />
        <primitive object={wireframeMat} attach="material" />
      </mesh>

      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.1, 0.008, 8, 64]} />
        <primitive object={ringMat} attach="material" />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.006, 8, 64]} />
        <meshBasicMaterial color="#818CF8" transparent opacity={isDark ? 0.15 : 0.08} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.5, 0.004, 8, 64]} />
        <meshBasicMaterial color={accentColor} transparent opacity={isDark ? 0.1 : 0.05} />
      </mesh>

      <instancedMesh ref={particlesRef} args={[undefined, undefined, 60]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color={accentColor} transparent opacity={isDark ? 0.6 : 0.3} />
      </instancedMesh>

      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={accentColor} transparent opacity={isDark ? 0.08 : 0.04} />
      </mesh>
    </group>
  );
}
