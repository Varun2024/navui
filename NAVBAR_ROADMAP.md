# Navbar Roadmap

Plan for evolving the catalog from generic patterns to distinctive, industry-recognizable navigation.

## Current state (2026-08-10)

26 slugs. Most are variants of the same shape: rounded pill container, black-on-white active pill, small motion on mount. Detail previews are richer than the "applied on home" version — see `NavbarDemo.tsx` for the shared generic renderers.

Post-fix (this session): every slug in `data/navbars.ts` is now typed as `NavbarSlug` and mapped in `LIVE_NAVBARS` (`components/NavbarDemo.tsx`). Adding a new slug without a live renderer is a compile error.

## Removal list (deprecate first, delete after 1 release)

Redundant with a sibling — pick the winner, redirect the loser's slug:

| Keep | Deprecate | Reason |
|---|---|---|
| `stripe-navbar` | `minimal-navbar` | Same layout, less character. |
| `mobile-bottom-nav` | `bottom-mobile-nav` | Identical bar, differs only in `justify-around` vs `justify-between`. |
| `dashboard-sidebar` | `workspace-switcher` | Live renderer is identical. |
| `collapsible-sidebar` | `nested-sidebar` | Live renderer is identical. |
| `dock-navigation` | `floating-action-navbar` | FAB pattern belongs in a separate category, not another dock. |
| `stripe-mega-navbar` | `hybrid-navbar` | Same mega-menu row. |

Deprecation mechanics:
1. Add `deprecated: true` and `replacedBy: <slug>` to the `NavbarItem` type.
2. Detail route redirects to the replacement.
3. Gallery hides deprecated unless `?showDeprecated` is set.
4. Delete after one minor release.

## Addition list — industry-recognizable navigation

Group by the software category they're recognizable from. Each entry should ship a **unique interaction signature**, not just a color swap.

### Developer tools
- **linear-command-bar** — top pill with inline `⌘K` triggering an in-place command search that expands the bar height, not a modal.
- **vercel-project-switcher** — breadcrumb-style top nav with clickable segments and a project popover on the first segment.
- **github-tab-nav** — underline tab strip that survives horizontal scroll on mobile, sticky under a slimmer top bar.
- **notion-sidebar-tree** — collapsible tree with drag handles, nested `>` disclosure, and pinned favorites section.

### SaaS / productivity
- **linear-workspace-nav** — 44px icon rail + contextual second panel that slides in on hover with keyboard bypass.
- **slack-channel-rail** — dark rail + sectioned channel list with unread pill counters and threaded indent.
- **figma-toolbar** — floating centered toolbar with contextual tool groups; secondary popovers anchor to buttons, not to viewport.
- **arc-command-palette** — floating vertical sidebar with tab thumbnails and folder groups.

### E-commerce
- **shopify-storefront-nav** — top with mega-menu that swaps hero imagery per hovered category. Cart drawer slides from right.
- **amazon-department-strip** — dense two-row top bar (search dominant top, department strip below) with hover-open mega panels.

### Media / content
- **youtube-rail-collapse** — icon rail default, expands to full labels on hover; mini-player region stays pinned.
- **medium-progress-nav** — top bar that morphs into a reading-progress line as you scroll; author/actions collapse to icons.
- **spotify-now-playing-nav** — sidebar + persistent bottom "now playing" bar with drag handle for full-screen player.

### Financial / dashboards
- **stripe-dashboard-nav** — sidebar with balance widget slot at bottom, section headers in JetBrains Mono, keyboard-shortcut hints on hover.
- **bloomberg-terminal-bar** — top bar with function-key badges (`F1`–`F12`), monospace command entry, ticker strip below.

### Consumer / mobile-first
- **instagram-story-tabs** — top row of circular story avatars that double as nav (feed / reels / dms / profile) with unread ring.
- **twitter-x-rail** — icon rail (desktop) → bottom tab bar (mobile) with a floating compose FAB that expands into a full sheet.
- **tinder-swipe-tabs** — three-tab top with a swipeable underline indicator; content area follows swipe gesture.

### Enterprise / admin
- **salesforce-app-switcher** — top bar with 9-dot app switcher popover, secondary contextual tab strip below.
- **jira-project-breadcrumb** — top breadcrumb with per-segment project/board popover, filter chips row underneath.

### Emerging patterns
- **ai-chat-sidebar** — Claude/ChatGPT-style thread list sidebar with pinned/archived sections and a persistent "new chat" pinned button. First-class in 2025+.
- **agent-status-nav** — nav with a live status pill (running agents count, last action) — useful signature for AI-tool sites.

## Contribution contract for new entries

Each new navbar PR must include:

1. Entry in `data/navbars.ts` with `industry` and `pattern` fields (add to `NavbarItem` type: `industry: "dev-tools" | "saas" | "ecom" | "media" | "finance" | "consumer" | "enterprise" | "ai"`, `pattern: "top" | "sidebar" | "dock" | "bottom" | "drawer" | "rail" | "hybrid"`).
2. Live component at `components/navbar-live/<slug>.tsx` — self-contained, `position: fixed`, exports a `LiveNavRenderer`-shaped default.
3. Preview component at `components/navbar-components/previews.tsx` OR reuse the live component in preview mode.
4. Registered in `LIVE_NAVBARS` in `NavbarDemo.tsx` — TS will error if you skip.
5. **Unique interaction signature** documented in the entry `summary` — one of: novel motion, novel layout, novel input model. If the summary reads "responsive with mobile menu," that's a rejection.
6. Both light and dark themes.
7. Real keyboard nav (`Tab`, `Esc` for popovers).

## Phased execution

**Phase 1 (this week):** Deprecate the 6 redundant slugs. Add `industry` + `pattern` fields. Extract 3 current top navbars (`command-palette`, `morphing-menu`, `tab-navigation`) into their own live components so the boolean-flag `TopNavbar` shrinks.

**Phase 2 (next 2 weeks):** Ship 5 developer-tool navbars from the addition list — that's the target audience and where NavUI can be authoritative. Prioritize: `linear-command-bar`, `vercel-project-switcher`, `notion-sidebar-tree`, `arc-command-palette`, `ai-chat-sidebar`.

**Phase 3:** Add SaaS + e-commerce (5 more). Delete deprecated slugs after the redirect release ships.

**Phase 4:** Media, finance, consumer, enterprise (rest of list). Reach ~35 navbars total, with the generics culled — quality up, count roughly flat.

**Ongoing:** For every new navbar merged, revisit one existing generic. If it can't be made distinctive within one PR, deprecate it.

## Success signal

Someone lands on a detail page and says "oh, that's the Linear one" before reading the title. Right now, that only works for maybe 3 of the 26.
