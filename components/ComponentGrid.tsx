"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BellRing, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  isNavbarMobileFriendly,
  NAVBAR_STYLE_APPLIED_KEY,
  NAVBAR_STYLE_EVENT,
  NAVBAR_STYLE_STORAGE_KEY,
  navbars,
  navbarTags,
} from "@/data/navbars";

const QUERY_STORAGE_KEY = "navui.gallery.query";
const TAB_STORAGE_KEY = "navui.gallery.tab";
const FAVORITES_STORAGE_KEY = "navui.gallery.favorites";
const FAVORITES_TAB = "Favorites";
const NAVBAR_ORDER_INDEX = new Map(navbars.map((item, index) => [item.slug, index]));

const HOME_BENTO_LAYOUT: Record<string, { cardClass: string; lgSpan: number }> = {
  "stripe-navbar": {
    cardClass: "sm:col-span-2 lg:col-span-3",
    lgSpan: 3,
  },
  "stripe-mega-navbar": {
    cardClass: "sm:col-span-2 lg:col-span-4",
    lgSpan: 4,
  },
  "linear-navbar": {
    cardClass: "sm:col-span-2 lg:col-span-3",
    lgSpan: 3,
  },
  "glass-navbar": {
    cardClass: "sm:col-span-2 lg:col-span-3",
    lgSpan: 3,
  },
  "scroll-navbar": {
    cardClass: "sm:col-span-2 lg:col-span-3",
    lgSpan: 3,
  },
  "sticky-cta-navbar": {
    cardClass: "sm:col-span-2 lg:col-span-3",
    lgSpan: 3,
  },
  "dashboard-sidebar": {
    cardClass: "sm:col-span-2 lg:col-span-4",
    lgSpan: 4,
  },
  "collapsible-sidebar": {
    cardClass: "sm:col-span-2 lg:col-span-4",
    lgSpan: 4,
  },
  "mobile-bottom-nav": {
    cardClass: "sm:col-span-2 lg:col-span-2",
    lgSpan: 2,
  },
  "bottom-mobile-nav": {
    cardClass: "sm:col-span-2 lg:col-span-2",
    lgSpan: 2,
  },
  "mobile-drawer": {
    cardClass: "sm:col-span-2 lg:col-span-2",
    lgSpan: 2,
  },
  "minimal-navbar": {
    cardClass: "sm:col-span-1 lg:col-span-2",
    lgSpan: 2,
  },
  "dock-navigation": {
    cardClass: "sm:col-span-1 lg:col-span-2",
    lgSpan: 2,
  },
  "animated-underline-navbar": {
    cardClass: "sm:col-span-1 lg:col-span-2",
    lgSpan: 2,
  },
  "gradient-navbar": {
    cardClass: "sm:col-span-2 lg:col-span-3",
    lgSpan: 3,
  },
  "floating-center-navbar": {
    cardClass: "sm:col-span-1 lg:col-span-2",
    lgSpan: 2,
  },
  "morphing-menu": {
    cardClass: "sm:col-span-2 lg:col-span-3",
    lgSpan: 3,
  },
  "tab-navigation": {
    cardClass: "sm:col-span-1 lg:col-span-2",
    lgSpan: 2,
  },
  "hybrid-navbar": {
    cardClass: "sm:col-span-2 lg:col-span-4",
    lgSpan: 4,
  },
  "nested-sidebar": {
    cardClass: "sm:col-span-2 lg:col-span-4",
    lgSpan: 4,
  },
  "workspace-switcher": {
    cardClass: "sm:col-span-2 lg:col-span-4",
    lgSpan: 4,
  },
  "command-palette": {
    cardClass: "sm:col-span-2 lg:col-span-3",
    lgSpan: 3,
  },
  "expandable-mobile-nav": {
    cardClass: "sm:col-span-2 lg:col-span-2",
    lgSpan: 2,
  },
  "floating-action-navbar": {
    cardClass: "sm:col-span-1 lg:col-span-2",
    lgSpan: 2,
  },
  "macos-dock-navbar": {
    cardClass: "sm:col-span-1 lg:col-span-2",
    lgSpan: 2,
  },
};

const HOME_FEATURE_PRIORITY: Record<string, number> = {
  "stripe-mega-navbar": 100,
  "sticky-cta-navbar": 98,
  "stripe-navbar": 97,
  "minimal-navbar": 96,
  "linear-navbar": 95,
  "glass-navbar": 94,
  "scroll-navbar": 93,
  "animated-underline-navbar": 91,
  "dashboard-sidebar": 90,
  "collapsible-sidebar": 89,
  "dock-navigation": 88,
  "mobile-drawer": 87,
  "mobile-bottom-nav": 86,
  "bottom-mobile-nav": 85,
  "hybrid-navbar": 99,
  "gradient-navbar": 97,
  "command-palette": 96,
  "floating-center-navbar": 95,
  "morphing-menu": 94,
  "nested-sidebar": 93,
  "workspace-switcher": 92,
  "expandable-mobile-nav": 91,
  "tab-navigation": 90,
  "floating-action-navbar": 89,
  "macos-dock-navbar": 98,
};

