export const ArrowCursorCode = `
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ArrowCursor: React.FC = () => {
     const [lastY, setLastY] = useState<number | null>(null);
     const [direction, setDirection] = useState<'up' | 'down' | null>(null);
     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

     useEffect(() => {
          const handleMouseMove = (e: MouseEvent) => {
               // Track mouse position
               setMousePosition({ x: e.clientX, y: e.clientY });

               // Determine direction
               if (lastY !== null) {
                    if (e.clientY < lastY) {
                         setDirection('up');
                    } else if (e.clientY > lastY) {
                         setDirection('down');
                    }
               }
               setLastY(e.clientY);
          };

          window.addEventListener('mousemove', handleMouseMove);

          return () => {
               window.removeEventListener('mousemove', handleMouseMove);
          };
     }, [lastY]);

     const arrowVariants = {
          initial: {
               opacity: 0,
               scale: 0.5,
               rotate: direction === 'up' ? 0 : 180
          },
          animate: {
               opacity: 1,
               scale: 1,
               rotate: direction === 'up' ? 0 : 180
          },
          exit: {
               opacity: 0,
               scale: 0.5
          }
     };

     return (
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
               <AnimatePresence>
                    {direction && (
                         <motion.div
                              key={\`\${direction}-arrow\`}
                              style={{
                                   position: 'fixed',
                                   top: mousePosition.y - 25,
                                   left: mousePosition.x + 15  // Offset 15 pixels to the right
                              }}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              variants={arrowVariants}
                         >
                              <div className="w-[50px] h-[50px] bg-black dark:bg-white rounded-full flex items-center justify-center">
                                   <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-white dark:text-black"
                                   >
                                        <line x1="12" y1="19" x2="12" y2="5"></line>
                                        <polyline points="5 12 12 5 19 12"></polyline>
                                   </svg>
                              </div>

                         </motion.div>
                    )}
               </AnimatePresence>
          </div>
     );
};

export default ArrowCursor;`

export const BrushCursorCode = `
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
            width: \`\${brushSize}px\`,
            height: \`\${brushSize}px\`,
            backgroundColor: brushColor,
            animationDuration: \`\${fadeTime}ms\`
          }}
        />
      ))}
    </div>
  );
};

export default BrushCursor;`

export const useMouseCode = `
"use client";
import { type RefObject, useLayoutEffect, useRef, useState } from "react";

interface MouseState {
  x: number | null;
  y: number | null;
  elementX: number | null;
  elementY: number | null;
  elementPositionX: number | null;
  elementPositionY: number | null;
}

export function useMouse(): [MouseState, RefObject<HTMLDivElement>] {
  const [state, setState] = useState<MouseState>({
    x: null,
    y: null,
    elementX: null,
    elementY: null,
    elementPositionX: null,
    elementPositionY: null,
  });

  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newState: Partial<MouseState> = {
        x: event.pageX,
        y: event.pageY,
      };

      if (ref.current instanceof Element) {
        const { left, top } = ref.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;

        newState.elementX = elementX;
        newState.elementY = elementY;
        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
      }

      setState((s) => ({
        ...s,
        ...newState,
      }));
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return [state, ref];
}
`


export const useSpotLightCursorCode = `
import { useEffect, useRef, useState } from 'react';

const useSpotlightEffect = (config = {}) => {
  const {
    spotlightSize = 200,
    spotlightIntensity = 0.8,
    fadeSpeed = 0.1,
    glowColor = '255, 255, 255',
    pulseSpeed = 2000,
  } = config;

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const spotlightPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const lerp = (start, end, factor) => {
      return start + (end - start) * factor;
    };

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const render = () => {
      if (!canvas || !ctx) return;

      // Smooth position transition
      spotlightPos.current.x = lerp(
        spotlightPos.current.x,
        targetPos.current.x,
        fadeSpeed
      );
      spotlightPos.current.y = lerp(
        spotlightPos.current.y,
        targetPos.current.y,
        fadeSpeed
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create dark overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate pulse effect
      const pulseScale = 
        1 + 0.1 * Math.sin((Date.now() / pulseSpeed) * Math.PI * 2);
      const currentSpotlightSize = spotlightSize * pulseScale;

      // Create spotlight gradient
      const gradient = ctx.createRadialGradient(
        spotlightPos.current.x,
        spotlightPos.current.y,
        0,
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize
      );

      // Add multiple color stops for smoother transition
      gradient.addColorStop(0, \`rgba(\${glowColor}, \${spotlightIntensity})\`);
      gradient.addColorStop(0.5, \`rgba(\${glowColor}, \${spotlightIntensity * 0.5})\`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      // Apply spotlight effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Add glow effect
      ctx.globalCompositeOperation = 'source-over';
      const glowGradient = ctx.createRadialGradient(
        spotlightPos.current.x,
        spotlightPos.current.y,
        0,
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize * 1.2
      );
      glowGradient.addColorStop(0, \`rgba(\${glowColor}, 0.2)\`);
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize * 1.2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      animationFrame.current = requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.addEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [spotlightSize, spotlightIntensity, fadeSpeed, glowColor, pulseSpeed]);

  return canvasRef;
};

export default useSpotlightEffect;
`


