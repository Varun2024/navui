"use client";

import { useEffect, useState, type ReactElement } from "react";
import {
  Compass,
  Grid3X3,
  Home,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Sun,
  X,
  Workflow,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavUILogo } from "@/components/ui/NavUILogo";
import {
  NAVBAR_STYLE_APPLIED_KEY,
  NAVBAR_STYLE_EVENT,
  NAVBAR_STYLE_STORAGE_KEY,
  navbars,
  type NavbarSlug,
} from "@/data/navbars";

const NAVBAR_TITLE_BY_SLUG = new Map(navbars.map((n) => [n.slug, n.title]));

const DEFAULT_STYLE = "";
const GITHUB_REPO_URL = "https://github.com/Varun2024/navui.git";

function getInitialStyleSlug() {
  if (typeof window === "undefined") {
    return DEFAULT_STYLE;
  }

  const hasApplied = window.localStorage.getItem(NAVBAR_STYLE_APPLIED_KEY) === "true";
  if (!hasApplied) {
    return DEFAULT_STYLE;
  }

  return window.localStorage.getItem(NAVBAR_STYLE_STORAGE_KEY) ?? DEFAULT_STYLE;
}

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      aria-label="Toggle theme"
      onClick={onToggle}
      className="tap-press touch-target inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white text-neutral-700 transition hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function navLinkClass(isActive: boolean, isCompact = false) {
  return [
    "tap-press inline-flex min-h-11 items-center gap-1.5 rounded-lg transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40",
    isCompact ? "px-2.5 py-1.5 text-xs" : "px-2.5 py-2 text-sm",
    isActive
      ? "bg-black text-white dark:bg-white dark:text-black"
      : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900",
  ].join(" ");
}

