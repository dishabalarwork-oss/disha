# TECH STACK — Disha Balar Portfolio

> Goal: ship a high-impact, animated, single-page portfolio **without** needing to become a front-end engineer first.

---

## 1. Decision

**Primary: Framer.**
**Alternate (if you want the exact zine feel): Readymag.**
**Code route (only if you want to learn): Next.js + GSAP + Lenis.**

### Why Framer
| Need | Framer |
|---|---|
| Designer-friendly, Figma-like canvas | Yes, and Figma paste works |
| Scroll-triggered animation, sticky, parallax, scroll-linked effects | Built in (scroll transforms, appear effects, sticky) |
| Hover states, variants, component interactions | Built in |
| Custom fonts (Instrument Serif, Manrope, Plex Mono) | Google Fonts built in |
| Responsive breakpoints | Native, per-breakpoint recomposition |
| Custom cursor, signature draw, special effects | Via code components / embeds (copy-paste snippets) |
| Hosting, SSL, custom domain, SEO settings | Included |
| Learning curve | Low, since Photoshop/Illustrator/Figma skills transfer |

Covers roughly **80 to 90%** of the intended experience with minimal code.

### When to choose the others
| Option | Choose if | Trade-off |
|---|---|---|
| **Readymag** | Priority is the art-directed, InDesign-like collage feel; very little code | Weaker SEO, less performant, less control over responsive and code |
| **Webflow** | You want to show production-grade web skills; need CMS later | Steeper learning curve; interactions panel is fiddly |
| **Next.js + GSAP** | You want maximum control and to learn code | Slowest to ship; needs dev skills; overkill for v1 |

---

## 2. Recommended Stack (Framer route)

| Layer | Tool | Notes |
|---|---|---|
| Design | **Figma** | Moodboard, type/colour tests, mobile + desktop mockups. Keep In-A-Bit source here. |
| Build + host | **Framer** | Pro/Basic site plan needed for custom domain |
| Fonts | Google Fonts via Framer | Instrument Serif, Manrope, IBM Plex Mono |
| Images | Export WebP from Figma/Photoshop | Max 2000px wide for large; 1200px for others; keep under ~300 KB each |
| Video | Short MP4/WebM clips (under 5 MB each) | In-A-Bit prototype loop, Wirewood flip-through. Muted, autoplay, loop, playsinline |
| Icons/stickers | SVG from Illustrator | Inline for crispness |
| Logo / signature | SVG | Meghalaya logo as SVG; signature as SVG path for draw animation |
| Custom code | Framer code components / custom code overrides | Cursor, grain overlay, signature draw |
| Analytics | **Plausible** or **Google Analytics 4** (Framer has built-in analytics too) | Track scroll depth, contact clicks, résumé downloads |
| Domain | Namecheap / GoDaddy / Google Domains replacement | Point to Framer |
| Forms (optional) | Framer native form or Formspark | A mailto link is enough for v1 |

---

## 3. Feature → Implementation Map (Framer)

| Feature | How |
|---|---|
| Background colour shifts | Section backgrounds with scroll-linked colour via "Scroll transform" or per-section fill with appear effects; or use a fixed background layer whose fill changes by section (code override) |
| Text reveal (line by line) | Appear effect: opacity + translate; use split-line text component, stagger |
| Image mask reveal | Wrap in a frame with overflow hidden, animate inner scale/position, or clip-path via Appear |
| Parallax | Scroll transform on layers with different speeds (Y offset) |
| Sticky year marker | Sticky positioning on the year layer inside a tall container |
| In-A-Bit screen slider | Scroll-linked horizontal translate inside a pinned/sticky stage |
| Meghalaya logo sequence | Scroll-linked scale 0.1 → 1, then variant swap or fade-in of system pieces |
| Project hover | Component variants with hover transitions (scale 1.03, label slide) |
| Custom cursor | Framer custom cursor component (free community versions) or small code override |
| Grain overlay | Fixed full-screen frame with noise PNG at 4% opacity (pointer-events none) |
| Signature draw | SVG stroke-dashoffset animation via code component or Lottie |
| Reduced motion | Disable effects via media query in custom code or use Framer's reduce-motion setting on effects |
| Project overlay | Overlay component triggered on tap/click, with close button |

---

## 4. Alternate Stack: Readymag

- Use its On-scroll animation (move, opacity, rotate, scale, multi-step), custom cursors and draggable widgets
- Build a separate mobile layout
- Caveats: limited SEO/indexability of text, heavier load, harder to hit performance targets. Fine for a visual showcase, less ideal for recruiter discoverability. If chosen, still add a plain-text résumé PDF and a good title/description.

