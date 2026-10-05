"use client";

import { useRef } from "react";
import gsap from "gsap";
import { siteContent } from "@/content/site";
import { siteAssets } from "@/content/assets";

// ============================================================================
// CONFIGURATION FOR NAME HOVER INTERACTION
// ============================================================================
// 1. Control the interaction physics here:
const hoverConfig = {
  hoverSensitivity: 40,        // Minimum pixels cursor must move before next image appears
  imageDisplayDuration: 1.8,   // How long image stays visible before fading out (seconds)
  animationSpeed: 0.8,         // Fade and scale transition duration (seconds)
  minRotation: -35,            // Minimum random rotation (degrees)
  maxRotation: 35,             // Maximum random rotation (degrees)
  minScale: 0.7,               // Minimum random scale (relative to base size)
  maxScale: 1.1,               // Maximum random scale
  minScatterDistance: 100,     // Safe zone radius around cursor (prevents covering text)
  maxScatterDistance: 300,     // Maximum distance images can spawn away from cursor
  maxConcurrentImages: 30,     // Size of the DOM pool (how many images can exist on screen at once)
};

// 2. Control the images assigned to each letter here:
// Simply replace the paths with your actual photographs later.
// Add as many or as few images per letter as you want!
const letterData = [
  { char: "D", images: ["/images/photos/basic1.jpeg", "/images/photos/basic2.jpeg"] },
  { char: "I", images: ["/images/photos/basic3.jpeg", "/images/photos/basic4.jpeg"] },
  { char: "S", images: ["/images/photos/basic5.jpeg", "/images/photos/basic6.jpeg"] },
  { char: "H", images: ["/images/photos/basic7.jpeg", "/images/photos/basic8.jpeg"] },
  { char: "A", images: ["/images/photos/basic9.jpeg", "/images/photos/basic10.jpeg"] },
  { char: "B", images: ["/images/photos/basic1.jpeg", "/images/photos/basic3.jpeg"] },
  { char: "A", images: ["/images/photos/basic2.jpeg", "/images/photos/basic4.jpeg"] },
  { char: "L", images: ["/images/photos/basic5.jpeg", "/images/photos/basic7.jpeg"] },
  { char: "A", images: ["/images/photos/basic6.jpeg", "/images/photos/basic8.jpeg"] },
  { char: "R", images: ["/images/photos/basic9.jpeg", "/images/photos/basic10.jpeg"] }
];
// ============================================================================

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLImageElement[]>([]);
  const poolIndex = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });
  const zIndexCounter = useRef(100);
  
  // Track which images are currently visible on screen to prevent duplicates
  const activeImages = useRef<Set<string>>(new Set());

  // Initialize a fixed-size array for the image pool to prevent endless DOM creation
  const imagePool = Array.from({ length: hoverConfig.maxConcurrentImages });

  const handlePointerMove = (e: React.PointerEvent) => {
    const { clientX, clientY } = e;
    
    // Find the element exactly under the pointer (crucial for touch/drag interactions on mobile)
    const target = document.elementFromPoint(clientX, clientY);
    if (!target || !target.hasAttribute("data-letter-index")) return;

    const letterIndex = parseInt(target.getAttribute("data-letter-index") || "-1", 10);
    if (letterIndex === -1) return;

    const letterImages = letterData[letterIndex].images;
    if (!letterImages || letterImages.length === 0) return;

    // Filter out images that are currently visible on screen
    const availableImages = letterImages.filter((src) => !activeImages.current.has(src));
    
    // If all images for this letter are currently on screen, don't spawn anything!
    // This perfectly satisfies the "one photo should be visible only once" rule.
    if (availableImages.length === 0) return;

    // Check if pointer has moved enough distance since the last image appeared
    const dist = Math.hypot(clientX - lastPos.current.x, clientY - lastPos.current.y);
    if (dist > hoverConfig.hoverSensitivity) {
      lastPos.current = { x: clientX, y: clientY };

      // Grab the next image element from our pool
      const imgEl = poolRef.current[poolIndex.current];
      if (!imgEl) return;
      
      poolIndex.current = (poolIndex.current + 1) % hoverConfig.maxConcurrentImages;

      // Stop previous animations on this specific DOM node before reusing it
      gsap.killTweensOf(imgEl);
      
      // If this DOM node was previously displaying an image that didn't finish fading out,
      // we need to remove its old source from the active set since we are hijacking the node.
      const oldSrc = imgEl.getAttribute("src");
      if (oldSrc) {
        activeImages.current.delete(oldSrc);
      }

      // Pick a random image from the AVAILABLE (non-visible) array
      const randomImgSrc = availableImages[Math.floor(Math.random() * availableImages.length)];
      imgEl.src = randomImgSrc;
      
      // Mark this image as active
      activeImages.current.add(randomImgSrc);

      // Calculate organic scatter position around the cursor (Safe Zone logic)
      const angle = Math.random() * Math.PI * 2; // Random 360 degree direction
      // Random distance between the min (safe zone) and max boundary
      const distance = hoverConfig.minScatterDistance + Math.random() * (hoverConfig.maxScatterDistance - hoverConfig.minScatterDistance);
      
      const spawnX = clientX + Math.cos(angle) * distance;
      const spawnY = clientY + Math.sin(angle) * distance;

      // Randomize transform
      const rotation = hoverConfig.minRotation + Math.random() * (hoverConfig.maxRotation - hoverConfig.minRotation);
      const scale = hoverConfig.minScale + Math.random() * (hoverConfig.maxScale - hoverConfig.minScale);
      
      zIndexCounter.current += 1;

      // Set initial state at calculated scattered location
      gsap.set(imgEl, {
        x: spawnX,
        y: spawnY,
        xPercent: -50,
        yPercent: -50,
        rotation: rotation,
        scale: scale * 0.5,
        opacity: 0,
        zIndex: zIndexCounter.current,
        display: "block"
      });

      // Animate In
      gsap.to(imgEl, {
        scale: scale,
        opacity: 1,
        duration: hoverConfig.animationSpeed,
        ease: "power3.out",
      });

      // Animate Out automatically after delay
      gsap.to(imgEl, {
        scale: scale * 0.9, // gently shrink as it fades out
        opacity: 0,
        duration: hoverConfig.animationSpeed,
        delay: hoverConfig.imageDisplayDuration,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(imgEl, { display: "none" }); // hide completely when done
          // Image has faded out completely, free it up so it can be spawned again!
          activeImages.current.delete(randomImgSrc);
        }
      });
    }
  };

  return (
    <section
      data-bg="ivory"
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* GLOBAL IMAGE POOL (Rendered outside normal document flow, fixed on screen) */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        {imagePool.map((_, i) => (
          <img
            key={i}
            ref={(el) => {
              if (el) poolRef.current[i] = el;
            }}
            src=""
            alt=""
            className="absolute top-0 left-0 w-[70px] md:w-[100px] lg:w-[130px] h-auto object-cover rounded-sm shadow-xl hidden will-change-transform border border-ink/5"
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-50 flex flex-col items-center text-center px-4 w-full">
        
        {/* Subtitle */}
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.1em] text-ink/80 mb-6 lg:mb-10">
          Communication Design · Mumbai
        </p>

        {/* Interactive Name */}
        {/* touch-none prevents page scrolling ONLY when dragging across the name, allowing the interaction on mobile */}
        <h1 
          className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.85] tracking-tight mb-3 lg:mb-4 flex flex-wrap justify-center gap-x-[3vw] lg:gap-x-[4vw] cursor-crosshair touch-none"
          onPointerMove={handlePointerMove}
        >
          {/* Word 1: DISHA */}
          <span className="flex">
            {letterData.slice(0, 5).map((data, i) => (
              <span
                key={`word1-${i}`}
                data-letter-index={i}
                className="hover:text-coral transition-colors duration-500 select-none py-4"
              >
                {data.char}
              </span>
            ))}
          </span>
          {/* Word 2: BALAR */}
          <span className="flex">
            {letterData.slice(5, 10).map((data, i) => (
              <span
                key={`word2-${i}`}
                data-letter-index={i + 5}
                className="hover:text-coral transition-colors duration-500 select-none py-4"
              >
                {data.char}
              </span>
            ))}
          </span>
        </h1>

        {/* Minimal Hover Instruction */}
        <p className="font-mono text-[10px] md:text-xs lowercase tracking-[0.1em] text-ink/60 italic mb-8 lg:mb-12 select-none">
          psst… hover over my name
        </p>

        {/* Positioning Statement */}
        <p className="font-body text-lg md:text-xl lg:text-2xl text-ink/80 max-w-2xl px-6 leading-relaxed">
          {siteContent.hero.positioning}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:bottom-12 z-50">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/70">
          Scroll
        </span>
        <div className="w-px h-8 bg-ink/20" />
      </div>
    </section>
  );
}
