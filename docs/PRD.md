# NavUI Product Requirements Document

## Product Name
- NavUI

## Possible Domains
- navui.dev
- navcraft.dev
- navverse.dev

## 1. Product Overview
NavUI is an open-source navigation component library focused on modern web app navigation patterns.

It provides:
- Live previews
- Copy-paste code
- AI prompts
- Modern animations
- Tailwind + React components

Primary pattern focus:
- Navbars
- Sidebars
- Mega menus
- Mobile navigation
- Command palette navigation

## 2. Problem Statement
Developers often struggle with existing navigation libraries because they are too heavy, outdated, or hard to customize. There is no centralized, high-quality destination focused only on navigation UI patterns.

Common queries this product targets:
- react navbar
- tailwind navbar
- nextjs navbar
- dashboard sidebar
- mega menu react

## 3. Target Users
Primary users:
- Frontend developers using React, Next.js, and Tailwind CSS

Secondary users:
- Indie hackers
- Startup developers
- UI engineers
- Designers seeking inspiration

## 4. Product Goals
Primary goals:
- Build the largest open-source navigation pattern library
- Deliver high-quality components with copy-paste and AI prompt support

Secondary goals:
- Grow an open-source contributor community
- Increase GitHub stars
- Capture SEO traffic
- Create optional premium monetization path

## 5. Core Features
### 5.1 Navigation Component Gallery
Each component card includes:
- Live preview
- Code export
- Tags
- Prompt generation

Examples:
- Stripe Navbar
- Linear Navbar
- Glass Navbar
- Animated Navbar

### 5.2 Live Component Preview
Requirements:
- Responsive
- Animated
- Functional
- Displayed inside a sandbox-style container

### 5.3 Copy Code Feature
Supported outputs:
- React JSX
- React TSX
- Next.js version

Interaction:
- Copy button
- Clipboard API
- Toast confirmation

### 5.4 AI Prompt Export
Example:
"Create a responsive SaaS navbar using Next.js and Tailwind CSS with mega dropdown, mobile hamburger menu, and smooth hover animations."

Compatible with:
- ChatGPT
- GitHub Copilot
- Claude

### 5.5 Navigation Categories
- Navbars
- Sidebars
- Mega Menus
- Mobile Navigation
- Dock Navigation
- Dashboard Navigation

### 5.6 Component Tagging
Example tags:
- saas
- dashboard
- glass
- animated
- minimal
- mega-menu

### 5.7 Search
Search fields:
- Name
- Tags
- Category

### 5.8 SEO Landing Pages
Examples:
- /react-navbar
- /nextjs-navbar
- /tailwind-navbar
- /animated-navbar
- /dashboard-sidebar

## 6. Design System
Direction:
- Minimal
- Developer-friendly
- Clean spacing
- Dark + light mode
- Subtle animation

Inspiration:
- Vercel
- Linear
- Stripe

Typography:
- Inter
- Hero: 40px
- Heading: 28px
- Subheading: 20px
- Body: 16px

Colors:
- Primary: #000000
- Background: #FFFFFF, #F9FAFB
- Accent: #6366F1

Spacing:
- 4px scale
- Common values: 8px, 16px, 24px, 32px, 48px

Shared component styles:
- rounded-xl
- shadow-sm
- border
- backdrop-blur

## 7. Tech Stack
Core:
- Next.js
- Tailwind CSS
- Framer Motion

Optional UI utilities:
- shadcn/ui

Deployment:
- Vercel

Analytics:
- Plausible or PostHog

## 8. Recommended Folder Structure
```text
navui
├ app
│  ├ page.tsx
│  ├ navbars
│  │  └ [slug]
│  │     └ page.tsx
├ components
│  ├ navbar-components
│  ├ preview
│  └ ui
├ data
│  └ navbars.ts
├ code
│  └ stripe-navbar.ts
├ prompts
│  └ stripe-navbar.txt
└ public
   └ previews
```

## 9. Component Artifact Structure
Each component should include:
- Component file
- Code file
- Prompt file
- Preview image

Example:
```text
stripe-navbar
├ stripe-navbar.tsx
├ stripe-navbar.code.ts
├ stripe-navbar.prompt.txt
└ preview.png
```

## 10. Data Model
Central metadata (example path: `data/navbars.ts`) with fields:
- slug
- title
- category
- tags
- component
- code
- prompt

## 11. UI Pages
Homepage:
- Hero
- Component categories
- Featured navbars
- Component gallery

Component page:
- Interactive preview
- Copy code button
- Copy prompt button

## 12. Build Procedure
1. Initialize Next.js app with Tailwind and Framer Motion
2. Build core design system (container, grid, cards, buttons)
3. Build navigation gallery and routing
4. Build first 10 components
5. Implement copy code with Clipboard API + toast
6. Implement prompt display and copy
7. Add Framer Motion interactions
8. Add SEO pages + metadata
9. Deploy to Vercel

## 13. MVP Scope
Include:
- 10 navigation components
- Gallery page
- Component detail page
- Copy code
- Copy prompt

Exclude for MVP:
- Auth
- Backend
- User accounts

## 14. Open Source Strategy
Repository includes:
- Components
- Documentation
- Contribution guide

Contribution focus:
- New navbars
- New sidebars
- New animations

## 15. Future Roadmap
Phase 2:
- Navigation builder
- Theme editor
- Component playground

Phase 3:
- Premium tier
- 100+ components
- Advanced mega menus
- Dashboard navigation kits

## 16. Success Metrics
Track:
- GitHub stars
- Weekly visitors
- Component copy events

Targets:
- 1,000 GitHub stars
- 10,000 monthly visitors

## 17. Risks and Mitigation
Risks:
- Low design quality
- Weak marketing
- High competition

Mitigation:
- Stay niche on navigation
- Maintain high polish
- Ship quickly and iterate

## 18. Timeline
MVP estimate: 5-7 days

Suggested plan:
- Day 1: Setup
- Day 2: Gallery
- Day 3: Components
- Day 4: Animations
- Day 5: Launch