---

## 5. Code Route (optional, for later or if you want to learn)

```text
Next.js (App Router) + TypeScript
├── Tailwind CSS ............ styling, design tokens
├── GSAP + ScrollTrigger .... pinning, scrub, reveals
├── Lenis ................... smooth scroll (optional)
├── Framer Motion ........... component-level transitions (optional)
├── next/image .............. image optimisation
├── next/font ............... self-hosted fonts
├── Lottie / SVG ............ signature, stickers
└── Vercel .................. hosting, preview deploys
```

**Suggested folder structure**
```text
/app
  layout.tsx
  page.tsx
/components
  Hero.tsx  Positioning.tsx  Work.tsx
  Project/Meghalaya.tsx  Project/Wirewood.tsx  Project/InABit.tsx
  Experience.tsx  Modelling.tsx  Skills.tsx  Contact.tsx
  Cursor.tsx  Grain.tsx  Nav.tsx
/lib
  gsap.ts  lenis.ts  tokens.ts
/public
  /images  /video  /svg  resume.pdf
/styles
  globals.css
```

**Design tokens (CSS variables)**
```css
:root{
  --ink:#171717; --ivory:#F4F0E8; --coral:#E85D4A;
  --lilac:#B9A7E8; --lime:#D8F36A; --white:#FFFFFF;
  --font-display:"Instrument Serif",serif;
  --font-body:"Manrope",sans-serif;
  --font-mono:"IBM Plex Mono",monospace;
  --ease:cubic-bezier(.22,1,.36,1);
}
@media (prefers-reduced-motion: reduce){
  *{animation:none!important;transition:none!important}
}
```

Only choose this if you're ready to spend extra weeks on code; the design and content matter more than the stack.

---

## 6. Performance Budget

| Metric | Budget |
|---|---|
| Initial page weight | < 3 MB |
| Hero image | < 200 KB |
| Each project image | < 300 KB (WebP) |
| Videos | < 5 MB each, lazy-loaded |
| Fonts | ≤ 3 families, ≤ 5 weights total, `font-display: swap` |
| Lighthouse (mobile) | Perf ≥ 85, A11y ≥ 95, SEO ≥ 95 |
| Simultaneous animations per viewport | ≤ 3 |

Tactics: lazy-load below-the-fold media, use WebP/AVIF, compress video, avoid heavy blur/backdrop-filter, limit parallax layers, disable parallax on mobile.

---

## 7. Accessibility and SEO Checklist

- [ ] One H1 (name), ordered H2s per section
- [ ] Alt text on every image
- [ ] Reduced-motion fallback tested
- [ ] Focus states visible; tab order logical
- [ ] Contrast checked per background (Coral, Lilac, Ink)
- [ ] Meta title/description, OG image (1200×630), favicon
- [ ] Real text for headings and body (not images)
- [ ] Sitemap + robots (auto in Framer)
- [ ] Résumé PDF named `Disha-Balar-Resume.pdf`

---

## 8. Workflow and Tooling

| Step | Tool |
|---|---|
| Moodboard / refs | Pinterest, Are.na, or Figma board |
| Layout + mobile mocks | Figma |
| Asset export | Figma / Photoshop / Illustrator |
| Build | Framer |
| Testing | Chrome DevTools, real iPhone + Android, BrowserStack (optional) |
| Audit | Lighthouse, WAVE, Contrast checker |
| Feedback | Share Framer preview link with 3 to 5 designers/mentors |
| Backup | Local `/assets` folder + copy of final copy in a doc |

**Build order:** Art direction → static page → core transitions → personality → polish → mobile recomposition → launch.

---

## 9. Cost Estimate (approximate, check current pricing)

| Item | Cost |
|---|---|
| Framer site plan (custom domain) | Paid monthly/yearly plan (see framer.com/pricing) |
| Domain | ~₹800–1,500/year |
| Fonts | Free (Google Fonts) |
| Analytics | Free (Plausible trial / GA4 / Framer analytics) |
| Readymag (alt.) | Paid plan needed for custom domain |
| Next.js + Vercel (alt.) | Free tier works for a portfolio |

---

## 10. Open Technical Questions

1. Framer or Readymag: which matters more, SEO/performance or the exact zine feel?
2. Domain name preference?
3. Do you want a contact form or just mailto?
4. Analytics: privacy-friendly (Plausible) or free (GA4)?
5. Will you add a CMS later (more projects, blog)? If yes, Framer CMS or Webflow become more attractive.
