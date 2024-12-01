//@ts-nocheck
'use client';

import { Check, Copy, RotateCw } from 'lucide-react';
import React, { useState, Suspense } from 'react';
import { TCurrComponentProps } from './component-code-preview';

type ComponentPreviewProps = {
  component?: TCurrComponentProps;
  hasReTrigger?: boolean;
  className?: string;
  code: string;
  responsive?: boolean;
  isFitheight?: boolean;
  isNotCopy?: boolean;
  iframeComponent?: string;
};

export default function ComponentPreview({
  component,
  hasReTrigger = true,
  className,
  code,
  isFitheight,
  isNotCopy,
}: ComponentPreviewProps) {
  const [reTriggerKey, setReTriggerKey] = useState<number>(0);
  const [hasCheckIcon, setHasCheckIcon] = useState(false);

  const handleReTrigger = () => {
    if (hasReTrigger) {
      setReTriggerKey((prevKey) => prevKey + 1);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setHasCheckIcon(true);

    setTimeout(() => {
      setHasCheckIcon(false);
    }, 1000);
  };

  return (
    <>
      <div className='absolute right-1 top-0 z-[10] flex h-12 items-center gap-2'>
        {!isNotCopy && (
          <button
            className='relative grid cursor-pointer place-content-center rounded-lg border bg-background p-2 px-2.5'
            onClick={onCopy}
          >
            <div
              className={`transform transition-all duration-300 ${hasCheckIcon ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            >
              <Copy className='h-5 w-5' />
            </div>
            <div
              className={`absolute inset-0 left-0 top-0 grid h-full w-full transform place-content-center transition-all duration-300 ${
                hasCheckIcon ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <Check className='h-5 w-5' />
            </div>
          </button>
        )}
        {hasReTrigger && (
          <button
            className='relative grid group cursor-pointer place-content-center rounded-lg border bg-background p-2 px-2'
            onClick={handleReTrigger}
          >
            <RotateCw className='h-5 w-5 group-hover:rotate-180 transition-transform' />
          </button>
        )}
      </div>

      <>
        <div
          className={` '2xl:h-[350px] h-[300px]  relative overflow-auto' border w-full rounded-lg dark:bg-[#080b11] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] overflow-hidden pt-8 p-8`}
        >
          <div className='h-full w-full mx-auto p-5 not-prose'>
            <Suspense fallback={<div>Loading component...</div>}>
              <div key={reTriggerKey}>
                <component.componentSrc />
              </div>
            </Suspense>
            {component?.comMessage && (
              <p className='text-xl w-full grid place-content-center absolute top-0 h-full left-0'>
                {component?.comMessage}
              </p>
            )}
          </div>
        </div>
      </>
    </>
  );
}
