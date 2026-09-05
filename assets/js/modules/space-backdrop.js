/**
 * Space Backdrop Canvas Engine
 * High-performance 60fps multi-layer cosmic environment
 * Features:
 * - 3-Layer Depth Starfield with True 3D Vertical Parallax Scroll
 * - Multi-depth vertical travel velocity (deep stars move slowly, close stars stream past)
 * - Subtle cosmic warp inertia stretch on rapid scrolling
 * - Interactive Cursor Constellation Network (stardust lines near pointer)
 * - Dynamic Shooting Star / Meteor Streamer with glowing ion trails
 * - Smooth Mouse Parallax Drift
 * - Dark (Deep Cosmos Pure Black) & Light (Orbital Stratosphere) Mode Adaptation
 * - Battery & CPU optimizations (tab sleep, DPR throttle, prefers-reduced-motion fallback)
 */

class SpaceBackdrop {
  constructor(canvasId = "space-backdrop-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = window.innerWidth <= 768;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.5 : 2);

    this.isLight = document.body.classList.contains("light-mode");
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this.stars = [];
    this.meteors = [];
    this.maxMeteors = this.isMobile ? 1 : 2;
    this.meteorTimer = 0;
    this.nextMeteorInterval = 120 + Math.random() * 180; // frames until next meteor

    // Mouse & Parallax tracking
    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
      targetX: this.width / 2,
      targetY: this.height / 2,
      isActive: false
    };

    // Vertical Scroll Parallax & Velocity tracking
    this.scrollY = window.scrollY || window.pageYOffset || 0;
    this.targetScrollY = this.scrollY;
    this.lastScrollY = this.scrollY;
    this.scrollVelocity = 0;

    this.rafId = null;
    this.isVisible = true;
    this.lastTime = performance.now();

