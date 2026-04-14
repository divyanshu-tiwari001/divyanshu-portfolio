import React from 'react';
import { motion } from 'framer-motion';

export default function InfoPointer({ label, icon, color, index, side = 'left' }) {
  const isLeft = side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.7 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: 1.5 + index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex items-center gap-2 group"
      style={{ flexDirection: isLeft ? 'row-reverse' : 'row' }}
    >
      {/* Connector line */}
      <div
        className="h-px flex-shrink-0 transition-all duration-300 group-hover:opacity-100 opacity-60"
        style={{
          width: '32px',
          background: `linear-gradient(${isLeft ? 'to left' : 'to right'}, ${color}88, ${color})`,
        }}
      />

      {/* Arrow dot */}
      <div
        className="w-2 h-2 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      />

      {/* Card */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        className="px-3 py-2 rounded-xl backdrop-blur-md border flex items-center gap-2 cursor-default select-none"
        style={{
          background: `linear-gradient(135deg, ${color}18, ${color}0a)`,
          borderColor: `${color}44`,
          boxShadow: `0 0 12px ${color}22`,
        }}
        whileHover={{
          scale: 1.06,
          boxShadow: `0 0 20px ${color}55`,
          borderColor: `${color}88`,
        }}
      >
        <span className="text-base">{icon}</span>
        <span
          className="text-xs font-semibold whitespace-nowrap font-poppins"
          style={{ color }}
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
