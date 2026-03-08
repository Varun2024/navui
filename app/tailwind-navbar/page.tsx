import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Tailwind Navbar Components",
  description: "Tailwind CSS navbar examples focused on clarity, spacing, and fast integration.",
  path: "/tailwind-navbar",
  keywords: ["tailwind navbar", "tailwind navigation", "tailwind ui"],
});

const items = navbars.filter((item) => item.category === "Navbars");

export default function TailwindNavbarPage() {
  return (
    <SeoLandingPage
      title="Tailwind Navbar Components"
      description="Reusable Tailwind navbar components with modern visual rhythm and clean utility classes."
      items={items}
    />
  );
}
