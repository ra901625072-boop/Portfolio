# Professional Developer Portfolio

This repository hosts the static personal portfolio website of **Akshaysinh Rajput**, a Python Developer & Full-Stack Developer specializing in FastAPI, React, SQL, and AI automation.

## Project Structure

The project has been organized following modular and clean web development practices:

```
portfolio/
├── assets/
│   ├── css/
│   │   ├── main.css              # Global styles, variables, typography, layout grid
│   │   └── sections.css          # Specific section styles (hero, about, services, etc.)
│   ├── docs/                     # Downloadable and viewable documents
│   │   ├── resume.html           # Interactive, responsive CV (SVG/CSS overlay)
│   │   └── resume.pdf            # High-resolution offline CV document
│   ├── images/                   # Optimized, kebab-case project screenshot assets
│   │   ├── cbdc-pali.png
│   │   ├── famdoc.png
│   │   ├── resume-maker.png
│   │   ├── e-grossary.png
│   │   └── multi-agent-automation.jpg
│   └── js/
│       ├── data/
│       │   └── projects-data.js  # Separated data definitions (PROJECTS_DATA, ACHIEVEMENTS_DATA)
│       ├── modules/
│       │   ├── animations.js     # User interaction, cursor mapping, and timeline animation logic
│       │   └── projects.js       # Dynamic portfolio filtering and case studies modal logic
│       └── app.js                # Main application entry point bootstrapping other modules
├── index.html                    # Main website homepage structure
├── .gitignore                    # Local environment exclusion mapping
├── .prettierrc                   # Prettier standard code formatter rules
└── package.json                  # Script mapping for developer tooling and dev-server
```

## Core Implementation Features

1. **Circular Transition circular theme swap**: Smooth circular reveal animation on toggling Light/Dark theme utilizing the View Transitions API (with standard CSS transition fallbacks).
2. **Dynamic Project & Case Study Modal**: Projects and achievements are dynamically rendered from `projects-data.js` and have an interactive filtering system. Modal displays detailed custom layout parameters.
3. **Magnetic Snapping Cursor**: Mouse follower and dot that snaps magnetically to call-to-actions, buttons, and social anchors.
4. **Timeline Progress Scroller**: A visual progress bar tracking vertical scrolling in the Professional Journey timeline, lighting up checkpoints as they intersect the viewport.

---

## Local Setup and Development

To run this project locally, you can use the Vite developer server configured in the repository.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

Clone the repository and install developer dependencies:

```bash
npm install
```

### Start Development Server

Run the development command:

```bash
npm run dev
```

This starts a local dev server (defaulting to `http://localhost:5173`) with live-reloading/hot-module-replacement.

### Build Production Bundle

To build the static site for hosting distribution:

```bash
npm run build
```

This generates optimized production files under a `dist/` directory.

---

## Technologies Used

- **HTML5 & CSS3**: Structural semantics and custom design system (HSL theme parameters, Glassmorphism, animations).
- **JavaScript (ES6+)**: Custom animations, async API requests (FormSubmit validation and visitor count metrics API), and modular DOM logic.
- **Vite**: Rapid local bundling and hot-module reloading.
- **Prettier**: Automatic code formatting.
