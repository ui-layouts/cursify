import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Carousel: React.FC = () => {
  const [active, setActive] = useState(0);
  const progressRef = useRef(50);
  const [isInteracting, setIsInteracting] = useState(false);
  const startX = useRef(0);
  const $items = useRef<HTMLDivElement[]>([]);
  const $overlay = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const items = useMemo(() => [
    { 
      id: 1, 
      title: 'Virat Kohli 🏏', 
      image: 'https://assets.bcci.tv/watermarkoutput/bcci/photos/1568/d1ea7791-ddee-489b-b091-4f99c5b30a2c.jpg', 
      color: 'from-red-500 to-orange-500' 
    },
    { 
      id: 2, 
      title: 'Rohit Sharma 💥', 
      image: 'https://assets.bcci.tv/watermarkoutput/bcci/photos/1568/482b43c1-1ae8-4e0a-9e6b-1a855f6c4ed2.jpg', 
      color: 'from-blue-500 to-indigo-500' 
    },
    { 
      id: 3, 
      title: 'MS Dhoni 🦁', 
      image: 'https://assets.bcci.tv/watermarkoutput/bcci/photos/1566/d49e1e14-08dc-4940-98b7-c7e73cba3dba.jpg', 
      color: 'from-yellow-500 to-amber-500' 
    },
    { 
      id: 4, 
      title: 'Jasprit Bumrah 🚀', 
      image: 'https://assets.bcci.tv/watermarkoutput/bcci/photos/1529/20c76e9f-8818-48cd-8461-06564064ec85.jpg', 
      color: 'from-green-500 to-teal-500' 
    },
    { 
      id: 5, 
      title: 'Ravindra Jadeja 🏆', 
      image: 'https://assets.bcci.tv/watermarkoutput/bcci/photos/1529/ec51ff5e-b2c0-4793-ad62-11dc32f3d37e.jpg', 
      color: 'from-purple-500 to-violet-500' 
    },
    { 
      id: 6, 
      title: 'Shubman Gill 🌟', 
      image: 'https://assets.bcci.tv/watermarkoutput/bcci/photos/1529/dfce3fd4-194e-493d-95ff-c0e21d449dfa.jpg', 
      color: 'from-pink-500 to-rose-500' 
    },

  ], []);

  const clamp = useCallback((value: number, min: number, max: number) => 
    Math.max(min, Math.min(max, value)), []);

  const calculateActiveIndex = useCallback((progress: number) => {
    return Math.floor((progress / 100) * (items.length - 1));
  }, [items]);

  const animateItems = useCallback(() => {
    const progress = progressRef.current;
    const activeIndex = calculateActiveIndex(progress);
    setActive(activeIndex);

    // Animate background
    if ($overlay.current) {
      gsap.to($overlay.current, {
        background: `linear-gradient(to bottom right, ${items[activeIndex].color})`,
        duration: 0.6,
        ease: 'power1.inOut'
      });
    }

    // Animate individual items
    $items.current.forEach((item, index) => {
      if (!item) return;

      const isActive = index === activeIndex;
      const isNearActive = Math.abs(index - activeIndex) <= 1;

      gsap.to(item, {
        duration: 0.6,
        opacity: isActive ? 1 : (isNearActive ? 0.7 : 0.3),
        scale: isActive ? 1.1 : (isNearActive ? 1 : 0.9),
        x: (index - activeIndex) * 150 + '%',
        rotationY: (index - activeIndex) * 20,
        ease: 'power2.out',
        zIndex: isActive ? 10 : 1
      });
    });
  }, [calculateActiveIndex, items]);

  const updateProgress = useCallback((delta: number) => {
    const newProgress = clamp(progressRef.current + delta, 0, 100);
    progressRef.current = newProgress;
    
    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Use requestAnimationFrame for smoother updates
    animationFrameRef.current = requestAnimationFrame(animateItems);
  }, [clamp, animateItems]);

  const handleWheel = useCallback((e: WheelEvent) => {
    updateProgress(e.deltaY * 0.02);
  }, [updateProgress]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isInteracting) return;
    const x = e.clientX || 0;
    const delta = (x - startX.current) * -0.1;
    startX.current = x;
    updateProgress(delta);
  }, [isInteracting, updateProgress]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    setIsInteracting(true);
    startX.current = e.clientX || 0;
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsInteracting(false);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') updateProgress(-10);
    if (e.key === 'ArrowRight') updateProgress(10);
  }, [updateProgress]);

  useEffect(() => {
    // Initial animation
    animateItems();

    // Event listeners
    document.addEventListener('mousewheel', handleWheel, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('mousewheel', handleWheel);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchstart', handleMouseDown);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('keydown', handleKeyDown);

      // Cancel any ongoing animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    handleWheel, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp, 
    handleKeyDown, 
    animateItems
  ]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Overlay */}
      <div 
        ref={$overlay} 
        className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-br from-black to-purple-900 transition-all duration-600"
      />

      {/* Title and Number Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center">
        <div className="text-white text-center space-y-4">
          <motion.h2 
            key={active}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold"
          >
            {items[active].title}
          </motion.h2>
          <motion.div 
            key={`number-${active}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl"
          >
            {`0${active + 1}`}
          </motion.div>
        </div>
      </div>

      {/* Carousel Items */}
      <div className="absolute top-0 left-0 w-full h-full z-5 flex justify-center items-center">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="carousel-item absolute transition-all duration-500"
            ref={(el) => (el ? ($items.current[index] = el) : null)}
            initial={{ opacity: 0, x: '100%' }}
            animate={{
              opacity: 1 - Math.abs(index - active) * 0.2,
              x: `${(index - active) * 150}%`,
            }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              progressRef.current = (index / items.length) * 100 + 10;
              animateItems();
            }}
          >
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full opacity-50 rounded-xl shadow-2xl"
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl z-20 cursor-pointer">
        <button 
          onClick={() => {
            updateProgress(-10);
          }}
          className="hover:scale-110 transition-transform"
        >
          ❮
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl z-20 cursor-pointer">
        <button 
          onClick={() => {
            updateProgress(10);
          }}
          className="hover:scale-110 transition-transform"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;