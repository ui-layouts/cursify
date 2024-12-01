import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import FilmGrain from "../backgrounds/FilmGrain";
import { FilmGrainCode } from "@/constants/Background";


const FilmGrainExample = () => {

     return (
          <DocumentLayout
               title="FilmGrain Background"
               description="Interactive And Creative Background"
               keywords={['background', 'film grain']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Film Grain Background"
                    description="A Film Grain component that displays a trailing text flag following the cursor's movement."
               >
                    <LivePreviewCard>
                         <FilmGrain />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the ThreeD Cursor component."
               >
                    <div className="space-y-4">

                         <CodeExample
                              title="Create a FilmGrain.tsx Component"
                              code={FilmGrainCode}
                              fileName="./FilmGrain.tsx"
                              badgeText="TSX"
                         />


                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default FilmGrainExample;
