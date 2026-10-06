"use client";

import { useRef } from "react";
import { siteAssets } from "@/content/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const projects = [
  {
    id: "book",
    title: "BOOK",
    thumbnail: siteAssets.wirewood.pages[0],
    route: "/works/book",
  },
  {
    id: "meghalaya",
    title: "MEGHALAYA",
    thumbnail: siteAssets.meghalaya.pages[0],
    route: "/works/meghalaya",
  },
  {
    id: "app",
    title: "APP",
    thumbnail: siteAssets.inABit.screens[0],
    route: "/works/app",
  }
];

export default function WorksGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray<HTMLElement>(".work-card");
    
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      data-bg="ivory"
      id="work"
      className="relative py-24 px-6 lg:px-[7vw] lg:py-32"
      ref={containerRef}
    >
      {/* Section header */}
      <div className="mb-16 lg:mb-24 flex flex-col items-center text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/60 mb-6">
          03 — Selected Work
        </span>
        <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight">
          MY WORKS
        </h2>
      </div>

      {/* 3 Thumbnails row */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <a
            key={project.id}
            href={project.route}
            className="work-card group relative flex flex-col items-center w-full md:w-1/3 outline-none"
          >
            {/* Thumbnail (Folder Shape) */}
            <div 
              className="relative w-full aspect-[5/4] overflow-hidden bg-ink/5 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.03]"
              style={{
                // Custom CSS clip-path to create a physical folder tab shape!
                // Top-left tab: 0% 0% -> 35% 0% -> slope to 45% 15% -> right 100% 15% -> bottom 100% 100%
                clipPath: "polygon(0% 0%, 35% 0%, 42% 12%, 100% 12%, 100% 100%, 0% 100%)",
                // A subtle border radius effect using clip-path requires SVG, but polygon is sharp and brutalist which fits nicely.
              }}
            >
              <div className="w-full h-full p-[1px]">
                {project.id === "app" ? (
                  <div className="w-full h-full bg-[#E56353] flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110">
                    <span className="font-display text-4xl md:text-5xl text-white tracking-tight">
                      In-A-Bit
                    </span>
                  </div>
                ) : (
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} thumbnail`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
                  />
                )}
              </div>
              
              {/* Optional: Add a subtle line to simulate the folder flap */}
              <div className="absolute top-[12%] left-0 right-0 h-px bg-white/20 z-10 pointer-events-none mix-blend-overlay" />
            </div>
            
            {/* Title */}
            <div className="mt-8 flex items-center justify-center gap-2 overflow-hidden">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/80 transition-colors group-hover:text-ink">
                {project.title}
              </span>
              <span className="font-mono text-[10px] text-ink/0 -translate-x-4 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:text-ink/60">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
