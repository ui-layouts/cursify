import { type ReactNode } from 'react';
import SEO from '../common/SEO';

interface DocumentLayoutProps {
     title: string;
     description: string;
     keywords: string[];
     children: ReactNode;
}

export function DocumentLayout({ title, description, keywords, children }: DocumentLayoutProps) {
     return (
          <div className="container mx-auto px-4 py-8 space-y-6">
               <SEO
                    title={title}
                    description={description}
                    keywords={keywords}
               />
               {children}
          </div>
     );
}