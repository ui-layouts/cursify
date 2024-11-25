import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from "../common/SEO";

import { Separator } from "@radix-ui/react-separator";
import SpotlightCursor from "../cursor/common/SpotLightCursor";

const SpotLightCursorExample = () => {
  const codeToDisplay = `
  `;

  const codeToDisplayHook = `
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
        description="An interactive React component that tracks and visualizes cursor movement."
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
          {/* Code Example for Spotlight Cursor Component */}
          <CodeExample
            title="SpotLight Cursor Component"
            code={codeToDisplay}
            fileName="./SpotLightCursorExample.tsx"
            badgeText="TSX"
          />

          {/* Separator */}
          <Separator className="my-4" />

          {/* Code Example for Hook */}
          <CodeExample
            title="useSpotlight Hook"
            code={codeToDisplayHook}
            fileName="./use-Spotlight.ts"
            badgeText="TS"
          />
        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default SpotLightCursorExample;
