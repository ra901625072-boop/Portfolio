<div align="center">

# ✨ Akshaysinh Rajput — Developer Portfolio Website

<p align="center">
  <img src="https://img.shields.io/badge/Live_Site-portfolioakshay.in-9333ea?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Live Site" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/CSS3_Animations-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
</p>

<p align="center">
  <b>Modern, High-Performance Personal Portfolio with Circular View Transitions, Magnetic Cursor, Dynamic Case Studies, and Timeline Scroll Tracking</b>
</p>

<p align="center">
  <a href="https://portfolioakshay.in">
    <img src="https://raw.githubusercontent.com/ra901625072-boop/Portfolio/main/public/assets/images/DeadPool-Dark.png" alt="Portfolio Dark Mode" width="85%" style="border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);" />
  </a>
</p>

</div>

---

## 🌟 Live Demo

Visit the live production website: **[portfolioakshay.in](https://portfolioakshay.in)**

---

## ✨ Core Interactive Features

- 🌗 **Circular View Transitions Theme Swap:** Seamless circular expansion animation on toggling Light and Dark themes utilizing the native browser View Transitions API with CSS fallbacks.
- 🧲 **Magnetic Snapping Cursor:** Custom smooth mouse follower and dot that snaps magnetically to interactive buttons, social links, and call-to-actions.
- 📑 **Dynamic Case Study Modal:** Modular project filtering and detailed pop-up case study views rendered dynamically from decoupled data modules (`projects-data.js`).
- ⏱️ **Timeline Progress Scroller:** An interactive vertical progress bar tracking real-time scroll depth in the Professional Journey timeline, illuminating checkpoints as they intersect the viewport.
- 📬 **Asynchronous Contact Form:** Integrated asynchronous form dispatch and metric visitor analytics.

---

## 📁 Repository Structure

```
portfolio/
├── assets/
│   ├── css/
│   │   ├── main.css              # Global tokens, HSL color variables, typography, layout grid
│   │   └── sections.css          # Section-specific styles (hero, about, projects, contact)
│   ├── docs/                     # Downloadable interactive and printable CV formats
│   ├── images/                   # Optimized project visual screenshots
│   └── js/
│       ├── data/
│       │   └── projects-data.js  # Project & milestone metadata records
│       ├── modules/
│       │   ├── animations.js     # Timeline scroll observer & cursor physics
│       │   └── projects.js       # Dynamic portfolio filter & modal logic
│       └── app.js                # Core entry point bootstrapping modules
├── public/                       # Static public distribution assets
├── index.html                    # Semantic HTML5 root structure
├── vite.config.js                # Vite bundling & development server configuration
└── package.json                  # Node.js developer dependencies & scripts
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- `npm`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/ra901625072-boop/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` to view the site with Hot Module Replacement (HMR).

### 4. Production Build
```bash
npm run build
```
Generates optimized static HTML, CSS, and JS bundles inside the `dist/` directory.

---

## 👨‍💻 Author

**Akshaysinh Rajput**
- 🌐 Portfolio: [portfolioakshay.in](https://portfolioakshay.in)
- 💼 LinkedIn: [Akshaysinh Rajput](https://www.linkedin.com/in/akshaysinh-rajput-8a575532b/)
- 🐙 GitHub: [@ra901625072-boop](https://github.com/ra901625072-boop)