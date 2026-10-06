"use client";

import { useRef } from "react";
import { siteContent } from "@/content/site";
import { siteAssets } from "@/content/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const project = siteContent.work.projects[2]; // In-A-Bit

export default function InABit() {
  const containerRef = useRef<HTMLElement>(null);

  // We can still use GSAP for a simple fade-in if desired, but no more horizontal scroll pin
  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <section
      data-bg="lilac"
      id="in-a-bit"
      className="relative text-ink min-h-[80vh] flex items-center justify-center py-24 px-6 lg:px-[7vw]"
      ref={containerRef}
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/80 mb-6 block">
          06 — {project.tags.join(" · ")}
        </span>
        
        <h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.95] tracking-tight mb-8">
          {project.title}
        </h2>
        
        <p className="font-body text-lg lg:text-xl leading-relaxed text-ink/80 max-w-2xl mb-16">
          {project.description}
        </p>
        
        <div className="pt-8 border-t border-ink/[0.12] flex justify-center w-full max-w-sm">
          <a 
            href={project.figmaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center gap-4 outline-none"
          >
            <div className="w-16 h-16 rounded-full border border-ink/20 flex items-center justify-center transition-all duration-300 group-hover:bg-ink group-hover:text-lilac group-hover:scale-110 shadow-sm">
              <span className="font-mono text-xl">↗</span>
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink/70 group-hover:text-ink transition-colors duration-300">
              Launch Interactive Prototype
            </span>
          </a>
        </div>
        
      </div>
    </section>
  );
}
