import { Separator } from "@/components/ui/separator";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import ClickEffectCursor from "../cursor/common/ClickEffectCursor";

const ClickCursorExample = () => {
     const codeToDisplay = ``;

     const codeToDisplayHook = ``;

     return (
          <DocumentLayout
               title="Click Cursor"
               description="Interactive Click cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Demo Component Card */}
               <ComponentCard
                    title="Click Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement with click effects."
               >
                    <LivePreviewCard className="">
                         <div className="">
                              <ClickEffectCursor />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Card */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Click Cursor component and custom hook."
               >
                    <div className="space-y-4">
                         {/* Code Example: Click Cursor */}
                         <CodeExample
                              title="Click Cursor Component"
                              code={codeToDisplay}
                              fileName="./ClickEffectCursor.tsx"
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

export default ClickCursorExample;
