import { PROJECTS_DATA, ACHIEVEMENTS_DATA } from "../data/projects-data.js";

// --- RENDER PORTFOLIO PROJECTS ---
export function renderProjects(filterValue = "all") {
  const container = document.getElementById("projects-grid");
  if (!container) return;
  
  container.innerHTML = "";
  
  const filtered = filterValue === "all" 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filterValue);
      
  filtered.forEach((project, index) => {
    const card = document.createElement("div");
    card.className = "project-card glass-card spotlight-card";
    card.dataset.id = project.id;
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `View details for project: ${project.title}`);
    
    // Add cascading stagger delay
    card.style.animationDelay = `${index * 0.08}s`;
    
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
      <div class="project-img-container">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-card-content">
        <div class="project-tags">${tagsHtml}</div>
        <h3 class="project-card-title">${project.title}</h3>
        <p class="project-card-desc">${project.description}</p>
      </div>
    `;
    
    // Add click and keyboard triggers
    card.addEventListener("click", () => openCaseStudy(project.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCaseStudy(project.id);
      }
    });
    
    container.appendChild(card);
  });
  
  // Re-run spotlight init for newly added cards
  if (typeof initializeSpotlightEffects === "function") {
    initializeSpotlightEffects();
  }
}

// --- INITIALIZE FILTER BUTTONS ---
export function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("projects-grid");
  
  filterButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (btn.classList.contains("active")) return;
      
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filterValue = btn.dataset.filter;
      
      if (grid) {
        // Smooth fade-out and translation shift before rendering
        grid.style.transition = "opacity 0.22s var(--ease-out-expo), transform 0.22s var(--ease-out-expo)";
        grid.style.opacity = "0";
        grid.style.transform = "translateY(12px)";
        
        setTimeout(() => {
          renderProjects(filterValue);
          grid.style.opacity = "1";
          grid.style.transform = "translateY(0)";
        }, 220);
      } else {
        renderProjects(filterValue);
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
    <img src="${project.image}" alt="${project.title}" class="modal-cover-img">
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
  
  // Show modal overlay & prevent background shifting
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
  modalOverlay.classList.add("active");
  
  // Focus initial element
  const closeBtn = document.getElementById("modal-close");
  closeBtn.focus();
  
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

export function closeCaseStudy() {
  const modalOverlay = document.getElementById("case-study-modal");
  if (!modalOverlay) return;
  
  modalOverlay.classList.remove("active");
  
  // Restore scroll and remove padding offsets
  document.body.style.overflow = ""; // Restore scrolling
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
  
  items.forEach(a => {
    const card = document.createElement("div");
    card.className = "achievement-card glass-card spotlight-card";
    
    card.innerHTML = `
      <div class="achievement-icon">${a.icon}</div>
      <span class="achievement-issuer">${a.issuer}</span>
      <h3 class="achievement-title">${a.title}</h3>
      <p class="achievement-desc">${a.desc}</p>
    `;
    
    container.appendChild(card);
  });
}

// --- SPOTLIGHT GLOW MOUSE BINDINGS ---
export function initializeSpotlightEffects() {
  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach(card => {
    let rect = null;
    
    card.addEventListener("mouseenter", () => {
      rect = card.getBoundingClientRect();
    });
    
    card.addEventListener("mousemove", (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
    
    card.addEventListener("mouseleave", () => {
      rect = null;
    });
  });
}
