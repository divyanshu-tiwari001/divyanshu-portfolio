import React, { useState, useEffect } from 'react';
import { Moon, Sun, Award, Code, Lightbulb, Users, Mail, Phone, MapPin, Github, Linkedin, Twitter, ChevronRight, Star, Trophy, BookOpen, Zap, Target, X } from 'lucide-react';

export default function PremiumStudentPortfolio() {
  const [isDark, setIsDark] = useState(true);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>


      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        
        {/* Designer Credit Popup */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur">
            <div className={`max-w-md mx-4 p-8 rounded-3xl shadow-2xl ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
              <button onClick={() => setShowPopup(false)} className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text">
                Welcome to My Portfolio
              </h3>
              <p className={`text-lg mb-6 text-center ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Designed with passion and precision by Divyanshu Tiwari and executed by Claude.
              </p>
              <button onClick={() => setShowPopup(false)} className="w-full px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg">
                Explore my creation 
              </button>
            </div>
          </div>
        )}

        {/* Fixed Navigation */}
        <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text">
              DT
            </div>
            <div className="hidden md:flex items-center space-x-8 font-inter font-semibold">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>About</a>
              <a href="#achievements" onClick={(e) => { e.preventDefault(); scrollTo('achievements'); }} className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Achievements</a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }} className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Skills</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Contact</a>
            </div>
            <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-full hover:scale-110 transition-transform ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
          {/* Floating Background Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-20 animate-float-delay-2"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-float-delay-4"></div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block px-6 py-2 mb-6 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30">
              <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                Emerging Developer & Creative Leader
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight font-playfair">
              Hi, I'm <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text">Divyanshu Tiwari</span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-cormorant ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              A passionate student on a journey to master web development, blending creative writing excellence with cutting-edge technical skills and AI-powered innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={() => scrollTo('achievements')} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/50">
                View Achievements
              </button>
              <button onClick={() => scrollTo('contact')} className={`px-8 py-4 text-lg font-bold rounded-full border-2 border-orange-500 transition-all duration-300 ${isDark ? 'text-orange-400 hover:bg-orange-500 hover:text-white' : 'text-orange-600 hover:bg-orange-600 hover:text-white'}`}>
                Get in Touch
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Award, value: '10+', label: 'Certifications' },
                { icon: BookOpen, value: '200+', label: 'Learning Hours' },
                { icon: Trophy, value: '3+', label: 'Competition Wins' }
              ].map((stat, index) => (
                <div key={index} className={`p-8 rounded-3xl backdrop-blur-xl border hover:-translate-y-2 transition-all duration-500 shadow-xl ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-orange-500" />
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text">
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

        {/* Trust Indicators Bar */}
        <section className={`py-12 border-t border-b ${isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white/30'}`}>
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, label: 'Award Winner', desc: 'First Prize Essay' },
              { icon: Code, label: 'Code.org Certified', desc: 'Hour of Code' },
              { icon: Lightbulb, label: 'NITI Aayog', desc: 'ATL Participant' },
              { icon: Users, label: 'Team Leader', desc: 'Proven Skills' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <item.icon className="w-10 h-10 mx-auto mb-3 text-orange-500" />
                <div className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</div>
                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* About and Skills Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30">
                <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                  Core Competencies
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">What I Bring to the Table</h2>
              <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                A unique blend of creative excellence, technical learning, and leadership capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: Users,
                  title: 'Leadership & Management',
                  gradient: 'from-amber-500 to-orange-500',
                  skills: ['Team Leadership', 'Project Coordination', 'Creative Problem Solving', 'Strategic Planning', 'Finance Management', 'Team Management' ]
                },
                {
                  icon: BookOpen,
                  title: 'Creative & Communication',
                  gradient: 'from-orange-500 to-red-500',
                  skills: ['Creative Writing', 'AI Prompting']
                },
                {
                  icon: Code,
                  title: 'Technical Learning',
                  gradient: 'from-yellow-500 to-amber-600',
                  skills: ['HTML & CSS', 'JavaScript', 'Python', 'AI-Assisted Development']
                }
              ].map((category, index) => (
                <div key={index} className={`group p-10 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                  <ul className={`space-y-2 mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {category.skills.map((skill, i) => (
                      <li key={i} className="flex items-center">
                        <ChevronRight className="w-4 h-4 mr-2 text-orange-500" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => alert(`Learn more about ${category.title} - this would link to detailed information in a full implementation`)} className="text-orange-500 font-semibold flex items-center hover:gap-2 transition-all duration-300">
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>

            {/* Learning Progress */}
            <div className={`p-10 rounded-3xl backdrop-blur-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
              <h3 className="text-3xl font-bold mb-8 text-center">Current Learning Journey</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: 'HTML & CSS', icon: Code, percent: 5 },
                  { name: 'JavaScript', icon: Zap, percent: 0 },
                  { name: 'Python', icon: Target, percent: 10 },
                  { name: 'AI-Assisted Coding', icon: Lightbulb, percent: 80 }
                ].map((skill, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <skill.icon className="w-5 h-5 text-orange-500" />
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-sm font-bold text-orange-500">{skill.percent}%</span>
                    </div>
                    <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-1000 rounded-full" style={{ width: `${skill.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30">
                <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                  Recognition & Milestones
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">My Achievements</h2>
              <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Recognized excellence in creative writing, programming education, and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'First Prize - Essay Writing',
                  org: 'Amity University, Patna',
                  desc: 'Won first place in essay writing competition on the topic "One Nation, One Election," demonstrating exceptional creative writing and analytical skills.',
                  icon: Trophy,
                  gradient: 'from-amber-500 to-orange-500',
                  year: '2024'
                },
                {
                  title: 'Hour of Code Certificates',
                  org: 'Code.org',
                  desc: 'Earned multiple Hour of Code certificates, showcasing dedication to learning programming fundamentals and problem-solving.',
                  icon: Code,
                  gradient: 'from-blue-500 to-cyan-500',
                  year: '2023-2024'
                },
                {
                  title: 'ATL Tinkerprenuer',
                  org: 'NITI Aayog',
                  desc: 'Participated in the ATL Tinkerprenuer initiative, engaging with innovation and entrepreneurship in technology.',
                  icon: Lightbulb,
                  gradient: 'from-green-500 to-emerald-500',
                  year: '2024'
                }
              ].map((achievement, index) => (
                <div key={index} className={`group relative p-8 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-slate-800 text-amber-400' : 'bg-slate-100 text-orange-600'}`}>
                    {achievement.year}
                  </div>
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${achievement.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
                  <div className={`text-sm font-semibold mb-4 ${isDark ? 'text-amber-400' : 'text-orange-600'}`}>{achievement.org}</div>
                  <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{achievement.desc}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Detail Section */}
        <section id="skills" className={`py-24 px-6 ${isDark ? 'bg-slate-900/30' : 'bg-white/30'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30">
                <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text font-montserrat">
                  Technical & Soft Skills
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">Complete Skill Set</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-10 rounded-3xl backdrop-blur-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Code className="w-6 h-6 text-orange-500" />
                  Technical Skills
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'HTML & CSS', level: 'Beginner' },
                    { name: 'JavaScript', level: 'Learning' },
                    { name: 'Python', level: 'Learning' },
                    { name: 'AI-Assisted Coding', level: 'Advanced' },
                    { name: 'Vibe Coding', level: 'Proficient' }
                  ].map((skill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{skill.name}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-10 rounded-3xl backdrop-blur-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-orange-500" />
                  Soft Skills
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Leadership', level: 'Proven' },
                    { name: 'Team Management', level: 'Experienced' },
                    { name: 'Creative Writing', level: 'Award-Winning' },
                    { name: 'AI Prompting', level: 'Strong' },
                    { name: 'Problem Solving', level: 'Good' },
                    { name: 'Finance Management', level: 'Good' }
                  ].map((skill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{skill.name}</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-90"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl opacity-10 animate-float-delay-2"></div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm">
                <span className="text-sm font-bold uppercase tracking-wider text-white font-montserrat">
                  Let's Connect
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 text-white font-playfair">Ready to Collaborate?</h2>
              <p className="text-xl max-w-2xl mx-auto text-white/90">
                I'm always open to discussing new opportunities, collaborations, and learning experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Mail, label: 'Email', value: 'divyanshutiwari@duck.com', link: 'mailto:divyanshutiwari@duck.com' },
                { icon: Phone, label: 'Phone', value: '+91 9955888527', link: 'tel:+919955888527' },
                { icon: MapPin, label: 'Location', value: 'Motihari, Bihar, India', link: null }
              ].map((contact, index) => (
                <div key={index} className="p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 hover:-translate-y-2 transition-all duration-300">
                  <contact.icon className="w-8 h-8 text-white mb-4" />
                  <div className="text-sm font-semibold text-white/80 mb-2">{contact.label}</div>
                  {contact.link ? (
                    <a href={contact.link} className="text-white font-semibold hover:underline">{contact.value}</a>
                  ) : (
                    <div className="text-white font-semibold">{contact.value}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-6">
              {[
                { icon: Github, link: 'https://github.com/divyanshu-tiwari001' },
                { icon: Linkedin, link: 'https://www.linkedin.com/in/its-tiwari/' },
                { icon: Twitter, link: 'https://x.com/Divyanshut011' }
              ].map((social, index) => (
                <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="group p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-orange-600 transition-all duration-300 hover:scale-110">
                  <social.icon className="w-6 h-6 text-white group-hover:text-orange-600" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-6 border-t ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white/50'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text">
              Divyanshu Tiwari
            </div>
            <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Emerging Developer | Creative Leader | Lifelong Learner
            </p>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              © 2025 Designed & Built by <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text font-bold">Divyanshu Tiwari</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}