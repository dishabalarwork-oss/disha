"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Map color names to their actual hex values to ensure GSAP can animate them correctly
// (GSAP sometimes struggles animating directly to var(--...) strings depending on setup)
const colorMap: Record<string, string> = {
  ink: "#3D1C24",
  ivory: "#FDF5E1",
  coral: "#DE5336",
  lilac: "#B4D3E6",
  lime: "#B0A5C6",
};

export default function GSAPManager() {
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    // Disable browser's automatic scroll restoration so page always starts at the top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    
    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // 1. Background color transitions
    const sections = gsap.utils.toArray<HTMLElement>("section[data-bg]");
    
    sections.forEach((section, i) => {
      const colorName = section.getAttribute("data-bg") || "ivory";
      const targetColor = colorMap[colorName] || colorMap.ivory;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => gsap.to("body", { backgroundColor: targetColor, duration: prefersReducedMotion ? 0 : 0.8, overwrite: "auto" }),
        onEnterBack: () => gsap.to("body", { backgroundColor: targetColor, duration: prefersReducedMotion ? 0 : 0.8, overwrite: "auto" }),
      });

      // Set initial body color to match first section
      if (i === 0) {
        gsap.set("body", { backgroundColor: targetColor });
      }
    });

    if (prefersReducedMotion) return;

    // 2. Text reveals (Headings)
    const headings = gsap.utils.toArray<HTMLElement>("h1, h2, h3");
    headings.forEach((heading) => {
      // Don't animate the interactive hero h1 or elements with no-reveal
      if (heading.closest('#hero') || heading.classList.contains('no-reveal')) return;
      
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    // 3. Body text reveals
    const texts = gsap.utils.toArray<HTMLElement>("p, li");
    texts.forEach((text) => {
      // Don't animate hero text
      if (text.closest('#hero')) return;

      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 95%",
        },
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    });

    // 4. Image reveals (Clip path mask) + Inner Parallax
    const images = gsap.utils.toArray<HTMLElement>("img");
    images.forEach((img) => {
      const parent = img.parentElement;
      if (!parent || parent.classList.contains("no-reveal") || img.closest('#hero')) return;
      
      // The reveal animation
      gsap.fromTo(
        parent,
        { clipPath: "inset(20% 0% 20% 0%)", scale: 0.95 },
        {
          scrollTrigger: {
            trigger: parent,
            start: "top 95%",
          },
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.2,
          ease: "power3.inOut",
        }
      );

      // The continuous inner parallax effect on scroll
      // We make the image slightly taller (scale 1.1) and move it up/down as we scroll
      gsap.set(img, { scale: 1.15, transformOrigin: "center center" });
      gsap.fromTo(
        img,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  });

  return null;
}
