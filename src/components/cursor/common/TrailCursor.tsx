import React, { useState, useEffect } from 'react';
import { useMouse } from '@/hooks/use-mouse';

const TrailCursor = () => {
  const [mouseState, ref] = useMouse();
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    if (mouseState.x && mouseState.y) {
      setTrails(prev => [
        { x: mouseState.x, y: mouseState.y, id: Date.now() },
        ...prev.slice(0, 10)
      ]);
    }

    const cleanup = setTimeout(() => {
      setTrails(prev => prev.slice(0, -1));
    }, 50);

    return () => clearTimeout(cleanup);
  }, [mouseState.x, mouseState.y]);

  return (
    <div className="relative w-full h-screen bg-gray-900" ref={ref}>
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
          <div className="w-4 h-4 bg-blue-500 rounded-full mix-blend-screen" />
        </div>
      )}

      {/* Trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none transition-opacity duration-300"
          style={{
            left: trail.x,
            top: trail.y,
            transform: 'translate(-50%, -50%)',
            opacity: 1 - index * 0.1,
          }}
        >
          <div
            className="rounded-full mix-blend-screen bg-blue-400"
            style={{
              width: Math.max(4, 16 - index * 1.2),
              height: Math.max(4, 16 - index * 1.2),
            }}
          />
        </div>
      ))}

      <div className="flex items-center justify-center h-full">
        <div className="text-white text-xl">
          Move cursor to see trail effect
        </div>
      </div>
    </div>
  );
};

export default TrailCursor;