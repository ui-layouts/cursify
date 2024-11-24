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
import { FairyDustCursor } from "../cursor/common/FairyDustCursor";



const FairyDustCursorExample = () => {
     const codeToDisplay = ``;

     const codeToDisplayHook = ``;

     return (
          <div className="container mx-auto px-4 py-8 space-y-6">
               <SEO
                    title="FairyDust Cursor"
                    description="Interactive cursor tracking component"
                    keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
               />
               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle className="text-2xl">FairyDust Cursor Component</CardTitle>
                         <CardDescription>
                              An interactive React component that tracks and visualizes cursor movement
                         </CardDescription>
                    </CardHeader>
                    <CardContent>

                         <Separator className="my-4" />
                         <Preview
                              title="Live Preview"
                              className="bg-neutral-50 border"
                         >
                              // Basic usage
                              {/* <FairyDustCursor /> */}

// Custom configuration
                              <FairyDustCursor
                                   colors={['#FF0000', '#00FF00', '#0000FF']}
                                   characterSet={['✨', '⭐', '🌟']}
                                   particleSize={24}
                                   particleCount={2}
                                   gravity={0.015}
                                   fadeSpeed={0.97}
                                   initialVelocity={{ min: 0.7, max: 2.0 }}
                              />

// With container element
                              {/* <div ref={containerRef}>
  <FairyDustCursor element={containerRef.current} /> //Your content
</div> */}
                         </Preview>
                    </CardContent>
               </Card>

               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle>Component Implementation</CardTitle>
                         <CardDescription>
                              Detailed code breakdown of the FairyDust Cursor component
                         </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                              <div>
                                   <h4 className="text-lg font-semibold mb-2">
                                        FairyDust Cursor Component
                                        <Badge variant="secondary" className="ml-2">TSX</Badge>
                                   </h4>
                                   <AdvancedCodeBlock
                                        code={codeToDisplay}
                                        fileName="./FairyDustCursorExample.tsx"
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

export default FairyDustCursorExample;