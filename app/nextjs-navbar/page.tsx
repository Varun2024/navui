import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Next.js Navbar Patterns",
  description: "Explore modern navbar patterns designed for Next.js applications.",
  path: "/nextjs-navbar",
  keywords: ["next.js navbar", "app router navbar", "nextjs ui components"],
});

const items = navbars.filter((item) => item.category === "Navbars");

export default function NextJsNavbarPage() {
  return (
    <SeoLandingPage
      title="Next.js Navbar Patterns"
      description="Responsive and modern navbar patterns tuned for Next.js App Router workflows."
      items={items}
    />
  );
}
