import React, { useRef, useEffect } from "react";

// SGA glyphs and some English words for the "formation"
const SGA = [
  "ᔑ", "ʖ", "ᓵ", "↸", "ᒷ", "⎓", "⊣", "⍑", "╎", "⋮",
  "ꖌ", "ꖎ", "ᒲ", "リ", "𝙹", "!", "¡", "ᑑ", "∷", "ᓭ",
  "ℸ", "⚍", "⍊", "∴", "̇/", "||", "⨅"
];
const ENGLISH_WORDS = [
  "HELLO", "PORTFOLIO", "CRAFT", "CODE", "ENCHANT",
  "DESIGN", "GALAXY", "WELCOME", "MINIMAL", "FUTURE"
];
// Map ASCII letters to SGA indices for "readable" effects
const ASCII_TO_SGA = {
  H: 0, E: 19, L: 12, O: 14, P: 9, R: 13, T: 6, F: 8, U: 21, C: 2, D: 4,
  A: 17, S: 20, I: 15, G: 7, N: 23, Y: 24, M: 16, V: 22, W: 10, K: 1, J: 11, Z: 25
};

const CONFIG = {
  PARTICLE_COUNT: 56, // Controls density
  MIN_SIZE: 20,
  MAX_SIZE: 38,
  MIN_SPEED: 0.06,
  MAX_SPEED: 0.22,
  FADE_IN_OUT_TIME: 1.5, // seconds, for smoother alpha
  MAX_LIFE: 7, // seconds
  BLUR: 4, // px
  GLOW: 0.22, // 0–1, more is white, less is original color
  BG_GRADIENT: ["#121528", "#232940"], // background
  PARTICLE_COLOR: "rgba(110, 210, 245, 1)", // premium blue
  PARTICLE_WORD_COLOR: "rgba(255,255,255,0.23)",
  WORD_FORM_INTERVAL: 7000, // ms, how often to form words
  WORD_DISPLAY_TIME: 1800 // ms, how long particles hold word
};

function randomBetween(a, b) { return a + (b - a) * Math.random(); }

function lerp(a, b, t) { return a + (b - a) * t; }

function pickSGALetter(char) {
  const up = char.toUpperCase();
  return up in ASCII_TO_SGA ? SGA[ASCII_TO_SGA[up] % SGA.length] : SGA[Math.floor(Math.random()*SGA.length)];
}

