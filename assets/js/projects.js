// --- PROJECT & CASES DATA ---
const PROJECTS_DATA = [
  {
    id: 1,
    title: "Multi-Agent Automation Agent",
    category: "python-ai",
    tags: ["Python", "AI", "Agentic Automation"],
    image: "assets/images/multi_agent_automation_agent.jpg",
    client: "Personal Project",
    date: "July 2026",
    role: "Independent Creator",
    demoUrl: "#",
    githubUrl: "https://github.com/ra901625072-boop/Jarvis-Voice-Assistant",
    description: `A voice- and text-mode automation agent capable of executing complex workflows by orchestrating multiple specialized sub-agents (coding, research, and planning agents).`,
    body: `
      <h4>The Challenge</h4>
      <p>Building automated systems that can reason, code, search, and plan without human intervention is highly challenging. Integrating voice inputs, handling visual elements, and ensuring smooth collaboration between multiple AI sub-agents required a robust concurrency and message-passing architecture.</p>
      
      <h4>The Creative Approach</h4>
      <p>I built this system in Python, leveraging FastAPI for backend services and custom event loops to coordinate agents. I designed specialized sub-agents (Coding Agent, Research Agent, and Planning Agent) that communicate over a JSON-based protocol. To handle voice interactions, I integrated audio processing models that transcribe and respond to commands dynamically.</p>
      
      <h4>Key Deliverables</h4>
      <ul>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Multi-agent orchestration protocol (JSON-over-socket/event loops)</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Voice-to-text and text-to-voice command routing system</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Integrated planning, code editing, and execution sub-system</li>
      </ul>
    `
  },
  {
    id: 2,
    title: "Pali CBDC Portal",
    category: "full-stack",
    tags: ["Python", "FastAPI", "SQL", "Dashboard"],
    image: "assets/images/CBDC Pali.png",
    client: "Panchayat Office (Pali)",
    date: "March 2026",
    role: "Full-Stack Freelance Developer",
    demoUrl: "https://pali-omega.vercel.app",
    githubUrl: "https://github.com/ra901625072-boop/pali",
    description: `A localized web application built to track beneficiary enrollment and validation for the Central Bank Digital Currency (CBDC) rollout in Pali, featuring secure administrative analytics.`,
    body: `
      <h4>The Challenge</h4>
      <p>During the CBDC rollout, village-level administrators (Talatis) struggled to manage registration data and track which residents successfully completed enrollment. They required an intuitive, lightweight database solution accessible on basic computers and tablets.</p>
      
      <h4>The Creative Approach</h4>
      <p>I developed a FastAPI application paired with an SQL database. The public side allows residents to search whether they are listed as active beneficiaries. The secure admin dashboard enables Talatis to manage lists, view progress analytics, and export CSV/Excel reports instantly. The styling was optimized for quick load times over rural network speeds.</p>
      
      <h4>Key Deliverables</h4>
      <ul>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Real-time database lookup with fast search queries</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Admin authentication and data management console</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Localized visual metrics dashboard showing completion analytics</li>
      </ul>
    `
  },
  {
    id: 3,
    title: "e-Grossary Mart",
    category: "full-stack",
    tags: ["Python", "FastAPI", "SQL", "E-commerce"],
    image: "assets/images/e-grossary.png",
    client: "Retail Grocery Client",
    date: "May 2026",
    role: "Full-Stack Freelance Developer",
    demoUrl: "https://glossary-mart.onrender.com",
    githubUrl: "https://github.com/ra901625072-boop/Glossary-Mart",
    description: `An inventory and supplier management system paired with an executive dashboard tracking metrics, revenue, and stock levels, alongside a customer-facing digital storefront.`,
    body: `
      <h4>The Challenge</h4>
      <p>The client was running their wholesale and retail grocery supply manually. They were experiencing inventory discrepancies, lack of real-time stock levels, and no visibility into daily revenue margins.</p>
      
      <h4>The Creative Approach</h4>
      <p>I engineered a full-stack platform featuring two major portals. The client dashboard provides real-time supply chain oversight, stock warnings, supplier tracking, and sales analytics. The client-facing portal functions as a sleek e-commerce store with search and dynamic shopping carts, linking directly to inventory databases to prevent overselling.</p>
      
      <h4>Key Deliverables</h4>
      <ul>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Dynamic inventory ledger and low-stock warning system</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Interactive sales analytics charting with revenue tracking</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Customer shopping interface with live inventory synchronization</li>
      </ul>
    `
  },
  {
    id: 4,
    title: "FamDoc (Family Document Manager)",
    category: "full-stack",
    tags: ["Python", "APIs", "SQL", "Cloud Storage"],
    image: "assets/images/FamDoc.png",
    client: "Personal Project",
    date: "January 2026",
    role: "Full-Stack Developer",
    demoUrl: "https://famdoc-b51u.onrender.com",
    githubUrl: "https://github.com/ra901625072-boop/FamDoc",
    description: `A private document-sharing portal modeled after Google Drive. Families join using a unique family code, making uploaded documents instantly viewable and downloadable by all members.`,
    body: `
      <h4>The Challenge</h4>
      <p>Family members often need to share critical documents (IDs, tax forms, certificates) but rely on unsecured messaging channels or scattered cloud storage folders, leading to constant requests and search fatigue.</p>
      
      <h4>The Creative Approach</h4>
      <p>I built FamDoc using Python and FastAPI, integrating cloud storage APIs (Google Drive and MEGA) as backends. When a user creates an account, they generate a unique family code. Other family members sign up and join using that code. Any document uploaded by a family member is securely encrypted, stored, and displayed on a joint dashboard for quick viewing and downloading.</p>
      
      <h4>Key Deliverables</h4>
      <ul>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Family code generation and member joining mechanism</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> File upload streaming to Google Drive & MEGA APIs</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Secure search indexing to instantly locate files by tags/titles</li>
      </ul>
    `
  },
  {
    id: 5,
    title: "Resume Maker",
    category: "frontend",
    tags: ["Python", "HTML/CSS/JS", "SQL", "Templates"],
    image: "assets/images/Resume Maker.png",
    client: "Student Project",
    date: "April 2026",
    role: "Full-Stack Creator",
    demoUrl: "https://resume-maker-zhcq.onrender.com",
    githubUrl: "https://github.com/ra901625072-boop/Resume-Maker",
    description: `A web application targeting students and design novices. Users enter their credentials and layout preferences to generate and download professional, formatted resumes.`,
    body: `
      <h4>The Challenge</h4>
      <p>Many students entering the job market lack design skills or experience with formatting tools, resulting in poorly structured resumes. They need a simple, structured form that outputs a clean, ATS-friendly document.</p>
      
      <h4>The Creative Approach</h4>
      <p>I created an interactive web interface where users fill in their educational, professional, and project history. The application parses this data and renders it in real-time onto multiple selected design templates. Users can customize colors, fonts, and ordering, and instantly download their resume in HTML or formatted PDF.</p>
      
      <h4>Key Deliverables</h4>
      <ul>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Interactive, multi-step profile builder form</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Dynamic CSS template parser and preview canvas</li>
        <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> PDF rendering engine and export handler</li>
      </ul>
    `
  }
];

