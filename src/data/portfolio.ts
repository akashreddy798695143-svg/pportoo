/**
 * ═══════════════════════════════════════════════════════════════════
 *  PORTFOLIO CONTENT — EDIT THIS FILE
 * ═══════════════════════════════════════════════════════════════════
 *  Every piece of personal information on the website lives here so it
 *  can be updated in ONE place without touching any component code.
 *
 *  Fields marked with ✏️ EDIT contain placeholders that should be
 *  replaced with real information. Values wrapped in [brackets] are
 *  rendered on the site with a dashed underline to signal they are
 *  still placeholders.
 * ═══════════════════════════════════════════════════════════════════
 */

/* ─────────────────────────── Site / Identity ─────────────────────────── */

export const siteConfig = {
  /** ✏️ EDIT: your full name (shown in the hero, nav, footer, SEO) */
  name: "Baksham Akash Reddy",
  /** ✏️ EDIT: your initials (used for the logo monogram) */
  initials: "BA",
  /** ✏️ EDIT: your public site URL (used for SEO metadata) */
  url: "https://your-portfolio.vercel.app",
  role: "Full Stack Developer | AI Enthusiast | Creative Problem Solver",
  description:
    "I transform ideas into interactive digital experiences through modern web technologies, creative development, and intelligent solutions.",
  /** ✏️ EDIT: your email address */
  email: "your.email@example.com",
  /** ✏️ EDIT: your GitHub profile URL */
  github: "https://github.com/your-username",
  /** ✏️ EDIT: your LinkedIn profile URL */
  linkedin: "https://www.linkedin.com/in/your-username",
  /**
   * ✏️ EDIT (optional): put `resume.pdf` inside the /public folder and set
   * this to "/resume.pdf" to enable the Download Resume button. While it is
   * empty, the button politely explains that the resume is coming soon.
   */
  resumeUrl: "",
};

/* ─────────────────────────────── About ──────────────────────────────── */

export const about = {
  /** Professional portrait shown with a 3D animated frame in the About section */
  profileImage: "/images/profile.jpg",
  intro:
    "I am a passionate developer interested in building modern web applications and AI-powered solutions. I enjoy solving problems, learning new technologies, and creating meaningful digital experiences.",
  highlights: [
    {
      icon: "graduation",
      title: "Education",
      text: "Pursuing B.Tech in Electronics and Communication Engineering (ECE), building a strong foundation in both hardware and software.",
    },
    {
      icon: "compass",
      title: "Career Interests",
      text: "Full-stack development and AI-powered products — turning complex problems into simple, elegant interfaces.",
    },
    {
      icon: "cpu",
      title: "Technical Interests",
      text: "Modern web technologies, intelligent systems, clean architecture, and everything in between hardware and software.",
    },
    {
      icon: "target",
      title: "Personal Goals",
      text: "Keep learning in public, ship meaningful projects, and grow into an engineer who builds products people love.",
    },
  ],
  /** Small terminal-style card under the intro (purely decorative) */
  terminal: [
    { cmd: "whoami", out: "passionate developer · problem solver" },
    { cmd: "focus", out: "web applications · AI-powered solutions" },
    { cmd: "status", out: "open to internships & opportunities" },
  ],
};

/* ─────────────────────────────── Skills ─────────────────────────────── */
/* Icons are mapped by key inside the Skills component.
   brand icons: python | javascript | html | css
   concept icons: sql | dbms | dsa | oop | network                          */

export interface Skill {
  name: string;
  icon: string;
  /** Optional qualifier, e.g. "Basics" — no fake percentage bars, ever. */
  note?: string;
}

export interface SkillGroup {
  title: string;
  accent: "purple" | "cyan";
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming",
    accent: "purple",
    skills: [
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    title: "Frontend",
    accent: "cyan",
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    title: "Database",
    accent: "cyan",
    skills: [
      { name: "SQL", icon: "sql" },
      { name: "DBMS", icon: "dbms" },
    ],
  },
  {
    title: "Computer Science",
    accent: "purple",
    skills: [
      { name: "Data Structures & Algorithms", icon: "dsa", note: "Basics" },
      { name: "Object-Oriented Programming", icon: "oop" },
      { name: "Computer Networking", icon: "network" },
    ],
  },
];

