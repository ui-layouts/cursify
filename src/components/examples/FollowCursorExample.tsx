import React from 'react';

// Import UI components from shadcn/ui
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Import custom components
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from '../common/SEO';
import FollowCursor from "../cursor/common/FollowCursor";


const FollowCursorExample = () => {
  const codeToDisplay = `import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const FollowCursor = ({ color = "#ff5733" }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setCursorPos({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: cursorPos.x,
        top: cursorPos.y,
        width: "25px",
        height: "25px",
        backgroundColor: color,
        borderRadius: "50%",
        pointerEvents: "none",
      }}
    />
  );
};

export default FollowCursor;
`;

  const codeToDisplayHook = `// Example of a custom mouse hook implementation
import { useState, useEffect, useCallback } from 'react';

const useMouse = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setCursorPos({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return cursorPos;
};

export default useMouse;
`;

  return (
    <DocumentLayout
      title="Follow Cursor"
      description="Interactive cursor tracking component"
      keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="Follow Cursor Component"
        description="An interactive React component that tracks and visualizes cursor movement"
      >
        <LivePreviewCard>
          <FollowCursor color="#ff5733" />
        </LivePreviewCard>
      </ComponentCard>

      {/* Implementation Section */}
      <ComponentCard
        title="Component Implementation"
        description="Detailed code breakdown of the Follow Cursor component."
      >
        <div className="space-y-4">
          {/* Code Example for Follow Cursor */}
          <CodeExample
            title="Follow Cursor Component"
            code={codeToDisplay}
            fileName="./FollowCursorExample.tsx"
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

export default FollowCursorExample;
