import type { Metadata } from 'next';
import Background from '@/components/website/background';
import Header from '@/components/website/header';
import HeroSec from '@/components/website/hero-sec';
import { getSoftwareAppSchema, getWebsiteSchema } from '@/app/schema';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'React Cursor Animation Library',
  description:
    'Browse interactive cursor effects and animated backgrounds for React and Next.js. Try live demos and copy the TypeScript or JavaScript into your project.',
});

export default function Home() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([getWebsiteSchema(), getSoftwareAppSchema()]),
        }}
      />
      <Background>
        <Header />
        <HeroSec />
      </Background>
    </>
  );
}
