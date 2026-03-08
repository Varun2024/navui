"use client";

import { useEffect, useState } from "react";
import { Check, Coffee, Copy, Smartphone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import coffeeQrImage from "../assets/coffee.jpeg";

const BUY_ME_COFFEE_URL = "https://buymeacoffee.com/varun_builds";
const UPI_ID = "barimegh21@okaxis";

type BuyMeCoffeeWidgetProps = {
  stickOnScroll?: boolean;
  scrollOffset?: number;
};

export function BuyMeCoffeeWidget({ stickOnScroll = false, scrollOffset = 220 }: BuyMeCoffeeWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    if (!stickOnScroll) {
      return;
    }

    const onScroll = () => {
      setIsSticky(window.scrollY > scrollOffset);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollOffset, stickOnScroll]);

  useEffect(() => {
    if (!copiedUpi) {
      return;
    }

    const timer = window.setTimeout(() => setCopiedUpi(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copiedUpi]);

  async function copyUpiId() {
    await navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
  }

  const containerClassName = stickOnScroll
    ? isSticky
      ? "fixed right-4 top-1/2 z-50 -translate-y-1/2"
      : "relative z-10"
    : "fixed bottom-4 left-3 z-50 md:bottom-auto md:top-1/2 md:-translate-y-1/2";

  const panelClassName = stickOnScroll
    ? isSticky
      ? "absolute bottom-full right-0 z-50 mb-2 w-[min(92vw,360px)] rounded-2xl border border-black/10 bg-neutral-100 p-4 shadow-xl dark:border-white/10 dark:bg-neutral-900"
      : "absolute top-full left-1/2 z-50 mt-2 w-[min(92vw,360px)] -translate-x-1/2 rounded-2xl border border-black/10 bg-neutral-100 p-4 shadow-xl sm:left-0 sm:translate-x-0 dark:border-white/10 dark:bg-neutral-900"
    : "absolute bottom-full left-0 z-50 mb-2 w-[min(92vw,360px)] rounded-2xl border border-black/10 bg-neutral-100 p-4 shadow-xl dark:border-white/10 dark:bg-neutral-900";

  const triggerClassName = stickOnScroll
    ? isSticky
      ? "tap-press inline-flex min-h-12 items-center gap-2 rounded-full border border-amber-500/80 bg-amber-300 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-[0_10px_24px_rgba(245,158,11,0.35)] dark:border-cyan-300/80 dark:bg-cyan-300 dark:text-neutral-950"
      : "tap-press inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-amber-500/70 bg-amber-300 px-3 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-amber-200 sm:min-h-12 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm dark:border-cyan-300/80 dark:bg-cyan-300 dark:text-neutral-950 dark:hover:bg-cyan-200"
    : "tap-press inline-flex min-h-12 items-center gap-2 rounded-full border border-amber-500/80 bg-amber-300 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-[0_10px_24px_rgba(245,158,11,0.35)] dark:border-cyan-300/80 dark:bg-cyan-300 dark:text-neutral-950";

  return (
    <div className={containerClassName}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className={panelClassName}
          >
            <div className="flex items-start justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="tap-press inline-flex min-h-8 min-w-8 items-center justify-center rounded-md border border-black/10 bg-white text-neutral-700 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-200"
                aria-label="Close buy me a coffee panel"
              >
                <X size={14} />
              </button>
            </div>

            <a
              href={BUY_ME_COFFEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-press mt-1 flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2.5 transition hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-950 dark:hover:bg-neutral-900"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-white">
                <Coffee size={18} />
              </span>
              <div>
                <p className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Buy Me Coffee</p>
              </div>
            </a>

            <div className="mt-3 rounded-xl border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-neutral-950">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <Smartphone size={18} />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">UPI Payment</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Scan QR or copy UPI ID</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={copyUpiId}
                  className="tap-press inline-flex h-8 w-8 items-center justify-center rounded-md border border-black/10 text-neutral-600 dark:border-white/10 dark:text-neutral-300"
                  aria-label="Copy UPI ID"
                  title={copiedUpi ? "Copied" : "Copy UPI ID"}
                >
                  {copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              <div className="mt-3 flex flex-col items-center">
                <Image
                  src={coffeeQrImage}
                  alt="QR code for buying coffee"
                  width={180}
                  height={180}
                  className="h-40 w-40 rounded-md bg-white p-1"
                />
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200">UPI ID: {UPI_ID}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Scan to pay with any UPI app</p>
                {copiedUpi && <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">UPI ID copied</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={triggerClassName}
        aria-expanded={isOpen}
        aria-label="Toggle buy me a coffee panel"
      >
        <Coffee size={16} />
        {stickOnScroll && !isSticky ? (
          <>
            <span className="hidden sm:inline">Coffee</span>
          </>
        ) : (
          "Coffee"
        )}
      </button>
    </div>
  );
}
