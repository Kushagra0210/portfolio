import { ArrowUpRight } from "lucide-react";
import type { ActivityDay, ActivitySummary } from "@/types/portfolio";

const GRID_START = new Date("2025-12-28T00:00:00Z");
const CELL = 11;
const STEP = 14;
const WEEKS = 53;

function position(day: ActivityDay) {
  const date = new Date(`${day.date}T00:00:00Z`);
  const offset = Math.floor((date.getTime() - GRID_START.getTime()) / 86_400_000);
  return { x: Math.floor(offset / 7) * STEP, y: (offset % 7) * STEP };
}

export function ActivityGrid({ summary }: { summary: ActivitySummary }) {
  const activeDays = summary.days.filter((day) => day.count > 0 && day.date.startsWith("2026"));
  const patternId = `${summary.platform}-empty-day`;
  return (
    <article className={`activity-card ${summary.platform}`}>
      <div className="activity-header">
        <div><p className="eyebrow">{summary.label} / 2026</p><div className="activity-total"><strong>{summary.total}</strong><span>{summary.totalLabel}</span></div></div>
        <a href={summary.profileUrl} target="_blank" rel="noreferrer" aria-label={`Open ${summary.label} profile`}><ArrowUpRight size={17} aria-hidden="true" /></a>
      </div>
      <div className="heatmap-scroll" tabIndex={0} aria-label={`${summary.label} activity heatmap; use horizontal scroll on small screens`}>
        <svg className="heatmap" width={WEEKS * STEP - 3} height={7 * STEP - 3} viewBox={`0 0 ${WEEKS * STEP - 3} ${7 * STEP - 3}`} role="img" aria-label={`${summary.total} ${summary.totalLabel} across ${summary.activeDays} active days`}>
          <defs><pattern id={patternId} width={STEP} height={STEP} patternUnits="userSpaceOnUse"><rect className="empty-day" width={CELL} height={CELL} /></pattern></defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          {activeDays.map((day) => { const { x, y } = position(day); return <rect key={day.date} className="active-day" data-level={day.level} x={x} y={y} width={CELL} height={CELL}><title>{`${day.date}: ${day.count} ${summary.platform === "github" ? "contributions" : "submissions"}`}</title></rect>; })}
        </svg>
      </div>
      <div className="activity-meta">
        <span>{summary.activeDays} active days</span>{summary.streak ? <span>{summary.streak}-day streak</span> : null}
        {summary.breakdown?.map((item) => <span key={item.label}>{item.label} {item.value}</span>)}
        <span className="data-source">{summary.source === "live" ? "Live data" : "Last-known snapshot"}</span>
      </div>
    </article>
  );
}
