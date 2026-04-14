
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&pause=1000&color=06B6D4&center=true&vCenter=true&width=600&lines=🚀+Premium+Student+Portfolio;✨+3D+%7C+Particles+%7C+Animations;Built+by+Divyanshu+Tiwari" alt="Typing SVG" />
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img alt="Three.js" src="https://img.shields.io/badge/Three.js-0.183-000000?style=for-the-badge&logo=threedotjs&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge">
  <img alt="Stars" src="https://img.shields.io/github/stars/divyanshu-tiwari001/divyanshu-portfolio?style=for-the-badge&color=f59e0b">
</p>

<p align="center">
  <b>A next-generation student portfolio with 3D avatar, particle effects, scroll-based animations, and enterprise-grade feature toggles.</b>
</p>

---

```
  ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗      ██████╗
  ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██╔═══██╗
  ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║   ██║
  ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║   ██║
  ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗╚██████╔╝
  ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝ ╚═════╝
```

---

## ✨ Features

### 🎨 Core Features

| Feature | Description |
|---|---|
| 🤖 **3D Avatar System** | Procedurally generated cyan/orange boy avatar — no model files needed |
| ✨ **SGA Particle Effects** | Background particles, custom cursor trail, card border particle leak |
| 🎬 **Minecraft Text Formation** | Enchanting-table-style text assembled from chaotic particles |
| 🎭 **Startup Animation Sequence** | Polished 2.5-second cascade on page load |
| 🎯 **Magnetic Hover Effects** | Elements are magnetically attracted to your cursor |
| 🌓 **Dark / Light Mode** | Instant toggle with smooth transitions |
| 📱 **Fully Responsive** | Desktop → mobile, with graceful 3D degradation |

### 🚀 Advanced 3D Effects

| Effect | Description |
|---|---|
| 📊 **Scroll-based 3D rotation** | Avatar rotates 360° as you scroll |
| 🖱️ **Mouse parallax** | Avatar look-ahead follows cursor movement |
| 💫 **Floating info pointers** | 6 orbiting cards reveal your skills & roles |
| 🌀 **Orbital particle system** | 18 glowing particles orbit the avatar |
| 🛡️ **Auto WebGL fallback** | If WebGL is unavailable, gracefully degrades to 2D |

### 🎮 Particle Ecosystem

| Layer | Description |
|---|---|
| 🌌 **Background particles** | Ambient floating particle field across the entire page |
| 👁️ **Cursor trail** | SGA particle trail follows your mouse in real-time |
| 💥 **Card particle leak** | Particles burst from card edges on hover |

### ⚡ Performance & Safety

| Safeguard | Description |
|---|---|
| 🎛️ **Feature flag system** | Toggle every section and effect with one line of code |
| 📈 **FPS monitoring** | Auto-disables 3D if framerate drops below threshold |
| 📱 **Mobile optimisation** | 30 fps cap + reduced effects on small screens |
| 💾 **localStorage persistence** | User preference for 3D on/off is remembered |
| 🔐 **Content protection** | Right-click & copy protection |

---

## 🎮 Live Demo

