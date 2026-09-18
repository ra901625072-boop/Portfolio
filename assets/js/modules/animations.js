import { lenis } from "../app.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, DURATION, requestAnimationFrameCoalesce } from "./motion-tokens.js";
import { initSpaceBackdrop } from "./space-backdrop.js";

gsap.registerPlugin(ScrollTrigger);

// --- CUSTOM CURSOR FOLLOWER with Magnetic Snapping ---
// (Kept as vanilla JS — already premium-quality with manual lerp and GPU compositing)
function initCustomCursor() {
  const cursor = document.querySelector(".custom-cursor");
  const dot = document.querySelector(".custom-cursor-dot");
  if (!cursor || !dot) return;

  // Track position
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let dotX = 0, dotY = 0;
  let snappedEl = null;
  let cachedRect = null;
  let cachedBorderRadius = '';

  // Magnetic snapping coordinate interpolation
  let targetPullX = 0, targetPullY = 0;
  let currentPullX = 0, currentPullY = 0;

  // Disable custom cursor only if the primary pointer is touch (e.g. phones/tablets)
  const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchPrimary) {
    cursor.style.display = 'none';
    dot.style.display = 'none';
    return;
  }

  let isCursorAnimating = false;

  function startCursorLoop() {
    if (!isCursorAnimating) {
      isCursorAnimating = true;
      requestAnimationFrame(animateCursor);
    }
  }

  let firstMove = true;
  // Global mouse position tracking (no reflows)
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Fade in cursor only on first movement to prevent ghost cursor at (0,0) on load
    if (firstMove) {
      cursor.style.opacity = '1';
      dot.style.opacity = '1';
      firstMove = false;
    }

    startCursorLoop();
  });

  // Attach magnetic snap listeners to interactive elements
  function bindMagneticElements(scope = document) {
    const selector = ".social-circle, .btn, .btn-secondary, .filter-btn, .nav-link, .hamburger, .scroll-top-btn, .theme-toggle-btn, .tab-btn, .modal-close-btn";
    const magnetics = scope.querySelectorAll(selector);

    magnetics.forEach(el => {
      if (el._magneticBound) return;
      el._magneticBound = true;

      el.addEventListener("mouseenter", () => {
        cachedRect = el.getBoundingClientRect();
        snappedEl = el;
        cachedBorderRadius = window.getComputedStyle(el).borderRadius;
        el.style.transition = 'none';
        cursor.classList.add("snapped");
        startCursorLoop();
      });

      el.addEventListener("mousemove", (e) => {
        if (!cachedRect) cachedRect = el.getBoundingClientRect();
        const elX = cachedRect.left + cachedRect.width / 2;
        const elY = cachedRect.top + cachedRect.height / 2;
        // Proportional pull strength: smaller elements pull more, larger elements resist displacement to retain hover focus
        const maxDim = Math.max(cachedRect.width, cachedRect.height);
        const pullStrength = Math.min(0.35, 26 / maxDim);

        targetPullX = (e.clientX - elX) * pullStrength;
        targetPullY = (e.clientY - elY) * pullStrength;
        startCursorLoop();
      });

      el.addEventListener("mouseleave", () => {
        const releasingEl = snappedEl;
        let releasePullX = currentPullX;
        let releasePullY = currentPullY;

        // Elastic release animation back to (0,0)
        function animateRelease() {
          if (snappedEl === releasingEl) return; // cancel if mouse re-enters

          releasePullX += (0 - releasePullX) * 0.18;
          releasePullY += (0 - releasePullY) * 0.18;

          if (Math.abs(releasePullX) < 0.05 && Math.abs(releasePullY) < 0.05) {
            releasingEl.style.transform = '';
            releasingEl.style.transition = '';
          } else {
            releasingEl.style.transform = `translate3d(${releasePullX}px, ${releasePullY}px, 0)`;
            requestAnimationFrame(animateRelease);
          }
        }

        snappedEl = null;
        cachedRect = null;
        cachedBorderRadius = '';
        targetPullX = 0;
        targetPullY = 0;
        currentPullX = 0;
        currentPullY = 0;
        cursor.classList.remove("snapped");

        releasingEl.style.transition = 'none';
        requestAnimationFrame(animateRelease);
        startCursorLoop();
      });
    });
  }

  // Initial magnetic binding
  bindMagneticElements();

  // Re-bind on layout changes or dynamic injections
  window.addEventListener("recalc-offsets", () => bindMagneticElements(), { passive: true });
  document.addEventListener("site-loaded", () => bindMagneticElements(), { once: true });

  // Recalculate dimensions on scroll to prevent offset errors
  window.addEventListener("scroll", () => {
    if (snappedEl) {
      cachedRect = snappedEl.getBoundingClientRect();
    }
  }, { passive: true });

  // Lerp cursor movement
  function animateCursor() {
    if (snappedEl && cachedRect) {
      const targetWidth = cachedRect.width + 10;
      const targetHeight = cachedRect.height + 10;
      const targetX = cachedRect.left + cachedRect.width / 2;
      const targetY = cachedRect.top + cachedRect.height / 2;

      cursorX += (targetX - cursorX) * 0.22;
      cursorY += (targetY - cursorY) * 0.22;

      cursor.style.width = `${targetWidth}px`;
      cursor.style.height = `${targetHeight}px`;
      cursor.style.borderRadius = cachedBorderRadius || '';
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate3d(-50%, -50%, 0)`;

      // Lerp magnetic pull displacement
      currentPullX += (targetPullX - currentPullX) * 0.2;
      currentPullY += (targetPullY - currentPullY) * 0.2;
      snappedEl.style.transform = `translate3d(${currentPullX}px, ${currentPullY}px, 0)`;

      dotX += (mouseX - dotX) * 0.38;
      dotY += (mouseY - dotY) * 0.38;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate3d(-50%, -50%, 0)`;
    } else {
      // Normal cursor behavior
      cursorX += (mouseX - cursorX) * 0.14;
      cursorY += (mouseY - cursorY) * 0.14;

      cursor.style.width = '';
      cursor.style.height = '';
      cursor.style.borderRadius = '';
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate3d(-50%, -50%, 0)`;

      dotX += (mouseX - dotX) * 0.32;
      dotY += (mouseY - dotY) * 0.32;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate3d(-50%, -50%, 0)`;
    }

    const deltaX = Math.abs(mouseX - cursorX);
    const deltaY = Math.abs(mouseY - cursorY);
    const dotDeltaX = Math.abs(mouseX - dotX);
    const dotDeltaY = Math.abs(mouseY - dotY);

    if (!snappedEl && deltaX < 0.1 && deltaY < 0.1 && dotDeltaX < 0.1 && dotDeltaY < 0.1) {
      isCursorAnimating = false;
      return;
    }

    requestAnimationFrame(animateCursor);
  }
  startCursorLoop();

  // Dynamic Event Delegation for Clickable and Action-Text Elements
  document.addEventListener("mouseover", (e) => {
    const hoverable = e.target.closest("a, button, .project-card, .achievement-card, .form-control, .visitor-counter, .tab-btn, .filter-btn");
    if (!hoverable) return;

    const cursorText = hoverable.getAttribute("data-cursor-text");
    if (cursorText) {
      cursor.classList.add("has-text");
      const textSpan = cursor.querySelector(".custom-cursor-text");
      if (textSpan) textSpan.innerText = cursorText;
    } else {
      if (!cursor.classList.contains("snapped") && !cursor.classList.contains("has-text")) {
        cursor.classList.add("hovered");
      }
    }
  });

  document.addEventListener("mouseout", (e) => {
    const hoverable = e.target.closest("a, button, .project-card, .achievement-card, .form-control, .visitor-counter, .tab-btn, .filter-btn");
    if (!hoverable) return;

    // Ignore if transitioning internally between child elements
    const related = e.relatedTarget;
    if (related && hoverable.contains(related)) return;

    cursor.classList.remove("hovered", "has-text");
    const textSpan = cursor.querySelector(".custom-cursor-text");
    if (textSpan) textSpan.innerText = "";
  });

  // Hide on mouseleave/show on mouseenter document window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = '0';
    dot.style.opacity = '0';
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = '1';
    dot.style.opacity = '1';
  });
}

