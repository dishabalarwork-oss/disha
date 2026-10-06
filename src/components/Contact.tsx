"use client";

import { siteContent } from "@/content/site";
import { siteAssets } from "@/content/assets";

export default function Contact() {
  return (
    <section
      data-bg="ink"
            id="contact"
      className="relative  text-ivory py-24 px-6 lg:px-[7vw] lg:py-40 min-h-[80vh] flex flex-col justify-center"
    >
      {/* Section label */}
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ivory/70 mb-12 block">
        10 — Contact
      </span>

      {/* Big statement */}
      <h2 className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.92] tracking-tight mb-12 max-w-4xl">
        {siteContent.contact.statement}
      </h2>

      {/* Contact links */}
      <div className="flex flex-col gap-6 mb-16 lg:mb-24">
        {/* Email — primary CTA */}
        <a
          href={`mailto:${siteContent.contact.email}`}
          className="group inline-flex items-center gap-3 font-body text-lg lg:text-2xl text-ivory/90 hover:text-lime transition-colors w-fit"
        >
          <span>{siteContent.contact.email}</span>
          <span className="font-mono text-xs text-ivory/80 group-hover:text-lime transition-colors">
            ↗
          </span>
        </a>

        {/* Resume download */}
        <a
          href={siteAssets.contact.resume}
          download
          className="group inline-flex items-center gap-3 font-body text-lg lg:text-xl text-ivory/60 hover:text-ivory transition-colors w-fit"
        >
          <span>Download Résumé</span>
          <span className="font-mono text-xs text-ivory/70 group-hover:text-ivory/60 transition-colors">
            ↓
          </span>
        </a>
      </div>



      {/* Footer line */}
      <div className="absolute bottom-8 left-6 right-6 lg:left-[7vw] lg:right-[7vw] flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ivory/60">
          © 2026 Disha Balar
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-ivory/60">
          Built with intention
        </span>
      </div>
    </section>
  );
}
