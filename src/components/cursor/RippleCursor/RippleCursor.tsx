'use client';
import React, { useReducer, useEffect } from 'react';
import './RippleCursor.css';

interface RippleCursorProps {
  maxSize?: number; 
  duration?: number; 
  blur?: boolean; 
}

interface Ripple {
  id: string;
  x: number;
  y: number;
}

const initialState: Ripple[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rippleReducer = (state: Ripple[], action: any) => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      // Limit ripple count to 30
      return [...state, action.payload].slice(-30);
    case 'REMOVE_RIPPLE':
      return state.filter((ripple) => ripple.id !== action.payload);
    default:
      return state;
  }
};

const RippleCursor: React.FC<RippleCursorProps> = ({
  maxSize = 50,
  duration = 1000,
  blur = true,
}) => {
  const [ripples, dispatch] = useReducer(rippleReducer, initialState);

  const handleMouseMove = (e: MouseEvent) => {
    const ripple = {
      id: `${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY,
    };
    dispatch({ type: 'ADD_RIPPLE', payload: ripple });

    // Remove ripple after the animation duration
    setTimeout(() => {
      dispatch({ type: 'REMOVE_RIPPLE', payload: ripple.id });
    }, duration);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const ripple = {
        id: `${Date.now()}-${Math.random()}`,
        x: touch.clientX,
        y: touch.clientY,
      };
      dispatch({ type: 'ADD_RIPPLE', payload: ripple });

      // Remove ripple after the animation duration
      setTimeout(() => {
        dispatch({ type: 'REMOVE_RIPPLE', payload: ripple.id });
      }, duration);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [duration]);

  return (
    <div className="ripple-cursor-container">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${maxSize}px`,
            height: `${maxSize}px`,
            animationDuration: `${duration}ms`,
            filter: blur ? 'blur(4px)' : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default RippleCursor;
