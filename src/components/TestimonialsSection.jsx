import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

export default function TestimonialsSection({ isDark }) {
  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-float-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-10 animate-float-slow" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-montserrat">
              Social Proof
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">Testimonials</h2>
          <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Kind words from teachers, mentors, and collaborators
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              quote: "Divyanshu demonstrates exceptional initiative and curiosity. He consistently goes beyond the classroom, applying technology to real problems and inspiring his peers to do the same.",
              name: "Mr. Rakesh Sharma",
              role: "Computer Science Teacher, C.S. DAV Public School",
              initials: "RS",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              quote: "Working with Divyanshu during the Young Innovators Internship was a great experience. His ability to leverage AI tools and translate ideas into working prototypes stood out among the cohort.",
              name: "Scaler Mentor",
              role: "Scaler School of Technology",
              initials: "SM",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              quote: "As Deputy Head Boy, Divyanshu showed true leadership — organised, empathetic, and always ready to bridge the gap between students and administration with maturity beyond his years.",
              name: "School Administration",
              role: "C.S. DAV Public School",
              initials: "SA",
              gradient: "from-amber-500 to-orange-500"
            }
          ].map((testimonial, index) => (
            <motion.div key={index} variants={staggerItem}>
              <div className={`group relative p-8 rounded-3xl backdrop-blur-xl border h-full flex flex-col hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-purple-500/50' : 'bg-white/50 border-slate-200 hover:border-purple-500/50'}`}>
                <Quote className={`w-10 h-10 mb-4 opacity-50 bg-gradient-to-r ${testimonial.gradient} bg-clip-text`} aria-hidden="true" style={{ color: 'transparent', background: `linear-gradient(to right, ${index === 0 ? '#a855f7, #ec4899' : index === 1 ? '#3b82f6, #06b6d4' : '#f59e0b, #f97316'})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
                <p className={`flex-1 mb-6 font-roboto leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center flex-shrink-0 text-white font-bold font-poppins`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className={`font-bold font-poppins ${isDark ? 'text-white' : 'text-slate-900'}`}>{testimonial.name}</div>
                    <div className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
