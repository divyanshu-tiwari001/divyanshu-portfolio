import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// SGA glyphs – same set as SGAParticles for visual consistency
const SGA = [
  "ᔑ", "ʖ", "ᓵ", "↸", "ᒷ", "⎓", "⊣", "⍑", "╎", "⋮",
  "ꖌ", "ꖎ", "ᒲ", "リ", "𝙹", "!", "¡", "ᑑ", "∷", "ᓭ",
  "ℸ", "⚍", "⍊", "∴", "̇/", "||", "⨅"
];

const TRAIL_CONFIG = {
  MAX_PARTICLES: 200,
  SPAWN_PER_FRAME: 4,       // particles spawned each frame while moving
  MIN_SIZE: 12,
  MAX_SIZE: 18,
  MIN_LIFE: 1.0,            // seconds
  MAX_LIFE: 1.5,
  GRAVITY: 40,              // px/s² downward
  AIR_RESISTANCE: 0.92,     // velocity multiplier per frame (at 60fps)
  STILL_THRESHOLD_MS: 300,  // ms with no movement before stopping spawn
  COLOR: 'rgba(110, 210, 245, 0.6)',
  // Minimum dt (seconds) to avoid division-by-zero velocity spikes
  MIN_DELTA_TIME: 0.001,
};

function rnd(a, b) { return a + Math.random() * (b - a); }

function makeParticle(x, y, vx, vy) {
  const size = rnd(TRAIL_CONFIG.MIN_SIZE, TRAIL_CONFIG.MAX_SIZE);
  return {
    x, y,
    vx: vx + rnd(-1.5, 1.5),
    vy: vy + rnd(-1.5, 1.5),
    char: SGA[Math.floor(Math.random() * SGA.length)],
    size,
    // Pre-compute font string to avoid per-frame string concatenation
    font: `600 ${Math.round(size)}px 'Segoe UI Symbol', sans-serif`,
    opacity: 1,
    age: 0,
    life: rnd(TRAIL_CONFIG.MIN_LIFE, TRAIL_CONFIG.MAX_LIFE),
  };
}

function SGACursorTrail() {
  const canvasRef = useRef(null);
  const poolRef = useRef([]);          // particle pool
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const lastMoveRef = useRef(0);       // timestamp of last mouse movement
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to viewport
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse velocity
    let prevX = -1000, prevY = -1000, prevT = performance.now();
    function onMouseMove(e) {
      const now = performance.now();
      const dt = Math.max((now - prevT) / 1000, TRAIL_CONFIG.MIN_DELTA_TIME);
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        vx: (e.clientX - prevX) / dt,
        vy: (e.clientY - prevY) / dt,
      };
      prevX = e.clientX;
      prevY = e.clientY;
      prevT = now;
      lastMoveRef.current = now;
    }
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    function frame(ts) {
      rafRef.current = requestAnimationFrame(frame);

      const dt = lastTsRef.current === null ? 0 : Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pool = poolRef.current;
      const now = performance.now();
      const isMoving = (now - lastMoveRef.current) < TRAIL_CONFIG.STILL_THRESHOLD_MS;

      // Spawn new particles if cursor is moving
      if (isMoving && dt > 0) {
        const { x, y, vx, vy } = mouseRef.current;
        // Scale spawn velocity to a reasonable trail speed
        const speed = Math.sqrt(vx * vx + vy * vy);
        const nx = speed > 0 ? vx / speed : 0;
        const ny = speed > 0 ? vy / speed : 0;
        const trailSpeed = Math.min(speed * 0.15, 120);

        for (let i = 0; i < TRAIL_CONFIG.SPAWN_PER_FRAME; i++) {
          if (pool.length >= TRAIL_CONFIG.MAX_PARTICLES) break;
          pool.push(makeParticle(x, y, nx * trailSpeed, ny * trailSpeed));
        }
      }

      // Draw & update particles
      ctx.globalCompositeOperation = 'screen';
      for (let i = pool.length - 1; i >= 0; i--) {
        const p = pool[i];
        p.age += dt;

        if (p.age >= p.life) {
          pool.splice(i, 1);
          continue;
        }

        // Physics
        p.vx *= TRAIL_CONFIG.AIR_RESISTANCE;
        p.vy *= TRAIL_CONFIG.AIR_RESISTANCE;
        p.vy += TRAIL_CONFIG.GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // Fade out
        p.opacity = Math.max(0, 1 - p.age / p.life);

        ctx.globalAlpha = p.opacity * 0.6;
        ctx.font = p.font;
        ctx.fillStyle = TRAIL_CONFIG.COLOR;
        ctx.fillText(p.char, Math.round(p.x), Math.round(p.y));
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9997,
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add hover detection for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button');
      
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide custom cursor on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      {/* SGA particle trail canvas – behind the cursor visuals */}
      <SGACursorTrail />

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1200,
          damping: 40,
          mass: 0.1
        }}
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isClicking ? 0.8 : isHovering ? 1.3 : 1,
          opacity: isHovering ? 0.5 : 0.3
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.1
        }}
      >
        <div className="w-10 h-10 rounded-full border-2 border-orange-500" />
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 0.15
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-600/20 blur-sm" />
      </motion.div>

      <style>{`
        * {
          cursor: none !important;
        }
        a, button, input, textarea, select {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
