# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint (must pass before PR)

No test runner is configured.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (`@tailwindcss/postcss`) · Framer Motion · GSAP · next-themes · lucide-react.

## Architecture

NavUI is a gallery of navbar/sidebar patterns. The catalog is data-driven — a single source of truth in `data/navbars.ts` feeds all routes, previews, and the "Apply on Home" demo.

**Data flow for a navbar entry:**

1. `data/navbars.ts` — the catalog. Each `NavbarItem` has `{ slug, title, category, tags, summary, seoText, code, prompt }`. `slug` is the join key across the app.
2. `app/navbars/[slug]/page.tsx` — dynamic detail route; looks up entry by slug.
3. `components/navbar-components/previews.tsx` (+ `AnimatedPreviews.tsx`) — maps `slug` → preview component rendered on detail pages and the gallery.
4. `components/NavbarDemo.tsx` — live behavior on the home page; keyed off `NAVBAR_STYLE_STORAGE_KEY` in localStorage set by the "Preview on Home" action.
5. `components/ComponentGrid.tsx` — featured layout / priority tuning for the home grid.

When adding a navbar: update (1) and (3) at minimum. Add (4) only if the design needs interaction not covered by an existing variant. Tune (5) if it should appear in the home featured section.

**SEO landing pages** (`app/nextjs-navbar`, `/react-navbar`, `/tailwind-navbar`, `/animated-navbar`, `/dashboard-sidebar`) share `components/SeoLandingPage.tsx` and filter the same catalog by tag/category. Metadata helpers live in `lib/seo.ts`.

**Theming:** `components/ThemeProvider.tsx` wraps `next-themes`; consumed by nav components that ship dark variants.

## Contribution contract

Enforced by `CONTRIBUTING.md` and `docs/NAVBAR_SUBMISSION_TEMPLATE.md`:

- One navbar per PR (preferred).
- Don't break existing `slug` values — they're used in URLs and localStorage.
- `Contribute` CTA links must point to `https://github.com/Varun2024/navui.git`.
- Every navbar should be visually distinct via at least one of: color, typography, layout shape (top/dock/drawer/sidebar/tab), or motion.
- Nav links inside preview components should target real app routes (`/`, `/gallery`, `/#categories`, `/#how-it-works`).
