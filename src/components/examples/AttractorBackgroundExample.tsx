import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import Attractor from "../backgrounds/Attractor";
import { AttractorBackgroundCode } from "@/constants/Background";



const AttractorBackgroundExample = () => {

     return (
          <DocumentLayout
               title="Attracter Background"
               description="Interactive And Creative Background"
               keywords={['background', 'texture']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Attracter Background"
                    description="A React component that displays a trailing text flag following the cursor's movement."
               >
                    <LivePreviewCard>
                         <div className="relative h-screen w-full">
                         <Attractor
                              particleCount={30}
                              backgroundColor="#1a1a1a"
                              particleColor="#00ff00"
                         />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the ThreeD Cursor component."
               >
                    <div className="space-y-4">

                         <CodeExample
                              title="Create a Attracter.tsx Component"
                              code={AttractorBackgroundCode}
                              fileName="./Attracter.tsx"
                              badgeText="TSX"
                         />


                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default AttractorBackgroundExample;
