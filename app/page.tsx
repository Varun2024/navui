import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { NavbarDemo } from "@/components/NavbarDemo";
import { SITE_NAME, SITE_URL, buildSeoMetadata } from "@/lib/seo";

const Categories = dynamic(() =>
  import("@/components/Categories").then((module) => module.Categories),
);

const ComponentGrid = dynamic(() =>
  import("@/components/ComponentGrid").then((module) => module.ComponentGrid),
);

const HowItWorks = dynamic(() =>
  import("@/components/HowItWorks").then((module) => module.HowItWorks),
);

const FeatureSection = dynamic(() =>
  import("@/components/FeatureSection").then((module) => module.FeatureSection),
);

const Footer = dynamic(() =>
  import("@/components/Footer").then((module) => module.Footer),
);

export const metadata: Metadata = buildSeoMetadata({
  title: "Modern Navigation Components",
  description:
    "Open-source gallery of modern navigation patterns for React, Next.js, and Tailwind CSS.",
  path: "/",
  keywords: ["navigation components", "ui library", "component gallery"],
});

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Open-source gallery of modern navigation patterns for React, Next.js, and Tailwind CSS.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/gallery?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <div className="hero-glow" aria-hidden />
      <NavbarDemo />
      <main className="pt-20 sm:pt-24">
        <Hero />
        <Suspense
          fallback={
            <div className="mx-auto w-[min(1120px,94%)] py-10 text-sm text-neutral-500 dark:text-neutral-400">
              Loading components...
            </div>
          }
        >
          <ComponentGrid mode="home" />
        </Suspense>
        <Suspense
          fallback={
            <div className="mx-auto w-[min(1120px,94%)] py-10 text-sm text-neutral-500 dark:text-neutral-400">
              Loading categories...
            </div>
          }
        >
          <Categories />
        </Suspense>
        <HowItWorks />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}
