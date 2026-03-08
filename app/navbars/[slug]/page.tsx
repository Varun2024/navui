import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NavbarDetailClient } from "@/components/NavbarDetailClient";
import { NavbarPreview } from "@/components/navbar-components/previews";
import { getNavbarBySlug, navbars } from "@/data/navbars";

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
      title: "Component Not Found | NavUI",
    };
  }

  return {
    title: `${item.title} | NavUI`,
    description: item.seoText,
  };
}

export default async function NavbarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getNavbarBySlug(slug);

  if (!item) {
    notFound();
  }

  return <NavbarDetailClient item={item} preview={NavbarPreview({ slug })} />;
}
