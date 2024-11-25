import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import TextIconCursor from "../cursor/common/TextIconCursor";
import { Separator } from "../ui/separator";

const TextIconCursorExample = () => {
     const codeToDisplay = `
import React from 'react';
import TextIconCursor from './TextIconCursor';

const ExampleComponent = () => {
  return (
    <div>
      <TextIconCursor />
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
               title="TextIcon Cursor"
               description="Interactive TextIcon cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'text icon cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="TextIcon Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement with a text icon."
               >
                    <LivePreviewCard>
                         <TextIconCursor />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the TextIcon Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for TextIcon Cursor Component */}
                         <CodeExample
                              title="TextIcon Cursor Component"
                              code={codeToDisplay}
                              fileName="./TextIconCursorExample.tsx"
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

export default TextIconCursorExample;
