# DESIGN.md — Disha Balar Portfolio

> Single-page, scroll-driven editorial portfolio. Feels like a digital zine, not a résumé site.
> Principle: **70% design / 30% motion.** Every section has its own visual idea.

---

## 1. Creative Direction

**Concept:** "A designer who thinks like a marketer." The visitor scrolls through a sequence of small creative worlds, each showing a different skill, instead of one repeated template.

**Reference takeaways (Readymag-style zine):**
- Collage and editorial composition over rigid card grids
- Background colour changes act as section transitions ("the whole world changed")
- Contrast between dense collage sections and minimal "breathing" title cards
- Oversized display type against tiny metadata
- A closing signature/logo moment that loops back to the hero

**What we do differently:** the reference says "I'm an artist." This site says "I'm a designer who understands how creative work grows a brand." Work is framed by problem and outcome, not just visuals.

**Mood words:** editorial, warm, confident, playful-but-polished, tactile.

---

## 2. Colour System

| Token | Name | Hex | Use |
|---|---|---|---|
| `--ink` | Ink | `#171717` | Text, dark sections |
| `--ivory` | Warm Ivory | `#F4F0E8` | Default background |
| `--coral` | Coral | `#E85D4A` | Primary accent, positioning section |
| `--lilac` | Soft Lilac | `#B9A7E8` | Secondary accent, In-A-Bit section |
| `--lime` | Lime | `#D8F36A` | Small highlights only (stickers, hover) |
| `--white` | White | `#FFFFFF` | Cards, UI mockups |

**Background journey while scrolling:**
`Ivory → Coral → Ivory → Lilac → Ivory → Coral/Ink → Ivory → Ink → Ivory`

Rules:
- Never more than one accent as a full background at a time.
- Lime is a spice (under 3% of any screen).
- Text on Coral and Ink must pass WCAG AA (use Ivory text on Ink, Ink text on Coral).

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display | **Instrument Serif** | Headlines, section titles, italic for emphasis |
| Body | **Manrope** | 400/500/600 |
| Mono / metadata | **IBM Plex Mono** | Labels, years, project tags |
| Optional accent | Handwritten (Caveat or custom lettering) | One or two words max, e.g. "hi!" or signature |

**Type scale (desktop):**

| Level | Size |
|---|---|
| Hero statement | 80–120px |
| Section heading | 72–100px |
| Project title | 40–64px |
| Subheading | 18–24px |
| Body | 15–18px |
| Metadata | 11–13px, uppercase, +0.08em tracking |

**Mobile:** hero 44–56px, section headings 40–52px, body 15–16px.

Principle: impact comes from the **contrast between huge and tiny**, so avoid mid-sized everything.

---

## 4. Layout & Spacing

- **Grid:** 12 columns, margins 5–7vw, gutter 1.5–2vw. Selected objects deliberately break the grid.
- **Spacing scale (8px base):** 8, 16, 24, 32, 48, 64, 96, 128, 160
- **Borders:** `1px solid rgba(23,23,23,.18)`
- **Radius:** 0–4px mostly. No pill-shaped rounded cards (kills the editorial feel). Phone mockups are the exception.
- **White space:** generous. Every collage section is followed by a minimal breathing section.

**Image treatment:** slight rotations (−3° to +3°) on collage items, soft paper shadow, optional subtle grain overlay (3–5% opacity). Images should feel physically placed on a page.

---

## 5. Page Architecture and Section Visual Ideas

| # | Section | Background | Visual idea | Notes |
|---|---|---|---|---|
| 01 | Hero | Ivory | Personal identity object | Name, one-line positioning, small portrait or identity mark, "scroll ↓". Minimal motion. |
| 02 | Positioning (About) | Ivory → Coral | Editorial poster | Big statement + 3 to 4 lines. Portrait/stamp left, graphic centre, text right. |
| 03 | Selected Work title card | Ivory | Pause / breath | "Selected work" large, one-line intro. |
| 04 | The Wirewood | Ivory | Experimental publication | Page spreads, type fragments, cropped images, moving page numbers. Chaotic and editorial. |
| 05 | In-A-Bit | Lilac | Clean digital interface | Structured, grid-aligned. Phone screens move as user scrolls (01 → 02 → 03). |
| 06 | Meghalaya | Coral (hero project) | Cinematic brand system | Logo starts tiny, grows, then expands into logo / type / colour / applications / campaign. |
| 07 | Experience | Ivory | Moving timeline | Year marker stays fixed (sticky), roles scroll past. |
| 08 | Modelling | Ink | Fashion editorial | Large photos, tiny metadata, images drift at different speeds. |
| 09 | I Work With (Skills) | Ivory | Typographic manifesto | 4 groups: Brand, Digital, Content, Tools. No star ratings or bars. |
| 10 | Contact | Ink → Ivory | Personal signature | Big statement, links, signature mark, loop back to hero feel. |

**Project order rationale:** Meghalaya is the hero project (branding and place identity matches the target career). Consider placing it first in Selected Work if internships are the goal. Final call is the designer's.

---

## 6. Copy Direction

**Voice:** confident, warm, short sentences. No jargon, no "passionate about".

