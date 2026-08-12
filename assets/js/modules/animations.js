import { lenis } from "../app.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  // Attach magnetic snap listeners directly to interactive elements
  const magnetics = document.querySelectorAll(".social-circle, .btn, .filter-btn, .nav-link, .hamburger, .scroll-top-btn");
  magnetics.forEach(el => {
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
      const pullStrength = Math.min(0.35, 28 / maxDim);
      
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
        
        releasePullX += (0 - releasePullX) * 0.16;
        releasePullY += (0 - releasePullY) * 0.16;

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
  // Section-level reveals: Each section with class "reveal" fades in
  const sections = document.querySelectorAll(".reveal");
  
  sections.forEach(section => {
    // The section itself animates in
    gsap.set(section, { opacity: 0, y: 30 });
    
    ScrollTrigger.create({
      trigger: section,
      start: "top 88%",
      end: "top 20%",
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        });
        
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
      },
      onLeaveBack: () => {
        gsap.to(section, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.in",
        });
        
        // Reset animation states on exit so they replay on re-entry
        if (section.id === "about") {
          statsAnimated = false;
        }
        if (section.id === "skills") {
          skillsAnimated = false;
        }
      },
    });
  });

  // Staggered children: Animate direct children of `.reveal-stagger` containers
  const staggerContainers = document.querySelectorAll(".reveal-stagger");
  
  staggerContainers.forEach(container => {
    const children = container.children;
    if (children.length === 0) return;
    
    gsap.set(children, { opacity: 0, y: 25, scale: 0.97 });
    
    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.2)",
          stagger: 0.1,
          clearProps: "transform",
        });
      },
      onLeaveBack: () => {
        gsap.to(children, {
          opacity: 0,
          y: 25,
          scale: 0.97,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.03,
        });
      }
    });
  });
}

// --- GSAP PERCENTAGE TEXT COUNT-UP ---
export function animatePercentageText(element, targetVal) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: targetVal,
    duration: 1.2,
    ease: "power2.out",
    onUpdate: () => {
      element.innerText = `${Math.round(obj.val)}%`;
    }
  });
}