    this.init();
  }

  init() {
    this.resize();
    this.createStars();

    this.bindEvents();

    if (this.reducedMotion) {
      // Render single static cosmic frame for reduced motion users
      this.renderStatic();
    } else {
      this.start();
    }
  }

  bindEvents() {
    // Window Resize with debounce
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
        this.createStars();
        if (this.reducedMotion) this.renderStatic();
      }, 150);
    }, { passive: true });

    // Pointer / Mouse Parallax & Interaction
    const onPointerMove = (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
      this.mouse.isActive = true;
    };

    const onPointerLeave = () => {
      this.mouse.isActive = false;
      this.mouse.targetX = this.width / 2;
      this.mouse.targetY = this.height / 2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave, { passive: true });

    // Vertical Scroll Listener for multi-depth space descent
    const onScroll = () => {
      this.targetScrollY = window.scrollY || window.pageYOffset || 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Theme Changed Event listener
    window.addEventListener("theme-changed", (e) => {
      this.isLight = e.detail.isLight;
      this.updateStarColors();
      if (this.reducedMotion) this.renderStatic();
    });

    // Pause rendering when tab is inactive to save battery/CPU
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stop();
      } else {
        if (!this.reducedMotion) {
          this.lastTime = performance.now();
          this.start();
        }
      }
    });

    // Reduced motion media query change listener
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", (e) => {
        this.reducedMotion = e.matches;
        if (this.reducedMotion) {
          this.stop();
          this.renderStatic();
        } else {
          this.start();
        }
      });
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = this.width <= 768;
    this.dpr = Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.5 : 2);

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    this.ctx.scale(this.dpr, this.dpr);
  }

  createStars() {
    this.stars = [];
    // Calculate star count based on viewport area
    const area = this.width * this.height;
    const count = this.isMobile
      ? Math.min(90, Math.floor(area / 8500))
      : Math.min(230, Math.floor(area / 6000));

    // Star color palettes for dark & light mode (Pure Black OLED background)
    const darkPalette = [
      { r: 255, g: 255, b: 255 }, // Pure Crisp Starlight White (70%)
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 209, b: 102 },   // Solar Amber Gold (15%)
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 77, b: 109 }     // Supernova Rose Red (15%)
    ];

    const lightPalette = [
      { r: 28, g: 45, b: 84 },     // Deep Navy Platinum
      { r: 35, g: 83, b: 71 },     // Forest Teal
      { r: 67, g: 97, b: 238 },    // Royal Celestial Azure
      { r: 120, g: 86, b: 222 }    // Luminous Violet
    ];

    const palette = this.isLight ? lightPalette : darkPalette;

    for (let i = 0; i < count; i++) {
      const depth = Math.random(); // 0 (far) to 1 (near)
      const color = palette[Math.floor(Math.random() * palette.length)];
      
      // Layer determination
      let layer = 1; // micro distant stars
      let radius = 0.5 + Math.random() * 0.8;
      let hasFlare = false;

      if (depth > 0.82) {
        layer = 3; // foreground bright star with 4-point sparkle flare
        radius = 1.4 + Math.random() * 1.0;
        hasFlare = Math.random() > 0.4;
      } else if (depth > 0.45) {
        layer = 2; // medium stellar body
        radius = 0.9 + Math.random() * 0.7;
      }

      // Vertical Scroll factor: higher depth stars move significantly faster when scrolling!
      const scrollFactor = (0.18 + depth * 0.85) * (this.isMobile ? 0.65 : 1.0);

      this.stars.push({
        baseX: Math.random() * this.width,
        baseY: Math.random() * this.height,
        x: 0,
        y: 0,
        radius,
        color,
        depth,
        layer,
        hasFlare,
        baseAlpha: 0.16 + depth * 0.46, // Calmer ambient luminance so stars don't compete with text
        twinkleSpeed: 0.008 + Math.random() * 0.018, // Slower, softer breathing twinkle (prevents eye distraction)
        twinklePhase: Math.random() * Math.PI * 2,
        parallaxFactor: (0.015 + depth * 0.04) * (this.isMobile ? 0.4 : 1.0),
        scrollFactor
      });
    }

    this.updateStarPositions();
  }

  updateStarColors() {
    const darkPalette = [
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 209, b: 102 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 77, b: 109 }
    ];

    const lightPalette = [
      { r: 28, g: 45, b: 84 },
      { r: 35, g: 83, b: 71 },
      { r: 67, g: 97, b: 238 },
      { r: 120, g: 86, b: 222 }
    ];

    const palette = this.isLight ? lightPalette : darkPalette;
    this.stars.forEach(star => {
      star.color = palette[Math.floor(Math.random() * palette.length)];
    });
  }

  spawnMeteor() {
    if (this.meteors.length >= this.maxMeteors) return;

    // Spawn meteor from top or upper sides
    const startX = Math.random() * (this.width * 1.2) - (this.width * 0.1);
    const startY = Math.random() * (this.height * 0.35) - 40;
    const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // ~45 degree trajectory
    const speed = 7 + Math.random() * 6;
    const length = 120 + Math.random() * 100;

    const meteorColor = this.isLight
      ? { r: 67, g: 97, b: 238 }
      : { r: 255, g: 255, b: 255 };

    this.meteors.push({
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      length,
      speed,
      opacity: 1,
      fadeRate: 0.012 + Math.random() * 0.008,
      color: meteorColor,
      size: 1.5 + Math.random() * 1.2
    });
  }

  updateStarPositions() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const mouseOffsetX = (this.mouse.x - cx);
    const mouseOffsetY = (this.mouse.y - cy);

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];

      // 1. Horizontal mouse parallax drift
      star.x = star.baseX + mouseOffsetX * star.parallaxFactor;
      if (star.x < 0) star.x += this.width;
      if (star.x > this.width) star.x -= this.width;

      // 2. Vertical scroll travel with multi-depth parallax
      const scrollTravel = this.scrollY * star.scrollFactor;
      let relativeY = (star.baseY - scrollTravel) % this.height;
      if (relativeY < 0) relativeY += this.height;

      // 3. Vertical mouse parallax on top of scroll travel
      star.y = relativeY + mouseOffsetY * star.parallaxFactor;
      if (star.y < 0) star.y += this.height;
      if (star.y > this.height) star.y -= this.height;
    }
  }

  render() {
    const now = performance.now();
    // Frame-rate independent delta time (clamped to prevent leap glitches)
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    // High-refresh rate exponential decay (silky smooth at 60Hz-120Hz+ with zero trailing lag)
    const mouseLerp = 1 - Math.exp(-14 * dt);
    const scrollLerp = 1 - Math.exp(-22 * dt);

    this.scrollY += (this.targetScrollY - this.scrollY) * scrollLerp;
    this.scrollVelocity = this.scrollY - this.lastScrollY;
    this.lastScrollY = this.scrollY;

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * mouseLerp;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * mouseLerp;

    this.ctx.clearRect(0, 0, this.width, this.height);

    this.updateStarPositions();

    // Cosmic speed stretch factor during rapid scrolling
    const absVelocity = Math.abs(this.scrollVelocity);
    const stretchFactor = this.reducedMotion ? 1 : Math.min(2.4, 1 + absVelocity * 0.045);
    const isWarping = stretchFactor > 1.08;

    // Update CSS custom property for subtle nebula parallax on scroll
    if (absVelocity > 0.01) {
      document.documentElement.style.setProperty("--space-scroll-offset", `${(this.scrollY * 0.06).toFixed(1)}px`);
    }

    // 1. Draw Constellation lines between stars and cursor
    if (this.mouse.isActive && !this.isMobile) {
      this.drawConstellationWeb();
    }

    // 2. Render Starfield with Multi-Plane Depth
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.twinklePhase += star.twinkleSpeed;
      
      // Calculate twinkling alpha oscillation
      const twinkle = Math.sin(star.twinklePhase) * 0.35 + 0.65;
      const alpha = Math.min(1, Math.max(0.1, star.baseAlpha * twinkle));
      const { r, g, b } = star.color;

      // Draw star body with subtle vertical elongation during fast scrolling
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      if (isWarping) {
        const starStretch = stretchFactor * (0.85 + star.depth * 0.5);
        this.ctx.beginPath();
        this.ctx.ellipse(star.x, star.y, star.radius * 0.85, star.radius * starStretch, 0, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Draw subtle 4-point diffraction spike flare for foreground stars (Layer 3)
      if (star.hasFlare && star.layer === 3 && !isWarping) {
        const flareSize = star.radius * 2.0;
        const flareAlpha = alpha * 0.28;
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${flareAlpha})`;
        this.ctx.lineWidth = 0.5;

        // Horizontal spike
        this.ctx.beginPath();
        this.ctx.moveTo(star.x - flareSize, star.y);
        this.ctx.lineTo(star.x + flareSize, star.y);
        this.ctx.stroke();

        // Vertical spike
        this.ctx.beginPath();
        this.ctx.moveTo(star.x, star.y - flareSize);
        this.ctx.lineTo(star.x, star.y + flareSize);
        this.ctx.stroke();

        // Soft ambient stellar glow halo
        this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.08})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    // 3. Update and Render Meteors / Shooting Stars
    this.meteorTimer++;
    if (this.meteorTimer >= this.nextMeteorInterval) {
      this.spawnMeteor();
      this.meteorTimer = 0;
      this.nextMeteorInterval = 140 + Math.random() * 220;
    }

    for (let m = this.meteors.length - 1; m >= 0; m--) {
      const meteor = this.meteors[m];
      meteor.x += meteor.dx;
      meteor.y += meteor.dy;
      meteor.opacity -= meteor.fadeRate;

      if (meteor.opacity <= 0 || meteor.x > this.width + 100 || meteor.y > this.height + 100) {
        this.meteors.splice(m, 1);
        continue;
      }

      // Draw glowing meteor tail
      const tailX = meteor.x - (meteor.dx / meteor.speed) * meteor.length;
      const tailY = meteor.y - (meteor.dy / meteor.speed) * meteor.length;

      const grad = this.ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
      const { r, g, b } = meteor.color;
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${meteor.opacity * 0.95})`);
      grad.addColorStop(0.25, `rgba(${r}, ${g}, ${b}, ${meteor.opacity * 0.5})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = meteor.size;
      this.ctx.lineCap = "round";
      this.ctx.beginPath();
      this.ctx.moveTo(meteor.x, meteor.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();

      // Draw sparkling meteor head
      this.ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(meteor.x, meteor.y, meteor.size * 1.2, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.rafId = requestAnimationFrame(() => this.render());
  }

  drawConstellationWeb() {
    const connectDistance = 140;
    const mouseX = this.mouse.x;
    const mouseY = this.mouse.y;

    for (let i = 0; i < this.stars.length; i++) {
      const starA = this.stars[i];
      const distToMouse = Math.hypot(starA.x - mouseX, starA.y - mouseY);

      if (distToMouse < connectDistance) {
        const mouseAlpha = (1 - distToMouse / connectDistance) * (this.isLight ? 0.18 : 0.22);
        const { r, g, b } = starA.color;

        // Line to cursor
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${mouseAlpha})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(starA.x, starA.y);
        this.ctx.lineTo(mouseX, mouseY);
        this.ctx.stroke();

        // Connect nearby neighbor stars within proximity
        for (let j = i + 1; j < this.stars.length; j++) {
          const starB = this.stars[j];
          const distBetweenStars = Math.hypot(starA.x - starB.x, starA.y - starB.y);

          if (distBetweenStars < 90) {
            const lineAlpha = (1 - distBetweenStars / 90) * mouseAlpha * 0.7;
            this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(starA.x, starA.y);
            this.ctx.lineTo(starB.x, starB.y);
            this.ctx.stroke();
          }
        }
      }
    }
  }

  renderStatic() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.updateStarPositions();

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      const { r, g, b } = star.color;
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.baseAlpha})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();

      if (star.hasFlare && star.layer === 3) {
        const flareSize = star.radius * 3;
        this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${star.baseAlpha * 0.5})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(star.x - flareSize, star.y);
        this.ctx.lineTo(star.x + flareSize, star.y);
        this.ctx.moveTo(star.x, star.y - flareSize);
        this.ctx.lineTo(star.x, star.y + flareSize);
        this.ctx.stroke();
      }
    }
  }

  start() {
    if (!this.rafId && !this.reducedMotion) {
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame(() => this.render());
    }
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

// Singleton helper export
let spaceInstance = null;
export function initSpaceBackdrop() {
  if (!spaceInstance) {
    spaceInstance = new SpaceBackdrop("space-backdrop-canvas");
  }
  return spaceInstance;
}
