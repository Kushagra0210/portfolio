"use client";

import dynamic from "next/dynamic";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const LazyCommandMenu = dynamic(() => import("@/components/command-menu").then((module) => module.CommandMenu), { ssr: false });

export function CommandShell() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setLoaded(true);
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function show() { setLoaded(true); setOpen(true); }

  return (
    <>
      <button className="command-trigger" type="button" onClick={show} aria-label="Open command palette">
        <Search size={14} aria-hidden="true" /><span>Quick find</span><kbd>⌘K</kbd>
      </button>
      {loaded ? <LazyCommandMenu open={open} onOpenChange={setOpen} /> : null}
    </>
  );
}
