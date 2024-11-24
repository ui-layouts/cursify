import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const MagneticCursor: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current) {
        const button = buttonRef.current.getBoundingClientRect();
        const centerX = button.left + button.width / 2;
        const centerY = button.top + button.height / 2;
        const deltaX = e.pageX - centerX;
        const deltaY = e.pageY - centerY;

        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const magneticDistance = 120; // Distance for magnetic attraction
        const attractionStrength = 0.45; // Magnetic strength

        if (distance < magneticDistance) {
          const strength = 1 - distance / magneticDistance;
          gsap.to(buttonRef.current, {
            x: deltaX * strength * attractionStrength,
            y: deltaY * strength * attractionStrength,
            duration: 0.2,
          });
          setIsHovering(true);
        } else {
          gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.3,
          });
          setIsHovering(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center">
      <button
        ref={buttonRef}
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-transform ${isHovering ? 'bg-green-500' : 'bg-green-600'
          }`}
      >
        Hover on me!
      </button>
    </div>
  );
};

export default MagneticCursor;
