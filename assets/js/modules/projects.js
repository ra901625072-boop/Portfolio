import { PROJECTS_DATA, ACHIEVEMENTS_DATA } from "../data/projects-data.js";
import { lenis } from "../app.js";

// --- INFINITE MARQUEE & DRAG CAROUSEL STATE ---
let currentPositionX = 0;
let autoScrollSpeed = 0.65; // Left-to-right auto-scroll speed (positive = moves right)
let isHovered = false;
let isDragging = false;
let isPointerDown = false;
let startPointerX = 0;
let lastPointerX = 0;
let velocityX = 0;
let totalDragDistance = 0;
let halfTrackWidth = 0;
let animationFrameId = null;
let dragEngineInitialized = false;

// --- RECALCULATE TRACK HALF-WIDTH ---
function updateHalfTrackWidth() {
  const track = document.getElementById("projects-grid");
  if (!track) return;
  const cards = track.children;
  if (!cards.length) return;

  // Track total scroll width; cards are duplicated into 2 identical halves
  halfTrackWidth = track.scrollWidth / 2;
}

// --- RAF TICKER FOR FLUID AUTO-SCROLL & DRAG (Matching Milestones Speed) ---
let lastFrameTimestamp = 0;
// Milestones section scrolls 1116px over 30s = 37.2px/sec linear velocity
const AUTO_SCROLL_SPEED_PX_PER_SEC = 37.2;

function startCarouselTicker() {
  if (animationFrameId) return;
  lastFrameTimestamp = performance.now();

  function tick(now) {
    const track = document.getElementById("projects-grid");
    if (!track) {
      animationFrameId = null;
      return;
    }

    const deltaTime = Math.min((now - lastFrameTimestamp) / 1000, 0.1); // in seconds, clamped for smooth resumes
    lastFrameTimestamp = now;

    if (halfTrackWidth <= 0) {
      updateHalfTrackWidth();
    }

    if (!isPointerDown) {
      if (Math.abs(velocityX) > 0.05) {
        currentPositionX += velocityX;
        velocityX *= 0.94; // Smooth momentum decay
      } else {
        velocityX = 0;
        if (!isHovered) {
          currentPositionX += AUTO_SCROLL_SPEED_SPEED_DELTA(deltaTime);
        }
      }
    }

    // Seamless infinite wrap in both directions (positive or negative)
    if (halfTrackWidth > 0) {
      while (currentPositionX > 0) {
        currentPositionX -= halfTrackWidth;
      }
      while (currentPositionX < -halfTrackWidth) {
        currentPositionX += halfTrackWidth;
      }
    }

    track.style.transform = `translate3d(${currentPositionX}px, 0, 0)`;

    animationFrameId = requestAnimationFrame(tick);
  }

  animationFrameId = requestAnimationFrame(tick);
}

function AUTO_SCROLL_SPEED_SPEED_DELTA(dt) {
  return AUTO_SCROLL_SPEED_PX_PER_SEC * dt;
}

// --- RENDER PORTFOLIO PROJECTS (Infinite Left-to-Right Carousel) ---
export function renderProjects(filterValue = "all") {
  const container = document.getElementById("projects-grid");
  if (!container) return;
  
  container.innerHTML = "";
  
  const filtered = filterValue === "all" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filterValue);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding: 3rem; text-align: center; color: var(--text-secondary); width: 100%;">
        <p>No case studies found in this category.</p>
      </div>
    `;
    return;
  }
      
  // Clone cards to enable a completely seamless infinite loop
  let items = [];
  if (filtered.length >= 4) {
    items = [...filtered, ...filtered];
  } else if (filtered.length === 3) {
    items = [...filtered, ...filtered, ...filtered, ...filtered];
  } else if (filtered.length === 2) {
    items = [...filtered, ...filtered, ...filtered, ...filtered];
  } else {
    // 1 item - clone 8 times to span across wide screens cleanly
    items = [
      filtered[0], filtered[0], filtered[0], filtered[0],
      filtered[0], filtered[0], filtered[0], filtered[0]
    ];
  }

  items.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card glass-card spotlight-card";
    card.dataset.id = project.id;
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View details for project: ${project.title}`);
    
    const tagsHtml = project.tags
      .map(tag => `<span class="project-tag">${tag}</span>`)
      .join("");
      
    card.innerHTML = `
      <div class="project-browser-header">
        <div class="browser-dots">
          <span class="browser-dot"></span>
          <span class="browser-dot"></span>
          <span class="browser-dot"></span>
        </div>
        <div class="browser-title">${project.title}</div>
      </div>
      <div class="project-img-container shimmer-wrapper">
        <picture>
          <source srcset="${project.image.replace(/\.(png|jpg|jpeg)$/, '.webp')}" type="image/webp">
          <img src="${project.image}" alt="${project.title}" loading="lazy" onload="this.closest('.shimmer-wrapper').classList.add('loaded')">
        </picture>
      </div>
      <div class="project-card-content">
        <div class="project-tags">${tagsHtml}</div>
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-desc">${project.description}</p>
      </div>
    `;
    
    // Open case study on click only if user didn't drag
    card.addEventListener("click", () => {
      if (isDragging || totalDragDistance > 6) return;
      openCaseStudy(project.id);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCaseStudy(project.id);
      }
    });

    // Keyboard focus pause
    card.addEventListener("focus", () => {
      isHovered = true;
    });
    card.addEventListener("blur", () => {
      isHovered = false;
    });
    
    container.appendChild(card);
  });
  
  // Update measurement and spotlight effects
  setTimeout(() => {
    updateHalfTrackWidth();
    if (typeof initializeSpotlightEffects === "function") {
      initializeSpotlightEffects("#projects-grid");
    }
  }, 50);

  // Initialize drag engine and ticker
  initProjectsDragEngine();
  startCarouselTicker();
}

