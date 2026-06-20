# SnapServe

SnapServe is a landing page and product presentation for a restaurant ordering system. The current site is built as a section-based experience: a clean hero, a vintage menu-style overview, a features section with product screenshots, a Philippine receipt-inspired pricing section, and a stamped CTA block.

## Why This Tech Stack

### React 19 + TanStack Start

The app uses `@tanstack/react-start` with file-based routing from TanStack Router. That stack was a good fit because:

- It keeps the project in a React-first workflow.
- It supports route-based composition cleanly without forcing a heavy app framework.
- It works well with Vite and Cloudflare deployment.
- It makes the home page easy to break into reusable section components under `src/sections/page/`.

### TypeScript

TypeScript is used to keep UI state and component contracts explicit. That matters here because the landing page has interactive pieces like the pinned features section and the pricing selector, and those are easier to maintain when the data structures are typed.

### Tailwind CSS v4

Tailwind was chosen for layout and styling speed. The page has several very different visual modes, and utility-driven styling makes it easier to:

- move quickly between ideas,
- keep spacing and responsiveness consistent,
- build highly custom section designs without creating a large custom CSS surface.

Global design tokens and font imports still live in `src/styles.css`, so Tailwind is being used as a flexible rendering layer rather than as the only design system.

### GSAP + ScrollTrigger

The features section uses `gsap`, `@gsap/react`, and `ScrollTrigger`. That choice was intentional because the section is not just animated decoration; it behaves like a pinned editorial scroll story.

GSAP was chosen over simpler CSS-only motion because it handles:

- section pinning,
- scroll-linked state changes,
- controlled transitions between screenshots,
- responsive cleanup in React through `useGSAP`.

### Fontsource

Fonts are loaded locally through `@fontsource` instead of external font CDNs.

- `Averia Serif Libre` is used as the display/accent serif.
- `Montserrat` is used for the main sans/body typography.

This keeps typography consistent and avoids runtime dependency on external font requests.

### Cloudflare Workers + Wrangler

The app is set up to deploy through the Cloudflare Vite plugin and Wrangler. That keeps the deployment target lightweight and close to the Vite build pipeline already used during development.

### Biome

Biome handles linting and formatting. It keeps the codebase strict without adding a large ESLint/Prettier setup.

## Design Decisions

The design direction is intentionally mixed rather than uniform. Each section has a different job, so each section is allowed to use a different visual language.

### 1. Hero: Clean Product Introduction

The hero is the simplest part of the page:

- large `SnapServe` wordmark,
- short value proposition,
- one clear CTA,
- real product screenshot instead of a fake UI reconstruction.

The goal is to answer what the product is immediately and show the real interface as early as possible.

### 2. Main Menu: Vintage Restaurant Print

The main menu section uses an olive and paper palette with editorial restaurant-menu styling. That decision ties the brand to hospitality without making the entire site look nostalgic.

It works as a thematic bridge between:

- the modern product sections,
- and the more tactile pricing/CTA sections.

### 3. Features: Product Story with Screenshots

The features section deliberately breaks from the vintage menu style.

Instead of another static feature grid, it behaves like an editorial product chapter:

- the left rail introduces the benefit story,
- the active state is the source of truth,
- the content pins on desktop,
- the right side shows the actual product screenshots alongside the benefit copy.

That keeps the restaurant ordering flow visible without making it a separate chapter.

### 4. Pricing: Philippine Official Receipt

The pricing section is intentionally styled like a Philippine receipt/service invoice rather than a standard SaaS pricing table.

That decision does two things:

- It makes the section distinct and memorable.
- It frames pricing as something operational and business-facing, which fits the restaurant audience better than a generic startup card grid.

The selector on the left is intentionally minimal now, so the receipt on the right remains the main visual object.

### 5. CTA: Service Authorization Slip

The CTA continues the pricing language and feels like the “next official step” after the receipt. Instead of switching back to a generic centered button section, it uses an approval/service-authorization treatment.

That keeps the lower part of the page coherent:

- pricing feels like billing,
- CTA feels like approval/setup.

### 6. Typography Strategy

Typography is split by role:

- `Averia Serif Libre` is used as a display accent.
- `Montserrat` carries the bulk of UI and body text.

The serif is used where the page needs identity or emphasis, not everywhere. That keeps the site expressive without becoming overly decorative.

### 7. Real Product Assets Over Fake Mockups

Where possible, the page now uses actual screenshots from `public/assets` instead of reconstructed UI blocks. That was the right decision because it makes the product presentation more credible and reduces visual drift between the marketing page and the actual product.

## Project Structure

Important page sections live in:

- `src/sections/page/HeroSection.tsx`
- `src/sections/page/FeaturesSection.tsx`
- `src/sections/page/WaitTimeSection.tsx`
- `src/sections/page/TestimonySection.tsx`
- `src/sections/page/PricingSection.tsx`
- `src/sections/page/FAQSection.tsx`
- `src/sections/page/CTASection.tsx`
- `src/sections/page/FooterSection.tsx`

The route shell and page route are:

- `src/routes/__root.tsx`
- `src/routes/index.tsx`

Global styling and font imports live in:

- `src/styles.css`

## Development

Install dependencies:

```bash
bun install
```

Start the dev server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Run linting:

```bash
bun run lint
```

Run tests:

```bash
bun run test
```

## Notes

- The homepage is intentionally section-driven and composed directly from route-mounted sections rather than a separate app shell.
