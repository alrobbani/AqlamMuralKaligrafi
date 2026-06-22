# DESIGN.md - UI/UX Specification & AI Coding Guardrails

## 1. Project Identity & Visual Philosophy
This document defines the strict visual system for **PT Aqlam Mural Kaligrafi** (Company Profile & Portfolio Website). The layout operates on a **"Modern Museum Hybrid"** concept—blending warm, highly readable editorial sections for informational pages with a dramatic, absolute-black canvas for the artwork portfolio.

### Core Visual Principles
* **Art-First Architecture:** The user interface must step back and act as a museum frame. Visual interest comes from full-bleed photography, textured artwork, and sharp typography, not from generic web decorations.
* **The Brand-Infused Hybrid Rhythm:**
  * *Informational Surfaces (Warm Mode):* Warm, welcoming ivory and deep teal-cyan accents that ensure accessibility and professional credibility for older audiences (e.g., Mosque committee members/DKM).
  * *Gallery Surfaces (Dark Mode):* Absolute darkness where artistic mural details, electric logo turquoise, and premium gold calligraphy pop out like objects under high-end museum spotlights.

---

## 2. Strict AI Coding Guardrails (Anti-Generic Rules)
> **CRITICAL INSTRUCTION FOR THE AI AGENT:** You must strictly adhere to these visual constraints to prevent generic SaaS or tech-startup design patterns.

* **ZERO Emojis:** Do NOT use emojis anywhere in the UI, headings, buttons, subtext, or forms. Use clean, professional SVG icons (e.g., Lucide Icons) only when structurally necessary.
* **NO Tech-Startup Tropes:** Avoid bento grids with large rounded corners, bright purple/neon gradients, bouncy floating animations, or generic icon-feature-cards.
* **Color Discipline:** Stick strictly to the defined brand palette. Do not let the AI introduce arbitrary primary colors or generic gray shades.

---

## 3. Design System & Design Tokens

### A. Color Palette & Layering Roles

#### Brand Core Colors (From Logo & Brochure)
* `brand-teal` (`#0A6E7B`): The deep, professional teal-cyan from the brochure headers. Used as the main color for headings, sub-headers, and primary links on light backgrounds.
* `brand-turquoise` (`#29D2D0`): The vibrant, electric cyan-turquoise directly from the brand logo. Used sparingly as a high-voltage accent, interactive state highlight, or focus rings on dark surfaces.
* `brand-gold` (`#D4AF37`): Representing premium craftsmanship and their physical "Acrylic Mirror Gold" products. Used strictly for high-priority CTA fills and active portfolio highlights.

#### Mode A Surfaces: Warm Editorial (Informational Contexts)
* `canvas-light` (`#FAFAFD`): Sophisticated warm ivory/cream surface. Main background for Home, About, and Contact sections to ensure maximum readability.
* `surface-light-card` (`#F3F3F6`): A notch darker than ivory for background panels, block divisions, or secondary buttons.
* `hairline-light` (`#E2E2E6`): 1px subtle divider on light backgrounds.
* `text-dark` (`#1A1A1A`): Deep slate/charcoal text for light surfaces—softer and more premium than pure black.

#### Mode B Surfaces: Dark Art Gallery (Portfolio Contexts)
* `canvas-dark` (`#000000`): Absolute black canvas. Used exclusively for portfolio masonry grids and project detail layers.
* `surface-dark-card` (`#121212`): Elevated charcoal tone for category filter chips or card frames sitting on absolute black.
* `hairline-dark` (`#222222`): 1px subtle divider on dark backgrounds.
* `text-light` (`#FFFFFF`): Pure white text for dark gallery surfaces.
* `text-muted` (`#8A8A8F`): Soft metallic gray for project metadata or dimensions on dark backgrounds.

### B. Typography Hierarchy
The font system uses a high-contrast pairing of a sophisticated Serif display typeface with an ultra-clean Sans-serif body family.

* **Display Font Family:** Elegant high-contrast Serif (e.g., *Playfair Display*, *Cinzel*, or fallback `Georgia, serif`) to reflect artistic and calligraphic heritage.
* **Body & UI Font Family:** Humanist geometric Sans-serif (e.g., *Plus Jakarta Sans*, *Inter*, or fallback `sans-serif`) optimized for absolute readability across all age groups.

