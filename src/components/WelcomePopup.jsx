import React from 'react';
import { X, Sparkles } from 'lucide-react';

export default function WelcomePopup({ isDark, setShowPopup }) {
  return (
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
  );
}
