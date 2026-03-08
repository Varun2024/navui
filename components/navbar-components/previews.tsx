import type { ReactNode } from "react";
import Link from "next/link";
import { Compass, Grid3X3, Home, Menu, Sparkles, Workflow } from "lucide-react";
import { NavUILogo } from "@/components/ui/NavUILogo";

const GITHUB_REPO_URL = "https://github.com/Varun2024/navui.git";

type PreviewProps = {
  slug: string;
};

function StripeNavbarPreview() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-neutral-950">
      <span className="text-sm font-semibold">Acme</span>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-700 dark:text-neutral-300">
        <Link href="/gallery">Gallery</Link>
        <Link href="/#categories">Categories</Link>
        <Link href="/#how-it-works">How It Works</Link>
      </div>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-black px-2.5 py-1 text-[11px] text-white transition active:scale-95 dark:bg-white dark:text-black">
        Contribute
      </Link>
    </nav>
  );
}

function LinearNavbarPreview() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-300/70 bg-slate-50 px-2.5 py-2 font-mono dark:border-slate-600/70 dark:bg-slate-900/70">
      <span className="text-sm font-medium tracking-tight">Linear</span>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-700 dark:text-neutral-300">
        <Link href="/gallery">Gallery</Link>
        <Link href="/#categories">Categories</Link>
        <Link href="/#how-it-works">How It Works</Link>
      </div>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md border border-black/10 px-2.5 py-1 text-[11px] transition active:scale-95 dark:border-white/10">
        Contribute
      </Link>
    </nav>
  );
}

function GlassNavbarPreview() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-black/10 bg-white/70 px-2.5 py-2 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70">
      <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-700 dark:text-neutral-300">
        <Link href="/gallery">Gallery</Link>
        <Link href="/#categories">Categories</Link>
        <Link href="/#how-it-works">How It Works</Link>
      </div>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-black px-2.5 py-1 text-[11px] text-white transition active:scale-95 dark:bg-white dark:text-black">
        Contribute
      </Link>
    </nav>
  );
}

function ScrollNavbarPreview() {
  return (
    <header className="sticky top-2">
      <nav className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/10 bg-neutral-900 px-2.5 py-2 shadow-sm dark:border-white/10 dark:bg-neutral-950/85">
        <NavUILogo compact textClassName="text-neutral-100" />
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-300">
          <Link href="/gallery">Gallery</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#how-it-works">How It Works</Link>
        </div>
        <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-white px-2.5 py-1 text-[11px] text-black transition active:scale-95">
          Contribute
        </Link>
      </nav>
    </header>
  );
}

function DashboardSidebarPreview() {
  return (
    <div className="grid gap-3 md:grid-cols-[180px,1fr]">
      <aside className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-2.5 dark:border-indigo-400/40 dark:bg-indigo-950/30">
        <p className="mb-3 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Workspace
        </p>
        <div className="space-y-1.5 text-xs">
          <Link href="/" className="block rounded-lg bg-neutral-100 px-2 py-1.5 dark:bg-neutral-900">Home</Link>
          <Link href="/gallery" className="block rounded-lg px-2 py-1.5">Gallery</Link>
          <Link href="/#categories" className="block rounded-lg px-2 py-1.5">Categories</Link>
        </div>
      </aside>
      <section className="rounded-2xl border border-dashed border-black/15 bg-neutral-50 p-4 dark:border-white/15 dark:bg-neutral-900" />
    </div>
  );
}

function MobileBottomNavPreview() {
  return (
    <div className="relative min-h-42.5 rounded-2xl border border-dashed border-emerald-300/60 bg-emerald-50 p-3 dark:border-emerald-400/30 dark:bg-emerald-950/20">
      <nav className="absolute bottom-3 left-1/2 flex w-[94%] -translate-x-1/2 justify-around rounded-2xl border border-emerald-200 bg-white p-1.5 shadow-sm dark:border-emerald-400/30 dark:bg-neutral-950">
        <Link href="/" className="rounded-lg px-2 py-1.5 text-[11px] transition active:scale-95 active:bg-neutral-100 dark:active:bg-neutral-900">Home</Link>
        <Link href="/gallery" className="rounded-lg bg-neutral-100 px-2 py-1.5 text-[11px] transition active:scale-95 dark:bg-neutral-900">Gallery</Link>
        <Link href="/#how-it-works" className="rounded-lg px-2 py-1.5 text-[11px] transition active:scale-95 active:bg-neutral-100 dark:active:bg-neutral-900">How It Works</Link>
      </nav>
    </div>
  );
}

