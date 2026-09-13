import type { ProjectCaseStudy, ProofMetric } from "@/types/portfolio";

export const profile = {
  name: "Kushagra Saxena",
  initials: "KS",
  email: "kushagrasaxena0210@gmail.com",
  location: "Delhi, India",
  github: "https://github.com/Kushagra0210",
  leetcode: "https://leetcode.com/u/kushagra0210",
  linkedin: "https://linkedin.com/in/kushagra-saxena",
} as const;

export const projects: ProjectCaseStudy[] = [
  {
    slug: "dsa-revision-tracker",
    title: "DSA Revision Tracker",
    eyebrow: "01 / Systems for deliberate practice",
    summary:
      "A full-stack revision system that turns solved problems into a timezone-safe, spaced-repetition queue.",
    role: "Product engineering, architecture, backend, frontend and tests",
    ownership: "Solo",
    status: "Live",
    year: "2026",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "Vitest"],
    repoUrl: "https://github.com/Kushagra0210/dsa-revision-tracker",
    liveUrl: "https://dsa-revision-tracker-five.vercel.app/",
    liveEnabled: true,
    image: "/projects/dsa-tracker.png",
    imageAlt: "DSA Revision Tracker login screen",
    accent: "#315efb",
    metrics: [
      { label: "Revision steps", value: "6" },
      { label: "Ownership", value: "Solo" },
      { label: "Test focus", value: "DB + unit" },
    ],
  },
  {
    slug: "raahsathi",
    title: "RaahSathi",
    eyebrow: "02 / Public-service workflow",
    summary:
      "A bilingual RTO service platform with durable applications, identity recovery, payments, appointments and waitlists.",
    role: "Authentication, service workflows, data model, API contracts and testing",
    ownership: "Collaborative",
    status: "Live",
    year: "2026",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Zod", "Playwright"],
    repoUrl: "https://github.com/Kushagra0210/RaahSathi",
    liveUrl: "https://raahsathi-six.vercel.app/services",
    liveEnabled: true,
    image: "/projects/raahsathi.png",
    imageAlt: "RaahSathi services interface",
    accent: "#ef8d55",
    metrics: [
      { label: "My commits", value: "13" },
      { label: "Languages", value: "2" },
      { label: "Ownership", value: "Team" },
    ],
  },
  {
    slug: "aqi-predictor",
    title: "AQI Predictor",
    eyebrow: "03 / Applied machine learning",
    summary:
      "An independent Streamlit workbench for exploring air-quality data and comparing regression models without overstating results.",
    role: "Data pipeline, model experiments, interface and deployment hardening",
    ownership: "Independent",
    status: "Deployment in progress",
    year: "2026",
    stack: ["Python", "Streamlit", "scikit-learn", "XGBoost", "pandas"],
    repoUrl: "https://github.com/Kushagra0210/aqi-predictor",
    liveEnabled: false,
    image: "/projects/aqi-predictor.svg",
    imageAlt: "AQI Predictor model comparison diagram",
    accent: "#5b8c72",
    metrics: [
      { label: "Models compared", value: "4" },
      { label: "Interface", value: "Streamlit" },
      { label: "Ownership", value: "Solo" },
    ],
  },
];

export const proofMetrics: ProofMetric[] = [
  {
    label: "GitHub",
    value: "132 contributions",
    detail: "39 active days in 2026",
    href: profile.github,
  },
  {
    label: "LeetCode",
    value: "290 solved",
    detail: "134 easy · 133 medium · 23 hard",
    href: profile.leetcode,
  },
  {
    label: "Academics",
    value: "8.86 CGPA",
    detail: "B.Tech CSE · MAIT / GGSIPU",
  },
];

export const workbench = {
  title: "Workbench",
  repoUrl: "https://github.com/Kushagra0210/WorkBench",
  summary:
    "A collaborative agent workbench where I built core Python service infrastructure—not the entire product.",
  contributions: [
    "SQLite-backed sessions, approvals and artifact persistence",
    "Knowledge-to-artifact pipeline and AI service integration",
    "Sandboxed execution, durable workflow recovery and tests",
  ],
};
