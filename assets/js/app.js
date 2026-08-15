import {
  renderProjects,
  initProjectFilters,
  renderAchievements,
  initializeSpotlightEffects
} from "./modules/projects.js";
import { initAnimations, animatePercentageText, triggerPageTransition, updateNavIndicator } from "./modules/animations.js";
import { EASE, requestAnimationFrameCoalesce } from "./modules/motion-tokens.js";
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll only on desktop non-touch devices
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

export let lenis = null;
if (!isTouchDevice) {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  });

  // Sync Lenis scroll position with GSAP's ScrollTrigger on every tick
  lenis.on('scroll', ScrollTrigger.update);

  // Use GSAP's ticker as the single RAF loop for both GSAP and Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // GSAP ticker passes seconds, Lenis expects ms
  });
  gsap.ticker.lagSmoothing(0);
}

// Lock scroll immediately on script execution to prevent layout jumping during loading
document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";
if (lenis) lenis.stop();

function safeGetItem(key, fallback = null) {
  try { return localStorage.getItem(key); } catch { return fallback; }
}
function safeSetItem(key, value) {
  try { localStorage.setItem(key, value); } catch { /* silent */ }
}

// --- HEADER SCROLL ACTION ---
function initHeaderScroll() {
  const header = document.querySelector("header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.getElementById("nav-overlay");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!hamburger || !navMenu) return;

  function toggleMenu() {
    const isActive = hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    if (navOverlay) navOverlay.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isActive ? "true" : "false");
    
    if (isActive) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }

  hamburger.addEventListener("click", toggleMenu);
  if (navOverlay) {
    navOverlay.addEventListener("click", toggleMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      if (navOverlay) navOverlay.classList.remove("active");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    });
  });

  // Swipe to close nav menu on mobile
  let touchStartX = 0;
  let touchEndX = 0;

  navMenu.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  navMenu.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    // Swipe right (horizontal delta > 80px) to slide closed
    if (touchEndX - touchStartX > 80) {
      if (hamburger.classList.contains("active")) {
        toggleMenu();
      }
    }
  }, { passive: true });
}

// --- SCROLLSPY SECTION BINDING ---
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (sections.length === 0 || navLinks.length === 0) return;

  const linkMap = new Map();
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      linkMap.set(href.slice(1), link);
    }
  });

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = linkMap.get(entry.target.id);
        if (activeLink) {
          activeLink.classList.add("active");
          updateNavIndicator();
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  });
  sections.forEach(section => observer.observe(section));
}

// Updates the resume iframe theme dynamically without reloading
function updateIframeTheme(isLight) {
  const iframe = document.querySelector(".resume-iframe");
  if (!iframe) return;
  
  try {
    if (iframe.contentDocument && iframe.contentDocument.body) {
      if (isLight) {
        iframe.contentDocument.body.classList.add("light-theme");
        iframe.contentDocument.body.classList.remove("dark-theme");
      } else {
        iframe.contentDocument.body.classList.add("dark-theme");
        iframe.contentDocument.body.classList.remove("light-theme");
      }
      // Sync URL parameter silently (without reloading iframe)
      const url = new URL(iframe.contentWindow.location.href);
      if (url.searchParams.get("theme") !== (isLight ? "light" : "dark")) {
        url.searchParams.set("theme", isLight ? "light" : "dark");
        iframe.contentWindow.history.replaceState(null, "", url.toString());
      }
    } else {
      // Fallback: If document body is not ready, update source
      iframe.src = `assets/docs/resume.html?theme=${isLight ? "light" : "dark"}`;
    }
  } catch (e) {
    // Cross-origin fallback (should not trigger for same-origin)
    iframe.src = `assets/docs/resume.html?theme=${isLight ? "light" : "dark"}`;
  }
}

// Syncs iframe, localStorage, and mockup buttons when theme changes
function updateThemeSideEffects(isLight) {
  safeSetItem("portfolio-theme", isLight ? "light" : "dark");
  
  updateIframeTheme(isLight);
  
  const btnDark = document.getElementById("dot-theme-dark");
  const btnLight = document.getElementById("dot-theme-light");
  if (btnDark && btnLight) {
    if (isLight) {
      btnLight.classList.add("active");
      btnDark.classList.remove("active");
    } else {
      btnDark.classList.add("active");
      btnLight.classList.remove("active");
    }
  }

  // Dispatch custom theme-changed event for animations (e.g. infinity canvas)
  window.dispatchEvent(new CustomEvent("theme-changed", { detail: { isLight } }));
}

