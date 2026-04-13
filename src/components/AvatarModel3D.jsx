import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

// Procedural boy avatar built from basic Three.js geometries
function AvatarBoy({ scrollYProgress, mouseX, mouseY, isHero }) {
  const groupRef = useRef();
  const headRef = useRef();
  const bodyRef = useRef();

  const scale = isHero ? 0.7 : 1.0;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Scroll-based rotation
    const scroll = scrollYProgress?.get ? scrollYProgress.get() : 0;
    groupRef.current.rotation.y = scroll * Math.PI * 2 + (mouseX || 0) * 0.5;
    groupRef.current.rotation.x = (mouseY || 0) * 0.3;

    // Idle floating
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;

    // Gentle head bob
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  // Color palette
  const skinColor = '#F4A261';
  const shirtColor = '#2EC4B6';
  const pantsColor = '#264653';
  const hairColor = '#1D1D1D';
  const shoeColor = '#2C2C2C';
  const eyeColor = '#1A1A2E';

  return (
    <group ref={groupRef} scale={scale} position={[0, -0.5, 0]}>
      {/* Hair */}
      <mesh position={[0, 1.95, 0]} castShadow>
        <sphereGeometry args={[0.42, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color={hairColor} roughness={0.8} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 1.55, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.13, 0.05, 0.33]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={eyeColor} />
        </mesh>
        <mesh position={[0.13, 0.05, 0.33]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color={eyeColor} />
        </mesh>

        {/* Eye shine */}
        <mesh position={[-0.1, 0.08, 0.37]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.16, 0.08, 0.37]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Smile */}
        <mesh position={[0, -0.1, 0.35]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.1, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#C0392B" />
        </mesh>

        {/* Nose */}
        <mesh position={[0, -0.02, 0.37]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>

        {/* Ears */}
        <mesh position={[-0.37, 0, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        <mesh position={[0.37, 0, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.2, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.6} />
      </mesh>

      {/* Body / Shirt */}
      <group ref={bodyRef} position={[0, 0.45, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.28, 0.8, 8, 16]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>

        {/* Shirt collar / neckline */}
        <mesh position={[0, 0.5, 0.24]}>
          <torusGeometry args={[0.16, 0.04, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1AA89C" roughness={0.6} />
        </mesh>
      </group>

      {/* Left Arm */}
      <group position={[-0.42, 0.65, 0]} rotation={[0, 0, 0.25]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.1, 0.55, 8, 12]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.38, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.42, 0.65, 0]} rotation={[0, 0, -0.25]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.1, 0.55, 8, 12]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.38, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Pants / Legs */}
      {/* Left Leg */}
      <group position={[-0.17, -0.35, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.13, 0.6, 8, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.8} />
        </mesh>
        {/* Left Shoe */}
        <mesh position={[0, -0.45, 0.05]}>
          <boxGeometry args={[0.2, 0.12, 0.3]} />
          <meshStandardMaterial color={shoeColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.17, -0.35, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.13, 0.6, 8, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.8} />
        </mesh>
        {/* Right Shoe */}
        <mesh position={[0, -0.45, 0.05]}>
          <boxGeometry args={[0.2, 0.12, 0.3]} />
          <meshStandardMaterial color={shoeColor} roughness={0.9} />
        </mesh>
      </group>

      {/* Glowing aura ring */}
      <mesh position={[0, -1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.03, 8, 48]} />
        <meshStandardMaterial color="#2EC4B6" emissive="#2EC4B6" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}

// Floating info pointer card orbiting the avatar
function InfoPointer({ angle, radius, isDark, scrollYProgress }) {
  const ref = useRef();
  const speed = 0.3;
  const verticalOffset = 0;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollYProgress?.get ? scrollYProgress.get() : 0;
    const currentAngle = angle + t * speed + scroll * 1.5;
    ref.current.position.x = Math.cos(currentAngle) * radius;
    ref.current.position.z = Math.sin(currentAngle) * radius;
    ref.current.position.y = verticalOffset + Math.sin(t * 0.5 + angle) * 0.12;
    ref.current.rotation.y = -currentAngle + Math.PI;
  });

  const bgColor = isDark ? '#1e293b' : '#f8fafc';
  const borderColor = '#2EC4B6';

  return (
    <group ref={ref}>
      {/* Card background */}
      <mesh>
        <boxGeometry args={[1.5, 0.45, 0.04]} />
        <meshStandardMaterial color={bgColor} roughness={0.3} metalness={0.1} transparent opacity={0.92} />
      </mesh>

      {/* Glowing border */}
      <mesh>
        <boxGeometry args={[1.54, 0.49, 0.02]} />
        <meshStandardMaterial color={borderColor} emissive={borderColor} emissiveIntensity={0.6} transparent opacity={0.5} />
      </mesh>

      {/* Connecting line to center */}
      <mesh position={[0, 0, 0.02]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.001, 4]} />
        <meshStandardMaterial color="#2EC4B6" emissive="#2EC4B6" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

// Orbiting particles around the avatar
function OrbitParticles({ count = 60, scrollYProgress }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.8;
      const height = (Math.random() - 0.5) * 3.5;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = height;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = scrollYProgress?.get ? scrollYProgress.get() : 0;
    ref.current.rotation.y = t * 0.2 + scroll * Math.PI;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#2EC4B6" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// Scene lighting
function SceneLighting({ isDark }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.4 : 0.8} />
      <directionalLight position={[3, 5, 3]} intensity={isDark ? 1.2 : 1.5} castShadow />
      <pointLight position={[-2, 2, -2]} intensity={0.8} color="#2EC4B6" />
      <pointLight position={[2, -1, 2]} intensity={0.5} color="#F4A261" />
    </>
  );
}

// WebGL fallback component
function FallbackAvatar({ isDark }) {
  return (
    <div className={`flex items-center justify-center w-full h-full rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'}`}>
      <div className="text-center">
        <div className="text-6xl mb-4">👨‍💻</div>
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Interactive 3D Avatar
        </p>
      </div>
    </div>
  );
}

// Main 3D canvas for hero (compact)
export function HeroAvatar3D({ isDark, scrollYProgress }) {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [webGLAvailable, setWebGLAvailable] = React.useState(true);

  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) setWebGLAvailable(false);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY.current = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  if (!webGLAvailable) return <FallbackAvatar isDark={isDark} />;

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        shadows
      >
        <SceneLighting isDark={isDark} />
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <AvatarBoy
              scrollYProgress={scrollYProgress}
              mouseX={mouseX.current}
              mouseY={mouseY.current}
              isHero
            />
          </Float>
          <OrbitParticles count={40} scrollYProgress={scrollYProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Info pointer data
const INFO_POINTERS = [
  { label: '3+ Years Learning', angle: 0 },
  { label: 'Frontend Dev', angle: Math.PI / 3 },
  { label: 'AI Engineer', angle: (2 * Math.PI) / 3 },
  { label: 'Python Dev', angle: Math.PI },
  { label: 'Award Winner', angle: (4 * Math.PI) / 3 },
  { label: 'Team Leader', angle: (5 * Math.PI) / 3 },
];

// Main 3D canvas for showcase section (full size)
export function ShowcaseAvatar3D({ isDark, scrollYProgress }) {
  const [webGLAvailable, setWebGLAvailable] = React.useState(true);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) setWebGLAvailable(false);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.current = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY.current = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  if (!webGLAvailable) return <FallbackAvatar isDark={isDark} />;

  return (
    <div className="w-full h-full" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0.5, isMobile ? 6 : 5], fov: 50 }}
        dpr={[1, Math.min(window.devicePixelRatio, isMobile ? 1 : 2)]}
        shadows
      >
        <SceneLighting isDark={isDark} />
        <Suspense fallback={null}>
          <AvatarBoy
            scrollYProgress={scrollYProgress}
            mouseX={mouseX.current}
            mouseY={mouseY.current}
            isHero={false}
          />
          <OrbitParticles count={isMobile ? 40 : 80} scrollYProgress={scrollYProgress} />
          {!isMobile && INFO_POINTERS.map((p, i) => (
            <InfoPointer
              key={i}
              angle={p.angle}
              radius={2.5}
              isDark={isDark}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </Suspense>
        {!isMobile && <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />}
      </Canvas>
    </div>
  );
}
