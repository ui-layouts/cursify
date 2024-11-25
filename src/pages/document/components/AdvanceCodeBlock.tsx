import React from 'react';
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import type { BundledLanguage, BundledTheme } from "shiki";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
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
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success('Code copied to clipboard', {
      duration: 2000,
    });
    
    const timer = setTimeout(() => setIsCopied(false), 2000);
    return () => clearTimeout(timer);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className="h-8 w-8 hover:bg-muted transition-colors"
    >
      {isCopied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
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
        "relative w-full bg-card border rounded-lg shadow-sm",
        className
      )}
      {...props}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 pb-0">
        <span className="text-sm font-medium text-muted-foreground">
          {fileName ?? ""}
        </span>
        <CopyButton code={code} />
      </CardHeader>
      <CardContent className="p-0 pt-3">
        <div className="relative overflow-hidden rounded-b-lg">
          <pre className="overflow-x-auto">
            <ShikiCode code={code} lang={lang} theme={theme} />
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};