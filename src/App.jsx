import React, { useState, useEffect } from 'react';
import { Moon, Sun, Award, Code, Lightbulb, Users, Mail, Phone, MapPin, Github, Linkedin, Twitter, ChevronRight, Star, Trophy, BookOpen, Zap, Target, X, Instagram, Send, GraduationCap, Calendar, Briefcase, Sparkles, Languages } from 'lucide-react';
import dtLogo from './assets/dt_logo.png';
import scalerCertificate from './assets/scaler_certificate.jpg';
import scalerOnboardingKit from './assets/scaler_onboarding_kit.jpg';
import googleStartupCertificate from './assets/google_startup_school_certificate_Divyanshu_Tiwari.jpg';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import Tilt from 'react-parallax-tilt';
import CustomCursor from './components/CustomCursor';
import { initializeContentProtection, cleanupContentProtection } from './utils/contentProtection';

// Custom Codecademy logo icon (official "cc" circle mark)
const CodecademyIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} role="img" aria-label="Codecademy">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.26 16.408c-.88.512-1.857.77-2.928.77-1.6 0-2.903-.5-3.908-1.498C2.9 14.682 2.397 13.392 2.397 12c0-1.392.503-2.682 1.507-3.68C4.91 7.322 6.213 6.822 7.812 6.822c1.057 0 2.022.252 2.893.755.87.503 1.55 1.207 2.04 2.11l-2.08 1.21c-.272-.562-.64-.994-1.1-1.296a2.847 2.847 0 0 0-1.584-.45c-.863 0-1.565.287-2.106.862-.54.574-.81 1.3-.81 2.176 0 .875.27 1.6.81 2.174.541.575 1.243.862 2.106.862.603 0 1.137-.153 1.6-.46.463-.306.835-.748 1.115-1.325l2.067 1.197c-.482.904-1.154 1.61-2.018 2.121zm8.65.77c-.879.512-1.857.77-2.928.77-1.6 0-2.903-.5-3.907-1.498-.303-.298-.565-.628-.785-.986l2.067-1.197c.28.577.652 1.019 1.115 1.325.463.307.997.46 1.6.46.864 0 1.566-.287 2.107-.862.54-.575.81-1.3.81-2.174 0-.876-.27-1.602-.81-2.176-.541-.575-1.243-.862-2.107-.862-.578 0-1.1.15-1.564.45-.464.3-.84.733-1.12 1.296l-2.08-1.21c.49-.903 1.17-1.607 2.04-2.11.871-.503 1.836-.755 2.894-.755 1.6 0 2.902.5 3.907 1.498 1.004.998 1.507 2.288 1.507 3.68 0 1.392-.503 2.682-1.507 3.68z"/>
  </svg>
);

const FEATURE_FLAGS = {
  SHOW_PROJECTS: true, // Set to false to hide the Projects section
};

