'use client';

import { useState } from 'react';
import AtelierMedia, { type AtelierEffect } from './atelier-media';

export default function AtelierMediaPreview() {
  const [type, setType] = useState<AtelierEffect>('liquid');
  return (
    <div className='flex h-full min-h-64 flex-col items-center justify-center gap-3 p-4'>
      <AtelierMedia
        type={type}
        src='/atelier-media.webp'
        alt='Atelier UI gallery photograph'
        className='aspect-square w-full max-w-xs overflow-hidden rounded-xl'
      />
      <div role='group' aria-label='Mouse effect' className='flex gap-1'>
        {(['liquid', 'pixel', 'lens'] as const).map((effect) => (
          <button
            key={effect}
            type='button'
            aria-pressed={type === effect}
            onClick={() => setType(effect)}
            className='rounded-full px-3 py-1 text-sm capitalize aria-pressed:bg-foreground aria-pressed:text-background'
          >
            {effect}
          </button>
        ))}
      </div>
    </div>
  );
}
