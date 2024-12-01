export const AttractorBackgroundCode = `
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AttractorProps {
  particleCount?: number;
  backgroundColor?: string;
  particleColor?: string;
}

const Attractor: React.FC<AttractorProps> = ({
  particleCount = 20,
  backgroundColor = 'black',
  particleColor = 'white'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const dejong = (ctx: CanvasRenderingContext2D, anchorX: number, anchorY: number) => {
    const r = (n = 1) => Math.random() * n;
    const aOffset = (Math.random() - 0.5) * 2;
    const bOffset = (Math.random() - 0.5) * 2;
    const cOffset = (Math.random() - 0.5) * 2;
    const dOffset = (Math.random() - 0.5) * 2;
    let sx = Math.random() * 2 - 1;
    let sy = Math.random() * 2 - 1;
    let s = 20 + 240 * Math.random() * Math.random();
    let msx = 1 / (10 + Math.random() * 1000);
    let msy = 1 / (100 + Math.random() * 1000);
    let ox = 0;
    let fns = [];
    for (let i = 0; i < 4; i++) fns.push(['sin', 'cos'][~~r(2)]);
    let t = 0;
    let rr = Math.PI * 2 * Math.random();

    return function () {
      const a = 1.4 + aOffset + (mousePosition.x - window.innerWidth) * msx;
      const b = -2.3 + bOffset + mousePosition.y * msy;
      const c = 2.4 + cOffset + mousePosition.y * msy;
      const d = -2.1 + dOffset - (mousePosition.x - window.innerWidth) * msx;
      
      let x = sx + t;
      let y = sy + t;
      t += 0.0001;
      
      ctx.translate(anchorX, anchorY);
      ctx.rotate(rr);
      
      for (let i = 0; i < 500; i++) {
        let newX = Math[fns[0] as keyof Math](a * y) - Math[fns[2] as keyof Math](b * x);
        let newY = Math[fns[1] as keyof Math](c * x) - Math[fns[3] as keyof Math](d * y);
        x = newX;
        y = newY;
        
        const plotX = x * s;
        const plotY = y * s;
        ctx.fillStyle = particleColor;
        ctx.fillRect(plotX, plotY, 2, 2);
      }
      
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  };

  const generateAttractors = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const attractors: (() => void)[] = [];
    for (let i = 0; i < particleCount; i++) {
      attractors.push(dejong(ctx, Math.random() * width, Math.random() * height));
    }
    return attractors;
  };

  useEffect(() => {
    // Check if we're in browser environment
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = \`\${window.innerWidth}px\`;
    canvas.style.height = \`\${window.innerHeight}px\`;

    let attractors: (() => void)[] = [];
    let animationFrameId: number;
    
    const handleResize = () => {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = \`\${window.innerWidth}px\`;
      canvas.style.height = \`\${window.innerHeight}px\`;
      attractors = generateAttractors(ctx, canvas.width, canvas.height);
    };

    const handlePointerMove = (e: PointerEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      attractors = generateAttractors(ctx, canvas.width, canvas.height);
    };

    const loop = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      attractors.forEach((fn) => fn());
      animationFrameId = requestAnimationFrame(loop);
    };

    attractors = generateAttractors(ctx, canvas.width, canvas.height);
    loop();

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [particleCount, particleColor]);

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0"
      />
      
    </div>
  );
};

export default Attractor;
`;

