"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Browse",
    description: "Pick a component.",
  },
  {
    title: "Copy",
    description: "Grab code + prompt.",
  },
  {
    title: "Paste",
    description: "Ship in your app.",
  },
];

const sampleCode = `export function Navbar() {
  return (
    <nav className=\"flex items-center justify-between rounded-xl\">...</nav>
  )
}`;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-[min(1120px,94%)] py-10 md:py-14">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
          How It Works
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.25fr,1fr]">
        <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-neutral-950">
          <div className="mb-4 hidden h-1 rounded-full bg-neutral-100 dark:bg-neutral-900 md:block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-1 rounded-full bg-neutral-800 dark:bg-neutral-200"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="rounded-xl border border-black/10 bg-neutral-50 p-4 dark:border-white/10 dark:bg-neutral-900"
            >
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Step {index + 1}</p>
              <h3 className="mt-1 text-base font-medium text-neutral-900 dark:text-neutral-100 sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {step.description}
              </p>
            </motion.article>
          ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-950 p-4 shadow-sm dark:border-white/10 sm:p-5"
        >
          <p className="mb-3 text-xs text-neutral-400">Code Preview</p>
          <pre className="overflow-x-auto text-sm leading-6 text-neutral-100">
            <code>{sampleCode}</code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