function DockNavigationPreview() {
  return (
    <div className="mx-auto flex w-fit items-end gap-1 rounded-full border border-black/10 bg-white/90 p-2 shadow-xl backdrop-blur dark:border-white/10 dark:bg-neutral-950/90">
      <Link href="/" className="group rounded-full p-2.5 transition hover:-translate-y-1 hover:scale-125 hover:bg-neutral-100 dark:hover:bg-neutral-900" aria-label="Home">
        <Home size={14} />
      </Link>
      <Link href="/gallery" className="group rounded-full p-2.5 transition hover:-translate-y-1 hover:scale-125 hover:bg-neutral-100 dark:hover:bg-neutral-900" aria-label="Gallery">
        <Grid3X3 size={14} />
      </Link>
      <Link href="/#categories" className="group rounded-full p-2.5 transition hover:-translate-y-1 hover:scale-125 hover:bg-neutral-100 dark:hover:bg-neutral-900" aria-label="Categories">
        <Compass size={14} />
      </Link>
      <Link href="/#how-it-works" className="group rounded-full p-2.5 transition hover:-translate-y-1 hover:scale-125 hover:bg-neutral-100 dark:hover:bg-neutral-900" aria-label="How It Works">
        <Workflow size={14} />
      </Link>
    </div>
  );
}

function MegaMenuPreview() {
  return (
    <div className="space-y-3">
      <nav className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-neutral-950">
        <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
        <Link href="/gallery" className="rounded-md border border-black/10 px-2.5 py-1 text-[11px] transition active:scale-95 dark:border-white/10">
          Gallery
        </Link>
      </nav>
      <div className="grid gap-2 rounded-xl border border-amber-200 bg-amber-50 p-2 sm:grid-cols-2 lg:grid-cols-3 dark:border-amber-400/35 dark:bg-amber-950/20">
        <Link href="/gallery" className="rounded-lg bg-white p-2 text-[11px] dark:bg-neutral-950">Gallery</Link>
        <Link href="/#categories" className="rounded-lg bg-white p-2 text-[11px] dark:bg-neutral-950">Categories</Link>
        <Link href="/#how-it-works" className="rounded-lg bg-white p-2 text-[11px] dark:bg-neutral-950">How It Works</Link>
      </div>
    </div>
  );
}

function StripeMegaNavbarPreview() {
  return (
    <div className="space-y-2.5">
      <nav className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-neutral-950">
        <span className="text-sm font-semibold">StripeUI</span>
        <Link href="/gallery" className="rounded-md border border-black/10 px-2.5 py-1 text-[11px] transition active:scale-95 dark:border-white/10">
          Gallery
        </Link>
      </nav>
      <div className="grid gap-2 rounded-xl border border-violet-200 bg-violet-50 p-2 md:grid-cols-3 dark:border-violet-400/35 dark:bg-violet-950/20">
        <Link href="/gallery" className="rounded-lg bg-white p-2 text-[11px] dark:bg-neutral-950">Gallery</Link>
        <Link href="/#categories" className="rounded-lg bg-white p-2 text-[11px] dark:bg-neutral-950">Categories</Link>
        <Link href="/#how-it-works" className="rounded-lg bg-white p-2 text-[11px] dark:bg-neutral-950">How It Works</Link>
      </div>
    </div>
  );
}

function StickyCtaNavbarPreview() {
  return (
    <header className="sticky top-2">
      <nav className="flex items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-white/90 px-2.5 py-2 shadow-sm backdrop-blur dark:border-emerald-400/35 dark:bg-neutral-950/90">
        <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
        <div className="hidden items-center gap-3 text-[11px] text-neutral-700 dark:text-neutral-300 sm:flex">
          <Link href="/gallery">Gallery</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#how-it-works">How It Works</Link>
        </div>
        <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-emerald-600 px-2.5 py-1 text-[11px] text-white transition active:scale-95 dark:bg-emerald-400 dark:text-black">
          Contribute
        </Link>
      </nav>
    </header>
  );
}

