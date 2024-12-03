'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
}

const SwirlCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const colors = ['#FF3366', '#33FF66', '#3366FF', '#FFFF33'];

    const createPoint = (x: number, y: number): Point => ({
      x,
      y,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const addPoint = (x: number, y: number) => {
      if (pointsRef.current.length < 100) {
        pointsRef.current.push(createPoint(x, y));
      }
    };

    const updatePoints = () => {
      pointsRef.current.forEach((point) => {
        point.x += point.dx;
        point.y += point.dy;

        if (point.x < 0 || point.x > canvas.width) point.dx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.dy *= -1;

        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          point.dx += dx * 0.01;
          point.dy += dy * 0.01;
        }
      });
    };

    const drawPoints = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current.forEach((point, index) => {
        const nextPoint =
          pointsRef.current[(index + 1) % pointsRef.current.length];

        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.strokeStyle = point.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
      });
    };

    const animate = () => {
      updatePoints();
      drawPoints();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      addPoint(event.clientX, event.clientY);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default SwirlCursor;
