import React, { useState, useEffect } from 'react';
import { useMouse } from '@/hooks/use-mouse';

const MultiCursor = () => {
  const [mouseState, ref] = useMouse();
  const [cursors, setCursors] = useState([]);
  const [pattern, setPattern] = useState('circle');
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 2) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mouseState.x && mouseState.y) {
      const patterns = {
        circle: Array(8).fill(0).map((_, i) => ({
          x: Math.cos((i * Math.PI * 2) / 8 + rotation * Math.PI / 180) * 50,
          y: Math.sin((i * Math.PI * 2) / 8 + rotation * Math.PI / 180) * 50,
          scale: 0.5 + Math.sin(rotation * Math.PI / 180 + i) * 0.2,
        })),
        spiral: Array(12).fill(0).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12 + rotation * Math.PI / 180;
          const radius = i * 5;
          return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            scale: 1 - i * 0.05,
          };
        }),
        grid: Array(9).fill(0).map((_, i) => ({
          x: ((i % 3) - 1) * 40 * Math.cos(rotation * Math.PI / 180),
          y: (Math.floor(i / 3) - 1) * 40 * Math.sin(rotation * Math.PI / 180),
          scale: 0.5 + Math.sin(rotation * Math.PI / 180 + i) * 0.2,
        })),
      };

      setCursors(patterns[pattern]);
    }
  }, [mouseState, pattern, rotation]);

  return (
    <div className="relative w-full h-screen bg-gray-900" ref={ref}>
      {mouseState.x !== null && mouseState.y !== null && (
        <>
          {/* Multi-cursors */}
          {cursors.map((cursor, index) => (
            <div
              key={index}
              className="fixed pointer-events-none transition-all duration-200"
              style={{
                left: mouseState.x + cursor.x,
                top: mouseState.y + cursor.y,
                transform: `translate(-50%, -50%) scale(${cursor.scale})`,
              }}
            >
              <div 
                className="w-6 h-6 rounded-full mix-blend-screen"
                style={{
                  background: `hsl(${(index * 30 + rotation) % 360}, 100%, 70%)`,
                }}
              />
            </div>
          ))}

          {/* Main cursor */}
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: mouseState.x,
              top: mouseState.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-8 h-8 bg-white rounded-full mix-blend-screen" />
          </div>
        </>
      )}

      <div className="flex flex-col items-center justify-center h-full gap-6">
        {['circle', 'spiral', 'grid'].map((patternType) => (
          <button
            key={patternType}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              pattern === patternType 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-600/30 text-purple-200'
            }`}
            onClick={() => setPattern(patternType)}
          >
            {patternType.charAt(0).toUpperCase() + patternType.slice(1)} Pattern
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiCursor;