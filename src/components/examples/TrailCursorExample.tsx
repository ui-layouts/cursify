import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import TrailCursor from "../cursor/TrailCursor/TrailCursor";
import { TrailCursorCode } from "@/constants/constant-hooks";

const TrailCursorExample = () => {


     return (
          <DocumentLayout
               title="Trail Cursor"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'trail cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Trail Cursor Component"
                    description="A React component that leaves a smooth, animated trail following the cursor's movement."
               >
                    <LivePreviewCard>
                         <TrailCursor />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Trail Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for Trail Cursor Component */}
                         <CodeExample
                              title="Create TrailCursor.tsx Component"
                              code={TrailCursorCode}
                              fileName="./TrailCursor.tsx"
                              badgeText="TSX"
                         />

                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default TrailCursorExample;
