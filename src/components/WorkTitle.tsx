"use client";

import { siteContent } from "@/content/site";

export default function WorkTitle() {
  return (
    <section
      data-bg="ivory"
            id="work"
      className="relative  py-32 px-6 lg:px-[7vw] lg:py-48 flex flex-col items-start justify-center min-h-[50vh]"
    >
      {/* Section number */}
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/60 mb-6">
        03 — Selected Work
      </span>

      {/* Large title — breathing space */}
      <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight max-w-4xl">
        {siteContent.work.title}
      </h2>
    </section>
  );
}
