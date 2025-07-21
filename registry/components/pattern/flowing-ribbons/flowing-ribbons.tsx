'use client';

import { useEffect, useRef, useCallback } from 'react';

interface FlowingRibbonsProps {
  backgroundColor?: string;
  lineColor?: string;
  animationSpeed?: number;
  removeWaveLine?: boolean;
}

const FlowingRibbons = ({
  backgroundColor = '#F0EEE6',
  lineColor = '#777777',
  animationSpeed = 0.3,
  removeWaveLine = true,
}: FlowingRibbonsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const waveDisturbances = useRef<
    Array<{ x: number; y: number; time: number; intensity: number }>
  >([]);
  const dprRef = useRef<number>(1);

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 200;
    return Math.max(0, 1 - distance / maxDistance);
  };

  const getWaveDisturbance = (
    x: number,
    y: number,
    currentTime: number
  ): number => {
    let totalDisturbance = 0;

    waveDisturbances.current.forEach((disturbance) => {
      const age = currentTime - disturbance.time;
      const maxAge = 3000;
      if (age < maxAge) {
        const dx = x - disturbance.x;
        const dy = y - disturbance.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const waveRadius = (age / maxAge) * 400;
        const waveWidth = 80;
        if (Math.abs(distance - waveRadius) < waveWidth) {
          const waveStrength = (1 - age / maxAge) * disturbance.intensity;
          const proximityToWave =
            1 - Math.abs(distance - waveRadius) / waveWidth;
          totalDisturbance +=
            waveStrength *
            proximityToWave *
            Math.sin((distance - waveRadius) * 0.1);
        }
      }
    });

    return totalDisturbance;
  };

  const deform = (
    x: number,
    y: number,
    t: number,
    progress: number
  ): { offsetX: number; offsetY: number } => {
    const mouseInfluence = getMouseInfluence(x, y);
    const disturbance = getWaveDisturbance(x, y, Date.now());

    const wave1 = Math.sin(progress * Math.PI * 4 + t * 0.01) * 30;
    const wave2 = Math.sin(progress * Math.PI * 7 - t * 0.008) * 15;
    const harmonic = Math.sin(x * 0.02 + y * 0.015 + t * 0.005) * 10;

    const mouseWave =
      mouseInfluence * Math.sin(t * 0.02 + progress * Math.PI * 2) * 20;
    const disturbanceWave =
      disturbance * Math.sin(t * 0.015 + progress * Math.PI * 3) * 25;

    return {
      offsetX: wave1 + harmonic + mouseWave + disturbanceWave,
      offsetY: wave2 + mouseWave * 0.5 + disturbanceWave * 0.7,
    };
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const rect = canvas.parentElement?.getBoundingClientRect();
    const displayWidth = rect?.width || window.innerWidth;
    const displayHeight = rect?.height || window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      ctx.scale(dpr, dpr);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    waveDisturbances.current.push({
      x,
      y,
      time: Date.now(),
      intensity: 2,
    });

    const now = Date.now();
    waveDisturbances.current = waveDisturbances.current.filter(
      (disturbance) => now - disturbance.time < 3000
    );
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentTime = Date.now();
    timeRef.current += animationSpeed;

    // Use CSS pixel dimensions for calculations
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const gridDensity = 80;
    const ribbonWidth = width * 0.85;
    const ribbonOffset = (width - ribbonWidth) / 2;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 0.5;

    // Draw vertical lines
    for (let i = 0; i < gridDensity; i++) {
      const x = ribbonOffset + (i / gridDensity) * ribbonWidth;

      ctx.beginPath();
      for (let j = 0; j <= gridDensity; j++) {
        const progress = (j / gridDensity) * 1.2 - 0.1;
        const y = progress * height;

        const { offsetX, offsetY } = deform(x, y, timeRef.current, progress);

        const finalX = x + offsetX;
        const finalY = y + offsetY;

        if (j === 0) {
          ctx.moveTo(finalX, finalY);
        } else {
          ctx.lineTo(finalX, finalY);
        }
      }
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let j = 0; j < gridDensity; j++) {
      const progress = (j / gridDensity) * 1.2 - 0.1;
      const y = progress * height;

      ctx.beginPath();
      for (let i = 0; i <= gridDensity; i++) {
        const x = ribbonOffset + (i / gridDensity) * ribbonWidth;

        const { offsetX, offsetY } = deform(x, y, timeRef.current, progress);

        const finalX = x + offsetX;
        const finalY = y + offsetY;

        if (i === 0) {
          ctx.moveTo(finalX, finalY);
        } else {
          ctx.lineTo(finalX, finalY);
        }
      }
      ctx.stroke();
    }

    // Draw wave disturbance effects
    if (!removeWaveLine) {
      waveDisturbances.current.forEach((disturbance) => {
        const age = currentTime - disturbance.time;
        const maxAge = 3000;
        if (age < maxAge) {
          const progress = age / maxAge;
          const radius = progress * 400;
          const alpha = (1 - progress) * 0.2 * disturbance.intensity;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.arc(disturbance.x, disturbance.y, radius, 0, 2 * Math.PI);
          ctx.stroke();

          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.5;
        }
      });
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [removeWaveLine, backgroundColor, lineColor, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    const handleResize = () => resizeCanvas();

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      timeRef.current = 0;
      waveDisturbances.current = [];
    };
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <div
      className='absolute inset-0 w-full h-full overflow-hidden'
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className='block w-full h-full' />
    </div>
  );
};

export default FlowingRibbons;