export const TextFlagCursorCode =  `
import React, { useEffect, useRef } from 'react';

interface TextFlagOptions {
  text?: string;
  color?: string;
  font?: string;
  textSize?: number;
  gap?: number;
  element?: HTMLElement;
  size?: number;
}

export const TextFlagCursor: React.FC<TextFlagOptions> = (options) => {
  const cursorRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let cursorOptions = options || {};
    let hasWrapperEl = options && options.element;
    let element = hasWrapperEl || document.body;

    let text = cursorOptions.text ? " " + options.text : " Your Text Here";
    let color = options?.color || "#000000";
    let font = cursorOptions.font || "monospace";
    let textSize = cursorOptions.textSize || 12;
    let fontFamily = textSize + "px " + font;
    let gap = cursorOptions.gap || textSize + 2;
    let angle = 0;
    let radiusX = 2;
    let radiusY = 5;
    let charArray = [];

    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: width / 2 };

    for (let i = 0; i < text.length; i++) {
      charArray[i] = { letter: text.charAt(i), x: width / 2, y: width / 2 };
    }

    let canvas: HTMLCanvasElement, 
        context: CanvasRenderingContext2D | null, 
        animationFrame: number;

    const size = options?.size || 3;
    let cursorsInitted = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    function init() {
      if (prefersReducedMotion.matches) {
        console.log(
          "This browser has prefers reduced motion turned on, so the cursor did not init"
        );
        return false;
      }

      canvas = document.createElement("canvas");
      context = canvas.getContext("2d");
      canvas.style.top = "0px";
      canvas.style.left = "0px";
      canvas.style.pointerEvents = "none";

      if (hasWrapperEl) {
        canvas.style.position = "absolute";
        element.appendChild(canvas);
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.style.position = "fixed";
        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;
      }

      bindEvents();
      loop();
    }

    function bindEvents() {
      element.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize(e: Event) {
      width = window.innerWidth;
      height = window.innerHeight;

      if (hasWrapperEl) {
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
    }

    function onMouseMove(e: MouseEvent) {
      if (hasWrapperEl) {
        const boundingRect = element.getBoundingClientRect();
        cursor.x = e.clientX - boundingRect.left;
        cursor.y = e.clientY - boundingRect.top;
      } else {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
    }

    function updateParticles() {
      if (!context) return;
      context.clearRect(0, 0, width, height);

      angle += 0.15;
      let locX = radiusX * Math.cos(angle);
      let locY = radiusY * Math.sin(angle);

      for (let i = charArray.length - 1; i > 0; i--) {
        charArray[i].x = charArray[i - 1].x + gap;
        charArray[i].y = charArray[i - 1].y;

        context.fillStyle = color;
        context.font = fontFamily;
        context.fillText(charArray[i].letter, charArray[i].x, charArray[i].y);
      }

      let x1 = charArray[0].x;
      let y1 = charArray[0].y;
      x1 += (cursor.x - x1) / 5 + locX + 2;
      y1 += (cursor.y - y1) / 5 + locY;
      charArray[0].x = x1;
      charArray[0].y = y1;
    }

    function loop() {
      updateParticles();
      animationFrame = requestAnimationFrame(loop);
    }

    function destroy() {
      canvas.remove();
      cancelAnimationFrame(animationFrame);
      element.removeEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onWindowResize);
    }

    const handleReducedMotionChange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };

    prefersReducedMotion.addEventListener('change', handleReducedMotionChange);
    init();

    cursorRef.current = { destroy };

    return () => {
      if (cursorRef.current) {
        cursorRef.current.destroy();
      }
      prefersReducedMotion.removeEventListener('change', handleReducedMotionChange);
    };
  }, [options]);

  return null;
};

export default TextFlagCursor;
`

export const ThreeDCursorCode = `
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
            transform: \`translate(-50%, -50%) perspective(1000px)
                       rotateX(\${rotation.x}deg) rotateY(\${rotation.y}deg)
                       scale(\${isHovering ? 1.5 : 1})\`,
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
                  transform: \`rotateY(\${index * 90}deg) translateZ(6px)\`,
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
            transform: \`perspective(1000px) 
                       rotateX(\${-rotation.x * 0.5}deg) 
                       rotateY(\${-rotation.y * 0.5}deg)\`,
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

export default ThreeDCursor;`

