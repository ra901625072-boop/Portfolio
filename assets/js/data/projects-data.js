// --- PROJECT & CASES DATA ---
export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Multi-Agent Automation Agent",
    category: "python-ai",
    tags: ["Python", "AI", "Agentic Automation"],
    image: "assets/images/multi-agent-automation.jpg",
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
    image: "assets/images/cbdc-pali.png",
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
    image: "assets/images/famdoc.png",
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
    image: "assets/images/resume-maker.png",
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
