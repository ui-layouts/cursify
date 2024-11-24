import React from 'react';
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import type { BundledLanguage, BundledTheme } from "shiki";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import ShikiCode from "./CodeHighlighter";

type AdvancedBlockProps = {
  code: string;
  fileName?: string;
  lang?: BundledLanguage;
  theme?: BundledTheme;
  className?: string;
};

 const CopyButton = ({ code }: { code: string }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard', {
      duration: 2000,
      className: 'border-green-500',
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-8 w-8 hover:bg-muted"
    >
      <Copy className="h-4 w-4" />
    </Button>
  );
};

export const AdvancedCodeBlock = ({
  code,
  fileName,
  lang = "typescript",
  theme = "github-light",
  className,
  ...props
}: AdvancedBlockProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card
      className={cn(
        "relative w-full bg-card border shadow-sm",
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <span className="text-sm font-medium text-muted-foreground">
          {fileName ?? ""}
        </span>
        <CopyButton code={code} />
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-b-lg border-t">
          <pre className="overflow-x-auto p-4 text-sm">
            <ShikiCode code={code} lang={lang} theme={theme} />
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};
