"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { NavUILogo } from "@/components/ui/NavUILogo";

const GITHUB_REPO_URL = "https://github.com/Varun2024/navui.git";

const MOTION_LINKS = ["Home", "Gallery", "Categories", "How It Works"];

export function AnimatedGsapCurtainNavbarPreview() {
  const [isOpen, setIsOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const links = Array.from(panel.querySelectorAll("[data-curtain-item='true']"));

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (isOpen) {
      timeline
        .fromTo(
          panel,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.35 },
        )
        .fromTo(
          links,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.25, stagger: 0.06 },
          "<+0.05",
        );
    } else {
      timeline.to(links, { y: -8, opacity: 0, duration: 0.2, stagger: 0.03 }).to(
        panel,
        { height: 0, opacity: 0, duration: 0.26, ease: "power2.in" },
        "<",
      );
    }

    return () => {
      timeline.kill();
    };
  }, [isOpen]);

  return (
    <div className="space-y-2">
      <nav className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-neutral-950">
        <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="rounded-md border border-black/10 px-2.5 py-1 text-[11px] dark:border-white/10"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </nav>
      <div ref={panelRef} className="grid gap-1.5 overflow-hidden rounded-xl border border-cyan-200 bg-cyan-50 p-2 dark:border-cyan-400/30 dark:bg-cyan-950/20">
        <div data-curtain-item="true" className="rounded-md bg-white px-2.5 py-1.5 text-[11px] shadow-sm dark:bg-neutral-950">Gallery</div>
        <div data-curtain-item="true" className="rounded-md bg-white px-2.5 py-1.5 text-[11px] shadow-sm dark:bg-neutral-950">Categories</div>
        <div data-curtain-item="true" className="rounded-md bg-white px-2.5 py-1.5 text-[11px] shadow-sm dark:bg-neutral-950">How It Works</div>
      </div>
    </div>
  );
}

export function AnimatedMotionSpringNavbarPreview() {
  const [active, setActive] = useState(MOTION_LINKS[0]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => {
        const currentIndex = MOTION_LINKS.indexOf(current);
        const nextIndex = (currentIndex + 1) % MOTION_LINKS.length;
        return MOTION_LINKS[nextIndex];
      });
    }, 1700);

    return () => window.clearInterval(timer);
  }, []);

  const links = useMemo(
    () =>
      MOTION_LINKS.map((label) => {
        const isActive = active === label;
        return (
          <button
            key={label}
            type="button"
            onClick={() => setActive(label)}
            className="relative rounded-lg px-2.5 py-1.5"
          >
            {isActive && (
              <motion.span
                layoutId="motion-spring-preview-indicator"
                className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-neutral-950"
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      }),
    [active],
  );

  return (
    <nav className="space-y-2 rounded-xl border border-black/10 bg-white px-2.5 py-2 dark:border-white/10 dark:bg-neutral-950">
      <div className="flex items-center justify-between gap-2">
        <NavUILogo compact textClassName="text-neutral-900 dark:text-neutral-100" />
        <motion.div whileHover={{ y: -1.5 }} whileTap={{ scale: 0.97 }}>
          <Link
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-black px-2.5 py-1 text-[11px] text-white dark:bg-white dark:text-black"
          >
            Contribute
          </Link>
        </motion.div>
      </div>
      <div className="flex flex-wrap items-center gap-1 rounded-xl bg-neutral-100 p-1 text-[11px] dark:bg-neutral-900">
        {links}
      </div>
    </nav>
  );
}