// --- DIRECT DRAG & SWIPE ENGINE ---
export function initProjectsDragEngine() {
  if (dragEngineInitialized) return;
  dragEngineInitialized = true;

  const carousel = document.getElementById("projects-carousel");
  const track = document.getElementById("projects-grid");
  if (!carousel || !track) return;

  // Hover Pause Listeners
  carousel.addEventListener("mouseenter", () => {
    isHovered = true;
    velocityX = 0;
  });

  carousel.addEventListener("mouseleave", () => {
    if (!isPointerDown) {
      isHovered = false;
    }
  });

  // Pointer Down (Mouse or Touch)
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return; // Only left click
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    
    isPointerDown = true;
    isDragging = false;
    totalDragDistance = 0;
    startPointerX = clientX;
    lastPointerX = clientX;
    velocityX = 0;
    isHovered = true;
  };

  // Pointer Move (Mouse or Touch)
  const onPointerMove = (e) => {
    if (!isPointerDown) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    const deltaX = clientX - lastPointerX;
    
    totalDragDistance += Math.abs(deltaX);

    if (totalDragDistance > 6) {
      isDragging = true;
      carousel.classList.add("is-dragging");
      track.classList.add("dragging");
    }

    // Direct movement:
    // Dragging right (deltaX > 0) moves track right (reveals left projects)
    // Dragging left (deltaX < 0) moves track left (reveals right projects)
    currentPositionX += deltaX;
    velocityX = deltaX; // Capture instantaneous velocity for smooth release momentum
    lastPointerX = clientX;
  };

  // Pointer Up / Cancel
  const onPointerUp = () => {
    if (!isPointerDown) return;
    isPointerDown = false;

    carousel.classList.remove("is-dragging");
    track.classList.remove("dragging");

    // Check if pointer is still hovering over carousel
    const isStillHovered = carousel.matches(":hover");
    if (!isStillHovered) {
      isHovered = false;
    }

    if (isDragging) {
      setTimeout(() => {
        isDragging = false;
        totalDragDistance = 0;
      }, 60);
    } else {
      isDragging = false;
      totalDragDistance = 0;
    }
  };

  // Mouse Listeners
  carousel.addEventListener("mousedown", onPointerDown);
  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("mouseup", onPointerUp);

  // Touch Listeners
  carousel.addEventListener("touchstart", onPointerDown, { passive: true });
  window.addEventListener("touchmove", onPointerMove, { passive: true });
  window.addEventListener("touchend", onPointerUp, { passive: true });
  window.addEventListener("touchcancel", onPointerUp, { passive: true });

  // Window Resize
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateHalfTrackWidth, 200);
  }, { passive: true });
}

// --- INITIALIZE FILTER BUTTONS ---
export function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("projects-grid");
  const carousel = document.getElementById("projects-carousel");
  
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;
      
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filterValue = btn.dataset.filter;
      const targetEl = carousel || grid;
      
      if (targetEl) {
        // Smooth fade-out before rendering new filtered items
        targetEl.style.transition = "opacity 0.2s var(--ease-out-expo)";
        targetEl.style.opacity = "0.2";
        
        setTimeout(() => {
          renderProjects(filterValue);
          targetEl.style.opacity = "1";
          window.dispatchEvent(new CustomEvent("recalc-offsets"));
        }, 200);
      } else {
        renderProjects(filterValue);
        window.dispatchEvent(new CustomEvent("recalc-offsets"));
      }
    });
  });
}

