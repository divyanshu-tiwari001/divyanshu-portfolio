import React from 'react';
import { motion } from 'framer-motion';
import { ShowcaseAvatar3D } from './AvatarModel3D';
import { FEATURE_FLAGS } from '../utils/featureFlags';

const INFO_ITEMS = [
  { label: '3+ Years', sub: 'Learning Path', color: 'from-cyan-500 to-teal-500' },
  { label: 'Frontend', sub: 'Specialist', color: 'from-orange-500 to-amber-500' },
  { label: 'AI', sub: 'Prompt Engineer', color: 'from-purple-500 to-pink-500' },
  { label: 'Python', sub: 'Developer', color: 'from-blue-500 to-cyan-500' },
  { label: 'Award', sub: 'Winner', color: 'from-yellow-500 to-orange-500' },
  { label: 'Team', sub: 'Leader', color: 'from-green-500 to-teal-500' },
];

export default function Showcase3DSection({ isDark, scrollYProgress }) {
  if (!FEATURE_FLAGS.SHOW_3D_MODEL) return null;

  return (
    <section id="showcase-3d" className={`relative py-20 px-6 overflow-hidden ${isDark ? 'bg-slate-900/80' : 'bg-slate-50/80'}`}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className={`inline-block px-4 py-1 mb-4 rounded-full text-xs font-bold uppercase tracking-widest border ${isDark ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-cyan-50 border-cyan-300 text-cyan-600'}`}>
            Interactive 3D
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold font-playfair mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Meet <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text">Divyanshu</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto font-poppins ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Scroll to rotate • Hover to interact • Drag to explore
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left info cards */}
          <div className="hidden lg:flex flex-col gap-4">
            {INFO_ITEMS.slice(0, 3).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`group relative p-4 rounded-2xl border backdrop-blur-xl cursor-pointer hover:-translate-y-1 transition-all duration-300 ${isDark ? 'bg-slate-800/60 border-slate-700 hover:border-cyan-500/60' : 'bg-white/70 border-slate-200 hover:border-cyan-500/60'}`}
              >
                {/* Connecting line visual */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-cyan-500/60 to-transparent" />
                <div className={`text-xl font-bold font-poppins bg-gradient-to-r ${item.color} bg-clip-text`}>
                  {item.label}
                </div>
                <div className={`text-sm font-montserrat ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className={`relative rounded-3xl overflow-hidden border shadow-2xl ${isDark ? 'border-slate-700/60 bg-slate-900/50' : 'border-slate-200 bg-white/50'}`}
              style={{ height: '520px' }}
            >
              {FEATURE_FLAGS.ENABLE_3D_SCROLL_ANIMATIONS ? (
                <ShowcaseAvatar3D isDark={isDark} scrollYProgress={scrollYProgress} />
              ) : (
                <ShowcaseAvatar3D isDark={isDark} scrollYProgress={null} />
              )}

              {/* Bottom label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-xl ${isDark ? 'bg-slate-800/80 text-cyan-400' : 'bg-white/80 text-cyan-600'}`}>
                  Divyanshu Tiwari
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right info cards */}
          <div className="hidden lg:flex flex-col gap-4">
            {INFO_ITEMS.slice(3).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`group relative p-4 rounded-2xl border backdrop-blur-xl cursor-pointer hover:-translate-y-1 transition-all duration-300 ${isDark ? 'bg-slate-800/60 border-slate-700 hover:border-cyan-500/60' : 'bg-white/70 border-slate-200 hover:border-cyan-500/60'}`}
              >
                {/* Connecting line visual */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-l from-cyan-500/60 to-transparent" />
                <div className={`text-xl font-bold font-poppins bg-gradient-to-r ${item.color} bg-clip-text`}>
                  {item.label}
                </div>
                <div className={`text-sm font-montserrat ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile info cards (shown only on small screens) */}
          <div className="lg:hidden grid grid-cols-2 gap-3 col-span-1">
            {INFO_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white/70 border-slate-200'}`}
              >
                <div className={`text-base font-bold font-poppins bg-gradient-to-r ${item.color} bg-clip-text`}>
                  {item.label}
                </div>
                <div className={`text-xs font-montserrat ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className={`text-center text-xs mt-8 font-montserrat ${isDark ? 'text-slate-600' : 'text-slate-400'}`}
        >
          ↕ Scroll the page to see the 3D model rotate
        </motion.p>
      </div>
    </section>
  );
}
