import { notFound } from 'next/navigation';
import { getAllDocSlugs } from '@/lib/docs';
import { LiveEffect } from '@/components/website/showcase/live-effect';

export const metadata = { robots: { index: false, follow: false } };
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllDocSlugs().map(slug => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getAllDocSlugs().includes(slug)) notFound();
  return <LiveEffect slug={slug} />;
}
