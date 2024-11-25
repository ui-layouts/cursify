import { Separator } from "@/components/ui/separator";

// Import custom components
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import { RainbowCursor } from "../cursor/common/RainbowCursor";

const RainbowCursorExample = () => {
  const codeToDisplay = ``;

  const codeToDisplayCSS = `
`;

  return (
    <DocumentLayout
      title="Rainbow Cursor"
      description="Interactive rainbow cursor tracking component"
      keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'rainbow cursor']}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="Rainbow Cursor Component"
        description="An interactive React component that tracks and visualizes cursor movement with a rainbow trail effect."
      >
        <LivePreviewCard>
          <RainbowCursor
            length={20}
            colors={["#FF0000", "#00FF00", "#0000FF"]}
            size={3}
            trailSpeed={0.4}
            colorCycleSpeed={0.002}
            blur={1}
            pulseSpeed={0.01}
            pulseMin={0.8}
            pulseMax={1.2}
          />
        </LivePreviewCard>
      </ComponentCard>

      {/* Implementation Section */}
      <ComponentCard
        title="Component Implementation"
        description="Detailed code breakdown of the Rainbow Cursor component."
      >
        <div className="space-y-4">
          {/* Code Example for Rainbow Cursor Component */}
          <CodeExample
            title="Rainbow Cursor Component"
            code={codeToDisplay}
            fileName="./RainbowCursorExample.tsx"
            badgeText="TSX"
          />

          {/* Separator */}
          <Separator className="my-4" />

          {/* Code Example for Rainbow Cursor Custom Styling */}
          <CodeExample
            title="Rainbow Cursor Custom Styling"
            code={codeToDisplayCSS}
            fileName="./Rainbowcursor.css"
            badgeText="CSS"
          />
        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default RainbowCursorExample;
