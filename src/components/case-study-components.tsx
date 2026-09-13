import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function ArchitectureDiagram({ title, nodes }: { title: string; nodes: Array<{ label: string; detail: string }> }) {
  return (
    <figure className="architecture">
      <figcaption><span>System map</span>{title}</figcaption>
      <div className="architecture-flow">
        {nodes.map((node, index) => <div className="architecture-step" key={node.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{node.label}</strong><small>{node.detail}</small></div>)}
      </div>
    </figure>
  );
}

export function ProjectScreenshot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return <figure className="case-image"><div><Image src={src} alt={alt} fill sizes="(max-width: 900px) 92vw, 980px" /></div><figcaption>{caption}</figcaption></figure>;
}

export function DecisionGrid({ items }: { items: Array<{ decision: string; why: string }> }) {
  return <div className="decision-grid">{items.map((item, index) => <article key={item.decision}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.decision}</h3><p>{item.why}</p></article>)}</div>;
}

export function CaseLinks({ repository, live, liveLabel = "Open live demo" }: { repository: string; live?: string; liveLabel?: string }) {
  return <div className="case-links"><a href={repository} target="_blank" rel="noreferrer">View repository <ArrowUpRight size={15} aria-hidden="true" /></a>{live ? <a href={live} target="_blank" rel="noreferrer">{liveLabel} <ArrowUpRight size={15} aria-hidden="true" /></a> : <span>Live demo pending deployment</span>}</div>;
}

export function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return <aside className="case-callout"><span>{label}</span><div>{children}</div></aside>;
}
