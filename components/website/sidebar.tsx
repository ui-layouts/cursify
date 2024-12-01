'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/website/ui/scroll-area';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Component, Rocket } from 'lucide-react';
import { IRecentPage, useRecentPagesStore } from '@/hooks/useZustStore';
import { useTheme } from 'next-themes';
import { generateSidebarData } from './constant';
import { AllComponens, cursorAnimations, MainComponents } from '@/configs/docs';

export const basePath = [
  {
    href: '/get-started',
    name: 'Get Started',
    icon: <Rocket />,
  },
  {
    href: '/components',
    name: 'Components',
    icon: <Component />,
  },
];

function DocsSidebar() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const { addVisitedPage, getRecentPages, removeAllRecentPages } =
    useRecentPagesStore();
  const [recentPages, setRecentPages] = useState<IRecentPage[]>([]);
  const groupedComponents = MainComponents.reduce((acc, component) => {
    const group = component.component || null;
    //@ts-ignore
    if (!acc[group]) {
      //@ts-ignore
      acc[group] = [];
    }
    //@ts-ignore
    acc[group].push(component);
    return acc;
  }, {});

  // console.log(sidebarData);

  useEffect(() => {
    const recentPage = getRecentPages();
    setRecentPages(recentPage);
  }, [getRecentPages]);

  return (
    <aside className='h-full border-r'>
      <div className='sticky top-0 h-screen w-full rounded-md pt-[3.2em]'>
        <ScrollArea className='h-full py-4'>
          <ul className='pb-1'>
            {basePath?.map((link, index) => {
              return (
                <>
                  <li key={`id-${index}`}>
                    <Link
                      href={link.href}
                      onClick={() => addVisitedPage(link.href, link.name)}
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

                      {link.name}
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
          <h1 className='text-base font-semibold pb-1'>Cursor Animation</h1>
          {AllComponens?.map((link: any) => {
            return (
              <>
                <li
                  key={link.href}
                  className={`2xl:text-sm text-sm  flex items-center gap-1 dark:hover:text-white 2xl:py-1 py-0.5 pl-2 border-l transition-all ${
                    link.href === pathname
                      ? 'dark:border-white border-black text-black dark:text-white font-semibold'
                      : 'dark:text-slate-400 2xl:font-normal font-medium hover:border-black/60 dark:hover:border-white/50 text-slate-500 hover:text-slate-900'
                  }`}
                  // data-active={link.id === pathname}
                >
                  <Link
                    href={link.href}
                    onClick={() =>
                      addVisitedPage(link.href, link.componentName)
                    }
                  >
                    {link.componentName}
                  </Link>
                  {link?.new && (
                    <span className='2xl:text-xs text-[0.74em] bg-blue-500 text-white px-1 rounded'>
                      New
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
export const ItemsWithName = ({
  group,
  items,
  pathname,
  addVisitedPage,
}: any) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const activeItemIndex = items.findIndex(
      (item: { id: any }) => item.id === pathname
    );
    if (activeItemIndex !== -1 && itemRefs.current[activeItemIndex]) {
      itemRefs.current[activeItemIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [pathname, items]);
  return (
    <div ref={groupRef} key={group}>
      <button className='text-[1rem] relative flex w-full items-center justify-between pr-4 cursor-pointer dark:font-normal dark:text-gray-100 font-normal capitalize my-1'>
        {group}
      </button>
      <ul className='relative '>
        {items.map((link: any, index: number) => (
          <li
            key={index}
            // @ts-ignore
            ref={(el) => (itemRefs.current[index] = el)}
            className={`2xl:text-sm text-[0.81em]  flex items-center gap-1 dark:hover:text-white 2xl:py-1 py-0.5 pl-2 border-l transition-all ${
              link.href === pathname
                ? 'dark:border-white border-black text-black dark:text-white font-semibold'
                : 'dark:text-slate-400 2xl:font-normal font-medium hover:border-black/60 dark:hover:border-white/50 text-slate-500 hover:text-slate-900'
            }`}
          >
            <Link
              href={link.href}
              onClick={() => addVisitedPage(link.href, link.name)}
            >
              {link.name}
            </Link>
            {link?.new && (
              <span className='2xl:text-xs text-[0.74em] bg-blue-500 text-white px-1 rounded'>
                New
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DocsSidebar;
