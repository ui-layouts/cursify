import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import CanvasCursor from "../cursor/common/CanvasCursor";
import BreadcrumbMaker from "../common/Breadcrumb";

const CanvasCursorExample = () => {
     const codeToDisplay = `// Add your Canvas Cursor component code here`;
     const codeToDisplayHook = `// Add your custom hook code here`;

     return (
          <DocumentLayout
               title="Canvas Cursor"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Demo Component Card */}
               <ComponentCard
                    title="Canvas Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement"
               >
                    <LivePreviewCard className="">
                         <div className="min-h-screen w-full">
                              <CanvasCursor />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Card */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Canvas Cursor component"
               >
                    <div className="space-y-4">
                         {/* Code Example: Canvas Cursor */}
                         <CodeExample
                              title="Canvas Cursor Component"
                              code={codeToDisplay}
                              fileName="./CanvasCursorExample.tsx"
                         />

                         <Separator className="my-4" />

                         {/* Code Example: Custom Hook */}
                         <CodeExample
                              title="Custom Mouse Hook"
                              code={codeToDisplayHook}
                              fileName="./use-mouse.ts"
                              badgeText="TS"
                         />
                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default CanvasCursorExample;
