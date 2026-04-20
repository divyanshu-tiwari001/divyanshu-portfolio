import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Trophy, Award, Star } from 'lucide-react';
import scalerOnboardingKit from '../assets/scaler_onboarding_kit.jpg';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

function AwardsSection({ isDark, magneticPositions, handleMagneticMove, handleMagneticLeave }) {
  return (
    <section id="awards" className={`py-24 px-6 ${isDark ? 'bg-slate-900/30' : 'bg-white/30'}`}>
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
              Recognition & Honors
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">Awards</h2>
          <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Celebrating achievements and excellence in various domains
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Award 1: Essay Writing Competition */}
          <motion.div variants={staggerItem}>
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
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-amber-500/50' : 'bg-white/50 border-slate-200 hover:border-amber-500/50'}`}
                onMouseMove={(e) => handleMagneticMove(e, 'award-essay')}
                onMouseLeave={() => handleMagneticLeave('award-essay')}
                style={{ transform: `translate(${magneticPositions['award-essay']?.x || 0}px, ${magneticPositions['award-essay']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
              >
                <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-500/20 text-amber-600'}`}>
                  🥇 1st Prize
                </div>
                <h3 className="text-2xl font-bold mb-3 font-poppins">Essay Writing Competition</h3>
                <div className={`text-sm font-semibold mb-4 ${isDark ? 'text-amber-400' : 'text-orange-600'}`}>
                  Amity University, Patna
                </div>
                <p className={`font-roboto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Awarded first place for exceptional essay on "One Nation, One Election"
                </p>
                <div className="flex gap-1 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Award 2: Scaler Onboarding Kit */}
          <motion.div variants={staggerItem}>
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
                className={`group p-10 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
                onMouseMove={(e) => handleMagneticMove(e, 'award-scaler')}
                onMouseLeave={() => handleMagneticLeave('award-scaler')}
                style={{ transform: `translate(${magneticPositions['award-scaler']?.x || 0}px, ${magneticPositions['award-scaler']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
              >
                <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>
                  Excellence
                </div>
                <h3 className="text-2xl font-bold mb-3 font-poppins">Scaler Onboarding Kit</h3>
                <div className={`text-sm font-semibold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Scaler School of Technology
                </div>
                <p className={`mb-6 font-roboto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Received for excellent performance in Young Innovators Internship Challenge Edition 5
                </p>

                {/* Award Photo */}
                <img
                  src={scalerOnboardingKit}
                  alt="Scaler Onboarding Kit award photo"
                  loading="lazy"
                  className="mt-4 w-full rounded-xl object-cover transform transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </Tilt>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const samePoint = (prevPositions, nextPositions, key) =>
  (prevPositions[key]?.x ?? 0) === (nextPositions[key]?.x ?? 0) &&
  (prevPositions[key]?.y ?? 0) === (nextPositions[key]?.y ?? 0);

const areEqual = (prev, next) =>
  prev.isDark === next.isDark &&
  prev.handleMagneticMove === next.handleMagneticMove &&
  prev.handleMagneticLeave === next.handleMagneticLeave &&
  samePoint(prev.magneticPositions, next.magneticPositions, 'award-essay') &&
  samePoint(prev.magneticPositions, next.magneticPositions, 'award-scaler');

export default React.memo(AwardsSection, areEqual);