// --- GSAP SCROLL REVEAL ANIMATIONS ---
function initScrollReveals() {
  const sections = document.querySelectorAll(".reveal");

  sections.forEach(section => {
    // Keep section container in normal flow
    gsap.set(section, { opacity: 1, y: 0 });

    // Choreograph section header elements if present
    const header = section.querySelector(".section-header");
    if (header) {
      const subtitle = header.querySelector(".section-subtitle");
      const title = header.querySelector(".section-title");
      const desc = header.querySelector(".section-desc");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 88%",
          once: true
        }
      });

      if (subtitle) {
        tl.fromTo(subtitle,
          { opacity: 0, scale: 0.92, y: 14 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: EASE.spring }
        );
      }
      if (title) {
        tl.fromTo(title,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65, ease: EASE.expo },
          subtitle ? "-=0.35" : 0
        );
      }
      if (desc) {
        tl.fromTo(desc,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: EASE.expo },
          "-=0.4"
        );
      }
    }

    // Section triggers for specific section behaviors
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => {
        // Trigger skill bars filling
        if (section.id === "skills") {
          animateSkillsBars();
        }

        // Trigger stats counters
        if (section.id === "about") {
          animateStatsCounters();
        }

        // Trigger timeline offset recalculation
        if (section.id === "experience") {
          window.dispatchEvent(new CustomEvent("recalc-offsets"));
        }
      }
    });
  });

  // Staggered children: Animate direct children of `.reveal-stagger` containers
  const staggerContainers = document.querySelectorAll(".reveal-stagger");

  staggerContainers.forEach(container => {
    const children = Array.from(container.children).filter(c => !c.classList.contains("timeline-progress-line"));
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y: 24, scale: 0.96 });

    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const isMobile = window.innerWidth <= 768;
        gsap.to(children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: DURATION.reveal,
          ease: EASE.back,
          stagger: isMobile ? DURATION.stagger * 0.5 : DURATION.stagger,
          clearProps: "transform,opacity",
        });
      }
    });
  });

  // Hero scroll-down prompt opacity dissolve on scroll
  const scrollDown = document.querySelector(".scroll-down");
  if (scrollDown) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(0, 1 - scrollY / 120);
      scrollDown.style.opacity = opacity.toFixed(2);
      scrollDown.style.pointerEvents = opacity <= 0.05 ? "none" : "auto";
    }, { passive: true });
  }
}

