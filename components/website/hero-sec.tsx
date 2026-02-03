/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
'use client';
import { ArrowRight, ChevronsRight, Component, Divide, MoveRight } from 'lucide-react';
import { Button } from '@/components/website/ui/button';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Spotlight, SpotLightItem } from './ui/spotlight';
import CanvasCursor from '@/registry/components/cursor/common/canvas-cursor';
import CharacterCursor from '@/registry/components/cursor/common/character-cursor';
import FairyDustIndex from '@/registry/components/cursor/fairydust';
import FollowCursor from '@/registry/components/cursor/common/follow-cursor';

import RainbowCursor from '@/registry/components/cursor/common/rainbow-cursor';
import SnowflakeCursor from '@/registry/components/cursor/common/snowflake-cursor';
import SpotlightCursor from '@/registry/components/cursor/common/spotlight-cursor';
import SpringyCursor from '@/registry/components/cursor/common/springy-cursor';

import BubbleCursor from '@/registry/components/cursor/common/bubble-cursor';
import Footer from './footer';
import SmoothFollower from '../../registry/components/cursor/common/smooth-following-cursor';

function HeroSec() {
  const [blocks, setBlocks] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeDivs = useMemo(
    () => ({
      0: new Set([4, 1]),
      2: new Set([3]),
      4: new Set([2, 5, 8]),
      5: new Set([4]),
      10: new Set([3]),
      12: new Set([7]),
      15: new Set([6]),
      14: new Set([5]),
      13: new Set([4]),
    }),
    []
  );

  useEffect(() => {
    const updateBlocks = () => {
      const { innerWidth, innerHeight } = window;
      const blockSize = innerWidth * 0.06; // Using 6vw for the block size
      const amountOfBlocks = Math.ceil(innerHeight / blockSize);

      const newBlocks = Array.from({ length: 17 }, (_, columnIndex) => (
        <div key={columnIndex} className='w-[6vw] h-full'>
          {Array.from({ length: amountOfBlocks }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className={`h-[6vw] w-full border-[1px] dark:border-[rgba(255,255,255,0.015)] border-gray-50 ${
                // @ts-ignore
                activeDivs[columnIndex]?.has(rowIndex)
                  ? 'dark:bg-[rgba(255,255,255,0.03)] bg-gray-50'
                  : ''
              }`}
              style={{ height: `${blockSize}px` }}
            ></div>
          ))}
        </div>
      ));
      // @ts-ignore
      setBlocks(newBlocks);
    };

    updateBlocks();
    window.addEventListener('resize', updateBlocks);

    return () => window.removeEventListener('resize', updateBlocks);
  }, [activeDivs]);

  const components = [
    // { title: 'Blog Cursor', link: '', component: <BlobCursor /> },
    {
      title: 'Fairydust Cursor',
      link: '/components/fairydust-cursor',
      component: <FairyDustIndex />,
    },
    {
      title: 'Smooth Following Cursor',
      link: '/components/smooth-follower',
      component: <SmoothFollower />,
    },
    {
      title: 'Canvas Cursor',
      link: '/components/canvas-cursor',
      component: <CanvasCursor />,
    },
    {
      title: 'Bubble Cursor',
      link: '/components/bubble-cursor',
      component: <BubbleCursor zIndex={1} />,
    },
    {
      title: 'Character Cursor',
      link: '/components/character-cursor',
      component: <CharacterCursor zIndex={1} />,
    },
    {
      title: 'Snowflake Cursor',
      link: '/components/character-cursor',
      component: <SnowflakeCursor zIndex={1} />,
    },

    {
      title: 'Rainbow Cursor',
      link: '/components/rainbow-cursor',
      component: <RainbowCursor zIndex={1} />,
    },
    {
      title: 'Follow Cursor',
      link: '/components/follow-cursor',
      component: <FollowCursor />,
    },
    {
      title: 'Spotlight Cursor',
      link: '/components/spotlight-cursor',
      component: <SpotlightCursor />,
    },
    {
      title: 'Springy Cursor',
      link: '/components/springy-cursor',
      component: <SpringyCursor zIndex={1} />,
    },
  ];
  return (
    <>
      <main className='min-h-screen h-full pt-24 overflow-hidden  relative  '>
        <div className='absolute inset-0 top-0 left-0  h-screen w-full items-center px-5 py-24 dark:[background:radial-gradient(87.03%_87.03%_at_50.05%_12.97%,rgba(217,217,217,0)_40%,#000000_100%)] [background:radial-gradient(87.03%_87.03%_at_50.05%_12.97%,rgba(217,217,217,0)_40%,#ffffff_100%)]'></div>
        {/* <div className='absolute inset-0 top-0 left-0  h-screen w-full items-center px-5 py-24 bg-gradient-to-r from-gray-800'></div> */}
        <article className='grid gap-4 py-20 relative z-10 sm:px-0 px-4 max-w-screen-xl mx-auto'>
          <a
            href={'/components/neural-glow'}
            className='inline-flex w-fit mx-auto items-center gap-1 rounded-full  bg-[#334cec] border-4  shadow-[#6175f8]  py-0.5 pl-0.5 pr-3 text-xs '
          >
            <div className='rounded-full bg-[#fcfdff] px-2 py-1 text-xs text-black '>
              Update
            </div>
            <p className='text-white sm:text-base text-xs inline-block'>
              ✨ Introducing
              <span className='px-1 font-semibold'>Neural Glow</span>
            </p>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              data-slot='icon'
              className='h-3 w-3 text-white'
            >
              <path
                fillRule='evenodd'
                d='M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z'
                clipRule='evenodd'
              ></path>
            </svg>
          </a>
          <h1 className=' capitalize  xl:text-7xl md:text-6xl sm:text-5xl text-3xl w-4/5 mx-auto text-center font-semibold leading-[110%]'>
            the only cursor animation you need
          </h1>
          <p className='mx-auto  w-3/5 text-center sm:text-lg text-sm'>
            A open-source animated cusor component built with{' '}
            <strong>React</strong>, <strong>TypeScript</strong>,{' '}
            <strong>Tailwind CSS</strong>, and <strong>Framer Motion</strong>.
          </p>
          <div className='flex gap-2 justify-center items-center'>
            <a
              href='/components'
              className='flex items-center gap-2 w-fit rounded-lg  text-white bg-gradient-to-l from-[#6175f8]  to-[#334cec] border sm:px-4 px-2  py-2 '
            >
              Browse Component
              <MoveRight />
            </a>
            <a href='/get-started' className='sm:inline-block hidden'>
              <Button className=' rounded-full px-4'>
                Get Started
                <ChevronsRight />
              </Button>
            </a>
          </div>
        </article>
        <section className='relative  z-[1]'>
          <div className='max-w-screen-xl mx-auto '>
            <div className='w-[850px] mx-auto '>
              <Spotlight className='space-y-4'>
                {components.map((component, index) => (
                  <SpotLightItem className='p-1' key={index}>
                    <>
                      <Link
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        href={component.link}
                        className='p-2 pl-4 dark:bg-neutral-900 bg-neutral-50 transition-all rounded-md dark:border-none border backdrop-blur-md relative flex justify-between items-center'
                      >
                        <div>
                          <h1 className='font-medium text-xl'>
                            {component.title}
                          </h1>
                        </div>
                        <button className='h-full dark:bg-neutral-800 bg-neutral-100 border p-3 rounded-md'>
                          <ArrowRight />
                        </button>
                      </Link>

                      {hoveredIndex === index && (
                        <div className=''>{component.component}</div>
                      )}
                    </>
                  </SpotLightItem>
                ))}
              </Spotlight>
            </div>
            <Footer className='mt-8' />
          </div>
        </section>
        <div className='flex h-screen overflow-hidden top-0 left-0  inset-0  -z-10 absolute'>
          {blocks}
        </div>
        <div className='mt-[100vh]  bg-gradient-to-b dark:from-[#000000] from-white from-20% via-white to-transparent absolute  left-0 h-full w-full inset-0 '></div>
      </main>
    </>
  );
}

export default HeroSec;
