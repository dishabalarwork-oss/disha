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
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // We only want the horizontal scroll effect on desktop to avoid breaking mobile touch scrolling
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track) return;
      
      // Calculate how far to move the track
      // The total width of the track minus the viewport width
      const scrollDistance = track.scrollWidth - window.innerWidth;
      
      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
    
    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      data-bg="lilac"
      id="in-a-bit"
      className="relative text-ink lg:h-screen overflow-hidden"
      ref={containerRef}
    >
      {/* 
        On desktop, we use flex-row so the items flow horizontally off screen.
        On mobile, we stack them vertically.
      */}
      <div 
        ref={trackRef} 
        className="flex flex-col lg:flex-row lg:h-full lg:items-center py-24 px-6 lg:py-0 lg:px-0 lg:w-max"
      >
        
        {/* Panel 1: Section header */}
        <div className="lg:w-[40vw] lg:pl-[7vw] lg:pr-[4vw] flex-shrink-0 mb-16 lg:mb-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/80 mb-6 block">
            06 — {project.tags.join(" · ")}
          </span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight mb-6 max-w-3xl">
            {project.title}
          </h2>
          <p className="font-body text-base lg:text-lg leading-relaxed text-ink/80 max-w-md">
            {project.description}
          </p>
          <div className="mt-16 pt-8 border-t border-ink/[0.12] max-w-xs">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/70">
              Prototype built in Figma
            </p>
          </div>
        </div>

        {/* Panel 2: Wireframes */}
        <div className="lg:w-[35vw] flex-shrink-0 mb-16 lg:mb-0 lg:pr-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/70 mb-6 block">
            Early Thinking
          </span>
          <div className="flex gap-4 lg:gap-8">
            {siteAssets.inABit.wireframes.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 lg:w-64 border border-ink/[0.12] rounded-[2px] overflow-hidden bg-white/40"
              >
                <img
                  src={src}
                  alt={`In-A-Bit wireframe ${i + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3...N: Final Screens */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 lg:pr-[10vw]">
          <div className="hidden lg:block self-center mr-4">
             <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/70 origin-bottom-left -rotate-90 block absolute -ml-12 mt-12">
               Final Screens
             </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/70 mb-2 block lg:hidden">
            Final Screens
          </span>
          
          {siteAssets.inABit.screens.map((src, i) => (
            <div
              key={i}
              className="relative w-full lg:w-[28vw] max-w-[320px] flex-shrink-0"
            >
              {/* Phone frame */}
              <div className="bg-white rounded-[24px] p-2 shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-ink/[0.06] transition-transform hover:-translate-y-2 duration-500">
                {/* Screen notch */}
                <div className="relative rounded-[18px] overflow-hidden bg-ink/5">
                  <img
                    src={src}
                    alt={`In-A-Bit app screen ${i + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              {/* Screen label */}
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/70 mt-6 text-center lg:text-left">
                Screen {String(i + 1).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
