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

const project = siteContent.work.projects[1]; // The Wirewood

export default function Wirewood() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pages = siteAssets.wirewood.pages;

  // We have 24 pages -> 12 leaves.
  // Leaf i has front = pages[i*2] and back = pages[i*2 + 1]
  const numLeaves = Math.floor(pages.length / 2);
  
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const leaves = gsap.utils.toArray<HTMLElement>(".book-leaf");
    
    // Pin the book and animate the leaves
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${numLeaves * 100}%`, // scroll length proportional to number of pages
        pin: true,
        scrub: 1, // smooth scrubbing
      },
    });

    // Animate each leaf sequentially
    leaves.forEach((leaf, i) => {
      // Small offset in z to fix z-fighting during rotation
      gsap.set(leaf, { zIndex: numLeaves - i });
      
      tl.to(
        leaf,
        {
          rotateY: -180,
          duration: 1,
          ease: "none",
        },
        i // stagger by 1 second each on the timeline
      );
      
      // Update z-index halfway through rotation so it stacks correctly on the left side
      tl.to(
        leaf,
        {
          zIndex: i + 1,
          duration: 0.01,
        },
        i + 0.5
      );
    });
  }, { scope: containerRef });

  return (
    <section
      data-bg="ivory"
      id="wirewood"
      className="relative text-ink w-full bg-ivory"
      ref={containerRef}
    >
      {/* Pinned container area */}
      <div className="h-screen w-full flex flex-col items-center justify-center pt-20">
        
        <div className="absolute top-12 left-0 w-full flex flex-col items-center text-center z-50 pointer-events-none">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/70 mb-4 block">
            05 — {project.tags.join(" · ")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-4">
            {project.title}
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/50 bg-ivory/80 px-4 py-2 rounded-full backdrop-blur-sm">
            Scroll to read
          </p>
        </div>

        {/* 3D Book wrapper */}
        <div 
          ref={bookRef}
          className="relative w-[85vw] max-w-[900px] aspect-[5/3.5] perspective-[3000px] mt-12"
        >
          {/* Leaves are anchored to the center, positioned on the right half initially */}
          {Array.from({ length: numLeaves }).map((_, i) => (
            <div
              key={i}
              className="book-leaf absolute top-0 left-1/2 w-1/2 h-full transform-style-3d origin-left"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face */}
              <div className="absolute inset-0 backface-hidden shadow-[-4px_0_20px_rgba(0,0,0,0.05)] border-l border-black/5 bg-white">
                <img 
                  src={pages[i * 2]} 
                  alt={`Page ${i * 2 + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Back Face */}
              <div 
                className="absolute inset-0 backface-hidden shadow-[4px_0_20px_rgba(0,0,0,0.05)] border-r border-black/5 bg-white"
                style={{ transform: "rotateY(180deg)" }}
              >
                <img 
                  src={pages[i * 2 + 1]} 
                  alt={`Page ${i * 2 + 2}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
          
          {/* Static shadow under the book to make it feel grounded */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[95%] h-8 bg-black/10 blur-xl rounded-full" />
        </div>
      </div>
    </section>
  );
}