// --- GSAP PERCENTAGE TEXT COUNT-UP ---
export function animatePercentageText(element, targetVal) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetVal,
    duration: 1.2,
    ease: EASE.expo,
    onUpdate: () => {
      element.innerText = `${Math.round(obj.val)}%`;
    }
  });
}

// --- GSAP SKILLS CARDS REVEAL ---
let skillsAnimated = false;
export function animateSkillsBars() {
  if (skillsAnimated) return;
  skillsAnimated = true;

  const activePane = document.querySelector(".skills-pane.active");
  if (!activePane) return;
  const cards = activePane.querySelectorAll(".skill-card");
  if (cards.length === 0) return;

  gsap.fromTo(cards, 
    { opacity: 0, y: 16, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: DURATION.reveal,
      stagger: 0.06,
      ease: EASE.expo,
      clearProps: "transform"
    }
  );
}

// --- GSAP STATS COUNT-UP ---
let statsAnimated = false;
export function animateStatsCounters() {
  if (statsAnimated) return;
  statsAnimated = true;

  const stats = document.querySelectorAll(".stat-number span");
  stats.forEach((stat, index) => {
    const target = parseInt(stat.dataset.target, 10);
    const obj = { count: 0 };
    const statItem = stat.closest(".stat-item");

    gsap.to(obj, {
      count: target,
      duration: 1.8,
      delay: index * 0.12,
      ease: EASE.expo,
      onUpdate: () => {
        stat.innerText = Math.floor(obj.count);
      },
      onComplete: () => {
        stat.innerText = target;
        if (statItem) {
          gsap.fromTo(statItem,
            { scale: 1.06 },
            { scale: 1, duration: 0.45, ease: EASE.spring, clearProps: "transform" }
          );
        }
      }
    });
  });
}

