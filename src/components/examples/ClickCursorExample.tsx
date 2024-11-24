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
import BlobCursor from '../cursor/common/BlobCursor';
import ClickEffectCursor from "../cursor/common/ClickEffectCursor";

const ClickCursorExample = () => {
     const codeToDisplay = ``;

     const codeToDisplayHook = `
"use client";
import { type RefObject, useLayoutEffect, useRef, useState } from "react";
interface MouseState {
  x: number | null;
  y: number | null;
  elementX: number | null;
  elementY: number | null;
  elementPositionX: number | null;
  elementPositionY: number | null;
}
export function useMouse(): [MouseState, RefObject<HTMLDivElement>] {
  const [state, setState] = useState<MouseState>({
    x: null,
    y: null,
    elementX: null,
    elementY: null,
    elementPositionX: null,
    elementPositionY: null,
  });
  const ref = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newState: Partial<MouseState> = {
        x: event.pageX,
        y: event.pageY,
      };
      if (ref.current instanceof Element) {
        const { left, top } = ref.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;
        newState.elementX = elementX;
        newState.elementY = elementY;
        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
      }
      setState((s) => ({
        ...s,
        ...newState,
      }));
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return [state, ref];
}
`;

     return (
          <div className="container mx-auto px-4 py-8 space-y-6">
               <SEO
                    title="Click Cursor"
                    description="Interactive Click cursor tracking component"
                    keywords={['react', 'cursor', 'interaction', 'mouse tracking']}
               />



               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle className="text-2xl">Click Cursor Component</CardTitle>
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
                              <ClickEffectCursor />
                         </Preview>
                    </CardContent>
               </Card>

               <Card className='border-none shadow-none'>
                    <CardHeader>
                         <CardTitle>Component Implementation</CardTitle>
                         <CardDescription>
                              Detailed code breakdown of the Click Cursor component
                         </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                              <div>
                                   <h4 className="text-lg font-semibold mb-2">
                                        Click Cursor Component
                                        <Badge variant="secondary" className="ml-2">TSX</Badge>
                                   </h4>
                                   <AdvancedCodeBlock
                                        code={codeToDisplay}
                                        fileName="./ClickCursorExample.tsx"
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

export default ClickCursorExample;