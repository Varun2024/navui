export type NavbarItem = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  seoText: string;
  code: string;
  prompt: string;
};

export const NAVBAR_STYLE_STORAGE_KEY = "navui.home.navbarStyle";
export const NAVBAR_STYLE_EVENT = "navui-navbar-style-change";
export const NAVBAR_STYLE_APPLIED_KEY = "navui.home.navbarApplied";

const SNIPPET_LOGO_MARKUP = `<a className="inline-flex items-center gap-2 font-semibold">
  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-black text-xs font-bold text-white">N</span>
  NavUI
</a>`;

function buildSeoText(componentName: string, featureText: string) {
  return `This ${componentName.toLowerCase()} is built using Next.js and Tailwind CSS. ${featureText}`;
}

export const navbars: NavbarItem[] = [
  {
    slug: "stripe-navbar",
    title: "Responsive React Navbar",
    category: "Navbars",
    tags: ["react", "responsive", "mobile", "dropdown"],
    summary: "Responsive React navbar with mobile hamburger and dropdown links.",
    seoText: buildSeoText(
      "Responsive React Navbar",
      "It includes a mobile hamburger menu and dropdown navigation.",
    ),
    code: `export function ResponsiveReactNavbar() {
  return (
    <nav className="rounded-xl border bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        ${SNIPPET_LOGO_MARKUP}
        <button className="rounded-lg border px-3 py-2 md:hidden">Menu</button>
      </div>
      <div className="mt-3 hidden gap-6 text-sm md:flex">
        <a>Home</a>
        <a>Components</a>
        <a>Pricing</a>
      </div>
    </nav>
  );
}`,
    prompt:
      "Create a responsive React navbar with mobile hamburger menu, dropdown links, and Tailwind CSS styling for Next.js.",
  },
  {
    slug: "minimal-navbar",
    title: "Tailwind Navbar",
    category: "Navbars",
    tags: ["tailwind", "clean", "responsive"],
    summary: "Clean Tailwind CSS navbar for docs, SaaS, and product websites.",
    seoText: buildSeoText(
      "Tailwind Navbar",
      "It provides a clean responsive layout with practical navigation links.",
    ),
    code: `export function TailwindNavbar() {
  return (
    <nav className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
      <a className="inline-flex items-center gap-2 font-medium">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-black text-xs font-bold text-white">N</span>
        NavUI
      </a>
      <div className="hidden gap-6 text-sm md:flex">
        <a>Features</a>
        <a>Docs</a>
        <a>Contact</a>
      </div>
      <button className="rounded-lg border px-3 py-2">Get started</button>
    </nav>
  );
}`,
    prompt:
      "Create a Tailwind CSS navbar with a clean responsive layout, desktop nav links, and compact spacing.",
  },
  {
    slug: "scroll-navbar",
    title: "Scroll Shrinking Navbar",
    category: "Navbars",
    tags: [
      "scroll",
      "sticky",
      "animated",
      "react sticky navbar animation",
      "header shrink scroll",
    ],
    summary: "Large sticky header that smoothly shrinks into a compact navbar on scroll.",
    seoText: buildSeoText(
      "Scroll Shrinking Navbar",
      "It starts with a large sticky header and transitions to a compact navbar on scroll with smooth animation.",
    ),
    code: `import { useEffect, useState } from "react";

export function ScrollShrinkingNavbar() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-3 z-20">
      <nav
        className={
          "mx-auto flex w-[min(1080px,94%)] items-center justify-between rounded-xl border bg-white/90 px-4 backdrop-blur transition-all duration-300 " +
          (isCompact ? "py-2 shadow-md" : "py-4 shadow-sm")
        }
      >
        ${SNIPPET_LOGO_MARKUP}
        <div className="hidden gap-6 text-sm md:flex">
          <a>Components</a>
          <a>Templates</a>
          <a>Docs</a>
        </div>
        <button className="rounded-lg bg-black px-3 py-2 text-white">Try now</button>
      </nav>
    </header>
  );
}`,
    prompt:
      "Create a React sticky navbar animation where a large header shrinks to a compact navbar on scroll with smooth transitions.",
  },
  {
    slug: "dashboard-sidebar",
    title: "Dashboard Sidebar",
    category: "Sidebars",
    tags: ["dashboard", "sidebar", "admin"],
    summary: "Sidebar navigation designed for dashboard and admin layouts.",
    seoText: buildSeoText(
      "Dashboard Sidebar",
      "It includes structured navigation groups for analytics and settings pages.",
    ),
    code: `export function DashboardSidebar() {
  return (
    <aside className="w-64 rounded-2xl border bg-white p-4">
      <h3 className="mb-4 text-sm font-semibold">Workspace</h3>
      <nav className="space-y-2 text-sm">
        <a className="block rounded-lg px-3 py-2 hover:bg-neutral-100">Overview</a>
        <a className="block rounded-lg px-3 py-2 hover:bg-neutral-100">Analytics</a>
        <a className="block rounded-lg px-3 py-2 hover:bg-neutral-100">Settings</a>
      </nav>
    </aside>
  );
}`,
    prompt:
      "Create a dashboard sidebar with grouped links, active item styling, and compact spacing for productivity apps.",
  },
  {
    slug: "stripe-mega-navbar",
    title: "Stripe Mega Navbar",
    category: "Mega Menus",
    tags: ["stripe", "mega-menu", "navbar"],
    summary: "Stripe-inspired top navbar with a broad product mega panel.",
    seoText: buildSeoText(
      "Stripe Mega Navbar",
      "It includes a broad product dropdown panel designed for SaaS navigation.",
    ),
    code: `export function StripeMegaNavbar() {
  return (
    <nav className="rounded-xl border bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        ${SNIPPET_LOGO_MARKUP}
        <button className="rounded-lg border px-3 py-2 text-sm">Products</button>
      </div>
      <div className="mt-3 grid gap-3 rounded-xl border bg-neutral-50 p-3 md:grid-cols-3">
        <a className="rounded-lg bg-white p-3 text-sm">Payments</a>
        <a className="rounded-lg bg-white p-3 text-sm">Billing</a>
        <a className="rounded-lg bg-white p-3 text-sm">Checkout</a>
      </div>
    </nav>
  );
}`,
    prompt:
      "Create a Stripe mega navbar with a multi-column product panel and clean Tailwind CSS spacing.",
  },
  {
    slug: "linear-navbar",
    title: "Linear Navbar",
    category: "Navbars",
    tags: ["linear", "minimal", "animated"],
    summary: "Minimal linear-style navigation with clean hierarchy.",
    seoText: buildSeoText(
      "Linear Navbar",
      "It uses concise links and minimal visual weight for modern product sites.",
    ),
    code: `export function LinearNavbar() {
  return (
    <nav className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
      <a className="font-medium">Linear</a>
      <div className="hidden gap-6 text-sm md:flex">
        <a>Product</a>
        <a>Docs</a>
        <a>Company</a>
      </div>
      <button className="rounded-lg border px-3 py-2">Get started</button>
    </nav>
  );
}`,
    prompt:
      "Create a Linear-inspired navbar with minimal styling, concise links, and smooth interaction states.",
  },
  {
    slug: "sticky-cta-navbar",
    title: "Sticky CTA Navbar",
    category: "Navbars",
    tags: ["sticky", "cta", "saas"],
    summary: "Sticky top navbar that keeps a strong CTA visible.",
    seoText: buildSeoText(
      "Sticky CTA Navbar",
      "It keeps a high-priority call-to-action visible while users scroll.",
    ),
    code: `export function StickyCtaNavbar() {
  return (
    <header className="sticky top-3 z-20">
      <nav className="mx-auto flex w-[min(1080px,94%)] items-center justify-between rounded-xl border bg-white/90 px-4 py-3 backdrop-blur">
        ${SNIPPET_LOGO_MARKUP}
        <div className="hidden gap-6 text-sm md:flex">
          <a>Features</a>
          <a>Pricing</a>
          <a>Docs</a>
        </div>
        <button className="rounded-lg bg-black px-3 py-2 text-white">Start free</button>
      </nav>
    </header>
  );
}`,
    prompt:
      "Create a sticky navbar with a prominent CTA button that remains visible while scrolling.",
  },
  {
    slug: "glass-navbar",
    title: "Glass Navbar",
    category: "Navbars",
    tags: ["glass", "modern", "blur"],
    summary: "Glassmorphism navbar with blur and soft border contrast.",
    seoText: buildSeoText(
      "Glass Navbar",
      "It uses translucent surfaces and backdrop blur for a modern interface.",
    ),
    code: `export function GlassNavbar() {
  return (
    <nav className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/60 px-4 py-3 backdrop-blur-xl">
      ${SNIPPET_LOGO_MARKUP}
      <div className="hidden gap-5 text-sm md:flex">
        <a>Showcase</a>
        <a>Components</a>
        <a>About</a>
      </div>
      <button className="rounded-lg bg-black px-3 py-2 text-white">Install</button>
    </nav>
  );
}`,
    prompt:
      "Create a glass navbar with backdrop blur, subtle borders, and responsive desktop/mobile behavior.",
  },
  {
    slug: "collapsible-sidebar",
    title: "Collapsible Sidebar",
    category: "Sidebars",
    tags: ["sidebar", "collapsible", "dashboard"],
    summary: "Dashboard sidebar with expandable and collapsible sections.",
    seoText: buildSeoText(
      "Collapsible Sidebar",
      "It supports expandable navigation groups for scalable dashboard information architecture.",
    ),
    code: `export function CollapsibleSidebar() {
  return (
    <aside className="w-64 rounded-2xl border bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold">Workspace</h3>
      <details open className="mb-2">
        <summary className="cursor-pointer rounded-lg px-3 py-2 text-sm">Overview</summary>
        <div className="mt-1 space-y-1 pl-2 text-sm">
          <a className="block rounded-md px-3 py-2 hover:bg-neutral-100">Analytics</a>
          <a className="block rounded-md px-3 py-2 hover:bg-neutral-100">Reports</a>
        </div>
      </details>
    </aside>
  );
}`,
    prompt:
      "Create a collapsible sidebar with expandable groups and compact dashboard link styling.",
  },
  {
    slug: "mobile-drawer",
    title: "Mobile Drawer",
    category: "Mobile Navigation",
    tags: ["mobile", "drawer", "off-canvas"],
    summary: "Off-canvas mobile drawer navigation with layered panel layout.",
    seoText: buildSeoText(
      "Mobile Drawer",
      "It provides an off-canvas menu pattern optimized for touch-first navigation.",
    ),
    code: `export function MobileDrawer() {
  return (
    <div>
      <button className="rounded-lg border px-3 py-2">Menu</button>
      <aside className="fixed inset-y-0 left-0 w-72 border-r bg-white p-4">
        <nav className="space-y-2 text-sm">
          <a className="block rounded-lg px-3 py-2 hover:bg-neutral-100">Home</a>
          <a className="block rounded-lg px-3 py-2 hover:bg-neutral-100">Components</a>
          <a className="block rounded-lg px-3 py-2 hover:bg-neutral-100">Pricing</a>
        </nav>
      </aside>
    </div>
  );
}`,
    prompt:
      "Create a mobile drawer navigation with an off-canvas panel and touch-friendly links.",
  },
  {
    slug: "bottom-mobile-nav",
    title: "Bottom Mobile Nav",
    category: "Mobile Navigation",
    tags: ["mobile", "bottom-nav", "compact"],
    summary: "Bottom navigation bar tailored for mobile app-like browsing.",
    seoText: buildSeoText(
      "Bottom Mobile Nav",
      "It keeps primary actions reachable at the thumb zone near the bottom of the screen.",
    ),
    code: `export function BottomMobileNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 flex w-[92%] -translate-x-1/2 justify-around rounded-2xl border bg-white p-2 shadow-sm md:hidden">
      <button className="rounded-lg px-3 py-2 text-sm">Home</button>
      <button className="rounded-lg px-3 py-2 text-sm">Explore</button>
      <button className="rounded-lg px-3 py-2 text-sm">Profile</button>
    </nav>
  );
}`,
    prompt:
      "Create a bottom mobile navigation bar with three primary actions and floating elevated styling.",
  },
  {
    slug: "animated-underline-navbar",
    title: "Animated Underline Navbar",
    category: "Navbars",
    tags: ["animated", "underline", "hover"],
    summary: "Navigation links with elegant underline animation on interaction.",
    seoText: buildSeoText(
      "Animated Underline Navbar",
      "It uses subtle link underline animations to improve interaction feedback.",
    ),
    code: `export function AnimatedUnderlineNavbar() {
  return (
    <nav className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
      ${SNIPPET_LOGO_MARKUP}
      <div className="hidden items-center gap-6 text-sm md:flex">
        <a className="group relative py-1">Product<span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all group-hover:w-full" /></a>
        <a className="group relative py-1">Docs<span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all group-hover:w-full" /></a>
      </div>
    </nav>
  );
}`,
    prompt:
      "Create an animated underline navbar where links reveal a smooth underline on hover and focus.",
  },
  {
    slug: "dock-navigation",
    title: "Dock Navigation",
    category: "Dock Navigation",
    tags: ["dock", "animated", "floating"],
    summary: "Floating dock-style navbar with compact action buttons.",
    seoText: buildSeoText(
      "Dock Navigation",
      "It presents actions in a floating dock pattern inspired by desktop app launchers.",
    ),
    code: `export function DockNavigation() {
  return (
    <div className="mx-auto flex w-fit items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm">
      <button className="rounded-lg px-3 py-2 text-sm hover:bg-neutral-100">Home</button>
      <button className="rounded-lg px-3 py-2 text-sm hover:bg-neutral-100">Search</button>
      <button className="rounded-lg px-3 py-2 text-sm hover:bg-neutral-100">Library</button>
    </div>
  );
}`,
    prompt:
      "Create a dock navigation component with rounded floating controls and smooth hover/tap feedback.",
  },
  {
    slug: "nested-sidebar",
    title: "Nested Sidebar",
    category: "Sidebars",
    tags: ["sidebar", "nested", "dashboard"],
    summary: "Multi-level sidebar with nested groups for dense product navigation.",
    seoText: buildSeoText(
      "Nested Sidebar",
      "It supports nested links and expandable groups for complex dashboard structures.",
    ),
    code: `export function NestedSidebar() {
  return (
    <aside className="w-64 rounded-2xl border bg-white p-4">
      <details open>
        <summary className="rounded-lg bg-neutral-100 px-3 py-2 text-sm">Home</summary>
        <div className="mt-1 pl-2 text-sm">
          <a className="block rounded-md px-3 py-2 hover:bg-neutral-100">Gallery</a>
          <a className="block rounded-md px-3 py-2 hover:bg-neutral-100">Categories</a>
        </div>
      </details>
    </aside>
  );
}`,
    prompt:
      "Create a nested sidebar navigation with expandable parent groups and compact child links for dashboard apps.",
  },
  {
    slug: "workspace-switcher",
    title: "Workspace Switcher",
    category: "Sidebars",
    tags: ["workspace", "sidebar", "saas"],
    summary: "Sidebar navbar with workspace switcher and section shortcuts.",
    seoText: buildSeoText(
      "Workspace Switcher",
      "It includes workspace context switching and primary navigation sections.",
    ),
    code: `export function WorkspaceSwitcherNavbar() {
  return (
    <aside className="w-64 rounded-2xl border bg-white p-4">
      <button className="mb-3 inline-flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-black text-xs font-bold text-white">N</span>
        Workspace: NavUI
      </button>
      <nav className="space-y-2 text-sm">
        <a className="block rounded-lg bg-neutral-100 px-3 py-2">Home</a>
        <a className="block rounded-lg px-3 py-2 hover:bg-neutral-100">Gallery</a>
        <a className="block rounded-lg px-3 py-2 hover:bg-neutral-100">Categories</a>
      </nav>
    </aside>
  );
}`,
    prompt:
      "Create a workspace switcher sidebar with a workspace dropdown trigger and clear section navigation links.",
  },
  {
    slug: "command-palette",
    title: "Command Palette Navbar",
    category: "Navbars",
    tags: ["command", "keyboard", "search"],
    summary: "Top navbar with command palette trigger for fast keyboard navigation.",
    seoText: buildSeoText(
      "Command Palette Navbar",
      "It includes a command menu trigger for power-user keyboard navigation.",
    ),
    code: `export function CommandPaletteNavbar() {
  return (
    <nav className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
      ${SNIPPET_LOGO_MARKUP}
      <button className="rounded-lg border px-3 py-2 text-sm">Search commands (Ctrl+K)</button>
      <a className="rounded-lg bg-black px-3 py-2 text-sm text-white">Contribute</a>
    </nav>
  );
}`,
    prompt:
      "Create a command palette navbar with a keyboard shortcut trigger and clean desktop/mobile behavior.",
  },
  {
    slug: "gradient-navbar",
    title: "Gradient Navbar",
    category: "Navbars",
    tags: ["gradient", "modern", "visual"],
    summary: "Modern navbar with subtle gradient backdrop and high-contrast links.",
    seoText: buildSeoText(
      "Gradient Navbar",
      "It uses a soft gradient background with clear navigation and CTA hierarchy.",
    ),
    code: `export function GradientNavbar() {
  return (
    <nav className="rounded-2xl border bg-linear-to-r from-sky-50 to-indigo-50 px-4 py-3">
      <div className="flex items-center justify-between">
        ${SNIPPET_LOGO_MARKUP}
        <div className="hidden gap-6 text-sm md:flex">
          <a>Gallery</a>
          <a>Categories</a>
          <a>How It Works</a>
        </div>
        <a className="rounded-lg bg-black px-3 py-2 text-sm text-white">Contribute</a>
      </div>
    </nav>
  );
}`,
    prompt:
      "Create a gradient navbar with subtle color blending, clear nav links, and a strong CTA button.",
  },
  {
    slug: "floating-center-navbar",
    title: "Floating Center Navbar",
    category: "Navbars",
    tags: ["floating", "center", "desktop"],
    summary: "Centered floating nav pill with links and compact controls.",
    seoText: buildSeoText(
      "Floating Center Navbar",
      "It presents navigation as a centered floating container with subtle shadow.",
    ),
    code: `export function FloatingCenterNavbar() {
  return (
    <nav className="mx-auto flex w-fit items-center gap-3 rounded-full border bg-white px-3 py-2 shadow-sm">
      <a className="rounded-full px-3 py-2 text-sm">Home</a>
      <a className="rounded-full px-3 py-2 text-sm">Gallery</a>
      <a className="rounded-full px-3 py-2 text-sm">Categories</a>
      <a className="rounded-full bg-black px-3 py-2 text-sm text-white">Contribute</a>
    </nav>
  );
}`,
    prompt:
      "Create a floating centered navbar with pill-style links and polished spacing for modern landing pages.",
  },
  {
    slug: "morphing-menu",
    title: "Morphing Menu Navbar",
    category: "Navbars",
    tags: ["animated", "morphing", "menu"],
    summary: "Animated menu trigger that morphs between closed and open states.",
    seoText: buildSeoText(
      "Morphing Menu Navbar",
      "It includes a morphing menu trigger with smooth state transitions and clean link layout.",
    ),
    code: `export function MorphingMenuNavbar() {
  return (
    <nav className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
      ${SNIPPET_LOGO_MARKUP}
      <button className="rounded-lg border px-3 py-2 text-sm">Menu</button>
      <a className="rounded-lg bg-black px-3 py-2 text-sm text-white">Contribute</a>
    </nav>
  );
}`,
    prompt:
      "Create a morphing menu navbar with animated menu-toggle states and clear primary navigation links.",
  },
  {
    slug: "expandable-mobile-nav",
    title: "Expandable Mobile Nav",
    category: "Mobile Navigation",
    tags: ["mobile", "expandable", "touch"],
    summary: "Touch-first mobile nav that expands to reveal more actions.",
    seoText: buildSeoText(
      "Expandable Mobile Nav",
      "It starts compact and expands smoothly to expose additional navigation actions.",
    ),
    code: `export function ExpandableMobileNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 flex w-[92%] -translate-x-1/2 items-center justify-between rounded-2xl border bg-white p-2 shadow-sm md:hidden">
      <button className="rounded-lg px-3 py-2 text-sm">Home</button>
      <button className="rounded-lg bg-neutral-100 px-3 py-2 text-sm">Gallery</button>
      <button className="rounded-lg px-3 py-2 text-sm">More</button>
    </nav>
  );
}`,
    prompt:
      "Create an expandable mobile nav with compact default state and smooth reveal of additional items.",
  },
  {
    slug: "tab-navigation",
    title: "Tab Navigation",
    category: "Navbars",
    tags: ["tabs", "segmented", "navigation"],
    summary: "Segmented tab-style navigation for quick section switching.",
    seoText: buildSeoText(
      "Tab Navigation",
      "It uses tabbed navigation groups with strong active-state clarity.",
    ),
    code: `export function TabNavigationNavbar() {
  return (
    <nav className="rounded-xl border bg-white p-2">
      <div className="flex gap-2 text-sm">
        <a className="rounded-lg bg-black px-3 py-2 text-white">Home</a>
        <a className="rounded-lg px-3 py-2">Gallery</a>
        <a className="rounded-lg px-3 py-2">Categories</a>
      </div>
    </nav>
  );
}`,
    prompt:
      "Create a tab navigation component with segmented active state and clear keyboard/focus styles.",
  },
  {
    slug: "hybrid-navbar",
    title: "Hybrid Navbar",
    category: "Mega Menus",
    tags: ["hybrid", "mega-menu", "responsive"],
    summary: "Hybrid navbar combining classic top links and compact mega panel.",
    seoText: buildSeoText(
      "Hybrid Navbar",
      "It blends top-level links with a lightweight mega panel for richer navigation.",
    ),
    code: `export function HybridNavbar() {
  return (
    <nav className="rounded-xl border bg-white px-4 py-3">
      <div className="flex items-center justify-between">
        ${SNIPPET_LOGO_MARKUP}
        <div className="hidden gap-5 text-sm md:flex">
          <a>Gallery</a>
          <a>Categories</a>
          <a>How It Works</a>
        </div>
        <a className="rounded-lg bg-black px-3 py-2 text-sm text-white">Contribute</a>
      </div>
    </nav>
  );
}`,
    prompt:
      "Create a hybrid navbar that combines standard links with a compact mega menu preview panel.",
  },
  {
    slug: "floating-action-navbar",
    title: "Floating Action Navbar",
    category: "Dock Navigation",
    tags: ["floating", "action", "dock"],
    summary: "Floating navbar with an emphasized central action.",
    seoText: buildSeoText(
      "Floating Action Navbar",
      "It highlights the main action in a floating layout while keeping navigation compact.",
    ),
    code: `export function FloatingActionNavbar() {
  return (
    <nav className="mx-auto flex w-fit items-center gap-2 rounded-full border bg-white p-2 shadow-sm">
      <a className="rounded-full px-3 py-2 text-sm">Home</a>
      <a className="rounded-full px-3 py-2 text-sm">Gallery</a>
      <a className="rounded-full bg-black px-3 py-2 text-sm text-white">Contribute</a>
    </nav>
  );
}`,
    prompt:
      "Create a floating action navbar with a dominant center CTA and supportive navigation links.",
  },
  {
    slug: "macos-dock-navbar",
    title: "Mac Dock Style Navigation",
    category: "Dock Navigation",
    tags: ["macos", "dock", "magnification", "floating"],
    summary: "Floating dock navbar with icon magnification and hover lift interactions.",
    seoText: buildSeoText(
      "Mac Dock Style Navigation",
      "It mimics macOS dock behavior with icon magnification, hover scaling, and a floating surface.",
    ),
    code: `export function MacDockNavbar() {
  return (
    <nav className="mx-auto flex w-fit items-end gap-1 rounded-full border bg-white/90 p-2 shadow-xl backdrop-blur">
      <button className="rounded-full p-2 transition hover:-translate-y-1 hover:scale-125">Home</button>
      <button className="rounded-full p-2 transition hover:-translate-y-1 hover:scale-125">Gallery</button>
      <button className="rounded-full p-2 transition hover:-translate-y-1 hover:scale-125">Categories</button>
      <a className="rounded-full bg-black px-3 py-2 text-xs text-white">Contribute</a>
    </nav>
  );
}`,
    prompt:
      "Create a Mac Dock style navigation with icon magnification on hover, floating surface, and smooth scale transitions.",
  },
];

export function getNavbarBySlug(slug: string) {
  return navbars.find((item) => item.slug === slug);
}

export const navbarOnlyItems = navbars.filter((item) => item.category === "Navbars");

export const navbarCategories = Array.from(
  new Set(navbars.map((item) => item.category)),
).sort();

export const navbarTags = Array.from(
  new Set(navbars.flatMap((item) => item.tags)),
).sort();

// Some patterns are desktop-first and not useful on narrow screens.
const MOBILE_HIDDEN_NAVBAR_SLUGS = new Set<string>([
  "stripe-mega-navbar",
  "dashboard-sidebar",
  "collapsible-sidebar",
  "nested-sidebar",
  "workspace-switcher",
]);

export function isNavbarMobileFriendly(slug: string) {
  return !MOBILE_HIDDEN_NAVBAR_SLUGS.has(slug);
}
