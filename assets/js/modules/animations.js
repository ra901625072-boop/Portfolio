// --- CUSTOM CURSOR FOLLOWER with Magnetic Snapping ---
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

  // Check if touch device - do not activate custom cursor followers
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
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

  // Global mouse position tracking (no reflows)
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
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
      // Define target pull coordinates
      targetPullX = (e.clientX - elX) * 0.32;
      targetPullY = (e.clientY - elY) * 0.32;
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

  // Hover states for generic clickable elements
  const hoverables = document.querySelectorAll("a, button, .project-card, .form-control, .visitor-counter");
  hoverables.forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (!cursor.classList.contains("snapped")) {
        cursor.classList.add("hovered");
      }
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovered");
    });
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

// --- SCROLL REVEAL ANIMATIONS ---
let skillsAnimated = false;

function initScrollReveals() {
  const reveals = document.querySelectorAll(".reveal");
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        
        // If skill section, trigger skill bars filling
        if (entry.target.id === "skills") {
          animateSkillsBars();
        }
        
        // If about section, trigger stats counters
        if (entry.target.id === "about") {
          animateStatsCounters();
        }
      } else {
        entry.target.classList.remove("active");
        
        // Reset animation states on exit so they run again on re-entry
        if (entry.target.id === "about") {
          statsAnimated = false;
        }
        if (entry.target.id === "skills") {
          skillsAnimated = false;
        }
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(el => revealObserver.observe(el));
}

