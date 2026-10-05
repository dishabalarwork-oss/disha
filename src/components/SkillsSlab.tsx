"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function SkillsSlab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slabRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const slab = slabRef.current;
    if (!slab) return;

    const pills = gsap.utils.toArray<HTMLElement>(".skill-pill");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    // Animate the slab container
    tl.fromTo(
      slab,
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    // Stagger animate the pills
    tl.fromTo(
      pills,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power2.out" },
      "-=0.4"
    );

  }, { scope: containerRef });

  // Minimal, clean pill design: uppercase mono, thin border, solid background for visibility
  const Pill = ({ text }: { text: string }) => (
    <span className="skill-pill font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] text-ink px-6 py-2 md:px-8 md:py-2.5 rounded-full border border-ink/20 bg-ivory shadow-sm">
      {text}
    </span>
  );

  return (
    <section
      data-bg="ivory"
      className="relative py-12 lg:py-20 overflow-hidden flex justify-center"
      ref={containerRef}
    >
      <div 
        ref={slabRef}
        className="w-full py-16 md:py-24 relative overflow-hidden border-y border-ink/10 flex justify-center items-center"
        style={{
          background: `repeating-linear-gradient(
            90deg, 
            #FDF5E1, 
            #FDF5E1 14px, 
            #DE5336 14px, 
            #DE5336 28px
          )`
        }}
      >
        
        {/* Minimal, balanced, centered arrangement with increased spacing */}
        <div className="relative z-10 flex flex-col items-center gap-y-6 md:gap-y-8 w-full max-w-6xl px-4">
          
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-10 w-full">
            <Pill text="graphic design" />
            <Pill text="model" />
            <Pill text="photographer" />
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-12 w-full">
            <Pill text="product manager" />
            <Pill text="social media intern" />
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-10 w-full">
            <Pill text="branding" />
            <Pill text="marketing" />
          </div>

        </div>
      </div>
    </section>
  );
}
