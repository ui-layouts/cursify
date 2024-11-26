"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CommandCodeProps {
  children: string;
  className?: string;
}

const CommandCode = ({ children, className }: Readonly<CommandCodeProps>) => {
  const [_, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await copy(children);
      setIsCopied(true);
      toast.success("Command copied to clipboard", {
        className: "bg-secondary text-secondary-foreground"
      });

      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Failed to copy command");
    }
  };

  return (
    <Card className={cn(
      "relative group transition-all duration-200",
      "hover:shadow-md hover:shadow-muted",
      className
    )}>
      <CardContent className="p-0">
        <div className="relative flex items-center gap-4 p-4 bg-muted/40 rounded-md border border-muted transition-colors">
          <code className="flex-1 font-mono text-sm text-muted-foreground overflow-x-auto whitespace-pre">
            {children}
          </code>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopyCode}
            className={cn(
              "h-8 w-8 relative shrink-0",
              "hover:bg-secondary hover:text-secondary-foreground",
              "focus-visible:ring-1 focus-visible:ring-ring",
              "transition-colors"
            )}
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Subtle gradient borders using shadcn colors */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-border/0 via-border/50 to-border/0" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-border/0 via-border/50 to-border/0" />
      </CardContent>
    </Card>
  );
}

export default CommandCode;