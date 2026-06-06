import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { HeartHandshake, Users, Briefcase, Rocket, Trophy, GraduationCap, MapPin, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';

function WorkExperienceSection({ isDark }) {
  return (
    <section id="experience" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-10 animate-float-slow"></div>

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
              Professional Journey
            </span>
          </div>
          <h2 className="text-5xl font-bold mb-6 font-playfair">Work Experience</h2>
          <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Building real-world skills through diverse professional experiences
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Experience 1: Pehchaan The Street School (Trust) - Social Media Coordinator */}
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
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-emerald-500/50' : 'bg-white/50 border-slate-200 hover:border-emerald-500/50'}`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <HeartHandshake className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-500/20 text-cyan-600'}`}>
                      Present • 2 months
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-emerald-500 to-cyan-600 bg-clip-text">
                      Social Media Coordinator
                    </h3>
                    <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                      Pehchaan The Street School (Trust) • Internship
                    </div>
                    <div className={`flex items-center gap-4 mb-4 flex-wrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-roboto">May 2026 - Present</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">Remote</span>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'}`}>
                      <ul className={`space-y-3 font-roboto ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-cyan-500 flex-shrink-0" />
                          <span>Coordinated social media promotion and outreach activities across multiple digital platforms.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-cyan-500 flex-shrink-0" />
                          <span>Amplified nonprofit campaigns by sharing and distributing content through Facebook, Instagram, WhatsApp, YouTube, and other channels.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-cyan-500 flex-shrink-0" />
                          <span>Supported audience growth and engagement through strategic content dissemination.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-cyan-500 flex-shrink-0" />
                          <span>Collaborated with volunteers and team members to increase awareness of educational and community initiatives.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-cyan-500 flex-shrink-0" />
                          <span>Assisted in promoting campaigns, announcements, fundraising efforts, and awareness programs.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-cyan-500 flex-shrink-0" />
                          <span>Contributed to digital marketing efforts aimed at expanding the organization&apos;s online presence and impact.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-cyan-500 flex-shrink-0" />
                          <span>Ensured consistent messaging and brand representation across social media platforms.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Experience 2: EM AUR - Consolidated */}
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
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                      Completed • 4 months
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text">
                      EM AUR
                    </h3>
                    <div className={`flex items-center gap-4 mb-4 flex-wrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-roboto">December 2025 - April 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">Remote</span>
                      </div>
                    </div>

                    {/* Multiple Roles */}
                    <div className="space-y-3 mt-4">
                      <div className={`flex items-center gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>
                          Social Media Manager
                        </div>
                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>December 2025 - April 2026</span>
                      </div>
                      <div className={`flex items-center gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>
                          Social Media Coordinator
                        </div>
                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>December 2025 - April 2026</span>
                      </div>
                      <div className={`flex items-center gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>
                          Technical Team Member
                        </div>
                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>December 2025 - April 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Experience 2: Novaa Speed - Co-Founder */}
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
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Rocket className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900"></div>
                  </div>

                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                      Completed • 7 months
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-violet-500 to-fuchsia-600 bg-clip-text">
                      Co-Founder
                    </h3>
                    <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                      Novaa Speed • A Digital Agency
                    </div>
                    <div className={`flex items-center gap-4 mb-4 flex-wrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-roboto">September 2025 - April 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">Remote</span>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'}`}>
                      <ul className={`space-y-3 font-roboto ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" />
                          <span>Website development for business and startup clients</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" />
                          <span>Ad campaign planning, management, and performance optimization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" />
                          <span>Social media management and related digital growth services</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Experience 3: Nexstep Network - Project Intern */}
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
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Briefcase className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                      Completed • 5 months
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text">
                      Project Intern
                    </h3>
                    <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                      Nexstep Network
                    </div>
                    <div className={`flex items-center gap-4 mb-4 flex-wrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-roboto">October 2025 - February 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">Remote</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Experience 4: C.S. DAV Public School - Deputy Head Boy */}
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
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Trophy className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                      Completed • 11 months
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text">
                      Deputy Head Boy
                    </h3>
                    <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                      C.S. DAV Public School
                    </div>
                    <div className={`flex items-center gap-4 mb-4 flex-wrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-roboto">May 2025 - February 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">On-site</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Experience 5: Muskurahat Foundation - Fundraising Intern */}
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
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900"></div>
                  </div>

                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'}`}>
                      Completed • 3 months
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text">
                      Fundraising Intern
                    </h3>
                    <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                      Muskurahat Foundation
                    </div>
                    <div className={`flex items-center gap-4 mb-4 flex-wrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-roboto">October 2025 - December 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">Remote</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Experience 6: Scaler School of Technology - Student Intern */}
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
                className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <GraduationCap className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-slate-900"></div>
                  </div>

                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'}`}>
                      Completed • 3 months
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text">
                      Student Intern
                    </h3>
                    <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                      Scaler School of Technology
                    </div>
                    <div className={`flex items-center gap-4 mb-4 flex-wrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-roboto">September 2025 - November 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">Remote</span>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'}`}>
                      <h4 className="font-bold font-poppins mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-orange-500" />
                        Young Innovators Internship Challenge Edition 5
                      </h4>
                      <ul className={`space-y-3 font-roboto ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" />
                          <span>Participated in the Young Innovators Internship Challenge Edition 5 at Scaler School of Technology</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" />
                          <span>Collaborated with fellow interns to brainstorm and develop innovative solutions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" />
                          <span>Engaged in hands-on projects that enhanced technical and problem-solving skills</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-1 text-orange-500 flex-shrink-0" />
                          <span>Gained valuable insights into the startup ecosystem and technology industry</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Open to More Opportunities Card */}
          <motion.div variants={staggerItem}>
            <div className={`p-10 rounded-3xl border-2 border-dashed backdrop-blur-xl transition-all duration-500 ${isDark ? 'border-slate-700 bg-slate-800/30' : 'border-slate-300 bg-slate-50'}`}>
              <div className="text-center">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-orange-500 animate-pulse" />
                <h4 className="font-bold font-poppins mb-2">Open to More Opportunities</h4>
                <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Actively seeking internships, freelance projects, and collaborative opportunities to apply my skills and gain real-world experience
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const areEqual = (prev, next) =>
  prev.isDark === next.isDark;

export default React.memo(WorkExperienceSection, areEqual);
