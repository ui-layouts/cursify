// import React, { useState } from 'react';
// import { useMouse } from '@/hooks/use-mouse';


// const ClickEffectCursor = () => {
//   const [mouseState, ref] = useMouse();
//   const [clicks, setClicks] = useState([]);

//   const handleClick = () => {
//     if (mouseState.x && mouseState.y) {
//       const newClick = {
//         x: mouseState.x,
//         y: mouseState.y,
//         id: Date.now(),
//       };
//       setClicks(prev => [...prev, newClick]);
//       setTimeout(() => {
//         setClicks(prev => prev.filter(click => click.id !== newClick.id));
//       }, 1000);
//     }
//   };

//   return (
//     <div 
//       className="relative w-full h-screen bg-gray-900 cursor-none" 
//       ref={ref}
//       onClick={handleClick}
//     >
//       {/* Main cursor */}
//       {mouseState.x !== null && mouseState.y !== null && (
//         <div
//           className="fixed pointer-events-none z-50"
//           style={{
//             left: mouseState.x,
//             top: mouseState.y,
//             transform: 'translate(-50%, -50%)',
//           }}
//         >
//           <div className="w-6 h-6 bg-pink-500 rounded-full mix-blend-screen" />
//         </div>
//       )}

//       {/* Click effects */}
//       {clicks.map(click => (
//         <React.Fragment key={click.id}>
//           {/* Ripple effect */}
//           <div
//             className="fixed pointer-events-none animate-ping"
//             style={{
//               left: click.x,
//               top: click.y,
//               transform: 'translate(-50%, -50%)',
//             }}
//           >
//             <div className="w-12 h-12 border-2 border-pink-400 rounded-full" />
//           </div>

//           {/* Particle explosion */}
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={i}
//               className="fixed pointer-events-none w-2 h-2 bg-pink-400 rounded-full"
//               style={{
//                 left: click.x,
//                 top: click.y,
//                 transform: 'translate(-50%, -50%)',
//                 animation: 'particle 0.5s ease-out forwards',
//                 animationDelay: `${i * 0.05}s`,
//               }}
//             />
//           ))}
//         </React.Fragment>
//       ))}

//       <style jsx>{`
//         @keyframes particle {
//           0% {
//             transform: translate(-50%, -50%) scale(1);
//             opacity: 1;
//           }
//           100% {
//             transform: translate(
//               ${(x) => Math.cos(x * Math.PI / 4) * 50}px,
//               ${(x) => Math.sin(x * Math.PI / 4) * 50}px
//             ) scale(0);
//             opacity: 0;
//           }
//         }
//       `}</style>

//       <div className="flex items-center justify-center h-full text-white text-xl">
//         Click anywhere to see the effect
//       </div>
//     </div>
//   );
// };

// export default ClickEffectCursor;
"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMouse } from '@/hooks/use-mouse';

const ClickEffectCursor = () => {
  const [mouseState, ref] = useMouse();
  const [clicks, setClicks] = useState([]);

  const handleClick = () => {
    if (mouseState.x && mouseState.y) {
      const newClick = {
        x: mouseState.x,
        y: mouseState.y,
        id: Date.now(),
      };
      setClicks(prev => [...prev, newClick]);
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== newClick.id));
      }, 1000);
    }
  };

  return (
    <div 
      className="relative w-full h-screen bg-gray-900 cursor-none" 
      ref={ref}
      onClick={handleClick}
    >
      {/* Main cursor */}
      {mouseState.x !== null && mouseState.y !== null && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: mouseState.x,
            top: mouseState.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-6 h-6 bg-pink-500 rounded-full mix-blend-screen" />
        </div>
      )}

      {/* Click effects */}
      <AnimatePresence>
        {clicks.map(click => (
          <React.Fragment key={click.id}>
            {/* Ripple effect */}
            <motion.div
              className="fixed pointer-events-none"
              style={{
                left: click.x,
                top: click.y,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="w-12 h-12 border-2 border-pink-400 rounded-full" />
            </motion.div>

            {/* Particle explosion */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="fixed pointer-events-none w-2 h-2 bg-pink-400 rounded-full"
                style={{
                  left: click.x,
                  top: click.y,
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(i * Math.PI / 4) * 50,
                  y: Math.sin(i * Math.PI / 4) * 50,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            ))}
          </React.Fragment>
        ))}
      </AnimatePresence>

      <div className="flex items-center justify-center h-full text-white text-xl">
        Click anywhere to see the effect
      </div>
    </div>
  );
};

export default ClickEffectCursor;


