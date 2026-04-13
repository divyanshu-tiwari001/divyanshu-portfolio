import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import Avatar3D from './Avatar3D';
import InfoPointer from './InfoPointer';
import { AVATAR_PRESETS, INFO_POINTERS, WEBGL_AVAILABLE } from '../../utils/3dConfig';
function AvatarCanvas({ mousePos }) {
  const preset = AVATAR_PRESETS.section;
  return (
    <Canvas
      camera={{ position: [0, 0.8, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, 3, 3]} intensity={1.0} color="#06b6d4" />
      <pointLight position={[4, -2, 3]} intensity={0.8} color="#f59e0b" />
      <pointLight position={[0, -3, 4]} intensity={0.5} color="#f97316" />

      <Suspense fallback={null}>
        <group scale={preset.scale} position={preset.position} rotation={preset.rotation}>
          <Avatar3D mouseX={mousePos.x} mouseY={mousePos.y} />
        </group>
      </Suspense>
    </Canvas>
  );
}

export default function AvatarSection({ isDark }) {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const sectionY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const leftPointers = INFO_POINTERS.slice(0, 3);
  const rightPointers = INFO_POINTERS.slice(3);

  return (
    <motion.section
      ref={sectionRef}
      id="avatar-section"
      className="relative py-24 overflow-hidden"
      style={{ y: sectionY }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />
      </motion.div>

      {/* Section header */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={`text-3xl md:text-5xl font-bold font-playfair ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Meet{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-orange-500 bg-clip-text">
            The Developer
          </span>
        </h2>
        <p className={`mt-3 text-base font-poppins ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Scroll to explore — avatar reacts to your movement
        </p>
      </motion.div>

      {/* Main layout: pointers + canvas + pointers */}
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-4 md:gap-8 relative z-10">
        {/* Left pointers */}
        <div className="hidden md:flex flex-col gap-5 items-end">
          {leftPointers.map((p, i) => (
            <InfoPointer key={p.label} {...p} index={i} side="left" />
          ))}
        </div>

        {/* 3D Canvas */}
        <div className="flex-shrink-0 w-[280px] h-[380px] sm:w-[340px] sm:h-[440px] md:w-[380px] md:h-[500px]">
          {WEBGL_AVAILABLE ? (
            <AvatarCanvas mousePos={mousePos} />
          ) : (
            /* Fallback when WebGL not available */
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-orange-400 animate-pulse shadow-2xl shadow-cyan-500/50" />
              </div>
            </div>
          )}
        </div>

        {/* Right pointers */}
        <div className="hidden md:flex flex-col gap-5 items-start">
          {rightPointers.map((p, i) => (
            <InfoPointer key={p.label} {...p} index={i + leftPointers.length} side="right" />
          ))}
        </div>
      </div>

      {/* Mobile pointers (shown below on small screens) */}
      <div className="md:hidden mt-6 px-6 flex flex-wrap gap-3 justify-center relative z-10">
        {INFO_POINTERS.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="px-3 py-2 rounded-xl backdrop-blur-md border flex items-center gap-2"
            style={{
              background: `linear-gradient(135deg, ${p.color}18, ${p.color}0a)`,
              borderColor: `${p.color}44`,
            }}
          >
            <span className="text-sm">{p.icon}</span>
            <span className="text-xs font-semibold font-poppins" style={{ color: p.color }}>
              {p.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
