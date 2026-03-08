import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Animated Navbar Components",
  description: "Animated navigation patterns with subtle motion and clean interactions.",
  path: "/animated-navbar",
  keywords: ["animated navbar", "navbar transitions", "interactive navigation"],
});

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
