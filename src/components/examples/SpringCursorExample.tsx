import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from "../common/SEO";
import { SpringyCursor } from "../cursor/common/SpringyCursor";
import { Separator } from "../ui/separator";

const SpringCursorExample = () => {
  const codeToDisplay = `
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SpringyCursor = ({ emoji }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: mousePosition.x,
        top: mousePosition.y,
        width: '50px',
        height: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '50%',
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {emoji}
    </motion.div>
  );
};

export default SpringyCursor;
  `;

  const codeToDisplayHook = `
import { useState, useEffect } from 'react';

const useMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

export default useMouse;
  `;

  return (
    <DocumentLayout
      title="Spring Cursor"
      description="Interactive springy cursor tracking component"
      keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'spring cursor']}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="Spring Cursor Component"
        description="An interactive React component that tracks and visualizes cursor movement with spring animation."
      >
        <LivePreviewCard>
          <SpringyCursor emoji="🌟" />
        </LivePreviewCard>
      </ComponentCard>

      {/* Implementation Section */}
      <ComponentCard
        title="Component Implementation"
        description="Detailed code breakdown of the Spring Cursor component."
      >
        <div className="space-y-4">
          {/* Code Example for Spring Cursor Component */}
          <CodeExample
            title="Spring Cursor Component"
            code={codeToDisplay}
            fileName="./SpringCursorExample.tsx"
            badgeText="TSX"
          />

          {/* Separator */}
          <Separator className="my-4" />

          {/* Code Example for Hook */}
          <CodeExample
            title="useMouse Hook"
            code={codeToDisplayHook}
            fileName="./use-mouse.ts"
            badgeText="TS"
          />
        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default SpringCursorExample;
