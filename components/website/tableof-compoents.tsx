'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import Image from 'next/image';

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface TableOfContentsProps {
  toc: Promise<{ items: TocItem[] }>;
}

const images = [
  {
    src: '/tabs.svg',
    alt: 'tabs',
    className: 'rotate-12 scale-100',
  },
  { src: '/globe.svg', alt: 'globe', className: '-rotate-12 scale-100' },
  { src: '/gallery.svg', alt: 'gallery', className: 'rotate-12 scale-100' },
];
export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  // Resolving the TOC promise and setting the toc items
  useEffect(() => {
    console.log(toc);

    toc.then((resolvedToc) => {
      setTocItems(resolvedToc.items);
    });
  }, [toc]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    const headers = document.querySelectorAll('h2, h3');
    headers.forEach((header) => observer.observe(header));

    return () => {
      headers.forEach((header) => observer.unobserve(header));
      clearInterval(interval);
    };
  }, []);

  // console.log('tocitems', tocItems);

  return (
    <>
      {tocItems?.length !== 0 && (
        <aside className='hidden lg:block  2xl:w-[170px] w-[150px] shrink-0'>
          <div className='sticky top-0 h-screen  pt-[5.2em]'>
            <ScrollArea className='h-[98%] px-3 py-3 dark:bg-black/40 bg-primary-foreground  backdrop-blur-md rounded-md border'>
              <>
                <span className='text-sm px-1 text-primary font-semibold pb-1 inline-block'>
                  On This Page
                </span>
                <hr />
                <ul className=' list-none m-0 ml-0  text-[0.8em] space-y-0.5 pt-2 pl-0'>
                  {tocItems?.map((item) => {
                    // console.log(item);

                    return (
                      <>
                        <li key={item.url}>
                          <a
                            href={item.url}
                            className={`${activeId === item.url.slice(1) ? ' font-semibold  text-primary py-1' : ''} no-underline rounded-sm px-1 hover:text-primary text-muted-foreground `}
                          >
                            {item.title}
                          </a>
                          {item.items && item.items.length > 0 && (
                            <ul className='list-none  pl-4 space-y-0.5 pt-0.5'>
                              {item.items.map((subItem) => (
                                <li key={subItem.url}>
                                  <a
                                    href={subItem.url}
                                    className={`${activeId === subItem.url.slice(1) ? ' font-semibold text-primary' : ' '} no-underline  hover:text-primary text-muted-foreground`}
                                  >
                                    {subItem.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      </>
                    );
                  })}
                </ul>
                <figure className='absolute bottom-2 left-0 w-full'>
                  <div className='w-[90%] mx-auto relative scale-90'>
                    {images.map((image, index) => {
                      const isActive = index === activeIndex;
                      const baseClasses =
                        'absolute bottom-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]  bg-background border-blue-500 border-2 rounded-md transition-transform duration-500 ease-in-out';
                      const activeClasses = ' rotate-0 scale-100 z-[2]';
                      return (
                        <a
                          href='https://github.com/ui-layouts/uilayouts'
                          target='_blank'
                          className={`${baseClasses} ${
                            isActive ? activeClasses : image.className
                          }`}
                          key={index}
                        >
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={400}
                            height={400}
                            className='w-full h-full'
                          />
                        </a>
                      );
                    })}
                  </div>
                </figure>
              </>
            </ScrollArea>
          </div>
        </aside>
      )}
    </>
  );
}
