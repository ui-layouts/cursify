import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import { BubbleCursor } from "../cursor/common/BubbleCursor";

const BubbleCursorExample = () => {
     const codeToDisplay = `
import React, { useEffect, useRef } from 'react';

interface BubbleCursorProps {
     wrapperElement?: HTMLElement;
}

export const BubbleCursor: React.FC<BubbleCursorProps> = ({ wrapperElement }) => {
     const canvasRef = useRef<HTMLCanvasElement | null>(null);
     const particlesRef = useRef<Particle[]>([]);
     const cursorRef = useRef({ x: 0, y: 0 });
     const animationFrameRef = useRef<number | null>(null);

     useEffect(() => {
          const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
          let canvas: HTMLCanvasElement | null = null;
          let context: CanvasRenderingContext2D | null = null;
          let width = window.innerWidth;
          let height = window.innerHeight;

          const init = () => {
               if (prefersReducedMotion.matches) {
                    console.log("This browser has prefers reduced motion turned on, so the cursor did not init");
                    return false;
               }

               canvas = canvasRef.current;
               if (!canvas) return;

               context = canvas.getContext('2d');
               if (!context) return;

               canvas.style.top = "0px";
               canvas.style.left = "0px";
               canvas.style.pointerEvents = "none";

               if (wrapperElement) {
                    canvas.style.position = "absolute";
                    wrapperElement.appendChild(canvas);
                    canvas.width = wrapperElement.clientWidth;
                    canvas.height = wrapperElement.clientHeight;
               } else {
                    canvas.style.position = "fixed";
                    document.body.appendChild(canvas);
                    canvas.width = width;
                    canvas.height = height;
               }

               bindEvents();
               loop();
          };

          const bindEvents = () => {
               const element = wrapperElement || document.body;
               element.addEventListener("mousemove", onMouseMove);
               element.addEventListener("touchmove", onTouchMove, { passive: true });
               element.addEventListener("touchstart", onTouchMove, { passive: true });
               window.addEventListener("resize", onWindowResize);
          };

          const onWindowResize = () => {
               width = window.innerWidth;
               height = window.innerHeight;

               if (!canvasRef.current) return;

               if (wrapperElement) {
                    canvasRef.current.width = wrapperElement.clientWidth;
                    canvasRef.current.height = wrapperElement.clientHeight;
               } else {
                    canvasRef.current.width = width;
                    canvasRef.current.height = height;
               }
          };

          const onTouchMove = (e: TouchEvent) => {
               if (e.touches.length > 0) {
                    for (let i = 0; i < e.touches.length; i++) {
                         addParticle(e.touches[i].clientX, e.touches[i].clientY);
                    }
               }
          };

          const onMouseMove = (e: MouseEvent) => {
               if (wrapperElement) {
                    const boundingRect = wrapperElement.getBoundingClientRect();
                    cursorRef.current.x = e.clientX - boundingRect.left;
                    cursorRef.current.y = e.clientY - boundingRect.top;
               } else {
                    cursorRef.current.x = e.clientX;
                    cursorRef.current.y = e.clientY;
               }

               addParticle(cursorRef.current.x, cursorRef.current.y);
          };

          const addParticle = (x: number, y: number) => {
               particlesRef.current.push(new Particle(x, y));
          };

          const updateParticles = () => {
               if (!canvas || !context) return;

               if (particlesRef.current.length === 0) {
                    return;
               }

               context.clearRect(0, 0, canvas.width, canvas.height);

               // Update
               for (let i = 0; i < particlesRef.current.length; i++) {
                    particlesRef.current[i].update(context);
               }

               // Remove dead particles
               for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                    if (particlesRef.current[i].lifeSpan < 0) {
                         particlesRef.current.splice(i, 1);
                    }
               }

               if (particlesRef.current.length === 0) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
               }
          };

          const loop = () => {
               updateParticles();
               animationFrameRef.current = requestAnimationFrame(loop);
          };

          class Particle {
               lifeSpan: number;
               initialLifeSpan: number;
               velocity: { x: number; y: number };
               position: { x: number; y: number };
               baseDimension: number;

               constructor(x: number, y: number) {
                    this.initialLifeSpan = Math.floor(Math.random() * 60 + 60);
                    this.lifeSpan = this.initialLifeSpan;
                    this.velocity = {
                         x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
                         y: -0.4 + Math.random() * -1,
                    };
                    this.position = { x, y };
                    this.baseDimension = 4;
               }

               update(context: CanvasRenderingContext2D) {
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
                    this.velocity.y -= Math.random() / 600;
                    this.lifeSpan--;

                    const scale = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;

                    context.fillStyle = "#e6f1f7";
                    context.strokeStyle = "#3a92c5";
                    context.beginPath();
                    context.arc(
                         this.position.x - (this.baseDimension / 2) * scale,
                         this.position.y - this.baseDimension / 2,
                         this.baseDimension * scale,
                         0,
                         2 * Math.PI
                    );

                    context.stroke();
                    context.fill();
                    context.closePath();
               }
          }

          init();

          return () => {
               if (canvas) {
                    canvas.remove();
               }
               if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
               }
               const element = wrapperElement || document.body;
               element.removeEventListener("mousemove", onMouseMove);
               element.removeEventListener("touchmove", onTouchMove);
               element.removeEventListener("touchstart", onTouchMove);
               window.removeEventListener("resize", onWindowResize);
          };
     }, [wrapperElement]);

     return <canvas ref={canvasRef} />;
};

`;


     return (
          <DocumentLayout
               title="Bubble Cursor"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Demo Component Card */}
               <ComponentCard
                    title="Bubble Cursor Component"
                    description="An interactive React component that adds a dynamic bubble effect, visually tracking cursor movement in real time."
               >
                    <LivePreviewCard>
                         <div className="min-h-screen w-full">
                              <BubbleCursor />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Card */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the Bubble Cursor component"
               >
                    <div className="space-y-4">
                         {/* Code Example: Bubble Cursor */}
                         <CodeExample
                              title="Create ./BubbleCursor.tsx Component"
                              code={codeToDisplay}
                              fileName="./BubbleCursor.tsx"
                         />

                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default BubbleCursorExample;
