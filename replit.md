# Inkblot

A living mythology ecosystem where universes evolve through collaborative storytelling.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/inkblot run dev` — run the frontend (port assigned by workflow)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + framer-motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/inkblot/` — React frontend (homepage, future app pages)
- `artifacts/inkblot/src/pages/Home.tsx` — cinematic homepage
- `artifacts/inkblot/src/index.css` — global theme (dark palette, Google Fonts)
- `artifacts/api-server/` — Express API server
- `attached_assets/` — generated universe cover images

## Product

Inkblot is a living mythology ecosystem where universes evolve through collaborative storytelling. It is NOT a writing app, document editor, or productivity platform.

### Core Concepts

| Term | Meaning |
|------|---------|
| **Universe** | The complete creative world/project |
| **Trunk** | The official canon path of a Universe |
| **Branch** | A divergence point from canon |
| **Timeline** | The narrative progression growing from a Branch |
| **Node** | An individual lore/story contribution |
| **Canonize** | The act of merging a contribution into the official Trunk |
| **Tree** | The structured canon ecosystem |
| **Shadow** | An unrestricted collaborative creation space — no canon governance |

### Core Philosophy

Stories grow like living trees. Creators establish worlds through a central canon Trunk. From the Trunk, alternate ideas diverge into Branches. Branches grow through Timelines, Nodes, and collaborative contributions. Some branches stay small; others evolve into massive alternate mythologies. Inkblot visualizes narrative evolution, divergence, and creative ecosystems.

### Emotional Identity

Inkblot should feel: **alive, mythological, organic, cinematic, collaborative, mysterious, creative, expansive.**

Inkblot should NOT feel: corporate, productivity-focused, like project management software, like a standard social media app, or like a coding platform.

## Visual Identity

- Dark immersive UI — deep black (#050508), charcoal (#0d0d14)
- Soft white/warm cream text (#f0eee8)
- Deep indigo (#3730a3), muted purple (#7c3aed), glowing blue (#60a5fa)
- Display font: Cormorant Garamond (mythological, editorial)
- Body font: Inter
- Visual themes: living world trees, branching mythology, glowing narrative networks, ink and light, roots and timelines, cosmic archives
- Every interface should reinforce the feeling that worlds are alive and evolving

## Architecture decisions

- Contract-first API design via OpenAPI spec — run codegen before touching hooks
- Frontend-only to start; no auth or DB until core creative flows are defined
- framer-motion for all scroll-triggered and entrance animations
- SVG for all tree/branch/node visualizations (organic, animatable)

## User preferences

- Inkblot is a mythology/worldbuilding ecosystem, not productivity software
- Emotional atmosphere and visual storytelling take priority in design decisions
- The design principle: every interface should reinforce that worlds are alive and evolving
- No emojis in the UI
- Mobile-responsive, cinematic, dark immersive design at all times

## Gotchas

- Google Fonts `@import url(...)` must be the ABSOLUTE FIRST LINE of `index.css` — PostCSS fails silently otherwise
- The scaffold's `index.css` ships with `red` placeholder values — always rewrite the `:root` and `.dark` blocks before adding components
- Do not run `pnpm dev` at workspace root — use `restart_workflow` instead
- `BASE_URL` from Vite (`import.meta.env.BASE_URL`) must be prepended to all API paths

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
