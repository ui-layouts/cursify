'use client';

import { cn } from 'clswind';
import { HugeiconsIcon } from '@hugeicons/react';
import Copy01Icon from '@hugeicons/core-free-icons/Copy01Icon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import { useEffect, useRef, useState } from 'react';

export function CopyButton({
  code,
  classname,
}: {
  code: string;
  classname?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 1800);
  }

  return (
    <button
      type='button'
      aria-label='Copy code'
      onClick={copy}
      title={status === 'error' ? 'Clipboard unavailable' : 'Copy code'}
      className={cn(
        'absolute right-2 top-2 z-[1] grid h-8 w-8 place-items-center rounded-lg bg-white text-neutral-700 focus-visible:outline-offset-2',
        classname,
      )}
      style={{
        boxShadow:
          'var(--panel-rim, inset 0 1px 0 #fff, 0 0 0 1px #0001, 0 2px 4px #0001)',
      }}
    >
      <HugeiconsIcon
        icon={status === 'copied' ? Tick02Icon : Copy01Icon}
        size={16}
      />
      <span role='status' className='sr-only'>
        {status === 'copied'
          ? 'Copied'
          : status === 'error'
            ? 'Could not copy to clipboard'
            : ''}
      </span>
    </button>
  );
}
