import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";

import { Separator } from "@radix-ui/react-separator";
import SpotlightCursor from "../cursor/common/SpotLightCursor";
import { useSpotLightCursorCode } from "@/constants/constant-hooks";

const SpotLightCursorExample = () => {
  const codeToDisplay = `
import { HTMLAttributes } from 'react';
import useSpotlightEffect from '@/hooks/use-spotlight';

// Define an interface for the spotlight configuration
interface SpotlightConfig {
  radius?: number;
  brightness?: number;
  color?: string;
  smoothing?: number;
}

// Combine props with potential HTML canvas attributes
interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

const SpotlightCursor = ({ 
  config = {}, 
  className, 
  ...rest 
}: SpotlightCursorProps) => {
  // Provide default configuration if not specified
  const spotlightConfig = {
    radius: 200,
    brightness: 0.15,
    color: '#ffffff',
    smoothing: 0.1,
    ...config
  };

  const canvasRef = useSpotlightEffect(spotlightConfig);

  return (
    <canvas
      ref={canvasRef}
      className={\`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full \${className}\`}
      {...rest}
    />
  );
};

export default SpotlightCursor;
  `;

  const multiUsage = `
  // Without any configuration (uses defaults)
<SpotlightCursor />

// With partial configuration
<SpotlightCursor 
  config={{
    radius: 250,
    brightness: 0.2
  }} 
/>

// With full configuration
<SpotlightCursor 
  config={{
    radius: 300,
    brightness: 0.25,
    color: '#f0f0f0',
    smoothing: 0.15
  }} 
/>`

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
            <Separator className="my-4" />

          <CodeExample
            title="SpotLight Cursor With Different Props"
            code={multiUsage}
            fileName="./example.tsx"
            badgeText="TSX"
          />

         
        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default SpotLightCursorExample;
