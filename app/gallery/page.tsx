import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { NavbarDemo } from "@/components/NavbarDemo";
import { buildSeoMetadata } from "@/lib/seo";

const ComponentGrid = dynamic(() =>
  import("@/components/ComponentGrid").then((module) => module.ComponentGrid),
);

const Footer = dynamic(() =>
  import("@/components/Footer").then((module) => module.Footer),
);

export const metadata: Metadata = buildSeoMetadata({
  title: "Navbar Gallery",
  description: "Browse every navbar pattern from NavUI in one searchable gallery.",
  path: "/gallery",
  keywords: ["navbar gallery", "ui patterns", "copy paste navbar"],
});

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="hero-glow" aria-hidden />
      <NavbarDemo />
      <main className="pt-20 sm:pt-24">
        <ComponentGrid mode="gallery" />
      </main>
      <Footer />
    </div>
  );
}
