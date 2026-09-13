import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ProjectCaseStudy } from "@/types/portfolio";

export function ProjectCard({ project, priority = false }: { project: ProjectCaseStudy; priority?: boolean }) {
  return (
    <article className="project-card" style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <Link href={`/work/${project.slug}`} className="project-visual" aria-label={`Read ${project.title} case study`}>
        <Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 720px) 100vw, 50vw" priority={priority} />
        <span className="project-status"><i />{project.status}</span>
      </Link>
      <div className="project-body">
        <p className="eyebrow">{project.eyebrow}</p>
        <div className="project-title-row"><h3>{project.title}</h3><span>{project.ownership}</span></div>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label="Technology stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="project-links">
          <Link href={`/work/${project.slug}`}>Read case study <ArrowRight size={15} aria-hidden="true" /></Link>
          <a href={project.repoUrl} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={14} aria-hidden="true" /></a>
          {project.liveEnabled && project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14} aria-hidden="true" /></a> : null}
        </div>
      </div>
    </article>
  );
}
