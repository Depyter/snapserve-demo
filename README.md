# SnapServe

Landing page for a restaurant ordering system.
You can access the live demo at [snapserve.harleyvan.com](snapserve.harleyvan.com). 

## Stack

**TanStack Start** — React 19 + file-based routing + Vite. Route-mounted sections under `src/sections/page/`.

**Cloudflare Workers** — deployed via the Cloudflare Vite plugin + Wrangler.

**GSAP + ScrollTrigger** — pinned editorial scroll story on the features section. `useGSAP` hook handles React lifecycle and responsive cleanup.

**Tailwind CSS v4** — utility styling across visually distinct sections. Global tokens and font imports in `src/styles.css`.

**Fontsource** — `Averia Serif Libre` (display), `Montserrat` (body). Loaded locally, no external CDN.

**Biome** — lint + format. One tool, no ESLint/Prettier sprawl.

## Notable UI/UX Decisions

- **Real screenshots over mockups.** Product images in `public/assets/` are actual app captures, not reconstructed UI.

- **Section-driven design.** Each section has its own visual language matching its job: clean hero, vintage menu-styled overview, editorial feature story, Philippine receipt-inspired pricing, service-authorization CTA.

- **Pricing as an official receipt.** Not a standard SaaS card grid. Philippine receipt styling frames pricing as operational and business-facing — right audience, more memorable.

- **Typography split by role.** Serif for identity/emphasis only, sans for body. Expressive without decorative noise.

## Dev

```bash
bun install
bun run dev      # start dev server
bun run build    # production build
bun run lint
bun run test
```
