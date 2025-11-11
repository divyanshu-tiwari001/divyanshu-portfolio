import React, { useState, useEffect } from 'react';
import { Moon, Sun, Award, Code, Lightbulb, Users, Mail, Phone, MapPin, Github, Linkedin, Twitter, ChevronRight, Star, Trophy, BookOpen, Zap, Target, X, Send, GraduationCap, Calendar, Briefcase, Sparkles } from 'lucide-react';

export default function PremiumStudentPortfolio() {
  const [isDark, setIsDark] = useState(true);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&family=Inter:wght@400;600;700&family=Montserrat:wght@600;700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay-2 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-float-delay-4 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 4s;
        }
        .animate-float-slow {
          animation: floatSlow 20s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        .animate-slide-left {
          animation: slideInFromLeft 0.6s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideInFromRight 0.6s ease-out forwards;
        }
        .animate-slide-bottom {
          animation: slideInFromBottom 0.6s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-roboto { font-family: 'Roboto', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        
        {/* Enhanced Welcome Popup */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-scale-in">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-float-slow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 animate-float-slow" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className={`relative max-w-lg mx-4 p-10 rounded-3xl shadow-2xl border-2 animate-scale-in ${isDark ? 'bg-slate-900 border-orange-500/30' : 'bg-white border-orange-500/50'}`}>
              <button 
                onClick={() => setShowPopup(false)} 
                className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 hover:rotate-90 ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-3 text-center bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text animate-gradient font-poppins">
                Welcome to My Digital Space
              </h3>
              
              <p className={`text-lg mb-4 text-center font-roboto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Crafted with passion by <span className="font-bold text-orange-500">Divyanshu Tiwari</span>
              </p>
              
              <p className={`text-sm mb-6 text-center font-roboto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Exploring the intersection of creativity, technology, and innovation
              </p>
              
              <div className="flex gap-3 mb-6">
                <div className={`flex-1 p-3 rounded-xl text-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div className="text-2xl font-bold text-orange-500 font-poppins">10+</div>
                  <div className={`text-xs font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Certificates</div>
                </div>
                <div className={`flex-1 p-3 rounded-xl text-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div className="text-2xl font-bold text-orange-500 font-poppins">3+</div>
                  <div className={`text-xs font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Awards</div>
                </div>
                <div className={`flex-1 p-3 rounded-xl text-center ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div className="text-2xl font-bold text-orange-500 font-poppins">200+</div>
                  <div className={`text-xs font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Hours Learning</div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowPopup(false)} 
                className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:scale-105 hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 font-poppins relative overflow-hidden group"
              >
                <span className="relative z-10">Explore My Journey</span>
                <div className="absolute inset-0 shimmer"></div>
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text font-poppins hover:scale-110 transition-transform duration-300 cursor-pointer">
              DT
            </div>
            <div className="hidden md:flex items-center space-x-8 font-poppins font-semibold">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Home</a>
              <a href="#education" onClick={(e) => { e.preventDefault(); scrollTo('education'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Education</a>
              <a href="#achievements" onClick={(e) => { e.preventDefault(); scrollTo('achievements'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Achievements</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>About</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Contact</a>
            </div>
            <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-full hover:scale-110 hover:rotate-180 transition-all duration-500 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-20 animate-float-delay-2"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-float-delay-4"></div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block px-6 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 animate-slide-bottom hover:scale-105 transition-transform duration-300">
              <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                Emerging Developer & Creative Leader
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight font-playfair animate-scale-in">
              Hi, I'm <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text animate-gradient">Divyanshu Tiwari</span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-poppins animate-slide-bottom ${isDark ? 'text-slate-300' : 'text-slate-600'}`} style={{ animationDelay: '0.2s' }}>
              A passionate 16-year-old developer from Bihar, India, focused on building user-friendly websites and apps. I use my creative skills to turn complex code into simple, effective solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-bottom" style={{ animationDelay: '0.4s' }}>
              <button onClick={() => scrollTo('achievements')} className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-bold rounded-full hover:scale-105 hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 font-poppins relative overflow-hidden">
                <span className="relative z-10">View Achievements</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button onClick={() => scrollTo('contact')} className={`px-8 py-4 text-lg font-bold rounded-full border-2 border-orange-500 transition-all duration-300 font-poppins hover:scale-105 hover:shadow-xl ${isDark ? 'text-orange-400 hover:bg-orange-500 hover:text-white' : 'text-orange-600 hover:bg-orange-600 hover:text-white'}`}>
                Get in Touch
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Award, value: '10+', label: 'Certifications', delay: '0.1s' },
                { icon: BookOpen, value: '200+', label: 'Learning Hours', delay: '0.2s' },
                { icon: Trophy, value: '3+', label: 'Competition Wins', delay: '0.3s' }
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

        {/* Trust Indicators */}
        <section className={`py-12 border-t border-b ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white/30'}`}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, label: 'Award Winner', desc: 'First Prize Essay' },
              { icon: Code, label: 'Code.org Certified', desc: 'Hour of Code' },
              { icon: Lightbulb, label: 'NITI Aayog', desc: 'ATL Participant' },
              { icon: Users, label: 'Team Leader', desc: 'Proven Skills' }
            ].map((item, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <item.icon className="w-10 h-10 mx-auto mb-3 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
                <div className={`font-bold mb-1 font-poppins ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</div>
                <div className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-10 animate-float-slow"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                  Academic Journey
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">My Education</h2>
              <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Building a strong foundation for tomorrow's innovations
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}>
                
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
                      Class 11th
                    </span>
                  </div>
                  <div className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Senior Secondary (Classes 11-12) • Expected Completion: 2027
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
                    <span className="text-sm font-bold text-orange-500">Year 1 of 2</span>
                  </div>
                  <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full transition-all duration-1000 relative overflow-hidden" style={{ width: '50%' }}>
                      <div className="absolute inset-0 shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                  Recognition & Milestones
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">My Achievements</h2>
              <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Recognized excellence in creative writing, programming education, and innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div key={index} className={`group relative p-8 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 overflow-hidden ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}>
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
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                  Core Competencies
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">What I Bring</h2>
              <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                A unique blend of creative excellence and technical learning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                { icon: Users, title: 'Leadership', gradient: 'from-amber-500 to-orange-500', skills: ['Team Leadership', 'Project Coordination', 'Problem Solving', 'Strategic Planning'] },
                { icon: BookOpen, title: 'Creative', gradient: 'from-orange-500 to-red-500', skills: ['Creative Writing', 'AI Prompting'] },
                { icon: Code, title: 'Technical', gradient: 'from-yellow-500 to-amber-600', skills: ['HTML & CSS', 'JavaScript', 'Python', 'AI Development'] }
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: 'HTML & CSS', icon: Code, percent: 5 },
                  { name: 'JavaScript', icon: Zap, percent: 0 },
                  { name: 'Python', icon: Target, percent: 10 },
                  { name: 'Vibe Coding', icon: Lightbulb, percent: 80 },
                   { name: 'AI Prompting/Prompt Engineering', icon: Sparkles, percent: 75 }
                ].map((skill, index) => (
                  <div key={index} className="space-y-3 group hover:scale-105 transition-transform duration-300">
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
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className={`py-24 px-6 ${isDark ? 'bg-slate-900/30' : 'bg-white/30'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                  Technologies
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">My Tech Stack</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'HTML5', icon: '🌐' }, { name: 'CSS3', icon: '🎨' }, { name: 'JavaScript', icon: '⚡' },
                { name: 'Python', icon: '🐍' }, { name: 'Node.js', icon: '🟢' }, { name: 'React', icon: '⚛️' },
                { name: 'Tailwind', icon: '💨' }, { name: 'Git', icon: '📦' }, { name: 'AI Tools', icon: '🤖' },
                { name: 'Netlify', icon: '🚀' }, { name: 'VS Code', icon: '💻' }, { name: 'Claude', icon: '🧠' },{ name: 'Gemini', icon: '✨' }, { name: 'ChatGPT', icon: '💬' }
              ].map((tech, index) => (
                <div key={index} className={`group p-6 rounded-2xl backdrop-blur-xl border hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}>
                  <div className="text-4xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {tech.icon}
                  </div>
                  <div className={`text-sm font-semibold font-poppins ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-10 animate-float-slow"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                  Professional Journey
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">Work Experience</h2>
              <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Currently focused on building skills and preparing for future opportunities
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}>
                
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Briefcase className="w-10 h-10 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'}`}>
                      Student & Aspiring Developer
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text">
                      Building Foundation
                    </h3>
                    <div className={`text-lg font-semibold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                      Currently Focusing on Skill Development
                    </div>
                  </div>
                </div>

                <div className={`mt-6 p-6 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100/50'}`}>
                  <h4 className="font-bold font-poppins mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                    Current Focus Areas
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Learning Web Development',
                      'Building Personal Projects',
                      'Enhancing Problem-Solving Skills',
                      'Exploring AI & Machine Learning',
                      'Participating in Competitions',
                      'Contributing to Open Source'
                    ].map((focus, index) => (
                      <div key={index} className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span className={`text-sm font-roboto ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`mt-6 p-6 rounded-2xl border-2 border-dashed ${isDark ? 'border-slate-700 bg-slate-800/30' : 'border-slate-300 bg-slate-50'}`}>
                  <div className="text-center">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-orange-500 animate-pulse" />
                    <h4 className="font-bold font-poppins mb-2">Open to Opportunities</h4>
                    <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Actively seeking internships, freelance projects, and collaborative opportunities to apply my skills and gain real-world experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-90 animate-gradient"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl opacity-10 animate-float-delay-2"></div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-bold uppercase tracking-wider text-white font-montserrat">
                  Let's Connect
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 text-white font-playfair">Ready to Collaborate?</h2>
              <p className="text-xl max-w-2xl mx-auto text-white/90 font-poppins">
                I'm always open to new opportunities and learning experiences
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'divyanshutiwari@duck.com', link: 'mailto:divyanshutiwari@duck.com' },
                  { icon: Phone, label: 'Phone', value: '+91 9955888527', link: 'tel:+919955888527' },
                  { icon: MapPin, label: 'Location', value: 'Motihari, Bihar, India', link: null }
                ].map((contact, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:-translate-y-2 hover:scale-105 transition-all duration-300 group">
                    <div className="flex items-center gap-4">
                      <contact.icon className="w-8 h-8 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                      <div>
                        <div className="text-sm font-semibold text-white/80 font-roboto mb-1">{contact.label}</div>
                        {contact.link ? (
                          <a href={contact.link} className="text-white font-semibold hover:underline font-poppins">{contact.value}</a>
                        ) : (
                          <div className="text-white font-semibold font-poppins">{contact.value}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-center lg:justify-start gap-4 pt-4">
                  {[
                    { icon: Github, link: 'https://github.com/divyanshu-tiwari001' },
                    { icon: Linkedin, link: 'https://www.linkedin.com/in/its-tiwari/' },
                    { icon: Twitter, link: 'https://x.com/Divyanshut011' }
                  ].map((social, index) => (
                    <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="group p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-125 hover:rotate-12">
                      <social.icon className="w-6 h-6 text-white group-hover:text-orange-600" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins flex items-center gap-2">
                  <Send className="w-6 h-6" />
                  Send Me a Message
                </h3>
                
                <form 
                  action="https://formsubmit.co/divyanshutiwari@duck.com" 
                  method="POST"
                  className="space-y-4"
                >
                  {/* Hidden fields for FormSubmit configuration */}
                  <input type="hidden" name="_subject" value="New message from Portfolio!" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  
                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 1234567890 (optional)"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      placeholder="Tell me about your project, idea, or just say hi..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 resize-none font-roboto"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 font-poppins relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      Send Message
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>

                  <p className="text-xs text-white/60 text-center font-roboto">
                    Your message will be sent directly to my email
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-6 border-t ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/50'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text font-poppins hover:scale-110 transition-transform duration-300 inline-block cursor-pointer">
              Divyanshu Tiwari
            </div>
            <p className={`mb-6 font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Emerging Developer | Creative Leader | Lifelong Learner
            </p>
            <p className={`text-sm font-roboto ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              © 2025 Designed & Built by <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text font-bold">Divyanshu Tiwari</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
