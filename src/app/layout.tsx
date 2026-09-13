import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/data/projects";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans-source", subsets: ["latin"], display: "swap" });
const mono = IBM_Plex_Mono({ variable: "--font-mono-source", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Kushagra Saxena — Backend-focused Software Engineer", template: "%s — Kushagra Saxena" },
  description: "Backend-focused software engineer building reliable product systems, service workflows and applied-ML tools.",
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  keywords: ["Kushagra Saxena", "backend engineer", "software engineer intern", "Next.js", "TypeScript", "PostgreSQL", "Delhi"],
  openGraph: { type: "profile", title: "Kushagra Saxena — Backend-focused Software Engineer", description: "Reliable product systems, service workflows and applied-ML tools.", url: "/", siteName: "Kushagra Saxena" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfilePage"],
    name: profile.name,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
    sameAs: [profile.github, profile.leetcode, profile.linkedin],
    knowsAbout: ["Backend development", "TypeScript", "PostgreSQL", "Python", "Data structures and algorithms"],
  };
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider><SiteHeader />{children}<SiteFooter /></ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