function TopNavbar({
  styleSlug,
  isDark,
  onToggle,
  isHome,
  isGallery,
  isCategories,
  isWorkflow,
}: {
  styleSlug: string;
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isCategories: boolean;
  isWorkflow: boolean;
}) {
  const isMega = styleSlug === "stripe-mega-navbar" || styleSlug === "hybrid-navbar";
  const isStickyCta = styleSlug === "sticky-cta-navbar";
  const isGlass = styleSlug === "glass-navbar";
  const isGradient = styleSlug === "gradient-navbar";
  const isMinimal = styleSlug === "minimal-navbar";
  const isScroll = styleSlug === "scroll-navbar";
  const isUnderline = styleSlug === "animated-underline-navbar";
  const [isCondensed, setIsCondensed] = useState(false);

  useEffect(() => {
    if (!isScroll) {
      return;
    }

    const onScroll = () => setIsCondensed(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isScroll]);

  const navClass = isGradient
    ? "border-transparent bg-linear-to-r from-sky-500/20 via-indigo-500/25 to-cyan-500/20 ring-1 ring-indigo-400/35 backdrop-blur-xl dark:from-indigo-500/25 dark:via-fuchsia-500/25 dark:to-sky-500/20 dark:ring-sky-300/35"
    : isGlass
      ? "border-black/10 bg-white/65 backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/60"
    : isScroll
      ? "border-black/10 bg-white/92 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-950/92"
      : "border-black/10 bg-white/90 shadow-sm dark:border-white/10 dark:bg-neutral-950/90";

  const brandLabel =
    styleSlug === "stripe-navbar"
      ? "Acme"
      : styleSlug === "linear-navbar"
        ? "Linear"
        : styleSlug === "stripe-mega-navbar"
          ? "StripeUI"
          : styleSlug === "gradient-navbar"
            ? "PrismUI"
          : "NavUI";

  const navLabels =
    styleSlug === "animated-underline-navbar"
      ? ["Gallery", "Categories", ""]
      : ["Gallery", "Categories", "How It Works"];

  const ctaLabel = "Contribute";

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="fixed left-0 right-0 top-2 z-40 mx-auto w-full px-[3%] sm:top-4"
    >
      <nav
        className={`mx-auto w-[min(1120px,100%)] rounded-2xl border px-3 transition-all duration-200 sm:px-4 md:px-6 ${
          isScroll && isCondensed ? "py-1.5 sm:py-2" : "py-2 sm:py-3"
        } ${navClass}`}
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className={`tap-press inline-flex min-h-11 items-center rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
              isMinimal
                ? ""
                : "rounded-lg bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
            }`}
          >
            {brandLabel === "NavUI" ? (
              <NavUILogo compact hideTextOnMobile textClassName="text-current" />
            ) : (
              brandLabel
            )}
          </Link>

          <div className="hidden items-center gap-5 text-sm md:flex">
            <Link
              href="/gallery"
              aria-current={isGallery ? "page" : undefined}
              className={`${navLinkClass(isGallery)} ${isUnderline ? "underline-offset-8" : ""}`}
            >
              {navLabels[0]}
            </Link>
            <Link
              href="/#categories"
              aria-current={isCategories ? "location" : undefined}
              className={navLinkClass(isCategories)}
            >
              {navLabels[1]}
            </Link>
            {!!navLabels[2] && (
              <Link
                href="/#how-it-works"
                aria-current={isWorkflow ? "location" : undefined}
                className={navLinkClass(isWorkflow)}
              >
                {navLabels[2]}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={onToggle} />
            {ctaLabel && (
              <Link
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`tap-press hidden min-h-11 items-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 sm:inline-flex ${
                  isStickyCta
                    ? "bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-black"
                    : "bg-black text-white hover:opacity-90 dark:bg-white dark:text-black"
                }`}
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 text-xs md:hidden">
          <Link
            href="/gallery"
            aria-current={isGallery ? "page" : undefined}
            className={navLinkClass(isGallery, true)}
          >
            {navLabels[0]}
          </Link>
          <Link
            href="/#categories"
            aria-current={isCategories ? "location" : undefined}
            className={navLinkClass(isCategories, true)}
          >
            {navLabels[1]}
          </Link>
          {!!navLabels[2] && (
            <Link
              href="/#how-it-works"
              aria-current={isWorkflow ? "location" : undefined}
              className={navLinkClass(isWorkflow, true)}
            >
              {navLabels[2]}
            </Link>
          )}
        </div>
      </nav>

      {isMega && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-2 hidden w-[min(1120px,100%)] rounded-2xl border border-black/10 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-neutral-950 md:grid md:grid-cols-3 md:gap-3"
        >
          <button className="tap-press rounded-lg bg-neutral-50 p-3 text-left text-sm transition active:scale-[0.99] dark:bg-neutral-900">Gallery</button>
          <button className="tap-press rounded-lg bg-neutral-50 p-3 text-left text-sm transition active:scale-[0.99] dark:bg-neutral-900">Categories</button>
          <button className="tap-press rounded-lg bg-neutral-50 p-3 text-left text-sm transition active:scale-[0.99] dark:bg-neutral-900">How It Works</button>
        </motion.div>
      )}
    </motion.header>
  );
}

function DockNavbar({
  isDark,
  onToggle,
  isHome,
  isGallery,
  isCategories,
}: {
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isCategories: boolean;
}) {
  const dockItems = [
    { href: "/", label: "Home", icon: Home, isActive: isHome },
    { href: "/gallery", label: "Gallery", icon: Grid3X3, isActive: isGallery },
    { href: "/#categories", label: "Categories", icon: Compass, isActive: isCategories },
  ] as const;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed bottom-2 left-1/2 z-40 flex w-[min(96vw,560px)] -translate-x-1/2 items-center justify-between gap-1 rounded-full border border-black/10 bg-white/90 px-2 py-[calc(env(safe-area-inset-bottom)+0.45rem)] shadow-2xl backdrop-blur dark:border-white/10 dark:bg-neutral-950/90 sm:bottom-4"
    >
      <div className="flex items-end gap-1">
        {dockItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={item.isActive ? "page" : undefined}
            className={`tap-press group inline-flex min-h-11 items-center justify-center rounded-full px-3 py-2 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 hover:-translate-y-0.5 hover:scale-125 dark:focus-visible:ring-white/40 ${
              item.isActive
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
            }`}
            title={item.label}
          >
            <item.icon size={15} />
            <span className="ml-1.5 hidden sm:inline">{item.label}</span>
          </Link>
        ))}
      </div>
      <ThemeToggle isDark={isDark} onToggle={onToggle} />
    </motion.nav>
  );
}

