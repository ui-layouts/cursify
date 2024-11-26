import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import ScalingCursor from "../cursor/common/ScalingCursor";
import { HTMLAttributes } from "react";

interface ScalingCursorProps extends HTMLAttributes<HTMLDivElement> {
     size?: number;
     scaleMin?: number;
     scaleMax?: number;
     scaleSpeed?: number;
 }

 
const ScalingCursorExample = () => {
     const codeToDisplay = ``;

     const codeToDisplayCSS = ``;

     return (
          <DocumentLayout
               title="Scaling Cursor"
               description="Interactive scaling cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'scaling cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Scaling Cursor Component"
                    description="An interactive React component that tracks and scales the cursor position based on distance from the center."
               >
                    <LivePreviewCard>
                         <ScalingCursor
                              size={50}
                              scaleMin={1}
                              scaleMax={2}
                              scaleSpeed={0.1}
                         />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Scaling Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for Scaling Cursor Component */}
                         <CodeExample
                              title="Scaling Cursor Component"
                              code={codeToDisplay}
                              fileName="./ScalingCursorExample.tsx"
                              badgeText="TSX"
                         />

                         {/* Separator */}
                         <Separator className="my-4" />

                         {/* Code Example for Scaling Cursor Custom Styling */}
                         <CodeExample
                              title="Scaling Cursor Custom Styling"
                              code={codeToDisplayCSS}
                              fileName="./ScalingCursor.css"
                              badgeText="CSS"
                         />
                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default ScalingCursorExample;
