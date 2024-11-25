import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from '../common/SEO';
import { SnowflakeCursor } from "../cursor/common/SnowflakeCursor";

const SnowflakeCursorExample = () => {
  const codeToDisplay = `
import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation, useSpring } from 'framer-motion';

export default function SnowflakeCursor() {
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
        width: '30px',
        height: '30px',
        backgroundColor: '#00f',  // Example color for the snowflake
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  );
}
  `;

  const codeToDisplayCSS = `
/* Snowflake Cursor Custom Styling */
.snowflake-cursor {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #00f;  // Example color for the snowflake
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: snowflake-animation 1s infinite;
}

@keyframes snowflake-animation {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
  `;

  return (
    <DocumentLayout
      title="Snowflake Cursor"
      description="Interactive snowflake cursor tracking component"
      keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'snowflake cursor']}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="Snowflake Cursor Component"
        description="An interactive React component that tracks the mouse and creates a snowflake effect on movement."
      >
        <LivePreviewCard>
          <SnowflakeCursor />
        </LivePreviewCard>
      </ComponentCard>

      {/* Implementation Section */}
      <ComponentCard
        title="Component Implementation"
        description="Detailed code breakdown of the Snowflake Cursor component."
      >
        <div className="space-y-4">
          {/* Code Example for Snowflake Cursor Component */}
          <CodeExample
            title="Snowflake Cursor Component"
            code={codeToDisplay}
            fileName="./SnowflakeCursorExample.tsx"
            badgeText="TSX"
          />

          {/* Separator */}
          <Separator className="my-4" />

          {/* Code Example for Snowflake Cursor Custom Styling */}
          <CodeExample
            title="Snowflake Cursor Custom Styling"
            code={codeToDisplayCSS}
            fileName="./SnowflakeCursor.css"
            badgeText="CSS"
          />
        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default SnowflakeCursorExample;
