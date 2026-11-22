import { siteConfig } from '@/lib/utils';

const baseUrl = siteConfig.url;

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cursify',
    description:
      'A comprehensive library of stunning cursor animations and interactive effects for React and Next.js applications',
    url: baseUrl,
    inLanguage: 'en-US',
  };
}

export function getSoftwareAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cursify',
    description:
      'An open source cursor animation library with interactive effects and code examples for React and Next.js.',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: baseUrl,
    image: `${baseUrl}/og.jpg`,
    author: {
      '@type': 'Organization',
      name: 'Ui Layouts',
      url: 'https://www.ui-layouts.com',
    },
    sameAs: ['https://github.com/ui-layouts/cursify'],
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}
