import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import TrailCursor from "../cursor/TrailCursor/TrailCursor";
import { ThreeJSSphereCode } from "@/constants/three";
import CommandCode from "../ui/CommandCode";
import ThreeJS_Sphere from "../three/ThreeJsSphere";

const ThreeJSSphereExample = () => {


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
                    title="Three Js  Component"
                    description="A React component that leaves a smooth, animated trail following the cursor's movement."
               >
                    <LivePreviewCard>
                       <ThreeJS_Sphere />
                    </LivePreviewCard>
               </ComponentCard>



               <ComponentCard
                    title="Installation"
                    description="Install dependencies"
               >
                    <CommandCode >npm install three @types/three dat.gui @types/dat.gui gsap @types/gsap</CommandCode>
               </ComponentCard>


               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Trail Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Component */}
                         <CodeExample
                              title="Create ThreeeJsSphere.tsx Component"
                              code={ThreeJSSphereCode}
                              fileName="./ThreeeJsSphere.tsx"
                              badgeText="TSX"
                         />

                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default ThreeJSSphereExample;
