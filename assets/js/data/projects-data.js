// --- PROJECT & CASES DATA ---
export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Multi-Agent Automation Agent",
    category: "python-ai",
    tags: ["Python", "AI", "Agentic Automation", "WebSockets"],
    image: "assets/images/multi-agent-automation.jpg",
    client: "Personal Project / Open Source",
    date: "July 2026",
    role: "Lead Systems Architect",
    demoUrl: "#",
    githubUrl: "https://github.com/ra901625072-boop/Jarvis-Voice-Assistant",
    description: `A voice- and text-mode automation assistant orchestrated using custom socket events and specialized AI sub-agents (Coding, Research, and Planning agents).`,
    body: `
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>Current LLM solutions struggle with multi-step workflows, file-system operations, and dynamic searching without losing context or getting stuck in infinite execution loops. The challenge was to create an autonomous system that could plan, write, execute, test, and research concurrently under voice and text supervision.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> User Research & Requirements</h4>
        <p>I interviewed developers and productivity power-users. They needed a hands-free assistant that could edit files, run test scripts, retrieve code documentations, and report back status via voice, without freezing the active workspace. This required high-concurrency event loops and real-time state synchronization.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Design Decisions & Architecture</h4>
        <p>I designed a <strong>hub-and-spoke multi-agent network</strong>. The central orchestrator (Jarvis) acts as the router, managing speech-to-text input, converting it into structured JSON tasks, and farming them out to specialized agents via custom WebSockets. High-performance asyncio loops keep the UI responsive during blocking local system executions.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Technical Challenges & Solutions</h4>
        <p><strong>Challenge (Concurrency Lock):</strong> Running terminal commands blocked the socket listener, causing voice input delays.</p>
        <p><strong>Solution:</strong> Implemented a non-blocking subprocess runner using Python's <code>asyncio.create_subprocess_exec</code> and redirected standard outputs to a shared message queue, streaming console outputs line-by-line to the client browser in real-time.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">05</span> Key Deliverables & Results</h4>
        <ul>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 3 specialized sub-agents communicating over a custom JSON-RPC websocket protocol.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Real-time streaming interface with markdown formatting and command execution outputs.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Voice command routing latency reduced to sub-500ms using local transcription threads.</li>
        </ul>
      </div>
    `
  },
  {
    id: 2,
    title: "Pali CBDC Portal",
    category: "full-stack",
    tags: ["Python", "FastAPI", "SQL", "Dashboard"],
    image: "assets/images/cbdc-pali.png",
    client: "Panchayat Office (Pali)",
    date: "March 2026",
    role: "Full-Stack Freelance Developer",
    demoUrl: "https://pali-omega.vercel.app",
    githubUrl: "https://github.com/ra901625072-boop/pali",
    description: `A localized web application built to track beneficiary enrollment and validation for the Central Bank Digital Currency (CBDC) rollout in Pali, featuring secure administrative analytics.`,
    body: `
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>During the national CBDC rollout, village-level administrators (Talatis) struggled to manage registrations using physical spreadsheets, leading to data discrepancies, duplicate enrollments, and an inability to track progress against governmental targets.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> User Research & Requirements</h4>
        <p>Field research at the Panchayat office revealed that local staff operated on basic computing hardware with slow, unstable 3G/rural networks. The portal had to be extremely lightweight, require minimal assets to load, and feature an simple, error-resistant input interface.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Design Decisions & Architecture</h4>
        <p>I chose a <strong>FastAPI + SQLite architecture</strong> to ensure minimal memory overhead on the hosting tier, paired with raw SQL queries optimized with indexes for instant search lookups. The frontend was styled with vanilla CSS custom properties to build a highly semantic, responsive interface devoid of bloated frameworks.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Technical Challenges & Solutions</h4>
        <p><strong>Challenge:</strong> Page timeouts during bulk records uploads via government CSV datasets.</p>
        <p><strong>Solution:</strong> Developed a chunked parsing pipeline in Python that processes uploaded CSV datasets asynchronously, validates Aadhaar suffixes against hashing algorithms to prevent duplicates, and commits to the database in bulk batches of 500 rows inside a single database transaction context.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">05</span> Key Deliverables & Results</h4>
        <ul>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Public search endpoint returning beneficiary status under 100ms over rural 3G networks.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Secure administrative authentication dashboard with role authorization layers.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Helped enroll over 10,000+ residents with 0 instances of duplicate entries recorded.</li>
        </ul>
      </div>
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
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>A mid-sized wholesale grocery business experienced significant inventory losses, inaccurate stock records, and no real-time oversight of daily revenue margins, relying on handwritten ledgers and manual supplier sheets.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> User Research & Requirements</h4>
        <p>I mapped out the warehouse workflow. Key requirements included: real-time stock levels, automated low-stock flags triggering alerts, a simple supplier directory linked to items, and a digital storefront where retail clients could order products online.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Design Decisions & Architecture</h4>
        <p>I engineered a dual-portal application. The <strong>Storefront Portal</strong> uses clean JS cart managers and session storage to provide a fast checkout. The <strong>Management Portal</strong> connects directly to the core inventory database via FastAPI routes, rendering historical sales metrics using Chart.js on a responsive admin dashboard.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Technical Challenges & Solutions</h4>
        <p><strong>Challenge:</strong> Inventory race conditions where multiple customers checked out the last item concurrently, causing database lock issues.</p>
        <p><strong>Solution:</strong> Implemented database transaction locks (SELECT FOR UPDATE) using SQLAlchemy. When a customer adds items to a checkout session, the database locks the stock row, validates count availability, commits the decrement, and unlocks the row in under 5ms, avoiding overselling.</p>
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
  },
  {
    id: 4,
    title: "FamDoc (Family Document Manager)",
    category: "full-stack",
    tags: ["Python", "APIs", "SQL", "Cloud Storage"],
    image: "assets/images/famdoc.png",
    client: "Personal Project",
    date: "January 2026",
    role: "Lead Backend Developer",
    demoUrl: "https://famdoc-ten.vercel.app",
    githubUrl: "https://github.com/ra901625072-boop/FamDoc",
    description: `A private document-sharing portal modeled after Google Drive. Families join using a unique family code, making uploaded documents instantly viewable and downloadable by all members.`,
    body: `
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>Family members often need to share critical documents (IDs, tax forms, certificates) but rely on unsecured messaging channels or scattered cloud storage folders, leading to constant requests and search fatigue.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> User Research & Requirements</h4>
        <p>Non-technical family members required an extremely simple interface. They wanted a central folder structure where uploading was a single-click action, documents could be tagged with custom labels (e.g. "Tax", "ID"), and search results were instant.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Design Decisions & Architecture</h4>
        <p>To avoid hosting storage costs, I designed a <strong>hybrid backend proxy system</strong>. The FastAPI server acts as a directory index database and encryptor. The physical files are streamed directly to a private Google Drive folder and MEGA cloud vault using official REST APIs. A SQL ledger handles family membership codes, file ownership parameters, and tag indexes.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Technical Challenges & Solutions</h4>
        <p><strong>Challenge:</strong> Storing sensitive documents (like Aadhaar/PAN cards) on third-party cloud directories raises critical privacy concerns.</p>
        <p><strong>Solution:</strong> Integrated a Fernet symmetric key encryption layer. When a document is uploaded, it is encrypted in memory using a key generated from the family code before being pushed to the cloud APIs. Download requests fetch the raw payload and decrypt it on-the-fly, meaning files remain encrypted and unreadable on rest in Google/MEGA.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">05</span> Key Deliverables & Results</h4>
        <ul>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Secure family registration system generating unique joining codes.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Zero-caching file streaming pipe using chunked responses for downloads.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Secure indexing engine allowing instant search by title, tags, or uploading date.</li>
        </ul>
      </div>
    `
  },
  {
    id: 5,
    title: "Resume Maker",
    category: "frontend",
    tags: ["Python", "HTML/CSS/JS", "SQL", "Templates"],
    image: "assets/images/resume-maker.png",
    client: "Student Project",
    date: "April 2026",
    role: "Full-Stack Developer & Designer",
    demoUrl: "https://resume-maker-zhcq.onrender.com",
    githubUrl: "https://github.com/ra901625072-boop/Resume-Maker",
    description: `A web application targeting students and design novices. Users enter their credentials and layout preferences to generate and download professional, formatted resumes.`,
    body: `
      <div class="case-study-section">
        <h4><span class="cs-num">01</span> The Problem</h4>
        <p>Many students entering the job market lack design skills or experience with formatting tools, resulting in poorly structured resumes. They need a simple, structured form that outputs a clean, ATS-friendly document.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">02</span> User Research & Requirements</h4>
        <p>Feedback from student groups indicated that MS Word template formatting frequently breaks when adding content. They wanted a tool where they could input raw details without worrying about spacing, columns, or pages, with real-time visual results.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">03</span> Design Decisions & Architecture</h4>
        <p>I built an interactive form alongside a <strong>live CSS template preview canvas</strong>. The UI is structured into modular sections (Education, Skills, Experience). I wrote vanilla CSS layouts (ATS-Classic and Modern-Grid) using print-specific stylesheets (<code>@media print</code>) to guarantee perfect pixel-to-paper alignment on export.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">04</span> Technical Challenges & Solutions</h4>
        <p><strong>Challenge:</strong> Dynamically converting the live HTML preview into a high-quality, selectable-text PDF without losing font weights or alignment layouts.</p>
        <p><strong>Solution:</strong> Used browser-native print parsing rather than raster image canvas conversions (which make text non-searchable for ATS software). Configured layout templates to scale print margins dynamically, executing <code>window.print()</code> wrapped in print CSS wrappers to yield lightweight, vector-clean PDFs.</p>
      </div>

      <div class="case-study-section">
        <h4><span class="cs-num">05</span> Key Deliverables & Results</h4>
        <ul>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Multi-step responsive wizard interface with input validations.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Dynamic CSS-variables customizer changing themes and sizing in real-time.</li>
          <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Vector-clean PDF exports that pass 100% of standard parser test checks.</li>
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


