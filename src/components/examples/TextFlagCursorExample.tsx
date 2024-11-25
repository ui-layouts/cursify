import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from "../common/SEO";
import TextFlagCursor from "../cursor/common/TextFlagCursor";
import { Separator } from "../ui/separator";

const TextFlagCursorExample = () => {
     const codeToDisplay = `
import React from 'react';
import TextFlagCursor from './TextFlagCursor';

const ExampleComponent = () => {
  return (
    <div>
      <TextFlagCursor />
      {/* With options */}
      {/* <TextFlagCursor
        text="Hello World"
        color="#000000"
        font="monospace"
        textSize={12}
      /> */}

      {/* With container element */}
      {/* <div ref={containerRef}>
        <TextFlagCursor element={containerRef.current} />
      </div> */}
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
               title="TextFlag Cursor"
               description="Interactive text flag cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'text flag cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="TextFlag Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement as a text flag."
               >
                    <LivePreviewCard>
                         <TextFlagCursor />
                         {/* Example with options */}
                         {/* <TextFlagCursor
            text="Hello World"
            color="#000000"
            font="monospace"
            textSize={12}
          /> */}
                         {/* Example with container element */}
                         {/* <div ref={containerRef}>
            <TextFlagCursor element={containerRef.current} />
          </div> */}
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the TextFlag Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for TextFlag Cursor Component */}
                         <CodeExample
                              title="TextFlag Cursor Component"
                              code={codeToDisplay}
                              fileName="./TextFlagCursorExample.tsx"
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

export default TextFlagCursorExample;
