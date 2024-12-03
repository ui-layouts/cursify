'use client';

import { cn } from '@/lib/utils';
import {
  Check,
  Copy,
  ExternalLink,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
} from 'lucide-react';
import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { TCurrComponentProps } from './component-code-preview';
import dynamic from 'next/dynamic';
import { AllComponens } from '@/configs/docs';

type ComponentPreviewProps = {
  component?: TCurrComponentProps;
  hasReTrigger?: boolean;
  className?: string;
  code: string;
  responsive?: boolean;
  isNotCopy?: boolean;
  iframeComponent?: string;
};
type DynamicComponentType = React.ComponentType<any>;

export default function ComponentPreview({
  component,
  hasReTrigger = false,
  className,
  code,
  responsive,
  isNotCopy,
  iframeComponent,
}: ComponentPreviewProps) {
  const [reTriggerKey, setReTriggerKey] = useState<number>(0);
  const [hasCheckIcon, setHasCheckIcon] = useState(false);
  const [width, setWidth] = useState('100%');
  const [mode, setMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

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
  // console.log(component);
  const currentComponentData = AllComponens.find(
    (com) => com.id === component?.componentName
  );
  // Memoize the ComponentPreview to prevent re-rendering

  return (
    <>
      <div className='absolute right-10 top-7 z-[10] flex h-12 items-center gap-2'>
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
        <div className={` h-full overflow-auto  pt-0 p-0`}>
          <div
            className='h-full  mx-auto p-0 not-prose'
            style={{ width: responsive ? width : '100%' }}
          >
            {currentComponentData ? (
              React.createElement(
                currentComponentData.componentSrc as DynamicComponentType,
                { key: reTriggerKey }
              )
            ) : (
              <>Component Not Found</>
            )}
          </div>
        </div>
      </>
    </>
  );
}
