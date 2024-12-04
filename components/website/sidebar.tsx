'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/website/ui/scroll-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Component, Rocket } from 'lucide-react';
import { IRecentPage, useRecentPagesStore } from '@/hooks/useZustStore';
import docsData from '@/configs/docs.json' assert { type: 'json' };
import { useTheme } from 'next-themes';
import { AllComponens } from '@/configs/docs';

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
  const { setTheme } = useTheme();
  const { addVisitedPage, getRecentPages, removeAllRecentPages } =
    useRecentPagesStore();
  const [recentPages, setRecentPages] = useState<IRecentPage[]>([]);
  // const groupedComponents = MainComponents.reduce((acc, component) => {
  //   const group = component.component || null;
  //   //@ts-ignore
  //   if (!acc[group]) {
  //     //@ts-ignore
  //     acc[group] = [];
  //   }
  //   //@ts-ignore
  //   acc[group].push(component);
  //   return acc;
  // }, {});

  // console.log(sidebarData);

  useEffect(() => {
    const recentPage = getRecentPages();
    setRecentPages(recentPage);
  }, [getRecentPages]);

  return (
    <aside className='h-full '>
      <div className='sticky top-0 h-screen w-full  pt-[5.2em]'>
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
          </ul>
          <h1 className='text-lg font-semibold pb-1'>Components</h1>
          {AllComponens?.map((link) => {
            return (
              <>
                <li
                  key={link.href}
                  className={`2xl:text-sm text-[0.81em]  flex items-center gap-1 dark:hover:text-white 2xl:py-1 py-0.5 pl-2 border-l transition-all ${
                    link.href === pathname
                      ? 'dark:border-white border-black text-black dark:text-white font-semibold'
                      : 'dark:text-slate-400 2xl:font-normal font-medium hover:border-black/60 dark:hover:border-white/50 text-slate-500 hover:text-slate-900'
                  }`}
                  // data-active={link.id === pathname}
                >
                  <Link
                    href={link.href}
                    onClick={() => addVisitedPage(link.href, link.id)}
                  >
                    {link.componentName}
                  </Link>
                  {link?.isAlert && (
                    <span className='2xl:text-xs text-[0.74em] bg-blue-500 text-white px-1 rounded'>
                      {link?.isAlert}
                    </span>
                  )}
                </li>
              </>
            );
          })}
        </ScrollArea>
      </div>
    </aside>
  );
}

export default DocsSidebar;
