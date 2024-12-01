import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import RippleCursor from "../cursor/RippleCursor/RippleCursor";
// import CommandCode from "../ui/CommandCode";

const RippleCursorExample = () => {
  const codeToDisplay = `import React, { useReducer, useEffect } from 'react';
import './RippleCursor.css';

interface RippleCursorProps {
  maxSize?: number;
  duration?: number;
  blur?: boolean;
}

const RippleCursor: React.FC<RippleCursorProps> = ({
  maxSize = 50,
  duration = 1000,
  blur = true,
}) => {
  const [ripples, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_RIPPLE':
        return [...state, action.payload].slice(-30); // Limit ripple count
      case 'REMOVE_RIPPLE':
        return state.filter((ripple) => ripple.id !== action.payload);
      default:
        return state;
    }
  }, []);

  const handleMouseMove = (e) => {
    const ripple = {
      id: \`\${Date.now()}-\${Math.random()}\`,
      x: e.clientX,
      y: e.clientY,
    };
    dispatch({ type: 'ADD_RIPPLE', payload: ripple });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_RIPPLE', payload: ripple.id });
    }, duration);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [duration]);

  return (
    <div className="ripple-cursor-container">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple"
          style={{
            left: \`\${ripple.x}px\`,
            top: \`\${ripple.y}px\`,
            width: \`\${maxSize}px\`,
            height: \`\${maxSize}px\`,
            animationDuration: \`\${duration}ms\`,
            filter: blur ? 'blur(4px)' : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default RippleCursor;
`;

  const codeToDisplayCSS = `
.ripple-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 9999;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 150, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 150, 255, 0.7), 0 0 20px rgba(0, 150, 255, 0.4);
  pointer-events: none;
  will-change: transform, opacity;
  animation: ripple-animation cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

@keyframes ripple-animation {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
`;

  return (
    <DocumentLayout
      title="Ripple Cursor"
      description="Interactive ripple cursor effect that follows the mouse."
      keywords={["ripple cursor", "mouse effect", "React", "interaction"]}
    >
      {/* Breadcrumb */}
      <BreadcrumbMaker />

      {/* Live Demo Section */}
      <ComponentCard
        title="Ripple Cursor Component"
        description="A dynamic React component that creates ripple effects at the cursor position."
      >
        <LivePreviewCard>
          <RippleCursor maxSize={70} duration={1200} blur={true} />
        </LivePreviewCard>
      </ComponentCard>

      {/* <ComponentCard
        title="Installation"
        description="Install dependencies required for the RippleCursor component."
      >
        <CommandCode>npm install</CommandCode>
      </ComponentCard> */}
      {/* Key Features Section */}
<ComponentCard
  title="Key Features"
  description="Explore the features that make RippleCursor a modern, sleek, and efficient component."
>
  <ul className="space-y-4">
    <li className="flex items-start">
      <span className="text-green-500 mr-2">✔️</span>
      <div>
        <strong>Ripple Depth Effect:</strong> Added <code>box-shadow</code> and optional <code>filter: blur()</code> for a glowing effect.
      </div>
    </li>
    <li className="flex items-start">
      <span className="text-green-500 mr-2">✔️</span>
      <div>
        <strong>Smooth Animations:</strong> Used <code>cubic-bezier</code> easing for a more modern, smooth animation.
      </div>
    </li>
    <li className="flex items-start">
      <span className="text-green-500 mr-2">✔️</span>
      <div>
        <strong>Limit Ripple Count:</strong> Capped the ripple count to 30 to avoid performance issues.
      </div>
    </li>
    <li className="flex items-start">
      <span className="text-green-500 mr-2">✔️</span>
      <div>
        <strong>Optimized State Updates:</strong> Used <code>useReducer</code> for predictable and efficient state management.
      </div>
    </li>
    <li className="flex items-start">
      <span className="text-green-500 mr-2">✔️</span>
      <div>
        <strong>CSS Hardware Acceleration:</strong> Leveraged <code>transform</code> and <code>will-change</code> properties for smoother animations.
      </div>
    </li>
      <li className="flex items-start">
      <span className="text-green-500 mr-2">✔️</span>
      <div>
        <strong>Touchscreen Compatibility:</strong> Added support for <code>touchmove</code> and <code>touchstart</code> events for mobile devices.
      </div>
    </li>
    <li className="flex items-start">
      <span className="text-green-500 mr-2">✔️</span>
      <div>
        <strong>Customizable Props:</strong>
        <ul className="list-disc ml-6 mt-1">
          <li><code>maxSize</code>: Controls the size of ripples.</li>
          <li><code>duration</code>: Sets the animation duration in milliseconds.</li>
          <li><code>blur</code>: Toggles the blur effect.</li>
        </ul>
      </div>
    </li>
  </ul>
</ComponentCard>


      {/* Implementation Section */}
      <ComponentCard
        title="Usage"
        description="Detailed code breakdown of the RippleCursor component."
      >
        <div className="space-y-4">
          <CodeExample
            title="Create RippleCursor.tsx Component"
            code={codeToDisplay}
            fileName="./RippleCursor.tsx"
            badgeText="TSX"
          />
          <Separator className="my-4" />
          <CodeExample
            title="RippleCursor CSS Styling"
            code={codeToDisplayCSS}
            fileName="./RippleCursor.css"
            badgeText="CSS"
          />
        </div>
      </ComponentCard>
    </DocumentLayout>
  );
};

export default RippleCursorExample;
