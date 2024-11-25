import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import { CharacterCursor } from "../cursor/common/CharacterCursor";
import BreadcrumbMaker from "../common/Breadcrumb";

const CharacterCursorExample = () => {
     const codeToDisplay = `
// CharacterCursor.tsx
import React, { useEffect, useRef } from 'react';

interface CharacterCursorProps {
     characters: string[];
     colors: string[];
     font?: string;
}

export const CharacterCursor: React.FC<CharacterCursorProps> = ({
     characters,
     colors,
     font = '20px Arial',
}) => {
     // Implementation details here...
};
`;

     const codeToDisplayHook = `
// useMouse.ts
import { useState, useEffect } from 'react';

export const useMouse = () => {
     const [position, setPosition] = useState({ x: 0, y: 0 });

     useEffect(() => {
          const updateMousePosition = (event: MouseEvent) => {
               setPosition({ x: event.clientX, y: event.clientY });
          };

          window.addEventListener('mousemove', updateMousePosition);

          return () => {
               window.removeEventListener('mousemove', updateMousePosition);
          };
     }, []);

     return position;
};
`;

     return (
          <DocumentLayout
               title="Character Cursor"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Demo Component Card */}
               <ComponentCard
                    title="Character Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement using custom characters and colors."
               >
                    <LivePreviewCard className="">
                         <div className="min-h-screen w-full">
                              <CharacterCursor
                                   characters={['🌟', '✨', '💫', '🌠', '⭐']}
                                   colors={['#FFD700', '#FFA500', '#FF4500', '#8A2BE2', '#4B0082']}
                                   font="20px Arial"
                              />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Card */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Character Cursor component and custom hook."
               >
                    <div className="space-y-4">
                         {/* Code Example: Character Cursor */}
                         <CodeExample
                              title="Character Cursor Component"
                              code={codeToDisplay}
                              fileName="./CharacterCursor.tsx"
                         />

                         <Separator className="my-4" />

                         {/* Code Example: Custom Hook */}
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

export default CharacterCursorExample;
