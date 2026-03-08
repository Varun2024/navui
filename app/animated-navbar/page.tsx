import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";

export const metadata: Metadata = {
  title: "Animated Navbar Components | NavUI",
  description: "Animated navigation patterns with subtle motion and clean interactions.",
};

const items = navbars.filter((item) =>
  item.tags.some((tag) => ["animated", "underline", "scroll"].includes(tag)),
);

export default function AnimatedNavbarPage() {
  return (
    <SeoLandingPage
      title="Animated Navbar Components"
      description="Navigation patterns with subtle transitions, hover states, and scroll-aware behavior."
      items={items}
    />
  );
}
