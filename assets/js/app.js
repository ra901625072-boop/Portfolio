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
    
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
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
      document.body.style.overflow = "";
    });
  });
}

// --- SCROLLSPY SECTION BINDING ---
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
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
      iframe.src = `assets/info/Resume.html?theme=${isLight ? "light" : "dark"}`;
    }
  } catch (e) {
    // Cross-origin fallback (should not trigger for same-origin)
    iframe.src = `assets/info/Resume.html?theme=${isLight ? "light" : "dark"}`;
  }
}

// Syncs iframe, localStorage, and mockup buttons when theme changes
function updateThemeSideEffects(isLight) {
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  
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
}

// --- THEME MANAGEMENT SYSTEM (Light/Dark Mode) ---
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;
  
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  const iframe = document.querySelector(".resume-iframe");
  
  // Set initial state silently based on saved preferences
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (iframe) iframe.src = "assets/info/Resume.html?theme=light";
    
    const btnDark = document.getElementById("dot-theme-dark");
    const btnLight = document.getElementById("dot-theme-light");
    if (btnDark && btnLight) {
      btnLight.classList.add("active");
      btnDark.classList.remove("active");
    }
  } else {
    document.body.classList.remove("light-mode");
    if (iframe) iframe.src = "assets/info/Resume.html?theme=dark";
  }

  // Handle click on the main toggle button (fluid circular reveal)
  themeToggle.addEventListener("click", (event) => {
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
          duration: 650,
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

  function animatePercentageText(tooltip, targetVal) {
    let current = 0;
    const duration = 1000; // Matches progress ring animation speed
    const startTime = performance.now();
    
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad
      current = Math.round(ease * targetVal);
      tooltip.innerText = `${current}%`;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  function animateProgressRing(container) {
    const fill = container.querySelector(".progress-ring-fill");
    const tooltip = container.querySelector(".tab-tooltip");
    const pct = parseInt(container.dataset.percentage, 10);
    
    if (fill && !isNaN(pct)) {
      const radius = 14;
      const circumference = 2 * Math.PI * radius; // ~88px
      
      fill.style.strokeDasharray = circumference;
      fill.style.transition = "none";
      fill.style.strokeDashoffset = circumference;
      
      // Force reflow
      fill.getBoundingClientRect();
      
      fill.style.transition = "stroke-dashoffset 1s cubic-bezier(0.25, 0.8, 0.25, 1)";
      const offset = circumference - (pct / 100) * circumference;
      fill.style.strokeDashoffset = offset;
      
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

  // Expose to window so animations.js can synchronize animations
  window.animatePercentageText = animatePercentageText;

  function switchTab(btn) {
    if (btn.classList.contains("active")) return;
    const targetTab = btn.dataset.tab;

    // Update active button
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Show/Hide Panes
    tabPanes.forEach(pane => {
      pane.classList.remove("active");
      if (pane.id === `${targetTab}-skills`) {
        pane.classList.add("active");
        
        // Find skill bars in active pane
        const fills = pane.querySelectorAll(".skill-bar-fill");
        
        // Reset widths and label/tooltip text to 0 to prepare for animation
        fills.forEach(f => {
          const targetPct = parseInt(f.dataset.percentage, 10);
          if (isNaN(targetPct)) return;
          
          f.style.transition = "none";
          f.style.width = "0%";
          
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
        
        // Force reflow
        pane.offsetHeight;
        
        // Trigger smooth draw-in and count-up animations
        setTimeout(() => {
          fills.forEach(f => {
            const targetPct = parseInt(f.dataset.percentage, 10);
            if (isNaN(targetPct)) return;
            
            f.style.transition = "width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1)";
            f.style.width = `${targetPct}%`;
            
            const wrapper = f.closest(".skill-bar-wrapper");
            const labelPct = wrapper ? wrapper.querySelector(".skill-percentage") : null;
            const tooltip = f.querySelector(".skill-tooltip");
            
            if (tooltip) {
              animatePercentageText(tooltip, targetPct);
            }
            if (labelPct) {
              animatePercentageText(labelPct, targetPct);
            }
          });
        }, 50);
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
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <div class="toast-title">${title}</div>
    <div class="toast-message">${message}</div>
  `;
  container.appendChild(toast);

  // Trigger animation reveal
  setTimeout(() => {
    toast.classList.add("show");
  }, 50);

  // Auto close and clean up
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 4500);
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
  
  let docHeight = document.documentElement.scrollHeight;
  let viewHeight = document.documentElement.clientHeight;
  let totalScrollable = docHeight - viewHeight;

  // Recalculate dimensions on resize/orientation changes instead of on scroll ticks
  window.addEventListener("resize", () => {
    docHeight = document.documentElement.scrollHeight;
    viewHeight = document.documentElement.clientHeight;
    totalScrollable = docHeight - viewHeight;
  }, { passive: true });

  window.addEventListener("scroll", () => {
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const scrolled = totalScrollable > 0 ? (winScroll / totalScrollable) * 100 : 0;
    progress.style.width = scrolled + "%";
  }, { passive: true });
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
        localStorage.setItem("real-views", data.count);
        animateVisitorCountUp(countEl, data.count);
      } else {
        countEl.innerText = "1";
      }
    })
    .catch(error => {
      console.error("CounterAPI error:", error);
      // Fallback: Use the last cached real view count, or default to current database baseline (85)
      let localViews = parseInt(localStorage.getItem("real-views") || "85", 10);
      localViews += 1;
      localStorage.setItem("real-views", localViews);
      animateVisitorCountUp(countEl, localViews);
    });
}

function animateVisitorCountUp(element, target) {
  let count = Math.max(0, target - 30); // start count-up from last 30 hits for a quick visual ticker
  const duration = 1200; // ms
  const stepTime = Math.max(Math.floor(duration / 30), 15);
  
  const timer = setInterval(() => {
    count++;
    element.innerText = count.toLocaleString();
    if (count >= target) {
      element.innerText = target.toLocaleString();
      clearInterval(timer);
    }
  }, stepTime);
}

// --- MAIN RUNNER ---
document.addEventListener("DOMContentLoaded", () => {
  initScrollProgress();
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initTheme();
  initResumeThemeToggle();
  initSkillsTabs();
  initContactForm();
  initMobileFooterMarquee();
  initVisitorCounter();

  // Load dynamically generated projects & achievements data
  if (typeof renderProjects === "function") {
    renderProjects("all");
  }
  if (typeof initProjectFilters === "function") {
    initProjectFilters();
  }
  if (typeof renderAchievements === "function") {
    renderAchievements();
  }
  if (typeof initCarouselControls === "function") {
    initCarouselControls();
  }
  if (typeof initializeSpotlightEffects === "function") {
    initializeSpotlightEffects();
  }
});
