import { Pre, highlight } from 'codehike/code';
import prettier from 'prettier';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/website/ui/tabs';
import { CopyButton } from './copy-button';
import { cn } from 'clswind';
import ts from 'typescript';
import { callout, lineNumbers, wordWrap } from '../constant';

export async function PreCoded({
  codeblock,
  classname,
  tabclassname,
  copyclass,
  type,
}: {
  codeblock: string;
  classname?: string;
  tabclassname?: string;
  copyclass?: string;
  type?: string;
}) {
  const result = ts.transpileModule(codeblock, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      jsx: ts.JsxEmit.Preserve,
      removeComments: true,
    },
  });

  let jsCode = result.outputText.replace(/"use strict";\s*/, '');

  // Format JavaScript code using Prettier
  const formattedJsCode = await prettier.format(jsCode, {
    parser: 'babel',
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 80,
    jsxBracketSameLine: true, // Keep JSX tags in one line
  });

  const tsCode = {
    value: codeblock,
    lang: 'tsx',
    meta: '',
  };

  const jsCodeblock = {
    value: formattedJsCode,
    lang: 'js',
    meta: '',
  };

  const [typescript, javascript] = await Promise.all([
    highlight(tsCode, 'github-from-css'),
    highlight(jsCodeblock, 'github-from-css'),
  ]);
  const variants = [
    { id: 'typescript', label: 'TS', code: typescript, raw: codeblock },
    { id: 'javascript', label: 'JS', code: javascript, raw: formattedJsCode },
  ];

  return (
    <Tabs defaultValue='typescript' className='relative min-w-0'>
      <TabsList
        aria-label='Source language'
        className={cn(
          'absolute top-2 right-12 z-[1] h-8 gap-0.5 p-0.5',
          tabclassname,
        )}
      >
        {variants.map(({ id, label }) => (
          <TabsTrigger key={id} value={id} className='h-7 px-2 py-0 text-xs'>
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {variants.map(({ id, code, raw }) => (
        <TabsContent key={id} value={id} className='relative mt-0 min-w-0'>
          <CopyButton code={raw} classname={copyclass} />
          <div className='min-w-0 rounded-lg border bg-neutral-50 pt-12'>
            <div
              tabIndex={0}
              aria-label={id + ' source'}
              className='max-h-[min(50dvh,500px)] overflow-auto p-2 text-sm'
            >
              <Pre
                code={code}
                handlers={[callout, wordWrap, lineNumbers]}
                className={cn('m-0', classname)}
              />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
