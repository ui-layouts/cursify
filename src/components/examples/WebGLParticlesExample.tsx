import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import WebGLParticles from "../WebGL/WebGLParticles";
import { webGlParticlesCode } from "@/constants/three";


const WebGLParticlesExample = () => {


     return (
          <DocumentLayout
               title="Web GL"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'Web GL']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Web GL Component"
                    description="A React component that leaves a smooth, animated trail following the cursor's movement."
               >
                    <LivePreviewCard>
                         <WebGLParticles />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Web GL component."
               >
                    <div className="space-y-4">
                         {/* Code Example for Web GL Component */}
                         <CodeExample
                              title="Create WebGlParticles.tsx Component"
                              code={webGlParticlesCode}
                              fileName="./WebGlParticles.tsx"
                              badgeText="TSX"
                         />

                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default WebGLParticlesExample;