export const TrailCursorCode = `
import React, { useEffect, useRef } from 'react';

interface TrailingCursorProps {
  element?: HTMLElement;
  particles?: number;
  rate?: number;
  baseImageSrc?: string;
}

const TrailingCursor: React.FC<TrailingCursorProps> = ({
  element,
  particles = 15,
  rate = 0.4,
  baseImageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg=="
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    position: { x: number; y: number };
    image: HTMLImageElement;
    move: (context: CanvasRenderingContext2D) => void;
  }>>([]);
  const animationFrameRef = useRef<number>();
  const cursorsInittedRef = useRef(false);

  class Particle {
    position: { x: number; y: number };
    image: HTMLImageElement;

    constructor(x: number, y: number, image: HTMLImageElement) {
      this.position = { x, y };
      this.image = image;
    }

    move(context: CanvasRenderingContext2D) {
      context.drawImage(
        this.image,
        this.position.x,
        this.position.y
      );
    }
  }

  useEffect(() => {
    const baseImage = new Image();
    baseImage.src = baseImageSrc;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const hasWrapperEl = element !== undefined;
    const targetElement = hasWrapperEl ? element : document.body;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return;

    canvasRef.current = canvas;
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas.style.pointerEvents = "none";

    if (hasWrapperEl) {
      canvas.style.position = "absolute";
      targetElement.appendChild(canvas);
      canvas.width = targetElement.clientWidth;
      canvas.height = targetElement.clientHeight;
    } else {
      canvas.style.position = "fixed";
      document.body.appendChild(canvas);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (hasWrapperEl && element) {
        const boundingRect = element.getBoundingClientRect();
        cursorRef.current.x = e.clientX - boundingRect.left;
        cursorRef.current.y = e.clientY - boundingRect.top;
      } else {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      }

      if (cursorsInittedRef.current === false) {
        cursorsInittedRef.current = true;
        for (let i = 0; i < particles; i++) {
          particlesRef.current.push(
            new Particle(cursorRef.current.x, cursorRef.current.y, baseImage)
          );
        }
      }
    };

    const onWindowResize = () => {
      if (hasWrapperEl && element) {
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const updateParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      let x = cursorRef.current.x;
      let y = cursorRef.current.y;

      particlesRef.current.forEach((particle, index) => {
        const nextParticle = particlesRef.current[index + 1] || particlesRef.current[0];

        particle.position.x = x;
        particle.position.y = y;
        particle.move(context);
        x += (nextParticle.position.x - particle.position.x) * rate;
        y += (nextParticle.position.y - particle.position.y) * rate;
      });
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    if (!prefersReducedMotion.matches) {
      targetElement.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onWindowResize);
      loop();
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      targetElement.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onWindowResize);
    };
  }, [element, particles, rate, baseImageSrc]);

  return null;
};


export default TrailingCursor;
`


export const FluidMotionCursorCode =  `
import React, { useEffect, useRef, useState } from 'react';

const TAIL_LENGTH = 20;

interface CursorPosition {
  x: number;
  y: number;
}

const FluidMotionCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const cursorHistoryRef = useRef<CursorPosition[]>(Array(TAIL_LENGTH).fill({ x: 0, y: 0 }));
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateCursor = () => {
      const cursorHistory = cursorHistoryRef.current;
      
      // Shift history and add new position
      cursorHistory.shift();
      cursorHistory.push(mousePosition);

      if (cursorRef.current) {
        const cursorCircles = cursorRef.current.children;

        for (let i = 0; i < TAIL_LENGTH; i++) {
          const current = cursorHistory[i];
          const next = cursorHistory[i + 1] || cursorHistory[TAIL_LENGTH - 1];
          
          const xDiff = next.x - current.x;
          const yDiff = next.y - current.y;
          
          current.x += xDiff * 0.35;
          current.y += yDiff * 0.35;

          const circle = cursorCircles[i] as HTMLDivElement;
          circle.style.transform = \`translate(\${current.x}px, \${current.y}px) scale(\${i/TAIL_LENGTH})\`;
        }
      }

      animationRef.current = requestAnimationFrame(updateCursor);
    };

    animationRef.current = requestAnimationFrame(updateCursor);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="goo" version="1.1" width="100%">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        ref={cursorRef} 
        id="cursor"
        className="fixed top-0 left-0 pointer-events-none mix-blend-mode-difference"
      >
        {[...Array(TAIL_LENGTH)].map((_, index) => (
          <div 
            key={index} 
            className="cursor-circle absolute top-0 left-0 w-7 h-7 rounded-full bg-[#FAF7EE]"
            style={{ 
              width: '28px', 
              height: '28px',
              borderRadius: '28px',
              transformOrigin: 'center center'
            }}
          />
        ))}
      </div>

      <div className="page-wrap min-h-screen bg-[#FAF7EE] overflow-x-hidden">
        <h1 className="m-0 py-12 text-center text-5xl uppercase font-sans select-none">
          Fluid <br /> Motion
        </h1>
      </div>
    </>
  );
};

export default FluidMotionCursor;
`