"use client";

import { navbarCategories } from "@/data/navbars";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function Categories() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  return (
    <section id="categories" className="mx-auto w-[min(1120px,94%)] py-10 md:py-14">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
          Categories
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {navbarCategories.length} types
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {navbarCategories.map((category) => (
          <Link key={category} href={`/?category=${encodeURIComponent(category)}#gallery`}>
            <article
              className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:shadow-sm ${
                activeCategory === category
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/10 bg-white dark:border-white/10 dark:bg-neutral-950"
              }`}
            >
              <h3
                className={`text-base font-medium ${
                  activeCategory === category
                    ? "text-white dark:text-black"
                    : "text-neutral-900 dark:text-neutral-100"
                }`}
              >
                {category}
              </h3>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