function ScrollClassicNavbarPreview() {
  return (
    <header className="sticky top-0">
      <nav className="flex items-center justify-between gap-2 border-b border-black/10 bg-white/95 px-2.5 py-2.5 backdrop-blur dark:border-white/10 dark:bg-neutral-950/95">
        <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
        <div className="flex items-center gap-x-3 gap-y-1 text-[11px] text-neutral-700 dark:text-neutral-300">
          <Link href="/gallery">Gallery</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/#how-it-works">How It Works</Link>
        </div>
      </nav>
    </header>
  );
}

function CollapsibleSidebarPreview() {
  return (
    <div className="grid gap-3 md:grid-cols-[180px,1fr]">
      <aside className="rounded-2xl border border-orange-200 bg-orange-50/60 p-2.5 dark:border-orange-400/30 dark:bg-orange-950/20">
        <details open>
          <summary className="cursor-pointer rounded-lg bg-neutral-100 px-2 py-1.5 text-xs transition active:scale-[0.99] dark:bg-neutral-900">
            Home
          </summary>
          <div className="mt-1.5 space-y-1 text-[11px]">
            <Link href="/gallery" className="block w-full rounded-lg px-2 py-1.5 text-left transition active:bg-neutral-100 dark:active:bg-neutral-900">Gallery</Link>
            <Link href="/#categories" className="block w-full rounded-lg px-2 py-1.5 text-left transition active:bg-neutral-100 dark:active:bg-neutral-900">Categories</Link>
          </div>
        </details>
        <details className="mt-2">
          <summary className="cursor-pointer rounded-lg px-2 py-1.5 text-xs transition active:scale-[0.99]">Sections</summary>
          <div className="mt-1.5 space-y-1 text-[11px]">
            <Link href="/#how-it-works" className="block w-full rounded-lg px-2 py-1.5 text-left transition active:bg-neutral-100 dark:active:bg-neutral-900">How It Works</Link>
            <Link href="/gallery" className="block w-full rounded-lg px-2 py-1.5 text-left transition active:bg-neutral-100 dark:active:bg-neutral-900">Gallery</Link>
          </div>
        </details>
      </aside>
      <section className="rounded-2xl border border-dashed border-black/15 bg-neutral-50 p-4 dark:border-white/15 dark:bg-neutral-900" />
    </div>
  );
}

function MobileDrawerPreview() {
  return (
    <div className="relative min-h-42.5 overflow-hidden rounded-2xl border border-dashed border-black/15 bg-neutral-50 p-3 dark:border-white/15 dark:bg-neutral-900">
      <button className="mb-2 inline-flex items-center gap-1 rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11px] transition active:scale-95 dark:border-white/10 dark:bg-neutral-950">
        <Menu size={12} />
        Menu
      </button>
      <aside className="h-27.5 w-[62%] translate-x-0 rounded-xl border border-black/10 bg-white p-2 shadow-sm transition-transform dark:border-white/10 dark:bg-neutral-950">
        <div className="space-y-1 text-[11px]">
          <Link href="/" className="block rounded-md bg-neutral-100 px-2 py-1.5 dark:bg-neutral-900">Home</Link>
          <Link href="/gallery" className="block rounded-md px-2 py-1.5">Gallery</Link>
          <Link href="/#categories" className="block rounded-md px-2 py-1.5">Categories</Link>
        </div>
      </aside>
    </div>
  );
}

function ExpandableMobileNavPreview() {
  return (
    <div className="relative min-h-42.5 rounded-2xl border border-dashed border-cyan-300/60 bg-cyan-50 p-3 dark:border-cyan-400/35 dark:bg-cyan-950/20">
      <details className="rounded-xl border border-cyan-200 bg-white p-2 dark:border-cyan-400/35 dark:bg-neutral-950" open>
        <summary className="cursor-pointer rounded-md bg-cyan-100 px-2.5 py-1.5 text-[11px] dark:bg-cyan-900/40">Collapse/Expand</summary>
        <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
          <Link href="/" className="rounded-md bg-neutral-100 px-2 py-1.5 text-center dark:bg-neutral-900">Home</Link>
          <Link href="/gallery" className="rounded-md bg-neutral-100 px-2 py-1.5 text-center dark:bg-neutral-900">Gallery</Link>
          <Link href="/#how-it-works" className="rounded-md bg-neutral-100 px-2 py-1.5 text-center dark:bg-neutral-900">How It Works</Link>
        </div>
      </details>
    </div>
  );
}

