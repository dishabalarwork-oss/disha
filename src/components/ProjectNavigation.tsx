"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface ProjectNavigationProps {
  prevProject?: { title: string; route: string };
  nextProject?: { title: string; route: string };
}

export default function ProjectNavigation({ prevProject, nextProject }: ProjectNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.from(".proj-nav-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <section 
      data-bg="ivory"
      className="py-24 px-6 lg:px-[7vw] border-t border-ink/10"
      ref={containerRef}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
        
        {/* Previous */}
        <div className="proj-nav-item flex-1 flex justify-start w-full md:w-auto">
          {prevProject && (
            <a href={prevProject.route} className="group flex flex-col items-start gap-2 outline-none">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/50 transition-colors group-hover:text-ink/80">
                Previous
              </span>
              <span className="font-display text-3xl md:text-4xl text-ink tracking-tight flex items-center gap-4">
                <span className="text-ink/0 -translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-0 group-hover:text-ink">←</span>
                <span className="-ml-8 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-8">{prevProject.title}</span>
              </span>
            </a>
          )}
        </div>

        {/* All Works */}
        <div className="proj-nav-item flex-shrink-0">
          <a href="/#work" className="group font-mono text-[10px] uppercase tracking-[0.15em] text-ink/70 hover:text-ink px-6 py-3 rounded-full border border-ink/20 hover:border-ink/40 transition-all flex items-center gap-2">
            <span>Grid</span>
            <span className="w-1 h-1 rounded-full bg-ink/70 group-hover:bg-ink" />
            <span className="w-1 h-1 rounded-full bg-ink/70 group-hover:bg-ink" />
            <span className="w-1 h-1 rounded-full bg-ink/70 group-hover:bg-ink" />
          </a>
        </div>

        {/* Next */}
        <div className="proj-nav-item flex-1 flex justify-end w-full md:w-auto text-right">
          {nextProject && (
            <a href={nextProject.route} className="group flex flex-col items-end gap-2 outline-none">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/50 transition-colors group-hover:text-ink/80">
                Next
              </span>
              <span className="font-display text-3xl md:text-4xl text-ink tracking-tight flex items-center gap-4">
                <span className="-mr-8 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-x-8">{nextProject.title}</span>
                <span className="text-ink/0 translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-0 group-hover:text-ink">→</span>
              </span>
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