// --- ACHIEVEMENTS DATA ---
const ACHIEVEMENTS_DATA = [
  {
    id: 1,
    title: "Python Programming Mastery",
    issuer: "Independent Software Dev",
    desc: "Demonstrated capacity to structure robust FastAPI backends, build multi-agent communication networks, and integrate complex third-party cloud storage APIs.",
    icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`
  },
  {
    id: 2,
    title: "Web Dev Internship Certificate",
    issuer: "Wixasis Pvt. Ltd.",
    desc: "Earned formal certification following a 3-month intensive web engineering internship, delivering functional client-facing web application features.",
    icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>`
  },
  {
    id: 3,
    title: "Ethical Hacking Certificate",
    issuer: "HNGU University",
    desc: "Awarded academic certification in security fundamentals, pen-testing techniques, network configuration, and vulnerability analysis.",
    icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path><path d="M12 2a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"></path></svg>`
  }
];

// --- RENDER PORTFOLIO PROJECTS ---
function renderProjects(filterValue = "all") {
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
function initProjectFilters() {
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

function openCaseStudy(projectId) {
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
        <a href="${project.demoUrl}" class="btn btn-primary" target="_blank" rel="noopener">
          Launch Live App
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
        <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener">
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

function closeCaseStudy() {
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
function renderAchievements() {
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

// --- CAROUSEL SLIDER CONTROLS (Marquee Fallback Stub) ---
function initCarouselControls() {
  // Infinite marquee runs via CSS animations
  return;
}

// --- SPOTLIGHT GLOW MOUSE BINDINGS ---
function initializeSpotlightEffects() {
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

// --- EXPORT GLOBALS ---
window.PROJECTS_DATA = PROJECTS_DATA;
window.renderProjects = renderProjects;
window.initProjectFilters = initProjectFilters;
window.renderAchievements = renderAchievements;
window.initCarouselControls = initCarouselControls;
window.initializeSpotlightEffects = initializeSpotlightEffects;
