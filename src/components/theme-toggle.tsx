"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button className="icon-button" type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Toggle color theme">
      <Moon className="theme-icon-moon" size={16} aria-hidden="true" /><Sun className="theme-icon-sun" size={16} aria-hidden="true" />
    </button>
  );
}
