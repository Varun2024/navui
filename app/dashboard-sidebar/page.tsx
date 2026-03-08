import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/SeoLandingPage";
import { navbars } from "@/data/navbars";
import { buildSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "Dashboard Sidebar Components",
  description: "Sidebar navigation patterns tailored for dashboard applications.",
  path: "/dashboard-sidebar",
  keywords: ["dashboard sidebar", "admin sidebar", "sidebar navigation"],
});

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
