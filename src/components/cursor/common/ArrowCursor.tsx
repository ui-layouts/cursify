import React, { useEffect, useRef, useState } from 'react';

interface ArrowCursorProps {
     element?: HTMLElement;
     size?: number;
     color?: string;
     edgeThreshold?: number; // percentage of viewport height to trigger arrows
     transitionSpeed?: number;
     hideTimeout?: number;
}

export const ArrowCursor: React.FC<ArrowCursorProps> = ({
     element,
     size = 24,
     color = '#000000',
     edgeThreshold = 15, // percentage
     transitionSpeed = 0.3,
     hideTimeout = 2000,
}) => {
     const cursorRef = useRef<HTMLDivElement | null>(null);
     const timeoutRef = useRef<NodeJS.Timeout>();
     const [cursorVisible, setCursorVisible] = useState(true);
     const [cursorType, setCursorType] = useState<'default' | 'up' | 'down'>('default');
     const [position, setPosition] = useState({ x: 0, y: 0 });
     const lastScrollY = useRef(0);
     const isScrolling = useRef(false);

     useEffect(() => {
          const targetElement = element || document.documentElement;
          let mouseTimeout: NodeJS.Timeout;

          const updateCursorVisibility = () => {
               setCursorVisible(true);
               if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
               }
               timeoutRef.current = setTimeout(() => {
                    if (!isScrolling.current) {
                         setCursorVisible(false);
                    }
               }, hideTimeout);
          };

          const updateCursorPosition = (e: MouseEvent) => {
               if (cursorRef.current) {
                    const x = e.clientX;
                    const y = e.clientY;
                    setPosition({ x, y });
                    updateCursorVisibility();
               }
          };


          const updateArrowState = () => {
               const scrollY = window.scrollY;
               const windowHeight = window.innerHeight;
               const documentHeight = document.documentElement.scrollHeight;
               const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;

               isScrolling.current = true;
               clearTimeout(mouseTimeout);

               if (scrollPercentage <= edgeThreshold) {
                    setCursorType('down');
               } else if (scrollPercentage >= (100 - edgeThreshold)) {
                    setCursorType('up');
               } else {
                    setCursorType('default');
               }

               mouseTimeout = setTimeout(() => {
                    isScrolling.current = false;
               }, 150);

               lastScrollY.current = scrollY;
               updateCursorVisibility();
          };

          const onMouseEnter = () => {
               setCursorVisible(true);
          };

          const onMouseLeave = () => {
               setCursorVisible(false);
          };

          document.addEventListener('mousemove', updateCursorPosition);
          document.addEventListener('scroll', updateArrowState);
          document.addEventListener('mouseenter', onMouseEnter);
          document.addEventListener('mouseleave', onMouseLeave);

          return () => {
               document.removeEventListener('mousemove', updateCursorPosition);
               document.removeEventListener('scroll', updateArrowState);
               document.removeEventListener('mouseenter', onMouseEnter);
               document.removeEventListener('mouseleave', onMouseLeave);
               if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
               }
          };
     }, [size, edgeThreshold, hideTimeout, element]);

     return (
          <div
               ref={cursorRef}
               style={{
                    position: 'fixed',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    width: size,
                    height: size,
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                    opacity: cursorVisible ? 1 : 0,
                    transition: `opacity ${transitionSpeed}s ease, transform ${transitionSpeed}s ease`,
               }}
          >
               <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{
                         transition: `transform ${transitionSpeed}s ease`,
                         transform: `scale(${cursorType === 'default' ? 0.8 : 1}) rotate(${cursorType === 'up' ? '180deg' : cursorType === 'down' ? '0deg' : '45deg'
                              })`,
                    }}
               >
                    {cursorType === 'default' ? (
                         // Default cursor (arrow pointer)
                         <path
                              d="M12 5L12 19M12 19L5 12M12 19L19 12"
                              stroke={color}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                         />
                    ) : (
                         // Up/Down arrow
                         <path
                              d="M12 5L12 19M12 19L5 12M12 19L19 12"
                              stroke={color}
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                         />
                    )}
               </svg>
          </div>
     );
};