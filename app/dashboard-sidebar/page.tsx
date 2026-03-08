import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";

export const metadata: Metadata = {
  title: "Dashboard Sidebar Components | NavUI",
  description: "Sidebar navigation patterns tailored for dashboard applications.",
};

const items = navbars.filter(
  (item) => item.category === "Sidebars" || item.tags.includes("dashboard"),
);

export default function DashboardSidebarPage() {
  return (
    <SeoLandingPage
      title="Dashboard Sidebar Components"
      description="Clean sidebar patterns for analytics, admin, and internal tools dashboards."
      items={items}
    />
  );
}
