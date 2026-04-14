// ---------------------------------------------------------------------------
// 3D system: runtime disable state (localStorage persists across reloads)
// ---------------------------------------------------------------------------
const _is3dDisabled =
  typeof window !== 'undefined' && localStorage.getItem('disable_3d') === 'true';

// ← Set this to false to turn off ALL 3D features at build time
const _base3dEnabled = true;

const _3dEnabled = _base3dEnabled && !_is3dDisabled;

// Emit a console hint when 3D has been auto-disabled
if (typeof window !== 'undefined' && _is3dDisabled) {
  console.warn('3D System: DISABLED - Reverted to 2D format');
  console.log('To re-enable: localStorage.removeItem("disable_3d"); location.reload();');
}

export const FEATURE_FLAGS = {
  // Particle Effects
  SHOW_PARTICLES: true,
  SHOW_CURSOR_TRAIL: true,
  SHOW_CARD_LEAK: true,

  // Hero Section
  SHOW_HERO_SECTION: true,
  SHOW_HERO_3D_MODEL: _3dEnabled,      // gated by master 3D toggle
  SHOW_RESUME_BUTTON: false,

  // Sections
  SHOW_PROJECTS: true,
  SHOW_TESTIMONIALS: false,
  SHOW_EDUCATION: true,
  SHOW_ACHIEVEMENTS: true,
  SHOW_ABOUT: true,
  SHOW_TECH_STACK: true,
  SHOW_LANGUAGES: true,
  SHOW_WORK_EXPERIENCE: true,
  SHOW_AWARDS: true,
  SHOW_CERTIFICATIONS: true,
  SHOW_TRUST_INDICATORS: true,
  SHOW_CONTACT: true,
  SHOW_FOOTER: true,

  // ─── Master 3D toggle ───────────────────────────────────────────────────
  // Set _base3dEnabled = false (above) OR run in browser console:
  //   localStorage.setItem('disable_3d', 'true'); location.reload();
  ENABLE_3D_SYSTEM: _3dEnabled,

  // Individual 3D components (only active when ENABLE_3D_SYSTEM = true)
  SHOW_3D_AVATAR_SECTION: _3dEnabled,
  SHOW_3D_INFO_POINTERS: _3dEnabled,
  SHOW_PARTICLE_EFFECTS_3D: _3dEnabled,
  ENABLE_3D_SCROLL_ANIMATIONS: _3dEnabled,

  // Fallback / auto-disable settings
  AUTO_DISABLE_3D_ON_ERROR: true,   // auto-disable + reload when 3D crashes
  AUTO_DISABLE_3D_ON_LOW_FPS: true, // auto-disable when FPS stays below threshold
  LOW_FPS_THRESHOLD: 30,            // fps threshold that triggers auto-disable
  THREE_D_LOAD_TIMEOUT_MS: 3000,    // ms to wait before treating 3D as hung

  // Animations
  SHOW_STARTUP_ANIMATION: true,
  SHOW_SCROLL_ANIMATIONS: true,

  // UI Features
  SHOW_MAGNETIC_HOVER: true,
  SHOW_DARK_MODE_TOGGLE: true,
  SHOW_WELCOME_POPUP: true,
  SHOW_CUSTOM_CURSOR: true,
  SHOW_SCROLL_TO_TOP: true,

  // Security
  SHOW_CONTENT_PROTECTION: true,
};