export default function PremiumStudentPortfolio() {
  const [isDark, setIsDark] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const [magneticPositions, setMagneticPositions] = useState({});
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [formErrors, setFormErrors] = useState({});

  const handleMagneticMove = (e, key) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMagneticPositions(prev => ({ ...prev, [key]: { x, y } }));
  };

  const handleMagneticLeave = (key) => {
    setMagneticPositions(prev => ({ ...prev, [key]: { x: 0, y: 0 } }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email address (e.g., name@example.com)';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormStatus('loading');
    
    try {
      // FormSubmit.co requires form-encoded data
      const formElement = e.target;
      const formDataToSend = new FormData(formElement);
      
      // Add hidden fields
      formDataToSend.append('_subject', 'New message from Portfolio!');
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'table');
      
      const response = await fetch('https://formsubmit.co/divyanshutiwari@duck.com', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (response.ok) {
        setFormStatus('success');
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          setFormStatus('idle');
        }, 3000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize comprehensive content protection
  useEffect(() => {
    initializeContentProtection({
      enableDevToolsDetection: true,
      enableScreenCaptureBlocking: true,
      enableRecordingDetection: true,
      enableCanvasProtection: true,
      enableWatermark: true,
      showWarnings: true,
      logAttempts: true
    });

    return () => {
      cleanupContentProtection();
    };
  }, []);

  // Prevent copying and text selection
  useEffect(() => {
    // Helper function to check if element is a form input, editable element, or in contact section
    const isFormInput = (element) => {
      if (!element) return false;
      
      const tagName = element.tagName;
      const isEditable = element.isContentEditable;
      
      // Check if element is within the contact section
      const contactSection = element.closest('#contact');
      if (contactSection) return true; // Allow all interactions in contact section
      
      return tagName === 'INPUT' || 
             tagName === 'TEXTAREA' || 
             tagName === 'SELECT' || 
             isEditable ||
             element.getAttribute('role') === 'textbox';
    };

    // Prevent right-click context menu (except in contact section)
    const handleContextMenu = (e) => {
      if (!isFormInput(e.target)) {
        e.preventDefault();
      }
    };

    // Prevent copy (except in contact section)
    const handleCopy = (e) => {
      if (!isFormInput(e.target)) {
        e.preventDefault();
      }
    };

    // Prevent cut (except in contact section)
    const handleCut = (e) => {
      if (!isFormInput(e.target)) {
        e.preventDefault();
      }
    };

    // Prevent select all (except in contact section)
    const handleSelectAll = (e) => {
      if (e.code === 'KeyA' && (e.ctrlKey || e.metaKey)) {
        if (!isFormInput(e.target)) {
          e.preventDefault();
        }
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);
    document.addEventListener('keydown', handleSelectAll);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      document.removeEventListener('keydown', handleSelectAll);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Framer Motion animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <CustomCursor />
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
                <div className={`flex-1 p-3 rounded-xl text-center ${isDark ? 'bg-slate-800/70' : 'bg-white/70'}`} style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}>
                  <div className="text-2xl font-bold text-orange-500 font-poppins">10+</div>
                  <div className={`text-xs font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Certificates</div>
                </div>
                <div className={`flex-1 p-3 rounded-xl text-center ${isDark ? 'bg-slate-800/70' : 'bg-white/70'}`} style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}>
                  <div className="text-2xl font-bold text-orange-500 font-poppins">3+</div>
                  <div className={`text-xs font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Awards</div>
                </div>
                <div className={`flex-1 p-3 rounded-xl text-center ${isDark ? 'bg-slate-800/70' : 'bg-white/70'}`} style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}>
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
        <nav className={`sticky top-0 z-40 transition-all duration-300 ${isDark ? 'bg-slate-950/70 border-slate-800/50' : 'bg-white/70 border-slate-200/50'} backdrop-filter backdrop-blur-[20px] backdrop-saturate-[180%] border-b`} style={{ 
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)'
        }}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <img
              src={dtLogo}
              alt="DT Logo"
              className="h-10 hover:scale-110 transition-transform duration-300 cursor-pointer"
              onClick={() => scrollTo('home')}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollTo('home')}
              tabIndex={0}
              role="button"
            />
            <div className="hidden md:flex items-center space-x-8 font-poppins font-semibold">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Home</a>
              <a href="#education" onClick={(e) => { e.preventDefault(); scrollTo('education'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Education</a>
              <a href="#achievements" onClick={(e) => { e.preventDefault(); scrollTo('achievements'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Achievements</a>
              <a href="#experience" onClick={(e) => { e.preventDefault(); scrollTo('experience'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Experience</a>
              <a href="#awards" onClick={(e) => { e.preventDefault(); scrollTo('awards'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Awards</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>About</a>
              {FEATURE_FLAGS.SHOW_PROJECTS && (
                <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Projects</a>
              )}
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Contact</a>
            </div>
            <button onClick={() => setIsDark(!isDark)} className={`p-3 rounded-full hover:scale-110 hover:rotate-180 transition-all duration-500 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 px-6 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-96 h-96 bg-amber-500 rounded-full blur-3xl opacity-20 animate-float" 
            style={{ 
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-80 h-80 bg-orange-500 rounded-full blur-3xl opacity-20 animate-float-delay-2" 
            style={{ 
              transform: `translateY(${scrollY * 0.4}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-float-delay-4" 
            style={{ 
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          ></div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-block px-6 py-2 mb-6 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 animate-slide-bottom hover:scale-105 transition-transform duration-300">
              <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text font-montserrat">
                Available for Opportunities
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-playfair animate-scale-in">
              I Build <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text animate-gradient">Digital Experiences</span> That Make an Impact
            </h1>
            
            <div className={`text-2xl md:text-3xl mb-4 font-bold font-poppins ${isDark ? 'text-amber-400' : 'text-orange-600'}`} style={{ minHeight: '45px' }}>
              <Typewriter
                options={{
                  strings: [
                    'AI-Powered Developer',
                    'Prompt Engineer',
                    'Frontend Developer',
                    'Python Programmer',
                    'Creative Problem Solver',
                    'Team Leader'
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 80
                }}
              />
            </div>

            <p className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto font-poppins animate-slide-bottom ${isDark ? 'text-slate-300' : 'text-slate-600'}`} style={{ animationDelay: '0.2s' }}>
              Developer leveraging <strong>AI Prompting, Vibe Coding, HTML &amp; CSS, and Python</strong> to build real-world projects. Currently pursuing senior secondary education, applying hands-on technical and leadership skills across professional and creative domains.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-bottom" style={{ animationDelay: '0.4s' }}>
              <button onClick={() => scrollTo(FEATURE_FLAGS.SHOW_PROJECTS ? 'projects' : 'achievements')} className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-lg font-bold rounded-full hover:scale-105 hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 font-poppins relative overflow-hidden flex items-center justify-center gap-2">
                <span className="relative z-10">View My Projects</span>
                <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button onClick={() => scrollTo('contact')} className={`px-8 py-4 text-lg font-bold rounded-full border-2 border-orange-500 transition-all duration-300 font-poppins hover:scale-105 hover:shadow-xl ${isDark ? 'text-orange-400 hover:bg-orange-500 hover:text-white' : 'text-orange-600 hover:bg-orange-600 hover:text-white'}`}>
                Get in Touch
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Award, value: '10+', label: 'Certificates Earned', delay: '0.1s' },
                { icon: Trophy, value: '3+', label: 'Awards Won', delay: '0.2s' },
                { icon: BookOpen, value: '200+', label: 'Hours of Learning', delay: '0.3s' }
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

        {/* Achievements Section */}
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
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                        transform: `translate(${magneticPositions[`achievement-${index}`]?.x || 0}px, ${magneticPositions[`achievement-${index}`]?.y || 0}px)`,
                        transition: 'transform 0.3s ease-out'
                      } : {
                        transform: `translate(${magneticPositions[`achievement-${index}`]?.x || 0}px, ${magneticPositions[`achievement-${index}`]?.y || 0}px)`,
                        transition: 'transform 0.3s ease-out'
                      }}
                      onMouseMove={(e) => handleMagneticMove(e, `achievement-${index}`)}
                      onMouseLeave={() => handleMagneticLeave(`achievement-${index}`)}
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

        {/* About Section */}
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
                      { name: 'HTML & CSS', icon: Code, percent: 5 },
                      { name: 'Frontend Development using AI', icon: Zap, percent: 60 }
                    ]
                  },
                  { 
                    category: 'Backend', 
                    skills: [
                      { name: 'Python', icon: Target, percent: 10 }
                    ]
                  },
                  { 
                    category: 'Tools & AI', 
                    skills: [
                      { name: 'Vibe Coding', icon: Lightbulb, percent: 70.5 },
                      { name: 'AI Prompting/Prompt Engineering', icon: Sparkles, percent: 89.5 }
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

        {/* Tech Stack */}
        <section id="tech-stack" className={`py-24 px-6 ${isDark ? 'bg-slate-900/30' : 'bg-white/30'}`}>
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
                  Technologies
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">My Tech Stack</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {[
                { name: 'HTML', icon: '🌐' }, { name: 'CSS', icon: '🎨' }, { name: 'Frontend Development', icon: '</>' },
                { name: 'Python', icon: '🐍' }, { name: 'Node.js', icon: '🟢' }, { name: 'React', icon: '⚛️' },
                { name: 'Tailwind', icon: '💨' }, { name: 'GitHub', icon: '📦' }, { name: 'AI Tools', icon: '🤖' }, { name: 'Vercel', icon: '▲' },
                { name: 'Netlify', icon: '🚀' }, { name: 'VS Code', icon: '💻' }, { name: 'Claude', icon: '⚛︎' },{ name: 'Gemini', icon: '✦' }, { name: 'ChatGPT', icon: '֎' },  { name: 'Google AI Studio', icon: '👾' }
              ].map((tech, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <div className={`group p-6 rounded-2xl backdrop-blur-xl border hover:-translate-y-2 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}>
                  <div className="text-4xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {tech.icon}
                  </div>
                  <div className={`text-sm font-semibold font-poppins ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {tech.name}
                  </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        {FEATURE_FLAGS.SHOW_PROJECTS && (
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

              {/* More Projects Coming Soon */}
              <motion.div variants={staggerItem}>
                <div className={`p-10 rounded-3xl border-2 border-dashed backdrop-blur-xl transition-all duration-500 ${isDark ? 'border-slate-700 bg-slate-800/30' : 'border-slate-300 bg-slate-50'}`}>
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-blue-500 animate-pulse" />
                    <h4 className="font-bold font-poppins mb-2">More Projects Coming Soon</h4>
                    <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Currently building more projects with Python, React, and AI tools. Stay tuned for updates!
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        )}

        {/* Languages Section */}
        <section id="languages" className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-10 animate-float-slow"></div>
          
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
                  Communication Skills
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 font-playfair">Languages</h2>
              <p className={`text-xl max-w-2xl mx-auto font-poppins ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Multilingual capabilities for effective global communication
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Hindi */}
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
                    className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
                    onMouseMove={(e) => handleMagneticMove(e, 'language-hindi')}
                    onMouseLeave={() => handleMagneticLeave('language-hindi')}
                    style={{ transform: `translate(${magneticPositions['language-hindi']?.x || 0}px, ${magneticPositions['language-hindi']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
                  >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Languages className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2 font-poppins">Hindi</h3>
                    <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                      Native or Bilingual
                    </div>
                    <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Complete fluency in speaking, reading, and writing
                    </p>
                  </div>
                </div>
                </div>
                </Tilt>
              </motion.div>

              {/* English */}
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
                    className={`group relative p-10 rounded-3xl backdrop-blur-xl border hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-orange-500/50' : 'bg-white/50 border-slate-200 hover:border-orange-500/50'}`}
                    onMouseMove={(e) => handleMagneticMove(e, 'language-english')}
                    onMouseLeave={() => handleMagneticLeave('language-english')}
                    style={{ transform: `translate(${magneticPositions['language-english']?.x || 0}px, ${magneticPositions['language-english']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
                  >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Languages className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-2 font-poppins">English</h3>
                    <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'}`}>
                      Limited Working
                    </div>
                    <p className={`text-sm font-roboto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Proficient in technical communication and writing
                    </p>
                  </div>
                </div>
                </div>
                </Tilt>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Work Experience Section */}
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
              {/* Experience 1: EM AUR - Consolidated */}
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
                    onMouseMove={(e) => handleMagneticMove(e, 'exp-em-aur')}
                    onMouseLeave={() => handleMagneticLeave('exp-em-aur')}
                    style={{ transform: `translate(${magneticPositions['exp-em-aur']?.x || 0}px, ${magneticPositions['exp-em-aur']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
                  >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Users className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                      Currently Working
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-poppins bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text">
                      EM AUR
                    </h3>
                    <div className={`flex items-center gap-4 mb-4 flex-wrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-roboto">December 2025 - Present</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">India</span>
                      </div>
                    </div>
                    
                    {/* Multiple Roles */}
                    <div className="space-y-3 mt-4">
                      <div className={`flex items-center gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>
                          Social Media Manager
                        </div>
                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>December 2025 - Present</span>
                      </div>
                      <div className={`flex items-center gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>
                          Social Media Coordinator
                        </div>
                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>December 2025 - Present</span>
                      </div>
                      <div className={`flex items-center gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-500/20 text-orange-600'}`}>
                          Technical Team Member
                        </div>
                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>December 2025 - Present</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </Tilt>
              </motion.div>

              {/* Experience 2: Nexstep Network - Project Intern */}
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
                    onMouseMove={(e) => handleMagneticMove(e, 'exp-nexstep')}
                    onMouseLeave={() => handleMagneticLeave('exp-nexstep')}
                    style={{ transform: `translate(${magneticPositions['exp-nexstep']?.x || 0}px, ${magneticPositions['exp-nexstep']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
                  >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Briefcase className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                      Currently Working • 4 months
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
                        <span className="text-sm font-roboto">October 2025 - Present</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-roboto">India</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </Tilt>
              </motion.div>

              {/* Experience 3: C.S. DAV Public School - Deputy Head Boy */}
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
                    onMouseMove={(e) => handleMagneticMove(e, 'exp-deputy-head-boy')}
                    onMouseLeave={() => handleMagneticLeave('exp-deputy-head-boy')}
                    style={{ transform: `translate(${magneticPositions['exp-deputy-head-boy']?.x || 0}px, ${magneticPositions['exp-deputy-head-boy']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
                  >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <Trophy className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 animate-pulse"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-3 ${isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-600'}`}>
                      Currently Serving • 11 months
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
                        <span className="text-sm font-roboto">Motihari, Bihar, India</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </Tilt>
              </motion.div>

              {/* Experience 4: Muskurahat Foundation - Fundraising Intern */}
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
                    onMouseMove={(e) => handleMagneticMove(e, 'exp-muskurahat')}
                    onMouseLeave={() => handleMagneticLeave('exp-muskurahat')}
                    style={{ transform: `translate(${magneticPositions['exp-muskurahat']?.x || 0}px, ${magneticPositions['exp-muskurahat']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
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
                        <span className="text-sm font-roboto">Motihari, Bihar, India</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </Tilt>
              </motion.div>

              {/* Experience 5: Scaler School of Technology - Student Intern */}
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
                    onMouseMove={(e) => handleMagneticMove(e, 'exp-scaler')}
                    onMouseLeave={() => handleMagneticLeave('exp-scaler')}
                    style={{ transform: `translate(${magneticPositions['exp-scaler']?.x || 0}px, ${magneticPositions['exp-scaler']?.y || 0}px)`, transition: 'transform 0.3s ease-out' }}
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
                        <span className="text-sm font-roboto">Bihar, India</span>
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

        {/* Awards Section */}
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

        {/* Certifications Section */}
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

        {/* Contact Section */}
        <section id="contact" className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-90 animate-gradient"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl opacity-10 animate-float-delay-2"></div>

          <div className="relative max-w-7xl mx-auto">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <div className="inline-block px-6 py-2 mb-4 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <span className="text-sm font-bold uppercase tracking-wider text-white font-montserrat">
                  Let's Connect
                </span>
              </div>
              <h2 className="text-5xl font-bold mb-6 text-white font-playfair">Ready to Collaborate?</h2>
              <p className="text-xl max-w-2xl mx-auto text-white/90 font-poppins">
                I'm always open to new opportunities and learning experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email', value: 'divyanshutiwari@duck.com', link: 'mailto:divyanshutiwari@duck.com' },
                  { icon: MapPin, label: 'Location', value: 'Motihari, Bihar, India', link: 'https://maps.app.goo.gl/vFeCLKMcwDbopCi79' }
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
                    { icon: Twitter, link: 'https://x.com/Divyanshut011' },
                    { icon: Instagram, link: 'https://www.instagram.com/divyanshu.tiiwari' },
                    { icon: CodecademyIcon, link: 'https://www.codecademy.com/profiles/divyanshutiwari01' }
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
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                    />
                    {formErrors.name && <p className="text-xs text-red-300 mt-1">{formErrors.name}</p>}
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                    />
                    {formErrors.email && <p className="text-xs text-red-300 mt-1">{formErrors.email}</p>}
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 1234567890 (optional)"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                    />
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 font-roboto"
                    />
                    {formErrors.subject && <p className="text-xs text-red-300 mt-1">{formErrors.subject}</p>}
                  </motion.div>

                  <motion.div whileFocus={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label className="block text-sm font-semibold text-white/90 mb-2 font-roboto">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell me about your project, idea, or just say hi..."
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 resize-none font-roboto"
                    />
                    {formErrors.message && <p className="text-xs text-red-300 mt-1">{formErrors.message}</p>}
                  </motion.div>

                  <button
                    type="submit"
                    disabled={formStatus === 'loading' || formStatus === 'success'}
                    className="w-full px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 font-poppins relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {formStatus === 'loading' && (
                        <>
                          <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      )}
                      {formStatus === 'success' && (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Sent!</span>
                        </>
                      )}
                      {(formStatus === 'idle' || formStatus === 'error') && (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>

                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-white text-center"
                    >
                      <p className="text-sm">Unable to send message. Please check your connection and try again, or email me directly at divyanshutiwari@duck.com</p>
                    </motion.div>
                  )}

                  <p className="text-xs text-white/60 text-center font-roboto">
                    Your message will be sent directly to my email
                  </p>
                </form>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-white text-center"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm text-white/80">I'll get back to you soon.</p>
                  </motion.div>
                )}
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
              © 2026 Designed & Built by <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text font-bold">Divyanshu Tiwari</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