// --- TYPING SUBTITLE TEXT EFFECT ---
class TextTyper {
  constructor(element, words, waitTime = 2000) {
    this.element = element;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.waitTime = parseInt(waitTime, 10);
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentWordIndex = this.wordIndex % this.words.length;
    const fullWord = this.words[currentWordIndex];

    if (this.isDeleting) {
      this.txt = fullWord.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullWord.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = `${this.txt}<span class="typing-cursor">|</span>`;

    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed = 50; // faster deleting
    } else {
      // Simulate real human typing rhythm
      typeSpeed = 80 + Math.random() * 80;
    }

    if (!this.isDeleting && this.txt === fullWord) {
      typeSpeed = this.waitTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

function initTypingEffect() {
  const target = document.querySelector(".typed-text");
  if (!target) return;
  let words;
  try {
    words = JSON.parse(target.dataset.words);
  } catch (e) {
    console.warn('Invalid typed-text data-words JSON:', e);
    return;
  }
  new TextTyper(target, words);
}

// --- GSAP AVATAR MOUSE PARALLAX (3D tilt & Floating Badges Depth) ---
function initAvatarParallax() {
  const visual = document.querySelector(".hero-visual");
  const card = document.querySelector(".hero-avatar-card");
  const badge1 = document.querySelector(".badge-1");
  const badge2 = document.querySelector(".badge-2");
  if (!visual || !card) return;

  // Disable mouse parallax on touch devices entirely
  const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchPrimary) return;

  let rect = null;
  function updateRect() {
    rect = visual.getBoundingClientRect();
  }

  // Use gsap.quickTo for buttery-smooth interpolation
  const rotX = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: EASE.expo });
  const rotY = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: EASE.expo });
  const moveX = gsap.quickTo(card, "x", { duration: 0.5, ease: EASE.expo });
  const moveY = gsap.quickTo(card, "y", { duration: 0.5, ease: EASE.expo });

  const b1X = badge1 ? gsap.quickTo(badge1, "x", { duration: 0.6, ease: EASE.expo }) : null;
  const b1Y = badge1 ? gsap.quickTo(badge1, "y", { duration: 0.6, ease: EASE.expo }) : null;
  const b2X = badge2 ? gsap.quickTo(badge2, "x", { duration: 0.6, ease: EASE.expo }) : null;
  const b2Y = badge2 ? gsap.quickTo(badge2, "y", { duration: 0.6, ease: EASE.expo }) : null;

  gsap.set(card, { transformPerspective: 1000 });

  visual.addEventListener("mouseenter", updateRect);
  window.addEventListener("resize", () => { if (rect) updateRect(); }, { passive: true });
  window.addEventListener("scroll", () => { if (rect) updateRect(); }, { passive: true });

  visual.addEventListener("mousemove", (e) => {
    if (!rect) updateRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    rotY(x * 0.05);
    rotX(-y * 0.05);
    moveX(x * 0.02);
    moveY(y * 0.02);

    if (b1X && b1Y) {
      b1X(-x * 0.035);
      b1Y(-y * 0.035);
    }
    if (b2X && b2Y) {
      b2X(x * 0.03);
      b2Y(y * 0.03);
    }
  });

  visual.addEventListener("mouseleave", () => {
    rect = null;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: EASE.spring,
    });
    if (badge1) gsap.to(badge1, { x: 0, y: 0, duration: 0.8, ease: EASE.spring });
    if (badge2) gsap.to(badge2, { x: 0, y: 0, duration: 0.8, ease: EASE.spring });
  });
}

