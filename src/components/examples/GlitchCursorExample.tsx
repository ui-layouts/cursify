import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import GlitchCursor from "../cursor/common/GlitchCursor";
import { useMouseCode } from '@/constants/constant-hooks';

const GlitchCursorExample = () => {
  const CodeToDisplay = `
import React, { useState, useEffect } from 'react';
import { useMouse } from '@/hooks/use-mouse';


const GlitchCursor = () => {
  const [mouseState, ref] = useMouse();
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchOffsets, setGlitchOffsets] = useState([]);
  const [intensity, setIntensity] = useState(1);

  useEffect(() => {
    let interval;
    if (glitchActive) {
      interval = setInterval(() => {
        const newOffsets = Array(5).fill(0).map(() => ({
          x: (Math.random() - 0.5) * 20 * intensity,
          y: (Math.random() - 0.5) * 20 * intensity,
          scale: 0.8 + Math.random() * 0.4,
          rotation: (Math.random() - 0.5) * 45 * intensity,
          opacity: 0.5 + Math.random() * 0.5,
          hue: Math.random() * 360,
        }));
        setGlitchOffsets(newOffsets);
      }, 50);
    } else {
      setGlitchOffsets([]);
    }
    return () => clearInterval(interval);
  }, [glitchActive, intensity]);

  const handleMouseSpeed = (e) => {
    const speed = Math.sqrt(
      Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2)
    );
    setIntensity(Math.min(Math.max(speed / 10, 1), 3));
  };

  return (
    <div 
      className="relative w-full h-screen bg-gray-900" 
      ref={ref}
      onMouseMove={handleMouseSpeed}
    >
      {mouseState.x !== null && mouseState.y !== null && (
        <>
          {/* Glitch layers */}
          {glitchOffsets.map((offset, index) => (
            <div
              key={index}
              className="fixed pointer-events-none mix-blend-screen"
              style={{
                left: mouseState.x + offset.x,
                top: mouseState.y + offset.y,
                transform: \`translate(-50 %, -50 %)
  scale(\${ offset.scale })
  rotate(\${ offset.rotation }deg)\`,
                opacity: offset.opacity,
              }}
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  background: \`hsl(\${ offset.hue }, 100 %, 50 %)\`,
                  filter: 'blur(2px)',
                }}
              />
            </div>
          ))}

          {/* Main cursor */}
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: mouseState.x,
              top: mouseState.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-8 h-8 bg-white rounded-full mix-blend-screen" />
          </div>

          {/* Static effect overlay */}
          {glitchActive && (
            <div
              className="fixed pointer-events-none mix-blend-screen"
              style={{
                left: mouseState.x,
                top: mouseState.y,
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                background: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")\`,
                opacity: 0.3,
              }}
            />
          )}
        </>
      )}

      <div className="flex flex-col items-center justify-center h-full gap-8">
        <button
          className={\`px - 8 py - 4 bg - red - 600 / 30 text - white rounded - lg transition - all duration - 300 relative overflow - hidden
            \${ glitchActive ? 'animate-pulse' : '' } \`}
          onMouseEnter={() => setGlitchActive(true)}
          onMouseLeave={() => setGlitchActive(false)}
        >
          Trigger Glitch
          {glitchActive && (
            <div className="absolute inset-0 bg-red-500/20 animate-glitch-overlay" />
          )}
        </button>
      </div>

      <style jsx>{\`
  @keyframes glitch - overlay {
    0 % { transform: translateX(0); }
    25 % { transform: translateX(-5px); }
    50 % { transform: translateX(5px); }
    75 % { transform: translateX(-2px); }
    100 % { transform: translateX(0); }
  }
  \`}</style>
    </div>
  );
};

export default GlitchCursor;
  `;



  return (
    <DocumentLayout
      title="Glitch Cursor"
      description="Interactive Glitch cursor tracking component"
      keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="Glitch Cursor Component"
        description="An interactive React component that tracks cursor movement while adding a glitchy, futuristic visual effect."
      >
        <LivePreviewCard>
          <GlitchCursor />
        </LivePreviewCard>
      </ComponentCard>

      {/* Implementation Section */}
      <ComponentCard
        title="Usage"
        description="Detailed code breakdown of the Glitch Cursor component."
      >
        <div className="space-y-4">
          {/* Code Example for Glitch Cursor */}
          <CodeExample
            title="Create a useMouse.ts hook."
            code={useMouseCode}
            fileName="./useMouse.ts"
            badgeText="TS"
          />

          {/* Separator */}
          <Separator className="my-4" />

          {/* Code Example for Custom Mouse Hook */}
          <CodeExample
            title="Create Glitch Cursor component"
            code={CodeToDisplay}
            fileName="./GlitchCursor.tsx"
            badgeText="TS"
          />
        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default GlitchCursorExample;
