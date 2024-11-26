import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import NeonCursor from "../cursor/neoncursor/NeonCursor";
import CommandCode from "../ui/CommandCode";


const NeonCursorExample = () => {
     const codeToDisplay = `import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './NeonCursor.css'
// Attach your \`neoncursor.css\` file in your project. 
// If you are using React, you can import the CSS directly into your \`index.css\` or another relevant CSS file. 
// For Next.js, add the \`neoncursor.css\` styles to your global CSS file (e.g., \`globals.css\`).


const NeonCursor = () => {
     const [position, setPosition] = useState({ x: 0, y: 0, scale: 1, opacity: 1 });
     const [isClicking, setIsClicking] = useState(false);
     const [isHovering, setIsHovering] = useState(false);
     const trailControls = useAnimation();
     const glowControls = useAnimation();

     const handleMouseMove = useCallback((e) => {
          setPosition(prev => ({
               ...prev,
               x: e.clientX,
               y: e.clientY,
          }));
     }, []);

     const handleMouseDown = () => setIsClicking(true);
     const handleMouseUp = () => setIsClicking(false);

     const handleMouseOver = useCallback((e) => {
          const target = e.target;
          if (target.matches('a, button, input, [data-hover="true"]')) {
               setIsHovering(true);
               void trailControls.start({
                    scale: 1.5,
                    borderColor: 'rgb(255, 150, 50)',
                    borderWidth: '3px',
               });
               void glowControls.start({
                    scale: 2,
                    opacity: 0.8,
               });
          }
     }, [trailControls, glowControls]);

     const handleMouseOut = useCallback(() => {
          setIsHovering(false);
          void trailControls.start({
               scale: 1,
               borderColor: 'rgb(236, 101, 23)',
               borderWidth: '2px',
          });
          void glowControls.start({
               scale: 1,
               opacity: 0.4,
          });
     }, [trailControls, glowControls]);

     useEffect(() => {
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mousedown', handleMouseDown);
          window.addEventListener('mouseup', handleMouseUp);
          window.addEventListener('mouseover', handleMouseOver);
          window.addEventListener('mouseout', handleMouseOut);

          return () => {
               window.removeEventListener('mousemove', handleMouseMove);
               window.removeEventListener('mousedown', handleMouseDown);
               window.removeEventListener('mouseup', handleMouseUp);
               window.removeEventListener('mouseover', handleMouseOver);
               window.removeEventListener('mouseout', handleMouseOut);
          };
     }, [handleMouseMove, handleMouseOver, handleMouseOut]);

     return (
          <div className="neon-cursor-container">
               {/* Main cursor dot */}
               <motion.div
                    className="cursor-main"
                    animate={{
                         x: position.x - 10,
                         y: position.y - 10,
                         scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
                    }}
                    transition={{
                         type: 'spring',
                         damping: 20,
                         stiffness: 400,
                         mass: 0.5,
                    }}
               />

               {/* Trailing circle */}
               <motion.div
                    className="cursor-trail"
                    animate={{
                         x: position.x - 20,
                         y: position.y - 20,
                    }}
                    transition={{
                         type: 'spring',
                         damping: 30,
                         stiffness: 200,
                         mass: 0.8,
                    }}
                    initial={false}
               />

               {/* Outer glow */}
               <motion.div
                    className="cursor-glow"
                    animate={{
                         x: position.x - 30,
                         y: position.y - 30,
                    }}
                    transition={{
                         type: 'spring',
                         damping: 40,
                         stiffness: 150,
                         mass: 1,
                    }}
                    initial={false}
               />
          </div>
     );
};

export default NeonCursor;

`;

     const codeToDisplayCSS = `

     .neon-cursor-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
        }
        
        .cursor-main {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgb(236, 101, 23);
          mix-blend-mode: screen;
          pointer-events: none;
        }
        
        .cursor-trail {
          position: fixed;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid rgb(236, 101, 23);
          mix-blend-mode: screen;
          pointer-events: none;
        }
        
        .cursor-glow {
          position: fixed;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236, 101, 23, 0.4) 0%, transparent 70%);
          mix-blend-mode: screen;
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
                    description="A dynamic React component that highlights cursor movement with a vibrant neon glow."
               >
                    <LivePreviewCard>
                         <NeonCursor />
                    </LivePreviewCard>
               </ComponentCard>

               <ComponentCard
                    title="Installation"
                    description="Install dependencies"
               >
                    <CommandCode >npm i framer-motion</CommandCode>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Neon Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for Neon Cursor Component */}
                         <CodeExample
                              title="Create NeonCursor.tsx Component"
                              code={codeToDisplay}
                              fileName="./NeonCursor.tsx"
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
