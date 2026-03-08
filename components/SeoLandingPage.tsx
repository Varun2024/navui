import Link from "next/link";
import type { NavbarItem } from "@/data/navbars";

type SeoLandingPageProps = {
  title: string;
  description: string;
  items: NavbarItem[];
};

export function SeoLandingPage({ title, description, items }: SeoLandingPageProps) {
  return (
    <main className="mx-auto w-[min(1120px,94%)] py-10 md:py-14">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
          {description}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.slug}
            className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-neutral-950"
          >
            <Link href={`/navbars/${item.slug}`} className="block">
              <div className="mb-3 h-28 rounded-xl border border-dashed border-black/15 bg-neutral-50 dark:border-white/15 dark:bg-neutral-900" />
              <h2 className="text-lg font-semibold leading-tight tracking-tight text-neutral-950 dark:text-neutral-50 sm:text-xl">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{item.summary}</p>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