// --- OPEN & MANAGE CASE STUDY MODAL ---
// Scrollbar compensation helpers to prevent layout shift when modals lock scroll
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

let previouslyFocusedElement = null;
let modalKeydownHandler = null;

function setupModalOverlayListeners(modalOverlay, modalWrapper) {
  previouslyFocusedElement = document.activeElement;
  const sbWidth = getScrollbarWidth();
  if (sbWidth > 0) {
    document.body.style.paddingRight = `${sbWidth}px`;
    const header = document.querySelector("header");
    if (header) {
      header.style.paddingRight = `${sbWidth}px`;
    }
  }
  document.body.style.overflow = "hidden"; // Disable body scroll
  if (lenis) lenis.stop(); // Stop Lenis smooth scroll while modal is active
  modalOverlay.classList.add("active");
  
  // Focus initial element
  const closeBtn = document.getElementById("modal-close");
  if (closeBtn) closeBtn.focus();
  
  // Close actions
  closeBtn.addEventListener("click", closeCaseStudy);
  
  const handleOverlayClick = (e) => {
    if (e.target === modalOverlay) closeCaseStudy();
  };
  modalOverlay.addEventListener("click", handleOverlayClick);
  modalOverlay._overlayClick = handleOverlayClick;

  // Keyboard accessibility focus trapping & escape key closure
  const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
  
  modalKeydownHandler = (e) => {
    if (e.key === "Escape") {
      closeCaseStudy();
      return;
    }

    if (e.key === "Tab") {
      const focusables = modalWrapper.querySelectorAll(focusableSelectors);
      if (focusables.length === 0) return;
      
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstEl) {
          lastEl.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastEl) {
          firstEl.focus();
          e.preventDefault();
        }
      }
    }
  };

  document.addEventListener("keydown", modalKeydownHandler);
}

export function openCaseStudy(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;
  
  const modalOverlay = document.getElementById("case-study-modal");
  const modalWrapper = modalOverlay.querySelector(".modal-wrapper");
  
  // Render Modal Content
  const tagsHtml = project.tags
    .map(tag => `<span class="project-tag">${tag}</span>`)
    .join("");
      
  modalWrapper.innerHTML = `
    <div class="modal-drag-handle"></div>
    <button class="modal-close-btn" id="modal-close" aria-label="Close modal">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div class="modal-cover-wrapper shimmer-wrapper">
      <picture>
        <source srcset="${project.image.replace(/\.(png|jpg|jpeg)$/, '.webp')}" type="image/webp">
        <img src="${project.image}" alt="${project.title}" class="modal-cover-img" onload="this.closest('.shimmer-wrapper').classList.add('loaded')">
      </picture>
    </div>
    <div class="modal-content-inner">
      <div class="modal-tags">${tagsHtml}</div>
      <h2 class="modal-title" tabindex="0">${project.title}</h2>
      
      <div class="modal-meta-grid">
        <div class="meta-item">
          <div class="meta-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          </div>
          <div class="meta-text">
            <h5>Client</h5>
            <p>${project.client}</p>
          </div>
        </div>
        <div class="meta-item">
          <div class="meta-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
          <div class="meta-text">
            <h5>Timeline</h5>
            <p>${project.date}</p>
          </div>
        </div>
        <div class="meta-item">
          <div class="meta-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <div class="meta-text">
            <h5>My Role</h5>
            <p>${project.role}</p>
          </div>
        </div>
        <div class="meta-item">
          <div class="meta-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
          </div>
          <div class="meta-text">
            <h5>Core Focus</h5>
            <p>${project.tags[0]}</p>
          </div>
        </div>
      </div>
      
      <div class="modal-body">
        <p>${project.description}</p>
        ${project.body}
      </div>
      
      <div class="modal-actions">
        <a href="${project.demoUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Launch Live App
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
        <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
          Source Repository
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
      </div>
    </div>
  `;
  
  setupModalOverlayListeners(modalOverlay, modalWrapper);
}


export function closeCaseStudy() {
  const modalOverlay = document.getElementById("case-study-modal");
  if (!modalOverlay) return;
  
  modalOverlay.classList.remove("active");
  
  // Restore scroll and remove padding offsets
  document.body.style.overflow = ""; // Restore scrolling
  if (lenis) lenis.start(); // Restore Lenis smooth scroll
  document.body.style.paddingRight = "";
  const header = document.querySelector("header");
  if (header) {
    header.style.paddingRight = "";
  }

  // Clean listeners
  if (modalKeydownHandler) {
    document.removeEventListener("keydown", modalKeydownHandler);
    modalKeydownHandler = null;
  }
  if (modalOverlay._overlayClick) {
    modalOverlay.removeEventListener("click", modalOverlay._overlayClick);
    modalOverlay._overlayClick = null;
  }

  // Restore focus to grid element
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
    previouslyFocusedElement = null;
  }
}

