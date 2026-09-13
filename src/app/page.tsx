import { Suspense } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Database, Layers3, ShieldCheck } from "lucide-react";
import { ActivitySection } from "@/components/activity-section";
import { ProjectCard } from "@/components/project-card";
import { ProofStrip } from "@/components/proof-strip";
import { SectionHeading } from "@/components/section-heading";
import { profile, projects, workbench } from "@/data/projects";

function ActivitySkeleton() {
  return <div className="activity-grid-wrap" aria-label="Loading activity"><div className="activity-card skeleton" /><div className="activity-card skeleton" /></div>;
}

export default function Home() {
  return (
    <main id="content">
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker"><span />Backend-focused software engineer · Delhi</p>
          <h1 id="hero-title">I turn product rules into <em>reliable systems.</em></h1>
          <p className="hero-summary">I’m Kushagra, a CSE undergraduate building thoughtful backends, durable workflows and the interfaces that make them useful.</p>
          <div className="hero-actions">
            <a className="button primary" href="#work">View selected work <ArrowDown size={16} aria-hidden="true" /></a>
            <a className="button secondary" href={`mailto:${profile.email}`}>Email me <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-portrait" aria-label="Kushagra Saxena monogram placeholder">
          <div className="portrait-grid" aria-hidden="true" /><span>KS</span><small>Portrait reserved<br />for production</small>
        </div>
        <div className="hero-note"><span>Currently</span><p>Studying Computer Science at MAIT and looking for a Backend / SDE internship.</p></div>
      </section>

      <div className="shell"><ProofStrip /></div>

      <section className="section shell" id="work">
        <SectionHeading number="01" eyebrow="Selected work" title="Systems with receipts." copy="Three projects chosen for engineering depth, ownership and honest attribution—not for filling a grid." />
        <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} priority={index === 0} />)}</div>
      </section>

      <section className="section activity-section" id="activity">
        <div className="shell">
          <SectionHeading number="02" eyebrow="Build & practice" title="Consistency, made visible." copy="Platform-native numbers are kept separate. Live data refreshes daily and falls back to a checked-in snapshot if an upstream service fails." />
          <Suspense fallback={<ActivitySkeleton />}><ActivitySection /></Suspense>
        </div>
      </section>

      <section className="section shell workbench-section">
        <SectionHeading number="03" eyebrow="Contribution spotlight" title="Useful work is often shared work." />
        <article className="workbench-card">
          <div className="workbench-mark"><Layers3 aria-hidden="true" /><span>WB / 07</span></div>
          <div className="workbench-copy"><p className="eyebrow">Collaborative repository · Python backend</p><h3>{workbench.title}</h3><p>{workbench.summary}</p><ul>{workbench.contributions.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <a href={workbench.repoUrl} target="_blank" rel="noreferrer" className="circle-link" aria-label="Open Workbench repository"><ArrowUpRight aria-hidden="true" /></a>
        </article>
      </section>

      <section className="section shell" id="experience">
        <SectionHeading number="04" eyebrow="Experience & foundation" title="Early career. Serious standards." />
        <div className="experience-grid">
          <article className="timeline-card"><div className="timeline-date">2025 — present</div><div><p className="eyebrow">Maharaja Agrasen Institute of Technology</p><h3>Database Team · Placement Cell</h3><p>Supporting structured placement data and internal operations while learning how reliability matters when other people depend on the system.</p></div></article>
          <article className="timeline-card"><div className="timeline-date">2024 — present</div><div><p className="eyebrow">GGSIPU</p><h3>B.Tech, Computer Science</h3><p>8.86 CGPA. Building a strong base in data structures, databases, operating systems and software engineering.</p></div></article>
        </div>
        <div className="capability-grid">
          <div><Database aria-hidden="true" /><h3>Backend systems</h3><p>Node.js, Python, Go, PostgreSQL, Prisma, REST/OpenAPI, authentication and stateful workflows.</p></div>
          <div><ShieldCheck aria-hidden="true" /><h3>Reliability mindset</h3><p>Authorization boundaries, timezone correctness, validation, persistence, recovery and focused tests.</p></div>
          <div><Layers3 aria-hidden="true" /><h3>Product surface</h3><p>React, Next.js and accessible interfaces that expose system behavior clearly instead of hiding it.</p></div>
        </div>
        <div className="closing-link"><Link href="/work/dsa-revision-tracker">Start with the deepest case study <ArrowRight size={17} aria-hidden="true" /></Link></div>
      </section>
    </main>
  );
}
