"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  NAVBAR_STYLE_APPLIED_KEY,
  NAVBAR_STYLE_EVENT,
  NAVBAR_STYLE_STORAGE_KEY,
  navbars,
} from "@/data/navbars";

const DEFAULT_NAVBAR_STYLE = "stripe-navbar";
const HERO_SAMPLE_SLUGS = [
  "linear-navbar",
  "stripe-mega-navbar",
  "dashboard-sidebar",
  "gsap-curtain-navbar",
] as const;

function SectionEyebrow({ number, label }: { number: string; label: string }) {
  return (
    <p className="reveal font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
      <span className="text-neutral-700 dark:text-neutral-600">§</span>{" "}
      <span className="text-emerald-500 dark:text-emerald-400">{number}</span>{" "}
      <span className="text-neutral-500">/ {label}</span>
    </p>
  );
}

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 bg-emerald-400/10 blur-2xl dark:bg-emerald-400/15"
      />
      <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-neutral-950">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
        <div className="flex items-center gap-2 border-b border-black/10 bg-neutral-50/70 px-3 py-2 dark:border-white/10 dark:bg-neutral-900/60">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
          <div className="ml-2 flex-1 truncate rounded-md border border-black/5 bg-white px-2 py-0.5 text-[11px] font-mono text-neutral-500 dark:border-white/5 dark:bg-neutral-950 dark:text-neutral-400">
            {url}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function HeroSamplePanel({ onApply, appliedSlug }: { onApply: (slug: string) => void; appliedSlug: string | null }) {
  const items = useMemo(() => {
    return HERO_SAMPLE_SLUGS.map((slug) => navbars.find((n) => n.slug === slug)).filter(
      (n): n is (typeof navbars)[number] => Boolean(n),
    );
  }, []);

  return (
    <BrowserChrome url="navui.dev/gallery">
      <div className="divide-y divide-black/5 dark:divide-white/5">
        {items.map((item, idx) => {
          const isApplied = appliedSlug === item.slug;
          return (
            <button
              key={item.slug}
              onClick={() => onApply(item.slug)}
              className="group flex w-full items-center gap-4 px-4 py-3.5 text-left transition hover:bg-emerald-50/50 dark:hover:bg-emerald-400/5"
            >
              <span className="w-6 font-mono text-[10px] tracking-widest text-neutral-400 dark:text-neutral-600">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {item.title}
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-wider text-neutral-500 sm:inline">
                {item.category}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider transition ${
                  isApplied
                    ? "bg-emerald-500 text-white dark:bg-emerald-400 dark:text-emerald-950"
                    : "bg-neutral-100 text-neutral-600 group-hover:bg-emerald-500 group-hover:text-white dark:bg-neutral-900 dark:text-neutral-400 dark:group-hover:bg-emerald-400 dark:group-hover:text-emerald-950"
                }`}
              >
                {isApplied ? "applied" : "apply"}
                {!isApplied && (
                  <span className="arrow inline-block transition-transform">→</span>
                )}
              </span>
            </button>
          );
        })}
        <Link
          href="/gallery"
          className="flex items-center justify-between px-4 py-3 font-mono text-[11px] tracking-wider text-neutral-500 transition hover:text-emerald-500 dark:hover:text-emerald-400"
        >
          <span>+ {navbars.length - HERO_SAMPLE_SLUGS.length} more in gallery</span>
          <span className="arrow inline-block transition-transform">→</span>
        </Link>
      </div>
    </BrowserChrome>
  );
}

export function Hero() {
  const [appliedSlug, setAppliedSlug] = useState<string | null>(null);

  function applyNavbar(slug: string) {
    window.localStorage.setItem(NAVBAR_STYLE_APPLIED_KEY, "true");
    window.localStorage.setItem(NAVBAR_STYLE_STORAGE_KEY, slug);
    window.dispatchEvent(new CustomEvent(NAVBAR_STYLE_EVENT, { detail: { slug } }));
    setAppliedSlug(slug);
  }

  function applyRandom() {
    const others = navbars.map((n) => n.slug).filter((s) => s !== appliedSlug);
    const next = others[Math.floor(Math.random() * others.length)] ?? DEFAULT_NAVBAR_STYLE;
    applyNavbar(next);
  }

  return (
    <section className="mx-auto w-[min(1120px,94%)] pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:items-center md:gap-16">
        <div className="space-y-7">
          <SectionEyebrow number="01" label="Open-source library" />

          <h1 className="reveal text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-neutral-950 dark:text-neutral-50 md:text-7xl">
            Navigation you&apos;d actually{" "}
            <span className="bg-gradient-to-br from-emerald-500 to-emerald-300 bg-clip-text text-transparent dark:from-emerald-300 dark:to-emerald-500">
              ship
            </span>
            .
          </h1>

          <p className="reveal max-w-xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-lg">
            <span className="font-mono text-neutral-900 dark:text-neutral-100">{navbars.length}</span>{" "}
            production-ready patterns for React and Next.js. Preview them live on this
            page, copy the code, and paste it into your app in under a minute.
          </p>

          <div className="reveal flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/gallery"
              className="cta-arrow focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 dark:bg-emerald-400 dark:text-emerald-950 dark:shadow-emerald-400/20 dark:hover:bg-emerald-300"
            >
              Explore gallery
              <span className="arrow">→</span>
            </Link>
            <button
              onClick={applyRandom}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:border-emerald-400/40 hover:bg-emerald-50/40 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-400/5"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 dark:bg-emerald-400" />
              Apply random on this page
            </button>
          </div>

          <div className="reveal grid grid-cols-2 gap-y-4 border-t border-black/10 pt-6 font-mono dark:border-white/10 sm:grid-cols-4">
            <Stat value={String(navbars.length)} label="patterns" accent />
            <Stat value={new Set(navbars.map((n) => n.category)).size.toString()} label="categories" />
            <Stat value="2" label="frameworks" />
            <Stat value="MIT" label="license" />
          </div>
        </div>

        <div className="reveal md:pl-4">
          <HeroSamplePanel onApply={applyNavbar} appliedSlug={appliedSlug} />
          <p className="mt-3 pl-1 font-mono text-[11px] leading-relaxed text-neutral-500">
            {"// "}Click any row to preview that navbar on this page. Removes with the pill
            in the corner.
          </p>
        </div>
      </div>

      <TitleMarquee />
    </section>
  );
}

function Stat({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="space-y-1">
      <p
        className={`text-3xl font-medium tracking-tight md:text-4xl ${
          accent
            ? "text-emerald-500 dark:text-emerald-400"
            : "text-neutral-900 dark:text-neutral-50"
        }`}
      >
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">{label}</p>
    </div>
  );
}

function TitleMarquee() {
  const track = [...navbars, ...navbars];
  return (
    <div className="reveal relative mt-16 overflow-hidden border-y border-black/10 py-3 dark:border-white/10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--background)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--background)] to-transparent" />
      <div className="marquee-track flex w-max items-center gap-8">
        {track.map((item, i) => (
          <span
            key={`${item.slug}-${i}`}
            className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500"
          >
            <span className="h-1 w-1 rounded-full bg-emerald-500/70 dark:bg-emerald-400/70" />
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
}
