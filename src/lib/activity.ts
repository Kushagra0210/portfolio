import { unstable_cache } from "next/cache";
import { z } from "zod";
import { githubSnapshot, leetcodeSnapshot } from "@/data/activity-snapshots";
import type { ActivityDay, ActivitySummary } from "@/types/portfolio";

const githubResponseSchema = z.object({
  total: z.record(z.string(), z.number()),
  contributions: z.array(z.object({
    date: z.string(),
    count: z.number().nonnegative(),
    level: z.number().min(0).max(4),
  })),
});

const leetcodeResponseSchema = z.object({
  data: z.object({
    matchedUser: z.object({
      userCalendar: z.object({
        streak: z.number(),
        totalActiveDays: z.number(),
        submissionCalendar: z.string(),
      }),
      submitStatsGlobal: z.object({
        acSubmissionNum: z.array(z.object({
          difficulty: z.string(),
          count: z.number(),
          submissions: z.number(),
        })),
      }),
    }),
  }),
});

function levelFor(count: number, max: number): ActivityDay["level"] {
  if (count <= 0 || max <= 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil((count / max) * 4))) as ActivityDay["level"];
}

export function normalizeLeetCodeCalendar(calendar: string): ActivityDay[] {
  const parsed = z.record(z.string(), z.number().nonnegative()).parse(JSON.parse(calendar));
  const entries = Object.entries(parsed);
  const max = Math.max(0, ...entries.map(([, count]) => count));
  return entries.map(([timestamp, count]) => ({
    date: new Date(Number(timestamp) * 1000).toISOString().slice(0, 10),
    count,
    level: levelFor(count, max),
  }));
}

export function normalizeGitHubDays(days: Array<{ date: string; count: number; level: number }>): ActivityDay[] {
  return days.map((day) => ({
    date: day.date,
    count: day.count,
    level: Math.min(4, Math.max(0, day.level)) as ActivityDay["level"],
  }));
}

const fetchGitHub = unstable_cache(async (): Promise<ActivitySummary> => {
  try {
    const response = await fetch("https://github-contributions-api.jogruber.de/v4/Kushagra0210?y=2026", { signal: AbortSignal.timeout(6000) });
    if (!response.ok) throw new Error(`GitHub activity returned ${response.status}`);
    const data = githubResponseSchema.parse(await response.json());
    const days = normalizeGitHubDays(data.contributions);
    return {
      ...githubSnapshot,
      total: data.total["2026"] ?? days.reduce((sum, day) => sum + day.count, 0),
      activeDays: days.filter((day) => day.count > 0).length,
      days,
      source: "live",
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return githubSnapshot;
  }
}, ["github-activity-2026"], { revalidate: 86400 });

const fetchLeetCode = unstable_cache(async (): Promise<ActivitySummary> => {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `query userProfileCalendar($username: String!, $year: Int) { matchedUser(username: $username) { userCalendar(year: $year) { streak totalActiveDays submissionCalendar } submitStatsGlobal { acSubmissionNum { difficulty count submissions } } } }`,
        variables: { username: "kushagra0210", year: 2026 },
      }),
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) throw new Error(`LeetCode returned ${response.status}`);
    const data = leetcodeResponseSchema.parse(await response.json()).data.matchedUser;
    const solved = data.submitStatsGlobal.acSubmissionNum;
    const all = solved.find((item) => item.difficulty === "All");
    return {
      ...leetcodeSnapshot,
      total: all?.count ?? leetcodeSnapshot.total,
      activeDays: data.userCalendar.totalActiveDays,
      streak: data.userCalendar.streak,
      breakdown: solved.filter((item) => item.difficulty !== "All").map((item) => ({ label: item.difficulty, value: item.count })),
      days: normalizeLeetCodeCalendar(data.userCalendar.submissionCalendar),
      source: "live",
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return leetcodeSnapshot;
  }
}, ["leetcode-activity-2026"], { revalidate: 86400 });

export async function getActivity(): Promise<[ActivitySummary, ActivitySummary]> {
  return Promise.all([fetchGitHub(), fetchLeetCode()]);
}
