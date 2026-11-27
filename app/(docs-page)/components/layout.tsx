import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  path: '/components',
  title: 'Cursor Effects and Animated Backgrounds',
  description:
    'Browse Cursify’s cursor animations, mouse trails, and interactive backgrounds for React and Next.js. Preview each effect and copy the source code.',
});

export default function ComponentsLayout({ children }: { children: ReactNode }) {
  return children;
}
