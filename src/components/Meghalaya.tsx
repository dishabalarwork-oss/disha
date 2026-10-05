"use client";

import { useRef, useState } from "react";
import { siteContent } from "@/content/site";
import { siteAssets } from "@/content/assets";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const project = siteContent.work.projects[0]; // Meghalaya

export default function Meghalaya() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = siteAssets.meghalaya.pages.length;

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;
    
    // We use a matchMedia so on mobile it falls back to native horizontal swipe
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 1024px)", () => {
      // Calculate how far to move the track horizontally
      const scrollDistance = track.scrollWidth - window.innerWidth;
      
      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}`, // The height of the pin matches the width of the scroll!
          pin: true,
          scrub: 1, // Smooth momentum scrub
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update the slide progress indicator
            const progress = self.progress;
            const slideIndex = Math.min(
              Math.max(1, Math.round(progress * totalSlides)),
              totalSlides
            );
            setCurrentSlide(slideIndex);
          }
        },
      });
    });
    
    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      data-bg="ivory"
      id="meghalaya"
      className="relative text-ink lg:h-screen bg-ivory"
      ref={containerRef}
    >
      {/* Progress Indicator (Fixed on Desktop) */}
      <div className="hidden lg:flex fixed bottom-12 left-[7vw] z-50 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/70">
        <span className="w-6 inline-block text-right">{String(currentSlide).padStart(2, "0")}</span>
        <span className="mx-2">/</span>
        <span>{String(totalSlides).padStart(2, "0")}</span>
      </div>

      {/* The scrolling track */}
      <div 
        ref={trackRef} 
        className="flex flex-col lg:flex-row lg:h-full lg:items-center py-24 px-6 lg:py-0 lg:px-0 lg:w-max overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none hide-scrollbar"
      >
        
        {/* Intro Panel */}
        <div className="lg:w-[45vw] lg:pl-[7vw] lg:pr-[8vw] flex-shrink-0 mb-20 lg:mb-0 snap-start">
          <h1 className="font-display text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.9] tracking-tight mb-6">
            MEGHALAYA
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/60 mb-8">
            Branding / Place Identity
          </p>
          <p className="font-body text-lg leading-relaxed text-ink/80 max-w-sm">
            {project.description}
          </p>
        </div>

        {/* Project Slides */}
        {siteAssets.meghalaya.pages.map((src, i) => (
          <div
            key={i}
            className="w-full lg:w-[80vw] h-auto lg:h-[80vh] flex-shrink-0 mb-12 lg:mb-0 lg:px-8 snap-center flex flex-col items-center justify-center"
          >
            {/* 
              Using object-contain prevents ANY cropping of the image. 
              The deterministic width (80vw) ensures track.scrollWidth is perfectly calculated on mount!
            */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={src}
                alt={`Meghalaya Slide ${i + 1}`}
                className="max-w-full max-h-full object-contain drop-shadow-md"
              />
            </div>
            
            {/* Mobile Progress Indicator (per slide) */}
            <p className="lg:hidden mt-6 font-mono text-[10px] tracking-[0.1em] text-ink/50">
              {String(i + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
            </p>
          </div>
        ))}
        
        {/* End padding block to ensure smooth exit */}
        <div className="hidden lg:block w-[10vw] flex-shrink-0" />
      </div>
      
    </section>
  );
}
