import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import { CharacterCursor } from "../cursor/common/CharacterCursor";
import BreadcrumbMaker from "../common/Breadcrumb";

const CharacterCursorExample = () => {
     const codeToDisplay = `
import React, { useEffect, useRef } from 'react';

interface CharacterCursorProps {
     characters?: string[];
     colors?: string[];
     cursorOffset?: { x: number; y: number };
     font?: string;
     characterLifeSpanFunction?: () => number;
     initialCharacterVelocityFunction?: () => { x: number; y: number };
     characterVelocityChangeFunctions?: {
          x_func: (age: number, lifeSpan: number) => number;
          y_func: (age: number, lifeSpan: number) => number;
     };
     characterScalingFunction?: (age: number, lifeSpan: number) => number;
     characterNewRotationDegreesFunction?: (age: number, lifeSpan: number) => number;
     wrapperElement?: HTMLElement;
}

export const CharacterCursor: React.FC<CharacterCursorProps> = ({
     characters = ["h", "e", "l", "l", "o"],
     colors = ["#6622CC", "#A755C2", "#B07C9E", "#B59194", "#D2A1B8"],
     cursorOffset = { x: 0, y: 0 },
     font = "15px serif",
     characterLifeSpanFunction = () => Math.floor(Math.random() * 60 + 80),
     initialCharacterVelocityFunction = () => ({
          x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5,
          y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5,
     }),
     characterVelocityChangeFunctions = {
          x_func: () => (Math.random() < 0.5 ? -1 : 1) / 30,
          y_func: () => (Math.random() < 0.5 ? -1 : 1) / 15,
     },
     characterScalingFunction = (age, lifeSpan) => Math.max((lifeSpan - age) / lifeSpan * 2, 0),
     characterNewRotationDegreesFunction = (age, lifeSpan) => (lifeSpan - age) / 5,
     wrapperElement,
}) => {
     const canvasRef = useRef<HTMLCanvasElement | null>(null);
     const particlesRef = useRef<Particle[]>([]);
     const cursorRef = useRef({ x: 0, y: 0 });
     const animationFrameRef = useRef<number | null>(null);
     const canvImagesRef = useRef<HTMLCanvasElement[]>([]);

     useEffect(() => {
          const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
          let canvas: HTMLCanvasElement | null = null;
          let context: CanvasRenderingContext2D | null = null;
          let width = window.innerWidth;
          let height = window.innerHeight;

          const randomPositiveOrNegativeOne = () => (Math.random() < 0.5 ? -1 : 1);

          class Particle {
               rotationSign: number;
               age: number;
               initialLifeSpan: number;
               lifeSpan: number;
               velocity: { x: number; y: number };
               position: { x: number; y: number };
               canv: HTMLCanvasElement;

               constructor(x: number, y: number, canvasItem: HTMLCanvasElement) {
                    const lifeSpan = characterLifeSpanFunction();
                    this.rotationSign = randomPositiveOrNegativeOne();
                    this.age = 0;
                    this.initialLifeSpan = lifeSpan;
                    this.lifeSpan = lifeSpan;
                    this.velocity = initialCharacterVelocityFunction();
                    this.position = {
                         x: x + cursorOffset.x,
                         y: y + cursorOffset.y
                    };
                    this.canv = canvasItem;
               }

               update(context: CanvasRenderingContext2D) {
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.lifeSpan--;
                    this.age++;

                    this.velocity.x += characterVelocityChangeFunctions.x_func(this.age, this.initialLifeSpan);
                    this.velocity.y += characterVelocityChangeFunctions.y_func(this.age, this.initialLifeSpan);

                    const scale = characterScalingFunction(this.age, this.initialLifeSpan);

                    const degrees = this.rotationSign * characterNewRotationDegreesFunction(this.age, this.initialLifeSpan);
                    const radians = degrees * 0.0174533;

                    context.translate(this.position.x, this.position.y);
                    context.rotate(radians);

                    context.drawImage(
                         this.canv,
                         (-this.canv.width / 2) * scale,
                         -this.canv.height / 2,
                         this.canv.width * scale,
                         this.canv.height * scale
                    );

                    context.rotate(-radians);
                    context.translate(-this.position.x, -this.position.y);
               }
          }

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

               context.font = font;
               context.textBaseline = "middle";
               context.textAlign = "center";

               characters.forEach((char) => {
                    let measurements = context.measureText(char);
                    let bgCanvas = document.createElement("canvas");
                    let bgContext = bgCanvas.getContext("2d");

                    if (bgContext) {
                         bgCanvas.width = measurements.width;
                         bgCanvas.height = measurements.actualBoundingBoxAscent * 2.5;

                         bgContext.textAlign = "center";
                         bgContext.font = font;
                         bgContext.textBaseline = "middle";
                         var randomColor = colors[Math.floor(Math.random() * colors.length)];
                         bgContext.fillStyle = randomColor;

                         bgContext.fillText(
                              char,
                              bgCanvas.width / 2,
                              measurements.actualBoundingBoxAscent
                         );

                         canvImagesRef.current.push(bgCanvas);
                    }
               });

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
                         addParticle(
                              e.touches[i].clientX,
                              e.touches[i].clientY,
                              canvImagesRef.current[Math.floor(Math.random() * canvImagesRef.current.length)]
                         );
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

               addParticle(
                    cursorRef.current.x,
                    cursorRef.current.y,
                    canvImagesRef.current[Math.floor(Math.random() * characters.length)]
               );
          };

          const addParticle = (x: number, y: number, img: HTMLCanvasElement) => {
               particlesRef.current.push(new Particle(x, y, img));
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
     }, [
          characters,
          colors,
          cursorOffset,
          font,
          characterLifeSpanFunction,
          initialCharacterVelocityFunction,
          characterVelocityChangeFunctions,
          characterScalingFunction,
          characterNewRotationDegreesFunction,
          wrapperElement
     ]);

     return <canvas ref={canvasRef} />;
};


`;

     return (
          <DocumentLayout
               title="Character Cursor"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Demo Component Card */}
               <ComponentCard
                    title="Character Cursor Component"
                    description="An interactive React component that tracks cursor movement, displaying custom characters and colors for a playful and personalized effect."
               >
                    <LivePreviewCard className="">
                         <div className="min-h-screen w-full">
                              <CharacterCursor
                                 characters={[
                                   '🔥', 
                                   '🌈', 
                                   '🎉', 
                                   '💖', 
                                   '💎'
                                 ]}
                                 
                                   colors={['#FFD700', '#FFA500', '#FF4500', '#8A2BE2', '#4B0082']}
                                   font="20px Arial"
                              />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Card */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the Character Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example: Character Cursor */}
                         <CodeExample
                              title="Character Cursor Component"
                              code={codeToDisplay}
                              fileName="./CharacterCursor.tsx"
                               badgeText="TSX"
                         />


                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default CharacterCursorExample;
