// --- CUBIC BEZIER SOLVER ---
function cubicBezier(x1, y1, x2, y2) {
  return function(t) {
    if (t === 0 || t === 1) return t;
    
    // Binary search solver (8 iterations is fast and accurate enough)
    let start = 0, end = 1;
    for (let i = 0; i < 8; i++) {
      const mid = (start + end) / 2;
      // Calculate x(mid) on Bezier curve
      const x = 3 * Math.pow(1 - mid, 2) * mid * x1 + 3 * (1 - mid) * Math.pow(mid, 2) * x2 + Math.pow(mid, 3);
      if (Math.abs(x - t) < 0.001) {
        return 3 * Math.pow(1 - mid, 2) * mid * y1 + 3 * (1 - mid) * Math.pow(mid, 2) * y2 + Math.pow(mid, 3);
      }
      if (x < t) {
        start = mid;
      } else {
        end = mid;
      }
    }
    const mid = (start + end) / 2;
    return 3 * Math.pow(1 - mid, 2) * mid * y1 + 3 * (1 - mid) * Math.pow(mid, 2) * y2 + Math.pow(mid, 3);
  };
}

// --- MOTION TOKENS ---
// Mirrors the CSS custom properties exactly:
// --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
// --ease-out-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
// --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.1);
export const EASE = {
  expo: cubicBezier(0.16, 1, 0.3, 1),
  spring: cubicBezier(0.34, 1.56, 0.64, 1),
  back: cubicBezier(0.175, 0.885, 0.32, 1.1),
  linear: (t) => t
};

export const DURATION = {
  reveal: 0.9,
  stagger: 0.08,
  pageTransition: 0.42,
  themeReveal: 0.7
};

// --- UTILITIES ---
// Coalesces multiple synchronous/high-frequency calls to requestAnimationFrame
export function requestAnimationFrameCoalesce(fn) {
  let rafId = null;
  return function(...args) {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      fn(...args);
      rafId = null;
    });
  };
}
