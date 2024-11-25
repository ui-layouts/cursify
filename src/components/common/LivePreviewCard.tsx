import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Preview from "@/pages/document/components/Preview";

interface LivePreviewCardProps {
     children: ReactNode;
     className?: string;
}

export function LivePreviewCard({ children, className }: LivePreviewCardProps) {
     return (
          <div>
               <Separator className="my-4" />
               <Preview
                    title="Live Preview"
                    className={cn(" border rounded-lg", className)}
               >
                    {children}
               </Preview>
          </div>
     );
}