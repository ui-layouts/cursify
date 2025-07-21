'use client';

import { Check, Copy, RotateCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { TCurrComponentProps } from './component-code-preview';
import { AllComponens } from '@/configs/docs';
import { cn } from '@/lib/utils';

type ComponentPreviewProps = {
  component?: TCurrComponentProps;
  hasReTrigger?: boolean;
  className?: string;
  code: string;
  responsive?: boolean;
  isNotCopy?: boolean;
  type?: string;
};
type DynamicComponentType = React.ComponentType<any>;

export default function ComponentPreview({
  component,
  hasReTrigger = false,
  className,
  code,
  responsive,
  isNotCopy,
  type
}: ComponentPreviewProps) {
  const [reTriggerKey, setReTriggerKey] = useState<number>(0);
  const [hasCheckIcon, setHasCheckIcon] = useState(false);
  const [width, setWidth] = useState('100%');

  const handleReTrigger = () => {
    if (hasReTrigger) {
      // Safeguard to avoid rapid key updates
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

  const currentComponentData = AllComponens.find(
    (com) => com.id === component?.componentName
  );

  return (
    <>
      <div className={cn('absolute right-10 top-7 z-[10] flex h-12 items-center gap-2',type === "separate" && 'right-4 top-4')}>
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

      <div className={`h-full overflow-auto pt-0 p-0`}>
        <div
          className='h-full mx-auto p-0 not-prose'
          style={{ width: responsive ? width : '100%' }}
        >
          {currentComponentData ? (
            React.createElement(
              currentComponentData.componentSrc as DynamicComponentType,
              { key: reTriggerKey }
            )
          ) : (
            <div>Component Not Found</div>
          )}
        </div>
      </div>
    </>
  );
}
