import React, { useState, useEffect, useRef } from 'react';

interface BrushCursorProps {
  brushColor?: string;
  brushSize?: number;
  fadeTime?: number;
}

const BrushCursor: React.FC<BrushCursorProps> = ({
  brushColor = 'rgba(0, 123, 255, 0.5)', 
  brushSize = 50,
  fadeTime = 1000
}) => {
  const [strokes, setStrokes] = useState<Array<{
    x: number, 
    y: number, 
    id: number
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create a new stroke
      const newStroke = {
        x, 
        y, 
        id: Date.now()
      };

      // Add new stroke and remove old ones
      setStrokes(prevStrokes => {
        const updatedStrokes = [...prevStrokes, newStroke];
        return updatedStrokes.slice(-10); // Limit number of simultaneous strokes
      });
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-hidden"
      style={{
        cursor: 'none' // Hide default cursor
      }}
    >
      {strokes.map((stroke) => (
        <div
          key={stroke.id}
          className="absolute rounded-full pointer-events-none animate-brush-stroke"
          style={{
            left: stroke.x,
            top: stroke.y,
            width: `${brushSize}px`,
            height: `${brushSize}px`,
            backgroundColor: brushColor,
            animationDuration: `${fadeTime}ms`
          }}
        />
      ))}
    </div>
  );
};

export default BrushCursor;