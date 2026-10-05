"use client";

import { siteContent } from "@/content/site";
import { siteAssets } from "@/content/assets";

export default function Modelling() {
  return (
    <section
      data-bg="ink"
            id="modelling"
      className="relative  text-ivory py-24 px-6 lg:px-[7vw] lg:py-40 overflow-hidden"
    >
      {/* Section header */}
      <div className="mb-16 lg:mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ivory/70 mb-6 block">
          08 — Aesthetics
        </span>
        <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight mb-4">
          {siteContent.modelling.title}
        </h2>
        <p className="font-body text-base text-ivory/60">
          {siteContent.modelling.description}
        </p>
      </div>

      {/* Fashion editorial grid — asymmetric, large photos, tiny metadata */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {siteAssets.modelling.images.map((src, i) => {
          // Alternate sizing for editorial feel
          const isLarge = i === 0 || i === 3;

          return (
            <div
              key={i}
              className={`relative overflow-hidden ${
                isLarge
                  ? "col-span-2 lg:col-span-2 row-span-1"
                  : "col-span-1"
              }`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2px]">
                <img
                  src={src}
                  alt={`Aesthetic photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Tiny metadata */}
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ivory/70">
                  Moment
                </span>
                <span className="font-mono text-[9px] text-ivory/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
