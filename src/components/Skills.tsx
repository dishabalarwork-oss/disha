"use client";

import { siteContent } from "@/content/site";

export default function Skills() {
  return (
    <section
      data-bg="ivory"
            id="skills"
      className="relative  text-ink py-24 px-6 lg:px-[7vw] lg:py-40"
    >
      {/* Section header */}
      <div className="mb-16 lg:mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/60 mb-6 block">
          09 — Skills
        </span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
          {siteContent.skills.title}
        </h2>
      </div>

      {/* 4-column typographic manifesto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-[2vw]">
        {siteContent.skills.categories.map((category) => (
          <div key={category.name} className="relative">
            {/* Category name — large display */}
            <h3 className="font-display text-3xl lg:text-4xl tracking-tight mb-6 pb-4 border-b border-ink/[0.18]">
              {category.name}
            </h3>

            {/* Items list */}
            <ul className="space-y-3">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="font-body text-sm lg:text-base text-ink/70 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
