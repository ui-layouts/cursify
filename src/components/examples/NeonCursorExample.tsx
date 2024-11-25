import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Import custom components
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from '../common/SEO';
import NeonCursor from "../cursor/neoncursor/NeonCursor";


const NeonCursorExample = () => {
     const codeToDisplay = `import { useEffect, useState } from 'react';
  
export default function NeonCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        left: mousePosition.x,
        top: mousePosition.y,
        width: '10px',
        height: '10px',
        backgroundColor: 'blue',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}`;

     const codeToDisplayCSS = `
/* Neon Cursor Custom Styling */
.neon-cursor {
  position: absolute;
  width: 12px;
  height: 12px;
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
  transition: transform 0.1s ease;
  pointer-events: none;
}
`;

     return (
          <DocumentLayout
               title="Neon Cursor"
               description="Interactive Neon cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'neon cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Neon Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement with a neon glow effect."
               >
                    <LivePreviewCard>
                         <NeonCursor />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Neon Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for Neon Cursor Component */}
                         <CodeExample
                              title="Neon Cursor Component"
                              code={codeToDisplay}
                              fileName="./NeonCursorExample.tsx"
                              badgeText="TSX"
                         />

                         {/* Separator */}
                         <Separator className="my-4" />

                         {/* Code Example for Neon Cursor Custom Styling */}
                         <CodeExample
                              title="Neon Cursor Custom Styling"
                              code={codeToDisplayCSS}
                              fileName="./neoncursor.css"
                              badgeText="CSS"
                         />
                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default NeonCursorExample;
