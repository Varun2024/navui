import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";

export const metadata: Metadata = {
  title: "Next.js Navbar Patterns | NavUI",
  description: "Explore modern navbar patterns designed for Next.js applications.",
};

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
