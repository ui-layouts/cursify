import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import { FairyDustCursor } from "../cursor/common/FairyDustCursor";

const FairyDustCursorExample = () => {
     const codeToDisplay = `
// FairyDustCursor.tsx
import React from "react";

interface FairyDustCursorProps {
     colors?: string[];
     characterSet?: string[];
     particleSize?: number;
     particleCount?: number;
     gravity?: number;
     fadeSpeed?: number;
     initialVelocity?: { min: number; max: number };
}

export const FairyDustCursor: React.FC<FairyDustCursorProps> = ({
     colors = ['#FFD700', '#FFA500', '#FF4500'],
     characterSet = ['✨', '⭐', '🌟'],
     particleSize = 20,
     particleCount = 5,
     gravity = 0.015,
     fadeSpeed = 0.97,
     initialVelocity = { min: 1, max: 2 },
}) => {
     // Implementation details here...
};
`;

     const codeToDisplayHook = `
// useMouse.ts
import { useState, useEffect } from "react";

export const useMouse = () => {
     const [position, setPosition] = useState({ x: 0, y: 0 });

     useEffect(() => {
          const handleMouseMove = (event: MouseEvent) => {
               setPosition({ x: event.clientX, y: event.clientY });
          };

          window.addEventListener("mousemove", handleMouseMove);

          return () => {
               window.removeEventListener("mousemove", handleMouseMove);
          };
     }, []);

     return position;
};
`;

     return (
          <DocumentLayout
               title="FairyDust Cursor"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Demo Component */}
               <ComponentCard
                    title="FairyDust Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement using custom characters and colors."
               >
                    <LivePreviewCard>
                         <div className="min-h-screen w-full">
                              {/* Basic and Advanced Usage */}
                              <FairyDustCursor
                                   colors={["#FF0000", "#00FF00", "#0000FF"]}
                                   characterSet={["✨", "⭐", "🌟"]}
                                   particleSize={24}
                                   particleCount={2}
                                   gravity={0.015}
                                   fadeSpeed={0.97}
                                   initialVelocity={{ min: 0.7, max: 2.0 }}
                              />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Details */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the FairyDust Cursor component and custom hook."
               >
                    <div className="space-y-4">
                         {/* FairyDustCursor Code Example */}
                         <CodeExample
                              title="FairyDust Cursor Component"
                              code={codeToDisplay}
                              fileName="./FairyDustCursor.tsx"
                         />

                         <Separator className="my-4" />

                         {/* Custom Hook Code Example */}
                         <CodeExample
                              title="Custom Mouse Hook"
                              code={codeToDisplayHook}
                              fileName="./useMouse.ts"
                              badgeText="TS"
                         />
                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default FairyDustCursorExample;