// --- GSAP TIMELINE SCROLL HIGHLIGHT ---
function initTimelineScrollHighlight() {
  const timeline = document.querySelector(".timeline");
  const progressLine = document.querySelector(".timeline-progress-line");
  const items = document.querySelectorAll(".timeline-item");
  if (!timeline || !progressLine) return;

  // Set initial state with xPercent: -50 and transformOrigin: "top center" so GSAP keeps the line centered across all mobile/desktop screen sizes
  gsap.set(progressLine, {
    scaleY: 0,
    xPercent: -50,
    transformOrigin: "top center"
  });

  // Animate the progress line scaleY with ScrollTrigger scrub
  ScrollTrigger.create({
    trigger: timeline,
    start: "top 75%",
    end: "bottom 75%",
    scrub: 0.1,
    onUpdate: (self) => {
      gsap.set(progressLine, { scaleY: self.progress });
    }
  });

  // Animate individual timeline items with dynamic ignition pulse
  items.forEach(item => {
    const dot = item.querySelector(".timeline-dot");
    if (!dot) return;

    ScrollTrigger.create({
      trigger: item,
      start: "top 75%",
      onEnter: () => {
        dot.classList.add("active", "dot-ignited");
        setTimeout(() => dot.classList.remove("dot-ignited"), 700);
        item.classList.add("illuminated");
      },
      onLeaveBack: () => {
        dot.classList.remove("active", "dot-ignited");
        item.classList.remove("illuminated");
      }
    });
  });

  // Auto-refresh ScrollTrigger when section comes into view, on resize, orientation change, or site loaded
  const experienceSection = document.getElementById("experience");
  if (experienceSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ScrollTrigger.refresh();
        }
      });
    }, { threshold: [0.01, 0.2] });
    observer.observe(experienceSection);
  }

  window.addEventListener("resize", () => ScrollTrigger.refresh(), { passive: true });
  window.addEventListener("orientationchange", () => ScrollTrigger.refresh(), { passive: true });
  document.addEventListener("site-loaded", () => ScrollTrigger.refresh());
}

