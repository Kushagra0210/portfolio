import Link from "next/link";
import { CommandShell } from "@/components/command-shell";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="Kushagra Saxena, home">
          <span className="brand-mark">KS</span><span className="brand-name">Kushagra Saxena</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/#work">Work</Link><Link href="/#activity">Activity</Link><Link href="/#experience">Experience</Link>
        </nav>
        <div className="header-actions"><CommandShell /><ThemeToggle /></div>
      </div>
    </header>
  );
}
