import { DocumentLayout } from "@/components/common/DocumentLayout";
import { ComponentCard } from "@/components/common/ComponentCard";
import { CodeExample } from "@/components/common/CodeExample";
import { LivePreviewCard } from "@/components/common/LivePreviewCard";
import BreadcrumbMaker from "../common/Breadcrumb";
import SEO from "../common/SEO";
import TrailCursor from "../cursor/TrailCursor/TrailCursor";
import CommandCode from "../ui/CommandCode";
import { Separator } from "../ui/separator";

const TrailCursorExample = () => {
     const codeToDisplay = `
import React, { useState, useEffect, useCallback } from 'react';
import { motion, useAnimation, useSpring } from 'framer-motion';

const TrailCursor = () => {
  // Your cursor tracking code here
  return (
    <motion.div className="cursor-trail">
      {/* Render your custom cursor trail here */}
    </motion.div>
  );
};

export default TrailCursor;
  `;

     return (
          <DocumentLayout
               title="Trail Cursor"
               description="Interactive cursor tracking component"
               keywords={['react', 'cursor', 'interaction', 'mouse tracking', 'trail cursor']}
          >
               {/* Breadcrumb */}
               <BreadcrumbMaker />

               {/* Live Demo Section */}
               <ComponentCard
                    title="Trail Cursor Component"
                    description="An interactive React component that creates a trail effect following the cursor."
               >
                    <LivePreviewCard>
                         <TrailCursor />
                    </LivePreviewCard>
               </ComponentCard>

               {/* Implementation Section */}
               <ComponentCard
                    title="Component Implementation"
                    description="Detailed code breakdown of the Trail Cursor component."
               >
                    <div className="space-y-4">
                         {/* Code Example for Trail Cursor Component */}
                         <CodeExample
                              title="Trail Cursor Component"
                              code={codeToDisplay}
                              fileName="./TrailCursorExample.tsx"
                              badgeText="TSX"
                         />

                         {/* Separator */}
                         <Separator className="my-4" />

                         {/* Installation Command */}
                         <div className="space-y-2">
                              <h4 className="text-lg font-semibold mb-2">Installation</h4>
                              <CommandCode>npm install framer-motion</CommandCode>
                         </div>
                    </div>
               </ComponentCard>
          </DocumentLayout>
     );
};

export default TrailCursorExample;