// --- INTERACTIVE INFINITY BRUSH BACKGROUND ---
function initInfinityAnimation() {
  const canvas = document.getElementById("hero-infinity-canvas");
  const hero = document.getElementById("hero");
  if (!canvas || !hero) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  const isMobile = window.innerWidth <= 768;
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

  // Cache theme state to avoid querying DOM every frame inside the animation loop
  let isLight = document.body.classList.contains("light-mode");
  const handleThemeChange = (e) => {
    isLight = e.detail.isLight;
  };
  window.addEventListener("theme-changed", handleThemeChange);

  // Track visibility to pause animation loop when scrolled out of view
  let isVisible = true;
  let rafId = null;
  let lastTime = performance.now();

  function startLoop() {
    if (!rafId && isVisible) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(render);
    }
  }

  function stopLoop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    });
  }, { threshold: 0.1 });
  observer.observe(hero);

  // Pre-calculate base lemniscate points (360 points on desktop for silky smooth curvature)
  const segments = isMobile ? 240 : 360;
  const basePoints = [];
  const vertScale = 0.85;
  const stepT = (Math.PI * 2) / segments;

  for (let s = 0; s <= segments; s++) {
    const t = s * stepT;
    const denom = 1 + Math.sin(t) * Math.sin(t);

    // Position ratios relative to radius
    const xRatio = Math.cos(t) / denom;
    const yRatio = (Math.sin(t) * Math.cos(t) * vertScale) / denom;

    // True mathematical tangent & normal computation
    const nextT = t + 0.008;
    const nextDenom = 1 + Math.sin(nextT) * Math.sin(nextT);
    const nx = Math.cos(nextT) / nextDenom;
    const ny = (Math.sin(nextT) * Math.cos(nextT) * vertScale) / nextDenom;

    const dx = nx - xRatio;
    const dy = ny - yRatio;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const px = -dy / len;
    const py = dx / len;

    basePoints.push({
      t,
      xRatio,
      yRatio,
      px,
      py
    });
  }

  // Resize handler
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  // Generate bristles once (refined, gentle organic ribbon)
  const bristleCount = isMobile ? 18 : 36;
  const bristles = [];
  for (let i = 0; i < bristleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const offsetMag = Math.random() * 16; // Refined brush spread

    // Core bristles vs outer spray
    const density = Math.random();
    const bristleWidth = density < 0.25 ? 0.35 : density < 0.8 ? 0.65 : 1.2;
    const bristleOpacity = density < 0.25 ? 0.08 : density < 0.8 ? 0.16 : 0.04;

    bristles.push({
      dx: Math.cos(angle) * offsetMag,
      dy: Math.sin(angle) * offsetMag,
      width: bristleWidth,
      opacity: bristleOpacity,
      freq: 2.5 + Math.random() * 3.5, // Wider, gentler undulating waves
      amp: 0.8 + Math.random() * 1.8,  // Soft harmonic displacement
      phase: Math.random() * Math.PI * 2
    });
  }

  // Animation states
  const animState = {
    visibleLength: 0
  };

  // GSAP self-drawing grow effect on load: slow, graceful reveal
  gsap.to(animState, {
    visibleLength: 1.5 * Math.PI,
    duration: 4.5,
    ease: "power2.out",
    delay: 0.4
  });

  // Slowly breathing organic float offset
  let floatTime = 0;
  let flowProgress = 0;

  // Render loop with 60fps/120fps delta-time independence
  function render() {
    if (!isVisible) {
      rafId = null;
      return;
    }

    const now = performance.now();
    const dt = Math.min((now - lastTime) / 1000, 0.05); // clamped delta time
    lastTime = now;

    ctx.clearRect(0, 0, width, height);

    // In botanical light mode, use forest green (45, 106, 79); in dark mode, crisp starlight white (255, 255, 255)
    const primaryRGB = isLight ? "45, 106, 79" : "255, 255, 255";

    // Center coordinates
    const cx = width / 2;
    const cy = height / 2;

    const isPortrait = height > width;

    // Radius of infinity loop
    let aRadius;
    if (isPortrait) {
      aRadius = height * 0.49;
    } else {
      const maxRadiusW = (width * 0.98) / 2;
      const maxRadiusH = (height * 0.98 * Math.SQRT2) / vertScale;
      aRadius = Math.min(maxRadiusW, maxRadiusH);
    }

    ctx.save();
    if (isPortrait) {
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 2);
      ctx.scale(1.0, 1.35);
      ctx.translate(-cx, -cy);
    }

    // Gentle, slow breathing float (~18s cycle)
    floatTime += 0.35 * dt;
    const floatOffsetX = Math.sin(floatTime) * 4.5;
    const floatOffsetY = Math.cos(floatTime * 0.75) * 3.0;

    // Steady, serene motion speed along the curve (~26s per complete cycle)
    flowProgress += 0.038 * dt;

    const lengthT = animState.visibleLength;

    if (lengthT > 0.05) {
      const headT = flowProgress * Math.PI * 2;
      const chunkSize = isMobile ? 8 : 6; // Fine-grained batches for seamless tail feathering

      for (let b = 0; b < bristles.length; b++) {
        const bristle = bristles[b];
        const bristleTaper = 1 - (b / bristleCount) * 0.55;

        ctx.lineWidth = bristle.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let s = 0; s <= segments; s += chunkSize) {
          ctx.beginPath();
          let pathActive = false;
          let sumOpacity = 0;
          let count = 0;

          for (let k = 0; k <= chunkSize && (s + k) <= segments; k++) {
            const idx = s + k;
            const pt = basePoints[idx];
            const t = pt.t;

            let normT = t;
            let normHead = headT % (Math.PI * 2);
            let normTail = (headT - lengthT) % (Math.PI * 2);
            if (normTail < 0) normTail += Math.PI * 2;

            let visible = false;
            let linearRatio = 0;

            if (normTail < normHead) {
              if (normT >= normTail && normT <= normHead) {
                visible = true;
                linearRatio = (normT - normTail) / lengthT;
              }
            } else {
              if (normT >= normTail || normT <= normHead) {
                visible = true;
                let dist = 0;
                if (normT >= normTail) {
                  dist = normT - normTail;
                } else {
                  dist = (Math.PI * 2 - normTail) + normT;
                }
                linearRatio = dist / lengthT;
              }
            }

            if (visible) {
              // Smooth sinusoidal opacity curve: seamless soft tail dissolution
              const smoothOpacity = Math.sin((linearRatio * Math.PI) / 2);

              const bx = cx + (aRadius * pt.xRatio) + floatOffsetX;
              const by = cy + (aRadius * pt.yRatio) + floatOffsetY;

              const noise = Math.sin(t * bristle.freq + bristle.phase + floatTime * 0.8) * bristle.amp;
              const finalX = bx + pt.px * (bristle.dx + noise);
              const finalY = by + pt.py * (bristle.dy + noise);

              if (!pathActive) {
                ctx.moveTo(finalX, finalY);
                pathActive = true;
              } else {
                ctx.lineTo(finalX, finalY);
              }
              sumOpacity += smoothOpacity;
              count++;
            }
          }

          if (pathActive && count > 0) {
            const avgOpacity = sumOpacity / count;
            ctx.strokeStyle = `rgba(${primaryRGB}, ${bristle.opacity * avgOpacity * bristleTaper * 1.5})`;
            ctx.stroke();
          }
        }
      }
    }

    ctx.restore();
    rafId = requestAnimationFrame(render);
  }

  startLoop();
}

