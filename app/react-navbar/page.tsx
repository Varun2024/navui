import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";

export const metadata: Metadata = {
  title: "React Navbar Components | NavUI",
  description: "Discover modern React navbar components with clean styling and copy-paste code.",
};

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
