import { ArrowUpRight } from "lucide-react";
import type { ActivityDay, ActivitySummary } from "@/types/portfolio";

function buildYear(days: ActivityDay[]) {
  const byDate = new Map(days.map((day) => [day.date, day]));
  const start = new Date("2025-12-28T00:00:00Z");
  return Array.from({ length: 371 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const key = date.toISOString().slice(0, 10);
    return byDate.get(key) ?? { date: key, count: 0, level: 0 as const };
  });
}

export function ActivityGrid({ summary }: { summary: ActivitySummary }) {
  const days = buildYear(summary.days);
  return (
    <article className={`activity-card ${summary.platform}`}>
      <div className="activity-header">
        <div><p className="eyebrow">{summary.label} / 2026</p><div className="activity-total"><strong>{summary.total}</strong><span>{summary.totalLabel}</span></div></div>
        <a href={summary.profileUrl} target="_blank" rel="noreferrer" aria-label={`Open ${summary.label} profile`}><ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
      <div className="heatmap-scroll" tabIndex={0} aria-label={`${summary.label} activity heatmap; use horizontal scroll on small screens`}>
        <div className="heatmap" role="img" aria-label={`${summary.total} ${summary.totalLabel} across ${summary.activeDays} active days`}>
          {days.map((day) => <span key={day.date} data-level={day.level} title={`${day.date}: ${day.count} ${summary.platform === "github" ? "contributions" : "submissions"}`} />)}
        </div>
      </div>
      <div className="activity-meta">
        <span>{summary.activeDays} active days</span>{summary.streak ? <span>{summary.streak}-day streak</span> : null}
        {summary.breakdown?.map((item) => <span key={item.label}>{item.label} {item.value}</span>)}
        <span className="data-source">{summary.source === "live" ? "Live data" : "Last-known snapshot"}</span>
      </div>
    </article>
  );
}
