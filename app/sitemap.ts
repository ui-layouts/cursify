import type { MetadataRoute } from 'next';
import { getAllDocSlugs } from '@/lib/docs';
import { siteConfig } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/get-started', '/components', ...getAllDocSlugs().map((slug) => `/components/${slug}`)];

  return paths.map((path) => ({ url: new URL(path, siteConfig.url).href }));
}
