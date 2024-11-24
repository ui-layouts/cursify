import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PreviewProps {
     children: ReactNode;
     className?: string;
     title?: string;
     variant?: 'default' | 'demo';
}

const Preview: React.FC<PreviewProps> = ({
     children,
     className,
     title,
     variant = 'default'
}) => {
     if (variant === 'demo') {
          return (
               <div className={cn(
                    "flex min-h-[450px] w-full items-center justify-center p-6 relative",
                    "rounded-lg border border-neutral-200 bg-white text-slate-900 shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:text-slate-50 ",
                    className
               )}>
                    {title && (
                         <div className="absolute left-5 top-4 text-sm font-medium text-muted-foreground">
                              {title}
                         </div>
                    )}
                    <div className="w-full flex items-center justify-center p-10 rounded-lg">
                         {children}
                    </div>
               </div>
          );
     }

     return (
          <Card className={cn(
               "w-full max-w-6xl mx-auto",
               "min-h-[250px]",
               "relative overflow-hidden",
               className
          )}>
               {title && (
                    <CardHeader>
                         <CardTitle className="text-sm font-medium text-muted-foreground">
                              {title}
                         </CardTitle>
                    </CardHeader>
               )}
               <CardContent className="flex items-center justify-center p-6">
                    {children}
               </CardContent>
          </Card>
     );
};


export default Preview;