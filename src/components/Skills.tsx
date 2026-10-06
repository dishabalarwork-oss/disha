"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SKILLS = [
  { name: "Brand & Visual Identity", top: "20%", left: "22%" },
  { name: "Strategy", top: "12%", left: "48%" },
  { name: "Art Direction", top: "24%", left: "78%" },
  { name: "UI/UX Design", top: "45%", left: "85%" },
  { name: "Prototyping", top: "68%", left: "82%" },
  { name: "Video Editing", top: "85%", left: "68%" },
  { name: "Social Media", top: "88%", left: "38%" },
  { name: "Copywriting", top: "72%", left: "15%" },
  { name: "Photoshop", top: "52%", left: "10%" },
  { name: "Illustrator", top: "35%", left: "12%" },
  { name: "Figma", top: "75%", left: "55%" },
  { name: "CapCut", top: "28%", left: "62%" },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Heading smoothly settles into position
    tl.from(headingRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Pills spread outward from the center
    pillsRef.current.forEach((pill, i) => {
      if (!pill) return;
      
      // Calculate distance from center to create a subtle outward explosion effect
      // By using a random starting offset, it feels more organic
      const randomX = (Math.random() - 0.5) * -100;
      const randomY = (Math.random() - 0.5) * -100;
      
      // We move them 50% closer to the center initially
      tl.from(
        pill,
        {
          x: (gsap.getProperty(pill, "left", "vw") as number) < 50 ? 50 : -50 + randomX,
          y: (gsap.getProperty(pill, "top", "vh") as number) < 50 ? 50 : -50 + randomY,
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "<0.1" + (i * 0.05) // Staggered start slightly after heading
      );
    });
  }, { scope: containerRef });

  return (
    <section
      data-bg="ivory"
      id="skills"
      ref={containerRef}
      className="relative text-ink min-h-[90vh] md:min-h-screen py-24 px-6 overflow-hidden flex items-center justify-center bg-ivory"
    >
      <div className="absolute top-12 left-6 lg:left-[7vw]">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/60 block">
          08 — Skills
        </span>
      </div>

      <div className="relative w-full max-w-6xl aspect-[4/5] md:aspect-video flex items-center justify-center">
        
        {/* Central Heading */}
        <div className="z-10 text-center max-w-2xl px-8 pointer-events-none">
          <h2 
            ref={headingRef}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight no-reveal"
          >
            What I Work With
          </h2>
        </div>

        {/* Orbiting Pills */}
        {SKILLS.map((skill, index) => (
          <div
            key={skill.name}
            ref={(el) => { pillsRef.current[index] = el; }}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full border border-ink/10 bg-ink/5 backdrop-blur-sm text-ink whitespace-nowrap font-body text-xs md:text-sm lg:text-base z-20 hover:bg-ink hover:text-ivory transition-colors duration-300 cursor-default"
            style={{ 
              top: skill.top, 
              left: skill.left,
            }}
          >
            {skill.name}
          </div>
        ))}
      </div>
    </section>
  );
}
