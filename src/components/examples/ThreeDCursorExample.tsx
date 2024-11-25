import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import ThreeDCursor from "../cursor/common/ThreeDCursor";
import { ThreeDCursorCode, useMouseCode } from "@/constants/constant-hooks";


const ThreeDCursorExample = () => {

     return (
          <DocumentLayout
               title="ThreeD Cursor"
               description="Interactive ThreeD cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', '3d cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="ThreeD Cursor Component"
                    description="A React component that displays a trailing text flag following the cursor's movement."
               >
                    <LivePreviewCard>
                         <ThreeDCursor />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the ThreeD Cursor component."
               >
                    <div className="space-y-4">

                         <CodeExample
                              title="Create a useMouse.ts hook."
                              code={useMouseCode}
                              fileName="./useMouse.ts"
                              badgeText="TS"
                         />
                         {/* Code Example for ThreeD Cursor Component */}
                         <CodeExample
                              title="Create ThreeDCursor.tsx Component"
                              code={ThreeDCursorCode}
                              fileName="./ThreeDCursor.tsx"
                              badgeText="TSX"
                         />

                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default ThreeDCursorExample;
