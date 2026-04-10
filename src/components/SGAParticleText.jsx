import React, { useRef, useEffect } from 'react';

// SGA alien glyphs – same set as SGAParticles for visual consistency
const SGA = [
  "ᔑ", "ʖ", "ᓵ", "↸", "ᒷ", "⎓", "⊣", "⍑", "╎", "⋮",
  "ꖌ", "ꖎ", "ᒲ", "リ", "𝙹", "!", "¡", "ᑑ", "∷", "ᓭ",
  "ℸ", "⚍", "⍊", "∴", "̇/", "||", "⨅"
];

const TITLES = [
  'AI-Powered Developer',
  'Prompt Engineer',
  'Frontend Developer',
  'Python Programmer',
  'Creative Problem Solver',
  'Team Leader',
];

// Phases
const FORM_MS    = 800;   // particles converge into text
const DISPLAY_MS = 3200;  // text is held steady
const SCATTER_MS = 500;   // particles fly away

// Canvas height in CSS pixels
const CANVAS_H = 72;

function rnd(a, b) { return a + (b - a) * Math.random(); }
function easeOutCubic(t) { return 1 - Math.pow(1 - Math.min(t, 1), 3); }

// ─── inner canvas component ──────────────────────────────────────────────────
function SGAParticleTextCanvas({ isDark }) {
  const canvasRef = useRef(null);
  // Keep isDark accessible inside the animation loop without restarting the loop
  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let running = true;
    let raf = null;

    // Animation state
    let titleIdx  = 0;
    let phase     = 'form';   // 'form' | 'display' | 'scatter'
    let phaseStart = -1;
    let lastTs     = -1;
    let particles  = [];
    let activeCount = 0;

    // ── canvas sizing ────────────────────────────────────────────────────────
    function dpr() { return Math.min(window.devicePixelRatio || 1, 2); }

    function resize() {
      const d = dpr();
      const w = (canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth) || 320;
      canvas.width  = Math.round(w * d);
      canvas.height = Math.round(CANVAS_H * d);
      canvas.style.width  = w + 'px';
      canvas.style.height = CANVAS_H + 'px';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(d, 0, 0, d, 0, 0);
    }

    // ── font helpers ─────────────────────────────────────────────────────────
    function getFontSize() {
      const w = canvas.offsetWidth || window.innerWidth;
      // 20px on narrow mobile, 28px on desktop – mirrors text-2xl / text-3xl
      if (w < 480) return 20;
      if (w < 768) return 24;
      return 28;
    }

    function buildFont(sz) {
      return `700 ${sz}px 'Poppins', 'Segoe UI Symbol', sans-serif`;
    }

    // ── compute per-character centre positions for a title ───────────────────
    function getPositions(title) {
      const ctx = canvas.getContext('2d');
      const sz  = getFontSize();
      ctx.font  = buildFont(sz);
      const w   = canvas.offsetWidth || window.innerWidth;
      const total = ctx.measureText(title).width;
      let x = (w - total) / 2;
      const y = CANVAS_H / 2;
      return title.split('').map(c => {
        const cw = ctx.measureText(c).width;
        const pos = { x: x + cw / 2, y, char: c };
        x += cw;
        return pos;
      });
    }

    // ── set up particles for a given title index ─────────────────────────────
    function initTitle(idx) {
      const positions = getPositions(TITLES[idx]);
      activeCount = positions.length;
      const w = canvas.offsetWidth || window.innerWidth;

      // Grow pool as needed
      while (particles.length < activeCount) {
        particles.push({
          x: rnd(0, w), y: rnd(0, CANVAS_H),
          vx: 0, vy: 0,
          sgaChar: SGA[Math.floor(Math.random() * SGA.length)],
          tx: w / 2, ty: CANVAS_H / 2,
          targetChar: ' ',
        });
      }

      for (let i = 0; i < activeCount; i++) {
        particles[i].tx         = positions[i].x;
        particles[i].ty         = positions[i].y;
        particles[i].targetChar = positions[i].char;
        // Refresh the random SGA glyph for the chaotic phase
        particles[i].sgaChar    = SGA[Math.floor(Math.random() * SGA.length)];
      }
    }

    // ── bootstrap ────────────────────────────────────────────────────────────
    resize();
    window.addEventListener('resize', resize);

    // First title: scatter particles outward from the text centre so they
    // converge into it on the very first frame.
    initTitle(titleIdx);
    const cx = (canvas.offsetWidth || window.innerWidth) / 2;
    for (let i = 0; i < activeCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist  = rnd(60, Math.max(cx * 0.8, 80));
      particles[i].x = cx  + Math.cos(angle) * dist;
      particles[i].y = CANVAS_H / 2 + Math.sin(angle) * (CANVAS_H * 0.8);
    }

    // ── main animation loop ──────────────────────────────────────────────────
    function frame(ts) {
      if (!running) return;

      if (phaseStart < 0) phaseStart = ts;
      if (lastTs    < 0) lastTs    = ts;
      const dt      = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      const elapsed = ts - phaseStart;

      const ctx = canvas.getContext('2d');
      if (!ctx) { raf = requestAnimationFrame(frame); return; }

      const w  = canvas.offsetWidth || window.innerWidth;
      const sz = getFontSize();
      const font = buildFont(sz);

      ctx.clearRect(0, 0, w, CANVAS_H);
      ctx.font         = font;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';

      // Colour palette – matches portfolio amber/orange theme
      const AMBER  = 'rgba(251, 191, 36, 0.97)';   // amber-400
      const ORANGE = 'rgba(234, 88,  12, 0.97)';   // orange-600
      const CYAN   = 'rgba(110, 210, 245, 0.90)';  // same as SGAParticles

      const formedColor = isDarkRef.current ? AMBER : ORANGE;

      // ── FORM phase: particles converge toward target positions ────────────
      if (phase === 'form') {
        const t  = elapsed / FORM_MS;
        const et = easeOutCubic(t);

        for (let i = 0; i < activeCount; i++) {
          const p = particles[i];

          // Ease position toward target (lerp step per frame)
          p.x += (p.tx - p.x) * 0.10;
          p.y += (p.ty - p.y) * 0.10;

          // After 65 % of the formation time show the real character
          const showActual = t > 0.65;
          ctx.globalAlpha = 0.25 + et * 0.75;
          ctx.fillStyle   = t > 0.50 ? formedColor : CYAN;
          ctx.fillText(showActual ? p.targetChar : p.sgaChar, p.x, p.y);
        }
        ctx.globalAlpha = 1;

        if (t >= 1) {
          // Snap to exact targets to eliminate residual floating-point drift
          for (let i = 0; i < activeCount; i++) {
            particles[i].x = particles[i].tx;
            particles[i].y = particles[i].ty;
          }
          phase      = 'display';
          phaseStart = ts;
        }

      // ── DISPLAY phase: text held steady with a subtle breathing wobble ────
      } else if (phase === 'display') {
        const t    = elapsed / DISPLAY_MS;
        // Fade out during the last 10 % of the display window
        const fade = t > 0.90 ? Math.max(0, 1 - (t - 0.90) / 0.10) : 1;

        for (let i = 0; i < activeCount; i++) {
          const p  = particles[i];
          const wx = Math.sin(ts * 0.0024 + i * 0.9) * 0.8;
          const wy = Math.cos(ts * 0.0020 + i * 0.7) * 0.5;
          ctx.globalAlpha = fade * 0.97;
          ctx.fillStyle   = formedColor;
          ctx.fillText(p.targetChar, p.tx + wx, p.ty + wy);
        }
        ctx.globalAlpha = 1;

        if (t >= 1) {
          // Launch particles outward
          for (let i = 0; i < activeCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = rnd(100, 340);
            particles[i].vx = Math.cos(angle) * speed;
            particles[i].vy = Math.sin(angle) * speed;
          }
          titleIdx   = (titleIdx + 1) % TITLES.length;
          phase      = 'scatter';
          phaseStart = ts;
        }

      // ── SCATTER phase: particles fly away, then next title forms ──────────
      } else {
        const t = elapsed / SCATTER_MS;

        for (let i = 0; i < activeCount; i++) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;

          ctx.globalAlpha = Math.max(0, (1 - t) * 0.85);
          ctx.fillStyle   = CYAN;
          // Show a (slowly) changing SGA glyph for the chaotic look
          ctx.fillText(p.sgaChar, p.x, p.y);
        }
        ctx.globalAlpha = 1;

        if (t >= 1) {
          initTitle(titleIdx);
          phase      = 'form';
          phaseStart = ts;
        }
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []); // run once – isDark changes are handled via ref

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', background: 'transparent', pointerEvents: 'none' }}
      aria-label="Animated professional title"
    />
  );
}

export default function SGAParticleText({ isDark }) {
  return <SGAParticleTextCanvas isDark={isDark} />;
}
