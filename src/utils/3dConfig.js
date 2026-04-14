// 3D Configuration & Presets

export const AVATAR_COLORS = {
  body: '#06b6d4',        // cyan-500
  bodyEmissive: '#0e7490',
  head: '#f59e0b',        // amber-500
  headEmissive: '#d97706',
  eyes: '#ffffff',
  pupils: '#06b6d4',
  clothes: '#f97316',     // orange-500
  clothesEmissive: '#ea580c',
  particles: '#22d3ee',   // cyan-400
  hair: '#1e293b',
};

export const AVATAR_PRESETS = {
  hero: {
    scale: 1.4,
    position: [1.8, -0.5, 0],
    rotation: [0, -0.4, 0],
    autoRotateSpeed: 0.4,
  },
  section: {
    scale: 2.2,
    position: [0, -1.2, 0],
    rotation: [0, 0, 0],
    autoRotateSpeed: 0.6,
  },
};

export const INFO_POINTERS = [
  { label: '3+ Years Learning Path', icon: '📚', color: '#06b6d4', angle: 30,  radius: 3.2 },
  { label: 'Frontend Specialist',    icon: '💻', color: '#f59e0b', angle: 100, radius: 3.0 },
  { label: 'AI Prompt Engineer',     icon: '🤖', color: '#8b5cf6', angle: 170, radius: 3.3 },
  { label: 'Python Programmer',      icon: '🐍', color: '#10b981', angle: 240, radius: 3.1 },
  { label: 'Award Winner',           icon: '🏆', color: '#f97316', angle: 300, radius: 3.2 },
  { label: 'Team Leader',            icon: '⭐', color: '#ec4899', angle: 340, radius: 2.9 },
];

export const WEBGL_AVAILABLE = (() => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
})();
