import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { findComponentByPath } from '@/lib/navigation';
import Footer from '@/components/layout/Footer';

const DocumentPage = () => {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const Component = findComponentByPath(location.pathname);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <Sidebar />
        <main className="flex-grow overflow-hidden">
          <ScrollArea 
            ref={scrollRef} 
            className="h-[calc(100vh-4rem)] w-full"
          >
            <div className="p-6">
              {Component && <Component />}
            </div>
            <Footer />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default DocumentPage;