// --- THEME MANAGEMENT SYSTEM (Light/Dark Mode) ---
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;
  
  const savedTheme = safeGetItem("portfolio-theme", "dark") || "dark";
  const iframe = document.querySelector(".resume-iframe");
  
  // Set initial state silently based on saved preferences
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (iframe) iframe.src = "assets/docs/resume.html?theme=light";
    
    const btnDark = document.getElementById("dot-theme-dark");
    const btnLight = document.getElementById("dot-theme-light");
    if (btnDark && btnLight) {
      btnLight.classList.add("active");
      btnDark.classList.remove("active");
    }
  } else {
    document.body.classList.remove("light-mode");
    if (iframe) iframe.src = "assets/docs/resume.html?theme=dark";
    
    const btnDark = document.getElementById("dot-theme-dark");
    const btnLight = document.getElementById("dot-theme-light");
    if (btnDark && btnLight) {
      btnDark.classList.add("active");
      btnLight.classList.remove("active");
    }
  }

  // Handle click on the main toggle button (fluid circular reveal)
  themeToggle.addEventListener("click", (event) => {
    themeToggle.classList.add("clicked");
    setTimeout(() => themeToggle.classList.remove("clicked"), 650);
    
    const isLightNow = document.body.classList.contains("light-mode");
    const targetLight = !isLightNow;

    // State change is handled declaratively in CSS via classes

    const toggleTheme = () => {
      if (targetLight) {
        document.body.classList.add("light-mode");
      } else {
        document.body.classList.remove("light-mode");
      }
      updateThemeSideEffects(targetLight);
    };

    // If View Transitions API is not supported, just toggle instantly (with CSS transition fallback)
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    // Get the click position, or fallback to the button's center
    const x = event.clientX ?? (themeToggle.getBoundingClientRect().left + themeToggle.clientWidth / 2);
    const y = event.clientY ?? (themeToggle.getBoundingClientRect().top + themeToggle.clientHeight / 2);
    
    // Calculate distance to the furthest corner of the viewport
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Disable CSS transitions temporarily to capture clean start/end states in screenshots
    const css = document.createElement("style");
    css.id = "theme-transition-disable";
    css.appendChild(document.createTextNode(`
      *, *::before, *::after {
        transition: none !important;
        transition-duration: 0s !important;
        animation-duration: 0s !important;
      }
    `));
    document.head.appendChild(css);

    const transition = document.startViewTransition(() => {
      toggleTheme();
    });

    transition.ready.then(() => {
      // Remove style tag to restore transitions for live interaction
      const cssEl = document.getElementById("theme-transition-disable");
      if (cssEl) cssEl.remove();

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath
        },
        {
          duration: 700,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)", // Fluid Apple-like decel curve
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });
  });
}

// --- RESUME MOCKUP THEME SWITCHING ---
function initResumeThemeToggle() {
  const btnDark = document.getElementById("dot-theme-dark");
  const btnLight = document.getElementById("dot-theme-light");
  if (!btnDark || !btnLight) return;

  btnDark.addEventListener("click", () => {
    btnDark.classList.add("active");
    btnLight.classList.remove("active");
    updateIframeTheme(false);
  });

  btnLight.addEventListener("click", () => {
    btnLight.classList.add("active");
    btnDark.classList.remove("active");
    updateIframeTheme(true);
  });
}

