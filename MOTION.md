# Portfolio Motion System & Design Guidelines

This document outlines the motion language, tokens, and implementation guidelines for the portfolio. The goal of this system is to ensure all user interactions (CSS transitions, GSAP scroll triggers, hover animations) feel unified, cohesive, and hit 60fps on modern and mid-range devices.

---

## 1. Motion Principles

- **Buttery Smoothness (60fps):** Standardize animations on CSS/JS transform and opacity changes. Avoid animating layout properties (`width`, `height`, `margin`, `top`, `left`) directly.
- **Physical Feel (Material Easing):** Eases are physical and expressive. Entrance sequences utilize spring/overshoot curves, while decel actions utilize swift exponential decays.
- **Micro-Animations:** Enhance interactive widgets (buttons, links, icons) with lightweight hover triggers to maintain interface responsiveness and engagement.

---

## 2. Easing & Duration Tokens

Both CSS and JavaScript environments reference the exact same bezier easing and duration curves:

### Easing Tokens

| Token Name | Cubic-Bezier Value | GSAP Easing Equivalent | Purpose |
|---|---|---|---|
| `expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | `EASE.expo` | Smooth, swift decay for scroll fades, nav sliders, page transitions |
| `spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `EASE.spring` | Physical bounce/overshoot for floating badges, avatar springbacks |
| `back` | `cubic-bezier(0.175, 0.885, 0.32, 1.1)` | `EASE.back` | Subtle overshoot for staggered item entrances |
| `linear` | `linear` | `EASE.linear` | Uniform, linear progression for scroll scrubbers (timeline, progress bar) |

### Duration Tokens

| Duration Token | Value | Purpose |
|---|---|---|
| `reveal` | `0.9s` | Standard entry reveals, section fades, badge displays |
| `stagger` | `0.08s` | Rhythm delay between sibling cards/list items |
| `pageTransition` | `0.42s` | Curtain slide-in/slide-out screen swaps |
| `themeReveal` | `0.7s` | Circular clipping mask backdrop toggle transition |

---

## 3. Best Practices & Rules

1. **Spotlight & Tilting Effects:**
   - Always route card hover translations/3D tilts through the requestAnimationFrame (rAF) scheduler.
   - Use `AbortController` when setting up event listeners dynamically (e.g., after filter re-renders) to prevent event handler stack-ups.
2. **Scroll flight / sticky headers:**
   - Instead of animating layout widths/margins in JS frame-by-frame on scroll, apply a `.scrolled-avatar` class to the body.
   - Use CSS transitions for the layout shift of target containers, leaving JS to animate only composited `transform` translation/scale.
3. **Skill Bars & Progress Trackers:**
   - Statically assign layout percentage widths.
   - Animate the visual fill using composited `scaleX` or `scaleY` with a defined `transform-origin` (e.g., `left` or `top`).
4. **Performance optimization:**
   - Keep `backdrop-filter: blur(...)` capped at `6px` on mobile layouts.
   - Deliver WebP image assets using `<picture>` tag wrappers with native PNG/JPEG format fallbacks.
