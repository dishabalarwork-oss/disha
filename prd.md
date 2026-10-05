# PRD — Disha Balar Portfolio Website

**Owner:** Disha Balar
**Type:** Personal portfolio, single-page scrolling site
**Status:** Draft v1
**Last updated:** 5 Oct 2026

---

## 1. Summary

A single-page, scroll-driven portfolio that presents Disha as a communication designer with a marketing and branding mindset. The site behaves like an interactive editorial zine: collage compositions, colour-shifting sections and restrained motion, with each project given its own visual world.

## 2. Goals

| # | Goal | How we'll know |
|---|---|---|
| G1 | Land internships and entry-level roles in branding, marketing and design | Recruiters can find work, contact info and résumé within 30 seconds |
| G2 | Show design skill *and* brand thinking | Each project shows problem → decision → outcome |
| G3 | Stand out from template portfolios | Memorable scroll experience; distinct visual identity |
| G4 | Work reliably everywhere | Smooth on mid-range phones; loads fast |

**Non-goals (v1):** blog, CMS, e-commerce, user accounts, multi-page case study site, WebGL/3D, physics interactions.

## 3. Audience

| Persona | Needs |
|---|---|
| **Recruiter / hiring manager** (brand agencies, marketing teams, startups) | Quick scan: who, what, proof, contact. Likely on desktop, some on mobile (via LinkedIn link). |
| **Design lead / creative director** | Craft: typography, layout, process thinking |
| **Faculty / peers / collaborators** | Range of work, personality |
| **Brands (modelling/freelance enquiries)** | Modelling work and contact |

## 4. Positioning

> A communication designer who understands how creative work grows a brand.

Supporting proof: business-family upbringing, hands-on project management (Brand Buzzer), social media (Daintea), video editing (Atlas SkillTech), plus design projects.

## 5. Content Inventory (from résumé)

**Profile:** Third-year B.Des Communication Design student (Atlas SkillTech University, 2024 to 2028). Interest in marketing and branding. Tools: Photoshop, Illustrator, Canva, CapCut, InShot.