// --- SKILLS TAB SWITCHING ---
function initSkillsTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".skills-pane");

  const categoryIcons = {
    design: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    frontend: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>`,
    tools: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`
  };

  function animateProgressRing(container) {
    const fill = container.querySelector(".progress-ring-fill");
    const tooltip = container.querySelector(".tab-tooltip");
    const pct = parseInt(container.dataset.percentage, 10);
    
    if (fill && !isNaN(pct)) {
      const radius = 14;
      const circumference = 2 * Math.PI * radius; // ~88px
      const offset = circumference - (pct / 100) * circumference;
      
      gsap.set(fill, { attr: { "stroke-dasharray": circumference, "stroke-dashoffset": circumference } });
      
      gsap.to(fill, {
        attr: { "stroke-dashoffset": offset },
        duration: 1.2,
        ease: "power3.out",
      });
      
      if (tooltip) {
        animatePercentageText(tooltip, pct);
      }
    }
  }

  // Calculate and inject average percentage progress rings dynamically
  tabBtns.forEach(btn => {
    const targetTab = btn.dataset.tab;
    const pane = document.getElementById(`${targetTab}-skills`);
    if (pane) {
      const fills = pane.querySelectorAll(".skill-bar-fill");
      let total = 0;
      let count = 0;
      fills.forEach(f => {
        const pct = parseInt(f.dataset.percentage, 10);
        if (!isNaN(pct)) {
          total += pct;
          count++;
        }
      });
      if (count > 0) {
        const avg = Math.round(total / count);
        
        // Find existing svg chevron
        const svg = btn.querySelector("svg");
        
        // Create side wrapper
        const wrapper = document.createElement("span");
        wrapper.className = "tab-side-wrapper";
        
        // Create progress circle container
        const circleContainer = document.createElement("div");
        circleContainer.className = "tab-progress-circle";
        circleContainer.dataset.percentage = avg;
        
        circleContainer.innerHTML = `
          <svg class="progress-ring" width="36" height="36">
            <circle class="progress-ring-bg" stroke-width="2.5" fill="transparent" r="14" cx="18" cy="18" />
            <circle class="progress-ring-fill" stroke-width="2.5" stroke-linecap="round" fill="transparent" r="14" cx="18" cy="18" />
          </svg>
          <div class="tab-icon">
            ${categoryIcons[targetTab] || ""}
          </div>
          <span class="tab-tooltip">0%</span>
        `;
        
        wrapper.appendChild(circleContainer);
        if (svg) {
          wrapper.appendChild(svg); // Automatically moves the SVG inside the wrapper
        }
        
        btn.appendChild(wrapper);
      }
    }
  });

  // Trigger initial animation for all progress rings
  setTimeout(() => {
    document.querySelectorAll(".tab-progress-circle").forEach(container => {
      animateProgressRing(container);
    });
  }, 150);

  function switchTab(btn) {
    if (btn.classList.contains("active")) return;
    const targetTab = btn.dataset.tab;

    // Update active button and ARIA
    tabBtns.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    // Show/Hide Panes
    tabPanes.forEach(pane => {
      pane.classList.remove("active");
      if (pane.id === `${targetTab}-skills`) {
        pane.classList.add("active");
        
        // Find skill bars in active pane
        const fills = pane.querySelectorAll(".skill-bar-fill");
        
        // Reset scaleX to 0, keep target width statically (composited)
        fills.forEach(f => {
          const targetPct = parseInt(f.dataset.percentage, 10);
          if (isNaN(targetPct)) return;
          
          gsap.set(f, { width: `${targetPct}%`, transformOrigin: "left center", scaleX: 0 });
          
          const wrapper = f.closest(".skill-bar-wrapper");
          const labelPct = wrapper ? wrapper.querySelector(".skill-percentage") : null;
          
          let tooltip = f.querySelector(".skill-tooltip");
          if (!tooltip) {
            tooltip = document.createElement("span");
            tooltip.className = "skill-tooltip";
            f.appendChild(tooltip);
          }
          tooltip.innerText = "0%";
          if (labelPct) labelPct.innerText = "0%";
        });
        
        // Trigger GSAP draw-in and count-up animations with scaleX using unified expo ease
        fills.forEach((f, idx) => {
          const targetPct = parseInt(f.dataset.percentage, 10);
          if (isNaN(targetPct)) return;
          
          gsap.to(f, {
            scaleX: 1,
            duration: 1.5,
            delay: idx * 0.08,
            ease: EASE.expo,
            onStart: () => {
              const wrapper = f.closest(".skill-bar-wrapper");
              const labelPct = wrapper ? wrapper.querySelector(".skill-percentage") : null;
              const tooltip = f.querySelector(".skill-tooltip");
              if (tooltip) animatePercentageText(tooltip, targetPct);
              if (labelPct) animatePercentageText(labelPct, targetPct);
            }
          });
        });
      }
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn);
    });
    btn.addEventListener("mouseenter", () => {
      switchTab(btn);
      const container = btn.querySelector(".tab-progress-circle");
      if (container) {
        animateProgressRing(container);
      }
    });
  });
}

