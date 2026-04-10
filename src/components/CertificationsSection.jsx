import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap } from 'lucide-react';
import scalerCertificate from '../assets/scaler_certificate.jpg';
import googleStartupCertificate from '../assets/google_startup_school_certificate_Divyanshu_Tiwari.jpg';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

export default function CertificationsSection({ isDark }) {
  return (
    <section id="certifications" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-10 animate-float-slow"></div>

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
              Professional Development
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">Certifications</h2>
          <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Continuous learning and skill validation through recognized programs
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Certification 1: Certificate of Excellence */}
          <motion.div variants={staggerItem}>
            <div className={`group p-10 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 font-poppins">Certificate of Excellence</h3>
                  <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    Scaler School of Technology
                  </div>
                  <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Young Innovators Internship Challenge
                  </p>
                </div>
              </div>

              {/* Certificate Image */}
              <img
                src={scalerCertificate}
                alt="Certificate of Excellence from Scaler School of Technology"
                loading="lazy"
                className="w-full rounded-xl object-cover transform transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Certification 2: Startup School */}
          <motion.div variants={staggerItem}>
            <div className={`group p-10 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 font-poppins leading-tight">Startup School: Prompt to Prototype "Certificate of Completion"</h3>
                  <div className={`text-sm font-semibold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                    Google for Startups x Scaler
                  </div>
                  <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Comprehensive startup development program
                  </p>
                </div>
              </div>

              {/* Certificate Image */}
              <img
                src={googleStartupCertificate}
                alt="Google Startup School certificate for Divyanshu Tiwari"
                loading="lazy"
                className="w-full rounded-xl object-cover transform transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
