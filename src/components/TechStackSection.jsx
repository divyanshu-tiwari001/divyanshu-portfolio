import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

export default function TechStackSection({ isDark }) {
  return (
    <section id="tech-stack" className={`py-24 px-6 ${isDark ? 'bg-slate-900/30' : 'bg-white/30'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
              Technologies
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">My Tech Stack</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {[
            { name: 'HTML', icon: '🌐' }, { name: 'CSS', icon: '🎨' }, { name: 'Frontend Development', icon: '</>' },
            { name: 'Python', icon: '🐍' }, { name: 'Node.js', icon: '🟢' }, { name: 'React', icon: '⚛️' },
            { name: 'Tailwind', icon: '💨' }, { name: 'GitHub', icon: '📦' }, { name: 'AI Tools', icon: '🤖' }, { name: 'Vercel', icon: '▲' },
            { name: 'Netlify', icon: '🚀' }, { name: 'VS Code', icon: '💻' }, { name: 'Claude', icon: '⚛︎' }, { name: 'Gemini', icon: '✦' }, { name: 'ChatGPT', icon: '֎' }, { name: 'Google AI Studio', icon: '👾' }
          ].map((tech, index) => (
            <motion.div key={index} variants={staggerItem}>
              <div className={`group p-6 rounded-2xl backdrop-blur-xl border hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}>
                <div className="text-4xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {tech.icon}
                </div>
                <div className={`text-sm font-semibold font-poppins ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {tech.name}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
