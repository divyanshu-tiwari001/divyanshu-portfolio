import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Trophy, Code, Lightbulb, Star } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

function AchievementsSection({ isDark }) {
  return (
    <section id="achievements" className="py-24 px-6">
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
              Recognition & Milestones
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">My Achievements</h2>
          <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Recognized excellence in creative writing, programming education, and innovation
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'First Prize - Essay Writing',
              org: 'Amity University, Patna',
              desc: 'Won first place in essay writing competition on "One Nation, One Election"',
              icon: Trophy,
              gradient: 'from-amber-500 to-orange-500',
              year: '2024'
            },
            {
              title: 'Hour of Code',
              org: 'Code.org',
              desc: 'Multiple certificates showcasing dedication to programming fundamentals',
              icon: Code,
              gradient: 'from-blue-500 to-cyan-500',
              year: '2023-2024'
            },
            {
              title: 'ATL Tinkerprenuer',
              org: 'NITI Aayog',
              desc: 'Participated in innovation and entrepreneurship initiative',
              icon: Lightbulb,
              gradient: 'from-green-500 to-emerald-500',
              year: '2024'
            }
          ].map((achievement, index) => (
            <motion.div key={index} variants={staggerItem}>
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
                  className={`group relative p-8 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 overflow-hidden ${
                    index === 0
                      ? isDark ? 'bg-slate-900/70 border-slate-700/50' : 'bg-white/70 border-slate-300/50'
                      : isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'
                  }`}
                  style={index === 0 ? {
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                  } : undefined}
                >
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-orange-600'}`}>
                    {achievement.year}
                  </div>
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${achievement.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-poppins">{achievement.title}</h3>
                  <div className={`text-sm font-semibold mb-4 ${isDark ? 'text-amber-400' : 'text-orange-600'}`}>{achievement.org}</div>
                  <p className={`mb-6 font-roboto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{achievement.desc}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const areEqual = (prev, next) =>
  prev.isDark === next.isDark;

export default React.memo(AchievementsSection, areEqual);
