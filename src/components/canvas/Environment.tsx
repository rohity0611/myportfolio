"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generateFogParticles() {
  return Array.from({ length: 200 }, () => ({
    position: new THREE.Vector3(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 30,
    ),
    speed: 0.0005 + Math.random() * 0.001,
    offset: Math.random() * Math.PI * 2,
    scale: 0.02 + Math.random() * 0.06,
  }));
}

interface EnvironmentProps {
  isDark: boolean;
}

export default function Environment({ isDark }: EnvironmentProps) {
  const gridRef = useRef<THREE.GridHelper>(null);
  const fogParticlesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useState(() => new THREE.Object3D())[0];
  const [fogParticles] = useState(generateFogParticles);

  const accentColor = isDark ? "#38BDF8" : "#0284c7";
  const fogOpacity = isDark ? 0.08 : 0.04;
  const gridOpacity = isDark ? 0.03 : 0.02;
  const rayOpacity = isDark ? 0.03 : 0.015;

  useFrame((state) => {
    if (!fogParticlesRef.current) return;
    const time = state.clock.elapsedTime;

    fogParticles.forEach((p, i) => {
      dummy.position.set(
        p.position.x + Math.sin(time * p.speed + p.offset) * 2,
        p.position.y + Math.cos(time * p.speed * 0.5 + p.offset) * 1,
        p.position.z,
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      fogParticlesRef.current!.setMatrixAt(i, dummy.matrix);
    });

    fogParticlesRef.current.instanceMatrix.needsUpdate = true;

    if (gridRef.current) {
      gridRef.current.position.y = -3;
      (gridRef.current.material as THREE.Material).opacity =
        gridOpacity + Math.sin(time * 0.5) * 0.01;
    }
  });

  return (
    <group>
      <gridHelper ref={gridRef} args={[40, 40, accentColor, accentColor]} position={[0, -3, 0]}>
        <meshBasicMaterial transparent opacity={gridOpacity} />
      </gridHelper>

      <instancedMesh ref={fogParticlesRef} args={[undefined, undefined, 200]}>
        <sphereGeometry args={[1, 4, 4]} />
        <meshBasicMaterial color={accentColor} transparent opacity={fogOpacity} />
      </instancedMesh>

      <mesh position={[0, 0, -8]}>
        <planeGeometry args={[0.02, 20]} />
        <meshBasicMaterial color={accentColor} transparent opacity={rayOpacity} />
      </mesh>
      <mesh position={[3, 0, -6]} rotation={[0, 0, 0.2]}>
        <planeGeometry args={[0.015, 15]} />
        <meshBasicMaterial color={accentColor} transparent opacity={rayOpacity * 0.7} />
      </mesh>
      <mesh position={[-4, 0, -7]} rotation={[0, 0, -0.15]}>
        <planeGeometry args={[0.01, 18]} />
        <meshBasicMaterial color="#818CF8" transparent opacity={rayOpacity * 0.7} />
      </mesh>
    </group>
  );
}
