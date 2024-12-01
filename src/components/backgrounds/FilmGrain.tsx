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
