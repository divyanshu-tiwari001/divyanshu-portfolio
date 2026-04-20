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
  MIN_SIZE: 16,
  MAX_SIZE: 28,
  MIN_SPEED: 0.04,
  MAX_SPEED: 0.15,
  FADE_IN_OUT_TIME: 1.5,
  MAX_LIFE: 7,
  BLUR: 2,
  BG_GRADIENT: ["#121528", "#232940"],
  PARTICLE_COLOR: "rgba(110, 210, 245, 0.8)",
  PARTICLE_WORD_COLOR: "rgba(255,255,255,0.2)",
  WORD_FORM_INTERVAL: 7000,
  WORD_DISPLAY_TIME: 1800,
  // Only calculate mouse repel when mouse is within this distance
  MOUSE_REPEL_RANGE: 80,
  MOUSE_REPEL_RANGE_SQ: 6400,
};

function randomBetween(a, b) { return a + (b - a) * Math.random(); }
function lerp(a, b, t) { return a + (b - a) * t; }
function pickSGALetter(char) {
  const up = char.toUpperCase();
  return up in ASCII_TO_SGA ? SGA[ASCII_TO_SGA[up] % SGA.length] : SGA[Math.floor(Math.random() * SGA.length)];
}

// Particle count: aggressively reduced on mobile to prevent crashes
function getTargetParticleCount() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const area = width * height;
  const dpi = window.devicePixelRatio || 1;
  const isMobile = width < 768;
  // High DPR or small screen signals a low-end / constrained device
  const isLowEnd = dpi > 2 || area < 1_000_000 || (navigator.hardwareConcurrency || 8) <= 4;

  let count;
  if (isMobile) {
    count = isLowEnd
      ? Math.round(6 + (area / 1_000_000) * 3)   // scales ~6–9 across typical mobile areas
      : Math.round(10 + (area / 1_000_000) * 4);  // scales ~10–14 across typical mobile areas
  } else {
    count = isLowEnd
      ? Math.round(18 + (area / (1280 * 800)) * 10) // 18–28
      : Math.round(24 + (area / (1280 * 800)) * 14); // 24–38
  }
  return Math.max(6, Math.min(count, isMobile ? 14 : 38));
}

// Frame rate target: 30 fps on mobile/high-DPI to avoid battery drain
function getTargetFps() {
  const isMobile = window.innerWidth < 768;
  const dpi = window.devicePixelRatio || 1;
  return isMobile || dpi > 2 ? 30 : 60;
}

function isLikelyLowEndDevice() {
  const width = window.innerWidth;
  const area = width * window.innerHeight;
  const dpi = window.devicePixelRatio || 1;
  const cores = navigator.hardwareConcurrency || 8;
  return width < 768 || dpi > 2 || area < 1_000_000 || cores <= 4;
}

