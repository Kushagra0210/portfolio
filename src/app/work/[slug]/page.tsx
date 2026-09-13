import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

const content = {
  "dsa-revision-tracker": () => import("@/content/work/dsa-revision-tracker.mdx"),
  raahsathi: () => import("@/content/work/raahsathi.mdx"),
  "aqi-predictor": () => import("@/content/work/aqi-predictor.mdx"),
} as const;

type Slug = keyof typeof content;
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary, alternates: { canonical: `/work/${project.slug}` } };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  if (!(slug in content)) notFound();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const { default: CaseStudy } = await content[slug as Slug]();
  return (
    <main id="content" className="case-page">
      <header className="case-hero shell">
        <Link href="/#work" className="back-link"><ArrowLeft size={14} aria-hidden="true" />Selected work</Link>
        <p className="eyebrow">{project.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className="case-dek">{project.summary}</p>
        <dl className="case-facts">
          <div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Ownership</dt><dd>{project.ownership}</dd></div><div><dt>Status</dt><dd>{project.status}</dd></div><div><dt>Year</dt><dd>{project.year}</dd></div>
        </dl>
        <div className="case-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="case-top-links"><a href={project.repoUrl} target="_blank" rel="noreferrer">Repository <ArrowUpRight size={14} aria-hidden="true" /></a>{project.liveEnabled && project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={14} aria-hidden="true" /></a> : null}</div>
      </header>
      <article className="case-prose shell"><CaseStudy /></article>
      <nav className="next-project shell" aria-label="Continue through selected work"><span>Next case study</span><Link href={`/work/${projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length].slug}`}>{projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length].title}<ArrowUpRight aria-hidden="true" /></Link></nav>
    </main>
  );
}