function ExpandableMobileNavbar({
  isDark,
  onToggle,
  isHome,
  isGallery,
  isWorkflow,
}: {
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isWorkflow: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed bottom-2 left-1/2 z-40 w-[min(560px,94vw)] -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-neutral-950"
    >
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setExpanded((value) => !value)}
          className="tap-press inline-flex min-h-11 items-center rounded-lg border border-black/10 px-3 py-2 text-xs dark:border-white/10"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
        <ThemeToggle isDark={isDark} onToggle={onToggle} />
      </div>

      <div className={`grid overflow-hidden transition-all duration-200 ${expanded ? "mt-2 max-h-44 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="grid grid-cols-3 gap-2">
          <Link href="/" className={`tap-press inline-flex min-h-11 items-center justify-center rounded-lg text-xs ${isHome ? "bg-black text-white dark:bg-white dark:text-black" : "bg-neutral-100 dark:bg-neutral-900"}`}>
            Home
          </Link>
          <Link href="/gallery" className={`tap-press inline-flex min-h-11 items-center justify-center rounded-lg text-xs ${isGallery ? "bg-black text-white dark:bg-white dark:text-black" : "bg-neutral-100 dark:bg-neutral-900"}`}>
            Gallery
          </Link>
          <Link href="/#how-it-works" className={`tap-press inline-flex min-h-11 items-center justify-center rounded-lg text-xs ${isWorkflow ? "bg-black text-white dark:bg-white dark:text-black" : "bg-neutral-100 dark:bg-neutral-900"}`}>
            How It Works
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

function MobileBottomNavbar({
  isDark,
  onToggle,
  isHome,
  isGallery,
  isWorkflow,
}: {
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isWorkflow: boolean;
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed bottom-2 left-1/2 z-40 flex w-[min(560px,94vw)] -translate-x-1/2 items-center justify-around rounded-2xl border border-black/10 bg-white px-2 py-[calc(env(safe-area-inset-bottom)+0.45rem)] shadow-lg dark:border-white/10 dark:bg-neutral-950"
    >
      <Link
        href="/"
        aria-current={isHome ? "page" : undefined}
        className={`tap-press inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
          isHome ? "bg-black text-white dark:bg-white dark:text-black" : ""
        }`}
      >
        <Home size={13} />
        Home
      </Link>
      <Link
        href="/gallery"
        aria-current={isGallery ? "page" : undefined}
        className={`tap-press inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
          isGallery
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-neutral-100 dark:bg-neutral-900"
        }`}
      >
        <Grid3X3 size={13} />
        Explore
      </Link>
      <Link
        href="/#how-it-works"
        aria-current={isWorkflow ? "location" : undefined}
        className={`tap-press inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
          isWorkflow ? "bg-black text-white dark:bg-white dark:text-black" : ""
        }`}
      >
        <Workflow size={13} />
        Flow
      </Link>
      <ThemeToggle isDark={isDark} onToggle={onToggle} />
    </motion.nav>
  );
}

function BottomMobileNavbar({
  isDark,
  onToggle,
  isHome,
  isGallery,
  isWorkflow,
}: {
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isWorkflow: boolean;
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed bottom-2 left-1/2 z-40 flex w-[min(560px,94vw)] -translate-x-1/2 items-center justify-between rounded-2xl border border-black/10 bg-white px-2 py-[calc(env(safe-area-inset-bottom)+0.45rem)] shadow-lg dark:border-white/10 dark:bg-neutral-950"
    >
      <Link
        href="/"
        aria-current={isHome ? "page" : undefined}
        className={`tap-press inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs ${
          isHome ? "bg-black text-white dark:bg-white dark:text-black" : ""
        }`}
      >
        <Home size={13} />
        Home
      </Link>
      <Link
        href="/gallery"
        aria-current={isGallery ? "page" : undefined}
        className={`tap-press inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs ${
          isGallery ? "bg-black text-white dark:bg-white dark:text-black" : "bg-neutral-100 dark:bg-neutral-900"
        }`}
      >
        <Grid3X3 size={13} />
        Explore
      </Link>
      <Link
        href="/#how-it-works"
        aria-current={isWorkflow ? "location" : undefined}
        className={`tap-press inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs ${
          isWorkflow ? "bg-black text-white dark:bg-white dark:text-black" : ""
        }`}
      >
        <Workflow size={13} />
        Flow
      </Link>
      <ThemeToggle isDark={isDark} onToggle={onToggle} />
    </motion.nav>
  );
}

function MobileDrawerNavbar({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="tap-press fixed left-3 top-20 z-40 inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-black/10 bg-white/95 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-950/95"
        aria-label="Open navigation menu"
      >
        <Menu size={17} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/30"
              aria-label="Close navigation menu"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[min(280px,82vw)] border-r border-black/10 bg-white/98 p-4 shadow-xl backdrop-blur dark:border-white/10 dark:bg-neutral-950/98"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="tap-press inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-black/10 dark:border-white/10"
                >
                  <X size={16} />
                </button>
              </div>
              <nav className="space-y-2 text-sm">
                <Link href="/" className="tap-press inline-flex min-h-11 w-full items-center rounded-lg bg-neutral-100 px-3 py-2 dark:bg-neutral-900">Home</Link>
                <Link href="/gallery" className="tap-press inline-flex min-h-11 w-full items-center rounded-lg px-3 py-2">Gallery</Link>
                <Link href="/#categories" className="tap-press inline-flex min-h-11 w-full items-center rounded-lg px-3 py-2">Categories</Link>
                <Link href="/#how-it-works" className="tap-press inline-flex min-h-11 w-full items-center rounded-lg px-3 py-2">How It Works</Link>
              </nav>
              <div className="mt-3 border-t border-black/10 pt-3 dark:border-white/10">
                <ThemeToggle isDark={isDark} onToggle={onToggle} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function DashboardSidebarNavbar({
  isDark,
  onToggle,
  isHome,
  isGallery,
  isCategories,
}: {
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isCategories: boolean;
}) {
  return (
    <>
      <motion.aside
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed left-3 top-20 z-40 hidden w-55 rounded-2xl border border-black/10 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-neutral-950 lg:block"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Workspace
          </p>
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
        </div>
        <div className="space-y-2 text-sm">
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className={`tap-press inline-flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
              isHome
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-neutral-100 dark:bg-neutral-900"
            }`}
          >
            <LayoutDashboard size={14} />
            Home
          </Link>
          <Link
            href="/gallery"
            aria-current={isGallery ? "page" : undefined}
            className={`tap-press inline-flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
              isGallery ? "bg-black text-white dark:bg-white dark:text-black" : ""
            }`}
          >
            <Grid3X3 size={14} />
            Gallery
          </Link>
          <Link
            href="/#categories"
            aria-current={isCategories ? "location" : undefined}
            className={`tap-press inline-flex min-h-11 w-full items-center gap-2 rounded-lg px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
              isCategories ? "bg-black text-white dark:bg-white dark:text-black" : ""
            }`}
          >
            <Compass size={14} />
            Categories
          </Link>
        </div>
        <Link
          href="/gallery"
          className="tap-press mt-4 inline-flex min-h-11 items-center rounded-lg border border-black/10 px-3 py-2 text-xs dark:border-white/10"
        >
          Browse Gallery
        </Link>
      </motion.aside>

      <motion.nav
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="fixed bottom-2 left-1/2 z-40 flex w-[min(560px,94vw)] -translate-x-1/2 items-center justify-between rounded-2xl border border-black/10 bg-white px-2 py-[calc(env(safe-area-inset-bottom)+0.45rem)] shadow-lg dark:border-white/10 dark:bg-neutral-950 lg:hidden"
      >
        <Link
          href="/"
          aria-current={isHome ? "page" : undefined}
          className={`tap-press inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
            isHome ? "bg-black text-white dark:bg-white dark:text-black" : ""
          }`}
        >
          <LayoutDashboard size={13} />
          Home
        </Link>
        <Link
          href="/gallery"
          aria-current={isGallery ? "page" : undefined}
          className={`tap-press inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
            isGallery ? "bg-black text-white dark:bg-white dark:text-black" : ""
          }`}
        >
          <Grid3X3 size={13} />
          Gallery
        </Link>
        <Link
          href="/#categories"
          aria-current={isCategories ? "location" : undefined}
          className={`tap-press inline-flex min-h-11 items-center gap-1 rounded-lg px-3 py-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/40 ${
            isCategories ? "bg-black text-white dark:bg-white dark:text-black" : ""
          }`}
        >
          <Compass size={13} />
          Categories
        </Link>
        <ThemeToggle isDark={isDark} onToggle={onToggle} />
      </motion.nav>
    </>
  );
}

function CollapsibleSidebarNavbar({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed left-3 top-20 z-40 hidden w-60 rounded-2xl border border-black/10 bg-white p-4 shadow-lg dark:border-white/10 dark:bg-neutral-950 lg:block"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Workspace</p>
        <ThemeToggle isDark={isDark} onToggle={onToggle} />
      </div>
      <details open className="mb-2">
        <summary className="tap-press cursor-pointer rounded-lg bg-neutral-100 px-3 py-2 text-sm dark:bg-neutral-900">Home</summary>
        <div className="mt-1 space-y-1 pl-2 text-sm">
          <Link href="/" className="tap-press block rounded-md px-3 py-2">Home</Link>
          <Link href="/gallery" className="tap-press block rounded-md px-3 py-2">Gallery</Link>
        </div>
      </details>
      <details>
        <summary className="tap-press cursor-pointer rounded-lg px-3 py-2 text-sm">Sections</summary>
        <div className="mt-1 space-y-1 pl-2 text-sm">
          <Link href="/#categories" className="tap-press block rounded-md px-3 py-2">Categories</Link>
          <Link href="/#how-it-works" className="tap-press block rounded-md px-3 py-2">How It Works</Link>
        </div>
      </details>
    </motion.aside>
  );
}

function FloatingCenterNavbar({
  isDark,
  onToggle,
  isHome,
  isGallery,
  isCategories,
}: {
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isCategories: boolean;
}) {
  const items = [
    { href: "/", label: "Home", active: isHome },
    { href: "/gallery", label: "Gallery", active: isGallery },
    { href: "/#categories", label: "Categories", active: isCategories },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed left-1/2 top-3 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-orange-300/70 bg-orange-50/95 p-1.5 shadow-lg backdrop-blur dark:border-orange-400/40 dark:bg-orange-950/70 sm:top-5"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          aria-current={item.active ? "page" : undefined}
          className={`tap-press inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-xs font-medium transition ${
            item.active
              ? "bg-orange-500 text-white shadow-sm"
              : "text-orange-900 hover:bg-orange-100 dark:text-orange-100 dark:hover:bg-orange-900/50"
          }`}
        >
          {item.label}
        </Link>
      ))}
      <Link
        href="https://github.com/Varun2024/navui.git"
        target="_blank"
        rel="noopener noreferrer"
        className="tap-press inline-flex min-h-9 items-center rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
      >
        Contribute
      </Link>
      <ThemeToggle isDark={isDark} onToggle={onToggle} />
    </motion.nav>
  );
}

function TabNavigationNavbar({
  isDark,
  onToggle,
  isHome,
  isGallery,
  isCategories,
}: {
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isCategories: boolean;
}) {
  const items = [
    { href: "/", label: "Home", active: isHome, id: "home" },
    { href: "/gallery", label: "Gallery", active: isGallery, id: "gallery" },
    { href: "/#categories", label: "Categories", active: isCategories, id: "categories" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 right-0 top-3 z-40 mx-auto flex w-[min(720px,92%)] items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/95 p-1.5 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-950/90 sm:top-5"
    >
      <Link
        href="/"
        className="tap-press ml-1 inline-flex items-center rounded-lg px-2 py-1 text-xs font-semibold"
      >
        <NavUILogo compact hideTextOnMobile />
      </Link>
      <nav className="relative flex flex-1 items-center justify-center gap-0.5 text-xs">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            aria-current={item.active ? "page" : undefined}
            className={`relative inline-flex min-h-9 items-center rounded-lg px-3 py-1.5 transition ${
              item.active
                ? "text-white dark:text-black"
                : "text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-neutral-50"
            }`}
          >
            {item.active && (
              <motion.span
                layoutId="tab-nav-indicator"
                className="absolute inset-0 -z-0 rounded-lg bg-black dark:bg-white"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </Link>
        ))}
      </nav>
      <ThemeToggle isDark={isDark} onToggle={onToggle} />
    </motion.header>
  );
}

function CommandPaletteNavbar({
  isDark,
  onToggle,
  isHome,
  isGallery,
  isCategories,
}: {
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isCategories: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands = [
    { href: "/", label: "Home", hint: "/", active: isHome },
    { href: "/gallery", label: "Gallery", hint: "/gallery", active: isGallery },
    { href: "/#categories", label: "Categories", hint: "#categories", active: isCategories },
    { href: "/#how-it-works", label: "How It Works", hint: "#how-it-works", active: false },
    { href: "https://github.com/Varun2024/navui.git", label: "Contribute on GitHub", hint: "github", active: false },
  ];
  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) || c.hint.includes(query.toLowerCase()),
  );

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed left-0 right-0 top-3 z-40 mx-auto flex w-[min(1000px,94%)] items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-100 shadow-2xl dark:border-white/10 sm:top-5"
      >
        <Link href="/" className="tap-press inline-flex items-center px-1">
          <NavUILogo compact textClassName="text-neutral-100" />
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open command palette"
          className="tap-press group flex flex-1 items-center justify-between gap-3 rounded-md border border-neutral-800 bg-neutral-900/70 px-3 py-1.5 text-left text-xs text-neutral-400 transition hover:border-neutral-700 hover:text-neutral-200"
        >
          <span className="inline-flex items-center gap-2">
            <Search size={12} />
            Search commands…
          </span>
          <kbd className="rounded border border-neutral-700 bg-neutral-950 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
            {typeof navigator !== "undefined" && navigator.platform?.startsWith("Mac") ? "⌘" : "Ctrl"}K
          </kbd>
        </button>
        <ThemeToggle isDark={isDark} onToggle={onToggle} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="cmd-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-label="Close command palette"
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              key="cmd-panel"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="fixed left-1/2 top-24 z-50 w-[min(560px,92vw)] -translate-x-1/2 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-neutral-800 px-3 py-2.5">
                <Search size={14} className="text-neutral-500" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or route…"
                  className="flex-1 bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
                />
                <kbd className="rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 font-mono text-[10px] text-neutral-500">
                  esc
                </kbd>
              </div>
              <div className="max-h-72 overflow-auto py-1">
                {filtered.length === 0 ? (
                  <p className="px-4 py-6 text-center text-xs text-neutral-500">No matches.</p>
                ) : (
                  filtered.map((cmd) => (
                    <Link
                      key={cmd.href}
                      href={cmd.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 text-sm transition hover:bg-neutral-900 ${
                        cmd.active ? "text-white" : "text-neutral-300"
                      }`}
                    >
                      <span>{cmd.label}</span>
                      <span className="font-mono text-[10px] text-neutral-500">{cmd.hint}</span>
                    </Link>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

