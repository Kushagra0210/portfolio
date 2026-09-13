import { ArrowUpRight } from "lucide-react";
import { proofMetrics } from "@/data/projects";

export function ProofStrip() {
  return (
    <div className="proof-strip" aria-label="Quick proof points">
      {proofMetrics.map((metric) => {
        const content = <><span className="proof-label">{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small>{metric.href ? <ArrowUpRight size={14} aria-hidden="true" /> : null}</>;
        return metric.href ? <a key={metric.label} href={metric.href} target="_blank" rel="noreferrer" className="proof-item">{content}</a> : <div key={metric.label} className="proof-item">{content}</div>;
      })}
    </div>
  );
}
