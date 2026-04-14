import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Avatar3D from './Avatar3D';
import { AVATAR_PRESETS, WEBGL_AVAILABLE } from '../../utils/3dConfig';
import { FEATURE_FLAGS } from '../../utils/featureFlags';
import { disable3D } from '../../utils/3dSystem';
import ErrorBoundary3D from './ErrorBoundary3D';

function FallbackAvatar() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-orange-400 animate-pulse shadow-lg shadow-cyan-500/50" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-full opacity-70" />
      </div>
    </div>
  );
}

export default function HeroAvatar() {
  // All hooks must be declared before any conditional returns (Rules of Hooks).
  const [canvasReady, setCanvasReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);
  const preset = AVATAR_PRESETS.hero;

  // Timeout detection: if the WebGL canvas hasn't initialised within
  // THREE_D_LOAD_TIMEOUT_MS, treat it as hung and auto-disable.
  useEffect(() => {
    if (!FEATURE_FLAGS.ENABLE_3D_SYSTEM || !FEATURE_FLAGS.AUTO_DISABLE_3D_ON_ERROR) return;

    timerRef.current = setTimeout(() => {
      if (!canvasReady) {
        console.warn('3D System: Hero canvas load timeout exceeded');
        disable3D('Hero canvas load timeout exceeded (>3 s)');
      }
    }, FEATURE_FLAGS.THREE_D_LOAD_TIMEOUT_MS);

    return () => clearTimeout(timerRef.current);
  }, [canvasReady]);

  // Mouse tracking for interactive avatar tilt
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

  // ── Master 3D guard (placed after hooks so Rules of Hooks are satisfied) ──
  if (!FEATURE_FLAGS.ENABLE_3D_SYSTEM) return null;

  // WebGL not available → show simple 2-D fallback
  if (!WEBGL_AVAILABLE) return <FallbackAvatar />;

  const handleCanvasCreated = ({ gl }) => {
    // Mark as loaded so the timeout is cancelled
    setCanvasReady(true);

    // WebGL context-loss detection
    gl.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      console.error('3D System: Hero WebGL context lost');
      if (FEATURE_FLAGS.AUTO_DISABLE_3D_ON_ERROR) {
        disable3D('Hero WebGL context lost');
      }
    });
  };

  return (
    <ErrorBoundary3D fallback={<FallbackAvatar />}>
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0, scale: 0.7, rotateY: -30 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Canvas
          camera={{ position: [0, 0.5, 4.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
          onCreated={handleCanvasCreated}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 4]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-3, 2, 2]} intensity={0.8} color="#06b6d4" />
          <pointLight position={[3, -1, 2]} intensity={0.6} color="#f59e0b" />

          <Suspense fallback={null}>
            <group scale={preset.scale} position={preset.position} rotation={preset.rotation}>
              <Avatar3D mouseX={mousePos.x} mouseY={mousePos.y} />
            </group>
          </Suspense>
        </Canvas>
      </motion.div>
    </ErrorBoundary3D>
  );
}
