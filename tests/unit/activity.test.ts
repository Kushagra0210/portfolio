import { describe, expect, it } from "vitest";
import { normalizeGitHubDays, normalizeLeetCodeCalendar } from "@/lib/activity";

describe("activity normalization", () => {
  it("turns LeetCode timestamps into typed calendar days", () => {
    expect(normalizeLeetCodeCalendar('{"1767571200":5,"1767657600":10}')).toEqual([
      { date: "2026-01-05", count: 5, level: 2 },
      { date: "2026-01-06", count: 10, level: 4 },
    ]);
  });

  it("preserves GitHub dates and clamps invalid levels", () => {
    expect(normalizeGitHubDays([{ date: "2026-01-01", count: 8, level: 9 }])).toEqual([{ date: "2026-01-01", count: 8, level: 4 }]);
  });

  it("rejects malformed upstream calendars", () => {
    expect(() => normalizeLeetCodeCalendar('{"bad":-1}')).toThrow();
    expect(() => normalizeLeetCodeCalendar("not json")).toThrow();
  });
});
