import React from 'react';
import { type BundledLanguage, type BundledTheme, codeToHtml } from "shiki";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ShikiProps = {
     code: string;
     lang: BundledLanguage;
     theme: BundledTheme;
     className?: string;
};

export default function ShikiCode({
     code,
     lang,
     theme,
     className,
     ...props
}: Readonly<ShikiProps> & HTMLAttributes<HTMLDivElement>) {
     const [html, setHtml] = React.useState('');

     React.useEffect(() => {
          const fetchHtml = async () => {
               const generatedHtml = await codeToHtml(code, {
                    lang,
                    theme,
               });
               setHtml(generatedHtml);
          };

          fetchHtml();
     }, [code, lang, theme]);

     return (
          <div
               className={cn(
                    "text-sm hue-rotate-0 invert-0 *:bg-transparent dark:hue-rotate-180 dark:invert p-4",
                    className,
               )}
               {...props}
               // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
               dangerouslySetInnerHTML={{ __html: html }}
          />
     );
}