import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from "../common/SEO";
import ThreeDCursor from "../cursor/common/ThreeDCursor";
import { Separator } from "../ui/separator";

const ThreeDCursorExample = () => {
     const codeToDisplay = `
import React from 'react';
import ThreeDCursor from './ThreeDCursor';

const ExampleComponent = () => {
  return (
    <div>
      <ThreeDCursor />
    </div>
  );
};

export default ExampleComponent;
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
               title="ThreeD Cursor"
               description="Interactive ThreeD cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', '3d cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="ThreeD Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement in 3D space."
               >
                    <LivePreviewCard>
                         <ThreeDCursor />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the ThreeD Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for ThreeD Cursor Component */}
                         <CodeExample
                              title="ThreeD Cursor Component"
                              code={codeToDisplay}
                              fileName="./ThreeDCursorExample.tsx"
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

export default ThreeDCursorExample;
