"use client";

import { useState } from "react";
import { Coffee, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BUY_ME_COFFEE_URL = "https://www.buymeacoffee.com/Varun2024";

export function BuyMeCoffeeWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="mb-2 w-[min(88vw,260px)] rounded-xl border border-black/10 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-neutral-950"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                  Enjoying NavUI?
                </p>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
                  Support development with a coffee.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="tap-press inline-flex min-h-8 min-w-8 items-center justify-center rounded-md border border-black/10 text-neutral-700 dark:border-white/10 dark:text-neutral-200"
                aria-label="Close buy me a coffee panel"
              >
                <X size={14} />
              </button>
            </div>
            <a
              href={BUY_ME_COFFEE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-press mt-3 inline-flex w-full items-center justify-center rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              Buy me a coffee
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="tap-press inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-neutral-800 shadow-lg dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-100"
        aria-expanded={isOpen}
        aria-label="Toggle buy me a coffee panel"
      >
        <Coffee size={14} />
        Coffee
      </button>
    </div>
  );
}
