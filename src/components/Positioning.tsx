"use client";

import { siteContent } from "@/content/site";
import { siteAssets } from "@/content/assets";

export default function Positioning() {
  return (
    <section
      data-bg="coral"
            id="positioning"
      className="relative  text-ink py-24 px-6 lg:px-[7vw] lg:py-40 overflow-hidden"
    >
      {/* Editorial poster layout: 3-column on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[2vw] items-center min-h-[60vh]">
        {/* Left — portrait / stamp */}
        <div className="lg:col-span-3 flex justify-center lg:justify-start">
          <div className="w-40 h-52 lg:w-52 lg:h-64 overflow-hidden rounded-[2px] rotate-[-2deg] shadow-[4px_8px_24px_rgba(0,0,0,0.12)]">
            <img
              src={siteAssets.hero.portrait}
              alt="Disha Balar portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Center — big statement */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-tight mb-6">
            {siteContent.about.statement}
          </h2>
        </div>

        {/* Right — description */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <p className="font-body text-base lg:text-lg leading-relaxed text-ink/85 max-w-sm">
            {siteContent.about.description}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/80">
              B.Des Communication Design
            </span>
            <span className="w-1 h-1 rounded-full bg-ink/30" />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/80">
              Atlas SkillTech University
            </span>
          </div>
        </div>
      </div>

      {/* Decorative border */}
      <div className="absolute bottom-0 left-6 right-6 lg:left-[7vw] lg:right-[7vw] h-px bg-ink/10" />
    </section>
  );
}
