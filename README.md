# NavUI

[![GitHub stars](https://img.shields.io/github/stars/Varun2024/navui?style=flat-square)](https://github.com/Varun2024/navui/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Varun2024/navui?style=flat-square)](https://github.com/Varun2024/navui/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](./CONTRIBUTING.md)

Open-source component library focused on modern navigation patterns.

Built for developers who want to ship cleaner navigation faster, and for contributors who want to publish great navigation patterns to the community.

NavUI ships reusable navbar patterns with:

- live previews
- copy-ready code
- AI prompts
- category/tag filtering
- one-click "Preview on Home" behavior testing

Repository: `https://github.com/Varun2024/navui.git`

## Table of Contents

- [Get Involved](#get-involved)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Library Data Model](#library-data-model)
- [How New Navbar Designs Work](#how-new-navbar-designs-work)
- [Contribution System](#contribution-system)
- [Design Guidelines](#design-guidelines)
- [Quality Checklist](#quality-checklist)
- [Roadmap](#roadmap)
- [License](#license)

## Get Involved

- Submit a navbar: open a PR using `docs/NAVBAR_SUBMISSION_TEMPLATE.md`.
- Submit a sidebar: follow the same submission template and include category/tag details.
- Star the repo: `https://github.com/Varun2024/navui`.

If you are looking for a first contribution, start by improving a preview variant in `components/navbar-components/previews.tsx` and then update the catalog entry in `data/navbars.ts`.

## Features

- Dynamic gallery and detail pages for each navbar component.
- Home featured section with category-balanced visual diversity.
- Newest-first gallery ordering for fresh component discovery.
- "Apply one" and "Preview on Home" interaction flow for testing navbar behavior in context.
- Scroll, drawer, dock, mobile, and sidebar navigation patterns.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- next-themes
- lucide-react

## Project Structure

```text
navui/
  app/                         # routes (home, gallery, navbar detail pages, seo pages)
  components/
    navbar-components/         # reusable preview components for detail pages
    ui/                        # small UI building blocks
  data/
    navbars.ts                 # source of truth for navbar catalog
  docs/
    PRD.md                     # product requirements
  CONTRIBUTING.md              # contributor workflow and rules
```

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Useful commands:

```bash
npm run lint
```

## Library Data Model

All navbar entries live in `data/navbars.ts`.

Each entry must match this shape:

```ts
type NavbarItem = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  seoText: string;
  code: string;
  prompt: string;
};
```

`slug` is the stable identifier used by:

- dynamic detail route (`/navbars/[slug]`)
- preview mapping (`components/navbar-components/previews.tsx`)
- home apply system (`NAVBAR_STYLE_STORAGE_KEY`)

## How New Navbar Designs Work

When a new navbar is added, you should update these places:

1. `data/navbars.ts`
2. `components/navbar-components/previews.tsx`
3. `components/NavbarDemo.tsx` (if it needs custom live behavior)
4. `components/ComponentGrid.tsx` (featured layout/priority tuning)

If a new style does not need a new interaction model, map it to an existing preview/demo variant.

## Contribution System

NavUI uses a contribution contract so new navbar designs are consistent.

This README and `CONTRIBUTING.md` are intentionally structured for open-source contributions: small focused PRs, clear submission rules, and predictable review criteria.

System components:

- `CONTRIBUTING.md`: full process, conventions, and review criteria.
- `docs/NAVBAR_SUBMISSION_TEMPLATE.md`: copy-paste template for adding a new navbar entry.
- Required validation: `npm run lint` must pass before PR.

PR expectations:

- one navbar design per focused PR is preferred
- include all required files/updates
- avoid breaking existing slugs and routes
- preserve CTA consistency: `Contribute` -> `https://github.com/Varun2024/navui.git`

## Design Guidelines

- Every navbar should be visually distinct from others.
- Differentiation should come from at least one of these signals: color treatment, typography style, layout shape (top, dock, drawer, sidebar, tab), or motion pattern.
- Keep nav links aligned to real app routes.
- Route: `/`
- Route: `/gallery`
- Route: `/#categories`
- Route: `/#how-it-works`

## Quality Checklist

Before opening a PR:

1. Added/updated catalog entry in `data/navbars.ts`.
2. Added or mapped preview in `components/navbar-components/previews.tsx`.
3. Added live behavior mapping in `components/NavbarDemo.tsx` when needed.
4. Tuned featured layout/priority if the card should appear on home.
5. Verified mobile behavior.
6. Ran `npm run lint`.

## Roadmap

- More navigation patterns (desktop + mobile + hybrid).
- Improved contributor tooling (lint guards for duplicate slugs/tags).
- Extended docs for animation and accessibility standards.

## License

MIT. See `LICENSE` for full text.