function BottomMobileNavPreview() {
  return (
    <div className="relative min-h-42.5 rounded-2xl border border-dashed border-black/15 bg-neutral-50 p-3 dark:border-white/15 dark:bg-neutral-900">
      <nav className="absolute bottom-3 left-1/2 flex w-[94%] -translate-x-1/2 justify-between rounded-2xl border border-black/10 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
        <Link href="/" className="rounded-lg px-2.5 py-1.5 text-[11px] transition active:scale-95 active:bg-neutral-100 dark:active:bg-neutral-900">Home</Link>
        <Link href="/gallery" className="rounded-lg bg-neutral-100 px-2.5 py-1.5 text-[11px] transition active:scale-95 dark:bg-neutral-900">Gallery</Link>
        <Link href="/#how-it-works" className="rounded-lg px-2.5 py-1.5 text-[11px] transition active:scale-95 active:bg-neutral-100 dark:active:bg-neutral-900">How It Works</Link>
      </nav>
    </div>
  );
}

function MinimalNavbarPreview() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 bg-white px-2 py-2.5 font-serif dark:border-white/10 dark:bg-neutral-950">
      <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-600 dark:text-neutral-300">
        <Link href="/">Home</Link>
        <Link href="/#categories">Categories</Link>
        <Link href="/#how-it-works">How It Works</Link>
      </div>
    </nav>
  );
}

function AnimatedUnderlineNavbarPreview() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-neutral-950">
      <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] sm:text-xs">
        <Link href="/gallery" className="group relative py-1">
          Gallery
          <span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-200 group-hover:w-full" />
        </Link>
        <Link href="/#categories" className="group relative py-1">
          Categories
          <span className="absolute bottom-0 left-0 h-px w-0 bg-current transition-all duration-200 group-hover:w-full" />
        </Link>
      </div>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md border border-black/10 px-2.5 py-1 text-[11px] transition active:scale-95 dark:border-white/10">
        Contribute
      </Link>
    </nav>
  );
}

function GradientNavbarPreview() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-transparent bg-linear-to-r from-fuchsia-500/30 via-indigo-500/35 to-sky-500/30 px-2.5 py-2 ring-1 ring-indigo-400/40 dark:from-fuchsia-500/35 dark:via-indigo-500/40 dark:to-cyan-500/35 dark:ring-sky-300/40">
      <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-neutral-900 dark:text-neutral-100">
        <Link href="/gallery">Gallery</Link>
        <Link href="/#categories">Categories</Link>
        <Link href="/#how-it-works">How It Works</Link>
      </div>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-black px-2.5 py-1 text-[11px] text-white dark:bg-white dark:text-black">
        Contribute
      </Link>
    </nav>
  );
}

function FloatingCenterNavbarPreview() {
  return (
    <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 p-1.5 shadow-md dark:border-orange-400/35 dark:bg-orange-950/20">
      <Link href="/" className="rounded-full px-3 py-1.5 text-[11px]">Home</Link>
      <Link href="/gallery" className="rounded-full px-3 py-1.5 text-[11px]">Gallery</Link>
      <Link href="/#categories" className="rounded-full px-3 py-1.5 text-[11px]">Categories</Link>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-black px-3 py-1.5 text-[11px] text-white dark:bg-white dark:text-black">Contribute</Link>
    </div>
  );
}

function CommandPaletteNavbarPreview() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/10 bg-neutral-900 px-2.5 py-2 text-neutral-100 dark:border-white/10 dark:bg-neutral-950">
      <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
      <button className="rounded-md border border-neutral-700 px-2.5 py-1 text-[11px]">Search commands (Ctrl+K)</button>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-white px-2.5 py-1 text-[11px] text-black">Contribute</Link>
    </nav>
  );
}

function MorphingMenuPreview() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-black/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-neutral-950">
      <NavUILogo compact textClassName="text-neutral-100" />
      <button className="inline-flex items-center gap-1 rounded-md border border-black/10 px-2.5 py-1 text-[11px] transition hover:scale-105 dark:border-white/10">
        <Sparkles size={12} />
        Morph Menu
      </button>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-black px-2.5 py-1 text-[11px] text-white dark:bg-white dark:text-black">Contribute</Link>
    </nav>
  );
}

