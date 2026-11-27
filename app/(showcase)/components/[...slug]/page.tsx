import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDocBySlug, getAllDocs } from '@/lib/docs';
import { pageMetadata } from '@/lib/page-metadata';
import { HugeiconsIcon } from '@hugeicons/react';
import CubeIcon from '@hugeicons/core-free-icons/CubeIcon';
import docs from '@/configs/docs.json';
import { extractCodeFromFilePath } from '@/lib/code';
import { PreCoded } from '@/components/website/code-components/pre-coded';
import { Showcase } from '@/components/website/showcase/showcase';
import styles from '@/components/website/showcase/showcase.module.css';
import { getBreadcrumbSchema } from '@/app/schema';
import { siteConfig } from '@/lib/utils';

export async function generateStaticParams() {
  const docs = await getAllDocs();

  return docs.map((doc) => ({
    slug: doc.slug === 'index' ? [] : doc.slug.split('/'),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug?.join('/') || '';
  const doc = await getDocBySlug(slug);
  if (!doc) {
    return {};
  }
  return pageMetadata({
    path: `/components/${doc.slug}`,
    title: doc.content.metadata.title,
    description: doc.content.metadata.description,
    type: 'article',
    tags: doc.content.metadata.tags,
  });
}

export default async function DocPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const slug = params.slug?.join('/') || '';
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const { default: Content } = doc.content;

  const entry = docs.dataArray.flatMap(group => group.componentArray).find(item => item.componentName === slug);
  if (!entry?.filesrc) notFound();
  const filePath = 'registry/' + entry.filesrc;
  const source = extractCodeFromFilePath(filePath);
  const { title, description } = doc.content.metadata;
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: siteConfig.url },
    { name: 'Components', item: `${siteConfig.url}/components` },
    { name: doc.content.metadata.title, item: `${siteConfig.url}/components/${doc.slug}` },
  ]);

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <Showcase key={slug} slug={slug} title={title} source={source} filePath={filePath}>
        <article id='component-details' tabIndex={-1} className={styles.details}>
          <h1 className={styles.componentHeading}><span className={styles.headingTile}><HugeiconsIcon icon={CubeIcon} size={20} aria-hidden /></span>{title}</h1>
          <p className={styles.description}>{description}</p>
          <div className='prose prose-zinc max-w-none dark:prose-invert'>
            <Content components={{ ComponentCodePreview: () => null }} />
          </div>
          <section aria-label='Component source' className='mt-8 min-w-0'>
            <h2 className='mb-3 text-xl font-semibold'>Source code</h2>
            <PreCoded codeblock={source} type='separate' classname='p-0' tabclassname='right-16 top-4' copyclass='right-5 top-4' />
          </section>
        </article>
      </Showcase>
    </>
  );
}
