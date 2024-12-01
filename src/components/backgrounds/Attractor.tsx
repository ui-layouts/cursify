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
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    let attractors: (() => void)[] = [];
    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
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
    <div className="w-full h-full bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
      />
      <div
        className="w-full h-full p-4 font-mono"
      >
        <h1 className='font-bold text-5xl text-center text-red-600'> Move mouse and click to regenerate</h1>
      </div>
    </div>
  );
};

export default Attractor;