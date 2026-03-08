"use client";

import { useEffect, useState } from "react";
import {
  Compass,
  Grid3X3,
  Home,
  LayoutDashboard,
  Menu,
  Moon,
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
} from "@/data/navbars";

const DEFAULT_STYLE = "";
const GITHUB_REPO_URL = "https://github.com/Varun2024/navui.git";

const TOP_NAV_STYLES = new Set([
  "stripe-navbar",
  "linear-navbar",
  "glass-navbar",
  "scroll-navbar",
  "sticky-cta-navbar",
  "minimal-navbar",
  "animated-underline-navbar",
  "stripe-mega-navbar",
  "command-palette",
  "gradient-navbar",
  "floating-center-navbar",
  "morphing-menu",
  "tab-navigation",
  "hybrid-navbar",
]);

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

    window.addEventListener(NAVBAR_STYLE_EVENT, onStyleChange as EventListener);
    return () =>
      window.removeEventListener(NAVBAR_STYLE_EVENT, onStyleChange as EventListener);
  }, []);

  const showTop = TOP_NAV_STYLES.has(styleSlug);
  const isHome = pathname === "/" && activeHash !== "#categories" && activeHash !== "#how-it-works";
  const isGallery = pathname !== "/" && pathname !== "/#categories";
  const isCategories = pathname === "/" && activeHash === "#categories";
  const isWorkflow = pathname === "/" && activeHash === "#how-it-works";

  return (
    <>
      {showTop && (
        <TopNavbar
          styleSlug={styleSlug}
          isDark={isDark}
          onToggle={() => setTheme(isDark ? "light" : "dark")}
          isHome={isHome}
          isGallery={isGallery}
          isCategories={isCategories}
          isWorkflow={isWorkflow}
        />
      )}
      {(styleSlug === "dock-navigation" ||
        styleSlug === "floating-action-navbar" ||
        styleSlug === "macos-dock-navbar") && (
        <DockNavbar
          isDark={isDark}
          onToggle={() => setTheme(isDark ? "light" : "dark")}
          isHome={isHome}
          isGallery={isGallery}
          isCategories={isCategories}
        />
      )}
      {styleSlug === "mobile-bottom-nav" && (
        <MobileBottomNavbar
          isDark={isDark}
          onToggle={() => setTheme(isDark ? "light" : "dark")}
          isHome={isHome}
          isGallery={isGallery}
          isWorkflow={isWorkflow}
        />
      )}
      {styleSlug === "bottom-mobile-nav" && (
        <BottomMobileNavbar
          isDark={isDark}
          onToggle={() => setTheme(isDark ? "light" : "dark")}
          isHome={isHome}
          isGallery={isGallery}
          isWorkflow={isWorkflow}
        />
      )}
      {styleSlug === "mobile-drawer" && (
        <MobileDrawerNavbar
          isDark={isDark}
          onToggle={() => setTheme(isDark ? "light" : "dark")}
        />
      )}
      {styleSlug === "expandable-mobile-nav" && (
        <ExpandableMobileNavbar
          isDark={isDark}
          onToggle={() => setTheme(isDark ? "light" : "dark")}
          isHome={isHome}
          isGallery={isGallery}
          isWorkflow={isWorkflow}
        />
      )}
      {(styleSlug === "dashboard-sidebar" || styleSlug === "workspace-switcher") && (
        <DashboardSidebarNavbar
          isDark={isDark}
          onToggle={() => setTheme(isDark ? "light" : "dark")}
          isHome={isHome}
          isGallery={isGallery}
          isCategories={isCategories}
        />
      )}
      {(styleSlug === "collapsible-sidebar" || styleSlug === "nested-sidebar") && (
        <CollapsibleSidebarNavbar
          isDark={isDark}
          onToggle={() => setTheme(isDark ? "light" : "dark")}
        />
      )}
    </>
  );
}