type LiveNavProps = {
  isDark: boolean;
  onToggle: () => void;
  isHome: boolean;
  isGallery: boolean;
  isCategories: boolean;
  isWorkflow: boolean;
};

type LiveNavRenderer = (props: LiveNavProps) => ReactElement;
type NavZone = "top" | "bottom" | "side" | "none";
type LiveNavEntry = { render: LiveNavRenderer; zone: NavZone };

function topNav(styleSlug: NavbarSlug): LiveNavEntry {
  return {
    zone: "top",
    render: function TopNavRenderer(p) {
      return <TopNavbar styleSlug={styleSlug} {...p} />;
    },
  };
}

// Exhaustive: adding a slug to data/navbars.ts without a renderer here = type error.
const LIVE_NAVBARS: Record<NavbarSlug, LiveNavEntry> = {
  "stripe-navbar": topNav("stripe-navbar"),
  "linear-navbar": topNav("linear-navbar"),
  "glass-navbar": topNav("glass-navbar"),
  "scroll-navbar": topNav("scroll-navbar"),
  "sticky-cta-navbar": topNav("sticky-cta-navbar"),
  "minimal-navbar": topNav("minimal-navbar"),
  "animated-underline-navbar": topNav("animated-underline-navbar"),
  "stripe-mega-navbar": topNav("stripe-mega-navbar"),
  "command-palette": {
    zone: "top",
    render: (p) => (
      <CommandPaletteNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isCategories={p.isCategories}
      />
    ),
  },
  "gradient-navbar": topNav("gradient-navbar"),
  "floating-center-navbar": {
    zone: "top",
    render: (p) => (
      <FloatingCenterNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isCategories={p.isCategories}
      />
    ),
  },
  "morphing-menu": topNav("morphing-menu"),
  "tab-navigation": {
    zone: "top",
    render: (p) => (
      <TabNavigationNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isCategories={p.isCategories}
      />
    ),
  },
  "hybrid-navbar": topNav("hybrid-navbar"),
  "gsap-curtain-navbar": topNav("gsap-curtain-navbar"),
  "motion-spring-navbar": topNav("motion-spring-navbar"),
  "dock-navigation": {
    zone: "bottom",
    render: (p) => (
      <DockNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isCategories={p.isCategories}
      />
    ),
  },
  "floating-action-navbar": {
    zone: "bottom",
    render: (p) => (
      <DockNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isCategories={p.isCategories}
      />
    ),
  },
  "macos-dock-navbar": {
    zone: "bottom",
    render: (p) => (
      <DockNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isCategories={p.isCategories}
      />
    ),
  },
  "mobile-bottom-nav": {
    zone: "bottom",
    render: (p) => (
      <MobileBottomNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isWorkflow={p.isWorkflow}
      />
    ),
  },
  "bottom-mobile-nav": {
    zone: "bottom",
    render: (p) => (
      <BottomMobileNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isWorkflow={p.isWorkflow}
      />
    ),
  },
  "mobile-drawer": {
    zone: "none",
    render: (p) => <MobileDrawerNavbar isDark={p.isDark} onToggle={p.onToggle} />,
  },
  "expandable-mobile-nav": {
    zone: "bottom",
    render: (p) => (
      <ExpandableMobileNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isWorkflow={p.isWorkflow}
      />
    ),
  },
  "dashboard-sidebar": {
    zone: "side",
    render: (p) => (
      <DashboardSidebarNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isCategories={p.isCategories}
      />
    ),
  },
  "workspace-switcher": {
    zone: "side",
    render: (p) => (
      <DashboardSidebarNavbar
        isDark={p.isDark}
        onToggle={p.onToggle}
        isHome={p.isHome}
        isGallery={p.isGallery}
        isCategories={p.isCategories}
      />
    ),
  },
  "collapsible-sidebar": {
    zone: "side",
    render: (p) => <CollapsibleSidebarNavbar isDark={p.isDark} onToggle={p.onToggle} />,
  },
  "nested-sidebar": {
    zone: "side",
    render: (p) => <CollapsibleSidebarNavbar isDark={p.isDark} onToggle={p.onToggle} />,
  },
};