> 🔗 **[divyanshu-portfolio.vercel.app](https://divyanshu-portfolio-01.vercel.app)**

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,threejs,js,html,css&theme=dark" />
</p>

| Category | Technologies |
|---|---|
| **Framework** | React 19, Vite 7 |
| **3D Rendering** | Three.js 0.183, @react-three/fiber, @react-three/drei |
| **Animations** | Framer Motion 12 |
| **Styling** | Tailwind CSS 3, custom CSS animations |
| **Icons** | Lucide React |
| **Effects** | Custom SGA Particle Engine, typewriter-effect |
| **Tilt** | react-parallax-tilt |

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/divyanshu-tiwari001/divyanshu-portfolio.git
cd divyanshu-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
#    http://localhost:5173
```

**Build for production:**

```bash
npm run build
npm run preview
```

---

## 🎛️ Feature Flags

Every section, effect, and animation is controlled by a single file:

```
src/utils/featureFlags.js
```

```javascript
export const FEATURE_FLAGS = {

  // ─── Particle Effects ─────────────────────────────
  SHOW_PARTICLES: true,          // Background particle field
  SHOW_CURSOR_TRAIL: true,       // SGA particle cursor trail
  SHOW_CARD_LEAK: true,          // Card border particle burst

  // ─── Hero Section ─────────────────────────────────
  SHOW_HERO_SECTION: true,
  SHOW_HERO_3D_MODEL: true,      // Small 3D avatar in hero
  SHOW_RESUME_BUTTON: false,     // Resume download button

  // ─── Page Sections ────────────────────────────────
  SHOW_PROJECTS: true,
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
  SHOW_TESTIMONIALS: false,      // Off by default

  // ─── 3D Features ──────────────────────────────────
  SHOW_3D_AVATAR_SECTION: true,  // Full-screen 3D showcase
  SHOW_3D_INFO_POINTERS: true,   // Orbiting skill cards
  SHOW_PARTICLE_EFFECTS_3D: true,

  // ─── Animations ───────────────────────────────────
  SHOW_STARTUP_ANIMATION: true,
  SHOW_SCROLL_ANIMATIONS: true,

  // ─── UI Features ──────────────────────────────────
  SHOW_MAGNETIC_HOVER: true,
  SHOW_DARK_MODE_TOGGLE: true,
  SHOW_WELCOME_POPUP: true,
  SHOW_CUSTOM_CURSOR: true,
  SHOW_SCROLL_TO_TOP: true,

  // ─── Security ─────────────────────────────────────
  SHOW_CONTENT_PROTECTION: true,
};
```

### 🆘 3D Emergency Kill Switch

If 3D is lagging or broken, disable it **instantly**:

**Option A — Code (permanent):**
```javascript
// featureFlags.js
SHOW_3D_AVATAR_SECTION: false,
SHOW_HERO_3D_MODEL: false,
```

**Option B — Browser console (temporary):**
```javascript
localStorage.setItem('disable_3d', 'true');
location.reload();
```

Portfolio reverts to the clean 2D layout immediately. No broken states.

---

## 🎨 Customization

### Change Avatar Colors

```javascript
// src/utils/3dConfig.js
export const AVATAR_COLORS = {
  body: '#06b6d4',        // cyan-500
  clothes: '#f97316',     // orange-500
  particles: '#22d3ee',   // cyan-400
  // ... tweak any color
};
```

### Change Avatar Presets

```javascript
// src/utils/3dConfig.js
export const AVATAR_PRESETS = {
  hero: { scale: 1.4, position: [1.8, -0.5, 0] },
  section: { scale: 2.2, position: [0, -1.2, 0] },
};
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

### Netlify

```bash
npm run build
# Drag & drop the `dist/` folder at netlify.com/drop
```

### GitHub Pages

```bash
npm run build
# Push the `dist/` folder to the `gh-pages` branch
```

---

## 📂 Project Structure

```
divyanshu-portfolio/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── 3D/
│   │   │   ├── Avatar3D.jsx          # 3D avatar mesh
│   │   │   └── AvatarSection.jsx     # Full 3D showcase section
│   │   ├── HeroSection.jsx
│   │   ├── SGAParticles.jsx          # Background particle engine
│   │   ├── CustomCursor.jsx          # Cursor trail effect
│   │   ├── CardParticleLeak.jsx      # Card hover particle burst
│   │   └── ...                       # 17 total components
│   ├── utils/
│   │   ├── featureFlags.js           # ← Master control panel
│   │   ├── 3dConfig.js               # 3D colors & presets
│   │   └── animations.js             # Framer Motion variants
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork this repository
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request

---

## 📧 Contact

<p align="center">
  <a href="https://github.com/divyanshu-tiwari001">
    <img alt="GitHub" src="https://img.shields.io/badge/GitHub-divyanshu--tiwari001-181717?style=for-the-badge&logo=github">
  </a>
  &nbsp;
  <a href="https://linkedin.com/in/divyanshu-tiwarii">
    <img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Divyanshu_Tiwari-0A66C2?style=for-the-badge&logo=linkedin">
  </a>
</p>

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<p align="center">
  Made with ❤️ and ☕ by <b>Divyanshu Tiwari</b>
  <br/>
  <i>⭐ Star this repo if you found it helpful!</i>
</p>
