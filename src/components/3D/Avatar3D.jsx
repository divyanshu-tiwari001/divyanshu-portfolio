import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AVATAR_COLORS } from '../../utils/3dConfig';
import { createFPSTracker, tickFPS } from '../../utils/3dSystem';

function FloatingParticles() {
  const groupRef = useRef();
  const count = 18;
  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      radius: 1.4 + Math.random() * 0.4,
      y: (Math.random() - 0.5) * 2.5,
      speed: 0.3 + Math.random() * 0.4,
      size: 0.03 + Math.random() * 0.04,
    }));
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[Math.cos(p.angle) * p.radius, p.y, Math.sin(p.angle) * p.radius]}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshStandardMaterial
            color={AVATAR_COLORS.particles}
            emissive={AVATAR_COLORS.particles}
            emissiveIntensity={1.2}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Avatar3D({ mouseX = 0, mouseY = 0 }) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const fpsTrackerRef = useRef(createFPSTracker());

  useFrame((state) => {
    // FPS monitoring — auto-disables 3D if performance is consistently poor
    tickFPS(fpsTrackerRef.current);

    if (groupRef.current) {
      // Smooth auto-rotation + scroll influence
      groupRef.current.rotation.y += 0.005;
      // Mouse tilt
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY * 0.15,
        0.05,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouseX * 0.08,
        0.05,
      );
    }
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating particles around avatar */}
      <FloatingParticles />

      <group ref={bodyRef}>
        {/* Torso */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.42, 0.9, 16]} />
          <meshStandardMaterial
            color={AVATAR_COLORS.body}
            emissive={AVATAR_COLORS.bodyEmissive}
            emissiveIntensity={0.35}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.2, 12]} />
          <meshStandardMaterial
            color={AVATAR_COLORS.head}
            emissive={AVATAR_COLORS.headEmissive}
            emissiveIntensity={0.2}
            roughness={0.4}
          />
        </mesh>

        {/* Head */}
        <mesh position={[0, 1.08, 0]}>
          <sphereGeometry args={[0.38, 24, 24]} />
          <meshStandardMaterial
            color={AVATAR_COLORS.head}
            emissive={AVATAR_COLORS.headEmissive}
            emissiveIntensity={0.25}
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 1.32, 0]}>
          <sphereGeometry args={[0.37, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
          <meshStandardMaterial color={AVATAR_COLORS.hair} roughness={0.8} />
        </mesh>

        {/* Left Eye white */}
        <mesh position={[-0.14, 1.12, 0.33]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={AVATAR_COLORS.eyes} emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>
        {/* Left Pupil */}
        <mesh position={[-0.14, 1.12, 0.38]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color={AVATAR_COLORS.pupils} emissive={AVATAR_COLORS.pupils} emissiveIntensity={1.0} />
        </mesh>

        {/* Right Eye white */}
        <mesh position={[0.14, 1.12, 0.33]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={AVATAR_COLORS.eyes} emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>
        {/* Right Pupil */}
        <mesh position={[0.14, 1.12, 0.38]}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshStandardMaterial color={AVATAR_COLORS.pupils} emissive={AVATAR_COLORS.pupils} emissiveIntensity={1.0} />
        </mesh>

        {/* Smile */}
        <mesh position={[0, 1.0, 0.35]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.09, 0.018, 8, 12, Math.PI]} />
          <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.5} />
        </mesh>

        {/* Left Arm */}
        <mesh position={[-0.56, 0.1, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.1, 0.09, 0.7, 12]} />
          <meshStandardMaterial
            color={AVATAR_COLORS.clothes}
            emissive={AVATAR_COLORS.clothesEmissive}
            emissiveIntensity={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Left Hand */}
        <mesh position={[-0.7, -0.2, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={AVATAR_COLORS.head} roughness={0.4} />
        </mesh>

        {/* Right Arm */}
        <mesh position={[0.56, 0.1, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.1, 0.09, 0.7, 12]} />
          <meshStandardMaterial
            color={AVATAR_COLORS.clothes}
            emissive={AVATAR_COLORS.clothesEmissive}
            emissiveIntensity={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Right Hand */}
        <mesh position={[0.7, -0.2, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color={AVATAR_COLORS.head} roughness={0.4} />
        </mesh>

        {/* Left Leg */}
        <mesh position={[-0.2, -0.72, 0]}>
          <cylinderGeometry args={[0.14, 0.12, 0.7, 12]} />
          <meshStandardMaterial
            color={AVATAR_COLORS.body}
            emissive={AVATAR_COLORS.bodyEmissive}
            emissiveIntensity={0.2}
            roughness={0.5}
          />
        </mesh>
        {/* Left Shoe */}
        <mesh position={[-0.2, -1.12, 0.06]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>

        {/* Right Leg */}
        <mesh position={[0.2, -0.72, 0]}>
          <cylinderGeometry args={[0.14, 0.12, 0.7, 12]} />
          <meshStandardMaterial
            color={AVATAR_COLORS.body}
            emissive={AVATAR_COLORS.bodyEmissive}
            emissiveIntensity={0.2}
            roughness={0.5}
          />
        </mesh>
        {/* Right Shoe */}
        <mesh position={[0.2, -1.12, 0.06]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
