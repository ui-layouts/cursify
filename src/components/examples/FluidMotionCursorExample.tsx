import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import FluidMotionCursor from "../cursor/common/FluidCursorMotion";
import { FluidMotionCursorCode } from "@/constants/constant-hooks";

const FluidMotionCursorExample = () => {



     return (
          <DocumentLayout
               title="Fluid Cursor Motion "
               description="Interactive FluidCursor Motion tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
          >
               {/* Demo Component Card */}
               <BreadcrumbMaker />
               <ComponentCard
                    title="FluidCursor Motion Component"
                    description="An interactive React component that creates a dynamic, animated blob effect, visually tracking cursor movement in real time."
               >
                    <LivePreviewCard>
                         <div className="min-h-screen w-full">
                              <FluidMotionCursor />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>




               {/* Implementation Card */}
               <ComponentCard
                    title="Usage"
                    description="Copy and paste the following code into your project."
               >
                    <div className="space-y-4">

                         <CodeExample
                              title="Create a FluidCursorMotion.tsx component"
                              code={FluidMotionCursorCode}
                              fileName="./FluidCursorMotion.tsx"
                         />


                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default FluidMotionCursorExample;