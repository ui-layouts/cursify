import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import MagneticCursor from "../cursor/common/MagneticCursor";
import CommandCode from "../ui/CommandCode";

const MagneticCursorExample = () => {
  const codeToDisplay = `
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const MagneticCursor: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current) {
        const button = buttonRef.current.getBoundingClientRect();
        const centerX = button.left + button.width / 2;
        const centerY = button.top + button.height / 2;
        const deltaX = e.pageX - centerX;
        const deltaY = e.pageY - centerY;

        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const magneticDistance = 120; // Distance for magnetic attraction
        const attractionStrength = 0.45; // Magnetic strength

        if (distance < magneticDistance) {
          const strength = 1 - distance / magneticDistance;
          gsap.to(buttonRef.current, {
            x: deltaX * strength * attractionStrength,
            y: deltaY * strength * attractionStrength,
            duration: 0.2,
          });
          setIsHovering(true);
        } else {
          gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.3,
          });
          setIsHovering(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center">
      <button
        ref={buttonRef}
        className={\`px-6 py-3 rounded-lg text-white font-semibold transition-transform \${isHovering ? 'bg-green-500' : 'bg-green-600'
          }\`}
      >
        Hover on me!
      </button>
    </div>
  );
};

export default MagneticCursor;
`;



  return (
    <DocumentLayout
      title="Magnetic Cursor"
      description="Interactive Magnetic cursor tracking component"
      keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="Magnetic Cursor Component"
        description="A responsive React component that dynamically pulls elements toward the cursor, creating a magnetic interaction effect."
      >
        <LivePreviewCard>
          <MagneticCursor />
        </LivePreviewCard>
      </ComponentCard>
      <ComponentCard
        title="Installation"
        description="Install dependencies"
      >
        <CommandCode >npm i @gsap/react</CommandCode>
      </ComponentCard>
      {/* Implementation Section */}
      <ComponentCard
        title="Usage"
        description="Detailed code breakdown of the Magnetic Cursor component."
      >
        <div className="space-y-4">
          {/* Code Example for Magnetic Cursor */}
          <CodeExample
            title="Create Magnetic Cursor Component"
            code={codeToDisplay}
            fileName="./MagneticCursor.tsx"
            badgeText="TSX"
          />


        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default MagneticCursorExample;
