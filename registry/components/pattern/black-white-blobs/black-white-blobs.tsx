"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface BlackWhiteBlobsProps {
  backgroundColor?: string;
  textColor?: string;
  animationSpeed?: number;
}

type Pattern = (x: number, y: number, t: number) => number;

const BlackWhiteBlobs = ({
  backgroundColor = "#F0EEE6",
  textColor = "#333",
}: BlackWhiteBlobsProps) => {
  const [frame, setFrame] = useState(0);
  const [patternType, setPatternType] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 80, height: 45 });
  const mouseInfluenceRef = useRef<
    Array<{ x: number; y: number; time: number; intensity: number }>
  >([]);

  const slowdownFactor = 12;

  const patterns: Record<string, Pattern> = {
    balance: (x, y, t) => {
      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return Math.sin(dx * 0.3 + t * 0.5) * Math.cos(dy * 0.3 + t * 0.3) * Math.sin(dist * 0.1 - t * 0.4);
    },
    duality: (x, y, t) => {
      const cx = dimensions.width / 2;
      const left = x < cx ? Math.sin(x * 0.2 + t * 0.3) : 0;
      const right = x >= cx ? Math.cos(x * 0.2 - t * 0.3) : 0;
      return left + right + Math.sin(y * 0.3 + t * 0.2);
    },
    flow: (x, y, t) => {
      const angle = Math.atan2(y - dimensions.height / 2, x - dimensions.width / 2);
      const dist = Math.sqrt((x - dimensions.width / 2) ** 2 + (y - dimensions.height / 2) ** 2);
      return Math.sin(angle * 3 + t * 0.4) * Math.cos(dist * 0.1 - t * 0.3);
    },
    chaos: (x, y, t) => {
      const noise1 = Math.sin(x * 0.5 + t) * Math.cos(y * 0.3 - t);
      const noise2 = Math.sin(y * 0.4 + t * 0.5) * Math.cos(x * 0.2 + t * 0.7);
      const noise3 = Math.sin((x + y) * 0.2 + t * 0.8);
      return noise1 * 0.3 + noise2 * 0.3 + noise3 * 0.4;
    },
  };

  const patternTypes = ["balance", "duality", "flow", "chaos"];

  const getMouseInfluence = (x: number, y: number, currentTime: number): number => {
    let totalInfluence = 0;
    mouseInfluenceRef.current.forEach((influence) => {
      const age = currentTime - influence.time;
      const maxAge = 3000;
      if (age < maxAge) {
        const dx = x - influence.x;
        const dy = y - influence.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 15;
        if (distance < maxDistance) {
          const strength = (1 - age / maxAge) * influence.intensity;
          const proximity = 1 - distance / maxDistance;
          totalInfluence += strength * proximity;
        }
      }
    });
    return totalInfluence;
  };

  const generateAsciiArt = useCallback(() => {
    const { width, height } = dimensions;
    const t = (frame * Math.PI) / (60 * slowdownFactor);
    const currentPattern = patterns[patternTypes[patternType]];
    const currentTime = Date.now();
    let result = "";

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let value = currentPattern(x, y, t);
        if (mouseDown && containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const dx = x - (mousePos.x / rect.width) * width;
          const dy = y - (mousePos.y / rect.height) * height;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseInfluence = Math.exp(-dist * 0.1) * Math.sin(t * 2);
          value += mouseInfluence * 0.8;
        }
        const clickInfluence = getMouseInfluence(x, y, currentTime);
        value += clickInfluence * Math.sin(t * 3);

        if (value > 0.8) {
          result += "█";
        } else if (value > 0.5) {
          result += "▓";
        } else if (value > 0.2) {
          result += "▒";
        } else if (value > -0.2) {
          result += "░";
        } else if (value > -0.5) {
          result += "·";
        } else {
          result += " ";
        }
      }
      result += "\n";
    }
    return result;
  }, [frame, patternType, mousePos, mouseDown, dimensions, slowdownFactor]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({
        width: Math.floor(width / 10), // adjust cell density
        height: Math.floor(height / 20),
      });
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const animate = () => {
      setFrame((f) => (f + 1) % (240 * slowdownFactor));
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animationFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [slowdownFactor]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden "
      style={{
        backgroundColor,
        userSelect: "none",
      }}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseDown={(e) => {
        setMouseDown(true);
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width) * dimensions.width;
        const y = ((e.clientY - rect.top) / rect.height) * dimensions.height;
        mouseInfluenceRef.current.push({ x, y, time: Date.now(), intensity: 1.5 });
        mouseInfluenceRef.current = mouseInfluenceRef.current.filter(
          (inf) => Date.now() - inf.time < 3000
        );
      }}
      onMouseUp={() => setMouseDown(false)}
      onClick={() => setPatternType((prev) => (prev + 1) % patternTypes.length)}
    >
      <pre
        style={{
          fontFamily: "monospace",
          fontSize: "clamp(8px, 1.5vw, 16px)",
          lineHeight: "1",
          letterSpacing: "0.05em",
          color: textColor,
          margin: 0,
          padding: 0,
          whiteSpace: "pre",
        }}
      >
        {generateAsciiArt()}
      </pre>
    </div>
  );
};

export default BlackWhiteBlobs;