export const ParticleNetworkBackground = `
import React, { useRef, useEffect } from 'react';

const ParticleNetwork: React.FC = () => {
     const canvasRef = useRef<HTMLCanvasElement>(null);

     useEffect(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Constants
          const MaxParticles = 600;
          const ConnectionDist = 50;
          const MaxSpeed = 2.1;

          let w = window.innerWidth;
          let h = 260; // Fixed height as per original code
          let midX = w / 2;
          let midY = h / 2;
          let currentMaxParticles = MaxParticles;

          // Set canvas size
          canvas.width = w;
          canvas.height = h;

          // Attraction and Repulsion Points
          const attractPt: any[] = [
               { x: w / 2, y: h / 2, force: 255 }
          ];

          const repelPt: any[] = [
               { x: w / 2, y: h / 2, force: 6, minDist: 85 }
          ];

          const particles: any[] = [];

          // Utility Functions
          const getDistance = (x1: number, x2: number, y1: number, y2: number): number => {
               const a = x1 - x2;
               const b = y1 - y2;
               return Math.sqrt(a * a + b * b);
          };

          // Create Particles
          const createParticles = () => {
               const vRange = 1.5;
               const vMin = 0.5;

               for (let i = 0; i < MaxParticles; i++) {
                    let vx = Math.random() * vRange + vMin;
                    let vy = Math.random() * vRange + vMin;

                    if (Math.random() > 0.5) vx *= -1;
                    if (Math.random() > 0.5) vy *= -1;

                    particles.push({
                         x: Math.random() * w,
                         y: Math.random() * h,
                         xv: Math.random() * vx,
                         yv: Math.random() * vy,
                    });
               }
          };

          // Update Particles
          const update = () => {
               particles.forEach(p => {
                    // Move
                    p.x += p.xv;
                    p.y += p.yv;

                    // Keep in bounds
                    if (p.x < 0) {
                         p.x = 0;
                         p.xv *= -1;
                    } else if (p.x > w) {
                         p.x = w;
                         p.xv *= -1;
                    }

                    if (p.y < 0) {
                         p.y = 0;
                         p.yv *= -1;
                    } else if (p.y > h) {
                         p.y = h;
                         p.yv *= -1;
                    }

                    // Attract
                    attractPt.forEach((locus: any) => {
                         const dx = locus.x - p.x;
                         const dy = locus.y - p.y;
                         const distSQ = dx * dx + dy * dy;
                         const dist = Math.sqrt(distSQ);
                         const force = locus.force / distSQ;
                         p.xv += force * dx / dist;
                         p.yv += force * dy / dist;
                    });

                    // Repel
                    repelPt.forEach((locus: any) => {
                         const dx = locus.x - p.x;
                         const dy = locus.y - p.y;
                         const distSQ = dx * dx + dy * dy;
                         const dist = Math.sqrt(distSQ);

                         if (dist < (locus.minDist || 0)) {
                              const tx = locus.x - (locus.minDist || 0) * dx / dist;
                              const ty = locus.y - (locus.minDist || 0) * dy / dist;
                              p.xv += (tx - p.x) * locus.force;
                              p.yv += (ty - p.y) * locus.force;
                         }
                    });

                    // Speed limit
                    const speed = Math.sqrt(p.xv * p.xv + p.yv * p.yv);
                    if (speed > MaxSpeed) {
                         p.xv = MaxSpeed * p.xv / speed;
                         p.yv = MaxSpeed * p.yv / speed;
                    }
               });
          };

          // Connect Particles
          const connect = () => {
               for (let i = 0; i < currentMaxParticles - 1; i++) {
                    const p1 = particles[i];

                    const behind1 =
                         (p1.x < midX && p1.xv > 0) ||
                         (p1.x >= midX && p1.xv < 0) ||
                         (p1.y < midY && p1.yv > 0) ||
                         (p1.y >= midY && p1.yv < 0);

                    p1.hue = getDistance(midX, p1.x, h * 0.5, p1.y) * 1.5 + 230;

                    for (let j = i + 1; j < currentMaxParticles; j++) {
                         const p2 = particles[j];

                         const behind2 =
                              (p2.x < midX && p2.xv > 0) ||
                              (p2.x >= midX && p2.xv < 0) ||
                              (p2.y < midY && p2.yv > 0) ||
                              (p2.y >= midY && p2.yv < 0);

                         const currentDist = getDistance(p2.x, p1.x, p2.y, p1.y);

                         if (currentDist < ConnectionDist) {
                              ctx.beginPath();
                              ctx.moveTo(p1.x, p1.y);
                              ctx.strokeStyle = \`hsla(\${p1.hue}, \${behind1 || behind2 ? 10 : 90}%, 50%, \${1 - currentDist * 90 / ConnectionDist * 0.01})\`;
                              ctx.lineTo(p2.x, p2.y);
                              ctx.stroke();
                         }
                    }
               }
          };

          // Animation Loop
          const animateLines = () => {
               canvas.width = w;
               update();
               connect();
               requestAnimationFrame(animateLines);
          };

          createParticles();
          animateLines();

          // Cleanup
          return () => {
               // Any cleanup if needed
          };
     }, []);

     return (

          <div className=" inset-0 overflow-hidden">
               <canvas
                    ref={canvasRef}
                    className="w-full h-full"
               />
          </div>


     );
};

export default ParticleNetwork;
`;

export const FilmGrainCode = `
import React, { useEffect, useRef } from 'react';

const FilmGrain: React.FC = () => {
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const noiseCanvas = noiseCanvasRef.current;
    const scratchCanvas = scratchCanvasRef.current;

    if (!noiseCanvas || !scratchCanvas) return;

    const noiseContext = noiseCanvas.getContext('2d');
    const scratchContext = scratchCanvas.getContext('2d');

    // Configuration
    const n = 100; // Time interval in milliseconds

    const resizeCanvas = () => {
      noiseCanvas.width = window.innerWidth;
      noiseCanvas.height = window.innerHeight;
      scratchCanvas.width = window.innerWidth;
      scratchCanvas.height = window.innerHeight;
      generateNoise();
      drawScratch();
    };

    const generateNoise = () => {
      if (!noiseContext) return;

      const width = noiseCanvas.width;
      const height = noiseCanvas.height;
      const imageData = noiseContext.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const color = Math.random() * 200;
        data[i] = color; // Red
        data[i + 1] = color; // Green
        data[i + 2] = color; // Blue
        data[i + 3] = 80; // Alpha (transparency)
      }

      noiseContext.putImageData(imageData, 0, 0);
    };

    const drawScratch = () => {
      if (!scratchContext) return;

      scratchContext.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

      for (let i = 0; i < 50; i++) {
        const x = Math.random() * scratchCanvas.width;
        const y = Math.random() * scratchCanvas.height;
        const width = Math.random() * 100 + 50;
        const height = Math.random() * 4 + 1;
        scratchContext.fillStyle = 'rgba(255, 255, 255, 0.5)';
        scratchContext.fillRect(x, y, width, height);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Set interval to regenerate noise and scratches
    const intervalId = setInterval(() => {
      generateNoise();
      drawScratch();
    }, n);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className=" inset-0 overflow-hidden">
      <canvas
        ref={noiseCanvasRef}
        className="absolute inset-0 mix-blend-hard-light"
      />
      <canvas
        ref={scratchCanvasRef}
        className="absolute inset-0 mix-blend-hard-light"
      />
    </div>
  );
};

export default FilmGrain;
`;
