import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import './NeonCursor.css'
// Attach your `neoncursor.css` file in your project. 
// If you are using React, you can import the CSS directly into your `index.css` or another relevant CSS file. 
// For Next.js, add the `neoncursor.css` styles to your global CSS file (e.g., `globals.css`).


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

