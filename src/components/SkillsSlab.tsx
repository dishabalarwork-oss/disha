"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "GRAPHIC-DESIGN",
  "MODEL",
  "PHOTOGRAPHER",
  "PRODUCT-MANAGER",
  "SOCIAL-MEDIA",
  "BRANDING",
  "MARKETING",
];

const taglines: Record<string, string> = {
  "GRAPHIC-DESIGN": "Turning briefs into visual systems that communicate.",
  "MODEL": "Bringing concepts to life in front of the lens.",
  "PHOTOGRAPHER": "Capturing moments with intention and clarity.",
  "PRODUCT-MANAGER": "Coordinating teams, timelines and deliverables.",
  "SOCIAL-MEDIA": "Building presence through content and consistency.",
  "BRANDING": "Shaping identities that feel intentional and memorable.",
  "MARKETING": "Connecting strategy with creative storytelling.",
};

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&+-";
const MAX_TILES = Math.max(...skills.map((s) => s.length));

/** Pad skill with hyphens, centered */
function padSkill(skill: string): string {
  const padding = MAX_TILES - skill.length;
  const left = Math.floor(padding / 2);
  const right = padding - left;
  return "-".repeat(left) + skill + "-".repeat(right);
}

const paddedSkills = skills.map(padSkill);

export default function SkillsSlab() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const currentIndexRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isInViewRef = useRef(false);

  function scrambleTo(targetIndex: number) {
    if (targetIndex === currentIndexRef.current && !animFrameRef.current) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const targetChars = paddedSkills[targetIndex].split("");
    const startChars = tileRefs.current.map((el) => el?.textContent || "-");

    const totalDuration = 450;
    const staggerPerTile = 25;
    const startTime = performance.now();

    // Fade out tagline immediately
    if (taglineRef.current) {
      taglineRef.current.style.opacity = "0";
      taglineRef.current.style.transform = "translateY(6px)";
    }

    function tick() {
      const elapsed = performance.now() - startTime;
      let allSettled = true;

      for (let i = 0; i < MAX_TILES; i++) {
        const el = tileRefs.current[i];
        if (!el) continue;

        const tileDelay = i * staggerPerTile;
        const tileElapsed = elapsed - tileDelay;

        if (tileElapsed >= totalDuration) {
          el.textContent = targetChars[i];
        } else if (tileElapsed > 0) {
          allSettled = false;
          el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          allSettled = false;
          el.textContent = startChars[i];
        }
      }

      if (allSettled) {
        targetChars.forEach((char, i) => {
          const el = tileRefs.current[i];
          if (el) el.textContent = char;
        });
        currentIndexRef.current = targetIndex;
        if (counterRef.current) {
          counterRef.current.textContent = `No. ${String(targetIndex + 1).padStart(3, "0")} / ${String(skills.length).padStart(3, "0")}`;
        }
        // Fade in new tagline
        if (taglineRef.current) {
          taglineRef.current.textContent = taglines[skills[targetIndex]];
          requestAnimationFrame(() => {
            if (taglineRef.current) {
              taglineRef.current.style.opacity = "1";
              taglineRef.current.style.transform = "translateY(0)";
            }
          });
        }
        animFrameRef.current = null;
      } else {
        animFrameRef.current = requestAnimationFrame(tick);
      }
    }

    animFrameRef.current = requestAnimationFrame(tick);
  }

  function startCycling() {
    if (cycleTimerRef.current) return;
    cycleTimerRef.current = setInterval(() => {
      if (!isInViewRef.current) return;
      const next = (currentIndexRef.current + 1) % skills.length;
      scrambleTo(next);
    }, 2200);
  }

  function stopCycling() {
    if (cycleTimerRef.current) {
      clearInterval(cycleTimerRef.current);
      cycleTimerRef.current = null;
    }
  }

  // Set initial tile text on mount
  useEffect(() => {
    const initial = paddedSkills[0].split("");
    initial.forEach((char, i) => {
      const el = tileRefs.current[i];
      if (el) el.textContent = char;
    });
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      stopCycling();
    };
  }, []);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          isInViewRef.current = true;
          startCycling();
        },
        onLeave: () => {
          isInViewRef.current = false;
          stopCycling();
        },
        onEnterBack: () => {
          isInViewRef.current = true;
          startCycling();
        },
        onLeaveBack: () => {
          isInViewRef.current = false;
          stopCycling();
        },
      });
    },
    { scope: containerRef }
  );

  const initialChars = paddedSkills[0].split("");

  return (
    <section
      id="skills-counter"
      data-bg="coral"
      ref={containerRef}
      style={{ background: "var(--coral)" }}
      className="relative py-20 md:py-32 overflow-hidden flex flex-col items-center"
    >
      {/* Counter badge */}
      <div
        style={{
          background: "#1A0E12",
          color: "#F5F0E8",
          padding: "5px 14px",
          borderRadius: "4px",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "9px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "clamp(20px, 3.5vw, 40px)",
        }}
      >
        <span ref={counterRef}>No. 001 / {String(skills.length).padStart(3, "0")}</span>
      </div>

      {/* Split-flap display board */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(3px, 0.4vw, 6px)",
          padding: "clamp(12px, 2vw, 24px) clamp(14px, 2.5vw, 32px)",
          background: "rgba(0,0,0,0.12)",
          borderRadius: "8px",
          boxShadow:
            "inset 0 2px 8px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        {initialChars.map((char, i) => (
          <div
            key={i}
            style={{
              width: "clamp(18px, 4vw, 64px)",
              height: "clamp(28px, 6vw, 96px)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F5F0E8",
              borderRadius: "4px",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.15)",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* Horizontal split seam */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "1px",
                background: "rgba(0,0,0,0.1)",
                zIndex: 2,
              }}
            />
            {/* Top half shadow */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                background: "rgba(0,0,0,0.025)",
                zIndex: 1,
              }}
            />
            {/* The letter */}
            <span
              ref={(el) => {
                tileRefs.current[i] = el;
              }}
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(12px, 3.2vw, 50px)",
                fontWeight: 700,
                lineHeight: 1,
                color: "#1A0E12",
                position: "relative",
                zIndex: 1,
              }}
            >
              {char}
            </span>
          </div>
        ))}
      </div>

      {/* Dynamic tagline — changes per skill */}
      <p
        ref={taglineRef}
        style={{
          marginTop: "clamp(20px, 3vw, 40px)",
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "clamp(13px, 1.6vw, 20px)",
          color: "#FDF5E1",
          letterSpacing: "0.01em",
          textAlign: "center",
          maxWidth: "480px",
          lineHeight: 1.5,
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {taglines[skills[0]]}
      </p>
    </section>
  );
}
