// --- PROJECT & CASES DATA ---
export const PROJECTS_DATA = [
  {
    id: 1,
    title: "JARVIS 21-Agent Voice Assistant",
    category: "python-ai",
    tags: ["Python", "LiveKit WebRTC", "Multi-Agent System", "ChromaDB", "FastAPI"],
    image: "assets/images/multi-agent-automation.jpg",
    client: "Personal Project / Open Source",
    date: "August 2026",
    role: "Lead AI Systems Architect",
    demoUrl: "https://github.com/ra901625072-boop/Jarvis-Voice-Assistant",
    githubUrl: "https://github.com/ra901625072-boop/Jarvis-Voice-Assistant",
    description: `A real-time, voice-enabled assistant powered by a 21-agent orchestration swarm, LiveKit WebRTC audio sessions, and a two-speed learning loop backed by SQLite and ChromaDB vector memory.`,
    body: `
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>Standard LLM assistants struggle with continuous hands-free voice interactions, multi-step system workflows, and persistent memory across execution sessions. The challenge was building an autonomous, self-healing system capable of routing commands across specialized domain agents with sub-500ms voice latency.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> System Architecture & Swarm Design</h4>
        <p>Engineered a <strong>21-Agent Orchestration Network</strong> where a central <strong>Supervisor Agent</strong> manages real-time session state and delegates work to 20 domain specialists on a high-throughput in-memory event bus (Coordinator, Planning, Execution, Verification, Recovery, Memory, Browser, Coding, Debugging, Integration, Vision, Interaction, and Language).</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Two-Speed Real-Time Learning Loop</h4>
        <p>Integrated a dual learning architecture:
          <br/>• <strong>Fast Loop:</strong> Calculates instantaneous Exponential Moving Average (EMA) capability scores and tracks failure streaks immediately after each task.
          <br/>• <strong>Slow Loop:</strong> A nightly memory consolidation pipeline (running via ChromaDB and SQLite) that cleans up stale context, decays old weights, and persists permanent behavioral lessons.
        </p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Technical Challenges & Solutions</h4>
        <p><strong>Challenge (Real-Time Audio Latency):</strong> Traditional HTTP/WebSocket audio polling introduced noticeable lags during voice command interactions.</p>
        <p><strong>Solution:</strong> Deployed <strong>LiveKit WebRTC</strong> for bi-directional audio streaming paired with Google Gemini Multimodal Live API and FastAPI endpoints, enabling low-latency real-time voice interaction.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">05</span> Key Deliverables & Results</h4>
        <ul>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 21 coordinated specialist agents operating over non-blocking asynchronous Python message buses.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Persistent vector memory retrieval via ChromaDB with automated nightly consolidation.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Self-healing recovery agent capable of diagnosing syntax/execution errors and verifying fixes automatically.</li>
        </ul>
      </div>
    `
  },
  {
    id: 2,
    title: "FamDoc (Family Keepsake & Document Ecosystem)",
    category: "full-stack",
    tags: ["Android (Kotlin)", "Jetpack Compose", "FastAPI", "Google Drive API", "PostgreSQL"],
    image: "assets/images/famdoc.png",
    client: "Family & Personal Project",
    date: "September 2026",
    role: "Full-Stack & Mobile Developer",
    demoUrl: "https://famdoc-ten.vercel.app",
    githubUrl: "https://github.com/ra901625072-boop/FamDoc",
    description: `Enterprise-grade resilient family document platform featuring a native Jetpack Compose Android app, FastAPI backend, multi-account Google Drive storage pooling, and dual-tier failover vault.`,
    body: `
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>Families require a secure, central location to preserve critical documents (identity records, property deeds, medical history, keepsakes). Existing cloud subscriptions are fragmented, lack family-code multi-tenancy, and pose privacy risks when unencrypted.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> Multi-Account Storage Pooling & Dual-Tier Vault</h4>
        <p>Architected a <strong>Multi-Account Storage Pooling Engine</strong> that connects multiple Google Drive storage quotas into a unified virtual vault. Implemented a <strong>Dual-Tier Resilient Storage Pipeline</strong>: direct streaming write to Google Drive with automatic failover to an encrypted local disk vault and a background sync worker that auto-promotes cached files once connectivity is restored.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Native Android App (Jetpack Compose & Kotlin)</h4>
        <p>Built a companion native Android application following Modern Android Development (MAD) principles: Kotlin, Jetpack Compose, Material Design 3, Coroutine-based networking via Retrofit, encrypted token storage, and on-device thumbnail caching with dynamic preview loading animations.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Security & Encryption Architecture</h4>
        <p>Integrated Fernet symmetric encryption for OAuth tokens and sensitive ID records. Applied single-session JWT enforcement (validating unique <code>jti</code> claims), role-based permissions (Admin vs Member), and SHA-256 vault code hashing.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">05</span> Key Deliverables & Results</h4>
        <ul>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Complete Native Android application with APK/AAB release build automation scripts.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Multi-account Google Drive pooling multiplying storage capacity at zero subscription cost.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Resilient offline-first upload queue with background failover and automatic retry sync.</li>
        </ul>
      </div>
    `
  },
  {
    id: 3,
    title: "WISAXIS AI Resume Maker & ATS Optimizer",
    category: "full-stack",
    tags: ["Python", "Flask", "OpenRouter AI", "ATS Scorecard", "SQLAlchemy"],
    image: "assets/images/resume-maker.png",
    client: "SaaS Project / Internship Initiative",
    date: "August 2026",
    role: "Full-Stack & AI Engineer",
    demoUrl: "https://resume-maker-five-bice.vercel.app",
    githubUrl: "https://github.com/ra901625072-boop/Resume-Maker",
    description: `Full-stack AI SaaS platform integrating OpenRouter AI (LLaMA 3.1 & Claude), CAR framework bullet generator, interactive career coach chat, real-time ATS scoring, and JSON extraction.`,
    body: `
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>Job seekers frequently struggle to craft resumes that pass modern Applicant Tracking Systems (ATS). Existing tools produce generic bullet points, lack real-time ATS feedback, and charge high subscriptions for basic formatting.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> AI Integration & CAR Prompt Engineering</h4>
        <p>Integrated <strong>OpenRouter API</strong> (supporting LLaMA 3.1, Claude 3.5, and GPT-4o models) through a modular <code>AIService</code> layer. Implemented prompt templates utilizing the <strong>CAR Framework</strong> (Challenge → Action → Result) to generate quantifiable, high-impact achievements tailored to specific job titles.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Real-Time ATS Scoring & AI Career Coach</h4>
        <p>Developed an automated ATS compatibility evaluator returning structured JSON scores (0–100), key strengths, and keyword gap analysis. Built an interactive multi-turn career coach chatbot with sliding context-window management and per-user token auditing in SQLite/PostgreSQL.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Technical Challenges & Solutions</h4>
        <p><strong>Challenge (Version Snapshots & PDF Fidelity):</strong> Users wanted to experiment with multiple templates without losing historical edits, while ensuring ATS-parseable vector exports.</p>
        <p><strong>Solution:</strong> Created a <code>ResumeVersion</code> snapshot engine capturing JSON diffs on each save (up to 20 versions) and used CSS print media rules (<code>@media print</code>) for 100% vector-clean, ATS-parseable PDF downloads.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">05</span> Key Deliverables & Results</h4>
        <ul>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Complete SaaS suite: AI Summary Generator, CAR Bullet Creator, ATS Scorecard, and Chat Coach.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> JSON resume parser & file extractor supporting multi-template dynamic switching.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Mobile-first responsive UI with bottom-sheet navigation and electric sapphire theme.</li>
        </ul>
      </div>
    `
  },
  {
    id: 4,
    title: "Pali CBDC Portal",
    category: "full-stack",
    tags: ["Node.js", "Express", "Vercel Serverless", "Audit Logs", "Analytics"],
    image: "assets/images/cbdc-pali.png",
    client: "Panchayat Office (Pali)",
    date: "August 2026",
    role: "Full-Stack Freelance Developer",
    demoUrl: "https://pali-omega.vercel.app",
    githubUrl: "https://github.com/ra901625072-boop/pali",
    description: `A localized web application built to track beneficiary enrollment and validation for the Central Bank Digital Currency (CBDC) rollout in Pali village, featuring secure administrative analytics and date-filtered exports.`,
    body: `
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>During the national CBDC rollout, village-level administrators (Talatis) struggled to manage registrations using physical spreadsheets, leading to data discrepancies, duplicate enrollments, and an inability to track progress against governmental targets.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> User Research & Requirements</h4>
        <p>Field research at the Panchayat office revealed that local staff operated on basic computing hardware with slow, unstable rural networks. The portal had to be extremely lightweight, require minimal assets to load, and feature a simple, error-resistant input interface.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Design Decisions & Architecture</h4>
        <p>Engineered a <strong>Node.js + Express</strong> backend architecture with JSON-based data persistence and automated data store initialization on startup. Search lookups were optimized for instant filtering across beneficiary records. The frontend was built with responsive CSS custom properties to ensure rapid load times over mobile networks.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Technical Challenges & Solutions</h4>
        <p><strong>Challenge:</strong> Ensuring accurate beneficiary tracking without duplicate enrollments across repeated manual data entry sessions.</p>
        <p><strong>Solution:</strong> Implemented server-side validation logic with unique identifier checks and structured audit logging to prevent duplicate registrations and maintain data integrity across sessions.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">05</span> Key Deliverables & Results</h4>
        <ul>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Public search endpoint returning beneficiary status under 100ms over rural 3G networks.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Secure administrative authentication dashboard with role authorization and audit logging.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Date-filtered export validation engine generating official compliance spreadsheets for 270+ village beneficiaries.</li>
        </ul>
      </div>
    `
  },
  {
    id: 5,
    title: "e-Grossary Mart (Inventory & Storefront)",
    category: "full-stack",
    tags: ["Python", "Flask", "SQLAlchemy", "E-commerce", "Chart.js"],
    image: "assets/images/e-grossary.png",
    client: "Retail Wholesale Client",
    date: "May 2026",
    role: "Full-Stack Freelance Developer",
    demoUrl: "https://glossary-mart.onrender.com",
    githubUrl: "https://github.com/ra901625072-boop/Glossary-Mart",
    description: `An inventory and supplier management system paired with an executive dashboard tracking metrics, revenue, and stock levels, alongside a customer-facing digital storefront.`,
    body: `
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>A mid-sized wholesale grocery business experienced significant inventory losses, inaccurate stock records, and no real-time oversight of daily revenue margins, relying on handwritten ledgers and manual supplier sheets.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> User Research & Requirements</h4>
        <p>Mapped out the warehouse workflow. Key requirements included: real-time stock levels, automated low-stock flags triggering alerts, a simple supplier directory linked to items, and a digital storefront where retail clients could order products online.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Design Decisions & Architecture</h4>
        <p>Engineered a dual-portal application. The <strong>Storefront Portal</strong> uses clean JS cart managers and session storage to provide a fast checkout. The <strong>Management Portal</strong> connects directly to the core inventory database via Flask routes, rendering historical sales metrics using Chart.js on a responsive admin dashboard.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Technical Challenges & Solutions</h4>
        <p><strong>Challenge:</strong> Inventory race conditions where multiple customers checked out the last item concurrently, causing database lock issues.</p>
        <p><strong>Solution:</strong> Implemented database transaction locks (<code>SELECT FOR UPDATE</code>) using SQLAlchemy. When a customer adds items to a checkout session, the database locks the stock row, validates count availability, commits the decrement, and unlocks the row in under 5ms, avoiding overselling.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">05</span> Key Deliverables & Results</h4>
        <ul>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Automatic low-stock highlighting dashboard generating re-order spreadsheets.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Dynamic, interactive charts visualising daily sales revenues and product categories.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Reduced inventory leakage by 95% within the first month of system deployment.</li>
        </ul>
      </div>
    `
  }
];

// --- ACHIEVEMENTS DATA ---
export const ACHIEVEMENTS_DATA = [
  {
    id: 1,
    title: "Python Programming Mastery",
    issuer: "Independent Software Dev",
    desc: "Demonstrated capacity to structure robust FastAPI & Flask backends, orchestrate 14-agent AI communication swarms, and integrate complex cloud storage APIs.",
    icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`
  },
  {
    id: 2,
    title: "Native Android & Jetpack Compose",
    issuer: "Mobile Engineering",
    desc: "Engineered production Android apps using Kotlin, Jetpack Compose, Material Design 3, Coroutine networking, and on-device caching architectures.",
    icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`
  },
  {
    id: 3,
    title: "Web Dev Internship Certificate",
    issuer: "Wixasis Pvt. Ltd.",
    desc: "Earned formal certification following an intensive web engineering internship, delivering functional client-facing web application features and AI integrations.",
    icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>`
  },
  {
    id: 4,
    title: "Ethical Hacking Certificate",
    issuer: "HNGU University",
    desc: "Awarded academic certification in security fundamentals, pen-testing techniques, network configuration, and vulnerability analysis.",
    icon: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path><path d="M12 2a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"></path></svg>`
  }
];
