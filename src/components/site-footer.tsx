import { ArrowUpRight } from "lucide-react";
import { CopyEmail } from "@/components/copy-email";
import { profile } from "@/data/projects";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="shell footer-grid">
        <div><p className="eyebrow">Open to Backend / SDE internships</p><h2>Have a difficult problem<br />worth engineering?</h2></div>
        <div className="footer-contact"><a href={`mailto:${profile.email}`} className="footer-email">{profile.email}<ArrowUpRight size={20} aria-hidden="true" /></a><CopyEmail email={profile.email} /><p>Delhi, India · Available for internships and collaborative builds.</p></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Kushagra Saxena</span><span>Designed and engineered with restraint.</span></div>
    </footer>
  );
}
