"use client";

import { siteContent } from "@/content/site";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-ivory pointer-events-none">
      <div className="flex items-center justify-between px-6 py-6 lg:px-12 pointer-events-auto">
        <a 
          href="#hero" 
          className="font-display text-2xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory rounded px-1 transition-opacity hover:opacity-70"
          aria-label="Back to top"
        >
          {siteContent.hero.name}
        </a>
      </div>
    </nav>
  );
}
