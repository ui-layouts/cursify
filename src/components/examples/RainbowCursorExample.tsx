// Example usage with all customizable options
{/* <RainbowCursor
  length={20} // Number of particles in the trail
  colors={["#FF0000", "#00FF00", "#0000FF"]} // Custom colors
  size={3} // Base size of the trail
  trailSpeed={0.4} // Speed of trail movement (0-1)
  colorCycleSpeed={0.002} // Speed of color cycling
  blur={1} // Optional blur effect (pixels)
  pulseSpeed={0.01} // Speed of size pulsing
  pulseMin={0.8} // Minimum size multiplier
  pulseMax={1.2} // Maximum size multiplier
/> */}



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
import CommandCode  from "@/components/ui/CommandCode";
import { RainbowCursor } from "../cursor/common/RainbowCursor";

const RainbowCursorExample = () => {
     const codeToDisplay = ``;
     const CSScodeToDisplay = ``;
     return (

          <div className="container mx-auto px-4 py-8 space-y-6">
               <SEO
                    title="Rainbow Cursor"
                    description="Interactive cursor tracking component"
                    keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
               />


               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle className="text-2xl">Rainbow Cursor Component</CardTitle>
                         <CardDescription>

                         </CardDescription>
                    </CardHeader>
                    <CardContent>

                         <Separator className="my-4" />
                         <Preview
                              title="Live Preview"
                              className=" border"
                         >
                              <RainbowCursor />
                         </Preview>
                    </CardContent>
               </Card>

               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle>Component Implementation</CardTitle>
                         <CardDescription>
                              Detailed code breakdown of the Follow Cursor component
                              <CommandCode>npm install framer-motion</CommandCode>
                         </CardDescription>

                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                              <div>
                                   <h4 className="text-lg font-semibold mb-2">
                                        Rainbow Cursor Component
                                        <Badge variant="secondary" className="ml-2">TSX</Badge>
                                   </h4>
                                   <AdvancedCodeBlock
                                        code={codeToDisplay}
                                        fileName="./RainbowCursorExample.tsx"
                                        lang="typescript"
                                   />
                              </div>
                              <Separator className="my-4" />
                              <div>
                                   <h4 className="text-lg font-semibold mb-2">
                                        /Rainbowcursor.css
                                        <Badge variant="secondary" className="ml-2">css</Badge>
                                   </h4>
                                   <AdvancedCodeBlock
                                        code={CSScodeToDisplay}
                                        fileName="./Rainbowcursor.css"
                                        lang="css"
                                   />
                              </div>
                         </div>
                    </CardContent>
               </Card>
          </div>
     );
};

export default RainbowCursorExample;