import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import TextFlagCursor from "../cursor/common/TextFlagCursor";
import { TextFlagCursorCode } from "@/constants/constant-hooks";

const TextFlagCursorExample = () => {

     return (
          <DocumentLayout
               title="TextFlag Cursor"
               description="Interactive text flag cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'text flag cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="TextFlag Cursor Component"
                    description="A React component that displays a trailing text flag following the cursor's movement.."
               >
                    <LivePreviewCard>
                         {/* <TextFlagCursor /> */}
                         {/* Example with options */}
                         <TextFlagCursor
                              text="Hello World"
                              color="#000000"
                              font="monospace"
                              textSize={12}
                         />
                         {/* Example with container element */}
                         {/* <div ref={containerRef}>
            <TextFlagCursor element={containerRef.current} />
          </div> */}
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Usage"
                    description="Detailed code breakdown of the TextFlag Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for TextFlag Cursor Component */}
                         <CodeExample
                              title="Create TextFlagCursor.tsx Component"
                              code={TextFlagCursorCode}
                              fileName="./TextFlagCursor.tsx"
                              badgeText="TSX"
                         />

                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default TextFlagCursorExample;
