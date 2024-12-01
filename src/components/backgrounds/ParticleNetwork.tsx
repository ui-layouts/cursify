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
                              ctx.strokeStyle = `hsla(${p1.hue}, ${behind1 || behind2 ? 10 : 90}%, 50%, ${1 - currentDist * 90 / ConnectionDist * 0.01})`;
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