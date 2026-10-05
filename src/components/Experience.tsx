"use client";

import { siteContent } from "@/content/site";

export default function Experience() {
  return (
    <section
      data-bg="ivory"
            id="experience"
      className="relative  text-ink py-24 px-6 lg:px-[7vw] lg:py-40"
    >
      {/* Section header */}
      <div className="mb-16 lg:mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/60 mb-6 block">
          07 — Experience
        </span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight">
          {siteContent.experience.title}
        </h2>
      </div>

      {/* Timeline layout */}
      <div className="relative">
        {/* Vertical line — desktop only */}
        <div className="hidden lg:block absolute left-[200px] top-0 bottom-0 w-px bg-ink/10" />

        <div className="space-y-0">
          {siteContent.experience.roles.map((role, i) => {
            // Extract year from period string
            const year = role.period.split(" ").pop() || "";

            return (
              <div
                key={role.id}
                className="group relative grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-12 py-8 lg:py-12 border-b border-ink/[0.08]"
              >
                {/* Year — sticky on desktop */}
                <div className="lg:text-right lg:sticky lg:top-40 lg:self-start">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/70">
                    {role.period}
                  </span>
                </div>

                {/* Role details */}
                <div className="lg:pl-12">
                  <h3 className="font-display text-2xl lg:text-4xl leading-tight mb-2">
                    {role.role}
                  </h3>
                  <p className="font-body text-sm lg:text-base text-ink/60 mb-3">
                    {role.company}
                  </p>
                  <p className="font-body text-sm lg:text-base text-ink/75 max-w-md leading-relaxed">
                    {role.impact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
