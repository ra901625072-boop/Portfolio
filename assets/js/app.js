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
  });
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

// --- RESUME MOCKUP THEME SWITCHING ---
function initResumeThemeToggle() {
  const btnDark = document.getElementById("dot-theme-dark");
  const btnLight = document.getElementById("dot-theme-light");
  const iframe = document.querySelector(".resume-iframe");
  if (!btnDark || !btnLight || !iframe) return;

  btnDark.addEventListener("click", () => {
    btnDark.classList.add("active");
    btnLight.classList.remove("active");
    iframe.src = "assets/info/Resume.html?theme=dark";
  });

  btnLight.addEventListener("click", () => {
    btnLight.classList.add("active");
    btnDark.classList.remove("active");
    iframe.src = "assets/info/Resume.html?theme=light";
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
            <circle class="progress-ring-bg" stroke="rgba(255,255,255,0.06)" stroke-width="2.5" fill="transparent" r="14" cx="18" cy="18" />
            <circle class="progress-ring-fill" stroke="rgba(230, 57, 70, 0.45)" stroke-width="2.5" stroke-linecap="round" fill="transparent" r="14" cx="18" cy="18" />
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
  
  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progress.style.width = scrolled + "%";
  });
}

// --- MAIN RUNNER ---
document.addEventListener("DOMContentLoaded", () => {
  initScrollProgress();
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initResumeThemeToggle();
  initSkillsTabs();
  initContactForm();

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