| Token | Size | Weight | Line Height | Letter Spacing | Context / Use |
|---|---|---|---|---|---|
| `typography.display-hero` | 72px | 600 (Serif) | 1.10 | -1px | Top-of-page marketing hero headlines |
| `typography.heading-section` | 40px | 600 (Serif) | 1.20 | -0.5px | Major section titles (e.g., "Tentang Kami") |
| `typography.heading-card` | 24px | 500 (Serif) | 1.30 | 0px | Artwork titles inside gallery cards |
| `typography.body-md` | 16px | 400 (Sans) | 1.55 | 0px | Default reading copy and paragraph prose |
| `typography.body-strong` | 16px | 600 (Sans) | 1.55 | 0px | Emphasized text or primary nav links |
| `typography.button-label` | 14px | 600 (Sans) | 1.00 | 1.2px (Caps) | All-uppercase CTA label text |
| `typography.metadata` | 13px | 400 (Sans) | 1.40 | 0px | Pricelist, dimensions, location parameters |

### C. Shape & Border Radius Scale
The geometry is sharp and tailored, reflecting architectural precision and craftsmanship lines.

* `rounded-none` (`0px`): Default for primary buttons, layout bands, full-viewport heroes, and imagery. Channels structural luxury.
* `rounded-sm` (`4px`): Form text fields and contact input components.
* `rounded-full` (`9999px`): Circle avatars, logo badges, or masonry filter chips. **Never** used for regular action buttons.

---

## 4. Component Layout Guidelines

### A. Primary Top Navigation (`component.primary-nav`)
* Fixed/Sticky at the top. Height: 72px. No heavy box shadows; use a clean 1px `hairline-light` bottom border.
* Background matches `canvas-light`. Main navigation links use `text-dark`, turning to `brand-teal` on hover.
* Layout: Company logo (`brand-turquoise` mark) on the left, clean menu links in the center, and one sharp `rounded-none` action button on the right (`brand-gold` fill).

### B. Hero Section (`component.hero-editorial`)
* Centered or elegant asymmetric split layout on a `canvas-light` surface.
* Uses large, high-contrast typography (`typography.display-hero`) with a clean descriptive subtitle.
* Paired with a massive, crisp, high-resolution showcase photograph of a flagship mural or calligraphy project (e.g., dome masjid or premium luxury mural). The image uses `rounded-none` and flat alignment.

### C. The Core Art Gallery (`component.portfolio-masonry`)
* **The Canvas Switch:** This section transitions completely to `canvas-dark` (`#000000`).
* **Layout Structure:** Implements a strict **Pinterest-inspired Masonry Grid** with an auto-fitting multi-column setup (4 columns desktop, 2 columns tablet, 1 column mobile).
* **Grid Spacing:** Gutters are strictly limited to a tight 12px step. Imagery must almost touch across layout boundaries to create an continuous exhibition feel.
* **The Card Rule:** Images fill the masonry card edge-to-edge. No internal card padding. 
* **Filter Chips:** Located above the grid. Uses `rounded-full` pills with `surface-dark-card` background and `text-light`. Active chip turns into full `brand-teal` background.

### D. Action Buttons (`component.button-primary`)
* Sharp corners (`rounded-none`). No pill geometry for primary buttons.
* Height: 48px. Padding: 14px x 28px.
* Typography is strictly uppercase with 1.2px tracking (`typography.button-label`).
* **Primary (Call to Action):** Background `brand-gold` with `text-dark` to emphasize premium gold craftsmanship.
* **Secondary (Information/Brochure):** Background `brand-teal` with `text-light` for solid brand alignment.
* **Outline:** Transparent background with a 1px `text-dark` or `text-light` border depending on the mode.

---

## 5. Spacing & Responsive Behaviors
* **Spacing Ladder:** Built on clean 8px increments: 8px, 16px, 24px, 32px, 48px, 64px, 96px.
* **Section Transitions:** Major layout blocks are separated by a generous 96px vertical whitespace gap to let design elements breathe.
* **Grid Scaling:** Masonry grid columns automatically condense gracefully across breakpoints (Desktop 4 columns -> Tablet 2 columns -> Mobile 1 column stacked vertically) while preserving the natural vertical aspect ratio of each artwork asset.