// --- RENDER ACHIEVEMENTS CAROUSEL (Infinite Marquee) ---
export function renderAchievements() {
  const container = document.getElementById("carousel-track");
  if (!container) return;
  
  container.innerHTML = "";
  
  // Clone cards to enable seamless infinite wrapping loops
  const items = [...ACHIEVEMENTS_DATA, ...ACHIEVEMENTS_DATA];
  
  items.forEach((a, index) => {
    const card = document.createElement("div");
    card.className = "achievement-card glass-card spotlight-card";
    card.dataset.id = a.id;
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View details for achievement: ${a.title}`);
    card.style.animationDelay = `${index * 0.08}s`;
    
    card.innerHTML = `
      <div class="cert-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem;">
        <div class="cert-icon-wrapper" style="display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 12px; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.2); color: var(--color-primary);">${a.icon}</div>
        <span class="cert-badge" style="font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 20px; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.2); color: var(--color-primary); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Milestone</span>
      </div>
      <span class="cert-issuer" style="font-size: 0.85rem; color: var(--color-text-secondary); font-weight: 500;">${a.issuer}</span>
      <h3 class="cert-title" style="font-size: 1.15rem; margin: 0.5rem 0; line-height: 1.4; color: var(--text-primary); font-family: var(--font-heading);">${a.title}</h3>
      <p class="cert-desc" style="font-size: 0.9rem; color: var(--color-text-paragraph); line-height: 1.6;">${a.desc}</p>
    `;
    
    container.appendChild(card);
  });
}


// --- SPOTLIGHT GLOW MOUSE BINDINGS ---
export function initializeSpotlightEffects(containerSelector = null) {
  const isHoverSupported = window.matchMedia('(hover: hover)').matches;
  if (!isHoverSupported) return;

  const selector = containerSelector 
    ? `${containerSelector} .spotlight-card` 
    : ".spotlight-card";
  const cards = document.querySelectorAll(selector);

  cards.forEach(card => {
    // Abort existing listeners if already set up to prevent duplicate binds
    if (card._spotlightController) {
      card._spotlightController.abort();
    }
    
    const controller = new AbortController();
    card._spotlightController = controller;
    const signal = controller.signal;
    
    let rect = null;
    let latestX = 0;
    let latestY = 0;
    let isInside = false;
    let rafId = null;
    
    function tick() {
      if (!isInside) return;
      if (!rect) rect = card.getBoundingClientRect();
      const x = latestX - rect.left;
      const y = latestY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
      
      // Calculate 3D Tilt angles (maximum 4.5 degrees)
      const w = rect.width;
      const h = rect.height;
      const dx = x - w / 2;
      const dy = y - h / 2;
      const rotateX = w > 0 && h > 0 ? ((-dy / (h / 2)) * 4.5).toFixed(2) : 0;
      const rotateY = w > 0 && h > 0 ? ((dx / (w / 2)) * 4.5).toFixed(2) : 0;
      
      const isProjectCard = card.classList.contains("project-card");
      const elevationY = isProjectCard ? -8 : 0;
      const elevationZ = isProjectCard ? 20 : 15;
      const targetScale = isProjectCard ? 1.06 : 1.02;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, ${elevationY}px, ${elevationZ}px) scale(${targetScale})`;
      
      rafId = requestAnimationFrame(tick);
    }
    
    card.addEventListener("mouseenter", (e) => {
      rect = card.getBoundingClientRect();
      if (card.classList.contains("project-card")) {
        card.style.zIndex = "25";
      }
      // Apply short interpolation during mouse tracking
      card.style.transition = "transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.2s ease, box-shadow 0.2s ease";
      isInside = true;
      latestX = e.clientX;
      latestY = e.clientY;
      tick();
    }, { signal });
    
    card.addEventListener("mousemove", (e) => {
      latestX = e.clientX;
      latestY = e.clientY;
    }, { signal });
    
    card.addEventListener("mouseleave", () => {
      isInside = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      rect = null;
      // Spring reset on mouse exit
      card.style.transition = "transform 0.65s var(--ease-out-spring), border-color 0.4s ease, box-shadow 0.4s ease";
      card.style.transform = "";
      card.style.zIndex = "";
    }, { signal });
  });
}
