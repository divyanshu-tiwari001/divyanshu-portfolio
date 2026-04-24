import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, Lightbulb, Users } from 'lucide-react';
import { staggerContainer, staggerItem } from '../utils/animations';

export default function TrustIndicators({ isDark }) {
  return (
    <section className={`py-12 border-t border-b ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white/30'}`}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {[
          { icon: Award, label: 'Award Winner', desc: 'First Prize Essay' },
          { icon: Code, label: 'Code.org Certified', desc: 'Hour of Code' },
          { icon: Lightbulb, label: 'NITI Aayog', desc: 'ATL Participant' },
          { icon: Users, label: 'Team Leader', desc: 'Proven Skills' }
        ].map((item, index) => (
          <motion.div key={index} variants={staggerItem} className="text-center group hover:scale-105 transition-transform duration-300">
            <item.icon className="w-10 h-10 mx-auto mb-3 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
            <div className={`font-bold mb-1 font-poppins ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</div>
            <div className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
