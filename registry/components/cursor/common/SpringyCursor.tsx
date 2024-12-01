'use client';

import React, { useEffect, useRef } from 'react';

interface SpringyCursorProps {
  emoji?: string;
  wrapperElement?: HTMLElement;
}

const SpringyCursor: React.FC<SpringyCursorProps> = ({
  emoji = '⚽',
  wrapperElement,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const nDots = 7;
  const DELTAT = 0.01;
  const SEGLEN = 10;
  const SPRINGK = 10;
  const MASS = 1;
  const GRAVITY = 50;
  const RESISTANCE = 10;
  const STOPVEL = 0.1;
  const STOPACC = 0.1;
  const DOTSIZE = 11;
  const BOUNCE = 0.7;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    let canvas: HTMLCanvasElement | null = null;
    let context: CanvasRenderingContext2D | null = null;

    const init = () => {
      if (prefersReducedMotion.matches) {
        console.log(
          'This browser has prefers reduced motion turned on, so the cursor did not init'
        );
        return false;
      }

      canvas = canvasRef.current;
      if (!canvas) return;

      context = canvas.getContext('2d');
      if (!context) return;

      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.pointerEvents = 'none';

      if (wrapperElement) {
        canvas.style.position = 'absolute';
        wrapperElement.appendChild(canvas);
        canvas.width = wrapperElement.clientWidth;
        canvas.height = wrapperElement.clientHeight;
      } else {
        canvas.style.position = 'fixed';
        document.body.appendChild(canvas);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Save emoji as an image for performance
      context.font = '16px serif';
      context.textBaseline = 'middle';
      context.textAlign = 'center';

      const measurements = context.measureText(emoji);
      const bgCanvas = document.createElement('canvas');
      const bgContext = bgCanvas.getContext('2d');

      if (bgContext) {
        bgCanvas.width = measurements.width;
        bgCanvas.height = measurements.actualBoundingBoxAscent * 2;

        bgContext.textAlign = 'center';
        bgContext.font = '16px serif';
        bgContext.textBaseline = 'middle';
        bgContext.fillText(
          emoji,
          bgCanvas.width / 2,
          measurements.actualBoundingBoxAscent
        );

        for (let i = 0; i < nDots; i++) {
          particlesRef.current[i] = new Particle(bgCanvas);
        }
      }

      bindEvents();
      loop();
    };

    const bindEvents = () => {
      const element = wrapperElement || document.body;
      element.addEventListener('mousemove', onMouseMove);
      element.addEventListener('touchmove', onTouchMove, { passive: true });
      element.addEventListener('touchstart', onTouchMove, { passive: true });
      window.addEventListener('resize', onWindowResize);
    };

    const onWindowResize = () => {
      if (!canvasRef.current) return;

      if (wrapperElement) {
        canvasRef.current.width = wrapperElement.clientWidth;
        canvasRef.current.height = wrapperElement.clientHeight;
      } else {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        if (wrapperElement) {
          const boundingRect = wrapperElement.getBoundingClientRect();
          cursorRef.current.x = e.touches[0].clientX - boundingRect.left;
          cursorRef.current.y = e.touches[0].clientY - boundingRect.top;
        } else {
          cursorRef.current.x = e.touches[0].clientX;
          cursorRef.current.y = e.touches[0].clientY;
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
    };

    const updateParticles = () => {
      if (!canvasRef.current || !context) return;

      canvasRef.current.width = canvasRef.current.width;

      // follow mouse
      particlesRef.current[0].position.x = cursorRef.current.x;
      particlesRef.current[0].position.y = cursorRef.current.y;

      // Start from 2nd dot
      for (let i = 1; i < nDots; i++) {
        let spring = new Vec(0, 0);

        if (i > 0) {
          springForce(i - 1, i, spring);
        }

        if (i < nDots - 1) {
          springForce(i + 1, i, spring);
        }

        let resist = new Vec(
          -particlesRef.current[i].velocity.x * RESISTANCE,
          -particlesRef.current[i].velocity.y * RESISTANCE
        );

        let accel = new Vec(
          (spring.X + resist.X) / MASS,
          (spring.Y + resist.Y) / MASS + GRAVITY
        );

        particlesRef.current[i].velocity.x += DELTAT * accel.X;
        particlesRef.current[i].velocity.y += DELTAT * accel.Y;

        if (
          Math.abs(particlesRef.current[i].velocity.x) < STOPVEL &&
          Math.abs(particlesRef.current[i].velocity.y) < STOPVEL &&
          Math.abs(accel.X) < STOPACC &&
          Math.abs(accel.Y) < STOPACC
        ) {
          particlesRef.current[i].velocity.x = 0;
          particlesRef.current[i].velocity.y = 0;
        }

        particlesRef.current[i].position.x +=
          particlesRef.current[i].velocity.x;
        particlesRef.current[i].position.y +=
          particlesRef.current[i].velocity.y;

        let height = canvasRef.current.clientHeight;
        let width = canvasRef.current.clientWidth;

        if (particlesRef.current[i].position.y >= height - DOTSIZE - 1) {
          if (particlesRef.current[i].velocity.y > 0) {
            particlesRef.current[i].velocity.y =
              BOUNCE * -particlesRef.current[i].velocity.y;
          }
          particlesRef.current[i].position.y = height - DOTSIZE - 1;
        }

        if (particlesRef.current[i].position.x >= width - DOTSIZE) {
          if (particlesRef.current[i].velocity.x > 0) {
            particlesRef.current[i].velocity.x =
              BOUNCE * -particlesRef.current[i].velocity.x;
          }
          particlesRef.current[i].position.x = width - DOTSIZE - 1;
        }

        if (particlesRef.current[i].position.x < 0) {
          if (particlesRef.current[i].velocity.x < 0) {
            particlesRef.current[i].velocity.x =
              BOUNCE * -particlesRef.current[i].velocity.x;
          }
          particlesRef.current[i].position.x = 0;
        }

        particlesRef.current[i].draw(context);
      }
    };

    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    class Vec {
      X: number;
      Y: number;

      constructor(X: number, Y: number) {
        this.X = X;
        this.Y = Y;
      }
    }

    function springForce(i: number, j: number, spring: Vec) {
      let dx =
        particlesRef.current[i].position.x - particlesRef.current[j].position.x;
      let dy =
        particlesRef.current[i].position.y - particlesRef.current[j].position.y;
      let len = Math.sqrt(dx * dx + dy * dy);
      if (len > SEGLEN) {
        let springF = SPRINGK * (len - SEGLEN);
        spring.X += (dx / len) * springF;
        spring.Y += (dy / len) * springF;
      }
    }

    class Particle {
      position: { x: number; y: number };
      velocity: { x: number; y: number };
      canv: HTMLCanvasElement;

      constructor(canvasItem: HTMLCanvasElement) {
        this.position = { x: cursorRef.current.x, y: cursorRef.current.y };
        this.velocity = { x: 0, y: 0 };
        this.canv = canvasItem;
      }

      draw(context: CanvasRenderingContext2D) {
        context.drawImage(
          this.canv,
          this.position.x - this.canv.width / 2,
          this.position.y - this.canv.height / 2,
          this.canv.width,
          this.canv.height
        );
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
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('touchmove', onTouchMove);
      element.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [emoji, wrapperElement]);

  return <canvas ref={canvasRef} />;
};

export default SpringyCursor;
