
import docs from '@/configs/docs.json';

import ComponentPreview from './component-preview';
import { extractCodeFromFilePath } from '@/lib/code';
import React from 'react';
import { Code, Eye } from 'lucide-react';
import { PreCoded } from './pre-coded';

type ComponentCodePreview = {
  component: React.ReactElement<any>;
  hasReTrigger?: boolean;
  name: string;
  children: React.ReactNode; //
  responsive?: boolean;
  isTab?: boolean;
  isFitheight?: boolean;
  isNotCopy?: boolean;
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
    <div
      className='not-prose relative z-0 md:grid grid-cols-2  pb-3 border
    w-full rounded-lg dark:bg-[#080b11] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] overflow-hidden
    '
    >
      <ComponentPreview
        hasReTrigger={hasReTrigger}
        component={currComponent}
        code={fileContent}
        responsive={responsive}
        isNotCopy={isNotCopy}
      />

      <PreCoded codeblock={fileContent} />
    </div>
  );
}
