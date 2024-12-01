import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import ParticleNetwork from "../backgrounds/ParticleNetwork";
import { ParticleNetworkBackground } from "@/constants/Background";




const ParticleNetworkExample = () => {

     return (
          <DocumentLayout
               title="Particle Network Background"
               description="Interactive Particle Network Background tracking component"
               keywords={['react', 'Background', 'interaction', 'mouse tracking', '3d Background']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Particle Network Background Component"
                    description="A React component that displays a particle network background."
               >
                    <LivePreviewCard>
                         <ParticleNetwork />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the Particle Network Background component."
               >
                    <div className="space-y-4">

                         <CodeExample
                              title="Create a ParticleNetwork.tsx Component."
                              code={ParticleNetworkBackground}
                              fileName="./ParticleNetwork.tsx"
                              badgeText="TSX"
                         />


                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default ParticleNetworkExample;
