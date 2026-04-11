import React, { useRef, useEffect } from "react";

// SGA glyphs — same set used by SGAParticles for visual consistency
const SGA = [
  "ᔑ", "ʖ", "ᓵ", "↸", "ᒷ", "⎓", "⊣", "⍑", "╎", "⋮",
  "ꖌ", "ꖎ", "ᒲ", "リ", "𝙹", "!", "¡", "ᑑ", "∷", "ᓭ",
  "ℸ", "⚍", "⍊", "∴", "̇/", "||", "⨅",
];

// Per-section accent colors — match each card section's visual theme
const SECTION_COLORS = {
  education:      "rgba(251, 146, 60, 0.9)",   // orange
  achievements:   "rgba(251, 191, 36, 0.9)",   // amber
  projects:       "rgba(168, 85, 247, 0.9)",   // purple
  experience:     "rgba(59, 130, 246, 0.9)",   // blue
  awards:         "rgba(34, 211, 238, 0.9)",   // cyan
  certifications: "rgba(34, 197, 94, 0.9)",    // green
  languages:      "rgba(99, 102, 241, 0.9)",   // indigo
};
const DEFAULT_COLOR = "rgba(110, 210, 245, 0.9)"; // fallback cyan

const MAX_PARTICLES   = 300;
const SPAWN_MIN       = 5;
const SPAWN_MAX       = 8;
const SIZE_MIN        = 14;
const SIZE_MAX        = 20;
const LIFE_MIN        = 1.2;
const LIFE_MAX        = 2.0;
const SPEED_MIN       = 30;
const SPEED_MAX       = 80;
const SPREAD_ANGLE    = Math.PI / 3; // ±30° from outward normal
const AIR_RESIST      = 0.985;
const OUTWARD_ACCEL   = 5;           // extra push away from border
const UPWARD_LIFT     = 10;          // px/s constant upward nudge
const MOBILE_BREAKPOINT = 768;

function rnd(a, b) { return a + (b - a) * Math.random(); }

/** Walk up the DOM to find the nearest section ID and return its accent color. */
function getAccentColor(element) {
  let el = element;
  while (el && el !== document.body) {
    if (el.id && SECTION_COLORS[el.id]) return SECTION_COLORS[el.id];
    el = el.parentElement;
  }
  return DEFAULT_COLOR;
}

function CardParticleLeakCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let vpW = window.innerWidth;
    let vpH = window.innerHeight;
    let isMobile = vpW < MOBILE_BREAKPOINT;

    // ── canvas sizing ──────────────────────────────────────────────────────────
    function resize() {
      vpW = window.innerWidth;
      vpH = window.innerHeight;
      isMobile = vpW < MOBILE_BREAKPOINT;
      canvas.width  = Math.round(vpW * dpr);
      canvas.height = Math.round(vpH * dpr);
      canvas.style.width  = vpW + "px";
      canvas.style.height = vpH + "px";
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    // ── particle pool ──────────────────────────────────────────────────────────
    const pool = Array.from({ length: MAX_PARTICLES }, () => ({
      active: false,
      x: 0, y: 0, vx: 0, vy: 0, ax: 0, ay: 0,
      char: "", font: "", size: 16,
      opacity: 1, life: 1.5, age: 0,
      color: DEFAULT_COLOR,
    }));

    function acquireFromPool() {
      for (const p of pool) {
        if (!p.active) return p;
      }
      return null; // pool exhausted — skip spawn
    }

    function spawnParticle(card, color) {
      const p = acquireFromPool();
      if (!p) return;

      const rect = card.getBoundingClientRect();

      // Pick a random edge (0=top, 1=right, 2=bottom, 3=left)
      const edge = Math.floor(Math.random() * 4);
      let x, y, nx, ny; // spawn position + outward normal

      switch (edge) {
        case 0: // top
          x = rect.left + Math.random() * rect.width;
          y = rect.top;
          nx = 0; ny = -1;
          break;
        case 1: // right
          x = rect.right;
          y = rect.top + Math.random() * rect.height;
          nx = 1; ny = 0;
          break;
        case 2: // bottom
          x = rect.left + Math.random() * rect.width;
          y = rect.bottom;
          nx = 0; ny = 1;
          break;
        default: // left
          x = rect.left;
          y = rect.top + Math.random() * rect.height;
          nx = -1; ny = 0;
      }

      // Rotate outward normal by random spread (±30°)
      const spread = (Math.random() - 0.5) * SPREAD_ANGLE;
      const cos = Math.cos(spread);
      const sin = Math.sin(spread);
      const rvx = nx * cos - ny * sin;
      const rvy = nx * sin + ny * cos;
      const speed = rnd(SPEED_MIN, SPEED_MAX);
      const size = rnd(SIZE_MIN, SIZE_MAX);

      p.active  = true;
      p.x       = x;
      p.y       = y;
      p.vx      = rvx * speed;
      p.vy      = rvy * speed - UPWARD_LIFT;
      p.ax      = nx * OUTWARD_ACCEL;
      p.ay      = ny * OUTWARD_ACCEL;
      p.char    = SGA[Math.floor(Math.random() * SGA.length)];
      p.size    = size;
      p.font    = `600 ${Math.round(size)}px 'Segoe UI Symbol', sans-serif`;
      p.opacity = rnd(0.7, 1.0);
      p.life    = rnd(LIFE_MIN, LIFE_MAX);
      p.age     = 0;
      p.color   = color;
    }

    // ── hover detection ────────────────────────────────────────────────────────
    let hoveredCard = null;

    function onMouseOver(e) {
      // Walk up DOM to find first card-sized element with `group` class
      let el = e.target;
      while (el && el !== document.body) {
        if (el.classList && el.classList.contains("group")) {
          const rect = el.getBoundingClientRect();
          // Guard against tiny elements (buttons, badges) that also use `group`
          if (rect.width >= 150 && rect.height >= 100) {
            hoveredCard = el;
            return;
          }
        }
        el = el.parentElement;
      }
    }

    function onMouseOut(e) {
      if (!hoveredCard) return;
      const dest = e.relatedTarget;
      // Keep spawning while mouse is still inside the hovered card
      if (dest && hoveredCard.contains(dest)) return;
      hoveredCard = null;
    }

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout",  onMouseOut);

    // ── animation loop ─────────────────────────────────────────────────────────
    let lastTs   = 0;
    let running  = true;

    function frame(ts) {
      if (!running) return;

      const elapsed = ts - lastTs;
      if (elapsed < (isMobile ? 33.33 : 16.67)) {
        requestAnimationFrame(frame);
        return;
      }
      lastTs = ts;
      const dt = Math.min(elapsed / 1000, 0.033);

      const ctx = canvas.getContext("2d");
      if (!ctx) { requestAnimationFrame(frame); return; }

      ctx.clearRect(0, 0, vpW, vpH);

      // Spawn new particles while a card is hovered (desktop only)
      if (hoveredCard && !isMobile) {
        const color = getAccentColor(hoveredCard);
        const count = SPAWN_MIN + Math.floor(Math.random() * (SPAWN_MAX - SPAWN_MIN + 1));
        for (let i = 0; i < count; i++) {
          spawnParticle(hoveredCard, color);
        }
      }

      // Update and render all active particles
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";

      for (const p of pool) {
        if (!p.active) continue;

        p.age += dt;
        if (p.age >= p.life) { p.active = false; continue; }

        // Velocity integration + air resistance
        p.vx = (p.vx + p.ax * dt) * AIR_RESIST;
        p.vy = (p.vy + p.ay * dt) * AIR_RESIST;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const lifeRatio = p.age / p.life;
        const alpha = p.opacity * (1 - lifeRatio);

        // Soft glow pass — larger font, lower opacity
        ctx.globalAlpha = alpha * 0.35;
        ctx.font = `600 ${Math.round(p.size * 1.4)}px 'Segoe UI Symbol', sans-serif`;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, Math.round(p.x), Math.round(p.y));

        // Main glyph pass
        ctx.globalAlpha = alpha;
        ctx.font = p.font;
        ctx.fillText(p.char, Math.round(p.x), Math.round(p.y));
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

    // ── cleanup ────────────────────────────────────────────────────────────────
    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout",  onMouseOut);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "fixed",
        zIndex: 9990,
        top: 0,
        left: 0,
        pointerEvents: "none",
        background: "none",
        mixBlendMode: "screen",
      }}
      aria-hidden="true"
    />
  );
}

export default function CardParticleLeak() {
  // Disable on mobile — no hover events and performance budget is tight
  if (typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT) return null;
  return <CardParticleLeakCanvas />;
}
