import React, { useState, useEffect, lazy, Suspense, useRef, useCallback } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import SGAParticles from './components/SGAParticles';
import CardParticleLeak from './components/CardParticleLeak';
import { initializeContentProtection, cleanupContentProtection } from './utils/contentProtection';
import { FEATURE_FLAGS } from './utils/featureFlags';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import TrustIndicators from './components/TrustIndicators';
import EducationSection from './components/EducationSection';
import AchievementsSection from './components/AchievementsSection';
import AboutSection from './components/AboutSection';
import TechStackSection from './components/TechStackSection';
import ProjectsSection from './components/ProjectsSection';
import LanguagesSection from './components/LanguagesSection';
import WorkExperienceSection from './components/WorkExperienceSection';
import AwardsSection from './components/AwardsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import StartupAnimation from './components/StartupAnimation';

const AvatarSection = lazy(() => import('./components/3D/AvatarSection'));
const WelcomePopup = lazy(() => import('./components/WelcomePopup'));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'));
const CertificationsSection = lazy(() => import('./components/CertificationsSection'));

const MAGNETIC_THROTTLE_MS = 250;
const SCROLL_THROTTLE_MS = 120;
const SCROLL_TOP_THRESHOLD = 300;

function SectionSkeleton({ heightClass = 'h-64' }) {
  return (
    <div className={`mx-auto max-w-7xl px-6 py-10 ${heightClass}`}>
      <div className="h-full w-full rounded-3xl border border-slate-700/40 bg-slate-900/30 animate-pulse" />
    </div>
  );
}

