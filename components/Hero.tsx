"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardCopy, Eye, Github, Sparkles, Twitter } from "lucide-react";
import Link from "next/link";
import { BuyMeCoffeeWidget } from "@/components/BuyMeCoffeeWidget";
import {
  NAVBAR_STYLE_APPLIED_KEY,
  NAVBAR_STYLE_EVENT,
  NAVBAR_STYLE_STORAGE_KEY,
  navbars,
} from "@/data/navbars";

const DEFAULT_NAVBAR_STYLE = "stripe-navbar";
const NAVBAR_NAME_BY_SLUG = new Map(navbars.map((item) => [item.slug, item.title]));

export function Hero() {
  const [appliedMessage, setAppliedMessage] = useState<string | null>(null);
  const [applyCount, setApplyCount] = useState(0);

  useEffect(() => {
    if (!appliedMessage) {
      return;
    }

    const timer = window.setTimeout(() => setAppliedMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [appliedMessage]);

  function getRandomNavbarSlug(currentSlug: string) {
    const candidates = navbars
      .map((item) => item.slug)
      .filter((slug) => slug !== currentSlug);

    if (candidates.length === 0) {
      return DEFAULT_NAVBAR_STYLE;
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function applyNavbarFromHero() {
    const isFirstApply = applyCount === 0;
    const currentSlug = window.localStorage.getItem(NAVBAR_STYLE_STORAGE_KEY) ?? DEFAULT_NAVBAR_STYLE;
    const nextSlug = getRandomNavbarSlug(isFirstApply ? "" : currentSlug);

    window.localStorage.setItem(NAVBAR_STYLE_APPLIED_KEY, "true");
    window.localStorage.setItem(NAVBAR_STYLE_STORAGE_KEY, nextSlug);
    window.dispatchEvent(
      new CustomEvent(NAVBAR_STYLE_EVENT, {
        detail: { slug: nextSlug },
      }),
    );

    const navbarName = NAVBAR_NAME_BY_SLUG.get(nextSlug) ?? "Navbar";
    const prefix = isFirstApply ? "Applied navbar" : "Random navbar applied";
    setAppliedMessage(`${prefix}: ${navbarName}. Preview more styles in Gallery.`);
    setApplyCount((value) => value + 1);
  }

  return (
    <section className="mx-auto w-[min(1120px,94%)] py-16 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 text-center"
      >
        <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-2">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium tracking-wide text-neutral-700 shadow-sm dark:border-white/15 dark:bg-neutral-950 dark:text-neutral-200">
            <Github size={12} />
            Open Source
          </p>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium tracking-wide text-neutral-700 shadow-sm dark:border-white/15 dark:bg-neutral-950 dark:text-neutral-200">
            <Sparkles size={12} />
            20+ Modern Navigation Components
          </p>
        </div>

        <h1 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-4xl md:text-6xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="block font-sans"
          >
            NavUI
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.13 }}
            className="mt-1 block font-serif italic md:translate-x-6"
          >
            Modern Navigation Components
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.21 }}
            className="mt-1 block font-mono text-[0.870em] md:translate-x-12"
          >
            for React &amp; Next.js
          </motion.span>
        </h1>

        <p className="mx-auto max-w-xl text-sm leading-6 text-neutral-600 dark:text-neutral-300 sm:text-base md:text-lg">
          Copy. Paste. Ship.
        </p>

        <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch justify-center gap-2 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <Link
            href="/gallery"
            className="rounded-xl bg-black px-3.5 py-2.5 text-center text-xs font-medium text-white transition hover:opacity-90 sm:px-5 sm:py-3 sm:text-sm dark:bg-white dark:text-black"
          >
            Explore Gallery
          </Link>
          <Link
            href="/navbars/stripe-navbar"
            className="rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-center text-xs font-medium text-neutral-800 transition hover:bg-neutral-100 sm:px-5 sm:py-3 sm:text-sm dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
          >
            <span className="sm:hidden">View Component</span>
            <span className="hidden sm:inline">View First Component</span>
          </Link>

          <div className="flex flex-nowrap items-center justify-center gap-2 sm:contents">
            <Link
              href="https://github.com/Varun2024/navui.git"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contribute on GitHub"
              title="Contribute"
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white px-3 py-2.5 text-neutral-800 transition hover:bg-neutral-100 sm:px-5 sm:py-3 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              <Github size={18} />
            </Link>
            <Link
              href="https://twitter.com/TheV_Stack"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Twitter"
              title="Twitter"
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white px-3 py-2.5 text-neutral-800 transition hover:bg-neutral-100 sm:px-5 sm:py-3 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              <Twitter size={18} />
            </Link>
            <div className="shrink-0">
              <BuyMeCoffeeWidget stickOnScroll />
            </div>
          </div>
        </div>

        <div className="mx-auto flex flex-wrap items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs text-neutral-700 shadow-sm dark:border-indigo-300/25 dark:from-indigo-900/35 dark:via-fuchsia-900/25 dark:to-cyan-900/25 dark:text-neutral-200 sm:text-sm">
          <span className="font-medium">Missing a navbar on this page?</span>
          <button
            type="button"
            onClick={applyNavbarFromHero}
            className="tap-press rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03] hover:opacity-90 dark:bg-white dark:text-black"
          >
            Apply one
          </button>
          <Link
            href="/gallery"
            className="font-medium text-neutral-900 underline underline-offset-4 transition hover:opacity-70 dark:text-neutral-100"
          >
            Browse gallery
          </Link>
        </div>

        {appliedMessage && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl rounded-xl border border-black/15 bg-white px-4 py-2 text-xs text-neutral-700 shadow-sm dark:border-white/15 dark:bg-neutral-950 dark:text-neutral-200 sm:text-sm"
          >
            {appliedMessage}
          </motion.p>
        )}

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <div className="surface-panel rounded-2xl p-3">
            <div className="inline-flex rounded-lg border border-black/10 bg-neutral-50 p-2 text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200">
              <ClipboardCopy size={16} />
            </div>
            <p className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Copy-ready snippets
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Clean TSX + prompts.</p>
          </div>

            <div className="surface-panel rounded-2xl p-3">
            <div className="inline-flex rounded-lg border border-black/10 bg-neutral-50 p-2 text-neutral-700 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-200">
              <Eye size={16} />
            </div>
            <p className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">
              Live preview
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">Preview directly on page.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
