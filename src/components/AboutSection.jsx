import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Code, ChevronRight, Zap, Target, Lightbulb, Sparkles } from 'lucide-react';
import { fadeInUp } from '../utils/animations';

export default function AboutSection({ isDark }) {
  return (
    <section id="about" className="py-24 px-6">
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
              Core Competencies
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">What I Bring</h2>
          <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            A unique blend of creative excellence and technical learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Users, title: 'Leadership', gradient: 'from-amber-500 to-orange-500', skills: ['Team Leadership', 'Project Coordination', 'Problem Solving', 'Strategic Planning'] },
            { icon: BookOpen, title: 'Creative', gradient: 'from-orange-500 to-red-500', skills: ['Creative Writing', 'AI Prompting'] },
            { icon: Code, title: 'Technical', gradient: 'from-yellow-500 to-amber-600', skills: ['HTML & CSS', 'Prompt Engineering', 'Python', 'AI Development'] }
          ].map((category, index) => (
            <div key={index} className={`group p-10 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}>
              <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-poppins">{category.title}</h3>
              <ul className={`space-y-2 font-roboto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {category.skills.map((skill, i) => (
                  <li key={i} className="flex items-center group-hover:translate-x-2 transition-transform duration-300">
                    <ChevronRight className="w-4 h-4 mr-2 text-orange-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`p-10 rounded-3xl backdrop-blur-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
          <h3 className="text-3xl font-bold mb-8 text-center font-poppins">Learning Journey</h3>
          <div className="space-y-8">
            {[
              {
                category: 'Frontend',
                skills: [
                  { name: 'HTML & CSS', icon: Code, percent: 65 },
                  { name: 'Frontend Development using AI', icon: Zap, percent: 70 }
                ]
              },
              {
                category: 'Backend',
                skills: [
                  { name: 'Python', icon: Target, percent: 25 }
                ]
              },
              {
                category: 'Tools & AI',
                skills: [
                  { name: 'Vibe Coding', icon: Lightbulb, percent: 75 },
                  { name: 'AI Prompting/Prompt Engineering', icon: Sparkles, percent: 85 }
                ]
              }
            ].map((category, catIndex) => (
              <div key={catIndex}>
                <h4 className="text-xl font-bold mb-4 font-poppins bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">{category.category}</h4>
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="space-y-2 group hover:scale-105 transition-transform duration-300">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <skill.icon className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
                          <span className="font-poppins">{skill.name}</span>
                        </div>
                        <span className="text-sm font-bold text-orange-500 font-poppins">{skill.percent}%</span>
                      </div>
                      <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full relative overflow-hidden" style={{ width: `${skill.percent}%`, transition: 'width 1s ease-out' }}>
                          <div className="absolute inset-0 shimmer"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