// --- SLIDING CAPSULE NAV INDICATOR ---
export function updateNavIndicator() {
  const navMenu = document.querySelector(".nav-menu");
  const indicator = document.querySelector(".nav-indicator-pill");
  if (!navMenu || !indicator) return;

  const isMobile = window.innerWidth <= 1024;
  if (isMobile) {
    indicator.style.opacity = '0';
    return;
  }

  const activeLink = navMenu.querySelector(".nav-link.active");
  if (activeLink) {
    const menuRect = navMenu.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    const x = linkRect.left - menuRect.left;
    const y = linkRect.top - menuRect.top;
    const scaleX = linkRect.width / 100; // Base width is 100px

    gsap.to(indicator, {
      x: x,
      y: y,
      scaleX: scaleX,
      opacity: 1,
      duration: 0.35,
      ease: EASE.expo,
    });
  } else {
    gsap.to(indicator, { opacity: 0, duration: 0.2 });
  }
}

function initNavIndicator() {
  const navMenu = document.querySelector(".nav-menu");
  if (!navMenu) return;

  let indicator = navMenu.querySelector(".nav-indicator-pill");
  if (!indicator) {
    indicator = document.createElement("div");
    indicator.className = "nav-indicator-pill";
    navMenu.appendChild(indicator);
  }

  const navLinks = navMenu.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      const isMobile = window.innerWidth <= 1024;
      if (isMobile) return;

      const menuRect = navMenu.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();

      const x = linkRect.left - menuRect.left;
      const y = linkRect.top - menuRect.top;
      const scaleX = linkRect.width / 100;

      gsap.to(indicator, {
        x: x,
        y: y,
        scaleX: scaleX,
        opacity: 1,
        duration: 0.3,
        ease: EASE.expo,
      });
    });
  });

  navMenu.addEventListener("mouseleave", () => {
    updateNavIndicator();
  });

  setTimeout(updateNavIndicator, 200);

  window.addEventListener("resize", updateNavIndicator, { passive: true });
}

