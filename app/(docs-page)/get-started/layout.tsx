import Footer from '@/components/website/footer';
import CanvasCursor from '@/registry/components/cursor/common/canvas-cursor';
import React from 'react';

function GetStartedlayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CanvasCursor />
      {children}
      <Footer />
    </>
  );
}

export default GetStartedlayout;
