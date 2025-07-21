import docs from '@/configs/docs.json';

import ComponentPreview from './component-preview';
import { extractCodeFromFilePath } from '@/lib/code';
import React from 'react';
import { Code, Eye } from 'lucide-react';
import { PreCoded } from './pre-coded';
import { cn } from '@/lib/utils';

type ComponentCodePreview = {
  component: React.ReactElement<any>;
  hasReTrigger?: boolean;
  name: string;
  children: React.ReactNode; //
  responsive?: boolean;
  isTab?: boolean;
  isFitheight?: boolean;
  isNotCopy?: boolean;
  type?: string;
};
export type TCurrComponentProps = {
  componentName: string;
  iframeSrc?: string;
  componentSrc?: React.LazyExoticComponent<React.FC<{}>>;
  filesrc?: string;
  examplePreview?: string;
  compIframeSrc?: string;
  filesArray?: any;
};

export default async function ComponentCodePreview({
  hasReTrigger = true,
  name,
  responsive,
  isNotCopy = true,
  type,
}: ComponentCodePreview) {
  const currComponent: TCurrComponentProps | null =
    docs.dataArray.reduce<TCurrComponentProps | null>((acc, component) => {
      const file = component?.componentArray?.find(
        (file) => file.componentName === name
      );

      if (file) {
        acc = file;
      }
      return acc;
    }, null);
  // console.log(currComponent);

  if (!currComponent) {
    return <div>Component not found</div>;
  }

  const fileContent = extractCodeFromFilePath(
    `registry/${currComponent?.filesrc}`
  );
  // console.log('childer', children);

  // console.log(fileContent);

  return (
    <>
      <div
        className={cn(
          'not-prose relative z-0 md:grid grid-cols-2  pb-3 border w-full rounded-lg dark:bg-[#080b11] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] overflow-hidden',
          type === 'separate' && 'xl:h-[34rem] h-[30rem]'
        )}
      >
        <ComponentPreview
          hasReTrigger={hasReTrigger}
          component={currComponent}
          code={fileContent}
          responsive={responsive}
          isNotCopy={isNotCopy}
          type={type}
        />

        {type !== 'separate' && <PreCoded codeblock={fileContent} />}
      </div>

      {type === 'separate' && (
        <div className='not-prose relative z-0 w-full rounded-lg dark:bg-[#080b11] overflow-hidden mt-5 p-0'>
          <PreCoded type={type} codeblock={fileContent}  classname='p-0' tabclassname="right-16 top-4" copyclass="right-5 top-4" />
        </div>
      )}
    </>
  );
}
