'use client';
import { useRef, useEffect, useState, useCallback, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticProps {
  magneticDistance?: number;
  strength?: number;
  stiffness?: number;
  damping?: number;
  children: ReactNode | ((isHovering: boolean) => ReactNode);
}

function Magnetic({
  magneticDistance = 200,
  strength = 0.9,
  stiffness = 80,
  damping = 10,
  children,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });
  const [isHovering, setIsHovering] = useState(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < magneticDistance) {
        const pull = Math.pow(1 - dist / magneticDistance, 0.5);
        x.set(dx * pull * strength);
        y.set(dy * pull * strength);
        setIsHovering(true);
      } else {
        x.set(0);
        y.set(0);
        setIsHovering(false);
      }
    },
    [x, y, magneticDistance, strength]
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {typeof children === 'function' ? children(isHovering) : children}
    </motion.div>
  );
}

export default function MagneticCursor() {
  return (
    <div className='grid place-items-center h-full'>
      <Magnetic>
        {(hovering) => (
          <button
            onClick={() => alert('clicked!')}
            className={cn(
              `
              w-36 h-36 border-red-500 border rounded-full text-xs tracking-widest uppercase font-semibold 
              cursor-pointer transition-all duration-400 outline-none
            
            `,
              hovering
                ? 'shadow-[0_0_60px_rgba(255,140,120,0.45),0_0_120px_rgba(255,140,120,0.15)]'
                : 'shadow-[0_4px_28px_rgba(255,140,120,0.22)]',
              hovering && 'scale-105 bg-red-500 text-white'
            )}
          >
            ENTER
          </button>
        )}
      </Magnetic>
    </div>
  );
}