const SIMPLE_NAVBAR_SLUGS = new Set<string>([
  "stripe-navbar",
  "minimal-navbar",
  "linear-navbar",
  "tab-navigation",
]);

const UNIQUENESS_TAGS = new Set<string>([
  "sidebar",
  "mobile",
  "dock",
  "mega-menu",
  "gradient",
  "command",
  "morphing",
  "floating",
]);

const MAJOR_FEATURE_CATEGORIES = [
  "Navbars",
  "Sidebars",
  "Mobile Navigation",
  "Dock Navigation",
  "Mega Menus",
] as const;

function getBentoSpan(slug: string) {
  return HOME_BENTO_LAYOUT[slug]?.lgSpan ?? 2;
}

function getFeaturePriority(slug: string) {
  return HOME_FEATURE_PRIORITY[slug] ?? 50;
}

function getRecencyScore(slug: string) {
  return NAVBAR_ORDER_INDEX.get(slug) ?? -1;
}

function findBestPackedSelection(items: typeof navbars, count: number) {
  let best: typeof items | null = null;
  let bestScore = -Infinity;

  function getDiversityBonus(selected: typeof navbars, item: (typeof navbars)[number]) {
    const categorySet = new Set(selected.map((entry) => entry.category));
    const isNewCategory = !categorySet.has(item.category);

    const selectedTags = new Set(selected.flatMap((entry) => entry.tags));
    const uniqueSignalTags = item.tags.filter(
      (tag) => UNIQUENESS_TAGS.has(tag) && !selectedTags.has(tag),
    );

    return (isNewCategory ? 6 : 0) + uniqueSignalTags.length * 2;
  }

  function dfs(index: number, selected: typeof items, spanSum: number, score: number) {
    if (selected.length === count) {
      if (spanSum % 6 === 0 && score > bestScore) {
        bestScore = score;
        best = [...selected];
      }
      return;
    }

    if (index >= items.length) {
      return;
    }

    const remainingSlots = count - selected.length;
    if (items.length - index < remainingSlots) {
      return;
    }

    const item = items[index];
    const span = getBentoSpan(item.slug);
    const priority = getFeaturePriority(item.slug);
    const diversityBonus = getDiversityBonus(selected, item);

    dfs(index + 1, [...selected, item], spanSum + span, score + priority + diversityBonus);
    dfs(index + 1, selected, spanSum, score);
  }

  dfs(0, [], 0, 0);
  return best;
}

function selectHomeFeaturedItems(items: typeof navbars) {
  const featuredPool = items.filter((item) => !SIMPLE_NAVBAR_SLUGS.has(item.slug));

  if (featuredPool.length === 0) {
    return [];
  }

  const maxCount = Math.min(10, featuredPool.length);
  const forcedMajor = MAJOR_FEATURE_CATEGORIES
    .map((category) =>
      featuredPool
        .filter((item) => item.category === category)
        .sort((a, b) => {
          const priorityDelta = getFeaturePriority(b.slug) - getFeaturePriority(a.slug);
          if (priorityDelta !== 0) {
            return priorityDelta;
          }

          return getRecencyScore(b.slug) - getRecencyScore(a.slug);
        })[0],
    )
    .filter((item): item is (typeof featuredPool)[number] => Boolean(item));

  const selectedBySlug = new Set(forcedMajor.map((item) => item.slug));
  const remaining = featuredPool
    .filter((item) => !selectedBySlug.has(item.slug))
    .sort((a, b) => {
      const priorityDelta = getFeaturePriority(b.slug) - getFeaturePriority(a.slug);
      if (priorityDelta !== 0) {
        return priorityDelta;
      }

      return getRecencyScore(b.slug) - getRecencyScore(a.slug);
    });

  const combined = [...forcedMajor, ...remaining].slice(0, maxCount);

  if (combined.length < 9) {
    return combined;
  }

  const candidates = [combined.length, combined.length - 1].filter((count) => count >= 9);
  for (const count of candidates) {
    const packed = findBestPackedSelection(combined, count);
    if (packed) {
      return packed;
    }
  }

  return combined;
}

type ComponentGridProps = {
  mode?: "home" | "gallery";
};