// --- PAGE TRANSITION CURTAIN (GSAP Timeline) ---
export function triggerPageTransition(targetId, callback) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const target = document.getElementById(targetId);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { immediate: true });
      } else {
        target.scrollIntoView({ behavior: 'auto' });
      }
    }
    if (callback) callback();
    return;
  }

  let curtain = document.querySelector(".transition-curtain");
  if (!curtain) {
    curtain = document.createElement("div");
    curtain.className = "transition-curtain";
    document.body.appendChild(curtain);
  }

  // Use GSAP timeline for the page transition
  const tl = gsap.timeline();

  tl.set(curtain, {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
  });

  // Slide in
  tl.to(curtain, {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    duration: DURATION.pageTransition,
    ease: EASE.expo,
  });

  // At the midpoint, scroll to target
  tl.call(() => {
    const target = document.getElementById(targetId);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target, { immediate: true });
      } else {
        const html = document.documentElement;
        html.style.scrollBehavior = "auto";
        target.scrollIntoView();
        html.style.scrollBehavior = "";
      }
    }
    if (callback) callback();
  });

  // Slide out
  tl.to(curtain, {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    duration: DURATION.pageTransition,
    ease: EASE.expo,
  });

  // Reset
  tl.set(curtain, {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
  });
}

// --- GSAP HERO ENTRANCE SEQUENCE ---
function initHeroEntrance() {
  // This is triggered by the "site-loaded" event after preloader completes
  document.addEventListener("site-loaded", () => {
    document.body.classList.add("site-loaded");

    const tl = gsap.timeline({
      defaults: { ease: EASE.expo },
      onComplete: () => {
        // Fix text wrapping glitch by releasing overflow mask after entrance animations finish
        gsap.set(".clip-text-wrapper", { overflow: "visible" });
      }
    });

    // Hero badge pops in
    tl.fromTo(".hero-badge",
      { opacity: 0, y: 15, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55 },
      0.05
    );

    // Hero title lines slide up from overflow-hidden clips
    tl.fromTo(".clip-text-el",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: EASE.expo },
      0.12
    );

    // Hero description fades in
    tl.fromTo(".hero-description",
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.65 },
      0.3
    );

    // Hero action buttons stagger in
    tl.fromTo(".hero-actions",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.65 },
      0.4
    );

    // Hero visual (avatar card + badges) entrance
    tl.fromTo(".hero-avatar-card",
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: EASE.back },
      0.2
    );

    // Floating badges pop in with spring overshoot
    tl.fromTo(".hero-floating-badge",
      { opacity: 0, scale: 0, y: 15 },
      {
        opacity: 1, scale: 1, y: 0, duration: 0.55, ease: EASE.spring, stagger: 0.08,
        onComplete: () => {
          // Start the infinite float animations after entrance completes
          const badge1 = document.querySelector(".badge-1");
          const badge2 = document.querySelector(".badge-2");
          if (badge1) badge1.classList.add("badge-float-1");
          if (badge2) badge2.classList.add("badge-float-2");
        }
      },
      0.45
    );

    // Scroll indicator fades in last
    tl.fromTo(".scroll-down",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.5 },
      0.65
    );
  });
}

// --- INITIALIZE ALL ANIMATIONS ---
export function initAnimations() {
  initSpaceBackdrop();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add("site-loaded");

    // Force visible state for all hero elements
    gsap.set(".hero-badge, .clip-text-el, .hero-description, .hero-actions, .hero-avatar-card, .hero-floating-badge, .scroll-down", {
      opacity: 1, y: 0, scale: 1, yPercent: 0
    });
    gsap.set(".clip-text-wrapper", { overflow: "visible" });

    animateSkillsBars();
    animateStatsCounters();
    initTypingEffect();
    return;
  }

  initCustomCursor();
  initHeroEntrance();
  initScrollReveals();
  initTypingEffect();
  initAvatarParallax();
  initTimelineScrollHighlight();
  initNavIndicator();

  // Initialize infinity canvas after preloader completes and site entrance begins
  if (document.body.classList.contains("site-loaded")) {
    initInfinityAnimation();
  } else {
    document.addEventListener("site-loaded", () => {
      initInfinityAnimation();
    }, { once: true });
  }
}
