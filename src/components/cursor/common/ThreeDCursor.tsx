import React, { useState, useEffect } from 'react';
import { useMouse } from '@/hooks/use-mouse';

const ThreeDCursor = () => {
  const [mouseState, ref] = useMouse();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (mouseState.x && mouseState.y) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const rotateX = ((mouseState.y - centerY) / centerY) * 30;
      const rotateY = ((mouseState.x - centerX) / centerX) * 30;
      
      setRotation({ x: rotateX, y: rotateY });
    }
  }, [mouseState.x, mouseState.y]);

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden" ref={ref}>
      {mouseState.x !== null && mouseState.y !== null && (
        <div
          className="fixed pointer-events-none z-50 transition-transform duration-100"
          style={{
            left: mouseState.x,
            top: mouseState.y,
            transform: `translate(-50%, -50%) perspective(1000px)
                       rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)
                       scale(${isHovering ? 1.5 : 1})`,
          }}
        >
          {/* 3D Cursor Structure */}
          <div className="relative w-12 h-12">
            {/* Front face */}
            <div
              className="absolute inset-0 bg-indigo-500 rounded-lg mix-blend-screen"
              style={{
                transform: 'translateZ(6px)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
              }}
            />
            
            {/* Back face */}
            <div
              className="absolute inset-0 bg-indigo-700 rounded-lg mix-blend-screen"
              style={{
                transform: 'translateZ(-6px)',
              }}
            />

            {/* Side faces */}
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="absolute inset-0 bg-indigo-600 mix-blend-screen"
                style={{
                  transform: `rotateY(${index * 90}deg) translateZ(6px)`,
                  width: '12px',
                  left: index % 2 === 0 ? 0 : 'auto',
                  right: index % 2 === 1 ? 0 : 'auto',
                }}
              />
            ))}
          </div>

          {/* Shadow */}
          <div
            className="absolute rounded-full bg-black/30 blur-md"
            style={{
              width: '48px',
              height: '8px',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -4px) rotateX(90deg)',
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-center h-full gap-8">
        <button
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg transition-all duration-300"
          style={{
            transform: `perspective(1000px) 
                       rotateX(${-rotation.x * 0.5}deg) 
                       rotateY(${-rotation.y * 0.5}deg)`,
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          3D Hover Effect
        </button>
      </div>
    </div>
  );
};

export default ThreeDCursor;