// --- TOAST NOTIFICATIONS SYSTEM ---
function showToast(title, message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const isSuccess = title.toLowerCase().includes("sent") || title.toLowerCase().includes("success");
  const toastClass = isSuccess ? "toast-success" : "toast-error";
  
  // Custom premium SVG icons
  const iconSvg = isSuccess 
    ? `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  const toast = document.createElement("div");
  toast.className = `toast ${toastClass}`;
  toast.innerHTML = `
    <div class="toast-header-bar">
      <div class="toast-title-group">
        ${iconSvg}
        <div class="toast-title">${title}</div>
      </div>
      <button class="toast-close-btn" aria-label="Dismiss toast">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    <div class="toast-message">${message}</div>
    <div class="toast-progress-bar-wrapper">
      <div class="toast-progress-bar"></div>
    </div>
  `;
  container.appendChild(toast);

  const dismissToast = () => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 600);
  };

  const closeBtn = toast.querySelector(".toast-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", dismissToast);
  }

  // Trigger animation reveal
  setTimeout(() => {
    toast.classList.add("show");
    const progressBar = toast.querySelector(".toast-progress-bar");
    if (progressBar) {
      progressBar.style.transition = "width 4.5s linear";
      progressBar.getBoundingClientRect(); // force layout refresh
      progressBar.style.width = "0%";
    }
  }, 50);

  // Auto close and clean up
  setTimeout(dismissToast, 4550);
}

// --- CONTACT FORM SUBMISSION & CLIENT-SIDE VALIDATION ---
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;

  const fields = [
    {
      id: "name",
      validate: (val) => val.length >= 2,
      errorMsg: "Name must be at least 2 characters long."
    },
    {
      id: "email",
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      errorMsg: "Please enter a valid email address."
    },
    {
      id: "subject",
      validate: (val) => val.length >= 3,
      errorMsg: "Domain must be at least 3 characters long."
    },
    {
      id: "message",
      validate: (val) => val.length >= 10,
      errorMsg: "Message details must be at least 10 characters long."
    }
  ];

  // Dynamically append error message containers and bind listeners
  fields.forEach(field => {
    const input = form.querySelector(`#${field.id}`);
    if (input) {
      const errEl = document.createElement("span");
      errEl.className = "error-message";
      errEl.innerText = field.errorMsg;
      input.parentNode.appendChild(errEl);

      // Real-time validations
      const validateField = () => {
        const val = input.value.trim();
        if (val === "") {
          input.classList.remove("is-valid", "is-invalid");
        } else if (field.validate(val)) {
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        } else {
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        }
      };

      input.addEventListener("input", validateField);
      input.addEventListener("blur", validateField);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isFormValid = true;

    // Run full validation on submit
    fields.forEach(field => {
      const input = form.querySelector(`#${field.id}`);
      if (input) {
        const val = input.value.trim();
        if (!field.validate(val)) {
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
          isFormValid = false;
        } else {
          input.classList.add("is-valid");
          input.classList.remove("is-invalid");
        }
      }
    });

    if (!isFormValid) {
      showToast("Validation Error", "Please correct the highlighted form inputs.");
      return;
    }

    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const subject = form.querySelector("#subject").value.trim();
    const message = form.querySelector("#message").value.trim();

    // Set loading state
    if (submitBtn) {
      submitBtn.style.pointerEvents = "none";
      submitBtn.style.opacity = "0.7";
    }
    if (btnText) btnText.innerText = "Sending Message...";

    // Real API request to FormSubmit AJAX endpoint
    fetch("https://formsubmit.co/ajax/ra901625072@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Subject: subject,
        Message: message
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // Reset button
      if (submitBtn) {
        submitBtn.style.pointerEvents = "auto";
        submitBtn.style.opacity = "1";
      }
      if (btnText) btnText.innerText = "Send Message";

      // Show Success Toast
      showToast("Message Sent!", `Thank you, ${name}. Your message has been forwarded.`);

      form.reset();
      
      // Clear valid/invalid indicators
      fields.forEach(field => {
        const input = form.querySelector(`#${field.id}`);
        if (input) {
          input.classList.remove("is-valid", "is-invalid");
        }
      });
    })
    .catch(error => {
      console.error("FormSubmit Error:", error);

      // Reset button
      if (submitBtn) {
        submitBtn.style.pointerEvents = "auto";
        submitBtn.style.opacity = "1";
      }
      if (btnText) btnText.innerText = "Send Message";

      // Show Error Toast
      showToast("Send Failed", "Could not route message. Please try again later.");
    });
  });
}

// --- SCROLL PROGRESS PROGRESSION ---
function initScrollProgress() {
  const progress = document.getElementById("scroll-progress");
  if (!progress) return;
  
  if (lenis) {
    // Bind progress bar directly to Lenis scroll event for frame-rate synchronized smooth scaling
    lenis.on('scroll', (e) => {
      progress.style.transform = `scaleX(${e.progress})`;
    });
  } else {
    // Mobile fallback: use native window scroll listener
    window.addEventListener("scroll", () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolled = window.scrollY / scrollHeight;
        progress.style.transform = `scaleX(${scrolled})`;
      }
    }, { passive: true });
  }
}

// --- MOBILE FOOTER MARQUEE EFFECT ---
function initMobileFooterMarquee() {
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return;
  
  const linksList = document.querySelector(".footer-links");
  if (!linksList) return;
  
  if (linksList.classList.contains("marquee-initialized")) return;
  linksList.classList.add("marquee-initialized");
  
  // Wrap list in a scrolling marquee wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "footer-links-marquee-wrapper";
  linksList.parentNode.insertBefore(wrapper, linksList);
  wrapper.appendChild(linksList);
  
  // Clone items once for a seamless infinite loop
  const items = linksList.querySelectorAll("li");
  items.forEach(item => {
    const clone = item.cloneNode(true);
    linksList.appendChild(clone);
  });
}

