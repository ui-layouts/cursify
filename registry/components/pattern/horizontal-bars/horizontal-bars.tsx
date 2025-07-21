'use client';

import { useEffect, useRef, useCallback } from 'react';

interface HorizontalFlowBarsProps {
  backgroundColor?: string;
  lineColor?: string;
  barColor?: string;
  lineWidth?: number;
  removeWaveLine?: boolean;
  animationSpeed?: number;
}

// Add a hex to RGB conversion helper function at the top of the component
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  // Remove # if present
  const cleanHex = hex.charAt(0) === '#' ? hex.substring(1) : hex;
  // Parse hex values
  const r = Number.parseInt(cleanHex.substring(0, 2), 16);
  const g = Number.parseInt(cleanHex.substring(2, 4), 16);
  const b = Number.parseInt(cleanHex.substring(4, 6), 16);
  return { r, g, b };
};

const HorizontalFlowBars = ({
  backgroundColor = '#F0EEE6',
  lineColor = '#444',
  barColor = '#000000',
  lineWidth = 1,
  removeWaveLine = true,
  animationSpeed = 0.0005,
}: HorizontalFlowBarsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const ripples = useRef<
    Array<{ x: number; y: number; time: number; intensity: number }>
  >([]);
  const dprRef = useRef<number>(1);

  const noise = (x: number, y: number, t: number): number => {
    const n =
      Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t) +
      Math.sin(x * 0.015 - t) * Math.cos(y * 0.005 + t);
    return (n + 1) / 2;
  };

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 200;
    return Math.max(0, 1 - distance / maxDistance);
  };

  const getRippleInfluence = (
    x: number,
    y: number,
    currentTime: number
  ): number => {
    let totalInfluence = 0;
    ripples.current.forEach((ripple) => {
      const age = currentTime - ripple.time;
      const maxAge = 2000;
      if (age < maxAge) {
        const dx = x - ripple.x;
        const dy = y - ripple.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rippleRadius = (age / maxAge) * 300;
        const rippleWidth = 50;
        if (Math.abs(distance - rippleRadius) < rippleWidth) {
          const rippleStrength = (1 - age / maxAge) * ripple.intensity;
          const proximityToRipple =
            1 - Math.abs(distance - rippleRadius) / rippleWidth;
          totalInfluence += rippleStrength * proximityToRipple;
        }
      }
    });
    return Math.min(totalInfluence, 2);
  };

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    // Set the actual size in memory (scaled up for high DPI)
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    // Scale the canvas back down using CSS
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    // Scale the drawing context so everything draws at the correct size
    const ctx = canvas.getContext('2d');
    if (ctx) {
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

    ripples.current.push({
      x,
      y,
      time: Date.now(),
      intensity: 1.5,
    });

    const now = Date.now();
    ripples.current = ripples.current.filter(
      (ripple) => now - ripple.time < 2000
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

    timeRef.current += animationSpeed;
    const currentTime = Date.now();

    // Use CSS pixel dimensions for calculations
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    const numLines = Math.floor(canvasWidth / 15);
    const lineSpacing = canvasWidth / numLines;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < numLines; i++) {
      const x = i * lineSpacing + lineSpacing / 2;

      // Draw vertical line with mouse influence
      const mouseInfluence = getMouseInfluence(x, canvasHeight / 2);
      const lineAlpha = Math.max(0.3, 0.3 + mouseInfluence * 0.7);

      ctx.beginPath();
      const lineRgb = hexToRgb(lineColor);
      ctx.strokeStyle = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, ${lineAlpha})`;
      ctx.lineWidth = lineWidth + mouseInfluence * 2;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();

      for (let y = 0; y < canvasHeight; y += 8) {
        const noiseVal = noise(x, y, timeRef.current);
        const mouseInfl = getMouseInfluence(x, y);
        const rippleInfl = getRippleInfluence(x, y, currentTime);
        const totalInfluence = mouseInfl + rippleInfl;

        const threshold = Math.max(
          0.2,
          0.5 - mouseInfl * 0.2 - Math.abs(rippleInfl) * 0.1
        );

        if (noiseVal > threshold) {
          const barWidth = 2 + noiseVal * 3 + totalInfluence * 3;
          const barHeight = 3 + noiseVal * 10 + totalInfluence * 5;

          const baseAnimation =
            Math.sin(timeRef.current + x * 0.0375) * 20 * noiseVal;
          const mouseAnimation = mouseRef.current.isDown
            ? Math.sin(timeRef.current * 3 + y * 0.01) * 10 * mouseInfl
            : 0;
          const rippleAnimation =
            rippleInfl * Math.sin(timeRef.current * 2 + y * 0.02) * 15;

          const animatedY =
            y + baseAnimation + mouseAnimation + rippleAnimation;

          // Color intensity based on influence
          const intensity = Math.min(
            1,
            Math.max(0.7, 0.7 + totalInfluence * 0.3)
          );
          const barRgb = hexToRgb(barColor);
          ctx.fillStyle = `rgba(${barRgb.r}, ${barRgb.g}, ${barRgb.b}, ${intensity})`;

          ctx.fillRect(
            x - barWidth / 2,
            animatedY - barHeight / 2,
            barWidth,
            barHeight
          );
        }
      }
    }

    // Draw ripple effects
    if (!removeWaveLine) {
      ripples.current.forEach((ripple) => {
        const age = currentTime - ripple.time;
        const maxAge = 2000;
        if (age < maxAge) {
          const progress = age / maxAge;
          const radius = progress * 300;
          const alpha = (1 - progress) * 0.3 * ripple.intensity;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.arc(ripple.x, ripple.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [
    backgroundColor,
    lineColor,
    removeWaveLine,
    barColor,
    lineWidth,
    animationSpeed,
  ]);

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
      ripples.current = [];
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

export default HorizontalFlowBars;