| Place | Draft |
|---|---|
| Hero | **Disha Balar** — Communication designer who thinks like a marketer. |
| Positioning | I turn ideas into identities people remember. |
| Positioning sub | Communication design student exploring the space between visual identity, storytelling and marketing. |
| Work title | Things I've made for brands, people & problems. |
| Wirewood | Editorial system for a reimagined Game of Thrones publication set after the fall of the Night King. |
| In-A-Bit | A productivity app concept that turns small in-between moments into meaningful ones. |
| Meghalaya | Place branding. How can a place become a recognisable identity? Inspired by living root bridges, forests and rivers. |
| Skills heading | I work with |
| Contact | Let's make something worth remembering. |

---

## 7. Motion System

### 7.1 Hierarchy
1. **Structural:** background colour transitions, section transitions
2. **Content:** text reveals, image masks, parallax
3. **Personality:** cursor, hover reactions, floating stickers
4. **Easter eggs:** 2 to 3 maximum

### 7.2 Specs

| Element | Trigger | Effect | Duration / easing |
|---|---|---|---|
| Hero object | Load | Fade + scale 0.95 → 1 | 0.9s, ease-out |
| Background | Scroll | Colour crossfade at section boundary | 0.6–0.8s |
| Headings | Scroll into view | Line-by-line clip/slide-up reveal | 0.8s, stagger 0.08s |
| Body text | Scroll into view | Fade + translateY 16px | 0.7s |
| Images | Scroll into view | Mask reveal (clip-path) | 0.9s |
| Collage items | Scroll | Parallax: bg 0.2×, images 0.5×, text 0.8× | continuous |
| Project cards | Hover | Scale 1.03, title shifts 8px, label appears | 0.3s |
| Year marker (Experience) | Scroll | Sticky; roles change beside it | scroll-linked |
| In-A-Bit screens | Scroll | Horizontal slide through 3 to 4 screens | scroll-linked |
| Meghalaya logo | Scroll | Scale tiny → full, then spread into system | scroll-linked |
| Signature | Scroll into view | Draw/reveal | 1.5s |
| Grain | Continuous | Static or very slow shift | optional |

**Easing default:** `cubic-bezier(0.22, 1, 0.36, 1)` (soft ease-out).

### 7.3 Custom cursor
- Default: small circle (12px)
- Over project: label "VIEW ↗"
- Over email/contact: "SAY HI"
- Hidden on touch devices

### 7.4 Rules
- Never animate everything at once. Max 2 to 3 simultaneous movements per viewport.
- No scroll-jacking. Native scroll only.
- Build static first. If it looks boring without motion, motion won't save it.

---

## 8. Interaction Design

- **Project click:** expands into an overlay or scrolls to case study (not a hard page navigation). Case study structure: Context → Concept → Process → Typography/Colour → Final outcome. "← Back to work" always visible.
- **Hover:** restrained. Zoom 1.03×, metadata slide, cursor change.
- **Navigation:** minimal fixed top bar with name (left) and section links or a "Menu" toggle (right). Active section indicator via small dot or section number.
- **Scroll progress:** thin progress line or section counter (optional).

---

## 9. Responsive Design

Do not shrink desktop. **Recompose** for mobile.

| Desktop | Mobile |
|---|---|
| Freeform collage | Single column: image → title → description |
| Parallax | Removed or very subtle |
| Horizontal screen slider | Vertical stack or swipe carousel |
| Custom cursor | Removed |
| Floating stickers | Reduced to 1 or 2 |
| Sticky timeline | Kept only if smooth; else stacked list |

Keep on mobile: background transitions, image reveals, typography contrast, subtle scale.

Breakpoints: 1440 (design base), 1024, 768, 390.

---

## 10. Accessibility

- Honour `prefers-reduced-motion: reduce`: movement → opacity fade, parallax off, scale off, cursor normal.
- Contrast ratio ≥ 4.5:1 for body text on every background.
- Alt text on all images (describe the design, not "image").
- Visible keyboard focus states (2px Ink or Ivory outline with offset).
- Semantic headings (one H1, ordered H2s).
- Don't rely on colour alone to convey meaning.
- Text stays real text (not baked into images) except logos/lettering.

---

## 11. Asset Checklist

- [ ] Portrait photo(s) (1 hero-quality, 1 to 2 casual)
- [ ] Wirewood: cover, 4 to 6 spreads, typography details, mockup
- [ ] In-A-Bit: 4 to 6 final screens, 1 to 2 flow/wireframe frames, key interaction clip (exported from Figma — see PRD)
- [ ] Meghalaya: logo (SVG), colour palette, type, 3 to 4 applications (signage, merch, poster, etc.), campaign visual
- [ ] Modelling: 6 to 9 best images (Nif Global, Rawayi, FAD University)
- [ ] Experience: logos or wordmarks for Brand Buzzer, Daintea, Atlas SkillTech (optional)
- [ ] Signature or handwritten name (scan or draw)
- [ ] Favicon + social share image (1200×630)
- [ ] Resume PDF for download

---

## 12. Design Don'ts

- No skill bars or star ratings
- No generic "View my work" button as the hero focus
- No rounded-card grid for projects
- No more than one handwritten element per screen
- No auto-playing sound
- No walls of text over 60 words per block
