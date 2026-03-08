import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { NavbarDemo } from "@/components/NavbarDemo";

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

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="hero-glow" aria-hidden />
      <NavbarDemo />
      <main className="pt-20 sm:pt-24">
        <Hero />
        <ComponentGrid mode="home" />
        <Categories />
        <HowItWorks />
        <FeatureSection />
      </main>
      <Footer />
    </div>
  );
}
