import { CodeExample } from "@/components/common/CodeExample";
import { ComponentCard } from "@/components/common/ComponentCard";
import { DocumentLayout } from "@/components/common/DocumentLayout";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import { TextFlagCursorCode } from "@/constants/constant-hooks";
import BreadcrumbMaker from "../common/Breadcrumb";
import TextFlagCursor from "../cursor/common/TextFlagCursor";
import { useTheme } from "@/providers/theme-provider";

const TextFlagCursorExample = () => {
     const { theme } = useTheme();
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
                              color={theme === "dark" ? "#FFFFFF" : "#000000"}
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
