# Contributing to NavUI

Thank you for contributing navbar designs to NavUI.

This project is a component library, so consistency matters as much as visual creativity.

## What You Can Contribute

- New navbar patterns (top nav, mobile nav, sidebars, dock, mega menu, hybrid)
- Improvements to existing patterns
- Better previews/interactions
- Tagging/category cleanup
- Docs improvements

## Contribution Flow

1. Fork and create a branch.
2. Add or update navbar entries in `data/navbars.ts`.
3. Add matching preview mapping in `components/navbar-components/previews.tsx`.
4. If behavior requires it, update `components/NavbarDemo.tsx`.
5. Update featured behavior in `components/ComponentGrid.tsx` only if needed.
6. Run lint.
7. Open a PR with screenshots or short clips.

## Required File Updates for New Navbar Designs

For every new navbar slug, ensure all are covered:

- `data/navbars.ts`
- `components/navbar-components/previews.tsx`

Optional but often needed:

- `components/NavbarDemo.tsx`
- `components/ComponentGrid.tsx`

## Naming and Slug Rules

- Slug must be unique, lowercase, kebab-case.
- Do not rename an existing slug unless explicitly discussed.
- Title should be clear and specific.

## Route and CTA Consistency

Use real app route labels whenever possible:

- `/`
- `/gallery`
- `/#categories`
- `/#how-it-works`

CTA rules:

- Label: `Contribute`
- URL: `https://github.com/Varun2024/navui.git`

## Quality Standards

- Keep component code readable and compact.
- Keep previews visually distinct from existing ones.
- Avoid duplicate patterns with only trivial color changes.
- Respect responsive behavior.
- Keep interactions understandable and purposeful.

## Validation

Run before submitting:

```bash
npm run lint
```

PRs should pass lint and should not break existing navbar detail pages.

## Submission Template

Use `docs/NAVBAR_SUBMISSION_TEMPLATE.md` when adding a new navbar item.
