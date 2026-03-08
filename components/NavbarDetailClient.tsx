"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { NavbarItem } from "@/data/navbars";
import { CopyButton } from "@/components/ui/CopyButton";

type NavbarDetailClientProps = {
  item: NavbarItem;
  preview: React.ReactNode;
};

function highlightLine(line: string, lineIndex: number) {
  const tokenRegex = /(\/\/.*$|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`]*`|\b(?:import|from|export|function|return|const|let|if|else|for|while|new|useEffect|useState)\b|<\/?[A-Za-z][A-Za-z0-9-]*|\b(?:className|class)\b)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let tokenIndex = 0;

  for (const match of line.matchAll(tokenRegex)) {
    const value = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(
        <span key={`txt-${lineIndex}-${tokenIndex}`}>{line.slice(lastIndex, index)}</span>,
      );
    }

    let className = "text-neutral-100";
    if (value.startsWith("//")) {
      className = "text-neutral-500";
    } else if (value.startsWith("\"") || value.startsWith("'") || value.startsWith("`")) {
      className = "text-emerald-300";
    } else if (
      [
        "import",
        "from",
        "export",
        "function",
        "return",
        "const",
        "let",
        "if",
        "else",
        "for",
        "while",
        "new",
        "useEffect",
        "useState",
      ].includes(value)
    ) {
      className = "text-sky-300";
    } else if (value.startsWith("<")) {
      className = "text-violet-300";
    } else if (value === "className" || value === "class") {
      className = "text-amber-300";
    }

    nodes.push(
      <span key={`tok-${lineIndex}-${tokenIndex}`} className={className}>
        {value}
      </span>,
    );

    lastIndex = index + value.length;
    tokenIndex += 1;
  }

  if (lastIndex < line.length) {
    nodes.push(<span key={`end-${lineIndex}`}>{line.slice(lastIndex)}</span>);
  }

  return nodes;
}

function renderHighlightedCode(code: string) {
  return code.split("\n").map((line, index) => (
    <div key={`line-${index}`}>
      {highlightLine(line, index)}
    </div>
  ));
}

function ScrollShrinkingInteractivePreview() {
  const [isCompact, setIsCompact] = useState(false);

  return (
    <div
      onScroll={(event) => {
        const target = event.currentTarget;
        setIsCompact(target.scrollTop > 24);
      }}
      className="max-h-90 overflow-y-auto"
    >
      <header className="sticky top-0 z-10 pb-3">
        <nav
          className={`mx-auto flex w-full items-center justify-between rounded-xl border border-black/10 bg-white/90 px-3 backdrop-blur transition-all duration-300 dark:border-white/10 dark:bg-neutral-950/90 ${
            isCompact ? "py-1 shadow-md" : "py-4 shadow-sm"
          }`}
        >
          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">NavUI</span>
          <div className="hidden gap-4 text-xs text-neutral-700 dark:text-neutral-300 sm:flex">
            <span>Components</span>
            <span>Templates</span>
            <span>Docs</span>
          </div>
          <Link
            href="https://github.com/Varun2024/navui.git"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-black px-2.5 py-1 text-[11px] text-white transition active:scale-95 dark:bg-white dark:text-black"
          >
            Contribute
          </Link>
        </nav>
      </header>

      <div className="space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
        <p>Scroll this preview area. Header starts large and shrinks into compact mode.</p>
        <div className="h-40 rounded-lg border border-black/10 bg-white/70 dark:border-white/10 dark:bg-neutral-950/70" />
        <div className="h-40 rounded-lg border border-black/10 bg-white/70 dark:border-white/10 dark:bg-neutral-950/70" />
      </div>
    </div>
  );
}

export function NavbarDetailClient({ item, preview }: NavbarDetailClientProps) {
  const isScrollShrinkingNavbar = item.slug === "scroll-navbar";
  const highlightedCode = useMemo(() => renderHighlightedCode(item.code), [item.code]);
  const [previewHint, setPreviewHint] = useState(false);

  useEffect(() => {
    if (!previewHint) {
      return;
    }

    const timer = window.setTimeout(() => setPreviewHint(false), 1600);
    return () => window.clearTimeout(timer);
  }, [previewHint]);

  return (
    <div className="mx-auto w-[min(1120px,94%)] py-10 md:py-14">
      <Link
        href="/gallery"
        className="mb-4 inline-flex text-sm text-neutral-600 transition hover:text-black dark:text-neutral-300 dark:hover:text-white"
      >
        Back to gallery
      </Link>

      <div className="grid gap-5 lg:grid-cols-[1.2fr,0.8fr]">
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950"
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{item.title}</h1>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{item.summary}</p>
            </div>
            <span className="rounded-lg border border-black/10 px-2 py-1 text-xs dark:border-white/10">
              {item.category}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-black/10 px-2 py-1 text-xs text-neutral-600 dark:border-white/10 dark:text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            onClickCapture={(event) => {
              const target = event.target as HTMLElement;
              const anchor = target.closest("a");
              const href = anchor?.getAttribute("href") ?? "";
              if (anchor && href.startsWith("/")) {
                event.preventDefault();
                setPreviewHint(true);
              }
            }}
            className="rounded-xl border border-dashed border-black/15 bg-neutral-50 p-4 dark:border-white/15 dark:bg-neutral-900"
          >
            {isScrollShrinkingNavbar ? <ScrollShrinkingInteractivePreview /> : preview}
          </div>

          {previewHint && (
            <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300">
              Preview stays on this details page. Use page links above to navigate.
            </p>
          )}

          <section className="mt-4 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-neutral-950">
            <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">SEO Description</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{item.seoText}</p>
          </section>
        </motion.section>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-neutral-950">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium">Component Code</h2>
              <CopyButton value={item.code} label="Copy Code" />
            </div>
            <pre className="max-h-72 overflow-auto rounded-lg bg-neutral-950 p-3 text-xs leading-5 text-neutral-100">
              <code>{highlightedCode}</code>
            </pre>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-neutral-950">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-medium">AI Prompt</h2>
              <CopyButton value={item.prompt} label="Copy Prompt" />
            </div>
            <p className="rounded-lg bg-neutral-50 p-3 text-sm leading-6 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              {item.prompt}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
