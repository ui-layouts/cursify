import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import { AttractorBackgroundCode } from "@/constants/Background";
import Carousel from "../design/Carousel";



const CarouselExample = () => {

     return (
          <DocumentLayout
               title="Carousel "
               description="Interactive And Creative Background"
               keywords={['background', 'texture']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Carousel Background"
                    description="A React component that displays a trailing text flag following the cursor's movement."
               >
                    <LivePreviewCard>
                         <Carousel />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the ThreeD Cursor component."
               >
                    <div className="space-y-4">

                         <CodeExample
                              title="Create a Carousel.tsx Component"
                              code={AttractorBackgroundCode}
                              fileName="./Carousel.tsx"
                              badgeText="TSX"
                         />


                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default CarouselExample;
