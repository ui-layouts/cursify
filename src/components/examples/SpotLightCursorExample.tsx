import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import SEO from '../common/SEO';
import { AdvancedCodeBlock } from '@/pages/document/components/AdvanceCodeBlock';
import Preview from '@/pages/document/components/Preview';
import SpotlightCursor from '../cursor/common/SpotLightCursor';

const SpotLightCursorExample = () => {
  const codeToDisplay = `
import React from 'react';
import useSpotlightEffect from '../utils/spotlight';


const SpotlightCursor = () => {
     const canvasRef = useSpotlightEffect();

     return (
          <canvas
               ref={canvasRef}
               style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9999
               }}
          />
     );
};

export default SpotlightCursor;`;

  const codeToDisplayHook = `import { useEffect, useRef, useState } from 'react';

const useSpotlightEffect = (shakeThreshold = 200, activationDelay = 200) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const spotlightPos = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const timeDiff = currentTime - lastMoveTime.current;

      if (distance > shakeThreshold && timeDiff < activationDelay) {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 1000); // Deactivate after 1 second
      }

      spotlightPos.current = { x: e.clientX, y: e.clientY };
      lastPos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = currentTime;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isActive) {
        // Create spotlight gradient
        const gradient = ctx.createRadialGradient(
          spotlightPos.current.x, spotlightPos.current.y, 0,
          spotlightPos.current.x, spotlightPos.current.y, 100
        );
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');

        // Fill canvas with gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [shakeThreshold, activationDelay, isActive]);

  return canvasRef;
};

export default useSpotlightEffect;
`;

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <SEO
        title="SpotLight Cursor"
        description="Interactive cursor tracking component"
        keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
      />



      <Card className='border-none shadow-none'>
        <CardHeader>
          <CardTitle className="text-2xl">SpotLight Cursor Component</CardTitle>
          <CardDescription>
            An interactive React component that tracks and visualizes cursor movement
          </CardDescription>
        </CardHeader>
        <CardContent>

          <Separator className="my-4" />
          <Preview
            title="Live Preview"
            className="bg-neutral-50 border"
          >
            <SpotlightCursor />
          </Preview>
        </CardContent>
      </Card>

      <Card className='border-none shadow-none'>
        <CardHeader>
          <CardTitle>Component Implementation</CardTitle>
          <CardDescription>
            Detailed code breakdown of the Follow Cursor component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">
                SpotLight Cursor Component
                <Badge variant="secondary" className="ml-2">TSX</Badge>
              </h4>
              <AdvancedCodeBlock
                code={codeToDisplay}
                fileName="./SpotLightCursorExample.tsx"
                lang="typescript"
              />
            </div>

            <Separator className="my-4" />

            <div>
              <h4 className="text-lg font-semibold mb-2">
                use-SpotLight.ts
                <Badge variant="secondary" className="ml-2">TS</Badge>
              </h4>
              <AdvancedCodeBlock
                code={codeToDisplayHook}
                fileName="./use-SpotLight.ts"
                lang="typescript"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpotLightCursorExample;