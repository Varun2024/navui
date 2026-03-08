import type { Metadata } from "next";

export const SITE_NAME = "NavUI";
export const SITE_DESCRIPTION =
  "Open-source gallery of modern navigation patterns for React, Next.js, and Tailwind CSS.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://navui.dev";
export const DEFAULT_OG_IMAGE = "/navui-og.svg";
export const TWITTER_HANDLE = "@TheV_Stack";

const baseKeywords = [
  "navbar components",
  "next.js navbar",
  "react navbar",
  "tailwind navbar",
  "navigation ui",
  "open source ui",
];

type BuildSeoMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildSeoMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: BuildSeoMetadataOptions): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords: [...baseKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
  };
}
