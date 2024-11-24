import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import SEO from '../common/SEO';
import { AdvancedCodeBlock } from '@/pages/document/components/AdvanceCodeBlock';
import Preview from '@/pages/document/components/Preview';
import { ArrowCursor } from "../cursor/common/ArrowCursor";



const ArrowCursorExample = () => {
     const codeToDisplay = ``;

     const codeToDisplayHook = ``;

     return (
          <div className="container mx-auto px-4 py-8 space-y-6">
               <SEO
                    title="Arrow Cursor"
                    description="Interactive cursor tracking component"
                    keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
               />
               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle className="text-2xl">Arrow Cursor Component</CardTitle>
                         <CardDescription>
                              An interactive React component that tracks and visualizes cursor movement
                         </CardDescription>
                    </CardHeader>
                    <CardContent>

                         <Separator className="my-4" />
                         <Preview
                              title="Live Preview"
                              className="min-h-screen"
                         >
                               <ArrowCursor 
        size={32} // Larger cursor
        color="#FF0000" // Red cursor
        edgeThreshold={20} // Larger edge detection area
        transitionSpeed={0.5} // Slower transitions
        hideTimeout={3000} // Longer visibility duration
      />
                         </Preview>
                    </CardContent>
               </Card>

               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle>Component Implementation</CardTitle>
                         <CardDescription>
                              Detailed code breakdown of the Arrow Cursor component
                         </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                              <div>
                                   <h4 className="text-lg font-semibold mb-2">
                                        Arrow Cursor Component
                                        <Badge variant="secondary" className="ml-2">TSX</Badge>
                                   </h4>
                                   <AdvancedCodeBlock
                                        code={codeToDisplay}
                                        fileName="./ArrowCursorExample.tsx"
                                        lang="typescript"
                                   />
                              </div>

                              <Separator className="my-4" />

                              <div>
                                   <h4 className="text-lg font-semibold mb-2">
                                        Custom Mouse Hook
                                        <Badge variant="secondary" className="ml-2">TS</Badge>
                                   </h4>
                                   <AdvancedCodeBlock
                                        code={codeToDisplayHook}
                                        fileName="./use-mouse.ts"
                                        lang="typescript"
                                   />
                              </div>
                         </div>
                    </CardContent>
               </Card>
          </div>
     );
};

export default ArrowCursorExample;