import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Import custom components
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from '../common/SEO';
import GradientCursor from "../cursor/common/GradientCursor";

const GradientCursorExample = () => {
  const codeToDisplay = ``;

  const codeToDisplayHook = `
"use client";
import { useState, useEffect } from "react";

export function useMouse() {
  const [position, setPosition] = useState({ x: null, y: null });

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      setPosition({ x: event.pageX, y: event.pageY });
    };

    document.addEventListener("mousemove", updatePosition);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  return position;
}
`;

  return (
    <DocumentLayout
      title="Gradient Cursor"
      description="Interactive Gradient cursor tracking component"
      keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="Gradient Cursor Component"
        description="An interactive React component that tracks and visualizes cursor movement"
      >
        <LivePreviewCard>
          <GradientCursor />
        </LivePreviewCard>
      </ComponentCard>

      {/* Implementation Section */}
      <ComponentCard
        title="Component Implementation"
        description="Detailed code breakdown of the Gradient Cursor component."
      >
        <div className="space-y-4">
          {/* Code Example for Gradient Cursor */}
          <CodeExample
            title="Gradient Cursor Component"
            code={codeToDisplay}
            fileName="./GradientCursorExample.tsx"
            badgeText="TSX"
          />

          {/* Separator */}
          <Separator className="my-4" />

          {/* Code Example for Custom Mouse Hook */}
          <CodeExample
            title="Custom Mouse Hook"
            code={codeToDisplayHook}
            fileName="./use-mouse.ts"
            badgeText="TS"
          />
        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default GradientCursorExample;