export function NavbarDemo() {
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const isDark = resolvedTheme === "dark";
  const [styleSlug, setStyleSlug] = useState(getInitialStyleSlug);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    function syncHash() {
      setActiveHash(window.location.hash);
    }

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    function onStyleChange(event: Event) {
      const customEvent = event as CustomEvent<{ slug?: string }>;
      if (customEvent.detail?.slug) {
        setStyleSlug(customEvent.detail.slug);
      }
    }

    function onStorage(event: StorageEvent) {
      if (event.key === NAVBAR_STYLE_STORAGE_KEY && event.newValue) {
        setStyleSlug(event.newValue);
      }
    }

    window.addEventListener(NAVBAR_STYLE_EVENT, onStyleChange as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(NAVBAR_STYLE_EVENT, onStyleChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const entry = LIVE_NAVBARS[styleSlug as NavbarSlug];

  useEffect(() => {
    const zone = entry?.zone ?? "none";
    document.documentElement.dataset.navZone = zone;
    return () => {
      delete document.documentElement.dataset.navZone;
    };
  }, [entry]);

  const isHome =
    pathname === "/" && activeHash !== "#categories" && activeHash !== "#how-it-works";
  const isGallery = pathname === "/gallery";
  const isCategories = pathname === "/" && activeHash === "#categories";
  const isWorkflow = pathname === "/" && activeHash === "#how-it-works";

  if (!entry) return null;

  function unapply() {
    window.localStorage.removeItem(NAVBAR_STYLE_APPLIED_KEY);
    window.localStorage.removeItem(NAVBAR_STYLE_STORAGE_KEY);
    setStyleSlug(DEFAULT_STYLE);
    window.dispatchEvent(
      new CustomEvent(NAVBAR_STYLE_EVENT, { detail: { slug: DEFAULT_STYLE } }),
    );
  }

  const title = NAVBAR_TITLE_BY_SLUG.get(styleSlug) ?? styleSlug;

  return (
    <>
      {entry.render({
        isDark,
        onToggle: () => setTheme(isDark ? "light" : "dark"),
        isHome,
        isGallery,
        isCategories,
        isWorkflow,
      })}
      <div
        className={`fixed z-[60] flex items-center gap-1.5 rounded-full border border-black/10 bg-white/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-700 shadow-lg backdrop-blur dark:border-white/10 dark:bg-neutral-950/95 dark:text-neutral-200 ${
          entry.zone === "top"
            ? "bottom-3 right-3"
            : entry.zone === "bottom"
              ? "top-3 right-3"
              : entry.zone === "side"
                ? "top-3 right-3"
                : "bottom-3 right-3"
        }`}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="hidden sm:inline">Demo ·</span>
        <span className="max-w-[9rem] truncate normal-case tracking-normal text-neutral-900 dark:text-neutral-50">
          {title}
        </span>
        <button
          onClick={unapply}
          aria-label="Remove applied navbar"
          className="tap-press inline-flex h-6 w-6 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-50"
        >
          <X size={12} />
        </button>
      </div>
    </>
  );
}
