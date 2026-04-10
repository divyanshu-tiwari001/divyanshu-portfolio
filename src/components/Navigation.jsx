import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X, Menu } from 'lucide-react';
import dtLogo from '../assets/dt_logo.png';
import { FEATURE_FLAGS } from '../utils/featureFlags';

export default function Navigation({ isDark, setIsDark, scrollTo, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${isDark ? 'bg-slate-950/70 border-slate-800/50' : 'bg-white/70 border-slate-200/50'} backdrop-filter backdrop-blur-[20px] backdrop-saturate-[180%] border-b`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)'
      }}
    >
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
          {FEATURE_FLAGS.SHOW_TESTIMONIALS && (
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Testimonials</a>
          )}
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }} className={`transition-all duration-300 hover:scale-110 ${isDark ? 'text-slate-300 hover:text-orange-400' : 'text-slate-600 hover:text-orange-600'}`}>Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`p-3 rounded-full hover:scale-110 active:scale-95 hover:rotate-180 transition-all duration-500 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
          <button
            className={`md:hidden p-3 rounded-full transition-all duration-300 active:scale-95 ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`md:hidden overflow-hidden border-t ${isDark ? 'border-slate-800 bg-slate-950/95' : 'border-slate-200 bg-white/95'}`}
          >
            <nav aria-label="Mobile navigation">
              <div className="flex flex-col px-6 py-4 space-y-1 font-poppins font-semibold">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'Education', id: 'education' },
                  { label: 'Achievements', id: 'achievements' },
                  { label: 'Experience', id: 'experience' },
                  { label: 'Awards', id: 'awards' },
                  { label: 'About', id: 'about' },
                  ...(FEATURE_FLAGS.SHOW_PROJECTS ? [{ label: 'Projects', id: 'projects' }] : []),
                  ...(FEATURE_FLAGS.SHOW_TESTIMONIALS ? [{ label: 'Testimonials', id: 'testimonials' }] : []),
                  { label: 'Contact', id: 'contact' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(item.id); setMobileMenuOpen(false); }}
                    className={`py-3 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${isDark ? 'text-slate-300 hover:text-orange-400 hover:bg-slate-800/60' : 'text-slate-600 hover:text-orange-600 hover:bg-slate-100'}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
