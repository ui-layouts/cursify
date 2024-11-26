
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import { SnowflakeCursor } from "../cursor/common/SnowflakeCursor";

const SnowflakeCursorExample = () => {
  const codeToDisplay = `
import React, { useEffect, useRef } from "react";

interface SnowflakeCursorOptions {
  element?: HTMLElement;
}

export const SnowflakeCursor: React.FC<SnowflakeCursorOptions> = ({ element }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<any[]>([]);
  const canvImages = useRef<HTMLCanvasElement[]>([]);
  const animationFrame = useRef<number | null>(null);
  const possibleEmoji = ["❄️"];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;

    const targetElement = element || document.body;

    canvas.style.position = element ? "absolute" : "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";

    targetElement.appendChild(canvas);
    canvasRef.current = canvas;

    const setCanvasSize = () => {
      canvas.width = element ? targetElement.clientWidth : window.innerWidth;
      canvas.height = element ? targetElement.clientHeight : window.innerHeight;
    };

    const createEmojiImages = () => {
      context.font = "12px serif";
      context.textBaseline = "middle";
      context.textAlign = "center";

      possibleEmoji.forEach((emoji) => {
        const measurements = context.measureText(emoji);
        const bgCanvas = document.createElement("canvas");
        const bgContext = bgCanvas.getContext("2d");
        if (!bgContext) return;

        bgCanvas.width = measurements.width;
        bgCanvas.height = measurements.actualBoundingBoxAscent * 2;

        bgContext.textAlign = "center";
        bgContext.font = "12px serif";
        bgContext.textBaseline = "middle";
        bgContext.fillText(
          emoji,
          bgCanvas.width / 2,
          measurements.actualBoundingBoxAscent
        );

        canvImages.current.push(bgCanvas);
      });
    };

    const addParticle = (x: number, y: number) => {
      const randomImage =
        canvImages.current[Math.floor(Math.random() * canvImages.current.length)];
      particles.current.push(new Particle(x, y, randomImage));
    };

    const onMouseMove = (e: MouseEvent) => {
      const x = element ? e.clientX - targetElement.getBoundingClientRect().left : e.clientX;
      const y = element ? e.clientY - targetElement.getBoundingClientRect().top : e.clientY;
      addParticle(x, y);
    };

    const updateParticles = () => {
      if (!context || !canvas) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((particle, index) => {
        particle.update(context);
        if (particle.lifeSpan < 0) {
          particles.current.splice(index, 1);
        }
      });
    };

    const animationLoop = () => {
      updateParticles();
      animationFrame.current = requestAnimationFrame(animationLoop);
    };

    const init = () => {
      if (prefersReducedMotion.matches) return;

      setCanvasSize();
      createEmojiImages();

      targetElement.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", setCanvasSize);

      animationLoop();
    };

    const destroy = () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      targetElement.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", setCanvasSize);
    };

    prefersReducedMotion.onchange = () => {
      if (prefersReducedMotion.matches) {
        destroy();
      } else {
        init();
      }
    };

    init();
    return () => destroy();
  }, [element]);

  return null;
};

/**
 * Particle Class
 */
class Particle {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  lifeSpan: number;
  initialLifeSpan: number;
  canv: HTMLCanvasElement;

  constructor(x: number, y: number, canvasItem: HTMLCanvasElement) {
    this.position = { x, y };
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: 1 + Math.random(),
    };
    this.lifeSpan = Math.floor(Math.random() * 60 + 80);
    this.initialLifeSpan = this.lifeSpan;
    this.canv = canvasItem;
  }

  update(context: CanvasRenderingContext2D) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.lifeSpan--;

    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
    this.velocity.y -= Math.random() / 300;

    const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

    context.save();
    context.translate(this.position.x, this.position.y);
    context.scale(scale, scale);
    context.drawImage(this.canv, -this.canv.width / 2, -this.canv.height / 2);
    context.restore();
  }
}

  `;



  return (
    <DocumentLayout
      title="Snowflake Cursor"
      description="Interactive snowflake cursor tracking component"
      keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'snowflake cursor']}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="Snowflake Cursor Component"
        description="A React component that adds a charming snowflake effect, following the cursor's movement."
      >
        <LivePreviewCard>
          <SnowflakeCursor />
        </LivePreviewCard>
      </ComponentCard>

      {/* Implementation Section */}
      <ComponentCard
        title="Component Implementation"
        description="Detailed code breakdown of the Snowflake Cursor component."
      >
        <div className="space-y-4">
          {/* Code Example for Snowflake Cursor Component */}
          <CodeExample
            title="Create SnowflakeCursor.tsx Component"
            code={codeToDisplay}
            fileName="./SnowflakeCursor.tsx"
            badgeText="TSX"
          />

        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default SnowflakeCursorExample;
