"use client";

import { Command } from "cmdk";
import { ArrowUpRight, Check, Clipboard, Code2, Home, Keyboard, Mail, Moon, Search, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { profile } from "@/data/projects";
import type { CommandAction } from "@/types/portfolio";

const actions: CommandAction[] = [
  { id: "home", label: "Home", keywords: ["top"], kind: "navigate", href: "/", shortcut: "H" },
  { id: "work", label: "Selected work", keywords: ["projects", "case studies"], kind: "navigate", href: "/#work", shortcut: "W" },
  { id: "activity", label: "Activity", keywords: ["github", "leetcode", "heatmap"], kind: "navigate", href: "/#activity", shortcut: "A" },
  { id: "experience", label: "Experience", keywords: ["education", "skills"], kind: "navigate", href: "/#experience", shortcut: "E" },
  { id: "github", label: "Open GitHub", keywords: ["code", "repositories"], kind: "external", href: profile.github },
  { id: "leetcode", label: "Open LeetCode", keywords: ["dsa", "problems"], kind: "external", href: profile.leetcode },
  { id: "linkedin", label: "Open LinkedIn", keywords: ["profile", "social"], kind: "external", href: profile.linkedin },
  { id: "email", label: "Email me", keywords: ["contact", "mail"], kind: "external", href: `mailto:${profile.email}` },
  { id: "copy-email", label: "Copy email", keywords: ["contact", "clipboard"], kind: "copy", value: profile.email },
  { id: "theme", label: "Toggle theme", keywords: ["dark", "light", "appearance"], kind: "theme" },
];

const actionIcons: Record<string, React.ReactNode> = {
  home: <Home aria-hidden="true" />,
  work: <Code2 aria-hidden="true" />,
  activity: <Keyboard aria-hidden="true" />,
  experience: <UserRound aria-hidden="true" />,
  github: <ArrowUpRight aria-hidden="true" />,
  leetcode: <ArrowUpRight aria-hidden="true" />,
  linkedin: <ArrowUpRight aria-hidden="true" />,
  email: <Mail aria-hidden="true" />,
  "copy-email": <Clipboard aria-hidden="true" />,
  theme: <Moon aria-hidden="true" />,
};

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-menu", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-menu", onOpen);
    };
  }, []);

  const themeLabel = useMemo(() => resolvedTheme === "dark" ? "Use light theme" : "Use dark theme", [resolvedTheme]);

  async function run(action: CommandAction) {
    if (action.kind === "copy" && action.value) {
      await navigator.clipboard.writeText(action.value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      return;
    }
    if (action.kind === "theme") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      setOpen(false);
      return;
    }
    if (action.href) {
      if (action.kind === "external" && !action.href.startsWith("mailto:")) {
        window.open(action.href, "_blank", "noopener,noreferrer");
      } else {
        window.location.assign(action.href);
      }
      setOpen(false);
    }
  }

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Site command palette" className="command-dialog">
      <div className="command-input-wrap">
        <Search size={16} aria-hidden="true" />
        <Command.Input autoFocus placeholder="Type a command or search…" className="command-input" />
        <kbd>Esc</kbd>
      </div>
      <Command.List className="command-list">
        <Command.Empty className="command-empty">No matching action.</Command.Empty>
        <Command.Group heading="Navigate">
          {actions.slice(0, 4).map((action) => (
            <Command.Item key={action.id} value={`${action.label} ${action.keywords.join(" ")}`} onSelect={() => run(action)}>
              {actionIcons[action.id]}<span>{action.label}</span>{action.shortcut && <kbd>{action.shortcut}</kbd>}
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Connect & preferences">
          {actions.slice(4).map((action) => (
            <Command.Item key={action.id} value={`${action.label} ${action.keywords.join(" ")}`} onSelect={() => run(action)}>
              {action.id === "theme" ? (resolvedTheme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />) : actionIcons[action.id]}
              <span>{action.id === "theme" ? themeLabel : action.label}</span>
              {action.id === "copy-email" && copied ? <Check className="command-status" aria-label="Copied" /> : null}
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
      <div className="command-footer"><span>↑↓ Navigate</span><span>↵ Select</span></div>
    </Command.Dialog>
  );
}

export function CommandTrigger() {
  return (
    <button className="command-trigger" type="button" onClick={() => window.dispatchEvent(new Event("open-command-menu"))} aria-label="Open command palette">
      <Search size={14} aria-hidden="true" /><span>Quick find</span><kbd>⌘K</kbd>
    </button>
  );
}