function getInitialQuery() {
  if (typeof window === "undefined") {
    return "";
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("q") ?? "";
  if (fromUrl) {
    return fromUrl;
  }

  return window.localStorage.getItem(QUERY_STORAGE_KEY) ?? "";
}

function getInitialTab() {
  if (typeof window === "undefined") {
    return "All";
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("tab") ?? "All";
  if (fromUrl === "All" || fromUrl === FAVORITES_TAB) {
    return fromUrl;
  }

  const fromStorage = window.localStorage.getItem(TAB_STORAGE_KEY) ?? "All";
  return fromStorage === FAVORITES_TAB ? FAVORITES_TAB : "All";
}

function getInitialFavorites() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  try {
    const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) {
      return [] as string[];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [] as string[];
    }

    return parsed.filter((value): value is string => typeof value === "string");
  } catch {
    return [] as string[];
  }
}

export function ComponentGrid({ mode = "home" }: ComponentGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(getInitialQuery);
  const [tab, setTab] = useState(getInitialTab);
  const [favorites, setFavorites] = useState<Set<string>>(
    () => new Set(getInitialFavorites()),
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const showFilters = mode === "gallery";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobileView(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const activeElement = document.activeElement;
      const isTypingContext =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement ||
        activeElement?.getAttribute("contenteditable") === "true";

      if (event.key === "/" && !isTypingContext && showFilters) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showFilters]);

  useEffect(() => {
    window.localStorage.setItem(QUERY_STORAGE_KEY, query);
    window.localStorage.setItem(TAB_STORAGE_KEY, tab);
  }, [query, tab]);

  useEffect(() => {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(Array.from(favorites)),
    );
  }, [favorites]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timer = window.setTimeout(() => setToastMessage(null), 1200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const updateUrl = useCallback(
    (nextQuery: string, nextTab: string) => {
      if (!showFilters) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (nextQuery.trim()) {
        params.set("q", nextQuery.trim());
      } else {
        params.delete("q");
      }

      if (nextTab === FAVORITES_TAB) {
        params.set("tab", FAVORITES_TAB);
      } else {
        params.delete("tab");
      }

      const nextSearch = params.toString();
      const currentSearch = searchParams.toString();

      if (nextSearch === currentSearch) {
        return;
      }

      const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParams, showFilters],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      updateUrl(query, tab);
    }, 160);

    return () => window.clearTimeout(timeoutId);
  }, [query, tab, updateUrl]);

  const normalizedQuery = query.trim().toLowerCase();

  const baseItems = useMemo(
    () => (mode === "home" ? selectHomeFeaturedItems(navbars) : navbars),
    [mode],
  );

  const mobileVisibleItems = useMemo(
    () =>
      isMobileView
        ? baseItems.filter((item) => isNavbarMobileFriendly(item.slug))
        : baseItems,
    [baseItems, isMobileView],
  );

  const hiddenOnMobileCount = Math.max(0, baseItems.length - mobileVisibleItems.length);

  const filteredItems = useMemo(() => {
    const base = mobileVisibleItems;

    if (!showFilters) {
      return base;
    }

    return base.filter((item) => {
      const matchesTab = tab === FAVORITES_TAB ? favorites.has(item.slug) : true;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesTab && matchesQuery;
    });
  }, [favorites, mobileVisibleItems, normalizedQuery, showFilters, tab]);

  const displayedItems = useMemo(() => {
    if (mode !== "home") {
      // Newest entries are appended to the catalog, so reverse by source order.
      return [...filteredItems].sort(
        (a, b) => getRecencyScore(b.slug) - getRecencyScore(a.slug),
      );
    }

    // Larger cards first + dense placement minimizes visual holes in bento layout.
    return [...filteredItems].sort((a, b) => {
      const aSpan = HOME_BENTO_LAYOUT[a.slug]?.lgSpan ?? 2;
      const bSpan = HOME_BENTO_LAYOUT[b.slug]?.lgSpan ?? 2;
      return bSpan - aSpan;
    });
  }, [filteredItems, mode]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((previous) => {
      const next = new Set(previous);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const applyNavbarStyle = useCallback(
    (slug: string) => {
      window.localStorage.setItem(NAVBAR_STYLE_APPLIED_KEY, "true");
      window.localStorage.setItem(NAVBAR_STYLE_STORAGE_KEY, slug);
      window.dispatchEvent(
        new CustomEvent(NAVBAR_STYLE_EVENT, {
          detail: { slug },
        }),
      );

      if (pathname !== "/") {
        router.push("/gallery");
      }

      setToastMessage("Applied. Open Details for full effect.");
    },
    [pathname, router],
  );

  return (
    <section id="gallery" className="mx-auto w-[min(1120px,94%)] py-8 md:py-14">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
          {mode === "home" ? "Featured Navbars" : "Navbar Gallery"}
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {displayedItems.length} results
        </p>
      </div>

      {isMobileView && hiddenOnMobileCount > 0 && (
        <div className="mb-4 rounded-xl border border-black/10 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200 sm:text-sm">
          Showing mobile-friendly navbars only. Switch to desktop site to view all {baseItems.length} navbar patterns.
        </div>
      )}

      {showFilters && (
        <>
          <div className="mb-4">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search navbars by name or tag (press /)"
              className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm outline-none ring-0 transition focus:border-black/30 dark:border-white/10 dark:bg-neutral-950 dark:focus:border-white/30"
            />
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setTab("All");
                updateUrl(query, "All");
              }}
              className={`tap-press touch-target rounded-md border px-2 py-1 text-xs transition ${
                tab === "All"
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/10 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
              }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setTab(FAVORITES_TAB);
                updateUrl(query, FAVORITES_TAB);
              }}
              className={`tap-press touch-target rounded-md border px-2 py-1 text-xs transition ${
                tab === FAVORITES_TAB
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/10 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
              }`}
            >
              Favorites ({favorites.size})
            </button>
            <span
              title="Favorites are saved in your current browser"
              className="text-xs text-neutral-500 dark:text-neutral-400"
            >
              Saved in this browser
            </span>
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-2">
            {navbarTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setQuery(tag);
                  updateUrl(tag, tab);
                }}
                className={`tap-press touch-target rounded-md border px-2 py-1 text-xs transition ${
                  normalizedQuery === tag.toLowerCase()
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-black/10 bg-white text-neutral-700 hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
                }`}
              >
                {tag}
              </button>
            ))}

            {(query.length > 0 || tab !== "All") && (
              <button
                onClick={() => {
                  setQuery("");
                  setTab("All");
                  updateUrl("", "All");
                }}
                className="tap-press touch-target ml-auto rounded-md border border-black/10 px-2 py-1 text-xs text-neutral-600 transition hover:text-black dark:border-white/10 dark:text-neutral-300 dark:hover:text-white"
              >
                Clear filters
              </button>
            )}
          </div>
        </>
      )}

      <div
        className={
          mode === "home"
            ? "grid grid-flow-row-dense gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-6"
            : "grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {displayedItems.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className={`group relative overflow-visible rounded-2xl border border-black/10 bg-white p-3.5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-300/70 hover:shadow-[0_16px_36px_rgba(79,70,229,0.16)] dark:border-white/10 dark:bg-neutral-950 dark:hover:border-indigo-400/45 sm:p-4 ${
              mode === "home"
                ? (HOME_BENTO_LAYOUT[item.slug]?.cardClass ?? "sm:col-span-1 lg:col-span-2")
                : ""
            }`}
          >
            <button
              aria-label={`Toggle favorite for ${item.title}`}
              onClick={() => toggleFavorite(item.slug)}
              className="tap-press touch-target absolute right-4 top-4 z-10 inline-flex items-center justify-center rounded-full border border-black/10 bg-white p-2 text-neutral-600 shadow-sm transition hover:text-black dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              <Star
                size={14}
                className={`block leading-none ${favorites.has(item.slug) ? "fill-current text-indigo-500" : ""}`}
              />
            </button>

            <div className="pr-9">
              <div className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-2 py-1 text-[11px] text-neutral-600 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-300">
                <Sparkles size={12} />
                Navbar
              </div>

              <h3 className="mt-3 text-lg font-semibold leading-tight tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                {item.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-indigo-300/70 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 transition group-hover:border-indigo-400/80 group-hover:bg-indigo-100 dark:border-indigo-400/35 dark:bg-indigo-950/30 dark:text-indigo-200 dark:group-hover:border-indigo-300/60 dark:group-hover:bg-indigo-900/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => applyNavbarStyle(item.slug)}
                className="tap-press touch-target group relative inline-flex w-full items-center justify-center rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-medium text-neutral-800 transition hover:bg-neutral-100 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900 sm:w-auto"
              >
                Preview on Home
                <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-black/10 bg-white px-2 py-1 text-[10px] font-medium text-neutral-700 shadow-sm group-hover:block group-focus-visible:block dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-200">
                  Quick preview only. Open Details for full effects.
                </span>
              </button>
              <Link
                href={`/navbars/${item.slug}`}
                className="tap-press touch-target inline-flex w-full items-center justify-center rounded-lg bg-black px-3 py-2 text-xs font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black sm:w-auto"
              >
                Open Details
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {displayedItems.length === 0 && (
        <div className="mt-5 rounded-2xl border border-dashed border-black/15 bg-neutral-50 p-6 text-sm text-neutral-600 dark:border-white/15 dark:bg-neutral-900 dark:text-neutral-300">
          No navbars found. Try a different search term.
        </div>
      )}

      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] right-4 z-50 inline-flex items-center gap-2 rounded-xl border border-black/15 bg-black px-4 py-2 text-sm font-semibold text-white shadow-2xl dark:border-white/20 dark:bg-white dark:text-black"
        >
          <BellRing size={15} />
          {toastMessage}
        </motion.div>
      )}
    </section>
  );
}
