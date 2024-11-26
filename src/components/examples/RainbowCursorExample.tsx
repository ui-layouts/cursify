import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import { RainbowCursor } from "../cursor/common/RainbowCursor";

const RainbowCursorExample = () => {
     const codeToDisplay = `
import React, { useEffect, useRef } from 'react';

interface RainbowCursorProps {
     element?: HTMLElement;
     length?: number;
     colors?: string[];
     size?: number;
     trailSpeed?: number;
     colorCycleSpeed?: number;
     blur?: number;
     pulseSpeed?: number;
     pulseMin?: number;
     pulseMax?: number;
}

export const RainbowCursor: React.FC<RainbowCursorProps> = ({
     element,
     length = 20,
     colors = [
          "#FE0000",
          "#FD8C00",
          "#FFE500",
          "#119F0B",
          "#0644B3",
          "#C22EDC",
     ],
     size = 3,
     trailSpeed = 0.4,
     colorCycleSpeed = 0.002,
     blur = 0,
     pulseSpeed = 0.01,
     pulseMin = 0.8,
     pulseMax = 1.2
}) => {
     const canvasRef = useRef<HTMLCanvasElement | null>(null);
     const contextRef = useRef<CanvasRenderingContext2D | null>(null);
     const cursorRef = useRef({ x: 0, y: 0 });
     const particlesRef = useRef<Array<{ position: { x: number; y: number } }>>([]);
     const animationFrameRef = useRef<number>();
     const cursorsInittedRef = useRef(false);
     const timeRef = useRef(0);

     class Particle {
          position: { x: number; y: number };

          constructor(x: number, y: number) {
               this.position = { x, y };
          }
     }

     // Helper function to interpolate between colors
     const interpolateColors = (color1: string, color2: string, factor: number) => {
          const r1 = parseInt(color1.substr(1, 2), 16);
          const g1 = parseInt(color1.substr(3, 2), 16);
          const b1 = parseInt(color1.substr(5, 2), 16);

          const r2 = parseInt(color2.substr(1, 2), 16);
          const g2 = parseInt(color2.substr(3, 2), 16);
          const b2 = parseInt(color2.substr(5, 2), 16);

          const r = Math.round(r1 + (r2 - r1) * factor);
          const g = Math.round(g1 + (g2 - g1) * factor);
          const b = Math.round(b1 + (b2 - b1) * factor);

          return \`rgb(\${r}, \${g}, \${b})\`;
     };

     // Function to get dynamic size based on pulse
     const getPulseSize = (baseSize: number, time: number) => {
          const pulse = Math.sin(time * pulseSpeed);
          const scaleFactor = pulseMin + (pulse + 1) * (pulseMax - pulseMin) / 2;
          return baseSize * scaleFactor;
     };

     useEffect(() => {
          const hasWrapperEl = element !== undefined;
          const targetElement = hasWrapperEl ? element : document.body;

          const prefersReducedMotion = window.matchMedia(
               "(prefers-reduced-motion: reduce)"
          );

          if (prefersReducedMotion.matches) {
               console.log("Reduced motion is enabled - cursor animation disabled");
               return;
          }

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d", { alpha: true });

          if (!context) return;

          canvasRef.current = canvas;
          contextRef.current = context;

          canvas.style.top = "0px";
          canvas.style.left = "0px";
          canvas.style.pointerEvents = "none";
          canvas.style.position = hasWrapperEl ? "absolute" : "fixed";

          if (hasWrapperEl) {
               element?.appendChild(canvas);
               canvas.width = element.clientWidth;
               canvas.height = element.clientHeight;
          } else {
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

               if (!cursorsInittedRef.current) {
                    cursorsInittedRef.current = true;
                    for (let i = 0; i < length; i++) {
                         particlesRef.current.push(
                              new Particle(cursorRef.current.x, cursorRef.current.y)
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
               if (!contextRef.current || !canvasRef.current) return;

               const ctx = contextRef.current;
               const canvas = canvasRef.current;

               ctx.clearRect(0, 0, canvas.width, canvas.height);
               ctx.lineJoin = "round";

               if (blur > 0) {
                    ctx.filter = \`blur(\${blur}px)\`;
               }

               const particleSets = [];
               let x = cursorRef.current.x;
               let y = cursorRef.current.y;

               particlesRef.current.forEach((particle, index) => {
                    const nextParticle = particlesRef.current[index + 1] || particlesRef.current[0];

                    particle.position.x = x;
                    particle.position.y = y;

                    particleSets.push({ x, y });

                    x += (nextParticle.position.x - particle.position.x) * trailSpeed;
                    y += (nextParticle.position.y - particle.position.y) * trailSpeed;
               });

               // Time-based color cycling
               timeRef.current += colorCycleSpeed;
               const colorOffset = timeRef.current % 1;

               // Dynamic size based on pulse
               const currentSize = getPulseSize(size, timeRef.current);

               colors.forEach((color, index) => {
                    const nextColor = colors[(index + 1) % colors.length];

                    ctx.beginPath();
                    ctx.strokeStyle = interpolateColors(
                         color,
                         nextColor,
                         (index + colorOffset) / colors.length
                    );

                    if (particleSets.length) {
                         ctx.moveTo(
                              particleSets[0].x,
                              particleSets[0].y + index * (currentSize - 1)
                         );
                    }

                    particleSets.forEach((set, particleIndex) => {
                         if (particleIndex !== 0) {
                              ctx.lineTo(set.x, set.y + index * currentSize);
                         }
                    });

                    ctx.lineWidth = currentSize;
                    ctx.lineCap = "round";
                    ctx.stroke();
               });
          };

          const loop = () => {
               updateParticles();
               animationFrameRef.current = requestAnimationFrame(loop);
          };

          targetElement.addEventListener("mousemove", onMouseMove);
          window.addEventListener("resize", onWindowResize);
          loop();

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
     }, [element, length, colors, size, trailSpeed, colorCycleSpeed, blur, pulseSpeed, pulseMin, pulseMax]);

     return null;
};`;


     return (
          <DocumentLayout
               title="Rainbow Cursor"
               description="Interactive rainbow cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'rainbow cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Rainbow Cursor Component"
                    description="A captivating React component that follows cursor movement with a colorful rainbow trail."
               >
                    <LivePreviewCard>
                         <RainbowCursor
                              length={20}
                              colors={["#FF0000", "#00FF00", "#0000FF"]}
                              size={3}
                              trailSpeed={0.4}
                              colorCycleSpeed={0.002}
                              blur={1}
                              pulseSpeed={0.01}
                              pulseMin={0.8}
                              pulseMax={1.2}
                         />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the Rainbow Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for Rainbow Cursor Component */}
                         <CodeExample
                              title="Create RainbowCursor.tsx Component"
                              code={codeToDisplay}
                              fileName="./RainbowCursor.tsx"
                              badgeText="TSX"
                         />


                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default RainbowCursorExample;
