import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SpherePacking from "../three/SpherePacking";
import { spherePackingCode } from "@/constants/three";
import CommandCode from "../ui/CommandCode";




const SpherePackingExample = () => {

     return (
          <DocumentLayout
               title="Sphere "
               description="Interactive And Creative Sphere"
               keywords={['3d sphere', 'three js']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Sphere "
                    description="A React component that displays a trailing text flag following the cursor's movement."
               >
                    <LivePreviewCard>
                         <SpherePacking

                         />
                    </LivePreviewCard>
               </ComponentCard>


               <ComponentCard
                    title="Installation"
                    description="Install dependencies"
               >
                    <CommandCode >npm install three @types/three</CommandCode>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the ThreeD Cursor component."
               >
                    <div className="space-y-4">

                         <CodeExample
                              title="Create a SpherePacking.tsx Component"
                              code={spherePackingCode}
                              fileName="./SpherePacking.tsx"
                              badgeText="TSX"
                         />


                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default SpherePackingExample;
