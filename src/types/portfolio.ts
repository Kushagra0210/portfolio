export type Platform = "github" | "leetcode";

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ActivitySummary {
  platform: Platform;
  label: string;
  profileUrl: string;
  total: number;
  totalLabel: string;
  activeDays: number;
  streak?: number;
  breakdown?: Array<{ label: string; value: number }>;
  days: ActivityDay[];
  source: "live" | "snapshot";
  updatedAt: string;
}

export interface ProofMetric {
  label: string;
  value: string;
  detail: string;
  href?: string;
}

export interface CommandAction {
  id: string;
  label: string;
  keywords: string[];
  shortcut?: string;
  kind: "navigate" | "external" | "copy" | "theme";
  href?: string;
  value?: string;
}

export interface ProjectCaseStudy {
  slug: "dsa-revision-tracker" | "raahsathi" | "aqi-predictor";
  title: string;
  eyebrow: string;
  summary: string;
  role: string;
  ownership: "Solo" | "Collaborative" | "Independent";
  status: string;
  year: string;
  stack: string[];
  repoUrl: string;
  liveUrl?: string;
  liveEnabled: boolean;
  image: string;
  imageAlt: string;
  accent: string;
  metrics: Array<{ label: string; value: string }>;
}
