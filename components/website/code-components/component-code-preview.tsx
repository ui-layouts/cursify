// import { TabsProvider, TabsBtn, TabsContent } from './tabs';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';

import ComponentPreview from './component-preview';
import { extractCodeFromFilePath } from '@/lib/code';
import React from 'react';
import { Code, Eye } from 'lucide-react';
import { PreCoded } from './pre-coded';
import { AllComponens } from '@/configs/docs';

type ComponentCodePreview = {
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
  componentSrc?: React.LazyExoticComponent<React.FC<{}>>;
  href?: string;
  id?: string;
  filePath?: string;
  comMessage?: string;
  isAlert?: string;
};

export default async function ComponentCodePreview({
  hasReTrigger,
  name,
  isTab = false,
  isNotCopy = false,
  isFitheight = false,
}: ComponentCodePreview) {
  const currComponent = AllComponens.find((component) => component.id === name);
  console.log(currComponent);

  if (!currComponent) {
    return <div>Component not found</div>;
  }

  const fileContent = extractCodeFromFilePath(`${currComponent?.filePath}`);
  // console.log('childer', children);

  // console.log(fileContent);

  return (
    <div className='not-prose relative z-0  pb-3'>
      {!isTab ? (
        <>
          <ComponentPreview
            hasReTrigger={hasReTrigger}
            component={currComponent}
            code={fileContent}
            isNotCopy={isNotCopy}
            isFitheight={isFitheight}
          />
          <PreCoded codeblock={fileContent} />
        </>
      ) : (
        <>
          <Tabs
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
                isNotCopy={isNotCopy}
                isFitheight={isFitheight}
              />
            </TabsContent>
            <TabsContent className='mt-8 p-4  ' value={`${name}code`}>
              <PreCoded codeblock={fileContent} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