// --- VISITOR COUNTER IMPLEMENTATION ---
function initVisitorCounter() {
  const countEl = document.getElementById("visitor-count");
  if (!countEl) return;
  
  // Use counterapi.dev - free and fast hit counter
  // We use a custom namespace ('portfolioakshay') and key ('visitors')
  fetch("https://api.counterapi.dev/v1/portfolioakshay/visitors/up")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      if (data && data.count) {
        // Cache the real count to localStorage for reliable offline fallback
        safeSetItem("real-views", data.count);
        animateVisitorCountUp(countEl, data.count);
      } else {
        countEl.innerText = "1";
      }
    })
    .catch(error => {
      console.error("CounterAPI error:", error);
      // Fallback: Use the last cached real view count, or default to current database baseline (85)
      let localViews = parseInt(safeGetItem("real-views") || "85", 10);
      localViews += 1;
      safeSetItem("real-views", localViews);
      animateVisitorCountUp(countEl, localViews);
    });
}

function animateVisitorCountUp(element, target) {
  const start = Math.max(0, target - 30);
  const duration = 1200;
  const startTime = performance.now();
  
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.round(start + (target - start) * progress);
    element.innerText = current.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// --- FLIP LOGO TAKEOVER TRANSITION ---
function runLogoTakeover(preloader, preloaderLogo, callback) {
  const navLogo = document.getElementById("nav-logo");
  const header = document.querySelector("header");

  if (!navLogo) {
    preloader.classList.add("fade-out");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    setTimeout(() => {
      preloader.remove();
      if (callback) callback();
      window.dispatchEvent(new CustomEvent("recalc-offsets"));
    }, 1000);
    return;
  }

  // Temporarily reset header translations to read exact landing layout positions
  const originalHeaderTransform = header.style.transform;
  const originalHeaderOpacity = header.style.opacity;
  const originalHeaderVisibility = header.style.visibility;
  
  header.style.transform = "none";
  header.style.opacity = "0";
  header.style.visibility = "hidden";
  
  const lastRect = navLogo.getBoundingClientRect();
  
  // Restore initial header states
  header.style.transform = originalHeaderTransform;
  header.style.opacity = originalHeaderOpacity;
  header.style.visibility = originalHeaderVisibility;

  const firstRect = preloaderLogo.getBoundingClientRect();

  // Calculate layout offset deltas
  const deltaX = firstRect.left - lastRect.left;
  const deltaY = firstRect.top - lastRect.top;
  const scale = firstRect.width / lastRect.width;

  // Apply FLIP inversion styles on header logo (match preloader logo size/spot)
  navLogo.style.transformOrigin = "top left";
  navLogo.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scale})`;
  navLogo.style.transition = "none";
  navLogo.style.zIndex = "100001"; // Draw on top of preloader
  navLogo.style.opacity = "1";
  
  const dot = navLogo.querySelector(".logo-dot");

  // Make header active instantly but keep logo offset
  header.style.opacity = "1";
  header.style.transform = "none";

  // Hide preloader text instantly to make it seem like the same text is moving
  preloaderLogo.style.opacity = "0";
  preloaderLogo.style.transition = "opacity 0.15s ease";

  // Force reflow
  navLogo.offsetHeight;

  // Fade out preloader curtain overlay
  preloader.classList.add("fade-out");

  // Unlock scrolling immediately
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";

  // Play the takeover translation with a smooth, premium transition (Apple-style easeOutExpo but slightly slower)
  navLogo.style.transition = "transform 1.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease-out";
  navLogo.style.transform = "translate3d(0, 0, 0) scale(1)";

  // Trigger callback (site-loaded event) early to choreograph page entrance with the logo takeover
  if (callback) {
    setTimeout(callback, 550); // Sweet spot: page reveals smoothly mid-takeover
  }

  // Remove preloader curtain after it has fully faded out
  setTimeout(() => {
    preloader.remove();
    // Clean inline transformation styles
    navLogo.style.transform = "";
    navLogo.style.transformOrigin = "";
    navLogo.style.transition = "";
    navLogo.style.zIndex = "";
    // Notify all modules that layout positions have settled post-preloader
    window.dispatchEvent(new CustomEvent("recalc-offsets"));
  }, 1400);
}

// --- INITIALIZE PRELOADER LOGIC (Logo Typing with Staggered Character Slide-Up) ---
function initPreloader(callback) {
  const preloader = document.getElementById("preloader");
  const preloaderLogo = document.getElementById("preloader-logo-text");
  
  if (!preloader || !preloaderLogo) {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    if (callback) callback();
    return;
  }

  // Clear previous contents and construct letter spans
  preloaderLogo.innerHTML = "";
  const logoText = "Akshay";
  const letterSpans = [];

  for (let i = 0; i < logoText.length; i++) {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = logoText.charAt(i);
    preloaderLogo.appendChild(span);
    letterSpans.push(span);
  }
  
  // Create final baseline dot
  const dotNode = document.createElement("span");
  dotNode.className = "logo-dot";
  dotNode.style.display = "inline-block";
  dotNode.style.width = "14px";
  dotNode.style.height = "14px";
  dotNode.style.transform = "scale(0)";
  preloaderLogo.appendChild(dotNode);

  const isMobile = window.innerWidth <= 768;
  const duration = isMobile ? 600 : 1000; // Accelerated 600ms reveal on mobile
  const start = performance.now();

  function updateProgress(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    
    // Distribute typing slide-ups over the first 72% of the duration
    const typeProgress = Math.min(progress / 0.72, 1);
    const charIndex = Math.floor(typeProgress * (logoText.length + 1));
    
    letterSpans.forEach((span, idx) => {
      if (idx < charIndex) {
        span.classList.add("visible");
      } else {
        span.classList.remove("visible");
      }
    });

    // Pop dot in over final 28% of duration
    if (progress >= 0.72) {
      const dotProgress = (progress - 0.72) / 0.28;
      const scaleVal = Math.min(1.2, dotProgress * 1.35);
      dotNode.style.transform = `scale(${scaleVal})`;
    } else {
      dotNode.style.transform = "scale(0)";
    }

    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      // Settle dot and trigger the FLIP slide takeover
      dotNode.style.transform = "scale(1)";
      setTimeout(() => {
        runLogoTakeover(preloader, preloaderLogo, callback);
      }, 100);
    }
  }

  requestAnimationFrame(updateProgress);
}

// --- DYNAMIC NAVIGATION TRANSITIONS ---
function initNavTransitions() {
  const links = document.querySelectorAll('a[href^="#"]');
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.getElementById("nav-overlay");

  links.forEach(link => {
    if (link.getAttribute("href") === "#") return;
    if (link.classList.contains("skip-to-content")) return;
    if (link.id === "scroll-top") return;
    
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      
      // Collapse mobile drawer if active
      if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        if (navOverlay) navOverlay.classList.remove("active");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      }
      
      triggerPageTransition(targetId, () => {
        setTimeout(updateNavIndicator, 50);
      });
    });
  });

  // Scroll to top button smoothly via Lenis or fallback native scroll
  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// --- GLOBAL SKELETON SHIMMER DISMISSAL ---
function initShimmerDismissal() {
  document.addEventListener("load", (e) => {
    if (e.target && e.target.tagName === "IMG") {
      const wrapper = e.target.closest(".shimmer-wrapper");
      if (wrapper) {
        wrapper.classList.add("loaded");
      }
    }
  }, true); // Use capture phase
}

// --- SCROLL-DRIVEN AVATAR FLYING ANIMATION (GSAP ScrollTrigger & Curved Bezier Path) ---
function initAvatarScrollAnimation() {
  const heroCard = document.querySelector(".hero-avatar-card");
  const logoTarget = document.querySelector(".logo-avatar-container");
  const menuTarget = document.getElementById("menu-avatar-target") || document.querySelector(".menu-avatar-container");
  const navAvatarItem = document.getElementById("nav-avatar-item");
  const navAvatarBtn = document.getElementById("nav-avatar-btn");
  const flyingAvatar = document.getElementById("flying-avatar");
  
  if (!heroCard || !flyingAvatar) return;

  const flyingImg = flyingAvatar.querySelector(".flying-avatar-img") || flyingAvatar.querySelector("img");
  const flyingAura = flyingAvatar.querySelector(".flying-avatar-aura");
  const flyingFlare = flyingAvatar.querySelector(".flying-avatar-flare");
  let heroPageCenter = null;
  let targetViewportCenter = null;
  let activeTarget = null;
  let isMobileLayout = false;
  let wasDocked = false;
  let lastScrollY = window.scrollY;
  let lastScrollTime = performance.now();
  
  function updateLayoutPositions() {
    isMobileLayout = window.innerWidth <= 1024;
    activeTarget = isMobileLayout ? logoTarget : menuTarget;
    
    if (!heroCard || !activeTarget) return;
    
    // Temporarily reset styles to measure natural dimensions cleanly
    const originalHeroTransform = heroCard.style.transform;
    heroCard.style.transform = "none";
    
    const heroRect = heroCard.getBoundingClientRect();
    heroCard.style.transform = originalHeroTransform;
    
    if (heroRect.width === 0 || heroRect.height === 0) return;
    
    heroPageCenter = {
      x: heroRect.left + heroRect.width / 2 + window.scrollX,
      y: heroRect.top + heroRect.height / 2 + window.scrollY,
      width: heroRect.width,
      height: heroRect.height
    };
    
    // Measure destination target in viewport coordinates
    const targetRect = activeTarget.getBoundingClientRect();
    const tWidth = targetRect.width > 0 ? targetRect.width : (isMobileLayout ? 34 : 38);
    const tHeight = targetRect.height > 0 ? targetRect.height : tWidth;
    
    let tLeft = targetRect.left;
    let tTop = targetRect.top;
    
    if (targetRect.width === 0) {
      const headerContainer = document.querySelector("header .nav-container");
      const headerRect = headerContainer ? headerContainer.getBoundingClientRect() : { right: window.innerWidth - 32, top: 18 };
      tLeft = isMobileLayout ? 24 : (headerRect.right - tWidth);
      tTop = headerRect.top || 18;
    }
    
    targetViewportCenter = {
      x: tLeft + tWidth / 2,
      y: tTop + tHeight / 2,
      width: tWidth,
      height: tHeight
    };
    
    flyingAvatar.style.width = `${heroPageCenter.width}px`;
    flyingAvatar.style.height = `${heroPageCenter.height}px`;
  }
  
  // Initial measurement
  updateLayoutPositions();
  
  // Re-measure on layout changes (coalesced with rAF to prevent layout thrashing)
  const coalescedRecalcOffsets = requestAnimationFrameCoalesce(() => {
    updateLayoutPositions();
    ScrollTrigger.refresh();
  });
  window.addEventListener("resize", coalescedRecalcOffsets, { passive: true });
  window.addEventListener("load", coalescedRecalcOffsets, { passive: true });
  window.addEventListener("recalc-offsets", coalescedRecalcOffsets, { passive: true });
  
  // Hook click-to-scroll-to-top on the navbar avatar button
  if (navAvatarBtn) {
    navAvatarBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }
  
  // Use ScrollTrigger for the flying avatar animation along the Bezier trajectory
  ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "380px top",
    scrub: 0.25,
    onUpdate: (self) => {
      let progress = self.progress;
      if (window.scrollY < 4) progress = 0;
      
      const body = document.body;
      
      // State 0: In Hero Section (Resting position)
      if (progress === 0) {
        body.classList.remove("scrolled-avatar");
        heroCard.style.transition = "opacity 0.3s ease";
        heroCard.style.opacity = "1";
        heroCard.style.pointerEvents = "auto";
        flyingAvatar.style.display = "none";
        flyingAvatar.style.opacity = "0";
        if (menuTarget) menuTarget.classList.remove("dock-pulse");
        if (logoTarget) logoTarget.classList.remove("dock-pulse");
        wasDocked = false;
        return;
      }
      
      // State 1: Docked in Navbar
      if (progress >= 0.96) {
        body.classList.add("scrolled-avatar");
        heroCard.style.transition = "none";
        heroCard.style.opacity = "0";
        heroCard.style.pointerEvents = "none";
        flyingAvatar.style.display = "none";
        flyingAvatar.style.opacity = "0";
        
        if (!wasDocked) {
          wasDocked = true;
          if (activeTarget) {
            activeTarget.classList.add("dock-pulse");
            setTimeout(() => {
              if (activeTarget) activeTarget.classList.remove("dock-pulse");
            }, 900);
          }
        }
        return;
      }
      
      // State 2: In Flight along curved Bezier trajectory (0 < progress < 0.96)
      wasDocked = false;
      body.classList.remove("scrolled-avatar");
      heroCard.style.transition = "none";
      heroCard.style.opacity = "0";
      heroCard.style.pointerEvents = "none";
      flyingAvatar.style.display = "block";
      flyingAvatar.style.opacity = "1";
      
      if (!heroPageCenter || !targetViewportCenter) return;
      
      // Smooth cubic-out easing for path progression
      const p = progress;
      const t = p * (2 - p);
      
      // Calculate current hero card center in viewport coordinates
      const x0 = heroPageCenter.x - window.scrollX;
      const y0 = heroPageCenter.y - (window.scrollY || document.documentElement.scrollTop);
      
      // Target center in viewport coordinates
      const x2 = targetViewportCenter.x;
      const y2 = targetViewportCenter.y;
      
      // Quadratic Bezier Control Point P1 for aerodynamic sweeping curve
      let x1, y1;
      if (!isMobileLayout) {
        // Desktop: Sweeps upward and outward to the right towards top-right navbar corner
        const extraArcX = Math.abs(x2 - x0) * 0.18 + 40;
        x1 = Math.min(window.innerWidth - 30, Math.max(x0, x2) + extraArcX);
        y1 = y2 + (y0 - y2) * 0.18 - 25;
      } else {
        // Mobile: Smooth curve towards top-left logo
        x1 = x2 + (x0 - x2) * 0.65;
        y1 = y2 + (y0 - y2) * 0.2 - 20;
      }
      
      // Quadratic Bezier Formula: B(t) = (1-t)^2 * P0 + 2*(1-t)*t * P1 + t^2 * P2
      const oneMinusT = 1 - t;
      const curCenterX = oneMinusT * oneMinusT * x0 + 2 * oneMinusT * t * x1 + t * t * x2;
      const curCenterY = oneMinusT * oneMinusT * y0 + 2 * oneMinusT * t * y1 + t * t * y2;
      
      // Scale Interpolation: 1.0 down to destination scale
      const targetScale = targetViewportCenter.width / heroPageCenter.width;
      const scale = 1.0 + (targetScale - 1.0) * t;
      
      // Corner Radius Morphing: from rounded card (24px) to 50% circle (width / 2)
      const startRadius = 24;
      const endRadius = heroPageCenter.width / 2;
      const curRadius = startRadius + (endRadius - startRadius) * t;
      
      // Dynamic 3D Banking & Roll physics during flight
      const arcSin = Math.sin(t * Math.PI);
      const rotZ = arcSin * (isMobileLayout ? -3.5 : 5.0);
      const rotY = arcSin * (isMobileLayout ? -5.0 : 7.0);
      const rotX = -arcSin * 3.5;
      
      // Viewport translate3d coordinates (relative to center transform-origin)
      const curLeft = curCenterX - heroPageCenter.width / 2;
      const curTop = curCenterY - heroPageCenter.height / 2;
      
      flyingAvatar.style.transform = `translate3d(${curLeft.toFixed(1)}px, ${curTop.toFixed(1)}px, 0) scale(${scale.toFixed(4)}) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg)`;
      flyingAvatar.style.borderRadius = `${curRadius.toFixed(1)}px`;
      
      // Dynamic kinetic aura & velocity reactive stretch
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTime);
      const dy = Math.abs(window.scrollY - lastScrollY);
      const velocity = Math.min(3.0, dy / dt);
      lastScrollY = window.scrollY;
      lastScrollTime = now;
      
      if (flyingAura) {
        const auraScale = 1.0 + Math.min(0.35, velocity * 0.15) + arcSin * 0.12;
        const auraOpacity = Math.min(1.0, 0.7 + arcSin * 0.25 + velocity * 0.1);
        flyingAura.style.transform = `scale(${auraScale.toFixed(3)})`;
        flyingAura.style.opacity = auraOpacity.toFixed(2);
      }
      
      if (flyingFlare) {
        const flareOpacity = arcSin * 0.65;
        flyingFlare.style.opacity = flareOpacity.toFixed(2);
      }
      
      // Internal image centering & framing
      if (flyingImg) {
        const imgY = -t * 12;
        const imgScale = 0.92 + 0.18 * t;
        flyingImg.style.transform = `scale(${imgScale.toFixed(3)}) translateY(${imgY.toFixed(1)}px)`;
      }
    }
  });
}

// --- MAIN RUNNER ---
document.addEventListener("DOMContentLoaded", () => {
  initPreloader(() => {
    // Notify module scripts that site loading has concluded
    document.dispatchEvent(new CustomEvent("site-loaded"));
    if (lenis) lenis.start();
  });

  initTheme(); // Initialize theme classes early to prevent FOUC / canvas initialization conflicts
  initAnimations();
  initScrollProgress();
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initResumeThemeToggle();
  initSkillsTabs();
  initContactForm();
  initMobileFooterMarquee();
  
  let marqueeResizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(marqueeResizeTimer);
    marqueeResizeTimer = setTimeout(initMobileFooterMarquee, 250);
  }, { passive: true });

  initVisitorCounter();

  // Initialize new premium transitions and skeleton listeners
  initNavTransitions();
  initShimmerDismissal();
  initAvatarScrollAnimation();

  // Load dynamically generated projects & achievements data
  renderProjects("all");
  initProjectFilters();
  renderAchievements();
  initializeSpotlightEffects();

  // Trigger recalculation of layout offsets once dynamic templates have rendered in the DOM
  window.dispatchEvent(new CustomEvent("recalc-offsets"));
});
