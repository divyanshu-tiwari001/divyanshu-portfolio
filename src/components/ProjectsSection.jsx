import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Code, Github, Sparkles, ExternalLink } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

function ProjectsSection({ isDark, magneticPositions, handleMagneticMove, handleMagneticLeave }) {
  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-float-slow"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-montserrat">
              My Work
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">Projects</h2>
          <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Real-world projects demonstrating practical application of my skills
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Project Card: Class 11th IP Practicals */}
          <motion.div variants={staggerItem}>
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.02}
              transitionSpeed={400}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#3b82f6"
              glarePosition="all"
            >
              <div
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-blue-500/50' : 'bg-white/50 border-slate-200 hover:border-blue-500/50'}`}
                onMouseMove={(e) => handleMagneticMove(e, 'proj-class11')}
                onMouseLeave={() => handleMagneticLeave('proj-class11')}
                style={{ transform: `translate(${magneticPositions['proj-class11']?.x || 0}px, ${magneticPositions['proj-class11']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg flex-shrink-0">
                    <Code className="w-10 h-10 text-white" />
                    <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold ${isDark ? 'bg-slate-800 text-blue-400' : 'bg-white text-blue-600'} border border-blue-500/30`}>
                      2026
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-1 font-poppins bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">
                      Class 11th IP Practicals
                    </h3>
                    <p className={`text-sm font-semibold mb-4 font-roboto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Informatics Practices — Python &amp; MySQL
                    </p>
                    <p className={`mb-6 font-roboto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      A comprehensive collection of 16 Python programs and 9 MySQL queries covering core IP syllabus — from grade calculators and financial math to dictionary operations and full CRUD database management.
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Python', 'MySQL', 'Data Structures', 'CRUD'].map((tag) => (
                        <span key={tag} className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats Row */}
                    <div className={`flex flex-wrap gap-6 mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {[
                        { value: '16', label: 'Python Programs' },
                        { value: '9', label: 'MySQL Queries' },
                        { value: '25', label: 'Total Programs' },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text font-poppins">{stat.value}</div>
                          <div className={`text-xs font-roboto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* GitHub Link */}
                    <a
                      href="https://github.com/divyanshu-tiwari001/class11th-practical"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold font-poppins hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Project Card: Premium Student Portfolio */}
          <motion.div variants={staggerItem}>
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              scale={1.02}
              transitionSpeed={400}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#a855f7"
              glarePosition="all"
            >
              <div
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-purple-500/50' : 'bg-white/50 border-slate-200 hover:border-purple-500/50'}`}
                onMouseMove={(e) => handleMagneticMove(e, 'proj-portfolio')}
                onMouseLeave={() => handleMagneticLeave('proj-portfolio')}
                style={{ transform: `translate(${magneticPositions['proj-portfolio']?.x || 0}px, ${magneticPositions['proj-portfolio']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg flex-shrink-0">
                    <Sparkles className="w-10 h-10 text-white" />
                    <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-bold ${isDark ? 'bg-slate-800 text-purple-400' : 'bg-white text-purple-600'} border border-purple-500/30`}>
                      2025
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-1 font-poppins bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
                      Premium Student Portfolio
                    </h3>
                    <p className={`text-sm font-semibold mb-4 font-roboto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      React · Tailwind CSS · Framer Motion · Vercel
                    </p>
                    <p className={`mb-6 font-roboto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      This very portfolio — a meta-showcase of front-end craftsmanship. Built with React and Framer Motion for buttery-smooth animations, styled with Tailwind CSS for a premium look, and featuring performance-optimised SGAParticles (mobile-first with 30 fps cap &amp; gradient caching). Ships with magnetic hover effects, blur-glass cards, adaptive dark/light mode, and is deployed on Vercel with zero-config CI/CD.
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'Performance Optimization', 'Web Design'].map((tag) => (
                        <span key={tag} className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats Row */}
                    <div className={`flex flex-wrap gap-6 mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {[
                        { value: '98.4%', label: 'JavaScript' },
                        { value: '1.3%', label: 'CSS' },
                        { value: '0.3%', label: 'HTML' },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-poppins">{stat.value}</div>
                          <div className={`text-xs font-roboto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/divyanshu-tiwari001/divyanshu-portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold font-poppins hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        View on GitHub
                      </a>
                      <a
                        href="https://divyanshu-portfolio.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-bold font-poppins hover:scale-105 transition-all duration-300 ${isDark ? 'border-purple-500/50 text-purple-400 hover:bg-purple-500/10' : 'border-purple-500/50 text-purple-600 hover:bg-purple-500/10'}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Building in Progress */}
          <motion.div variants={staggerItem}>
            <div className={`p-10 rounded-3xl border-2 border-dashed backdrop-blur-xl transition-all duration-500 hover:border-solid ${isDark ? 'border-blue-700/60 bg-slate-800/30 hover:border-blue-500/60' : 'border-blue-300 bg-blue-50/50 hover:border-blue-400'}`}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold font-poppins mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Always Building</h4>
                <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  New projects with Python, React, and AI are actively in development — check back soon for more!
                </p>
                <a
                  href="https://github.com/divyanshu-tiwari001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 mt-4 text-sm font-semibold font-poppins transition-all duration-300 hover:scale-105 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                >
                  <Github className="w-4 h-4" />
                  Follow on GitHub for updates
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(ProjectsSection);
