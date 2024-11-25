import { AdvancedCodeBlock } from "@/pages/document/components/AdvanceCodeBlock";
import { Badge } from "@/components/ui/badge";

interface CodeExampleProps {
  title: string;
  code: string;
  fileName: string;
  language?: string;
  badgeText?: string;
}

export function CodeExample({
  title,
  code,
  fileName,
  language = "typescript",
  badgeText = "TSX"
}: CodeExampleProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {title}
        </h4>
        <Badge variant="secondary" className="font-medium">
          {badgeText}
        </Badge>
      </div>
      <AdvancedCodeBlock
        code={code}
        fileName={fileName}
        lang={language}
      />
    </div>
  );
}