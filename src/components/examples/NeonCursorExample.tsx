
import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import SEO from '../common/SEO';
import { AdvancedCodeBlock } from '@/pages/document/components/AdvanceCodeBlock';
import Preview from '@/pages/document/components/Preview';
import NeonCursor from "../cursor/NeonCursor/NeonCursor";
import CommandCode from "../ui/CommandCode";

const NeonCursorExample = () => {
     const codeToDisplay = `import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Attach your neoncursor.css file in your project. 
// If you are using React, you can import the CSS directly into your index.css or another relevant CSS file. 
// For Next.js, add the neoncursor.css styles to your global CSS file (e.g., globals.css).


const NeonCursor = () => {
     const [position, setPosition] = useState  ({ x: 0, y: 0, scale: 1, opacity: 1 });
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

     const CSScodeToDisplay = `
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
}`;

     return (
          
          <div className="container mx-auto px-4 py-8 space-y-6">
               <SEO
                    title="Neon Cursor"
                    description="Interactive cursor tracking component"
                    keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
               />


               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle className="text-2xl">Neon Cursor Component</CardTitle>
                         <CardDescription>
                              
                         </CardDescription>
                    </CardHeader>
                    <CardContent>

                         <Separator className="my-4" />
                         <Preview
                              title="Live Preview"
                              className=" border"
                         >
                              <NeonCursor />
                         </Preview>
                    </CardContent>
               </Card>

               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle>Component Implementation</CardTitle>
                         <CardDescription>
                              Detailed code breakdown of the Follow Cursor component
                              <CommandCode>npm install framer-motion</CommandCode>
                         </CardDescription>

                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                              <div>
                                   <h4 className="text-lg font-semibold mb-2">
                                        Neon Cursor Component
                                        <Badge variant="secondary" className="ml-2">TSX</Badge>
                                   </h4>
                                   <AdvancedCodeBlock
                                        code={codeToDisplay}
                                        fileName="./NeonCursorExample.tsx"
                                        lang="typescript"
                                   />
                              </div>

                              <Separator className="my-4" />

                              <div>
                                   <h4 className="text-lg font-semibold mb-2">
                                        /neoncursor.css
                                        <Badge variant="secondary" className="ml-2">css</Badge>
                                   </h4>
                                   <AdvancedCodeBlock
                                        code={CSScodeToDisplay}
                                        fileName="./neoncursor.css"
                                        lang="css"
                                   />
                              </div>
                         </div>
                    </CardContent>
               </Card>
          </div>
     );
};

export default NeonCursorExample;