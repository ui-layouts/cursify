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
import { callout, wordWrap, mark, lineNumbers } from '../constant';
import { CopyNpmCommandButton } from './copy-npm-button';

export async function PreCode({
  codeblock,
  classname,
  cssclass,
  metahide,
}: {
  codeblock: {
    value: string;
    lang: string;
    meta: string;
  };
  classname?: string;
  cssclass?: string;
  metahide?: boolean;
}) {
  const checkNpm = codeblock.value?.startsWith('npm');

  if (codeblock.lang !== 'tsx') {
    const tshighlighted = await highlight(codeblock, 'github-from-css');
    return (
      <div className={cn('relative z-[2]', cssclass)}>
        {tshighlighted.meta && (
          <div className='text-left text-sm px-2 py-1 mt-3 border-dotted rounded-md bg-primary-foreground w-fit'>
            {tshighlighted.meta}
          </div>
        )}
        <div className='relative'>
          {checkNpm ? (
            <>
              <CopyNpmCommandButton
                code={tshighlighted.code}
                classname='top-3.5'
              />
            </>
          ) : (
            <>
              <CopyButton code={tshighlighted.code} classname='top-3.5' />
            </>
          )}
          <div className='not-prose p-4 max-h-[550px] overflow-x-hidden   rounded-md text-sm  bg-codebg   border'>
            <Pre
              code={tshighlighted}
              handlers={[callout, wordWrap, mark, lineNumbers]}
              className={cn('m-0', classname)}
            />
          </div>
        </div>
      </div>
    );
  }
  const result = ts.transpileModule(codeblock.value, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      jsx: ts.JsxEmit.Preserve,
      removeComments: true,
    },
  });

  const javascript = await prettier.format(result.outputText.replace(/"use strict";\s*/, ''), {
    parser: 'babel',
    semi: true,
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 80,
  });

  // Keep long snippets copyable without serializing a node for every token.
  const compact = codeblock.meta === 'compact';
  const variants = [
    { value: 'typescript', label: 'Ts', language: 'TypeScript', source: codeblock },
    { value: 'javascript', label: 'Js', language: 'JavaScript', source: { ...codeblock, value: javascript, lang: 'js' } },
  ];
  const highlighted = compact
    ? []
    : await Promise.all(variants.map(({ source }) => highlight(source, 'github-from-css')));

  return (
    <div className='relative z-[2]'>
      {!metahide && !compact && codeblock.meta && (
        <div className='text-left text-sm px-2 py-1 mt-3 border-dotted rounded-md bg-primary-foreground w-fit'>
          {codeblock.meta}
        </div>
      )}

      <Tabs defaultValue='typescript' className='relative'>
        <TabsList className='absolute right-14 top-2 z-[1] h-9 p-0.5 border dark:border-background'>
          {variants.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className='h-8'>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {variants.map(({ value, language, source }, index) => {
          const code = highlighted[index];
          return (
            <TabsContent key={value} value={value}>
              <div className='relative'>
                <CopyButton code={code?.code ?? source.value} classname='right-2' />
                <div className='not-prose p-4 max-h-[550px] overflow-x-hidden rounded-md text-sm bg-codebg border'>
                  {code ? (
                    <Pre
                      code={code}
                      handlers={[callout, wordWrap, mark, lineNumbers]}
                      className={cn('m-0', classname)}
                    />
                  ) : (
                    <pre
                      tabIndex={0}
                      aria-label={`Source code (${language})`}
                      className={cn('m-0 max-h-[480px] overflow-auto pt-8 text-foreground', classname)}
                    >
                      <code>{source.value}</code>
                    </pre>
                  )}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
