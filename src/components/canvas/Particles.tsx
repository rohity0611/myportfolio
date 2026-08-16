"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateParticles(count: number) {
  return Array.from({ length: count }, () => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
    ),
    speed: 0.001 + Math.random() * 0.003,
    offset: Math.random() * Math.PI * 2,
    scale: 0.01 + Math.random() * 0.025,
  }));
}

export default function Particles({ count = 800 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useState(() => new THREE.Object3D())[0];
  const [particles] = useState(() => generateParticles(count));

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.position.x + Math.sin(time * p.speed + p.offset) * 0.5,
        p.position.y + Math.cos(time * p.speed * 0.7 + p.offset) * 0.3,
        p.position.z + Math.sin(time * p.speed * 0.5 + p.offset) * 0.4,
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(time * 2 + p.offset) * 0.2));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#38BDF8" transparent opacity={0.4} />
    </instancedMesh>
  );
}