function TabNavigationPreview() {
  return (
    <nav className="rounded-xl border border-black/10 bg-white p-1.5 dark:border-white/10 dark:bg-neutral-950">
      <div className="flex gap-1 text-[11px]">
        <Link href="/" className="rounded-lg bg-black px-2.5 py-1.5 text-white dark:bg-white dark:text-black">Home</Link>
        <Link href="/gallery" className="rounded-lg px-2.5 py-1.5">Gallery</Link>
        <Link href="/#categories" className="rounded-lg px-2.5 py-1.5">Categories</Link>
      </div>
    </nav>
  );
}

function HybridNavbarPreview() {
  return (
    <div className="space-y-2">
      <nav className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-neutral-950">
        <span className="text-sm font-semibold">HybridUI</span>
        <div className="hidden gap-3 text-[11px] md:flex">
          <Link href="/gallery">Gallery</Link>
          <Link href="/#categories">Categories</Link>
        </div>
        <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-black px-2.5 py-1 text-[11px] text-white dark:bg-white dark:text-black">Contribute</Link>
      </nav>
      <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 text-[11px] dark:border-slate-700 dark:bg-slate-900">
        <Link href="/" className="rounded-md bg-white px-2 py-1.5 dark:bg-neutral-950">Home</Link>
        <Link href="/gallery" className="rounded-md bg-white px-2 py-1.5 dark:bg-neutral-950">Gallery</Link>
        <Link href="/#how-it-works" className="rounded-md bg-white px-2 py-1.5 dark:bg-neutral-950">How It Works</Link>
      </div>
    </div>
  );
}

function FloatingActionNavbarPreview() {
  return (
    <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-black/10 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-neutral-950">
      <Link href="/" className="rounded-full px-3 py-1.5 text-[11px]">Home</Link>
      <Link href="/gallery" className="rounded-full px-3 py-1.5 text-[11px]">Gallery</Link>
      <Link href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-black px-3 py-1.5 text-[11px] text-white dark:bg-white dark:text-black">Contribute</Link>
      <Link href="/#categories" className="rounded-full px-3 py-1.5 text-[11px]">Categories</Link>
    </div>
  );
}

export function NavbarPreview({ slug }: PreviewProps): ReactNode {
  const previews: Record<string, ReactNode> = {
    "stripe-navbar": <StripeNavbarPreview />,
    "stripe-mega-navbar": <StripeMegaNavbarPreview />,
    "linear-navbar": <LinearNavbarPreview />,
    "sticky-cta-navbar": <StickyCtaNavbarPreview />,
    "glass-navbar": <GlassNavbarPreview />,
    "scroll-navbar": <ScrollNavbarPreview />,
    "scroll-navbar-classic": <ScrollClassicNavbarPreview />,
    "dashboard-sidebar": <DashboardSidebarPreview />,
    "collapsible-sidebar": <CollapsibleSidebarPreview />,
    "mega-menu": <MegaMenuPreview />,
    "mobile-bottom-nav": <MobileBottomNavPreview />,
    "bottom-mobile-nav": <BottomMobileNavPreview />,
    "mobile-drawer": <MobileDrawerPreview />,
    "minimal-navbar": <MinimalNavbarPreview />,
    "dock-navigation": <DockNavigationPreview />,
    "animated-underline-navbar": <AnimatedUnderlineNavbarPreview />,
    "nested-sidebar": <CollapsibleSidebarPreview />,
    "workspace-switcher": <DashboardSidebarPreview />,
    "command-palette": <CommandPaletteNavbarPreview />,
    "gradient-navbar": <GradientNavbarPreview />,
    "floating-center-navbar": <FloatingCenterNavbarPreview />,
    "morphing-menu": <MorphingMenuPreview />,
    "expandable-mobile-nav": <ExpandableMobileNavPreview />,
    "tab-navigation": <TabNavigationPreview />,
    "hybrid-navbar": <HybridNavbarPreview />,
    "floating-action-navbar": <FloatingActionNavbarPreview />,
    "macos-dock-navbar": <DockNavigationPreview />,
  };

  return previews[slug] ?? <StripeNavbarPreview />;
}
