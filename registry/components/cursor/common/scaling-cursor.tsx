'use client';

import { useState, HTMLAttributes } from 'react';
import { useMouse } from '@/hooks/use-mouse';

// Define an interface for the component's props
interface ScalingCursorProps extends HTMLAttributes<HTMLDivElement> {
  cursorSize?: number;
  cursorColor?: string;
  hoverScale?: number;
  hoverRotation?: number;
  blendMode?:
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn';
}

const ScalingCursor = ({
  cursorSize = 24, // default to 24px
  cursorColor = 'bg-purple-500',
  hoverScale = 2,
  hoverRotation = 45,
  blendMode = 'screen',
  className,
  ...rest
}: ScalingCursorProps) => {
  const [mouseState, ref] = useMouse();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={`relative w-full h-full  ${className}`} ref={ref} {...rest}>
      {mouseState.x !== null && mouseState.y !== null && (
        <div
          className='fixed pointer-events-none z-50 transition-all duration-300'
          style={{
            left: mouseState.x,
            top: mouseState.y,
            transform: `translate(-50%, -50%) 
              scale(${isHovering ? hoverScale : 1}) 
              rotate(${isHovering ? `${hoverRotation}deg` : '0deg'})`,
          }}
        >
          <div
            className={`${cursorColor} rounded-full mix-blend-${blendMode}`}
            style={{
              width: `${cursorSize}px`,
              height: `${cursorSize}px`,
            }}
          />
        </div>
      )}

      <div className='flex items-center justify-center h-full gap-8'>
        <button
          className='px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
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
