import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import { BubbleCursor } from "../cursor/common/BubbleCursor";

const BubbleCursorExample = () => {
     const codeToDisplay = `// Add your Bubble Cursor component code here`;
     const codeToDisplayHook = `// Add your custom hook code here`;

     return (
          <DocumentLayout
               title="Bubble Cursor"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Demo Component Card */}
               <ComponentCard
                    title="Bubble Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement"
               >
                    <LivePreviewCard>
                         <div className="min-h-screen w-full">
                              <BubbleCursor />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Card */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Bubble Cursor component"
               >
                    <div className="space-y-4">
                         {/* Code Example: Bubble Cursor */}
                         <CodeExample
                              title="Bubble Cursor Component"
                              code={codeToDisplay}
                              fileName="./BubbleCursorExample.tsx"
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

export default BubbleCursorExample;
