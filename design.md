# NavUI Design System

Locked direction. Every new surface defers to this file. If a decision isn't documented here, don't invent one — extend this doc first.

## Direction

**Editorial terminal / dark-luxury.** Reference stack: Vercel, Linear, Warp, Cursor, Raycast. Dark is the anchor mode; light must remain usable but the design is tuned for dark.

## Accent

**Single accent: emerald.** `#34d399` (emerald-400). Variants: `emerald-500` (`#10b981`) for filled CTAs, `emerald-400/60` for glows, `emerald-400/10` for tinted panels.

**Never** introduce a second accent hue. Amber "star" and neutral chips only.

## Palette

- Background dark: `#0a0a0b` (near-black, warmer than pure `#000`)
- Background light: `#f7f7f5` (warm off-white)
- Foreground dark: `#f5f5f4` (stone-100)
- Foreground light: `#0a0a0b`
- Neutral scale: **`stone-*`** for light, **`neutral-*`** for dark surfaces.
- Muted line: `neutral-800` (dark) / `stone-200` (light)
- Muted text: `neutral-500` / `stone-500`

## Typography

- Body / UI: **Inter** (`--font-inter`)
- Meta / mono: **JetBrains Mono** (`--font-jetbrains`)
- Playfair Display is imported but reserved for future editorial display. Not used in v1.

### Scale

- H1: `text-5xl md:text-7xl`, `tracking-[-0.035em]`, `leading-[0.92]`, `font-semibold`
- H2: `text-3xl md:text-5xl`, `tracking-[-0.03em]`, `leading-[1]`
- H3: `text-lg md:text-xl`, `tracking-tight`, `font-medium`
- Body: `text-base md:text-lg`, `leading-relaxed`
- Meta / eyebrow: `font-mono text-[10px] uppercase tracking-[0.18em]`
- Numeric stats: `font-mono text-3xl md:text-4xl`, `tracking-tight`, `font-medium`

### Rules

- Gradient ONLY on the operative word of the H1, never the whole line.
- Two-line H2s: first line prominent, second line `text-neutral-500` for rhythm.
- No hardcoded font stacks in components — always reference the CSS variables.

## Section eyebrows

Every top-level section on the marketing surface gets a numbered eyebrow:

```
§ 01 / LIBRARY
```

- `§` in `text-neutral-700` (dark) / `text-stone-400` (light)
- Number in `text-emerald-400`, zero-padded
- Label in `text-neutral-500` (dark) / `text-stone-500` (light)
- All in mono, `text-[10px] uppercase tracking-[0.18em]`

## Motion

CSS scroll-driven animations only. No framer-motion or GSAP in *new* code (existing usage stays until refactored).

- `reveal-in`: `translateY(28px)` → `0`, opacity 0 → 1, `cubic-bezier(0.16, 1, 0.3, 1)`, 900ms.
- `marquee`: `translateX(0)` → `translateX(-50%)` on doubled list.
- `caret-blink`: 1.1s steps(1) infinite for terminal caret.
- `shimmer`: 1.6s ease-in-out infinite for skeleton loaders.
- All honor `@media (prefers-reduced-motion: reduce)`.
- Tilt / parallax gated behind `@media (hover: none)`.

## Micro-interactions

- CTA arrow slide: `→` translates 4px right on hover.
- Chip pop: `translateY(-1px)` on hover, `scale(0.97)` on active.
- Nav underline sweep: `::after` scaleX 0 → 1, `transform-origin: left`.
- Unified focus ring: `0 0 0 3px rgba(52, 211, 153, 0.5)` emerald.

## Layout patterns

- Container: `mx-auto w-[min(1120px,94%)]`
- Vertical rhythm between major sections: `py-20 md:py-28`
- Hairline dividers: `border-neutral-900` (dark) / `border-stone-200` (light), 1px.
- Section ornaments (between big sections): `hairline · diamond · hairline` — small emerald diamond `rotate-45`, flanking `1px` gradient-to-transparent hairlines.

## Surfaces

- **Card default**: `border border-neutral-900 bg-neutral-950/60 backdrop-blur-sm` (dark) / `border-stone-200 bg-white` (light)
- **Card featured**: adds `ring-1 ring-emerald-400/20` and a soft outer glow `absolute -inset-px bg-emerald-400/5 blur-xl`.
- **Browser-chrome mock** wraps any data-in-hero panel: three traffic-light dots, URL bar with the real target route, subtle emerald top-edge gradient.

## Atmosphere

Restrained. One radial glow, one grid, one accent.

- Backdrop grid: 32-56px cells, `rgba(255,255,255,0.028)` lines, radial mask.
- Radial emerald glow: `radial-gradient(circle, #34d399, transparent)`, 12% opacity, `blur-[130px]`. Hero and final CTA only.
- No gradient meshes with multiple hues. No noise. No particles.

## Anti-patterns (rejected)

- Symmetric 3-card feature grids → use mismatched weights.
- Multi-color accents → one emerald.
- `border-t` between big sections → use diamond ornament.
- Icon libraries scattered around → inline SVG icons only for meaningful affordances.
- Placeholder screenshots → always render real product data.
- Two "live" pills in the same viewport → dedupe.
- Straight "we're the best" prose → comparison table.

## Locked decisions

- **Accent** = emerald (never change without rewriting this doc).
- **Fonts** = Inter + JetBrains Mono (Playfair reserved).
- **Motion library** = none for new code; native CSS.
- **Direction** = dark-luxury / editorial terminal.
- **Container width** = 1120px max.

## Change log

- 2026-08-10: Initial system captured after hero rework.
