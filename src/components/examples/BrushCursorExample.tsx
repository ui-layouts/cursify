import { CodeExample } from "@/components/common/CodeExample";
import { ComponentCard } from "@/components/common/ComponentCard";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import { BrushCursorCode } from "@/constants/constant-hooks";
import BreadcrumbMaker from "../common/Breadcrumb";
import { Separator } from "../ui/separator";
import BrushCursor from "../cursor/common/BrushCursor";

const BrushCursorExample = () => {


     const tailwindconfig = `
     module.exports = {
  theme: {
    extend: {
      keyframes: {
        brushStroke: {
          '0%': { 
            transform: 'scale(1)', 
            opacity: '0.7' 
          },
          '100%': { 
            transform: 'scale(3)', 
            opacity: '0' 
          }
        }
      },
      animation: {
        'brush-stroke': 'brushStroke ease-out'
      }
    }
  }
}`
     return (
          <DocumentLayout
               title="Brush Cursor"
               description="Interactive text flag cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'text flag cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Brush Cursor Component"
                    description="A React component that displays a trailing text flag following the cursor's movement.."
               >
                    <LivePreviewCard>
                         <BrushCursor
                              brushColor="rgba(255, 0, 0, 0.5)" // Optional: custom color
                              brushSize={60} // Optional: custom size
                              fadeTime={1500} // Optional: custom fade duration
                         />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the Brush Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for Brush Cursor Component */}
                         <CodeExample
                              title="Create BrushCursor.tsx Component"
                              code={BrushCursorCode}
                              fileName="./BrushCursor.tsx"
                              badgeText="TSX"
                         />

                         <Separator />

                         <CodeExample
                              title="update your tailwind.config.js Component"
                              code={tailwindconfig}
                              fileName="./tailwind.config.js"
                              badgeText="JS"
                         />

                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default BrushCursorExample;
