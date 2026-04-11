import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, BookOpen, ChevronRight, Download } from 'lucide-react';
import SGAParticleText from './SGAParticleText';
import { FEATURE_FLAGS } from '../utils/featureFlags';
import { fadeInUp } from '../utils/animations';

export default function HeroSection({ isDark, scrollTo, y1, y2, y3 }) {
  const particleAnchorRef = useRef(null);
  return (
    <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-float"
        style={{ y: y1 }}
      ></motion.div>
      <motion.div
        className="absolute top-40 right-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-20 animate-float-delay-2"
        style={{ y: y2 }}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-float-delay-4"
        style={{ y: y3 }}
      ></motion.div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-block px-6 py-2 mb-6 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 animate-slide-bottom hover:scale-105 transition-transform duration-300">
          <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text font-montserrat">
            Available for Opportunities
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-playfair animate-scale-in">
          I Build <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text animate-gradient">Digital Experiences</span> That Make an Impact
        </h1>

        <div ref={particleAnchorRef} className="mb-4" style={{ minHeight: `${72}px` }}>
          <SGAParticleText isDark={isDark} anchorRef={particleAnchorRef} />
        </div>

        <p className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto font-poppins animate-slide-bottom ${isDark ? 'text-slate-300' : 'text-slate-600'}`} style={{ animationDelay: '0.2s' }}>
          Developer leveraging <strong>AI Prompting, Vibe Coding, HTML &amp; CSS, and Python</strong> to build real-world projects. Currently pursuing senior secondary education, applying hands-on technical and leadership skills across professional and creative domains.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-bottom" style={{ animationDelay: '0.4s' }}>
          <button onClick={() => scrollTo(FEATURE_FLAGS.SHOW_PROJECTS ? 'projects' : 'achievements')} className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-bold rounded-full hover:scale-105 hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 font-poppins relative overflow-hidden flex items-center justify-center gap-2">
            <span className="relative z-10">View My Projects</span>
            <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button onClick={() => scrollTo('contact')} className={`px-8 py-4 text-lg font-bold rounded-full border-2 border-orange-500 transition-all duration-300 font-poppins hover:scale-105 hover:shadow-xl ${isDark ? 'text-orange-400 hover:bg-orange-500 hover:text-white' : 'text-orange-600 hover:bg-orange-600 hover:text-white'}`}>
            Get in Touch
          </button>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            aria-label="Download Resume (coming soon)"
            className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full border-2 border-dashed border-orange-500/60 transition-all duration-300 font-poppins hover:scale-105 hover:border-orange-500 hover:shadow-xl ${isDark ? 'text-orange-400/80 hover:text-orange-400' : 'text-orange-500/80 hover:text-orange-600'}`}
          >
            <Download className="w-5 h-5" />
            Resume
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Award, value: '10+', label: 'Certificates Earned', delay: '0.1s' },
            { icon: Trophy, value: '3+', label: 'Awards Won', delay: '0.2s' },
            { icon: BookOpen, value: '200+', label: 'Hours of Learning', delay: '0.3s' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`group p-8 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 animate-scale-in ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
              style={{ animationDelay: stat.delay }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text font-poppins">
                {stat.value}
              </div>
              <div className={`text-sm font-semibold uppercase tracking-wider font-montserrat ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
