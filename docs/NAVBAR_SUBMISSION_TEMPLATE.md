# Navbar Submission Template

Copy this template when adding a new navbar entry in `data/navbars.ts`.

```ts
{
  slug: "your-navbar-slug",
  title: "Your Navbar Title",
  category: "Navbars",
  tags: ["tag-one", "tag-two", "tag-three"],
  summary: "One-line summary of what makes this navbar useful.",
  seoText: buildSeoText(
    "Your Navbar Title",
    "Describe key behavior and where this pattern fits best.",
  ),
  code: `export function YourNavbarComponent() {
  return (
    <nav className=\"rounded-xl border bg-white px-4 py-3\">
      <a className=\"font-semibold\">NavUI</a>
    </nav>
  );
}`,
  prompt:
    "Create a production-ready navbar with clear link hierarchy, responsive behavior, and clean Tailwind styling.",
}
```

## Also Update

- `components/navbar-components/previews.tsx`
- `components/NavbarDemo.tsx` (if custom behavior is needed)
- `components/ComponentGrid.tsx` (if you want featured tuning)

## Final Check

```bash
npm run lint
```
