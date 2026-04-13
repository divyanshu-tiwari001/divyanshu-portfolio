import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'particles', delay: 0 },
  { id: 'logo', delay: 300 },
  { id: 'bar', delay: 600 },
  { id: 'done', delay: 2200 },
];

export default function StartupAnimation({ onComplete }) {
  const [step, setStep] = useState('particles');
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Advance through steps
    STEPS.forEach(({ id, delay }) => {
      setTimeout(() => setStep(id), delay);
    });

    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2.5;
      });
    }, 40);

    // Dismiss after 2.6s
    const dismissTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onComplete?.(), 600);
    }, 2600);

    return () => {
      clearInterval(interval);
      clearTimeout(dismissTimer);
    };
  }, [onComplete]);

  // Spawn random particle positions (memoized)
  const particles = React.useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.5,
      duration: Math.random() * 1.5 + 1,
    })),
    []
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)' }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-cyan-400"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                opacity: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -30, -60],
                scale: [0.5, 1, 0.3],
              }}
              transition={{
                delay: p.delay,
                duration: p.duration,
                repeat: Infinity,
                repeatDelay: Math.random() * 1,
              }}
            />
          ))}

          {/* Logo */}
          <AnimatePresence>
            {(step === 'logo' || step === 'bar' || step === 'done') && (
              <motion.div
                className="text-center mb-10 relative z-10"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: 'backOut' }}
              >
                {/* DT Logo / initials */}
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 relative"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                    boxShadow: '0 0 40px rgba(245,158,11,0.4)',
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <span className="text-white text-3xl font-bold font-playfair z-10 absolute">DT</span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl font-bold font-playfair text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Divyanshu{' '}
                  <span style={{
                    backgroundImage: 'linear-gradient(90deg, #F59E0B, #EF4444)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Tiwari
                  </span>
                </motion.h1>
                <motion.p
                  className="text-slate-400 font-poppins text-sm tracking-widest uppercase"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Developer · Creator · Innovator
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <AnimatePresence>
            {(step === 'bar' || step === 'done') && (
              <motion.div
                className="relative z-10 w-64 md:w-80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-between text-xs text-slate-500 font-montserrat mb-2 uppercase tracking-widest">
                  <span>Loading Portfolio</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #2EC4B6, #F59E0B)',
                      boxShadow: '0 0 12px rgba(46,196,182,0.6)',
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-xl" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-xl" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-xl" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-500/40 rounded-br-xl" />

          {/* Scanning lines */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(46,196,182,0.02) 2px, rgba(46,196,182,0.02) 4px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
