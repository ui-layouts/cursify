'use client';

import {
  createElement,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
} from 'react';
import { AllComponens } from '@/configs/docs';
import styles from './showcase.module.css';

export function LiveEffect({ slug }: { slug: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const entry = AllComponens.find((item) => item.id === slug);
  if (!entry) return null;
  return (
    <main className={styles.live} aria-label={entry.componentName}>
      {entry.filePath.includes('/common/') && (
        <p className={styles.hint}>Move your pointer</p>
      )}
      {mounted && (
        <Suspense fallback={null}>
          {createElement(entry.componentSrc as ComponentType)}
        </Suspense>
      )}
    </main>
  );
}
