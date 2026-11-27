'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/website/ui/scroll-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Component, Rocket, PenTool, LayoutPanelTop } from 'lucide-react';
import { IRecentPage, useRecentPagesStore } from '@/hooks/useZustStore';
import docsData from '@/configs/docs.json' assert { type: 'json' };
import { useTheme } from 'next-themes';
import { ComponentNavigation } from './component-navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
export const basePath = [
  {
    href: '/get-started',
    componentName: 'Get Started',
    icon: <Rocket />,
  },
  {
    href: '/components',
    componentName: 'Components',
    icon: <Component />,
  },
];

function DocsSidebar() {
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const { setTheme } = useTheme();
  const { addVisitedPage, getRecentPages, removeAllRecentPages } =
    useRecentPagesStore();
  const [recentPages, setRecentPages] = useState<IRecentPage[]>([]);

  useEffect(() => {
    const recentPage = getRecentPages();
    setRecentPages(recentPage);
  }, [getRecentPages]);

  return (
    <>
      {isDesktop && (
        <aside className='h-full '>
          <div className='sticky top-[5.2rem] h-screen w-full'>
            <ScrollArea className='h-[98%] px-3 py-3 dark:bg-black/40 bg-primary-foreground  backdrop-blur-md rounded-md border'>
              <ul className='pb-1'>
                {basePath?.map((link, index) => {
                  return (
                    <>
                      <li key={`id-${index}`}>
                        <Link
                          href={link.href}
                          onClick={() =>
                            addVisitedPage(link.href, link.componentName)
                          }
                          className={`flex gap-2 group font-medium items-center py-1  transition-all ${
                            link.href === pathname
                              ? 'active-nav'
                              : 'text-slate-600 hover:text-slate-900  dark:text-slate-400 dark:hover:text-white'
                          }`}
                        >
                          {React.cloneElement(link?.icon, {
                            className: `${
                              link.href === pathname
                                ? 'dark:text-base-dark dark:bg-white bg-base-dark text-white'
                                : 'dark:bg-gray-800 dark:text-white group-hover:bg-base-dark group-hover:text-white  dark:group-hover:bg-white dark:group-hover:text-base-dark'
                            } h-7 w-7 border transition-all rounded-md p-1`,
                          })}

                          {link.componentName}
                        </Link>
                      </li>
                    </>
                  );
                })}
                <li>
                  <a
                    href={'https://www.ui-layouts.com/'}
                    target='_blank'
                    className={`flex gap-2 group font-medium items-center py-1  transition-all text-slate-600 hover:text-slate-900  dark:text-slate-400 dark:hover:text-white`}
                  >
                    <LayoutPanelTop
                      className={`dark:bg-gray-800 dark:text-white group-hover:bg-base-dark group-hover:text-white  dark:group-hover:bg-white dark:group-hover:text-base-dark h-7 w-7 border transition-all rounded-md p-1`}
                    />
                    Layouts
                  </a>
                </li>
                <li>
                  <a
                    href={'https://tools.ui-layouts.com/'}
                    target='_blank'
                    className={`flex gap-2 group font-medium items-center py-1  transition-all text-slate-600 hover:text-slate-900  dark:text-slate-400 dark:hover:text-white`}
                  >
                    <PenTool
                      className={`dark:bg-gray-800 dark:text-white group-hover:bg-base-dark group-hover:text-white  dark:group-hover:bg-white dark:group-hover:text-base-dark h-7 w-7 border transition-all rounded-md p-1`}
                    />
                    Tools
                  </a>
                </li>
              </ul>
              <ComponentNavigation headingId='docs-sidebar-components' headingClassName='text-lg font-semibold pb-1' pathname={pathname} onVisit={addVisitedPage} />
            </ScrollArea>
          </div>
        </aside>
      )}
    </>
  );
}

export default DocsSidebar;
