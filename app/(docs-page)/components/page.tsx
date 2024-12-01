'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import preview from '@/assets/preview';
const appsDesign = [
  {
    id: 'motionNumber',
    name: 'motion number',
    url: '/components/motion-number',
    imgSrc: preview.motionNumber,
  },
  {
    id: 'buttons',
    url: '/components/buttons',
    name: 'buttons',
    imgSrc: preview.buttons,
  },
  {
    id: 'horizontal-scrolling',
    url: '/components/horizontal-scroll',
    name: 'scrolling',
    imgSrc: preview.horizontascroll,
  },
  {
    id: 'clip-path',
    url: '/components/clip-path',
    name: 'Clip-Path',
    imgSrc: preview.clippath,
  },
  {
    id: 'image-reveal',
    url: '/components/product-cards',
    name: 'Cards',
    imgSrc: preview.card,
  },
];

export default function Home() {
  return (
    <>
      <div className='pt-20 pb-5'>
        <h1
          className={'sm:text-3xl text-2xl font-semibold tracking-tight pb-1'}
        >
          Components
        </h1>

        <p className='md:text-lg text-sm text-muted-foreground lg:w-[80%]'>
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </p>
        <>
          <div className='grid md:grid-cols-3 grid-cols-2 gap-6 py-4'>
            {appsDesign.map((component, index) => {
              return (
                <>
                  <Link
                    href={component?.url}
                    className='border p-2    transition-all rounded-lg'
                  >
                    <>
                      <AspectRatio.Root ratio={16 / 9}>
                        <Image
                          src={component.imgSrc}
                          alt='hero-sec'
                          width={100}
                          height={100}
                          className='w-full h-full   rounded-md'
                        />
                      </AspectRatio.Root>
                    </>
                    <div className='sm:py-2 py-1 sm:px-4 px-2'>
                      <h1 className='2xl:text-xl xl:text-xl md:text-lg text-sm font-medium leading-[140%] capitalize'>
                        {component.name}
                      </h1>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
        </>
      </div>
    </>
  );
}
