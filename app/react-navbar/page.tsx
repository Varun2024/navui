import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "React Navbar Components",
  description: "Discover modern React navbar components with clean styling and copy-paste code.",
  path: "/react-navbar",
  keywords: ["react navbar", "react navigation", "react ui components"],
});

const items = navbars.filter((item) => item.category === "Navbars");

export default function ReactNavbarPage() {
  return (
    <SeoLandingPage
      title="React Navbar Components"
      description="Production-ready navbar examples for React projects with minimal styling and smooth interactions."
      items={items}
    />
  );
}
