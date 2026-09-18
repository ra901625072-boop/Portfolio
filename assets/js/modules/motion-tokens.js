// --- CUBIC BEZIER SOLVER ---
export function cubicBezier(x1, y1, x2, y2) {
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

// --- NATIVE GSAP EASING TOKENS ---
// Optimized string references that GSAP compiles directly to native C++/JS curves
export const GSAP_EASE = {
  expo: "expo.out",
  spring: "back.out(1.5)",
  back: "back.out(1.2)",
  power: "power3.out",
  sine: "sine.inOut",
  linear: "none"
};

// --- MOTION TOKENS ---
// Mirrors the CSS custom properties exactly:
// --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
// --ease-out-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
// --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.15);
export const EASE = {
  expo: GSAP_EASE.expo,
  spring: GSAP_EASE.spring,
  back: GSAP_EASE.back,
  power: GSAP_EASE.power,
  sine: GSAP_EASE.sine,
  linear: GSAP_EASE.linear,
  // Function versions for manual canvas/RAF loops if needed
  fnExpo: cubicBezier(0.16, 1, 0.3, 1),
  fnSpring: cubicBezier(0.34, 1.56, 0.64, 1),
  fnBack: cubicBezier(0.175, 0.885, 0.32, 1.15)
};

export const DURATION = {
  instant: 0.12,
  micro: 0.2,
  component: 0.35,
  reveal: 0.65,
  stagger: 0.06,
  pageTransition: 0.4,
  themeReveal: 0.5
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

// Smooth Linear Interpolation
export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

// Value clamp helper
export function clamp(min, val, max) {
  return Math.max(min, Math.min(val, max));
}