export function animatePercentageText(element, targetVal) {
  let current = 0;
  const duration = 1000;
  const startTime = performance.now();
  
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = progress * (2 - progress);
    current = Math.round(ease * targetVal);
    element.innerText = `${current}%`;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// --- SKILL BAR FILLING ---
export function animateSkillsBars() {
  if (skillsAnimated) return;
  skillsAnimated = true;

  const bars = document.querySelectorAll(".skill-bar-fill");
  
  // 1. Reset all bars first
  bars.forEach(bar => {
    bar.style.transition = "none";
    bar.style.width = "0%";
    
    const wrapper = bar.closest(".skill-bar-wrapper");
    const labelPct = wrapper ? wrapper.querySelector(".skill-percentage") : null;
    
    let tooltip = bar.querySelector(".skill-tooltip");
    if (!tooltip) {
      tooltip = document.createElement("span");
      tooltip.className = "skill-tooltip";
      bar.appendChild(tooltip);
    }
    tooltip.innerText = "0%";
    if (labelPct) labelPct.innerText = "0%";
  });
  
  // 2. Force a single reflow on the parent container to flush layout writes
  const skillsContent = document.querySelector(".skills-content");
  if (skillsContent) {
    skillsContent.offsetHeight; // layout flush
  }
  
  // 3. Trigger smooth draw-in and count-up animations
  setTimeout(() => {
    bars.forEach(bar => {
      const percent = parseInt(bar.dataset.percentage, 10);
      if (isNaN(percent)) return;
      
      bar.style.transition = "width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1)";
      bar.style.width = `${percent}%`;
      
      const wrapper = bar.closest(".skill-bar-wrapper");
      const labelPct = wrapper ? wrapper.querySelector(".skill-percentage") : null;
      const tooltip = bar.querySelector(".skill-tooltip");
      
      if (tooltip) animatePercentageText(tooltip, percent);
      if (labelPct) animatePercentageText(labelPct, percent);
    });
  }, 50);
}

// --- STATS COUNT-UP EFFECT ---
let statsAnimated = false;
export function animateStatsCounters() {
  if (statsAnimated) return;
  statsAnimated = true;

  const stats = document.querySelectorAll(".stat-number span");
  stats.forEach(stat => {
    const target = parseInt(stat.dataset.target, 10);
    let count = 0;
    const duration = 2000; // ms
    const increment = target / (duration / 16); // 60fps refresh rate

    function updateCount() {
      count += increment;
      if (count < target) {
        stat.innerText = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        stat.innerText = target;
      }
    }
    updateCount();
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

// --- AVATAR MOUSE PARALLAX ---
function initAvatarParallax() {
  const visual = document.querySelector(".hero-visual");
  const card = document.querySelector(".hero-avatar-card");
  if (!visual || !card) return;

  let rect = null;
  function updateRect() {
    rect = visual.getBoundingClientRect();
  }

  visual.addEventListener("mouseenter", updateRect);
  window.addEventListener("resize", () => { if (rect) updateRect(); }, { passive: true });
  window.addEventListener("scroll", () => { if (rect) updateRect(); }, { passive: true });

  visual.addEventListener("mousemove", (e) => {
    if (!rect) updateRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt card with hardware acceleration
    card.style.transform = `perspective(1000px) rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg) translate3d(${x * 0.02}px, ${y * 0.02}px, 0)`;
  });

  visual.addEventListener("mouseleave", () => {
    rect = null;
    card.style.transform = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
  });
}

// --- TIMELINE SCROLL HIGHLIGHT ---
function initTimelineScrollHighlight() {
  const timeline = document.querySelector(".timeline");
  const progressLine = document.querySelector(".timeline-progress-line");
  const items = document.querySelectorAll(".timeline-item");
  if (!timeline || !progressLine) return;

  let timelineTop = 0;
  let timelineHeight = 0;
  let dotOffsets = [];

  function calculateOffsets() {
    const rect = timeline.getBoundingClientRect();
    timelineTop = rect.top + window.scrollY;
    timelineHeight = rect.height;

    dotOffsets = Array.from(items).map(item => {
      const dot = item.querySelector(".timeline-dot");
      if (!dot) return 0;
      const dotRect = dot.getBoundingClientRect();
      return dotRect.top + window.scrollY;
    });
  }

  // Initial calculation
  calculateOffsets();

  // Recalculate on resize and load to preserve accuracy
  window.addEventListener("resize", calculateOffsets, { passive: true });
  window.addEventListener("load", calculateOffsets, { passive: true });

  let isTimelineScrolling = false;
  window.addEventListener("scroll", () => {
    if (!isTimelineScrolling) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const triggerPoint = window.innerHeight * 0.65;
        const topOffset = triggerPoint - (timelineTop - scrollY);
        
        let progress = 0;
        if (topOffset > 0) {
          progress = (topOffset / timelineHeight) * 100;
        }
        progress = Math.min(Math.max(progress, 0), 100);
        
        progressLine.style.height = `${progress}%`;
        
        items.forEach((item, index) => {
          const dot = item.querySelector(".timeline-dot");
          if (!dot) return;
          
          const dotTop = dotOffsets[index] || 0;
          const dotTopOffset = triggerPoint - (dotTop - scrollY);
          
          if (dotTopOffset > 0) {
            dot.classList.add("active");
            item.classList.add("illuminated");
          } else {
            dot.classList.remove("active");
            item.classList.remove("illuminated");
          }
        });
        isTimelineScrolling = false;
      });
      isTimelineScrolling = true;
    }
  }, { passive: true });
}

// --- HERO DESIGNER COORDINATE CROSSHAIR ---
function initDesignerGrid() {
  const hero = document.getElementById("hero");
  const crosshairH = document.getElementById("crosshair-h");
  const crosshairV = document.getElementById("crosshair-v");
  const label = document.getElementById("coordinate-label");
  if (!hero || !crosshairH || !crosshairV || !label) return;

  let rect = null;
  function updateRect() {
    rect = hero.getBoundingClientRect();
  }

  hero.addEventListener("mouseenter", updateRect);
  window.addEventListener("resize", () => { if (rect) updateRect(); }, { passive: true });
  window.addEventListener("scroll", () => { if (rect) updateRect(); }, { passive: true });

  let isGridMouseMoving = false;
  hero.addEventListener("mousemove", (e) => {
    if (!isGridMouseMoving) {
      const clientX = e.clientX;
      const clientY = e.clientY;
      requestAnimationFrame(() => {
        if (!rect) updateRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        // Position tracking lines with GPU translate3d
        crosshairH.style.transform = `translate3d(0, ${y}px, 0)`;
        crosshairV.style.transform = `translate3d(${x}px, 0, 0)`;
        
        // Coordinate label floating alongside
        label.style.transform = `translate3d(${x + 15}px, ${y + 15}px, 0)`;
        label.innerText = `X: ${Math.round(x)}px | Y: ${Math.round(y)}px`;

        // Update custom properties for dynamic grid spotlight glow
        hero.style.setProperty("--global-mouse-x", `${x}px`);
        hero.style.setProperty("--global-mouse-y", `${y}px`);
        isGridMouseMoving = false;
      });
      isGridMouseMoving = true;
    }
  });

  hero.addEventListener("mouseleave", () => {
    rect = null;
  });
}

// --- INITIALIZE ALL ANIMATIONS ---
export function initAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    animateSkillsBars();
    animateStatsCounters();
    initTypingEffect();
    return;
  }
  
  initCustomCursor();
  initScrollReveals();
  initTypingEffect();
  initAvatarParallax();
  initTimelineScrollHighlight();
  initDesignerGrid();
}
