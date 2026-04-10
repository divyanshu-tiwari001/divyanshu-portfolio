import React from 'react';

export default function Footer({ isDark }) {
  return (
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
  );
}
