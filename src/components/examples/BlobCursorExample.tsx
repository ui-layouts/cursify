import { Separator } from "@/components/ui/separator";
import BlobCursor from "../cursor/BlobCursor/BlobCursor";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import  CommandCode  from "../ui/CommandCode";

const BlobCursorExample = () => {
     const codeToDisplay = `...your blob cursor code...`;
     const codeToDisplayHook = `...your hook code...`;

     return (
          <DocumentLayout
               title="Blob Cursor"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
          >
               {/* Demo Component Card */}
               <ComponentCard
                    title="Blob Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement"
               >
                    <LivePreviewCard>
                         <div className="bg-black min-h-screen w-full">
                              <BlobCursor />
                         </div>
                    </LivePreviewCard>
               </ComponentCard>

               <ComponentCard
                    title="Blob Cursor Component"
                    description="An interactive React component that tracks and visualizes cursor movement"
               >
                    <CommandCode >npm i react-native</CommandCode>
               </ComponentCard>



               {/* Implementation Card */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Blob Cursor component"
               >
                    <div className="space-y-4">

                         <CodeExample
                              title="Blob Cursor Component"
                              code={codeToDisplay}
                              fileName="./BlobCursorExample.tsx"
                         />

                         <Separator className="my-4" />

                         <CodeExample
                              title="Custom Mouse Hook"
                              code={codeToDisplayHook}
                              fileName="./use-mouse.ts"
                              badgeText="TS"
                         />
                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default BlobCursorExample;