function SGAParticlesCanvas() {
  const canvasRef = useRef();
  const particleList = useRef([]);
  const dimensions = useRef({ width: window.innerWidth, height: window.innerHeight, dpr: 1 });
  const mouse = useRef({ x: -1000, y: -1000 });
  const formingWord = useRef(false);

  // Cached rendering state — created once, invalidated on resize
  const cachedGradient = useRef(null);
  // Page Visibility: pause animation when tab is hidden
  const isVisible = useRef(true);
  // Frame-rate cap state
  const targetFps = useRef(getTargetFps());
  const frameIntervalMs = useRef(1000 / targetFps.current);
  // Performance monitoring: track slow frames to detect low-end devices
  const slowFrameCount = useRef(0);
  const isLowEndDevice = useRef(isLikelyLowEndDevice());

  function setCanvasSize() {
    // Cap DPR at 2 to limit memory/rendering cost on high-DPI screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const c = canvasRef.current;

    c.width = Math.round(width * dpr);
    c.height = Math.round(height * dpr);
    c.style.width = width + "px";
    c.style.height = height + "px";

    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    dimensions.current = { width, height, dpr };
    // Invalidate gradient cache so it is rebuilt at the new canvas size
    cachedGradient.current = null;

    // Rescale existing particle positions into the new visible area
    particleList.current.forEach(p => {
      p.x = lerp(0, width, p.x / c.width);
      p.y = lerp(0, height, p.y / c.height);
    });
  }

  function makeParticle(isWord = false, pos = null, char = null, color = null) {
    const { width, height } = dimensions.current;
    return {
      x: pos?.x ?? randomBetween(0, width),
      y: pos?.y ?? randomBetween(0, height),
      vx: randomBetween(-CONFIG.MAX_SPEED, CONFIG.MAX_SPEED),
      vy: randomBetween(-CONFIG.MAX_SPEED, CONFIG.MAX_SPEED),
      char: char ?? SGA[Math.floor(Math.random() * SGA.length)],
      size: randomBetween(CONFIG.MIN_SIZE, CONFIG.MAX_SIZE),
      // Pre-calculate font string to avoid string concatenation every frame
      font: `600 ${Math.round(randomBetween(CONFIG.MIN_SIZE, CONFIG.MAX_SIZE))}px 'Segoe UI Symbol', sans-serif`,
      opacity: 0,
      maxOpacity: lerp(0.4, 0.8, Math.random()),
      color: color ?? CONFIG.PARTICLE_COLOR,
      age: 0,
      fadeInTime: randomBetween(0.4, CONFIG.FADE_IN_OUT_TIME),
      fadeOutTime: randomBetween(0.6, CONFIG.FADE_IN_OUT_TIME),
      life: randomBetween(CONFIG.MAX_LIFE / 2, CONFIG.MAX_LIFE),
      isWord,
    };
  }

  useEffect(() => {
    setCanvasSize();

    // Recalculate frame target after layout is known
    targetFps.current = getTargetFps();
    frameIntervalMs.current = 1000 / targetFps.current;

    window.addEventListener("resize", setCanvasSize);

    let targetCount = getTargetParticleCount();
    particleList.current = Array.from({ length: targetCount }, () => makeParticle());

    // Recheck particle count after orientation settle (safety net)
    const sizeCheckTimer = setTimeout(() => {
      const newCount = getTargetParticleCount();
      if (particleList.current.length > newCount) {
        particleList.current.length = newCount;
      } else if (particleList.current.length < newCount) {
        particleList.current.push(
          ...Array.from({ length: newCount - particleList.current.length }, () => makeParticle())
        );
      }
    }, 1500);

    // Track mouse; only update when moved enough to matter (avoids micro-update spam)
    function onMouseMove(e) {
      const dx = e.clientX - mouse.current.x;
      const dy = e.clientY - mouse.current.y;
      if (dx * dx + dy * dy > 400) { // 400 = 20px squared (distance threshold)
        mouse.current = { x: e.clientX, y: e.clientY };
      }
    }
    window.addEventListener("mousemove", onMouseMove);

    // Page Visibility API — pause/resume animation to save battery
    function onVisibilityChange() {
      isVisible.current = !document.hidden;
      if (isVisible.current) requestAnimationFrame(animate);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let wordTimer;
    function scheduleWordForm() {
      wordTimer = setTimeout(() => {
        if (isVisible.current) tryFormWord();
        scheduleWordForm();
      }, CONFIG.WORD_FORM_INTERVAL + randomBetween(0, 3000));
    }
    scheduleWordForm();

    function tryFormWord() {
      if (formingWord.current || !isVisible.current) return;
      // Skip word formation on low-end devices to reduce rendering load
      if (isLowEndDevice.current) return;
      formingWord.current = true;
      const word = ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
      const { width, height } = dimensions.current;
      const spacing = Math.min(36, width / (word.length + 2));
      const startX = width / 2 - ((word.length - 1) * spacing) / 2;
      const midY = randomBetween(height * 0.3, height * 0.7);

      for (let i = 0; i < word.length && i < particleList.current.length; i++) {
        const p = particleList.current[i];
        p.x = startX + i * spacing + randomBetween(-6, 6);
        p.y = midY + randomBetween(-6, 6);
        p.vx = randomBetween(-0.02, 0.02);
        p.vy = randomBetween(-0.02, 0.02);
        p.char = pickSGALetter(word[i]);
        p.isWord = true;
        p.color = CONFIG.PARTICLE_WORD_COLOR;
        p.size = lerp(CONFIG.MAX_SIZE * 0.9, CONFIG.MAX_SIZE * 1.0, Math.random());
        p.font = `600 ${Math.round(p.size)}px 'Segoe UI Symbol', sans-serif`;
        p.fadeInTime = 0.3;
        p.fadeOutTime = 0.8;
        p.life = CONFIG.WORD_DISPLAY_TIME / 1000;
        p.maxOpacity = 0.2;
        p.age = 0;
      }

      setTimeout(() => {
        for (let i = 0; i < word.length && i < particleList.current.length; i++) {
          Object.assign(particleList.current[i], makeParticle());
        }
        formingWord.current = false;
      }, CONFIG.WORD_DISPLAY_TIME + 500);
    }

    let running = true;
    let lastFrameMs = performance.now();

    function animate(ts) {
      if (!running) return;
      // Pause when tab is hidden — resume via visibilitychange handler
      if (!isVisible.current) return;

      // Frame-rate cap: skip frame if not enough time has elapsed
      const elapsed = ts - lastFrameMs;
      if (elapsed < frameIntervalMs.current) {
        requestAnimationFrame(animate);
        return;
      }
      // Carry over leftover time so the cap stays accurate
      lastFrameMs = ts - (elapsed % frameIntervalMs.current);

      // Performance monitoring: detect slow device after 10 consecutive slow frames
      if (elapsed > frameIntervalMs.current * 2.5) {
        slowFrameCount.current++;
        if (slowFrameCount.current > 10 && !isLowEndDevice.current) {
          isLowEndDevice.current = true;
          // Graceful degradation: halve particle count on confirmed slow device
          const reduced = Math.max(6, Math.floor(particleList.current.length / 2));
          particleList.current.length = reduced;
        }
      }

      const c = canvasRef.current;
      const ctx = c.getContext("2d");
      // Graceful context recovery: if context is unavailable, skip this frame
      if (!ctx) {
        requestAnimationFrame(animate);
        return;
      }
      const { width, height } = dimensions.current;
      // Clamp dt to avoid large jumps after tab-switch resume
      const dt = Math.min(elapsed / 1000, 0.033);

      // Reuse cached gradient; only recreate after resize (cachedGradient nulled in setCanvasSize)
      if (!cachedGradient.current) {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, CONFIG.BG_GRADIENT[0]);
        grad.addColorStop(1, CONFIG.BG_GRADIENT[1]);
        cachedGradient.current = grad;
      }
      ctx.fillStyle = cachedGradient.current;
      ctx.fillRect(0, 0, width, height);

      // Set shared context state once per frame (not inside the particle loop)
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const p of particleList.current) {
        // Fade opacity in / out
        if (p.age < p.fadeInTime) {
          p.opacity = lerp(0, p.maxOpacity, p.age / p.fadeInTime);
        } else if (p.age > p.life - p.fadeOutTime) {
          p.opacity = lerp(p.maxOpacity, 0, (p.age - (p.life - p.fadeOutTime)) / p.fadeOutTime);
        } else {
          p.opacity = p.maxOpacity;
        }

        if (!p.isWord && !prefersReducedMotion) {
          p.x += p.vx * dt * 60;
          p.y += p.vy * dt * 60;
        }

        // Border wrap
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        // Mouse repel: use distance-squared to avoid sqrt unless particle is close enough
        if (!p.isWord && !prefersReducedMotion && mouse.current.x >= 0) {
          const dx = p.x - mouse.current.x;
          const dy = p.y - mouse.current.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONFIG.MOUSE_REPEL_RANGE_SQ) {
            const d = Math.sqrt(distSq);
            const force = (CONFIG.MOUSE_REPEL_RANGE - d) / CONFIG.MOUSE_REPEL_RANGE * 0.9;
            p.vx += (dx / (d + 0.1)) * force * 0.05;
            p.vy += (dy / (d + 0.1)) * force * 0.05;
          }
        }

        ctx.globalAlpha = p.opacity;
        // Reuse pre-calculated font string instead of building it every frame
        ctx.font = p.font;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, Math.round(p.x), Math.round(p.y));

        p.age += dt;
        if (!p.isWord && p.age > p.life) {
          Object.assign(p, makeParticle());
        }
      }

      // Reset globalAlpha so subsequent draws are unaffected
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return () => {
      running = false;
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (wordTimer) clearTimeout(wordTimer);
      clearTimeout(sizeCheckTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "fixed",
        zIndex: -1,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "none",
        pointerEvents: "none",
      }}
      aria-hidden
    />
  );
}

export default function SGAParticles({ enabled = false }) {
  if (!enabled) return null;
  return <SGAParticlesCanvas />;
}