/* ────────────────────────────── Projects ────────────────────────────── */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  liveUrl: string;
  /** GitHub button only renders when a real link is provided. ✏️ EDIT */
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "ResourceFlow AI",
    tagline: "AI-Assisted Autonomous Disaster Coordination Platform",
    description:
      "An intelligent platform designed to support disaster response through AI-powered incident analysis, risk assessment, resource optimization, and emergency coordination.",
    tags: ["Next.js", "AI/ML", "Full-Stack", "Tailwind CSS"],
    liveUrl: "https://resource-flowai.vercel.app",
    githubUrl: "", // ✏️ EDIT: add the GitHub repo URL when available
  },
  {
    id: "02",
    title: "Bazaar E-Commerce",
    tagline: "Full-Stack E-Commerce Web Application",
    description:
      "A modern e-commerce platform designed to provide a smooth online shopping experience — from browsing products to a seamless checkout flow.",
    tags: ["React", "E-Commerce", "Full-Stack", "UI/UX"],
    liveUrl: "https://bazaar-e-commerce-4.vercel.app/",
    githubUrl: "", // ✏️ EDIT: add the GitHub repo URL when available
  },
];

/* ───────────────────────────── Education ────────────────────────────── */

export interface EducationItem {
  title: string;
  field?: string;
  org: string;
  period?: string;
  score?: string;
  icon: "graduation" | "school";
  current?: boolean;
}

export const education: EducationItem[] = [
  {
    title: "B.Tech (Pursuing)",
    field: "Electronics and Communication Engineering (ECE)",
    org: "Annamacharya Institute of Technology and Sciences, Tirupati",
    period: "Expected 2027",
    score: "CGPA 7.5",
    icon: "graduation",
    current: true,
  },
  {
    title: "Intermediate (Class XII)",
    org: "Sri Sudha College, Dhone",
    score: "81%",
    icon: "school",
  },
  {
    title: "Secondary School (Class X)",
    org: "ZPHS Boys School, Peapully",
    period: "Passed in 2022",
    score: "86%",
    icon: "school",
  },
];

/* ──────────────────────────── Experience ────────────────────────────── */

export interface ExperienceItem {
  role: string;
  org: string;
  /** ✏️ EDIT: internship duration, e.g. "May 2025 — Jul 2025" */
  period: string;
  description: string;
  skills: string[];
}

export const experience: ExperienceItem[] = [
  {
    role: "Agentic AI Internship",
    org: "Brainovision",
    period: "[Add Duration]", // ✏️ EDIT
    description:
      "Hands-on internship focused on agentic AI systems — exploring LLM-powered workflows, autonomous agent pipelines, and intelligent automation applied to real-world scenarios.",
    skills: ["Agentic AI", "LLMs", "Prompt Engineering", "Automation"],
  },
  {
    role: "Web Developer Internship",
    org: "SmartBridge",
    period: "[Add Duration]", // ✏️ EDIT
    description:
      "Built and styled responsive web interfaces while learning modern development workflows, component-based design, and collaborative project practices.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  },
];

/* ────────────────────────── Certifications ──────────────────────────── */
/**
 * ✏️ EDIT (optional): drop certificate files (PDF/PNG) into
 * /public/certificates/ and set `file` to e.g. "/certificates/agentic-ai.pdf".
 * When `file` is set, a "View Certificate" preview button appears.
 */

export interface Certification {
  title: string;
  issuer: string;
  file: string;
}

export const certifications: Certification[] = [
  {
    title: "Agentic AI Internship",
    issuer: "Brainovision",
    file: "", // ✏️ EDIT: "/certificates/agentic-ai.pdf"
  },
  {
    title: "Web Development Internship",
    issuer: "SmartBridge",
    file: "", // ✏️ EDIT: "/certificates/web-development.pdf"
  },
  {
    title: "Additional Certifications",
    issuer: "[Add issuer / course]", // ✏️ EDIT
    file: "", // ✏️ EDIT
  },
];

/* ───────────────────────────── Navigation ───────────────────────────── */

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
