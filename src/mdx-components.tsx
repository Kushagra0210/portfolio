import type { MDXComponents } from "mdx/types";
import { ArchitectureDiagram, Callout, CaseLinks, DecisionGrid, ProjectScreenshot } from "@/components/case-study-components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ArchitectureDiagram, Callout, CaseLinks, DecisionGrid, ProjectScreenshot, ...components };
}
