import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import CommandCode from "@/components/ui/CommandCode";
import FluidCursor from "../cursor/common/FluidCursor";

const FluidCursorExample = () => {
     // Code to be displayed in the documentation
     const codeToDisplay = `import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation, useSpring } from 'framer-motion';

const FluidCursor = () => {
    const controls = useAnimation();
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
            className="cursor"
            style={{
                position: "absolute",
                left: cursorPos.x,
                top: cursorPos.y,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 255, 0.5)",
                pointerEvents: "none",
            }}
            animate={controls}
        />
    );
};

export default FluidCursor;
`;

     return (
          <DocumentLayout
               title="Fluid Cursor"
               description="Interactive cursor tracking component"
               keywords={["react", "cursor", "interaction", "mouse tracking"]}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Fluid Cursor Component"
                    description="An interactive React component that tracks mouse movement and renders a fluid animation around the cursor."
               >
                    <LivePreviewCard>
                         <FluidCursor />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Fluid Cursor component."
               >
                    <div className="space-y-4">
                         {/* Installation Command */}
                         <div className="mb-4">
                              <CommandCode>npm install framer-motion</CommandCode>
                         </div>

                         {/* Code Example */}
                         <CodeExample
                              title="Fluid Cursor Component"
                              code={codeToDisplay}
                              fileName="./FluidCursorExample.tsx"
                              badgeText="TSX"
                         />
                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default FluidCursorExample;
