import { FEATURE_FLAGS } from './featureFlags';

/**
 * Permanently disable the 3D system for this browser session.
 * Persists the decision in localStorage so that every subsequent
 * page-load also starts with 3D off, then triggers a reload so the
 * user immediately sees the clean 2-D fallback.
 *
 * @param {string} reason - Human-readable explanation (shown in console).
 */
export function disable3D(reason = 'Manual disable') {
  console.warn(`3D System: DISABLED - ${reason}`);
  console.log('To re-enable: localStorage.removeItem("disable_3d"); location.reload();');
  try {
    localStorage.setItem('disable_3d', 'true');
  } catch {
    // localStorage may be unavailable in some contexts (e.g. private browsing with strict settings)
  }
  window.location.reload();
}

/**
 * Re-enable the 3D system (removes the localStorage flag and reloads).
 * Can be called from the browser console:
 *   import('/src/utils/3dSystem.js').then(m => m.enable3D())
 */
export function enable3D() {
  try {
    localStorage.removeItem('disable_3d');
  } catch {
    // ignore
  }
  window.location.reload();
}

/**
 * Returns true when 3D should currently be rendered.
 * Convenience alias that reads the already-computed FEATURE_FLAGS value.
 */
export function is3DSystemEnabled() {
  return FEATURE_FLAGS.ENABLE_3D_SYSTEM;
}

/**
 * Create a simple FPS tracker object.
 * Intended to be stored in a React ref and updated on every animation frame.
 *
 * Usage in useFrame / requestAnimationFrame:
 *   const fpsTracker = useRef(createFPSTracker());
 *   useFrame(() => tickFPS(fpsTracker.current));
 *
 * @returns {{ frames: number, lastTime: number, lowStreak: number }}
 */
export function createFPSTracker() {
  return { frames: 0, lastTime: performance.now(), lowStreak: 0 };
}

/**
 * Number of consecutive 1-second windows below LOW_FPS_THRESHOLD before
 * the 3D system is auto-disabled.
 */
const LOW_FPS_CONSECUTIVE_SECONDS = 3;

/**
 * Update the FPS tracker on every animation frame.
 * Auto-disables 3D if FPS stays below the configured threshold for
 * LOW_FPS_CONSECUTIVE_SECONDS consecutive 1-second windows.
 *
 * @param {{ frames: number, lastTime: number, lowStreak: number }} tracker
 */
export function tickFPS(tracker) {
  if (!FEATURE_FLAGS.AUTO_DISABLE_3D_ON_LOW_FPS) return;

  tracker.frames += 1;
  const now = performance.now();
  const elapsed = now - tracker.lastTime;

  if (elapsed >= 1000) {
    const fps = (tracker.frames / elapsed) * 1000;
    tracker.frames = 0;
    tracker.lastTime = now;

    if (fps < FEATURE_FLAGS.LOW_FPS_THRESHOLD) {
      tracker.lowStreak += 1;
      if (tracker.lowStreak >= LOW_FPS_CONSECUTIVE_SECONDS) {
        disable3D(`Low FPS detected (${fps.toFixed(1)} fps < ${FEATURE_FLAGS.LOW_FPS_THRESHOLD} threshold)`);
      }
    } else {
      tracker.lowStreak = 0;
    }
  }
}
