import React, { useState } from 'react';
import { useMouse } from '@/hooks/use-mouse';

const ScalingCursor = () => {
  const [mouseState, ref] = useMouse();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative w-full h-screen bg-gray-900" ref={ref}>
      {mouseState.x !== null && mouseState.y !== null && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-300"
          style={{
            left: mouseState.x,
            top: mouseState.y,
            transform: `translate(-50%, -50%) 
              scale(${isHovering ? 2 : 1}) 
              rotate(${isHovering ? '45deg' : '0deg'})`,
          }}
        >
          <div className="w-6 h-6 bg-purple-500 rounded-full mix-blend-screen" />
        </div>
      )}

      <div className="flex items-center justify-center h-full gap-8">
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Hover to Scale & Rotate
        </button>
      </div>
    </div>
  );
};

export default ScalingCursor;