// --- GSAP SKILL BAR FILLING ---
let skillsAnimated = false;
export function animateSkillsBars() {
  if (skillsAnimated) return;
  skillsAnimated = true;

  const bars = document.querySelectorAll(".skill-bar-fill");
  
  bars.forEach((bar, index) => {
    const percent = parseInt(bar.dataset.percentage, 10);
    if (isNaN(percent)) return;
    
    const wrapper = bar.closest(".skill-bar-wrapper");
    const labelPct = wrapper ? wrapper.querySelector(".skill-percentage") : null;
    
    let tooltip = bar.querySelector(".skill-tooltip");
    if (!tooltip) {
      tooltip = document.createElement("span");
      tooltip.className = "skill-tooltip";
      bar.appendChild(tooltip);
    }
    
    // Reset
    gsap.set(bar, { width: "0%" });
    tooltip.innerText = "0%";
    if (labelPct) labelPct.innerText = "0%";
    
    // Animate the fill bar with stagger
    gsap.to(bar, {
      width: `${percent}%`,
      duration: 1.6,
      delay: index * 0.08,
      ease: "power3.out",
      onStart: () => {
        if (tooltip) animatePercentageText(tooltip, percent);
        if (labelPct) animatePercentageText(labelPct, percent);
      }
    });
  });
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
    
    gsap.to(obj, {
      count: target,
      duration: 2,
      delay: index * 0.15,
      ease: "power2.out",
      onUpdate: () => {
        stat.innerText = Math.floor(obj.count);
      },
      onComplete: () => {
        stat.innerText = target;
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

// --- GSAP AVATAR MOUSE PARALLAX (3D tilt) ---
function initAvatarParallax() {
  const visual = document.querySelector(".hero-visual");
  const card = document.querySelector(".hero-avatar-card");
  if (!visual || !card) return;

  let rect = null;
  function updateRect() {
    rect = visual.getBoundingClientRect();
  }

  // Use gsap.quickTo for buttery-smooth interpolation
  const rotX = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" });
  const rotY = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" });
  const moveX = gsap.quickTo(card, "x", { duration: 0.5, ease: "power2.out" });
  const moveY = gsap.quickTo(card, "y", { duration: 0.5, ease: "power2.out" });

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
  });

  visual.addEventListener("mouseleave", () => {
    rect = null;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  });
}

// --- GSAP TIMELINE SCROLL HIGHLIGHT ---
function initTimelineScrollHighlight() {
  const timeline = document.querySelector(".timeline");
  const progressLine = document.querySelector(".timeline-progress-line");
  const items = document.querySelectorAll(".timeline-item");
  if (!timeline || !progressLine) return;

  // Animate the progress line height with ScrollTrigger scrub
  gsap.fromTo(progressLine, 
    { height: "0%" },
    {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: timeline,
        start: "top 65%",
        end: "bottom 65%",
        scrub: 0.3,
      }
    }
  );

  // Animate individual timeline items
  items.forEach(item => {
    const dot = item.querySelector(".timeline-dot");
    if (!dot) return;
    
    ScrollTrigger.create({
      trigger: dot,
      start: "top 65%",
      onEnter: () => {
        dot.classList.add("active");
        item.classList.add("illuminated");
      },
      onLeaveBack: () => {
        dot.classList.remove("active");
        item.classList.remove("illuminated");
      }
    });
  });
}

// --- HERO DESIGNER COORDINATE CROSSHAIR ---
function initDesignerGrid() {
  const isHoverSupported = window.matchMedia('(hover: hover)').matches;
  if (!isHoverSupported) return;

  const hero = document.getElementById("hero");
  const crosshairH = document.getElementById("crosshair-h");
  const crosshairV = document.getElementById("crosshair-v");
  const label = document.getElementById("coordinate-label");
  const gridContainer = document.querySelector(".hero-designer-grid");
  if (!hero || !crosshairH || !crosshairV || !label) return;

  let rect = null;
  let cachedSnapPoints = [];

  const snapTargets = [
    { selector: ".hero-avatar-card", label: "AVATAR" },
    { selector: ".badge-1", label: "EXP_BADGE" },
    { selector: ".badge-2", label: "PROJECTS_BADGE" },
    { selector: ".logo", label: "NAV_LOGO" },
    { selector: ".hero-badge", label: "AVAILABILITY" },
    { selector: ".hero-actions .btn-primary", label: "PROJECTS_LINK" },
    { selector: ".hero-actions .btn-secondary", label: "CONTACT_LINK" }
  ];

  function cacheSnapPoints() {
    if (!rect) rect = hero.getBoundingClientRect();
    cachedSnapPoints = [];
    snapTargets.forEach(target => {
      const el = document.querySelector(target.selector);
      if (el) {
        const elRect = el.getBoundingClientRect();
        // Compute center relative to hero wrapper bounding box
        const px = elRect.left - rect.left + elRect.width / 2;
        const py = elRect.top - rect.top + elRect.height / 2;
        cachedSnapPoints.push({ x: px, y: py, label: target.label });
      }
    });
  }

  function updateRect() {
    rect = hero.getBoundingClientRect();
    cacheSnapPoints();
  }

  hero.addEventListener("mouseenter", updateRect);
  window.addEventListener("resize", () => { if (rect) updateRect(); }, { passive: true });
  window.addEventListener("scroll", () => { if (rect) updateRect(); }, { passive: true });
  window.addEventListener("recalc-offsets", () => { if (rect) updateRect(); }, { passive: true });

  // Use gsap.quickTo for smooth crosshair tracking
  const crosshairHY = gsap.quickTo(crosshairH, "y", { duration: 0.15, ease: "power2.out" });
  const crosshairVX = gsap.quickTo(crosshairV, "x", { duration: 0.15, ease: "power2.out" });

  hero.addEventListener("mousemove", (e) => {
    if (!rect) updateRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    const snapRadius = 45;
    let snapped = false;
    let snapLabel = "";
    
    for (let i = 0; i < cachedSnapPoints.length; i++) {
      const pt = cachedSnapPoints[i];
      const dist = Math.hypot(x - pt.x, y - pt.y);
      if (dist < snapRadius) {
        x = pt.x;
        y = pt.y;
        snapped = true;
        snapLabel = pt.label;
        break;
      }
    }
    
    // Position crosshairs with gsap.quickTo
    crosshairHY(y);
    crosshairVX(x);
    
    // Coordinate label
    label.style.transform = `translate3d(${x + 15}px, ${y + 15}px, 0)`;
    
    if (snapped) {
      if (gridContainer) gridContainer.classList.add("snapped");
      label.classList.add("snapped");
      label.innerText = `SNAP [${snapLabel}] X: ${Math.round(x)}px | Y: ${Math.round(y)}px`;
    } else {
      if (gridContainer) gridContainer.classList.remove("snapped");
      label.classList.remove("snapped");
      label.innerText = `X: ${Math.round(x)}px | Y: ${Math.round(y)}px`;
    }

    // Update custom properties for dynamic grid spotlight glow
    hero.style.setProperty("--global-mouse-x", `${x}px`);
    hero.style.setProperty("--global-mouse-y", `${y}px`);
  });

  hero.addEventListener("mouseleave", () => {
    rect = null;
    if (gridContainer) gridContainer.classList.remove("snapped");
    label.classList.remove("snapped");
  });
}

// --- GSAP WATERMARK SCROLL PARALLAX ---
function initWatermarkParallax() {
  const watermarks = document.querySelectorAll(".bg-text-watermark");
  if (watermarks.length === 0) return;
  
  watermarks.forEach(wm => {
    gsap.to(wm, {
      y: () => 120,
      ease: "none",
      scrollTrigger: {
        trigger: wm.closest("section") || wm.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      }
    });
  });
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
      ease: "power3.out",
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
        ease: "power3.out",
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
    duration: 0.6,
    ease: "power4.inOut",
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
    duration: 0.6,
    ease: "power4.inOut",
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
    
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Hero badge pops in
    tl.fromTo(".hero-badge", 
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9 },
      0.1
    );

    // Hero title lines slide up from overflow-hidden clips
    tl.fromTo(".clip-text-el",
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: "power4.out" },
      0.2
    );

    // Hero description fades in
    tl.fromTo(".hero-description",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 1.2 },
      0.5
    );

    // Hero action buttons stagger in
    tl.fromTo(".hero-actions",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0 },
      0.65
    );

    // Hero visual (avatar card + badges) entrance
    tl.fromTo(".hero-avatar-card",
      { opacity: 0, scale: 0.85, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "back.out(1.4)" },
      0.3
    );

    // Floating badges pop in with spring overshoot
    tl.fromTo(".hero-floating-badge",
      { opacity: 0, scale: 0, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.15,
        onComplete: () => {
          // Start the infinite float animations after entrance completes
          const badge1 = document.querySelector(".badge-1");
          const badge2 = document.querySelector(".badge-2");
          if (badge1) badge1.classList.add("badge-float-1");
          if (badge2) badge2.classList.add("badge-float-2");
        }
      },
      0.7
    );

    // Scroll indicator fades in last
    tl.fromTo(".scroll-down",
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.0
    );
  });
}

// --- INITIALIZE ALL ANIMATIONS ---
export function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add("site-loaded");
    
    // Force visible state for all hero elements
    gsap.set(".hero-badge, .clip-text-el, .hero-description, .hero-actions, .hero-avatar-card, .hero-floating-badge, .scroll-down", {
      opacity: 1, y: 0, scale: 1, yPercent: 0
    });
    
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
  initDesignerGrid();
  initWatermarkParallax();
  initNavIndicator();
}
