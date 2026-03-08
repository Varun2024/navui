import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavbarDetailClient } from "@/components/NavbarDetailClient";
import { NavbarPreview } from "@/components/navbar-components/previews";
import { getNavbarBySlug, navbars } from "@/data/navbars";
import { buildSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return navbars.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNavbarBySlug(slug);

  if (!item) {
    return {
      title: "Component Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildSeoMetadata({
    title: item.title,
    description: item.seoText,
    path: `/navbars/${item.slug}`,
    keywords: [item.category.toLowerCase(), ...item.tags],
  });
}

export default async function NavbarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getNavbarBySlug(slug);

  if (!item) {
    notFound();
  }

  return <NavbarDetailClient item={item} preview={NavbarPreview({ slug })} />;
}
