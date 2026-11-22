import type { Metadata } from 'next';
import { siteConfig } from './utils';

export function pageMetadata({
  path,
  title,
  description,
  type = 'website',
  tags,
}: {
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
  tags?: string[];
}): Metadata {
  const url = new URL(path, siteConfig.url).href;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      images: [{ url: siteConfig.ogImage, width: 1200, height: 672, alt: 'Cursify cursor animation library' }],
      ...(type === 'article' ? { tags } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.ogImage],
    },
  };
}
