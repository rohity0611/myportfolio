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

export default function NeuralCore() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useState(() => new THREE.Object3D())[0];
  const [coreParticles] = useState(generateCoreParticles);

  const wireframeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#38BDF8",
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    [],
  );

  const ringMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#38BDF8",
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      }),
    [],
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
      {/* Inner icosahedron */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#0B1017"
          metalness={0.9}
          roughness={0.1}
          emissive="#38BDF8"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[0.72, 1]} />
        <primitive object={wireframeMat} attach="material" />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.1, 0.008, 8, 64]} />
        <primitive object={ringMat} attach="material" />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.006, 8, 64]} />
        <meshBasicMaterial color="#818CF8" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.5, 0.004, 8, 64]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.1} />
      </mesh>

      {/* Core particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, 60]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
      </instancedMesh>

      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}
