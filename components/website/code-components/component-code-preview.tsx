// import { TabsProvider, TabsBtn, TabsContent } from './tabs';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import docs from '@/configs/docs.json';

import ComponentPreview from './component-preview';
import { extractCodeFromFilePath } from '@/lib/code';
import React from 'react';
import { Code, Eye } from 'lucide-react';
import { PreCoded } from './pre-coded';

type ComponentCodePreview = {
  component: React.ReactElement;
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

      {<PreCoded codeblock={fileContent} />}
      {/* <Tabs
        defaultValue={`${name}preview`}
        className='relative mt-1 w-full border-2 rounded-lg'
      >
        <TabsList className='absolute left-0 pl-1 top-0 z-10 flex h-12 w-full justify-start rounded-b-none rounded-t-lg border-b-2 border-t-0 border-x-0  bg-border/40 backdrop-blur-lg dark:bg-gray-900'>
          <TabsTrigger
            value={`${name}preview`}
            className='flex gap-2 items-center data-[state=active]:bg-white data-[state=active]:border-b-2 '
          >
            <Eye className='w-5 h-5' /> Preview
          </TabsTrigger>
          <TabsTrigger
            value={`${name}code`}
            className='flex gap-2 items-center data-[state=active]:bg-white data-[state=active]:border-b-2'
          >
            <Code className='w-5 h-5' /> Code
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className='mt-0  px-0 pb-0 pt-12 ring-offset-background '
          value={`${name}preview`}
        >
          <ComponentPreview
            hasReTrigger={hasReTrigger}
            component={currComponent}
            code={fileContent}
            responsive={responsive}
            isNotCopy={isNotCopy}
            isFitheight={isFitheight}
          />
        </TabsContent>
        <TabsContent className='mt-11  ' value={`${name}code`}>
         
        </TabsContent>
      </Tabs> */}
    </div>
  );
}
