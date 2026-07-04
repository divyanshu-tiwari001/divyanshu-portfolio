/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'from-purple-500', 'to-pink-500', 'border-purple-500/50', 'text-purple-400', 'text-purple-600', 'bg-purple-500/20',
    'from-blue-500', 'to-cyan-500', 'border-blue-500/50', 'text-blue-400', 'text-blue-600', 'bg-blue-500/20',
    'from-emerald-500', 'to-teal-500', 'border-emerald-500/50', 'text-emerald-400', 'text-emerald-600', 'bg-emerald-500/20',
    'from-amber-500', 'to-orange-500', 'border-amber-500/50', 'text-amber-400', 'text-amber-600', 'bg-amber-500/20',
    'from-rose-500', 'to-red-500', 'border-rose-500/50', 'text-rose-400', 'text-rose-600', 'bg-rose-500/20',
    'hover:shadow-purple-500/30', 'hover:shadow-blue-500/30', 'hover:shadow-emerald-500/30', 'hover:shadow-amber-500/30', 'hover:shadow-rose-500/30',
    'hover:border-purple-500/50', 'hover:border-blue-500/50', 'hover:border-emerald-500/50', 'hover:border-amber-500/50', 'hover:border-rose-500/50',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
