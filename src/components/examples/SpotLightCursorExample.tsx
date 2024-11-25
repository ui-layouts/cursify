import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from "../common/SEO";

import { Separator } from "@radix-ui/react-separator";
import SpotlightCursor from "../cursor/common/SpotLightCursor";
import { useSpotLightCursorCode } from "@/constants/constant-hooks";

const SpotLightCursorExample = () => {
  const codeToDisplay = `
import useSpotlightEffect from '@/hooks/use-spotlight';
import React from 'react';

const SpotlightCursor = ({ config }) => {
  const canvasRef = useSpotlightEffect(config);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default SpotlightCursor;
  `;

  

  return (
    <DocumentLayout
      title="SpotLight Cursor"
      description="Interactive spotlight cursor tracking component"
      keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'spotlight cursor']}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="SpotLight Cursor Component"
        description="A React component that simulates a spotlight effect following the cursor's movement."
      >
        <LivePreviewCard>
          <SpotlightCursor />
        </LivePreviewCard>
      </ComponentCard>

      {/* Implementation Section */}
      <ComponentCard
        title="Component Implementation"
        description="Detailed code breakdown of the SpotLight Cursor component."
      >
        <div className="space-y-4">
        <CodeExample
            title="Create useSpotlight.ts Hook"
            code={useSpotLightCursorCode}
            fileName="./use-Spotlight.ts"
            badgeText="TS"
          />
            <Separator className="my-4" />

          <CodeExample
            title="SpotLight Cursor Component"
            code={codeToDisplay}
            fileName="./SpotLightCursorExample.tsx"
            badgeText="TSX"
          />

         
        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default SpotLightCursorExample;