**Selected work**
1. **Meghalaya** — place-branding logo identity inspired by living root bridges, forests, rivers and landscape
2. **The Wirewood** — reimagined Game of Thrones publication after the fall of the Night King; editorial storytelling, experimental layouts
3. **In-A-Bit** — productivity app concept turning "in-between" time into quick, time-based activities (Figma: https://www.figma.com/design/e84vmtVzPHkx4pfPppQYzB/in-a-bit)

**Experience**
- Project Manager, Brand Buzzer (Jaipur), May to Sep 2026
- Social Media Intern, Daintea, Jan to Mar 2026
- Freelance Video Editor, Atlas SkillTech University, May to Jul 2025

**Modelling**
- Nif Global (ramp walk), Rawayi (brand shoot), FAD University (shoot), 5 to 6 freelance assignments

**Skills:** Design & editing tools; content & marketing; project coordination, modelling, visual storytelling; communication, time management, adaptability

**Contact:** dishabalarwork@gmail.com, +91 9602422657, Andheri East, Mumbai (decide what to show publicly; see Open Questions)

## 6. Information Architecture

Single page, 10 sections in order:

1. Hero
2. Positioning / About
3. Selected Work (title card)
4. Project: Meghalaya (or Wirewood first, see Open Questions)
5. Project: The Wirewood
6. Project: In-A-Bit
7. Experience
8. Modelling
9. I Work With (Skills)
10. Contact + signature

Persistent: minimal top nav with anchor links, optional scroll progress.

## 7. Functional Requirements

### 7.1 Must have (P0)
| ID | Requirement |
|---|---|
| F1 | Single-page scroll with all 10 sections |
| F2 | Background colour transitions between sections |
| F3 | Text reveal and image reveal animations on scroll |
| F4 | Project sections with images, one-line problem statement, role, tools |
| F5 | Sticky year marker in Experience section |
| F6 | Anchor navigation (fixed top bar) that scrolls to sections |
| F7 | Contact section with mailto link, phone, social links |
| F8 | Downloadable résumé PDF |
| F9 | Fully responsive layouts (desktop, tablet, mobile), recomposed not shrunk |
| F10 | `prefers-reduced-motion` support |
| F11 | SEO basics: title, meta description, OG image, favicon |

### 7.2 Should have (P1)
| ID | Requirement |
|---|---|
| F12 | Project hover states (zoom, label) |
| F13 | Custom cursor with contextual labels (desktop only) |
| F14 | Parallax on collage and modelling sections |
| F15 | In-A-Bit phone screens slide on scroll |
| F16 | Meghalaya logo expand-into-system sequence |
| F17 | Click on project opens expanded case study overlay or scrolls to detail |
| F18 | Page loader / intro (short, under 2s) |
| F19 | Analytics (page views, scroll depth, contact clicks, résumé downloads) |

### 7.3 Nice to have (P2)
| ID | Requirement |
|---|---|
| F20 | Signature draw animation in footer |
| F21 | Subtle grain overlay |
| F22 | Draggable stickers / easter eggs (max 2 to 3) |
| F23 | Embedded short interaction video for In-A-Bit prototype |
| F24 | Light/dark variant toggle (probably skip) |

## 8. Section Requirements

| Section | Must show | Success criteria |
|---|---|---|
| Hero | Name, positioning line, identity object | Visitor knows who she is and what she does in 3 seconds |
| Positioning | Brand statement, 3 to 4 line intro | Under 60 words; memorable |
| Meghalaya | Logo, colour, type, 3+ applications, concept rationale | Reads as a complete identity system |
| Wirewood | Cover, spreads, typography details | Shows editorial range and layout craft |
| In-A-Bit | Problem, flow/wireframes, 4+ final screens, key interaction | Shows UX thinking, not just screens |
| Experience | 3 roles with 1 to 2 line impact each | Scannable; years sticky |
| Modelling | 6 to 9 images with brand names | Looks like a fashion editorial |
| Skills | 4 grouped clusters, no ratings | Clear in under 10 seconds |
| Contact | Email (primary), social links, résumé | One-click contact |

## 9. Non-Functional Requirements

| Area | Target |
|---|---|
| Performance | LCP < 2.5s on 4G; total initial payload < 3 MB; images lazy-loaded and in WebP/AVIF |
| Smoothness | 60fps scroll on mid-range Android; fall back animations if not |
| Browsers | Latest Chrome, Safari, Edge, Firefox; iOS Safari and Android Chrome |
| Accessibility | WCAG 2.1 AA, keyboard navigable, reduced-motion support |
| SEO | Semantic HTML, meta + OG tags, sitemap, index-able text |
| Privacy | No unnecessary tracking; cookie-light analytics |
| Hosting | HTTPS, custom domain, 99.9% uptime (platform default) |

## 10. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Animation-heavy page is slow on phones | Simplify on mobile; compress images; test early on a real mid-range phone |
| Spending too long on effects and not on project quality | Follow build order: static first, motion later |
| Case studies too thin | Each project: problem, decision, outcome, 4+ visuals |
| Phone number and location public | Show email only on the page; phone on résumé PDF (decision needed) |
| Modelling dilutes the design/marketing positioning | Place after Experience, frame it as brand/image-making experience |
| Figma project not directly accessible to tooling | Export frames as PNG/WebP and prototype clip manually |
| Builder platform lock-in | Keep all assets and copy in a local folder; export where possible |

## 11. Milestones

| Phase | Deliverable | Est. effort |
|---|---|---|
| 0. Content | Final copy + all assets exported and named | 3 to 4 days |
| 1. Art direction | Palette, fonts, grid, image treatment, 1 hero + 1 section mock in Figma | 2 to 3 days |
| 2. Static build | Entire page without animation, desktop + mobile | 4 to 5 days |
| 3. Core motion | Background transitions, reveals, sticky elements | 2 to 3 days |
| 4. Personality | Cursor, hovers, signature, stickers | 2 days |
| 5. Polish and QA | Performance, accessibility, cross-browser, real-device test | 2 to 3 days |
| 6. Launch | Domain, SEO, analytics, share on LinkedIn / résumé | 1 day |

Target: ~3 to 4 weeks at part-time pace.

## 12. Success Metrics (first 60 days)

- 100% of applications include the portfolio link
- Average time on page > 90s; scroll depth to Contact > 50%
- ≥ 5 résumé downloads or contact clicks from non-friend traffic
- Lighthouse: Performance ≥ 85 mobile, Accessibility ≥ 95
- Qualitative: 3 designers or mentors give feedback and say it feels distinct

## 13. Open Questions

1. Which project leads: Meghalaya (strongest for branding roles) or Wirewood (most visual)?
2. Public contact details: email only, or also phone and locality?
3. Social links to include (Instagram, LinkedIn, Behance)? Handles needed.
4. Do you have outcomes, numbers or client feedback from Brand Buzzer, Daintea, Atlas SkillTech to add proof?
5. Modelling images: do you have usage rights/permissions for brand shoot photos?
6. In-A-Bit: please export key frames from Figma (the Figma link can't be read automatically), or share screenshots so copy and layout can be tailored.
7. Custom domain preference (e.g. dishabalar.com / .design)?
8. Brand voice: more playful or more polished?