export default function SGAParticles() {
  const canvasRef = useRef();
  const particleList = useRef([]);
  const dimensions = useRef({ width: window.innerWidth, height: window.innerHeight });
  const mouse = useRef({ x: -1000, y: -1000 });
  const formingWord = useRef(false);

  // Utility: set canvas size
  function setCanvasSize() {
    const c = canvasRef.current;
    dimensions.current = { width: window.innerWidth, height: window.innerHeight };
    c.width = dimensions.current.width;
    c.height = dimensions.current.height;
  }

  // Particle factory
  function makeParticle(isWord = false, pos = null, char = null, color = null) {
    const { width, height } = dimensions.current;
    return {
      x: pos?.x ?? randomBetween(0, width),
      y: pos?.y ?? randomBetween(0, height),
      vx: randomBetween(-CONFIG.MAX_SPEED, CONFIG.MAX_SPEED),
      vy: randomBetween(-CONFIG.MAX_SPEED, CONFIG.MAX_SPEED),
      char: char ?? SGA[Math.floor(Math.random() * SGA.length)],
      size: randomBetween(CONFIG.MIN_SIZE, CONFIG.MAX_SIZE),
      opacity: 0,
      maxOpacity: lerp(0.5, 1, Math.random()),
      blur: CONFIG.BLUR,
      color: color ?? CONFIG.PARTICLE_COLOR,
      age: 0,
      fadeInTime: randomBetween(0.6, CONFIG.FADE_IN_OUT_TIME),
      fadeOutTime: randomBetween(0.6, CONFIG.FADE_IN_OUT_TIME),
      life: randomBetween(CONFIG.MAX_LIFE / 2, CONFIG.MAX_LIFE),
      isWord, // part of a word, extra style
    };
  }

  // On mount/setup
  useEffect(() => {
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    // Initial fill
    particleList.current = Array.from({ length: CONFIG.PARTICLE_COUNT }, () => makeParticle());

    // Mouse for subtle repel
    function onMouseMove(e) {
      mouse.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener("mousemove", onMouseMove);

    let wordTimer;
    function scheduleWordForm() {
      wordTimer = setTimeout(() => {
        tryFormWord();
        scheduleWordForm();
      }, CONFIG.WORD_FORM_INTERVAL + randomBetween(0, 3000));
    }
    scheduleWordForm();

    // Word form logic
    function tryFormWord() {
      if (formingWord.current) return;
      formingWord.current = true;
      // Pick a word
      const word = ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
      // Find mid screen
      const { width, height } = dimensions.current;
      // Place letters spaced out, centered
      const spacing = Math.min(42, width / (word.length + 2));
      const startX = width / 2 - ((word.length - 1) * spacing) / 2;
      const midY = randomBetween(height * 0.3, height * 0.7);
      // Assign particles from the pool
      for (let i = 0; i < word.length; i++) {
        let p = particleList.current[i];
        p.x = startX + i * spacing + randomBetween(-8, 8);
        p.y = midY + randomBetween(-8, 8);
        p.vx = randomBetween(-0.04, 0.04);
        p.vy = randomBetween(-0.04, 0.04);
        p.char = pickSGALetter(word[i]);
        p.isWord = true;
        p.color = CONFIG.PARTICLE_WORD_COLOR;
        p.size = lerp(CONFIG.MAX_SIZE * 0.95, CONFIG.MAX_SIZE * 1.08, Math.random());
        p.fadeInTime = 0.4;
        p.fadeOutTime = 1.0;
        p.life = CONFIG.WORD_DISPLAY_TIME / 1000;
        p.maxOpacity = 0.26;
        p.age = 0;
      }
      setTimeout(() => {
        // Revert particles
        for (let i = 0; i < word.length; i++) {
          let p = particleList.current[i];
          Object.assign(p, makeParticle());
        }
        formingWord.current = false;
      }, CONFIG.WORD_DISPLAY_TIME + 500);
    }

    // Animation loop
    let running = true;
    let lastTime = performance.now();

    function animate(ts) {
      if (!running) return;
      const c = canvasRef.current;
      const ctx = c.getContext("2d");
      const dt = Math.min((ts - lastTime) / 1000, 0.33);
      lastTime = ts;
      // BG
      const grad = ctx.createLinearGradient(0, 0, 0, c.height);
      grad.addColorStop(0, CONFIG.BG_GRADIENT[0]);
      grad.addColorStop(1, CONFIG.BG_GRADIENT[1]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, c.width, c.height);
      // Each particle
      for (let p of particleList.current) {
        // Fade opacity in and out based on age/life
        if (p.age < p.fadeInTime) {
          p.opacity = lerp(0, p.maxOpacity, p.age / p.fadeInTime);
        } else if (p.age > p.life - p.fadeOutTime) {
          p.opacity = lerp(p.maxOpacity, 0, (p.age - (p.life - p.fadeOutTime)) / p.fadeOutTime);
        } else {
          p.opacity = p.maxOpacity;
        }
        // Motion
        if (!p.isWord) {
          p.x += p.vx * dt * 60;
          p.y += p.vy * dt * 60;
        }
        // Slight border wrap
        if (p.x < -40) p.x = c.width + 40;
        if (p.x > c.width + 40) p.x = -40;
        if (p.y < -40) p.y = c.height + 40;
        if (p.y > c.height + 40) p.y = -40;
        // Mouse repel
        if (!p.isWord && mouse.current.x > -1) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            const force = (90 - d) / 90 * 1.3;
            p.vx += (dx / (d + 0.1)) * force * 0.07;
            p.vy += (dy / (d + 0.1)) * force * 0.07;
          }
        }
        // Blur/glow
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.filter = `blur(${p.blur}px) drop-shadow(0 0 ${p.size*CONFIG.GLOW}px #fff3)`;
        ctx.font = `700 ${p.size}px 'Segoe UI Symbol', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = p.color;
        ctx.shadowColor = "#cbfaff";
        ctx.shadowBlur = 6;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();

        // Age & recycle
        p.age += dt;
        if (!p.isWord && p.age > p.life) {
          // Reset
          Object.assign(p, makeParticle());
        }
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      running = false;
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", onMouseMove);
      if (wordTimer) clearTimeout(wordTimer);
    };
    // NB: intentionally empty dependency array (only set up once)
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "fixed",
        zIndex: -1,
        top: 0, left: 0,
        width: "100vw", height: "100vh",
        background: "none",
        pointerEvents: "none", // let UI pass through
      }}
      aria-hidden
    />
  );
}
