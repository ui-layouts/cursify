// @ts-nocheck

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClickEffectCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [clicks, setClicks] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);

  // Handle mouse movement
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add point to trail
      setTrail((prev) => [
        ...prev.slice(-20),
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const handleClick = (e) => {
    const newClick = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };
    setClicks((prev) => [...prev, newClick]);

    // Remove click effect after animation
    setTimeout(() => {
      setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
    }, 1000);
  };

  return (
    <div
      className='w-full bg-black'
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Mouse trail */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className='fixed pointer-events-none'
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            style={{
              left: point.x,
              top: point.y,
              transform: 'translate(-50%, -50%)',
            }}
            transition={{ duration: 0.5 }}
          >
            <div
              className='w-2 h-2 bg-pink-400 rounded-full'
              style={{
                opacity: (index / trail.length) * 0.5,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main cursor */}
      {mousePosition.x !== null && mousePosition.y !== null && (
        <motion.div
          className='fixed pointer-events-none z-50'
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 28,
            mass: 0.5,
          }}
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className='relative'>
            <div className='w-6 h-6 bg-pink-500 rounded-full mix-blend-screen' />
            <div className='absolute inset-0 w-6 h-6 border-2 border-pink-300 rounded-full animate-ping' />
          </div>
        </motion.div>
      )}

      {/* Click effects */}
      <AnimatePresence>
        {clicks.map((click) => (
          <React.Fragment key={click.id}>
            {/* Ripple effect */}
            <motion.div
              className='fixed pointer-events-none'
              style={{
                left: click.x,
                top: click.y,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className='w-12 h-12 border-2 border-pink-400 rounded-full' />
            </motion.div>

            {/* Particle explosion */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className='fixed pointer-events-none w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full'
                style={{
                  left: click.x,
                  top: click.y,
                }}
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI) / 6) * 80,
                  y: Math.sin((i * Math.PI) / 6) * 80,
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  times: [0, 0.2, 1],
                }}
              />
            ))}
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickEffectCursor;