export default function PremiumStudentPortfolio() {
  const [isDark, setIsDark] = useState(true);
  const [showPopup, setShowPopup] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showDeferredSections, setShowDeferredSections] = useState(false);
  const [magneticPositions, setMagneticPositions] = useState({});
  const magneticUpdateTimes = useRef({});
  const scrollTimeoutRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [formErrors, setFormErrors] = useState({});

  const handleMagneticMove = useCallback((e, key) => {
    // Abort if the user is on a touch device (phones/tablets)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const now = performance.now();
    const lastUpdate = magneticUpdateTimes.current[key] ?? 0;
    if (now - lastUpdate < MAGNETIC_THROTTLE_MS) return;
    magneticUpdateTimes.current[key] = now;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMagneticPositions((prev) => {
      const current = prev[key];
      if (current && Math.abs(current.x - x) < 0.5 && Math.abs(current.y - y) < 0.5) return prev;
      return { ...prev, [key]: { x, y } };
    });
  }, []);

  const handleMagneticLeave = useCallback((key) => {
    setMagneticPositions(prev => ({ ...prev, [key]: { x: 0, y: 0 } }));
  }, []);

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
    } catch {
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const marker = document.getElementById('deferred-sections-marker');
    if (!marker || typeof IntersectionObserver === 'undefined') {
      setShowDeferredSections(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowDeferredSections(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );
    observer.observe(marker);

    return () => observer.disconnect();
  }, []);

  // Initialize comprehensive content protection
  useEffect(() => {
    if (!FEATURE_FLAGS.SHOW_CONTENT_PROTECTION) return;
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

  // Scroll-to-top visibility
  useEffect(() => {
    const updateScrollTopVisibility = () => {
      setShowScrollTop(window.scrollY > SCROLL_TOP_THRESHOLD);
      scrollTimeoutRef.current = null;
    };

    const handleScroll = () => {
      if (scrollTimeoutRef.current) return;
      scrollTimeoutRef.current = setTimeout(updateScrollTopVisibility, SCROLL_THROTTLE_MS);
    };

    updateScrollTopVisibility();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
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

    const restrictedEvents = ['contextmenu', 'copy', 'cut', 'keydown'];
    const handleRestrictedInteraction = (e) => {
      if (e.type === 'keydown' && !(e.code === 'KeyA' && (e.ctrlKey || e.metaKey))) {
        return;
      }
      if (isFormInput(e.target)) return;
      e.preventDefault();
    };

    restrictedEvents.forEach((eventName) => {
      document.addEventListener(eventName, handleRestrictedInteraction);
    });

    // Cleanup
    return () => {
      restrictedEvents.forEach((eventName) => {
        document.removeEventListener(eventName, handleRestrictedInteraction);
      });
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StartupAnimation isDark={isDark} enabled={FEATURE_FLAGS.SHOW_STARTUP_ANIMATION}>
      <SGAParticles enabled={FEATURE_FLAGS.SHOW_PARTICLES} />
      {FEATURE_FLAGS.SHOW_CARD_LEAK && <CardParticleLeak />}
      {FEATURE_FLAGS.SHOW_CUSTOM_CURSOR && <CustomCursor />}
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

        @media (prefers-reduced-motion: reduce) {
          html:focus-within {
            scroll-behavior: auto;
          }
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
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

      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'text-white' : 'bg-slate-50 text-slate-900'}`}>

        {/* Enhanced Welcome Popup */}
        {FEATURE_FLAGS.SHOW_WELCOME_POPUP && showPopup && (
          <Suspense fallback={null}>
            <WelcomePopup isDark={isDark} setShowPopup={setShowPopup} />
          </Suspense>
        )}

        {/* Navigation */}
        <Navigation
          isDark={isDark}
          setIsDark={setIsDark}
          scrollTo={scrollTo}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Hero Section */}
        {FEATURE_FLAGS.SHOW_HERO_SECTION && (
          <HeroSection isDark={isDark} scrollTo={scrollTo} y1={y1} y2={y2} y3={y3} />
        )}

        {/* 3D Avatar Section */}
        {FEATURE_FLAGS.SHOW_3D_AVATAR_SECTION && (
          <Suspense fallback={<SectionSkeleton heightClass="h-80" />}>
            <AvatarSection isDark={isDark} />
          </Suspense>
        )}

        {/* Trust Indicators */}
        {FEATURE_FLAGS.SHOW_TRUST_INDICATORS && <TrustIndicators isDark={isDark} />}

        {/* Education Section */}
        {FEATURE_FLAGS.SHOW_EDUCATION && (
          <EducationSection
            isDark={isDark}
            magneticPositions={magneticPositions}
            handleMagneticMove={handleMagneticMove}
            handleMagneticLeave={handleMagneticLeave}
          />
        )}

        {/* Achievements Section */}
        {FEATURE_FLAGS.SHOW_ACHIEVEMENTS && (
          <AchievementsSection
            isDark={isDark}
            magneticPositions={magneticPositions}
            handleMagneticMove={handleMagneticMove}
            handleMagneticLeave={handleMagneticLeave}
          />
        )}

        {/* About Section */}
        {FEATURE_FLAGS.SHOW_ABOUT && <AboutSection isDark={isDark} />}

        {/* Tech Stack */}
        {FEATURE_FLAGS.SHOW_TECH_STACK && <TechStackSection isDark={isDark} />}

        {/* Projects Section */}
        {FEATURE_FLAGS.SHOW_PROJECTS && (
          <ProjectsSection
            isDark={isDark}
            magneticPositions={magneticPositions}
            handleMagneticMove={handleMagneticMove}
            handleMagneticLeave={handleMagneticLeave}
          />
        )}

        {/* Languages Section */}
        {FEATURE_FLAGS.SHOW_LANGUAGES && (
          <LanguagesSection
            isDark={isDark}
            magneticPositions={magneticPositions}
            handleMagneticMove={handleMagneticMove}
            handleMagneticLeave={handleMagneticLeave}
          />
        )}

        {/* Work Experience Section */}
        {FEATURE_FLAGS.SHOW_WORK_EXPERIENCE && (
          <WorkExperienceSection
            isDark={isDark}
            magneticPositions={magneticPositions}
            handleMagneticMove={handleMagneticMove}
            handleMagneticLeave={handleMagneticLeave}
          />
        )}

        {/* Awards Section */}
        {FEATURE_FLAGS.SHOW_AWARDS && (
          <AwardsSection
            isDark={isDark}
            magneticPositions={magneticPositions}
            handleMagneticMove={handleMagneticMove}
            handleMagneticLeave={handleMagneticLeave}
          />
        )}

        <div id="deferred-sections-marker" className="h-px" aria-hidden />

        {/* Testimonials Section */}
        {FEATURE_FLAGS.SHOW_TESTIMONIALS && showDeferredSections && (
          <Suspense fallback={<SectionSkeleton />}>
            <TestimonialsSection isDark={isDark} />
          </Suspense>
        )}

        {/* Certifications Section */}
        {FEATURE_FLAGS.SHOW_CERTIFICATIONS && showDeferredSections && (
          <Suspense fallback={<SectionSkeleton />}>
            <CertificationsSection isDark={isDark} />
          </Suspense>
        )}

        {/* Contact Section */}
        {FEATURE_FLAGS.SHOW_CONTACT && (
          <ContactSection
            isDark={isDark}
            formData={formData}
            formStatus={formStatus}
            formErrors={formErrors}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        )}

        {/* Footer */}
        {FEATURE_FLAGS.SHOW_FOOTER && <Footer isDark={isDark} />}
      </div>

      {/* Scroll-to-Top Button */}
      {FEATURE_FLAGS.SHOW_SCROLL_TO_TOP && <ScrollToTop showScrollTop={showScrollTop} />}
    </StartupAnimation>
  );
}
