import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { GraduationCap, MapPin, Calendar, Award, BookOpen } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

function EducationSection({ isDark, magneticPositions, handleMagneticMove, handleMagneticLeave }) {
  return (
    <section id="education" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-10 animate-float-slow"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
              Academic Journey
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">My Education</h2>
          <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Building a strong foundation for tomorrow's innovations
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            scale={1.02}
            transitionSpeed={400}
            glareEnable={true}
            glareMaxOpacity={0.2}
            glareColor="#ff6b00"
            glarePosition="all"
          >
            <div
              className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
              onMouseMove={(e) => handleMagneticMove(e, 'education')}
              onMouseLeave={() => handleMagneticLeave('education')}
              style={{ transform: `translate(${magneticPositions['education']?.x || 0}px, ${magneticPositions['education']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
            >

              {/* Timeline Line */}
              <div className="absolute left-10 top-32 bottom-32 w-0.5 bg-gradient-to-b from-amber-500 to-orange-600 hidden md:block"></div>

              {/* School Badge */}
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse"></div>
                </div>

                <div className="flex-1">
                  <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                    Currently Pursuing
                  </div>
                  <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text">
                    Senior Secondary Education
                  </h3>
                  <div className={`text-xl font-semibold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    C.S. DAV Public School
                  </div>
                  <div className={`flex items-center gap-2 text-sm font-roboto mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <MapPin className="w-4 h-4" />
                    Motihari, Bihar, India
                  </div>
                </div>
              </div>

              {/* Current Status */}
              <div className={`p-6 rounded-2xl mb-6 ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span className="font-bold font-poppins">Current Grade</span>
                  </div>
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-bold">
                    Class 12th
                  </span>
                </div>
                <div className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Senior Secondary (Classes 11-12) • Completion: 2027
                </div>
              </div>

              {/* Academic Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/30' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold font-poppins">Secondary Education</span>
                  </div>
                  <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Successfully completed with strong foundation
                  </p>
                </div>

                <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-800/30' : 'bg-slate-50'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold font-poppins">Focus Areas</span>
                  </div>
                  <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Mathematics, Physics, Chemistry & CS
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-semibold font-poppins ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Senior Secondary Progress
                  </span>
                  <span className="text-sm font-bold text-orange-500">Year 2 of 2</span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: '100%' }}>
                    <div className="absolute inset-0 shimmer"></div>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(EducationSection);
