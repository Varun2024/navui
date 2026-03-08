import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";

export const metadata: Metadata = {
  title: "Tailwind Navbar Components | NavUI",
  description: "Tailwind CSS navbar examples focused on clarity, spacing, and fast integration.",
};

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
