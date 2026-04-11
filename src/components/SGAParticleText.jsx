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

// Phase durations in milliseconds
const SCATTER_MS = 600;   // 0-0.6s  – chaotic scatter across viewport
const ABSORB_MS  = 1200;  // 0.6-1.8s – magnetic inflow toward text
const LOCK_MS    = 2200;  // 1.8-4.0s – text holds steady
const DISPERSE_MS = 600;  // 4.0-4.6s – particles scatter outward

// How far outside the viewport edges particles spawn when streaming in
const EDGE_OFFSET_MIN = 20;
const EDGE_OFFSET_MAX = 140;

function rnd(a, b) { return a + (b - a) * Math.random(); }
function easeInCubic(t) { const c = Math.min(t, 1); return c * c * c; }

// ─── inner canvas component ──────────────────────────────────────────────────
function SGAParticleTextCanvas({ isDark, anchorRef }) {
  const canvasRef = useRef(null);
  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let running    = true;
    let raf        = null;
    let titleIdx   = 0;
    let phase      = 'scatter';
    let phaseStart = -1;
    let lastTs     = -1;
    let particles  = [];
    let activeCount = 0;
    let isFirstTitle = true;

    // ── canvas sizing (full viewport, fixed) ─────────────────────────────────
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(window.innerWidth  * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ── viewport position of the text centre ─────────────────────────────────
    function getTextCenter() {
      if (anchorRef && anchorRef.current) {
        const r = anchorRef.current.getBoundingClientRect();
        return { x: window.innerWidth / 2, y: r.top + r.height / 2 };
      }
      return { x: window.innerWidth / 2, y: window.innerHeight * 0.42 };
    }

    // ── font helpers ─────────────────────────────────────────────────────────
    function getFontSize() {
      const w = window.innerWidth;
      if (w < 480) return 18;
      if (w < 768) return 22;
      return 26;
    }
    function buildFont(sz) {
      return `700 ${sz}px 'Poppins', 'Segoe UI Symbol', sans-serif`;
    }

    // ── per-character target positions in viewport coordinates ───────────────
    function getLetterPositions(title) {
      const off = document.createElement('canvas').getContext('2d');
      const sz  = getFontSize();
      off.font  = buildFont(sz);
      const totalW = off.measureText(title).width;
      const center = getTextCenter();
      let x = center.x - totalW / 2;
      return title.split('').map(c => {
        const cw  = off.measureText(c).width;
        const pos = { x: x + cw / 2, y: center.y, char: c };
        x += cw;
        return pos;
      });
    }

    // ── initialise particles for the given title ─────────────────────────────
    function initTitle(idx) {
      const positions = getLetterPositions(TITLES[idx]);
      activeCount = positions.length;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      while (particles.length < activeCount) {
        particles.push({
          x: 0, y: 0, vx: 0, vy: 0,
          tx: 0, ty: 0,
          sgaChar: '', targetChar: '',
          rotation: 0, scale: 0.6, opacity: 0,
          sgaTimer: 0,
        });
      }

      for (let i = 0; i < activeCount; i++) {
        let sx, sy;
        if (isFirstTitle) {
          // First word: particles scattered across the visible viewport
          sx = rnd(vw * 0.05, vw * 0.95);
          sy = rnd(vh * 0.05, vh * 0.95);
        } else {
          // Subsequent words: stream in from viewport edges (enchanting-table pull)
          const edge = Math.floor(Math.random() * 4);
          if      (edge === 0) { sx = rnd(0, vw);                        sy = rnd(-EDGE_OFFSET_MAX, -EDGE_OFFSET_MIN); }
          else if (edge === 1) { sx = rnd(vw + EDGE_OFFSET_MIN, vw + EDGE_OFFSET_MAX); sy = rnd(0, vh);   }
          else if (edge === 2) { sx = rnd(0, vw);                        sy = rnd(vh + EDGE_OFFSET_MIN, vh + EDGE_OFFSET_MAX); }
          else                 { sx = rnd(-EDGE_OFFSET_MAX, -EDGE_OFFSET_MIN);          sy = rnd(0, vh);    }
        }

        const p = particles[i];
        p.x          = sx;
        p.y          = sy;
        p.tx         = positions[i].x;
        p.ty         = positions[i].y;
        p.targetChar = positions[i].char;
        p.sgaChar    = SGA[Math.floor(Math.random() * SGA.length)];
        p.vx         = rnd(-60, 60);
        p.vy         = rnd(-60, 60);
        p.rotation   = rnd(-Math.PI * 2, Math.PI * 2);
        p.scale      = rnd(0.5, 0.8);
        p.opacity    = 0;
        p.sgaTimer   = 0;
      }

      isFirstTitle = false;
    }

    // ── bootstrap ────────────────────────────────────────────────────────────
    resize();
    window.addEventListener('resize', resize);
    initTitle(titleIdx);

    // ── main animation loop ──────────────────────────────────────────────────
    function frame(ts) {
      if (!running) return;

      if (phaseStart < 0) phaseStart = ts;
      if (lastTs    < 0) lastTs     = ts;
      const dt      = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;

      const elapsed = ts - phaseStart;

      const ctx = canvas.getContext('2d');
      if (!ctx) { raf = requestAnimationFrame(frame); return; }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const sz   = getFontSize();
      const font = buildFont(sz);
      ctx.font         = font;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';

      const CYAN        = 'rgba(110, 210, 245, 0.90)';
      const AMBER       = 'rgba(251, 191, 36,  1.00)';
      const ORANGE      = 'rgba(234, 88,  12,  1.00)';
      const formedColor = isDarkRef.current ? AMBER : ORANGE;

      // ── SCATTER: particles drift chaotically across the viewport ──────────
      if (phase === 'scatter') {
        const t = Math.min(elapsed / SCATTER_MS, 1);

        for (let i = 0; i < activeCount; i++) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;

          // Cycle SGA glyph every ~150 ms for a chaotic shimmer
          p.sgaTimer += dt;
          if (p.sgaTimer > 0.12 + Math.random() * 0.08) {
            p.sgaChar  = SGA[Math.floor(Math.random() * SGA.length)];
            p.sgaTimer = 0;
          }

          p.opacity = Math.min(0.75, t * 2.0);

          ctx.save();
          ctx.translate(p.x, p.y);
          p.rotation += rnd(-0.06, 0.06);
          ctx.rotate(p.rotation);
          ctx.scale(p.scale, p.scale);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle   = CYAN;
          ctx.fillText(p.sgaChar, 0, 0);
          ctx.restore();
        }

        if (elapsed >= SCATTER_MS) { phase = 'absorb'; phaseStart = ts; }

      // ── ABSORB: cubic-ease-in magnetic pull toward letter targets ──────────
      } else if (phase === 'absorb') {
        const t     = Math.min(elapsed / ABSORB_MS, 1);
        const accel = easeInCubic(t);  // pull strength accelerates over time
        // Diagonal viewport distance – computed once per frame, reused per particle
        const diag  = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);

        for (let i = 0; i < activeCount; i++) {
          const p    = particles[i];
          const pull = 0.03 + accel * 0.22;   // slow drift → fast snap

          p.x += (p.tx - p.x) * pull;
          p.y += (p.ty - p.y) * pull;

          // Spin decays toward 0 as particle locks in
          p.rotation *= 0.90;

          // Proximity-based scale and opacity ramp
          const dx   = p.tx - p.x;
          const dy   = p.ty - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const prox = Math.max(0, 1 - dist / (diag * 0.5));

          p.scale   = 0.50 + prox * 0.50;   // 0.5 → 1.0
          p.opacity = 0.20 + prox * 0.80;   // 0.2 → 1.0

          // Switch from SGA glyph to real character at 70 % of absorb
          const showActual = t > 0.70;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.scale(p.scale, p.scale);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle   = t > 0.50 ? formedColor : CYAN;
          ctx.fillText(showActual ? p.targetChar : p.sgaChar, 0, 0);
          ctx.restore();
        }

        if (elapsed >= ABSORB_MS) {
          // Snap to exact targets to remove floating-point drift
          for (let i = 0; i < activeCount; i++) {
            particles[i].x        = particles[i].tx;
            particles[i].y        = particles[i].ty;
            particles[i].rotation = 0;
            particles[i].scale    = 1.0;
            particles[i].opacity  = 1.0;
          }
          phase = 'lock'; phaseStart = ts;
        }

      // ── LOCK: text held steady with a subtle breathing wobble ─────────────
      } else if (phase === 'lock') {
        const t = Math.min(elapsed / LOCK_MS, 1);
        // Fade in during first 5 %, hold, fade out during last 15 %
        let fade;
        if      (t < 0.05) fade = t / 0.05;
        else if (t > 0.85) fade = Math.max(0, 1 - (t - 0.85) / 0.15);
        else               fade = 1;

        ctx.globalAlpha = fade * 0.97;
        ctx.fillStyle   = formedColor;
        for (let i = 0; i < activeCount; i++) {
          const p  = particles[i];
          const wx = Math.sin(ts * 0.0020 + i * 0.9) * 0.7;
          const wy = Math.cos(ts * 0.0016 + i * 0.7) * 0.4;
          ctx.fillText(p.targetChar, p.tx + wx, p.ty + wy);
        }
        ctx.globalAlpha = 1;

        if (elapsed >= LOCK_MS) {
          // Fan particles outward from text centre
          const center = getTextCenter();
          for (let i = 0; i < activeCount; i++) {
            const angle = Math.atan2(
              particles[i].ty - center.y,
              particles[i].tx - center.x
            ) + rnd(-0.6, 0.6);
            const speed = rnd(200, 600);
            particles[i].vx       = Math.cos(angle) * speed;
            particles[i].vy       = Math.sin(angle) * speed;
            particles[i].rotation = rnd(-Math.PI, Math.PI);
          }
          titleIdx = (titleIdx + 1) % TITLES.length;
          phase = 'disperse'; phaseStart = ts;
        }

      // ── DISPERSE: particles scatter outward, then next title begins ────────
      } else {
        const t = Math.min(elapsed / DISPERSE_MS, 1);

        for (let i = 0; i < activeCount; i++) {
          const p = particles[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.rotation += 0.12;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = Math.max(0, (1 - t) * 0.85);
          ctx.fillStyle   = CYAN;
          ctx.fillText(p.sgaChar, 0, 0);
          ctx.restore();
        }
        ctx.globalAlpha = 1;

        if (elapsed >= DISPERSE_MS) {
          initTitle(titleIdx);
          phase = 'scatter'; phaseStart = ts;
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
  }, []); // run once – isDark / anchorRef changes handled via refs

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 15,
        pointerEvents: 'none',
        background: 'transparent',
      }}
      aria-label="Animated professional title"
    />
  );
}

export default function SGAParticleText({ isDark, anchorRef }) {
  return <SGAParticleTextCanvas isDark={isDark} anchorRef={anchorRef} />;
}
