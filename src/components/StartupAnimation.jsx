import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
  { key: 'logo',     delay: 0,   duration: 600 },
  { key: 'nav',      delay: 500, duration: 500 },
  { key: 'title',    delay: 900, duration: 400 },
  { key: 'avatar',   delay: 1100, duration: 800 },
  { key: 'text',     delay: 1200, duration: 500 },
  { key: 'pointers', delay: 1400, duration: 1000 },
  { key: 'buttons',  delay: 1900, duration: 400 },
  { key: 'done',     delay: 2400, duration: 0 },
];

export default function StartupAnimation({ children, isDark, enabled = true }) {
  const [phase, setPhase] = useState('idle');
  const [animDone, setAnimDone] = useState(!enabled);

  useEffect(() => {
    if (!enabled) return;

    // Check sessionStorage to avoid re-playing animation on hot reload
    const played = sessionStorage.getItem('startup_played');
    if (played) {
      setAnimDone(true);
      return;
    }

    const timers = PHASES.map(({ key, delay }) =>
      setTimeout(() => setPhase(key), delay),
    );

    const doneTimer = setTimeout(() => {
      setAnimDone(true);
      sessionStorage.setItem('startup_played', '1');
    }, 2500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(doneTimer);
    };
  }, [enabled]);

  if (animDone) return <>{children}</>;

  return (
    <>
      {/* Overlay curtain */}
      <AnimatePresence>
        {phase !== 'done' && (
          <motion.div
            key="curtain"
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
            style={{ background: isDark ? '#0f172a' : '#f8fafc' }}
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.1 } }}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 6 + 2,
                    height: Math.random() * 6 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: i % 2 === 0 ? '#06b6d4' : '#f59e0b',
                  }}
                  animate={{
                    x: [0, (Math.random() - 0.5) * 200, 0],
                    y: [0, (Math.random() - 0.5) * 200, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 1,
                    delay: Math.random() * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Logo / Brand */}
            <motion.div
              className="relative flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: phase !== 'idle' ? 1 : 0,
                scale: phase !== 'idle' ? 1 : 0.5,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* DT monogram */}
              <motion.div
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-cyan-500/50"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
              >
                <span className="text-white font-bold text-3xl font-playfair">DT</span>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: ['nav', 'title', 'avatar', 'text', 'pointers', 'buttons'].includes(phase) ? 1 : 0,
                  y: ['nav', 'title', 'avatar', 'text', 'pointers', 'buttons'].includes(phase) ? 0 : 20,
                }}
                transition={{ duration: 0.4 }}
              >
                <p className={`text-lg font-semibold font-poppins ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Divyanshu Tiwari
                </p>
                <p className="text-sm font-medium text-cyan-400 font-montserrat mt-1 tracking-widest uppercase">
                  Portfolio Loading…
                </p>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                className="w-48 h-1 rounded-full overflow-hidden"
                style={{ background: isDark ? '#1e293b' : '#e2e8f0' }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-orange-500"
                  initial={{ width: '0%' }}
                  animate={{
                    width:
                      phase === 'logo'     ? '15%' :
                      phase === 'nav'      ? '30%' :
                      phase === 'title'    ? '50%' :
                      phase === 'avatar'   ? '65%' :
                      phase === 'text'     ? '75%' :
                      phase === 'pointers' ? '88%' :
                      phase === 'buttons'  ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual page content (rendered but invisible until done) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: animDone ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
}
