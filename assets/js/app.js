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

  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// --- SKILLS TAB SWITCHING ---
function initSkillsTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".skills-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;

      // Update active button
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Show/Hide Panes
      tabPanes.forEach(pane => {
        pane.classList.remove("active");
        if (pane.id === `${targetTab}-skills`) {
          pane.classList.add("active");
          // Re-trigger bar fill animations for newly shown panel
          setTimeout(() => {
            const fills = pane.querySelectorAll(".skill-bar-fill");
            fills.forEach(f => {
              f.style.width = `${f.dataset.percentage}%`;
              let tooltip = f.querySelector(".skill-tooltip");
              if (!tooltip) {
                tooltip = document.createElement("span");
                tooltip.className = "skill-tooltip";
                tooltip.innerText = `${f.dataset.percentage}%`;
                f.appendChild(tooltip);
              }
            });
          }, 50);
        }
      });
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

    // Set loading state
    if (submitBtn) {
      submitBtn.style.pointerEvents = "none";
      submitBtn.style.opacity = "0.7";
    }
    if (btnText) btnText.innerText = "Sending Message...";

    // Mock API request
    setTimeout(() => {
      // Reset button
      if (submitBtn) {
        submitBtn.style.pointerEvents = "auto";
        submitBtn.style.opacity = "1";
      }
      if (btnText) btnText.innerText = "Send Message";

      // Show Success Toast
      showToast("Message Sent!", `Thank you, ${name}. Your message has been received.`);

      form.reset();
      
      // Clear valid/invalid indicators
      fields.forEach(field => {
        const input = form.querySelector(`#${field.id}`);
        if (input) {
          input.classList.remove("is-valid", "is-invalid");
        }
      });
      
    }, 1500);
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
